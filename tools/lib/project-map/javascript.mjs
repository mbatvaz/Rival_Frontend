import path from 'node:path';
import { Linter } from 'eslint';

const normalize = value => value.replaceAll('\\', '/');
export function javascriptFacts(text, file) {
  const facts = { links: [], features: [], literals: [], gaps: [] };
  const link = (node, value, detail) => {
    if (typeof value !== 'string') { facts.gaps.push({ line: node.loc?.start.line, reason: 'Nonliteral module reference.' }); return; }
    if (value.startsWith('.')) facts.links.push({ type: 'imports',
      target: normalize(path.posix.normalize(path.posix.join(path.posix.dirname(file), value))),
      line: node.loc.start.line, detail });
  };
  const rule = { create() { return {
    ImportDeclaration: node => link(node, node.source.value, 'Static ES module reference.'),
    ExportNamedDeclaration: node => { if (node.source) link(node, node.source.value, 'Re-export.'); },
    ExportAllDeclaration: node => link(node, node.source.value, 'Re-export.'),
    ImportExpression: node => link(node, node.source.value, 'Dynamic import declaration; execution not proven.'),
    Literal(node) {
      if (file.startsWith('tests/') && typeof node.value === 'string' && /\/|^[A-Z]+-/.test(node.value)) {
        facts.literals.push({ value: node.value, line: node.loc.start.line });
      }
    },
    TemplateElement(node) {
      if (file.startsWith('tests/') && node.value.cooked?.includes('/')) facts.literals.push({ value: node.value.cooked, line: node.loc.start.line });
    },
    CallExpression(node) {
      const args = node.arguments;
      if (node.callee.name === 'registerFeature' && typeof args[0]?.value === 'string') {
        const target = args[1]?.body?.source?.value;
        if (typeof target === 'string') facts.features.push({ name: args[0].value,
          target: normalize(path.posix.join(path.posix.dirname(file), target)), line: node.loc.start.line });
      }
      if (node.callee.type === 'MemberExpression' && node.callee.object.name === 'api' && node.callee.property.name === 'read') {
        if (typeof args[0]?.value === 'string') facts.links.push({ type: 'reads-mock-data',
          target: 'src/MockData/' + args[0].value + '.json', line: node.loc.start.line,
          detail: 'Default fixture candidate; state options can select another file.', status: 'INFERRED' });
        else facts.gaps.push({ line: node.loc.start.line, reason: 'Dynamic api.read resource.' });
      }
    }
  }; } };
  const messages = new Linter().verify(text, { plugins: { map: { rules: { collect: rule } } },
    rules: { 'map/collect': 'error' }, languageOptions: { ecmaVersion: 'latest', sourceType: 'module' } });
  if (messages.some(item => item.fatal)) throw new Error(messages.filter(item => item.fatal).map(item => item.message).join('; '));
  return facts;
}
