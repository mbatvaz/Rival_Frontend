import { test, expect } from '@playwright/test';
test('Rival central page directory loads @smoke', async ({ page }) => {
  await page.goto('_preview/');
  await expect(page.getByRole('heading', { name: 'فهرست صفحات و مسیرهای پروژه' })).toBeVisible();
  await expect(page.locator('a[href="/"]')).toBeVisible();
});
test('All directory links resolve to a static page @smoke', async ({ page, request }) => {
  await page.goto('_preview/');
  const hrefs = await page.locator('a.item').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')).filter(Boolean));
  for (const href of [...new Set(hrefs)]) {
    const response = await request.get(href);
    expect(response.ok(), `Expected ${href} to resolve`).toBeTruthy();
  }
});
test('Public home static route is reachable @smoke @visual', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page).toHaveTitle(/Rival/);
});
