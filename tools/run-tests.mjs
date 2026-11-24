import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { stripVTControlCharacters } from 'node:util';
import { root } from './lib/site.mjs';

const subpath = process.argv.includes('--subpath');
const compact = process.argv.includes('--agent');
const keepOutput = process.argv.includes('--keep-output');
const probeIndex = process.argv.indexOf('--probe', 2);
const probeOnly = process.argv.includes('--probe-only');
const probe = probeIndex === -1 ? null : process.argv[probeIndex + 1];
const testArgs = process.argv.slice(2).filter((arg, index) => !['--subpath', '--agent', '--keep-output', '--probe-only'].includes(arg)
  && (probeIndex === -1 || ![probeIndex - 2, probeIndex - 1].includes(index)));
if ((probeOnly || probeIndex !== -1) && !probe) throw new Error('Browser probe configuration missing.');
const env = {
  ...process.env, RIVAL_REVIEW_STORAGE: 'browser', RIVAL_BASE_PATH: subpath ? '/rival-demo/' : '/',
  PORT: process.env.RIVAL_TEST_PORT ?? (subpath ? '4184' : '4183'), RIVAL_TEST_SERVER_MANAGED: '1',
  ...(compact ? { HOST: '127.0.0.1', RIVAL_TEST_PREFLIGHT: probe ? '0' : '1' } : {})
};
const logPath = 'test-results/agent-' + process.pid + '.log';
const logFile = path.join(root, logPath);
if (compact) await fs.mkdir(path.dirname(logFile), { recursive: true });
const log = compact ? await fs.open(logFile, 'w') : null;
const stdio = log ? ['ignore', log.fd, log.fd] : 'inherit';
const serverStdio = ['ignore', log?.fd ?? 'inherit', log?.fd ?? 'inherit', 'ipc'];
const run = (file, args = [], customEnv = env) => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [path.join(root, file), ...args], {
    cwd: root, env: customEnv, stdio
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
      cwd: root, env, stdio: serverStdio
    });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Static test server readiness timed out.')), 15000);
      server.once('message', () => { clearTimeout(timer); resolve(); });
      server.once('error', error => { clearTimeout(timer); reject(error); });
      server.once('exit', code => { clearTimeout(timer); reject(new Error('Static test server exited: ' + code)); });
    });
    if (probe) status = await run('tools/qa-probe.mjs', [probe], {
      ...env, PLAYWRIGHT_BROWSERS_PATH: path.join(root, '.playwright-browsers')
    });
    if (!status && !probeOnly) status = await run('tools/playwright.mjs', ['test', ...testArgs]);
  }
} catch (error) {
  status = 1;
  console.error(error.message);
} finally {
  if (server?.connected) {
    const closed = new Promise(resolve => server.once('exit', resolve));
    server.send('shutdown');
    await closed;
  }
  if (subpath && !keepOutput) {
    const restored = await run('tools/build-static.mjs', [], { ...process.env, RIVAL_BASE_PATH: '/' });
    if (restored) status = restored;
  }
  if (log) await log.close();
}
if (compact) {
  const details = stripVTControlCharacters(await fs.readFile(logFile, 'utf8'));
  const highlights = details.split(/\r?\n/).map(line => line.trim())
    .filter(line => /^(?:Probe:|Error:|listen |\d+ (?:passed|failed|skipped|did not run))/.test(line));
  for (const line of [...new Set(highlights)].slice(0, 4)) console.log(line.slice(0, 360));
  console.log((status ? 'Checks failed' : 'Checks passed') + '. Full log: ' + logPath);
}
process.exitCode = status;
