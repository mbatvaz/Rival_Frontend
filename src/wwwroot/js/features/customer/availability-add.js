import { activeAlert, alertDeadline, alertKey } from '../../core/availability-alerts.js';
import { closeSheet } from '../../components/sheet.js';
import { faDigits } from '../../core/format.js';
import { get, text, visible } from '../booking/shared.js';
import { alertDate } from './availability-views.js';

export function initAlertChoices(sheet, catalog, getRecords, clock, save) {
  const form = document.getElementById('rv-availability-form');
  const { service, stylist } = form.elements;
  const button = get(sheet, 'alert-confirm');
  const facts = get(sheet, 'alert-facts').querySelectorAll('li');
  const inputs = [...form.querySelectorAll('[name="stylist"]')];
  let pending = false;
  const render = () => {
    const selection = catalog.services.find(item => item.id === service.value && item.kind !== 'requested');
    for (const input of inputs) input.disabled = !selection?.stylists.includes(input.value);
    if (inputs.find(input => input.checked)?.disabled) inputs.find(input => !input.disabled).checked = true;
    const person = catalog.stylists.find(item => item.id === stylist.value);
    const existing = getRecords()[alertKey(service.value, stylist.value)];
    const duplicate = Boolean(activeAlert(existing, clock()));
    button.disabled = pending || duplicate;
    if (duplicate) {
      button.setAttribute('aria-describedby', 'rv-availability-duplicate');
      text(sheet, 'alert-duplicate-text', 'تا ' + alertDate(existing.expiresAt) + ' فعال است. خدمت یا آرایشگر دیگری انتخاب کنید.');
    } else {
      button.removeAttribute('aria-describedby');
    }
    visible(sheet, 'alert-facts', !duplicate);
    visible(sheet, 'alert-duplicate', duplicate);
    facts[0].lastChild.textContent = 'فقط یک پیامک، در اولین آزاد شدن زمانی از ' + person.name + ' برای این خدمت.';
    facts[1].lastChild.textContent = 'این اعلان ' + faDigits(catalog.alertDays) + ' روز اعتبار دارد، تا ' +
      alertDate(alertDeadline(clock(), catalog.alertDays)) + '.';
  };
  get(sheet, 'alert-duplicate').id = 'rv-availability-duplicate';
  form.addEventListener('change', () => {
    visible(sheet, 'alert-error', false);
    render();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    pending = button.disabled = true;
    visible(sheet, 'alert-error', false);
    try {
      const result = await save(service.value, stylist.value);
      if (!result.duplicate) await closeSheet();
    } catch (error) {
      text(sheet, 'alert-error', error.message);
      visible(sheet, 'alert-error', true);
    } finally {
      pending = false;
      render();
    }
  });
  return (selectedService, selectedStylist) => {
    if (selectedService) service.value = selectedService;
    if (selectedStylist) stylist.value = selectedStylist;
    visible(sheet, 'alert-error', false);
    render();
  };
}
