> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# StatePage — صفحه نتیجه و وضعیت (v2)

نام مستند: **StatePage**. الگوی یگانه همه صفحه‌های نتیجه، خطا و وضعیت سیستم (D10-191).

| بخش | کلاس |
|---|---|
| ظرف | `section.b2-res` |
| نماد | `.rv-tile.rv-tile--xl.is-{tone}` + `ri-xl` |
| برچسب | `.rv-tag.is-{tone}` |
| متن | `h2.b2-res__t`، `p.b2-res__d`، `p.rv-caption.rv-muted` |
| کد | `span.b2-code > b.rv-ltr` |
| خلاصه | `.b2-done.rv-glass` (`rv-kv`) |
| اقدام‌ها | `.b2-res__acts` (در صفحه به پایین چسبیده؛ حداکثر دو دکمه؛ `b2-res__act` برای پیوند سوم) |

## تن‌ها (D10-192)
success = انجام شد؛ danger = شکست؛ info = در جریان؛ warning = نیاز به توجه؛ plum = منتظر پاسخ دیگری؛ neutral = آفلاین/نگه‌داری.

## قواعد
- دیالوگ وسط برای نتیجه استفاده نمی‌شود (D10-108).
- متن زمان‌ها واقعی است، نه «۲۴ ساعت» ثابت.
- صفحه‌های سیستمی دسته ۸ (۴۰۴، آفلاین، نگه‌داری، دسترسی) همین الگو را دارند.

منابع: بوم دسته ۲ (`PAY-RES-*`، `BK-REQ01-*`)، دسته ۸ (`STATE-*`، `SYS-*`)، تحویل ۰۸ (D10-191 تا D10-198).
