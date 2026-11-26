import { test, expect } from '@playwright/test';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const row = page => page.locator('[data-rv-review-id="PUB-01"]');
const button = (page, action) => row(page).locator(':scope > .rv-review__approvals > [data-rv-approval="' + action + '"]');
async function ready(page, route = '_preview/') {
  await page.goto(route);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}
async function approve(page) {
  for (const action of ['mobile', 'desktop', 'final']) await button(page, action).click();
  await expect(row(page)).toHaveAttribute('data-status', 'green');
}

test('Manual platform and final approvals are independent from phase acceptance and persist on the alias @smoke', async ({ page }) => {
  await ready(page);
  await expect(page.locator('[data-rv-page-row][data-status="red"]')).toHaveCount(43);
  await expect(page.locator('[data-rv-page-row][data-status="yellow"]')).toHaveCount(25);
  await expect(button(page, 'final')).toBeHidden();
  const missing = page.locator('[data-rv-review-id="STY-01"]');
  await expect(missing.locator(':scope > .rv-review__approvals')).toBeHidden();
  await expect(button(page, 'mobile')).toBeVisible();
  await expect(button(page, 'desktop')).toBeVisible();
  await approve(page);
  await page.reload();
  await expect(row(page)).toHaveAttribute('data-status', 'green');
  await ready(page, 'pages.html');
  await expect(row(page)).toHaveAttribute('data-status', 'green');
  await button(page, 'final').click();
  await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  await expect(button(page, 'mobile')).toBeFocused();
  await expect(button(page, 'mobile')).toBeVisible();
  await expect(button(page, 'desktop')).toBeVisible();
  await expect(button(page, 'mobile')).toHaveAttribute('aria-pressed', 'false');
  await expect(button(page, 'desktop')).toHaveAttribute('aria-pressed', 'false');
  await expect(button(page, 'final')).toBeHidden();
  await button(page, 'mobile').click();
  await button(page, 'desktop').click();
  await expect(button(page, 'mobile')).toBeHidden();
  await expect(button(page, 'desktop')).toBeHidden();
  await expect(button(page, 'final')).toBeVisible();
  await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  await page.reload();
  await expect(button(page, 'mobile')).toBeHidden();
  await expect(button(page, 'desktop')).toBeHidden();
  await expect(button(page, 'final')).toBeVisible();
  await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  await button(page, 'final').click();
  await expect(row(page)).toHaveAttribute('data-status', 'green');
});

test('A changed page revision removes only its final approval and preserves platform reviews @smoke', async ({ page }) => {
  await ready(page);
  await approve(page);
  await page.route('**/_preview/', async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/(data-rv-review-id="PUB-01"[^>]*?data-rv-revision=")[a-f0-9]+/,
      (_, prefix) => prefix + 'e'.repeat(64));
    await route.fulfill({ response, body });
  });
  // Both static outputs must describe the same simulated new build.
  await page.route('**/_preview/revisions.json', async route => {
    const response = await route.fetch();
    const payload = await response.json();
    payload.pages.find(page => page.id === 'PUB-01').revision = 'e'.repeat(64);
    await route.fulfill({ response, json: payload });
  });
  await page.reload();
  await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  await expect(row(page).locator(':scope > [data-rv-review-reason]')).toContainText('نسخه تغییر کرده');
  for (const action of ['mobile', 'desktop']) await expect(button(page, action)).toHaveAttribute('aria-pressed', 'true');
  await expect(button(page, 'final')).toHaveAttribute('aria-pressed', 'false');
  await button(page, 'final').click();
  await expect(row(page)).toHaveAttribute('data-status', 'green');
  await expect(button(page, 'desktop')).toHaveAttribute('aria-pressed', 'true');
});

test('Storage errors never present an unsaved approval as successful @smoke', async ({ page }) => {
  await page.addInitScript(() => { window.Storage.prototype.setItem = () => { throw new Error('Storage blocked'); }; });
  await ready(page);
  await button(page, 'mobile').click();
  await expect(button(page, 'mobile')).toHaveAttribute('aria-pressed', 'false');
  await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  await expect(page.locator('[data-rv-review-message]')).toContainText('تأیید ذخیره نشد');
});

test('An open review tab automatically detects a new static build without reloading @smoke', async ({ page }) => {
  await page.clock.install();
  await ready(page);
  await approve(page);
  const latest = await page.locator('[data-rv-review-id]').evaluateAll(rows => rows.map(row => ({
    id: row.dataset.rvReviewId, revision: row.dataset.rvRevision, implemented: row.dataset.rvImplemented === 'true'
  })));
  latest.find(item => item.id === 'PUB-01').revision = 'c'.repeat(64);
  await page.route('**/_preview/revisions.json', route => route.fulfill({ json: { schemaVersion: 1, pages: latest } }));
  await page.clock.fastForward(15100);
  await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  await expect(button(page, 'final')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-rv-review-message]')).toContainText('نسخهٔ جدید شناسایی شد');
});

test('Two directory tabs synchronize owner actions and filters retain meaningful empty state @smoke', async ({ page, context }) => {
  await ready(page);
  const other = await context.newPage();
  await ready(other, 'pages.html');
  await button(page, 'mobile').click();
  await expect(button(other, 'mobile')).toHaveAttribute('aria-pressed', 'true');
  await button(other, 'desktop').click();
  await expect(button(page, 'desktop')).toHaveAttribute('aria-pressed', 'true');
  await button(page, 'final').click();
  await expect(row(other)).toHaveAttribute('data-status', 'green');
  await page.locator('[data-rv-review-filter]').selectOption('green');
  await expect(page.locator('[data-rv-review-id]:visible')).toHaveCount(1);
  await page.getByRole('searchbox').fill('PUB-۰۱');
  await expect(row(page)).toBeVisible();
  await page.getByRole('searchbox').fill('not-a-page');
  await expect(page.locator('[data-rv-review-empty]')).toBeVisible();
  await other.close();
});

test('Product pages load no review controller or approval controls @smoke', async ({ page, request }) => {
  const assets = [];
  page.on('request', request => assets.push(request.url()));
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  expect(assets.some(url => url.includes('/_preview/review.js'))).toBe(false);
  await expect(page.locator('[data-rv-approval]')).toHaveCount(0);
  const html = await (await request.get(basePath + '_preview/')).text();
  expect(html).not.toContain('src="' + basePath + 'js/app.js"');
});
