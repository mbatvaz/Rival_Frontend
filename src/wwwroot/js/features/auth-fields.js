export function initFields() {
  const fields = document.querySelectorAll('.rv-field:has(.rv-input input)');
  for (const field of fields) {
    const input = field.querySelector('input');
    const label = field.querySelector('label');
    if (!label || !input || input.readOnly || input.type === 'hidden') continue;
    field.classList.add('rv-field--floating');
    input.placeholder = [label.textContent, input.placeholder].filter(Boolean).join(' · ');
  }
  const viewport = window.visualViewport;
  let restingHeight = viewport?.height ?? 0;
  viewport?.addEventListener('resize', () => {
    const input = document.activeElement;
    if (!input?.matches('.rv-auth input:not([disabled])')) { restingHeight = viewport.height; return; }
    if (Math.max(restingHeight, window.innerHeight) - viewport.height < 90 || viewport.scale !== 1) return;
    const field = input.closest('.rv-field') ?? input;
    if (field.getBoundingClientRect().bottom > viewport.offsetTop + viewport.height - 12) {
      field.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  });
}
