> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# AuthKit — ورود یا ثبت‌نام (v2)

نام مستند: **AuthKit** (AuthHero، AuthCard، OtpInput، AuthAlternatives، AuthFooter).

| بخش | کلاس |
|---|---|
| بازگشت | `.f-auth-top` + `.rv-icon-btn` |
| سربرگ | `.f-auth-hero` › `a.f-auth-mark` (لوگوی بی‌قاب `.rv-logo-ink`)، `h1.f-auth__t`، `p.f-auth__d` |
| کارت | `main.f-auth` › `section.rv-card.rv-glass-strong.rv-card--lg.f-auth__card` (`.f-auth-ret`، `.rv-field`، `.f-otp`) |
| راه‌های دیگر | `.f-auth-alts` › `.rv-btn--glass.rv-glass.rv-btn--block` (Passkey، رمز عبور) |
| پانویس | `footer.f-auth-foot` |

## قواعد
- عنوان یکی است: «ورود یا ثبت‌نام». خط «با ورود، قوانین را می‌پذیرید» حذف شد؛ پذیرش قوانین فقط در پرداخت (D10-26).
- لوگو بدون کاشی/قاب (D10-08).
- دکمه اصلی جوهری (`rv-btn--primary`).
- حذف Passkey با برگه پایین (D10-108)، نه دیالوگ وسط.

منابع: بوم دسته ۱ (`AUTH-01-*`، `AUTH-02`).
