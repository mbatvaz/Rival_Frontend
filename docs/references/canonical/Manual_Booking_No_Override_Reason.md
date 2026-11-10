> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# Rival — تصمیم مالک: رزرو دستی بدون دلیل Override

- **تاریخ:** ۲۲ اکتبر ۲۰۲۶
- **منبع تصمیم:** مالک پروژه (محمد)، هنگام مرور دسته ۴
- **وضعیت:** قطعی؛ بر متن‌های قدیمی‌تر که دلیل Override را الزامی می‌دانستند مقدم است.

## تصمیم

آرایشگر (برای خودش) و مدیر کل (برای هر آرایشگر) هنگام ثبت رزرو دستی، حتی با استفاده از Override (زمان خارج از ساعت کاری یا روز/ساعت خدمت، تعطیلی، افق یک ماه، حداقل فاصله تا شروع)، **دلیل نمی‌نویسند** و هیچ توضیحی برای مدیر ارسال نمی‌شود.

## چه چیزی عوض نمی‌شود

- خود Override باقی است و فقط همان چهار قاعده را نادیده می‌گیرد.
- Override هرگز تداخل آرایشگر، تداخل نوبت‌های مشتری، یکپارچگی مالی یا یکتایی اثر را دور نمی‌زند (BR-OPS-04).
- انجام‌دهنده و Overrideهای استفاده‌شده همچنان Audit می‌شوند (BR-OPS-05).
- رزرو دستی هزینه رزرو را از مشتری نمی‌گیرد (BR-OPS-06).
- اعلان جداگانه به مدیر برای استفاده آرایشگر از Override تعریف نشده است؛ فقط Audit وجود دارد.

## ویرایش‌های انجام‌شده در اسناد

| فایل | محل | تغییر |
|---|---|---|
| `phases/Rival_Phase_05_AI_Handoff.md` | BR-OPS-03 + بخش ۲ (Current Truth) | «با ثبت دلیل» حذف شد؛ بند تصمیم به Current Truth اضافه شد |
| `phases/Rival_Phase_07_AI_Handoff.md` | US7-STY-08، US7-ADM-07 + بخش ۲ | «Override مجاز با دلیل» → «بدون نیاز به ثبت دلیل»؛ بند تصمیم اضافه شد |
| `phases/Rival_Phase_08_AI_Handoff.md` | STY-07 + بخش ۲ | «مجاز و با دلیل است» → «مجاز است و دلیل لازم ندارد»؛ بند تصمیم اضافه شد |
| `phases/Rival_Phase_09_AI_Handoff.md` | UF-06 گام ۵ و ۸ + بخش ۲ | «ثبت دلیل» از گام ۵ و «دلیل لازم» از Audit گام ۸ حذف شد؛ بند تصمیم اضافه شد |
| `design/Rival_Design_Batch_04_Stylist.md` | STY-07 (جدول، جزئیات، نساز) | گام ۴ بدون فیلد دلیل؛ یادداشت برای ADM-07 |
| `design/Rival_Design_Batch_05_Admin_Daily.md` | ADM-07 | «Override بدون فیلد دلیل (مانند STY-07)» |

اسناد دیگر (فاز ۱ §۹.۴، فاز ۶ AUTH61-SCH-07، فایل مشترک، فایل‌های تحویل) درباره دلیل Override چیزی نمی‌گویند و تغییری نیاز نداشتند. ردیف «رزرو دستی غیرفعال با دلیل» در کشوی آرایشگر غیرفعال (MORE-STY) موضوع دیگری است (متن توضیح غیرفعال‌بودن) و دست نخورده است.
