import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { revisionTracker } from '../../tools/lib/review-revision.mjs';

async function fixture(testInfo, browserName) {
  const root = testInfo.outputPath('revision-source-' + browserName);
  const files = {
    'wwwroot/css/app.css': '@import url("./shared.css");',
    'wwwroot/css/shared.css': '.rv-test { color: inherit; }',
    'wwwroot/js/app.js': "import './side-effect.js';\nimport { ready } from './common.js';\nregisterFeature('one', () => import('./one.js'));\nregisterFeature('two', () => import('./two.js'));",
    'wwwroot/js/common.js': 'export const ready = true;',
    'wwwroot/js/one.js': "api.read('public/states/' + state);",
    'wwwroot/js/two.js': 'export const two = 2;',
    'wwwroot/js/side-effect.js': '/* shared effect */',
    'MockData/page.json': '{"title":"one"}',
    'MockData/public/states/error.json': '{"error":true}',
    'Views/Page.njk': '{% extends "Layout.njk" %}Page',
    'Views/Layout.njk': 'Layout'
  };
  for (const [file, contents] of Object.entries(files)) {
    await fs.mkdir(path.dirname(path.join(root, file)), { recursive: true });
    await fs.writeFile(path.join(root, file), contents);
  }
  const page = { id: 'PUB-01', template: 'Page.njk', previewPath: '/', mockData: 'MockData/page.json' };
  const html = prefix => `<html data-rv-base-path="${prefix}"><link href="${prefix}css/app.css"><script src="${prefix}js/app.js"></script><main class="rv-test" data-rv="one">Page</main></html>`;
  return { root, page, html, hash: (prefix = '/') => revisionTracker(root)(page, html(prefix), prefix),
    change: (file, value) => fs.writeFile(path.join(root, file), value) };
}

test('Review revision is content-based and stable across identical builds and deployment prefixes @smoke', async ({ browserName }, testInfo) => {
  const source = await fixture(testInfo, browserName);
  const initial = await source.hash();
  expect(await source.hash()).toBe(initial);
  expect(await source.hash('/rival-demo/')).toBe(initial);
  source.page.implementationStatus = 'accepted';
  expect(await source.hash()).toBe(initial);
  await source.change('notes.md', 'Unrelated owner documentation.');
  expect(await source.hash()).toBe(initial);
  await source.change('wwwroot/js/two.js', 'Unused lazy feature changed.');
  expect(await source.hash()).toBe(initial);
  const entry = await fs.readFile(path.join(source.root, 'wwwroot/js/app.js'), 'utf8');
  await source.change('wwwroot/js/app.js', entry + "\nregisterFeature('three', () => import('./three.js'));");
  expect(await source.hash()).toBe(initial);
});

test('Rendered content, active modules, used fixtures and CSS invalidate the relevant revision @smoke', async ({ browserName }, testInfo) => {
  const source = await fixture(testInfo, browserName);
  let previous = await source.hash();
  for (const [file, value] of [
    ['wwwroot/js/side-effect.js', '/* shared effect changed */'],
    ['wwwroot/js/one.js', "api.read('public/states/' + state); /* changed */"],
    ['wwwroot/css/shared.css', '.rv-test { opacity: .9; }'],
    ['MockData/page.json', '{"title":"updated"}']
  ]) {
    await source.change(file, value);
    const updated = await source.hash();
    expect(updated, file).not.toBe(previous);
    previous = updated;
  }
  const tracker = revisionTracker(source.root);
  expect(await tracker(source.page, source.html('/') + '<aside>new content</aside>', '/')).not.toBe(previous);
});

test('A page-specific CSS rule does not revoke another page sharing the stylesheet @smoke', async ({ browserName }, testInfo) => {
  const source = await fixture(testInfo, browserName);
  const otherPage = { ...source.page, id: 'PUB-03', previewPath: '/booking-rules/' };
  const otherHtml = source.html('/').replace('rv-test', 'rv-other');
  const hashes = async () => {
    const tracker = revisionTracker(source.root);
    return [await tracker(source.page, source.html('/'), '/'), await tracker(otherPage, otherHtml, '/')];
  };
  await source.change('wwwroot/css/shared.css', '.rv-test { opacity:1; } .rv-other { opacity:1; }');
  const before = await hashes();
  await source.change('wwwroot/css/shared.css', '.rv-test { opacity:.8; } .rv-other { opacity:1; }');
  const after = await hashes();
  expect(after[0]).not.toBe(before[0]);
  expect(after[1]).toBe(before[1]);
  await source.change('Views/Layout.njk', 'Unused template comment');
  expect(await hashes()).toEqual(after);
});

test('One state fixture changes independently of the default and sibling states @smoke', async ({ browserName }, testInfo) => {
  const source = await fixture(testInfo, browserName);
  const hashes = async () => {
    const tracker = revisionTracker(source.root);
    return Promise.all(['', '?state=error', '?state=loading'].map(query => tracker(source.page, source.html('/'), '/', query)));
  };
  const before = await hashes();
  await source.change('MockData/public/states/error.json', '{"error":"new copy"}');
  const after = await hashes();
  expect(after[0]).toBe(before[0]);
  expect(after[1]).not.toBe(before[1]);
  expect(after[2]).toBe(before[2]);
});

test('Requested and proposed receipts have independent rendered-content fingerprints @smoke', async ({ browserName }, testInfo) => {
  const source = await fixture(testInfo, browserName);
  const page = { ...source.page, id: 'BK-REQ01', resultDefault: 'requested' };
  const html = proposed => source.html('/') + '<section data-rv-result-view="requested">Requested</section>'
    + '<section data-rv-result-view="proposed" hidden><div>' + proposed + '</div></section>';
  const tracker = revisionTracker(source.root);
  const requested = await tracker(page, html('Morning'), '/');
  const proposed = await tracker(page, html('Morning'), '/', '?state=proposed');
  expect(await tracker(page, html('Noon'), '/')).toBe(requested);
  expect(await tracker(page, html('Noon'), '/', '?state=proposed')).not.toBe(proposed);
});
