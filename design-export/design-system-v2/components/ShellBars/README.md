> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# ShellBars — نوارهای پوسته (v2)

نام‌های مستند: **InnerTopBar**، **PublicTopBar**، **ScopeBar**، **ScopeMenu**، **StylistChip**، **ActionCenterPeek**. کلاس‌ها همان کلاس‌های بوم دسته ۱ هستند و تغییر نام نمی‌دهند.

| نام مستند | کلاس | کجا |
|---|---|---|
| InnerTopBar | `header.f-bar-in` + `.rv-icon-btn` + `h1` (+ `.f-bar-in__sub`) | همه صفحه‌های داخلی، جزئیات، جریان رزرو |
| PublicTopBar | `header.f-bar-in` + `a.rv-btn--secondary.rv-btn--sm.rv-btn--pill.f-pub-login` | نمونه‌کارها، قوانین رزرو (کاربر واردنشده) |
| ScopeBar | `.rv-seg.rv-glass` دوبخشی (`role=tablist`) «برنامه‌های من / برنامه‌های آرایشگر ▾» | تقویم، درخواست‌ها، نوبت‌ها — فقط مدیر |
| ScopeMenu | `.rv-menu.rv-glass-strong.f-scope-menu` (`role=listbox`)، `.f-scope-menu__lbl`، `.f-scope-menu__n` | بازشدن بخش دوم Scope |
| StylistChip | `span.f-who` | نام آرایشگری که مدیر برنامه‌اش را می‌بیند |
| ActionCenterPeek | `a.rv-card.rv-glass.f-acp` + `.rv-tile.is-plum` | داشبورد مدیر |

## پارامتر نقش
- **آرایشگر:** Scope ندارد؛ همیشه «من».
- **مدیر:** Scope دوبخشی بالاترین جزء زیر نوار بالا است (D10-131). گزینه «همه سالن» وجود ندارد (D10-112).

## قواعد
- عنوان نوار داخلی وسط می‌ماند: اگر اقدامی نیست یک `span[aria-hidden]` هم‌اندازه دکمه می‌آید.
- در جریان رزرو و پرداخت نوار پایین نمایش داده نمی‌شود؛ قدم فعلی در `.f-bar-in__sub`.
- عدد مرکز اقدام بنفش است (مورد باز)، نه قرمز (D10-04).

منابع: بوم دسته ۱ (`SHELL-KIT`، `SHELL-ADM-01`، `SHELL-ADM-05`)، تحویل ۰۵ و ۰۶ (D10-112، D10-131).
