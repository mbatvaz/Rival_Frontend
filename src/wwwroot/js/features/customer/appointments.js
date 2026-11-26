import { appointmentEntries } from '../../components/route-entries.js';
import { api } from '../../core/api.js';
import { faNumber } from '../../core/format.js';
import { defaults, fromUrl, matches, updateUrl } from './appointment-filters.js';
import { initFilterSheet } from './appointment-filter-sheet.js';
import { refreshAppointmentCards } from './reschedule-summaries.js';
import { swapCustomer } from './appointment-swap-context.js';
import { projectSwapAppointments } from './appointment-swap-summaries.js';

export async function init(root) {
  root = root.closest('.rv-customer-panel');
  const list = root.querySelector('.rv-appointments');
  const replay = () => { if (document.documentElement.dataset.rvReady) appointmentEntries(list); };
  const state = new URLSearchParams(location.search).get('state');
  const error = root.querySelector('[data-rv-list-error]');
  const loading = root.querySelector('[data-rv-list-loading]');
  const panels = [...root.querySelectorAll('[data-rv-appointments-panel]')];
  const tabs = [...root.querySelectorAll('[data-rv-appointments-tab]')];
  let data, current;
  function chips() {
    const container = root.querySelector('[data-rv-filter-chips]');
    container.replaceChildren();
    for (const [key, options] of [['status', data.filters.status], ['service', data.filters.services], ['stylist', data.filters.stylists], ['range', data.filters.ranges]]) {
      const values = Array.isArray(current.filters[key]) ? current.filters[key] : [current.filters[key]];
      for (const value of values) {
        if (value === 'all') continue;
        const option = options.find(option => option.value === value);
        if (!option) continue;
        const button = document.createElement('button');
        button.type = 'button'; button.textContent = option.label + ' ×';
        button.setAttribute('aria-label', 'حذف فیلتر ' + option.label);
        button.addEventListener('click', () => {
          current.filters[key] = Array.isArray(current.filters[key]) ? current.filters[key].filter(item => item !== value) : 'all';
          if (Array.isArray(current.filters[key]) && !current.filters[key].length) current.filters[key] = ['all'];
          if (key === 'range') Object.assign(current.filters, { from: '', to: '' });
          updateUrl(current.tab, current.filters); render(); root.querySelector('[data-rv-appointments-filter]').focus();
        });
        container.append(button);
      }
    }
    container.hidden = !container.childElementCount;
    const badge = root.querySelector('[data-rv-filter-count]');
    badge.hidden = container.hidden; badge.textContent = faNumber(container.childElementCount);
  }
  function render() {
    const group = data.groups.find(group => group.key === current.tab);
    const records = group.months.flatMap(month => month.items);
    let count = 0;
    for (const panel of panels) {
      panel.hidden = panel.dataset.rvAppointmentsPanel !== current.tab;
      for (const el of panel.querySelectorAll('[data-rv-record]')) {
        const record = records.find(record => record.id === el.dataset.rvRecord);
        el.hidden = !record || !matches(record, current.filters);
        if (!panel.hidden && !el.hidden) count++;
      }
      for (const month of panel.querySelectorAll('[data-rv-record-month]')) month.hidden = ![...month.querySelectorAll('[data-rv-record]')].some(el => !el.hidden);
    }
    tabs.forEach(tab => { tab.checked = tab.dataset.rvAppointmentsTab === current.tab; });
    for (const group of data.groups) root.querySelector(`[data-rv-total="${group.key}"]`).textContent = faNumber(group.count);
    for (const el of root.querySelectorAll('[data-rv-list-empty]')) el.hidden = count > 0 || el.dataset.rvListEmpty !== (group.count === 0 ? 'empty' : 'noresult');
    root.querySelector('[data-rv-appointments-status]').textContent = `${faNumber(count)} نوبت ${group.label}`;
    chips();
    replay();
  }
  async function load(demoState) {
    root.setAttribute('aria-busy', 'true');
    loading.hidden = false; error.hidden = true; panels.forEach(panel => { panel.hidden = true; });
    try {
      data = (await api.read('customer/appointments', { state: demoState })).data;
      const customer = swapCustomer();
      if (customer) await projectSwapAppointments(root, data, customer);
      else if (demoState === 'default') await refreshAppointmentCards(root, data);
      current = fromUrl(data);
      loading.hidden = true;
      render();
    } catch (failure) {
      loading.hidden = true; error.hidden = false;
      root.querySelector('[data-rv-list-error-text]').textContent = failure.message;
      root.querySelector('[data-rv-appointments-filter]').disabled = true;
      tabs.forEach(tab => { tab.disabled = true; });
      replay();
      root.setAttribute('aria-busy', 'false');
      return false;
    }
    root.querySelector('[data-rv-appointments-filter]').disabled = false;
    tabs.forEach(tab => { tab.disabled = false; });
    root.setAttribute('aria-busy', 'false');
    return true;
  }
  const loaded = await load(['empty', 'error', 'loading'].includes(state) ? state : 'default');
  if (state === 'loading') { panels.forEach(panel => { panel.hidden = true; }); loading.hidden = false; root.setAttribute('aria-busy', 'true'); root.querySelector('[data-rv-appointments-filter]').disabled = true; tabs.forEach(tab => { tab.disabled = true; }); }
  let bound = false;
  function bind() {
    if (bound) return;
    bound = true;
    const apply = filters => { current.filters = filters; updateUrl(current.tab, filters); render(); };
    const open = initFilterSheet(root, data, () => current, apply);
    tabs.forEach(tab => tab.addEventListener('change', () => { current.tab = tab.value; updateUrl(current.tab, current.filters); render(); }));
    root.querySelector('[role="radiogroup"]').addEventListener('keydown', event => {
      if (!['Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = event.key === 'Home' ? 0 : tabs.length - 1;
      tabs[index]?.click(); tabs[index]?.focus();
    });
    root.querySelector('[data-rv-filter-clear]').addEventListener('click', () => { apply(defaults()); root.querySelector('[data-rv-appointments-filter]').focus(); });
    window.addEventListener('popstate', () => { current = fromUrl(data); render(); });
    if (['filter', 'filter-past'].includes(state)) open();
  }
  if (loaded && state !== 'loading') bind();
  root.querySelector('[data-rv-list-retry]').addEventListener('click', async () => {
    if (await load('default')) { const url = new URL(location.href); url.searchParams.delete('state'); history.replaceState(null, '', url); bind(); tabs.find(tab => tab.checked)?.focus(); }
  });
}
