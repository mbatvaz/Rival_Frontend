> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# CreditPayments — اعتبار و پرداخت‌ها در جزئیات مشتری (v2)

فقط **مدیر** (پارامتر نقش `CustomerProfile`). ADM-19 در ADM-09 ادغام شد (D10-173).

| نام مستند | کلاس |
|---|---|
| ModeSwitch | `.b5-mode[role=radiogroup]` › `button[role=radio][aria-checked]` |
| BalanceCard | `.b5-balc` (`__ic`، `__l`، `__v`) + دکمه «تغییر موجودی» |
| PaymentRow | `.b5-pay` (`__top`، `__t`، `__s`، `__amt`، `__split`، `__foot`، `__lnk`) |
| LedgerRow | `.b5-led` (`__amt.is-pos`، `__r`، `__who`، `__ic`) |
| AfterChange | `.b5-after` در برگه «تغییر موجودی» |

## قواعد
- انتخاب انحصاری = رادیو (D10-190)؛ انتخاب‌شده «بالا آمده» (D10-152).
- تغییر موجودی در برگه پایین با پیش‌نمایش «موجودی بعد از تغییر»، نه دیالوگ (D10-108).
- برچسب «اعتبار» (نه «اعتبار کیف پول»).
- مبالغ با رقم فارسی و «تومان» کوچک.

منبع: بوم دسته ۵ (`ADM-09`)، سند تصمیم ۳۱ اکتبر (اعتبار و پرداخت‌ها).
