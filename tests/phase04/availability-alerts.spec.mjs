import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const list = 'customer/availability-alerts/';
const booking = '_preview/context/bk-f01/?state=none';
const ready = async page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
async function open(page, path) {
  await page.goto(path);
  await ready(page);
}

test('Booking registration, panel duplicates and cancellation share the alert record @smoke', async ({ page }) => {
  await open(page, booking);
  const opener = page.locator('[data-rv-sheet-open="rv-booking-alert"]');
  await opener.click();
  await page.getByRole('button', { name: 'ثبت اعلان' }).click();
  await expect(page.locator('[data-rv-alert-done]')).toBeVisible();
  await opener.click();
  await page.getByRole('link', { name: 'مشاهده اعلان‌ها' }).click();
  await ready(page);
  const add = page.getByRole('button', { name: 'افزودن', exact: true });
  const card = page.locator('[data-rv-availability-active] article');
  await expect(card).toContainText('اصلاح سر و صورت');
  await expect(card).toContainText('امیر');
  await add.click();
  const dialog = page.getByRole('dialog');
  await dialog.getByText('اصلاح سر و صورت', { exact: true }).click();
  await dialog.getByText('امیر', { exact: true }).click();
  await expect(dialog.getByRole('button', { name: 'ثبت اعلان' })).toBeDisabled();
  await expect(dialog.getByText('برای همین خدمت و آرایشگر یک اعلان فعال دارید')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(add).toBeFocused();
  const cancel = card.getByRole('button', { name: 'لغو اعلان' });
  await cancel.click();
  await expect(dialog.getByText('پیامکی نمی‌گیرید')).toBeVisible();
  await expect(page.locator('[data-rv-cancel-hero] .rv-availability-card')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(cancel).toBeFocused();
  await cancel.click();
  await dialog.getByRole('button', { name: 'لغو اعلان' }).click();
  await expect(card).toHaveCount(0);
  await expect(page.locator('[data-rv-availability-ended]')).toContainText('لغو شده');
  await open(page, booking);
  await expect(opener).toHaveAttribute('data-rv-alert-active', 'false');
});

test('Panel accepts eligible pairs and moves expired alerts into history @smoke', async ({ page }) => {
  await page.clock.install();
  await open(page, 'customer/');
  await page.locator('main').getByRole('link', { name: /اعلان آزادشدن/ }).click();
  await ready(page);
  await page.getByRole('button', { name: 'افزودن', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('radio', { name: 'پکیج دامادی' })).toHaveCount(0);
  await dialog.getByText('فیشیال', { exact: true }).click();
  await expect(dialog.getByRole('radio', { name: 'امیر' })).toBeDisabled();
  await expect(dialog.getByRole('radio', { name: 'سینا' })).toBeChecked();
  await dialog.getByRole('button', { name: 'ثبت اعلان' }).click();
  await expect(page.locator('[data-rv-availability-active]')).toContainText('فیشیال');
  await open(page, 'customer/');
  await expect(page.locator('[data-rv-home-alert-count]')).toHaveText('۱ فعال');
  await page.clock.fastForward(7 * 86400000);
  await open(page, list);
  await expect(page.locator('[data-rv-availability-active] article')).toHaveCount(0);
  await expect(page.locator('[data-rv-availability-ended]')).toContainText('۶ روز گذشت');
  await page.getByRole('link', { name: /زمان آزاد شد، پیامک رفت/ }).click();
  await expect(page).toHaveURL(/service=hair/);
});

for (const width of [320, 390, 768, 1024, 1280]) {
  const repeatedWidth = ![390, 1280].includes(width);
  test(`Availability alert source states at ${width} @a11y @visual${repeatedWidth ? ' @root-visual' : ''}`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
    const output = 'tests/screens/availability-alerts/' + (new URL(baseURL).pathname === '/' ? 'root' : 'subpath');
    await fs.mkdir(output, { recursive: true });
    for (const state of ['example', 'add', 'duplicate', 'cancel']) {
      await open(page, list + '?state=' + state);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      if (state === 'example') await expect(page.locator('[data-rv-availability-summary]')).toHaveText('۱ فعال، ۳ پایان‌یافته');
      else await expect(page.getByRole('dialog')).toBeVisible();
      if (state === 'duplicate') await expect(page.getByRole('button', { name: 'ثبت اعلان' })).toBeDisabled();
      if (state === 'cancel') await expect(page.locator('[data-rv-cancel-hero]')).toBeVisible();
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(results.violations, state).toEqual([]);
      await page.screenshot({ path: output + '/' + state + '-' + width + '.png', fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}
