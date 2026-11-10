import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(await fs.readFile(path.join(root,'design-export/MANIFEST.json'),'utf8'));
const id=process.argv[2];
if(!id){ console.error('Usage: npm run export:lookup -- PAGE-ID'); process.exit(2); }
const page=manifest.pages.find(p=>p.id.toUpperCase()===id.toUpperCase());
if(!page){ console.error(`No canonical manifest entry for ${id}`); process.exit(1); }
console.log(JSON.stringify(page,null,2));
