import { api } from '../../core/api.js';
import { basePath } from '../../core/config.js';
import { closeSheet, openSheet } from '../../components/sheet.js';
import { showNoShows } from './dashboard-attendance.js';

const resource = 'stylist/dashboard-no-shows';
const sheetId = 'rv-stylist-no-show';
const completions = new Set(['completed', 'no-show', 'no-show-saved']);
const loadNoShows = async () => (await api.read('stylist/dashboard-no-shows')).data;

function activate(tab, tabs) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
}

function configureTabs(root, state) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const list = root.querySelector('[role="tablist"]');
  list.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (tabs.includes(tab)) activate(tab, tabs);
  });
  list.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tab = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1)
      : tabs.find(item => item !== event.target);
    activate(tab, tabs);
    tab.focus();
  });
  if (completions.has(state)) activate(tabs[1], tabs);
}

export async function init(root) {
  const state = new URLSearchParams(location.search).get('state');
  const inactive = state === 'inactive';
  const empty = state === 'empty';
  for (const element of root.querySelectorAll('[data-rv-stylist-inactive]')) element.hidden = !inactive;
  for (const element of root.querySelectorAll('[data-rv-stylist-manual], [data-rv-stylist-active-requests]')) {
    element.hidden = inactive;
  }
  for (const element of root.querySelectorAll('[data-rv-stylist-has-appointments], [data-rv-stylist-personal]')) {
    element.hidden = empty || (inactive && element.hasAttribute('data-rv-stylist-personal'));
  }
  root.querySelector('[data-rv-stylist-empty]').hidden = !empty;
  if (inactive) {
    for (const link of document.querySelectorAll('.rv-stylist-sidebar a, #rv-more a')) {
      if (link.getAttribute('href') === basePath() + 'stylist/manual-booking/') {
        link.removeAttribute('href');
        link.setAttribute('aria-disabled', 'true');
      }
    }
  }
  configureTabs(root, state);
  const toast = root.querySelector('[data-rv-stylist-toast]');
  const initial = root.querySelector('[data-rv-stylist-confirm]');
  const sheet = document.getElementById(sheetId);
  const save = sheet.querySelector('[data-rv-stylist-save]');
  const error = sheet.querySelector('[data-rv-stylist-save-error]');
  let opener;
  function stage(button, options) {
    opener = button;
    error.textContent = '';
    openSheet(sheetId, opener, options);
  }
  root.addEventListener('click', event => {
    const dismiss = event.target.closest('[data-rv-stylist-dismiss]');
    if (dismiss) dismiss.closest('section').hidden = true;
    const button = event.target.closest('[data-rv-stylist-confirm]');
    if (button && !button.hidden) stage(button);
  });
  save.addEventListener('click', async () => {
    if (inactive || !opener || opener.hidden) return;
    const button = opener;
    save.disabled = true;
    try {
      const record = async () => {
        const data = await loadNoShows();
        return (await api.write(resource, [...new Set([...data, button.dataset.rvStylistConfirm])])).data;
      };
      const updated = await (navigator.locks ? navigator.locks.request(basePath() + resource, record) : record());
      if (opener === button && !sheet.hidden) await closeSheet();
      showNoShows(root, state, updated);
      if (opener === button && sheet.hidden) button.closest('[role="tabpanel"]').focus({ preventScroll: true });
      toast.hidden = false;
    } catch (failure) {
      error.textContent = failure.message;
    } finally {
      save.disabled = false;
    }
  });
  if (state === 'no-show') {
    const requests = root.querySelector('[data-rv-stylist-active-requests]');
    stage(initial, { scrollPosition: Math.max(0, window.scrollY + requests.getBoundingClientRect().top) });
  }
  const ids = state === 'no-show-saved' ? [initial.dataset.rvStylistConfirm] : [];
  showNoShows(root, state, ids);
  if (state === 'no-show-saved') toast.hidden = false;
  if (!completions.has(state) || state === 'completed') {
    try {
      showNoShows(root, state, await loadNoShows());
    } catch { /* Explicit saves report storage or connectivity errors in the Sheet. */ }
  }
}
