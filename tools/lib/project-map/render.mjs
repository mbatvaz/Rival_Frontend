import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import nunjucks from 'nunjucks';

// Match the existing build's render context in memory; never run asset/build writers.
export async function renderPages(root, records) {
  const registry = records['src/page-registry.json']?.facts.data;
  if (!registry) return {};
  const site = records['src/site-config.json']?.facts.data || { basePath: '/' };
  const basePath = site.basePath || '/';
  const prefix = value => basePath.replace(/\/$/, '') + value;
  let productContext = async () => ({});
  let filters = {};
  if (records['tools/lib/product.mjs']) {
    ({ productContext } = await import(pathToFileURL(path.join(root, 'tools/lib/product.mjs')).href));
    filters = await import(pathToFileURL(path.join(root, 'tools/lib/format.mjs')).href);
  }
  const result = {};
  for (const page of registry.pages.filter(page => page.template)) {
    const used = new Set();
    const loader = new nunjucks.FileSystemLoader(path.join(root, 'src/Views'), { noCache: true });
    const get = loader.getSource.bind(loader);
    loader.getSource = name => { used.add('src/Views/' + name.replaceAll('\\', '/')); return get(name); };
    const env = new nunjucks.Environment(loader, { autoescape: true, throwOnUndefined: true, trimBlocks: true, lstripBlocks: true });
    for (const name of ['faDigits', 'jalali']) env.addFilter(name, filters[name] || (value => value));
    const fixture = page.mockData ? JSON.parse(await fs.readFile(path.join(root, 'src', page.mockData), 'utf8')) : {};
    const model = fixture.demo ? fixture.data : fixture;
    const urls = { home: prefix('/'), directory: prefix('/_preview/'), css: prefix('/css/app.css'), js: prefix('/js/app.js'),
      logo: prefix('/img/rival-logo.png'), favicon: prefix('/img/rival-mark.png') };
    try {
      const html = env.render(page.template, { site, urls, page, model, basePath,
        ...await productContext(page, basePath, registry.pages, model), phaseNumber: Number(page.phase.replace('Phase ', '')),
        sourceBatch: page.primaryBatch, title: page.titleFa + ' — ریوال' });
      result[page.id] = {
        templates: [...used].sort(),
        classes: [...new Set([...html.matchAll(/\bclass="([^"]*)"/g)].flatMap(match => match[1].split(/\s+/)).filter(Boolean))].sort(),
        features: [...new Set([...html.matchAll(/\bdata-rv="([^"]*)"/g)].flatMap(match => match[1].split(/\s+/)).filter(Boolean))].sort(),
        assets: [...new Set([...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(match => match[1].split(/[?#]/)[0])
          .filter(value => value.startsWith(basePath) && /\.(?:css|js|png|jpe?g|webp|svg|woff2|ico)$/.test(value))
          .map(value => 'src/wwwroot/' + value.slice(basePath.length)))].sort(),
        kind: model.kind || null
      };
    } catch (error) { result[page.id] = { error: error.message }; }
  }
  return result;
}
