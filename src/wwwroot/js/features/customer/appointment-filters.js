import { parseJalaliDate } from '../../core/format.js';

// CUS-03: deterministic source-date filtering; no domain writes or Gregorian date input.
export const defaults = () => ({ range: 'all', status: ['all'], service: ['all'], stylist: ['all'], from: '', to: '' });

export function fromUrl(data) {
  const query = new URLSearchParams(location.search);
  const state = query.get('state');
  const tab = query.get('tab') === 'history' || ['past', 'filter-past', 'noresult'].includes(state) ? 'history' : 'upcoming';
  const filters = defaults();
  for (const [key, options] of [['service', data.filters.services], ['stylist', data.filters.stylists], ['status', data.filters.status]]) {
    const allowed = new Set(options.map(option => option.value));
    const selected = [...new Set(query.getAll(key).flatMap(value => value.split(',')).filter(value => allowed.has(value) && value !== 'all'))];
    if (selected.length) filters[key] = selected;
  }
  if (data.filters.ranges.some(option => option.value === query.get('range'))) filters.range = query.get('range');
  Object.assign(filters, data.filters.boundaries[filters.range]);
  for (const key of ['from', 'to']) if (query.has(key)) filters[key] = parseJalaliDate(query.get(key)) ?? '';
  if (filters.from && filters.to && filters.from > filters.to) Object.assign(filters, { range: 'all', from: '', to: '' });
  if (state === 'noresult') Object.assign(filters, { status: ['absent'], stylist: ['sina'] });
  return { tab, filters };
}

export function matches(record, filters) {
  if (!filters.service.includes('all') && !filters.service.includes(record.serviceId)) return false;
  if (!filters.stylist.includes('all') && !filters.stylist.includes(record.stylistId)) return false;
  if (!filters.status.includes('all') && !filters.status.includes(record.status)) return false;
  const from = parseJalaliDate(filters.from), to = parseJalaliDate(filters.to);
  if ((filters.from && !from) || (filters.to && !to)) return false;
  return (!from || record.date >= from) && (!to || record.date <= to);
}

export function updateUrl(tab, filters) {
  const url = new URL(location.href);
  for (const key of ['tab', 'range', 'status', 'service', 'stylist', 'boundary', 'from', 'to']) url.searchParams.delete(key);
  if (['past', 'filter', 'filter-past', 'noresult'].includes(url.searchParams.get('state'))) url.searchParams.delete('state');
  if (tab === 'history') url.searchParams.set('tab', tab);
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) value.filter(item => item !== 'all').forEach(item => url.searchParams.append(key, item));
    else if (value && value !== 'all') url.searchParams.set(key, value);
  }
  history.pushState(null, '', url);
}
