// Owner review: loop while visible; reduced motion keeps the final static state.
export function init(root) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = !window.IntersectionObserver;
  const update = () => {
    if (visible && !reduced.matches && !document.hidden) root.dataset.rvStepsMotion = 'playing';
    else delete root.dataset.rvStepsMotion;
  };
  if (window.IntersectionObserver) new window.IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    update();
  }, { threshold: 0.35 }).observe(root);
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();
}
