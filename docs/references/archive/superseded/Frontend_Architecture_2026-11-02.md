> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Rival — تصمیم معماری فرانت‌اند و ریسپانسیو (۲ آبان ۱۴۰۵ / 2026-11-02)

وضعیت: تصمیم مالک (محمد). این فایل از نظر اولویت بالاتر از پیشنهادهای قبلی فرانت (از جمله Tailwind و htmx/Alpine) است.

## ۱) هدف
نمونه مرجع فرانت‌اند بدون بک‌اند، ریسپانسیو (تمرکز موبایل‌فرست، ساختار دسکتاپ استاندارد)، قابل اجرا برای پریویو و تست UI، و قابل انتقال به ASP.NET Core MVC با کمترین دستکاری.

## ۲) ریسپانسیو
| محدوده | رفتار |
|---|---|
| پایه (<۷۶۸) | همان طرح‌های ۳۹۰؛ ناوبری پایین موبایل؛ تک‌ستون |
| ≥۷۶۸ (تبلت) | همان ساختار موبایل با کانتینر وسط‌چین (حداکثر ۷۲۰)، شبکه‌های ۲ستونه فقط جایی که طبیعی است؛ ناوبری پایین هنوز هست |
| ≥۱۰۲۴ (دسکتاپ) | کانتینر حداکثر ۱۲۰۰؛ **ناوبری پایین حذف**؛ هدر بالایی؛ جانمایی چندستونه |

قواعد دسکتاپ:
- بیشترین پایبندی به طرح اصلی: همان کارت‌ها، سلسله‌مراتب، رنگ، تایپوگرافی، متن‌ها و ترتیب محتوا؛ فقط ابعاد و قرارگیری تغییر می‌کند (شبکه، ستون کناری، عرض‌های محدود). هیچ المان جدیدی که در طرح نیست اضافه نشود، مگر هدر دسکتاپ.
- موارد ناوبری پایین (ثابت موبایل) در دسکتاپ به منوی «بیشتر» در هدر منتقل می‌شوند؛ هدر: لوگو، (در صورت وجود در طرح) دکمه اصلی، حساب کاربر، منوی «بیشتر». ناوبری یک‌بار در `MockData/nav.<role>.json` تعریف می‌شود و هر دو نمایش (پایین موبایل / منوی بیشتر دسکتاپ) از همان داده ساخته می‌شوند.
- بالاشیت‌ها در دسکتاپ هم «شیت» می‌مانند (بدون دیالوگ وسط صفحه): چسبیده به پایین، عرض `min(560px, 100%)` و وسط‌چین، با همان محتوا و رفتار.
- هیچ اسکرول داخلی، حتی در دسکتاپ.
- برای هر صفحه، قبل از ساخت، یک طرح دسکتاپ متنی کوتاه در `docs-work/desktop-layouts/<page>.md` نوشته شود (ستون‌ها، ترتیب، چه چیز کجا می‌رود) و در `PROGRESS.md` علامت بخورد تا من بتوانم بررسی کنم.

## ۳) ساختار ریپو (آینه ASP.NET MVC)
```
rival-frontend/
├─ CLAUDE.md  PROGRESS.md  OPEN_QUESTIONS.md  DISCREPANCIES.md
├─ docs/                     (اسناد؛ فقط‌خواندنی)
├─ design-export/            (خروجی Claude Design؛ فقط‌خواندنی)
├─ mock-server/              (Node/Express + Nunjucks؛ فقط پریویو؛ منتقل نمی‌شود)
├─ src/
│  ├─ Views/                 → Views/ در ASP
│  │  ├─ Shared/  _Layout.*  _Head  _HeaderDesktop  _BottomNav  _SheetHost  _Toast  ...
│  │  ├─ Shared/Components/    (هر جزء UI یک فایل)
│  │  └─ <Area>/<Controller>/<Action>.*     مثال: Customer/Booking/SelectService
│  ├─ MockData/              → ViewModel/JSON نمونه (نام = @model)
│  └─ wwwroot/               → wwwroot/ در ASP (بدون تغییر کپی می‌شود)
│     ├─ css/ 00-tokens/ 01-base/ 02-layout/ 03-components/ 04-pages/ 05-utilities/  + app.css (فقط لیست import)
│     ├─ js/  core/ components/ features/<page>/<feature>.js  app.js
│     ├─ fonts/ icons/ img/ lib/
└─ tests/  visual/ a11y/ structure/
```
نقشه نام‌گذاری: `<Area>` = Public، Auth، Customer، Stylist، Admin. هر Action یک View.

