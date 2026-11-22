import { api } from '../../core/api.js';
import { focusSheetTarget } from '../../components/sheet-focus.js';
import { get, text } from '../booking/shared.js';
import { reportSwapError, swapLink } from './appointment-swap-context.js';
import { timeLabel } from './reschedule-data.js';

export function initSwapRedeem(button, customer, record, openSheet, onSuccess) {
  const sheet = document.getElementById('rv-swap-redeem');
  const form = get(sheet, 'swap-form');
  const confirmation = get(sheet, 'swap-confirm');
  const title = sheet.querySelector('h2');
  const input = form.elements.code;
  const success = get(sheet, 'swap-success');
  const outcome = get(sheet, 'swap-result');
  const received = get(sheet, 'swap-received');
  const list = get(sheet, 'swap-list');
  let pending = false;
  let completed = false;
  let preview;
  list.href = swapLink(list.href, customer);

  function showStep(step) {
    form.hidden = step !== 'entry';
    confirmation.hidden = step !== 'confirm';
    outcome.hidden = step !== 'success';
    title.textContent = { entry: 'ثبت کد تعویض نوبت', confirm: 'تأیید تعویض نوبت', success: 'نتیجهٔ تعویض نوبت' }[step];
  }

  function showReview(review, sample = false) {
    preview = sample ? undefined : review;
    text(confirmation, 'swap-current', timeLabel(review.current.date, review.current.time));
    text(confirmation, 'swap-incoming', timeLabel(review.incoming.date, review.incoming.time));
    get(confirmation, 'swap-preview-note').hidden = !sample;
    confirmation.querySelector('[type="submit"]').disabled = sample;
    showStep('confirm');
    if (!sheet.hidden) focusSheetTarget(title);
  }

  function showResult(incoming, id, sample = false) {
    get(outcome, 'swap-preview-note').hidden = !sample;
    received.href = swapLink(received.href, customer, id);
    text(outcome, 'swap-booked', timeLabel(incoming.date, incoming.time));
    showStep('success');
    success.textContent = 'تعویض نوبت با موفقیت انجام شد.';
    if (!sheet.hidden) focusSheetTarget(success);
  }

  button.addEventListener('click', () => {
    if (pending) return;
    preview = undefined;
    showStep('entry');
    text(sheet, 'swap-error', '');
    form.reset();
    input.removeAttribute('aria-invalid');
    openSheet(sheet.id, button);
  });
  input.addEventListener('input', () => {
    text(sheet, 'swap-error', '');
    input.removeAttribute('aria-invalid');
  });
  get(confirmation, 'swap-edit').addEventListener('click', () => {
    preview = undefined;
    showStep('entry');
    focusSheetTarget(input);
  });

  async function submit(step, busyLabel, action) {
    if (pending) return;
    const primary = step.querySelector('[type="submit"]');
    const label = primary.textContent;
    const controls = [...step.querySelectorAll('button')];
    text(sheet, 'swap-error', '');
    pending = true;
    input.readOnly = true;
    controls.forEach(button => { button.disabled = true; });
    step.setAttribute('aria-busy', 'true');
    primary.textContent = busyLabel;
    try {
      await action();
    } catch (error) {
      preview = undefined;
      showStep('entry');
      reportSwapError(sheet, error);
      if (['INVALID_CODE', 'EXPIRED', 'CONSUMED'].includes(error.code)) input.setAttribute('aria-invalid', 'true');
      if (!sheet.hidden) focusSheetTarget(input);
    } finally {
      pending = false;
      input.readOnly = false;
      controls.forEach(button => { button.disabled = false; });
      step.removeAttribute('aria-busy');
      primary.textContent = label;
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    void submit(form, 'در حال بررسی کد…', async () => {
      showReview(await api.appointmentSwap.preview(customer, record.id, record.revision, input.value));
    });
  });

  confirmation.addEventListener('submit', event => {
    event.preventDefault();
    if (!preview || !outcome.hidden) return;
    void submit(confirmation, 'در حال تعویض…', async () => {
      const result = await api.appointmentSwap.redeem(customer, record.id, record.revision, input.value, preview.offerId);
      completed = true;
      showResult(preview.incoming, result.receivedAppointmentId);
      onSuccess(sheet.hidden ? outcome.cloneNode(true) : null);
    });
  });
  document.addEventListener('rv:sheet-close', event => {
    if (completed && event.detail.id === sheet.id) onSuccess(outcome.cloneNode(true));
  });
  return (scene, other) => {
    if (scene === 'confirm') showReview({ current: record, incoming: other }, true);
    if (scene === 'success') showResult(record, record.id, true);
    openSheet(sheet.id, button);
  };
}
