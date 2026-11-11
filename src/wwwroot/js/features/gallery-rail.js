import { enableDrag, observeCenter } from '../components/rail.js';

const smooth = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export function init(rail) {
  const figures = [...rail.querySelectorAll('figure')];
  const scrollable = () => rail.scrollWidth > rail.clientWidth + 1;
  const nearest = () => {
    const frame = rail.getBoundingClientRect();
    const center = frame.left + frame.width / 2;
    return figures.reduce((best, figure, index) => {
      const rect = figure.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity }).index;
  };
  const go = index => {
    const frame = rail.getBoundingClientRect();
    const rect = figures[index].getBoundingClientRect();
    rail.scrollBy({ left: rect.left - frame.left - (frame.width - rect.width) / 2, behavior: smooth() });
  };
  let lastWheel = -Infinity;
  rail.addEventListener('wheel', event => {
    if (!scrollable() || event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    const current = nearest();
    const target = Math.max(0, Math.min(figures.length - 1, current + Math.sign(event.deltaY)));
    if (target === current) return;
    event.preventDefault();
    if (window.performance.now() - lastWheel < 300) return;
    lastWheel = window.performance.now();
    go(target);
  }, { passive: false });
  enableDrag(rail);
  const dots = rail.parentElement.querySelectorAll('[data-rv-gallery-dot]');
  observeCenter(rail, () => figures, item => {
    dots.forEach((dot, index) => { dot.dataset.rvActive = String(figures[index] === item); });
  });
  const panel = rail.closest('.rv-viewer');
  let touch;
  panel.addEventListener('touchstart', event => {
    touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  panel.addEventListener('touchmove', event => {
    if (!touch || window.matchMedia('(min-width: 1024px), (prefers-reduced-motion: reduce)').matches) return;
    const finger = event.touches[0];
    const distance = finger.clientY - touch.y;
    const scroller = document.scrollingElement;
    const atEdge = distance > 0 ? scroller.scrollTop <= 0 : scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
    if (atEdge && Math.abs(distance) > Math.abs(finger.clientX - touch.x)) {
      panel.style.setProperty('--rv-viewer-stretch', Math.min(10, Math.abs(distance) / 10) + 'px');
    }
  }, { passive: true });
  for (const event of ['touchend', 'touchcancel']) panel.addEventListener(event, () => {
    touch = null;
    panel.style.removeProperty('--rv-viewer-stretch');
  });
  new window.ResizeObserver(() => { rail.dataset.rvScrollable = String(scrollable()); }).observe(rail);
}
