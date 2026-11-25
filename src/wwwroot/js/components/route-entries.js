import { motionBatch, initEntryCleanup, visibleEntries } from './entry-motion.js';
import { expandAuthForm } from '../features/auth-transition.js';
import { initNoticeEntries } from './notice-motion.js';
import { otpEntries, portfolioEntries, rulesEntries } from '../features/public-motion.js';

const listEntries = (root, selector, style) => motionBatch(root, ({ list, items }) => list(items(selector), style));
const actions = (add, items, selector, otherwise = 'left') => {
  for (const el of items(selector)) add(el, getComputedStyle(el).position === 'fixed' ? 'bottom' : otherwise);
};

export function appointmentEntries(root) {
  return motionBatch(root, ({ list, items, add }) => {
    list(items('[data-rv-appointments-panel="upcoming"] [data-rv-record]'));
    let next = 0;
    for (const card of items('[data-rv-appointments-panel="history"] [data-rv-appointments-records]')) {
      next = list(visibleEntries(card, '[data-rv-record]'), 'fade', add(card, 'left', next));
    }
    list(items('[data-rv-list-empty], [data-rv-list-error], [data-rv-list-loading]'));
  });
}

export function requestEntries(root) {
  return motionBatch(root, ({ list, items }) => {
    list(items(':is([data-rv-request-group="pay"], [data-rv-request-group="wait"]) [data-rv-request-record]'));
    list(items('[data-rv-request-group="done"] [data-rv-request-record]'), 'zoom');
    list(items('[data-rv-request-empty], [data-rv-request-no-result]'));
  });
}
function timeEntries(root, reschedule = false) {
  return motionBatch(root, ({ list, items, add }) => {
    list(items(reschedule ? '[data-rv-rsc-times] > label' : '.rv-booking-soon > label'));
    actions(add, items, reschedule ? '.rv-reschedule__footer' : '.rv-booking-action');
  });
}

function appointmentDetail(root) {
  const picker = root.querySelector('[data-rv-rsc-picker]');
  if (!picker.hidden) { timeEntries(picker, true); return; }
  motionBatch(root, ({ items, add, list, step }) => {
    const cards = items('.rv-appointment-hero__panel, .rv-appointment-detail > section:not([data-rv-inactive-banner]), [data-rv-detail-missing], [data-rv-rsc-result] > :not(template)');
    cards.forEach((card, i) => {
      const end = add(card, 'left', i * step);
      if (card.matches('.rv-appointment-hero__panel')) add(card.previousElementSibling, 'image', end);
      if (card.matches('.rv-appointment-detail__policy')) list(visibleEntries(card, '.rv-appointment-detail__timeline > li'), 'fade', end);
    });
  });
}

function homeEntries(root) {
  motionBatch(root, ({ items, add, step }) => {
    const enter = (cards, content) => items(cards).forEach((card, index) => {
      for (const el of visibleEntries(card, content)) add(el, 'left', index * step);
    });
    enter('[data-rv-home-appointments] > article', '.rv-appointment-hero__media > img, .rv-appointment-hero__panel > *');
    enter('[data-rv-home-payment-rail] > article, [data-rv-home-empty]', ':scope > :not(.rv-customer-empty__icon)');
    enter('.rv-customer-balance, .rv-customer-tools__links > a', ':scope > div, :scope > span:nth-child(2)');
    enter('.rv-customer-announcement', ':scope > div');
  });
}
function groupedRows(root, cards, rows) {
  motionBatch(root, ({ items, list }) => {
    const groups = items(cards);
    const end = list(groups);
    for (const group of groups) list(visibleEntries(group, rows), 'fade', end);
  });
}

function requestDetail(root) {
  motionBatch(root, ({ list, add, items }) => {
    const sequence = items('.rv-request-hero, .rv-request-detail__content > :not(.rv-customer-notice), .rv-request-parts > li, .rv-request-schedule__slots > :is(.rv-request-slot, .rv-request-response), [data-rv-request-missing]');
    const action = sequence.find(el => el.hasAttribute('data-rv-request-actions') && getComputedStyle(el).position === 'fixed');
    add(action, 'bottom');
    list(sequence.filter(el => el !== action));
  });
}
function checkoutEntries(root) {
  motionBatch(root, ({ add, list, items, step }) => {
    list(items('[data-rv-hold] > *'));
    const ticketItems = items('.rv-booking-ticket__body > h2, .rv-ticket-stylist > p, .rv-ticket-when, [data-rv-group-items] > li');
    list(ticketItems);
    const avatar = items('[data-rv-ticket-avatar]')[0];
    if (avatar) add(avatar, 'fade', Math.max(0, ticketItems.indexOf(avatar.parentElement.firstElementChild)) * step);
    list(items('.rv-booking-prices .rv-booking-summary-head, .rv-booking-prices dl > div, [data-rv-price-help], [data-rv-checkout-rules]'));
    for (const action of items('.rv-booking-action')) {
      if (getComputedStyle(action).position === 'fixed') list([action], 'bottom');
      list(visibleEntries(action, ':scope > *'), 'fade');
    }
  });
}

export function initRouteEntries(page) {
  initEntryCleanup(page);
  const routes = [
    ['[data-rv="portfolio"]', portfolioEntries],
    ['.rv-rules', rulesEntries],
    ['[data-rv-auth-form]', form => {
      listEntries(form.parentElement, '[data-rv-auth-form]');
      otpEntries(form);
    }],
    ['[data-rv="complete-profile"] [data-rv-profile-form]', expandAuthForm],
    ['[data-rv="customer-home"]', homeEntries],
    ['.rv-appointments', appointmentEntries],
    ['[data-rv="customer-appointment-detail"]', appointmentDetail],
    ['[data-rv="customer-request-list"]', requestEntries],
    ['[data-rv="customer-request-detail"]', requestDetail],
    ['[data-rv="customer-availability-alerts"]', root => groupedRows(root, '.rv-availability-card, [data-rv-availability-history]', '.rv-appointment-history')],
    ['[data-rv="customer-notifications"]', root => groupedRows(root, '.rv-notifications__list', '[data-rv-notification]')],
    ['.rv-profile', root => listEntries(root, '.rv-profile__identity, .rv-profile__list')],
    ['[data-rv-quick-items]', root => listEntries(root, ':scope > a')],
    ['.rv-booking-time:has([data-rv-soon])', timeEntries],
    ['.rv-booking-checkout', checkoutEntries],
    ['.rv-booking-package', root => listEntries(root, ':scope > li', 'rise')],
    ['[data-rv-rec-list]', root => listEntries(root, '.rv-recurring-row')]
  ];
  for (const [selector, enter] of routes) {
    const root = page.querySelector(selector);
    if (root) enter(root);
  }
  initNoticeEntries(page);
}
