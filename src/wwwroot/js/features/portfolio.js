import { api } from '../core/api.js';
import { cancelEntries } from '../components/entry-motion.js';
import { portfolioEntries } from './public-motion.js';
import { openSheet } from '../components/sheet.js';

export async function init(root) {
  const get = name => root.querySelector('[data-rv-' + name + ']');
  const grid = root.querySelector('.rv-portfolio-grid');
  const cards = [...root.querySelectorAll('[data-rv-work]')];
  const query = new URLSearchParams(window.location.search);
  const allService = root.querySelector('[data-rv-filter="service"]').dataset.rvValue;
  const allStylist = root.querySelector('[data-rv-filter="stylist"]').dataset.rvValue;
  let service = query.get('service') ?? allService;
  let stylist = query.get('stylist') ?? allStylist;
  let filtering = false;
  let loaded = false;
  let desired = { service, stylist };
  const initial = ['default', 'filter', 'viewer', 'empty', 'loading', 'error'].includes(query.get('state')) ? query.get('state') : 'default';
  const stateView = state => {
    for (const name of ['empty', 'loading', 'error']) get('portfolio-' + name).hidden = name !== state;
  };
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
    grid.hidden = count === 0;
    stateView(count ? 'ready' : 'empty');
    root.setAttribute('aria-busy', 'false');
    const params = new URLSearchParams();
    if (service !== allService) params.set('service', service);
    if (stylist !== allStylist) params.set('stylist', stylist);
    history.replaceState(null, '', window.location.pathname + (params.size ? '?' + params : ''));
  }
  async function load(state = 'default') {
    loaded = false;
    grid.hidden = true;
    cards.forEach(card => { card.hidden = true; });
    stateView('loading');
    root.setAttribute('aria-busy', 'true');
    try {
      await api.read('public/portfolio');
      const preview = (await api.read('public/states/' + state)).data;
      if (state === 'error') throw new Error('بارگیری نمونه‌کارها ممکن نشد.');
      if (state === 'loading') return;
      service = preview.service ?? desired.service;
      stylist = preview.stylist ?? desired.stylist;
      loaded = true;
      apply();
      desired = { service, stylist };
      if (document.documentElement.dataset.rvReady) portfolioEntries(root);
      if (state === 'viewer') openSheet('work-1', cards[0].querySelector('button'));
    } catch {
      stateView('error');
    } finally { root.setAttribute('aria-busy', String(state === 'loading')); }
  }
  async function changeFilter(next) {
    if (next.service === desired.service && next.stylist === desired.stylist) return;
    desired = next;
    if (!loaded || filtering) return;
    filtering = true;
    root.setAttribute('aria-busy', 'true');
    grid.inert = true;
    try {
      await portfolioEntries(root, true);
      ({ service, stylist } = desired);
      apply();
      cancelEntries(root);
      grid.inert = false;
      portfolioEntries(root);
    } finally {
      filtering = false;
      grid.inert = false;
    }
  }
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-rv-filter]');
    if (button) {
      changeFilter({ ...desired, [button.dataset.rvFilter]: button.dataset.rvValue });
    }
  });
  get('clear-filter').addEventListener('click', () => changeFilter({ service: allService, stylist: allStylist }));
  get('retry').addEventListener('click', () => load());
  await load(initial);
}
