import { motionTiming, startMotion } from '../../components/motion.js';

const active = new WeakMap();
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

export function reveal(elements, frames = [{ opacity: 0 }, { opacity: 1 }], rows = false, retain = false) {
  const timing = motionTiming('duration-base');
  const stagger = motionTiming('duration-fast').duration / 2;
  const animations = [];
  return Promise.all([...elements].map((element, index) => {
    active.get(element)?.cancel();
    if (!element.animate || reduced.matches) return Promise.resolve();
    const animation = startMotion(element, frames, {
      ...timing, delay: (rows ? Math.floor(index / 7) : index) * stagger, retain
    });
    active.set(element, animation);
    animations.push(animation);
    const cancel = () => { if (reduced.matches) animation.cancel(); };
    reduced.addEventListener('change', cancel);
    return animation.finished.catch(() => {}).finally(() => {
      reduced.removeEventListener('change', cancel);
      if (active.get(element) === animation) active.delete(element);
      if (!retain) animation.cancel();
    });
  })).then(() => () => animations.forEach(animation => animation.cancel()));
}

const revisions = new WeakMap();
export async function replaceMonth(grid, nodes, changed) {
  const revision = {};
  revisions.set(grid, revision);
  const offset = getComputedStyle(document.documentElement).getPropertyValue('--space-3').trim();
  const release = changed ? await reveal(grid.children, [
    { opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: 'translateX(' + offset + ')' }
  ], true, true) : () => {};
  if (revisions.get(grid) !== revision) { release(); return; }
  grid.replaceChildren(...nodes);
  release();
  if (changed) await reveal(grid.children, [
    { opacity: 0, transform: 'translateX(-' + offset + ')' }, { opacity: 1, transform: 'translateX(0)' }
  ], true);
}
