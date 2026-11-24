import { api, ApiError } from '../../core/api.js';
import { faDigits } from '../../core/format.js';
import { snapshot } from '../booking/holds.js';
import { findHold, persist } from '../booking/shared.js';
import { readHomeState } from './home-state.js';
import { readSubmittedRequests } from './submitted-requests.js';

const resource = 'customer/request-state';
const holdId = id => id + '-customer-request';
export const requestGroup = status => status === 'checking' ? 'pay' : ['pay', 'wait'].includes(status) ? status : 'done';

export async function readRequests() {
  const [{ data }, { data: cancelled }, { data: holds }, { clockStartedAt }, submitted] = await Promise.all([
    api.read('customer/requests'), api.read(resource), api.read('booking/holds'), readHomeState(), readSubmittedRequests()
  ]);
  return [...submitted, ...data.records].map(record => ({
    ...record,
    cancelled: Boolean(cancelled[record.id]),
    hold: holds[holdId(record.id)],
    expiresAt: clockStartedAt + (record.remainingSeconds ?? 0) * 1000
  }));
}

export async function requestPaymentOutcomes() {
  const [{ data: cancelled }, { data: holds }] = await Promise.all([api.read(resource), api.read('booking/holds')]);
  return id => cancelled[id] ? 'cancelled' : holds[holdId(id)]?.result;
}

export function requestStatus(record) {
  if (record.cancelled) return 'cancelled';
  if (record.hold?.result === 'success') return 'booked';
  if (record.hold?.result === 'checking') return 'checking';
  if (record.type === 'proposed' && record.createdAt && Date.now() >= record.createdAt + 7 * 864e5) return 'rejected';
  if (record.status === 'pay' && (record.hold?.result === 'lost' || Date.now() >= record.expiresAt)) return 'expired';
  return record.status;
}

export function runRequestAction(operation) {
  if (!navigator.locks) throw new ApiError('REQUEST_LOCK_UNAVAILABLE', 'برای پرداخت یا لغو این درخواست، پیش‌نمایش را در مرورگری دیگر باز کنید.');
  return navigator.locks.request('rival:customer-requests', operation);
}

export async function cancelRequest(record) {
  const { data } = await api.read(resource);
  await api.write(resource, { ...data, [record.id]: true });
}

export async function beginRequestPayment(record) {
  const id = holdId(record.id);
  const hold = await findHold(id);
  if (!hold) {
    const quote = snapshot(record.schedule, { credit: record.credit ?? 0 });
    await persist('holds', id, { ...quote, id, request: record.id, result: 'checking', expiresAt: record.expiresAt });
  }
  return id;
}

export function requestClock(element, expiresAt) {
  const seconds = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = String(Math.floor(seconds / 60) % 60).padStart(2, '0');
  const time = hours ? hours + ':' + minutes : minutes + ':' + String(seconds % 60).padStart(2, '0');
  element.querySelector('[data-rv-request-clock]').textContent = faDigits(time);
  element.querySelector('progress').value = seconds;
}

export function refreshRequests(refresh, reload) {
  let timer = 0;
  function start() {
    window.clearInterval(timer);
    refresh();
    timer = window.setInterval(refresh, 1000);
  }
  start();
  window.addEventListener('pagehide', () => window.clearInterval(timer));
  window.addEventListener('pageshow', event => {
    if (event.persisted) { start(); reload(); }
  });
  window.addEventListener('storage', event => {
    if (event.key && /:(customer\/request-state|booking\/(?:holds|requests))$/.test(event.key)) reload();
  });
}
