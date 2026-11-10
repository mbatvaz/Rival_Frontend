> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# RecurringBooking — رزرو دوره‌ای (v2)

نام مستند: **OccurrenceTimeline** (`ol.b2-tl2`)، **AddOccurrence** (`button.b2-occ-add`).

## قواعد
- هر نوبت مستقل پرداخت و لغو می‌شود؛ نتیجه چندتایی با `PartialSuccess`.
- نوبت دارای تداخل warning است، نه danger.
- مدت‌ها مضرب ۳۰ دقیقه؛ ساعت پایان نوشته نمی‌شود.

منبع: بوم دسته ۲ (`BK-REC01-*`).
