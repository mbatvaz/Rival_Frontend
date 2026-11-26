export function webOtp(input) {
  if (!window.isSecureContext || !('OTPCredential' in window) || !window.navigator.credentials?.get) return () => {};
  let key;
  let request;
  let timeout;
  const stop = () => {
    request?.abort();
    request = null;
    window.clearTimeout(timeout);
  };
  input.addEventListener('input', stop);
  input.form.addEventListener('submit', stop);
  input.form.querySelector('[data-rv-resend], [data-profile-resend]')?.addEventListener('click', stop);
  window.addEventListener('pagehide', stop);
  return (next, remaining = 0) => {
    if (next === key) return;
    key = next;
    stop();
    if (next == null || remaining <= 0) return;
    const controller = new AbortController();
    request = controller;
    timeout = window.setTimeout(stop, remaining);
    window.navigator.credentials.get({ otp: { transport: ['sms'] }, signal: controller.signal }).then(credential => {
      if (request !== controller || !/^\d+$/.test(credential?.code ?? '') || credential.code.length !== input.maxLength || input.disabled || input.closest('[hidden], [inert], [data-rv-closing]')) return;
      input.value = credential.code;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }).catch(() => {}).finally(() => { if (request === controller) stop(); });
  };
}
