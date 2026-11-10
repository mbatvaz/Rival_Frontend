import { openSheet, closeSheet } from '../components/sheet.js';
import { notice } from './auth-view.js';

export function initMethods(root, view, refresh, ready) {
  const form = root.querySelector('[data-rv-auth-form]');
  const home = form.parentElement;
  const anchor = form.nextSibling;
  let placeholder;
  let previousStage;
  const get = name => root.querySelector('[data-rv-' + name + ']');
  root.addEventListener('click', event => {
    const method = event.target.closest('[data-rv-method]');
    if (!method || method.disabled || !ready()) return;
    if (method.dataset.rvMethod === 'password') {
      previousStage = view.stage;
      placeholder = form.cloneNode(true);
      for (const node of [placeholder, ...placeholder.querySelectorAll('*')]) {
        for (const attribute of [...node.attributes]) {
          if (['id', 'for', 'name', 'aria-describedby', 'aria-labelledby'].includes(attribute.name) || attribute.name.startsWith('data-rv-')) {
            node.removeAttribute(attribute.name);
          }
        }
      }
      placeholder.inert = true;
      placeholder.setAttribute('aria-hidden', 'true');
      home.insertBefore(placeholder, form);
      view.stage = 'password';
      get('password-host').append(form);
      refresh();
      openSheet('rv-password-sheet', method);
    } else {
      closeSheet();
      view.stage = 'phone';
      notice(root, method.dataset.rvMethod === 'passkey'
        ? 'ورود با Passkey در نسخهٔ آزمایشی فعال نیست؛ از کد پیامکی استفاده کنید.' : '', 'info');
      refresh();
      get('phone').focus();
    }
  });
  root.addEventListener('rv:sheet-close', event => {
    if (event.detail.id !== 'rv-password-sheet') return;
    home.insertBefore(form, anchor);
    placeholder?.remove();
    view.stage = previousStage;
    refresh();
  });
}
