import { notice } from './auth-view.js';

export function passwordMode() {
  const query = new URLSearchParams(window.location.search);
  return query.get('method') === 'password' || query.get('state') === 'password';
}

export function initMethods(root, changeStage, ready) {
  const get = name => root.querySelector('[data-rv-' + name + ']');
  const show = stage => changeStage(stage, () => {
    get('code').value = '';
    for (const name of ['phone', 'code', 'password']) {
      get(name).setAttribute('aria-invalid', 'false');
      get(name + '-error').textContent = '';
    }
    notice(root, '', 'info');
    return get('phone');
  });
  root.addEventListener('click', event => {
    const method = event.target.closest('[data-rv-method]');
    if (!method || method.disabled || !ready()) return;
    if (method.dataset.rvMethod === 'passkey') {
      notice(root, 'ورود با Passkey فعال نیست؛ از کد پیامکی استفاده کنید.', 'info');
      return;
    }
    const stage = method.dataset.rvMethod === 'password' ? 'password' : 'phone';
    const url = new URL(window.location.href);
    url.searchParams.delete('state');
    if (stage === 'password') url.searchParams.set('method', 'password');
    else url.searchParams.delete('method');
    history.pushState(null, '', url);
    show(stage);
  });
  window.addEventListener('popstate', () => {
    if (ready()) show(passwordMode() ? 'password' : 'phone');
  });
}
