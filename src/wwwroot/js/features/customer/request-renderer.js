import { requestClock, requestStatus } from './request-state.js';

export const get = (root, key) => root.querySelector('[data-rv-request-' + key + ']');
export const show = (root, key, visible) => { const node = get(root, key); if (node) node.hidden = !visible; };

export function requestRenderer(current, paymentUrl, { preview, inactive }) {
  let lastStatus;
  return (record, busy) => {
    const live = requestStatus(record);
    const status = preview === 'exp' && live === 'pay' ? 'expired' : live;
    if (status === 'pay') requestClock(get(current, 'hold'), record.expiresAt);
    for (const button of [get(current, 'pay'), get(current, 'cancel')]) if (button) button.disabled = inactive || status !== 'pay' && status !== 'wait' || busy;
    if (lastStatus === status) return status;
    lastStatus = status;
    get(current, 'id').dataset.rvRequestDetailState = status;
    const actions = status === 'pay' || status === 'wait';
    show(current, 'actions', actions);
    for (const node of current.querySelectorAll('[data-rv-request-inactive]')) node.hidden = !inactive;
    for (const node of current.querySelectorAll('[data-rv-request-result]')) node.hidden = node.dataset.rvRequestResult !== (status === 'checking' ? 'pay' : status);
    if (status === record.status) return status;
    show(current, 'source-notice', false);
    show(current, 'next', false);
    show(current, 'schedule', ['booked', 'checking'].includes(status));
    show(current, 'summary', status === 'booked');
    show(current, 'parts', ['expired', 'cancelled', 'rejected'].includes(status) && Boolean(record.parts?.length));
    show(current, 'new', ['expired', 'rejected'].includes(status) && !inactive);
    show(current, 'outcome', status !== 'booked');
    const outcome = get(current, 'outcome');
    outcome.dataset.rvTone = status === 'cancelled' ? 'rose' : status === 'checking' ? 'info' : 'neutral';
    const copy = {
      cancelled: ['شما این درخواست را لغو کردید', 'مبلغی پرداخت نشده بود.'],
      rejected: ['پاسخی در مهلت درخواست دریافت نشد', 'درخواست بسته شد. مبلغی پرداخت نشده بود.'],
      expired: ['مهلت پرداخت تمام شد', 'زمان‌های نگه‌داشته‌شده آزاد شدند. مبلغی پرداخت نشده بود.'],
      checking: ['پرداخت در حال بررسی است', 'نتیجه را در صفحهٔ پرداخت پیگیری کنید.']
    }[status];
    if (copy) {
      outcome.querySelector('h2').textContent = copy[0];
      outcome.querySelector('p').textContent = copy[1];
      if (status === 'checking' && !outcome.querySelector('a')) {
        const link = document.createElement('a');
        link.className = 'rv-text-link';
        link.href = paymentUrl(record.hold.id);
        link.textContent = 'پیگیری پرداخت';
        outcome.querySelector('div').append(link);
      }
    }
    if (status === 'booked') {
      get(current, 'schedule-title').textContent = record.parts ? 'نوبت‌های پکیج' : 'نوبت رزرو شده';
      get(current, 'schedule-caption').textContent = '';
      get(current, 'tracking').textContent = '#BK-' + record.hold.id.slice(0, 8).toUpperCase();
      for (const node of current.querySelectorAll('[data-rv-request-slot-fee], [data-rv-request-payment-rules], [data-rv-request-credit-sign]')) node.hidden = true;
      for (const node of current.querySelectorAll('[data-rv-request-paid-row], [data-rv-request-part-link]')) node.hidden = false;
    }
    return status;
  };
}
