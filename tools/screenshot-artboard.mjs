import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(await fs.readFile(path.join(root,'design-export/MANIFEST.json'),'utf8'));
const id=process.argv[2];
if(!id){ console.error('Usage: node tools/screenshot-artboard.mjs PAGE-ID'); process.exit(2); }
const entry=manifest.pages.find(p=>p.id.toUpperCase()===id.toUpperCase());
const explicitArg=process.argv.find((arg,i)=>process.argv[i-1]==='--source');
const chosen=explicitArg || entry?.preferredSourceHtml;
if(!chosen){ console.error(`No unique canonical source HTML for ${id}. Candidates:\n${(entry?.sourceHtml || []).join('\n')}\nRe-run with --source <package-relative-path> after checking the handoff.`); process.exit(1); }
const source=path.resolve(root,chosen);
if(!source.startsWith(path.join(root,'design-export','batches')+path.sep)){ console.error('Source must be inside design-export/batches/.'); process.exit(1); }
const output=path.join(root,'tests/screens/design-reference',`${id}.png`);
await fs.mkdir(path.dirname(output),{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
await page.goto(pathToFileURL(source).href,{waitUntil:'domcontentloaded'});
await page.waitForTimeout(700);
await page.screenshot({path:output,fullPage:true});
await browser.close();
console.log(`Saved ${path.relative(root,output)} from ${chosen}`);