## ۴) قواعد کد
**HTML/Template**
- فقط زیرمجموعه قابل‌تبدیل به Razor: متغیر، if/else، for، include (=Partial)، extends/block (=Layout/Section). فیلتر/ماکرو سفارشی ممنوع مگر در جدول زیر.
- هر صفحه: کامنت اول فایل `@model` و فایل JSON مرتبط.
- هیچ `<script>` یا `onclick`/استایل inline.
- لینک‌ها و فرم‌ها: آدرس‌ها به‌شکل `/Area/Controller/Action` (قابل استفاده با `asp-*` بعداً). فرم‌ها `method=post` معمولی و دارای جای‌گاه `{{ antiforgery }}` (= `@Html.AntiForgeryToken()`).

**جدول نگاشت Nunjucks → Razor**
| Nunjucks | Razor |
|---|---|
| `{{ model.title }}` | `@Model.Title` |
| `{% if %}` / `{% for %}` | `@if` / `@foreach` |
| `{% include "Shared/_X" %}` | `@await Html.PartialAsync("_X", ...)` |
| `{% extends %}` + `{% block %}` | `Layout =` + `@section` |
| `{{ x \| faDigits }}` | `@Html.FaDigits(x)` (هلپر واحد) |
| `{{ d \| jalali }}` | `@Html.Jalali(d)` (هلپر واحد) |
| `{{ antiforgery }}` | `@Html.AntiForgeryToken()` |

**CSS**
- CSS ساده مدرن؛ بدون Tailwind/پیش‌پردازنده/باندلر. لایه‌ها با `@layer tokens, base, layout, components, pages, utilities`.
- یک دغدغه در هر فایل، حداکثر ~۱۵۰ خط. هر کامپوننت یک فایل (`03-components/sheet.css`، `button.css`، `card-booking.css`…)، هر صفحه یک فایل (`04-pages/customer-booking-select-service.css`).
- `app.css` فقط `@import`ها؛ در ASP همان لیست به `<link>`ها/Bundle تبدیل می‌شود (یک partial به‌نام `_Styles` لیست را نگه می‌دارد).
- فقط `min-width` برای ریسپانسیو؛ مقادیر فقط از توکن‌ها. منطقی‌نویسی RTL (`margin-inline-start` و …).
- نام‌گذاری BEM-ساده با پیشوند `rv-` (مثال `rv-sheet__header`).

**JS**
- ES Module بومی؛ بدون فریم‌ورک و باندلر؛ هر فیچر یک فایل (مثال `features/customer-booking/pick-time-slot.js`)، حداکثر ~۱۲۰ خط.
- اتصال با `data-rv="pick-time-slot"` و `core/registry.js` که صفحه را اسکن و ماژول مربوط را lazy-import می‌کند.
- کامپوننت‌های مشترک (`components/sheet.js`، `toast.js`، `tabs.js`، `stepper.js`…) هرکدام فایل جدا.
- هیچ داده سخت‌کد در JS؛ دسترسی داده فقط از `core/api.js`. آداپتر mock الان؛ آداپتر واقعی بعد (همان شکل URL و JSON).
- state فقط در DOM/data-attribute یا ماژول همان فیچر؛ بدون state سراسری.
- اسکریپت‌ها با `<script type="module">` از یک partial (`_Scripts`) لود می‌شوند.

**آیکون/فونت**: اسپرایت Remix Icon محلی، یکان‌بخ محلی؛ بدون CDN.

## ۵) تست و کیفیت
- Playwright در عرض‌های ۳۹۰، ۷۶۸، ۱۲۸۰؛ مقایسه بصری با آرت‌بوردهای ۳۹۰ (تلورانس ثبت شود).
- axe بدون خطا. تست ساختار: سقف اندازه فایل، نبود inline JS/CSS، نبود رنگ/اندازه خام خارج از توکن‌ها، نبود Tailwind.
- هر صفحه همه حالت‌های تعریف‌شده در اسناد (loading/empty/error/disabled) را دارد؛ با query-string مثل `?state=empty` در سرور mock قابل نمایش است.

## ۶) انتقال به ASP.NET
- `src/wwwroot/**` بدون تغییر کپی شود.
- `src/Views/**` پسوند `.cshtml` بگیرد و طبق جدول بالا تبدیل شود (باید تقریباً مکانیکی باشد).
- `MockData/*.json` شکل ViewModelها را مشخص می‌کند؛ `core/api.js` از mock به endpointهای واقعی سوئیچ شود.
- Claude Code در پایان فایل `docs-work/ASP_PORT_GUIDE.md` را تولید کند: فهرست Viewها و ViewModelها، endpointهای مورد انتظار، هلپرهای لازم، و مراحل انتقال.

## ۷) فرض‌ها (برای تأیید مالک)
۱. منوی «بیشتر» دسکتاپ شامل موارد ناوبری پایین + موارد فعلی منوی بیشتر است. ۲. شیت‌ها در دسکتاپ پایین‌چسبیده و وسط‌چین با عرض ۵۶۰. ۳. آستانه دسکتاپ ۱۰۲۴ و تبلت ۷۶۸.
