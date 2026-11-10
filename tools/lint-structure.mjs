import fs from 'node:fs/promises';
import path from 'node:path';
import { root, src, readJson } from './lib/site.mjs';
import { validateRegistry } from './lib/registry.mjs';

const errors = [];
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
for (const file of await walk(src)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.html', '.njk', '.css', '.js'].includes(ext)) continue;
  const text = await fs.readFile(file, 'utf8');
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const fail = message => errors.push(rel + ': ' + message);
  const lines = text.trimEnd().split(/\r?\n/).length;
  if (ext === '.css' && lines > 150) fail('CSS exceeds 150 lines');
  if (ext === '.js' && lines > 120) fail('JS exceeds 120 lines');
  if (/<\s*script\b(?![^>]*\bsrc=)[^>]*>/i.test(text)) fail('inline script');
  if (/<\s*style\b|\sstyle\s*=/i.test(text)) fail('inline style');
  if (/\son[a-z]+\s*=/i.test(text)) fail('inline event handler');
  if (/@tailwind|tailwindcss|cdn\.tailwindcss/i.test(text)) fail('Tailwind in source');
  if (/https?:\/\/[^"'\s>]+\.(css|js)(\?|"|'|>)/i.test(text)) fail('external CSS/JS');
  if (/font-family\s*:[^;]*(Inter|Roboto|Vazirmatn|Tahoma|Arial|system-ui)/i.test(text)) fail('non-Yekan Bakh typeface');
  if (/overflow-y\s*:\s*(auto|scroll)/i.test(text)) fail('nested vertical scrolling');
  if (/\.(?:b[2-7]|f)-[a-z0-9_-]+/i.test(text)) fail('legacy batch class prefix');
  if (ext === '.js' && !rel.endsWith('/core/api.js') && /\b(fetch|localStorage|sessionStorage)\b/.test(text)) {
    fail('data access outside core/api.js');
  }
  if (ext === '.njk') {
    const allowed = new Set(['if', 'else', 'endif', 'for', 'endfor', 'include', 'extends', 'block', 'endblock']);
    for (const match of text.matchAll(/\{%\s*(\w+)/g)) if (!allowed.has(match[1])) fail('non-Razor template tag: ' + match[1]);
    for (const match of text.matchAll(/\{\{[^}]*\|\s*(\w+)/g)) {
      if (!['faDigits', 'jalali'].includes(match[1])) fail('unmapped template filter: ' + match[1]);
    }
    if (/(?:href|src)="\/(?!\{)/.test(text)) fail('hard-coded root URL');
  }
  if (ext === '.css') {
    if (!rel.includes('/00-tokens/') && /#[0-9a-f]{3,8}\b|\brgba?\(/i.test(text)) fail('raw color outside tokens');
    if (/@media\s*\(\s*max-width/.test(text)) fail('use min-width breakpoints');
    for (const match of text.matchAll(/url\("([^"#]+)"\)/g)) {
      if (!match[1].startsWith('data:')) {
        try { await fs.access(path.resolve(path.dirname(file), match[1])); }
        catch { fail('missing CSS dependency: ' + match[1]); }
      }
    }
  }
}
const entry = await fs.readFile(path.join(src, 'wwwroot/css/app.css'), 'utf8');
if (entry.replace(/@import[^;]+;/g, '').trim()) errors.push('app.css must contain imports only');
const pkg = await readJson(path.join(root, 'package.json'));
for (const dep of Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })) {
  if (/^(tailwindcss|vite|webpack|express|alpinejs|htmx\.org|react|vue|angular|sass|less|bootstrap)$/.test(dep)) {
    errors.push('Forbidden dependency: ' + dep);
  }
}
try { validateRegistry(await readJson(path.join(src, 'page-registry.json'))); }
catch (error) { errors.push(error.message); }
if (errors.length) { console.error('Structure lint failed:\n- ' + errors.join('\n- ')); process.exitCode = 1; }
else console.log('Structure lint passed: templates, CSS, data boundary, assets and routes.');
