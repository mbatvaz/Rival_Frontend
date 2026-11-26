import { openSheet } from '../../components/sheet.js';
import { motionTiming, startMotion } from '../../components/motion.js';

function animateCardLift(preview, page, distance) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!distance || reduced.matches || !preview.animate) return;
  const frames = [{ transform: `translateY(-${distance}px)` }, { transform: 'translateY(0)' }];
  const timing = { ...motionTiming(), id: 'rv-card-lift' };
  const animations = [startMotion(preview, frames, timing), startMotion(page, frames, timing)];
  const cancel = () => animations.forEach(animation => animation.cancel());
  reduced.addEventListener('change', cancel);
  Promise.allSettled(animations.map(animation => animation.finished))
    .then(() => reduced.removeEventListener('change', cancel));
  return cancel;
}

export function cardSheetOpener(preview, cardFor) {
  const page = document.querySelector('[data-rv-page]');
  const layer = preview.parentElement;
  let cancelLift;
  let activeSheet;
  document.addEventListener('rv:sheet-close', event => {
    if (event.detail.id !== activeSheet) return;
    activeSheet = undefined;
    cancelLift?.();
    cancelLift = undefined;
    preview.hidden = true;
    preview.replaceChildren();
  });

  return (id, opener) => {
    if (!layer.hidden) return;
    const hero = cardFor(opener);
    const bounds = hero.getBoundingClientRect();
    const start = window.scrollY;
    const target = Math.min(start, Math.max(0, start + bounds.top - 16));
    const distance = start - target;
    preview.replaceChildren(hero.cloneNode(true));
    preview.style.setProperty('--rv-hero-left', bounds.left + 'px');
    preview.style.setProperty('--rv-hero-top', bounds.top + distance + 'px');
    preview.style.setProperty('--rv-hero-width', bounds.width + 'px');
    preview.hidden = false;
    openSheet(id, opener, { scrollPosition: target });
    activeSheet = id;
    cancelLift = animateCardLift(preview, page, distance);
  };
}

export function appointmentSheetOpener(current, cardFor = () => current.querySelector('.rv-appointment-hero')) {
  return cardSheetOpener(document.querySelector('[data-rv-cancel-hero]'), cardFor);
}
