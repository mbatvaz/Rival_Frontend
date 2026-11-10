> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# AppointmentHero

نسخه بزرگ کارت نوبت برای نقطه تمرکز داشبورد مشتری (CUS-01): «نوبت بعدی شما». هم‌خانواده `AppointmentCard` است، با فضای بیشتر.

- **رسانه** (`.rv-bk-hero__media`، ۱۶۸px؛ در گوشی تا ۱۳۰px): عکس واقعی سالن با سایه ملایم بالای تصویر؛ تگ‌های شیشه‌ای وضعیت و فاصله تا نوبت (`.rv-bk-hero__tags`).
- **پنل شیشه‌ای** (`.rv-bk-hero__panel`) که ۴۴px روی عکس می‌نشیند:
  - **زمان، قهرمان کارت:** `.rv-bk-hero__when` — روز (عدد بزرگ Light)، ماه و روز هفته، یک خط مویی عمودی، و ساعت شروع (عدد بزرگ Light) با مدت؛ زمان پایان نمی‌آید (D10-32).
  - خدمت (`heading-md`)، آرایشگر با عکس کوچک، و «مسیریابی» (`map-pin`).
  - دو اقدام هم‌عرض: «جابه‌جایی» (ثانویه) و «جزئیات نوبت» (جوهری).
- **روز نوبت:** تگ جوهری زنده «امروز»، شمارش «۱ ساعت و ۲۰ دقیقه دیگر» و نوار `.rv-bk-hero__count` تا شروع. اقدام غیرمجاز غیرفعال با یک خط دلیل است، نه پنهان؛ مهلت با ساعت واقعی همان نوبت گفته می‌شود، نه با عدد ثابت (D10-60).
- بدون نوبت آینده، جای این کارت حالت خالی `EmptyStates` با «رزرو نوبت» می‌آید.
