import { renderOtp } from '../components/otp.js';
import { faDigits, time24 } from '../core/format.js';

export function render(root, view, policy, account) {
  const get = name => root.querySelector('[data-rv-' + name + ']');
  const locked = account.lockedUntil > Date.now();
  const otp = view.stage === 'otp';
  const password = view.stage === 'password';
  get('otp-stage').hidden = !otp;
  renderOtp(root);
  get('password-stage').hidden = !password;
  get('phone').readOnly = otp || view.busy;
  get('edit-phone').hidden = !otp;
  get('back-to-code').hidden = view.stage === 'phone';
  if (!password) {
    get('auth-title').textContent = otp ? 'کد ورود را وارد کنید' : 'ورود یا ثبت‌نام';
    get('auth-description').textContent = otp ? 'کد ۵ رقمی تا ۲ دقیقه معتبر است.' : 'با یک کد پیامکی، بدون رمز عبور';
  }
  get('auth-submit').textContent = view.busy ? 'لطفاً صبر کنید…' : view.stage === 'phone' ? 'دریافت کد' : 'ورود';
  get('auth-form').setAttribute('aria-busy', String(view.busy));
  get('auth-submit').dataset.rvLoading = String(view.busy);
  get('auth-submit').disabled = locked || view.busy || (otp && get('code').value.length !== policy.digits);
  get('auth-lock').hidden = !locked;
  get('auth-lock').textContent = locked ? 'برای امنیت حساب، همهٔ روش‌های ورود این شماره تا ساعت ' + time24(account.lockedUntil) + ' بسته است.' : '';
  for (const button of root.querySelectorAll('[data-rv-method]')) {
    button.disabled = locked || view.busy || button.dataset.rvSupported === 'false';
  }
  const resend = Math.max(0, Math.ceil((account.issuedAt + policy.resendSeconds * 1000 - Date.now()) / 1000));
  const valid = Math.max(0, Math.ceil((account.issuedAt + policy.validSeconds * 1000 - Date.now()) / 1000));
  get('resend').disabled = resend > 0 || locked || view.busy;
  get('resend').textContent = resend ? 'ارسال دوباره تا ' + faDigits(resend) + ' ثانیه' : 'ارسال دوباره کد';
  get('code-timer').textContent = otp ? valid ? 'اعتبار کد: ' + faDigits(valid) + ' ثانیه' : 'اعتبار کد تمام شده است.' : '';
  get('auth-demo').textContent = 'نسخهٔ آزمایشی؛ هیچ پیامکی فرستاده نمی‌شود. ' + (password ? 'رمز نمونه: ' + policy.demoPassword : 'کد نمونه: ' + faDigits(policy.demoCodes[account.codeVersion ?? 0]));
}

export function fieldError(root, name, message) {
  const input = root.querySelector('[data-rv-' + name + ']');
  input.setAttribute('aria-invalid', String(Boolean(message)));
  const error = root.querySelector('[data-rv-' + name + '-error]');
  if (error) error.textContent = message;
}

export function notice(root, message, tone = 'error') {
  const status = root.querySelector('[data-rv-auth-status]');
  status.textContent = message;
  status.dataset.rvTone = tone;
  status.setAttribute('role', tone === 'error' ? 'alert' : 'status');
}
