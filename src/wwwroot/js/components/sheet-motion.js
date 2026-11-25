import { motionTiming, sceneTiming, startMotion } from './motion.js';

const directed = () => Boolean(document.querySelector('[data-rv-bottom-sheets]'));
const sheetTiming = (panel, duration) => (directed() || panel.dataset.rvDrawerMode === 'mobile' ? sceneTiming : motionTiming)(duration);

function startFrame(panel) {
  if (window.matchMedia('(min-width: 1024px)').matches && panel.classList.contains('rv-viewer')) {
    return { opacity: 0, transform: 'scale(0.98)' };
  }
  if (panel.dataset.rvDrawerMode === 'mobile') return { transform: 'translateX(-100%)' };
  if (directed()) return { transform: 'translateY(calc(100% + 24px))' };
  return { opacity: 0.35, transform: 'translateY(min(19%, 68px))' };
}

export function enterSheet(panel) {
  const first = startFrame(panel);
  const last = 'opacity' in first ? { opacity: 1, transform: 'none' } : { transform: 'none' };
  return startMotion(panel, [first, last], { ...sheetTiming(panel, 'duration-slow'), id: 'rv-sheet-enter' });
}

export function exitSheet(panel, dragOffset) {
  const distance = dragOffset ? panel.offsetHeight + 24 : 0;
  const end = distance ? { transform: `translateY(${Math.max(0, distance - dragOffset)}px)` } : startFrame(panel);
  const computed = getComputedStyle(panel);
  const from = Object.fromEntries(Object.keys(end).map(property => [property, computed[property]]));
  const timing = sheetTiming(panel, 'duration-base');
  if (distance) timing.duration = Math.max(motionTiming('duration-fast').duration, timing.duration * (1 - dragOffset / distance));
  return startMotion(panel, [from, end], { ...timing, retain: true });
}

export function animateScrim(layer, entering) {
  const scrim = layer.querySelector('.rv-sheet-scrim');
  if (!scrim) return;
  const from = entering ? 0 : getComputedStyle(scrim).opacity;
  const timing = entering ? motionTiming() : motionTiming('duration-fast', 'ease-exit');
  return startMotion(scrim, [{ opacity: from }, { opacity: Number(entering) }], { ...timing, retain: !entering });
}
