import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runMap } from '../project-map.mjs';
import { templateFacts } from '../lib/project-map/templates.mjs';
import { javascriptFacts } from '../lib/project-map/javascript.mjs';
import { styleFacts } from '../lib/project-map/styles.mjs';
import { digest, snapshot } from '../lib/project-map/extract.mjs';
import { validateStructure } from '../lib/project-map/validate.mjs';

const parent = path.dirname(fileURLToPath(import.meta.url));
async function fixture(t) {
  const root = await fs.mkdtemp(path.join(parent, '.map-fixture-'));
  t.after(async () => {
    const resolved = path.resolve(root);
    assert.equal(path.dirname(resolved), parent);
    assert.ok(path.basename(resolved).startsWith('.map-fixture-'));
    await fs.rm(resolved, { recursive: true, force: true });
  });
  const put = async (file, text) => { await fs.mkdir(path.dirname(path.join(root, file)), { recursive: true }); await fs.writeFile(path.join(root, file), text); };
  await put('src/page-registry.json', JSON.stringify({ pages: [{ id: 'BK-X', previewPath: '/book/', phase: 'Phase 03', template: 'Booking/Index.njk', mockData: 'MockData/view.json' }] }));
  await put('design-export/MANIFEST.json', JSON.stringify({ pages: [{ id: 'BK-X', sourceHtml: ['design-export/page.html'] }] }));
  await put('design-export/page.html', '<h1>reference</h1>');
  await put('design-export/design-system-v2/tokens/tokens.json', JSON.stringify({ color: { tokens: [{ name: 'accent', value: '#000' }] } }));
  await put('docs/RIVAL_PROJECT_CONTRACT.md', '# Contract');
  await put('src/Views/Booking/Index.njk', '{% include "Shared/_Card.njk" %}<main data-rv="booking"></main>');
  await put('src/Views/Shared/_Card.njk', '<div class="rv-card"></div>');
  await put('src/wwwroot/css/card.css', '.rv-card { color: var(--accent); }');
  await put('src/wwwroot/js/app.js', 'registerFeature("booking", () => import("./booking.js"));');
  await put('src/wwwroot/js/booking.js', 'export const init = () => {};');
  await put('src/MockData/view.json', '{}');
  await put('tests/booking.spec.mjs', 'const route = "/book/";');
  return { root, put, read: file => fs.readFile(path.join(root, file), 'utf8') };
}
test('parsers distinguish declarations from comments, dynamic targets and conditional execution', async () => {
  const template = templateFacts('{# {% include "Fake.njk" %} #}{% if ok %}{% include "Card.njk" %}{% endif %}{% include dynamic %}<!-- <i data-rv="fake"></i> --><i data-rv="real second"></i>');
  assert.deepEqual(template.links.map(link => link.target), ['src/Views/Card.njk']);
  assert.match(template.links[0].detail, /Conditional/);
  assert.equal(template.gaps.length, 1);
  assert.deepEqual(template.features, ['real', 'second']);
  const js = javascriptFacts('// import "./fake.js";\nimport x from "./real.js"; import(target);', 'src/wwwroot/js/a.js');
  assert.deepEqual(js.links.map(link => link.target), ['src/wwwroot/js/real.js']);
  assert.equal(js.gaps.length, 1);
  const css = await styleFacts('/* .rv-fake { color: var(--fake); } */ .rv-card { --local: 2px; color: var(--accent); }', 'src/wwwroot/css/a.css');
  assert.deepEqual(css.classes, ['rv-card']);
  assert.deepEqual(css.links.map(link => link.target), ['token:--local', 'token:--accent']);
});
test('page, component, feature, token and test queries navigate both directions', async t => {
  const f = await fixture(t); await runMap(f.root, 'build');
  const page = (await runMap(f.root, 'query', ['BK-X'])).result;
  assert.equal(page.fresh, true);
  assert.ok(page.edges.some(edge => edge.to === 'src/wwwroot/js/booking.js'));
  assert.ok(page.edges.some(edge => edge.type === 'tested-by' && edge.status === 'INFERRED'));
  const compact = (await runMap(f.root, 'query', ['--compact', 'BK-X', '--limit=1'])).result;
  assert.equal(compact.fresh, true);
  assert.equal(compact.matches.items[0].id, 'page:BK-X');
  assert.equal(compact.templates.items.length, 1);
  assert.ok(compact.templates.count > compact.templates.items.length);
  assert.equal(compact.edges, undefined);
  const token = (await runMap(f.root, 'query', ['--accent'])).result;
  assert.ok(token.possiblePages.includes('BK-X'));
  const card = (await runMap(f.root, 'query', ['Card'])).result;
  assert.ok(card.possiblePages.includes('BK-X'));
  const missing = (await runMap(f.root, 'query', ['does-not-exist'])).result;
  assert.deepEqual(missing.matches, []);
});
test('CHECK and QUERY do not write; UPDATE reuses facts and BUILD is deterministic', async t => {
  const f = await fixture(t); await runMap(f.root, 'build');
  const before = await f.read('docs/ai/project-graph.json');
  const graph = JSON.parse(before);
  const stamps = await Promise.all(['project-graph.json', 'PROJECT_INDEX.md', 'PROJECT_GRAPH.md'].map(async file => {
    const full = path.join(f.root, 'docs/ai', file); return [full, digest(await fs.readFile(full)), (await fs.stat(full)).mtimeMs];
  }));
  await runMap(f.root, 'check'); await runMap(f.root, 'query', ['BK-X']);
  for (const [file, hash, mtime] of stamps) { assert.equal(digest(await fs.readFile(file)), hash); assert.equal((await fs.stat(file)).mtimeMs, mtime); }
  assert.equal((await runMap(f.root, 'update')).result.parsed, 0);
  assert.equal(await f.read('docs/ai/project-graph.json'), before);
  await runMap(f.root, 'build'); assert.equal(await f.read('docs/ai/project-graph.json'), before);
  assert.deepEqual(await snapshot(f.root), Object.fromEntries(Object.entries(graph.sources).map(([file, item]) => [file, { hash: item.hash, bytes: item.bytes }])));
  await f.put('src/Views/Booking/Index.njk', '{% if model.show %}{% include "Shared/_Card.njk" %}{% endif %}');
  await f.put('src/MockData/view.json', '{"show":false}'); await runMap(f.root, 'update');
  assert.deepEqual((await runMap(f.root, 'query', ['Card'])).result.renderedPages, []);
  await f.put('src/MockData/view.json', '{"show":true}'); await runMap(f.root, 'update');
  assert.deepEqual((await runMap(f.root, 'query', ['Card'])).result.renderedPages, ['BK-X']);
});
test('incremental update catches uncommitted edits, additions, deletions and broken references', async t => {
  const f = await fixture(t); await runMap(f.root, 'build');
  await f.put('src/wwwroot/css/card.css', '.rv-card { color: red; }');
  await f.put('src/wwwroot/js/new.js', 'export const added = true;');
  const check = (await runMap(f.root, 'check')).result;
  assert.equal(check.ok, false); assert.ok(check.drift.added.includes('src/wwwroot/js/new.js'));
  assert.ok(check.drift.changed.includes('src/wwwroot/css/card.css'));
  const updated = (await runMap(f.root, 'update')).result;
  assert.equal(updated.parsed, 2); assert.ok(updated.reused > 0);
  await fs.unlink(path.join(f.root, 'src/Views/Shared/_Card.njk'));
  const removed = (await runMap(f.root, 'check')).result;
  assert.ok(removed.drift.removed.includes('src/Views/Shared/_Card.njk'));
  assert.ok(removed.errors.some(error => error.includes('_Card.njk')));
  const graph = JSON.parse(await f.read('docs/ai/project-graph.json'));
  graph.edges.push({ from: 'src/Views/Shared/_Card.njk', to: 'src/Views/Booking/Index.njk', type: 'include', status: 'CONFIRMED', evidence: { path: 'src/Views/Shared/_Card.njk' } });
  assert.ok(validateStructure(graph).some(error => error.includes('cycle')));
});
test('design reverse lookup, generated-guide tampering and extractor changes are detectable', async t => {
  const f = await fixture(t); await runMap(f.root, 'build');
  const reverse = (await runMap(f.root, 'query', ['design-export/page.html'])).result;
  assert.ok(reverse.possiblePages.includes('BK-X'));
  await f.put('docs/ai/PROJECT_INDEX.md', 'changed by hand');
  assert.ok((await runMap(f.root, 'check')).result.errors.some(error => error.includes('Modified generated guide')));
  await runMap(f.root, 'update');
  await f.put('tools/lib/project-map/extract.mjs', 'export const engineChanged = true;');
  const update = (await runMap(f.root, 'update')).result;
  assert.equal(update.reused, 0);
  await fs.unlink(path.join(f.root, 'design-export/page.html'));
  assert.ok((await runMap(f.root, 'check')).result.errors.some(error => error.includes('design-export/page.html')));
});
test('validator rejects unsafe paths, unsupported confidence, duplicate routes and IDs', () => {
  const graph = { schemaVersion: 1, nodes: [
    { id: 'a', kind: 'page', route: '/same/', path: '../escape' },
    { id: 'a', kind: 'page', route: '/same/' }
  ], edges: [{ from: 'a', to: 'missing', type: 'include', status: 'GUESS' }] };
  const errors = validateStructure(graph).join('\n');
  for (const pattern of ['Unsafe path', 'Duplicate node', 'Duplicate page route', 'Unsupported confidence', 'Unresolved edge endpoint', 'Missing evidence']) assert.ok(errors.includes(pattern));
});
