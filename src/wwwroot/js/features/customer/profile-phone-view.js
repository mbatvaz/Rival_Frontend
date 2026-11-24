export function phonePreview(state) {
  if (state === 'phone-new') return { stage: 'new', phone: '۰۹۱۲ ۴۴۰ ۷۱۶۳', code: '۹۰', expected: '90123', seconds: 68 };
  if (state === 'phone-current') return { stage: 'current', phone: '', code: '۳۸۱۵۲', expected: '38152', seconds: 42 };
  return { stage: 'current', phone: '', code: '' };
}

export function renderPhoneStage(sheet, get, stage) {
  const submit = get('submit');
  const newNumber = sheet.querySelector('#profile-phone');
  const codeField = get('phone-code');
  const first = stage === 'current';
  const entering = stage === 'number';
  get('sheet-lead').textContent = first ? 'اول شماره فعلی، بعد شماره تازه را تأیید می‌کنید.' : 'شماره تازه را با کد تأیید کنید.';
  get('phone-step').textContent = first ? 'تأیید شماره فعلی' : 'تأیید شماره تازه';
  get('phone-progress-label').textContent = first ? 'قدم ۱ از ۲' : 'قدم ۲ از ۲';
  sheet.querySelector('progress').value = first ? 1 : 2;
  get('current-phone').hidden = !first;
  get('phone-verified').hidden = first;
  get('new-phone').hidden = first;
  get('edit-phone').hidden = first || entering;
  get('contact').hidden = !first;
  get('phone-note').hidden = first;
  codeField.hidden = entering;
  get('code-label').textContent = first ? 'کدی که به شماره فعلی پیامک شد' : 'کدی که به شماره تازه پیامک شد';
  submit.textContent = first ? 'ادامه' : entering ? 'ارسال کد' : 'ثبت شماره تازه';
  newNumber.readOnly = stage === 'new';
}
