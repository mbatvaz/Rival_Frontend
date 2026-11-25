import { expect, test } from '@playwright/test';
import { holdAction } from '../helpers/hold-action.mjs';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const list = 'customer/requests/';
const detail = list + 'demo/';
async function open(page, path) {
  await page.goto(path);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}

test('Requests open from the dashboard and filter completed records by status @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, 'customer/');
  await page.locator('[data-rv-home-pay]').first().click();
  await expect(page.getByRole('heading', { name: 'پکیج دامادی' })).toBeVisible();
  await page.getByRole('link', { name: 'بازگشت به درخواست‌ها' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-request-group="pay"] article:visible')).toHaveCount(2);
  await page.locator('label').filter({ has: page.locator('[name="request-tab"][value="done"]') }).click();
  await expect(page.locator('[data-rv-request-group="done"] article:visible')).toHaveCount(5);
  const filter = page.getByRole('button', { name: 'فیلتر درخواست‌ها' });
  await filter.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading')).toBeFocused();
  await dialog.getByText('رد شده', { exact: true }).click();
  await dialog.getByRole('button', { name: 'نمایش ۱ درخواست' }).click();
  await expect(dialog).toBeHidden();
  await expect(filter).toBeFocused();
  await expect(page.locator('[data-rv-request-group="done"] article:visible')).toHaveCount(1);
  await page.getByRole('link', { name: /رنگ ریش/ }).click();
  await expect(page.getByText('امیر در ۷ روز پاسخی نداد')).toBeVisible();
});

test('Cancellation previews impact, then updates detail and list after confirmation @smoke', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page, detail + '?request=RQ-2215');
  const button = page.getByRole('button', { name: 'لغو درخواست' });
  await button.click();
  await expect(page.getByText('اثر مالی ندارد')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  await button.click();
  await holdAction(page.getByRole('dialog').getByRole('button', { name: 'لغو درخواست' }));
  await expect(page.getByText('شما این درخواست را لغو کردید')).toBeVisible();
  await page.reload();
  await expect(page.getByText('شما این درخواست را لغو کردید')).toBeVisible();
  await open(page, list + '?tab=done');
  await expect(page.locator('[data-rv-request-record="RQ-2215"]')).toBeVisible();
});

