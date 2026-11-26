import { closeSheet, openSheet } from '../../components/sheet.js';
import { faDigits } from '../../core/format.js';
import { dateLabel, demoId, get, text, visible } from '../booking/shared.js';
import { duration, minutes, rangeText, releaseBounds, releaseInstant, time } from './calendar-data.js';
import { dayLabel, releaseLabel, slotDuration } from './calendar-view.js';
import { initReleaseTime } from './release-pickers.js';

export function bindSave(control, eventName, root, save, refresh) {
  const button = eventName === 'submit' ? control.querySelector('[type="submit"]') : control;
  control.addEventListener(eventName, async event => {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    text(root, 'form-error', '');
    try {
      await save();
      if (!root.closest('[hidden], [inert]')) await closeSheet({ all: true });
      refresh();
    } catch (error) { text(root, 'form-error', error.message); }
    finally { button.disabled = false; }
  });
}

function blockTimes(start, end) {
  const count = (minutes(end) - minutes(start)) / 30;
  return Array.from({ length: count }, (_, index) => {
    const value = time(minutes(start) + index * 30);
    const label = document.createElement('label');
    const input = document.createElement('input');
    const caption = document.createElement('span');
    label.className = 'rv-booking-radio';
    input.type = 'checkbox';
    input.name = 'half';
    input.value = value;
    input.checked = true;
    caption.textContent = faDigits(value);
    label.append(input, caption);
    return label;
  });
}

function selectedTime(form) {
  const slots = [...form.querySelectorAll('[name="half"]:checked')];
  if (!slots.length) return null;
  const start = slots[0].value;
  const end = time(minutes(slots.at(-1).value) + 30);
  return minutes(end) - minutes(start) === slots.length * 30 ? { start, end } : null;
}

export function initBlockSheets(calendar, refresh) {
  const detail = document.getElementById('rv-stylist-block-detail');
  const editor = document.getElementById('rv-stylist-block');
  const form = editor.querySelector('form');
  const submit = form.querySelector('[type="submit"]');
  let blockContext, detailContext;
  const range = () => blockContext.editing ? blockContext.slot : selectedTime(form);
  const setRelease = initReleaseTime(form, () => range() && releaseBounds(calendar.today, range(), calendar.now()));
  text(form, 'release-date', dateLabel(calendar.today));
  function updateEditor() {
    const today = blockContext.date === calendar.today;
    const scheduled = form.elements.release.value === 'scheduled';
    form.querySelector('[value="scheduled"]').disabled = !today;
    visible(form, 'release-unavailable', !today);
    visible(form, 'release-fields', today && scheduled);
    get(form, 'release-time').disabled = !range();
    if (blockContext?.editing) submit.textContent = 'ذخیره تغییرات';
    else {
      const selected = selectedTime(form);
      submit.textContent = selected ? 'بستن ' + rangeText(selected.start, selected.end) : 'بستن این زمان';
    }
  }
  const openEditor = (button, date, slot, editing = false) => {
    blockContext = { date, slot, editing };
    form.reset();
    text(form, 'form-error', '');
    text(editor, 'block-title', editing ? 'ویرایش بستن شخصی' : 'بستن این زمان');
    get(form, 'block-times').replaceChildren(...(editing ? [] : blockTimes(slot.start, slot.end)));
    visible(form, 'block-halves', !editing);
    visible(form, 'block-help', !editing);
    form.elements.title.value = editing ? slot.name : '';
    form.elements.release.value = slot.releaseAt ? 'scheduled' : 'none';
    setRelease(slot.releaseAt?.split('T')[1] ?? '');
    updateEditor();
    openSheet(editor.id, button);
  };
  form.addEventListener('change', updateEditor);
  bindSave(form, 'submit', form, async () => {
    const { date, slot, editing } = blockContext;
    if (!range()) throw new Error('یک یا چند نیم‌ساعتِ پشت سر هم انتخاب کنید.');
    const { start, end } = range();
    const scheduled = form.elements.release.value === 'scheduled';
    const clock = form.elements.releaseTime.value;
    if (scheduled && !clock) throw new Error('ساعت آزاد شدن را انتخاب کنید.');
    const releaseAt = scheduled ? (slot.releaseAt?.endsWith('T' + clock) ? slot.releaseAt : calendar.today + 'T' + clock) : null;
    await calendar.saveBlock(date, {
      start, end, kind: 'block', id: editing ? slot.id : demoId(), releaseAt,
      name: form.elements.title.value.trim() || 'بستن شخصی'
    }, editing ? slot.id : null);
  }, refresh);
  const openDetail = (button, date, slot) => {
    detailContext = { date, slot };
    text(detail, 'form-error', '');
    text(detail, 'detail-title', slot.name);
    text(detail, 'detail-range', (date === calendar.today ? 'امروز' : dayLabel(date)) + '، ' + rangeText(slot.start, slot.end));
    text(detail, 'detail-duration', slotDuration(slot));
    text(detail, 'detail-release', releaseLabel(slot.releaseAt, calendar.today));
    const remaining = slot.releaseAt && Math.ceil((releaseInstant(slot.releaseAt) - calendar.now()) / 60000);
    visible(detail, 'detail-countdown', remaining > 0);
    if (remaining > 0) text(detail, 'detail-countdown', duration(remaining) + ' دیگر');
    visible(detail, 'detail-policy', Boolean(slot.releaseAt));
    openSheet(detail.id, button);
  };
  get(detail, 'detail-edit').addEventListener('click', event => {
    openEditor(event.currentTarget, detailContext.date, detailContext.slot, true);
  });
  bindSave(get(detail, 'detail-release-now'), 'click', detail,
    () => calendar.releaseBlock(detailContext.date, detailContext.slot.id), refresh);
  return { openEditor, openDetail };
}
