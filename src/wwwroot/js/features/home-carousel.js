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
      dots[i].dataset.rvActive = String(position === 0);
    });
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stage = root.querySelector('.rv-home-carousel__stage');
  let gesture;
  let nextTurn = 0;
  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('lostpointercapture', () => { gesture = null; });
  stage.addEventListener('pointerup', event => {
    if (gesture?.id !== event.pointerId) return;
    const x = event.clientX - gesture.x;
    const y = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(x) < 28 || Math.abs(x) < Math.abs(y) * 1.3) return;
    show(current + Math.sign(x));
    nextTurn = Date.now() + Number(root.dataset.rvInterval);
  });
  stage.addEventListener('dragstart', event => event.preventDefault());
  window.setInterval(() => {
    if (!reduced.matches && !gesture && Date.now() >= nextTurn && !document.hidden && !root.contains(document.activeElement)) show(current + 1);
  }, Number(root.dataset.rvInterval));
  show(0);
}
