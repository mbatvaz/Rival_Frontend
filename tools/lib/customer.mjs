import path from 'node:path';
import { src, readJson, withBase } from './site.mjs';

// Phase 04 build context only. Runtime reads/writes remain behind core/api.js.
export async function customerContext(page, basePath, pages, model) {
  if (!['CUS-01', 'CUS-03', 'CUS-04'].includes(page.id)) return {};
  const [home, publicHome] = await Promise.all([
    readJson(path.join(src, 'MockData/customer/home.json')),
    readJson(path.join(src, 'MockData/public/home.json'))
  ]);
  const format = value => new Intl.NumberFormat('fa-IR').format(value);
  let customerAppointments = [];
  if (page.id === 'CUS-04') {
    const { data } = await readJson(path.join(src, 'MockData/customer/appointments.json'));
    customerAppointments = data.groups.flatMap(group => group.months.flatMap(month => month.items))
      .map(appointment => ({
        ...appointment,
        detail: model.records[appointment.id],
        countdown: home.data.appointments.find(item => item.id === appointment.id)?.countdown ?? []
      }));
  }
  return {
    customerAppointments,
    detailHero: page.id === 'CUS-04',
    customerUrls: {
      ...Object.fromEntries(pages.filter(item => item.id.startsWith('CUS-')).map(item => [item.id, withBase(basePath, item.previewPath)])),
      recurring: withBase(basePath, '/_preview/context/bk-rec01/')
    },
    customerMapUrl: publicHome.data.links.map,
    customerBalance: format(home.data.balance),
    customerPayments: home.data.payments.map(payment => ({ ...payment, amountText: format(payment.amount) }))
  };
}
