import { adjacentMonth, monthGrid, monthKey } from './calendar.js';
import { get } from './shared.js';

export function setupTimeCalendar(root, days, selected, pick, readOnly = false) {
  const shell = get(root, 'time-calendar');
  const grid = get(shell, 'month-grid');
  const dates = new Map(days.map(day => [day.date, day]));
  const bounds = { start: days[0].date, end: days.at(-1).date };
  let month = selected || bounds.start;
  let current = selected;
  const render = () => monthGrid(shell, month, current, {
    ...bounds, canPick: date => !readOnly && dates.has(date),
    dayState: date => dates.get(date)?.closed ? 'closed' : dates.get(date)?.opens ? 'pending' : dates.has(date) ? 'available' : 'outside'
  }, pick);

  for (const button of shell.querySelectorAll('[data-rv-month-move]')) {
    button.addEventListener('click', () => {
      month = adjacentMonth(month, Number(button.dataset.rvMonthMove));
      render();
      if (button.disabled) grid.querySelector('input:not([disabled])')?.focus();
    });
  }
  render();
  return date => {
    current = date;
    if (date && monthKey(date) !== monthKey(month)) {
      month = date;
      render();
      return;
    }
    for (const input of grid.querySelectorAll('input')) {
      input.checked = input.value === date;
    }
  };
}
