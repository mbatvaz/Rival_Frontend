import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadSite, readJson, src, withBase } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const registry = await readJson(path.join(src, 'page-registry.json'));
const pages = registry.pages.filter(page => page.phase === 'Phase 03');
const target = 'tests/screens/phase03/' + (basePath === '/' ? 'root' : 'subpath');

async function inspect(page, name, width, axe = true) {
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-booking-error]')).toBeHidden();
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    small: [...document.querySelectorAll('a,button,input')].filter(el => {
      if (!el.checkVisibility() || el.closest('[hidden],[inert]')) return false;
      const rect = el.getBoundingClientRect();
      return rect.width < 44 || rect.height < 44;
    }).map(el => el.getAttribute('aria-label') ?? el.textContent ?? el.className),
    nested: [...document.querySelectorAll('body *')].filter(el => el.checkVisibility()
      && ['auto', 'scroll'].includes(getComputedStyle(el).overflowY)
      && el.scrollHeight > el.clientHeight + 1).map(el => el.className)
  }));
  expect(result.overflow, name).toBe(false);
  expect(result.small, name).toEqual([]);
  expect(result.nested, name).toEqual([]);
  if (axe) {
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(result.violations, name).toEqual([]);
  }
  await fs.mkdir(target, { recursive: true });
  await page.screenshot({ path: target + '/' + name + '-' + width + '.png', fullPage: true });
}

for (const width of [390, 768, 1280]) {
  for (let start = 0; start < pages.length; start += 5) {
    const group = pages.slice(start, start + 5);
    test('Booking layout and axe ' + group[0].id + ' at ' + width + ' @visual @a11y', async ({ page }) => {
      test.setTimeout(90000);
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      for (const item of group) {
        await page.goto(withBase(basePath, item.previewPath));
        await inspect(page, item.id, width);
      }
    });
  }
}

for (const start of [0, 5, 10]) {
  const group = pages.slice(start, start + 5);
  test('Booking preview states ' + group[0].id + ' at 390 @visual @a11y', async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const item of group) {
      for (const variant of item.variants ?? []) {
        await page.goto(withBase(basePath, item.previewPath) + variant.query);
        await inspect(page, item.id + '-' + new URLSearchParams(variant.query).get('state'), 390);
      }
    }
  });
}
