import js from '@eslint/js';

const browserGlobals = {
  window: 'readonly', document: 'readonly', navigator: 'readonly', location: 'readonly',
  localStorage: 'readonly', sessionStorage: 'readonly', fetch: 'readonly', FormData: 'readonly',
  URL: 'readonly', URLSearchParams: 'readonly', Intl: 'readonly', console: 'readonly',
  setTimeout: 'readonly', clearTimeout: 'readonly', requestAnimationFrame: 'readonly',
  MutationObserver: 'readonly', CustomEvent: 'readonly', Event: 'readonly', HTMLElement: 'readonly',
  getComputedStyle: 'readonly', AbortController: 'readonly', Storage: 'readonly'
};
const nodeGlobals = {
  process: 'readonly', console: 'readonly', URL: 'readonly', Buffer: 'readonly',
  setTimeout: 'readonly', clearTimeout: 'readonly', setInterval: 'readonly', clearInterval: 'readonly'
};

export default [
  { ignores: ['dist/**', 'node_modules/**', 'design-export/**'] },
  js.configs.recommended,
  { files: ['src/wwwroot/js/**/*.js'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: browserGlobals } },
  { files: ['tools/**/*.mjs', 'playwright.config.mjs'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: nodeGlobals } },
  { files: ['tests/**/*.mjs'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...nodeGlobals, ...browserGlobals } } }
];
