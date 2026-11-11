import { registerFeature, initializeFeatures } from './core/registry.js';
import { enableDrag } from './components/rail.js';
import { initSheets } from './components/sheet.js';

registerFeature('public-session', () => import('./features/public-session.js'));
registerFeature('portfolio', () => import('./features/portfolio.js'));
registerFeature('shell', () => import('./features/shell.js'));
registerFeature('auth', () => import('./features/auth.js'));
registerFeature('complete-profile', () => import('./features/complete-profile.js'));
registerFeature('home-carousel', () => import('./features/home-carousel.js'));
registerFeature('gallery-rail', () => import('./features/gallery-rail.js'));
registerFeature('booking', () => import('./features/booking/index.js'));
initSheets();
document.querySelectorAll('.rv-chip-rail, .rv-booking-rail, .rv-booking-days, [data-rv-drag-rail]').forEach(enableDrag);
if (document.querySelector('.rv-auth-page')) import('./features/auth-fields.js').then(module => module.initFields());
initializeFeatures().then(() => { document.documentElement.dataset.rvReady = 'true'; }).catch(error => {
  console.error('Rival feature initialization failed:', error);
});
