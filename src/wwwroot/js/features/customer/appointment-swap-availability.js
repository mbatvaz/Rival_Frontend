import { api } from '../../core/api.js';
import { get } from '../booking/shared.js';
import { paintAppointmentClock } from './home-clocks.js';

export function swapAvailability(current, message = '') {
  const note = get(current, 'swap-availability');
  note.textContent = message;
  note.hidden = !message;
}

export function watchSwapAvailability(current, start, customer, record, redeem) {
  const clock = current.querySelector('.rv-appointment-countdown');
  let expiresAt;
  let updating = 0;
  let stopped = false;
  function update() {
    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((start - now) / 1000));
    paintAppointmentClock(clock, remaining);
    const liftClock = document.querySelector('[data-rv-cancel-hero] .rv-appointment-countdown');
    if (liftClock) paintAppointmentClock(liftClock, remaining);
    redeem.disabled = !remaining || expiresAt === undefined || expiresAt > now;
    swapAvailability(current, !remaining ? 'این نوبت دیگر قابل تعویض نیست.'
      : expiresAt === undefined ? 'وضعیت کد در دسترس نیست.'
        : expiresAt > now ? 'ثبت کد پس از پایان اعتبار کد فعلی فعال می‌شود.' : '');
    if (redeem.disabled) redeem.setAttribute('aria-describedby', 'rv-swap-availability');
    else redeem.removeAttribute('aria-describedby');
  }
  async function refresh() {
    const revision = ++updating;
    try {
      const offer = await api.appointmentSwap.active(customer, record.id);
      if (revision === updating) setOffer(offer);
    } catch {
      if (revision === updating && !stopped && redeem.isConnected) update();
    }
  }
  function setOffer(offer) {
    updating++;
    expiresAt = offer?.expiresAt ?? 0;
    if (!stopped && redeem.isConnected) update();
  }
  const timer = window.setInterval(() => {
    if (!stopped && redeem.isConnected) update();
    else window.clearInterval(timer);
  }, 1000);
  api.appointmentSwap.observe(() => { if (redeem.isConnected) void refresh(); });
  window.addEventListener('focus', () => { if (redeem.isConnected) void refresh(); });
  return { setOffer, refresh, stop() { stopped = true; window.clearInterval(timer); } };
}
