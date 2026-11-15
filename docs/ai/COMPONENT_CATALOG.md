# Component catalog

Generated source index: `node tools/audit-documents.mjs`. Design groups are not proof of runtime implementation. Ownership stays in the [reuse matrix](../COMPONENT_REUSE_MATRIX.md); approved source variants/states are in each linked README/preview.

## Runtime owners and contracts

- Phase 01: token/font/icon generation and native registry/API adapter.
- Phase 02: Public/Auth/Role layouts, navigation/More/logout, Sheet, OTP, PortfolioViewer/Card, fields/controls/materials.
- Phase 03: StatePage, booking choices/calendar/time, hold/checkout/result/recurring composition. STATE-04..07 reuse the one StatePage.
- Phase 06: CreditPayments/WalletLedger/PaymentRow/balance; currently planned, not implemented by this audit.
- Phase 08: extends existing finance/StatePage; no duplicate implementation.

Current implementation entry points:

- [Shared](<../../src/Views/Shared>)
- [Components](<../../src/Views/Shared/Components>)
- [Booking](<../../src/Views/Booking>)
- [sheet.js](<../../src/wwwroot/js/components/sheet.js>)
- [otp.js](<../../src/wwwroot/js/components/otp.js>)
- [rail.js](<../../src/wwwroot/js/components/rail.js>)
- [booking](<../../src/wwwroot/js/features/booking>)
- [03-components](<../../src/wwwroot/css/03-components>)
- [04-pages](<../../src/wwwroot/css/04-pages>)

Sheet owns open/closing/focus/inert/scroll lifecycle; OTP owns editable five-cell entry; Rail owns drag/touch/keyboard behavior. Reuse their data-rv hooks and input configuration. StatePage model carries key/title/description/tone/icon/context/reference/notice/lines/actions. Public card/viewer and booking partials configure state from fixtures.

For every use: name exact variants/states, token names, accessible names/focus/errors/targets and responsive brief in the page spec. Common requirements: semantic HTML, visible labels/focus, >=44px hit targets, RTL, reduced motion, logical order. Do not use a component outside its documented role, invent a permission or copy a role-specific version. Planned groups keep their phase gate.

## Design group evidence

### AppointmentCard

[preview.html](<../../design-export/design-system-v2/components/AppointmentCard/preview.html>) · [README.md](<../../design-export/design-system-v2/components/AppointmentCard/README.md>)

نوبتی که مشتری گرفته — یکی از سه کارت رزرو با **یک کالبد مشترک** (`.rv-bk`) کنار `ReservationCard` و `CustomerCard`. نسخه بزرگ داشبورد مشتری `AppointmentHero` است.

Source token references (not new definitions): none extracted; inspect specification.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### AppointmentHero

[preview.html](<../../design-export/design-system-v2/components/AppointmentHero/preview.html>) · [README.md](<../../design-export/design-system-v2/components/AppointmentHero/README.md>)

نسخه بزرگ کارت نوبت برای نقطه تمرکز داشبورد مشتری (CUS-01): «نوبت بعدی شما». هم‌خانواده `AppointmentCard` است، با فضای بیشتر.

Source token references (not new definitions): none extracted; inspect specification.

Planned owner: Phase 04; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### AuthKit

[preview.html](<../../design-export/design-system-v2/components/AuthKit/preview.html>) · [README.md](<../../design-export/design-system-v2/components/AuthKit/README.md>)

نام مستند: **AuthKit** (AuthHero، AuthCard، OtpInput، AuthAlternatives، AuthFooter).

Source token references (not new definitions): shadow-hairline, text-primary, text-secondary.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### BookingFlow

[preview.html](<../../design-export/design-system-v2/components/BookingFlow/preview.html>) · [README.md](<../../design-export/design-system-v2/components/BookingFlow/README.md>)

نام‌های مستند: **QuickRebook**، **PickerCarousel**، **ContextCard**، **SoonestSlots**، **DayStripPicker**، **AlertEntry**، **StylistPick**، **ActionBarSummary**.

Source token references (not new definitions): shadow-hairline, space-2, space-1, space-3.

