import { api } from '../../core/api.js';
import { faDigits } from '../../core/format.js';

// D10-56: read actions update the inbox; resource anchors navigate independently.
export async function init(root) {
  const state = new URLSearchParams(location.search).get('state');
  if (state === 'empty') {
    root.querySelector('[data-rv-notifications-inbox]').hidden = true;
    root.querySelector('[data-rv-notifications-empty]').hidden = false;
    return;
  }

  const example = state === 'example' || state === 'read';
  const rows = [...root.querySelectorAll('[data-rv-notification]')];
  const unread = rows.filter(row => row.hasAttribute('data-rv-notification-unread'));
  const all = root.querySelector('[data-rv-notifications-read-all]');
  const more = root.querySelector('[data-rv-notifications-more]');
  const summary = root.querySelector('#rv-notifications-summary');
  const count = root.querySelector('[data-rv-notifications-count]');
  const toast = root.querySelector('[data-rv-notifications-toast]');
  const error = root.querySelector('[data-rv-notifications-error]');
  const pageSize = Number(root.dataset.rvNotificationPageSize);
  let read = new Set();
  let pending = false;
  let shown = pageSize;
  let toastTimer;

  function paintReadState() {
    let remaining = 0;
    for (const row of unread) {
      const isRead = read.has(row.dataset.rvNotification);
      if (!isRead) remaining++;
      const action = row.querySelector('[data-rv-notification-action]');
      if (isRead && action.contains(document.activeElement)) (row.querySelector('a') ?? row).focus({ preventScroll: true });
      row.classList.toggle('is-read', isRead);
      action.hidden = isRead;
      const button = action.querySelector('button');
      button.disabled = false;
      button.setAttribute('aria-disabled', String(pending));
      const chevron = row.querySelector('.rv-notification-item__chevron');
      if (chevron) chevron.hidden = !isRead;
    }
    summary.textContent = remaining ? `${faDigits(remaining)} خوانده‌نشده` : 'همه خوانده شده‌اند';
    all.setAttribute('aria-disabled', String(!remaining || pending));
  }

  function showToast(persistent = false) {
    const message = 'همه اعلان‌ها خوانده شد';
    toast.textContent = message;
    toast.previousElementSibling.hidden = false;
    window.clearTimeout(toastTimer);
    if (!persistent) toastTimer = window.setTimeout(() => {
      toast.textContent = '';
      toast.previousElementSibling.hidden = true;
    }, 4000);
  }

  async function markRead(items, bulk) {
    pending = true;
    error.textContent = '';
    paintReadState();
    try {
      const ids = items.map(row => row.dataset.rvNotification);
      read = example ? new Set([...read, ...ids]) : new Set(await api.notifications.markRead(ids));
      if (bulk) showToast();
    } catch (failure) {
      error.textContent = failure.message;
    } finally {
      pending = false;
      paintReadState();
    }
  }

  async function refresh() {
    try {
      read = new Set(await api.notifications.readStatus());
      error.textContent = '';
      paintReadState();
    } catch (failure) {
      error.textContent = failure.message;
    }
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('[data-rv-notification-read]');
    if (button && !pending) markRead([button.closest('[data-rv-notification]')], false);
  });
  all.addEventListener('click', () => {
    if (all.getAttribute('aria-disabled') === 'false') markRead(unread, true);
  });
  more.addEventListener('click', () => {
    const next = rows.slice(shown, shown + pageSize);
    for (const row of next) {
      row.hidden = false;
      row.closest('section').hidden = false;
    }
    shown += next.length;
    count.textContent = `${faDigits(shown)} از ${faDigits(rows.length)} اعلان`;
    next[0]?.focus();
    more.hidden = shown >= rows.length;
  });

  if (state === 'read') {
    read = new Set(unread.map(row => row.dataset.rvNotification));
    showToast(true);
  }
  if (!example) {
    await refresh();
    api.notifications.observe(refresh);
  }
  paintReadState();
  more.disabled = false;
  more.hidden = shown >= rows.length;
}
