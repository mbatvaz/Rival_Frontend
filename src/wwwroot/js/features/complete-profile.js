import { api } from '../core/api.js';
import { basePath } from '../core/config.js';
import { faDigits } from '../core/format.js';
import { safeReturn } from '../core/auth-demo.js';

export async function init(root) {
  const form = root.querySelector('form');
  const error = root.querySelector('[data-rv-profile-error]');
  const query = new URLSearchParams(window.location.search);
  let verified;
  let policy;
  let destination;
  form.querySelector('button[type="submit"]').disabled = true;
  try {
    policy = (await api.read('auth/policy')).data;
    const state = (await api.read('auth/state')).data;
    verified = state.verified;
    const preview = ['default', 'field-error'].includes(query.get('state'));
    if (preview) {
      await api.read('auth/profile-states/' + query.get('state'));
      verified = { phone: policy.demoPhone };
    }
    destination = safeReturn(policy, query.get('return'));
    if (!verified) {
      window.location.replace(basePath() + 'login/?state=new&return=' + encodeURIComponent(destination));
      return;
    }
    root.querySelector('[data-rv-verified-phone]').textContent = 'شماره ' + faDigits(verified.phone) + ' تأیید شد (آزمایشی).';
    root.querySelector('[data-rv-auth-return]').hidden = destination !== basePath() + 'customer/book/';
    if (query.get('state') === 'field-error') {
      root.querySelector('#last-error').textContent = 'نام خانوادگی را بنویسید.';
      root.querySelector('[data-rv-last-name]').setAttribute('aria-invalid', 'true');
    }
    form.querySelector('button[type="submit"]').disabled = false;
  } catch (failure) { error.textContent = failure.message; }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!verified || !policy) return;
    const first = root.querySelector('[data-rv-first-name]');
    const last = root.querySelector('[data-rv-last-name]');
    for (const [input, id, message] of [[first, '#first-error', 'نام را بنویسید.'], [last, '#last-error', 'نام خانوادگی را بنویسید.']]) {
      input.setAttribute('aria-invalid', String(!input.value.trim()));
      root.querySelector(id).textContent = input.value.trim() ? '' : message;
    }
    if (!first.value.trim() || !last.value.trim()) { (!first.value.trim() ? first : last).focus(); return; }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      await api.write('auth/profile', { firstName: first.value.trim(), lastName: last.value.trim() });
      const session = (await api.read('public/session')).data;
      await api.write('auth/session', { ...session, name: first.value.trim() + ' ' + last.value.trim() });
      const state = (await api.read('auth/state')).data;
      state.verified = null;
      await api.write('auth/state', state);
      window.location.assign(destination);
    } catch (failure) { error.textContent = failure.message; button.disabled = false; }
  });
}
