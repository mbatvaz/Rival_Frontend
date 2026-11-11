import { api } from '../../core/api.js';
import { localUrl } from '../../core/config.js';
import { faDigits, jalali } from '../../core/format.js';

export const query = new URLSearchParams(window.location.search);
export const state = query.get('state') ?? '';
export const get = (root, name) => root.querySelector('[data-rv-' + name + ']');
export const text = (root, name, value) => {
  const element = get(root, name);
  if (element) element.textContent = value;
};
export const visible = (root, name, show) => {
  const element = get(root, name);
  if (element) element.hidden = !show;
};
export const money = value => new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
export const dateLabel = date => jalali(date + 'T12:00:00Z');
export const faDay = date => dateLabel(date).split('/').at(-1);
export const minuteLabel = time => faDigits(time);
export const dayName = date => new Intl.DateTimeFormat('fa-IR', { weekday: 'long', timeZone: 'Asia/Tehran' })
  .format(new Date(date + 'T12:00:00Z'));

export function route(id, values = {}) {
  const links = document.querySelector('[data-rv-booking-links]').content;
  const path = [...links.querySelectorAll('[data-rv-route]')].find(link => link.dataset.rvRoute === id)?.getAttribute('href');
  if (!path) throw new Error('مسیر رزرو آزمایشی پیدا نشد.');
  const url = new URL(path, window.location.origin);
  for (const [key, value] of Object.entries(values)) if (value) url.searchParams.set(key, value);
  return url.pathname + url.search;
}

export function selection(catalog, kind) {
  const expected = { fixed: 'fixed', checkout: 'fixed', proposed: 'proposed', requested: 'requested' }[kind];
  const candidates = expected ? catalog.services.filter(item => item.kind === expected) : catalog.services;
  const service = candidates.find(item => item.id === query.get('service')) ?? candidates.find(item => item.id === 'face-hair') ?? candidates[0];
  const allowed = service.stylists;
  const stylist = catalog.stylists.find(item => item.id === query.get('stylist') && allowed.includes(item.id))
    ?? catalog.stylists.find(item => item.id === allowed[0]);
  return { service, stylist };
}

export function paintContext(root, service, stylist) {
  for (const card of root.querySelectorAll('[data-rv-booking-context]')) {
    get(card, 'context-image').src = localUrl(service.image);
    text(card, 'context-service', service.name);
    if (stylist) {
      text(card, 'context-name', 'با ' + stylist.name);
      get(card, 'context-avatar').src = localUrl(stylist.image);
    }
  }
}

export function centerInRail(rail, item) {
  if (!item) return;
  const frame = rail.getBoundingClientRect();
  const card = item.getBoundingClientRect();
  rail.scrollBy({ left: card.left + card.width / 2 - frame.left - frame.width / 2, behavior: 'instant' });
}

export async function findRecord(collection, id) {
  if (!id) return null;
  const records = (await api.read('booking/' + collection)).data;
  return Object.hasOwn(records, id) ? records[id] : null;
}

export const findHold = id => findRecord('holds', id);

export async function submitRequest(details) {
  const id = window.crypto.randomUUID();
  await persist('requests', id, { ...details, id });
  window.location.assign(route('BK-REQ01', { request: id }));
}

export function report(root, error) {
  text(root, 'booking-error', error.message || 'پیش‌نمایش در دسترس نیست. دوباره تلاش کنید.');
  visible(root, 'booking-error', true);
}

export async function persist(collection, key, value) {
  const resource = 'booking/' + collection;
  const data = (await api.read(resource)).data;
  data[key] = value;
  await api.write(resource, data);
  return value;
}

export function bindForm(root, handler) {
  const form = get(root, 'booking-form');
  const button = get(form, 'booking-submit');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    visible(root, 'booking-error', false);
    try { await handler(form); }
    catch (error) { report(root, error); button.disabled = false; }
  });
}
