import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

const row = page => page.locator('[data-rv-review-id="PUB-01"]');

test('Review backups round-trip approvals and malformed imports preserve current data @smoke', async ({ page }) => {
  await page.goto('_preview/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  for (const action of ['mobile', 'desktop', 'final']) await row(page).locator(':scope > .rv-review__approvals > [data-rv-approval="' + action + '"]').click();
  const downloadReady = page.waitForEvent('download');
  await page.getByRole('button', { name: 'دریافت پشتیبان' }).click();
  const download = await downloadReady;
  const payload = await fs.readFile(await download.path(), 'utf8');
  expect(JSON.parse(payload).records['PUB-01'].final).toBe(true);
  await row(page).locator(':scope > .rv-review__approvals > [data-rv-approval="final"]').click();
  await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  const upload = text => page.locator('[data-rv-import]').setInputFiles({
    name: 'approvals.json', mimeType: 'application/json', buffer: Buffer.from(text)
  });
  await upload(payload);
  await expect(row(page)).toHaveAttribute('data-status', 'green');
  const invalid = JSON.parse(payload);
  invalid.records['PUB-01'].mobile = false;
  await upload(JSON.stringify(invalid));
  await expect(page.locator('[data-rv-review-message]')).toHaveAttribute('data-error', 'true');
  await expect(row(page)).toHaveAttribute('data-status', 'green');
  const stale = JSON.parse(payload);
  stale.records['PUB-01'].revision = 'a'.repeat(64);
  await upload(JSON.stringify(stale));
  await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  await expect(row(page).locator(':scope > [data-rv-review-reason]')).toContainText('تغییر کرده');
});

test('Unavailable storage is explicit while directory navigation remains usable @a11y @smoke', async ({ page }) => {
  await page.addInitScript(() => { window.Storage.prototype.getItem = () => { throw new Error('Read blocked'); }; });
  await page.goto('_preview/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-review-message]')).toHaveAttribute('data-error', 'true');
  await expect(row(page).locator(':scope > .rv-review__approvals > [data-rv-approval="mobile"]')).toBeDisabled();
  await row(page).getByRole('link').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('آراسته دیده شوید');
});
