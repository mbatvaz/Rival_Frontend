import { faDigits, latinDigits } from '../../core/format.js';
import { dayLabel } from './calendar-view.js';
import { dateLabel, faDay, text } from '../booking/shared.js';
import { plusDays } from '../booking/calendar.js';
import { weekday } from './calendar-data.js';

const month = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'long', timeZone: 'Asia/Tehran' });
const monthHeading = date => month.format(new Date(date + 'T12:00:00Z')) + ' ' + dateLabel(date).split('/')[0];
export const firstOfWeek = date => plusDays(date, -weekday(date));

export function renderWeek(root, calendar, week, selected) {
  const strip = root.querySelector('.rv-stylist-week__days');
  const last = plusDays(week, 6);
  text(root, 'week-month', monthHeading(week === firstOfWeek(selected) ? selected : week));
  strip.replaceChildren(...[...'شیدسچپج'].map((letter, index) => {
    const date = plusDays(week, index);
    const item = document.createElement('li');
    const button = document.createElement('button');
    const short = document.createElement('small');
    const number = document.createElement('bdi');
    button.type = 'button';
    button.dataset.rvSelectDate = date;
    button.disabled = date < calendar.today || date > calendar.last;
    button.setAttribute('aria-pressed', date === selected ? 'true' : 'false');
    const holiday = calendar.holidays.includes(date);
    const state = date < calendar.today ? 'past' : holiday || index === 6 ? 'holiday' : '';
    if (state) button.dataset.rvCalendarDay = state;
    if (date === calendar.today) button.setAttribute('aria-current', 'date');
    const suffix = date === calendar.today ? '، امروز' : state === 'past' ? '، گذشته' : holiday ? '، تعطیل رسمی' : '';
    button.setAttribute('aria-label', dayLabel(date) + suffix);
    short.textContent = letter;
    number.textContent = faDigits(Number(latinDigits(faDay(date))));
    button.append(short, number);
    item.append(button);
    return item;
  }));
  root.querySelector('[data-rv-week-move="-1"]').disabled = week <= firstOfWeek(calendar.today);
  root.querySelector('[data-rv-week-move="1"]').disabled = last >= calendar.last;
}
