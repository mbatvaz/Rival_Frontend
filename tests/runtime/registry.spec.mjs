import { test, expect } from '@playwright/test';

test('Registry lazy-loads only needed features and initializes each hook once @smoke', async ({ page }) => {
  await page.goto('');
  const result = await page.evaluate(async () => {
    const registry = await import(document.documentElement.dataset.rvBasePath + 'js/core/registry.js');
    const counts = { loaded: 0, initialized: 0, unused: 0 };
    registry.registerFeature('foundation-test', async () => {
      counts.loaded++;
      return { init: element => { element.dataset.ready = 'yes'; counts.initialized++; } };
    });
    registry.registerFeature('unused-test', () => { counts.unused++; return { init() {} }; });
    const host = document.createElement('div');
    host.dataset.rv = 'foundation-test';
    host.innerHTML = '<div data-rv="foundation-test"></div>';
    document.body.append(host);
    await Promise.all([registry.initializeFeatures(host), registry.initializeFeatures(host)]);
    await registry.initializeFeatures(host);
    const ready = host.dataset.ready;
    host.remove();
    return { ...counts, ready };
  });
  expect(result).toEqual({ loaded: 1, initialized: 2, unused: 0, ready: 'yes' });
});

test('Registry reports initialization failures and allows retry @smoke', async ({ page }) => {
  await page.goto('');
  expect(await page.evaluate(async () => {
    const registry = await import(document.documentElement.dataset.rvBasePath + 'js/core/registry.js');
    let attempts = 0;
    registry.registerFeature('retry-test', async () => {
      if (++attempts === 1) throw new Error('Fixture failure');
      return { init: el => { el.dataset.ready = 'yes'; } };
    });
    const host = document.createElement('div');
    host.dataset.rv = 'retry-test';
    try { await registry.initializeFeatures(host); } catch { /* Expected first failure. */ }
    await registry.initializeFeatures(host);
    return { attempts, ready: host.dataset.ready };
  })).toEqual({ attempts: 2, ready: 'yes' });
});

test('Persian digits, Tehran Jalali day boundary and 24-hour time are consistent @smoke', async ({ page }) => {
  await page.goto('');
  const result = await page.evaluate(async () => {
    const f = await import(document.documentElement.dataset.rvBasePath + 'js/core/format.js');
    return {
      digits: f.faDigits('0123456789'), day: f.jalali('2026-03-20T21:00:00Z'),
      invalid: f.jalali('invalid'), midnight: f.time24('2026-03-20T20:30:00Z')
    };
  });
  expect(result).toEqual({ digits: '۰۱۲۳۴۵۶۷۸۹', day: '۱۴۰۵/۰۱/۰۱', invalid: '', midnight: '۰۰:۰۰' });
});
