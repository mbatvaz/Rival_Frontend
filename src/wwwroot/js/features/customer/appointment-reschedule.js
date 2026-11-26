import { enableDrag, observeCenter } from '../../components/rail.js';
import { faDigits } from '../../core/format.js';
import { centerInRail, get, text, visible } from '../booking/shared.js';
import { populateDays } from '../booking/time-day-strip.js';
import { setupTimeCalendar } from '../booking/time-calendar.js';
import { longDay } from '../booking/availability.js';
import { appointmentUrl, commitReschedule, currentLabel, cutoff, scenarioDays, timeLabel } from './reschedule-data.js';
import { cardSheetOpener } from './card-sheet.js';
import { appointmentContext, paintFlowHeader } from './reschedule-result.js';

function timeOption(time, selected, blocked) {
  const label = document.createElement('label');
  label.className = 'rv-booking-radio';
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'reschedule-time';
  radio.value = time;
  radio.checked = time === selected;
  radio.disabled = blocked;
  const value = document.createElement('span');
  value.textContent = faDigits(time);
  label.append(radio, value);
  return label;
}

export function showReschedulePicker(root, current, scenario, mode, cutoffDays, open, preview) {
  const late = mode === 'late';
  const comp = mode === 'compensation';
  const workspace = paintFlowHeader(current, scenario.id, late ? 'lt24' : comp && preview ? 'comp' : '');
  visible(workspace, 'rsc-subtitle', comp);
  const picker = get(root, 'rsc-picker');
  const context = appointmentContext(current);
  get(picker, 'context-image').src = context.image;
  get(picker, 'context-avatar').src = context.avatar;
  text(picker, 'context-service', context.title);
  text(picker, 'context-name', context.stylist);
  text(picker, 'rsc-current', currentLabel(scenario));
  visible(picker, 'rsc-warning', late);
  visible(picker, 'rsc-compensation', comp);
  picker.hidden = false;
  const days = scenarioDays(scenario, late);
  const rail = get(picker, 'days');
  const times = get(picker, 'rsc-times');
  const next = get(picker, 'rsc-continue');
  const card = get(picker, 'booking-context');
  const sheet = document.getElementById('rv-reschedule-confirm');
  const confirm = get(sheet, 'rsc-confirm');
  const openConfirmation = cardSheetOpener(get(document, 'rsc-lift'), () => card);
  let { date, time } = scenario.selected;
  const updateSummary = () => {
    text(picker, 'rsc-next', time ? timeLabel(date, time) : 'یک ساعت انتخاب کنید');
    text(picker, 'rsc-replaces', 'به‌جای ' + currentLabel(scenario));
    next.disabled = !time;
  };
  const chooseDay = chosen => {
    if (chosen !== date) { date = chosen; time = ''; }
    const day = days.find(day => day.date === date);
    if (!day.times.includes(time) || day.conflicts.includes(time)) time = '';
    for (const button of rail.querySelectorAll('[data-rv-day]')) {
      button.setAttribute('aria-pressed', String(button.dataset.rvDay === date));
    }
    times.replaceChildren(...day.times.map(slot => timeOption(slot, time, day.conflicts.includes(slot))));
    visible(picker, 'rsc-day-note', day.closed);
    visible(picker, 'rsc-conflict', day.conflicts.length > 0);
    text(picker, 'rsc-picked-day', longDay(date));
    syncCalendar(date);
    updateSummary();
  };
  const syncCalendar = setupTimeCalendar(picker, days, date, chooseDay);
  populateDays(picker, days, date, chooseDay);
  enableDrag(rail);
  chooseDay(date);
  const align = () => centerInRail(rail, rail.querySelector('[data-rv-day="' + date + '"]'));
  align();
  observeCenter(rail, () => rail.querySelectorAll('[data-rv-day]'), item => {
    if (item.dataset.rvDay !== date) chooseDay(item.dataset.rvDay);
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', align);
  times.addEventListener('change', event => { time = event.target.value; updateSummary(); });
  const showConfirmation = () => {
    if (!time) return;
    text(sheet, 'rsc-from', currentLabel(scenario));
    text(sheet, 'rsc-to', timeLabel(date, time));
    text(sheet, 'rsc-quota', comp ? 'با این جابه‌جایی، حق جبرانی مصرف می‌شود و سهم جابه‌جایی خودتان می‌ماند.'
      : 'هر نوبت فقط یک بار جابه‌جا می‌شود؛ بعد از این، جابه‌جایی دیگری ممکن نیست.');
    text(sheet, 'rsc-refund', late || scenario.refundLost ? 'اگر نوبت تازه را هم لغو کنید، ' + scenario.amount + ' تومان برنمی‌گردد.'
      : 'حق بازگشت هزینه می‌ماند: لغو تا ' + cutoff({ date, time }, cutoffDays) + ' یعنی ' + scenario.amount
      + (scenario.refundToOriginalPayer ? ' تومان برای پرداخت‌کنندهٔ اولیه.' : ' تومان به اعتبار شما.'));
    confirm.textContent = late ? 'جابه‌جا می‌کنم' : 'تأیید جابه‌جایی';
    visible(sheet, 'rsc-fee', !late);
    visible(sheet, 'rsc-danger', late);
    visible(sheet, 'rsc-error', false);
    openConfirmation(sheet.id, next);
  };
  next.addEventListener('click', showConfirmation);
  get(sheet, 'rsc-submit').addEventListener('submit', async event => {
    event.preventDefault();
    if (confirm.disabled) return;
    confirm.disabled = true;
    try {
      await commitReschedule(scenario, mode, { date, time });
      location.assign(appointmentUrl(scenario.id, 'rsc-complete'));
    } catch (error) {
      text(sheet, 'rsc-error', error.message);
      visible(sheet, 'rsc-error', true);
      confirm.disabled = false;
    }
  });
  if (open) showConfirmation();
}
