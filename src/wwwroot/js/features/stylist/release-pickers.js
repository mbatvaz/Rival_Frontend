import { closeSheet, openSheet } from '../../components/sheet.js';
import { faDigits } from '../../core/format.js';
import { get } from '../booking/shared.js';
import { minutes, time } from './calendar-data.js';

const twoDigits = value => String(value).padStart(2, '0');

function timeWheel(wheel, changed = () => {}) {
  let rowSize = 0;
  let painted = null;
  let drag;
  let rows = [];
  let first = 0;
  const clamp = index => Math.min(rows.length - 1, Math.max(0, index));
  const indexAtCenter = () => clamp(Math.round(wheel.scrollTop / rowSize));
  const value = () => first + indexAtCenter();
  function paint(index) {
    if (!rows.length || !Number.isFinite(index) || painted === index) return;
    const from = Math.max(0, Math.min(painted ?? index, index) - 2);
    const to = Math.min(rows.length - 1, Math.max(painted ?? index, index) + 2);
    for (let i = from; i <= to; i++) rows[i].dataset.distance = String(Math.min(3, Math.abs(i - index)));
    wheel.setAttribute('aria-valuenow', first + index);
    wheel.setAttribute('aria-valuetext', rows[index].textContent);
    painted = index;
    changed(first + index);
  }
  function select(index, animate = false) {
    const smooth = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    wheel.scrollTo({ top: clamp(index) * rowSize, behavior: smooth ? 'smooth' : 'instant' });
    paint(indexAtCenter());
  }
  wheel.addEventListener('scroll', () => paint(indexAtCenter()), { passive: true });
  wheel.addEventListener('keydown', event => {
    const keys = { ArrowUp: 1, ArrowDown: -1, PageUp: 5, PageDown: -5, Home: -rows.length, End: rows.length };
    if (!Object.hasOwn(keys, event.key)) return;
    event.preventDefault();
    select(indexAtCenter() + keys[event.key]);
  });
  wheel.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    wheel.focus({ preventScroll: true });
    wheel.setPointerCapture(event.pointerId);
    drag = { y: event.clientY, top: wheel.scrollTop, row: rows.indexOf(event.target) };
    wheel.dataset.rvDragging = '';
  });
  wheel.addEventListener('pointermove', event => {
    if (drag) wheel.scrollTop = drag.top + drag.y - event.clientY;
  });
  function endDrag(event) {
    if (!drag) return;
    const index = event.type === 'pointerup' && Math.abs(event.clientY - drag.y) < 4 && drag.row >= 0
      ? drag.row : indexAtCenter();
    drag = null;
    delete wheel.dataset.rvDragging;
    select(index, true);
  }
  wheel.addEventListener('pointerup', endDrag);
  wheel.addEventListener('lostpointercapture', endDrag);
  wheel.addEventListener('click', event => {
    if (event.pointerType === 'mouse') return;
    const index = rows.indexOf(event.target);
    if (index >= 0) select(index, true);
  });
  function reset(min, max, selected) {
    first = min;
    painted = null;
    rows = Array.from({ length: max - min + 1 }, (_, index) => {
      const row = document.createElement('span');
      row.setAttribute('aria-hidden', 'true');
      row.textContent = faDigits(twoDigits(min + index));
      return row;
    });
    wheel.replaceChildren(...rows);
    wheel.setAttribute('aria-valuemin', min);
    wheel.setAttribute('aria-valuemax', max);
    rowSize = rows[0].offsetHeight;
    select(selected - min);
  }
  return { value, reset };
}

export function initReleaseTime(form, getBounds) {
  const timeButton = get(form, 'release-time');
  const clock = document.getElementById('rv-stylist-release-time');
  const minuteWheel = timeWheel(get(clock, 'clock-minute'));
  let bounds, minute;
  const minuteRange = hour => [Math.max(0, bounds.start - hour * 60), Math.min(59, bounds.end - hour * 60)];
  const hours = timeWheel(get(clock, 'clock-hour'), hour => {
    if (!Number.isFinite(minute)) minute = 0;
    minuteWheel.reset(...minuteRange(hour), minute);
  });
  get(clock, 'clock-minute').addEventListener('scroll', () => { minute = minuteWheel.value(); });
  const setTime = value => {
    form.elements.releaseTime.value = value;
    timeButton.querySelector('bdi').textContent = value ? faDigits(value) : 'انتخاب ساعت';
  };
  timeButton.addEventListener('click', () => {
    bounds = getBounds();
    if (!bounds || bounds.start > bounds.end) return;
    openSheet(clock.id, timeButton);
    const initial = form.elements.releaseTime.value ? minutes(form.elements.releaseTime.value) : bounds.start;
    const selected = Math.max(bounds.start, Math.min(bounds.end, initial));
    minute = selected % 60;
    hours.reset(Math.floor(bounds.start / 60), Math.floor(bounds.end / 60), Math.floor(selected / 60));
  });
  get(clock, 'clock-confirm').addEventListener('click', () => {
    const hour = hours.value();
    const [first, last] = minuteRange(hour);
    setTime(time(hour * 60 + Math.max(first, Math.min(last, minuteWheel.value()))));
    closeSheet();
  });
  return setTime;
}
