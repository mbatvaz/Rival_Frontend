> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# TextField

فیلدها سفید جامدند تا روی شیشه خوانا بمانند: `.rv-field` > `label` + `.rv-input` + `.rv-help`.

- حالت‌ها: فوکوس (`:focus-within` یا `.is-focus`) فقط لبه خود فیلد را ۲px جوهری می‌کند — خود `<input>` هیچ حلقه یا کادر داخلی ندارد؛ `.is-invalid` (لبه و پیام `danger`)؛ `.is-readonly` (قفل). پیام خطا قدم بعد را می‌گوید.
- شماره موبایل و کد با `.rv-ltr`؛ مبلغ با `.rv-affix` «تومان».
- جستجو `.rv-input--search` با دکمه فیلتر جوهری؛ بارگذاری تصویر `.rv-upload` (حداکثر ۵ تصویر، WebP زیر ۱ مگابایت).
