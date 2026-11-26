import { openSheet, closeSheet } from '../../components/sheet.js';
import { adjacentMonth, monthGrid } from './calendar.js';

export function initCalendarSheet(root, bounds, pick) {
  let month, selected;
  const render = () => monthGrid(root, month, selected, bounds(), async date => {
    pick(date);
    await closeSheet();
  });
  root.querySelectorAll('[data-rv-month-move]').forEach(button => button.addEventListener('click', () => {
    month = adjacentMonth(month, Number(button.dataset.rvMonthMove));
    render();
    if (button.disabled) root.querySelector('input:enabled')?.focus();
  }));
  return (button, date, fallback) => {
    selected = date;
    month = date || fallback;
    render();
    openSheet(root.id, button, { preserveParent: true });
  };
}
