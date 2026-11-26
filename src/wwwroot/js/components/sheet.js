import { initSheetGrips, releaseDrag } from './sheet-grip.js';
import { containFocus, initSheetFocus, focusSheetTarget } from './sheet-focus.js';
import { initSheetKeyboard, mobileSheet, sheetTextField } from './sheet-keyboard.js';
import { tabbable } from '../../vendor/tabbable.js';
import { animateScrim, enterSheet, exitSheet } from './sheet-motion.js';

let current = null;
const stack = [];
let originalScroll = 0;
let closingSheet = false;
let closingGeneration = 0;
let scrimMotion;

export function openSheet(id, opener = document.activeElement, { preserveParent = false, scrollPosition = window.scrollY } = {}) {
  const panel = document.getElementById(id);
  const layer = document.querySelector('[data-rv-sheet-layer]');
  if (!panel || !layer || closingSheet) return;
  releaseDrag();
  if (!current) {
    originalScroll = scrollPosition;
    const page = document.querySelector('[data-rv-page]');
    page.style.setProperty('--rv-sheet-scroll', -scrollPosition + 'px');
    page.classList.add('rv-page--behind-sheet');
    page.inert = true;
    page.setAttribute('aria-hidden', 'true');
    document.querySelector('.rv-skip-link').hidden = true;
  } else {
    current.trap.deactivate();
    current.motion?.cancel();
    if (preserveParent) {
      current.panel.inert = true;
      current.panel.setAttribute('aria-hidden', 'true');
      current.panel.dataset.rvUnderSheet = 'true';
    } else current.panel.hidden = true;
    stack.push(current);
  }
  current = { panel, opener };
  delete panel.dataset.rvResuming;
  if (panel.classList.contains('rv-customer-more')) panel.dataset.rvDrawerMode = window.matchMedia('(min-width: 1024px)').matches ? 'desktop' : 'mobile';
  layer.hidden = false;
  panel.hidden = false;
  current.motion = enterSheet(panel);
  if (!stack.length) scrimMotion = animateScrim(layer, true);
  window.scrollTo(0, 0);
  const target = panel.querySelector('[data-rv-sheet-initial-focus]') ?? tabbable(panel)[0] ?? panel;
  focusSheetTarget(mobileSheet() && sheetTextField(target) ? panel : target);
  current.trap = containFocus(panel);
}

export async function closeSheet({ immediate = false, all = false, dragOffset = 0 } = {}) {
  if (!current || (closingSheet && !immediate)) return;
  releaseDrag();
  const closing = all ? stack[0] ?? current : current;
  const panels = all ? [...stack, current] : [current];
  const generation = ++closingGeneration;
  closingSheet = true;
  const layer = closing.panel.parentElement;
  if (!stack.length || all) layer.dataset.rvClosing = 'true';
  panels.forEach(({ panel }) => { delete panel.dataset.rvResuming; panel.dataset.rvClosing = 'true'; });
  if (!immediate) {
    current.motion = exitSheet(current.panel, dragOffset);
    if (!stack.length || all) scrimMotion = animateScrim(layer, false);
    await current.motion.finished;
  }
  if (generation !== closingGeneration) return;
  current.trap.deactivate();
  panels.forEach(entry => entry.motion?.cancel());
  if (!stack.length || all) scrimMotion?.cancel();
  delete layer.dataset.rvClosing;
  panels.forEach(({ panel }) => {
    delete panel.dataset.rvClosing; delete panel.dataset.rvDrawerMode; delete panel.dataset.rvUnderSheet;
    panel.inert = false; panel.removeAttribute('aria-hidden'); panel.hidden = true;
    panel.style.removeProperty('--rv-sheet-drag');
  });
  closingSheet = false;
  current = all ? null : stack.pop() ?? null;
  if (all) stack.length = 0;
  if (current) {
    current.panel.dataset.rvResuming = 'true';
    current.panel.inert = false;
    current.panel.removeAttribute('aria-hidden');
    delete current.panel.dataset.rvUnderSheet;
    current.panel.hidden = false;
    const target = closing.opener?.isConnected ? closing.opener : current.panel;
    focusSheetTarget(mobileSheet() && sheetTextField(target) ? current.panel : target, { preventScroll: false });
    current.trap = containFocus(current.panel);
  } else {
    document.querySelector('[data-rv-sheet-layer]').hidden = true;
    const page = document.querySelector('[data-rv-page]');
    page.classList.remove('rv-page--behind-sheet');
    page.style.removeProperty('--rv-sheet-scroll');
    page.inert = false;
    page.removeAttribute('aria-hidden');
    document.querySelector('.rv-skip-link').hidden = false;
    document.dispatchEvent(new CustomEvent('rv:sheet-close', { detail: { id: closing.panel.id } }));
    const target = closing.opener?.getClientRects().length ? closing.opener : document.getElementById('rv-main');
    target?.focus({ preventScroll: true });
    window.scrollTo(0, originalScroll);
  }
}

export function initSheets() {
  initSheetFocus();
  initSheetKeyboard();
  initSheetGrips(panel => current?.panel === panel && !closingSheet, closeSheet);
  window.matchMedia('(min-width: 1024px)').addEventListener('change', () => {
    if ([...stack, current].some(entry => entry?.panel.classList.contains('rv-customer-more'))) closeSheet({ immediate: true, all: true });
  });
  document.addEventListener('click', event => {
    const open = event.target.closest('[data-rv-sheet-open]');
    if (open) openSheet(open.dataset.rvSheetOpen, open);
    if (event.target.closest('[data-rv-sheet-close]')) closeSheet();
  });
  document.addEventListener('keydown', event => {
    if (!current || current.panel.parentElement.inert) return;
    if (event.key === 'Escape') { event.preventDefault(); closeSheet(); }
  });
}
