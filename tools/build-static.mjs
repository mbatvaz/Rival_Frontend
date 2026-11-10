import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const views = path.join(src, 'Views');
const out = path.join(root, 'dist');
const registryPath = path.join(src, 'page-registry.json');
const registry = JSON.parse(await fs.readFile(registryPath, 'utf8'));
const siteConfig = JSON.parse(await fs.readFile(path.join(src, 'site-config.json'), 'utf8').catch(() => '{"basePath":"/"}'));
let basePath = String(siteConfig.basePath || '/').trim();
if (!basePath.startsWith('/')) basePath = '/' + basePath;
basePath = basePath.replace(/\/+$/, '') + '/';
const withBase = (route) => `${basePath.replace(/\/$/, '')}${route.startsWith('/') ? route : '/' + route}` || '/';

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });

const env = nunjucks.configure(views, {
  autoescape: true,
  noCache: true,
  throwOnUndefined: false,
  trimBlocks: true,
  lstripBlocks: true
});

// These helpers are intentionally limited to helpers with an explicit Razor mapping.
env.addFilter('faDigits', (value) => String(value ?? '').replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]));
const jalaliFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tehran'
});
env.addFilter('jalali', (value) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const parts = Object.fromEntries(jalaliFormatter.formatToParts(date).map(part => [part.type, part.value]));
  return `${parts.year}/${parts.month}/${parts.day}`;
});

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const toOutputDir = (previewPath) => {
  const clean = previewPath.replace(/^\/+|\/+$/g, '');
  return clean ? path.join(out, clean) : out;
};
const readMock = async (rel) => {
  if (!rel) return {};
  const abs = path.resolve(src, rel);
  if (!abs.startsWith(src + path.sep)) throw new Error(`MockData path escapes src: ${rel}`);
  try { return JSON.parse(await fs.readFile(abs, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return {}; throw error; }
};

const previewCss = `:root{font-family:"Yekan Bakh",sans-serif;color:#17191d;background:#f4f5f6}*{box-sizing:border-box}body{margin:0;padding:32px;direction:rtl}.wrap{max-width:1120px;margin:auto}.hero{padding:28px;border-radius:24px;background:#fff;box-shadow:0 8px 28px rgba(18,20,23,.06)}h1,h2,p{margin-top:0}.muted{color:#69717b}.groups{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;margin-top:20px}.group{background:#fff;border:1px solid #e5e8eb;border-radius:18px;padding:18px}.item{display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid #edf0f2;color:inherit;text-decoration:none}.item:last-child{border:0}.item:hover{text-decoration:underline}.tag{font-size:12px;color:#66707a}.notice{padding:14px;border-radius:12px;background:#f4f5f6;margin-top:16px}@font-face{font-family:"Yekan Bakh";src:url("${basePath}fonts/YekanBakh-Regular.woff2") format("woff2");font-weight:400;font-display:swap}@font-face{font-family:"Yekan Bakh";src:url("${basePath}fonts/YekanBakh-Light.woff2") format("woff2");font-weight:300;font-display:swap}@font-face{font-family:"Yekan Bakh";src:url("${basePath}fonts/YekanBakh-SemiBold.woff2") format("woff2");font-weight:600;font-display:swap}@media(max-width:600px){body{padding:14px}.hero{padding:20px}}`;
await fs.mkdir(path.join(out, '_preview'), { recursive: true });
await fs.writeFile(path.join(out, '_preview', 'preview.css'), previewCss, 'utf8');

const grouped = new Map();
for (const page of registry.pages) {
  const group = page.role || 'Shared';
  if (!grouped.has(group)) grouped.set(group, []);
  grouped.get(group).push(page);
}

const listHtml = [...grouped.entries()].map(([group, pages]) => `
  <section class="group"><h2>${esc(group)}</h2>
  ${pages.map(page => `<a class="item" href="${esc(withBase(page.previewPath))}"><span><strong>${esc(page.id)}</strong> — ${esc(page.titleFa || page.id)}</span><span class="tag">${esc(page.phase || '')}${page.status ? ' · '+esc(page.status) : ''}</span></a>`).join('')}
  </section>`).join('');
const directoryHtml = `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rival — Page Directory</title><link rel="stylesheet" href="${withBase('/_preview/preview.css')}"></head><body><main class="wrap"><header class="hero"><p class="muted">Rival Frontend Reference</p><h1>فهرست صفحات و مسیرهای پروژه</h1><p>این صفحه مرکزی برای بازبینی صفحات است. مواردی که هنوز پیاده‌سازی نشده‌اند با صفحه Placeholder مشخص می‌شوند.</p><div class="notice">صفحه اصلی عمومی: <a href="${withBase('/')}">مشاهده صفحه اصلی</a> · این فهرست: <a href="${withBase('/_preview/')}">بازگشت به فهرست</a></div></header><div class="groups">${listHtml}</div></main></body></html>`;
await fs.writeFile(path.join(out, '_preview', 'index.html'), directoryHtml, 'utf8');
await fs.writeFile(path.join(out, 'pages.html'), directoryHtml, 'utf8');

const placeholderCss = `@font-face{font-family:"Yekan Bakh";src:url("${basePath}fonts/YekanBakh-Regular.woff2") format("woff2");font-weight:400;font-display:swap}body{font-family:"Yekan Bakh",sans-serif;direction:rtl;background:#f4f5f6;color:#17191d;margin:0;padding:28px}.card{max-width:760px;margin:8vh auto;background:#fff;border:1px solid #e5e8eb;border-radius:22px;padding:28px;box-shadow:0 8px 28px rgba(18,20,23,.06)}a{color:inherit}small{color:#69717b}`;
await fs.writeFile(path.join(out, '_preview', 'placeholder.css'), placeholderCss, 'utf8');

let built = 0, placeholders = 0;
for (const page of registry.pages) {
  const outputDir = toOutputDir(page.previewPath);
  await fs.mkdir(outputDir, { recursive: true });
  let html;
  if (page.template) {
    const model = await readMock(page.mockData);
    html = env.render(page.template, { page, model, mockData: model, basePath });
    built++;
  } else {
    placeholders++;
    html = `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.id)} — Rival</title><link rel="stylesheet" href="${withBase('/_preview/placeholder.css')}"></head><body><main class="card"><small>Rival · ${esc(page.id)}</small><h1>${esc(page.titleFa || page.id)}</h1><p>این صفحه در فاز مربوط به خودش پیاده‌سازی خواهد شد.</p><p><strong>شناسه:</strong> ${esc(page.id)}</p><p><strong>نقش:</strong> ${esc(page.role)}</p><p><strong>منبع:</strong> ${esc(page.source || '')}</p><p><a href="${withBase('/_preview/')}">بازگشت به فهرست صفحات</a></p></main></body></html>`;
  }
  await fs.writeFile(path.join(outputDir, 'index.html'), html, 'utf8');
}

// Copy source assets to the static document root so the same URLs work after MVC port.
const wwwroot = path.join(src, 'wwwroot');
try { await fs.cp(wwwroot, out, { recursive: true }); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const mockDir = path.join(src, 'MockData');
try { await fs.cp(mockDir, path.join(out, 'mock-data'), { recursive: true }); } catch (error) { if (error.code !== 'ENOENT') throw error; }

const htaccess = `DirectoryIndex index.html\nOptions -Indexes\n<IfModule mod_mime.c>\n  AddType font/woff2 .woff2\n  AddType application/manifest+json .webmanifest\n</IfModule>\n`;
await fs.writeFile(path.join(out, '.htaccess'), htaccess, 'utf8');
console.log(`Rival static build complete: ${built} templates rendered, ${placeholders} placeholders, ${registry.pages.length} directory entries.`);
console.log(`Public home: ${path.join(out, 'index.html')}`);
console.log(`Page directory: ${path.join(out, '_preview', 'index.html')}`);