Runtime: Phase 03; [Booking](<../../src/Views/Booking>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Button

[preview.html](<../../design-export/design-system-v2/components/Button/preview.html>) · [README.md](<../../design-export/design-system-v2/components/Button/README.md>)

دکمه‌ها تخت‌اند — جوهری، سبز، سفید یا شیشه‌ای — بدون گرادیان و بدون سایه رنگی. وزن برچسب ۴۰۰ (Regular)؛ تاکید از رنگ زمینه است.

Source token references (not new definitions): bg-inverse, accent-500, line-strong, shadow-sm, size-control, radius-sm, text-inverse-muted.

Runtime: Phase 02; [controls.css](<../../src/wwwroot/css/03-components/controls.css>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### CalendarDayPicker

[preview.html](<../../design-export/design-system-v2/components/CalendarDayPicker/preview.html>) · [README.md](<../../design-export/design-system-v2/components/CalendarDayPicker/README.md>)

انتخاب روز برای مشتری: فقط روزهای قابل رزرو کاشی سفید برجسته‌اند؛ گذشته، پر و تعطیل تخت و کم‌رنگ می‌مانند.

Source token references (not new definitions): bg-surface, shadow-sm, accent-700, line-strong.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### CalendarRangePicker

[preview.html](<../../design-export/design-system-v2/components/CalendarRangePicker/preview.html>) · [README.md](<../../design-export/design-system-v2/components/CalendarRangePicker/README.md>)

انتخاب بازه برای مرخصی آرایشگر، BookableFrom مدیر و فیلترها. دو ماه کنار هم روی یک پنل شیشه‌ای.

Source token references (not new definitions): bg-plaster.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### CheckoutSummary

[preview.html](<../../design-export/design-system-v2/components/CheckoutSummary/preview.html>) · [README.md](<../../design-export/design-system-v2/components/CheckoutSummary/README.md>)

بلیت شیشه‌ای پرداخت با بریدگی کناری (`.rv-ticket`, `--cut`).

Source token references (not new definitions): radius-xl.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### CheckoutTicket

[preview.html](<../../design-export/design-system-v2/components/CheckoutTicket/preview.html>) · [README.md](<../../design-export/design-system-v2/components/CheckoutTicket/README.md>)

نام مستند: **CheckoutTicket** (کنار `CheckoutSummary` در v1).

Source token references (not new definitions): shadow-hairline, space-3, space-4, space-2, space-1, text-muted.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### ChoiceControls

[preview.html](<../../design-export/design-system-v2/components/ChoiceControls/preview.html>) · [README.md](<../../design-export/design-system-v2/components/ChoiceControls/README.md>)

گزینه‌ها، تیک، رادیو و سوییچ. همه انتخاب‌ها جوهری‌اند.

Source token references (not new definitions): none extracted; inspect specification.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Cover

[preview.html](<../../design-export/design-system-v2/components/Cover/preview.html>)

Read source anatomy and states.

Source token references (not new definitions): font-display, text-primary, font-sans, text-muted, bg-inverse-raised, bg-inverse, bg-surface, accent-300, accent-500, accent-700, bg-gradient-b.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### CreditPayments

[preview.html](<../../design-export/design-system-v2/components/CreditPayments/preview.html>) · [README.md](<../../design-export/design-system-v2/components/CreditPayments/README.md>)

فقط **مدیر** (پارامتر نقش `CustomerProfile`). ADM-19 در ADM-09 ادغام شد (D10-173).

Source token references (not new definitions): shadow-hairline.

Planned owner: Phase 06; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### CustomerCard

[preview.html](<../../design-export/design-system-v2/components/CustomerCard/preview.html>) · [README.md](<../../design-export/design-system-v2/components/CustomerCard/README.md>)

کارت مشتری: عکس پروفایل، نام و نام خانوادگی، شماره تماس — با همان کالبد `.rv-bk`.

Source token references (not new definitions): text-inverse, bg-inverse.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### CustomerProfile

[preview.html](<../../design-export/design-system-v2/components/CustomerProfile/preview.html>) · [README.md](<../../design-export/design-system-v2/components/CustomerProfile/README.md>)

نام‌های مستند: **CustomerHeader**، **CustomerTabs**، **HistoryRow**؛ کنار `CustomerCard` در v1.

Source token references (not new definitions): shadow-hairline, space-3, text-muted.

Planned owner: Phase 04; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### EmptyStates

[preview.html](<../../design-export/design-system-v2/components/EmptyStates/preview.html>) · [README.md](<../../design-export/design-system-v2/components/EmptyStates/README.md>)

خالی، بارگذاری و موفقیت — هر کدام با کاشی گرادیانی بزرگ (`.rv-tile--xl`) که شناور می‌ماند (`rv-float`).

Source token references (not new definitions): text-primary.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Feedback

[preview.html](<../../design-export/design-system-v2/components/Feedback/preview.html>) · [README.md](<../../design-export/design-system-v2/components/Feedback/README.md>)

اطلاع درون صفحه و پیام کوتاه، هر دو تخت و تک‌رنگ — بدون شیشه و بدون گرادیان.

Source token references (not new definitions): shadow-md, space-3, space-4, shadow-hairline.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### GlassMaterial

[preview.html](<../../design-export/design-system-v2/components/GlassMaterial/preview.html>) · [README.md](<../../design-export/design-system-v2/components/GlassMaterial/README.md>)

مواد سیستم روی عکس واقعی سالن:

Source token references (not new definitions): radius-xl.

Runtime: Phase 02; [materials.css](<../../src/wwwroot/css/03-components/materials.css>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### HoldTimer

[preview.html](<../../design-export/design-system-v2/components/HoldTimer/preview.html>) · [README.md](<../../design-export/design-system-v2/components/HoldTimer/README.md>)

نمایش نگه‌داشت: ۵ دقیقه برای خدمت ثابت و ۳ ساعت برای پاسخ منتشرشده پیشنهادی/درخواستی.

Source token references (not new definitions): none extracted; inspect specification.

Runtime: Phase 03; [holds.js](<../../src/wwwroot/js/features/booking/holds.js>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### HomeBlocks

[preview.html](<../../design-export/design-system-v2/components/HomeBlocks/preview.html>) · [README.md](<../../design-export/design-system-v2/components/HomeBlocks/README.md>)

نام‌های مستند: **PersonalNotice**، **CountdownRail**، **PendingPayRail**، **CardPager**، **CreditTile**، **AnnouncementList**.

Source token references (not new definitions): shadow-hairline, space-2, radius-xl, space-5, space-4, space-3, radius-md, space-1, line-hairline, text-primary, text-inverse, bg-surface.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Iconography

[preview.html](<../../design-export/design-system-v2/components/Iconography/preview.html>) · [README.md](<../../design-export/design-system-v2/components/Iconography/README.md>)

۷۱ آیکون خطی Lucide (ISC) با خط ۱.۷۵ و `currentColor`: `<i class="ri ri-NAME">`، اندازه‌ها `ri-sm` ۱۶، پیش‌فرض ۲۰، `ri-lg` ۲۴، `ri-xl` ۳۶.

Source token references (not new definitions): text-muted, font-sans.

Runtime: Phase 01; [icons](<../../src/wwwroot/icons>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Imagery

[preview.html](<../../design-export/design-system-v2/components/Imagery/preview.html>) · [README.md](<../../design-export/design-system-v2/components/Imagery/README.md>)

- عکس واقعی سالن اول: هیرو، تماس، درباره ما (`center 35%`).

Source token references (not new definitions): none extracted; inspect specification.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Logo

[preview.html](<../../design-export/design-system-v2/components/Logo/preview.html>) · [README.md](<../../design-export/design-system-v2/components/Logo/README.md>)

لوگوی کامل، نشان، نسخه معکوس روی جوهر و تابلوی کروم روی شیشه.

Source token references (not new definitions): text-inverse, radius-lg, radius-xl, text-primary.

Runtime: Phase 01; [img](<../../src/wwwroot/img>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### MotionSpecimens

[preview.html](<../../design-export/design-system-v2/components/MotionSpecimens/preview.html>) · [README.md](<../../design-export/design-system-v2/components/MotionSpecimens/README.md>)

نمونه زنده هر حرکت: پاپ انتخاب، لغزیدن کپسول روز، برگه از پایین، toast، کشیده شدن تیک، حلقه نگه‌داشت، تپش «اکنون» و تکان آیکون‌ها در لحظه معنا. مدت‌ها `duration-fast/base/slow/deliberate` و منحنی‌ها `ease-standard`، `ease-exit`، `ease-spring`. زیر `prefers-reduced-motion` همه حذف می‌شوند.

Source token references (not new definitions): duration-fast, ease-standard, ease-exit, ease-spring, text-muted, font-sans, duration-slow, bg-inverse-raised, bg-inverse, bg-plaster, text-inverse.

Runtime: Phase 02; [motion.css](<../../src/wwwroot/css/05-utilities/motion.css>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Navigation

[preview.html](<../../design-export/design-system-v2/components/Navigation/preview.html>) · [README.md](<../../design-export/design-system-v2/components/Navigation/README.md>)

ساختار ناوبری از تصمیم‌های D10-02، D10-18 تا D10-21 می‌آید. شکل: کپسول شیشه‌ای شناور، تب‌های فقط‌آیکون، تب فعال قرص جوهری با برچسب، و دکمه جدای «رزرو» مشتری.

Source token references (not new definitions): radius-xl.

Runtime: Phase 02; [_RoleNav.njk](<../../src/Views/Shared/_RoleNav.njk>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### NotificationItem

[preview.html](<../../design-export/design-system-v2/components/NotificationItem/preview.html>) · [README.md](<../../design-export/design-system-v2/components/NotificationItem/README.md>)

مرکز اعلان و مرکز اقدام از هم جدا دیده می‌شوند.

Source token references (not new definitions): text-primary.

Planned owner: Phase 04–08; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### OtpInput

[preview.html](<../../design-export/design-system-v2/components/OtpInput/preview.html>) · [README.md](<../../design-export/design-system-v2/components/OtpInput/README.md>)

ورود با کد پیامکی ۵ رقمی، بدون رمز عبور. خانه‌ها سفید جامد روی کارت `rv-glass-strong`.

Source token references (not new definitions): none extracted; inspect specification.

Runtime: Phase 02; [_Otp.njk](<../../src/Views/Shared/Components/_Otp.njk>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Overlays

[preview.html](<../../design-export/design-system-v2/components/Overlays/preview.html>) · [README.md](<../../design-export/design-system-v2/components/Overlays/README.md>)

برگه پایین، کشو و منو همه `rv-glass-strong` روی `scrim-modal`اند.

Source token references (not new definitions): radius-xl, shadow-md, shadow-sheet, duration-base, ease-spring, ease-standard.

Runtime: Phase 02; [sheet.js](<../../src/wwwroot/js/components/sheet.js>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### PartialSuccess

[preview.html](<../../design-export/design-system-v2/components/PartialSuccess/preview.html>) · [README.md](<../../design-export/design-system-v2/components/PartialSuccess/README.md>)

نتیجه عملیات گروهی: هر عضو اتمی است، موفق‌ها برگردانده نمی‌شوند و فقط ناموفق‌ها دوباره تلاش می‌شوند.

Source token references (not new definitions): none extracted; inspect specification.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### PickerCard

[preview.html](<../../design-export/design-system-v2/components/PickerCard/preview.html>) · [README.md](<../../design-export/design-system-v2/components/PickerCard/README.md>)

یک کارت برای همه انتخاب‌های «یکی از چند» با عکس: **خدمت و آرایشگر ساختار یکسان دارند.** جایگزین ServicePicker و StylistPicker نسخه قبل.

Source token references (not new definitions): radius-xl.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### PortfolioCard

[preview.html](<../../design-export/design-system-v2/components/PortfolioCard/preview.html>) · [README.md](<../../design-export/design-system-v2/components/PortfolioCard/README.md>)

گالری نمونه‌کار با فیلتر خدمت.

Source token references (not new definitions): shadow-sm.

Runtime: Phase 02; [_PortfolioCard.njk](<../../src/Views/Shared/Components/_PortfolioCard.njk>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### PricingRules

[preview.html](<../../design-export/design-system-v2/components/PricingRules/preview.html>) · [README.md](<../../design-export/design-system-v2/components/PricingRules/README.md>)

نام‌های مستند: **PriceFormula**، **BaseAmount**، **Multiplier**، **SelectionLift**، **TabBar4**، و اجزای ADM-10 تا ADM-15.

Source token references (not new definitions): bg-surface-muted, shadow-hairline.

Planned owner: Phase 07; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### PublicSite

[preview.html](<../../design-export/design-system-v2/components/PublicSite/preview.html>) · [README.md](<../../design-export/design-system-v2/components/PublicSite/README.md>)

نام‌های مستند: **PublicHome**، **PortfolioGrid**، **PortfolioViewer**، **FilterChipRail**، **PolicyWindowCard**، **PublicCtaCard**، **PublicFooter**.

Source token references (not new definitions): shadow-hairline, radius-xl, bg-inverse, text-inverse, space-5, text-inverse-muted, space-8, space-3, space-4, space-1, space-2, text-primary, space-12, text-secondary, bg-surface, radius-lg, shadow-md, radius-md, bg-plaster, line-hairline, space-6, text-muted.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### RecurringBooking

[preview.html](<../../design-export/design-system-v2/components/RecurringBooking/preview.html>) · [README.md](<../../design-export/design-system-v2/components/RecurringBooking/README.md>)

نام مستند: **OccurrenceTimeline** (`ol.b2-tl2`)، **AddOccurrence** (`button.b2-occ-add`).

Source token references (not new definitions): shadow-hairline.

Runtime: Phase 03; [recurring.js](<../../src/wwwroot/js/features/booking/recurring.js>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### RequestCard

[preview.html](<../../design-export/design-system-v2/components/RequestCard/preview.html>) · [README.md](<../../design-export/design-system-v2/components/RequestCard/README.md>)

درخواست پیشنهادی/درخواستی و پاسخ آن.

Source token references (not new definitions): font-numeric-regular.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### ReservationCard

[preview.html](<../../design-export/design-system-v2/components/ReservationCard/preview.html>) · [README.md](<../../design-export/design-system-v2/components/ReservationCard/README.md>)

کارت رزرو برای آرایشگر (و مدیر): **چه کسی، چه چیزی، کی** — با همان کالبد `.rv-bk` کارت نوبت.

Source token references (not new definitions): none extracted; inspect specification.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### ScreensAdmin

[preview.html](<../../design-export/design-system-v2/components/ScreensAdmin/preview.html>) · [README.md](<../../design-export/design-system-v2/components/ScreensAdmin/README.md>)

پیشخوان مدیر با عنوان «امروز» و تاریخ، Scope، حلقه برنامه من، شمارش‌ها و «ادامه روز»؛ نوبت‌های سالن روی WeekStrip با فیلتر؛ پرونده مشتری با اعتبار، نوبت‌های آینده و «رزرو دستی».

Source token references (not new definitions): none extracted; inspect specification.

Planned owner: Phase 06–08; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### ScreensCustomer

[preview.html](<../../design-export/design-system-v2/components/ScreensCustomer/preview.html>) · [README.md](<../../design-export/design-system-v2/components/ScreensCustomer/README.md>)

خانه مشتری (لوگو و اعلان در نوار بالا، `AppointmentHero` به‌عنوان نقطه تمرکز، پاسخ آماده پرداخت با نگه‌داشت، اعتبار، نوار پایین با دکمه «رزرو» جدا)، انتخاب زمان (خلاصه، WeekStrip، زمان‌ها، نوار اقدام) و تایید نوبت (کاشی موفق، بلیت، یادآوری پیامکی).

Source token references (not new definitions): text-primary.

Planned owner: Phase 04; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### ScreensPublic

[preview.html](<../../design-export/design-system-v2/components/ScreensPublic/preview.html>) · [README.md](<../../design-export/design-system-v2/components/ScreensPublic/README.md>)

خانه عمومی روی عکس واقعی سالن با کارت شیشه‌ای و دکمه سبز رزرو؛ ورود با OTP و Passkey؛ پاسخ آرایشگر به درخواست پیشنهادی (زمان، مبلغ نهایی، اطلاع نگه‌داشت ۳ ساعته).

Source token references (not new definitions): text-inverse, text-primary.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### Segmented

[preview.html](<../../design-export/design-system-v2/components/Segmented/preview.html>) · [README.md](<../../design-export/design-system-v2/components/Segmented/README.md>)

کنترل چندحالته روی شیشه (`.rv-seg.rv-glass`)؛ گزینه فعال کپسول جوهری با `aria-selected="true"`.

Source token references (not new definitions): none extracted; inspect specification.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### SettingsFinance

[preview.html](<../../design-export/design-system-v2/components/SettingsFinance/preview.html>) · [README.md](<../../design-export/design-system-v2/components/SettingsFinance/README.md>)

- آکاردئون: فقط یک بخش باز؛ ویرایش هر فیلد در برگه پایین.

Source token references (not new definitions): accent-500, shadow-hairline, radius-lg.

Planned owner: Phase 08; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### ShellBars

[preview.html](<../../design-export/design-system-v2/components/ShellBars/preview.html>) · [README.md](<../../design-export/design-system-v2/components/ShellBars/README.md>)

نام‌های مستند: **InnerTopBar**، **PublicTopBar**، **ScopeBar**، **ScopeMenu**، **StylistChip**، **ActionCenterPeek**. کلاس‌ها همان کلاس‌های بوم دسته ۱ هستند و تغییر نام نمی‌دهند.

Source token references (not new definitions): radius-lg, shadow-hairline.

Runtime: Phase 02; [_HeaderPublic.njk](<../../src/Views/Shared/_HeaderPublic.njk>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### StaffDashboard

[preview.html](<../../design-export/design-system-v2/components/StaffDashboard/preview.html>) · [README.md](<../../design-export/design-system-v2/components/StaffDashboard/README.md>)

نام‌های مستند: **DayGauge**، **QuickActionTile**، **CurrentAppointmentCard**، **RequestDueCard**، **TodayPlanTabs**، **DayTimeline**، **NoAppointmentDay**.

Source token references (not new definitions): shadow-hairline, space-2, space-3, bg-inverse-raised, text-primary.

Planned owner: Phase 05; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### StatCard

[preview.html](<../../design-export/design-system-v2/components/StatCard/preview.html>) · [README.md](<../../design-export/design-system-v2/components/StatCard/README.md>)

شمارش‌های زمینه‌ای داشبورد، نه سیستم KPI یا گزارش.

Source token references (not new definitions): font-numeric, accent-500.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### StatePage

[preview.html](<../../design-export/design-system-v2/components/StatePage/preview.html>) · [README.md](<../../design-export/design-system-v2/components/StatePage/README.md>)

نام مستند: **StatePage**. الگوی یگانه همه صفحه‌های نتیجه، خطا و وضعیت سیستم (D10-191).

Source token references (not new definitions): shadow-hairline, space-3, radius-md, bg-surface.

Runtime: Phase 03; [_StatePage.njk](<../../src/Views/Shared/Components/_StatePage.njk>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### StatusBadge

[preview.html](<../../design-export/design-system-v2/components/StatusBadge/preview.html>) · [README.md](<../../design-export/design-system-v2/components/StatusBadge/README.md>)

تگ وضعیت `.rv-tag.is-TONE` با واژه + آیکون (یا نقطه `.rv-tag__dot`). نه تن، هر کدام یک معنا:

Source token references (not new definitions): none extracted; inspect specification.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### StatusCatalog

[preview.html](<../../design-export/design-system-v2/components/StatusCatalog/preview.html>) · [README.md](<../../design-export/design-system-v2/components/StatusCatalog/README.md>)

بقیه وضعیت‌های فازها با همان نُه تن: دفتر اعتبار (BR-WAL)، حساب/آرایشگر/خدمت (از جمله «بدون نگاشت، رزرو نمی‌گیرد»)، نمونه‌کار، اعلان و مرکز اقدام، پیامک (در صف، در حال ارسال، ارسال شد، تلاش n از ۴، ناموفق نهایی، دریافت مسدود)، عملیات گروهی، اعلان آزاد شدن زمان و رزرو دوره‌ای.

Source token references (not new definitions): none extracted; inspect specification.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### StylistSchedule

[preview.html](<../../design-export/design-system-v2/components/StylistSchedule/preview.html>) · [README.md](<../../design-export/design-system-v2/components/StylistSchedule/README.md>)

برنامه روز آرایشگر.

Source token references (not new definitions): text-inverse-muted, text-inverse.

Planned owner: Phase 05; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### TextField

[preview.html](<../../design-export/design-system-v2/components/TextField/preview.html>) · [README.md](<../../design-export/design-system-v2/components/TextField/README.md>)

فیلدها سفید جامدند تا روی شیشه خوانا بمانند: `.rv-field` > `label` + `.rv-input` + `.rv-help`.

Source token references (not new definitions): none extracted; inspect specification.

Runtime: Phase 02; [fields.css](<../../src/wwwroot/css/03-components/fields.css>).

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### WalletLedger

[preview.html](<../../design-export/design-system-v2/components/WalletLedger/preview.html>) · [README.md](<../../design-export/design-system-v2/components/WalletLedger/README.md>)

کیف پول و دفتر اعتبار تغییرناپذیر (BR-WAL).

Source token references (not new definitions): none extracted; inspect specification.

Planned owner: Phase 06; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### WeekStrip

[preview.html](<../../design-export/design-system-v2/components/WeekStrip/preview.html>) · [README.md](<../../design-export/design-system-v2/components/WeekStrip/README.md>)

نسخه بازطراحی‌شده: پنل شیشه‌ای هفت روز برابر با کپسول جوهری که به روز انتخاب‌شده **می‌لغزد**.

Source token references (not new definitions): ease-spring, accent-500.

Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.

### WorkSchedule

[preview.html](<../../design-export/design-system-v2/components/WorkSchedule/preview.html>) · [README.md](<../../design-export/design-system-v2/components/WorkSchedule/README.md>)

نام‌های مستند: **WeekSummary**، **WeekPatternRow**، **ExceptionRow**، **HolidayRow**.

Source token references (not new definitions): shadow-hairline.

Planned owner: Phase 05; no canonical runtime implementation asserted.

Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.
