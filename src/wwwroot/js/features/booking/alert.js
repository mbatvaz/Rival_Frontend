import { api } from '../../core/api.js';
import { closeSheet, openSheet } from '../../components/sheet.js';
import { faDigits } from '../../core/format.js';
import { longDay } from './availability.js';
import { get, persist, state, text, visible } from './shared.js';

export async function initAlert(root, { service, stylist, catalog, open }) {
  const sheet = document.getElementById('rv-booking-alert');
  const trigger = root.querySelector('[data-rv-sheet-open="rv-booking-alert"]');
  const button = get(sheet, 'alert-confirm');
  const empty = !get(root, 'no-availability').hidden;
  const key = service.id + ':' + stylist.id;
  const resource = 'booking/alerts';
  const expiry = () => Date.now() + catalog.alertDays * 86400000;
  const records = (await api.read(resource)).data;
  let current = records[key]?.expiresAt > Date.now() ? records[key] : null;
  if (open && ['done', 'duplicate'].includes(state)) current = { expiresAt: expiry() };
  const render = () => {
    const active = Boolean(current);
    text(root, 'alert-title', active ? 'اعلان فعال است' : empty ? 'خبرم کنید' : 'زمان مناسبی نیست؟');
    const date = active ? longDay(new Date(current.expiresAt).toISOString().slice(0, 10)) : '';
    trigger.dataset.rvAlertActive = String(active);
    text(root, 'alert-sub', active ? 'تا ' + date + '، با اولین آزاد شدن زمان پیامک می‌گیرید.' : 'با آزاد شدن زمان، خبر بگیرید.');
    text(sheet, 'alert-close-label', active ? 'بستن' : 'انصراف');
    if (active) text(sheet, 'alert-duplicate-text', 'برای ' + service.name + ' با ' + stylist.name + ' تا ' + date + ' اعلان فعال دارید. برای هر خدمت و آرایشگر فقط یک اعلان فعال ممکن است.');
    visible(sheet, 'alert-duplicate', active);
    visible(sheet, 'alert-facts', !active);
    visible(sheet, 'alert-confirm', !active);
    visible(sheet, 'alert-view', active);
  };
  const showConfirmation = () => {
    trigger.dataset.rvAlertConfirmed = 'true';
    get(trigger, 'alert-icon').className = 'ri ri-check';
    get(trigger, 'alert-icon-tile').classList.add('rv-state-page__icon--success');
    visible(trigger, 'alert-details', false);
    visible(trigger, 'alert-done', true);
  };
  render();
  if (open && state === 'done') showConfirmation();
  if (open && state !== 'done') openSheet(sheet.id, trigger);
  button.addEventListener('click', async () => {
    if (button.disabled || current) return;
    button.disabled = true;
    visible(sheet, 'alert-error', false);
    try {
      const existing = (await api.read(resource)).data[key];
      const active = existing?.expiresAt > Date.now();
      current = active ? existing : await persist('alerts', key, { service: service.id, stylist: stylist.id, expiresAt: expiry() });
      render();
      if (!active) {
        closeSheet();
        showConfirmation();
      }
    } catch (error) {
      text(sheet, 'alert-error', error.message);
      visible(sheet, 'alert-error', true);
    } finally { button.disabled = false; }
  });
  const facts = get(sheet, 'alert-facts');
  facts.querySelector('li:nth-child(2)').lastChild.textContent = 'این اعلان ' + faDigits(catalog.alertDays) + ' روز اعتبار دارد، تا ' + longDay(new Date(expiry()).toISOString().slice(0, 10)) + '.';
}
