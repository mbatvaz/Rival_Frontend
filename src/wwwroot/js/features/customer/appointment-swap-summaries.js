import { api } from '../../core/api.js';
import { faDigits, jalali } from '../../core/format.js';
import { salonDay } from '../../core/appointment-swap-rules.js';
import { get, dayName } from '../booking/shared.js';
import { plusDays } from '../booking/calendar.js';
import { changeDetails } from './reschedule-data.js';
import { updateAppointmentHero } from './reschedule-detail.js';
import { preserveSwapNavigation, refreshSwapOnRestore, swapLink } from './appointment-swap-context.js';

async function showCustomer(root, customer) {
  const view = await api.appointmentSwap.list(customer);
  const label = get(root, 'swap-customer');
  label.textContent = view.customerName ? 'پیش‌نمایش تعویض نوبت · ' + view.customerName : 'مشتری پیش‌نمایش پیدا نشد.';
  label.hidden = false;
  preserveSwapNavigation(customer, view.customerName);
  refreshSwapOnRestore(customer, view.appointments);
  return view.appointments;
}

export async function projectSwapAppointments(root, data, customer) {
  const records = await showCustomer(root, customer);
  const group = data.groups.find(group => group.key === 'upcoming');
  const container = root.querySelector('[data-rv-appointments-panel="upcoming"]');
  const example = get(container, 'record-month');
  const templates = get(root, 'swap-cards').content;
  const monthGroups = [];
  const months = new Map();
  container.replaceChildren();
  root.querySelector('[data-rv-appointments-panel="history"]').replaceChildren();
  Object.assign(data.groups.find(item => item.key === 'history'), { count: 0, months: [] });
  for (const record of records) {
    const details = changeDetails(record);
    const key = details.date.slice(0, 7).replace('/', '-');
    if (!months.has(key)) {
      const section = example.cloneNode(true);
      const title = section.querySelector('h2');
      title.id = 'rv-swap-month-' + key;
      title.textContent = details.month;
      section.setAttribute('aria-labelledby', title.id);
      const cards = get(section, 'appointments-records');
      cards.replaceChildren();
      container.append(section);
      const model = { key, label: details.month, items: [] };
      monthGroups.push(model);
      months.set(key, { cards, model });
    }
    const card = templates.querySelector('[data-rv-record="' + record.id + '"]').cloneNode(true);
    const badge = card.querySelector('.rv-recurring-date');
    badge.querySelector('strong').textContent = details.day;
    badge.querySelector('span').textContent = dayName(record.date);
    badge.querySelector('bdi').textContent = details.time;
    card.setAttribute('aria-label', 'جزئیات نوبت ' + details.weekday + ' ' + details.day + ' ' + details.month + '، ساعت ' + details.time);
    card.href = swapLink(card.href, customer);
    const month = months.get(key);
    month.cards.append(card);
    month.model.items.push({ ...record, ...details });
  }
  Object.assign(group, { count: records.length, months: monthGroups });
  const today = salonDay();
  const date = day => changeDetails({ date: day, time: '00:00' }).date;
  data.today = date(today);
  data.todayLabel = 'امروز، ' + jalali(today + 'T12:00:00Z');
  data.filters.boundaries.week = { from: data.today, to: date(plusDays(today, 7)) };
  data.filters.boundaries.month = { from: data.today, to: date(plusDays(today, 30)) };
  Object.assign(data.filters.example, data.filters.boundaries.month);
}

export async function renderSwapHome(root, customer) {
  const records = await showCustomer(root, customer);
  const rail = get(root, 'home-appointments');
  const templates = get(root, 'swap-heroes').content;
  rail.replaceChildren();
  for (const selector of ['home-personal', 'home-payment', 'home-pager']) get(root, selector).hidden = true;
  for (const record of records) {
    const hero = templates.querySelector('[data-rv-appointment="' + record.id + '"]').cloneNode(true);
    updateAppointmentHero(hero, record);
    hero.querySelector('.rv-appointment-hero__tag').lastChild.textContent = 'رزرو شده';
    const detail = get(hero, 'home-detail');
    detail.href = swapLink(detail.href, customer);
    const move = get(hero, 'home-write-action');
    if (record.canSwap && record.rescheduleAllowance) move.href = swapLink(move.href, customer);
    else move.hidden = true;
    rail.append(hero);
  }
  get(root, 'home-empty').hidden = records.length > 0;
  rail.hidden = !records.length;
  const counter = get(root, 'home-counter');
  counter.hidden = !records.length;
  counter.textContent = '۱ از ' + faDigits(records.length);
}
