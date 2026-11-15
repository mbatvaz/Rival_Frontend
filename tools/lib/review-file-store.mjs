import fs from 'node:fs/promises';
import path from 'node:path';
import { root } from './site.mjs';
import { parseReview, serializeReview } from '../../preview-review/format.js';
import { toggleApproval } from '../../preview-review/state.js';

export function reviewFileStore(file = path.join(root, 'preview-review/approvals.json')) {
  file = path.resolve(file);
  if (!file.startsWith(root + path.sep)) throw new Error('Review file must stay inside this project.');
  let queue = Promise.resolve();
  const read = async () => {
    try { return parseReview(await fs.readFile(file, 'utf8')); }
    catch (error) { if (error.code === 'ENOENT') return {}; throw error; }
  };
  const update = command => {
    const next = queue.then(async () => {
      const records = await read();
      if (command.type === 'toggle') {
        const feed = JSON.parse(await fs.readFile(path.join(root, 'dist/_preview/revisions.json'), 'utf8'));
        const page = feed.pages.find(page => page.id === command.id);
        if (!page?.implemented || page.revision !== command.revision) {
          throw Object.assign(new Error('نسخه صفحه تغییر کرده؛ صفحه بازبینی را تازه کنید.'), { status: 409 });
        }
        records[command.id] = toggleApproval(page.revision, true, records[command.id], command.action);
      } else if (['merge', 'migrate'].includes(command.type)) {
        let imported;
        try { imported = parseReview(serializeReview(command.records)); }
        catch (error) { throw Object.assign(error, { status: 400 }); }
        for (const [id, record] of Object.entries(imported)) {
          if (command.type === 'merge' || !Object.hasOwn(records, id)) records[id] = record;
        }
      } else throw Object.assign(new Error('درخواست ذخیره معتبر نیست.'), { status: 400 });
      const body = serializeReview(records);
      parseReview(body);
      await fs.mkdir(path.dirname(file), { recursive: true });
      const temporary = file + '.tmp';
      await fs.writeFile(temporary, body + '\n', 'utf8');
      await fs.rename(temporary, file);
      return records;
    });
    queue = next.catch(() => {});
    return next;
  };
  return { read: async () => { await queue; return read(); }, update };
}
