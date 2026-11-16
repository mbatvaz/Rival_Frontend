import { catalog } from './catalog.mjs';
import path from 'node:path';
import { activeImport } from '../review-scope.mjs';

export function buildGraph(records) {
  const nodes = new Map();
  const edges = new Map();
  const gaps = [];
  const addNode = node => nodes.set(node.id, { ...nodes.get(node.id), ...node });
  const ensure = id => {
    if (!nodes.has(id)) addNode(id.startsWith('token:') ? { id, kind: 'variable', label: id.slice(6) }
      : id.startsWith('feature:') ? { id, kind: 'feature', label: id.slice(8) } : { id, kind: 'file', path: id, label: id });
  };
  const addEdge = (from, to, type, source, status = 'CONFIRMED', detail = 'Explicit source declaration.', line) => {
    ensure(from); ensure(to);
    const edge = { from, to, type, status, evidence: { path: source, ...(line ? { line } : {}), detail } };
    edges.set([from, to, type, source, line || ''].join('|'), edge);
  };
  for (const [file, record] of Object.entries(records)) {
    const authority = ['AGENTS.md', 'docs/RIVAL_PROJECT_CONTRACT.md', 'docs/DECISION_LOG.md', 'docs/OPEN_QUESTIONS.md'];
    addNode({ id: file, kind: file.endsWith('/SKILL.md') ? 'skill' : file.endsWith('.njk') ? 'template' : 'file',
      path: file, label: file, bytes: record.bytes,
      knowledge: authority.includes(file) ? 'authoritative' : /\/00-tokens\/|docs\/ai\//.test(file) ? 'derived-or-supporting'
        : file.startsWith('docs-work/desktop-layouts/') ? 'brief-review-required' : file.endsWith('.md') ? 'supporting-check-currentness' : 'implementation',
      ...(file.endsWith('.njk') ? { aliases: [file.split('/').at(-1).replace(/^_/, '').replace(/\.njk$/, '')] } : {}) });
    for (const gap of record.facts.gaps || []) gaps.push({ source: file, ...gap });
    for (const link of record.facts.links || []) addEdge(file, link.target, link.type, file, link.status, link.detail, link.line);
    for (const feature of record.facts.features || []) {
      if (typeof feature === 'string') addEdge(file, 'feature:' + feature, 'binds-feature', file);
      else {
        addEdge(file, 'feature:' + feature.name, 'registers-feature', file, 'CONFIRMED', 'Literal lazy feature registration.', feature.line);
        addEdge('feature:' + feature.name, feature.target, 'loads-module', file, 'CONFIRMED', 'Registered loader; runtime activation is conditional.', feature.line);
      }
    }
  }
  catalog(records, addNode, addEdge, gaps);
  // A class match identifies possible style consumers, never runtime cascade winners.
  const styles = Object.entries(records).filter(([file]) => file.endsWith('.css'));
  for (const [file, record] of Object.entries(records).filter(([file]) => file.endsWith('.njk'))) {
    const classes = new Set(record.facts.classes);
    for (const [style, entry] of styles) {
      const shared = entry.facts.classes?.filter(name => classes.has(name));
      if (shared?.length) addEdge(file, style, 'uses-style', file, 'INFERRED', 'Static class intersection: ' + shared.slice(0, 4).join(', '));
    }
  }
  return { schemaVersion: 1, sources: records,
    nodes: [...nodes.values()].sort((a, b) => a.id.localeCompare(b.id, 'en')),
    edges: [...edges.values()].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b), 'en')),
    gaps: gaps.map(gap => ({ ...gap, status: 'UNKNOWN' })).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b), 'en')) };
}
const traversal = new Set(['renders', 'uses-component', 'extends', 'include', 'import', 'fromimport', 'binds-feature', 'loads-module',
  'imports', 'uses-style', 'reads-mock-data', 'uses-token']);
export function queryGraph(graph, term, limit = 20) {
  const matches = graph.nodes.filter(node => node.id === term || node.label === term || node.path === term || node.aliases?.includes(term));
  if (!matches.length) return { query: term, matches: [], warning: 'No exact match. Use Page ID, repository-relative path, feature:name or --token.' };
  const selected = new Set(matches.map(node => node.id));
  const page = matches.find(node => node.kind === 'page');
  const rendered = page?.renderedTemplates;
  const seen = new Set(selected);
  let frontier = [...selected];
  // Reverse only within the relevant dependency domain, not through every global JS/CSS root.
  const reverse = !matches.some(node => node.kind === 'page');
  const reverseTypes = new Set([...traversal, 'references-design', 'references-brief', 'tested-by']);
  const links = new Map();
  for (let depth = 0; frontier.length && depth < 10; depth++) {
    const next = [];
    for (const id of frontier) {
      for (const edge of graph.edges) {
        const outgoing = edge.from === id;
        const incoming = reverse && edge.to === id;
        if (!outgoing && !incoming) continue;
        const other = outgoing ? edge.to : edge.from;
        if (outgoing && rendered && ['extends', 'include', 'import', 'fromimport'].includes(edge.type) && !rendered.includes(other)) continue;
        if (outgoing && page?.renderedKind && edge.type === 'imports' && edge.evidence.detail.startsWith('Dynamic import')) {
          const dependency = './' + path.posix.relative(path.posix.dirname(edge.from), edge.to);
          if (!activeImport(edge.from, dependency, 'data-rv-booking-kind="' + page.renderedKind + '"', { id: page.label, resultDefault: page.resultDefault }, '')) continue;
        }
        links.set(JSON.stringify(edge), edge);
        const directionAllowed = reverse ? incoming : outgoing;
        const globalStyleImport = reverse && edge.type === 'imports' && edge.to.endsWith('.css');
        if (directionAllowed && (reverse ? reverseTypes : traversal).has(edge.type) && !globalStyleImport && !seen.has(other)) { seen.add(other); next.push(other); }
      }
    }
    frontier = next;
  }
  const all = [...links.values()];
  all.sort((a, b) => Number(!selected.has(a.from) && !selected.has(a.to)) - Number(!selected.has(b.from) && !selected.has(b.to)));
  const pageIds = graph.nodes.filter(node => node.kind === 'page' && seen.has(node.id)).map(node => node.label).sort();
  const renderedPages = graph.edges.filter(edge => edge.type === 'uses-component' && selected.has(edge.to))
    .map(edge => edge.from.slice(5)).sort();
  const relevant = graph.nodes.filter(node => seen.has(node.id));
  const navigation = {
    templates: relevant.filter(node => node.kind === 'template').map(node => node.id),
    modules: relevant.filter(node => node.path?.match(/\.(?:js|mjs)$/)).map(node => node.id),
    styles: relevant.filter(node => node.path?.endsWith('.css')).map(node => node.id),
    fixtures: relevant.filter(node => node.path?.startsWith('src/MockData/')).map(node => node.id),
    direct: graph.edges.filter(edge => selected.has(edge.from) && !traversal.has(edge.type)).map(edge => ({ type: edge.type, target: edge.to, status: edge.status }))
  };
  return { query: term, matches, possiblePages: pageIds, renderedPages, totalEdges: all.length, truncated: all.length > limit,
    navigation, edges: all.slice(0, limit), gaps: graph.gaps.filter(gap => seen.has(gap.source)).slice(0, 12) };
}
