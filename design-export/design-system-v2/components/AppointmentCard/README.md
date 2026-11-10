> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# AppointmentCard

نوبتی که مشتری گرفته — یکی از سه کارت رزرو با **یک کالبد مشترک** (`.rv-bk`) کنار `ReservationCard` و `CustomerCard`. نسخه بزرگ داشبورد مشتری `AppointmentHero` است.

**کالبد مشترک:** `.rv-bk` > `.rv-bk__head` (سرآغاز ۴۴px · بدنه · انتها) و در صورت نیاز `.rv-bk__foot`.

- **سرآغاز:** کاشی تاریخ گرادیانی `.rv-tile--date` (روز و ماه).
- **عنوان:** نام خدمت (`.rv-bk__title`، ۱۵px، Regular).
- **واقعیت‌ها** (`.rv-bk__facts` > `.rv-bk__fact`، Light): روز هفته و ساعت شروع با آیکون `clock` (زمان پایان نمی‌آید، D10-32)؛ آرایشگر با عکس کوچک ۲۲px (`.rv-avatar--xs`) و نام. عکس آرایشگر کوچک می‌ماند تا خدمت و زمان پیام اصلی بمانند.
- **انتها:** تگ وضعیت (رزرو شده، اکنون، انجام شده، لغو توسط شما / سالن، عدم حضور).
- **پاورقی (اختیاری، فقط آینده):** فاصله تا نوبت («۳ روز دیگر») و «جزئیات نوبت».

```html
<a class="rv-bk rv-glass" href="/appointments/48271">
  <div class="rv-bk__head">
    <div class="rv-bk__lead"><span class="rv-tile rv-tile--date"><b>۱۹</b><small>مهر</small></span></div>
    <div class="rv-bk__body">
      <div class="rv-bk__title">اصلاح سر و صورت</div>
      <div class="rv-bk__facts">
        <span class="rv-bk__fact"><i class="ri ri-clock"></i>یکشنبه، ۱۴:۰۰</span>
        <span class="rv-bk__fact"><span class="rv-avatar rv-avatar--xs"><img src="…" alt=""></span>طاها</span>
      </div>
    </div>
    <div class="rv-bk__end"><span class="rv-tag is-ink"><i class="ri ri-calendar"></i>رزرو شده</span></div>
  </div>
</a>
```

- **ردیف فهرست:** همان ساختار با `.rv-bk--row` داخل `.rv-list` (بدون پاورقی).
- **گذشته بی‌اثر** (لغو شده، عدم حضور): `.is-muted` — عنوان Light و سرآغاز خاکستری؛ وضعیت همچنان با واژه و آیکون.
