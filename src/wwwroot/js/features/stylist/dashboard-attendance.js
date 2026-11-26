const format = new Intl.NumberFormat('fa-IR');
const fa = number => format.format(number);

export function showNoShows(root, state, ids) {
  const records = [...root.querySelectorAll('[data-rv-stylist-completed]')];
  const absent = new Set(ids);
  for (const row of records) {
    const recorded = absent.has(row.dataset.rvStylistCompleted);
    row.querySelector('[data-rv-stylist-attended]').hidden = recorded;
    row.querySelector('[data-rv-stylist-confirm]').hidden = recorded || state === 'inactive';
    row.querySelector('[data-rv-stylist-absent-label]').hidden = !recorded;
  }
  const empty = state === 'empty';
  const done = empty ? 0 : records.length - records.filter(row => absent.has(row.dataset.rvStylistCompleted)).length;
  const missing = empty ? 0 : records.length - done;
  const upcoming = empty ? 0 : root.querySelectorAll('[data-rv-stylist-upcoming-record]').length;
  const total = empty ? 0 : records.length + 1 + upcoming;
  const gauge = root.querySelector('[data-rv-stylist-gauge]');
  gauge.setAttribute('aria-label', empty ? 'امروز نوبتی ندارید'
    : `از ${fa(total)} نوبت امروز: ${fa(done)} انجام‌شده، ۱ جاری، ${fa(upcoming)} مانده${missing ? `، ${fa(missing)} عدم حضور` : ''}`);
  gauge.querySelector('[data-rv-stylist-count]').textContent = fa(done + missing);
  gauge.querySelector('[data-rv-stylist-total]').textContent = empty ? 'نوبت امروز' : `از ${fa(total)} نوبت`;
  gauge.querySelector('[data-rv-stylist-finished]').setAttribute('stroke-dasharray', `${done} 7`);
  const segment = gauge.querySelector('[data-rv-stylist-absent]');
  segment.setAttribute('stroke-dasharray', `${missing} 7`);
  gauge.querySelector('[data-rv-stylist-finished]').setAttribute('stroke-dashoffset', String(-missing));
}
