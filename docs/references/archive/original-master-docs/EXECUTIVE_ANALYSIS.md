> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Executive Analysis — Rival

## نتیجه

Rival یک سامانه رزرو و مدیریت سالن با سه Actor انسانی (`Customer`, `Stylist`, `OwnerAdmin`) است. طراحی‌ها از نظر حالت و جزئیات غنی‌اند: 441 رکورد Board در ۸ Batch، اما این‌ها صفحه‌های مستقل به تعداد برابر نیستند؛ بیشترشان state، bottom sheet، result و empty/error variation هستند. بر اساس Sitemap نهایی، اجرا باید روی حدود ۶۰ UI context قابل Route/Step متمرکز شود و stateها به‌صورت الگوهای مشترک روی آن‌ها سوار شوند.

## اعداد واقعی ورودی

| مورد | مقدار | توضیح |
|---|---:|---|
| دسته طراحی | ۸ | Batch 01 تا 08 |
| Board record | 441 | شامل 8 یادداشت دسته |
| HTML export | 571 | مجموع فایل‌های HTML استخراج‌شده، شامل variantها |
| فایل‌های workspace استخراج‌شده | 1305 | پس از باز کردن همه ZIPها |
| گروه Component در Design System v2 | 51 | Component README/preview groups |
| نقش‌های انسانی | ۳ | Customer، Stylist، OwnerAdmin |
| حوزه‌های Feature در برنامه اجرایی | ۱۴ | Shell/Navigation، Public/Auth، Booking، Payment، Customer، Stylist، Admin Daily، Staff/Service، Scheduling، Pricing، Finance/Matching، Content/Notifications، System States، QA/MVC |
| خانواده‌های Component قابل پیاده‌سازی | ۲۴ | از ۵۱ گروه Design System پس از ادغام الگوهای تکراری و حذف wrapperهای صرفاً نمایشی |
| Phase اجرایی پیشنهادی | ۹ | Foundation تا QA/MVC handoff |

## معماری پیشنهادی

- Source of Truth: Razor-shaped Views + static preview templates؛ CSS ساده با cascade layers و tokenهای v2؛ ES Modules بومی و registry مبتنی بر `data-rv`.
- Static preview فقط یک mock-server سبک دارد؛ business logic در JS تقلید نمی‌شود.
- Mobile-first در عرض 390، سپس 768 و 1024/1280؛ bottom sheet در دسکتاپ هم bottom sheet باقی می‌ماند.
- هر data write از `core/api.js` عبور می‌کند تا آدرس endpoint در MVC قابل جایگزینی باشد.
- Snapshot، Hold، Permission، Ledger و idempotency قانون UI هستند؛ Front-end نباید آن‌ها را دور بزند یا status را مستقیماً تغییر دهد.

## نقاط حساس

۱. تعارض‌های تاریخی در جدول‌های Sitemap وجود دارد؛ Current Truth فاز ۸ و Owner Closures مبنا قرار گرفتند.
۲. بعضی ZIPها CSS/فونت/تصویر مشترک را ندارند یا به `/_blob` اشاره می‌کنند؛ Master package آن منابع را در `references/design-exports` نگه می‌دارد و `ASSET_AUDIT.md` fallbackها را مشخص می‌کند.
۳. چهار مورد تصمیم مالک بعد از طراحی، روی Canvas هنوز کامل sync نشده‌اند: قفل ورود همه روش‌ها، لینک «روش دیگر»، و خط اعلان اصلاح اعتبار در ADM-09. این‌ها در Phase 02/08 به‌صورت explicit QA item آمده‌اند.
