import EmblaCarousel from '../../../vendor/embla.js';
import { get, route, state, visible } from './shared.js';

const desktop = '(min-width: 1024px)';
const reducedMotion = '(prefers-reduced-motion: reduce)';

export function initChoices(root, context) {
  const { service, kind } = context;
  const services = kind === 'services';
  const empty = state === 'empty' || (!services && !service.stylists.length);
  const loading = services && state === 'loading';
  const inactive = services && state === 'inactive';
  visible(root, 'choices-loading', loading);
  visible(root, 'choices-empty', empty);
  visible(root, 'choices-list', !loading && !empty);
  visible(root, 'choices-quick', !empty && !inactive);
  visible(root, 'quick-items', !loading);
  visible(root, 'quick-loading', loading);
  visible(root, 'choice-dots', !loading && !empty);
  root.querySelector('.rv-section-head').hidden = empty;
  if (empty && services) {
    visible(root, 'steps', false);
    root.querySelector('.rv-booking__progress').hidden = true;
    root.querySelector('.rv-booking__top p').hidden = true;
  }
  visible(root, 'inactive', inactive);
  for (const link of root.querySelectorAll('[data-rv-recurring-link]')) link.hidden = inactive || empty || loading;
  if (inactive) {
    for (const link of root.querySelectorAll('[data-rv-service-choice]')) {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
    }
  }
  if (!services) {
    for (const link of root.querySelectorAll('[data-rv-stylist-choice]')) {
      const stylist = link.dataset.rvStylistChoice;
      link.hidden = !service.stylists.includes(stylist);
      link.href = route(service.kind === 'proposed' ? 'BK-P01' : 'BK-F01', { service: service.id, stylist });
    }
  }
  const rail = get(root, 'choices-list');
  if (rail.hidden) return;
  const cards = [...rail.firstElementChild.children].filter(card => !card.hidden);
  if (!cards.length) return;
  const startIndex = Math.max(0, cards.findIndex(card => services
    ? card.dataset.rvServiceChoice === service.id : card.dataset.rvStylistChoice === context.stylist?.id));
  const dots = cards.map(() => document.createElement('span'));
  get(root, 'choice-dots').replaceChildren(...dots);
  rail.dataset.rvCarousel = '';
  const wide = window.matchMedia(desktop);
  const reduced = window.matchMedia(reducedMotion);
  const carousel = EmblaCarousel(rail, {
    direction: 'rtl', align: 'center', containScroll: false, slides: cards, startIndex,
    watchDrag: cards.length > 1,
    breakpoints: { [desktop]: { active: false }, [reducedMotion]: { duration: 0 } }
  });
  const mark = () => {
    const selected = carousel.selectedScrollSnap();
    cards.forEach((card, index) => {
      card.dataset.rvCentered = String(index === selected);
      dots[index].dataset.rvActive = card.dataset.rvCentered;
    });
  };
  const paint = () => {
    if (wide.matches) return;
    const progress = Math.max(0, Math.min(1, carousel.scrollProgress()));
    const snaps = carousel.scrollSnapList();
    cards.forEach((card, index) => {
      const distance = progress - snaps[index];
      const adjacent = snaps[index + Math.sign(distance)] ?? snaps[index];
      const span = Math.abs(adjacent - snaps[index]);
      const weight = span ? Math.max(0, 1 - Math.abs(distance) / span) : Number(distance === 0);
      card.style.setProperty('--rv-choice-weight', weight);
    });
  };
  carousel.on('select', mark).on('scroll', paint).on('settle', paint).on('reInit', () => { mark(); paint(); });
  carousel.on('pointerUp', () => {
    if (reduced.matches) carousel.scrollTo(carousel.selectedScrollSnap(), true);
  });
  mark();
  paint();
  rail.addEventListener('keydown', event => {
    if (wide.matches || event.target !== rail) return;
    const selected = carousel.selectedScrollSnap();
    const target = { ArrowLeft: selected + 1, ArrowRight: selected - 1, Home: 0, End: cards.length - 1 }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    carousel.scrollTo(target, reduced.matches);
    if (reduced.matches) paint();
  });
}