test('Package payment reuses the payment result and returns to the paid request @smoke', async ({ page }) => {
  await open(page, detail);
  await expect(page.locator('[data-rv-request-schedule] .rv-request-slot')).toHaveCount(3);
  await holdAction(page.getByRole('button', { name: 'پرداخت کل' }));
  await expect(page).toHaveURL(/hold=RQ-2207-customer-request/);
  await page.getByRole('link', { name: 'مشاهده جزئیات درخواست' }).click();
  await expect(page.locator('[data-rv-request-detail-state="booked"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'پرداخت کل' })).toHaveCount(0);
  await expect(page.getByText('۴۳۰٬۰۰۰ تومان', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: /مشاهده نوبت بخش ۱/ }).click();
  await expect(page.getByRole('heading', { name: 'اصلاح سر و صورت' })).toBeVisible();
  await page.getByRole('link', { name: 'بازگشت به جزئیات درخواست' }).click();
  await expect(page.locator('[data-rv-request-detail-state="booked"]')).toBeVisible();
  await open(page, 'customer/');
  await expect(page.locator('[data-rv-payment-id="RQ-2207"]')).toBeHidden();
});

test('Inactive and expired requests retain readable details and block payment @smoke', async ({ page }) => {
  await page.clock.install();
  await open(page, detail + '?request=RQ-2210&state=inactive');
  await expect(page.getByText('حساب شما غیرفعال است', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'پرداخت و قطعی کردن' })).toBeDisabled();
  await open(page, detail);
  await page.clock.fastForward(3 * 60 * 60 * 1000);
  await expect(page.locator('[data-rv-request-detail-state="expired"]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'ثبت درخواست تازه' })).toBeVisible();
  await open(page, detail + '?request=unknown');
  await expect(page.getByText('درخواست پیدا نشد')).toBeVisible();
});

test('Custom Jalali filter keeps its parent Sheet, focus and fixed upper date @smoke @a11y', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, list + '?tab=done&state=filter');
  const parent = page.locator('#rv-request-filter');
  const people = parent.getByRole('group', { name: 'آرایشگرها' });
  await people.evaluate(rail => {
    const extra = rail.lastElementChild.cloneNode(true);
    extra.querySelector('input').value = 'test-extra-stylist';
    rail.append(extra);
  });
  await people.focus();
  await page.keyboard.press('End');
  expect(await people.evaluate(rail => rail.scrollLeft)).toBeLessThan(0);
  await page.keyboard.press('Home');
  expect(await people.evaluate(rail => rail.scrollLeft)).toBe(0);
  await people.locator('label').last().evaluate(label => label.remove());
  await expect(parent.locator('[data-rv-request-to] strong')).toHaveText('امروز');
  await expect(parent.getByRole('button', { name: 'نمایش ۲ درخواست' })).toBeVisible();
  const field = parent.locator('[data-rv-request-from]');
  await field.focus();
  await page.keyboard.press('Enter');
  const picker = page.getByRole('dialog', { name: 'انتخاب تاریخ' });
  await expect(picker).toBeVisible();
  await expect(parent).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(field).toBeFocused();
  await expect(parent).not.toHaveAttribute('inert');
  await field.click();
  await picker.locator('label').filter({ has: page.locator('input[data-rv-date="2026-07-16"]') }).click();
  await expect(picker).toBeHidden();
  await expect(parent.locator('[name="range"][value="custom"]')).toBeChecked();
  await parent.getByRole('button', { name: 'نمایش ۲ درخواست' }).click();
  await expect(page).toHaveURL(/range=custom.+from=/);
  await page.getByRole('button', { name: 'فیلتر درخواست‌ها' }).click();
  await parent.getByRole('button', { name: 'پاک کردن همه' }).click();
  await expect(parent.getByRole('button', { name: 'نمایش ۵ درخواست' })).toBeVisible();
  await parent.getByRole('button', { name: 'نمایش ۵ درخواست' }).click();
  await expect(page.locator('[data-rv-request-group="done"] article:visible')).toHaveCount(5);
});

test('Newly submitted proposed and package requests share the customer list and detail @smoke', async ({ page }) => {
  await open(page, '_preview/context/bk-p01/?demo=artboard&service=facial&stylist=sina');
  await page.getByRole('radio', { name: 'ظهر', exact: true }).check();
  await page.locator('[data-rv-booking-submit]').click();
  await expect(page.getByRole('link', { name: 'مشاهده درخواست' })).toHaveAttribute('href', /requests\/demo\/\?request=/);
  await page.getByRole('link', { name: 'مشاهده درخواست' }).click();
  await expect(page.getByRole('heading', { name: 'فیشیال' })).toBeVisible();
  await expect(page.locator('[data-rv-request-preferred-part]')).toHaveText('ظهر');
  await expect(page.locator('[data-rv-request-identity]')).toHaveText('با سینا');
  await page.getByRole('link', { name: 'بازگشت به درخواست‌ها' }).click();
  await expect(page.locator('[data-rv-request-group="wait"] article:visible')).toHaveCount(3);
  await open(page, '_preview/context/bk-r01/?service=groom');
  await page.locator('[data-rv-booking-submit]').click();
  await expect(page.getByRole('link', { name: 'مشاهده درخواست' })).toHaveAttribute('href', /requests\/demo\/\?request=/);
  await page.getByRole('link', { name: 'مشاهده درخواست' }).click();
  await expect(page.getByRole('heading', { name: 'پکیج دامادی' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'بخش‌های پکیج' })).toBeVisible();
  await expect(page.locator('[data-rv-request-parts] li')).toHaveCount(3);
  await expect(page.locator('[data-rv-request-preferred-date]')).toHaveCount(0);
});

test('Booked package uses the two appointments from the source and unpaid links are unavailable @smoke', async ({ page }) => {
  await open(page, detail + '?request=RQ-2194');
  await expect(page.getByRole('link', { name: /مشاهده نوبت بخش/ })).toHaveCount(2);
  await page.getByRole('link', { name: /مشاهده نوبت بخش ۲/ }).click();
  await expect(page).toHaveURL(/appointment=BK-48372/);
  await expect(page.getByRole('heading', { name: 'رنگ ریش' })).toBeVisible();
  await open(page, 'customer/appointments/demo/?appointment=RQ-2207-1');
  await expect(page.getByRole('heading', { name: 'نوبت پیدا نشد' })).toBeVisible();
});

test('Desktop request Sheets do not expose a scroll gap during entry', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 960 });
  for (const [path, button] of [[list, 'فیلتر درخواست‌ها'], [detail + '?request=RQ-2215', 'لغو درخواست']]) {
    await open(page, path);
    await page.getByRole('button', { name: button, exact: true }).click();
    const dialog = page.getByRole('dialog');
    const geometry = await dialog.evaluate(sheet => {
      for (const animation of sheet.getAnimations()) {
        animation.pause();
        animation.currentTime = 1;
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      const scrim = document.querySelector('[data-rv-sheet-layer] > .rv-sheet-scrim').getBoundingClientRect();
      return { scroll: window.scrollY, bottom: scrim.bottom, height: window.innerHeight };
    });
    expect(geometry.scroll).toBe(0);
    expect(geometry.bottom).toBeGreaterThanOrEqual(geometry.height);
  }
});

