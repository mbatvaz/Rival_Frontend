import { initSheetGrips, releaseDrag } from './sheet-grip.js';

let current = null;
const stack = [];
let originalScroll = 0;
let closingSheet = false;
let closingGeneration = 0;

const focusable = panel => [...panel.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')]
  .filter(el => !el.disabled && el.tabIndex >= 0 && !el.closest('[hidden],[inert]') && el.getClientRects().length);

export function openSheet(id, opener = document.activeElement, { preserveParent = false, scrollPosition = window.scrollY } = {}) {
  const panel = document.getElementById(id);
  const layer = document.querySelector('[data-rv-sheet-layer]');
  if (!panel || !layer || closingSheet) return;
  releaseDrag();
  if (!current) {
    originalScroll = scrollPosition;
    const page = document.querySelector('[data-rv-page]');
    page.style.setProperty('--rv-sheet-scroll', -originalScroll + 'px');
    page.classList.add('rv-page--behind-sheet');
    page.inert = true;
    page.setAttribute('aria-hidden', 'true');
    document.querySelector('.rv-skip-link').hidden = true;
  } else {
    current.panel.getAnimations?.().forEach(animation => animation.cancel());
    if (preserveParent) {
      current.panel.inert = true;
      current.panel.setAttribute('aria-hidden', 'true');
      current.panel.dataset.rvUnderSheet = 'true';
    } else current.panel.hidden = true;
    stack.push(current);
  }
  current = { panel, opener, preserveParent };
  delete panel.dataset.rvResuming;
  if (panel.classList.contains('rv-customer-more')) panel.dataset.rvDrawerMode = window.matchMedia('(min-width: 1024px)').matches ? 'desktop' : 'mobile';
  layer.hidden = false;
  panel.hidden = false;
  window.scrollTo(0, 0);
  (panel.querySelector('[data-rv-sheet-initial-focus]') ?? focusable(panel)[0] ?? panel).focus({ preventScroll: true });
}

export async function closeSheet({ immediate = false, all = false } = {}) {
  if (!current || (closingSheet && !immediate)) return;
  releaseDrag();
  const closing = all ? stack[0] ?? current : current;
  const panels = all ? [...stack, current] : [current];
  const generation = ++closingGeneration;
  closingSheet = true;
  const layer = closing.panel.parentElement;
  if (!stack.length) layer.dataset.rvClosing = 'true';
  panels.forEach(({ panel }) => { delete panel.dataset.rvResuming; panel.dataset.rvClosing = 'true'; });
  if (immediate) panels.forEach(({ panel }) => panel.getAnimations?.().forEach(animation => animation.cancel()));
  else await Promise.allSettled((closing.panel.getAnimations?.() ?? []).map(animation => animation.finished));
  if (generation !== closingGeneration) return;
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
    (closing.opener?.isConnected ? closing.opener : current.panel).focus();
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
