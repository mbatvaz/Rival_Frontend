import { closeSheet, openSheet } from '../../components/sheet.js';
import { faDigits } from '../../core/format.js';
import { get, text, visible, paintContext } from './shared.js';
import { longDay } from './availability.js';
import { adjacentMonth, availableTimes, monthGrid, monthKey } from './calendar.js';

import { paintRecurringPreview, recurringDates } from './recurring-preview.js';

export function setupEditor(catalog, save) {
  const sheet = document.getElementById('rv-rec-sheet');
  const { calendar } = catalog;
  let draft;
  let renderedCalendar;
  let month;
  let saving = false;
  const next = get(sheet, 'rec-next');
  const render = () => {
    const editing = Boolean(draft.id);
    const service = catalog.services.find(item => item.id === draft.service);
    const stylist = catalog.stylists.find(item => item.id === draft.stylist);
    sheet.dataset.rvRecMode = editing ? 'edit' : 'new';
    for (const panel of sheet.querySelectorAll('[data-rv-rec-step]')) panel.hidden = editing && panel.dataset.rvRecStep !== '3';
    visible(sheet, 'rec-locked', editing);
    visible(sheet, 'rec-edit-tip', editing);
    visible(sheet, 'rec-delete', editing);
    text(sheet, 'rec-title', editing ? 'ویرایش نوبت ' + faDigits(draft.index) : 'نوبت تازه');
    text(sheet, 'rec-step-text', editing ? longDay(draft.date) + ' · ' + faDigits(draft.time) : 'خدمت، آرایشگر و زمان را انتخاب کنید. می‌توانید تکرارش کنید.');
    text(sheet, 'rec-day-number', editing ? '۱' : '۳');
    if (editing) paintContext(sheet, service, stylist);
    const times = availableTimes(calendar, draft.date);
    visible(sheet, 'rec-time-list', times.length > 0);
    for (const field of sheet.querySelectorAll('input[type="radio"]:not([data-rv-date])')) {
      const key = field.name.slice(4);
      field.checked = String(draft[key]) === field.value;
      if (key === 'stylist') {
        field.closest('label').hidden = Boolean(service && !service.stylists.includes(field.value));
        field.disabled = !service;
      }
      if (key === 'time') {
        field.disabled = !times.includes(field.value);
        field.closest('label').hidden = field.disabled;
      }
    }
    const calendarKey = monthKey(month) + '/' + Boolean(stylist);
    if (calendarKey !== renderedCalendar) {
      renderedCalendar = calendarKey;
      monthGrid(sheet, month, draft.date, {
        start: calendar.start, end: calendar.recurringEnd,
        canPick: date => Boolean(stylist && availableTimes(calendar, date).length),
        dayState: date => calendar.recurringClosed.includes(date) ? 'closed' : date === calendar.start ? 'today' : availableTimes(calendar, date).length ? 'available' : 'outside'
      }, date => {
        draft.date = date;
        draft.time = '';
        render();
      });
    }
    for (const input of sheet.querySelectorAll('[data-rv-date]')) input.checked = input.value === draft.date;
    const ready = Boolean(service && stylist && draft.date && draft.time);
    const dates = ready ? recurringDates(draft, calendar) : [];
    visible(sheet, 'rec-horizon', draft.repeat !== 'once');
    visible(sheet, 'rec-preview-panel', !editing && ready);
    if (!editing && ready) {
      paintRecurringPreview(sheet, draft, calendar, dates, stylist);
    }
    next.disabled = saving || !ready;
    next.textContent = editing ? 'ذخیره تغییرات' : ready ? 'افزودن ' + faDigits(dates.length) + ' نوبت' : 'افزودن نوبت';
  };
  const confirm = async remove => {
    if (saving) return;
    saving = true;
    next.disabled = true;
    get(sheet, 'rec-remove').disabled = true;
    try {
      await save(draft, remove ? [] : draft.id ? [draft.date] : recurringDates(draft, calendar));
      closeSheet();
    } catch (error) {
      text(sheet, 'rec-error', error.message);
      visible(sheet, 'rec-error', true);
    } finally {
      saving = false;
      get(sheet, 'rec-remove').disabled = false;
      render();
    }
  };
  sheet.addEventListener('change', event => {
    if (!event.target.name?.startsWith('rec-') || event.target.hasAttribute('data-rv-date')) return;
    const key = event.target.name.slice(4);
    if (key === 'service') draft.stylist = '';
    if (key === 'service' || key === 'stylist') { draft.date = ''; draft.time = ''; }
    draft[key] = key === 'months' ? Number(event.target.value) : event.target.value;
    render();
  });
  for (const button of sheet.querySelectorAll('[data-rv-month-move]')) {
    button.addEventListener('click', () => { month = adjacentMonth(month, Number(button.dataset.rvMonthMove)); render(); });
  }
  next.addEventListener('click', () => confirm(false));
  get(sheet, 'rec-delete').addEventListener('click', () => { visible(sheet, 'rec-delete-note', true); get(sheet, 'rec-remove').focus(); });
  get(sheet, 'rec-cancel-remove').addEventListener('click', () => { visible(sheet, 'rec-delete-note', false); get(sheet, 'rec-delete').focus(); });
  get(sheet, 'rec-remove').addEventListener('click', () => confirm(true));
  return (item, opener) => {
    draft = { service: '', stylist: '', date: '', time: '', repeat: 'once', months: 1, ...item };
    if (draft.invalid) draft.time = '';
    renderedCalendar = undefined;
    month = draft.date || calendar.start;
    visible(sheet, 'rec-delete-note', false);
    visible(sheet, 'rec-error', false);
    render();
    openSheet(sheet.id, opener);
    sheet.scrollTop = 0;
  };
}
