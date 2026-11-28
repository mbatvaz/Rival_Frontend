import { motionTiming, startMotion } from '../../components/motion.js';

export function initWeekMotion(section, move) {
  const strip = section.querySelector('.rv-stylist-week__days');
  const viewport = strip.parentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let clearSlide;
  let touch;
  let suppressTap = false;

  section.addEventListener('pointerdown', event => {
    suppressTap = false;
    touch = event.pointerType === 'touch' && event.isPrimary
      ? { id: event.pointerId, x: event.clientX, y: event.clientY } : null;
  });
  section.addEventListener('pointercancel', () => { touch = null; });
  section.addEventListener('pointerup', event => {
    if (event.pointerId !== touch?.id) return;
    const dx = event.clientX - touch.x;
    const dy = event.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
    suppressTap = true;
    move(Math.sign(dx));
  });
  section.addEventListener('click', event => {
    if (!suppressTap || event.detail === 0) return;
    suppressTap = false;
    event.preventDefault();
    event.stopPropagation();
  }, { capture: true });

  return (direction, render) => {
    clearSlide?.();
    if (reduced.matches || !strip.animate) {
      render();
      return;
    }
    const outgoing = strip.cloneNode(true);
    outgoing.dataset.rvWeekOutgoing = '';
    outgoing.setAttribute('aria-hidden', 'true');
    outgoing.inert = true;
    viewport.dataset.rvWeekSliding = '';
    viewport.append(outgoing);
    render();
    const timing = motionTiming('duration-slow');
    const exit = startMotion(outgoing, [
      { transform: 'translateX(0)' }, { transform: `translateX(${direction * 100}%)` }
    ], { ...timing, id: 'rv-week-exit' });
    const enter = startMotion(strip, [
      { transform: `translateX(${direction * -100}%)` }, { transform: 'translateX(0)' }
    ], { ...timing, id: 'rv-week-enter' });
    const cleanup = () => {
      if (clearSlide !== cleanup) return;
      clearSlide = null;
      exit.cancel();
      enter.cancel();
      outgoing.remove();
      delete viewport.dataset.rvWeekSliding;
    };
    clearSlide = cleanup;
    Promise.allSettled([enter.finished, exit.finished]).then(cleanup);
  };
}
