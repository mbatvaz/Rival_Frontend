import { defineConfig } from '@playwright/test';
import fs from 'node:fs/promises';
const siteConfig = JSON.parse(await fs.readFile(new URL('./src/site-config.json', import.meta.url), 'utf8'));
let basePath = String(siteConfig.basePath || '/').trim();
if (!basePath.startsWith('/')) basePath = '/' + basePath;
basePath = basePath.replace(/\/+$/, '') + '/';
const localBaseURL = `http://127.0.0.1:4173${basePath}`;
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: localBaseURL, trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run preview:server',
    url: `${localBaseURL}_preview/`,
    reuseExistingServer: !process.env.CI,
    timeout: 15000
  }
});
