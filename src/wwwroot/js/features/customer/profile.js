import { closeSheet, openSheet } from '../../components/sheet.js';
import { api } from '../../core/api.js';
import { displayPhone, profilePhone } from './profile-phone.js';
import { profileForms } from './profile-forms.js';
import { profilePasskeys } from './profile-passkeys.js';
import { showPhoto } from './profile-photo.js';

const stateResource = 'customer/profile-state';
const triggers = {
  edit: '[data-profile-open="edit"]', password: '[data-profile-open="password"]',
  'phone-current': '[data-profile-open="phone"]', 'phone-new': '[data-profile-open="phone"]',
  'passkey-delete': '[data-device-id="laptop"]'
};

export async function init(root) {
  const get = name => root.querySelector('[data-profile-' + name + ']');
  const preview = new URLSearchParams(location.search).get('state');
  const isolated = preview === 'example' || Object.hasOwn(triggers, preview);
  let example;
  let profile;
  let policy;
  let salon;
  async function savedProfile() { return (await api.read('customer/profile-state')).data ?? example; }

  try {
    const [fixture, auth, rules, saved] = await Promise.all([
      api.read('customer/profile'), api.read('auth/policy'), api.read('public/rules'), isolated ? null : savedProfile()
    ]);
    example = fixture.data;
    profile = saved ?? example;
    policy = auth.data;
    salon = rules.data.phone;
  } catch (error) {
    get('error').textContent = error.message;
    return;
  }

  const sheets = Object.fromEntries(['edit', 'phone', 'password', 'passkey-delete']
    .map(name => [name, document.getElementById('rv-profile-' + name)]));
  const photos = [...document.querySelectorAll('[data-profile-photo]')];
  photos.forEach(image => { image.dataset.profileSample = image.src; });
  const [cover] = photos;

  async function save(update, sheet, message, afterRender) {
    const write = async () => (await api.write(stateResource, update(await savedProfile()))).data;
    if (isolated) profile = update(profile);
    else profile = navigator.locks ? await navigator.locks.request('rival:' + stateResource, write) : await write();
    if (sheet && !sheet.hidden) await closeSheet();
    render();
    get('status').textContent = message;
    afterRender?.();
  }

  const forms = profileForms(sheets, save);
  const passkeys = profilePasskeys(root, sheets['passkey-delete'], isolated, () => profile, save);
  const preparePhone = profilePhone(sheets.phone, policy, salon, save);

  function render() {
    root.querySelectorAll('[data-profile-name]').forEach(node => { node.textContent = profile.firstName + ' ' + profile.lastName; });
    root.querySelectorAll('[data-profile-phone]').forEach(node => { node.textContent = displayPhone(profile.phone); });
    showPhoto(cover, profile.photo);
    get('password-status').textContent = profile.passwordConfigured ? 'تنظیم شده؛ اختیاری' : 'تنظیم نشده؛ اختیاری';
    passkeys.render();
  }

  function open(trigger, exampleState = '') {
    const name = trigger.dataset.profileOpen;
    const sheet = sheets[name];
    sheet.querySelector('[data-profile-form-error]').textContent = '';
    if (name === 'edit') forms.prepareEdit(profile);
    if (name === 'phone') preparePhone(profile.phone, exampleState);
    if (name === 'password') forms.preparePassword(exampleState ? policy.demoPassword : '');
    if (name === 'passkey-delete') passkeys.prepareDelete(trigger);
    openSheet(sheet.id, trigger);
    if (name === 'passkey-delete' && !sheet.hidden) passkeys.revealSelection(trigger);
  }

  root.addEventListener('click', event => {
    const trigger = event.target.closest('[data-profile-open]');
    if (trigger) open(trigger);
  });
  root.querySelectorAll('[data-profile-open]').forEach(button => { button.disabled = false; });
  render();
  if (Object.hasOwn(triggers, preview)) open(root.querySelector(triggers[preview]), preview);
}
