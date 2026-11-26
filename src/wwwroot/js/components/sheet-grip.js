import { DragGesture } from '../../vendor/gesture.js';

const handheld = window.matchMedia('(width < 1024px)');
let drag;

export function releaseDrag(keepOffset = false) {
  if (!drag) return;
  const { panel } = drag;
  drag = null;
  delete panel.dataset.rvDraggingSheet;
  if (!keepOffset) panel.style.removeProperty('--rv-sheet-drag');
}

const gesture = (target, axis, handle) => new DragGesture(target, handle, {
  axis, filterTaps: true, pointer: { keys: false },
  ...(axis === 'y' ? { threshold: 3, swipe: { distance: 20 } } : { threshold: 5 })
});

function bindPanel(panel, canDrag, close) {
  const more = panel.matches('.rv-customer-more');
  let grip = panel.querySelector('[data-rv-sheet-grip]');
  if (!more && !grip) {
    grip = document.createElement('span');
    grip.dataset.rvSheetGrip = '';
    grip.setAttribute('aria-hidden', 'true');
    panel.prepend(grip);
  }
  const handle = ({ intentional, movement, swipe, last, canceled, event }) => {
    if ((more && !handheld.matches) || !canDrag(panel) || !intentional) return;
    const offset = Math.max(0, more ? -movement[0] : movement[1]);
    if (!drag && !last && offset) {
      drag = { panel };
      panel.dataset.rvDraggingSheet = '';
    }
    if (drag?.panel !== panel) return;
    const pastThreshold = more
      ? offset >= 64 || (offset >= 24 && swipe[0] < 0)
      : offset >= 48 || (offset >= 20 && swipe[1] > 0);
    const dismiss = !canceled && event.type !== 'pointercancel' && pastThreshold;
    if (last) {
      releaseDrag(dismiss);
      if (dismiss) close({ dragOffset: more ? 0 : offset });
    } else panel.style.setProperty('--rv-sheet-drag', more ? `-${offset}px 0` : `0 ${offset}px`);
  };
  gesture(more ? panel : grip, more ? 'x' : 'y', handle);
  if (!more && !panel.classList.contains('rv-recurring-editor')) {
    const zone = document.createElement('span');
    zone.dataset.rvSheetDragZone = '';
    zone.setAttribute('aria-hidden', 'true');
    panel.prepend(zone);
    gesture(zone, 'y', handle);
    const boundary = panel.querySelector('.rv-sheet__header [data-rv-sheet-close], :scope > .rv-sheet__header');
    const closeButton = boundary?.querySelector('[data-rv-sheet-close]') ?? boundary;
    if (closeButton && window.ResizeObserver) {
      const resize = new window.ResizeObserver(() => {
        if (panel.hidden) return;
        const height = closeButton.getBoundingClientRect().bottom - panel.getBoundingClientRect().top;
        if (height > 0) zone.style.setProperty('--rv-sheet-grab-depth', height + 'px');
      });
      resize.observe(panel);
      resize.observe(closeButton);
    }
  }
  const header = panel.querySelector(':scope > .rv-sheet__header');
  if (!more && header) gesture(header, 'y', handle);
}

export function initSheetGrips(canDrag, close) {
  document.querySelectorAll('[data-rv-sheet-layer] > .rv-sheet').forEach(panel => bindPanel(panel, canDrag, close));
  handheld.addEventListener('change', () => releaseDrag());
  window.addEventListener('pagehide', () => releaseDrag());
}
