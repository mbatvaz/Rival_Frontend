import { startMotion } from './motion.js';

const holdTime = 1000;
const instructions = 'برای تأیید، دکمه را یک ثانیه نگه دارید. با کیبورد از Enter یا فاصله استفاده کنید.';
const block = event => { event.preventDefault(); event.stopImmediatePropagation(); };
const holdKey = key => key === 'Enter' || key === ' ';

function face(button, className) {
  const view = document.createElement('span');
  view.className = className;
  view.setAttribute('aria-hidden', 'true');
  view.append(...[...button.childNodes].map(child => child.cloneNode(true)));
  return view;
}

export function initConfirmActions() {
  let active;
  for (const button of document.querySelectorAll('button[data-rv-confirm-action]')) {
    let hold;
    let approved = false;
    let submitAllowed = false;
    let hintTimer;
    const status = document.createElement('span');
    status.className = 'rv-confirm-announcement';
    status.setAttribute('role', 'status');
    button.after(status);
    button.title = instructions;
    button.setAttribute('aria-description', instructions);

    const available = () => !button.matches(':disabled,[aria-disabled="true"]') && !button.closest('[hidden],[inert],[data-rv-closing]');
    const hint = () => {
      const text = 'برای تأیید، یک ثانیه نگه دارید';
      status.textContent = text;
      button.dataset.rvConfirmHint = text;
      window.clearTimeout(hintTimer);
      hintTimer = window.setTimeout(() => { delete button.dataset.rvConfirmHint; status.textContent = ''; }, 2500);
    };
    const cancel = () => {
      if (!hold) return;
      window.clearTimeout(hold.timer);
      hold.animation.cancel();
      hold.overlay.remove();
      button.removeAttribute('data-rv-confirm-holding');
      hold = undefined;
      if (active === cancel) active = undefined;
    };
    const begin = trigger => {
      if (hold || !available()) return;
      active?.();
      active = cancel;
      delete button.dataset.rvConfirmHint;
      window.clearTimeout(hintTimer);
      const palette = getComputedStyle(button);
      const overlay = face(button, 'rv-confirm-face');
      const fill = face(button, 'rv-confirm-fill');
      overlay.style.setProperty('--rv-confirm-color', palette.backgroundColor);
      overlay.style.setProperty('--rv-confirm-text', palette.color);
      const bounds = button.getBoundingClientRect();
      overlay.append(fill);
      button.append(overlay);
      button.dataset.rvConfirmHolding = '';
      const animation = startMotion(fill, [{ clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0)' }],
        { duration: holdTime, easing: 'linear', retain: true });
      const timer = window.setTimeout(() => {
        cancel();
        if (!available()) return;
        approved = true;
        button.click();
        approved = false;
      }, holdTime);
      hold = { timer, animation, overlay, bounds, trigger };
    };
    const release = trigger => {
      if (hold?.trigger !== trigger) return;
      cancel();
      hint();
    };

    button.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || !available()) return;
      button.setPointerCapture(event.pointerId);
      begin(event.pointerId);
    });
    button.addEventListener('pointermove', event => {
      if (hold?.trigger !== event.pointerId) return;
      const { left, right, top, bottom } = hold.bounds;
      if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) cancel();
    });
    button.addEventListener('pointerup', event => release(event.pointerId));
    for (const type of ['pointercancel', 'lostpointercapture']) button.addEventListener(type, event => {
      if (hold?.trigger === event.pointerId) cancel();
    });
    button.addEventListener('contextmenu', event => { if (hold) event.preventDefault(); });
    button.addEventListener('click', event => {
      if (!approved || !available()) { block(event); return; }
      if (button.type !== 'submit') return;
      submitAllowed = true;
      window.setTimeout(() => { submitAllowed = false; }, 0);
    }, true);
    if (button.type === 'submit') button.form?.addEventListener('submit', event => {
      if (event.submitter && event.submitter !== button) return;
      if (submitAllowed) { submitAllowed = false; return; }
      block(event);
      if (available()) { button.focus(); hint(); }
    }, true);
    button.addEventListener('keydown', event => {
      if (event.key === 'Escape' && hold) { block(event); cancel(); }
      if (!holdKey(event.key)) return;
      block(event);
      if (!event.repeat) begin(event.key);
    });
    button.addEventListener('keyup', event => {
      if (holdKey(event.key)) { block(event); release(event.key); }
    });
    button.addEventListener('blur', cancel);
  }
  document.addEventListener('rv:sheet-close', () => active?.());
  document.addEventListener('visibilitychange', () => { if (document.hidden) active?.(); });
  window.addEventListener('pagehide', () => active?.());
}
