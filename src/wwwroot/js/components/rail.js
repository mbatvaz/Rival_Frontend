export function center(rail, item, behavior = 'instant') {
  if (!item || !rail.clientWidth) return;
  const frame = rail.getBoundingClientRect();
  const rect = item.getBoundingClientRect();
  rail.scrollBy({ left: rect.left + (rect.width - frame.width) / 2 - frame.left, behavior });
}

export function observeCenter(rail, items, update) {
  const render = () => {
    if (!rail.clientWidth) return;
    const frame = rail.getBoundingClientRect();
    const middle = frame.left + frame.width / 2;
    const nearest = [...items()].filter(item => !item.hidden).reduce((best, item) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - middle);
      return distance < best.distance ? { item, distance } : best;
    }, { item: null, distance: Infinity }).item;
    if (nearest) update(nearest);
  };
  let pending;
  rail.addEventListener('scroll', () => {
    clearTimeout(pending);
    pending = setTimeout(render, 100);
  }, { passive: true });
  return render;
}

export function enableDrag(rail) {
  let drag;
  let suppress = false;
  rail.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || event.button !== 0 || rail.scrollWidth <= rail.clientWidth) return;
    drag = { x: event.clientX, scroll: rail.scrollLeft, id: event.pointerId };
    suppress = false;
  });
  rail.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId || !event.buttons) return;
    const distance = event.clientX - drag.x;
    if (!suppress && Math.abs(distance) < 6) return;
    if (!suppress) {
      rail.setPointerCapture(event.pointerId);
      rail.dataset.rvDragging = 'true';
      suppress = true;
    }
    rail.scrollLeft = drag.scroll - distance;
    event.preventDefault();
  });
  const release = () => {
    const moved = Boolean(drag && suppress);
    drag = null;
    delete rail.dataset.rvDragging;
    if (moved) rail.dispatchEvent(new window.CustomEvent('rv:dragend'));
  };
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) rail.addEventListener(event, release);
  rail.addEventListener('click', event => {
    if (!suppress || !event.detail) return;
    suppress = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  rail.addEventListener('dragstart', event => event.preventDefault());
}
