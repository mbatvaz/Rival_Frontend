import { api } from '../../core/api.js';
import { localUrl } from '../../core/config.js';
import { faDigits, jalali, latinDigits, time24 } from '../../core/format.js';
import { longDay } from '../booking/availability.js';

const dateFormat = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Tehran' });
const dayParts = value => Object.fromEntries(dateFormat.formatToParts(value).map(part => [part.type, part.value]));
const write = (root, selector, value) => root.querySelector(selector)?.replaceChildren(value);

export async function readSubmittedRequests() {
  const { data: records } = await api.read('booking/requests');
  if (!Object.keys(records).length) return [];
  const { data: catalog } = await api.read('booking/catalog');
  return Object.values(records).reverse().flatMap(record => {
    const service = catalog.services.find(item => item.id === record.service && item.kind === record.type);
    if (!service) return [];
    const isPackage = record.type === 'requested';
    const stylist = catalog.stylists.find(item => item.id === record.stylist);
    const when = Number.isFinite(record.createdAt) ? record.createdAt : null;
    const parts = (service.parts ?? []).map(id => catalog.services.find(item => item.id === id));
    const caption = stylist ? 'با ' + stylist.name : faDigits(parts.length) + ' بخش';
    return [{
      ...record, preferredDate: record.date, date: when ? latinDigits(jalali(when)) : '',
      day: when ? dayParts(when).day : '', month: when ? dayParts(when).month : '',
      submitted: when ? dateFormat.format(when) + '، ' + time24(when) : '—',
      deadline: when ? dateFormat.format(when + 7 * 864e5) + '، ' + time24(when) : '',
      status: 'wait', sampleId: isPackage ? 'RQ-2219' : 'RQ-2215',
      name: service.name, image: service.image, person: stylist, parts,
      tracking: '#RQ-' + record.id.slice(0, 8).toUpperCase(),
      identity: caption, subtitle: isPackage ? 'مدیر سالن' : caption
    }];
  });
}

export function draftCard(sample, record) {
  const card = sample.cloneNode(true);
  card.dataset.rvRequestRecord = record.id;
  card.dataset.rvRecord = record.id;
  for (const link of card.querySelectorAll('a')) {
    const url = new URL(link.href);
    url.searchParams.set('request', record.id);
    link.href = url.href;
    link.querySelector('img').src = localUrl(record.image);
    write(link, '[data-rv-request-name]', record.name);
    write(link, '[data-rv-request-list-caption]', link.hasAttribute('data-rv-request-history') ? record.identity : record.subtitle);
    write(link, '[data-rv-request-day]', record.day || '—');
    write(link, '[data-rv-request-month]', record.month);
  }
  return card;
}

export function paintDraftDetail(current, record) {
  current.querySelector('[data-rv-request-id]').dataset.rvRequestId = record.id;
  current.querySelector('[data-rv-request-id]').dataset.rvRequestService = record.service;
  current.querySelector('.rv-appointment-hero__media > img').src = localUrl(record.image);
  write(current, '[data-rv-request-heading]', record.name);
  write(current, '[data-rv-request-identity]', record.identity);
  write(current, '[data-rv-request-reference]', record.tracking);
  write(current, '[data-rv-request-submitted]', record.submitted);
  const newRequest = current.querySelector('[data-rv-request-new]');
  const url = new URL(newRequest.href);
  url.searchParams.set('service', record.service);
  newRequest.href = url.href;
  const parts = current.querySelector('.rv-request-parts');
  if (parts) {
    const sample = parts.firstElementChild;
    parts.replaceChildren(...record.parts.map((part, index) => {
      const item = sample.cloneNode(true);
      item.querySelector('img').src = localUrl(part.image);
      write(item, 'small', 'بخش ' + faDigits(index + 1));
      write(item, 'strong', part.name);
      return item;
    }));
  }
  if (!record.person) return;
  write(current, '[data-rv-request-preferred-date]', /^\d{4}-\d{2}-\d{2}$/.test(record.preferredDate ?? '') ? longDay(record.preferredDate) : '—');
  write(current, '[data-rv-request-preferred-part]', record.part ?? '—');
  const timing = record.deadline ? ' تا ' + record.deadline : '';
  write(current, '[data-rv-request-next-first]', record.person.name + timing + ' زمان و مبلغ را پیشنهاد می‌دهد.');
}
