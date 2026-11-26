import { motionBatch, visibleEntries } from '../components/entry-motion.js';

export function portfolioEntries(root, exit = false) {
  const cards = visibleEntries(root, '[data-rv-work]')
    .filter(el => !exit || el.hasAttribute('data-rv-media-ready'))
    .map(el => {
      const box = el.getBoundingClientRect();
      return { el, top: box.top + (box.height - el.offsetHeight) / 2, right: box.right + (el.offsetWidth - box.width) / 2 };
    })
    .sort((a, b) => Math.abs(a.top - b.top) < 4 ? b.right - a.right : a.top - b.top);
  return motionBatch(root, ({ list }) => list(cards.map(card => card.el), 'zoom', 0, 'duration-slow'), { exit });
}

export function rulesEntries(root) {
  if (!window.IntersectionObserver || !window.Element.prototype.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new window.IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      delete target.dataset.rvRulePending;
      motionBatch(target, ({ items, add }) => {
        for (const el of items(':scope > *')) {
          if (el.matches('.rv-panel')) {
            const end = add(el);
            for (const child of el.children) add(child, 'fade', end);
          } else add(el, 'fade');
        }
      });
    }
  });
  for (const section of root.querySelectorAll('.rv-rules__body > section')) {
    section.dataset.rvRulePending = '';
    observer.observe(section);
  }
}

export function otpEntries(root, delay) {
  return motionBatch(root.querySelector('[data-rv-otp-stage]'), ({ list, items, step }) => list(items('[data-rv-otp-cell]'), 'digit', delay ?? step));
}
