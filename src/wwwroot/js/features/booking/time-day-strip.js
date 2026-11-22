import { monthKey, monthLabel } from './calendar.js';
import { longDay } from './availability.js';
import { dateLabel, dayName, get, centerInRail, text, visible } from './shared.js';

const label = day => dayName(day) + ' ' + dateLabel(day);

export function populateDays(root, days, active, pick, immediate = false) {
  const rail = get(root, 'days');
  rail.replaceChildren(...days.flatMap((day, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'rv-booking-day';
    const weekday = document.createElement('span');
    const dayNumber = document.createElement('strong');
    weekday.textContent = dayName(day.date).slice(0, 1);
    dayNumber.textContent = dateLabel(day.date).split('/').at(-1);
    button.append(weekday, dayNumber);
    button.dataset.rvDay = day.date;
    if (day === days[0]) button.dataset.rvToday = 'true';
    button.setAttribute('aria-label', button.textContent + ' (' + label(day.date) + ')');
    button.setAttribute('aria-pressed', String(day.date === active));
    if (day.closed || day.opens) button.dataset.rvDayState = day.closed ? 'closed' : 'pending';
    if (day.opens) {
      const lock = document.createElement('span');
      lock.className = 'ri ri-lock';
      lock.setAttribute('aria-hidden', 'true');
      button.append(lock);
    }
    button.addEventListener('click', event => {
      if (immediate) { pick(day.date); return; }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      centerInRail(rail, button, reduced ? 'instant' : 'smooth');
      if (!event.detail) pick(day.date);
    });
    if (!index || monthKey(days[index - 1].date) === monthKey(day.date)) return [button];
    const divider = document.createElement('span');
    divider.className = 'rv-day-strip__month';
    divider.textContent = monthLabel(day.date).replace(/[۰-۹]/g, '').trim();
    return [divider, button];
  }));
}

export function renderDayNote(root, day, conflict, taken) {
  let badge = '';
  let heading = '';
  let description = '';
  if (day?.closed) {
    badge = 'تعطیل';
    heading = longDay(day.date) + ' سالن تعطیل است';
    description = 'سالن جمعه‌ها و روزهای تعطیل رسمی باز نیست.';
  } else if (day?.opens) {
    badge = 'هنوز باز نشده';
    heading = 'زمان‌های ' + longDay(day.date) + ' هنوز باز نشده';
    description = 'رزرو این روز از ' + day.opens + ' باز می‌شود. تا آن موقع می‌توانید روز دیگری انتخاب کنید.';
  } else if (conflict || taken) {
    heading = conflict ? 'ساعت ۱۶:۰۰ با نوبت دیگر شما تداخل دارد' : 'ساعت ۱۶:۰۰ همین الان گرفته شد';
    description = 'زمان‌ها دوباره بررسی شدند. یک زمان دیگر انتخاب کنید.';
  }
  get(root, 'day-note').dataset.rvTone = conflict || taken ? 'danger' : 'neutral';
  get(root, 'day-icon').className = day?.closed ? 'ri ri-moon' : 'ri ri-lock';
  text(root, 'day-status', badge);
  visible(root, 'day-badge', Boolean(badge));
  text(root, 'day-heading', heading);
  text(root, 'day-description', description);
  visible(root, 'day-note', Boolean(heading) && !conflict && !taken);
  text(root, 'selection-warning', conflict || taken ? heading : '');
  visible(root, 'selection-warning', conflict || taken);
}
