import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
for (const width of [320, 390, 767, 768, 1280]) {
  test('Choice navigation keeps its glass card centered at ' + width + ' @visual @a11y', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const id of ['bk-01', 'bk-02']) {
      await page.goto('_preview/context/' + id + '/');
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      const nav = page.locator('.rv-role-nav');
      if (width < 768) {
        await expect(nav).toBeVisible();
        await expect(nav.getByRole('link', { name: 'رزرو نوبت', exact: true })).toHaveCount(0);
        for (const name of ['خانه', 'درخواست‌ها', 'نوبت‌ها']) await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
        const box = await nav.boundingBox();
        expect(await nav.evaluate(element => getComputedStyle(element).animationName)).toBe('none');
        expect(Math.abs(box.x + box.width / 2 - width / 2)).toBeLessThan(1);
        expect(Math.abs(box.width - Math.min(560, width - 32) * .79)).toBeLessThan(1);
        expect(box.height).toBe(60);
        for (const item of await nav.locator('a:visible, button:visible').all()) {
          const bounds = await item.boundingBox(); expect(bounds.width).toBeGreaterThanOrEqual(44); expect(bounds.height).toBeGreaterThanOrEqual(44);
        }
        await nav.getByRole('button', { name: 'بیشتر', exact: true }).focus();
        await page.keyboard.press('Enter');
        await expect(page.getByRole('dialog')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(nav.getByRole('button', { name: 'بیشتر', exact: true })).toBeFocused();
        const audit = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
        const result = await audit().analyze();
        if (width === 320) {
          // Compare the whole page to its unchanged CSS baseline; audit the changed nav strictly.
          const override = disabled => page.evaluate(value => {
            const sheet = [...document.styleSheets].find(item => item.href?.endsWith('/css/app.css'));
            const rule = [...sheet.cssRules].find(item => item.href?.endsWith('booking-choice-navigation.css'));
            rule.styleSheet.disabled = value;
          }, disabled);
          const issues = violations => violations.map(item => item.id + ':' + JSON.stringify(item.nodes.map(node => node.target))).sort();
          await override(true);
          expect(issues(result.violations)).toEqual(issues((await audit().analyze()).violations));
          await override(false);
          expect((await audit().include('.rv-role-nav').analyze()).violations).toEqual([]);
        } else expect(result.violations).toEqual([]);
        await page.mouse.click(1, 1);
      } else if (width < 1024) {
        await expect(nav.getByRole('link', { name: 'رزرو نوبت', exact: true })).toBeVisible();
      } else {
        await expect(page.getByRole('navigation', { name: 'منوی مشتری', exact: true }).getByRole('link', { name: 'رزرو نوبت', exact: true })).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const dir = 'tests/screens/choice-navigation/' + (basePath === '/' ? 'root' : 'subpath');
      await fs.mkdir(dir, { recursive: true });
      await page.screenshot({ path: dir + '/' + id + '-' + width + '.png', fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test('Other customer routes retain their previous navigation visibility @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('customer/book/');
  await expect(page.getByRole('link', { name: 'رزرو نوبت', exact: true })).toBeVisible();
  for (const id of ['bk-f01', 'bk-p01', 'bk-r01']) {
    await page.goto('_preview/context/' + id + '/');
    await expect(page.locator('.rv-role-nav')).toBeHidden();
  }
});
