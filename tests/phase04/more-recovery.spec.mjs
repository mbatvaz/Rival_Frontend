import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const go = async page => { await page.goto('customer/'); await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true'); };
const more = page => page.locator('#rv-more');
const open = async page => { await page.locator('.rv-role-nav [data-rv-sheet-open="rv-more"]').click(); await expect(more(page)).toBeVisible(); };

test('Customer More closes completely on resize to desktop and restores background and focus @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 667 }); await go(page); await open(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(more(page)).toBeHidden();
  await expect(page.locator('[data-rv-sheet-layer]')).toBeHidden();
  await expect(page.locator('[data-rv-page]')).not.toHaveAttribute('inert');
  await expect(page.locator('#rv-main')).toBeFocused();
  await page.setViewportSize({ width: 390, height: 667 }); await open(page);
  await page.keyboard.press('Escape'); await expect(more(page)).toBeHidden();
});

for (const width of [320, 390, 610]) {
  test(`Customer More pins left and scrolls only its list at ${width}px @visual @a11y`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 480 }); await page.emulateMedia({ reducedMotion: 'reduce' }); await go(page);
    await page.evaluate(() => window.scrollTo(0, 200));
    await open(page);
    await expect(more(page).locator('.rv-sheet__header')).toBeHidden();
    const drawer = await more(page).boundingBox(); expect(drawer.x).toBe(0); expect(drawer.y).toBe(0); expect(drawer.height).toBe(480);
    const list = more(page).locator('.rv-more-list');
    const footerBefore = await more(page).locator('footer').boundingBox();
    const windowBefore = await page.evaluate(() => window.scrollY);
    expect(await list.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
    await list.hover(); await page.mouse.wheel(0, 600);
    await expect.poll(() => list.evaluate(el => el.scrollTop)).toBeGreaterThan(50);
    expect(await page.evaluate(() => window.scrollY)).toBe(windowBefore);
    expect((await more(page).locator('footer').boundingBox()).y).toBe(footerBefore.y);
    expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThanOrEqual(480);
    if (width === 390) expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations).toEqual([]);
    const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
    await fs.mkdir(`tests/screens/phase04-recovery/${mode}`, { recursive: true });
    await page.screenshot({ path: `tests/screens/phase04-recovery/${mode}/MORE-${width}.png`, fullPage: true });
    await page.keyboard.press('Escape'); await expect(more(page)).toBeHidden();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(200, 0);
  });
}

test('Desktop restores plain links/title and positions salon notices below credit in the left column @visual', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go(page);
  const header = page.locator('.rv-workspace__header');
  await expect(header.locator('.rv-customer-identity')).toHaveCount(0);
  await expect(header).toContainText('داشبورد مشتری');
  const nav = page.getByRole('navigation', { name: 'منوی مشتری', exact: true });
  await expect(nav.getByRole('radio')).toHaveCount(0);
  await expect(nav.getByRole('link', { name: 'خانه', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.rv-customer-tools__links')).toBeHidden();
  const credit = await page.locator('.rv-customer-balance').boundingBox();
  const notice = await page.locator('.rv-customer-home__announcements').boundingBox();
  expect(notice.x).toBeCloseTo(credit.x, 0); expect(notice.width).toBeCloseTo(credit.width, 0);
  expect(notice.y).toBeGreaterThanOrEqual(credit.y + credit.height);
});

test('Drawer resize interrupts an opening or closing animation and nested logout without leaving inert state @smoke', async ({ page }) => {
  for (const action of ['opening', 'closing', 'logout']) {
    await page.setViewportSize({ width: 390, height: 667 }); await go(page); await open(page);
    if (action === 'closing') await page.keyboard.press('Escape');
    if (action === 'logout') await more(page).getByRole('button', { name: 'خروج از حساب', exact: true }).click();
    await page.setViewportSize({ width: 1024, height: 900 });
    await expect(page.locator('[data-rv-sheet-layer]')).toBeHidden();
    await expect(page.locator('[data-rv-page]')).not.toHaveAttribute('inert');
    await page.setViewportSize({ width: 390, height: 667 }); await open(page);
    const bounds = await more(page).boundingBox();
    await expect.poll(async () => Math.abs((await more(page).boundingBox()).x)).toBeLessThan(1);
    expect(bounds.width).toBeLessThan(390);
    await page.keyboard.press('Escape'); await expect(more(page)).toBeHidden();
  }
});
