import { observeCenter, center } from '../../components/rail.js';

export function initHomeRails(root) {
  for (const rail of root.querySelectorAll('[data-rv-home-appointments], [data-rv-home-payment-rail]')) {
    const cards = [...rail.querySelectorAll('[role="listitem"]')];
    let current = 0;
    const render = observeCenter(rail, () => cards, card => {
      current = cards.indexOf(card);
      if (!rail.hasAttribute('data-rv-home-appointments')) return;
      root.querySelector('[data-rv-home-counter]').textContent = `${(current + 1).toLocaleString('fa-IR')} از ${cards.length.toLocaleString('fa-IR')}`;
      root.querySelectorAll('[data-rv-home-dot]').forEach(dot => { dot.dataset.rvActive = String(dot.dataset.rvHomeDot === card.dataset.rvAppointment); });
    });
    rail.addEventListener('keydown', event => {
      if (event.target !== rail || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : current + (event.key === 'ArrowLeft' ? 1 : -1);
      center(rail, cards[Math.max(0, Math.min(cards.length - 1, next))]); render();
    });
  }
}
