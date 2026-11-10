> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# PartialSuccess

نتیجه عملیات گروهی: هر عضو اتمی است، موفق‌ها برگردانده نمی‌شوند و فقط ناموفق‌ها دوباره تلاش می‌شوند.

- خلاصه با حلقه `success` (n/کل) و تگ `warning` «تکمیل با خطا».
- دو فهرست جدا: ناموفق (با دلیل هر مورد) و موفق (با اثر، مثل بازگشت اعتبار).
- دکمه «تلاش دوباره n مورد» جوهری.

## v2 — نسخه موبایل صفحه‌ای (`b4-ps`)
- در صفحه‌های تمام‌عرض موبایل (لغو گروهی، جابه‌جایی گروهی آرایشگر و مدیر) نتیجه با الگوی `StatePage` (`b2-res`) و فهرست فشرده `b4-ps` نمایش داده می‌شود؛ همین قاعده‌ها برقرار است.
- تن خلاصه warning («تکمیل با خطا»)، نه danger.
- منبع: بوم دسته ۴ (`STY-06-RSC-*`، `STY-08-PS`)، تحویل ۰۸ §۶.
