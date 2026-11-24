import { faDigits } from '../../core/format.js';
import { keepRailChoicesInView } from '../../components/rail.js';
import { matchesRequest, requestFilter } from './request-filter.js';
import { readRequests, refreshRequests, requestClock, requestGroup, requestStatus } from './request-state.js';
import { draftCard } from './submitted-requests.js';

export async function init(root) {
  const query = new URLSearchParams(location.search);
  const groups = [...root.querySelectorAll('[data-rv-request-group]')];
  const radios = [...document.querySelectorAll('[name="request-tab"]')];
  const groupNodes = Object.fromEntries(groups.map(group => [group.dataset.rvRequestGroup, group.querySelector('[data-rv-request-records]')]));
  const lookup = new Map([...root.querySelectorAll('[data-rv-request-record]')].map(card => [card.dataset.rvRequestRecord, card]));
  const drafts = new Map(['RQ-2219', 'RQ-2215'].map(id => [id, lookup.get(id).cloneNode(true)]));
  const empty = root.querySelector('[data-rv-request-empty]');
  const noResults = root.querySelector('[data-rv-request-no-result]');
  const selected = () => radios.find(radio => radio.value === query.get('tab')) ?? radios[0];
  selected().checked = true;
  let records = [];
  const views = new Map();
  const apply = () => {
    history.replaceState(null, '', location.pathname + '?' + query);
    render();
  };
  const openFilterPreview = requestFilter(query, () => ({
    active: selected().value, records: query.get('state') === 'empty' ? [] : records
  }), apply);
  keepRailChoicesInView(document.querySelector('#rv-request-filter-form [data-rv-drag-rail]'));
  for (const radio of radios) radio.addEventListener('change', () => {
    views.set(selected().value, [...query].filter(([key]) => !['tab', 'state'].includes(key)));
    for (const [key] of [...query]) if (!['tab', 'state'].includes(key)) query.delete(key);
    query.set('tab', radio.value);
    if (query.get('state') === 'filter') query.delete('state');
    for (const [key, value] of views.get(radio.value) ?? []) query.append(key, value);
    if (records.length) apply();
  });
  function render() {
    const total = { pay: 0, wait: 0, done: 0 };
    const shown = { ...total };
    const active = selected().value;
    const emptyPreview = query.get('state') === 'empty';
    for (const record of records) {
      const status = requestStatus(record);
      const group = requestGroup(status);
      if (record.sampleId && !lookup.has(record.id)) lookup.set(record.id, draftCard(drafts.get(record.sampleId), record));
      const card = lookup.get(record.id);
      if (!card) continue;
      if (card.parentElement !== groupNodes[group]) groupNodes[group].prepend(card);
      card.dataset.rvRequestListStatus = status;
      card.querySelector('[data-rv-request-active]').hidden = group === 'done';
      card.querySelector('[data-rv-request-history]').hidden = group !== 'done';
      const hold = card.querySelector('[data-rv-request-hold]');
      if (hold) {
        hold.hidden = status !== 'pay';
        if (!hold.hidden) requestClock(hold, record.expiresAt);
      }
      for (const marker of card.querySelectorAll('[data-rv-request-result]')) marker.hidden = marker.dataset.rvRequestResult !== status;
      card.hidden = emptyPreview || !matchesRequest(query, record, status);
      if (!emptyPreview) total[group]++;
      if (!card.hidden) shown[group]++;
    }
    for (const group of groups) {
      const key = group.dataset.rvRequestGroup;
      group.hidden = key !== active || !shown[key];
      document.querySelector('[data-rv-request-count="' + key + '"]').textContent = faDigits(total[key]);
      if (key !== 'pay') group.querySelector('[data-rv-request-group-note]').textContent = faDigits(shown[key]) + ' درخواست';
    }
    empty.hidden = !emptyPreview;
    noResults.hidden = emptyPreview || Boolean(shown[active]);
  }
  try {
    records = await readRequests();
    refreshRequests(render, async () => {
      try { records = await readRequests(); render(); }
      catch { /* Keep the last readable list while the source is unavailable. */ }
    });
    openFilterPreview();
  } catch (error) {
    const feedback = root.querySelector('[data-rv-request-error]');
    feedback.textContent = error.message;
    feedback.hidden = false;
  }
}
