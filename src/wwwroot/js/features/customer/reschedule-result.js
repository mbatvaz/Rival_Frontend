import { get, text } from '../booking/shared.js';
import { appointmentUrl, cutoff, forfeitsRefund, lostRefund, timeLabel } from './reschedule-data.js';

export function paintFlowHeader(current, id, backState) {
  current.hidden = true;
  const workspace = current.closest('[data-rv-page]');
  workspace.dataset.rvReschedule = 'true';
  get(workspace, 'detail-title').textContent = 'جابه‌جایی نوبت';
  document.title = 'جابه‌جایی نوبت — ریوال';
  const back = workspace.querySelector('.rv-appointment-detail__back');
  back.href = appointmentUrl(id, backState);
  back.setAttribute('aria-label', 'بازگشت به جزئیات نوبت');
  return workspace;
}

export function appointmentContext(current) {
  const hero = current.querySelector('.rv-appointment-hero');
  const service = hero.querySelector('.rv-appointment-hero__service');
  return {
    image: hero.querySelector('.rv-appointment-hero__media img').src,
    avatar: service.querySelector('img').src,
    title: service.querySelector('h2').textContent,
    stylist: service.querySelector('p').firstChild.textContent
  };
}

export function showRescheduleResult(root, current, id, change, cutoffDays, detailState, refundToOriginalPayer = false) {
  const workspace = paintFlowHeader(current, id);
  workspace.querySelector('.rv-appointment-detail__back').hidden = true;
  const result = get(root, 'rsc-result');
  const template = result.querySelector('template');
  template.replaceWith(template.content.cloneNode(true));
  const context = appointmentContext(current);
  current.remove();
  get(result, 'result-image').src = context.image;
  get(result, 'result-avatar').src = context.avatar;
  text(result, 'result-service', context.title);
  text(result, 'result-stylist', context.stylist);
  text(result, 'result-from', change.from);
  text(result, 'result-to', timeLabel(change.date, change.time));
  text(result, 'result-code', '#' + id);
  result.querySelector('.rv-lead').textContent = forfeitsRefund(change)
    ? lostRefund : 'لغو تا ' + cutoff(change, cutoffDays) + (refundToOriginalPayer
      ? ' با بازگشت هزینه به پرداخت‌کنندهٔ اولیه است.' : ' با بازگشت کامل هزینه است.');
  result.querySelector('[data-rv-result-action="appointment"]').href = appointmentUrl(id, detailState);
  const swapCustomer = new URLSearchParams(location.search).get('swapCustomer');
  if (swapCustomer) {
    const home = result.querySelector('[data-rv-result-action="home"]');
    const url = new URL(home.href);
    url.searchParams.set('swapCustomer', swapCustomer);
    home.href = url.href;
  }
  result.hidden = false;
}
