> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# HoldTimer

نمایش نگه‌داشت: ۵ دقیقه برای خدمت ثابت و ۳ ساعت برای پاسخ منتشرشده پیشنهادی/درخواستی.

- حلقه بزرگ `.rv-gauge` (۱۶۸px) در Checkout؛ نسخه کوچک `.rv-gauge--sm` در کارت؛ نوار `.rv-progress.is-warning` در فهرست.
- کمتر از یک دقیقه: عدد قرمز با تپش `rv-breathe`. منقضی: تگ `neutral` «منقضی شده» و قدم بعد.
- زمان باقی‌مانده با `role="timer"` و عدد LTR.
