import { initCalendarSheet } from '../booking/calendar-sheet.js';
import { plusDays } from '../booking/calendar.js';
import { get, query, text } from '../booking/shared.js';
import { jalaliToIsoDate } from '../../core/format.js';
import { openSheet } from '../../components/sheet.js';
import { loadCalendar, releaseInstant } from './calendar-data.js';
import { dayLabel, renderAgenda } from './calendar-view.js';
import { firstOfWeek, renderWeek } from './calendar-week.js';
import { bindSave, initBlockSheets } from './calendar-forms.js';

function initHolidaySheet(calendar, refresh) {
  const holiday = document.getElementById('rv-stylist-holiday');
  const form = holiday.querySelector('form');
  let date;
  bindSave(form, 'submit', form, () => calendar.acceptHoliday(
    date, form.elements.start.value, form.elements.end.value
  ), refresh);
  return (button, selected, hours) => {
    date = selected;
    text(holiday, 'holiday-date', dayLabel(date));
    text(form, 'form-error', '');
    [form.elements.start.value, form.elements.end.value] = hours ?? calendar.acceptanceHours;
    openSheet(holiday.id, button);
  };
}

export async function init(root) {
  const state = query.get('state');
  let calendar;
  try { calendar = await loadCalendar(state); }
  catch {
    text(root, 'calendar-error', 'برنامهٔ تقویم در دسترس نیست. صفحه را دوباره بارگذاری کنید.');
    return;
  }
  const { today, last, holidays } = calendar;
  const current = root.querySelector('.rv-stylist-timeline > li:first-child');
  const monthButton = get(root, 'calendar-month');
  const heading = get(root, 'calendar-heading');
  const requested = jalaliToIsoDate((query.get('date') ?? '').replaceAll('-', '/'));
  const previewDate = state === 'empty' ? plusDays(today, 4) : state?.startsWith('holiday') ? holidays[0] : today;
  const canPick = date => date >= today && date <= last;
  let selected = canPick(requested) ? requested : previewDate;
  let week = firstOfWeek(selected);
  let timer;
  function render(animate = false) {
    renderWeek(root, calendar, week, selected);
    renderAgenda(root, calendar, selected, current, animate);
    window.clearTimeout(timer);
    const releaseTimes = calendar.day(selected).occupied.filter(slot => slot.releaseAt)
      .map(slot => releaseInstant(slot.releaseAt) - calendar.now());
    if (releaseTimes.length) timer = window.setTimeout(() => render(), Math.min(...releaseTimes, 2147483646) + 1);
  }
  const pick = (date, focusDay = false) => {
    selected = date;
    week = firstOfWeek(date);
    render(true);
    if (focusDay) root.querySelector(`[data-rv-select-date="${date}"]`)?.focus();
  };
  const monthSheet = document.getElementById('rv-stylist-month');
  const openMonth = initCalendarSheet(monthSheet, () => ({
    start: today, end: last, canPick,
    dayState: date => !canPick(date) ? 'outside' : holidays.includes(date) ? 'closed' : 'available'
  }), date => document.addEventListener('rv:sheet-close', () => pick(date), { once: true }));
  const refresh = () => {
    render(true);
    if (!root.closest('[inert]')) heading.focus({ preventScroll: true });
  };
  const blocks = initBlockSheets(calendar, refresh);
  const openHoliday = initHolidaySheet(calendar, refresh);
  monthButton.disabled = false;
  monthButton.addEventListener('click', () => openMonth(monthButton, week === firstOfWeek(selected) ? selected : week, today));
  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    const { rvSelectDate, rvWeekMove, rvBlockCreate, rvBlockDetail } = button.dataset;
    if (rvSelectDate) pick(rvSelectDate, true);
    if (rvWeekMove) {
      week = plusDays(week, Number(rvWeekMove) * 7);
      renderWeek(root, calendar, week, selected);
      if (button.disabled) monthButton.focus();
    }
    const { slots, hours } = calendar.day(selected);
    if (rvBlockCreate) {
      const slot = slots.find(slot => slot.kind === 'free' && slot.start === rvBlockCreate);
      if (slot) blocks.openEditor(button, selected, slot);
    }
    if (rvBlockDetail) {
      const slot = slots.find(slot => slot.kind === 'block' && slot.id === rvBlockDetail);
      if (slot) blocks.openDetail(button, selected, slot);
    }
    if (button.hasAttribute('data-rv-holiday-open')) openHoliday(button, selected, hours);
  });
  render();
  if (state === 'month') openMonth(monthButton, selected, today);
  const previewBlock = state === 'block' ? get(root, 'block-create') :
    state === 'block-detail' ? root.querySelector('[data-rv-block-detail="B-118"]') : null;
  if (previewBlock) {
    window.scrollTo(0, Math.max(0, previewBlock.getBoundingClientRect().top + window.scrollY - window.innerHeight / 4));
    previewBlock.click();
  }
}
