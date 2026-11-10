import { defineConfig } from '@playwright/test';
import { loadSite } from './tools/lib/site.mjs';

const { basePath } = await loadSite();
const port = process.env.PORT || 4173;
const localBaseURL = 'http://127.0.0.1:' + port + basePath;
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 4,
  reporter: 'list',
  outputDir: basePath === '/' ? 'test-results/root' : 'test-results/subpath',
  use: { baseURL: localBaseURL, trace: 'retain-on-failure' },
  webServer: process.env.RIVAL_TEST_SERVER_MANAGED ? undefined : {
    command: 'node tools/serve-static.mjs',
    url: localBaseURL + '_preview/',
    reuseExistingServer: false,
    timeout: 15000
  }
});
