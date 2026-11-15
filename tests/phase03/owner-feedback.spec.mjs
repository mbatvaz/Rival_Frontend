import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

const ready = async page => {
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-booking-error]')).toBeHidden();
};

test('Calendar selection stays in place, times fade in order and rapid month changes settle correctly @smoke @visual', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('_preview/context/bk-f01/?demo=artboard');
  await ready(page);
  const grid = page.locator('[data-rv-time-calendar] [data-rv-month-grid]');
  await grid.locator('input[value="2026-10-14"]').check();
  expect(await grid.locator('input:checked + span').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  const picks = page.locator('[data-rv-picks] label:not([hidden])');
  const delays = await picks.evaluateAll(items => items.flatMap(item => item.getAnimations().map(animation => animation.effect.getTiming().delay)));
  expect(delays.length).toBeGreaterThan(1);
  expect(delays.at(-1)).toBeGreaterThan(delays[0]);
  const next = page.locator('[data-rv-time-calendar] [data-rv-month-move="1"]');
  const previous = page.locator('[data-rv-time-calendar] [data-rv-month-move="-1"]');
  await next.click();
  await previous.click();
  await expect(page.locator('[data-rv-time-calendar] [data-rv-month-title]')).toContainText('مهر');
  await expect(grid.locator('input[value="2026-10-14"]')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await next.click();
  await expect(grid.locator('input[value="2026-11-01"]')).toHaveCount(1);
  expect(await grid.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
});

for (const width of [390, 1280]) {
  test('Recurring editor reveals completed steps and replaces actions during deletion at ' + width + ' @smoke @visual', async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('_preview/context/bk-rec01/?state=new');
    await ready(page);
    const sheet = page.locator('#rv-rec-sheet');
    await expect(sheet.locator('[data-rv-rec-step="1"]')).toBeVisible();
    for (const step of [2, 3, 4, 5]) await expect(sheet.locator('[data-rv-rec-step="' + step + '"]')).toBeHidden();
    await sheet.locator('input[name="rec-service"][value="face-hair"]').check();
    await expect(sheet.locator('[data-rv-rec-step="2"]')).toBeVisible();
    await expect(sheet.locator('[data-rv-rec-step="3"]')).toBeHidden();
    await sheet.locator('input[name="rec-stylist"][value="amir"]').check();
    await expect(sheet.locator('[data-rv-rec-step="3"]')).toBeVisible();
    await sheet.locator('[data-rv-month-grid] input:enabled').first().check();
    await sheet.locator('input[name="rec-time"]:enabled').first().check();
    await expect(sheet.locator('[data-rv-rec-step="4"]')).toBeVisible();
    await sheet.locator('input[name="rec-repeat"][value="21"]').check();
    await expect(sheet.locator('[data-rv-rec-step="5"]')).toBeVisible();
    if (width === 390) {
      expect(await sheet.locator('header').evaluate(el => getComputedStyle(el).position)).toBe('static');
      expect(await sheet.locator('.rv-recurring-editor__handle').evaluate(el => getComputedStyle(el).position)).toBe('sticky');
    }
    await page.keyboard.press('Escape');
    await page.locator('[data-rv-rec-edit]').first().click();
    await sheet.locator('[data-rv-rec-delete]').click();
    await expect(sheet.locator('[data-rv-rec-actions]')).toBeHidden();
    await expect(sheet.locator('[data-rv-rec-delete-note]')).toBeVisible();
    await sheet.locator('[data-rv-rec-cancel-remove]').click();
    await expect(sheet.locator('[data-rv-rec-actions]')).toBeVisible();
    await expect(sheet.locator('[data-rv-rec-delete]')).toBeFocused();
  });
}

test('Owner layouts preserve compact cards and clean copy across responsive boundaries @visual', async ({ page }) => {
  test.setTimeout(90000);
  await fs.mkdir('tests/screens/owner-feedback', { recursive: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 768, 1023, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of ['bk-f01/?demo=artboard', 'bk-f02/?state=gateway', 'bk-p01/', 'bk-r01/', 'bk-rec01/?state=invalid']) {
      await page.goto('_preview/context/' + route);
      await ready(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), route + ' at ' + width).toBe(true);
      await expect(page.locator('body')).not.toContainText(/آزمایشی|پیش‌نمایش/);
      if (route.startsWith('bk-f01')) {
        await page.locator('.rv-booking-quick-time > span > span:last-child').first().evaluate(el => { el.textContent += ' با توضیح طولانی‌تر'; });
        const heights = await page.locator('.rv-booking-quick-time').evaluateAll(items => items.map(item => item.getBoundingClientRect().height));
        expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(1);
      }
      if ([390, 768, 1280].includes(width)) await page.screenshot({ path: 'tests/screens/owner-feedback/' + route.split('/')[0] + '-' + width + '.png', fullPage: true });
    }
  }
  expect(errors).toEqual([]);
});
