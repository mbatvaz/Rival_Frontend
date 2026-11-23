import path from 'node:path';
import { src, readJson, withBase } from './site.mjs';
import { requestAppointments, requestContext } from './customer-requests.mjs';

// Phase 04 build context only. Runtime reads/writes remain behind core/api.js.
export async function customerContext(page, basePath, pages, model) {
  if (['CUS-05', 'CUS-06'].includes(page.id)) return requestContext(basePath, pages, model);
  if (!['CUS-01', 'CUS-03', 'CUS-04'].includes(page.id)) return {};
  const [home, publicHome] = await Promise.all([
    readJson(path.join(src, 'MockData/customer/home.json')),
    readJson(path.join(src, 'MockData/public/home.json'))
  ]);
  const format = value => new Intl.NumberFormat('fa-IR').format(value);
  const { data: swap } = await readJson(path.join(src, 'MockData/customer/appointment-swap.json'));
  const swapAppointments = swap.appointments.map((record, index) => ({
    id: record.id, swap: true, service: 'اصلاح سر و صورت', stylist: 'امیر',
    image: 'img/public/shave.png', avatar: 'img/public/amir.png',
    status: 'booked', statusText: 'رزرو شده', tone: 'ink', icon: 'check-circle',
    countdown: page.id === 'CUS-04' ? home.data.appointments[0].countdown.map(unit => ({ ...unit, value: '۰۰' })) : [],
    weekday: '', day: '', month: '', time: '', distance: 'رزرو شده',
    detail: {
      duration: '۱ ساعت', paidAt: 'پرداخت آزمایشی', amount: '۱۸۰٬۰۰۰', gateway: '۱۸۰٬۰۰۰',
      tracking: '#DEMO-PAY-0' + (index + 1), policy: [
        { title: 'لغو نوبت', entries: [{ icon: 'coins', text: 'در صورت مجاز بودن بازگشت هزینه، مبلغ به پرداخت‌کنندهٔ اولیه برمی‌گردد.' }] },
        { title: 'جابه‌جایی', entries: [{ icon: 'repeat', text: 'سهم جابه‌جایی به همین نوبت تعلق دارد.' }] }
      ]
    }
  }));
  let customerAppointments = [];
  if (page.id === 'CUS-04') {
    const { data } = await readJson(path.join(src, 'MockData/customer/appointments.json'));
    customerAppointments = data.groups.flatMap(group => group.months.flatMap(month => month.items))
      .map(appointment => ({
        ...appointment,
        detail: model.records[appointment.id],
        countdown: home.data.appointments.find(item => item.id === appointment.id)?.countdown ?? []
      }));
    customerAppointments.push(model.conflict, ...swapAppointments);
    const requests = (await readJson(path.join(src, 'MockData/customer/requests.json'))).data;
    const context = await requestContext(basePath, pages, requests);
    customerAppointments.push(...requestAppointments(context.requestRecords));
  }
  const appointment = customerAppointments[0];
  return {
    customerAppointments,
    swapAppointments,
    ...(appointment && {
      bookingDefault: {
        service: { image: appointment.image, name: appointment.service },
        stylist: { image: appointment.avatar, name: appointment.stylist }
      },
      bookingCurrentAppointment: true,
      rescheduleResult: [{
        key: 'success', icon: 'check', tone: 'success', title: 'نوبت جابه‌جا شد',
        description: 'جزئیات زمان تازه نوبت',
        context: { title: appointment.service, subtitle: 'با ' + appointment.stylist,
          image: basePath + appointment.image, avatar: basePath + appointment.avatar },
        lines: [{ label: 'از', field: 'from', previous: true, value: '' }, { label: 'به', field: 'to', value: '' }],
        reference: { label: 'کد پیگیری', value: appointment.id },
        actions: [{ id: 'appointment', label: 'مشاهده نوبت', href: withBase(basePath, page.previewPath) },
          { id: 'home', label: 'بازگشت به خانه', href: withBase(basePath, '/customer/'), secondary: true }]
      }]
    }),
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
