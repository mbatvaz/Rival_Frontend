export const validId = id => /^[A-Z][A-Z0-9-]{1,63}(?:~[a-f0-9]{16})?$/.test(id);

export function parseReview(text) {
  if (text.length > 1024 * 1024) throw new Error('فایل تأییدها بیش از حد بزرگ است.');
  let payload;
  try { payload = JSON.parse(text); }
  catch { throw new Error('اطلاعات تأییدها JSON معتبر نیست.'); }
  if (![1, 2].includes(payload?.schemaVersion) || payload.project !== 'rival-preview-review'
    || !payload.records || typeof payload.records !== 'object' || Array.isArray(payload.records)) {
    throw new Error('این فایل، پشتیبان معتبر تأییدهای ریوال نیست.');
  }
  const entries = Object.entries(payload.records);
  if (entries.length > 500) throw new Error('تعداد تأییدها معتبر نیست.');
  for (const [id, record] of entries) {
    if (!validId(id) || (payload.schemaVersion === 1 && id.includes('~')) || !record || !/^[a-f0-9]{64}$/.test(record.revision)
      || !['mobile', 'desktop', 'final'].every(key => typeof record[key] === 'boolean')
      || (record.final && !(record.mobile && record.desktop))
      || typeof record.updatedAt !== 'string' || !Number.isFinite(Date.parse(record.updatedAt))) {
      throw new Error('یکی از تأییدهای فایل معتبر نیست؛ اطلاعات قبلی تغییر نکرد.');
    }
  }
  return Object.fromEntries(entries.map(([id, record]) => [id, {
    revision: record.revision, mobile: record.mobile, desktop: record.desktop,
    final: record.final, updatedAt: record.updatedAt
  }]));
}

export const serializeReview = records => JSON.stringify({ schemaVersion: 2, project: 'rival-preview-review', records }, null, 2);

