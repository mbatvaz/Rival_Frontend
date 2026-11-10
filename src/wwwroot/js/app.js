import { initializeFeatures } from './core/registry.js';

initializeFeatures().catch(error => {
  console.error('Rival feature initialization failed:', error);
});
