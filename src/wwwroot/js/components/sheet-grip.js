const mobile = window.matchMedia('(max-width: 767px)');
let drag;

export function releaseDrag(keepOffset = false) {
  if (!drag) return;
  const { panel, grip, id } = drag;
  drag = null;
  delete panel.dataset.rvDraggingSheet;
  if (!keepOffset) panel.style.removeProperty('--rv-sheet-drag');
  if (grip.hasPointerCapture(id)) grip.releasePointerCapture(id);
}

function bindGrip(panel, canDrag, close) {
  if (panel.matches('.rv-customer-more') || panel.querySelector('[data-rv-sheet-grip]')) return;
  const grip = document.createElement('span');
  grip.dataset.rvSheetGrip = '';
  grip.setAttribute('aria-hidden', 'true');
  panel.prepend(grip);
  grip.addEventListener('pointerdown', event => {
    if (!mobile.matches || !canDrag(panel) || drag || !event.isPrimary || event.button !== 0) return;
    drag = { panel, grip, id: event.pointerId, start: event.clientY };
    panel.dataset.rvDraggingSheet = '';
    grip.setPointerCapture(event.pointerId);
  });
  grip.addEventListener('pointermove', event => {
    if (drag?.id === event.pointerId) panel.style.setProperty('--rv-sheet-drag', '0 ' + Math.max(0, event.clientY - drag.start) + 'px');
  });
  grip.addEventListener('pointerup', event => {
    if (drag?.id !== event.pointerId) return;
    const dismiss = event.clientY - drag.start >= 64;
    releaseDrag(dismiss);
    if (dismiss) close();
  });
  for (const type of ['pointercancel', 'lostpointercapture']) {
    grip.addEventListener(type, event => { if (drag?.id === event.pointerId) releaseDrag(); });
  }
}

export function initSheetGrips(canDrag, close) {
  document.querySelectorAll('[data-rv-sheet-layer] > .rv-sheet').forEach(panel => bindGrip(panel, canDrag, close));
  mobile.addEventListener('change', () => releaseDrag());
  window.addEventListener('pagehide', () => releaseDrag());
}
