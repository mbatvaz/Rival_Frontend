import { withBase } from './site.mjs';

export function validateRegistry(registry) {
  const ids = new Set();
  const routes = new Set();
  for (const page of registry.pages) {
    if (ids.has(page.id) || routes.has(page.previewPath)) throw new Error(`Duplicate entry: ${page.id}`);
    if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(page.previewPath)) throw new Error(`Unsafe preview path: ${page.previewPath}`);
    if (/^\/admin\/(reports|wallets?|announcements|transactions)(\/|$)/.test(page.previewPath)) {
      throw new Error(`Removed product route: ${page.previewPath}`);
    }
    if (['DS', 'RULE', 'ARCH'].includes(page.id)) throw new Error('Infrastructure IDs are not pages.');
    ids.add(page.id);
    routes.add(page.previewPath);
  }
}
export function directoryModel(registry, basePath) {
  const groups = new Map();
  const labels = {
    Public: 'عمومی', All: 'ورود و حساب کاربری', 'New user': 'تکمیل حساب کاربری',
    Customer: 'مشتری و رزرو', 'Stylist/OwnerAdmin scope=me': 'فضای کاری آرایشگر',
    Stylist: 'آرایشگر', OwnerAdmin: 'مدیریت سالن', Shared: 'حالت‌ها و الگوهای مشترک'
  };
  for (const page of registry.pages) {
    const name = labels[page.role] ?? 'حالت‌ها و الگوهای مشترک';
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push({
      ...page, href: withBase(basePath, page.previewPath),
      phaseNumber: Number(page.phase.replace('Phase ', '')),
      implementationLabel: page.template ? 'قالب موجود؛ نیازمند تأیید فاز' : 'هنوز پیاده‌سازی نشده'
    });
  }
  return { count: registry.pages.length, groups: [...groups].map(([name, pages]) => ({ name, pages })) };
}
