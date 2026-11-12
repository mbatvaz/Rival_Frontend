import { longDay } from './availability.js';
import { dateLabel, dayName, get, centerInRail, text, visible } from './shared.js';

const label = day => dayName(day) + ' ' + dateLabel(day);

export function populateDays(root, days, active, pick) {
  const rail = get(root, 'days');
  rail.replaceChildren(...days.map(day => {
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
    button.addEventListener('click', () => { pick(day.date); centerInRail(rail, button); });
    return button;
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
  visible(root, 'day-note', Boolean(heading));
}
