import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { root } from './lib/site.mjs';

const env = {
  ...process.env,
  PLAYWRIGHT_BROWSERS_PATH: path.join(root, '.playwright-browsers')
};
const result = spawnSync(process.execPath, [path.join(root, 'node_modules/@playwright/test/cli.js'), ...process.argv.slice(2)], {
  cwd: root, env, stdio: 'inherit'
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
