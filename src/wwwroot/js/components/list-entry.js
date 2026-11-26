import { motionTiming, startMotion } from './motion.js';

const groups = [
  ['[data-rv-picks] .rv-booking-picks__grid', ':scope > label']
];

function visualRows(candidates, tolerance) {
  const rows = [];
  for (const candidate of candidates.sort((a, b) => a.rect.top - b.rect.top)) {
    const row = rows.at(-1);
    if (row && candidate.rect.top - row[0].rect.top <= tolerance) row.push(candidate);
    else rows.push([candidate]);
  }
  return rows.map(row => row.sort((a, b) => b.rect.right - a.rect.right));
}

export function initListEntry() {
  if (!window.Element.prototype.animate) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Map();
  const visible = el => el.isConnected && !el.closest('[hidden], [inert]') && el.getClientRects().length > 0;
  const cancel = el => { active.get(el)?.cancel(); active.delete(el); };
  const stop = () => { for (const el of active.keys()) cancel(el); };
  const flush = () => {
    const timing = motionTiming('duration-base');
    const stagger = motionTiming('duration-fast').duration / 2;
    const tokens = getComputedStyle(document.documentElement);
    const rowOffset = tokens.getPropertyValue('--space-2').trim();
    const rowTolerance = Number.parseFloat(tokens.getPropertyValue('--space-1'));
    for (const el of active.keys()) if (!visible(el)) cancel(el);
    for (const [selector, items] of groups) for (const list of document.querySelectorAll(selector)) {
      list.dataset.rvListEntry = '';
      const pending = [];
      for (const el of list.querySelectorAll(items)) {
        if (!visible(el) || !el.closest('[data-rv-entry-zone]') || el.matches('[data-rv-card-media]:not([data-rv-media-ready])')) continue;
        if (!reduced.matches && !el.contains(document.activeElement)) pending.push(el);
      }
      const candidates = pending.map(el => ({ el, rect: el.getBoundingClientRect() }));
      const offsetValue = '0 ' + rowOffset;
      visualRows(candidates, rowTolerance).forEach((row, rowIndex) => row.forEach(({ el }, column) => {
        const frames = [{ opacity: 0.4, translate: offsetValue }, { opacity: 1, translate: '0 0' }];
        const animation = startMotion(el, frames, {
          ...timing, id: 'rv-list-entry', delay: Math.min(3, rowIndex + Math.min(column, 2) / 3) * stagger
        });
        active.set(el, animation);
        animation.finished.catch(() => {}).finally(() => { if (active.get(el) === animation) active.delete(el); });
      }));
    }
  };
  const page = document.querySelector('[data-rv-page]');
  const observer = typeof MutationObserver === 'function' ? new MutationObserver(() => { if (page?.inert) stop(); }) : null;
  document.addEventListener('focusin', event => { for (const el of active.keys()) if (el.contains(event.target)) cancel(el); });
  reduced.addEventListener('change', stop);
  window.addEventListener('pagehide', () => { stop(); observer?.disconnect(); });
  flush();
  if (page) observer?.observe(page, { attributes: true, attributeFilter: ['inert'] });
}
