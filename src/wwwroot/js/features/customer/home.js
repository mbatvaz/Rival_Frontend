import { api } from '../../core/api.js';
import { activeAlert, readAlerts } from '../../core/availability-alerts.js';
import { faDigits } from '../../core/format.js';
import { initHomeRails } from './home-rails.js';
import { startClocks } from './home-clocks.js';
import { refreshHomeAppointments } from './reschedule-summaries.js';
import { swapCustomer } from './appointment-swap-context.js';
import { renderSwapHome } from './appointment-swap-summaries.js';
import { requestPaymentOutcomes } from './request-state.js';

// CUS-01 / DEC-062: fixture-driven presentation, never server authorization.
export async function init(root) {
  const customer = swapCustomer();
  if (customer) {
    try { await renderSwapHome(root, customer); }
    catch {
      getSwapHomeError(root);
    }
    return;
  }
  const state = new URLSearchParams(window.location.search).get('state');
  const empty = state === 'empty';
  const inactive = state === 'inactive';
  const page = root.closest('.rv-workspace');
  page.dataset.rvCustomerState = inactive ? 'inactive' : empty ? 'empty' : 'default';
  root.querySelectorAll('[data-rv-home-inactive]').forEach(el => { el.hidden = !inactive; });
  root.querySelector('[data-rv-home-personal]').hidden = inactive || empty;
  root.querySelector('[data-rv-home-empty]').hidden = !empty;
  for (const selector of ['appointments', 'pager', 'counter', 'payment']) {
    root.querySelector(`[data-rv-home-${selector}]`).hidden = empty;
  }
  if (empty) {
    root.querySelector('[data-rv-home-balance]').textContent = '۰';
    root.querySelector('[data-rv-home-alert-count]').textContent = 'فعالی ندارید';
  }
  if (inactive) {
    root.querySelectorAll('[data-rv-home-detail]').forEach(link => {
      const detailUrl = new URL(link.href);
      detailUrl.searchParams.set('state', 'inactive');
      link.href = detailUrl.href;
    });
    const recurring = root.querySelector('.rv-customer-tools__links [data-rv-home-write-action]').getAttribute('href');
    const actions = [...root.querySelectorAll('[data-rv-home-write-action]'),
      ...document.querySelectorAll('.rv-role-nav__book, [data-rv-customer-book]'),
      ...[...document.querySelectorAll('.rv-more-list a, .rv-booking-sidebar a')].filter(link => link.getAttribute('href') === recurring)];
    actions.forEach(link => {
      link.removeAttribute('href');
      link.setAttribute('role', 'link');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('aria-describedby', 'rv-inactive-title');
      link.tabIndex = 0;
    });
  }
  initHomeRails(root);
  const errorBox = root.querySelector('[data-rv-home-error]');
  const showError = error => { errorBox.hidden = false; errorBox.textContent = error.message; };
  try {
    const data = (await api.read('customer/home')).data;
    if (!empty) await refreshHomeAppointments(root, inactive);
    const saved = (await api.read('customer/home-state')).data;
    if (!saved.clockStartedAt) { saved.clockStartedAt = Date.now(); await api.write('customer/home-state', saved); }
    saved.dismissed.forEach(id => { root.querySelector(`[data-rv-home-dismissable="${window.CSS.escape(id)}"]`)?.setAttribute('hidden', ''); });
    if (!empty) {
      const refreshAlerts = async () => {
        try {
          const count = Object.values(await readAlerts()).filter(record => activeAlert(record)).length;
          root.querySelector('[data-rv-home-alert-count]').textContent = count ? faDigits(count) + ' فعال' : 'فعالی ندارید';
        } catch { /* Keep the dashboard available when alerts cannot be read. */ }
      };
      await refreshAlerts();
      window.addEventListener('pageshow', event => { if (event.persisted) refreshAlerts(); });
      startClocks(root, data, saved.clockStartedAt);
      const refreshPayments = async () => {
        try {
          const outcome = await requestPaymentOutcomes();
          const payments = root.querySelector('[data-rv-home-payment]');
          const cards = [...payments.querySelectorAll('[data-rv-payment-id]')];
          for (const card of cards) {
            const status = outcome(card.dataset.rvPaymentId);
            card.hidden = status === 'cancelled' || status === 'success';
          }
          payments.hidden = cards.every(card => card.hidden);
        } catch { /* Keep the dashboard available if request state cannot be read. */ }
      };
      await refreshPayments();
      window.addEventListener('pageshow', event => { if (event.persisted) refreshPayments(); });
    }
    root.querySelectorAll('[data-rv-home-dismiss]').forEach(button => button.addEventListener('click', async () => {
      button.disabled = true;
      try {
        const id = button.dataset.rvHomeDismiss;
        if (!saved.dismissed.includes(id)) saved.dismissed.push(id);
        await api.write('customer/home-state', saved);
        root.querySelector(`[data-rv-home-dismissable="${window.CSS.escape(id)}"]`).hidden = true;
        root.querySelector('#rv-next-title').tabIndex = -1;
        root.querySelector('#rv-next-title').focus({ preventScroll: true });
        root.querySelector('[data-rv-home-status]').textContent = button.getAttribute('aria-label').replace('بستن', '') + ' بسته شد.';
      } catch (error) { showError(error); button.disabled = false; }
    }));
  } catch (error) { showError(error); }
}

function getSwapHomeError(root) {
  const error = root.querySelector('[data-rv-home-error]');
  error.textContent = 'نوبت‌های پیش‌نمایش در دسترس نیست. دوباره تلاش کنید.';
  error.hidden = false;
  root.querySelector('[data-rv-home-appointments]').hidden = true;
  root.querySelector('[data-rv-home-payment]').hidden = true;
}
