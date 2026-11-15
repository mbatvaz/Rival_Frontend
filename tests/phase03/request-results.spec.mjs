import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const route = '_preview/context/bk-req01/';
const ready = async page => {
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-booking-error]')).toBeHidden();
};

for (const width of [390, 768, 1280]) {
  test('Requested receipt has no time; proposed receipt shows preferred day and day-part at ' + width + ' @visual @a11y', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const target = 'tests/screens/request-results/' + (basePath === '/' ? 'root' : 'subpath');
    await fs.mkdir(target, { recursive: true });
    for (const state of ['requested', 'proposed']) {
      await page.goto(route + (state === 'requested' ? '' : '?state=proposed'));
      await ready(page);
      const view = page.locator('[data-rv-result-view="' + state + '"]');
      await expect(view).toBeVisible();
      await expect(page.locator('[data-rv-result-view]:visible')).toHaveCount(1);
      await expect(view.locator('.rv-state-page__receipt')).toHaveCount(state === 'proposed' ? 1 : 0);
      if (state === 'proposed') {
        await expect(view.locator('[data-rv-result-preferred-date]')).toHaveText('۲۵ مهر');
        await expect(view.locator('[data-rv-result-preferred-part]')).toHaveText('صبح');
        await expect(view).not.toContainText('۱۶:۰۰');
      } else await expect(view).not.toContainText(/روز ترجیحی|زمان از روز|صبح|ظهر|۱۶:۰۰/);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations).toEqual([]);
      await page.screenshot({ path: target + '/' + state + '-' + width + '.png', fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test('Requested is the static default and the review directory exposes the separate proposed result @smoke', async ({ page, browser, baseURL }) => {
  const noScript = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const initial = await noScript.newPage();
    await initial.goto(route);
    await expect(initial.locator('[data-rv-result-view="requested"]')).toBeVisible();
    await expect(initial.locator('[data-rv-result-view="proposed"]')).toBeHidden();
  } finally { await noScript.close(); }
  await page.goto('_preview/');
  await ready(page);
  const parent = page.locator('[data-rv-review-id="BK-REQ01"]');
  await expect(parent.locator('[data-rv-variant-query="?state=requested"]')).toHaveCount(0);
  await parent.locator('summary').click();
  await parent.getByRole('link', { name: 'نتیجه پیشنهاد زمان', exact: true }).click();
  await ready(page);
  await expect(page.locator('[data-rv-result-view="proposed"]')).toBeVisible();
});

test('Submitted morning/noon preferences reach the proposed result, while compound requests stay timeless @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const part of ['صبح', 'ظهر']) {
    await page.goto('_preview/context/bk-p01/?demo=artboard&service=facial&stylist=sina');
    await ready(page);
    const date = await page.locator('[data-rv-time-calendar] input:checked').inputValue();
    await page.getByRole('radio', { name: part, exact: true }).check();
    await page.locator('[data-rv-booking-submit]').click();
    await ready(page);
    const proposed = page.locator('[data-rv-result-view="proposed"]');
    await expect(proposed).toBeVisible();
    await expect(proposed.locator('[data-rv-result-preferred-part]')).toHaveText(part);
    const preferred = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      timeZone: 'Asia/Tehran', weekday: 'long', day: 'numeric', month: 'long'
    }).format(new Date(date + 'T12:00:00Z'));
    await expect(proposed.locator('[data-rv-result-preferred-date]')).toHaveText(preferred);
    await page.reload();
    await ready(page);
    await expect(proposed.locator('[data-rv-result-preferred-part]')).toHaveText(part);
  }
  await page.goto('_preview/context/bk-r01/?service=groom');
  await ready(page);
  await page.locator('[data-rv-booking-submit]').click();
  await ready(page);
  await expect(page.locator('[data-rv-result-view="requested"]')).toBeVisible();
  await expect(page.locator('[data-rv-result-view="requested"] .rv-state-page__receipt')).toHaveCount(0);
});
