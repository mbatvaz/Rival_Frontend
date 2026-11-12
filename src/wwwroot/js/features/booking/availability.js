import { plusDays } from './calendar.js';

export const longDay = date => new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  timeZone: 'Asia/Tehran', weekday: 'long', day: 'numeric', month: 'long'
}).format(new Date(date + 'T12:00:00Z'));

export function availability(calendar, useSample) {
  if (useSample) return calendar.days;
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tehran' }).format(new Date());
  const open = calendar.days.filter(day => day.times.length);
  return Array.from({ length: 31 }, (_, index) => {
    const date = plusDays(today, index);
    const closed = new Date(date + 'T12:00:00Z').getUTCDay() === 5;
    return { date, closed, times: closed ? [] : open[index % open.length].times };
  });
}

export function updateQuick(root, days, sample, minuteLabel) {
  const quick = [...root.querySelectorAll('[data-rv-quick-date]')];
  const choices = sample ? days.filter(day => day.label) : days.filter(day => day.times.length);
  quick.forEach((button, index) => {
    const day = choices[index];
    if (!day) { button.closest('label').hidden = true; button.disabled = true; return; }
    button.value = day.date;
    button.dataset.rvQuickDate = day.date;
    button.dataset.rvQuickTime = day.times[0];
    const relative = day.date === days[0].date ? 'امروز' : day.date === days[1].date ? 'فردا' : day.date === days[2].date ? 'پس‌فردا' : 'زمان آزاد';
    button.nextElementSibling.children[0].textContent = relative;
    button.nextElementSibling.children[1].textContent = minuteLabel(day.times[0]);
    button.nextElementSibling.children[2].textContent = longDay(day.date);
  });
}
