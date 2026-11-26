import { faDigits } from '../../core/format.js';
import { api } from '../../core/api.js';
import { bindForm, get, paintContext, query, report, route, selection, submitRequest, text, visible } from './shared.js';

export async function init(root) {
  const kind = root.dataset.rvBookingKind;
  if (kind === 'services' || kind === 'stylists') {
    for (const name of ['choices-list', 'choice-dots', 'quick-items']) visible(root, name, false);
    for (const name of ['choices-loading', 'quick-loading']) visible(root, name, true);
  }
  try {
    const catalog = (await api.read('booking/catalog')).data;
    const id = root.dataset.rvBookingId;
    const { service, stylist } = selection(catalog, kind === 'external' ? 'checkout' : kind);
    const context = { catalog, kind, id, service, stylist };
    const steps = [...root.querySelectorAll('[data-rv-steps]')];
    if (kind === 'stylists') steps.forEach(nav => { nav.hidden = nav.hasAttribute('data-rv-proposed-steps') !== (service.kind === 'proposed'); });
    const activeSteps = steps.find(nav => !nav.hidden);
    const step = get(root, 'mobile-progress');
    if (activeSteps && step) {
      const items = [...activeSteps.querySelectorAll('li')];
      const index = items.findIndex(item => item.hasAttribute('aria-current')) + 1;
      step.max = items.length;
      step.value = index;
      text(root, 'mobile-step', 'قدم ' + faDigits(index) + ' از ' + faDigits(items.length) + ' · ' + items[index - 1].firstElementChild.lastChild.textContent.trim());
    }
    paintContext(document, service, stylist);
    const back = get(root, 'booking-back');
    for (const link of root.querySelectorAll('[data-rv-step-route]')) {
      const id = link.dataset.rvStepRoute;
      link.href = route(id, id === 'BK-01' ? {} : { service: service.id, stylist: stylist?.id, date: query.get('date') });
    }
    if (['fixed', 'proposed'].includes(kind)) back.href = route('BK-02', { service: service.id });
    if (kind === 'checkout') back.href = route(query.get('group') ? 'BK-REC01' : 'BK-F01', { service: service.id, stylist: stylist.id });
    if (kind === 'services' || kind === 'stylists') await (await import('./choices.js')).initChoices(root, context);
    if (kind === 'fixed' || kind === 'proposed') await (await import('./time.js')).initTime(root, context);
    if (kind === 'checkout') await (await import('./checkout.js')).initCheckout(root, context);
    if (kind === 'recurring') await (await import('./recurring.js')).initRecurring(root, context);
    if (kind === 'result' || kind === 'external') await (await import('./result.js')).initResult(root, context);
    if (kind === 'requested') bindForm(root, () => submitRequest({ type: 'requested', service: service.id }));
    if (step) step.parentElement.style.setProperty('--rv-progress-fill', step.value / step.max * 100 + '%');
  } catch (error) {
    visible(root, 'booking-content', false);
    report(root, error);
  }
}
