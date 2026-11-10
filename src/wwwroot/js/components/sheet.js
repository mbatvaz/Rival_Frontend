let current = null;
const stack = [];
let originalScroll = 0;
const focusable = panel => [...panel.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')]
  .filter(el => !el.disabled && el.tabIndex >= 0 && !el.closest('[hidden]'));

export function openSheet(id, opener = document.activeElement) {
  const panel = document.getElementById(id);
  const layer = document.querySelector('[data-rv-sheet-layer]');
  if (!panel || !layer) return;
  if (!current) {
    originalScroll = window.scrollY;
    document.querySelector('[data-rv-page]').hidden = true;
    document.querySelector('.rv-skip-link').hidden = true;
  } else {
    current.panel.hidden = true;
    stack.push(current);
  }
  current = { panel, opener };
  layer.hidden = false;
  panel.hidden = false;
  window.scrollTo(0, 0);
  (focusable(panel)[0] ?? panel).focus();
}

export function closeSheet() {
  if (!current) return;
  const closing = current;
  closing.panel.hidden = true;
  current = stack.pop() ?? null;
  if (current) {
    current.panel.hidden = false;
    (closing.opener?.isConnected ? closing.opener : current.panel).focus();
  } else {
    document.querySelector('[data-rv-sheet-layer]').hidden = true;
    document.querySelector('[data-rv-page]').hidden = false;
    document.querySelector('.rv-skip-link').hidden = false;
    closing.opener?.focus({ preventScroll: true });
    window.scrollTo(0, originalScroll);
  }
}

export function initSheets() {
  document.addEventListener('click', event => {
    const open = event.target.closest('[data-rv-sheet-open]');
    if (open) openSheet(open.dataset.rvSheetOpen, open);
    if (event.target.closest('[data-rv-sheet-close]')) closeSheet();
  });
  document.addEventListener('keydown', event => {
    if (!current) return;
    if (event.key === 'Escape') { event.preventDefault(); closeSheet(); }
    if (event.key !== 'Tab') return;
    const targets = focusable(current.panel);
    const first = targets[0] ?? current.panel;
    const last = targets.at(-1) ?? current.panel;
    if (event.shiftKey && (document.activeElement === first || !targets.includes(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
}
