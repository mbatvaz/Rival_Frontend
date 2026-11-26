import { motionBatch } from './entry-motion.js';

const notices = '.rv-auth-lock, .rv-customer-notice, .rv-booking__notice, [data-rv-request-outcome]';

export function initNoticeEntries(page) {
  const seen = new WeakSet();
  const show = notice => {
    if (notice.closest('[hidden]') || !notice.textContent.trim()) { seen.delete(notice); return; }
    if (seen.has(notice)) return;
    if (notice.closest('[inert]')) return;
    seen.add(notice);
    // Leave the dashboard glass surface and its shadow outside the clipping animation.
    const target = notice.closest('.rv-customer-home__content') ? notice.querySelector(':scope > div') ?? notice : notice;
    motionBatch(notice, ({ add }) => add(target, 'right'));
  };
  page.querySelectorAll(notices).forEach(show);
  new MutationObserver(records => {
    for (const { target, addedNodes } of records) {
      if (target.matches?.(notices)) show(target);
      for (const child of addedNodes) {
        if (child.nodeType !== 1) continue;
        if (child.matches(notices)) show(child);
        child.querySelectorAll(notices).forEach(show);
      }
    }
  }).observe(page, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden'] });
}
