> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# Logo

لوگوی کامل، نشان، نسخه معکوس روی جوهر و تابلوی کروم روی شیشه.

- روی سفید یا گرادیان: `<img>` مستقیم. روی جوهر یا عکس: `.rv-logo-ink` / `.rv-mark-ink` با `color`. نسخه فلزی: `.rv-logo-chrome` / `.rv-mark-chrome`.
- آیکون اپ: نشان روی کاشی کروم. لوگو رنگی، کشیده یا سایه‌دار نمی‌شود.
- لوگوی نوشتاری بی‌قاب به کار می‌رود؛ لوگو داخل کاشی یا کادر مربع (مثلاً در صفحه ورود) ممنوع است.

## استفاده روی بوم‌های دیگر

ماسک `.rv-logo-*` و `.rv-mark-*` به نشانی `/_blob/…` همین دیزاین سیستم اشاره می‌کند و روی بوم یا پروژه دیگر باز نمی‌شود. نام کلاس‌ها عوض نمی‌شود؛ فقط آدرس:

1. `Logo1.png` و `Logo2.png` را به‌صورت دارایی همان بوم کپی کنید.
2. در فایل اصلاحات بوم (`rv-fixes.css` §۱) `mask-image` همین چهار کلاس را به آدرس تازه برگردانید:

```css
.rv-logo-ink, .rv-logo-chrome { -webkit-mask-image: url("/_blob/<logo-copy>"); mask-image: url("/_blob/<logo-copy>"); }
.rv-mark-ink, .rv-mark-chrome { -webkit-mask-image: url("/_blob/<mark-copy>"); mask-image: url("/_blob/<mark-copy>"); }
```

- در بسته کد، آدرس نسبی `assets/logo/rival-logo.png` و `assets/logo/rival-mark.png` است.
