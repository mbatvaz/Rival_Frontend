import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const go = async (page, route = 'customer/') => {
  await page.goto(route);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
};

for (const width of [1024, 1280, 1440, 1600]) {
  test(`Customer desktop has right navigation, horizontal appointment tickets and bounded support cards at ${width} @visual @a11y`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const failures = [];
    page.on('pageerror', error => failures.push(error.message));
    page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
    const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
    const dir = `tests/screens/phase04-desktop/${mode}`;
    await fs.mkdir(dir, { recursive: true });
    for (const state of ['default', 'empty', 'inactive']) {
      await go(page, 'customer/' + (state === 'default' ? '' : '?state=' + state));
      const nav = page.getByRole('navigation', { name: 'منوی مشتری', exact: true });
      const main = await page.locator('#rv-main').boundingBox();
      const sidebar = await nav.boundingBox();
      expect(sidebar.x).toBeGreaterThanOrEqual(main.x + main.width);
      expect(sidebar.width).toBeLessThanOrEqual(286);
      await expect(page.locator('.rv-role-nav')).toBeHidden();
      await expect(nav.getByRole('link', { name: 'خانه', exact: true })).toHaveAttribute('aria-current', 'page');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (state !== 'empty') {
        const payment = await page.locator('.rv-customer-payment').first().boundingBox();
        const card = await page.locator('.rv-appointment-hero').first().boundingBox();
        const image = await page.locator('.rv-appointment-hero__media').first().boundingBox();
        const panel = await page.locator('.rv-appointment-hero__panel').first().boundingBox();
        expect(payment.width).toBeLessThanOrEqual(main.width - 260);
        expect(image.x).toBeGreaterThanOrEqual(panel.x + panel.width - 1);
        expect(image.width).toBe(144);
        expect(card.height).toBeLessThan(360);
        await expect(page.locator('[data-rv-home-pager]')).toBeHidden();
      } else {
        expect((await page.locator('.rv-customer-empty').boundingBox()).width).toBeLessThanOrEqual(560);
        expect((await page.locator('.rv-customer-home__announcements').boundingBox()).width).toBeLessThanOrEqual(420);
      }
      if (state === 'inactive') {
        await expect(nav.locator('[data-rv-customer-book]')).toHaveAttribute('aria-disabled', 'true');
        await expect(nav.locator('[data-rv-customer-book]')).not.toHaveAttribute('href');
        await expect(nav.getByRole('link', { name: 'رزرو دوره‌ای', exact: true })).toHaveAttribute('aria-disabled', 'true');
      }
      if (width === 1280) {
        expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations).toEqual([]);
      }
      const overflow = await page.locator('.rv-appointment-hero__panel,.rv-customer-payment,.rv-customer-tools__links').evaluateAll(elements => elements.filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.className));
      expect(overflow).toEqual([]);
      await page.screenshot({ path: `${dir}/CUS-01-${state}-${width}.png`, fullPage: true });
    }
    expect(failures).toEqual([]);
  });
}

test('Desktop customer menu reuses booking destinations and restores keyboard focus from logout @smoke', async ({ page, request }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go(page, 'customer/book/');
  const destinations = await page.locator('.rv-booking-sidebar a').evaluateAll(elements => elements.map(el => el.getAttribute('href')));
  await go(page);
  const nav = page.getByRole('navigation', { name: 'منوی مشتری', exact: true });
  expect(await nav.locator('a').evaluateAll(elements => elements.map(el => el.getAttribute('href')))).toEqual(destinations);
  for (const href of destinations) expect((await request.get(href)).ok()).toBe(true);
  const logout = nav.getByRole('button', { name: 'خروج از حساب', exact: true });
  await logout.focus(); await page.keyboard.press('Enter');
  const sheet = page.getByRole('dialog', { name: 'از حساب خارج می‌شوید؟' });
  await expect(sheet).toBeVisible();
  const bounds = await sheet.boundingBox();
  expect(bounds.width).toBeLessThanOrEqual(560);
  expect(bounds.y + bounds.height).toBeCloseTo(900, 0);
  await page.keyboard.press('Escape');
  await expect(logout).toBeFocused();
});

test('Mobile and tablet retain source hero, bottom navigation and hidden desktop menu @visual', async ({ page }) => {
  for (const width of [390, 768, 1023]) {
    await page.setViewportSize({ width, height: 844 });
    await go(page);
    await expect(page.locator('.rv-booking-sidebar')).toBeHidden();
    await expect(page.locator('.rv-workspace__header .rv-customer-identity')).toHaveCount(0);
    await expect(page.locator('.rv-role-nav')).toBeVisible();
    const hero = page.locator('.rv-appointment-hero').first();
    expect((await hero.boundingBox()).width).toBeCloseTo(322, 2);
    expect((await hero.locator('.rv-appointment-hero__media').boundingBox()).height).toBeCloseTo(152, 2);
    expect(await hero.locator('.rv-appointment-hero__panel').evaluate(el => getComputedStyle(el).marginBlockStart)).toBe('-44px');
  }
});
