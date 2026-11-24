import { motionTiming } from './motion.js';

const groups = [
  ['.rv-appointment-detail', ':scope > .rv-appointment-hero, :scope > section:not([hidden])'],
  ['[data-rv-choices-list]', ':scope > a'],
  ['[data-rv-quick-items]', ':scope > a'],
  ['[data-rv-home-appointments]', ':scope > article'],
  ['[data-rv-appointments-records]', ':scope > a'],
  ['[data-rv-request-records]', ':scope > [data-rv-request-record]'],
  ['[data-rv-request-parts] .rv-request-parts', ':scope > li'],
  ['[data-rv-request-schedule]', '.rv-request-schedule__slots > :is(.rv-request-slot, .rv-request-response)'],
  ['[data-rv-availability-active]', ':scope > article'],
  ['[data-rv-availability-history]', ':scope > .rv-appointment-history, :scope > [data-rv-availability-ended] > .rv-appointment-history'],
  ['[data-rv-notifications-records]', '[data-rv-notification]'],
  ['[data-profile-passkeys]', ':scope > li'],
  ['[data-rv-home-payment-rail]', ':scope > article'],
  ['[data-rv-rec-list]', ':scope > .rv-recurring-row'],
  ['[data-rv-group-items]', ':scope > li'],
  ['.rv-booking-package', ':scope > li'],
  ['.rv-booking-soon', ':scope > label'],
  ['[data-rv-picks] .rv-booking-picks__grid', ':scope > label'],
  ['[data-rv="portfolio"]', '[data-rv-work]'],
  ['.rv-customer-home__content', '[data-rv-home-personal], .rv-customer-announcement']
];

export function initListEntry() {
  if (!window.Element.prototype.animate) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const active = new Map();
  const visible = el => el.isConnected && !el.closest('[hidden], [inert]') && el.getClientRects().length > 0;
  const cancel = el => { active.get(el)?.cancel(); active.delete(el); };
  const stop = () => { for (const el of active.keys()) cancel(el); };
  const flush = () => {
    const timing = motionTiming('duration-base');
    const stagger = timing.duration - motionTiming('duration-fast').duration / 2;
    const tokens = getComputedStyle(document.documentElement);
    const offset = tokens.getPropertyValue('--space-6').trim();
    const rowTolerance = Number.parseFloat(tokens.getPropertyValue('--space-1'));
    for (const el of active.keys()) if (!visible(el)) cancel(el);
    for (const [selector, items] of groups) for (const list of document.querySelectorAll(selector)) {
      list.dataset.rvListEntry = '';
      const pending = [];
      for (const el of list.querySelectorAll(items)) {
        if (!visible(el)) continue;
        if (!reduced.matches && !el.contains(document.activeElement)) pending.push(el);
      }
      const candidates = pending.map(el => ({ el, rect: el.getBoundingClientRect() }));
      const ordered = selector === '[data-rv-appointments-records]' ? candidates : candidates.sort((a, b) =>
        Math.abs(a.rect.top - b.rect.top) > rowTolerance ? a.rect.top - b.rect.top : b.rect.right - a.rect.right);
      ordered.forEach(({ el }, index) => {
        const frames = desktop.matches && selector !== '.rv-appointment-detail' ? [{ opacity: 0 }, { opacity: 1 }] : [
          { opacity: 0, transform: `translateX(-${offset})` }, { opacity: 1, transform: 'none' }
        ];
        const animation = el.animate(frames, { ...timing, id: 'rv-list-entry', delay: index * stagger, fill: 'backwards' });
        active.set(el, animation);
        animation.finished.catch(() => {}).finally(() => { if (active.get(el) === animation) active.delete(el); });
      });
    }
  };
  const page = document.querySelector('[data-rv-page]');
  const observer = typeof MutationObserver === 'function' ? new MutationObserver(() => { if (page?.inert) stop(); }) : null;
  document.addEventListener('focusin', event => { for (const el of active.keys()) if (el.contains(event.target)) cancel(el); });
  reduced.addEventListener('change', stop);
  desktop.addEventListener('change', stop);
  window.addEventListener('pagehide', () => { stop(); observer?.disconnect(); });
  flush();
  if (page) observer?.observe(page, { attributes: true, attributeFilter: ['inert'] });
}
