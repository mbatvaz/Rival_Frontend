import { api } from '../../core/api.js';
import { addAlert, alertKey, cancelAlert, closeAlert, readAlerts, registerAlert } from '../../core/availability-alerts.js';
import { closeSheet, openSheet } from '../../components/sheet.js';
import { get, text, visible } from '../booking/shared.js';
import { appointmentSheetOpener } from './appointment-sheet-hero.js';
import { initAlertChoices } from './availability-add.js';
import { renderAlerts } from './availability-views.js';

export async function init(root) {
  const state = new URLSearchParams(location.search).get('state');
  const example = ['example', 'add', 'duplicate', 'cancel'].includes(state);
  const clock = example ? () => Date.parse('2026-10-14T08:00:00Z') : Date.now;
  const openAdd = document.querySelector('[data-rv-sheet-open="rv-booking-alert"]');
  const sheet = document.getElementById('rv-booking-alert');
  const cancel = document.getElementById('rv-availability-cancel');
  const confirm = get(cancel, 'availability-confirm');
  const lift = appointmentSheetOpener(root, button => button.closest('.rv-availability-card'));
  let selection;
  try {
    const [{ data: catalog }, data] = await Promise.all([
      api.read('booking/catalog'), example ? api.read('customer/availability-alerts').then(result => ({
        [alertKey('face-hair', 'amir')]: result.data.example
      })) : readAlerts()
    ]);
    let records = data;
    const refresh = () => renderAlerts(root, catalog, records, clock(), (button, key, expiresAt) => {
      selection = { key, expiresAt, button };
      button.setAttribute('aria-expanded', 'true');
      visible(cancel, 'availability-cancel-error', false);
      lift(cancel.id, button);
    });
    const reload = async () => {
      if (!example) records = await readAlerts();
      refresh();
    };
    const choose = initAlertChoices(sheet, catalog, () => records, clock, async (service, stylist) => {
      const result = example ? registerAlert(records, alertKey(service, stylist), { service, stylist }, clock(), catalog.alertDays)
        : await addAlert(service, stylist, catalog.alertDays);
      if (!example) records = result.records;
      refresh();
      return result;
    });
    confirm.addEventListener('click', async () => {
      if (confirm.disabled || !selection) return;
      confirm.disabled = true;
      try {
        const { key, expiresAt } = selection;
        if (example) closeAlert(records, key, expiresAt, clock());
        else records = (await cancelAlert(key, expiresAt)).records;
        await closeSheet();
        refresh();
        openAdd.focus({ preventScroll: true });
      } catch (error) {
        text(cancel, 'availability-cancel-error', error.message);
        visible(cancel, 'availability-cancel-error', true);
      } finally { confirm.disabled = false; }
    });
    document.addEventListener('rv:sheet-close', event => {
      if (event.detail.id === cancel.id) selection?.button.removeAttribute('aria-expanded');
    });
    openAdd.addEventListener('click', () => choose());
    openAdd.disabled = false;
    refresh();
    if (state === 'cancel') get(root, 'availability-cancel')?.click();
    if (state === 'add' || state === 'duplicate') {
      choose(state === 'duplicate' ? 'face-hair' : 'hair', state === 'duplicate' ? 'amir' : 'taha');
      openSheet(sheet.id, openAdd);
    }
    window.addEventListener('pageshow', event => {
      if (event.persisted) reload().catch(error => showError(root, error));
    });
  } catch (error) { showError(root, error); }
}

function showError(root, error) {
  text(root, 'availability-error', error.message);
  visible(root, 'availability-error', true);
}
