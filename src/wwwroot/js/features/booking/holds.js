import { api } from '../../core/api.js';
import { persist } from './shared.js';

export function snapshot(items, catalog, credit = catalog.credit) {
  const amount = items.reduce((sum, item) => sum + item.fee, 0);
  const applied = Math.min(credit, amount);
  return { items, amount, applied, due: amount - applied };
}

export async function createHold(items, catalog, credit, seconds = catalog.holdSeconds) {
  const holds = (await api.read('booking/holds')).data;
  const quote = snapshot(items, catalog, credit);
  const key = JSON.stringify(quote);
  const active = Object.values(holds).find(hold => hold.key === key && hold.expiresAt > Date.now());
  if (active) return active;
  const id = window.crypto.randomUUID();
  return persist('holds', id, { id, key, ...quote, expiresAt: Date.now() + seconds * 1000 });
}

export function bookingItem(service, stylist, date, time) {
  return { service: service.id, stylist: stylist.id, date, time, fee: service.fee };
}
