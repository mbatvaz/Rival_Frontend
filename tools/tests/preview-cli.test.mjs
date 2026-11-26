import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { previewOptions } from '../lib/preview-options.mjs';
import { root } from '../lib/site.mjs';

test('Preview arguments override environment and retain defaults/ephemeral ports', () => {
  assert.deepEqual(previewOptions([], {}), { host: '0.0.0.0', port: 4173 });
  assert.deepEqual(previewOptions([], { HOST: '127.0.0.1', PORT: '0' }), { host: '127.0.0.1', port: 0 });
  assert.deepEqual(previewOptions(['--host', 'localhost', '--port=8183'], { HOST: 'other', PORT: '4173' }), { host: 'localhost', port: 8183 });
  for (const port of ['-1', '65536', 'abc', '8.5', '']) assert.throws(() => previewOptions(['--port', port], {}));
  assert.throws(() => previewOptions(['--host', ''], {}));
  assert.throws(() => previewOptions(['--unknown'], {}));
});

test('Dev builds and forwards host/port to a serving child without nested npm', { timeout: 30000 }, async () => {
  const child = spawn(process.execPath, [path.join(root, 'tools/dev.mjs'), '--host', '127.0.0.1', '--port', '0'], {
    cwd: root, env: { ...process.env, PORT: 'invalid', HOST: 'invalid', RIVAL_REVIEW_STORAGE: 'browser' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let output = '';
  try {
    const address = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Preview startup timed out: ' + output)), 20000);
      child.stdout.on('data', chunk => {
        output += chunk;
        const match = output.match(/Rival preview: (http:\/\/127\.0\.0\.1:\d+\/)/);
        if (match) { clearTimeout(timer); resolve(match[1]); }
      });
      child.stderr.on('data', chunk => { output += chunk; });
      child.once('error', error => { clearTimeout(timer); reject(error); });
      child.once('exit', code => { clearTimeout(timer); reject(new Error('Preview exited ' + code + ': ' + output)); });
    });
    const response = await globalThis.fetch(address + 'customer/');
    assert.equal(response.status, 200);
    assert.match(await response.text(), /rv-customer-home/);
    assert.doesNotMatch(output, /Unknown cli config|parsed as a normal command line argument/);
  } finally {
    const closed = new Promise(resolve => child.once('exit', resolve));
    if (child.exitCode === null) { child.kill(); await closed; }
  }
});
