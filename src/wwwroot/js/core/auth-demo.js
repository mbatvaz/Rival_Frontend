import { api } from './api.js';

export const latinDigits = value => String(value).replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
  .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
export const normalizePhone = value => latinDigits(value).replace(/[\s-]/g, '');
export const validPhone = value => /^09[0-9]{9}$/.test(value);

export function accountFor(state, phone, policy) {
  const account = state.accounts[phone] ?? { failures: [], issuedAt: 0, lockedUntil: 0, codeAttempts: 0 };
  account.failures = account.failures.filter(time => Date.now() - time < policy.windowSeconds * 1000);
  state.accounts[phone] = account;
  return account;
}

export async function stateFor(phone, policy) {
  const state = (await api.read('auth/state')).data;
  return { state, account: accountFor(state, phone, policy) };
}

export async function issueCode(phone, policy) {
  const { state, account } = await stateFor(phone, policy);
  if (account.lockedUntil > Date.now()) return { ok: false, locked: true, account };
  if (Date.now() < account.issuedAt + policy.resendSeconds * 1000) return { ok: false, account };
  account.issuedAt = Date.now();
  account.codeVersion = ((account.codeVersion ?? -1) + 1) % policy.demoCodes.length;
  account.codeAttempts = 0;
  await api.write('auth/state', state);
  return { ok: true, account };
}

export async function verify(phone, value, method, policy) {
  const { state, account } = await stateFor(phone, policy);
  if (account.lockedUntil > Date.now()) return { ok: false, locked: true, account };
  if (method === 'otp' && Date.now() >= account.issuedAt + policy.validSeconds * 1000) {
    return { ok: false, expired: true, account };
  }
  const expected = method === 'otp' ? policy.demoCodes[account.codeVersion ?? 0] : policy.demoPassword;
  if (value !== expected) {
    account.failures.push(Date.now());
    account.codeAttempts++;
    if (account.failures.length >= policy.maxAttempts) account.lockedUntil = Date.now() + policy.lockSeconds * 1000;
    await api.write('auth/state', state);
    return { ok: false, locked: account.lockedUntil > Date.now(), account };
  }
  account.failures = [];
  account.lockedUntil = 0;
  state.verified = { phone, at: Date.now() };
  await api.write('auth/state', state);
  return { ok: true, account };
}

export async function finishSession() {
  const session = (await api.read('public/session')).data;
  await api.write('auth/session', session);
}

export function safeReturn(policy, candidate) {
  const prefix = document.documentElement.dataset.rvBasePath.replace(/\/$/, '');
  const fallback = prefix + '/customer/';
  if (!candidate) return fallback;
  try {
    const url = new URL(candidate, window.location.origin);
    if (url.origin !== window.location.origin || url.search || url.hash) return fallback;
    const match = policy.returnPaths.find(route => url.pathname === prefix + route || url.pathname + '/' === prefix + route);
    return match ? prefix + match : fallback;
  } catch { return fallback; }
}
