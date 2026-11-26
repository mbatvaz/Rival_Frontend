import { motionTiming, startMotion } from './motion.js';
import { webOtp } from './web-otp.js';

export function renderOtp(root) {
  const input = root.querySelector('[data-rv-code]');
  const cells = [...root.querySelectorAll('[data-rv-otp-cell]')];
  if (!input) return;
  const active = Math.min(input.selectionStart ?? input.value.length, cells.length - 1);
  cells.forEach((cell, index) => {
    cell.textContent = input.value[index] ?? '';
    cell.dataset.rvActive = String(index === active);
  });
}

export function initOtp(root) {
  const input = root.querySelector('[data-rv-code]');
  const cells = [...root.querySelectorAll('[data-rv-otp-cell]')];
  input.addEventListener('pointerdown', event => {
    const index = cells.findIndex(cell => {
      const rect = cell.getBoundingClientRect();
      return event.clientX >= rect.left && event.clientX <= rect.right;
    });
    if (index < 0) return;
    event.preventDefault();
    input.focus({ preventScroll: true });
    const start = Math.min(index, input.value.length);
    input.setSelectionRange(start, Math.min(start + 1, input.value.length));
    renderOtp(root);
  });
  for (const event of ['keyup', 'focus', 'select']) input.addEventListener(event, () => renderOtp(root));
  return webOtp(input);
}

export function shakeOtp(root) {
  const cells = root.querySelector('.rv-otp__cells');
  if (!cells || cells.closest('[hidden]')) return;
  const offset = getComputedStyle(cells).getPropertyValue('--space-2').trim();
  const frames = ['0', '-' + offset, offset, '0'].map(value => ({ translate: value + ' 0' }));
  startMotion(cells, frames, { ...motionTiming(), id: 'rv-otp-rejected' });
}
