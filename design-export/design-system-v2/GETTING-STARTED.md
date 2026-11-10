> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# راه‌اندازی دیزاین سیستم ریوال — نسخه ۲ «آراسته»

این بسته نسخه آفلاین و قابل استفاده در کد از دیزاین سیستم ریوال است. برای دیدن همه اجزا، `index.html` را در مرورگر باز کنید (بدون اینترنت کار می‌کند).

## محتوای بسته

```
rival-design-system-v2/
├─ index.html              گالری آفلاین همه ۵۱ کارت (۳۷ کارت v1 + ۱۴ کارت تازه v2)
├─ README.md               کتابچه برند: اصول، رنگ، تایپوگرافی، ماده، الگوهای دامنه
├─ GETTING-STARTED.md      همین فایل
├─ css/
│  ├─ tokens.css           متغیرهای CSS همه توکن‌ها + @font-face فونت‌ها
│  └─ rival.css            استایل همه اجزا (کلاس‌های rv-*) + ۷۱ آیکون
├─ tokens/
│  ├─ tokens.json          منبع توکن‌ها (رنگ، تایپ، فاصله، گوشه، سایه، حرکت، اندازه)
│  ├─ tailwind.config.js   preset تیلویند که همه مقادیر را به متغیرها وصل می‌کند
│  └─ tokens.scss          همان توکن‌ها به‌صورت متغیر SCSS
├─ components/<نام>/
│  ├─ preview.html         نمونه زنده و مستقل هر جزء
│  └─ README.md            راهنمای استفاده همان جزء
├─ assets/
│  ├─ logo/                rival-logo.png و rival-mark.png
│  ├─ icons/               ۷۱ آیکون SVG (Lucide، مجوز ISC)
│  └─ photos/              عکس‌های سالن، آرایشگران، خدمات و مشتریان (نسخه وب)
└─ fonts/                  ۷ برش یکان‌بخ که سیستم استفاده می‌کند
```

## استفاده در صفحه

```html
<link rel="stylesheet" href="/rival-design-system-v2/css/tokens.css">
<link rel="stylesheet" href="/rival-design-system-v2/css/rival.css">

<body class="rv rv-final" dir="rtl" lang="fa">
  <button class="rv-btn rv-btn--primary">ادامه</button>
  <span class="rv-tag is-success"><i class="ri ri-check"></i>انجام شده</span>
</body>
```

- ترتیب بارگذاری مهم است: اول `tokens.css`، بعد `rival.css`.
- ریشه صفحه (یا Layout در Razor) کلاس‌های `rv rv-final` و `dir="rtl"` و `lang="fa"` می‌گیرد؛ زمینه گرادیانی نرم خودکار اعمال می‌شود.
- اجزا فقط کلاس‌اند و به جاوااسکریپت وابسته نیستند. حالت‌ها با ویژگی‌های ARIA عوض می‌شوند و با Alpine.js یا htmx قابل کنترل‌اند:
  - انتخاب: `aria-pressed` (chip، زمان)، `aria-selected` (segmented، روز، تب)، `aria-checked` (کارت انتخاب، گزینه)، `aria-current="page"` (ناوبری)، `aria-disabled` و `disabled`.
  - کپسول WeekStrip با متغیر `--i` جابه‌جا می‌شود: `<div class="rv-week__grid" :style="'--i:' + day">`.
- آیکون: `<i class="ri ri-NAME"></i>` (رنگ از `currentColor`)؛ اندازه‌ها `ri-sm`، پیش‌فرض، `ri-lg`، `ri-xl`. فهرست نام‌ها در کارت Iconography و پوشه `assets/icons`.
- جداکننده درون‌خطی را با `<span class="rv-sep"></span>` بنویسید، نه «·» (کنار عدد فارسی شبیه «۰» می‌شود).

## استفاده با Tailwind

```js
// tailwind.config.js پروژه
module.exports = {
  presets: [require('./rival-design-system-v2/tokens/tailwind.config.js')],
  content: ['./Views/**/*.cshtml'],
}
```

همه کلاس‌های رنگ، گوشه، سایه، فاصله و فونت به متغیرهای `tokens.css` اشاره می‌کنند، مثلاً `bg-bg-surface`، `text-text-secondary`، `bg-accent-500`، `text-status-success-fg`، `rounded-lg`، `shadow-glass`، `font-numeric`، `text-body-sm`. پس `tokens.css` همچنان باید روی صفحه باشد. مقدار خام (مثل `#121417`) در قالب‌ها ننویسید.

## فونت‌ها

یکان‌بخ فونت تجاری است و فایل‌های این بسته از نسخه‌ای آمده‌اند که خودتان فرستادید؛ استفاده از آن‌ها تابع مجوز شماست. در v2 فقط خانواده «Yekan Bakh» با عرض معمولی استفاده می‌شود (D10-12) و وزن‌ها فقط ۳۰۰، ۴۰۰ و ۶۰۰ هستند. برش‌های Expanded و Semi Expanded (Light و Regular) برای سازگاری با v1 در پوشه `fonts/` مانده‌اند ولی «استفاده نشود». فایل‌های فونت دیگر (Condensed، Bold و …) در این بسته نیستند؛ `css/tokens.css` فقط `@font-face` برش‌های موجود را دارد.

## تصاویر

- عکس‌ها به نسخه وب تبدیل شده‌اند (WebP، ضلع بلند ۱۲۰۰ پیکسل). عکس‌های واقعی سالن (`photos/real-hall`) همان فایل‌های اصلی‌اند.
- تصاویر آرایشگران، خدمات، مشتریان و `hall-ai` ساخته هوش مصنوعی و فقط برای نمونه‌اند؛ در محصول عکس واقعی جایشان می‌آید.

## نسخه زنده

منبع اصلی این بسته دیزاین سیستم Rival در Claude است. هر تغییری که آن‌جا داده شود، در این بسته خودکار نمی‌آید؛ برای نسخه تازه، بسته را دوباره بسازید.

## تازه در v2

- لایه‌های CSS در `css/rival.css` به این ترتیب‌اند: هسته v1 ← `rv-final` ← `rv-b2` ← `rv-b3` ← `rv-b4` (شامل `b5-`) ← `rv-b6` ← `rv-b7` ← آیکون‌ها. پیشوندها: `rv-`، `f-`، `b2-`، `b3-`، `b4-`.
- ۱۴ کارت تازه: ShellBars، AuthKit، PublicSite، HomeBlocks، BookingFlow، CheckoutTicket، RecurringBooking، StatePage، StaffDashboard، CustomerProfile، WorkSchedule، CreditPayments، PricingRules، SettingsFinance.
- همه تأییدها برگه پایین‌اند (D10-108)؛ دیالوگ وسط‌صفحه منسوخ است.
- نسخه‌های دقیق CSS هر دسته در `canvas-css/` و فهرست تغییرات در `docs/Rival_Design_System_v2_Changelog.md` است.
- برگشت به v1: `archive/ds-v1-1791735698-27f8.zip` (فقط فایل‌های متنی).
