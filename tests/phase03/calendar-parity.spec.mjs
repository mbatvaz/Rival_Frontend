import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';

test('Recurring calendar day states share their desktop appearance at every responsive size @visual @a11y', async ({ page }) => {
  test.setTimeout(60000);
  await fs.mkdir('tests/screens/calendar-parity', { recursive: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('_preview/context/bk-rec01/?state=new');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const sheet = page.locator('#rv-rec-sheet');
  await sheet.locator('input[name="rec-service"][value="face-hair"]').check();
  await sheet.locator('input[name="rec-stylist"][value="amir"]').check();
  const date = sheet.locator('input[data-rv-date="2026-10-19"]');
  await date.check();
  const selected = sheet.locator('.rv-calendar-day :checked + span');
  const snapshot = () => sheet.locator('[data-rv-month-grid]').evaluate(el => {
    const properties = ['backgroundColor', 'color', 'boxShadow', 'borderRadius', 'fontWeight', 'outlineStyle', 'transform'];
    const read = selector => {
      const target = el.querySelector(selector);
      return Object.fromEntries(properties.map(name => [name, getComputedStyle(target)[name]]));
    };
    return { selected: read('input:checked + span'), available: read('input:enabled:not(:checked) + span'),
      disabled: read('input:disabled + span') };
  });
  const desktop = await snapshot();
  expect(desktop.selected.backgroundColor).toBe('rgb(255, 255, 255)');
  expect(desktop.selected.boxShadow).not.toBe('none');
  expect(desktop.available.boxShadow).toContain('inset');
  expect(desktop.selected.outlineStyle).toBe('none');
  for (const width of [320, 390, 568, 768, 1023, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await selected.scrollIntoViewIfNeeded();
    expect(await snapshot(), 'calendar states at ' + width).toEqual(desktop);
    await expect(date).toBeChecked();
    await expect(sheet.locator('.rv-calendar-day input:checked')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if ([390, 768, 1280].includes(width)) {
      await sheet.locator('.rv-booking-calendar').screenshot({ path: 'tests/screens/calendar-parity/selected-' + width + '.png' });
      const results = await new AxeBuilder({ page }).include('#rv-rec-sheet .rv-booking-calendar').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
    }
  }
  await page.setViewportSize({ width: 390, height: 900 });
  await date.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(sheet.locator('.rv-calendar-day input:checked')).toHaveCount(1);
  await expect(sheet.locator('.rv-calendar-day input:focus-visible + span')).toHaveCSS('outline-width', '2px');
});
