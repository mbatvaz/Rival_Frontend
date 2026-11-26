import { api } from '../../core/api.js';

const resource = 'customer/home-state';
let fallbackClock;

function withHomeStateLock(operation) {
  return navigator.locks ? navigator.locks.request('rival:' + resource, operation) : operation();
}

export function readHomeState() {
  return withHomeStateLock(async () => {
    const { data } = await api.read(resource);
    if (data.clockStartedAt) return data;
    fallbackClock ??= Date.now();
    const state = { ...data, clockStartedAt: fallbackClock };
    try { await api.write(resource, state); }
    catch { /* Without storage, keep one stable clock for the current document. */ }
    return state;
  });
}

export function dismissHomeNotice(id) {
  return withHomeStateLock(async () => {
    const { data } = await api.read(resource);
    if (!data.dismissed.includes(id)) await api.write(resource, { ...data, dismissed: [...data.dismissed, id] });
  });
}
