import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const ready = async page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
const go = async (page, query = '') => { await page.goto('customer/appointments/' + query); await ready(page); };
const records = page => page.locator('[data-rv-record]:visible');
const filter = page => page.locator('#rv-appointments-filter');

test('Source appointment records, history and base-prefixed destinations survive reload and Back @smoke', async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
  await go(page);
  await expect(records(page)).toHaveCount(3);
  await expect(records(page).first()).toHaveAttribute('href', new URL('customer/appointments/demo/?appointment=BK-48213', baseURL).pathname + '?appointment=BK-48213');
  await page.getByRole('radio', { name: /گذشته/ }).click();
  await expect(records(page)).toHaveCount(5);
  await expect(page).toHaveURL(/tab=history/);
  await expect(records(page).first()).toContainText('انجام شده');
  await expect(records(page).last()).toContainText('لغو شده توسط سالن');
  await page.reload(); await ready(page);
  await expect(records(page)).toHaveCount(5);
  await page.goBack(); await ready(page);
  await expect(records(page)).toHaveCount(3);
  expect(errors).toEqual([]);
});

test('Actual filtering, removable chips, no-results and reset preserve source counts @smoke', async ({ page }) => {
  await go(page);
  await page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true }).click();
  await filter(page).getByRole('checkbox', { name: 'امیر', exact: true }).check();
  await expect(filter(page).getByRole('button', { name: 'نمایش ۲ نوبت' })).toBeVisible();
  await filter(page).getByRole('button', { name: 'نمایش ۲ نوبت' }).click();
  await expect(records(page)).toHaveCount(2);
  await expect(page).toHaveURL(/stylist=amir/);
  await page.reload(); await ready(page);
  await expect(records(page)).toHaveCount(2);
  await page.getByRole('button', { name: 'حذف فیلتر امیر' }).click();
  await expect(records(page)).toHaveCount(3);
  await go(page, '?state=noresult');
  await expect(records(page)).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'نوبتی با این فیلترها نیست' })).toBeVisible();
  await page.getByRole('button', { name: 'پاک کردن فیلترها' }).click();
  await expect(records(page)).toHaveCount(5);
});

test('Shared date presets and Persian two-sided range use the same filters in both views @smoke', async ({ page }) => {
  await go(page);
  await page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true }).click();
  await filter(page).getByRole('radio', { name: '۷ روز آینده' }).check();
  await expect(filter(page).getByRole('textbox', { name: 'از تاریخ', exact: true })).toHaveValue('۱۴۰۵/۰۷/۲۲');
  await expect(filter(page).getByRole('textbox', { name: 'تا تاریخ', exact: true })).toHaveValue('۱۴۰۵/۰۷/۲۹');
  await filter(page).getByRole('button', { name: 'نمایش ۲ نوبت' }).click();
  await expect(records(page)).toHaveCount(2);
  await page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true }).click();
  await filter(page).getByRole('textbox', { name: 'تا تاریخ', exact: true }).fill('۱۴۰۵/۱۳/۰۱');
  await filter(page).getByRole('button', { name: /نمایش .* نوبت/ }).click();
  await expect(page.locator('#rv-boundary-error')).toBeVisible();
  await expect(filter(page).getByRole('textbox', { name: 'تا تاریخ', exact: true })).toBeFocused();
  await filter(page).getByRole('textbox', { name: 'تا تاریخ', exact: true }).fill('۱۴۰۵/۰۷/۲۴');
  await filter(page).getByRole('button', { name: /نمایش .* نوبت/ }).click();
  await expect(records(page)).toHaveCount(1);
  await page.getByRole('radio', { name: /گذشته/ }).check();
  await page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true }).click();
  await expect(filter(page).getByRole('heading')).toHaveText('فیلتر نوبت‌ها');
  await expect(filter(page).getByRole('textbox', { name: 'از تاریخ', exact: true })).toHaveValue('۱۴۰۵/۰۷/۲۲');
  await filter(page).getByRole('textbox', { name: 'از تاریخ', exact: true }).fill('۱۴۰۵/۰۶/۲۲');
  await filter(page).getByRole('button', { name: 'نمایش ۳ نوبت' }).click();
  await expect(records(page)).toHaveCount(3);
  await page.reload(); await ready(page);
  await expect(records(page)).toHaveCount(3);
});

