import { test, expect } from '@playwright/test';

test('Mock reads, states and local writes survive reload and reset @smoke', async ({ page }) => {
  await page.goto('');
  const initial = await page.evaluate(async () => {
    const { api } = await import(document.documentElement.dataset.rvBasePath + 'js/core/api.js');
    const normal = await api.read('foundation/preferences');
    const empty = await api.read('foundation/preferences', { state: 'empty' });
    let failure;
    try { await api.read('foundation/preferences', { state: 'error' }); }
    catch (e) { failure = { code: e.code, status: e.status, demo: e.demo }; }
    const data = { language: 'fa-IR', compact: true };
    const saved = await api.write('foundation/preferences', data);
    data.compact = false;
    return { normal, empty, failure, saved };
  });
  expect(initial.normal.data.compact).toBe(false);
  expect(initial.empty.data).toBeNull();
  expect(initial.failure).toEqual({ code: 'DEMO_UNAVAILABLE', status: 503, demo: true });
  expect(initial.saved).toEqual({ ok: true, demo: true, data: { language: 'fa-IR', compact: true } });
  await page.reload();
  expect(await page.evaluate(async () => {
    const { api } = await import(document.documentElement.dataset.rvBasePath + 'js/core/api.js');
    return (await api.read('foundation/preferences')).data.compact;
  })).toBe(true);
  expect(await page.evaluate(async () => {
    const { api } = await import(document.documentElement.dataset.rvBasePath + 'js/core/api.js');
    await api.reset('foundation/preferences');
    return (await api.read('foundation/preferences')).data.compact;
  })).toBe(false);
});

test('Adapter rejects unsafe paths and exposes stable missing/cancel/storage errors @smoke', async ({ page }) => {
  await page.goto('');
  const results = await page.evaluate(async () => {
    const { api } = await import(document.documentElement.dataset.rvBasePath + 'js/core/api.js');
    const errors = [];
    for (const resource of ['../secret', 'https://example.com', 'foundation/missing']) {
      try { await api.read(resource); } catch (e) { errors.push(e.code); }
    }
    const controller = new AbortController();
    controller.abort();
    try { await api.read('foundation/preferences', { signal: controller.signal }); }
    catch (e) { errors.push(e.name); }
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => { throw new Error('Storage unavailable'); };
    try { await api.write('foundation/preferences', { compact: true }); }
    catch (e) { errors.push(e.code); }
    finally { Storage.prototype.setItem = original; }
    return errors;
  });
  expect(results).toEqual(['INVALID_RESOURCE', 'INVALID_RESOURCE', 'HTTP_ERROR', 'AbortError', 'STORAGE_ERROR']);
});

test('Network failure and malformed JSON stay inside the data boundary @smoke', async ({ page }) => {
  await page.goto('');
  const url = '**/mock-data/foundation/preferences.json';
  await page.route(url, route => route.abort());
  const readCode = () => page.evaluate(async () => {
    const { api } = await import(document.documentElement.dataset.rvBasePath + 'js/core/api.js');
    try { await api.read('foundation/preferences'); } catch (e) { return e.code; }
  });
  expect(await readCode()).toBe('NETWORK_ERROR');
  await page.unroute(url);
  await page.route(url, route => route.fulfill({ contentType: 'application/json', body: 'invalid json' }));
  expect(await readCode()).toBe('INVALID_RESPONSE');
});
