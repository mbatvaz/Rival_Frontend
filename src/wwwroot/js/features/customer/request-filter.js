import { closeSheet, openSheet } from '../../components/sheet.js';
import { faDigits, jalali } from '../../core/format.js';
import { plusDays } from '../booking/calendar.js';
import { salonDay } from '../../core/appointment-swap-rules.js';
import { dateInstant, initCalendarSheet } from './appointment-date-picker.js';
import { digits, parseDate } from './appointment-filters.js';
import { requestGroup, requestStatus } from './request-state.js';

const filterKeys = ['range', 'from', 'to', 'status', 'service', 'stylist'];
const shortDate = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long', timeZone: 'Asia/Tehran' });
const label = date => shortDate.format(new Date(date + 'T12:00:00Z'));
function preset(range, today) {
  const [year, month, day] = digits(jalali(today + 'T12:00:00Z')).split('/').map(Number);
  if (range === 'year') return year + '/01/01';
  if (range === '30d') return digits(jalali(plusDays(today, -30) + 'T12:00:00Z'));
  const targetYear = month > 3 ? year : year - 1;
  const targetMonth = String((month + 8) % 12 + 1).padStart(2, '0');
  const result = targetYear + '/' + targetMonth + '/';
  for (let candidate = day; candidate > 0; candidate--) {
    const value = result + String(candidate).padStart(2, '0');
    if (dateInstant(value)) return value;
  }
  return '';
}
export function requestFilter(query, current, apply) {
  const form = document.querySelector('#rv-request-filter-form');
  const calendar = document.querySelector('#rv-appointment-date');
  const { from, to } = form.elements;
  const fromButton = form.querySelector('[data-rv-request-from]');
  const toButton = form.querySelector('[data-rv-request-to]');
  const submit = form.querySelector('[data-rv-request-filter-submit]');
  const opener = document.querySelector('[data-rv-sheet-open="rv-request-filter"]');
  const today = () => query.get('state') === 'filter' ? '2026-10-14' : salonDay();
  const values = () => new FormData(form);
  let activeField = from;
  const openPicker = initCalendarSheet(calendar, () => ({
    start: '1921-03-21', end: today(), canPick: date => date <= today()
  }), date => {
    activeField.value = digits(jalali(date + 'T12:00:00Z'));
    if (activeField === from) form.elements.namedItem('range').value = 'custom';
    update();
  });
  function update() {
    const first = dateInstant(from.value);
    const last = dateInstant(to.value);
    fromButton.querySelector('strong').textContent = first ? label(first) : 'همه تاریخ‌ها';
    toButton.querySelector('strong').textContent = last ? label(last) : 'امروز';
    const { active, records } = current();
    const filtered = values();
    const count = records.filter(record => {
      const status = requestStatus(record);
      return requestGroup(status) === active && matchesRequest(filtered, record, status, today());
    }).length;
    submit.textContent = 'نمایش ' + faDigits(count) + ' درخواست';
  }
  function fill() {
    const { active } = current();
    const statuses = form.querySelector('[data-rv-request-status-filter]');
    statuses.hidden = statuses.disabled = active !== 'done';
    document.querySelector('#rv-request-filter-title').textContent =
      active === 'done' ? 'فیلتر درخواست‌های تکمیل‌شده' : 'فیلتر درخواست‌ها';
    form.reset();
    for (const item of form.querySelectorAll('input')) {
      if (item === from || item === to) item.value = parseDate(query.get(item.name) ?? '') ?? '';
      else if (item.value) item.checked = query.getAll(item.name).includes(item.value);
    }
    if (query.get('state') === 'filter') {
      form.querySelector('[name="status"][value="booked"]').checked = true;
      form.elements.namedItem('range').value = '3m';
      from.value = '1405/04/23';
    }
    update();
  }
  for (const [button, field] of [[fromButton, from], [toButton, to]]) {
    button.addEventListener('click', () => {
      activeField = field;
      openPicker(button, dateInstant(field.value), today());
    });
  }
  form.addEventListener('change', event => {
    if (event.target.name === 'range') {
      if (event.target.value === 'custom') openPicker(event.target, dateInstant(from.value), today());
      else from.value = preset(event.target.value, today());
    }
    update();
  });
  document.querySelector('[data-rv-request-filter-reset]').addEventListener('click', () => {
    form.reset();
    from.value = '';
    to.value = '';
    update();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    for (const key of filterKeys) query.delete(key);
    if (query.get('state') === 'filter') query.delete('state');
    const choice = values();
    if (!dateInstant(from.value)) ['from', 'range'].forEach(key => choice.delete(key));
    if (!dateInstant(to.value)) choice.delete('to');
    for (const [key, value] of choice) if (value) query.append(key, value);
    apply();
    await closeSheet();
  });
  opener.addEventListener('click', fill);
  return () => {
    if (query.get('state') !== 'filter') return;
    fill();
    openSheet('rv-request-filter', opener);
  };
}
export function matchesRequest(query, record, status, until = salonDay()) {
  const statuses = query.getAll('status');
  const from = parseDate(query.get('from') ?? '');
  const to = parseDate(query.get('to') ?? '');
  const upper = to || digits(jalali(until + 'T12:00:00Z'));
  return (!statuses.length || requestGroup(status) !== 'done' || statuses.includes(status)) &&
    (!from || Boolean(record.date && record.date >= from && record.date <= upper)) &&
    (!query.get('service') || query.get('service') === record.service) &&
    (!query.get('stylist') || [record.stylist, ...(record.schedule ?? []).map(slot => slot.stylist)].includes(query.get('stylist')));
}
