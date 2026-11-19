import { openSheet, closeSheet } from '../../components/sheet.js';
import { defaults, matches, parseDate, fa } from './appointment-filters.js';
import { faDigits } from '../../core/format.js';
import { initDatePicker, dateInstant } from './appointment-date-picker.js';

export function initFilterSheet(root, data, current, apply) {
  const sheet = document.getElementById('rv-appointments-filter');
  const form = sheet.querySelector('form');
  const error = sheet.querySelector('#rv-boundary-error');
  const submit = form.querySelector('[data-rv-filter-submit]');
  const multi = ['status', 'service', 'stylist'];
  const values = () => {
    const fields = new FormData(form);
    return { range: fields.get('range'), from: fields.get('from'), to: fields.get('to'), ...Object.fromEntries(multi.map(key => [key, fields.getAll(key)])) };
  };
  function count() {
    const records = data.groups.find(group => group.key === current().tab).months.flatMap(month => month.items);
    submit.textContent = 'نمایش ' + fa(records.filter(record => matches(record, values())).length) + ' نوبت';
  }
  function fill(filters) {
    form.reset();
    for (const [key, value] of Object.entries(filters)) {
      if (multi.includes(key)) {
        const selected = new Set(Array.isArray(value) ? value : [value]);
        for (const input of form.querySelectorAll(`[name="${key}"]`)) input.checked = selected.has(input.value);
      } else form.elements[key].value = ['from', 'to'].includes(key) ? faDigits(value) : value;
    }
    form.elements.tab.value = current().tab;
    error.hidden = true;
    for (const key of ['from', 'to']) form.elements[key].removeAttribute('aria-invalid');
    count();
  }
  const open = () => {
    const state = new URLSearchParams(location.search).get('state');
    fill(['filter', 'filter-past'].includes(state) ? { ...current().filters, ...data.filters.example } : current().filters);
    openSheet(sheet.id, root.querySelector('[data-rv-appointments-filter]'));
  };
  root.querySelector('[data-rv-appointments-filter]').addEventListener('click', open);
  sheet.querySelector('[data-rv-filter-reset]').addEventListener('click', () => {
    const filters = defaults();
    apply(filters);
    fill(filters);
  });
  form.addEventListener('change', event => {
    if (event.target.name === 'range') {
      const dates = data.filters.boundaries[form.elements.range.value] ?? { from: '', to: '' };
      for (const key of ['from', 'to']) form.elements[key].value = faDigits(dates[key]);
    }
    if (multi.includes(event.target.name)) {
      const inputs = [...form.querySelectorAll(`[name="${event.target.name}"]`)];
      const all = inputs.find(input => input.value === 'all');
      if (event.target === all && all.checked) inputs.forEach(input => { if (input !== all) input.checked = false; });
      else if (event.target.checked) all.checked = false;
      if (!inputs.some(input => input.checked)) all.checked = true;
    }
    count();
  });
  form.addEventListener('input', event => {
    if (['from', 'to'].includes(event.target.name)) form.elements.range.value = 'custom';
    count();
  });
  const rail = sheet.querySelector('[data-rv-drag-rail]');
  rail.addEventListener('focusin', event => event.target.closest('label')?.scrollIntoView({ block: 'nearest', inline: 'nearest' }));
  rail.addEventListener('keydown', event => {
    if (event.target !== rail || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home' || event.key === 'End') rail.scrollLeft = event.key === 'Home' ? 0 : -rail.scrollWidth;
    else rail.scrollBy({ left: (event.key === 'ArrowLeft' ? -1 : 1) * rail.clientWidth / 2 });
  });
  initDatePicker(form, data.today);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const filters = values();
    for (const key of ['from', 'to']) {
      const valid = !filters[key] || dateInstant(filters[key]);
      form.elements[key].setAttribute('aria-invalid', String(!valid));
      if (!valid) {
        error.textContent = 'تاریخ شمسی معتبر وارد کنید؛ مانند ۱۴۰۵/۰۷/۲۲.';
        error.hidden = false; form.elements[key].focus(); return;
      }
      filters[key] = parseDate(filters[key]) ?? '';
    }
    if (filters.from && filters.to && filters.from > filters.to) {
      error.textContent = 'تاریخ پایان باید برابر یا پس از تاریخ شروع باشد.';
      error.hidden = false; form.elements.to.setAttribute('aria-invalid', 'true'); form.elements.to.focus(); return;
    }
    apply(filters);
    await closeSheet();
  });
  return open;
}
