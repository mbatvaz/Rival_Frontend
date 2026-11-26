import { api, ApiError } from './api.js';

const resource = 'booking/alerts';
export const alertKey = (service, stylist) => service + ':' + stylist;
export const alertDeadline = (now, days) => now + days * 86400000;
export const activeAlert = (record, now = Date.now()) => record && !record.closedAt && record.expiresAt > now;
export const readAlerts = async () => (await api.read(resource)).data;

export function registerAlert(records, key, selection, now, days) {
  const previous = records[key];
  if (activeAlert(previous, now)) return { record: previous, duplicate: true };
  if (previous) records[key + ':' + Object.keys(records).length] = previous;
  const record = { ...selection, expiresAt: alertDeadline(now, days) };
  records[key] = record;
  return { record, duplicate: false };
}

let pending = Promise.resolve();
function changeAlerts(operation) {
  const save = async () => {
    const records = await readAlerts();
    const result = operation(records);
    if (!result.duplicate) await api.write(resource, records);
    return { ...result, records };
  };
  if (navigator.locks) return navigator.locks.request(resource, save);
  const next = pending.then(save);
  pending = next.catch(() => {});
  return next;
}

export function addAlert(service, stylist, days) {
  return changeAlerts(records => registerAlert(records, alertKey(service, stylist), { service, stylist }, Date.now(), days));
}

export function closeAlert(records, key, expiresAt, now) {
  const record = records[key];
  if (!activeAlert(record, now) || record.expiresAt !== expiresAt) {
    throw new ApiError('ALERT_UNAVAILABLE', 'این اعلان دیگر فعال نیست.');
  }
  record.closedAt = now;
  return { record };
}

export function cancelAlert(key, expiresAt) {
  return changeAlerts(records => closeAlert(records, key, expiresAt, Date.now()));
}
