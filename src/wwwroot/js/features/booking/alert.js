import { activeAlert, addAlert, alertDeadline, alertKey, readAlerts } from '../../core/availability-alerts.js';
import { closeSheet, openSheet } from '../../components/sheet.js';
import { faDigits } from '../../core/format.js';
import { longDay } from './availability.js';
import { get, state, text, visible } from './shared.js';

export async function initAlert(root, { service, stylist, catalog, open }) {
  const sheet = document.getElementById('rv-booking-alert');
  const trigger = root.querySelector('[data-rv-sheet-open="rv-booking-alert"]');
  const button = get(sheet, 'alert-confirm');
  const empty = !get(root, 'no-availability').hidden;
  const key = alertKey(service.id, stylist.id);
  const expiry = () => alertDeadline(Date.now(), catalog.alertDays);
  const records = await readAlerts();
  let current = activeAlert(records[key]) ? records[key] : null;
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
    if (button.disabled) return;
    button.disabled = true;
    visible(sheet, 'alert-error', false);
    try {
      const { record, duplicate } = await addAlert(service.id, stylist.id, catalog.alertDays);
      current = record;
      render();
      if (!duplicate) {
        closeSheet();
        showConfirmation();
      }
    } catch (error) {
      text(sheet, 'alert-error', error.message);
      visible(sheet, 'alert-error', true);
    } finally { button.disabled = false; }
  });
  window.addEventListener('pageshow', async event => {
    if (!event.persisted) return;
    try {
      const saved = (await readAlerts())[key];
      current = activeAlert(saved) ? saved : null;
      if (!current) {
        delete trigger.dataset.rvAlertConfirmed;
        get(trigger, 'alert-icon').className = 'ri ri-bell-ring';
        get(trigger, 'alert-icon-tile').classList.remove('rv-state-page__icon--success');
        visible(trigger, 'alert-details', true);
        visible(trigger, 'alert-done', false);
      }
      render();
    } catch { /* Keep the last readable snapshot. */ }
  });
  const facts = get(sheet, 'alert-facts');
  facts.querySelector('li:nth-child(2)').lastChild.textContent = 'این اعلان ' + faDigits(catalog.alertDays) + ' روز اعتبار دارد، تا ' + longDay(new Date(expiry()).toISOString().slice(0, 10)) + '.';
}
