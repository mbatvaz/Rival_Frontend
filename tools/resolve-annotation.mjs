import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { inside, loadSite, readJson, root, src, matchPreviewRoute } from './lib/site.mjs';
import { templateFacts } from './lib/project-map/templates.mjs';

const viewRoot = 'src/Views/';
const cssRoot = 'src/wwwroot/css/';
const escapeRegExp = value => value.replace(/[.*+?^$\x7b\x7d()|[\]\\]/g, '\\$&');
const stripComments = (source, pattern) => source.replace(pattern, comment => comment.replace(/[^\r\n]/g, ' '));

async function collect(start, directory, dependencies) {
  const files = new Map();
  const directoryPath = path.resolve(root, directory);
  let pending = [start];
  while (pending.length) {
    const batch = [...new Set(pending)].filter(file => file.startsWith(directory) && !files.has(file));
    const entries = await Promise.all(batch.map(async file => {
      const source = await fs.readFile(inside(directoryPath, file.slice(directory.length)), 'utf8');
      return dependencies(file, source);
    }));
    pending = [];
    for (const [index, { text, references }] of entries.entries()) {
      files.set(batch[index], text);
      pending.push(...references);
    }
  }
  return files;
}

function templateDependencies(file, source) {
  return {
    text: stripComments(source, /\{#[\s\S]*?#\}|<!--[\s\S]*?-->/g),
    references: templateFacts(source, file).links.map(link => link.target)
  };
}

function styleDependencies(file, source) {
  const text = stripComments(source, /\/\*[\s\S]*?\*\//g);
  const references = [...text.matchAll(/@import\s+(?:url\(\s*)?["'](\.[^"']+\.css)["']/g)]
    .map(match => path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1])));
  return { text, references };
}

function sourcePattern(hook, template) {
  const name = escapeRegExp(hook.slice(1));
  if (hook.startsWith('[')) return new RegExp('(?<![\\w-])' + name + '(?![\\w-])');
  const css = new RegExp('\\' + hook[0] + name + '(?![\\w-])');
  if (!template) return css;
  if (hook.startsWith('#')) return new RegExp('\\bid\\s*=\\s*["\']' + name + '["\']');
  return new RegExp('\\bclass\\s*=\\s*(?:"[^"]*(?<![\\w-])' + name + '(?![\\w-])|\'[^\']*(?<![\\w-])' + name + '(?![\\w-]))');
}

function candidates(files, hooks, tag, template) {
  const tagPattern = tag && new RegExp(template ? '<' + tag + '\\b' : '(?<![\\w.#-])' + tag + '\\b');
  for (const hook of hooks) {
    const pattern = sourcePattern(hook, template);
    const matches = [];
    for (const [file, text] of files) {
      const lines = text.split(/\r?\n/);
      const first = lines.findIndex(line => pattern.test(line));
      if (first === -1) continue;
      const specific = tagPattern ? lines.findIndex(line => pattern.test(line) && tagPattern.test(line)) : -1;
      matches.push({ file, line: (specific === -1 ? first : specific) + 1, specific: specific !== -1 });
    }
    if (matches.length) return {
      hook: hook.startsWith('[') ? hook + ']' : hook, count: matches.length,
      files: matches.sort((a, b) => Number(b.specific) - Number(a.specific)).slice(0, 4).map(({ file, line }) => file + ':' + line)
    };
  }
  return null;
}

export async function resolveAnnotation(input, selector) {
  const [{ pages }, { basePath }] = await Promise.all([readJson(path.join(src, 'page-registry.json')), loadSite()]);
  const { page } = matchPreviewRoute(pages, input, basePath);
  if (!page) return { status: 'unknown-route' };
  if (!page.template) return { status: 'placeholder', page: page.id, route: page.previewPath };
  const result = { status: 'candidates', page: page.id, route: page.previewPath, entry: viewRoot + page.template };
  const hooks = [...new Set((selector.replace(/\[(data-rv-[\w-]+)[^\]]*\]/g, '[$1]')
    .replace(/\[[^[\]]*\]/g, value => value.startsWith('[data-rv-') ? value : '')
    .match(/[#.][\w-]+|\[data-rv-[\w-]+/g) ?? []).reverse())];
  if (!hooks.length) return { ...result, status: 'no-distinctive-selector' };
  const tag = selector.match(/(?:^|[>\s])([a-z][\w-]*)$/i)?.[1];
  const [templates, styles] = await Promise.all([
    collect(result.entry, viewRoot, templateDependencies),
    collect(cssRoot + 'app.css', cssRoot, styleDependencies)
  ]);
  result.markup = candidates(templates, hooks, tag, true);
  result.styles = candidates(styles, hooks, tag, false);
  if (!result.markup && !result.styles) result.status = 'no-source-match';
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const [url, selector] = process.argv.slice(2);
    if (!url || !selector) throw new Error('Usage: node tools/resolve-annotation.mjs "<URL>" "<selector>"');
    console.log(JSON.stringify(await resolveAnnotation(url, selector)));
  } catch (error) {
    console.error('Annotation lookup: ' + error.message);
    process.exitCode = 1;
  }
}
