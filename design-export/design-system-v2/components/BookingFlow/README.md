> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# BookingFlow — جریان رزرو (v2)

نام‌های مستند: **QuickRebook**، **PickerCarousel**، **ContextCard**، **SoonestSlots**، **DayStripPicker**، **AlertEntry**، **StylistPick**، **ActionBarSummary**.

| نام مستند | کلاس |
|---|---|
| QuickRebook | `.f-quick__grid` › `a.rv-card.rv-glass.f-quick__card` |
| PickerCarousel | `.f-car` › `.f-svc.is-center` / `.f-svc.is-side` + `.f-pager` |
| ContextCard | `.b2-ctx.b2-ctx--lg.rv-glass` (`__media`، `__t`، `__s`، `__chg`) |
| SoonestSlots | `.b2-soon` › `button.b2-soon__c.rv-glass` |
| DayStripPicker | `.rv-week.rv-glass.b2-days` › `.b2-days__row` + `.b2-slots4` › `.rv-slot` |
| AlertEntry | `a.b2-alert` (`__t`، `__d`) |
| StylistPick | `ul.b2-pk` › `li.b2-pk__i` + `p.b2-note` |
| ActionBarSummary | `.rv-actionbar.rv-glass-strong.b2-bar` › `.b2-bar__sum` + `.rv-btn--primary` |
| پیشرفت | `.rv-progress > i` |

## قواعد
- انتخاب‌های انحصاری رادیو هستند؛ انتخاب‌شده «بالا آمده» (D10-152، D10-190).
- روز تعطیل یا بسته خط‌خورده نمی‌شود؛ فقط کم‌رنگ و برچسب «تعطیل» (D10-190).
- مدت‌ها مضرب ۳۰ دقیقه؛ ساعت پایان نوشته نمی‌شود.
- نوار پایین در جریان رزرو نیست؛ نوار اقدام جایش را می‌گیرد.

منابع: بوم دسته ۲ (`BK-01-*`، `BK-F01-*`، `BK-R01-*`).
