// CUS-03: deterministic source-date filtering; no domain writes or Gregorian date input.
export const defaults = () => ({ range: 'all', status: ['all'], service: ['all'], stylist: ['all'], from: '', to: '' });
export const digits = value => String(value).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
export const fa = value => new Intl.NumberFormat('fa-IR').format(value);

export function parseDate(value) {
  const match = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(digits(value).trim());
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const leap = [1, 5, 9, 13, 17, 22, 26, 30].includes(y % 33);
  if (y < 1300 || y > 1500 || m < 1 || m > 12 || d < 1 || d > (m <= 6 ? 31 : m < 12 || leap ? 30 : 29)) return null;
  return `${y}/${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}`;
}

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
  for (const key of ['from', 'to']) if (query.has(key)) filters[key] = parseDate(query.get(key)) ?? '';
  if (filters.from && filters.to && filters.from > filters.to) Object.assign(filters, { range: 'all', from: '', to: '' });
  if (state === 'noresult') Object.assign(filters, { status: ['absent'], stylist: ['sina'] });
  return { tab, filters };
}

export function matches(record, filters) {
  if (!filters.service.includes('all') && !filters.service.includes(record.serviceId)) return false;
  if (!filters.stylist.includes('all') && !filters.stylist.includes(record.stylistId)) return false;
  if (!filters.status.includes('all') && !filters.status.includes(record.status)) return false;
  const from = parseDate(filters.from), to = parseDate(filters.to);
  if ((filters.from && !from) || (filters.to && !to)) return false;
  return (!from || record.date >= from) && (!to || record.date <= to);
}

export function updateUrl(tab, filters, push = true) {
  const url = new URL(location.href);
  for (const key of ['tab', 'range', 'status', 'service', 'stylist', 'boundary', 'from', 'to']) url.searchParams.delete(key);
  if (['past', 'filter', 'filter-past', 'noresult'].includes(url.searchParams.get('state'))) url.searchParams.delete('state');
  if (tab === 'history') url.searchParams.set('tab', tab);
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) value.filter(item => item !== 'all').forEach(item => url.searchParams.append(key, item));
    else if (value && value !== 'all') url.searchParams.set(key, value);
  }
  if (push) history.pushState(null, '', url);
  else history.replaceState(null, '', url);
}
