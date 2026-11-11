import path from 'node:path';
import { src, readJson, withBase } from './site.mjs';

const desktopHeadings = {
  services: { title: 'چه خدمتی می‌خواهید؟', lead: 'خدمت سالن را انتخاب کنید و مراحل رزرو را ادامه دهید.' },
  stylists: { title: 'آرایشگر را انتخاب کنید', lead: 'فهرست آرایشگرهای این خدمت.' },
  fixed: { title: 'روز و ساعت را انتخاب کنید', lead: 'تقویم و ساعت‌های آزاد آرایشگر را بررسی کنید.' },
  proposed: { title: 'روز و بخش روز را انتخاب کنید', lead: 'زمان ترجیحی را برای آرایشگر بفرستید.' },
  requested: { title: 'درخواست هماهنگی پکیج', lead: 'پیش از ثبت، اجزای پکیج را مرور کنید.' },
  recurring: { title: 'رزرو دوره‌ای', lead: 'حداقل سه نوبت را برنامه‌ریزی کنید و هزینهٔ رزرو را یک‌جا بپردازید.' },
  checkout: { title: 'رزرو را بررسی کنید', lead: 'جزئیات نوبت و مبلغ رزرو را پیش از پرداخت مرور کنید.' }
};

function desktopSteps(id) {
  const active = { 'CUS-02': 0, 'BK-01': 0, 'BK-02': 1, 'BK-F01': 2, 'BK-ALERT01': 2, 'BK-F02': 3, 'BK-P01': 2, 'BK-R01': 1 }[id];
  if (active === undefined) return [];
  const services = ['BK-01', 'خدمت', 'scissors'];
  const stylist = ['BK-02', 'آرایشگر', 'user'];
  const request = [id, 'درخواست', 'send'];
  const steps = id === 'BK-P01' ? [services, stylist, request] : id === 'BK-R01' ? [services, request]
    : [services, stylist, ['BK-F01', 'زمان', 'calendar'], ['BK-F02', 'پرداخت', 'card']];
  return steps.map(([id, label, icon], index) => ({
    id, label, active: index === active, complete: index < active, icon: index < active ? 'check' : icon
  }));
}

function statePages(fixtures, urls, catalog, defaults, asset) {
  const money = value => new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
  return Object.entries(fixtures ?? {}).map(([key, result], index) => {
    const context = result.details ? {
      image: asset(defaults.service.image),
      title: defaults.service.name,
      subtitle: result.details !== 'service' && defaults.stylist ? 'با ' + defaults.stylist.name : '',
      showTime: result.details === true, time: ''
    } : null;
    const lines = result.receipt ? [
      { label: 'از اعتبار شما', field: 'credit', value: money(90000) },
      { label: 'پرداخت از درگاه', field: 'due', value: money(90000) }
    ] : [];
    if (result.amount) lines.push({ label: 'مبلغ برگشتی به اعتبار', value: money(result.amount) });
    const actions = [{ id: result.action, href: urls[result.action], label: result.actionText }];
    if (result.home) actions.push({ href: urls.panel, label: 'بازگشت به خانه' });
    return {
      ...result, key, context, lines, actions, hidden: index > 0,
      reference: result.track ? { label: 'کد پیگیری آزمایشی', value: catalog.tracking } : null,
      notice: result.sms ? { icon: 'info', text: 'پیامک تأیید ارسال نشد. جزئیات نوبت در حساب قابل مشاهده است.' } : null
    };
  });
}

export async function productContext(page, basePath, pages) {
  const role = page.role.startsWith('Customer') ? 'customer' : page.role.startsWith('Stylist') ? 'stylist'
    : page.role === 'OwnerAdmin' ? 'admin' : null;
  const route = relative => withBase(basePath, relative);
  let shell = null;
  if (role) {
    shell = (await readJson(path.join(src, `MockData/nav.${role}.json`))).data;
    const map = item => {
      const [pathname, query] = item.href.split('?');
      return { ...item, href: route(pathname) + (query ? '?' + query : ''), active: pathname === page.previewPath };
    };
    shell = { ...shell, role, book: shell.book ? map(shell.book) : null,
      primary: shell.primary.map(map), more: shell.more.map(map) };
  }
  let booking = {};
  if (page.phase === 'Phase 03') {
    const catalog = (await readJson(path.join(src, 'MockData/booking/catalog.json'))).data;
    const service = id => catalog.services.find(item => item.id === id);
    const stylist = id => catalog.stylists.find(item => item.id === id);
    const urls = Object.fromEntries(pages.filter(item => item.phase === 'Phase 03')
      .map(item => [item.id, route(item.previewPath)]));
    const results = (await readJson(path.join(src, 'MockData/booking/results.json'))).data;
    const defaultSelection = { service: service(page.id === 'BK-R01' ? 'groom' : page.id === 'BK-P01' ? 'facial' : 'face-hair'),
      stylist: stylist(page.id === 'BK-P01' ? 'sina' : 'amir') };
    const bookingUrls = { ...urls, panel: route('/customer/'), alerts: route('/customer/availability-alerts/'),
      requests: route('/customer/requests/'), appointments: route('/customer/appointments/') };
    booking = {
      bookingSteps: desktopSteps(page.id),
      bookingHeadings: desktopHeadings,
      bookingResults: statePages(results[page.id], bookingUrls, catalog, defaultSelection, asset => basePath + asset),
      bookingContact: ['STATE-07', 'BK-F02'].includes(page.id) ? (await readJson(path.join(src, 'MockData/public/home.json'))).data : null,
      bookingDemoPhone: page.id === 'STATE-07' ? (await readJson(path.join(src, 'MockData/auth/policy.json'))).data.demoPhone : null,
      bookingCatalog: catalog,
      bookingMonths: [1, 2, 3, 6],
      bookingUrls,
      bookingDefault: defaultSelection,
      bookingQuick: catalog.quick.map(item => ({ service: service(item.service), stylist: stylist(item.stylist) })),
      bookingPackage: service('groom').parts.map(service)
    };
  }
  return {
    ...booking,
    shell,
    publicTitle: page.id === 'PUB-01' ? '' : page.titleFa,
    publicPage: page.id.startsWith('PUB-'),
    isHome: page.id === 'PUB-01',
    productUrls: {
      login: route('/login/'), portfolio: route('/portfolio/'), rules: route('/booking-rules/'),
      book: route('/login/') + '?return=' + encodeURIComponent(route('/customer/book/')),
      booking: route('/customer/book/'), panel: route('/customer/'),
      complete: route('/_preview/context/auth-02/')
    }
  };
}
