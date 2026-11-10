> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# WeekStrip

نسخه بازطراحی‌شده: پنل شیشه‌ای هفت روز برابر با کپسول جوهری که به روز انتخاب‌شده **می‌لغزد**.

```html
<div class="rv-week rv-glass">
  <div class="rv-week__head">…ماه، امروز، قبل/بعد…</div>
  <div class="rv-week__grid" role="tablist" style="--i:5">
    <span class="rv-week__ind" aria-hidden="true"></span>
    <button class="rv-wd is-today" role="tab" aria-selected="true"><small>پ</small><b>۱۶</b><span class="rv-load"><i class="on"></i><i class="on"></i><i></i></span></button>
    …
  </div>
  <div class="rv-week__foot">پنج‌شنبه ۱۶ مهر …</div>
</div>
```

- `--i` شماره ستون انتخاب‌شده (۰ = شنبه) است؛ کپسول با `ease-spring` جابه‌جا می‌شود. در Alpine: `:style="'--i:'+day"`.
- `.rv-load` سه پله بار روز (کم، متوسط، پر). `.is-today` نقطه سبز، `.is-past` عدد کم‌رنگ، `.is-off` تعطیل خط‌خورده و غیرقابل انتخاب.
- **تعطیل رسمی** `.rv-wd.is-hol`: عدد و حرف روز قرمز (`danger-fg`)، وقتی انتخاب نشده؛ با `.is-off` کمی کم‌رنگ. زیر نوار برچسب «تعطیل رسمی» یا «پذیرش در تعطیل» می‌آید (D10-67، D10-97). تعطیل رسمی رزرو جدید را می‌بندد، مگر آرایشگر برای همان روز پذیرش ثبت کرده باشد.
- برای برنامه آرایشگر، فهرست نوبت مدیر و انتخاب سریع روز در رزرو.
