import { api } from '../../core/api.js';
import { basePath } from '../../core/config.js';
import { faDigits } from '../../core/format.js';
import { plusMonths } from '../booking/calendar.js';

const resource = 'stylist/calendar-changes';
export const minutes = time => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
export const time = count => [Math.floor(count / 60), count % 60].map(n => String(n).padStart(2, '0')).join(':');
export const duration = count => [
  count >= 60 && faDigits(Math.floor(count / 60)) + ' ساعت',
  count % 60 && faDigits(count % 60) + ' دقیقه'
].filter(Boolean).join(' و ');
export const rangeText = (start, end) => faDigits(start) + ' تا ' + faDigits(end);
export const weekday = date => (new Date(date + 'T12:00:00Z').getUTCDay() + 1) % 7;
export const tehranInstant = (date, clock) => Date.parse(`${date}T${clock}:00+03:30`);
export const releaseInstant = value => tehranInstant(...value.split('T'));
export function releaseBounds(today, range, now) {
  const nextMinute = Math.floor((now - tehranInstant(today, '00:00')) / 60000) + 1;
  return { start: Math.max(minutes(range.start), nextMinute), end: minutes(range.end) - 1 };
}
const overlaps = (left, right) => left.start < right.end && left.end > right.start;
const fail = message => { throw new Error(message); };

function timeline(occupied, hours, boundaries = []) {
  if (!hours) return [];
  const slots = [];
  let next = hours[0];
  for (const slot of [...occupied, { start: hours[1] }]) {
    for (const end of [...boundaries.filter(at => next < at && at < slot.start), slot.start]) {
      if (next < end) slots.push({ start: next, end, kind: 'free' });
      next = end;
    }
    if (slot.kind) { slots.push(slot); next = slot.end; }
  }
  return slots;
}

export async function loadCalendar(state) {
  const [fixture, dashboard, saved] = await Promise.all(
    ['stylist/calendar', 'stylist/dashboard', resource].map(async key => (await api.read(key)).data)
  );
  const { today, holidays, acceptanceHours } = fixture;
  const last = plusMonths(today, 6);
  const holidayDemo = state === 'holiday-accepting';
  const started = Date.now();
  const now = (data = saved) => tehranInstant(today, fixture.now) + Date.now() - (data.clockStartedAt ?? started);
  const active = (slot, data) => !slot.releaseAt || releaseInstant(slot.releaseAt) > now(data);
  const original = dashboard.timeline;
  const day = (date, data = saved) => {
    const current = date === today;
    const holiday = holidays.includes(date);
    const weeklyClosed = !holiday && weekday(date) === 6;
    const demoAcceptance = holiday && holidayDemo;
    const acceptance = data.acceptances[date] ?? (demoAcceptance ? acceptanceHours : null);
    const hours = holiday ? acceptance : weeklyClosed ? null : current ? ['12:00', original.at(-1).end] : fixture.hours;
    const seed = current ? original : fixture.days[date] ?? [];
    const holidayRows = demoAcceptance ? fixture.acceptedHolidayDemo.filter(
      slot => slot.start >= acceptance[0] && slot.end <= acceptance[1]
    ) : [];
    const blocks = data.blocks[date] ?? {};
    const occupied = [
      ...[...seed, ...holidayRows].filter(slot => slot.kind !== 'free' && !Object.hasOwn(blocks, slot.id)),
      ...Object.values(blocks).filter(Boolean)
    ].filter(slot => active(slot, data)).sort((a, b) => a.start.localeCompare(b.start));
    const boundaries = current ? original.filter(slot => slot.kind === 'free').map(slot => slot.start) : [];
    return { holiday, weeklyClosed, hours, occupied, slots: timeline(occupied, hours, boundaries) };
  };
  const change = update => {
    const save = async () => {
      const { data } = await api.read(resource);
      data.clockStartedAt ??= started;
      update(data);
      Object.assign(saved, (await api.write(resource, data)).data);
    };
    return navigator.locks ? navigator.locks.request(basePath() + resource, save) : save();
  };
  const saveBlock = (date, block, editing) => change(data => {
    const { hours, occupied } = day(date, data);
    if (date < today || !hours || block.start >= block.end || block.start < hours[0] || block.end > hours[1] ||
        occupied.some(slot => slot.id !== editing && overlaps(block, slot)) ||
        (!editing && tehranInstant(date, block.start) <= now(data))) fail('این بازه دیگر آزاد نیست.');
    if (editing && !occupied.some(slot => slot.kind === 'block' && slot.id === editing)) {
      fail('این بستن دیگر فعال نیست.');
    }
    const previousRelease = occupied.find(slot => slot.id === editing)?.releaseAt;
    if (block.releaseAt && block.releaseAt !== previousRelease) {
      const release = releaseInstant(block.releaseAt);
      if (date !== today || !Number.isFinite(release) || release <= now(data) ||
          release < tehranInstant(date, block.start) || release >= tehranInstant(date, block.end)) {
        fail('زمان آزاد شدن باید در بازهٔ بستن امروز و پیش از پایان آن باشد.');
      }
    }
    (data.blocks[date] ??= {})[block.id] = block;
  });
  const releaseBlock = (date, id) => change(data => {
    (data.blocks[date] ??= {})[id] = null;
  });
  const acceptHoliday = (date, start, end) => change(data => {
    const { occupied } = day(date, data);
    if (!holidays.includes(date) || date < today || start >= end ||
        occupied.some(slot => slot.start < start || slot.end > end)) {
      fail('بازهٔ پذیرش معتبر نیست یا با برنامهٔ ثبت‌شده تداخل دارد.');
    }
    data.acceptances[date] = [start, end];
  });
  return { today, last, holidays, acceptanceHours, now, day, saveBlock, releaseBlock, acceptHoliday };
}
