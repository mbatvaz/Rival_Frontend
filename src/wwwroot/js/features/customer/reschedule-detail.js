import { get } from '../booking/shared.js';
import { changeDetails, cutoff, forfeitsRefund, timeLabel, usedNote } from './reschedule-data.js';

export function updateAppointmentHero(hero, change) {
  const { weekday, month, day, time } = changeDetails(change);
  const date = hero.querySelector('.rv-appointment-hero__date');
  date.querySelector('b').textContent = day;
  date.querySelector('span').textContent = weekday;
  date.querySelector('small').textContent = month;
  hero.querySelector('.rv-appointment-hero__time > b').textContent = time;
  const service = hero.querySelector('.rv-appointment-hero__service');
  hero.setAttribute('aria-label', service.querySelector('h2').textContent + ' ' + service.querySelector('p').firstChild.textContent
    + '، ' + weekday + ' ' + day + ' ' + month + ' ساعت ' + time);
}

function setTimeline(current, steps) {
  const timeline = current.querySelector('.rv-appointment-detail__timeline');
  const item = timeline.firstElementChild;
  timeline.replaceChildren(...steps.map(([title, ...entries]) => {
    const step = item.cloneNode(false);
    step.dataset.rvPolicyStep = title === 'اکنون' ? 'now' : title.startsWith('دیروز') ? 'past' : 'next';
    const caption = document.createElement('strong');
    caption.textContent = title;
    step.append(caption);
    for (const [icon, description] of entries) {
      const line = document.createElement('p');
      const symbol = document.createElement('span');
      symbol.className = 'ri ri-' + icon;
      symbol.setAttribute('aria-hidden', 'true');
      line.append(symbol, description);
      step.append(line);
    }
    return step;
  }));
}

export function paintLateDetail(current) {
  get(current, 'detail-rsc-warning').hidden = false;
  const clock = current.querySelector('.rv-appointment-countdown');
  ['۴۰', '۱۹', '۰۵'].forEach((value, index) => { clock.children[index].querySelector('b').textContent = value; });
  clock.lastElementChild.hidden = true;
  setTimeline(current, [
    ['دیروز، ۱۶:۰۰', ['minus', 'مهلت لغو با بازگشت هزینه گذشت']],
    ['اکنون', ['minus', 'لغو: مبلغی برنمی‌گردد'], ['repeat', 'جابه‌جایی: یک بار، و حق بازگشت هزینه از بین می‌رود']],
    ['امروز، ۱۳:۰۰', ['ban', 'جابه‌جایی دیگر ممکن نیست']],
    ['امروز، ۱۶:۰۰، شروع نوبت', ['ban', 'لغو و جابه‌جایی ممکن نیست']]
  ]);
}

export function paintChangedDetail(current, change, cutoffDays, sample, sampleClock) {
  updateAppointmentHero(current.querySelector('.rv-appointment-hero'), change);
  const previous = get(current, 'detail-previous');
  previous.hidden = false;
  previous.querySelector('del').textContent = change.from;
  const clock = current.querySelector('.rv-appointment-countdown');
  if (clock && sampleClock) {
    ['۱۲', '۰۴', '۰۴', '۰۶'].forEach((value, index) => { clock.children[index].querySelector('b').textContent = value; });
  } else if (clock) clock.hidden = true;
  const amount = current.querySelector('.rv-appointment-detail__facts dd').textContent;
  const start = [timeLabel(change.date, change.time) + '، شروع نوبت', ['ban', 'لغو ممکن نیست']];
  setTimeline(current, forfeitsRefund(change) ? [
    ['اکنون', ['minus', 'لغو: مبلغی برنمی‌گردد؛ حق بازگشت با جابه‌جایی قبلی از بین رفته']], start
  ] : [
    ['اکنون', ['coins', 'لغو: ' + amount + ' به اعتبار شما برمی‌گردد']],
    [cutoff(change, cutoffDays), ['minus', 'از این زمان، لغو بدون بازگشت هزینه است']], start
  ]);
  if (change.ordinaryUsed || sample) {
    const note = get(current, 'detail-note');
    const lock = document.createElement('span');
    lock.className = 'ri ri-lock';
    lock.setAttribute('aria-hidden', 'true');
    note.replaceChildren(lock, ' ' + usedNote);
    note.hidden = false;
  }
}
