> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# PricingRules — قیمت‌گذاری و قواعد (v2، دسته ۶)

نام‌های مستند: **PriceFormula**، **BaseAmount**، **Multiplier**، **SelectionLift**، **TabBar4**، و اجزای ADM-10 تا ADM-15.

| نام مستند | کلاس |
|---|---|
| PriceFormula | `.b6-fx` (`__lbl`، `__eq`، `__term`، `__x`، `__res`، `__tot`، `__for`) + `.b6-pick` |
| BaseAmount | `.b6-base` (`__v`، `__d`) |
| Multiplier | `.b6-x(.is-def)` |
| OneLineFormula | `.b6-fl` |
| SelectionLift | `.b6-pk` › `.b6-pk__r(.is-on)[aria-checked]`؛ همین الگو در `.b6-gcard`، `.b6-tc .rv-option`، `.b6-dp button`، `.b6-sc` |
| TabBar4 | `.b4-seg-full.b6-seg4` |
| BookableFrom / خط زمان قاعده | `b6-bf`، `b6-gate`، `b6-op`، `b6-tri`، `b6-lgn`، `b6-who` (§۱۱، §۲۰ تا §۲۵) |
| خدمت و نگاشت | `b6-pc`، `b6-gh`، `b6-ex`، `b6-sg`، `b6-ws`، `b6-ac`، `b6-dp`، `b6-cm`، `b6-sh`، `b6-up`، `b6-tc`، `b6-wh`، `b6-gc` |

## انتخاب «بالا آمده / فرورفته» (D10-152)
- `--b6-lift` و `--b6-sunk` متغیرهای سطح مؤلفه‌اند که در `bundle.css` تعریف شده‌اند، نه توکن تازه.
- انتخاب‌شده: سطح سفید، سایه چندلایه، `translateY(-4px)`، متن ۶۰۰.
- انتخاب‌نشده: `--bg-surface-muted`، سایه درونی، تصویر کم‌رنگ.
- انتخاب انحصاری = `role=radio` (D10-190). همین الگو در `b5-mode` و `b7-pk`.

## قواعد
- گام مدت ۳۰ دقیقه (انتخاب‌گر غلتکی `b6-whl`).
- روز تعطیل سالن قرمز با کلمه «تعطیل»، خط‌خورده نه.
- ADM-18 حذف شد (D10-173).

منبع: بوم دسته ۶ (`ADM-10` تا `ADM-15`)، تحویل ۰۶.
