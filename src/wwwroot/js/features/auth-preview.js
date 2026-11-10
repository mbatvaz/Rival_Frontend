import { api } from '../core/api.js';
import { accountFor } from '../core/auth-demo.js';
import { fieldError } from './auth-view.js';

export async function applyPreview(root, policy, view) {
  const stateName = new URLSearchParams(window.location.search).get('state');
  if (!policy.allowedStates.includes(stateName)) return null;
  const preview = (await api.read('auth/states/' + stateName)).data;
  view.newUser = stateName === 'new';
  const state = (await api.read('auth/state')).data;
  const account = accountFor(state, policy.demoPhone, policy);
  root.querySelector('[data-rv-phone]').value = policy.demoPhone;
  if (['otp', 'wrong', 'expired', 'locked'].includes(stateName)) {
    account.issuedAt = Date.now();
    account.codeVersion = 0;
    account.failures = [];
    account.lockedUntil = 0;
    view.stage = 'otp';
  }
  if (stateName === 'expired') account.issuedAt -= (policy.validSeconds + 1) * 1000;
  if (stateName === 'locked') account.lockedUntil = Date.now() + policy.lockSeconds * 1000;
  if (stateName === 'wrong') {
    account.failures = Array(preview.failures).fill(Date.now());
    fieldError(root, 'code', 'کد درست نیست. دوباره بنویسید؛ ۳ تلاش دیگر دارید.');
  }
  if (stateName === 'password') view.stage = 'password';
  if (stateName === 'passkey') root.querySelector('[data-rv-auth-status]').textContent = 'در این نسخهٔ آزمایشی از کد پیامکی استفاده کنید.';
  if (stateName === 'loading') view.busy = true;
  if (stateName === 'error' || stateName === 'loading') {
    root.querySelector('[data-rv-auth-status]').textContent = stateName === 'error' ? 'ارتباط برقرار نشد. دوباره تلاش کنید.' : 'لطفاً صبر کنید…';
    root.querySelector('[data-rv-auth-retry]').hidden = false;
  }
  await api.write('auth/state', state);
  return account;
}
