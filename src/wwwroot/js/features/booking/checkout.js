import { localUrl } from '../../core/config.js';
import { faDigits } from '../../core/format.js';
import { longDay } from './availability.js';
import { demoId, dateLabel, get, money, persist, query, route, state, text, visible, bindForm, findHold } from './shared.js';
import { bookingItem, snapshot } from './holds.js';

export async function initCheckout(root, { catalog, service, stylist }, scenario = state) {
  const id = query.get('hold');
  const actual = await findHold(id);
  if (id && !actual) {
    window.location.replace(route('STATE-04', { service: service.id, stylist: stylist.id }));
    return;
  }
  if (actual?.result) {
    window.location.replace(route('PAY-RES', { hold: id }));
    return;
  }
  const seconds = scenario === 'low' ? 48 : catalog.holdSeconds;
  const credit = scenario === 'full-credit' ? service.fee : scenario === 'no-credit' ? 0 : catalog.credit;
  const quote = actual ?? {
    ...snapshot([bookingItem(service, stylist, '2026-10-15', '16:00')], catalog, credit),
    expiresAt: Date.now() + seconds * 1000, id: demoId()
  };
  const first = quote.items[0];
  const bookedService = catalog.services.find(item => item.id === first.service) ?? service;
  const bookedStylist = catalog.stylists.find(item => item.id === first.stylist) ?? stylist;
  get(root, 'ticket-image').src = localUrl(bookedService.image);
  get(root, 'ticket-avatar').src = localUrl(bookedStylist.image);
  text(root, 'ticket-service', quote.items.length > 1 ? 'رزرو دوره‌ای · ' + faDigits(quote.items.length) + ' نوبت' : bookedService.name);
  text(root, 'ticket-stylist', quote.items.length > 1 ? 'یک پرداخت برای همهٔ نوبت‌ها' : 'با ' + bookedStylist.name);
  text(root, 'ticket-time', longDay(first.date) + ' · ' + faDigits(first.time));
  const grouped = quote.items.length > 1;
  visible(root, 'steps', !grouped);
  visible(root, 'group-steps', grouped);
  const timeStep = root.querySelector('[data-rv-step-route="BK-F01"]');
  if (timeStep) timeStep.href = route('BK-F01', { service: first.service, stylist: first.stylist, date: first.date, time: first.time, demo: query.get('demo') });
  visible(root, 'ticket-heading', !grouped);
  visible(root, 'single-ticket', !grouped);
  visible(root, 'group-ticket', grouped);
  if (grouped) get(root, 'group-items').replaceChildren(...quote.items.map(item => {
    const row = document.createElement('li');
    const name = catalog.services.find(service => service.id === item.service).name;
    const barber = catalog.stylists.find(stylist => stylist.id === item.stylist).name;
    row.textContent = name + ' · ' + barber + ' · ' + dateLabel(item.date) + ' · ' + faDigits(item.time) + ' · ' + money(item.fee);
    return row;
  }));
  text(root, 'price-total', money(quote.amount));
  text(root, 'price-credit', money(quote.applied));
  visible(root, 'credit-row', quote.applied > 0);
  text(root, 'price-due', money(quote.due));
  text(root, 'action-title', money(quote.due));
  const retry = scenario === 'gateway';
  visible(root, 'gateway-note', retry);
  const submit = get(root, 'booking-submit');
  submit.textContent = retry ? 'تلاش دوباره' : quote.due ? 'پرداخت از درگاه' : 'ثبت با اعتبار';
  submit.disabled = false;
  const expire = () => {
    submit.disabled = true;
    submit.hidden = true;
    visible(root, 'hold', false);
    visible(root, 'checkout-expired', true);
    visible(root, 'checkout-retry', true);
    get(root, 'checkout-retry').href = route(grouped ? 'BK-REC01' : 'BK-F01', { service: first.service, stylist: first.stylist });
    text(root, 'action-title', 'نگه‌داشت تمام شد');
    get(root, 'booking-form').dataset.rvExpired = 'true';
  };
  const clock = () => {
    const left = scenario === 'expired' ? 0 : Math.max(0, Math.ceil((quote.expiresAt - Date.now()) / 1000));
    text(root, 'hold-clock', faDigits(Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0')));
    get(root, 'hold-progress').value = left;
    get(root, 'hold').dataset.rvLow = String(left < 60);
    text(root, 'hold-label', left < 60 ? 'کمتر از ۱ دقیقه' : 'نگه‌داشت فعال');
    if (!left) expire();
  };
  clock();
  const interval = window.setInterval(clock, 1000);
  window.addEventListener('pagehide', () => window.clearInterval(interval), { once: true });
  bindForm(root, async () => {
    if (Date.now() >= quote.expiresAt) { expire(); return; }
    const latest = id ? await findHold(id) : quote;
    if (!latest || Date.now() >= latest.expiresAt) { expire(); return; }
    if (!latest.result) await persist('holds', quote.id, { ...quote, result: quote.due ? 'checking' : 'success', submittedAt: Date.now() });
    window.location.assign(route('PAY-RES', { hold: quote.id }));
  });
}
