import { api } from '../../core/api.js';
import { appointmentStart, swapValidity } from '../../core/appointment-swap-rules.js';
import { get, text } from '../booking/shared.js';
import { plusDays } from '../booking/calendar.js';
import { initSwapCreate } from './appointment-swap-create.js';
import { initSwapRedeem } from './appointment-swap-redeem.js';
import { preserveSwapNavigation, refreshSwapOnRestore } from './appointment-swap-context.js';
import { appointmentUrl, cutoff, loadReschedules, usedNote } from './reschedule-data.js';
import { updateAppointmentHero } from './reschedule-detail.js';
import { showReschedulePicker } from './appointment-reschedule.js';
import { showRescheduleResult } from './reschedule-result.js';
import { swapAvailability, watchSwapAvailability } from './appointment-swap-availability.js';

export async function loadSwapDetail(customer, id) {
  const view = await api.appointmentSwap.list(customer);
  if (view.customerName) {
    preserveSwapNavigation(customer, view.customerName);
    refreshSwapOnRestore(customer, view.appointments);
  }
  const record = id ? view.appointments.find(item => item.id === id) : view.appointments[0];
  return { ...view, record };
}

export async function initSwapDetail(root, current, customer, view, state, openSheet, scene) {
  const { record, customerName } = view;
  const swap = { customer, id: record.id, revision: record.revision };
  const hero = current.querySelector('.rv-appointment-hero');
  hero.dataset.rvSwapDay = record.date;
  updateAppointmentHero(hero, record);
  text(current, 'swap-owner', 'صاحب نوبت در پیش‌نمایش تعویض: ' + customerName);
  const receipt = current.querySelector('.rv-appointment-detail__receipt');
  const amount = receipt.querySelector('dd').textContent;
  const originalPayer = record.refundRecipientUserId !== customer;
  receipt.hidden = originalPayer;
  const move = get(current, 'detail-rsc');
  const cancel = get(current, 'detail-cancel');
  if (!record.canSwap) {
    swapAvailability(current, 'این نوبت دیگر قابل تعویض نیست.');
    cancel.disabled = true;
    return { handled: true };
  }
  if (state === 'inactive') {
    swapAvailability(current, 'با حساب غیرفعال نمی‌توانید نوبت را تعویض کنید.');
    cancel.disabled = true;
    get(current, 'inactive-banner').hidden = false;
    return { handled: true };
  }
  const { standard, cutoffDays } = await loadReschedules();
  const lastChange = record.rescheduleHistory.at(-1);
  const refundLost = Boolean(lastChange?.refundLost);
  const hours = (appointmentStart(record) - Date.now()) / 3_600_000;
  const mode = hours <= 24 ? 'late' : 'standard';
  const canMove = record.rescheduleAllowance > 0 && hours > 3;
  const start = plusDays(record.date, 1);
  const firstOpen = new Date(start + 'T12:00:00Z').getUTCDay() === 5 ? plusDays(start, 1) : start;
  const scenario = {
    swap, id: record.id, amount: amount.replace(' تومان', ''), refundLost, currentDate: record.date,
    currentTime: record.time, start, times: standard.times, selected: { date: firstOpen, time: standard.times[0] },
    refundToOriginalPayer: originalPayer
  };
  if (state === 'rsc' && canMove) {
    if (mode === 'late') scenario.selected = { date: record.date, time: standard.times.find(time => time >= '11:00' && time !== record.time) };
    if (mode === 'late' && new Date(record.date + 'T12:00:00Z').getUTCDay() === 5) scenario.selected = { date: start, time: standard.times[0] };
    showReschedulePicker(root, current, scenario, mode, cutoffDays, false, false);
    return { handled: true };
  }
  if (state === 'rsc-complete' && lastChange?.from) {
    showRescheduleResult(root, current, record.id, lastChange, cutoffDays, '', originalPayer);
    return { handled: true };
  }
  if (canMove) {
    move.disabled = false;
    move.removeAttribute('aria-describedby');
    move.addEventListener('click', () => location.assign(appointmentUrl(record.id, 'rsc')));
  } else {
    text(current, 'detail-note', record.rescheduleAllowance ? 'مهلت جابه‌جایی این نوبت تمام شده است.' : usedNote);
    get(current, 'detail-note').hidden = false;
  }
  const create = current.querySelector('[data-rv-swap-open="create"]');
  const redeem = current.querySelector('[data-rv-swap-open="redeem"]');
  const availability = watchSwapAvailability(current, appointmentStart(record), customer, record, redeem);
  const previewCreate = initSwapCreate(create, customer, record, openSheet, availability.setOffer);
  const previewRedeem = initSwapRedeem(redeem, customer, record, openSheet, outcome => {
    availability.stop();
    for (const button of [move, cancel, create, redeem]) button.disabled = true;
    if (outcome) {
      outcome.classList.add('rv-panel');
      current.replaceChildren(outcome);
    }
  });
  create.disabled = false;
  await availability.refresh();
  get(current, 'swap-availability').hidden = true;
  for (const button of [create, redeem]) button.removeAttribute('aria-describedby');
  if (scene === 'create') previewCreate();
  if (scene === 'redeem') redeem.click();
  if (scene === 'success') previewRedeem(scene);
  if (['code', 'confirm'].includes(scene)) {
    const { appointments } = await api.appointmentSwap.list(customer === 'a' ? 'b' : 'a');
    if (scene === 'code') previewCreate({ expiresAt: Date.now() + swapValidity, desiredDate: appointments[0].date });
    else previewRedeem(scene, appointments[0]);
  }
  const deadline = cutoff(record, cutoffDays);
  return {
    move: canMove ? () => location.assign(appointmentUrl(record.id, 'rsc')) : null,
    originalPayer, amount, deadline, noRefund: refundLost || Date.now() >= Date.parse(plusDays(record.date, -cutoffDays) + 'T' + record.time + ':00+03:30')
  };
}
