import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { root } from './lib/site.mjs';

const build = spawnSync(process.execPath, [path.join(root, 'tools/build-static.mjs')], { cwd: root, stdio: 'inherit' });
if (build.error) { console.error(build.error.message); process.exit(1); }
if (build.status !== 0) process.exit(build.status ?? 1);
await import('./serve-static.mjs');
