import fs from 'node:fs/promises';
import path from 'node:path';
import nunjucks from 'nunjucks';
import { root, write } from './site.mjs';
import { faDigits } from './format.mjs';
import { directoryModel } from './registry.mjs';
import { prepareReviewEntries } from './review-entries.mjs';

export async function buildPreviewReview(out, site, registry, revisions) {
  const source = path.join(root, 'preview-review');
  const model = directoryModel(registry, site.basePath);
  for (const group of model.groups) {
    group.pages = group.pages.filter(entry => !['CUS-02', 'STATE-05', 'STATE-06', 'STATE-07'].includes(entry.id));
    for (const entry of group.pages) {
      if (entry.id === 'BK-F01') entry.variants = entry.variants.filter(item => item.query !== '?state=sms');
      if (entry.id === 'BK-REQ01') entry.variants = entry.variants.filter(item => item.query !== '?state=requested');
    }
  }
  model.count = model.groups.reduce((count, group) => count + group.pages.length, 0);
  const feed = prepareReviewEntries(model, revisions);
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(source), {
    autoescape: true, noCache: true, throwOnUndefined: true, trimBlocks: true, lstripBlocks: true
  });
  env.addFilter('faDigits', faDigits);
  const html = env.render('index.njk', { site, model });
  await write(path.join(out, '_preview/index.html'), html);
  await write(path.join(out, 'pages.html'), html);
  await write(path.join(out, '_preview/revisions.json'), JSON.stringify({ schemaVersion: 1,
    pages: feed
  }) + '\n');
  await fs.copyFile(path.join(source, 'approvals.json'), path.join(out, '_preview/approvals.json'));
  for (const file of await fs.readdir(source)) {
    if (/\.(css|js)$/.test(file)) await fs.copyFile(path.join(source, file), path.join(out, '_preview', file));
  }
}
