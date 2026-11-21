import { openSheet } from '../../components/sheet.js';

export function init(root) {
  const query = new URLSearchParams(location.search);
  const current = root.querySelector('[data-rv-detail-current]');
  const appointmentId = query.get('appointment') ?? current.dataset.rvDetailId;
  if (appointmentId !== current.dataset.rvDetailId) {
    const view = [...root.querySelectorAll('template')].find(item => item.dataset.rvDetailId === appointmentId);
    if (!view) {
      current.remove();
      root.querySelector('[data-rv-detail-missing]').hidden = false;
      return;
    }
    current.replaceChildren(view.content.cloneNode(true));
  }
  if (current.querySelector('[data-rv-detail-history]')) {
    const back = document.querySelector('.rv-appointment-detail__back');
    const listUrl = new URL(back.href);
    listUrl.searchParams.set('tab', 'history');
    back.href = listUrl.href;
  }

  const cancel = current.querySelector('[data-rv-detail-cancel]');
  if (!cancel) return;

  const state = query.get('state');
  if (state === 'inactive') {
    current.querySelector('[data-rv-inactive-banner]').hidden = false;
    cancel.disabled = true;
    current.querySelector('[data-rv-detail-note]').hidden = true;
    current.querySelector('[data-rv-detail-inactive]').hidden = false;
    current.querySelectorAll('.rv-actions button').forEach(button => {
      button.setAttribute('aria-describedby', 'rv-detail-inactive-note');
    });
  }
  const preview = document.querySelector('[data-rv-cancel-hero]');
  const showHero = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = current.querySelector('.rv-appointment-hero');
    const bounds = hero.getBoundingClientRect();
    const start = window.scrollY;
    const target = Math.min(start, Math.max(0, start + bounds.top - 16));
    const distance = start - target;
    preview.replaceChildren(hero.cloneNode(true));
    preview.style.setProperty('--rv-hero-left', bounds.left + 'px');
    preview.style.setProperty('--rv-hero-top', bounds.top + distance + 'px');
    preview.style.setProperty('--rv-hero-width', bounds.width + 'px');
    preview.hidden = false;
    openSheet(cancel.dataset.rvSheetOpen, cancel, { scrollPosition: target });
    if (distance && !reducedMotion && preview.animate) {
      const frames = [{ transform: `translateY(-${distance}px)` }, { transform: 'translateY(0)' }];
      const timing = { duration: 500, easing: 'ease-out' };
      preview.animate(frames, timing);
      document.querySelector('[data-rv-page]').animate(frames, timing);
    }
  };
  cancel.addEventListener('click', event => {
    event.stopPropagation();
    showHero();
  });
  document.addEventListener('rv:sheet-close', event => {
    if (event.detail.id === 'rv-cancel-preview') {
      preview.hidden = true;
    }
  });
  if (state === 'can-gt24') {
    showHero();
  }
}
