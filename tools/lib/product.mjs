import path from 'node:path';
import { src, readJson, withBase } from './site.mjs';
import { customerContext } from './customer.mjs';

const desktopHeadings = {
  services: { title: 'چه خدمتی می‌خواهید؟', lead: 'خدمت سالن را انتخاب کنید و مراحل رزرو را ادامه دهید.' },
  stylists: { title: 'آرایشگر را انتخاب کنید', lead: 'فهرست آرایشگرهای این خدمت.' },
  fixed: { title: 'روز و ساعت را انتخاب کنید', lead: 'تقویم و ساعت‌های آزاد آرایشگر را بررسی کنید.' },
  proposed: { title: 'روز و بخش روز را انتخاب کنید', lead: 'زمان ترجیحی را برای آرایشگر بفرستید.' },
  requested: { title: 'درخواست هماهنگی پکیج', lead: 'پیش از ثبت، اجزای پکیج را مرور کنید.' },
  recurring: { title: 'رزرو دوره‌ای', lead: 'حداقل سه نوبت را برنامه‌ریزی کنید و هزینهٔ رزرو را یک‌جا بپردازید.' },
  checkout: { title: 'رزرو را بررسی کنید', lead: 'جزئیات نوبت و مبلغ رزرو را پیش از پرداخت مرور کنید.' }
};

function bookingSteps(id, proposed = id === 'BK-P01') {
  const active = { 'CUS-02': 0, 'BK-01': 0, 'BK-02': 1, 'BK-F01': 2, 'BK-ALERT01': 2, 'BK-F02': 3, 'BK-P01': 2, 'BK-R01': 1 }[id];
  if (active === undefined) return [];
  const services = ['BK-01', 'خدمت', 'scissors'];
  const stylist = ['BK-02', 'آرایشگر', 'user'];
  const request = [id, 'ارسال درخواست', 'send'];
  const steps = active === 0 ? [services] : id === 'BK-R01' ? [services, request]
    : proposed ? [services, stylist, ['BK-P01', 'زمان ترجیحی', 'calendar'], [id, 'ارسال درخواست', 'send']]
    : [services, stylist, ['BK-F01', 'زمان', 'calendar'], ['BK-F02', 'پرداخت', 'card']];
  return steps.map(([id, label, icon], index) => ({
    id, label, active: index === active, complete: index < active, icon: index < active ? 'check' : icon
  }));
}

function statePages(fixtures, urls, catalog, defaults, asset, defaultResult) {
  const money = value => new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
  return Object.entries(fixtures ?? {}).map(([key, result], index) => {
    const context = result.details ? {
      image: asset(defaults.service.image),
      title: defaults.service.name,
      avatar: defaults.stylist ? asset(defaults.stylist.image) : '',
      subtitle: result.details !== 'service' && defaults.stylist ? 'با ' + defaults.stylist.name : '',
      showTime: result.details === true && !result.inlineReference, time: ''
    } : null;
    const lines = result.receipt ? [
      { label: 'از اعتبار شما', field: 'credit', value: money(90000) },
      { label: 'پرداخت از درگاه', field: 'due', value: money(90000) }
    ] : [];
    if (key === 'proposed') lines.push({ label: 'روز ترجیحی', field: 'preferred-date', value: '۲۵ مهر' }, { label: 'زمان از روز', field: 'preferred-part', value: 'صبح' });
    if (result.amount) lines.push({ label: 'مبلغ برگشتی به اعتبار', value: money(result.amount) });
    const actions = [{ id: result.action, href: urls[result.action], label: result.actionText, secondary: result.secondaryOnly }];
    if (result.home) actions.push({ href: urls.panel, label: 'بازگشت به خانه', secondary: true });
    return {
      ...result, key, context, lines, actions, hidden: defaultResult ? key !== defaultResult : index > 0,
      reference: result.track ? { label: 'کد پیگیری', value: result.referenceCode ?? catalog.tracking } : null,
      notice: result.sms ? { icon: 'info', text: 'پیامک تأیید ارسال نشد. جزئیات نوبت در حساب قابل مشاهده است.' } : null
    };
  });
}

export async function productContext(page, basePath, pages, model) {
  const role = page.role.startsWith('Customer') ? 'customer' : page.role.startsWith('Stylist') ? 'stylist'
    : page.role === 'OwnerAdmin' ? 'admin' : null;
  const route = relative => withBase(basePath, relative);
  let shell = null;
  if (role) {
    shell = (await readJson(path.join(src, `MockData/nav.${role}.json`))).data;
    const activePath = { 'CUS-04': '/customer/appointments/', 'CUS-06': '/customer/requests/' }[page.id] ?? page.previewPath;
    const map = item => {
      const [pathname, query] = item.href.split('?');
      return { ...item, href: route(pathname) + (query ? '?' + query : ''), active: !query && pathname === activePath };
    };
    shell = { ...shell, role, book: shell.book ? map(shell.book) : null,
      primary: shell.primary.map(map), more: shell.more.map(map) };
    shell.moreActive = shell.more.some(item => item.active);
    if (role === 'customer') {
      const personal = shell.more.filter(item => !['home', 'images', 'shield'].includes(item.icon));
      shell.moreGroups = [{ title: '', items: [personal[0], personal[1], shell.book, ...personal.slice(2)] },
        { title: 'سالن', items: shell.more.filter(item => ['home', 'images', 'shield'].includes(item.icon)) }];
    }
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
      requests: route('/customer/requests/') + '?tab=wait', requestDetail: route('/customer/requests/demo/'),
      appointments: route('/customer/appointments/') };
    booking = {
      bookingSteps: bookingSteps(page.id),
      bookingStepVariants: page.id === 'BK-02' ? [bookingSteps(page.id), bookingSteps(page.id, true)] : [bookingSteps(page.id)],
      bookingHeadings: desktopHeadings,
      bookingResults: statePages(results[['STATE-05', 'STATE-06'].includes(page.id) ? 'PAY-RES' : page.id], bookingUrls,
        catalog, defaultSelection, asset => basePath + asset, page.resultDefault || { 'STATE-05': 'checking', 'STATE-06': 'lost' }[page.id]),
      bookingCatalog: catalog,
      bookingMonths: [1, 2, 3, 6],
      bookingUrls,
      bookingDefault: defaultSelection,
      bookingQuick: catalog.quick.map(item => ({ service: service(item.service), stylist: stylist(item.stylist) })),
      bookingPackage: service('groom').parts.map(service)
    };
  }
  const customer = {};
  if (page.phase === 'Phase 04') {
    const customerUrls = Object.fromEntries(pages.map(item => [item.id, route(item.previewPath)]));
    customerUrls.recurring = customerUrls['BK-REC01'];
    Object.assign(customer, { customerUrls }, await customerContext(page, basePath, customerUrls, model));
  }
  return {
    ...booking,
    ...customer,
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
