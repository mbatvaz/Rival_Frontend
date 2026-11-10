import { api } from '../core/api.js';
import { basePath } from '../core/config.js';
import { faDigits } from '../core/format.js';
import { normalizePhone, validPhone, latinDigits, stateFor, issueCode, verify, finishSession, safeReturn } from '../core/auth-demo.js';
import { initOtp } from '../components/otp.js';
import { initMethods } from './auth-methods.js';
import { render, fieldError, notice } from './auth-view.js';
import { applyPreview } from './auth-preview.js';

export async function init() {
  const root = document;
  const get = name => root.querySelector('[data-rv-' + name + ']');
  const form = get('auth-form');
  const view = { stage: 'phone', busy: false, newUser: false };
  let policy;
  let account = { issuedAt: 0, lockedUntil: 0, failures: [] };
  let timer;
  let accountRevision = 0;
  const refresh = () => render(root, view, policy, account);
  const candidate = new URLSearchParams(window.location.search).get('return');
  async function load() {
    try {
      policy = (await api.read('auth/policy')).data;
      account = (await applyPreview(root, policy, view)) ?? account;
      get('auth-return').hidden = safeReturn(policy, candidate) !== basePath() + 'customer/book/';
      const supported = typeof window.PublicKeyCredential === 'function' && window.isSecureContext;
      document.querySelector('[data-rv-passkey]').dataset.rvSupported = String(supported);
      refresh();
      if (new URLSearchParams(window.location.search).get('state') === 'password') root.querySelector('[data-rv-method="password"]').click();
      if (!timer) timer = window.setInterval(refresh, 1000);
    } catch (error) {
      notice(root, error.message);
      get('auth-retry').hidden = false;
      get('auth-submit').disabled = true;
    }
  }
  get('auth-retry').addEventListener('click', () => {
    view.busy = false;
    notice(root, '');
    get('auth-retry').hidden = true;
    if (policy) refresh(); else load();
  });
  get('phone').addEventListener('change', async () => {
    const phone = normalizePhone(get('phone').value);
    const revision = ++accountRevision;
    if (validPhone(phone) && policy) {
      try {
        const result = await stateFor(phone, policy);
        if (revision === accountRevision && !view.busy) { account = result.account; refresh(); }
      }
      catch (error) { notice(root, error.message); }
    }
  });
  get('phone').addEventListener('input', () => {
    get('phone').value = faDigits(latinDigits(get('phone').value).replace(/\D/g, '').slice(0, 11));
    fieldError(root, 'phone', '');
  });
  get('phone').addEventListener('paste', event => {
    if (get('phone').readOnly || get('phone').disabled) return;
    event.preventDefault();
    get('phone').value = faDigits(latinDigits(event.clipboardData.getData('text')).replace(/\D/g, '').slice(0, 11));
    fieldError(root, 'phone', '');
  });
  initOtp(root);
  get('code').addEventListener('input', () => {
    const caret = get('code').selectionStart;
    get('code').value = faDigits(latinDigits(get('code').value).replace(/\D/g, '').slice(0, policy?.digits ?? 5));
    get('code').setSelectionRange(caret, caret);
    fieldError(root, 'code', '');
    refresh();
  });
  const edit = () => { view.stage = 'phone'; get('code').value = ''; refresh(); get('phone').focus(); };
  get('edit-phone').addEventListener('click', edit);
  initMethods(root, view, refresh, () => Boolean(policy));
  async function submit(resending = false) {
    if (!policy || view.busy) return;
    const phone = normalizePhone(get('phone').value);
    if (!validPhone(phone)) { fieldError(root, 'phone', 'شماره موبایل را درست بنویسید.'); get('phone').focus(); return; }
    view.busy = true;
    accountRevision++;
    notice(root, '');
    refresh();
    try {
      if (view.stage === 'phone' || resending) {
        const result = await issueCode(phone, policy);
        account = result.account;
        if (!result.locked) {
          view.stage = 'otp';
          get('code').value = '';
          refresh();
          get('code').focus();
          fieldError(root, 'code', '');
        }
      } else {
        const method = view.stage === 'password' ? 'password' : 'otp';
        const value = method === 'otp' ? latinDigits(get('code').value) : get('password').value;
        const result = await verify(phone, value, method, policy);
        account = result.account;
        if (result.ok) {
          const destination = safeReturn(policy, candidate);
          if (view.newUser) window.location.assign(basePath() + policy.completePath.slice(1) + '?return=' + encodeURIComponent(destination));
          else { await finishSession(); window.location.assign(destination); }
        } else if (!result.locked) {
          const message = result.expired ? 'اعتبار کد تمام شده است. کد تازه بگیرید.' : method === 'otp'
            ? 'کد درست نیست. ' + faDigits(policy.maxAttempts - account.failures.length) + ' تلاش دیگر دارید.'
            : 'اطلاعات ورود درست نیست. دوباره تلاش کنید.';
          fieldError(root, method === 'otp' ? 'code' : 'password', message);
        }
      }
    } catch (error) { notice(root, error.message); }
    finally { view.busy = false; refresh(); }
  }
  form.addEventListener('submit', event => { event.preventDefault(); submit(); });
  get('resend').addEventListener('click', () => submit(true));
  await load();
}
