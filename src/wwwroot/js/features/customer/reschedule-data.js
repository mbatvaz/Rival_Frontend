import { api } from '../../core/api.js';
import { faDigits } from '../../core/format.js';
import { longDay } from '../booking/availability.js';
import { plusDays } from '../booking/calendar.js';
import { dateLabel } from '../booking/shared.js';

const resource = 'customer/appointment-reschedule';
const dateFormat = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  timeZone: 'Asia/Tehran', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
export const usedNote = 'این نوبت یک بار جابه‌جا شده است؛ هر نوبت فقط یک بار جابه‌جا می‌شود.';
export const lostRefund = 'حق بازگشت هزینه این نوبت از بین رفت؛ لغو از این پس بدون بازگشت هزینه است.';
export const timeLabel = (date, time) => longDay(date) + '، ' + faDigits(time);
export const currentLabel = scenario => scenario.currentLabel ?? timeLabel(scenario.currentDate, scenario.currentTime);
export const cutoff = (change, days) => timeLabel(plusDays(change.date, -days), change.time);
export const forfeitsRefund = change => change.refundLost || change.mode === 'late';
export const loadReschedules = async () => (await api.read(resource)).data;

export function refreshReschedulesOnRestore(changes) {
  const rendered = JSON.stringify(changes);
  window.addEventListener('pageshow', async event => {
    if (!event.persisted) return;
    const latest = await loadReschedules().catch(() => null);
    if (latest && JSON.stringify(latest.changes) !== rendered) location.reload();
  });
}

export function scenarioDays(scenario, late) {
  const start = late ? scenario.currentDate : scenario.start;
  return Array.from({ length: 12 }, (_, index) => {
    const date = plusDays(start, index);
    const closed = new Date(date + 'T12:00:00Z').getUTCDay() === 5;
    const conflicts = scenario.conflict?.date === date ? scenario.conflict.times : [];
    const times = closed ? [] : scenario.times.filter(time => (
      date !== scenario.currentDate || (time !== scenario.currentTime && (!late || time >= '11:00'))
    ));
    return { date, closed, times, conflicts };
  });
}

export function changeDetails(change) {
  const { weekday, month, day } = Object.fromEntries(
    dateFormat.formatToParts(new Date(change.date + 'T12:00:00Z')).map(part => [part.type, part.value])
  );
  const date = dateLabel(change.date).replace(/[۰-۹]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit));
  return { weekday, month, day, time: faDigits(change.time), date };
}

export function appointmentUrl(id, state) {
  const url = new URL(location.pathname, location.origin);
  url.searchParams.set('appointment', id);
  const swapCustomer = new URLSearchParams(location.search).get('swapCustomer');
  if (swapCustomer) url.searchParams.set('swapCustomer', swapCustomer);
  if (state) url.searchParams.set('state', state);
  return url.pathname + url.search;
}

export async function commitReschedule(scenario, mode, selection) {
  const day = scenarioDays(scenario, mode === 'late').find(day => day.date === selection.date);
  if (!day?.times.includes(selection.time) || day.conflicts.includes(selection.time)) {
    throw new Error('این زمان در دسترس نیست. ساعت دیگری انتخاب کنید.');
  }
  if (scenario.swap) {
    const { customer, id, revision } = scenario.swap;
    return api.appointmentSwap.reschedule(customer, id, revision, {
      ...selection, from: currentLabel(scenario), mode, refundLost: mode === 'late' || Boolean(scenario.refundLost)
    });
  }
  const commit = async () => {
    const data = await loadReschedules();
    const previous = data.changes[scenario.id];
    const comp = mode === 'compensation';
    if ((previous?.revision ?? 0) !== scenario.revision || (comp ? previous?.compensationUsed : previous?.ordinaryUsed)) {
      throw new Error('این نوبت تغییر کرده است. جزئیات نوبت را دوباره باز کنید.');
    }
    data.changes[scenario.id] = {
      ...selection, from: currentLabel(scenario), mode, revision: scenario.revision + 1,
      ordinaryUsed: !comp || Boolean(previous?.ordinaryUsed),
      compensationUsed: comp || Boolean(previous?.compensationUsed),
      refundLost: mode === 'late' || Boolean(previous?.refundLost)
    };
    await api.write(resource, data);
  };
  return navigator.locks ? navigator.locks.request(resource, commit) : commit();
}
