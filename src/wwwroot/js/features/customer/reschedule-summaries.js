import { changeDetails, loadReschedules, refreshReschedulesOnRestore, usedNote } from './reschedule-data.js';
import { updateAppointmentHero } from './reschedule-detail.js';

export async function refreshAppointmentCards(root, data) {
  const { changes } = await loadReschedules().catch(() => ({ changes: {} }));
  refreshReschedulesOnRestore(changes);
  const upcoming = data.groups.find(group => group.key === 'upcoming');
  const months = [...root.querySelectorAll('[data-rv-appointments-panel="upcoming"] [data-rv-record-month]')];
  for (const [id, change] of Object.entries(changes)) {
    const original = upcoming.months.find(month => month.items.some(item => item.id === id));
    if (!original) continue;
    const record = original.items.find(item => item.id === id);
    const details = changeDetails(change);
    Object.assign(record, details);
    const card = months.flatMap(month => [...month.querySelectorAll('[data-rv-record]')]).find(item => item.dataset.rvRecord === id);
    if (!card) continue;
    const date = card.querySelector('.rv-recurring-date');
    date.querySelector('strong').textContent = details.day;
    date.querySelector('span').textContent = details.weekday;
    date.querySelector('bdi').textContent = details.time;
    card.setAttribute('aria-label', 'جزئیات نوبت ' + details.weekday + ' ' + details.day + ' ' + details.month
      + '، ساعت ' + details.time + '، ' + record.service + ' با ' + record.stylist);
    const destination = upcoming.months.find(month => month.label === record.month) ?? original;
    if (destination !== original) {
      original.items = original.items.filter(item => item !== record);
      destination.items.push(record);
    }
    const siblings = destination.items.filter(item => item !== record);
    const next = siblings.find(item => item.date > record.date || (item.date === record.date && item.time > record.time));
    const list = months[upcoming.months.indexOf(destination)].querySelector('[data-rv-appointments-records]');
    list.insertBefore(card, [...list.children].find(item => item.dataset.rvRecord === next?.id) ?? null);
  }
}

export async function refreshHomeAppointments(root, inactive) {
  const { changes } = await loadReschedules().catch(() => ({ changes: {} }));
  refreshReschedulesOnRestore(changes);
  for (const hero of root.querySelectorAll('[data-rv-appointment]')) {
    const change = changes[hero.dataset.rvAppointment];
    if (!change) continue;
    updateAppointmentHero(hero, change);
    hero.querySelector('.rv-appointment-hero__tag').lastChild.textContent = 'جابه‌جا شده';
    const countdown = hero.querySelector('.rv-appointment-countdown');
    if (countdown) countdown.hidden = true;
    if (change.ordinaryUsed && !inactive) {
      const move = hero.querySelector('[data-rv-home-write-action]');
      move.removeAttribute('href');
      move.setAttribute('role', 'link');
      move.setAttribute('aria-disabled', 'true');
      move.title = usedNote;
    }
  }
}
