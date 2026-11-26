import { localUrl } from '../../core/config.js';
import { faDigits } from '../../core/format.js';
import { activeAlert } from '../../core/availability-alerts.js';
import { get, text, visible } from '../booking/shared.js';

const shortDate = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long', timeZone: 'Asia/Tehran' });
const longDate = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Tehran' });
export const alertDate = value => longDate.format(value);

function decorate(element, service, stylist, caption) {
  element.querySelector('img').src = localUrl(service.image);
  text(element, 'availability-service', service.name);
  text(element, 'availability-stylist', caption);
  const avatar = element.querySelector('.rv-recurring-person img');
  if (avatar) avatar.src = localUrl(stylist.image);
}

export function renderAlerts(root, catalog, records, now, openCancel) {
  const active = get(root, 'availability-active');
  const history = get(root, 'availability-ended');
  const historyCount = get(root, 'availability-history').children.length - 1;
  const current = [];
  const ended = [];
  for (const [key, record] of Object.entries(records)) {
    const service = catalog.services.find(item => item.id === record.service);
    const stylist = catalog.stylists.find(item => item.id === record.stylist);
    if (!service || !stylist || !Number.isFinite(record.expiresAt)) continue;
    if (activeAlert(record, now)) {
      const card = get(root, 'availability-card-template').content.firstElementChild.cloneNode(true);
      decorate(card, service, stylist, stylist.name);
      const days = Math.ceil((record.expiresAt - now) / 86400000);
      text(card, 'availability-deadline', faDigits(days) + ' روز مانده، تا ' + alertDate(record.expiresAt));
      const button = get(card, 'availability-cancel');
      button.addEventListener('click', () => openCancel(button, key, record.expiresAt));
      current.push(card);
    } else {
      const row = get(root, 'availability-history-template').content.firstElementChild.cloneNode(true);
      decorate(row, service, stylist, 'با ' + stylist.name);
      const status = record.closedAt ? 'cancelled' : 'expired';
      row.querySelector('[data-rv-availability-status="' + status + '"]').hidden = false;
      const date = Object.fromEntries(shortDate.formatToParts(record.closedAt || record.expiresAt).map(part => [part.type, part.value]));
      text(row, 'availability-day', date.day);
      text(row, 'availability-month', date.month);
      ended.push({ row, when: record.closedAt || record.expiresAt });
    }
  }
  active.replaceChildren(...current);
  history.replaceChildren(...ended.sort((a, b) => b.when - a.when).map(item => item.row));
  const totalEnded = historyCount + ended.length;
  text(root, 'availability-summary', faDigits(current.length) + ' فعال، ' + faDigits(totalEnded) + ' پایان‌یافته');
  text(root, 'availability-count', faDigits(totalEnded) + ' اعلان');
  visible(root, 'availability-none', !current.length);
  visible(root, 'availability-hint', current.length > 0);
}
