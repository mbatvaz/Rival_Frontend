import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const directory = 'tests/screens/phase02-review02/' + (basePath === '/' ? 'root' : 'subpath');
async function ready(page) {
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(document.getAnimations().filter(a => a.effect.getComputedTiming().iterations !== Infinity).map(a => a.finished));
  });
}
async function capture(page, name) {
  await fs.mkdir(directory, { recursive: true });
  await page.screenshot({ path: directory + '/' + name + '.png', fullPage: true });
}

test('Owner desktop composition fits the hero, aligns navigation and contains the contact card @visual', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 940 });
  await page.goto('');
  await ready(page);
  const result = await page.evaluate(() => {
    const box = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
    const hero = box('.rv-home-hero');
    const nav = [...document.querySelectorAll('.rv-public-header__nav a')].map(el => el.getBoundingClientRect());
    return {
      hero, photo: box('.rv-home-hero__photo'), title: box('.rv-home-hero h1'),
      content: box('.rv-public-content'), about: box('.rv-home-about'), carousel: box('.rv-home-carousel'),
      hall: box('.rv-hall'), map: box('.rv-visit'), info: box('.rv-visit-card'),
      cta: box('.rv-home-visit .rv-booking-cta'),
      gaps: nav.slice(0, -1).map((el, i) => el.left - nav[i + 1].right),
      underline: [...document.querySelectorAll('a')].some(el => getComputedStyle(el).textDecorationLine.includes('underline')),
      scrollbar: getComputedStyle(document.documentElement).scrollbarWidth
    };
  });
  expect(result.hero.x).toBeCloseTo((1920 - 1612.8) / 2, 1);
  expect(result.hero.width).toBeCloseTo(1152 * 1.4, 1);
  expect(result.photo.width).toBeCloseTo(result.hero.width);
  expect(result.photo.height).toBeCloseTo(result.hero.height);
  expect(result.title.y).toBeGreaterThan(result.hero.y);
  expect(result.title.bottom).toBeLessThan(result.hero.bottom);
  expect(result.about.x).toBeGreaterThan(result.carousel.x);
  expect(result.hall.x).toBeGreaterThan(result.map.x);
  expect(result.info.height).toBeLessThan(result.map.height);
  expect(result.cta.y).toBeGreaterThan(result.map.bottom);
  expect(result.cta.width).toBeCloseTo(result.map.width);
  expect(result.gaps[0]).toBeCloseTo(result.gaps[1]);
  expect(result.underline).toBe(false);
  expect(result.scrollbar).toBe('none');
  await capture(page, 'PUB-01-1920');
});

for (const width of [417, 471]) {
  test('Owner mobile review width ' + width + ' preserves content order and horizontal bounds @visual', async ({ page }) => {
    await page.setViewportSize({ width, height: 816 });
    await page.goto('');
    await ready(page);
    const about = await page.locator('.rv-home-about').boundingBox();
    const carousel = await page.locator('.rv-home-carousel').boundingBox();
    expect(carousel.y).toBeGreaterThan(about.y + about.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await capture(page, 'PUB-01-' + width);
  });
}

test('Gallery overlay keeps the page visible, blocks background interaction and restores scroll and focus @visual', async ({ page }) => {
  await page.goto('portfolio/');
  await ready(page);
  const opener = page.getByRole('button', { name: 'فید کم با بافت بالا', exact: true });
  await opener.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => window.scrollY);
  await opener.click();
  const background = page.locator('[data-rv-page]');
  await expect(background).toBeVisible();
  await expect(background).toHaveAttribute('inert', '');
  await expect(background).toHaveAttribute('aria-hidden', 'true');
  await expect(page.getByRole('dialog', { name: 'فید کم با بافت بالا' })).toBeVisible();
  await ready(page);
  await capture(page, 'PUB-02-overlay-background');
  await page.keyboard.press('Escape');
  await expect(background).not.toHaveAttribute('inert', '');
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(before);
});

test('Phone limits and five visual OTP cells preserve native entry and the invalid appearance @visual', async ({ page }) => {
  await page.goto('login/');
  await ready(page);
  await page.getByLabel('شماره موبایل', { exact: true }).fill('09141452321999');
  await expect(page.locator('[data-rv-phone]')).toHaveValue('۰۹۱۴۱۴۵۲۳۲۱');
  await page.goto('login/?state=otp');
  await ready(page);
  const phone = await page.locator('[data-rv-phone]').inputValue();
  await page.locator('[data-rv-phone]').evaluate(el => {
    const data = new window.DataTransfer();
    data.setData('text', '09141452321');
    el.dispatchEvent(new window.ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
  });
  await expect(page.locator('[data-rv-phone]')).toHaveValue(phone);
  await page.getByLabel('کد پیامک‌شده').fill('۱۲۳۴۶');
  await expect(page.locator('[data-rv-otp-cell]')).toHaveText(['۱', '۲', '۳', '۴', '۶']);
  const cell = await page.locator('[data-rv-otp-cell]').nth(1).boundingBox();
  await page.mouse.click(cell.x + cell.width / 2, cell.y + cell.height / 2);
  await page.keyboard.type('9');
  await expect(page.locator('[data-rv-otp-cell]')).toHaveText(['۱', '۹', '۳', '۴', '۶']);
  await page.getByLabel('کد پیامک‌شده').fill('00000');
  await expect(page.locator('[data-rv-code]')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('[data-rv-otp-cell]').first()).toHaveCSS('border-top-color', 'rgb(210, 52, 63)');
  await capture(page, 'AUTH-01-five-cells-error');
});
