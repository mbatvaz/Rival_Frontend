import { localUrl } from '../../core/config.js';
import { api, ApiError } from '../../core/api.js';
import { text } from '../booking/shared.js';

export const swapCustomer = () => new URLSearchParams(location.search).get('swapCustomer');

export function swapLink(href, customer, appointment) {
  const url = new URL(href, location.href);
  url.searchParams.set('swapCustomer', customer);
  if (appointment) url.searchParams.set('appointment', appointment);
  return url.href;
}

export function reportSwapError(sheet, error) {
  text(sheet, 'swap-error', error instanceof ApiError ? error.message : 'انجام عملیات ممکن نشد. دوباره تلاش کنید.');
}

export function preserveSwapNavigation(customer, name) {
  const paths = [localUrl('customer') + '/', localUrl('customer/appointments') + '/'];
  for (const link of document.querySelectorAll('a[href]')) {
    if (paths.includes(link.pathname) && link.origin === location.origin) link.href = swapLink(link.href, customer);
  }
  if (name) {
    for (const label of document.querySelectorAll('[data-rv-swap-shell-name]')) label.textContent = name;
  }
}

export function refreshSwapOnRestore(customer, appointments) {
  const versions = records => records.map(record => record.id + ':' + record.revision).join(',');
  const rendered = versions(appointments);
  async function refresh() {
    const latest = await api.appointmentSwap.list(customer).catch(() => null);
    if (latest && versions(latest.appointments) !== rendered) location.reload();
  }
  window.addEventListener('pageshow', event => { if (event.persisted) void refresh(); });
  window.addEventListener('focus', refresh);
}
