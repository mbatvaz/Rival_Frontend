import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { root, loadSite, readJson } from '../../tools/lib/site.mjs';
import { buildPreviewReview } from '../../tools/lib/preview-review.mjs';

const { basePath } = await loadSite();
const row = (page, id = 'PUB-01') => page.locator('[data-rv-review-id="' + id + '"]');
const button = (page, action, id) => row(page, id).locator(':scope > .rv-review__approvals > [data-rv-approval="' + action + '"]');
async function start(file) {
  const child = spawn(process.execPath, [path.join(root, 'tools/serve-static.mjs')], {
    cwd: root, env: { ...process.env, PORT: '0', RIVAL_REVIEW_STORAGE: 'project', RIVAL_REVIEW_FILE: file },
    stdio: ['ignore', 'ignore', 'inherit', 'ipc']
  });
  const address = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Project review server timed out.')), 10000);
    child.once('message', message => { clearTimeout(timer); resolve('http://127.0.0.1:' + message.port + basePath); });
    child.once('error', error => { clearTimeout(timer); reject(error); });
  });
  return { address, stop: () => new Promise(resolve => { child.once('exit', resolve); child.send('shutdown'); }) };
}
async function ready(page) {
  await page.goto('_preview/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-review-message]')).toContainText('فایل پروژه');
}

test('Project approvals migrate once, synchronize isolated browsers and survive server restart @smoke', async ({ browser, request }, info) => {
  test.setTimeout(60000);
  const file = info.outputPath('approvals.json');
  let server = await start(file);
  const first = await browser.newContext({ baseURL: server.address });
  const second = await browser.newContext({ baseURL: server.address });
  try {
    const feed = await (await request.get(server.address + '_preview/revisions.json')).json();
    const legacy = { revision: feed.pages.find(page => page.id === 'PUB-01').revision,
      mobile: true, desktop: false, final: false, updatedAt: new Date().toISOString() };
    await first.addInitScript(({ key, record }) => localStorage.setItem(key, JSON.stringify({
      schemaVersion: 2, project: 'rival-preview-review', records: { 'PUB-01': record }
    })), { key: 'rival:preview-review:v1:' + basePath, record: legacy });
    await second.addInitScript(() => { window.Storage.prototype.getItem = window.Storage.prototype.setItem = () => { throw new Error('Blocked'); }; });
    const a = await first.newPage();
    const b = await second.newPage();
    await ready(a);
    await ready(b);
    await expect(button(b, 'mobile')).toHaveAttribute('aria-pressed', 'true');
    await button(a, 'desktop').click();
    await expect(button(b, 'final')).toBeVisible({ timeout: 7000 });
    await button(b, 'final').click();
    await expect(row(a)).toHaveAttribute('data-status', 'green', { timeout: 7000 });
    expect((await readJson(file)).records['PUB-01'].final).toBe(true);
    await Promise.all([button(a, 'mobile', 'PUB-02').click(), button(b, 'mobile', 'BK-F01').click()]);
    await expect(button(a, 'mobile', 'PUB-02')).toHaveAttribute('aria-pressed', 'true');
    await expect(button(b, 'mobile', 'BK-F01')).toHaveAttribute('aria-pressed', 'true');
    const saved = (await readJson(file)).records;
    expect(saved['PUB-02'].mobile && saved['BK-F01'].mobile).toBe(true);
    await button(a, 'final').click();
    await expect(button(a, 'mobile')).toHaveAttribute('aria-pressed', 'false');
    await a.reload();
    await expect(a.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    await expect(button(a, 'mobile')).toHaveAttribute('aria-pressed', 'false');
    await server.stop();
    server = await start(file);
    const fresh = await browser.newContext({ baseURL: server.address });
    try {
      const page = await fresh.newPage();
      await ready(page);
      await expect(button(page, 'mobile', 'PUB-02')).toHaveAttribute('aria-pressed', 'true');
      await expect(button(page, 'mobile')).toHaveAttribute('aria-pressed', 'false');
    } finally { await fresh.close(); }
  } finally { await first.close(); await second.close(); await server.stop(); }
});

test('Project writes reject cross-origin, malformed and stale data; disk failures never look saved @smoke', async ({ browser, request }, info) => {
  const file = info.outputPath('approvals.json');
  const server = await start(file);
  const context = await browser.newContext({ baseURL: server.address });
  const endpoint = server.address + '_preview/approvals.json';
  const headers = { 'X-Rival-Review': '1', 'Content-Type': 'application/json' };
  try {
    const page = await context.newPage();
    await ready(page);
    expect((await request.post(endpoint, { headers: { ...headers, Origin: 'https://example.com' }, data: {} })).status()).toBe(403);
    expect((await request.post(endpoint, { headers, data: '{' })).status()).toBe(400);
    expect((await request.post(endpoint, { headers, data: { type: 'merge', records: { bad: {} } } })).status()).toBe(400);
    expect((await request.post(endpoint, { headers, data: { type: 'toggle', id: 'PUB-01', revision: 'a'.repeat(64), action: 'mobile' } })).status()).toBe(409);
    expect((await request.post(server.address, { headers, data: {} })).status()).toBe(405);
    expect((await request.get(endpoint)).status()).toBe(200);
    await fs.mkdir(file, { recursive: true });
    await button(page, 'mobile').click();
    await expect(page.locator('[data-rv-review-message]')).toContainText('ذخیره نشد');
    await expect(button(page, 'mobile')).toHaveAttribute('aria-pressed', 'false');
    await expect(row(page)).toHaveAttribute('data-status', 'yellow');
  } finally { await context.close(); await server.stop(); }
});

test('Static build exports project approvals without modifying the source file @smoke', async ({ request }, info) => {
  expect((await request.get('_preview/approvals.json')).status()).toBe(200);
  const source = path.join(root, 'preview-review/approvals.json');
  const before = await fs.readFile(source, 'utf8');
  const registry = await readJson(path.join(root, 'src/page-registry.json'));
  const out = info.outputPath('static');
  await buildPreviewReview(out, { basePath }, registry, new Map(registry.pages.map(page => [page.id, 'a'.repeat(64)])));
  expect(await fs.readFile(path.join(out, '_preview/approvals.json'), 'utf8')).toBe(before);
  expect(await fs.readFile(source, 'utf8')).toBe(before);
});
