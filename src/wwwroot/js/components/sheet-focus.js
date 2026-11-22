let keyboard = false;
let autoFocus;

function clearAutoFocus() {
  if (!autoFocus) return;
  delete autoFocus.dataset.rvSheetAutoFocus;
  autoFocus = undefined;
}

export function initSheetFocus() {
  document.addEventListener('pointerdown', () => { keyboard = false; clearAutoFocus(); }, true);
  document.addEventListener('keydown', event => {
    if (['Alt', 'Control', 'Meta', 'Shift'].includes(event.key)) return;
    keyboard = true;
    clearAutoFocus();
  }, true);
  document.addEventListener('focusout', event => {
    if (event.target === autoFocus) clearAutoFocus();
  });
}

export function focusSheetTarget(target, { preventScroll = true } = {}) {
  if (!target) return;
  clearAutoFocus();
  if (!keyboard) {
    autoFocus = target;
    target.dataset.rvSheetAutoFocus = '';
  }
  target.focus({ preventScroll });
}
