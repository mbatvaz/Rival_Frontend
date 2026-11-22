import {
  swapValidity, validSwapDay, normalizeSwapCode, seedSwapAppointments, findAppointment,
  eligible, appointmentStart, updateOfferStatuses, eligibilityError, exchangeAppointments, swapMessages
} from './appointment-swap-rules.js';

const resource = 'customer/appointment-swap';

function token() {
  return Array.from(window.crypto.getRandomValues(new Uint8Array(12)), byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function createSwapAdapter({ read, write, storageKey, ApiError }) {
  const fail = code => { throw new ApiError(code, swapMessages[code]); };
  const lock = navigator.locks;
  const run = (action, mutating = false) => {
    const execute = async () => {
      const { data } = await read(resource);
      const now = Date.now();
      const needsSeed = !data.seeded;
      if (needsSeed) seedSwapAppointments(data, now);
      const changed = updateOfferStatuses(data, now);
      if (lock && (needsSeed || changed)) await write(resource, data);
      return action(data, now);
    };
    if (mutating && !lock) fail('UNAVAILABLE');
    return lock ? lock.request(storageKey(resource), execute) : execute();
  };
  function owned(data, customer, id) {
    const appointment = findAppointment(data, id);
    if (!Object.hasOwn(data.customers, customer) || appointment?.attendeeUserId !== customer) fail('CHANGED');
    return appointment;
  }
  const active = (data, id) => data.offers.find(offer => offer.sourceAppointmentId === id && offer.status === 'active') ?? null;
  function validateOffer(data, now, customer, id, revision, code, offerId) {
    const normalized = normalizeSwapCode(code);
    const offer = data.offers.find(item => item.code === normalized);
    if (!offer) fail('INVALID_CODE');
    if (offer.status === 'expired') fail('EXPIRED');
    if (offer.status === 'consumed') fail('CONSUMED');
    if (offer.status !== 'active' || (offerId && offer.id !== offerId)) fail('CHANGED');
    const target = owned(data, customer, id);
    if (target.revision !== revision) fail('CHANGED');
    const source = findAppointment(data, offer.sourceAppointmentId);
    const error = eligibilityError(source, target, offer, now);
    if (error) fail(error);
    if (active(data, target.id)) fail('ACTIVE_OFFER');
    return { offer, source, target };
  }
  return {
    observe(refresh) {
      window.addEventListener('storage', event => {
        if (event.key === storageKey(resource)) refresh();
      });
    },
    list(customer) {
      return run((data, now) => ({
        customerName: Object.hasOwn(data.customers, customer) ? data.customers[customer] : undefined,
        appointments: data.appointments.filter(record => record.attendeeUserId === customer)
          .map(record => ({ ...record, canSwap: eligible(record, now), refundRecipientUserId: record.payerUserId }))
      }));
    },
    active(customer, id) {
      return run((data, now) => eligible(owned(data, customer, id), now) ? active(data, id) : null);
    },
    create(customer, id, revision, desiredDate) {
      return run(async (data, now) => {
        const source = owned(data, customer, id);
        if (!eligible(source, now)) fail('INELIGIBLE');
        if (source.revision !== revision) fail('CHANGED');
        const existing = active(data, id);
        if (existing) return existing;
        if (!validSwapDay(desiredDate, now)) fail('INVALID_DATE');
        let code = token();
        while (data.offers.some(offer => offer.code === code)) code = token();
        const offer = {
          id: token(), code, sourceAppointmentId: id, creatorUserId: customer, sourceRevision: revision,
          desiredDate, createdAt: now, expiresAt: now + swapValidity, status: 'active'
        };
        data.offers.push(offer);
        await write(resource, data);
        return offer;
      }, true);
    },
    preview(customer, id, revision, code) {
      return run((data, now) => {
        const { offer, source, target } = validateOffer(data, now, customer, id, revision, code);
        return {
          offerId: offer.id, current: { date: target.date, time: target.time },
          incoming: { date: source.date, time: source.time }
        };
      });
    },
    redeem(customer, id, revision, code, offerId) {
      return run(async (data, now) => {
        const { offer, source, target } = validateOffer(data, now, customer, id, revision, code, offerId);
        const result = exchangeAppointments(data, source, target, offer, now, token());
        await write(resource, data);
        return result;
      }, true);
    },
    reschedule(customer, id, revision, change) {
      return run(async (data, now) => {
        const record = owned(data, customer, id);
        if (record.revision !== revision) fail('CHANGED');
        const remainingHours = (appointmentStart(record) - now) / 3_600_000;
        if (!record.rescheduleAllowance || !eligible(record, now) || remainingHours <= 3 ||
          (remainingHours <= 24 && change.mode !== 'late') || !eligible({ ...record, ...change }, now)) fail('INELIGIBLE');
        record.rescheduleAllowance--;
        record.rescheduleHistory.push(change);
        Object.assign(record, { date: change.date, time: change.time, revision: revision + 1 });
        updateOfferStatuses(data, now);
        await write(resource, data);
      }, true);
    }
  };
}
