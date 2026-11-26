import { faDigits, latinDigits } from '../../core/format.js';
import { basePath } from '../../core/config.js';
import { enterList, motionBatch } from '../../components/entry-motion.js';
import { dayName, dateLabel, get, text, visible } from '../booking/shared.js';
import { minutes, rangeText, duration } from './calendar-data.js';

const dayMonth = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  day: 'numeric', month: 'long', timeZone: 'Asia/Tehran'
});
export const dayLabel = date => dayName(date) + ' ' + dayMonth.format(new Date(date + 'T12:00:00Z'));
export const slotDuration = slot => duration(minutes(slot.end) - minutes(slot.start));
export const dateKey = date => latinDigits(dateLabel(date)).replaceAll('/', '-');
export const releaseLabel = (releaseAt, today) => {
  if (!releaseAt) return 'بدون آزاد شدن خودکار';
  const [date, clock] = releaseAt.split('T');
  return (date === today ? 'امروز' : dayLabel(date)) + '، ' + faDigits(clock);
};

function slotRow(root, calendar, date, slot) {
  const key = ['hold', 'appointment'].includes(slot.kind) ? 'record' : slot.kind;
  const row = root.querySelector(`[data-rv-slot-template="${key}"]`).content.firstElementChild.cloneNode(true);
  row.querySelector('bdi').textContent = faDigits(slot.start);
  const link = get(row, 'slot-link');
  const length = slot.kind === 'end' ? '' : slotDuration(slot);
  if (slot.kind === 'free') {
    const params = new URLSearchParams({ date: dateKey(date), at: slot.start });
    link.search = params.toString();
    link.setAttribute('aria-label', 'رزرو دستی، ' + rangeText(slot.start, slot.end));
    const button = get(row, 'block-create');
    button.dataset.rvBlockCreate = slot.start;
    button.setAttribute('aria-label', 'بستن زمان آزاد ' + faDigits(slot.start) + '، ' + length);
  } else if (slot.kind === 'end') text(row, 'slot-info', slot.name);
  else if (slot.kind === 'block') {
    get(row, 'block-detail').dataset.rvBlockDetail = slot.id;
    text(row, 'slot-name', slot.name);
    text(row, 'slot-info', 'بستن شخصی · ' + length);
    text(row, 'slot-release', 'آزاد برای رزرو از ' + releaseLabel(slot.releaseAt, calendar.today));
    visible(row, 'slot-release', Boolean(slot.releaseAt));
  } else {
    const hold = slot.kind === 'hold';
    if (hold) link.href = basePath() + '_preview/context/sty-04/';
    link.search = new URLSearchParams({ [hold ? 'request' : 'appointment']: slot.id }).toString();
    if (hold) {
      link.classList.replace('rv-glass', 'rv-stylist-slot--hold');
      text(row, 'slot-note', 'پاسخ شما در نگه‌داشت؛ پرداخت تا ' + slot.deadline);
      visible(row, 'slot-note', true);
    }
    text(row, 'slot-avatar', slot.initial);
    text(row, 'slot-name', slot.name);
    text(row, 'slot-info', slot.service + ' · ' + length);
  }
  return row;
}

export function renderAgenda(root, calendar, date, current, animate) {
  const { holiday, weeklyClosed, hours, slots } = calendar.day(date);
  const today = date === calendar.today;
  const count = slots.filter(slot => ['appointment', 'hold'].includes(slot.kind)).length;
  const free = slots.filter(slot => slot.kind === 'free').reduce((total, slot) => total + minutes(slot.end) - minutes(slot.start), 0);
  const badge = holiday ? (hours ? 'پذیرش در تعطیل' : 'تعطیل رسمی') : weeklyClosed ? 'روز تعطیل' : '';
  const closed = holiday ? 'تعطیل رسمی؛ رزرو تازه بسته است' : 'سالن در این روز تعطیل است';
  const summary = count ? faDigits(count) + (today ? ' نوبت پیش رو' : ' نوبت') : 'بدون نوبت';
  text(root, 'calendar-summary', hours ? summary + '، ' + (free ? duration(free) + ' آزاد' : 'بدون زمان آزاد') : closed);
  text(root, 'calendar-heading', (today ? 'امروز، ' : '') + dayLabel(date));
  text(root, 'calendar-day-badge', badge);
  visible(root, 'calendar-day-badge', Boolean(badge));
  const notice = get(root, 'day-holiday');
  const reopen = !notice.hidden && (notice.dataset.rvDay !== date || notice.dataset.rvAccepted !== String(Boolean(hours)));
  notice.dataset.rvDay = date;
  notice.dataset.rvAccepted = String(Boolean(hours));
  notice.hidden = !holiday && !weeklyClosed;
  text(notice, 'holiday-heading', hours ? 'تعطیل رسمی؛ شما ' + rangeText(...hours) + ' پذیرش دارید' : 'سالن در این روز تعطیل است');
  text(notice, 'holiday-copy', hours ? 'مشتری‌ها فقط در همین ساعت‌ها رزرو می‌کنند.' : holiday
    ? 'در تعطیل رسمی رزرو تازه بسته است. اگر این روز کار می‌کنید، برای همین تاریخ پذیرش ثبت کنید.' : '');
  text(notice, 'holiday-open', hours ? 'تغییر ساعت پذیرش' : 'پذیرش در این روز');
  visible(notice, 'holiday-open', holiday);
  visible(root, 'holiday-note', holiday && !hours);
  if (animate && reopen && !notice.hidden) motionBatch(notice, ({ add }) => add(notice, 'right'));
  const empty = !today && !count && Boolean(hours) && !holiday;
  const allFree = empty && slots.every(slot => slot.kind === 'free');
  visible(root, 'day-empty', empty);
  if (empty) {
    const working = 'ساعت کاری شما ' + rangeText(...hours) + ' است';
    text(root, 'day-empty-copy', working + (allFree ? ' و همهٔ آن آزاد است.' : '.'));
  }
  const list = root.querySelector('.rv-stylist-timeline');
  const rows = slots.map(slot => slotRow(root, calendar, date, slot));
  if (today) rows.unshift(current);
  if (hours && !today && (empty || holiday)) rows.push(slotRow(root, calendar, date, {
    kind: 'end', start: hours[1], name: holiday ? 'پایان پذیرش این روز' : 'پایان ساعت کاری'
  }));
  list.replaceChildren(...rows);
  list.hidden = !rows.length;
  list.toggleAttribute('data-rv-calendar-all-day', allFree);
  if (animate && rows.length) enterList(list);
}
