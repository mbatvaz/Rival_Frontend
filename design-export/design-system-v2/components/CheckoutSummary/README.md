> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# CheckoutSummary

بلیت شیشه‌ای پرداخت با بریدگی کناری (`.rv-ticket`, `--cut`).

- ردیف‌ها با `.rv-kv`؛ «از اعتبار شما» سبز و منفی؛ جمع «مانده برای درگاه» با `numeral`.
- اعتبار داخلی همیشه خودکار اول مصرف می‌شود؛ روش پرداخت انتخابی نیست. اگر مانده صفر باشد درگاه حذف می‌شود.
- نگه‌داشت ۵ دقیقه با `HoldTimer` کوچک. نوار پایین `rv-actionbar rv-glass-strong` با تنها دکمه سبز صفحه.
- جزئیات لغو و جابه‌جایی در صفحه پرداخت نمی‌آید؛ فقط «پرداخت یعنی پذیرش قوانین رزرو» با پیوند (D10-26). تیک پذیرش جدا نیست.
- فقط ساعت شروع نوشته می‌شود و مدت خدمت؛ زمان پایان نمی‌آید (D10-32).
