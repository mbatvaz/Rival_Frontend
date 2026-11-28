import { selectDock } from './customer-dock.js';

async function leaveSidebar(active) {
  active.dataset.rvNavLeaving = '';
  const exit = active.getAnimations?.({ subtree: true }).find(animation => animation.animationName === 'rv-sidebar-active-exit');
  await exit?.finished.catch(() => {});
  return true;
}

export function initNavigationMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let revision = 0;
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || reduced.matches || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.search === window.location.search)) return;
    const tabs = link.closest('.rv-customer-dock__tabs');
    const dock = tabs?.closest('[data-rv-role-dock]');
    const active = link.closest('.rv-booking-sidebar')?.querySelector(':scope > a[aria-current="page"]');
    const transition = dock && tabs.offsetWidth ? () => selectDock(dock, link) :
      active && active !== link && active.offsetWidth ? () => leaveSidebar(active) : null;
    if (!transition) return;
    event.preventDefault();
    const pending = ++revision;
    transition().then(proceed => {
      if (pending === revision && proceed) window.location.assign(url.href);
    });
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    document.querySelector('[data-rv-page] > main')?.getAnimations?.().forEach(animation => animation.cancel());
  });
  window.addEventListener('pagehide', () => {
    revision++;
    document.querySelector('[data-rv-nav-leaving]')?.removeAttribute('data-rv-nav-leaving');
  });
}
