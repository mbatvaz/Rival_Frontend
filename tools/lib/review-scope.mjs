import { URLSearchParams } from 'node:url';

export function resultState(page, query) {
  return new URLSearchParams(query).get('state') || page.resultDefault || {
    'PAY-RES': 'checking', 'STATE-04': 'expired', 'STATE-05': 'review', 'STATE-06': 'lost'
  }[page.id];
}
export function scopedHtml(html, page, query) {
  const state = resultState(page, query);
  if (page.id === 'PUB-02') return selectSections(html,
    /<([\w-]+)\b[^>]*data-rv-portfolio-(empty|loading|error)\b[^>]*>/g, state || 'default');
  if (!state) return html;
  return selectSections(html, /<([\w-]+)\b[^>]*data-rv-result-view="([^"]+)"[^>]*>/g, state)
    .replace(/ data-rv-result-default="[^"]*"/g, '');
}
function selectSections(html, pattern, state) {
  let match;
  let output = '';
  let position = 0;
  while ((match = pattern.exec(html))) {
    output += html.slice(position, match.index);
    const tags = new RegExp('</?' + match[1] + '\\b[^>]*>', 'g');
    tags.lastIndex = pattern.lastIndex;
    let depth = 1;
    let tag;
    while (depth && (tag = tags.exec(html))) depth += tag[0].startsWith('</') ? -1 : 1;
    const end = tags.lastIndex || html.length;
    if (match[2] === state) output += html.slice(match.index, end).replace(/^(<[^>]+) hidden(?=[ >])/, '$1');
    position = pattern.lastIndex = end;
  }
  return output + html.slice(position);
}
export function activeImport(relative, dependency, html, page, query) {
  const kind = html.match(/data-rv-booking-kind="([^"]+)"/)?.[1];
  if (relative.endsWith('/booking/index.js')) {
    const feature = { services: 'choices', stylists: 'choices', fixed: 'time', proposed: 'time', checkout: 'checkout', recurring: 'recurring', result: 'result', external: 'result' }[kind];
    return dependency === './' + feature + '.js';
  }
  if (relative.endsWith('/booking/result.js')) return page.id === 'STATE-07' && (!resultState(page, query) || resultState(page, query) === 'gateway');
  if (dependency.endsWith('/auth-fields.js')) return html.includes('rv-auth-page');
  return true;
}
export function fixtureScope(prefix, query) {
  if (prefix === 'booking/') return null;
  if (prefix.endsWith('/states/') || prefix.endsWith('/profile-states/')) {
    return prefix + (new URLSearchParams(query).get('state') || 'default') + '.json';
  }
  return prefix + '.json';
}
