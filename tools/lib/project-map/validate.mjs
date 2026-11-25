import fs from 'node:fs/promises';
import path from 'node:path';
import { snapshot, digest, outputs } from './extract.mjs';
import { browserVendorFiles } from '../browser-vendor.mjs';

export function drift(previous, current) {
  return {
    added: Object.keys(current).filter(file => !previous[file]),
    changed: Object.keys(current).filter(file => previous[file] && previous[file].hash !== current[file].hash),
    removed: Object.keys(previous).filter(file => !current[file])
  };
}
export function validateStructure(graph) {
  const errors = [];
  if (graph.schemaVersion !== 1 || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) return ['Unsupported graph schema.'];
  const ids = new Set();
  for (const node of graph.nodes) {
    if (ids.has(node.id)) errors.push('Duplicate node: ' + node.id);
    ids.add(node.id);
    if (node.path && (node.path.includes('\\') || node.path.startsWith('/') || /^[A-Za-z]:/.test(node.path)
      || node.path.split('/').includes('..'))) errors.push('Unsafe path: ' + node.path);
  }
  for (const edge of graph.edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) errors.push('Unresolved edge endpoint: ' + edge.from);
    if (!['CONFIRMED', 'INFERRED', 'UNKNOWN'].includes(edge.status)) errors.push('Unsupported confidence: ' + edge.status);
    if (!edge.evidence?.path) errors.push('Missing evidence: ' + edge.from);
  }
  const routes = new Set();
  for (const node of graph.nodes.filter(node => node.kind === 'page')) {
    if (routes.has(node.route)) errors.push('Duplicate page route: ' + node.route);
    routes.add(node.route);
  }
  const active = new Set();
  const visited = new Set();
  const dependencies = new Map();
  for (const edge of graph.edges.filter(edge => ['imports', 'extends', 'include', 'import', 'fromimport'].includes(edge.type))) {
    dependencies.set(edge.from, [...(dependencies.get(edge.from) || []), edge.to]);
  }
  function visit(id) {
    if (active.has(id)) { errors.push('Dependency cycle at: ' + id); return; }
    if (visited.has(id)) return;
    visited.add(id); active.add(id);
    for (const target of dependencies.get(id) || []) visit(target);
    active.delete(id);
  }
  for (const id of dependencies.keys()) visit(id);
  return errors;
}
export async function checkGraph(root, graph) {
  const errors = validateStructure(graph);
  const changes = drift(graph.sources, await snapshot(root));
  for (const file of [...new Set(graph.nodes.filter(node => node.path).map(node => node.path))]) {
    const absolute = path.resolve(root, file);
    if (!absolute.startsWith(path.resolve(root) + path.sep)) { errors.push('Escaping path: ' + file); continue; }
    const asset = file.match(/^src\/wwwroot\/vendor\/([\w.-]+)$/)?.[1];
    const source = asset && Object.hasOwn(browserVendorFiles, asset) ? path.join(root, browserVendorFiles[asset]) : absolute;
    try { await fs.access(source); }
    catch { errors.push('Missing referenced file: ' + file); }
  }
  for (const edge of graph.edges) {
    if (!graph.sources[edge.evidence.path]) errors.push('Untracked evidence: ' + edge.evidence.path);
  }
  for (const [file, expected] of Object.entries(graph.outputHashes || {})) {
    try { if (digest(await fs.readFile(path.join(root, file))) !== expected) errors.push('Modified generated guide: ' + file); }
    catch { errors.push('Missing generated guide: ' + file); }
  }
  if (graph.outputHashes && outputs.slice(1).some(file => !graph.outputHashes[file])) errors.push('Missing output fingerprint.');
  return { ok: !errors.length && !Object.values(changes).some(items => items.length), errors, drift: changes,
    nodes: graph.nodes.length, edges: graph.edges.length, recordedGaps: graph.gaps.length };
}
