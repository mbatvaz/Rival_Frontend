import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const target = 'tests/screens/refresh-01-02/' + (basePath === '/' ? 'root' : 'subpath');

test('Refreshed public interactions fit small, intermediate and desktop-boundary widths @visual @a11y', async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors = [];
  const results = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
  await fs.mkdir(target, { recursive: true });
  for (const width of [375, 767, 769, 1023, 1024, 1025, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [id, route] of [['PUB-01', ''], ['PUB-02', 'portfolio/'], ['AUTH-01', 'login/']]) {
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        small: [...document.querySelectorAll('a,button,input')].filter(element => {
          if (!element.checkVisibility() || element.closest('[hidden],[inert]')) return false;
          const rect = element.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        }).map(element => element.getAttribute('aria-label') || element.textContent)
      }));
      results.push({ id, width, ...result });
      expect(result.overflow, id + ' at ' + width).toBe(false);
      expect(result.small, id + ' at ' + width).toEqual([]);
      await page.screenshot({ path: target + '/' + id + '-' + width + '.png', fullPage: true });
    }
  }
  await fs.writeFile(target + '/boundary-results.json', JSON.stringify({ results, errors }, null, 2));
  expect(errors).toEqual([]);
});
