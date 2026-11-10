> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# CustomerCard

کارت مشتری: عکس پروفایل، نام و نام خانوادگی، شماره تماس — با همان کالبد `.rv-bk`.

- **کارت:** آواتار بزرگ (`.rv-avatar--lg`)، نام، شماره (پیوند `tel:`، LTR)، و در انتها دو دکمه آیکونی تماس و پیامک (`.rv-bk__acts`). پاورقی اختیاری: تعداد نوبت‌ها، آخرین نوبت، «پرونده».
- **مشتری غیرفعال:** تگ `neutral` «غیرفعال» به‌جای دکمه‌ها.
- **ردیف فهرست** («مشتریان من»، نتیجه جست‌وجو): `.rv-bk--row` با فلش «بیشتر».
- **قابل انتخاب** (انتخاب مشتری در رزرو دستی): `role="radio"` و `aria-checked="true"` حلقه جوهری ۲px و تیک جوهری می‌گیرد.
- مدیر و آرایشگر رمز یا روش‌های ورود مشتری را در این کارت نمی‌بینند.
