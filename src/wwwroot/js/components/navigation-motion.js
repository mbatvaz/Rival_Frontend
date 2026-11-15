import { playMotion } from './motion.js';

export function initNavigationMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let leaving = false;
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || reduced.matches || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.search === window.location.search)) return;
    const page = document.querySelector('[data-rv-page] > main');
    if (!page?.animate) return;
    event.preventDefault();
    if (leaving) return;
    leaving = true;
    playMotion(page, [{ opacity: 1 }, { opacity: 0.35 }], 'duration-fast', 'ease-exit')
      .then(() => window.location.assign(url.href));
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    leaving = false;
    document.querySelector('[data-rv-page] > main')?.getAnimations?.().forEach(animation => animation.cancel());
  });
}
