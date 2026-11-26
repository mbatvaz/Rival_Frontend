import { initCalendarSheet } from '../booking/calendar-sheet.js';
import { jalali, jalaliToIsoDate } from '../../core/format.js';

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
    openCalendar(button, jalaliToIsoDate(form.elements[field].value), jalaliToIsoDate(today));
  };
  for (const button of form.querySelectorAll('[data-rv-date-open]')) button.addEventListener('click', () => open(button));
  for (const wrapper of form.querySelectorAll('[data-rv-date-field]')) wrapper.addEventListener('click', event => {
    if (event.target.closest('[data-rv-date-open]')) return;
    open(wrapper.querySelector('[data-rv-date-open]'));
  });
}
