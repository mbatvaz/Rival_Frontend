import { api } from '../../core/api.js';
import { localUrl } from '../../core/config.js';
import { faDigits } from '../../core/format.js';
import { demoId, dateLabel, get, route, state, text, visible, bindForm } from './shared.js';
import { bookingItem, createHold } from './holds.js';
import { availableTimes, monthKey, monthLabel } from './calendar.js';
import { setupEditor } from './recurring-edit.js';

export async function initRecurring(root, { catalog }) {
  const resource = 'booking/recurring';
  const preview = ['short', 'invalid', 'new', 'edit', 'checkout'].includes(state);
  let { items } = (await api.read(preview ? 'booking/recurring-preview' : resource)).data;
  if (state === 'short') items = items.slice(0, 2);
  if (state === 'invalid') items[2] = { ...items[2], date: '2026-11-27', invalid: true };
  const service = id => catalog.services.find(item => item.id === id);
  const stylist = id => catalog.stylists.find(item => item.id === id);
  const list = get(root, 'rec-list');
  const template = get(root, 'rec-template');
  const action = get(root, 'booking-submit');
  const addButtons = [get(root, 'rec-add'), get(root, 'rec-add-desktop')];
  const add = () => addButtons.find(button => button.getClientRects().length);
  const months = get(root, 'rec-months');
  const editor = setupEditor(catalog, async (draft, dates) => {
    const remaining = items.filter(item => item.id !== draft.id);
    const additions = dates.map(date => ({
      id: draft.id ?? demoId(), service: draft.service, stylist: draft.stylist,
      date, time: draft.time, invalid: !availableTimes(catalog.calendar, date).includes(draft.time)
        || remaining.some(item => item.date === date && item.time === draft.time)
    }));
    const next = [...remaining, ...additions].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    if (!preview) await api.write(resource, { items: next });
    items = next;
    render();
    window.requestAnimationFrame(() => (list.querySelector('[data-rv-rec-item-id="' + draft.id + '"]') ?? add()).focus({ preventScroll: true }));
  });
  const render = () => {
    let month = '';
    months.replaceChildren();
    list.replaceChildren(...items.map(item => {
      const fragment = template.content.cloneNode(true);
      const card = get(fragment, 'rec-edit');
      const current = monthKey(item.date);
      const monthBadge = get(fragment, 'rec-month');
      if (current !== month) {
        const anchor = 'rv-rec-month-' + item.date;
        monthBadge.textContent = monthLabel(item.date);
        monthBadge.id = anchor;
        const jump = document.createElement('a');
        jump.className = 'rv-btn rv-btn--secondary';
        jump.href = '#' + anchor;
        jump.textContent = monthBadge.textContent;
        months.append(jump);
      }
      month = current;
      card.dataset.rvRecItemId = item.id;
      card.dataset.rvInvalid = String(Boolean(item.invalid));
      get(fragment, 'rec-photo').src = localUrl(service(item.service).image);
      text(fragment, 'rec-service', service(item.service).name);
      text(fragment, 'rec-stylist', stylist(item.stylist).name);
      text(fragment, 'rec-date', dateLabel(item.date));
      text(fragment, 'rec-time', faDigits(item.time));
      visible(fragment, 'rec-invalid', item.invalid);
      card.addEventListener('click', () => editor(item, card));
      return fragment;
    }));
    const invalid = items.some(item => item.invalid);
    visible(root, 'rec-empty', !items.length);
    text(root, 'action-title', faDigits(items.length) + ' نوبت');
    text(root, 'action-sub', invalid ? 'نوبت غیرقابل رزرو را ویرایش یا حذف کنید.' : items.length
      ? dateLabel(items[0].date) + ' تا ' + dateLabel(items.at(-1).date) : 'همه با یک پرداخت آزمایشی');
    action.disabled = invalid || items.length < catalog.recurringMinimum;
    action.textContent = items.length < catalog.recurringMinimum ? 'حداقل ۳ نوبت لازم است' : 'ادامه';
  };
  render();
  for (const button of addButtons) button.addEventListener('click', () => editor({}, button));
  const checkout = async () => {
    const quote = await createHold(items.map(item => bookingItem(service(item.service), stylist(item.stylist), item.date, item.time)), catalog);
    window.location.assign(route('BK-F02', { hold: quote.id, group: 'yes' }));
  };
  bindForm(root, checkout);
  if (state === 'new') editor({}, add());
  if (state === 'edit' && items[0]) editor(items[0], list.querySelector('button'));
  if (state === 'checkout' && !action.disabled) await checkout();
}
