import { registerFeature, initializeFeatures } from './core/registry.js';
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
initializeFeatures().then(() => { document.documentElement.dataset.rvReady = 'true'; }).catch(error => {
  console.error('Rival feature initialization failed:', error);
});
