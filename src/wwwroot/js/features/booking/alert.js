import { api } from '../../core/api.js';
import { closeSheet, openSheet } from '../../components/sheet.js';
import { faDigits, jalali } from '../../core/format.js';
import { get, persist, state, text, visible } from './shared.js';

export async function initAlert(root, { service, stylist, catalog, open }) {
  const sheet = document.getElementById('rv-booking-alert');
  const trigger = get(root, 'sheet-open');
  const button = get(sheet, 'alert-confirm');
  const key = service.id + ':' + stylist.id;
  const resource = 'booking/alerts';
  const expiry = () => Date.now() + catalog.alertDays * 86400000;
  const records = (await api.read(resource)).data;
  let current = records[key]?.expiresAt > Date.now() ? records[key] : null;
  if (open && ['done', 'duplicate'].includes(state)) current = { expiresAt: expiry() };
  const render = () => {
    const active = Boolean(current);
    text(root, 'alert-title', active ? 'اعلان فعال است' : 'زمان مناسبی نیست؟');
    text(root, 'alert-sub', active ? 'تا ' + jalali(current.expiresAt) : 'با آزاد شدن زمان، خبر بگیرید.');
    visible(sheet, 'alert-duplicate', active);
    visible(sheet, 'alert-facts', !active);
    visible(sheet, 'alert-confirm', !active);
    visible(sheet, 'alert-view', active);
  };
  render();
  visible(root, 'alert-done', open && state === 'done');
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
        visible(root, 'alert-done', true);
      }
    } catch (error) {
      text(sheet, 'alert-error', error.message);
      visible(sheet, 'alert-error', true);
    } finally { button.disabled = false; }
  });
  const facts = get(sheet, 'alert-facts');
  facts.querySelector('li:nth-child(2)').append(' تا ' + jalali(expiry()) + ' (' + faDigits(catalog.alertDays) + ' روز).');
}
