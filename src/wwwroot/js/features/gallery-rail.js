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
  let drag = null;
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
  rail.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || event.button !== 0 || !scrollable()) return;
    drag = { x: event.clientX, scroll: rail.scrollLeft, id: event.pointerId };
    rail.setPointerCapture(event.pointerId);
    rail.classList.add('rv-viewer__rail--dragging');
    event.preventDefault();
  });
  rail.addEventListener('pointermove', event => {
    if (drag) rail.scrollLeft = drag.scroll - (event.clientX - drag.x);
  });
  const release = () => {
    if (!drag) return;
    if (rail.hasPointerCapture(drag.id)) rail.releasePointerCapture(drag.id);
    drag = null;
    rail.classList.remove('rv-viewer__rail--dragging');
    go(nearest());
  };
  rail.addEventListener('pointerup', release);
  rail.addEventListener('pointercancel', release);
  rail.addEventListener('lostpointercapture', release);
  rail.addEventListener('dragstart', event => event.preventDefault());
  new window.ResizeObserver(() => { rail.dataset.rvScrollable = String(scrollable()); }).observe(rail);
}
