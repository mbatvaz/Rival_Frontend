import { test, expect } from '@playwright/test';
import { readJson, src, withBase, loadSite } from '../tools/lib/site.mjs';
import path from 'node:path';
const { basePath } = await loadSite();
const registry = await readJson(path.join(src, 'page-registry.json'));

test('Directory exposes every canonical ID and unimplemented routes remain labelled @smoke', async ({ page, request }) => {
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
  await page.goto('_preview/');
  await expect(page.locator('[data-rv-page-id]')).toHaveCount(registry.pages.length);
  for (const entry of registry.pages) {
    const href = withBase(basePath, entry.previewPath);
    await expect(page.locator('[data-rv-page-id="' + entry.id + '"]')).toHaveAttribute('href', href);
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
    if (!entry.template) expect(await response.text()).toContain('این صفحه هنوز پیاده‌سازی نشده است.');
    expect(await response.text()).toContain(withBase(basePath, '/_preview/'));
  }
  await page.evaluate(() => document.fonts.ready);
  expect(failures).toEqual([]);
});

test('Home, alias, canonical slash redirect and static-only methods work @smoke', async ({ page, request }) => {
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('آراسته دیده شوید');
  await page.getByRole('link', { name: 'فهرست بازبینی' }).click();
  await expect(page).toHaveURL(new RegExp(basePath + '_preview/$'));
  expect((await request.get('pages.html')).status()).toBe(200);
  const redirect = await request.get('portfolio', { maxRedirects: 0 });
  expect(redirect.status()).toBe(301);
  expect(redirect.headers().location).toBe(withBase(basePath, '/portfolio/'));
  expect((await request.head('')).status()).toBe(200);
  expect((await request.post('')).status()).toBe(405);
  expect((await request.get('.htaccess')).status()).toBe(404);
  expect((await request.get('missing/')).status()).toBe(404);
  expect((await request.get('%ZZ')).status()).toBe(400);
});
