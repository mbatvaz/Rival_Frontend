> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# Button

دکمه‌ها تخت‌اند — جوهری، سبز، سفید یا شیشه‌ای — بدون گرادیان و بدون سایه رنگی. وزن برچسب ۴۰۰ (Regular)؛ تاکید از رنگ زمینه است.

| کلاس | کاربرد |
| --- | --- |
| `.rv-btn--primary` | جوهری تخت (`bg-inverse`) — ادامه، ورود، ذخیره، انتشار پاسخ. پیش‌فرض. |
| `.rv-btn--accent` | سبز تخت (`accent-500`، متن سفید) — فقط پول و قطعی کردن: «پرداخت از درگاه»، «پرداخت و قطعی کردن». حداکثر یکی در صفحه. |
| `.rv-btn--secondary` | سفید با لبه `line-strong` — انصراف، جزئیات، جابه‌جایی. |
| `.rv-btn--glass` + `.rv-glass` | روی عکس یا داخل شیشه؛ روش‌های ورود جایگزین (ورود با Passkey، ورود با رمز عبور). |
| `.rv-btn.is-glass` | گونه شیشه‌ای مستقل — **برای اقدام افزودن روی سطح شیشه‌ای** (مثل «نمونه‌کار تازه» در شبکه نمونه‌کار). شیشه `glass-fill` با لبه `glass-edge` و `shadow-sm`، هم‌خانواده دکمه آیکونی بازگشت. به‌جای دکمه جوهری بزرگ برای اقدام فرعی. |
| `.rv-btn--ghost` | اقدام کم‌اهمیت: پاک کردن، بعداً. |
| `.rv-btn--success` | تأیید روی سطح روشن (مثلاً «ثبت پذیرش»). |
| `.rv-btn--light` / `.rv-btn--ink-soft` | روی سطح تیره (کارت جوهری): سفید برای اقدام اصلی (مثلاً «تماس» روی کارت نوبت جاری)، دودی با لبه روشن برای اقدام دوم (مثلاً «پیامک»). دکمه رنگی روی جوهر نمی‌نشیند. |
| `.rv-btn--danger` / `.rv-btn--danger-soft` | حذف دائمی، لغو نوبت، ثبت عدم حضور، رد درخواست — همیشه پس از برگه تأیید (`Overlays`). دکمه «عدم حضور» قرمز است، هرچند تن برچسب وضعیت «عدم حضور» warning است. |

- اندازه پیش‌فرض `size-control` (۵۲px) با `radius-sm`؛ `.rv-btn--sm` ۴۰px با ناحیه لمس نامرئی ۴۴px؛ `.rv-btn--block` تمام‌عرض؛ `.rv-btn--pill` گرد.
- حالت‌ها: `:active` کوچک شدن ۲٪، `[disabled]`، `.is-loading` با `aria-busy="true"`.
- دکمه آیکونی `.rv-icon-btn` (۴۴px، شیشه‌ای) با `--ink`، `--accent`، `--plain` و نشان `.rv-dot.is-ink` (اعلان خوانده‌نشده) یا `.rv-count.is-plum` (موارد باز). نشان قرمز نیست (D10-04).
- تکمیل نوبت خودکار است؛ دکمه «ثبت انجام شد» وجود ندارد.
- اقدام ناممکن پنهان نمی‌شود: `disabled` یا `aria-disabled` با یک خط دلیل زیر آن.
