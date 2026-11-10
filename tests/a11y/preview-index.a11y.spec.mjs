import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [390, 768, 1280]) {
  test('Directory and placeholder have no WCAG A/AA violations at ' + width + ' @a11y', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['_preview/', '']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
    }
  });
}

test('Keyboard can skip to content, open home, and return to the directory @a11y', async ({ page }) => {
  await page.goto('_preview/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'رفتن به محتوای اصلی' })).toBeFocused();
  expect(await page.locator(':focus').evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'مشاهده مسیر صفحه اصلی' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByText('این صفحه هنوز پیاده‌سازی نشده است.')).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'رفتن به محتوای اصلی' })).toBeFocused();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'بازگشت به فهرست صفحات' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'فهرست صفحات و مسیرهای پروژه' })).toBeVisible();
});
