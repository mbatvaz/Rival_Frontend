export const swapValidity = 600_000;

export const swapMessages = {
  ACTIVE_OFFER: 'ثبت کد پس از پایان اعتبار کد فعلی فعال می‌شود.',
  INVALID_CODE: 'کد تعویض معتبر نیست. کد را بررسی کنید.',
  EXPIRED: 'اعتبار این کد تمام شده است. کد تازه بگیرید.',
  CONSUMED: 'این کد قبلاً استفاده شده است.',
  SAME_USER: 'هر دو نوبت به یک مشتری تعلق دارند.',
  DATE_MISMATCH: 'تاریخ نوبت شما با تاریخ درخواستی کد یکسان نیست.',
  STYLIST_MISMATCH: 'آرایشگر دو نوبت باید یک نفر باشد.',
  SERVICE_MISMATCH: 'خدمت دو نوبت باید یکسان باشد.',
  CONFIGURATION_MISMATCH: 'مدت خدمت، شعبه یا تنظیمات دو نوبت سازگار نیست.',
  INELIGIBLE: 'یکی از نوبت‌ها در حال حاضر قابل تعویض نیست.',
  CHANGED: 'وضعیت یا صاحب نوبت تغییر کرده است. جزئیات نوبت را دوباره باز کنید.',
  INVALID_DATE: 'یک تاریخ معتبر پس از امروز انتخاب کنید.',
  UNAVAILABLE: 'انجام عملیات در این مرورگر ممکن نیست. دوباره تلاش کنید.'
};

const localDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tehran', year: 'numeric', month: '2-digit', day: '2-digit'
});

export function salonDay(now = Date.now()) {
  const { year, month, day } = Object.fromEntries(localDate.formatToParts(now).map(part => [part.type, part.value]));
  return year + '-' + month + '-' + day;
}

export function validSwapDay(date, now = Date.now()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date <= salonDay(now)) return false;
  const instant = new Date(date + 'T12:00:00Z');
  return Number.isFinite(+instant) && instant.toISOString().slice(0, 10) === date;
}

export function normalizeSwapCode(value) {
  return String(value ?? '').replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/[\s-]/g, '').toUpperCase();
}

export function seedSwapAppointments(data, now) {
  for (const record of data.appointments) {
    const date = new Date(salonDay(now) + 'T12:00:00Z');
    date.setUTCDate(date.getUTCDate() + record.dayOffset);
    record.date = date.toISOString().slice(0, 10);
  }
  data.seeded = true;
}

export const findAppointment = (data, id) => data.appointments.find(record => record.id === id);

export function appointmentStart(record) {
  return Date.parse(record.date + 'T' + record.time + ':00+03:30');
}

export function eligible(record, now) {
  return record?.status === 'booked' && appointmentStart(record) > now;
}

export function updateOfferStatuses(data, now) {
  let changed = false;
  for (const offer of data.offers.filter(offer => offer.status === 'active')) {
    const source = findAppointment(data, offer.sourceAppointmentId);
    if (now >= offer.expiresAt) offer.status = 'expired';
    else if (source?.attendeeUserId !== offer.creatorUserId || source.revision !== offer.sourceRevision) offer.status = 'invalidated';
    changed ||= offer.status !== 'active';
  }
  return changed;
}

export function eligibilityError(source, target, offer, now) {
  if (!eligible(source, now) || !eligible(target, now)) return 'INELIGIBLE';
  if (source.attendeeUserId === target.attendeeUserId) return 'SAME_USER';
  if (target.date !== offer.desiredDate) return 'DATE_MISMATCH';
  if (source.stylistId !== target.stylistId) return 'STYLIST_MISMATCH';
  if (source.serviceId !== target.serviceId) return 'SERVICE_MISMATCH';
  if (['configurationId', 'durationMinutes', 'branchId'].some(key => source[key] !== target[key])) return 'CONFIGURATION_MISMATCH';
  return null;
}

export function exchangeAppointments(data, source, target, offer, now, id) {
  const previousAttendees = [source.attendeeUserId, target.attendeeUserId];
  const newAttendees = [...previousAttendees].reverse();
  source.attendeeUserId = newAttendees[0];
  target.attendeeUserId = newAttendees[1];
  source.revision++;
  target.revision++;
  offer.status = 'consumed';
  offer.consumedAt = now;
  offer.exchangeId = id;
  data.history.push({
    id, offerId: offer.id, sourceAppointmentId: source.id, targetAppointmentId: target.id,
    previousAttendees, newAttendees, executedAt: now
  });
  updateOfferStatuses(data, now);
  return { exchangeId: id, receivedAppointmentId: source.id };
}
