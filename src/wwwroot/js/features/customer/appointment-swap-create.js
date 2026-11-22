import { api } from '../../core/api.js';
import { validSwapDay } from '../../core/appointment-swap-rules.js';
import { focusSheetTarget } from '../../components/sheet-focus.js';
import { dateLabel, get, text } from '../booking/shared.js';
import { initFutureDatePicker } from './appointment-date-picker.js';
import { initSwapCodeDisplay } from './appointment-swap-code.js';
import { reportSwapError } from './appointment-swap-context.js';

export function initSwapCreate(button, customer, record, openSheet, notifyOffer = () => {}) {
  const sheet = document.getElementById('rv-swap-create');
  const form = get(sheet, 'swap-form');
  const submit = form.querySelector('[type="submit"]');
  const date = form.elements.desiredDate;
  const dateButton = get(form, 'swap-date');
  const dateValue = document.getElementById('rv-swap-date-value');
  let pending = false;

  const code = initSwapCodeDisplay(sheet, customer, record, () => {
    showForm();
    text(sheet, 'swap-status', 'مهلت کد تمام شد. می‌توانید کد تازه‌ای بسازید.');
    focusSheetTarget(dateButton);
  });
  const calendar = initFutureDatePicker(document.getElementById('rv-swap-calendar'), selected => {
    date.value = selected;
    dateValue.textContent = dateLabel(selected);
    submit.disabled = !validSwapDay(selected);
    text(sheet, 'swap-error', '');
  });
  dateButton.addEventListener('click', () => calendar(dateButton, date.value));

  function showForm() {
    code.hide();
    date.value = '';
    dateValue.textContent = 'انتخاب تاریخ';
    submit.disabled = true;
    form.hidden = false;
  }

  const open = () => openSheet(sheet.id, button);
  button.addEventListener('click', async () => {
    if (pending) return;
    pending = true;
    form.hidden = true;
    code.hide();
    text(sheet, 'swap-error', '');
    text(sheet, 'swap-status', '');
    button.setAttribute('aria-busy', 'true');
    try {
      const result = await api.appointmentSwap.active(customer, record.id);
      notifyOffer(result);
      if (result) code.show(result, { open });
      else {
        showForm();
        open();
      }
    } catch (error) {
      reportSwapError(sheet, error);
      open();
    } finally {
      pending = false;
      button.removeAttribute('aria-busy');
    }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || submit.disabled) return;
    pending = true;
    submit.disabled = true;
    dateButton.disabled = true;
    text(sheet, 'swap-error', '');
    text(sheet, 'swap-status', 'در حال ساخت کد…');
    try {
      const result = await api.appointmentSwap.create(customer, record.id, record.revision, date.value);
      notifyOffer(result);
      form.hidden = true;
      text(sheet, 'swap-status', '');
      code.show(result);
    } catch (error) {
      text(sheet, 'swap-status', '');
      reportSwapError(sheet, error);
      submit.disabled = !validSwapDay(date.value);
    } finally { pending = false; dateButton.disabled = false; }
  });

  return sample => {
    if (sample) {
      form.hidden = true;
      text(sheet, 'swap-status', 'این کد فقط نمونهٔ پیش‌نمایش است.');
      code.show(sample, { sample: true, open });
    } else {
      showForm();
      open();
    }
  };
}
