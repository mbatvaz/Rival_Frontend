import { appointmentSheetOpener } from './appointment-sheet-hero.js';
import { applyRescheduleRoute, rescheduleAppointmentId } from './reschedule-route.js';
import { initSwapDetail, loadSwapDetail } from './appointment-swap-detail.js';
import { initReferenceSwap } from './appointment-swap-reference.js';

export async function init(root) {
  const query = new URLSearchParams(location.search);
  const current = root.querySelector('[data-rv-detail-current]');
  const customer = query.get('swapCustomer');
  const isSwap = Boolean(customer) || query.get('appointment')?.startsWith('SWAP-');
  const swapView = isSwap ? await loadSwapDetail(customer, query.get('appointment')).catch(() => null) : null;
  const appointmentId = isSwap ? swapView?.record?.id : rescheduleAppointmentId(query, current.dataset.rvDetailId);
  if (appointmentId !== current.dataset.rvDetailId) {
    const view = [...root.querySelectorAll('template[data-rv-detail-id]')].find(item => item.dataset.rvDetailId === appointmentId);
    if (!view) {
      current.remove();
      root.querySelector('[data-rv-detail-missing]').hidden = false;
      return;
    }
    current.replaceChildren(view.content.cloneNode(true));
    current.dataset.rvDetailId = appointmentId;
  }
  const linkedRequest = current.querySelector('[data-rv-detail-request]');
  if (linkedRequest) {
    if (linkedRequest.hasAttribute('data-rv-detail-request-payment')) {
      const { readRequests, requestStatus } = await import('./request-state.js');
      const records = await readRequests().catch(() => []);
      const request = records.find(item => item.id === linkedRequest.dataset.rvDetailRequest);
      if (!request || requestStatus(request) !== 'booked') {
        current.hidden = true;
        root.querySelector('[data-rv-detail-missing]').hidden = false;
        return;
      }
    }
    const back = document.querySelector('.rv-appointment-detail__back');
    back.href = linkedRequest.querySelector('a').href;
    back.setAttribute('aria-label', 'بازگشت به جزئیات درخواست');
    return;
  }
  if (current.querySelector('[data-rv-detail-history]')) {
    const back = document.querySelector('.rv-appointment-detail__back');
    const listUrl = new URL(back.href);
    listUrl.searchParams.set('tab', 'history');
    back.href = listUrl.href;
  }

  const cancel = current.querySelector('[data-rv-detail-cancel]');
  if (!cancel) return;
  const openAppointmentSheet = appointmentSheetOpener(current);

  const state = query.get('state') ?? '';
  let policy = {};
  try {
    policy = isSwap ? await initSwapDetail(root, current, customer, swapView, state, openAppointmentSheet, query.get('swapPreview'))
      : await applyRescheduleRoute(root, current, appointmentId, state);
    if (policy.handled) return;
  } catch {
    const note = current.querySelector('[data-rv-detail-note]');
    note.textContent = 'زمان‌های جابه‌جایی در دسترس نیست. دوباره تلاش کنید.';
    note.hidden = false;
    cancel.disabled = true;
    return;
  }
  if (state === 'inactive') {
    current.querySelector('[data-rv-inactive-banner]').hidden = false;
    cancel.disabled = true;
    current.querySelector('[data-rv-detail-note]').hidden = true;
    current.querySelector('[data-rv-detail-inactive]').hidden = false;
    current.querySelectorAll('.rv-actions button').forEach(button => {
      button.setAttribute('aria-describedby', 'rv-detail-inactive-note');
    });
    return;
  }
  if (!isSwap && !current.querySelector('[data-rv-detail-history]')) initReferenceSwap(current, openAppointmentSheet);
  const cancelSheet = document.getElementById('rv-cancel-preview');
  const move = cancelSheet.querySelector('[data-rv-cancel-reschedule]');
  if (policy.move) {
    move.disabled = false;
    move.removeAttribute('aria-describedby');
    if (policy.compensation) move.textContent = 'جابه‌جایی جبرانی';
    move.addEventListener('click', policy.move);
  }
  const impact = cancelSheet.querySelector('[data-rv-cancel-impact]');
  impact.textContent = policy.noRefund ? 'با لغو این نوبت مبلغی برنمی‌گردد.'
    : policy.amount + (policy.originalPayer ? ' به پرداخت‌کنندهٔ اولیه برمی‌گردد' : ' به اعتبار شما برمی‌گردد');
  if (policy.originalPayer) impact.nextElementSibling.hidden = true;
  if (policy.noRefund) {
    impact.nextElementSibling.hidden = true;
    cancelSheet.querySelector('[data-rv-cancel-deadline]').hidden = true;
  } else if (policy.compensation) {
    cancelSheet.querySelector('[data-rv-cancel-deadline]').hidden = true;
  } else if (policy.deadline) {
    const deadline = cancelSheet.querySelector('[data-rv-cancel-deadline]');
    deadline.removeAttribute('aria-label');
    deadline.querySelector('small').textContent = 'تا ' + policy.deadline;
    deadline.lastElementChild.textContent = 'از ' + policy.deadline;
  }
  const showHero = () => openAppointmentSheet(cancel.dataset.rvSheetOpen, cancel);
  cancel.addEventListener('click', event => {
    event.stopPropagation();
    showHero();
  });
  if (state === 'can-gt24') {
    showHero();
  }
}
