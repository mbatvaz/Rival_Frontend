> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# OtpInput

ورود با کد پیامکی ۵ رقمی، بدون رمز عبور. خانه‌ها سفید جامد روی کارت `rv-glass-strong`.

- `.rv-otp > span`؛ خانه جاری `.is-active` با مکان‌نمای چشمک‌زن؛ `.is-error` لرزش و لبه قرمز با پیام «۲ تلاش دیگر تا قفل ۱۵ دقیقه‌ای»؛ `.is-ok` لبه سبز.
- شمارش ارسال دوباره داخل `<bdi dir="ltr">`. Passkey با دکمه شیشه‌ای.
