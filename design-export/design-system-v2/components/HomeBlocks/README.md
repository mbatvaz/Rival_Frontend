> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# HomeBlocks — بلوک‌های خانه مشتری (v2)

نام‌های مستند: **PersonalNotice**، **CountdownRail**، **PendingPayRail**، **CardPager**، **CreditTile**، **AnnouncementList**.

| نام مستند | کلاس |
|---|---|
| PersonalNotice | `.f-pnote.rv-glass-strong` + `.rv-tile--sm.is-ink` + `button.f-x` |
| سربرگ بخش | `.f-head` (+ `.f-h`) |
| CardRail / CardPager | `.fx-rail` + `.fx-pager` |
| AnnouncementList | `ul.f-ann` |

## قواعد
- ترتیب: اعلان شخصی، نوبت‌های پیش رو، منتظر پرداخت، اعتبار و ابزارها، اطلاعیه‌ها.
- نشان زنگ در نوار بالا جوهری (`rv-dot.is-ink`).
- اعتبار با برچسب «اعتبار شما».
- اگر نوبتی نیست، بخش پنهان می‌شود؛ حالت خالی فقط در صفحه «نوبت‌ها».

منبع: بوم دسته ۱ (`F-CUS-01`).
