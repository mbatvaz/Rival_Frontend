> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# پرامپت‌های کار با دیزاین سیستم ریوال v2

قواعد ثابتی که در همه پرامپت‌ها رعایت می‌شود:
- نام هیچ کلاس، توکن یا کارتی حذف یا عوض نشود؛ پیشوندها `rv-`، `f-`، `b2-`، `b3-`، `b4-` می‌مانند.
- رنگ، فونت یا مقیاس تازه اختراع نشود؛ فقط توکن‌های `tokens/tokens.json`.
- اجزای مشترک با پارامتر نقش (`stylist` / `admin`) ساخته می‌شوند، نه دو نسخه جدا.
- هر تعارض ثبت و از مالک پرسیده شود؛ خودت انتخاب نکن.
- فونت: فقط Yekan Bakh عرض معمولی، وزن ۳۰۰/۴۰۰/۶۰۰ (D10-12). همه تأییدها برگه پایین‌اند (D10-108).

## ۱. شروع کار در یک پروژه کد
```
دیزاین سیستم ریوال v2 را از پوشه rival-design-system-v2 به پروژه اضافه کن.
css/tokens.css و بعد css/rival.css را بارگذاری کن؛ ریشه صفحه class="rv rv-final" dir="rtl" lang="fa".
برای هر صفحه، اول components/<Name>/preview.html و README.md همان جزء را بخوان و از همان کلاس‌ها استفاده کن.
مقدار خام رنگ یا فاصله ننویس؛ فقط var(--token).
```

## ۲. ساخت یک صفحه از روی کارت‌های نمونه
```
صفحه <شناسه، مثلاً ADM-14 قیمت‌گذاری> را بساز.
مرجع ترکیب‌بندی: components/PricingRules/preview.html (و کارت‌های هم‌خانواده).
فقط کلاس‌های موجود در css/rival.css را به کار ببر. اگر جزئی کم است، آن را فهرست کن و پیشنهاد بده؛ خودت کلاس جدید نساز.
```

## ۳. بازرسی انطباق با دیزاین سیستم
```
این فایل/صفحه را با دیزاین سیستم ریوال v2 مقایسه کن و فقط ناهماهنگی‌ها را گزارش بده:
رنگ یا فونت خارج از توکن، وزن بالاتر از ۶۰۰، هدف لمسی زیر ۴۴px، متن زیر ۱۱px، دیالوگ وسط‌صفحه، نشان قرمز برای مورد غیرخطا، دکمه سبز غیرپولی یا بیش از یکی در صفحه.
```

## ۴. افزودن جزء یا کارت تازه
```
جزء جدید <نام> را به دیزاین سیستم اضافه کن، بدون تغییر نام یا حذف چیزی از v2.
کلاس‌ها پیشوند rv- بگیرند؛ components/<نام>/preview.html با اولین خط <!-- @dsCard width=… group=".." height=N subtitle=".." --> و README.md فارسی بساز.
روی عرض ۳۹۰ بدون اسکرول افقی و با prefers-reduced-motion بررسی کن.
```

## ۵. ارتقا از v1 یا بازگشت
```
برای بازگشت به v1: archive/ds-v1-1791735698-27f8.zip (فقط متن). v2 با v1 سازگار است: هسته v1 + لایه‌های rv-final، rv-b2، rv-b3، rv-b4، rv-b6، rv-b7.
```

## ۶. شروع یک دسته طراحی تازه (روش پروژه)
```
طبق سه فایل پیوست (فایل دسته، design/Rival_Design_Common.md، آخرین فایل تحویل)، دسته <N> را شروع کن و فقط بخش ۱ را اجرا کن.
CSSهای بوم دسته قبل را عیناً کپی کن (canvas-css/). بعد از هر بخش متوقف شو تا بررسی کنم.
```
