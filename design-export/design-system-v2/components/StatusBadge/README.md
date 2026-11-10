> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# StatusBadge

تگ وضعیت `.rv-tag.is-TONE` با واژه + آیکون (یا نقطه `.rv-tag__dot`). نه تن، هر کدام یک معنا:

| تن | معنا |
| --- | --- |
| `is-ink` | قطعی و در جریان — رزرو شده، اکنون (`is-live`) |
| `is-success` | کامل شد — انجام شده، پرداخت موفق (فیروزه‌ای، جدا از سبز تاکید) |
| `is-accent` | پول به نفع مشتری — اعتبار، در نگه‌داشت (سبز تاکید) |
| `is-warning` | منتظر شما، زمان می‌گذرد — در انتظار پرداخت، نگه‌داشت فعال؛ در پنل کارکنان «منتظر پاسخ شما» (D10-63). **استثنای ثبت‌شده:** «عدم حضور» هم warning است (تصمیم مالک؛ دکمه «عدم حضور» قرمز می‌ماند). |
| `is-info` | سیستم در حال پردازش — در انتظار درگاه، پرداخت در حال بررسی |
| `is-plum` | منتظر انسان دیگر — در انتظار بررسی (نمای مشتری)، نیازمند اقدام |
| `is-rose` | لغو و برگشت — لغو توسط مشتری/آرایشگر/مدیر/سیستم |
| `is-danger` | شکست یا تخلف — پرداخت ناموفق، خطا |
| `is-neutral` (پیش‌فرض) | تمام‌شده بی‌اثر — رد شده و رد خودکار (D10-52، D10-70)، منقضی، نگه‌داشت منقضی (D10-33)، آزاد شد، غیرفعال |

- `.is-outline` برای حالت پیش‌نویس یا هشدار پیکربندی؛ `.rv-tag--glass` روی عکس؛ `.rv-tag--lg` در سر کارت.
- گروه‌های نوبت (فاز ۹، ۶.۲)، درخواست (۶.۱)، پرداخت و نگه‌داشت در همین کارت؛ بقیه دامنه‌ها در `StatusCatalog`.
- نتیجه پرداخت (D10-33): در حال بررسی `info`، ناموفق `danger`، زمان از دست رفت `warning`، نگه‌داشت منقضی `neutral`.
- درخواست (D10-52): در انتظار بررسی `plum`، در انتظار پرداخت `warning`، رزرو شده `ink`، رد شده و منقضی شده `neutral`، لغو شده `rose`.
