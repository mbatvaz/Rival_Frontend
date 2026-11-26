const digits = value => value.toLocaleString('fa-IR', { minimumIntegerDigits: 2, useGrouping: false });

export function paintAppointmentClock(element, remaining) {
  const units = [remaining % 60, Math.floor(remaining / 60) % 60, Math.floor(remaining / 3600) % 24, Math.floor(remaining / 86400)];
  const labels = [...element.children].map((cell, index) => {
    cell.querySelector('b').textContent = digits(units[index]);
    return `${digits(units[index])} ${cell.querySelector('small').textContent}`;
  });
  element.setAttribute('aria-label', labels.reverse().join('، '));
}

export function startClocks(root, data, startedAt) {
  const clocks = data.appointments.map(appointment => ({
    seconds: appointment.secondsUntilStart,
    element: root.querySelector(`[data-rv-home-countdown="${window.CSS.escape(appointment.id)}"]`)
  }));
  const update = () => {
    if (document.hidden) return;
    const elapsed = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    clocks.forEach(({ seconds, element }) => {
      const remaining = Math.max(0, seconds - elapsed);
      paintAppointmentClock(element, remaining);
    });
    data.payments.forEach(payment => {
    const card = root.querySelector(`[data-rv-payment-id="${window.CSS.escape(payment.id)}"]`);
    const hold = card.querySelector('[data-rv-home-hold]');
    const progress = card.querySelector('[data-rv-home-hold-progress]');
    const pay = card.querySelector('[data-rv-home-pay]');
    const remaining = Math.max(0, payment.remainingSeconds - elapsed);
    hold.textContent = `${Math.floor(remaining / 3600).toLocaleString('fa-IR')}:${digits(Math.floor(remaining / 60) % 60)}`;
    progress.value = remaining;
    if (!remaining && pay.hasAttribute('href')) {
      const url = new URL(pay.href);
      url.searchParams.set('state', 'exp');
      pay.href = url.href;
      pay.textContent = 'مشاهده درخواست';
    }
    });
  };
  update();
  const timer = window.setInterval(update, 1000);
  document.addEventListener('visibilitychange', update);
  window.addEventListener('pagehide', () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', update); }, { once: true });
}
