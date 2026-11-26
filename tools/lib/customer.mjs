import path from 'node:path';
import { URLSearchParams } from 'node:url';
import { src, readJson, withBase } from './site.mjs';
import { requestAppointments, requestContext } from './customer-requests.mjs';

const fixture = async name => (await readJson(path.join(src, 'MockData', name + '.json'))).data;
const amount = new Intl.NumberFormat('fa-IR');

function swapCards({ appointments }, countdown = []) {
  return appointments.map((record, index) => ({
    id: record.id, swap: true, service: 'اصلاح سر و صورت', stylist: 'امیر',
    image: 'img/public/shave.png', avatar: 'img/public/amir.png',
    status: 'booked', statusText: 'رزرو شده', tone: 'ink', icon: 'check-circle', countdown,
    weekday: '', day: '', month: '', time: '', distance: 'رزرو شده',
    detail: {
      duration: '۱ ساعت', paidAt: 'پرداخت آزمایشی', amount: '۱۸۰٬۰۰۰', gateway: '۱۸۰٬۰۰۰',
      tracking: '#DEMO-PAY-0' + (index + 1), policy: [
        { title: 'لغو نوبت', entries: [{ icon: 'coins', text: 'در صورت مجاز بودن بازگشت هزینه، مبلغ به پرداخت‌کنندهٔ اولیه برمی‌گردد.' }] },
        { title: 'جابه‌جایی', entries: [{ icon: 'repeat', text: 'سهم جابه‌جایی به همین نوبت تعلق دارد.' }] }
      ]
    }
  }));
}

// Phase 04 build context only. Runtime reads/writes remain behind core/api.js.
export async function customerContext(page, basePath, customerUrls, model) {
  if (['CUS-05', 'CUS-06'].includes(page.id)) return requestContext(model);
  if (page.id === 'CUS-09') {
    let index = 0;
    const notificationGroups = model.groups.map(group => ({
      ...group,
      items: group.items.map(item => ({ ...item, initial: index++ < model.pageSize,
        href: item.target ? customerUrls[item.target.page] + '?' + new URLSearchParams(item.target.params) : '' }))
    }));
    return { notificationGroups, notificationTotal: index,
      notificationUnread: model.groups.flatMap(group => group.items).filter(item => item.unread).length };
  }
  if (page.id === 'CUS-08') {
    const catalog = await fixture('booking/catalog');
    const history = model.history.map(item => ({
      ...item, service: catalog.services.find(service => service.id === item.service),
      stylist: catalog.stylists.find(stylist => stylist.id === item.stylist)
    }));
    return {
      alertServices: ['face-hair', 'hair', 'beard-color', 'facial'].map(id => catalog.services.find(service => service.id === id)),
      alertStylists: catalog.stylists,
      alertHistory: history
    };
  }
  if (page.id === 'CUS-03') return { swapAppointments: swapCards(await fixture('customer/appointment-swap')) };
  if (!['CUS-01', 'CUS-04'].includes(page.id)) return {};
  const [home, publicHome, swap] = await Promise.all([
    fixture('customer/home'), fixture('public/home'), fixture('customer/appointment-swap')
  ]);
  const customerMapUrl = publicHome.links.map;
  if (page.id === 'CUS-01') return {
    swapAppointments: swapCards(swap),
    customerMapUrl,
    customerBalance: amount.format(home.balance),
    customerPayments: home.payments.map(payment => ({ ...payment, amountText: amount.format(payment.amount) }))
  };
  const swapAppointments = swapCards(swap, home.appointments[0].countdown.map(unit => ({ ...unit, value: '۰۰' })));
  const [data, requests] = await Promise.all([fixture('customer/appointments'), fixture('customer/requests').then(requestContext)]);
  const customerAppointments = data.groups.flatMap(group => group.months.flatMap(month => month.items))
    .map(appointment => ({
      ...appointment,
      detail: model.records[appointment.id],
      countdown: home.appointments.find(item => item.id === appointment.id)?.countdown ?? []
    }));
  customerAppointments.push(model.conflict, ...swapAppointments, ...requestAppointments(requests.requestRecords));
  const appointment = customerAppointments[0];
  return {
    customerAppointments,
    customerMapUrl,
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
    detailHero: true
  };
}
