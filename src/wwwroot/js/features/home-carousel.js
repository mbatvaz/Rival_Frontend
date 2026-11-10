export function init(root) {
  const cards = [...root.querySelectorAll('[data-rv-carousel-card]')];
  const button = root.querySelector('[data-rv-carousel-pause]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let current = 0;
  function render() {
    cards.forEach((card, index) => {
      const position = (index - current + cards.length) % cards.length;
      card.dataset.rvPosition = String(position);
      card.setAttribute('aria-hidden', String(position !== 0));
      card.querySelector('a').hidden = position !== 0;
    });
    button.textContent = paused ? 'ادامه حرکت' : 'توقف حرکت';
    button.setAttribute('aria-pressed', String(paused));
  }
  function move(direction) {
    current = (current + direction + cards.length) % cards.length;
    render();
  }
  root.querySelector('[data-rv-carousel-prev]').addEventListener('click', () => { paused = true; move(-1); });
  root.querySelector('[data-rv-carousel-next]').addEventListener('click', () => { paused = true; move(1); });
  button.addEventListener('click', () => { paused = !paused; render(); });
  root.addEventListener('focusin', event => {
    if (event.target !== button) { paused = true; render(); }
  });
  let start = null;
  root.addEventListener('pointerdown', event => { start = event.clientX; });
  root.addEventListener('pointerup', event => {
    if (start !== null && Math.abs(event.clientX - start) > 44) {
      paused = true;
      move(event.clientX > start ? 1 : -1);
    }
    start = null;
  });
  reduced.addEventListener('change', () => { if (reduced.matches) { paused = true; render(); } });
  window.setInterval(() => { if (!paused) move(1); }, Number(root.dataset.rvInterval));
  render();
}
