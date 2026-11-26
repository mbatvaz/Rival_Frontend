import { selectDock } from './customer-dock.js';

export function initNavigationMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let revision = 0;
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || reduced.matches || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.search === window.location.search)) return;
    const dock = link.closest('[data-rv-customer-dock]');
    if (dock && link.closest('.rv-customer-dock__tabs')) {
      event.preventDefault();
      const pending = ++revision;
      selectDock(dock, link).then(proceed => {
        if (pending !== revision) return;
        if (proceed) window.location.assign(url.href);
      });
      return;
    }
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    document.querySelector('[data-rv-page] > main')?.getAnimations?.().forEach(animation => animation.cancel());
  });
  window.addEventListener('pagehide', () => { revision++; });
}
