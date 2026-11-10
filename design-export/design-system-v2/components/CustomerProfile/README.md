> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# CustomerProfile — جزئیات مشتری (v2)

نام‌های مستند: **CustomerHeader**، **CustomerTabs**، **HistoryRow**؛ کنار `CustomerCard` در v1.

| بخش | کلاس |
|---|---|
| سربرگ | `section.b3-pf.rv-glass-strong.b4-cpf` (`b3-pf__ph`، `__n`، `__s`، `b4-cpf__since`) + `.b3-acts` |
| زبانه‌ها | `.rv-seg.b4-seg-full.is-3` + `.b4-n`؛ صفحه‌ها `.b4-pager.is-at-N` |
| کارت نوبت | `.b4-cards` › `.b2-c2w` › `article.b2-c2.b3-up` |
| سابقه | `.rv-list` › `a.rv-item.b4-hrow(.is-cancel)` + `.b4-hdate` |
| حساب غیرفعال | `.b3-pf.is-off` (عکس سیاه‌وسفید) |

## پارامتر نقش (تحویل ۰۴ §۹)
- **آرایشگر:** نام، شماره (LTR)، «n نوبت با شما»؛ بدون اعتبار، وضعیت حساب، ویرایش یا سابقه نزد دیگران (D10-01). اقدام‌ها: «رزرو دستی برای او»، «ارسال پیامک».
- **مدیر:** به‌علاوه حالت «خدمات / پرداخت‌ها» (`b5-mode`)، کارت موجودی اعتبار (`b5-balc`) و فعال/غیرفعال کردن حساب — کارت `CreditPayments`.

منبع: بوم دسته ۴ (`STY-CUS-*`)، دسته ۵ (`ADM-09`)، سند تصمیم ۳۱ اکتبر.
