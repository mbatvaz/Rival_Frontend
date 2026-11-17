import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const ready = async page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
const go = async (page, route = 'customer/') => { await page.goto(route); await ready(page); };
const capture = async (page, info, name) => {
  const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
  const dir = `tests/screens/phase04-owner/${mode}`;
  await fs.mkdir(dir, { recursive: true });
  await page.screenshot({ path: `${dir}/${name}.png`, fullPage: true });
};

test('Customer menu dimensions match Phase 03 and plain links navigate with keyboard @smoke', async ({ page }) => {
  for (const width of [1280, 1600]) {
    await page.setViewportSize({ width, height: 1000 });
    await go(page, 'customer/book/');
    const original = await page.locator('.rv-booking-sidebar').boundingBox();
    await go(page);
    const actual = await page.locator('.rv-booking-sidebar').boundingBox();
    expect(actual.width).toBeCloseTo(original.width, 0);
    expect(actual.height).toBeCloseTo(original.height, 0);
    await expect(page.getByRole('navigation', { name: 'منوی مشتری', exact: true }).getByRole('link', { name: 'خانه', exact: true })).toHaveAttribute('aria-current', 'page');
  }
  await page.getByRole('navigation', { name: 'منوی مشتری', exact: true }).getByRole('link', { name: 'خانه', exact: true }).focus();
  await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/customer\/requests\/$/);
});

test('Appointment and payment grids share responsive rows; tools stack in owner order @visual', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1280, 1600]) {
    await page.setViewportSize({ width, height: 1000 }); await go(page);
    const appointments = await page.locator('[data-rv-appointment]').all();
    const payments = await page.locator('[data-rv-payment-id]').all();
    expect(payments).toHaveLength(2);
    for (const cards of [appointments, payments]) {
      const first = await cards[0].boundingBox(), second = await cards[1].boundingBox();
      if (width === 1600) expect(first.y).toBeCloseTo(second.y, 0);
      else expect(second.y).toBeGreaterThanOrEqual(first.y + first.height);
    }
    const next = await page.locator('.rv-customer-home__next').boundingBox();
    const payment = await page.locator('.rv-customer-home__payment').boundingBox();
    expect(payment.y).toBeGreaterThanOrEqual(next.y + next.height);
    const credit = await page.locator('.rv-customer-balance').boundingBox();
    const recurring = await page.locator('.rv-customer-tools__links [data-rv-home-write-action]').boundingBox();
    const alert = await page.locator('.rv-customer-tools__links a').last().boundingBox();
    expect(credit.y).toBeLessThan(recurring.y); expect(recurring.y).toBeLessThan(alert.y);
    expect(credit.x).toBeLessThan(next.x);
    await capture(page, info, 'dashboard-' + width);
  }
});

test('Two mobile payment cards scroll and expire independently @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.clock.install(); await go(page);
  const cards = page.locator('[data-rv-payment-id]');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(1).getByRole('heading')).toHaveText('فیشیال');
  await expect(cards.nth(1).locator('[data-rv-home-hold]')).toHaveText('۲:۴۱');
  const rail = page.locator('[data-rv-home-payment-rail]'); await rail.focus(); await page.keyboard.press('End');
  expect(await rail.evaluate(el => el.scrollLeft)).toBeLessThan(-100);
  await page.clock.fastForward(5640000);
  await expect(cards.first().locator('[data-rv-home-pay]')).toHaveText('مشاهده درخواست');
  await expect(cards.nth(1).locator('[data-rv-home-pay]')).toHaveText('پرداخت');
  await expect(cards.nth(1).locator('[data-rv-home-hold]')).toHaveText('۱:۰۷');
});

