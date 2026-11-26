/* global document, getComputedStyle, innerWidth */
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { loadSite, root } from './lib/site.mjs';

const spec = JSON.parse(process.argv[2]);
const { basePath } = await loadSite();
const origin = 'http://127.0.0.1:' + process.env.PORT;
const route = new URL(basePath.slice(0, -1) + spec.route, origin);
if (route.origin !== origin) throw new Error('Browser probe only accepts local Rival routes.');
const out = path.join(root, 'test-results', 'probe-' + process.pid);
const browser = await chromium.launch();
try {
  for (const width of spec.widths) {
    const context = await browser.newContext({ viewport: { width, height: 844 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => {
      if (response.status() >= 400 && new URL(response.url()).origin === origin) errors.push('HTTP ' + response.status() + ' ' + response.url());
    });
    try {
      const response = await page.goto(route.href, { timeout: 8000 });
      if (!response?.ok() || new URL(page.url()).origin !== origin) throw new Error('Preview navigation failed.');
      await page.locator('html[data-rv-ready="true"]').waitFor({ state: 'attached', timeout: 5000 });
      const element = page.locator(spec.selector).first();
      await element.waitFor({ state: 'visible', timeout: 5000 });
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      const size = await element.evaluate(node => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return { cssWidth: style.width, cssHeight: style.height, width: Math.round(rect.width), height: Math.round(rect.height) };
      });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      const violations = spec.axe ? (await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations.map(item => item.id) : [];
      if (spec.screenshot) {
        await fs.mkdir(out, { recursive: true });
        await page.screenshot({ path: path.join(out, width + '.png'), fullPage: true });
      }
      console.log('Probe: ' + JSON.stringify({ page: spec.page, width, size, overflow, violations, errors: errors.length,
        ...(spec.screenshot ? { screenshot: path.relative(root, path.join(out, width + '.png')) } : {}) }));
      if (overflow > 0 || violations.length || errors.length) {
        throw new Error('Probe failed at ' + width + 'px: ' + [...errors, ...violations, ...(overflow > 0 ? ['horizontal overflow ' + overflow + 'px'] : [])].join(', '));
      }
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
