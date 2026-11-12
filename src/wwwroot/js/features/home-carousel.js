export function init(root) {
  const cards = [...root.querySelectorAll('[data-rv-carousel-card]')];
  const captions = [...root.querySelectorAll('[data-rv-carousel-caption]')];
  const dots = [...root.querySelectorAll('[data-rv-carousel-dot]')];
  let current = 0;
  function show(index) {
    current = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      const position = (i - current + cards.length) % cards.length;
      card.dataset.rvPosition = String(position);
      card.setAttribute('aria-hidden', String(position !== 0));
      captions[i].hidden = position !== 0;
      dots[i].setAttribute('aria-pressed', String(position === 0));
    });
  }
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
  root.addEventListener('keydown', event => {
    if (!dots.includes(event.target) || !['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    show(current + (event.key === 'ArrowLeft' ? 1 : -1));
    dots[current].focus();
  });
  const stage = root.querySelector('.rv-home-carousel__stage');
  let start;
  stage.addEventListener('pointerdown', event => { start = event.clientX; });
  stage.addEventListener('pointercancel', () => { start = undefined; });
  stage.addEventListener('pointerup', event => {
    if (start !== undefined && Math.abs(event.clientX - start) > 44) show(current + (event.clientX > start ? 1 : -1));
    start = undefined;
  });
  show(0);
}
