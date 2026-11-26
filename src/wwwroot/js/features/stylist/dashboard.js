import { api } from '../../core/api.js';
import { basePath } from '../../core/config.js';
import { closeSheet, openSheet } from '../../components/sheet.js';
import { cancelEntries, enterList } from '../../components/entry-motion.js';
import { showNoShows } from './dashboard-attendance.js';
const resource = 'stylist/dashboard-no-shows';
const sheetId = 'rv-stylist-no-show';
const completions = new Set(['completed', 'no-show', 'no-show-saved']);
const loadNoShows = async () => (await api.read('stylist/dashboard-no-shows')).data;
function configureDayView(root, state) {
  const group = root.querySelector('[role="radiogroup"]');
  const radios = [...group.querySelectorAll('input')];
  if (completions.has(state)) radios.find(radio => radio.value === 'completed').checked = true;
  function render(animate) {
    for (const radio of radios) {
      const panel = document.getElementById(radio.getAttribute('aria-controls'));
      const list = panel.querySelector('[data-rv-entry-list]');
      panel.hidden = !radio.checked;
      if (panel.hidden) cancelEntries(list);
      else if (animate) enterList(list);
    }
  }
  group.addEventListener('change', () => render(true));
  render(false);
}

export async function init(root) {
  const progress = root.querySelector('.rv-stylist-current__progress progress');
  progress.parentElement.style.setProperty('--rv-elapsed-percent', `${Math.max(0, progress.position) * 100}%`);
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
  configureDayView(root, state);
  const toast = root.querySelector('[data-rv-stylist-toast]');
  const initial = root.querySelector('[data-rv-stylist-confirm]');
  const sheet = document.getElementById(sheetId);
  const save = sheet.querySelector('[data-rv-stylist-save]');
  const error = sheet.querySelector('[data-rv-stylist-save-error]');
  let opener;
  let toastTimer;
  toast.addEventListener('animationend', event => {
    if (event.target === toast && event.animationName === 'rv-toast-out' && toast.hasAttribute('data-rv-toast-exiting')) {
      toast.hidden = true;
      delete toast.dataset.rvToastExiting;
    }
  });
  function showReceipt(button) {
    const row = button.closest('[data-rv-stylist-completed]');
    const name = row.querySelector('[data-rv-stylist-client]').textContent;
    const time = row.querySelector('bdi').textContent;
    toast.querySelector('[data-rv-toast-title]').textContent = `عدم حضور ${name} ثبت شد`;
    toast.querySelector('[data-rv-toast-description]').textContent = `نوبت ${time} امروز، بدون اثر مالی`;
    window.clearTimeout(toastTimer);
    delete toast.dataset.rvToastExiting;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) toast.hidden = true;
      else toast.dataset.rvToastExiting = '';
    }, 4000);
  }
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
      if (opener === button && sheet.hidden) button.closest('[role="region"]').focus({ preventScroll: true });
      showReceipt(button);
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
  if (state === 'no-show-saved') showReceipt(initial);
  if (!completions.has(state) || state === 'completed') {
    try {
      showNoShows(root, state, await loadNoShows());
    } catch { /* Explicit saves report storage or connectivity errors in the Sheet. */ }
  }
}
