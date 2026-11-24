import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveAnnotation } from '../resolve-annotation.mjs';
import { root } from '../lib/site.mjs';

const route = '/customer/appointments/';
const selector = 'div.rv-appointments-filter__people > label.rv-appointments-filter__person:nth-of-type(1) > span > img';

test('annotation resolves the registered route, relevant partial and image rule', async () => {
  const result = await resolveAnnotation('http://localhost:4173' + route + '?state=filter', selector);
  assert.equal(result.page, 'CUS-03');
  assert.equal(result.route, route);
  assert.match(result.markup.files[0], /Customer\/Appointments\/_Filter\.njk:\d+$/);
  assert.match(result.styles.files[0], /customer-appointments-filter\.css:\d+$/);
  assert.ok(result.styles.files.length <= 4);
});

test('non-specific and unregistered annotations do not generate guesses', async () => {
  assert.deepEqual(await resolveAnnotation('/missing-preview/', selector), { status: 'unknown-route' });
  const result = await resolveAnnotation('/rival-demo' + route + 'index.html', 'section > div > img');
  assert.equal(result.page, 'CUS-03');
  assert.equal(result.status, 'no-distinctive-selector');
});

function hook(prompt) {
  const result = spawnSync(process.execPath, ['tools/annotation-context-hook.mjs'], {
    cwd: root, encoding: 'utf8', input: JSON.stringify({ hook_event_name: 'UserPromptSubmit', prompt })
  });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

test('annotation hook is silent for plain prompts and sends one result for a duplicate target', () => {
  assert.equal(hook('Fix the appointment page'), '');
  const metadata = 'Page URL: http://localhost:4173' + route + '?state=filter\nTarget selector: ' + selector;
  const output = hook('# Browser comments:\n\n## User Comment 1\n' + metadata
    + '\nComment:\nPRIVATE COMMENT\n\n## User Comment 2\n' + metadata + '\nComment:\nDuplicate');
  const { hookSpecificOutput } = JSON.parse(output);
  assert.equal(hookSpecificOutput.hookEventName, 'UserPromptSubmit');
  assert.equal(hookSpecificOutput.additionalContext.match(/CUS-03/g)?.length, 1);
  assert.doesNotMatch(output, /PRIVATE COMMENT|localhost|state=filter|nth-of-type/);
});
