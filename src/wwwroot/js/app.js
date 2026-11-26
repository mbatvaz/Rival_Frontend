import { registerFeature, initializeFeatures } from './core/registry.js';
import { enableDrag } from './components/rail.js';
import { initNavigationMotion } from './components/navigation-motion.js';
import { initSheets } from './components/sheet.js';
import { initOverflowText } from './components/overflow-text.js';
import { initRouteEntries } from './components/route-entries.js';
import { initListEntry } from './components/list-entry.js';
import { initCardMedia } from './components/card-media.js';

registerFeature('public-session', () => import('./features/public-session.js'));
registerFeature('portfolio', () => import('./features/portfolio.js'));
registerFeature('shell', () => import('./features/shell.js'));
registerFeature('auth', () => import('./features/auth.js'));
registerFeature('complete-profile', () => import('./features/complete-profile.js'));
registerFeature('home-carousel', () => import('./features/home-carousel.js'));
registerFeature('home-steps', () => import('./features/home-steps.js'));
registerFeature('gallery-rail', () => import('./features/gallery-rail.js'));
registerFeature('booking', () => import('./features/booking/index.js'));
registerFeature('customer-home', () => import('./features/customer/home.js'));
registerFeature('customer-appointments', () => import('./features/customer/appointments.js'));
registerFeature('customer-appointment-detail', () => import('./features/customer/appointment-detail.js'));
registerFeature('customer-request-list', () => import('./features/customer/request-list.js'));
registerFeature('customer-request-detail', () => import('./features/customer/request-detail.js'));
registerFeature('customer-availability-alerts', () => import('./features/customer/availability-alerts.js'));
registerFeature('customer-notifications', () => import('./features/customer/notifications.js'));
registerFeature('customer-profile', () => import('./features/customer/profile.js'));
registerFeature('customer-notification-badge', () => import('./features/customer/notification-badge.js'));
registerFeature('customer-dock', () => import('./components/customer-dock.js'));
registerFeature('stylist-dashboard', () => import('./features/stylist/dashboard.js'));
initSheets();
initNavigationMotion();
initOverflowText();
document.querySelectorAll('.rv-chip-rail, .rv-booking-days, [data-rv-drag-rail]').forEach(enableDrag);
const authFields = document.querySelector('.rv-auth-page') && import('./features/auth-fields.js').then(module => module.initFields());
const root = document.documentElement;
if (root.dataset.rvLoading === 'boot') root.dataset.rvLoading = 'pending';
const page = document.querySelector('[data-rv-page]');
if (page?.querySelector('[data-rv="portfolio"], .rv-rules, [data-rv="auth"], .rv-customer-home__content, .rv-customer-panel__heading, [data-rv-soon], .rv-booking-checkout, .rv-booking-package, [data-rv-rec-list], [data-rv-quick-items]')) {
  page.dataset.rvBottomSheets = '';
}
const primeCardMedia = root.dataset.rvLoading ? initCardMedia() : () => {};
const fontsReady = root.dataset.rvFont === 'pending'
  ? new Promise(resolve => document.addEventListener('rv:font-ready', resolve, { once: true })) : Promise.resolve();
Promise.all([initializeFeatures(), fontsReady, authFields]).then(() => primeCardMedia(page?.querySelector('.rv-booking-checkout'))).then(() => {
  if (root.dataset.rvEntry === 'pending') {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) initListEntry();
    root.dataset.rvEntry = reduced ? 'static' : 'ready';
  }
  if (page) initRouteEntries(page);
  delete root.dataset.rvLoading;
  root.dataset.rvReady = 'true';
}).catch(error => {
  delete root.dataset.rvLoading;
  root.dataset.rvEntry = 'static';
  console.error('Rival feature initialization failed:', error);
});
