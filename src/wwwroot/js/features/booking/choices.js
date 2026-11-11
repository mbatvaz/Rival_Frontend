import { observeCenter } from '../../components/rail.js';
import { centerInRail, get, route, state, visible } from './shared.js';

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
  if (!rail.hidden) {
    const active = [...rail.children].find(card => !card.hidden && (card.dataset.rvServiceChoice === service.id || card.dataset.rvStylistChoice === context.stylist?.id));
    const cards = [...rail.children].filter(card => !card.hidden);
    const dots = get(root, 'choice-dots');
    dots.replaceChildren(...cards.map(() => document.createElement('span')));
    const mark = card => {
      cards.forEach((item, index) => {
        item.dataset.rvCentered = String(item === card);
        dots.children[index].dataset.rvActive = String(item === card);
      });
    };
    observeCenter(rail, () => cards, mark);
    centerInRail(rail, active);
    if (active) mark(active);
  }
}
