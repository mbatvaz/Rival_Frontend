> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# CheckoutTicket — بلیت پرداخت (v2)

نام مستند: **CheckoutTicket** (کنار `CheckoutSummary` در v1).

| بخش | کلاس |
|---|---|
| بلیت | `article.rv-glass-strong.b2-ticket.rv-ticket` |
| قوانین | `p.b2-rules` — «پرداخت یعنی پذیرش قوانین رزرو» |
| نوار اقدام | `.rv-actionbar.b2-bar` + `.rv-btn--accent` (پرداخت تنها جای دکمه تأکیدی) |

## قواعد
- چک‌باکس پذیرش قوانین وجود ندارد (D10-26).
- زمان نگه‌داری واقعی و شمارش با `HoldTimer`.
- اعتبار پیش از درگاه کسر می‌شود؛ سهم هرکدام جدا نوشته می‌شود.

منبع: بوم دسته ۲ (`BK-F02-*`).
