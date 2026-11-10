> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# StylistSchedule

برنامه روز آرایشگر.

- `.rv-timeline` > `.rv-tl` (ساعت شروع + بلوک). بلوک‌ها: نوبت شیشه‌ای، اکنون `.is-now` (حلقه جوهری)، بستن شخصی `.is-block` (راه‌راه شیشه‌ای)، زمان آزاد `.is-free` (خط‌چین، «رزرو دستی» یا «بستن»). خط اکنون `.rv-nowline` جوهری.
- **زمان پایان نمی‌آید** (D10-32، D10-64): کاشی‌ها مدت را می‌گویند («۳۰ دقیقه»، «۱ ساعت»)، نه «تا ۱۲:۰۰».
- واژه درست «بستن شخصی» است، نه «مسدود».
- **کارت نوبت جاری** جوهری با پیشرفت زمانی و «تماس» (`.rv-btn--light`) و «پیامک» (`.rv-btn--ink-soft`)؛ دکمه رنگی روی جوهر نمی‌نشیند.
  - **«ثبت انجام شد» وجود ندارد:** تکمیل نوبت خودکار است (SF-03).
  - **«عدم حضور» روی کارت جاری نیست** (D10-13): فقط بعد از زمان پایان نوبت و تا ۲۳:۵۹ همان روز، در «پایان‌یافته‌های امروز».
- درخواست باز آرایشگر «منتظر پاسخ شما» با تن `warning` است (D10-63).
- نسخه نهایی داشبورد آرایشگر (کارت جاری `CurrentAppointmentCard` و برنامه امروز با زبانه «پیش رو / پایان‌یافته» `TodayPlanTabs`) در بوم دسته ۴ است و در گروه ۲ v2 به دیزاین سیستم اضافه می‌شود.
