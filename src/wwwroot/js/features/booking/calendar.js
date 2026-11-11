import { dateLabel, dayName, faDay, get, text } from './shared.js';

const instant = date => new Date(date + 'T12:00:00Z');
const persian = new Intl.DateTimeFormat('en-US-u-ca-persian', {
  year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'Asia/Tehran'
});
const monthTitle = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  year: 'numeric', month: 'long', timeZone: 'Asia/Tehran'
});
export const plusDays = (date, count) => {
  const day = instant(date);
  day.setUTCDate(day.getUTCDate() + count);
  return day.toISOString().slice(0, 10);
};
const parts = date => Object.fromEntries(persian.formatToParts(instant(date)).map(part => [part.type, Number(part.value)]));
export const monthKey = date => dateLabel(date).slice(0, 7);
export const monthLabel = date => monthTitle.format(instant(date));

export function plusMonths(date, count) {
  const original = parts(date);
  const target = original.year * 12 + original.month + count;
  let candidate = date;
  let last = date;
  while (true) {
    candidate = plusDays(candidate, 1);
    const current = parts(candidate);
    const index = current.year * 12 + current.month;
    if (index > target) return last;
    if (index === target && current.day === original.day) return candidate;
    last = candidate;
  }
}

export function adjacentMonth(date, direction) {
  const first = plusDays(date, 1 - parts(date).day);
  return direction < 0 ? plusDays(first, -1) : plusMonths(first, 1);
}

export function availableTimes(calendar, date) {
  if (!date || date < calendar.start || date > calendar.recurringEnd || calendar.recurringClosed.includes(date)) return [];
  return calendar.days.find(day => day.date === date)?.times ?? calendar.recurringTimes;
}

export function monthGrid(root, month, selected, { start, end, canPick, closed }, select) {
  const grid = get(root, 'month-grid');
  const first = plusDays(month, 1 - parts(month).day);
  const offset = (instant(first).getUTCDay() + 1) % 7;
  const week = [...'شیدسچپج'].map(label => {
    const span = document.createElement('span');
    span.textContent = label;
    span.setAttribute('aria-hidden', 'true');
    return span;
  });
  const nodes = [...week, ...Array.from({ length: offset }, () => document.createElement('span'))];
  for (let date = first; monthKey(date) === monthKey(first); date = plusDays(date, 1)) {
    const current = date;
    const day = document.createElement('button');
    day.className = 'rv-booking-day';
    day.type = 'button';
    day.textContent = faDay(date);
    day.disabled = !canPick(date);
    day.dataset.rvDate = date;
    if (closed?.(date)) day.dataset.rvClosed = 'true';
    day.setAttribute('aria-label', dayName(date) + ' ' + dateLabel(date));
    day.setAttribute('aria-pressed', String(selected === date));
    day.addEventListener('click', () => select(current));
    nodes.push(day);
  }
  grid.replaceChildren(...nodes);
  text(root, 'month-title', monthLabel(month));
  const previous = root.querySelector('[data-rv-month-move="-1"]');
  const next = root.querySelector('[data-rv-month-move="1"]');
  previous.disabled = monthKey(month) <= monthKey(start);
  next.disabled = monthKey(month) >= monthKey(end);
}
