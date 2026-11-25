import { profilePhoto } from './profile-photo.js';

export function submitProfileForm(form, save, update, message, focusAfter) {
  const submit = form.querySelector('[type="submit"]');
  const error = form.querySelector('[data-profile-form-error]');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;
    submit.disabled = true;
    error.textContent = '';
    try { await save(update(form.elements), form.closest('.rv-sheet'), message, focusAfter); }
    catch (failure) { error.textContent = failure.message; }
    finally { submit.disabled = false; }
  });
}

export function profileForms(sheets, save) {
  const edit = sheets.edit.querySelector('form');
  const password = sheets.password.querySelector('form');
  const photo = profilePhoto(edit);

  function prepareEdit(profile) {
    photo.end();
    edit.reset();
    for (const key of ['firstName', 'lastName']) edit.elements[key].value = profile[key];
    photo.setDraft(profile.photo);
  }

  function preparePassword(sample = '') {
    password.reset();
    password.elements.password.value = sample;
    for (const button of password.querySelectorAll('[data-profile-show-password]')) {
      button.previousElementSibling.type = 'password';
      button.setAttribute('aria-pressed', 'false');
      button.firstElementChild.className = 'ri ri-eye-off';
    }
  }

  password.addEventListener('click', event => {
    const button = event.target.closest('[data-profile-show-password]');
    if (!button) return;
    const input = button.previousElementSibling;
    const visible = input.type === 'password';
    input.type = visible ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(visible));
    button.firstElementChild.className = visible ? 'ri ri-eye' : 'ri ri-eye-off';
  });

  submitProfileForm(edit, save, fields => {
    const firstName = fields.firstName.value.trim();
    const lastName = fields.lastName.value.trim();
    if (!firstName || !lastName) {
      fields[firstName ? 'lastName' : 'firstName'].focus();
      throw new Error('نام و نام خانوادگی را بنویسید.');
    }
    const picture = photo.value();
    return current => ({ ...current, firstName, lastName, photo: picture });
  }, 'پروفایل ذخیره شد.');
  submitProfileForm(password, save, fields => {
    const value = fields.password.value;
    if (value.length < 8 || !/\p{L}/u.test(value) || !/\p{Nd}/u.test(value)) {
      fields.password.focus();
      throw new Error('رمز تازه باید دست‌کم ۸ نویسه، با حرف و عدد داشته باشد.');
    }
    if (value !== fields.confirmPassword.value) {
      fields.confirmPassword.focus();
      throw new Error('تکرار رمز با رمز تازه یکسان نیست.');
    }
    return current => ({ ...current, passwordConfigured: true });
  }, 'تنظیم رمز در پروفایل آزمایشی ثبت شد.');
  document.addEventListener('rv:sheet-close', event => {
    if (event.detail.id === sheets.edit.id) photo.end();
    if (event.detail.id === sheets.password.id) preparePassword();
  });

  return { prepareEdit, preparePassword };
}
