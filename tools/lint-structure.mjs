import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const errors=[];
async function walk(dir) {
  let entries=[]; try { entries=await fs.readdir(dir,{withFileTypes:true}); } catch { return []; }
  const out=[];
  for (const e of entries) { const p=path.join(dir,e.name); if(e.isDirectory()) out.push(...await walk(p)); else out.push(p); }
  return out;
}
for (const file of await walk(src)) {
  const ext=path.extname(file).toLowerCase();
  if (!['.html','.njk','.css','.js','.mjs'].includes(ext)) continue;
  const text=await fs.readFile(file,'utf8');
  const rel=path.relative(root,file).replaceAll('\\','/');
  const lines=text.split(/\r?\n/).length;
  if (ext==='.css' && lines>150) errors.push(`${rel}: ${lines} lines (target <=150)`);
  if (['.js','.mjs'].includes(ext) && lines>120) errors.push(`${rel}: ${lines} lines (target <=120)`);
  if (/<\s*script\b(?![^>]*\bsrc=)[^>]*>/i.test(text)) errors.push(`${rel}: inline script element`);
  if (/<\s*style\b/i.test(text)) errors.push(`${rel}: inline style element`);
  if (/\son[a-z]+\s*=/i.test(text)) errors.push(`${rel}: inline event handler`);
  if (/@tailwind|tailwindcss|tailwind\.config|cdn\.tailwindcss/i.test(text)) errors.push(`${rel}: Tailwind reference in application source`);
  if (/https?:\/\/[^"'\s>]+\.(css|js)(\?|"|'|>)/i.test(text)) errors.push(`${rel}: external CSS/JS URL; use local assets`);
  if (/font-family\s*:[^;]*(Inter|Roboto|Vazirmatn|Tahoma|Arial|system-ui)/i.test(text)) errors.push(`${rel}: non-Yekan Bakh font family`);
  for (const face of text.matchAll(/@font-face\s*\{([^}]*)\}/gis)) {
    const family = face[1].match(/font-family\s*:\s*([^;]+)/i)?.[1] || '';
    if (!/Yekan Bakh/i.test(family)) errors.push(`${rel}: @font-face must use Yekan Bakh only`);
  }
  if (/overflow-y\s*:\s*(auto|scroll)/i.test(text)) errors.push(`${rel}: nested vertical scrolling is not allowed`);
  if (/\.(?:b2|b3|b4|b5|b6|b7|f)-[a-z0-9_-]+/i.test(text)) errors.push(`${rel}: legacy export class prefix; use canonical rv-* classes`);
}
const pkg=JSON.parse(await fs.readFile(path.join(root,'package.json'),'utf8'));
for (const dep of Object.keys({...pkg.dependencies,...pkg.devDependencies})) {
  if (/^(tailwindcss|vite|webpack|express|alpinejs|htmx\.org|react|vue|angular)$/.test(dep)) errors.push(`package.json: forbidden dependency ${dep}`);
}
if (errors.length) { console.error('Structure lint failed:\n- '+errors.join('\n- ')); process.exit(1); }
console.log('Structure lint passed for current application source.');
