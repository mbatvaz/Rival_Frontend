import assert from 'node:assert/strict';
import test from 'node:test';
import { planImpact } from '../lib/qa-impact.mjs';

const local = 'src/wwwroot/css/04-pages/page.css';
const shared = 'src/wwwroot/css/04-pages/filter.css';
const fixture = 'src/MockData/feature.json';
const view = 'src/Views/Shared/_Feature.njk';
const authSpec = 'tests/phase02/auth.spec.mjs';
const featureSpec = 'tests/phase07/feature.spec.mjs';
const graph = {
  sources: {
    [local]: { facts: { anchors: [['.rv-auth', '.rv-filter']], links: [] } },
    [shared]: { facts: { anchors: [['.rv-filter']], links: [] } },
    'src/page-registry.json': { facts: { rendered: {
      'AUTH-01': { classes: ['rv-auth', 'rv-filter'] }, 'STY-01': { classes: ['rv-filter'] }
    } } }
  },
  edges: [
    { from: 'page:AUTH-01', to: authSpec, type: 'tested-by' },
    { from: 'page:STY-01', to: featureSpec, type: 'tested-by' },
    { from: 'page:STY-01', to: view, type: 'uses-component' },
    { from: 'page:STY-01', to: fixture, type: 'reads-mock-data' }
  ]
};

test('element scope requires a single matching page and CSS ownership', () => {
  const element = { element: true, page: 'AUTH-01' };
  assert.equal(planImpact([local], [graph], element).level, 'element');
  assert.equal(planImpact([local], [graph], { ...element, page: 'STY-01' }).level, 'page');
  const plan = planImpact([local, shared], [graph], element);
  assert.equal(plan.level, 'shared');
  assert.deepEqual(plan.specs, [authSpec, featureSpec]);
  assert.equal(plan.subpath, false);
});

test('source dependencies are deduplicated and exercise both bases across phases', () => {
  const plan = planImpact([view, fixture, featureSpec], [graph]);
  assert.deepEqual(plan.pages, ['STY-01']);
  assert.deepEqual(plan.specs, [featureSpec]);
  assert.equal(plan.subpath, true);
});

test('unknown owners and global changes widen scope while docs stay static', () => {
  assert.equal(planImpact(['src/Views/Unknown.njk'], [graph]).level, 'full');
  assert.equal(planImpact(['src/wwwroot/js/core/api.js'], [graph]).subpath, true);
  assert.equal(planImpact(['docs/PHASE_PLAN.md'], []).level, 'static');
  assert.equal(planImpact(['docs/PHASE_PLAN.md'], [], { full: true }).level, 'full');
  assert.equal(planImpact(['tools/lib/qa-impact.mjs'], []).tools, true);
});

test('appearance-only checks can cover shared styles without a graph or suite', () => {
  const options = { cosmetic: true, page: 'AUTH-01' };
  const plan = planImpact([shared], [], options);
  assert.equal(plan.level, 'cosmetic');
  assert.deepEqual(plan.pages, ['AUTH-01']);
  assert.deepEqual(plan.specs, []);
  assert.throws(() => planImpact(['src/wwwroot/css/app.css'], [], options), /component or page stylesheets/);
  assert.throws(() => planImpact([shared], [], { ...options, subpath: true }), /root-only/);
  assert.throws(() => planImpact([shared, view], [], options), /component or page stylesheets/);
});
