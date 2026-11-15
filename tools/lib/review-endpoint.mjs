import { reviewFileStore } from './review-file-store.mjs';
import { serializeReview } from '../../preview-review/format.js';

export function reviewEndpoint() {
  const disabled = process.env.RIVAL_REVIEW_STORAGE === 'browser';
  const store = disabled ? null : reviewFileStore(process.env.RIVAL_REVIEW_FILE);
  return async (req, res, pathname) => {
    if (pathname !== '/_preview/approvals.json') return false;
    const send = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
        'X-Rival-Review-Storage': disabled ? 'browser' : 'project' });
      res.end(req.method === 'HEAD' ? undefined : body);
    };
    try {
      if (['GET', 'HEAD'].includes(req.method)) {
        send(200, serializeReview(disabled ? {} : await store.read()));
      } else if (req.method === 'POST' && !disabled) {
        if (req.headers['x-rival-review'] !== '1' || !req.headers['content-type']?.startsWith('application/json')
          || (req.headers.origin && req.headers.origin !== 'http://' + req.headers.host)
          || req.headers['sec-fetch-site'] === 'cross-site') {
          send(403, JSON.stringify({ error: 'درخواست ذخیره از این مبدأ مجاز نیست.' }));
          return true;
        }
        let size = 0;
        const chunks = [];
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 1024 * 1024) throw Object.assign(new Error('اطلاعات بیش از حد بزرگ است.'), { status: 413 });
          chunks.push(chunk);
        }
        let command;
        try { command = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
        catch { throw Object.assign(new Error('اطلاعات JSON معتبر نیست.'), { status: 400 }); }
        if (!command || typeof command !== 'object') throw Object.assign(new Error('درخواست معتبر نیست.'), { status: 400 });
        send(200, serializeReview(await store.update(command)));
      } else {
        res.setHeader('Allow', disabled ? 'GET, HEAD' : 'GET, HEAD, POST');
        send(405, JSON.stringify({ error: 'این روش ذخیره پشتیبانی نمی‌شود.' }));
      }
    } catch (error) {
      send(error.status ?? 500, JSON.stringify({ error: error.status ? error.message : 'تأیید ذخیره نشد؛ فایل بازبینی در دسترس نیست.' }));
    }
    return true;
  };
}
