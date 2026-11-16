import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { templateFacts } from './templates.mjs';
import { javascriptFacts } from './javascript.mjs';
import { styleFacts } from './styles.mjs';
import { renderPages } from './render.mjs';

export const outputs = ['docs/ai/project-graph.json', 'docs/ai/PROJECT_INDEX.md', 'docs/ai/PROJECT_GRAPH.md'];
export const digest = text => createHash('sha256').update(text).digest('hex');
const roots = ['src/Views', 'src/wwwroot/css', 'src/wwwroot/js', 'src/MockData', 'tools', 'tests',
  'preview-review', '.agents/skills', 'docs/ai', 'docs-work/desktop-layouts', 'prompts', 'phases'];
const singles = ['AGENTS.md', 'PROGRESS.md', 'GOALS.md', 'PLANS.md', 'PROMPTS.md', 'package.json',
  'package-lock.json', 'playwright.config.mjs', 'src/page-registry.json', 'src/site-config.json',
  'design-export/MANIFEST.json', 'design-export/design-system-v2/tokens/tokens.json'];
const excluded = new Set(['references', 'screens', 'node_modules', 'archive', 'test-results']);
export async function inventory(root) {
  const found = new Set();
  async function walk(relative) {
    let entries;
    try { entries = await fs.readdir(path.join(root, relative), { withFileTypes: true }); }
    catch (error) { if (error.code === 'ENOENT') return; throw error; }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const file = relative + '/' + entry.name;
      if (entry.isDirectory() && !excluded.has(entry.name)) await walk(file);
      else if (entry.isFile() && /\.(?:njk|css|js|mjs|json|md)$/.test(entry.name)
        && !outputs.includes(file) && !file.endsWith('-audit.json') && !file.includes('/tests/')) found.add(file);
    }
  }
  for (const dir of roots) await walk(dir);
  // Tool tests are source inputs too, but never traverse their temporary fixtures.
  for (const file of ['tools/tests/project-map.test.mjs']) {
    try { await fs.access(path.join(root, file)); found.add(file); } catch { /* Optional in fixtures. */ }
  }
  await walk('docs'); // references/ is deliberately excluded, not read or hashed.
  for (const file of singles) {
    try { await fs.access(path.join(root, file)); found.add(file); } catch { /* Validator reports required inputs. */ }
  }
  return [...found].sort();
}
export async function snapshot(root) {
  const records = {};
  for (const file of await inventory(root)) {
    const bytes = await fs.readFile(path.join(root, file));
    records[file] = { hash: digest(bytes), bytes: bytes.length };
  }
  return records;
}
export async function extract(root, previous = {}) {
  const current = await snapshot(root);
  const records = {};
  const changed = [];
  const engineChanged = Object.keys(current).some(file => /^tools\/(?:project-map\.mjs|lib\/(?:project-map\/|review-scope\.mjs))/.test(file)
    && current[file].hash !== previous[file]?.hash);
  for (const [file, stamp] of Object.entries(current)) {
    if (!engineChanged && previous[file]?.hash === stamp.hash && previous[file].facts) {
      records[file] = previous[file]; continue;
    }
    changed.push(file);
    const text = await fs.readFile(path.join(root, file), 'utf8');
    let facts = { links: [], gaps: [] };
    if (file.endsWith('.njk')) facts = templateFacts(text, file);
    else if (/\.(?:js|mjs)$/.test(file)) facts = javascriptFacts(text, file);
    else if (file.endsWith('.css')) facts = await styleFacts(text, file);
    else if (file.endsWith('.json') && !file.endsWith('package-lock.json')) facts.data = JSON.parse(text.replace(/^\uFEFF/, ''));
    else if (file.endsWith('.md')) {
      facts.headings = [...text.matchAll(/^#{1,3} (.+)$/gm)].map(match => match[1]);
      facts.decisions = [...new Set(text.match(/DEC-\d+/g) || [])].sort();
      if (file === 'docs/DECISION_LOG.md') facts.definitions = text.split(/\r?\n/).flatMap((line, index) =>
        line.startsWith('#') ? [...line.matchAll(/DEC-\d+/g)].map(match => ({ id: match[0], line: index + 1, title: line.replace(/^#+\s*/, '') })) : []);
    }
    // Keep product fixture contents out of the graph; only routing/catalog JSON is needed.
    if (file.startsWith('src/MockData/') || file.startsWith('preview-review/')) delete facts.data;
    records[file] = { ...stamp, facts };
  }
  if (records['src/page-registry.json']) {
    const invalidate = engineChanged || changed.some(file => /^(src\/(Views|MockData)\/|src\/(page-registry|site-config)\.json|tools\/lib\/(product|format|site)\.mjs|package-lock\.json)/.test(file))
      || Object.keys(previous).some(file => !current[file] && /^(src\/|tools\/lib\/)/.test(file));
    if (invalidate || !records['src/page-registry.json'].facts.rendered) {
      records['src/page-registry.json'] = { ...records['src/page-registry.json'], facts: {
        ...records['src/page-registry.json'].facts, rendered: await renderPages(root, records) } };
    }
  }
  return { records, changed, removed: Object.keys(previous).filter(file => !current[file]) };
}
