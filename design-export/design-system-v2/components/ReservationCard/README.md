> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# ReservationCard

کارت رزرو برای آرایشگر (و مدیر): **چه کسی، چه چیزی، کی** — با همان کالبد `.rv-bk` کارت نوبت.

- **سرآغاز:** عکس پروفایل مشتری (`.rv-avatar`، ۴۴px)؛ بی‌عکس، حرف اول نام روی گرادیان کروم.
- **عنوان:** نام و نام خانوادگی مشتری.
- **واقعیت‌ها:** خدمت انتخابی (`scissors`) و تاریخ (`calendar`).
- **انتها:** ساعت شروع با عدد `.rv-bk__time` — مهم‌ترین عدد کارت برای آرایشگر — و زیر آن مدت یا زمان باقی‌مانده.
- **پاورقی:** شماره تماس مشتری به‌صورت پیوند `tel:` (`a.rv-bk__fact`، شماره داخل `<bdi dir="ltr">`) و تگ وضعیت.
- **ردیف فهرست** (`.rv-bk--row`، آواتار ۳۲px): نام، خدمت و شماره در یک خط؛ ساعت و تگ در انتها. لغو شده‌ها `.is-muted`.
