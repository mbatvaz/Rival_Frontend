import { closeSheet } from '../../components/sheet.js';
import { appointmentSheetOpener } from './card-sheet.js';
import { beginRequestPayment, cancelRequest, readRequests, refreshRequests, requestGroup, requestStatus, runRequestAction } from './request-state.js';
import { get, show, requestRenderer } from './request-renderer.js';
import { paintDraftDetail } from './submitted-requests.js';

export async function init(root) {
  const query = new URLSearchParams(location.search);
  const current = get(root, 'current');
  const id = query.get('request') ?? get(current, 'id').dataset.rvRequestId;
  const templates = [...root.querySelectorAll('[data-rv-request-template]')];
  const preview = query.get('state');
  const inactive = preview === 'inactive';
  const dialog = document.querySelector('#rv-request-cancel');
  const confirmation = get(dialog, 'confirm');
  const open = appointmentSheetOpener(current);
  const back = document.querySelector('.rv-appointment-detail__back');
  let record;
  let busy = false;
  let lastStatus;
  const showError = (surface, error) => {
    get(surface, 'error').textContent = error.message;
    show(surface, 'error', true);
  };
  const paymentUrl = hold => {
    const url = new URL(root.dataset.rvPaymentUrl, location.origin);
    url.searchParams.set('hold', hold);
    return url.href;
  };
  const paint = requestRenderer(current, paymentUrl, { preview, inactive });
  const render = () => {
    const status = paint(record, busy);
    if (lastStatus === status) return;
    lastStatus = status;
    const url = new URL(root.dataset.rvRequestsUrl, location.origin);
    const group = requestGroup(status);
    if (group !== 'pay') url.searchParams.set('tab', group);
    back.href = url.href;
    if (!['pay', 'wait'].includes(status) && !dialog.hidden) closeSheet();
  };
  const act = async (surface, operation) => {
    if (busy || inactive) return;
    busy = true;
    const original = lastStatus;
    render();
    confirmation.disabled = true;
    show(surface, 'error', false);
    try {
      await runRequestAction(async () => {
        const latest = (await readRequests()).find(item => item.id === id);
        if (!latest) throw new Error('درخواست دیگر در دسترس نیست. فهرست درخواست‌ها را دوباره باز کنید.');
        record = latest;
        if (requestStatus(record) === original && ['pay', 'wait'].includes(original)) await operation();
      });
    } catch (error) { showError(surface, error); }
    finally {
      busy = false;
      confirmation.disabled = false;
        render();
    }
  };
  try {
    record = (await readRequests()).find(item => item.id === id);
    if (!record) { current.hidden = true; show(root, 'missing', true); return; }
    const template = templates.find(item => item.dataset.rvRequestTemplate === (record.sampleId ?? id));
    if (template) current.replaceChildren(template.content.cloneNode(true));
    if (record.sampleId) paintDraftDetail(current, record);
    refreshRequests(render, async () => {
      try {
        const latest = (await readRequests()).find(item => item.id === id);
        if (latest) { record = latest; render(); }
      } catch { /* Keep the displayed request while the source is unavailable. */ }
    });
    const cancel = get(current, 'cancel');
    const openCancellation = () => {
      if (!cancel || cancel.disabled) return;
      const group = lastStatus === 'pay' && Boolean(record.parts?.length);
      dialog.querySelector('h2').textContent = group ? 'لغو کل درخواست؟' : 'لغو این درخواست؟';
      get(dialog, 'impact').textContent = group ? 'هر سه زمان آزاد می‌شوند' : 'اثر مالی ندارد';
      const stylist = record.stylist ? get(current, 'identity').textContent.replace(/^با /, '') : '';
      get(dialog, 'cancel-copy').textContent = group ? 'مبلغی پرداخت نشده است؛ اثر مالی ندارد. پکیج فقط یک‌جا لغو می‌شود.'
        : lastStatus === 'pay' ? 'مبلغی پرداخت نشده است. زمان نگه‌داشته‌شده آزاد می‌شود.'
          : 'هنوز پاسخی نیامده و مبلغی پرداخت نشده است.' + (stylist ? ' ' + stylist + ' دیگر به این درخواست پاسخ نمی‌دهد.' : '');
      confirmation.textContent = cancel.textContent;
      open(dialog.id, cancel);
    };
    cancel?.addEventListener('click', openCancellation);
    if (preview === 'can-pay' || preview === 'can-review') openCancellation();
    confirmation.addEventListener('click', () => act(dialog, async () => {
      await cancelRequest(record);
      record.cancelled = true;
      await closeSheet();
      get(current, 'heading').focus();
    }));
    get(current, 'pay')?.addEventListener('click', () => act(root, async () => location.assign(paymentUrl(await beginRequestPayment(record)))));
  } catch (error) { showError(root, error); }
}
