import { localUrl } from '../../core/config.js';
import { faDigits } from '../../core/format.js';
import { longDay } from './availability.js';
import { get, money, persist, query, route, state, text, report, findHold, findRecord } from './shared.js';

function paint(root, key, context, record, request) {
  const views = [...root.querySelectorAll('[data-rv-result-view]')];
  const view = views.find(item => item.dataset.rvResultView === key) ?? views[0];
  for (const item of views) item.hidden = item !== view;
  if (!view) return;
  const { catalog } = context;
  const first = record?.items?.[0];
  const service = catalog.services.find(item => item.id === (first?.service ?? request?.service ?? query.get('service'))) ?? context.service;
  const stylist = catalog.stylists.find(item => item.id === (first?.stylist ?? request?.stylist ?? query.get('stylist'))) ?? context.stylist;
  const photo = get(view, 'result-image');
  if (photo) photo.src = localUrl(service.image);
  text(view, 'result-service', record?.items.length > 1 ? 'رزرو دوره‌ای · ' + faDigits(record.items.length) + ' نوبت' : service.name);
  if (stylist) {
    text(view, 'result-stylist', 'با ' + stylist.name);
    const avatar = get(view, 'result-avatar');
    if (avatar) avatar.src = localUrl(stylist.image);
  }
  const date = first?.date ?? request?.date ?? query.get('date') ?? '2026-10-15';
  const part = first?.time ?? request?.part ?? query.get('part') ?? '16:00';
  text(view, 'result-time', /^\d{4}-\d{2}-\d{2}$/.test(date) ? longDay(date) + ' · ' + faDigits(part) : '');
  if (record) {
    text(view, 'result-code', 'BK-' + record.id.slice(0, 8).toUpperCase());
    text(view, 'result-credit', money(record.applied));
    text(view, 'result-due', money(record.due));
  }
  if (request) text(view, 'result-code', 'RQ-' + request.id.slice(0, 8).toUpperCase());
  const action = get(view, 'result-action');
  if (record && ['STATE-05', 'STATE-06'].includes(action.dataset.rvResultAction)) {
    action.href = route(action.dataset.rvResultAction, { hold: record.id });
  }
  if (action.dataset.rvResultAction === 'BK-F01') {
    action.href = route('BK-F01', { service: service.id, stylist: stylist?.id });
  }
}

export async function initResult(root, context) {
  const { id } = context;
  if (id === 'STATE-07') {
    const variant = ['map', 'otp', 'sms'].includes(state) ? state : 'gateway';
    for (const panel of root.querySelectorAll('[data-rv-external]')) panel.hidden = panel.dataset.rvExternal !== variant;
    if (variant === 'gateway') await (await import('./checkout.js')).initCheckout(root, context, 'gateway');
    if (variant === 'sms') paint(root, 'sms', context);
    return;
  }
  const holdId = query.get('hold');
  const record = ['PAY-RES', 'STATE-05', 'STATE-06'].includes(id) ? await findHold(holdId) : null;
  const fallback = { 'BK-REQ01': 'proposed', 'PAY-RES': 'checking', 'STATE-04': 'expired', 'STATE-05': 'review', 'STATE-06': 'lost' };
  const request = id === 'BK-REQ01' ? await findRecord('requests', query.get('request')) : null;
  const key = (id === 'PAY-RES' ? record?.result ?? (holdId && 'review') : '') || request?.type || state || fallback[id];
  paint(root, key, context, record, request);
  if (id !== 'PAY-RES' || record?.result !== 'checking') return;
  window.setTimeout(async () => {
    try {
      const latest = await findHold(holdId);
      if (!latest) return;
      const result = latest.result === 'checking' ? Date.now() >= latest.expiresAt ? 'lost' : 'success' : latest.result;
      if (result !== latest.result) await persist('holds', holdId, { ...latest, result });
      paint(root, result, context, latest);
      get(root, 'booking-content').setAttribute('aria-live', 'polite');
    } catch (error) { report(root, error); }
  }, 1400);
}
