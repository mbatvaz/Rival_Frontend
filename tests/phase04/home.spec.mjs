import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const ready = async page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
const go = async (page, query = '') => { await page.goto('customer/' + query); await ready(page); };

test('Customer home preserves exact groups, local assets and base-prefixed destinations @smoke', async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
  await go(page);
  await expect(page.locator('[data-rv-home-error]')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('نوبت‌های پیش رو');
  await expect(page.locator('[data-rv-appointment]')).toHaveCount(2);
  await expect(page.locator('[data-rv-home-balance]')).toHaveText('۶۰٬۰۰۰');
  await expect(page.locator('.rv-customer-balance a')).toHaveCount(0);
  await expect(page.locator('[data-rv-home-pay]').first()).toHaveAttribute('href', new URL('customer/requests/demo/', baseURL).pathname + '?request=RQ-2207&state=b');
  for (const img of await page.locator('.rv-customer-home__content img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    await expect(img).toHaveAttribute('width');
    await expect(img).toHaveAttribute('height');
  }
  await expect(page.locator('.rv-role-nav__book')).toBeVisible();
  expect(errors).toEqual([]);
});

test('Customer home empty state keeps balance, notices and booking without appointment/payment cards @smoke', async ({ page }) => {
  await go(page, '?state=empty');
  await expect(page.getByRole('heading', { name: 'هنوز نوبتی ندارید' })).toBeVisible();
  await expect(page.locator('[data-rv-home-appointments]')).toBeHidden();
  await expect(page.locator('[data-rv-home-payment]')).toBeHidden();
  await expect(page.locator('[data-rv-home-personal]')).toBeHidden();
  await expect(page.locator('[data-rv-home-balance]')).toHaveText('۰');
  await expect(page.locator('[data-rv-home-alert-count]')).toHaveText('فعالی ندارید');
  await expect(page.locator('.rv-role-nav__book')).toHaveAttribute('href', /customer\/book\/$/);
});

test('Inactive home blocks every write entry including More while retaining readable records @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await go(page, '?state=inactive');
  await expect(page.getByRole('heading', { name: 'حساب شما غیرفعال است' })).toBeVisible();
  for (const action of await page.locator('[data-rv-home-write-action],.rv-role-nav__book').all()) {
    await expect(action).toHaveAttribute('aria-disabled', 'true');
    await expect(action).not.toHaveAttribute('href');
  }
  await page.locator('[data-rv-home-pay]').first().click({ force: true });
  await expect(page).toHaveURL(/state=inactive/);
  await expect(page.locator('.rv-appointment-hero__actions a').first()).toHaveAttribute('href', /appointments\/demo\//);
  await page.locator('.rv-role-nav [data-rv-sheet-open]').click();
  const more = page.locator('#rv-more');
  await expect(more).toBeVisible();
  await expect(more.getByRole('link', { name: 'رزرو دوره‌ای' })).toHaveAttribute('aria-disabled', 'true');
  await expect(more.getByRole('link', { name: 'پروفایل و روش‌های ورود' })).toHaveAttribute('href', /customer\/profile\/$/);
  await page.keyboard.press('Escape');
  await expect(more).toBeHidden();
  await expect(page.locator('.rv-role-nav [data-rv-sheet-open]')).toBeFocused();
});

test('Dismissed notices persist locally and failed storage leaves the notice available @smoke', async ({ page }) => {
  await go(page);
  const otherTab = await page.context().newPage();
  await go(otherTab);
  await page.getByRole('button', { name: 'بستن این اعلان' }).click();
  await expect(page.locator('[data-rv-home-personal]')).toBeHidden();
  await page.reload(); await ready(page);
  await expect(page.locator('[data-rv-home-personal]')).toBeHidden();
  await expect(page.locator('[data-rv-home-dismissable="salon-hours"]')).toBeVisible();
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error('blocked'); }; });
  await page.getByRole('button', { name: 'بستن این اطلاعیه' }).click();
  await expect(page.locator('[data-rv-home-error]')).toContainText('ذخیره در این مرورگر ممکن نیست.');
  await expect(page.locator('[data-rv-home-dismissable="salon-hours"]')).toBeVisible();
  await otherTab.getByRole('button', { name: 'بستن این اطلاعیه' }).click();
  await expect(otherTab.locator('[data-rv-home-dismissable="salon-hours"]')).toBeHidden();
  await page.reload(); await ready(page);
  await expect(page.locator('[data-rv-home-personal]')).toBeHidden();
  await expect(page.locator('[data-rv-home-dismissable="salon-hours"]')).toBeHidden();
});

test('Countdown uses elapsed time across reload and expired payment leads to request details @smoke', async ({ page }) => {
  await page.clock.install();
  await go(page);
  await expect(page.locator('[data-rv-home-hold]').first()).toHaveText('۱:۳۴');
  await page.clock.fastForward(61000);
  await expect(page.locator('[data-rv-home-hold]').first()).toHaveText('۱:۳۲');
  await page.reload(); await ready(page);
  await expect(page.locator('[data-rv-home-hold]').first()).toHaveText('۱:۳۲');
  await page.clock.fastForward(5640000);
  await expect(page.locator('[data-rv-home-pay]').first()).toHaveText('مشاهده درخواست');
  await expect(page.locator('[data-rv-home-pay]').first()).toHaveAttribute('href', /state=exp/);
  await expect(page.locator('[data-rv-home-hold-progress]').first()).toHaveAttribute('value', '0');
});

test('Home rail supports RTL keyboard selection and shared More focus restoration @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go(page);
  const rail = page.locator('[data-rv-home-appointments]');
  await rail.focus();
  await page.keyboard.press('End');
  await expect(page.locator('[data-rv-home-counter]')).toHaveText('۲ از ۲');
  await page.keyboard.press('Home');
  await expect(page.locator('[data-rv-home-counter]')).toHaveText('۱ از ۲');
  await page.locator('.rv-role-nav [data-rv-sheet-open]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#rv-more')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.rv-role-nav [data-rv-sheet-open]')).toBeFocused();
});

for (const width of [320, 390, 767, 768, 1023, 1024, 1280]) {
  test(`Customer home three states at ${width}px @visual @a11y`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const mode = testInfo.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
    const dir = `tests/screens/phase04/${mode}`;
    await fs.mkdir(dir, { recursive: true });
    for (const state of ['default', 'empty', 'inactive']) {
      await go(page, state === 'default' ? '' : '?state=' + state);
      await expect(page.locator('[data-rv-home-error]')).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if ([390, 768, 1280].includes(width)) {
        const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        expect(scan.violations).toEqual([]);
      }
      const smallTargets = await page.locator('.rv-customer-home a, .rv-customer-home button').evaluateAll(elements => elements.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width && rect.height && (rect.width < 44 || rect.height < 44);
      }).map(el => el.outerHTML));
      expect(smallTargets).toEqual([]);
      const wrappedTools = await page.locator('.rv-customer-tools__links b').evaluateAll(elements => elements.filter(el => el.clientHeight > parseFloat(getComputedStyle(el).lineHeight) + 1).map(el => el.textContent));
      expect(wrappedTools).toEqual([]);
      await page.screenshot({ path: `${dir}/CUS-01-${state}-${width}.png`, fullPage: true });
    }
  });
}
