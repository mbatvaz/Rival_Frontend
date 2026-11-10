> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# StaffDashboard — داشبورد کارکنان (v2)

نام‌های مستند: **DayGauge**، **QuickActionTile**، **CurrentAppointmentCard**، **RequestDueCard**، **TodayPlanTabs**، **DayTimeline**، **NoAppointmentDay**.

| نام مستند | کلاس |
|---|---|
| DayGauge | `.rv-card.rv-glass.f-donut` › `.f-gauge` (svg `trk`/`val` با `pathLength`) + `.f-gauge__c` |
| QuickActionTile | `a.rv-card.f-act` (`__ic`، `__l`)؛ رزرو دستی `rv-card--inverse` |
| CurrentAppointmentCard | `article.rv-card--inverse.rv-card--lg.b4-now` (`__eye`، `__dot`، `__name`، `__svc`، `__note`) + `.b4-prog` + `.b4-phone` + `.rv-btn--light` |
| RequestDueCard | `.b4-rqks` › `.b4-rqk(.is-soon)` › `article.b2-c2.b4-rqk__c` + `.b4-rqk__due` |
| TodayPlanTabs | `.b4-tabs` + `.rv-seg.b4-seg-full` + `.b4-n` |
| DayTimeline | `ol.f-tl` › `.f-tl__t` + `.rv-tl__b` (`.is-free`، `.is-block`، `.f-tile`) + `.b4-rel` |

## پارامتر نقش (تحویل ۰۴ §۹)
- **آرایشگر:** همین ترکیب؛ نوار بالا لوگو، روز و تاریخ، زنگ.
- **مدیر:** همان اجزا + `ActionCenterPeek` (ShellBars) زیر اعلان شخصی؛ Scope فقط در تقویم/درخواست‌ها/نوبت‌ها.

## قواعد
- ترتیب: اعلان شخصی، ردیف امروز، نوبت جاری، منتظر پاسخ، برنامه امروز، اطلاعیه‌ها (D10-14).
- کارت جاری هیچ اقدام وضعیت ندارد؛ «عدم حضور» بعد از پایان نوبت در «پایان‌یافته» ثبت می‌شود.
- «منتظر پاسخ شما» تن warning دارد؛ عدد زبانه درخواست‌ها بنفش است.
- مدت‌ها مضرب ۳۰ دقیقه؛ ساعت پایان نوشته نمی‌شود.

منبع: بوم دسته ۴ (`STY-01-*`)، دسته ۵ (داشبورد مدیر).
