import path from 'node:path';
import { src, readJson, withBase } from './site.mjs';

// Phase 04 build context only. Runtime reads/writes remain behind core/api.js.
export async function customerContext(page, basePath, pages) {
  if (!['CUS-01', 'CUS-03'].includes(page.id)) return {};
  const [home, publicHome] = await Promise.all([
    readJson(path.join(src, 'MockData/customer/home.json')),
    readJson(path.join(src, 'MockData/public/home.json'))
  ]);
  const format = value => new Intl.NumberFormat('fa-IR').format(value);
  return {
    customerUrls: {
      ...Object.fromEntries(pages.filter(item => item.id.startsWith('CUS-')).map(item => [item.id, withBase(basePath, item.previewPath)])),
      recurring: withBase(basePath, '/_preview/context/bk-rec01/')
    },
    customerMapUrl: publicHome.data.links.map,
    customerBalance: format(home.data.balance),
    customerPayments: home.data.payments.map(payment => ({ ...payment, amountText: format(payment.amount) }))
  };
}
