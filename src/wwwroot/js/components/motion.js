// Read canonical CSS tokens at the interaction boundary, never on every frame.
export function motionTiming(duration = 'duration-base', easing = 'ease-standard') {
  const tokens = getComputedStyle(document.documentElement);
  const time = tokens.getPropertyValue('--' + duration).trim();
  return {
    duration: (Number.parseFloat(time) || 0) * (time.endsWith('ms') ? 1 : 1000),
    easing: tokens.getPropertyValue('--' + easing).trim() || 'linear'
  };
}

export async function playMotion(element, frames, duration, easing) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!element?.animate || reduced.matches) return;
  const animation = element.animate(frames, { ...motionTiming(duration, easing), fill: 'both' });
  const stop = () => { if (reduced.matches) animation.cancel(); };
  reduced.addEventListener('change', stop);
  try { await animation.finished; }
  catch { /* Cancellation (including reduced motion) must not block the task. */ }
  finally { reduced.removeEventListener('change', stop); animation.cancel(); }
}
