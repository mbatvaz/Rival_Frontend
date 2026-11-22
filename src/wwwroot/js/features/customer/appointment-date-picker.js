import { adjacentMonth, monthGrid, plusDays } from '../booking/calendar.js';
import { jalali } from '../../core/format.js';
import { digits, parseDate } from './appointment-filters.js';
import { openSheet, closeSheet } from '../../components/sheet.js';
import { salonDay, validSwapDay } from '../../core/appointment-swap-rules.js';

// Convert a user-entered Jalali date using the browser's Persian calendar.
export function dateInstant(value) {
  const date = parseDate(value);
  if (!date) return null;
  const [year, month, day] = date.split('/').map(Number);
  const offset = month <= 7 ? (month - 1) * 31 : 186 + (month - 7) * 30;
  const estimate = new Date(Date.UTC(year + 621, 2, 20 + offset + day - 1)).toISOString().slice(0, 10);
  for (let delta = -3; delta <= 3; delta++) {
    const candidate = plusDays(estimate, delta);
    if (digits(jalali(candidate + 'T12:00:00Z')) === date) return candidate;
  }
  return null;
}

export function initCalendarSheet(root, bounds, pick) {
  let month, selected;
  const render = () => monthGrid(root, month, selected, bounds(), async date => {
    pick(date);
    await closeSheet();
  });
  root.querySelectorAll('[data-rv-month-move]').forEach(button => button.addEventListener('click', () => {
    month = adjacentMonth(month, Number(button.dataset.rvMonthMove)); render();
    if (button.disabled) root.querySelector('input:enabled')?.focus();
  }));
  return (button, date, fallback) => {
    selected = date;
    month = date || fallback;
    render();
    openSheet(root.id, button, { preserveParent: true });
  };
}

export function initFutureDatePicker(root, pick) {
  const tomorrow = () => plusDays(salonDay(), 1);
  const open = initCalendarSheet(root, () => ({
    start: tomorrow(), end: '2122-03-20', canPick: validSwapDay
  }), pick);
  return (button, selected) => open(button, selected, tomorrow());
}

export function initDatePicker(form, today) {
  const root = document.getElementById('rv-appointment-date');
  let field;
  const openCalendar = initCalendarSheet(root, () => ({
    start: '1921-03-21', end: '2122-03-20', canPick: () => true
  }), date => {
    form.elements[field].value = jalali(date + 'T12:00:00Z');
    form.elements[field].dispatchEvent(new window.Event('input', { bubbles: true }));
  });
  const open = button => {
    field = button.dataset.rvDateOpen;
    root.querySelector('h2').textContent = field === 'from' ? 'انتخاب از تاریخ' : 'انتخاب تا تاریخ';
    openCalendar(button, dateInstant(form.elements[field].value), dateInstant(today));
  };
  for (const button of form.querySelectorAll('[data-rv-date-open]')) button.addEventListener('click', () => open(button));
  for (const wrapper of form.querySelectorAll('[data-rv-date-field]')) wrapper.addEventListener('click', event => {
    if (event.target.closest('[data-rv-date-open]')) return;
    open(wrapper.querySelector('[data-rv-date-open]'));
  });
}