for (const width of [320, 390, 768, 1023, 1024, 1280]) {
  const repeatedWidth = ![390, 1280].includes(width);
  test(`Request layouts, assets and accessibility at ${width} @visual @a11y${repeatedWidth ? ' @root-visual' : ''}`, async ({ page, baseURL }) => {
    test.slow();
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
    const directory = 'tests/screens/requests/' + (new URL(baseURL).pathname === '/' ? 'root' : 'subpath');
    await fs.mkdir(directory, { recursive: true });
    const views = {
      pay: list, wait: list + '?tab=wait', done: list + '?tab=done', empty: list + '?state=empty', filter: list + '?tab=done&state=filter',
      package: detail, single: detail + '?request=RQ-2210', review: detail + '?request=RQ-2215', 'package-review': detail + '?request=RQ-2219',
      booked: detail + '?request=RQ-2194', rejected: detail + '?request=RQ-2171', cancelled: detail + '?request=RQ-2160', expired: detail + '?request=RQ-2152',
      inactive: detail + '?request=RQ-2210&state=inactive', 'cancel-review': detail + '?request=RQ-2215&state=can-review', 'cancel-pay': detail + '?request=RQ-2207&state=can-pay'
    };
    for (const [name, path] of Object.entries(views)) {
      await open(page, path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await expect(page.locator('main')).not.toBeEmpty();
      if (name === 'package') {
        const timeline = await page.locator('.rv-request-schedule--package').evaluateAll(rows => {
          const [first, last] = rows;
          const line = getComputedStyle(first, '::before');
          const firstDate = first.querySelector('h3').getBoundingClientRect();
          const lastDate = last.querySelector('h3').getBoundingClientRect();
          return {
            start: first.getBoundingClientRect().top + parseFloat(line.insetBlockStart),
            end: first.getBoundingClientRect().bottom - parseFloat(line.insetBlockEnd),
            firstCenter: firstDate.top + firstDate.height / 2,
            lastCenter: lastDate.top + lastDate.height / 2
          };
        });
        expect(timeline.start).toBeCloseTo(timeline.firstCenter, 0);
        expect(timeline.end).toBeCloseTo(timeline.lastCenter, 0);
      }
      if (name === 'package' && width >= 1024) {
        const workspace = await page.locator('[data-rv="customer-request-detail"]').boundingBox();
        const hero = await page.locator('.rv-request-hero').boundingBox();
        const schedule = await page.locator('[data-rv-request-schedule]').boundingBox();
        const summary = await page.locator('[data-rv-request-summary]').boundingBox();
        const actions = await page.locator('[data-rv-request-actions]').boundingBox();
        expect(hero.width).toBeCloseTo(Math.max(workspace.width / 2, 420), 0);
        expect(hero.x + hero.width / 2).toBeCloseTo(workspace.x + workspace.width / 2, 0);
        expect(schedule.y).toBeGreaterThanOrEqual(hero.y + hero.height);
        expect(summary.y).toBeGreaterThanOrEqual(schedule.y + schedule.height);
        expect(actions.y).toBeGreaterThanOrEqual(summary.y + summary.height);
      }
      if (['filter', 'cancel-review', 'cancel-pay'].includes(name)) await expect(page.getByRole('dialog')).toBeVisible();
      if (name === 'pay') {
        for (const label of await page.locator('.rv-appointments__tabs label').all()) {
          const bounds = await label.boundingBox();
          expect(bounds.width).toBeGreaterThanOrEqual(44);
          expect(bounds.height).toBeGreaterThanOrEqual(44);
        }
      }
      if (width === 390 || width === 1280 || ['pay', 'filter', 'package', 'inactive'].includes(name)) {
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        expect(results.violations, name).toEqual([]);
      }
      await page.screenshot({ path: directory + '/' + name + '-' + width + '.png', fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}
