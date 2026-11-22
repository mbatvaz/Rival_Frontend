import { api } from '../../core/api.js';
import { faDigits } from '../../core/format.js';
import { focusSheetTarget } from '../../components/sheet-focus.js';
import { dateLabel, get, text } from '../booking/shared.js';

export function initSwapCodeDisplay(sheet, customer, record, expire) {
  const display = get(sheet, 'swap-offer');
  const copy = get(display, 'swap-copy');
  const progress = get(display, 'swap-progress');
  let interval, offer;

  function stop() {
    window.clearInterval(interval);
    offer = null;
  }

  function tick() {
    const seconds = Math.min(progress.max, Math.ceil((offer.expiresAt - Date.now()) / 1000));
    if (seconds <= 0) {
      expire();
      void api.appointmentSwap.active(customer, record.id).catch(() => {});
      return;
    }
    const remaining = [Math.floor(seconds / 60), seconds % 60].map(value => String(value).padStart(2, '0')).join(':');
    text(display, 'swap-timer', faDigits(remaining));
    progress.value = seconds;
  }

  copy.addEventListener('click', async () => {
    if (!offer || copy.disabled) return;
    try {
      await navigator.clipboard.writeText(offer.code);
      text(sheet, 'swap-status', 'کد کپی شد.');
    } catch {
      text(sheet, 'swap-status', 'کپی خودکار ممکن نیست. کد را انتخاب و کپی کنید.');
    }
  });
  document.addEventListener('rv:sheet-close', event => {
    if (event.detail.id === sheet.id) stop();
  });
  api.appointmentSwap.observe(async () => {
    if (sheet.hidden || !offer || copy.disabled) return;
    const id = offer.id;
    const current = await api.appointmentSwap.active(customer, record.id).catch(error => error.code === 'CHANGED' ? null : offer);
    if (sheet.hidden || offer?.id !== id || current?.id === id) return;
    stop();
    display.hidden = true;
    text(sheet, 'swap-status', 'این کد دیگر فعال نیست. نوبت‌های خود را دوباره بررسی کنید.');
    focusSheetTarget(sheet.querySelector('[data-rv-sheet-close]'));
  });

  return {
    hide() {
      stop();
      display.hidden = true;
    },
    show(result, { sample = false, open } = {}) {
      stop();
      offer = result;
      copy.disabled = sample;
      display.hidden = false;
      text(display, 'swap-code', sample ? 'DEMO-0000-0000-0000-0000-0000' : result.code.match(/.{4}/g).join('-'));
      text(display, 'swap-target', dateLabel(result.desiredDate));
      tick();
      open?.();
      if (!sheet.hidden) {
        if (offer) focusSheetTarget(display.querySelector('h3'));
        if (!sample && offer) interval = window.setInterval(tick, 250);
      }
    }
  };
}
