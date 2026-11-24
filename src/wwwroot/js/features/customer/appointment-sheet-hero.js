import { openSheet } from '../../components/sheet.js';

// Shared appointment lift for cancellation and swap sheets.
export function appointmentSheetOpener(current, selector = '.rv-appointment-hero') {
  const preview = document.querySelector('[data-rv-cancel-hero]');
  const page = document.querySelector('[data-rv-page]');
  const layer = preview.parentElement;
  let animations = [];
  document.addEventListener('rv:sheet-close', () => {
    animations.forEach(animation => animation.cancel());
    preview.hidden = true;
    preview.replaceChildren();
    delete layer.dataset.rvSwapLift;
    layer.style.removeProperty('--rv-swap-hero-space');
  });

  return (id, opener) => {
    if (!layer.hidden) return;
    const hero = typeof selector === 'string' ? current.querySelector(selector) : selector(opener);
    const bounds = hero.getBoundingClientRect();
    const start = window.scrollY;
    const target = Math.min(start, Math.max(0, start + bounds.top - 16));
    const distance = start - target;
    const swap = id.startsWith('rv-swap-');
    preview.replaceChildren(hero.cloneNode(true));
    preview.style.setProperty('--rv-hero-left', bounds.left + 'px');
    preview.style.setProperty('--rv-hero-top', bounds.top + distance + 'px');
    preview.style.setProperty('--rv-hero-width', bounds.width + 'px');
    preview.hidden = false;
    if (swap) {
      layer.dataset.rvSwapLift = '';
      layer.style.setProperty('--rv-swap-hero-space', Math.max(0, bounds.bottom + distance) + 'px');
    }
    openSheet(id, opener, { scrollPosition: target });
    if (distance && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && preview.animate) {
      const frames = [{ transform: `translateY(-${distance}px)` }, { transform: 'translateY(0)' }];
      const timing = { duration: 500, easing: 'ease-out' };
      animations = [preview.animate(frames, timing), page.animate(frames, timing)];
    }
  };
}
