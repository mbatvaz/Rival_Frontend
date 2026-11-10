import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';
const { basePath } = await loadSite();
const mode = basePath === '/' ? 'root' : 'subpath';

for (const width of [320, 390, 768, 1280]) {
  test('Foundation at ' + width + 'px: RTL, touch targets, fonts and overflow @visual', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['_preview/', '_preview/context/kit-01/']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
        font: getComputedStyle(document.body).fontFamily,
        fontLoaded: document.fonts.check('14px "Yekan Bakh"'),
        undersized: [...document.querySelectorAll('a')].filter(a => {
          const r = a.getBoundingClientRect();
          return r.width < 44 || r.height < 44;
        }).map(a => a.textContent),
        nestedScroll: [...document.querySelectorAll('body *')].filter(el =>
          ['scroll', 'auto'].includes(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight
        ).length
      }));
      expect(result.content).toBeLessThanOrEqual(result.viewport);
      expect(result.undersized).toEqual([]);
      expect(result.nestedScroll).toBe(0);
      expect(result.font).toContain('Yekan Bakh');
      expect(result.fontLoaded).toBe(true);
      const directory = 'tests/screens/foundation/' + mode;
      await fs.mkdir(directory, { recursive: true });
      await page.screenshot({ path: directory + '/' + (route === '_preview/' ? 'directory' : 'placeholder') + '-' + width + '.png', fullPage: true });
    }
  });
}
