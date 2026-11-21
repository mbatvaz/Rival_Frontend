import fs from 'node:fs/promises';
import path from 'node:path';
import nunjucks from 'nunjucks';
import { root, src, loadSite, readJson, withBase, inside, write } from './lib/site.mjs';
import { faDigits, jalali } from './lib/format.mjs';
import { prepareDesignSystem } from './lib/design-system.mjs';
import { validateRegistry } from './lib/registry.mjs';
import { productContext } from './lib/product.mjs';
import { revisionTracker } from './lib/review-revision.mjs';
import { buildPreviewReview } from './lib/preview-review.mjs';
import { variantReview } from './lib/review-entries.mjs';

// ARCH / DEC-020: cPanel receives only the generated dist contents.
const out = path.join(root, 'dist');
const views = path.join(src, 'Views');
const site = await loadSite();
const registry = await readJson(path.join(src, 'page-registry.json'));
validateRegistry(registry);
await prepareDesignSystem();
// Fixed resolved target, verified to remain inside the checkout.
if (path.dirname(out) !== root || path.basename(out) !== 'dist') throw new Error('Invalid output target.');
await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
const env = nunjucks.configure(views, {
  autoescape: true, noCache: true, throwOnUndefined: true, trimBlocks: true, lstripBlocks: true
});
env.addFilter('faDigits', faDigits);
env.addFilter('jalali', jalali);
const urls = {
  home: withBase(site.basePath, '/'), directory: withBase(site.basePath, '/_preview/'),
  css: withBase(site.basePath, '/css/app.css'), js: withBase(site.basePath, '/js/app.js'),
  logo: withBase(site.basePath, '/img/rival-logo.png'), favicon: withBase(site.basePath, '/img/rival-mark.png')
};
let rendered = 0;
const revision = revisionTracker(src);
const revisions = new Map();
for (const page of registry.pages) {
  const fixture = page.mockData ? await readJson(inside(src, page.mockData)) : {};
  const model = fixture.demo ? fixture.data : fixture;
  const product = await productContext(page, site.basePath, registry.pages, model);
  const template = page.template ?? (product.shell ? 'Shared/Preview/_RolePlaceholder.njk' : 'Shared/Preview/_Placeholder.njk');
  if (page.template) inside(views, page.template);
  const html = env.render(template, {
    site, urls, page, model, basePath: site.basePath, ...product,
    phaseNumber: Number(page.phase.replace('Phase ', '')), sourceBatch: page.primaryBatch,
    title: page.titleFa + ' — ریوال'
  });
  await write(inside(out, page.previewPath.slice(1) + 'index.html'), html);
  revisions.set(page.id, await revision(page, html, site.basePath));
  for (const variant of page.variants ?? []) {
    revisions.set(variantReview(page.id, '', variant.query).id, await revision(page, html, site.basePath, variant.query));
  }
  if (page.template) rendered++;
}
await buildPreviewReview(out, site, registry, revisions);
await fs.cp(path.join(src, 'wwwroot'), out, { recursive: true, filter: file => !file.endsWith('.gitkeep') });
await fs.cp(path.join(src, 'MockData'), path.join(out, 'mock-data'), {
  recursive: true, filter: async file => (await fs.stat(file)).isDirectory() || path.extname(file) === '.json'
});
await write(path.join(out, '.htaccess'), 'DirectoryIndex index.html\nOptions -Indexes\nAddDefaultCharset UTF-8\n');
console.log('Rival: ' + rendered + ' product templates; ' + (registry.pages.length - rendered) + ' labelled placeholders.');
console.log('Base path: ' + site.basePath + ' | Directory: ' + site.basePath + '_preview/ | Output: ' + out);