test('MORE-CUS matches the grouped left drawer and restores focus after nested logout @visual @a11y', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.emulateMedia({ reducedMotion: 'reduce' }); await go(page);
  await expect(page.locator('.rv-workspace__header .rv-customer-identity')).toHaveCount(0);
  await expect(page.locator('.rv-workspace__header bdi')).toHaveCount(0);
  const opener = page.getByRole('button', { name: 'بیشتر', exact: true }); await opener.click();
  const drawer = page.getByRole('dialog', { name: 'بیشتر', exact: true }); await expect(drawer).toBeVisible();
  const box = await drawer.boundingBox(); expect(box.x).toBe(0); expect(box.y).toBe(0); expect(box.width).toBeLessThan(390);
  await expect(drawer.locator('.rv-customer-more__group')).toHaveCount(2);
  await expect(drawer.getByRole('link', { name: 'رزرو نوبت', exact: true })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations).toEqual([]);
  await capture(page, info, 'MORE-CUS-390');
  await drawer.getByRole('button', { name: 'خروج از حساب', exact: true }).click();
  await page.getByRole('button', { name: 'انصراف', exact: true }).click(); await expect(drawer).toBeVisible();
  await page.keyboard.press('Escape'); await expect(drawer).toBeHidden(); await expect(opener).toBeFocused();
  await go(page, 'customer/?state=inactive'); await page.getByRole('button', { name: 'بیشتر', exact: true }).click();
  await expect(page.locator('#rv-more [data-rv-customer-book]')).toHaveAttribute('aria-disabled', 'true');
  await expect(page.locator('#rv-more [data-rv-customer-book]')).not.toHaveAttribute('href');
});

test('Dock selection slides before icon and label, with reduced-motion static fallback @visual', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await go(page);
  const link = page.locator('[data-rv-customer-dock]').getByRole('link', { name: 'درخواست‌ها', exact: true });
  await link.click({ noWaitAfter: true });
  await expect(link).toHaveAttribute('data-rv-nav-active', 'true');
  const timings = await link.evaluate(el => {
    const icon = el.querySelector('.ri').getAnimations()[0];
    const label = el.querySelector('.rv-customer-dock__label').getAnimations()[0];
    return { icon: icon?.effect.getTiming().delay, label: label?.effect.getTiming().delay };
  });
  expect(timings.icon).toBeGreaterThan(0); expect(timings.label).toBeGreaterThan(timings.icon);
  await expect(page).toHaveURL(/customer\/requests\/$/); await ready(page);
  await expect(page.locator('[data-rv-nav-active="true"] .rv-customer-dock__label')).toHaveText('درخواست‌ها');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('[data-rv-customer-dock]').getByRole('link', { name: 'خانه', exact: true }).click();
  await expect(page).toHaveURL(/customer\/$/);
});

test('Mobile data cards enter locally from the left and drawer enters from the left @visual', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await go(page);
  const properties = await page.locator('[data-rv-appointment]').first().evaluate(el => {
    const animation = el.getAnimations()[0]; return animation ? animation.effect.getKeyframes().map(frame => Object.keys(frame)) : [];
  });
  expect(properties.flat()).toContain('transform');
  await page.getByRole('button', { name: 'بیشتر', exact: true }).click();
  await expect(page.locator('#rv-more')).toHaveCSS('animation-name', 'rv-customer-drawer-enter');
  await page.keyboard.press('Escape'); await expect(page.locator('#rv-more')).toBeHidden();
});

test('Rapid dock selection keeps the latest destination; closing More clears selection on booking @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await go(page);
  const nav = page.locator('[data-rv-customer-dock]');
  await nav.getByRole('link', { name: 'درخواست‌ها', exact: true }).click({ noWaitAfter: true });
  await nav.getByRole('link', { name: 'نوبت‌ها', exact: true }).click({ noWaitAfter: true });
  await expect(page).toHaveURL(/customer\/appointments\/$/);
  await go(page, 'customer/book/');
  const more = page.getByRole('button', { name: 'بیشتر', exact: true }); await more.click();
  await page.keyboard.press('Escape'); await expect(page.locator('#rv-more')).toBeHidden();
  await expect(page.locator('[data-rv-nav-active="true"]')).toHaveCount(0);
});

test('Customer route links remain usable without JavaScript @smoke', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 1280, height: 900 } });
  try {
    const page = await context.newPage(); await page.goto('customer/');
    const nav = page.getByRole('navigation', { name: 'منوی مشتری', exact: true });
    await expect(nav.getByRole('link', { name: 'خانه', exact: true })).toBeVisible();
    await nav.getByRole('link', { name: 'درخواست‌ها', exact: true }).click();
    await expect(page).toHaveURL(/customer\/requests\/$/);
  } finally { await context.close(); }
});

test('Customer dock retains navigation without animation and resize-observer APIs @smoke', async ({ page }) => {
  await page.addInitScript(() => { window.Element.prototype.animate = undefined; window.ResizeObserver = undefined; });
  await page.setViewportSize({ width: 390, height: 844 }); await go(page);
  await page.locator('[data-rv-customer-dock]').getByRole('link', { name: 'درخواست‌ها', exact: true }).click();
  await expect(page).toHaveURL(/customer\/requests\/$/); await ready(page);
});
