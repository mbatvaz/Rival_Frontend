> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# Segmented

کنترل چندحالته روی شیشه (`.rv-seg.rv-glass`)؛ گزینه فعال کپسول جوهری با `aria-selected="true"`.

- Scope مدیر: «من / آرایشگر / همه سالن» — داده را عوض می‌کند، نقش را نه.
- بازه نمایش: روز / هفته / ماه.
- شمارنده `.rv-n` تن خود را از معنا می‌گیرد: `.rv-n.is-plum` برای موارد باز منتظر اقدام (D10-04). تن پیش‌فرض شمارنده‌های دیگر هنوز قطعی نشده است.
- تب‌های زیرخط‌دار `.rv-tabs` برای جابه‌جایی محتوای یک صفحه؛ chip (`.rv-chip`، `aria-pressed`) برای فیلتر.
- هدف لمسی: دکمه‌های segmented و chip ۳۶px دیده می‌شوند ولی ناحیه لمس نامرئی ۴۴px دارند (`::after`)؛ ظاهر تغییر نمی‌کند.
