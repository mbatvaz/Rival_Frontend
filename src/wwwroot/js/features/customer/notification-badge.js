import { api } from '../../core/api.js';
import { faDigits } from '../../core/format.js';

export async function init(bell) {
  const feed = await api.read('customer/notifications').catch(() => null);
  if (!feed) return;
  const unread = feed.data.groups.flatMap(group => group.items).filter(item => item.unread);
  const refresh = async () => {
    const read = new Set(await api.notifications.readStatus().catch(() => []));
    const count = unread.filter(item => !read.has(item.id)).length;
    bell.setAttribute('aria-label', count ? `اعلان‌ها، ${faDigits(count)} خوانده‌نشده` : 'اعلان‌ها');
    bell.lastElementChild.hidden = !count;
  };
  api.notifications.observe(refresh);
  await refresh();
}
