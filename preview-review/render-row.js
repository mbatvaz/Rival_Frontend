export function renderRow(row, state, available) {
  row.dataset.status = state.status;
  row.querySelector('[data-rv-review-status]').textContent = {
    red: 'هنوز طراحی نشده', yellow: 'در انتظار تأیید', green: 'تأیید نهایی'
  }[state.status];
  const implemented = row.dataset.rvImplemented === 'true';
  const controls = row.querySelector(':scope > .rv-review__approvals');
  const focused = controls.contains(document.activeElement) ? document.activeElement : null;
  const both = state.mobile && state.desktop;
  controls.hidden = !implemented;
  for (const button of controls.querySelectorAll('[data-rv-approval]')) {
    const action = button.dataset.rvApproval;
    const needsBoth = action === 'final' && !(state.mobile && state.desktop);
    const label = state[action] ? 'تأیید شده' : needsBoth ? 'ابتدا هر دو نسخه را تأیید کنید' : 'تأیید نشده';
    button.setAttribute('aria-pressed', String(state[action]));
    button.disabled = !available || !implemented || needsBoth;
    button.hidden = !implemented || (action === 'final' ? !both : both);
    button.querySelector('small').textContent = label;
    button.title = button.getAttribute('aria-label') + ' — ' + label;
  }
  if (focused?.hidden) controls.querySelector('button:not([hidden]):not(:disabled)')?.focus();
  const reason = row.querySelector(':scope > [data-rv-review-reason]');
  reason.hidden = !state.stale;
  reason.textContent = state.stale ? 'نسخه تغییر کرده؛ فقط تأیید نهایی این مورد نیازمند بازبینی است.' : '';
}

export function renderVariantCount(row) {
  const count = row.querySelector('[data-rv-variant-count]');
  if (!count) return;
  const variants = [...row.querySelectorAll('[data-rv-parent-id]')];
  const approved = variants.filter(variant => variant.dataset.status === 'green').length;
  count.textContent = approved.toLocaleString('fa-IR') + ' از ' + variants.length.toLocaleString('fa-IR') + ' نهایی';
  count.dataset.complete = String(approved === variants.length);
}
