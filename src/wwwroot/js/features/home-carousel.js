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
  window.setInterval(() => {
    if (!reduced.matches && !document.hidden && !root.contains(document.activeElement)) show(current + 1);
  }, Number(root.dataset.rvInterval));
  show(0);
}
