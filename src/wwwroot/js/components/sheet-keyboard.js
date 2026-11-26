import { motionTiming } from './motion.js';

const textFields = 'textarea,input:not([type]),input:is([type="text"],[type="tel"],[type="email"],[type="password"],[type="search"],[type="url"],[type="number"]),[contenteditable]:not([contenteditable="false"])';

export const mobileSheet = () => window.matchMedia('(max-width: 767px), (max-width: 1023px) and (pointer: coarse)').matches;
export const sheetTextField = target => target?.matches(textFields) && !target.readOnly && !target.disabled;

export function initSheetKeyboard() {
  const viewport = window.visualViewport;
  if (!viewport) return;

  let session;
  let frame;
  let animation;
  const clear = () => {
    window.cancelAnimationFrame(animation);
    session?.layer.style.removeProperty('--rv-sheet-keyboard-space');
    session = null;
  };

  function scroll(top, done) {
    window.cancelAnimationFrame(animation);
    const from = window.scrollY;
    const duration = motionTiming().duration;
    if (Math.abs(from - top) < 1 || !duration || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top, behavior: 'instant' });
      done?.();
      return;
    }
    const start = window.performance.now();
    function tick(time) {
      const progress = Math.min(1, (time - start) / duration);
      window.scrollTo({ top: from + (top - from) * (1 - (1 - progress) ** 3), behavior: 'instant' });
      if (progress < 1) animation = window.requestAnimationFrame(tick);
      else done?.();
    }
    animation = window.requestAnimationFrame(tick);
  }

  function capture() {
    const field = document.activeElement;
    const panel = sheetTextField(field) ? field.closest('.rv-sheet') : null;
    if (!mobileSheet() || viewport.scale !== 1 || session?.panel.closest('[hidden],[inert],[data-rv-closing]')) clear();
    if (!mobileSheet() || viewport.scale !== 1) return;
    if (panel && !panel.closest('[hidden],[inert],[data-rv-closing]') && session?.panel !== panel) {
      clear();
      session = { panel, layer: panel.parentElement, top: window.scrollY, height: viewport.height, width: viewport.width };
    }
    return panel;
  }

  function sync() {
    const panel = capture();
    if (!session) return;
    if (Math.abs(session.width - viewport.width) > 1) { clear(); return; }

    const occluded = Math.max(window.innerHeight, session.height) - viewport.height;
    if (panel === session.panel && occluded > 90) {
      session.raised = true;
      const gap = 16;
      session.layer.style.setProperty('--rv-sheet-keyboard-space', (occluded + gap) + 'px');
      const excess = document.activeElement.getBoundingClientRect().bottom + gap - viewport.offsetTop - viewport.height;
      scroll(Math.max(session.top, window.scrollY + excess));
    } else if (session.raised) {
      session.raised = false;
      scroll(session.top, () => {
        session.layer.style.removeProperty('--rv-sheet-keyboard-space');
        if (panel !== session.panel) clear();
      });
    } else if (panel !== session.panel && !session.layer.style.getPropertyValue('--rv-sheet-keyboard-space')) clear();
  }

  const schedule = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(sync);
  };
  document.addEventListener('focusin', () => { capture(); schedule(); });
  document.addEventListener('focusout', schedule);
  document.addEventListener('rv:sheet-close', clear);
  viewport.addEventListener('resize', schedule);
}
