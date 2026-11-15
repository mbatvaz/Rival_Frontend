const normalize = value => value.toLowerCase().replace(/[۰-۹]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)).trim();

export function initFilters(rows) {
  const parents = rows.filter(row => row.hasAttribute('data-rv-page-row'));
  const opened = new Set();
  const search = document.querySelector('[data-rv-review-search]');
  const filter = document.querySelector('[data-rv-review-filter]');
  const apply = () => {
    const term = normalize(search.value);
    const matches = row => normalize(row.dataset.rvReviewTitle + row.dataset.rvReviewId
      + (row.dataset.rvVariantQuery ?? '')).includes(term) && (filter.value === 'all' || row.dataset.status === filter.value);
    for (const row of rows.filter(row => row.dataset.rvParentId)) row.hidden = !matches(row);
    for (const parent of parents) {
      const variants = [...parent.querySelectorAll('[data-rv-parent-id]')];
      const childMatches = variants.some(row => !row.hidden);
      parent.hidden = !matches(parent) && !childMatches;
      const details = parent.querySelector(':scope > details');
      if (!details) continue;
      details.hidden = !childMatches;
      if ((term || filter.value !== 'all') && childMatches && !details.open) {
        details.open = true;
        opened.add(details);
      } else if (!term && filter.value === 'all' && opened.has(details)) {
        details.open = false;
        opened.delete(details);
      }
    }
    for (const group of document.querySelectorAll('.rv-review__group')) {
      group.hidden = ![...group.querySelectorAll('[data-rv-page-row]')].some(row => !row.hidden);
    }
    document.querySelector('[data-rv-review-empty]').hidden = parents.some(row => !row.hidden);
  };
  document.querySelector('[data-rv-review-filters]').addEventListener('submit', event => event.preventDefault());
  search.addEventListener('input', apply);
  filter.addEventListener('change', apply);
  return apply;
}
