import { parseReview, projectStorage, readReview, serializeReview, writeReview } from './storage.js';

export function initBackup(onSaved, notify) {
  document.querySelector('[data-rv-export]').addEventListener('click', async () => {
    try {
      const file = new window.Blob([serializeReview(await readReview())], { type: 'application/json' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'rival-preview-approvals.json';
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify('فایل پشتیبان تأییدها دریافت شد.');
    } catch (error) { notify(error.message, true); }
  });
  const input = document.querySelector('[data-rv-import]');
  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    try {
      if (file.size > 1024 * 1024) throw new Error('فایل پشتیبان بیش از حد بزرگ است.');
      const imported = parseReview(await file.text());
      let previous;
      try { previous = await readReview(); }
      catch { previous = {}; }
      const merged = { ...previous, ...imported };
      onSaved(await writeReview(projectStorage() ? imported : merged));
      notify('پشتیبان بازیابی شد؛ تأییدهای نسخه‌های قدیمی همچنان نیازمند بازبینی‌اند.');
    } catch (error) { notify(error.message, true); }
    finally { input.value = ''; }
  });
}
