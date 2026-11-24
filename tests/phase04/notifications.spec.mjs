import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'customer/notifications/';
async function open(page, path = route) {
  await page.goto(path);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}

test('Reading a notification updates the inbox and dashboard across tabs @smoke', async ({ page, context }) => {
  const home = await context.newPage();
  await open(home, 'customer/');
  const bell = home.locator('.rv-customer-home__bell');
  await expect(bell).toHaveAccessibleName(/۱ خوانده‌نشده/);
  await open(page);
  const mark = page.getByRole('button', { name: 'خواندم', exact: true });
  await mark.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('link', { name: 'سینا به درخواست فیشیال پاسخ داد' })).toBeFocused();
  await expect(bell).toHaveAccessibleName('اعلان‌ها');
  await open(page);
  await expect(page.getByRole('button', { name: 'همه خوانده شد' })).toBeDisabled();
  await open(page, route + '?state=example');
  await expect(mark).toBeVisible();
});

test('Bulk read and older notifications are usable by keyboard @smoke', async ({ page }) => {
  await open(page);
  const all = page.getByRole('button', { name: 'همه خوانده شد' });
  await all.focus();
  await page.keyboard.press('Enter');
  await expect(all).toBeDisabled();
  await expect(page.getByText('همه اعلان‌ها خوانده شد', { exact: true })).toBeVisible();
  const more = page.getByRole('button', { name: 'نمایش اعلان‌های قدیمی‌تر' });
  for (const shown of ['۱۲', '۱۸', '۲۴']) {
    await more.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText(`${shown} از ۲۴ اعلان`, { exact: true })).toBeVisible();
    await expect(page.locator('[data-rv-notification]:focus')).toHaveCount(1);
  }
  await expect(more).toBeHidden();
});

test('Notification sources lead to existing domain screens @smoke', async ({ page }) => {
  for (const [id, query, target] of [
    ['facial-reply', 'request=RQ-2210', '[data-rv="customer-request-detail"]'],
    ['beard-request-closed', 'request=RQ-2171', '[data-rv="customer-request-detail"]'],
    ['haircut-booked', 'appointment=BK-48390', '[data-rv-detail-current]'],
    ['salon-refund', 'appointment=BK-47388', '[data-rv-detail-current]'],
    ['sina-available', 'service=hair&stylist=sina', '[data-rv-booking-kind="fixed"]']
  ]) {
    await open(page);
    const row = page.locator(`[data-rv-notification="${id}"]`);
    await row.click({ position: { x: 5, y: 16 } });
    await expect(page).toHaveURL(new RegExp(query));
    await expect(page.locator(target)).toBeVisible();
  }
});

for (const width of [320, 390, 768, 1023, 1024, 1280]) {
  test(`Notification source states at ${width}px @a11y @visual`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
    const mode = new URL(baseURL).pathname === '/' ? 'root' : 'subpath';
    for (const state of ['example', 'read', 'empty']) {
      await open(page, route + '?state=' + state);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await expect(page.getByRole('heading', { name: 'اعلان‌ها', exact: true })).toBeVisible();
      if (state === 'empty') await expect(page.getByRole('heading', { name: 'اعلانی ندارید' })).toBeVisible();
      else {
        await expect(page.locator('[data-rv-notification]:visible')).toHaveCount(6);
        await expect(page.locator('[data-rv-notification="thursday-hours"] a')).toHaveCount(0);
        await expect(page.getByText(state === 'read' ? 'همه خوانده شده‌اند' : '۱ خوانده‌نشده', { exact: true })).toBeVisible();
      }
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(axe.violations, state).toEqual([]);
      await page.screenshot({ path: `tests/screens/notifications/${mode}/${state}-${width}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}
