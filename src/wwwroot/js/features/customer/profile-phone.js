import { initOtp, renderOtp } from '../../components/otp.js';
import { latinDigits, normalizePhone, validPhone } from '../../core/auth-demo.js';
import { faDigits } from '../../core/format.js';
import { phoneChallenge } from './profile-phone-challenge.js';
import { phonePreview, renderPhoneStage } from './profile-phone-view.js';

export const displayPhone = phone => faDigits(normalizePhone(phone).replace(/^(\d{4})(\d{3})(\d{4})$/, '$1 $2 $3'));

export function profilePhone(sheet, policy, salonPhone, save) {
  const form = sheet.querySelector('form');
  const get = name => sheet.querySelector('[data-profile-' + name + ']');
  const newNumber = form.elements.phone;
  const code = form.elements.code;
  const codeField = get('phone-code');
  const resend = get('resend');
  const submit = get('submit');
  const error = get('form-error');
  let current;
  let stage;
  const challenge = phoneChallenge(resend, get('demo-code'), policy);

  initOtp(codeField);
  get('salon-contact').href = 'tel:' + salonPhone;

  function updateButton() {
    submit.disabled = stage !== 'number' && (code.value.length !== policy.digits || challenge.exhausted());
  }

  function show() {
    renderPhoneStage(sheet, get, stage);
    error.textContent = '';
    code.removeAttribute('aria-invalid');
    newNumber.removeAttribute('aria-invalid');
    code.toggleAttribute('data-rv-sheet-initial-focus', stage !== 'number');
    renderOtp(codeField);
    updateButton();
  }

  function warn(input, message) {
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.focus();
  }

  resend.addEventListener('click', () => {
    if (resend.disabled) return;
    code.value = '';
    challenge.issue();
    show();
    code.focus();
  });
  get('edit-phone').addEventListener('click', () => {
    challenge.stop();
    stage = 'number';
    show();
    newNumber.focus();
  });
  code.addEventListener('input', () => {
    code.value = faDigits(latinDigits(code.value).replace(/\D/g, '').slice(0, policy.digits));
    error.textContent = '';
    code.removeAttribute('aria-invalid');
    renderOtp(codeField);
    updateButton();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;
    const phone = normalizePhone(newNumber.value);
    if (stage === 'number') {
      if (!validPhone(phone) || phone === current) {
        warn(newNumber, 'شماره موبایل تازه و معتبر را بنویسید.');
        return;
      }
      newNumber.value = displayPhone(phone);
      stage = 'new';
      code.value = '';
      challenge.issue();
      show();
      code.focus();
      return;
    }
    const failure = challenge.check(latinDigits(code.value));
    if (failure) {
      warn(code, failure);
      updateButton();
      return;
    }
    if (stage === 'current') {
      challenge.stop();
      stage = 'number';
      show();
      newNumber.focus();
      return;
    }
    submit.disabled = true;
    try {
      await save(profile => {
        if (normalizePhone(profile.phone) !== current) throw new Error('شماره فعلی تغییر کرده است. برگه را دوباره باز کنید.');
        return { ...profile, phone };
      }, sheet, 'شماره موبایل تغییر کرد.');
    } catch (failure) {
      error.textContent = failure.message;
    } finally { updateButton(); }
  });
  document.addEventListener('rv:sheet-close', event => {
    if (event.detail.id === sheet.id) challenge.stop();
  });
  return (phone, preview = '') => {
    const sample = phonePreview(preview);
    current = normalizePhone(phone);
    stage = sample.stage;
    challenge.reset(preview.startsWith('phone-'), stage === 'new' ? 1 : 0);
    sheet.querySelector('#profile-current').value = displayPhone(current);
    get('verified-number').textContent = displayPhone(current);
    newNumber.value = sample.phone;
    code.value = sample.code;
    challenge.issue(sample.expected, sample.seconds);
    show();
  };
}
