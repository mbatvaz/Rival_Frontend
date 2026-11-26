import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { root, src, loadSite, readJson, normalizeBasePath } from '../../tools/lib/site.mjs';
import { faDigits, jalali } from '../../tools/lib/format.mjs';

const authorizedExternal = value => /^tel:09141452321$|^https:\/\/(?:instagram|telegram|maps)\.example\/rival$/.test(value);
const out = path.join(root, 'dist');
const { basePath } = await loadSite();
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}

test('Static output preserves public contexts and deploys no source or runtime @smoke', async () => {
  const registry = await readJson(path.join(src, 'page-registry.json'));
  const manifest = await readJson(path.join(root, 'design-export/MANIFEST.json'));
  const publicDesignIds = manifest.pages.filter(page => page.id !== 'CUS-07').map(page => page.id).sort();
  expect(registry.pages.map(page => page.id).sort()).toEqual(publicDesignIds);
  const files = await walk(out);
  expect(files.filter(f => f.endsWith('.html'))).toHaveLength(publicDesignIds.length + 2);
  expect(files.filter(f => /\.(njk|mjs|md|woff)$/.test(f))).toEqual([]);
  expect(files.some(f => /node_modules|AGENTS|package\.json/.test(f))).toBe(false);
  expect(await fs.readFile(path.join(out, '.htaccess'), 'utf8')).toContain('Options -Indexes');
  for (const file of files.filter(f => f.endsWith('.html'))) {
    const html = await fs.readFile(file, 'utf8');
    expect(html).not.toMatch(/<style\b|\sstyle=|\son[a-z]+\s*=|<script(?![^>]*src=)/i);
    expect(html).not.toMatch(/\{[%{]|\b(?:b[2-7]|f)-[a-z]/);
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) expect(match[1].startsWith(basePath) || authorizedExternal(match[1])).toBe(true);
  }
  expect(faDigits(123)).toBe('۱۲۳');
  expect(jalali('2026-03-20T21:00:00Z')).toBe('۱۴۰۵/۰۱/۰۱');
  expect(() => normalizeBasePath('https://example.com')).toThrow();
  expect(() => normalizeBasePath('../outside')).toThrow();
});

test('Token values and icon/font inventories come from the immutable Design System @smoke', async () => {
  const ds = path.join(root, 'design-export/design-system-v2');
  const tokens = await readJson(path.join(ds, 'tokens/tokens.json'));
  for (const family of ['color', 'spacing', 'radius', 'shadow', 'blur', 'duration', 'easing', 'size']) {
    const css = await fs.readFile(path.join(out, 'css/00-tokens', family + '.css'), 'utf8');
    for (const token of tokens[family].tokens) {
      const value = typeof token.value === 'object' ? token.value.light : token.value;
      expect(css).toContain('--' + token.name + ': ' + value.replace(/\{([\w-]+)\}/g, 'var(--$1)') + ';');
    }
  }
  expect((await fs.readdir(path.join(out, 'fonts'))).sort()).toEqual([
    'YekanBakh-Light.woff2', 'YekanBakh-Regular.woff2', 'YekanBakh-SemiBold.woff2'
  ]);
  const icons = (await fs.readdir(path.join(out, 'icons'))).filter(f => f.endsWith('.svg'));
  expect(icons).toHaveLength(71);
  for (const file of icons) {
    expect(await fs.readFile(path.join(out, 'icons', file))).toEqual(await fs.readFile(path.join(ds, 'assets/icons', file)));
  }
  const entry = await fs.readFile(path.join(out, 'css/app.css'), 'utf8');
  expect(entry.replace(/@import[^;]+;/g, '').trim()).toBe('');
  expect(await fs.readFile(path.join(out, 'css/layers.css'), 'utf8')).toContain('tokens, base, layout, components, pages, utilities');
});

test('Every local HTML, CSS import, font, icon and module reference resolves @smoke', async ({ request }) => {
  for (const file of await walk(out)) {
    if (!/\.(html|css|js)$/.test(file)) continue;
    const text = await fs.readFile(file, 'utf8');
    const matches = file.endsWith('.html') ? [...text.matchAll(/(?:href|src)="([^"#]+)"/g)]
      : file.endsWith('.css') ? [...text.matchAll(/url\("([^"]+)"\)/g)]
        : [...text.matchAll(/from '([^']+)'/g)];
    const fileUrl = 'http://127.0.0.1:' + (process.env.PORT || '4173') + basePath + path.relative(out, file).replaceAll('\\', '/');
    for (const match of matches) {
      if (authorizedExternal(match[1])) continue;
      const url = new URL(match[1], fileUrl);
      expect(url.pathname.startsWith(basePath)).toBe(true);
      const response = await request.get(url.href);
      expect(response.status(), url.href).toBe(200);
    }
  }
});
