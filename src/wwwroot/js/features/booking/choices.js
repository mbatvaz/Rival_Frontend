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
    centerInRail(rail, active);
  }
}
