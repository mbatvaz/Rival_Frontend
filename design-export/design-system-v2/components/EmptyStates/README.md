> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# EmptyStates

خالی، بارگذاری و موفقیت — هر کدام با کاشی گرادیانی بزرگ (`.rv-tile--xl`) که شناور می‌ماند (`rv-float`).

- `.rv-empty` > کاشی + `.rv-empty__t` + `.rv-empty__d` + حداکثر یک اقدام.
- **دکمه حالت خالی همیشه `rv-btn--secondary` سفید است** (مثلاً «رزرو دستی»، «باز کردن تقویم»، «پاک کردن فیلترها»). دکمه رزرو تکراری نمی‌آید، چون «رزرو» در نوار پایین هست؛ اگر اقدامی جز رزرو نیست، دکمه نمی‌آید.
- ابزارهای دیگر صفحه (مثلاً فیلترها) سر جایشان می‌مانند.
- اسکلت `.rv-skel` فقط پس از ۳۰۰ میلی‌ثانیه.
- موفقیت: کاشی `is-success` با تیک کشیده‌شونده (`.rv-check-draw`) و کد پیگیری.
- خالی‌های درون فهرست همان کاشی را در اندازه `--lg` دارند.
