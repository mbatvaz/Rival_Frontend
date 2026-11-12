export function initFields() {
  const viewport = window.visualViewport;
  if (!viewport) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let restingHeight = viewport.height;
  let pending;
  viewport.addEventListener('resize', () => {
    window.clearTimeout(pending);
    pending = window.setTimeout(() => {
      const input = document.activeElement;
      if (!input?.matches('.rv-auth input:not([disabled])')) {
        restingHeight = viewport.height;
        return;
      }
      if (Math.max(restingHeight, window.innerHeight) - viewport.height < 90 || viewport.scale !== 1) return;
      const field = input.closest('.rv-field') ?? input;
      const distance = field.getBoundingClientRect().bottom - (viewport.offsetTop + viewport.height) + 16;
      if (distance > 0) field.scrollIntoView({ block: 'center', behavior: reduced.matches ? 'instant' : 'smooth' });
    }, 100);
  });
}
