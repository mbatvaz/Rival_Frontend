import { test, expect } from '@playwright/test';
import { variantReview } from '../../tools/lib/review-entries.mjs';

const parent = page => page.locator('[data-rv-review-id="PUB-02"]');
const state = (page, query = '?state=empty') => parent(page).locator('[data-rv-variant-query="' + query + '"]');
const button = (row, action) => row.locator(':scope > .rv-review__approvals > [data-rv-approval="' + action + '"]');
async function approve(row) {
  for (const action of ['mobile', 'desktop', 'final']) await button(row, action).click();
}
async function ready(page) {
  await page.goto('_preview/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}

test('Each state has independent persisted approvals, while default approvals never cascade @smoke', async ({ page }) => {
  await ready(page);
  await expect(page.locator('[data-rv-page-row]')).toHaveCount(69);
  await expect(page.locator('[data-rv-parent-id]')).toHaveCount(45);
  await expect(state(page)).not.toBeVisible();
  await approve(parent(page));
  await parent(page).locator(':scope > details > summary').click();
  await expect(state(page)).toHaveAttribute('data-status', 'yellow');
  await expect(button(state(page), 'final')).toBeDisabled();
  await approve(state(page));
  await expect(state(page)).toHaveAttribute('data-status', 'green');
  await expect(state(page, '?state=error')).toHaveAttribute('data-status', 'yellow');
  await expect(parent(page).locator('[data-rv-variant-count]')).toContainText('۱ از ۵');
  await button(parent(page), 'final').click();
  await expect(state(page)).toHaveAttribute('data-status', 'green');
  await page.reload();
  await expect(parent(page)).toHaveAttribute('data-status', 'yellow');
  await parent(page).locator(':scope > details > summary').click();
  await expect(state(page)).toHaveAttribute('data-status', 'green');
  await button(state(page), 'final').click();
  await expect(button(state(page), 'final')).toHaveAttribute('aria-pressed', 'false');
  await expect(parent(page).locator('[data-rv-variant-count]')).toContainText('۰ از ۵');
});

test('Old v1 backups preserve default approvals without inventing state approvals @smoke', async ({ page }) => {
  await ready(page);
  const revision = await parent(page).getAttribute('data-rv-revision');
  const legacy = { schemaVersion: 1, project: 'rival-preview-review', records: {
    'PUB-02': { revision, mobile: true, desktop: true, final: true, updatedAt: new Date().toISOString() }
  } };
  await page.locator('[data-rv-import]').setInputFiles({ name: 'old-review.json', mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(legacy)) });
  await expect(parent(page)).toHaveAttribute('data-status', 'green');
  await parent(page).locator(':scope > details > summary').click();
  await expect(button(state(page), 'mobile')).toHaveAttribute('aria-pressed', 'false');
  await approve(state(page));
  const values = await page.evaluate(() => JSON.parse(window.localStorage.getItem(
    'rival:preview-review:v1:' + document.documentElement.dataset.rvBasePath)));
  expect(values.schemaVersion).toBe(2);
  expect(values.records['PUB-02'].final).toBe(true);
  expect(values.records[await state(page).getAttribute('data-rv-review-id')].final).toBe(true);
});

test('State-only revision updates invalidate that state while preserving default approval @smoke', async ({ page }) => {
  await page.clock.install();
  await ready(page);
  await approve(parent(page));
  await parent(page).locator(':scope > details > summary').click();
  await approve(state(page));
  const id = await state(page).getAttribute('data-rv-review-id');
  const pages = await page.locator('[data-rv-review-id]').evaluateAll(rows => rows.map(row => ({
    id: row.dataset.rvReviewId, revision: row.dataset.rvRevision, implemented: row.dataset.rvImplemented === 'true'
  })));
  pages.find(page => page.id === id).revision = 'd'.repeat(64);
  await page.route('**/_preview/revisions.json', route => route.fulfill({ json: { schemaVersion: 1, pages } }));
  await page.clock.fastForward(15100);
  await expect(state(page)).toHaveAttribute('data-status', 'yellow');
  await expect(parent(page)).toHaveAttribute('data-status', 'green');
  await expect(button(state(page), 'final')).toBeEnabled();
});

test('State search reveals its parent and matching collapsed child with independent filters @smoke', async ({ page }) => {
  await ready(page);
  await page.getByRole('searchbox').fill('خالی');
  await expect(parent(page)).toBeVisible();
  await expect(state(page)).toBeVisible();
  await expect(state(page, '?state=error')).not.toBeVisible();
  await approve(state(page));
  await page.locator('[data-rv-review-filter]').selectOption('green');
  await expect(state(page)).toBeVisible();
  await expect(parent(page)).toHaveAttribute('data-status', 'yellow');
});

test('State identities are stable URL keys with separate content revisions', async () => {
  const a = variantReview('PUB-02', 'a'.repeat(64), '?state=empty&mode=one');
  const b = variantReview('PUB-02', 'b'.repeat(64), '?mode=one&state=empty');
  expect(a.id).toBe(b.id);
  expect(a.revision).not.toBe(b.revision);
  expect(variantReview('PUB-02', 'a'.repeat(64), '?state=error').id).not.toBe(a.id);
});
