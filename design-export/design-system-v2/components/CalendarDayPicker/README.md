> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# CalendarDayPicker

انتخاب روز برای مشتری: فقط روزهای قابل رزرو کاشی سفید برجسته‌اند؛ گذشته، پر و تعطیل تخت و کم‌رنگ می‌مانند.

- `.rv-cal.rv-cal--avail.rv-glass` > `.rv-cal__head` + `.rv-cal__grid` (۷ ستون با `.rv-cal__dow`).
- روز: `.rv-day` با `.is-open`، `.is-few` (نقطه `warning`)، `.is-full`، `.is-past`، `.is-holiday` (قرمز)، `.is-today` (نقطه سبز)، انتخاب `aria-selected="true"` جوهری با پاپ.
- کنار آن زمان‌ها با `.rv-slot-group` (صبح، ظهر، عصر؛ فقط ساعت شروع، بدون زمان پایان) و اگر زمان دلخواه پر بود، پیشنهاد «اعلان آزاد شدن» (بدون اولویت و بدون نگه‌داشت).

**ساختار دسترس‌پذیر** (ظاهر و نام کلاس‌ها تغییر نمی‌کند):

```html
<div class="rv-cal__grid" role="grid" aria-label="مهر ۱۴۰۵">
  <div role="row"><span class="rv-cal__dow" role="columnheader">ش</span>…</div>
  <div role="row">
    <span class="rv-day is-empty" role="gridcell"></span>…
    <button role="gridcell" class="rv-day is-open" aria-selected="true"><i>۱۹</i></button>…
  </div>
  …
</div>
```

- هر هفته یک `role="row"` است که با `display: contents` در شبکه هفت‌ستونه اثری ندارد.
- روزها `role="gridcell"`؛ روز انتخاب‌شده `aria-selected="true"`؛ روز ناممکن `disabled`.
