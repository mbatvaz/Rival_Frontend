> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# WorkSchedule — برنامه کاری (v2)

نام‌های مستند: **WeekSummary**، **WeekPatternRow**، **ExceptionRow**، **HolidayRow**.

| بخش | کلاس |
|---|---|
| زبانه‌ها | `.rv-seg.b4-seg-full` (هفتگی، استثناها، تعطیلات) |
| خلاصه | `.rv-card.b4-wsum` › `.b4-wsum__stats` |
| ردیف روز | `.b4-wk2l` › `.b4-wk2(.is-today/.is-off)` (`__b`، `__top`، `__d`، `__m`، `__ps`، `__p`، `__off`، `__go`، `__bar`، `__gap`، `__trk`، `__it`، `__ic`) |
| راهنما | `p.b4-hint` |
| استثنا و تعطیلی | `b4-xc`، `b4-xd`، `b4-whl`، `b4-rng`، `b4-relbar`، `b4-swrow` (بوم دسته ۴، STY-08-*) |

## پارامتر نقش
- **آرایشگر:** برنامه خودش؛ خدمت‌ها و قیمت با مدیر.
- **مدیر:** همان اجزا زیر Scope «برنامه‌های آرایشگر ▾»؛ به‌علاوه ADM-11 (`b6-*`).

## قواعد
- ساعات سالن شنبه تا پنج‌شنبه ۰۸:۰۰ تا ۱۹:۰۰؛ جمعه تعطیل.
- روز تعطیل خط‌خورده نمی‌شود (D10-190).
- گام زمان ۳۰ دقیقه.

منبع: بوم دسته ۴ (`STY-08-*`)، دسته ۶ (`ADM-11`).
