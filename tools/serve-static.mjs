import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { root as workspaceRoot, loadSite } from './lib/site.mjs';
import { reviewEndpoint } from './lib/review-endpoint.mjs';

const root = path.join(workspaceRoot, 'dist');
const { basePath } = await loadSite();
const port = Number(process.env.PORT || 4173);
const handleReview = reviewEndpoint();
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8'
};
const server = http.createServer(async (req, res) => {
  const respond = (status, message) => {
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : message);
  };
  try {
    const url = new URL(req.url || '/', 'http://127.0.0.1');
    let pathname;
    try { pathname = decodeURIComponent(url.pathname); }
    catch { respond(400, 'Bad request'); return; }
    if (pathname.includes('..') || pathname.includes('\\') || pathname.includes('\0')) {
      respond(400, 'Bad request'); return;
    }
    if (basePath !== '/') {
      if (pathname === basePath.slice(0, -1)) {
        res.writeHead(302, { Location: basePath + url.search }); res.end(); return;
      }
      if (!pathname.startsWith(basePath)) { respond(404, 'Not found'); return; }
      pathname = '/' + pathname.slice(basePath.length);
    }
    if (await handleReview(req, res, pathname)) return;
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.setHeader('Allow', 'GET, HEAD');
      respond(405, 'Static preview supports GET and HEAD only.');
      return;
    }
    let file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) { respond(403, 'Forbidden'); return; }
    if (pathname.split('/').some(part => part.startsWith('.') && part.length > 1)) {
      respond(404, 'Not found'); return;
    }
    const stat = await fs.stat(file);
    if (stat.isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(301, { Location: basePath.replace(/\/$/, '') + pathname + '/' + url.search });
        res.end(); return;
      }
      file = path.join(file, 'index.html');
    }
    const body = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    respond(['ENOENT', 'ENOTDIR'].includes(error.code) ? 404 : 500, 'Static file unavailable.');
  }
});
server.on('error', error => { console.error(error.message); process.exit(1); });
function shutdown() {
  server.close(() => process.exit(0));
  server.closeAllConnections();
}
process.on('message', message => { if (message === 'shutdown') shutdown(); });
process.on('disconnect', shutdown);
server.listen(port, '0.0.0.0', () => {
  const listeningPort = server.address().port;
  console.log('Rival preview: http://localhost:' + listeningPort + basePath + '_preview/');
  process.send?.({ ready: true, port: listeningPort });
});
