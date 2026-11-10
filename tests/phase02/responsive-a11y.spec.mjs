import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const mode = basePath === '/' ? 'root' : 'subpath';
const pages = [
  ['PUB-01', ''], ['PUB-02', 'portfolio/'], ['PUB-03', 'booking-rules/'],
  ['AUTH-01', 'login/'], ['AUTH-02', '_preview/context/auth-02/?state=default'],
  ['SYS-ACC-01', 'account-unavailable/'], ['SHELL-CUS', 'customer/'],
  ['SHELL-STY', 'stylist/'], ['SHELL-ADM', 'admin/']
];

async function inspect(page, name, width, axe = true) {
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    clippedChips: [...document.querySelectorAll('.rv-chip')].filter(el => el.checkVisibility() && el.scrollWidth > el.clientWidth + 1).map(el => el.textContent),
    smallTargets: [...document.querySelectorAll('a,button,input')].filter(el => {
      if (!el.checkVisibility() || el.closest('[hidden]')) return false;
      const rect = el.getBoundingClientRect();
      return rect.width < 44 || rect.height < 44;
    }).map(el => el.textContent || el.getAttribute('aria-label') || el.id),
    nestedScroll: [...document.querySelectorAll('body *')].filter(el => el.checkVisibility()
      && ['auto', 'scroll'].includes(getComputedStyle(el).overflowY)
      && el.scrollHeight > el.clientHeight + 1).map(el => el.className)
  }));
  expect(result.overflow, name).toBe(false);
  expect(result.clippedChips, name).toEqual([]);
  expect(result.smallTargets, name).toEqual([]);
  expect(result.nestedScroll, name).toEqual([]);
  if (axe) {
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations, name).toEqual([]);
  }
  const directory = 'tests/screens/phase02/' + mode;
  await fs.mkdir(directory, { recursive: true });
  await page.screenshot({ path: directory + '/' + name + '-' + width + '.png', fullPage: true });
}

for (const width of [390, 768, 1280]) {
  for (const group of [pages.slice(0, 3), pages.slice(3, 6), pages.slice(6)]) {
    test('Product layouts and axe ' + group[0][0] + ' group at ' + width + ' @visual @a11y', async ({ page }) => {
      test.setTimeout(60000);
      await page.setViewportSize({ width, height: 900 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
      for (const [id, route] of group) {
        await page.goto(route);
        await inspect(page, id, width);
      }
      expect(errors).toEqual([]);
    });
  }
}

test('Mobile auth and portfolio states plus long More sheet remain accessible @visual @a11y', async ({ page }) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const state of ['otp', 'wrong', 'expired', 'locked', 'password', 'passkey', 'error', 'loading']) {
    await page.goto('login/?state=' + state);
    await inspect(page, 'AUTH-01-' + state, 390);
  }
  for (const state of ['empty', 'loading', 'error', 'viewer']) {
    await page.goto('portfolio/?state=' + state);
    await inspect(page, 'PUB-02-' + state, 390);
  }
  for (const [name, route] of [
    ['PUB-01-signed-in', '?state=signed-in'], ['PUB-02-filter', 'portfolio/?state=filter'],
    ['AUTH-02-field-error', '_preview/context/auth-02/?state=field-error']
  ]) { await page.goto(route); await inspect(page, name, 390); }
  await page.goto('admin/');
  await page.getByRole('button', { name: 'بیشتر', exact: true }).click();
  await inspect(page, 'MORE-ADM', 390);
});

test('All Phase 02 layouts remain usable at 320px @visual', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const [id, route] of pages) { await page.goto(route); await inspect(page, id, 320, false); }
});

test('Desktop confirmation is a centered bottom sheet with page scroll for long menus @visual @a11y', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('admin/');
  await page.getByRole('button', { name: 'بیشتر', exact: true }).click();
  await inspect(page, 'MORE-ADM', 1280);
  await page.getByRole('dialog').getByRole('button', { name: 'خروج از حساب' }).click();
  const rect = await page.getByRole('dialog').boundingBox();
  expect(rect.width).toBeLessThanOrEqual(560);
  expect(Math.abs(rect.x - (1280 - rect.width) / 2)).toBeLessThan(1);
  expect(Math.abs(rect.y + rect.height - 900)).toBeLessThan(1);
  await inspect(page, 'LOGOUT', 1280);
});
