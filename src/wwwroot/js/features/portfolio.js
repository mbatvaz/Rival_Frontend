import { api } from '../core/api.js';
import { openSheet } from '../components/sheet.js';

export async function init(root) {
  const status = root.querySelector('[data-rv-portfolio-status]');
  const clear = root.querySelector('[data-rv-clear-filter]');
  const retry = root.querySelector('[data-rv-retry]');
  const cards = [...root.querySelectorAll('[data-rv-work]')];
  const query = new URLSearchParams(window.location.search);
  const allService = root.querySelector('[data-rv-filter="service"]').dataset.rvValue;
  const allStylist = root.querySelector('[data-rv-filter="stylist"]').dataset.rvValue;
  let service = query.get('service') ?? allService;
  let stylist = query.get('stylist') ?? allStylist;
  const initial = ['default', 'filter', 'viewer', 'empty', 'loading', 'error'].includes(query.get('state')) ? query.get('state') : 'default';
  function apply() {
    let count = 0;
    for (const card of cards) {
      card.hidden = !(service === allService || card.dataset.rvService === service)
        || !(stylist === allStylist || card.dataset.rvStylist === stylist);
      if (!card.hidden) count++;
    }
    for (const button of root.querySelectorAll('[data-rv-filter]')) {
      button.setAttribute('aria-pressed', String(button.dataset.rvValue === (button.dataset.rvFilter === 'service' ? service : stylist)));
    }
    clear.hidden = service === allService && stylist === allStylist && count > 0;
    status.textContent = count ? '' : 'نمونه‌کاری با این فیلترها نیست. فیلتر دیگری انتخاب کنید یا همه نمونه‌کارها را ببینید.';
    const params = new URLSearchParams();
    if (service !== allService) params.set('service', service);
    if (stylist !== allStylist) params.set('stylist', stylist);
    history.replaceState(null, '', window.location.pathname + (params.size ? '?' + params : ''));
  }
  async function load(state = 'default') {
    cards.forEach(card => { card.hidden = true; });
    status.textContent = 'در حال بارگیری نمونه‌کارها…';
    root.setAttribute('aria-busy', 'true');
    retry.hidden = true;
    try {
      await api.read('public/portfolio');
      const preview = (await api.read('public/states/' + state)).data;
      if (state === 'error') throw new Error('بارگیری نمونه‌کارها ممکن نشد. دوباره تلاش کنید.');
      if (state === 'loading') return;
      service = preview.service ?? service;
      stylist = preview.stylist ?? stylist;
      apply();
      if (state === 'viewer') openSheet('work-1', cards[0].querySelector('button'));
    } catch (error) {
      status.textContent = error.message;
      retry.hidden = false;
    } finally { root.setAttribute('aria-busy', String(state === 'loading')); }
  }
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-rv-filter]');
    if (button) {
      if (button.dataset.rvFilter === 'service') service = button.dataset.rvValue;
      else stylist = button.dataset.rvValue;
      apply();
    }
  });
  clear.addEventListener('click', () => { service = allService; stylist = allStylist; apply(); });
  retry.addEventListener('click', () => load());
  await load(initial);
}
