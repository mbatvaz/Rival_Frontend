import { spawn } from 'node:child_process';
import path from 'node:path';
import { root } from './lib/site.mjs';

const subpath = process.argv.includes('--subpath');
const env = {
  ...process.env, RIVAL_REVIEW_STORAGE: 'browser', RIVAL_BASE_PATH: subpath ? '/rival-demo/' : '/',
  PORT: process.env.RIVAL_TEST_PORT ?? (subpath ? '4184' : '4183'), RIVAL_TEST_SERVER_MANAGED: '1'
};
const run = (file, args = [], customEnv = env) => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [path.join(root, file), ...args], {
    cwd: root, env: customEnv, stdio: 'inherit'
  });
  child.once('error', reject);
  child.once('exit', code => resolve(code ?? 1));
});
let server;
let status = 1;
try {
  status = await run('tools/build-static.mjs');
  if (!status) {
    server = spawn(process.execPath, [path.join(root, 'tools/serve-static.mjs')], {
      cwd: root, env, stdio: ['ignore', 'inherit', 'inherit', 'ipc']
    });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Static test server readiness timed out.')), 15000);
      server.once('message', () => { clearTimeout(timer); resolve(); });
      server.once('error', error => { clearTimeout(timer); reject(error); });
      server.once('exit', code => { clearTimeout(timer); reject(new Error('Static test server exited: ' + code)); });
    });
    status = await run('tools/playwright.mjs', ['test', ...process.argv.slice(2).filter(arg => arg !== '--subpath')]);
  }
} finally {
  if (server?.connected) {
    const closed = new Promise(resolve => server.once('exit', resolve));
    server.send('shutdown');
    await closed;
  }
  if (subpath) {
    const restored = await run('tools/build-static.mjs', [], { ...process.env, RIVAL_BASE_PATH: '/' });
    if (restored) status = restored;
  }
}
process.exitCode = status;
