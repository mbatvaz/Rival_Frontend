import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { URLSearchParams } from 'node:url';
import { reviewCss } from './review-css.mjs';
import { scopedHtml, activeImport, fixtureScope } from './review-scope.mjs';

const normalize = value => value.replaceAll('\\', '/');
export function revisionTracker(sourceRoot) {
  const bytes = new Map();
  async function read(relative) {
    const absolute = path.resolve(sourceRoot, relative);
    if (!absolute.startsWith(path.resolve(sourceRoot) + path.sep)) return null;
    if (!bytes.has(absolute)) bytes.set(absolute, fs.readFile(absolute).catch(error => {
      if (['ENOENT', 'EISDIR'].includes(error.code)) return null;
      throw error;
    }));
    return bytes.get(absolute);
  }
  return async (page, html, basePath, query = '') => {
    const parameters = new URLSearchParams(query);
    parameters.sort();
    query = parameters.toString();
    const canonical = scopedHtml(html.replaceAll(basePath, '/').replaceAll(encodeURIComponent(basePath), '%2F'), page, query);
    const active = new Set([...canonical.matchAll(/\bdata-rv="([^"]+)"/g)].flatMap(match => match[1].split(/\s+/)));
    const classes = new Set([...canonical.matchAll(/\bclass="([^"]+)"/g)].flatMap(match => match[1].split(/\s+/)));
    const dependencies = new Map();
    const visited = new Set();
    async function visit(relative) {
      relative = normalize(relative);
      if (visited.has(relative)) return;
      visited.add(relative);
      const content = await read(relative);
      if (!content) return;
      let text = content.toString('utf8');
      const resolve = file => normalize(path.join(path.dirname(relative), file));
      if (relative.endsWith('.js')) {
        if (relative === 'wwwroot/js/app.js') text = text.split('\n').filter(line => {
          const registration = line.match(/registerFeature\('([^']+)'/);
          return !registration || active.has(registration[1]);
        }).join('\n');
        for (const match of text.matchAll(/className\s*=\s*['"]([^'"]+)|classList\.(?:add|toggle)\(\s*['"]([^'"]+)/g)) {
          for (const name of (match[1] || match[2]).split(/\s+/)) classes.add(name);
        }
        for (const match of text.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)) await visit(resolve(match[1]));
        for (const match of text.matchAll(/\bimport\s+['"]([^'"]+)['"]/g)) await visit(resolve(match[1]));
        for (const match of text.matchAll(/registerFeature\('([^']+)',\s*\(\)\s*=>\s*import\('([^']+)'\)/g)) {
          if (active.has(match[1])) await visit(resolve(match[2]));
        }
        for (const line of text.split('\n').filter(line => !line.includes('registerFeature('))) {
          for (const match of line.matchAll(/import\(['"]([^'"]+)['"]\)/g)) {
            if (activeImport(relative, match[1], canonical, page, query)) await visit(resolve(match[1]));
          }
        }
        for (const match of text.matchAll(/\b(?:api\.)?read\(['"]([a-z0-9_/-]+)['"]/gi)) {
          const fixture = fixtureScope(match[1], query);
          if (fixture) await visit('MockData/' + fixture);
        }
      }
      if (relative.endsWith('.css')) {
        const imports = [];
        for (const match of text.matchAll(/@import\s+url\(["']?([^"')]+)["']?\)/g)) {
          const file = resolve(match[1]);
          await visit(file);
          if (dependencies.has(file)) imports.push(file);
        }
        text = reviewCss(text, classes, canonical);
        if (imports.length) text = '@imports ' + imports.join(',') + '\n' + text;
        for (const match of text.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
          if (!/^(data:|https?:|#)/.test(match[1])) await visit(resolve(match[1]));
        }
      }
      if (relative.endsWith('.json')) {
        try {
          const fixture = JSON.parse(text);
          if (fixture.data?.variants) delete fixture.data.variants;
          text = JSON.stringify(fixture);
        } catch { /* Invalid fixture bytes remain a dependency and fail the ordinary build. */ }
      }
      if (text.trim()) dependencies.set(relative, text);
    }
    const assets = [...canonical.matchAll(/(?:src|href)="\/([^"?#]+)"/g)].map(match => match[1]);
    for (const asset of assets.filter(file => file.endsWith('.js'))) await visit('wwwroot/' + asset);
    for (const asset of assets.filter(file => !file.endsWith('.js'))) await visit('wwwroot/' + asset);
    if (page.mockData) await visit(page.mockData);
    if (canonical.includes('data-rv-booking-kind')) {
      await visit('MockData/booking/catalog.json');
      const kind = canonical.match(/data-rv-booking-kind="([^"]+)"/)?.[1];
      if (['checkout', 'result', 'external'].includes(kind)) await visit('MockData/booking/' + (page.id === 'BK-REQ01' ? 'requests' : 'holds') + '.json');
      if (kind === 'recurring') for (const file of ['recurring', 'recurring-preview']) await visit('MockData/booking/' + file + '.json');
    }
    const digest = createHash('sha256').update(JSON.stringify({ id: page.id, template: page.template,
      route: page.previewPath, query: new URLSearchParams(query).toString() })).update(canonical);
    for (const [file, content] of [...dependencies].sort(([a], [b]) => a.localeCompare(b))) digest.update(file).update(content);
    return digest.digest('hex');
  };
}
