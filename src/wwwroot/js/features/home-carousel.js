export function init(root) {
  const cards = [...root.querySelectorAll('[data-rv-carousel-card]')];
  const captions = [...root.querySelectorAll('[data-rv-carousel-caption]')];
  const dots = [...root.querySelectorAll('[data-rv-carousel-dot]')];
  const selectors = [...root.querySelectorAll('[data-rv-carousel-select]')];
  const description = root.querySelector('[data-rv-carousel-description]');
  const interval = Number(root.dataset.rvInterval);
  let current = 0;
  let nextTurn = 0;
  function show(index) {
    current = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      const position = (i - current + cards.length) % cards.length;
      card.dataset.rvPosition = String(position);
      card.setAttribute('aria-hidden', String(position !== 0));
      captions[i].hidden = position !== 0;
      dots[i].dataset.rvActive = String(position === 0);
      selectors[i].setAttribute('aria-pressed', String(position === 0));
    });
    nextTurn = Date.now() + interval;
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stage = root.querySelector('.rv-home-carousel__stage');
  let gesture;
  let paused = false;
  let hovered = false;
  const announce = () => description.setAttribute('aria-live',
    paused || reduced.matches || root.contains(document.activeElement) ? 'polite' : 'off');
  const update = () => {
    root.dataset.rvPaused = String(paused || reduced.matches);
    announce();
    nextTurn = Date.now() + interval;
  };
  selectors.forEach((button, index) => button.addEventListener('click', () => show(index)));
  stage.addEventListener('keydown', event => {
    const index = { ArrowLeft: current + 1, ArrowRight: current - 1, Home: 0, End: cards.length - 1 }[event.key];
    if (index === undefined) return;
    event.preventDefault();
    show(index);
  });
  root.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') hovered = true; });
  root.addEventListener('pointerleave', () => { hovered = false; nextTurn = Date.now() + interval; });
  root.addEventListener('focusin', announce);
  root.addEventListener('focusout', () => { nextTurn = Date.now() + interval; window.queueMicrotask(announce); });
  reduced.addEventListener('change', update);
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
    show(current - Math.sign(x));
  });
  stage.addEventListener('dragstart', event => event.preventDefault());
  let timer;
  const start = () => {
    window.clearInterval(timer);
    nextTurn = Date.now() + interval;
    timer = window.setInterval(() => {
      if (!paused && !reduced.matches && !gesture && !hovered && Date.now() >= nextTurn && !document.hidden
        && !root.closest('[inert]') && !root.contains(document.activeElement)) show(current + 1);
    }, interval);
  };
  window.addEventListener('pagehide', () => window.clearInterval(timer));
  window.addEventListener('pageshow', event => { if (event.persisted) start(); });
  update();
  start();
  show(0);
}
