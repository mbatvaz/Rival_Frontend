import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'customer/appointments/demo/';
const ready = page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');

test('shared cancellation Sheet shows focus on keyboard entry and skips the ring on pointer entry', async ({ page }) => {
  await page.goto(route);
  await ready(page);
  const opener = page.getByRole('button', { name: 'لغو نوبت', exact: true });
  const sheet = page.getByRole('dialog', { name: 'لغو این نوبت؟' });
  const close = sheet.getByRole('button', { name: /بستن/ });
  await opener.click();
  await expect(close).toBeFocused();
  await expect(close).toHaveCSS('outline-style', 'none');
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(close).toBeFocused();
  await expect(close).toHaveCSS('outline-style', 'solid');
});

for (const width of [320, 390, 768, 1023, 1024, 1280]) {
  test(`CUS-04 detail and cancellation preview at ${width}px @visual @a11y`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: width === 1280 ? 'no-preference' : 'reduce' });
    const failures = [];
    page.on('pageerror', error => failures.push(error.message));
    page.on('console', message => { if (message.type() === 'error') failures.push(message.text()); });
    page.on('response', response => { if (!response.ok() && response.status() >= 400) failures.push(response.url()); });
    await page.goto(route);
    await ready(page);
    await expect(page.getByRole('heading', { name: 'جزئیات نوبت' })).toBeVisible();
    await expect(page.getByText('#BK-48213')).toBeVisible();
    await expect(page.getByRole('button', { name: /کد تعویض/ })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'بازگشت به نوبت‌ها' })).toBeVisible();
    await expect(page.locator(width < 1024 ? '.rv-role-nav' : '.rv-booking-sidebar')
      .getByRole('link', { name: 'نوبت‌ها', exact: true })).toHaveAttribute('aria-current', 'page');
    const box = await page.locator('.rv-appointment-hero').boundingBox();
    const policy = await page.locator('.rv-appointment-detail__policy').boundingBox();
    if (width < 1024) expect(policy.y).toBeGreaterThan(box.y + box.height);
    else expect(policy.x + policy.width).toBeLessThan(box.x);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const controls = await page.locator('.rv-appointment-detail a, .rv-appointment-detail button, .rv-appointment-detail__back')
      .evaluateAll(elements => elements.filter(element => element.getClientRects().length).map(element => {
        const { width, height } = element.getBoundingClientRect();
        return Math.min(width, height);
      }));
    expect(controls.every(size => size >= 44)).toBe(true);
    const capture = [390, 768, 1280].includes(width);
    const mode = baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
    const screenshot = state => page.screenshot({ path: `tests/screens/phase04-detail/${mode}/${state}-${width}.png`, fullPage: true });
    const axe = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    if (capture) {
      expect((await axe()).violations).toEqual([]);
      await screenshot('default');
    }
    const opener = page.getByRole('button', { name: 'لغو نوبت', exact: true });
    await opener.focus();
    await page.keyboard.press('Enter');
    const sheet = page.getByRole('dialog', { name: 'لغو این نوبت؟' });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole('button', { name: 'لغو نوبت' })).toBeDisabled();
    if (capture) {
      expect((await axe()).violations).toEqual([]);
      await screenshot('cancel-preview');
    }
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
    expect(failures).toEqual([]);
  });
}

test('CUS-04 resolves links from home and history and guards unknown records @smoke', async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const mode = baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
  const screenshot = state => page.screenshot({ path: `tests/screens/phase04-detail/${mode}/${state}-390.png`, fullPage: true });
  await page.goto('customer/?state=inactive');
  await ready(page);
  await page.getByRole('link', { name: 'جزئیات نوبت', exact: true }).first().click();
  await ready(page);
  await expect(page.getByText(/حساب غیرفعال است؛ لغو/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'لغو نوبت' })).toBeDisabled();
  await expect(page.getByRole('button', { name: /کد تعویض/ })).toHaveCount(0);
  await screenshot('inactive');

  await page.goto('customer/appointments/?tab=history');
  await ready(page);
  await page.locator('[data-rv-record="BK-47920"]').click();
  await ready(page);
  await expect(page.getByText('#BK-47920')).toBeVisible();
  await expect(page.getByText('#BK-48213')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'لغو نوبت' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'ایجاد کد تعویض' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'ثبت کد تعویض' })).toHaveCount(0);
  await screenshot('completed');
  await page.getByRole('link', { name: 'بازگشت به نوبت‌ها' }).click();
  await expect(page).toHaveURL(/tab=history/);

  await page.goto(route + '?appointment=unknown');
  await ready(page);
  await expect(page.getByRole('heading', { name: 'نوبت پیدا نشد' })).toBeVisible();
  await expect(page.getByText('#BK-48213')).toHaveCount(0);
  await screenshot('missing');
  await page.goto(route + '?state=can-gt24');
  await expect(page.getByRole('dialog', { name: 'لغو این نوبت؟' })).toBeVisible();
});
