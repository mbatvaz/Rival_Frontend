import { animateMini } from '../../vendor/motion.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const active = new WeakMap();

// Read canonical CSS tokens at the interaction boundary, never on every frame.
export function motionTiming(duration = 'duration-base', easing = 'ease-standard') {
  const tokens = getComputedStyle(document.documentElement);
  const time = tokens.getPropertyValue('--' + duration).trim();
  return {
    duration: (Number.parseFloat(time) || 0) * (time.endsWith('ms') ? 1 : 1000),
    easing: tokens.getPropertyValue('--' + easing).trim() || 'linear'
  };
}

export function startMotion(element, frames, { duration, easing, delay = 0, id, retain = false }) {
  if (!element?.animate || reduced.matches) return { finished: Promise.resolve(), cancel() {} };
  active.get(element)?.();
  const keyframes = Object.fromEntries(Object.keys(frames[0]).map(property => [property, frames.map(frame => frame[property])]));
  const previous = Object.keys(keyframes).map(property => [property, element.style[property]]);
  const existing = id ? new Set(element.getAnimations?.() ?? []) : null;
  const bezier = /^cubic-bezier\((.+)\)$/.exec(easing);
  const ease = bezier ? bezier[1].split(',').map(Number) : easing.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  const animation = animateMini(element, keyframes, { duration: duration / 1000, delay: delay / 1000, ease });
  if (existing) for (const effect of element.getAnimations?.() ?? []) if (!existing.has(effect)) effect.id = id;
  let end;
  let released = false;
  const cancelled = new Promise(resolve => { end = resolve; });
  function cancel() {
    if (released) return;
    released = true;
    animation.cancel();
    for (const [property, value] of previous) element.style[property] = value;
    active.delete(element);
    reduced.removeEventListener('change', cancel);
    end();
  }
  active.set(element, cancel);
  reduced.addEventListener('change', cancel);
  const finished = Promise.race([animation.finished, cancelled]).finally(() => { if (!retain) cancel(); });
  return { finished, cancel };
}

// Keep design-system tokens reusable by other interactions. The directed scenes run at 60% speed.
export function sceneTiming(duration, easing) {
  const options = motionTiming(duration, easing);
  return { ...options, duration: Math.round(options.duration / 0.6) };
}
