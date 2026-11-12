import { test, expect } from '@playwright/test';

test('Portfolio filtering, empty recovery, error retry and gallery sheet work @smoke', async ({ page }) => {
  await page.goto('portfolio/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-work]:visible')).toHaveCount(7);
  await page.getByRole('button', { name: 'فیشیال', exact: true }).click();
  await page.getByRole('button', { name: 'مهدی', exact: true }).click();
  await expect(page.locator('[data-rv-portfolio-status]')).toContainText('نمونه‌کاری با این فیلترها نیست');
  await page.getByRole('button', { name: 'پاک کردن فیلترها' }).click();
  await expect(page.locator('[data-rv-work]:visible')).toHaveCount(7);
  const opener = page.getByRole('button', { name: 'فید کوتاه کلاسیک', exact: true });
  await opener.click();
  await expect(page.getByRole('dialog', { name: 'فید کوتاه کلاسیک' })).toBeVisible();
  await expect(page.getByRole('dialog').locator('.rv-viewer__rail img')).toHaveCount(3);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  await page.goto('portfolio/?state=error');
  await expect(page.getByRole('button', { name: 'تلاش دوباره' })).toBeVisible();
  await page.getByRole('button', { name: 'تلاش دوباره' }).click();
  await expect(page.locator('[data-rv-work]:visible')).toHaveCount(7);
});

for (const role of ['customer', 'stylist', 'admin']) {
  test('Shared ' + role + ' shell routes, focus trap, stacked cancel and logout @smoke', async ({ page, request, baseURL }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(role + '/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    await expect(page.getByText('این صفحه هنوز پیاده‌سازی نشده است.')).toBeVisible();
    await page.getByRole('button', { name: 'بیشتر', exact: true }).click();
    const more = page.getByRole('dialog', { name: 'بیشتر', exact: true });
    for (const href of await more.locator('a').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))) {
      expect((await request.get(href)).ok(), href).toBe(true);
      expect(href).not.toMatch(/wallet|reports|announcements|my-schedule/);
    }
    const first = more.locator('button').first();
    await first.focus();
    await page.keyboard.press('Shift+Tab');
    await expect(more.getByRole('button', { name: 'خروج از حساب' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(first).toBeFocused();
    await more.getByRole('button', { name: 'خروج از حساب' }).click();
    await page.getByRole('button', { name: 'انصراف' }).click();
    await expect(more).toBeVisible();
    await more.getByRole('button', { name: 'خروج از حساب' }).click();
    await page.getByRole('dialog', { name: 'از حساب خارج می‌شوید؟' }).getByRole('button', { name: 'خروج از حساب' }).click();
    await expect(page).toHaveURL(baseURL);
  });
}

test('Signed-in home points to the existing panel and public rules keep policy copy @smoke', async ({ page }) => {
  await page.goto('?state=signed-in');
  await expect(page.getByRole('link', { name: 'رفتن به پنل' })).toBeVisible();
  expect(await page.locator('[data-rv-book]').first().getAttribute('href')).toContain('/customer/book/');
  await page.goto('booking-rules/');
  await page.getByRole('navigation', { name: 'بخش‌های این صفحه' }).getByRole('link', { name: 'لغو و جابه‌جایی' }).click();
  await expect(page.locator('#cancel')).toContainText('حق بازگشت هزینه این نوبت برای همیشه از بین می‌رود');
  await expect(page.locator('#salon')).toContainText('سهم جابه‌جایی شما مصرف نمی‌شود');
});

test('Home carousel uses the design indicators and supports keyboard selection @smoke', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const dots = page.getByRole('group', { name: 'انتخاب نمونه‌کار' });
  const active = page.locator('[data-rv-carousel-caption]:visible');
  await expect(active).toContainText('فید کوتاه کلاسیک');
  await dots.getByRole('button', { name: 'پاکسازی پوست صورت' }).click();
  await expect(active).toContainText('پاکسازی پوست صورت');
  await page.keyboard.press('ArrowLeft');
  await expect(active).toContainText('اصلاح صورت با تیغ');
  await expect(page.getByRole('button', { name: 'ادامه حرکت', exact: true })).toHaveCount(0);
});
