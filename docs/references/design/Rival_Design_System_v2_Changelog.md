> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# Rival — دیزاین سیستم v2 «آراسته» (۱۰ آبان ۱۴۰۵ / ۱ نوامبر ۲۰۲۶)

- دیزاین سیستم: https://claude.ai/artifact/VNKcocXpXh3LgPG1gE9To8
- نسخه v2: `1793547467-9524` — نسخه v1 قابل برگشت: `1791735698-27f8` (در تاریخچه همان دیزاین سیستم + پشتیبان کامل محلی).
- هیچ کلاس، توکن یا کارتی حذف یا تغییر نام نشد؛ کپی‌های `ds/rival/` در بوم‌ها دست نخوردند.

## توکن‌ها
- `font.display`، `display-regular`، `numeric`، `numeric-regular` = Yekan Bakh عرض معمولی (D10-12). فایل‌های فونت کشیده نگه داشته شدند، «استفاده نشود».
- `tokens.css` دقیقاً از `tokens.json` بازتولید شد.

## bundle.css
هسته v1 با اصلاح‌های پایه ← `rv-final` ← `rv-b2` ← `rv-b3` ← `rv-b4` (با `b5-`) ← `rv-b6` ← `rv-b7` (ترتیب تحویل ۰۸ §۸). ریشه پیش‌نمایش‌ها `rv rv-final`.

## اصلاح اجزای پایه
نشان‌ها جوهری و عدد مورد باز بنفش؛ عدم حضور warning، دکمه آن قرمز؛ «رد شده» خنثی؛ Pressed (D10-200)؛ toast با تن معنا؛ ردیف جاری کشو `.is-raised`؛ `rv-btn.is-glass`؛ ARIA تقویم (ردیف هفته)؛ دیالوگ وسط منسوخ، همه تأییدها برگه پایین (D10-108)؛ Navigation (نوار پایین مشتری و کارکنان، نوار بالا، Scope دوبخشی)؛ WeekStrip با روز تعطیل بدون خط‌خوردگی؛ متن نمونه‌ها (۳۰ دقیقه، پنج‌شنبه، شما، ساعات کاری، بدون «ثبت انجام شد»، پذیرش قوانین با پرداخت).

## کارت‌های تازه (۱۴)
ShellBars، AuthKit، PublicSite، HomeBlocks، BookingFlow، CheckoutTicket، RecurringBooking، StatePage، StaffDashboard، CustomerProfile، WorkSchedule، CreditPayments، PricingRules، SettingsFinance.

## فرض‌ها (پاسخ داده نشده در قسمت ب برنامه)
- مقدارهای خام حرکت در لایه‌ها عیناً ماند (به توکن نگاشت نشد).
- `var(--line)` در `.f-all__t` عیناً ماند (خط کشیده نمی‌شود، مثل بوم).
- `.rv-n` پیش‌فرض warning ماند؛ برای مورد باز `is-plum`.
- `rv-b4` کامل وارد شد (بخش‌های بی‌استفاده پاک‌سازی نشدند).
- شماره داخلی `tokens.json` همان ۲ ماند.

## ناسازگاری‌های یافته در بوم‌ها (تصمیم با شما)
- اطلاعیه «پنج‌شنبه‌ها تا ساعت ۲۰:۰۰ باز هستیم» در F-CUS-01 و STY-01-M با ساعات کاری ۰۸:۰۰ تا ۱۹:۰۰ نمی‌خواند. در دیزاین سیستم متن نمونه اصلاح شد؛ بوم‌ها دست نخوردند.
- PUB-03 پنجره‌های قانون را با «۲۴ ساعت» نشان می‌دهد؛ در دیزاین سیستم با توضیح «نمونه، مقدار از ADM-24» آمده است.

## بیرون از v2
کارهای باز تحویل ۰۸ §۷ وارد نشدند.
