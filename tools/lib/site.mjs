import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const src = path.join(root, 'src');
export async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}
export function normalizeBasePath(value = '/') {
  const clean = String(value).trim();
  if (!/^\/?[a-zA-Z0-9_/-]*$/.test(clean) || clean.includes('//')) {
    throw new Error('basePath must be a local path such as / or /rival-demo/.');
  }
  return '/' + clean.replace(/^\/+|\/+$/g, '') + (clean.replace(/\//g, '') ? '/' : '');
}
export async function loadSite() {
  const config = await readJson(path.join(src, 'site-config.json'));
  return { ...config, basePath: normalizeBasePath(process.env.RIVAL_BASE_PATH ?? config.basePath) };
}
export function withBase(basePath, route) {
  if (!route.startsWith('/') || route.startsWith('//') || /[?#\\]/.test(route)) {
    throw new Error(`Invalid local route: ${route}`);
  }
  return basePath.replace(/\/$/, '') + route;
}
export function matchPreviewRoute(pages, input, basePath) {
  const url = new URL(input, 'http://localhost');
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Use an HTTP(S) URL or a local route.');
  const route = url.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
  const prefixes = [...new Set([basePath, '/rival-demo/', '/'])];
  for (const prefix of prefixes) {
    const page = pages.find(item => withBase(prefix, item.previewPath) === route);
    if (page) return { page, url };
  }
  return { url };
}
export function inside(directory, relative) {
  const resolved = path.resolve(directory, relative);
  if (!resolved.startsWith(directory + path.sep)) throw new Error(`Path escapes source: ${relative}`);
  return resolved;
}
export async function write(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content, 'utf8');
}
