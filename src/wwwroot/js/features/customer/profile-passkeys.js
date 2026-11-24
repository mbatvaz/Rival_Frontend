import { faDigits } from '../../core/format.js';
import { submitProfileForm } from './profile-forms.js';

const canUsePasskeys = () => window.isSecureContext && typeof window.PublicKeyCredential === 'function';

export function profilePasskeys(root, deletion, isolated, currentProfile, save) {
  const get = name => root.querySelector('[data-profile-' + name + ']');
  const destination = get('passkeys');
  const add = get('add-passkey');
  const workspace = root.closest('[data-rv-page]');
  let selected;

  function render() {
    const profile = currentProfile();
    get('passkey-count').textContent = faDigits(profile.passkeys.length) + ' دستگاه';
    destination.replaceChildren(...profile.passkeys.map(device => {
      const row = get('device').content.firstElementChild.cloneNode(true);
      row.querySelector('[data-device-icon]').classList.add('ri-' + device.icon);
      row.querySelector('[data-device-name]').textContent = device.name;
      row.querySelector('[data-device-details]').textContent = 'ساخته‌شده ' + device.created + ' · آخرین ورود ' + device.lastUsed;
      const trigger = row.querySelector('button');
      trigger.dataset.deviceId = device.id;
      trigger.setAttribute('aria-label', 'حذف Passkey ' + device.name);
      return row;
    }));
    destination.hidden = profile.passkeys.length === 0;
    add.hidden = !canUsePasskeys() && !isolated;
    get('passkey-support').hidden = !add.hidden;
    add.disabled = !canUsePasskeys() || profile.passkeys.some(device => device.id === 'this-device');
  }

  function prepareDelete(trigger) {
    const device = currentProfile().passkeys.find(item => item.id === trigger.dataset.deviceId);
    selected = device.id;
    deletion.querySelector('[data-profile-sheet-title]').textContent = 'حذف Passkey ' + device.name + '؟';
    trigger.closest('li').setAttribute('data-profile-selected', '');
  }

  function revealSelection(trigger) {
    const row = trigger.closest('li').getBoundingClientRect();
    const sheet = deletion.getBoundingClientRect();
    const overlaps = row.left < sheet.right && row.right > sheet.left;
    const sheetTop = Math.max(0, window.innerHeight - deletion.offsetHeight);
    if (overlaps && row.bottom > sheetTop - 12) {
      workspace.style.setProperty('--rv-profile-lift', '0 ' + (sheetTop - row.bottom - 12) + 'px');
    }
  }

  submitProfileForm(deletion.querySelector('form'), save, () => {
    const id = selected;
    return current => ({ ...current, passkeys: current.passkeys.filter(device => device.id !== id) });
  }, 'Passkey حذف شد.', () => {
    const target = destination.querySelector('button') ?? root.querySelector('[data-profile-open="password"]');
    target.focus({ preventScroll: true });
  });

  add.addEventListener('click', async () => {
    if (add.disabled) return;
    add.disabled = true;
    try {
      await save(current => current.passkeys.some(device => device.id === 'this-device') ? current : ({
        ...current, passkeys: [...current.passkeys, { id: 'this-device', name: 'این دستگاه', icon: 'fingerprint', created: 'امروز', lastUsed: '—' }]
      }), null, 'Passkey آزمایشی برای این دستگاه اضافه شد.');
      destination.querySelector('li:last-child button')?.focus();
    } catch (error) { get('error').textContent = error.message; add.disabled = false; }
  });

  document.addEventListener('rv:sheet-close', event => {
    if (event.detail.id !== deletion.id) return;
    workspace.style.removeProperty('--rv-profile-lift');
    destination.querySelector('[data-profile-selected]')?.removeAttribute('data-profile-selected');
  });

  return { render, prepareDelete, revealSelection };
}
