import { observeCenter } from '../../components/rail.js';
import { availability, longDay, updateQuick } from './availability.js';
import { get, minuteLabel, query, route, state, text, visible, bindForm, centerInRail, submitRequest } from './shared.js';
import { bookingItem, createHold } from './holds.js';
import { setupTimeCalendar } from './time-calendar.js';
import { populateDays, renderDayNote } from './time-day-strip.js';
import { reveal } from './selection-motion.js';

export function initTime(root, context) {
  const { catalog, service, stylist, kind, id } = context;
  const fixed = kind === 'fixed';
  const sample = Boolean(state) || query.get('demo') === 'artboard';
  const days = availability(catalog.calendar, sample);
  updateQuick(root, days, sample, minuteLabel);
  const available = date => days.find(day => day.date === date);
  const entry = query.get('service');
  let selectedDay = available(query.get('date')) ? query.get('date') : (days.slice(2).find(day => day.times.length) ?? days[0]).date;
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
  visible(root, 'availability', !none);
  visible(root, 'no-availability', none);
  visible(root, 'picked-day', !none);
  visible(root, 'sms-entry', fixed && state === 'sms');
  if (none) {
    text(root, 'action-title', 'زمانی آزاد نیست');
    text(root, 'no-availability-title', stylist.name + ' تا یک ماه آینده زمان آزادی ندارد');
    text(root, 'no-availability-detail', 'با آزاد شدن اولین زمان، پیامک می‌گیرید. پس از پیامک می‌توانید نوبت بگیرید.');
    visible(form, 'booking-submit', false);
  }
  let selection = '';
  let markDesktopDay;
  let painted = false;
  const quickChoices = [...root.querySelectorAll('[data-rv-quick-date]')];
  const pick = (date, value = '', quick = null) => {
    const changed = selectedDay !== date || !painted;
    painted = true;
    selectedDay = date;
    const day = available(date);
    const conflict = fixed && state === 'conflict' && date === '2026-10-15';
    const taken = fixed && state === 'taken' && date === '2026-10-15';
    renderDayNote(root, day, conflict, taken);
    visible(root, 'picks', !none && !day?.closed && !day?.opens);
    text(root, 'picked-day', date ? longDay(date) : 'روز را انتخاب کنید');
    for (const input of inputs) {
      input.disabled = !day || day.closed || Boolean(day.opens) || (fixed && !day.times.includes(input.value))
        || ((conflict || taken) && input.value === '16:00');
      if (fixed) input.closest('label').hidden = Boolean(day && !day.closed && !day.opens && input.disabled);
      input.checked = !input.disabled && input.value === value;
    }
    if (changed) reveal(inputs.map(input => input.closest('label')).filter(label => !label.hidden));
    selection = inputs.find(input => input.checked)?.value ?? '';
    quickChoices.forEach(input => { input.checked = input === quick && Boolean(selection); });
    submit.disabled = !selection || none;
    if (!none) text(root, 'action-title', selection ? longDay(date) + (fixed ? '، ' + minuteLabel(selection) : '') : 'زمانی انتخاب نشده');
    text(root, 'action-sub', none ? 'اعلان تا ۶ روز فعال می‌ماند' : selection && !fixed ? selection + '، بدون پرداخت' : '');
    const buttons = [...get(root, 'days').querySelectorAll('[data-rv-day]')];
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(days[index].date === date)));
    markDesktopDay?.(none ? '' : date);
  };
  populateDays(root, days, selectedDay, pick);
  markDesktopDay = setupTimeCalendar(root, days, none ? '' : selectedDay, pick, none);
  const preselect = !entry && !['range', 'conflict', 'taken', 'none'].includes(state);
  const previousTime = fixed && query.get('time');
  pick(selectedDay, previousTime || (preselect ? fixed ? '16:00' : 'صبح' : ''));
  const rail = get(root, 'days');
  const align = () => centerInRail(rail, rail.querySelector('[data-rv-day="' + selectedDay + '"]'));
  observeCenter(rail, () => rail.querySelectorAll('[data-rv-day]'), item => {
    if (!none && item.dataset.rvDay !== selectedDay) pick(item.dataset.rvDay);
  });
  const desktop = window.matchMedia('(min-width: 1024px)');
  const alert = root.querySelector('[data-rv-sheet-open="rv-booking-alert"]');
  const origin = alert?.parentElement;
  const layout = () => {
    align();
    if (!alert) return;
    (none ? get(root, 'empty-alert') : desktop.matches ? get(root, 'desktop-alert') : origin).append(alert);
    if (none) alert.classList.add('rv-btn');
  };
  layout();
  desktop.addEventListener('change', layout);
  form.addEventListener('change', event => {
    if (event.target.name === field) pick(selectedDay, event.target.value);
  });
  for (const input of quickChoices) {
    input.addEventListener('change', () => {
      pick(input.dataset.rvQuickDate, input.dataset.rvQuickTime, input);
      align();
    });
  }
  bindForm(root, async () => {
    if (fixed) {
      const hold = await createHold([bookingItem(service, stylist, selectedDay, selection)], catalog);
      window.location.assign(route('BK-F02', { hold: hold.id, service: service.id, stylist: stylist.id, date: selectedDay, demo: query.get('demo') }));
      return;
    }
    await submitRequest({ type: 'proposed', service: service.id, stylist: stylist.id, date: selectedDay, part: selection });
  });
  if (fixed) return import('./alert.js').then(module => module.initAlert(root, { ...context, open: id === 'BK-ALERT01' }));
}
