import { observeCenter, center } from '../../components/rail.js';

export function initHomeRails(root) {
  for (const rail of root.querySelectorAll('[data-rv-home-appointments], [data-rv-home-payment-rail]')) {
    const cards = [...rail.querySelectorAll('[role="listitem"]')];
    let current = 0;
    const visible = () => cards.filter(card => !card.hidden);
    const snapTarget = card => card.closest('.rv-home-appointment-slot') ?? card;
    const render = observeCenter(rail, () => visible().map(snapTarget), target => {
      const card = target.matches('[role="listitem"]') ? target : target.firstElementChild;
      current = cards.indexOf(card);
      if (!rail.hasAttribute('data-rv-home-appointments')) return;
      root.querySelector('[data-rv-home-counter]').textContent = `${(current + 1).toLocaleString('fa-IR')} از ${cards.length.toLocaleString('fa-IR')}`;
      root.querySelectorAll('[data-rv-home-dot]').forEach(dot => { dot.dataset.rvActive = String(dot.dataset.rvHomeDot === card.dataset.rvAppointment); });
    });
    rail.addEventListener('keydown', event => {
      if (event.target !== rail || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const available = visible();
      const index = Math.max(0, available.indexOf(cards[current]));
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? available.length - 1 : index + (event.key === 'ArrowLeft' ? 1 : -1);
      if (available.length) center(rail, snapTarget(available[Math.max(0, Math.min(available.length - 1, next))]));
      render();
    });
  }
}
