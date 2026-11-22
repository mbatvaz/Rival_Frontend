import { openSheet } from '../../components/sheet.js';
import { playMotion } from '../../components/motion.js';

export function liftContext(card, sheet, opener) {
  const lift = document.querySelector('[data-rv-rsc-lift]');
  const { top } = card.getBoundingClientRect();
  const start = window.scrollY;
  const target = Math.min(start, Math.max(0, start + top - 16));
  const distance = start - target;
  lift.replaceChildren(card.cloneNode(true));
  openSheet(sheet.id, opener, { scrollPosition: target });
  const { left, width } = card.getBoundingClientRect();
  lift.style.insetBlockStart = top + distance + 'px';
  lift.style.left = left + 'px';
  lift.style.width = width + 'px';
  lift.hidden = false;
  if (distance) {
    const frames = [{ transform: 'translateY(' + (-distance) + 'px)' }, { transform: 'translateY(0)' }];
    playMotion(lift, frames);
    playMotion(card.closest('[data-rv-page]'), frames);
  }
}
