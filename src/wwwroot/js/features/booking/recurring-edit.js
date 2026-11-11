import { closeSheet, openSheet } from '../../components/sheet.js';
import { faDigits } from '../../core/format.js';
import { get, text, visible, dateLabel, paintContext } from './shared.js';
import { adjacentMonth, availableTimes, monthGrid, plusDays, plusMonths } from './calendar.js';

export function setupEditor(catalog, save) {
  const sheet = document.getElementById('rv-rec-sheet');
  const { calendar } = catalog;
  let draft;
  let step;
  let month;
  let saving = false;
  const next = get(sheet, 'rec-next');
  const preview = () => {
    const dates = [draft.date];
    if (draft.repeat === 'once') return dates;
    const end = [calendar.recurringEnd, plusMonths(draft.date, draft.months)].sort()[0];
    for (let index = 1; ; index++) {
      const date = draft.repeat === 'month' ? plusMonths(draft.date, index) : plusDays(draft.date, index * Number(draft.repeat));
      if (date > end) break;
      dates.push(date);
    }
    return dates;
  };
  const render = () => {
    const editing = Boolean(draft.id);
    for (const panel of sheet.querySelectorAll('[data-rv-rec-step]')) panel.hidden = Number(panel.dataset.rvRecStep) !== step;
    visible(sheet, 'rec-locked', editing);
    visible(sheet, 'rec-delete', editing);
    get(sheet, 'rec-back').disabled = step === 1 || editing;
    text(sheet, 'rec-title', editing ? 'ویرایش نوبت' : 'نوبت تازه');
    text(sheet, 'rec-step-text', editing ? 'انتخاب روز و ساعت' : 'قدم ' + faDigits(step) + ' از ۵');
    const service = catalog.services.find(item => item.id === draft.service);
    const stylist = catalog.stylists.find(item => item.id === draft.stylist);
    if (editing) paintContext(sheet, service, stylist);
    for (const field of sheet.querySelectorAll('input[type="radio"]')) {
      const key = field.name.slice(4);
      field.checked = String(draft[key]) === field.value;
      if (key === 'stylist') field.closest('label').hidden = !service?.stylists.includes(field.value);
      if (key === 'time') field.disabled = !availableTimes(calendar, draft.date).includes(field.value);
    }
    if (step === 3) monthGrid(sheet, month, draft.date, {
      start: calendar.start, end: calendar.recurringEnd,
      canPick: date => Boolean(availableTimes(calendar, date).length)
    }, date => {
      draft.date = date;
      draft.time = '';
      render();
      get(sheet, 'month-grid').querySelector('[aria-pressed="true"]')?.focus();
    });
    if (step === 5) {
      visible(sheet, 'rec-horizon', draft.repeat !== 'once');
      const list = get(sheet, 'rec-preview');
      list.replaceChildren(...preview().map(date => {
        const item = document.createElement('li');
        const valid = availableTimes(calendar, date).includes(draft.time);
        item.textContent = dateLabel(date) + ' · ' + faDigits(draft.time) + (valid ? '' : ' · غیرقابل رزرو');
        return item;
      }));
    }
    next.disabled = saving || ![draft.service, draft.stylist, draft.date && draft.time, draft.repeat, true][step - 1];
    next.textContent = editing ? 'ذخیره تغییرات' : step === 5 ? 'افزودن ' + faDigits(preview().length) + ' نوبت' : 'ادامه';
  };
  const confirm = async remove => {
    if (saving) return;
    saving = true;
    next.disabled = true;
    get(sheet, 'rec-remove').disabled = true;
    try {
      await save(draft, remove ? [] : draft.id ? [draft.date] : preview());
      closeSheet();
    } catch (error) {
      text(sheet, 'rec-error', error.message);
      visible(sheet, 'rec-error', true);
    } finally {
      saving = false;
      get(sheet, 'rec-remove').disabled = false;
      render();
    }
  };
  sheet.addEventListener('change', event => {
    if (!event.target.name?.startsWith('rec-')) return;
    const key = event.target.name.slice(4);
    if (key === 'service') draft.stylist = '';
    draft[key] = key === 'months' ? Number(event.target.value) : event.target.value;
    render();
  });
  for (const button of sheet.querySelectorAll('[data-rv-month-move]')) {
    button.addEventListener('click', () => { month = adjacentMonth(month, Number(button.dataset.rvMonthMove)); render(); });
  }
  next.addEventListener('click', () => {
    if (draft.id || step === 5) confirm(false);
    else { step++; render(); sheet.querySelector('[data-rv-rec-step="' + step + '"] input:not([disabled]), [data-rv-rec-step="' + step + '"] button:not([disabled])')?.focus(); }
  });
  get(sheet, 'rec-back').addEventListener('click', () => { step--; render(); });
  get(sheet, 'rec-delete').addEventListener('click', () => { visible(sheet, 'rec-delete-note', true); get(sheet, 'rec-remove').focus(); });
  get(sheet, 'rec-cancel-remove').addEventListener('click', () => { visible(sheet, 'rec-delete-note', false); get(sheet, 'rec-delete').focus(); });
  get(sheet, 'rec-remove').addEventListener('click', () => confirm(true));
  return (item, opener) => {
    draft = { service: '', stylist: '', date: '', time: '', repeat: 'once', months: 1, ...item };
    if (draft.invalid) draft.time = '';
    step = draft.id ? 3 : 1;
    month = draft.date || calendar.start;
    visible(sheet, 'rec-delete-note', false);
    visible(sheet, 'rec-error', false);
    render();
    openSheet(sheet.id, opener);
  };
}
