export const faDigits = value => String(value ?? '').replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
export const latinDigits = value => String(value).replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
  .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
const persianNumber = new Intl.NumberFormat('fa-IR');
export const faNumber = value => persianNumber.format(value);
const persianDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tehran'
});

export function jalali(value) {
  if (value === null || value === undefined || value === '') return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const parts = Object.fromEntries(persianDate.formatToParts(date).map(part => [part.type, part.value]));
  return `${parts.year}/${parts.month}/${parts.day}`;
}

export function parseJalaliDate(value) {
  const match = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(latinDigits(value).trim());
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const leap = [1, 5, 9, 13, 17, 22, 26, 30].includes(year % 33);
  const monthLength = month <= 6 ? 31 : month < 12 || leap ? 30 : 29;
  if (year < 1300 || year > 1500 || month < 1 || month > 12 || day < 1 || day > monthLength) return null;
  return `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
}

export function jalaliToIsoDate(value) {
  const date = parseJalaliDate(value);
  if (!date) return null;
  const [year, month, day] = date.split('/').map(Number);
  const offset = month <= 7 ? (month - 1) * 31 : 186 + (month - 7) * 30;
  for (let delta = -3; delta <= 3; delta++) {
    const candidate = new Date(Date.UTC(year + 621, 2, 20 + offset + day - 1 + delta, 12));
    if (latinDigits(jalali(candidate)) === date) return candidate.toISOString().slice(0, 10);
  }
  return null;
}

export function time24(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('fa-IR', {
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'Asia/Tehran'
  }).format(date);
}
