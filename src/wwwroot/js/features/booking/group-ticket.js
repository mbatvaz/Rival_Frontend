import { faDigits } from '../../core/format.js';
import { longDay } from './availability.js';
import { get, text } from './shared.js';

export function paintGroup(root, quote, catalog) {
  const count = faDigits(quote.items.length);
  text(root, 'checkout-heading', 'تأیید و پرداخت گروهی');
  text(root, 'total-label', 'جمع هزینه رزرو ' + count + ' نوبت');
  text(root, 'price-help', 'هر نوبت جداگانه ثبت می‌شود و جداگانه می‌توان آن را لغو یا جابه‌جا کرد. مبلغ، هزینهٔ رزرو است.');
  const price = new Intl.NumberFormat('fa-IR');
  get(root, 'group-items').replaceChildren(...quote.items.map((item, index) => {
    const row = document.createElement('li');
    const number = document.createElement('span');
    number.className = 'rv-booking-group__number';
    number.textContent = faDigits(index + 1);
    number.setAttribute('aria-hidden', 'true');
    const details = document.createElement('div');
    const time = document.createElement('strong');
    time.dataset.rvOverflowText = '';
    time.textContent = longDay(item.date) + '، ' + faDigits(item.time);
    const summary = document.createElement('span');
    summary.dataset.rvOverflowText = '';
    summary.className = 'rv-muted';
    const service = catalog.services.find(entry => entry.id === item.service);
    const stylist = catalog.stylists.find(entry => entry.id === item.stylist);
    summary.textContent = service.name + ' | ' + stylist.name;
    details.append(time, summary);
    const fee = document.createElement('bdi');
    fee.textContent = price.format(item.fee);
    row.append(number, details, fee);
    return row;
  }));
}
