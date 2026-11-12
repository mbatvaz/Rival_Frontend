import { faDigits } from '../../core/format.js';
import { get, text, faDay } from './shared.js';
import { longDay } from './availability.js';
import { availableTimes, monthLabel, plusDays, plusMonths } from './calendar.js';

export function recurringDates(draft, calendar) {
  const dates = [draft.date];
  if (draft.repeat === 'once') return dates;
  const end = [calendar.recurringEnd, plusMonths(draft.date, draft.months)].sort()[0];
  for (let index = 1; ; index++) {
    const date = draft.repeat === 'month' ? plusMonths(draft.date, index) : plusDays(draft.date, index * Number(draft.repeat));
    if (date > end) break;
    dates.push(date);
  }
  return dates;
}

export function paintRecurringPreview(sheet, draft, calendar, dates, stylist) {
  text(sheet, 'rec-preview-title', faDigits(dates.length) + ' نوبت ساخته می‌شود');
  text(sheet, 'rec-preview-caption', longDay(draft.date) + '، ساعت ' + faDigits(draft.time) + ' · با ' + stylist.name);
  get(sheet, 'rec-preview').replaceChildren(...dates.map(date => {
    const item = document.createElement('li');
    item.dataset.rvInvalid = String(!availableTimes(calendar, date).includes(draft.time));
    const day = document.createElement('strong');
    day.textContent = faDay(date).replace(/^۰/, '');
    const month = document.createElement('span');
    month.textContent = monthLabel(date).replace(/\s+[۰-۹]+$/, '');
    item.append(day, month);
    item.title = longDay(date);
    return item;
  }));
}
