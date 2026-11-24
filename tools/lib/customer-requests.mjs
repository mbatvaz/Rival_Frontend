import path from 'node:path';
import { src, readJson } from './site.mjs';
import { faDigits } from './format.mjs';

const money = new Intl.NumberFormat('fa-IR');
const date = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Tehran' });

export async function requestContext(model) {
  const catalog = (await readJson(path.join(src, 'MockData/booking/catalog.json'))).data;
  const services = [...catalog.services, ...model.extraServices];
  const service = id => services.find(item => item.id === id);
  const stylist = id => catalog.stylists.find(item => item.id === id);
  const requestRecords = model.records.map(record => {
    const selection = service(record.service);
    const person = stylist(record.stylist);
    const parts = (record.parts ?? []).map(service);
    const agenda = {};
    for (const [index, slot] of (record.schedule ?? []).entries()) {
      (agenda[slot.date] ??= []).push({ ...slot, appointmentId: slot.appointmentId ?? record.id + '-' + (index + 1), number: index + 1 });
    }
    const days = Object.entries(agenda).map(([day, slots]) => {
      const parts = date.formatToParts(new Date(day + 'T12:00:00Z'));
      const label = type => parts.find(part => part.type === type).value;
      return {
        weekday: label('weekday'), day: label('day'), month: label('month'),
        slots: slots.map(slot => ({ ...slot, name: service(slot.service).name, image: service(slot.service).image, person: stylist(slot.stylist), amount: money.format(slot.fee) }))
      };
    });
    const total = (record.schedule ?? []).reduce((sum, slot) => sum + slot.fee, 0);
    const subtotal = record.credit ?? 0;
    const [, , day] = record.date.split('/');
    const subtitle = person ? 'با ' + person.name : money.format(parts.length) + ' بخش';
    return {
      ...record, name: selection.name, image: selection.image, person, parts, days, day: Number(day),
      subtitle: record.subtitle ?? subtitle, identity: subtitle,
      amount: money.format(total), creditAmount: money.format(subtotal), due: money.format(total - subtotal),
      dayCount: money.format(days.length), partCount: money.format(parts.length)
    };
  });
  const requestCounts = { pay: 0, wait: 0, done: 0 };
  for (const { status } of requestRecords) requestCounts[status === 'pay' || status === 'wait' ? status : 'done']++;
  return {
    requestRecords,
    requestCounts,
    requestServices: model.services.map(service),
    requestStylists: [...catalog.stylists, { id: 'mehdi', name: 'مهدی', initial: 'م' }]
  };
}

export function requestAppointments(records) {
  return records.flatMap(request => request.days.flatMap(day => day.slots.map(slot => ({
    id: slot.appointmentId, service: slot.name, stylist: slot.person.name, image: slot.image, avatar: slot.person.image,
    weekday: day.weekday, day: day.day, month: day.month, time: faDigits(slot.time),
    status: 'booked', statusText: 'رزرو شده', tone: 'ink', icon: 'check-circle', countdown: [],
    detail: {
      requestId: request.id, requestName: request.name, requestImage: request.image,
      requiresPayment: request.status === 'pay', part: request.partCount === '۰' ? '' : faDigits(slot.number) + ' از ' + request.partCount,
      paidAt: request.paidAt, tracking: '#' + slot.appointmentId, amount: slot.amount
    }
  }))));
}