test('Keyboard tabs, modal focus restoration, empty/loading/error and retry @a11y', async ({ page }) => {
  await go(page);
  await page.getByRole('radio', { name: /پیش رو/ }).focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('radio', { name: /گذشته/ })).toBeFocused();
  await expect(records(page)).toHaveCount(5);
  const opener = page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true });
  await opener.click();
  await expect(filter(page)).toBeVisible();
  await expect(page.locator('[data-rv-page]')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(filter(page)).toBeHidden();
  await expect(opener).toBeFocused();
  await go(page, '?state=empty');
  await expect(page.getByRole('heading', { name: 'هنوز نوبتی ندارید' })).toBeVisible();
  await expect(page.locator('[data-rv-total="upcoming"]')).toHaveText('۰');
  await go(page, '?state=loading');
  await expect(page.locator('[data-rv-list-loading]')).toBeVisible();
  await expect(records(page)).toHaveCount(0);
  await go(page, '?state=error');
  await expect(page.locator('[data-rv-list-error]')).toContainText('دریافت نوبت‌ها ممکن نیست.');
  await page.getByRole('button', { name: 'تلاش دوباره' }).click();
  await expect(records(page)).toHaveCount(3);
  await page.getByRole('radio', { name: /گذشته/ }).click();
  await expect(records(page)).toHaveCount(5);
});

test('Appointment records enter initially and never replay after filtering or popup close', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    window.rvEntryCalls = [];
    const animate = window.Element.prototype.animate;
    window.Element.prototype.animate = function (frames, options) {
      if (options?.id === 'rv-list-entry') window.rvEntryCalls.push(this.dataset.rvRecord);
      return animate.call(this, frames, options);
    };
  });
  await go(page);
  await expect.poll(() => page.evaluate(() => window.rvEntryCalls.length)).toBe(3);
  expect(await page.evaluate(() => window.rvEntryCalls)).toEqual(['BK-48213', 'BK-48390', 'BK-48477']);
  await page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(filter(page)).toBeHidden();
  await page.getByRole('radio', { name: /گذشته/ }).click();
  expect(await page.evaluate(() => window.rvEntryCalls.length)).toBe(3);
});

for (const width of [390, 768, 1280]) test(`Appointment source states, geometry and axe at ${width} @visual @a11y`, async ({ page, baseURL }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const mode = new URL(baseURL).pathname === '/' ? 'root' : 'subpath';
  const dir = `tests/screens/phase04-appointments/${mode}`;
  await fs.mkdir(dir, { recursive: true });
  for (const [state, query] of [['default', ''], ['past', '?tab=history'], ['empty', '?state=empty'], ['noresult', '?state=noresult'], ['filter', '?state=filter'], ['filter-past', '?state=filter-past']]) {
    await go(page, query);
    if (state.startsWith('filter')) await expect(filter(page)).toBeVisible();
    await page.screenshot({ path: `${dir}/${state}-${width}.png`, fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    if (state.startsWith('filter')) {
      const box = await filter(page).boundingBox();
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(901);
      const nested = await filter(page).evaluate(el => [...el.querySelectorAll('*')].filter(node => ['auto', 'scroll'].includes(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight).length);
      expect(nested).toBe(0);
    }
  }
});

test('Appointment layout keeps bounded cards, complete images and sidebar through breakpoints @visual', async ({ page }) => {
  for (const width of [320, 390, 768, 1023, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await go(page);
    const cards = await records(page).all();
    for (const card of cards) {
      const rect = await card.boundingBox();
      expect(rect.height).toBeLessThan(190);
      expect(rect.width).toBeGreaterThan(200);
      for (const img of await card.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width >= 1024) await expect(page.getByRole('navigation', { name: 'منوی مشتری', exact: true })).toBeVisible();
  }
});

test('Mobile filter stays in the viewport with 44px controls and supports missing animation APIs @a11y', async ({ page }) => {
  await page.addInitScript(() => { window.Element.prototype.animate = undefined; window.IntersectionObserver = undefined; });
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const state of ['filter', 'filter-past']) {
      await go(page, '?state=' + state);
      await expect.poll(async () => { const box = await filter(page).boundingBox(); return box.y + box.height; }).toBeLessThanOrEqual(845);
      const small = await filter(page).evaluate(el => [...el.querySelectorAll('button, input[type="text"], label:has(input:is([type="radio"], [type="checkbox"]))')]
        .filter(node => node.getClientRects().length && !node.closest('[hidden]'))
        .filter(node => { const rect = node.getBoundingClientRect(); return rect.width < 43.9 || rect.height < 43.9; })
        .map(node => node.textContent));
      expect(small).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(filter(page)).toBeHidden();
      await expect(records(page)).toHaveCount(state === 'filter' ? 3 : 5);
    }
  }
});
