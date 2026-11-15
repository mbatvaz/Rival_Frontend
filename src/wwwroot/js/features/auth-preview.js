import { api } from '../core/api.js';
import { accountFor } from '../core/auth-demo.js';
import { faDigits } from '../core/format.js';
import { fieldError, notice } from './auth-view.js';

export async function applyPreview(root, policy, view) {
  const stateName = new URLSearchParams(window.location.search).get('state');
  if (!policy.allowedStates.includes(stateName)) return null;
  const preview = (await api.read('auth/states/' + stateName)).data;
  view.newUser = stateName === 'new';
  const state = (await api.read('auth/state')).data;
  const account = accountFor(state, policy.demoPhone, policy);
  root.querySelector('[data-rv-phone]').value = faDigits(policy.demoPhone);
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
    root.querySelector('[data-rv-code]').value = faDigits(preview.code);
    fieldError(root, 'code', 'کد درست نیست. دوباره بنویسید؛ ۳ تلاش دیگر دارید.');
  }
  if (stateName === 'password') {
    account.lockedUntil = 0;
    account.failures = [];
    view.stage = 'phone';
  }
  if (stateName === 'passkey') notice(root, 'از کد پیامکی استفاده کنید.', 'info');
  if (stateName === 'loading') view.busy = true;
  if (stateName === 'error' || stateName === 'loading') {
    notice(root, stateName === 'error' ? 'ارتباط برقرار نشد. دوباره تلاش کنید.' : 'لطفاً صبر کنید…', stateName === 'error' ? 'error' : 'info');
    root.querySelector('[data-rv-auth-retry]').hidden = false;
  }
  await api.write('auth/state', state);
  return account;
}
