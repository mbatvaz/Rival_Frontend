> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# PickerCard

یک کارت برای همه انتخاب‌های «یکی از چند» با عکس: **خدمت و آرایشگر ساختار یکسان دارند.** جایگزین ServicePicker و StylistPicker نسخه قبل.

```html
<div class="rv-rail" role="radiogroup">
  <button class="rv-pick" role="radio" aria-checked="true">
    <img src="…" alt="">
    <span class="rv-pick__pin rv-tag rv-tag--glass">۱۸۰٬۰۰۰ تومان</span>
    <span class="rv-pick__check"><i class="ri ri-sm ri-check"></i></span>
    <span class="rv-pick__plate rv-smoke"><span class="rv-pick__t">اصلاح سر و صورت</span><span class="rv-pick__m">۳۰ دقیقه<span class="rv-sep"></span>مو و ریش</span></span>
  </button>
</div>
```

- ۱۶۸px، نسبت ۴:۵، `radius-xl`، در `.rv-rail` با scroll-snap.
- تگ بالا مهم‌ترین واقعیت برای تصمیم است: خدمت ثابت ← قیمت؛ پیشنهادی/درخواستی ← نوع؛ آرایشگر ← نزدیک‌ترین زمان آزاد.
- انتخاب‌شده: حلقه جوهری، ۳px بالا، تیک جوهری با پاپ. `aria-disabled="true"` سیاه‌وسفید و غیرقابل لمس.
- آرایشگر با `style="--focus:center 18%"`؛ `.rv-pick--add` برای افزودن.
