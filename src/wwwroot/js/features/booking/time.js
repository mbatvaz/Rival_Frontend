import { dayName, dateLabel, get, minuteLabel, query, route, state, text, visible, bindForm, centerInRail, submitRequest } from './shared.js';
import { bookingItem, createHold } from './holds.js';
import { setupTimeCalendar } from './time-calendar.js';

const label = day => dayName(day) + ' ' + dateLabel(day);

function populateDays(root, days, active, pick) {
  const rail = get(root, 'days');
  rail.replaceChildren(...days.map(day => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'rv-booking-day';
    button.textContent = dayName(day.date).slice(0, 1) + ' ' + dateLabel(day.date).split('/').at(-1);
    button.setAttribute('aria-label', button.textContent + ' (' + label(day.date) + ')');
    button.setAttribute('aria-pressed', String(day.date === active));
    if (day.closed || day.opens) button.dataset.rvClosed = 'true';
    button.addEventListener('click', () => pick(day.date));
    return button;
  }));
}

export function initTime(root, context) {
  const { catalog, service, stylist, kind, id } = context;
  const fixed = kind === 'fixed';
  const days = catalog.calendar.days;
  const available = date => days.find(day => day.date === date);
  const entry = query.get('service');
  let selectedDay = available(query.get('date')) ? query.get('date') : '2026-10-15';
  const form = get(root, 'booking-form');
  const field = fixed ? 'time' : 'part';
  const inputs = [...form.querySelectorAll('input[name="' + field + '"]')];
  const submit = get(form, 'booking-submit');
  if (state === 'closed') selectedDay = days.find(day => day.closed).date;
  if (state === 'not-yet') selectedDay = days.find(day => day.opens).date;
  if (state === 'range') selectedDay = '';
  if (state === 'sms') selectedDay = '2026-10-15';
  const none = fixed && state === 'none';
  visible(root, 'soon', !none && state !== 'sms');
  visible(root, 'day-section', !none);
  visible(root, 'picked-day', !none);
  get(root, 'availability').dataset.rvNoTimes = String(none);
  visible(root, 'sms-entry', fixed && state === 'sms');
  if (none) text(root, 'action-title', stylist.name + ' تا یک ماه آینده زمان آزادی ندارد.');
  let selection = '';
  let markDesktopDay;
  const pick = (date, value = '') => {
    selectedDay = date;
    const day = available(date);
    const conflict = fixed && state === 'conflict' && date === '2026-10-15';
    const taken = fixed && state === 'taken' && date === '2026-10-15';
    const note = day?.closed ? 'این روز بسته است.' : day?.opens ? 'این روز از ' + day.opens + ' برای رزرو باز می‌شود.'
      : conflict ? 'ساعت ۱۶:۰۰ با نوبت دیگر شما تداخل دارد.' : taken ? 'ساعت ۱۶:۰۰ همین حالا گرفته شد.' : '';
    text(root, 'day-note', note);
    visible(root, 'day-note', Boolean(note));
    visible(root, 'picks', !none && !day?.closed && !day?.opens);
    text(root, 'picked-day', date ? label(date) : 'روز را انتخاب کنید');
    for (const input of inputs) {
      input.disabled = !day || day.closed || Boolean(day.opens) || (fixed && !day.times.includes(input.value))
        || ((conflict || taken) && input.value === '16:00');
      input.checked = !input.disabled && input.value === value;
    }
    selection = inputs.find(input => input.checked)?.value ?? '';
    submit.disabled = !selection || none;
    if (!none) text(root, 'action-title', date ? label(date) : 'روز و بخش روز را انتخاب کنید');
    text(root, 'action-sub', selection ? fixed ? minuteLabel(selection) + ' · با ' + stylist.name : selection + '، بدون پرداخت' : '');
    const buttons = [...get(root, 'days').children];
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(days[index].date === date)));
    markDesktopDay?.(date);
  };
  populateDays(root, days, selectedDay, pick);
  markDesktopDay = setupTimeCalendar(root, days, selectedDay, pick);
  const preselect = !entry && !['range', 'conflict', 'taken', 'none'].includes(state);
  const previousTime = fixed && query.get('time');
  pick(selectedDay, previousTime || (preselect ? fixed ? '16:00' : 'صبح' : ''));
  const rail = get(root, 'days');
  centerInRail(rail, rail.children[days.findIndex(day => day.date === selectedDay)]);
  form.addEventListener('change', event => {
    if (event.target.name === field) pick(selectedDay, event.target.value);
  });
  for (const button of root.querySelectorAll('[data-rv-quick-date]')) {
    button.addEventListener('click', () => pick(button.dataset.rvQuickDate, button.dataset.rvQuickTime));
  }
  bindForm(root, async () => {
    if (fixed) {
      const hold = await createHold([bookingItem(service, stylist, selectedDay, selection)], catalog);
      window.location.assign(route('BK-F02', { hold: hold.id, service: service.id, stylist: stylist.id, date: selectedDay }));
      return;
    }
    await submitRequest({ type: 'proposed', service: service.id, stylist: stylist.id, date: selectedDay, part: selection });
  });
  if (fixed) return import('./alert.js').then(module => module.initAlert(root, { ...context, open: id === 'BK-ALERT01' }));
}
