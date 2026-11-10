import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.join(workspaceRoot, 'dist');
const src = path.join(workspaceRoot, 'src');
const siteConfig = JSON.parse(await fs.readFile(path.join(src, 'site-config.json'), 'utf8').catch(() => '{"basePath":"/"}'));
let basePath = String(siteConfig.basePath || '/').trim();
if (!basePath.startsWith('/')) basePath = '/' + basePath;
basePath = basePath.replace(/\/+$/, '') + '/';
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg',
  '.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'
};
const server = http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.includes('..') || pathname.includes('\\')) { res.writeHead(400); res.end('Bad request'); return; }
    if (!pathname.startsWith('/')) pathname = '/' + pathname;
    if (basePath !== '/') {
      if (pathname === '/') { res.writeHead(302, { Location: `${basePath}_preview/` }); res.end(); return; }
      if (!pathname.startsWith(basePath)) { res.writeHead(404); res.end('Not found'); return; }
      pathname = '/' + pathname.slice(basePath.length);
    }
    let file = path.join(root, pathname.replace(/^\/+/, ''));
    if (pathname.endsWith('/')) file = path.join(file, 'index.html');
    const real = path.resolve(file);
    if (!real.startsWith(root + path.sep) && real !== root) { res.writeHead(403); res.end('Forbidden'); return; }
    const stat = await fs.stat(real);
    if (!stat.isFile()) throw Object.assign(new Error('Not a file'), { code: 'ENOENT' });
    const body = await fs.readFile(real);
    res.writeHead(200, {'Content-Type':mime[path.extname(real).toLowerCase()] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(body);
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' ? 404 : 500, {'Content-Type':'text/plain; charset=utf-8'});
    res.end(error.code === 'ENOENT' ? 'Not found. Run "Rival: Build Static Preview" first.' : 'Preview server error.');
  }
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Rival preview: http://localhost:${port}${basePath}_preview/`);
  console.log(`Public home:   http://localhost:${port}${basePath}`);
});
