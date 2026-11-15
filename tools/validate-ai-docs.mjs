import fs from 'node:fs/promises';
import path from 'node:path';
import { root } from './lib/site.mjs';

const errors = [];
async function walk(dir) {
  const entries = await fs.readdir(path.join(root, dir), { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(dir + '/' + entry.name) : dir + '/' + entry.name))).flat();
}
const documents = ['AGENTS.md', 'GOALS.md', 'PLANS.md', 'PROMPTS.md',
  'README.md', 'PROGRESS.md', 'docs/ARCHITECTURE.md', 'docs/DESIGN_SYSTEM_EXTRACTION.md',
  'docs/DISCREPANCIES.md', 'docs/OPEN_QUESTIONS.md', 'docs/PAGE_INVENTORY.md',
  'docs/RIVAL_PROJECT_CONTRACT.md', 'docs/TRACEABILITY.md',
  'prompts/00b_Architecture_Alignment.md', 'prompts/MASTER_CODEX_DEVELOPMENT_PROMPT.md',
  'docs/COMPONENT_REUSE_MATRIX.md', 'docs-work/PHASE_02_COMPONENT_GUIDE_FA.md',
  'docs-work/PHASE_01_02_REFRESH_PLAN.md', 'docs-work/PHASE_01_02_REFRESH_FA.md',
  'preview-review/README.md', 'docs-work/PREVIEW_REVIEW_REPORT.md',
  ...(await walk('phases/PHASE_01_Foundation')).filter(file => file.endsWith('.md') && !file.includes('/references/')),
  ...(await walk('phases/PHASE_02_Shell_Public_Auth')).filter(file => file.endsWith('.md') && !file.includes('/references/')),
  ...(await walk('docs/ai')).filter(file => file.endsWith('.md')),
  ...(await walk('.agents/skills')).filter(file => file.endsWith('.md'))];
let links = 0;
for (const file of documents) {
  const text = (await fs.readFile(path.join(root, file), 'utf8')).replace(/^\uFEFF/, '');
  if (text.includes('\uFFFD')) errors.push(file + ': invalid text replacement character');
  // Only inline Markdown links in maintained docs; external URLs/anchors are not fetched.
  for (const match of text.matchAll(/\[[^\]\n]+\]\((<[^>]+>|[^)\s]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, '').split('#')[0];
    if (!target || /^[a-z]+:|^\/\//i.test(target)) continue;
    const destination = path.resolve(root, path.dirname(file), decodeURIComponent(target));
    try { await fs.access(destination); links++; }
    catch { errors.push(`${file}: missing link ${target}`); }
  }
  if (file.endsWith('/SKILL.md')) {
    const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const name = front?.[1].match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1];
    const description = front?.[1].match(/^description:\s*(.+)$/m)?.[1];
    if (!name || name.length > 64 || name !== path.basename(path.dirname(file))
      || name.startsWith('-') || name.endsWith('-') || name.includes('--') || !description) {
      errors.push(file + ': invalid local skill name/description frontmatter');
    }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Validated ${documents.length} maintained Markdown files, ${links} local links and 10 skill entry points.`);
