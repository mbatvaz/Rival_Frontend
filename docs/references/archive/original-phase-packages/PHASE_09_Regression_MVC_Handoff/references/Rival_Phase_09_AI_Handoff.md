> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

---
project: Rival
phase: 9
phase_title_fa: "جریان‌های کاربر و جریان‌های عملیاتی/مدیریتی"
canonical_status: "merged_current_truth_pre_phase_10"
canonical_date_gregorian: "2026-10-01"
canonical_scope_through: "Phase 9-1 + owner cross-phase review REV-01..REV-05"
phase_10_started: false
source_files:
  - "Rival_Phase_09_AI_Handoff_v1.0_FA.md"
  - "Rival_Phase_09-1_AI_Handoff_v1.0_FA.md"
---

# Rival — فاز 9 — AI Handoff یکپارچه و Canonical پیش از فاز ۱۰

**عنوان:** جریان‌های کاربر و جریان‌های عملیاتی/مدیریتی

## 0. دستور استفاده برای مدل هوش مصنوعی — مهم

این فایل **Handoff یکپارچه و Canonical پیش از فاز ۱۰** است. هدف آن این است که مدل هوش مصنوعی با خواندن همین فایل، هم وضعیت جاری پروژه Rival را بفهمد و هم جزئیات فاز مربوط را از دست ندهد.

قواعد تفسیر:

1. **تصمیم صریح و تأییدشده جدیدتر بر متن قدیمی متعارض مقدم است.** ترتیب تاریخی فاز بالاتر به‌تنهایی کافی نیست؛ اما هرجا سند جدیدتر صریحاً Rule/Decision قبلی را جایگزین کرده، تصمیم جدیدتر Current Truth است.
2. نسخه‌های یک فاز (`v1.0`, `v1.1`, `v1.2`, ...) شاخه‌های رقیب نیستند؛ نسخه جدیدتر اصلاح/همگام‌سازی تجمعی نسخه قبلی است. برای Base هر فاز از آخرین نسخه در دسترس استفاده شده است.
3. الحاقیه‌های `3-1`, `5-1`, `6-1`, `7-1`, `8-1`, `9-1` داخل فاز مادر خود ادغام شده‌اند. فایل 8-1 که در متن قدیمی با عنوان Gate آمده، طبق تصمیم مالک محصول **الحاقیه واقعی فاز ۸** است و Phase/Gate جداگانه‌ای محسوب نمی‌شود.
4. بخش‌های **Current Truth / Canonical Overrides** این فایل مرجع اجرایی‌اند. اگر در Source Archive انتهای فایل عبارت قدیمی متعارضی دیده شد، آن عبارت فقط برای Traceability نگه‌داری شده و نباید مبنای طراحی یا پیاده‌سازی قرار گیرد.
5. فاز ۱۰ هنوز شروع نشده است. این فایل مجوز شروع خودکار Wireframe نیست.

## 1. خط پایه جاری کل پروژه تا پایان ۹-۱

### 1.1 محصول و معماری پایه

- Rival سامانه فارسی، RTL و Mobile-first مدیریت مشتری و رزرو سالن مردانه طاها در اردبیل است؛ یک شعبه، چند Stylist و دقیقاً یک `OwnerAdmin` دارد.
- نقش‌های انسانی: `Customer`, `Stylist`, `OwnerAdmin`. `OwnerAdmin` یک Actor واقعی است که قابلیت‌های Stylist را نیز دارد؛ Scope یا حالت «من/آرایشگر/همه» Role را عوض نمی‌کند و Impersonation نیست.
- `System/Worker` نقش انسانی نیست و فقط Side Effect/Jobهای ازپیش‌تعریف‌شده را در Context مجاز اجرا می‌کند.
- زمان در Domain با UTC ذخیره می‌شود؛ قواعد محلی و نمایش با منطقه زمانی تهران و تاریخ شمسی انجام می‌شود.
- فناوری پایه مصوب: ASP.NET Core MVC / C#، ASP.NET Core Identity با OTP/Passkey، EF Core برای Write، Dapper برای Read، Razor Views، Tailwind CSS، Alpine.js و htmx؛ سبک معماری Modular Monolith است.
- جلوگیری از تداخل Stylist، جلوگیری از تداخل Appointment فعال Customer، `Snapshot`, `Verify`, `Idempotency`, `Wallet/Ledger` و مجوز سمت سرور invariantهای غیرقابل دورزدن‌اند.

### 1.2 Service و Scheduling

- هر Service دقیقاً یکی از `Fixed`, `Proposed`, `Requested` است.
- **نوع Service پس از ایجاد immutable است.** تغییر نوع همان رکورد وجود ندارد؛ برای تغییر نوع، Service قبلی طبق Soft Delete کامل تعیین تکلیف و Service جدید ساخته می‌شود.
- `Fixed/Proposed` خدمت پایه و قابل Mapping به Stylist هستند. `Requested` Parent مرکب است، فقط از Serviceهای Active از نوع Fixed/Proposed تشکیل می‌شود، Nested Requested ندارد و مستقیم به Stylist واحد Mapping نمی‌شود.
- Service داخل Appointment قطعی قابل تعویض مستقیم نیست؛ خدمت دیگر مستلزم تعیین تکلیف Appointment فعلی و Booking جدید است.
- هر Stylist Timeline مستقل با ظرفیت هم‌زمان یک نفر دارد؛ کوچک‌ترین واحد مفهومی زمان ۳۰ دقیقه است و Duration خدمت مضرب صحیح آن است.
- `ReleaseAt` برای Block شخصی Stylist مجاز است. `BookableFrom` برای `Service + TargetDateRange` فقط OwnerAdmin است.
- تعطیلات رسمی گذشته اثر عملیاتی ندارند. **تعطیلات رسمی آینده به‌طور پیش‌فرض رزرو جدید را می‌بندند، مگر Stylist برای همان تاریخ صریحاً پذیرش/بازبودن را ثبت کرده باشد.** روش تأمین داده تعطیلات در فاز توسعه Backend تعیین می‌شود (منبع دوره‌ای/داده ازپیش‌تهیه‌شده/کتابخانه محاسباتی). اثر کشف/تغییر خودکار تعطیلی آینده بر Appointment از قبل قطعی‌شده هنوز تصمیم Backend/Domain آینده است و نباید حدس زده شود؛ Rule عمومی Preview/Confirm برای تغییر صریح Schedule توسط Actor انسانی پابرجاست.

### 1.3 سه مسیر رزرو

- `Fixed`: Customer خدمت + Stylist + زمان دقیق را انتخاب می‌کند؛ Availability دوباره بررسی و Hold زمانی اولیه ۵ دقیقه ایجاد می‌شود؛ سپس Wallet/Gateway و Verify سمت سرور انجام می‌شود.
- `Proposed`: Customer خدمت + Stylist منتخب + دقیقاً یک بازه ترجیحی اصلی در افق یک ماه می‌دهد؛ Request اولیه ظرفیت نمی‌گیرد. Stylist زمان دقیق و مبلغ نهایی را تعیین می‌کند و پاسخ منتشرشده ۳ ساعت Hold دارد.
- `Requested`: Customer خدمت مرکب را بدون Stylist/Time قطعی ثبت می‌کند؛ توضیح اختیاری و تاریخ ترجیحی اختیاری/غیرالزام‌آور مجاز است و هیچ Hold/تعهد زمانی نمی‌سازد. Request فقط برای OwnerAdmin است. OwnerAdmin Draft چندجزئی `Service + Stylist + Time + FinalReservationFeeSnapshot` می‌سازد؛ Draft ظرفیت نمی‌گیرد؛ Publish فقط با Hold اتمیک همه اجزا برای ۳ ساعت انجام می‌شود؛ Checkout گروهی است و پس از Verify هر جزء Appointment مستقل می‌شود.
- افق Fixed/Proposed یک ماه؛ Recurring فقط Fixed و حداکثر شش ماه؛ Requested در مرحله Customer افق انتخاب زمان یک‌ماهه ندارد.

### 1.4 Pricing / Payment / Wallet

- مدل قیمت فعال: `EffectiveBaseFee × ServiceFactor × BarberFactor` با مبلغ صحیح تومان؛ قاعده قدیمی «بیشترین مبلغ منطبق» منسوخ است.
- `EffectiveBaseFee` برابر BaseFeeOverride معتبر زمان Appointment است و در نبود آن BaseReservationFee عمومی استفاده می‌شود. Override هم‌سطح هم‌پوشان مجاز نیست.
- BaseFeeOverride قابل ایجاد/ویرایش/حذف است؛ تغییر/حذف فقط محاسبات آینده را عوض می‌کند و Snapshot/Payment قبلی را بازنویسی نمی‌کند.
- Wallet از Ledger تغییرناپذیر قابل بازسازی است؛ Balance یا Entry قبلی مستقیم ویرایش نمی‌شود. اصلاح فقط با Entry جدید `Adjustment/Reversal` انجام می‌شود.
- پرداخت موفق فقط پس از Verify معتبر سمت سرور است؛ Callback و عملیات مالی باید یکتااثر باشند.

### 1.5 Lifecycle مدیریتی مهم

- Stylist جدید را فقط OwnerAdmin می‌سازد؛ حساب فوراً Active است، اولین ورود OTP، Mapping اولیه اختیاری است و Active بودن به‌تنهایی Bookable بودن نمی‌سازد.
- Disabled Stylist رزرو/Request جدید Customer و Manual Booking جدید را نمی‌پذیرد، ولی Appointmentهای قطعی آینده خودکار لغو نمی‌شوند؛ Proposed غیرقطعی منتسب، حتی با Hold، لغو/نامعتبر و Hold آزاد می‌شود. دسترسی به Profile/Security/Schedule/Portfolio/Appointment قطعی موجود/Notification/SMS مرتبط در Scope مجاز حفظ می‌شود.
- Soft Delete Stylist غیرقابل بازگشت است و Appointmentهای آینده متاثر طبق قواعد کسب‌وکار/سیستم تعیین تکلیف می‌شوند.
- Soft Delete Service بعد از Impact Preview/Confirm، Appointment آینده متاثر را سیستمی لغو می‌کند، Holdها آزاد و Request/Proposalهای وابسته نامعتبر/لغو می‌شوند؛ Requested مرکب دارای جزء حذف‌شده Disabled می‌شود.
- حذف Mapping عملیات اثرگذار با Preview/Confirm است؛ فرآیندهای متکی به همان Stylist-Service از جمله Appointmentهای آینده همان رابطه طبق Rule خود تعیین تکلیف می‌شوند. Completed/history تغییر نمی‌کنند.
- عملیات گروهی در سطح هر عضو اتمیک است، نه کل Batch. اگر بخشی موفق و بخشی ناموفق باشد وضعیت کلی **«تکمیل با خطا / Partial Success»** است و موارد موفق/ناموفق جدا نمایش داده می‌شوند؛ موفق‌ها Rollback نمی‌شوند.
- Hard Delete محصولی فقط برای Portfolio مصوب است؛ Hide/Unhide با Hard Delete متفاوت است. Hard Delete Portfolio رکورد، رسانه و Audit محصولی همان Item را حذف می‌کند و قابل بازیابی نیست.

### 1.6 Notification، Action Center و Failure — تصمیم نهایی ۹-۱ + بازبینی مالک محصول

- دو مفهوم باید کاملاً جدا بمانند:
  - **Action Center**: Resourceهایی که خود محصول تا تعیین تکلیف واقعاً نیازمند Action می‌داند؛ نمونه قطعی: Requested نیازمند پاسخ و Payment Under Review. Badge بر اساس `actionable/unresolved` است و با Read/Unread اعلان یکی نیست.
  - **Notification Center**: اطلاع‌رسانی با Read/Unread؛ خواندن اعلان فقط به معنی دیده‌شدن است، نه Resolve شدن Domain/Failure.
- OwnerAdmin نیز Notification Center مستقل دارد. این مرکز سه کارکرد دارد:
  1. مشاهده اعلان‌های Business/Domain مربوط به خود او در نقش Stylist/OwnerAdmin، مثل لغو نوبت توسط Customer مرتبط؛
  2. مشاهده اعلان‌های عملیاتی خود سیستم برای OwnerAdmin، مثل Partial Success یک Batch، Failure نهایی یک عضو، اختلال پایدار SMS/Integration یا رخداد عملکردی مهم؛
  3. ایجاد اعلان دستی شخصی/عمومی برای کاربران در Scope مجاز. Stylist اعلان درون‌سامانه دستی ایجاد نمی‌کند و فقط SMS دستی به Customer مرتبط دارد.
- Failure نهایی عملیاتی پس از Retry فنی ازپیش‌تعریف‌شده، در صورت وجود، **فقط Notification مدیریتی** است؛ وارد Action Center نمی‌شود، Resolution tracking ندارد و سیستم مسئول الزام پیگیری/Retry دستی نیست. OwnerAdmin بعد از اطلاع خودش مسئول تصمیم بعدی است و اگر Action انجام دهد فقط از Actionهای معتبر Domain/Financial استفاده می‌کند؛ Force Success و ویرایش مستقیم Status/Ledger ممنوع است.
- برای IA نهایی، مقصد قدیمی «اعلان/Announcement مدیر» به **OwnerAdmin Notification Center** تبدیل/گسترش می‌یابد؛ نام مسیر `/admin/notifications` به‌عنوان نرمال‌سازی Sitemap استفاده می‌شود و قابلیت ایجاد اعلان دستی نیز داخل همین Context قرار می‌گیرد. `/admin/sms` مستقل باقی می‌ماند.
- `/admin/action-center` صفحه مستقل برای Actionable Resourceهاست؛ Dashboard فقط Badge/Preview کوتاه دارد.

### 1.7 Reports / KPI — تصمیم بازبینی نهایی مالک محصول

- Rival **نیازمند فرایند Reports یا KPI مدیریتی درون محصول نیست** و OwnerAdmin گزارش کلان کسب‌وکاری نمی‌خواهد.
- صفحه مستقل `/admin/reports` و نیازمندی «گزارش عملیاتی پایه/KPI» از Current Truth حذف می‌شود.
- ممکن است در Wireframe برای بهبود UI چند شمارنده/آمار ساده و زمینه‌ای (مثلاً Count) نمایش داده شود؛ این موضوع KPI/Reporting subsystem نیست و محل/مقدار آن در طراحی UI تعیین می‌شود.
- Metrics فاز ۲ مثل M01/M02/... معیار ارزیابی موفقیت پروژه‌اند، نه قابلیت Reports داخل محصول.

### 1.8 Mobile IA الحاقیه 8-1

- فاز ۸ فقط دو لایه دارد: **Phase 8 اصلی + Phase 8-1 الحاقیه Mobile IA**. عنوان قدیمی Gate در فایل منبع یک اشتباه نام‌گذاری تاریخی است و Phase جداگانه ایجاد نمی‌کند.
- Create Stylist و Create Service صفحه Route مستقل ندارند؛ از List CTA و Full-screen Modal/Sheet موبایلی شروع می‌شوند.
- Actionهای کوتاه/حساس با Action/State، Confirm Dialog/Bottom Sheet یا Full-screen Modal/Sheet در صفحه موجود پوشش داده می‌شوند؛ System/Worker UI مستقل ندارد.
- Action Center صفحه مستقل دارد؛ Notification Center OwnerAdmin نیز طبق تصمیم بازبینی نهایی بالا وجود دارد.

## 2. Current Truth ویژه فاز ۹ — ادغام User Flow + الحاقیه ۹-۱

فاز ۹ جریان‌های اصلی Customer/Booking/Payment را پوشش می‌دهد و ۹-۱ Flowهای عملیاتی/مدیریتی را به آن اضافه می‌کند. `D91-01` و `D91-02` آخرین مرجع Failure handling هستند.

### تصمیم‌های قطعی فاز ۹

- `D9-01`: Requested توضیح اختیاری + تاریخ ترجیحی اختیاری/غیرالزام‌آور دارد؛ Hold/تعهد زمانی نمی‌سازد.
- `D9-02`: Proposed دقیقاً یک بازه ترجیحی اصلی دارد.
- `D9-03`: Action Center Badge = تعداد Resourceهای actionable/unresolved، مستقل از Notification Read/Unread.
- `D9-04`: Availability alert deep link با Service+Stylist prefilled + Fresh Availability، بدون Hold/priority/auto-booking.
- `D91-01`: Batch member operationها مستقل؛ Partial Success = «تکمیل با خطا»، با لیست موفق/ناموفق.
- `D91-02`: Failure نهایی فقط OwnerAdmin Notification؛ Read/Unread؛ بدون Action Center و بدون Resolution tracking.

### Flowهای عملیاتی ۹-۱

`OF91-01..15` مرجع هستند: Create Stylist/initial Mapping، Disabled/Reactivate/SoftDelete Stylist، Customer lifecycle/mobile correction، Service create/edit/lifecycle، Requested composition، Mapping، Pricing، Schedule/Holiday/BookableFrom، Settings/Templates، Portfolio، SMS، Action Center vs Failure Notification، Wallet Adjustment/Reversal.

### اصلاح Holiday Flow با بازبینی مالک محصول

- Past official holiday تغییر عملیاتی لازم ندارد.
- Future official holiday new booking را Block می‌کند مگر Stylist برای آن تاریخ صریحاً Open/Accept ثبت کند.
- روش کشف/نگهداری holiday data در Backend development تعیین می‌شود. Automatic source update و اثر آن بر Appointment از پیش Confirmed هنوز تصمیم فنی/Domain آینده است؛ فاز ۹ نباید آن را حدس بزند.

### Reports/KPI

- الزام قبلی تصمیم KPI پیش از Wireframe حذف شده است. سیستم Reports/KPI مدیریتی ندارد؛ فقط Count/Statistic ساده UI در صورت نیاز فاز ۱۰.

### IA مقصد Failure

- Operational Failureها و Health notifications در OwnerAdmin Notification Center هستند؛ Action Center فقط actionable resourceها.


### رزرو دستی — Override بدون دلیل (تصمیم مالک، ۲۲ اکتبر ۲۰۲۶)

- Stylist و OwnerAdmin هنگام رزرو دستی برای استفاده از Overrideهای مجاز (فاصله حداقلی تا شروع، افق یک‌ماهه، روز/ساعت خدمت، تعطیلی) **دلیل ثبت نمی‌کنند** و توضیحی هم برای مدیر ارسال نمی‌شود.
- Overrideهای غیرمجاز همچنان ممنوع‌اند: تداخل Stylist، تداخل Appointmentهای Customer، یکپارچگی مالی و یکتایی اثر (BR-OPS-04).
- Actor واقعی و Overrideهای استفاده‌شده همچنان Audit می‌شوند (BR-OPS-05).
- هر عبارت قدیمی‌تر «با ثبت دلیل» یا «Override با دلیل» درباره رزرو دستی، در این فایل یا فایل‌های دیگر، با این تصمیم جایگزین شده است.


### SF-06 — نقطهٔ شروع اصلاح موجودی (تصمیم مالک، ۳۱ اکتبر ۲۰۲۶؛ D10-171 تا D10-177)

- **نقطهٔ شروع SF-06 جزئیات مشتری (ADM-09) است، نه صفحهٔ جدا:** مدیر در ADM-09 رادیوی «پرداخت‌ها» را می‌زند؛ کارت موجودی دکمهٔ «تغییر موجودی» دارد که برگهٔ «اصلاح موجودی» را باز می‌کند، و در نمای «حرکت‌های اعتبار» هر سطر «اصلاح مدیر» که هنوز برگشت نشده دکمهٔ «برگشت سطر» دارد که برگهٔ «برگشت سطر» را باز می‌کند. ADM-18 (فهرست اعتبار) حذف و ADM-19 (کیف پول مشتری) در ADM-09 ادغام شد؛ مسیرهای `/admin/wallets` و `/admin/wallets/{customerId}` و هر صفحهٔ «تراکنش‌ها» ساخته نمی‌شوند. هر عبارت قدیمی‌تر «Trigger از ADM-18/19»، «نقطه شروع ADM-19» یا «Wallet Customer را از Detail یا جست‌وجوی Wallet باز می‌کند» با این تصمیم جایگزین شده است.
- **دفتر تغییرناپذیر:** نوع سطر فقط یکی از «بازگشت هزینه»، «مصرف برای رزرو»، «اصلاح مدیر» و «برگشت سطر» است؛ هر سطر مبلغ با علامت، دلیل (برای اصلاح و برگشت)، نام مدیر ثبت‌کننده، زمان و پیوند به منبع دارد؛ ویرایش یا حذف سطر وجود ندارد.
- **پرداخت‌های مشتری** (موفق، ناموفق، منقضی، در حال بررسی، تطبیق شد، برگشت خورد) در همان حالت «پرداخت‌ها» فهرست می‌شوند؛ ردیف «در حال بررسی» فقط پیوند «بررسی در پرداخت‌ها و تطبیق» (ADM-16) دارد و دکمهٔ «موفق کن» یا تغییر وضعیت ندارد. تطبیق مالی همچنان فقط در ADM-16 (UF-09) انجام می‌شود.
- صفحهٔ مستقل تاریخچهٔ تراکنش برای **مشتری** همچنان وجود ندارد (بدون تغییر).

## 3. Source Archive کامل برای Traceability — غیرمرجع در صورت تعارض

**هشدار برای مدل:** متن زیر برای حفظ تمام جزئیات، IDها، Acceptance Criteria، جدول‌ها و تاریخچه تصمیم‌ها از فایل‌های اصلی آورده شده است. در هر تعارض، بخش‌های 0 تا 2 همین فایل مرجع Current Truth هستند. هیچ Rule منسوخ داخل Archive را دوباره فعال نکن.

### Source A — Rival_Phase_09_AI_Handoff_v1.0_FA.md

```text
---
project: Rival
phase: 9
phase_title_fa: جریان‌های کاربر
phase_title_en: User Flow
version: "1.0"
status: final_approved_closed
approval_date_jalali: "1405-07-07"
approval_date_gregorian: "2026-09-29"
source_review_version: "0.2"
primary_input_phase: 8
open_decisions: []
next_phase: 10
next_phase_title_fa: وایرفریم
start_next_phase_requires_explicit_owner_instruction: true
---

# خلاصه انتقال نهایی فاز ۹ پروژه Rival — نسخه ۱٫۰

> این فایل مرجع کامل و ماشین‌خوان فاز ۹ است. نسخه انسانی رسمی، `Rival_Phase_09_User_Flow_v1.0_FA.docx` است. در تعارض با منابع قدیمی، تصمیم جدیدترِ صریحاً تأییدشده مقدم است.

## وضعیت نهایی و قواعد حیاتی انتقالی

- فاز ۹ پس از بازبینی انسانی بدون ایراد مؤثر، اعتبارسنجی نهایی مدل و تأیید مالک محصول بسته شده است؛ تصمیم باز محصول وجود ندارد.
- تمام `UF-01` تا `UF-11` فاز ۸ و Flowهای پشتیبان لازم برای ۵۶ Story فاز ۷ پوشش داده شده‌اند.
- `OwnerAdmin` یک Actor واقعی، یک Session و یک پوسته دارد؛ `Scope` فقط دامنه داده را عوض می‌کند و `Action Center` مستقل از Scope باقی می‌ماند.
- `Fixed`: انتخاب خدمت + Stylist + زمان، بازاعتبارسنجی، Hold پنج‌دقیقه‌ای، Wallet/Gateway و Verify سمت سرور.
- `Proposed`: یک بازه ترجیحی اصلی در افق یک‌ماه؛ Request اولیه ظرفیت را اشغال نمی‌کند؛ پاسخ Stylist زمان/مبلغ نهایی و Hold سه‌ساعته می‌سازد.
- `Requested`: مشتری خدمت مرکب را بدون Stylist/Time قطعی ثبت می‌کند و می‌تواند یک توضیح اختیاری + یک تاریخ ترجیحی اختیاری و غیرالزام‌آور وارد کند؛ این داده‌ها Hold یا تعهد زمانی ایجاد نمی‌کنند. پاسخ فقط توسط OwnerAdmin به‌صورت Draft چندجزئی ساخته و هنگام Publish همه اجزا اتمیک ۳ ساعت Hold می‌شوند.
- پس از Verify بسته Requested، هر جزء یک Appointment مستقل می‌شود؛ عملیات بعدی هر Appointment طبق نوع خدمت پایه خودش انجام می‌شود.
- Badge در `Action Center` تعداد منابع واقعاً unresolved/actionable است و با Read/Unread اعلان‌ها مخلوط نمی‌شود.
- Deep Link پیامک اعلان آزادشدن به `CUS-02` می‌رود، `Service+Stylist` را از پیش پر می‌کند و Availability را تازه محاسبه می‌کند؛ هیچ Hold، اولویت یا رزرو خودکار ایجاد نمی‌شود.
- قیمت‌گذاری مالی در همه Flowها تابع مدل لایه‌ای فاز ۵ است: `EffectiveBaseFee × ServiceFactor × BarberFactor`؛ عبارت میراثی «بیشترین مبلغ» فاز ۳ در همگام‌سازی پس از فاز ۹ پاک‌سازی شده است.
- عملیات حساس، گروهی و مالی باید سمت سرور مجاز، تراکنشی و Idempotent باشند؛ تغییر شناسه یا تکرار Callback نباید دسترسی افقی یا اثر دوم ایجاد کند.
- زمان دامنه UTC است و قواعد/نمایش محلی بر منطقه زمانی تهران و تاریخ شمسی تکیه دارند.
- فاز ۱۰ به‌صورت خودکار آغاز نمی‌شود؛ شروع Wireframe فقط با دستور صریح مالک محصول مجاز است.

## تصمیم‌های نهایی فاز ۹

| شناسه | تصمیم قطعی |
|---|---|
| `D9-01` | Requested می‌تواند یک توضیح اختیاری و یک تاریخ ترجیحی اختیاری/غیرالزام‌آور داشته باشد؛ هیچ‌کدام Stylist/Time قطعی، Hold یا تعهد زمانی ایجاد نمی‌کنند. |
| `D9-02` | هر BookingRequest نوع Proposed در نسخه اصلی دقیقاً یک بازه ترجیحی اصلی دارد. |
| `D9-03` | Badge مرکز اقدام تعداد منابع unresolved/actionable را می‌شمارد؛ Read/Unread اعلان معیار Badge نیست. |
| `D9-04` | Deep Link اعلان آزادشدن به CUS-02 با Service+Stylist ازپیش‌پرشده و Availability تازه می‌رود؛ بدون Hold/اولویت/رزرو خودکار. |

## انتقال مستقیم به فاز ۱۰

`W9-01` تا `W9-12` مرجع طراحی Wireframe هستند. علاوه بر حالت‌های Default/Loading/Empty/Error/Permission/Expired، فاز ۱۰ باید تفاوت Proposed و Requested، Draft/Atomic Hold، Wallet/Gateway/Under Review، Scope در برابر Role، ReleaseAt در برابر BookableFrom، تصمیم‌های D9-01 تا D9-04 و رفتار موبایل ۳۶۰px را بدون ابهام بصری کند.

## متن کامل سند مرجع

<span dir="rtl">پروژه ریوال</span>

<span dir="rtl">فاز ۹ — جریان‌های کاربر</span>

**User Flow**

<span dir="rtl">نسخه نهایی ۱٫۰ — همراه نمودارهای بصری</span>

<span dir="rtl">سند جامع مسیرهای موفق، شاخه‌های جایگزین، انقضا، خطا،
بازیابی و ردیابی به صفحات و قواعد</span>

| <span dir="rtl">عنوان</span>             | <span dir="rtl">مقدار</span>                                                                                      |
|------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">نام پروژه</span>         | <span dir="rtl">ریوال</span>                                                                                      |
| <span dir="rtl">شماره و عنوان فاز</span> | <span dir="rtl">فاز ۹ — جریان‌های کاربر</span> ⁦(User Flow)⁩                                                         |
| <span dir="rtl">نسخه سند</span>          | <span dir="rtl">۱٫۰ — نسخه نهایی تأییدشده</span>                                                                  |
| <span dir="rtl">تاریخ تأیید نهایی</span> | <span dir="rtl">۷ مهر ۱۴۰۵ برابر با ۲۹ سپتامبر ۲۰۲۶</span>                                                        |
| <span dir="rtl">مبنای مستقیم</span>      | <span dir="rtl">فاز ۸ نسخه ۱٫۰ + فازهای همگام‌شده ۵ نسخه ۱٫۳، ۶ نسخه ۱٫۲ و ۷ نسخه ۱٫۱ + بازبینی نهایی فاز ۹</span> |
| <span dir="rtl">وضعیت</span>             | <span dir="rtl">نهایی، تأییدشده و بسته‌شده</span>                                                                  |
| <span dir="rtl">مرحله بعد</span>         | <span dir="rtl">فاز ۱۰ — ⁦Wireframe⁩؛ شروع فقط با دستور صریح مالک محصول</span>                                      |

| <span dir="rtl">این سند نسخه نهایی و مرجع رسمی فاز ۹ است. بازبینی انسانی و اعتبارسنجی نهایی مدل تکمیل شده، تصمیم‌های D9-01 تا D9-04 قطعی شده‌اند و هیچ تصمیم باز مهم یا ایراد مؤثر باقی نمانده است. فاز ۱۰ فقط با دستور صریح مالک محصول آغاز می‌شود.</span> |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<span dir="rtl">۱. نتیجه ممیزی سخت‌گیرانه منابع پیش از شروع فاز ۹</span>

<span dir="rtl">پیش از طراحی</span> ⁦Flow⁩<span dir="rtl">ها، آخرین نسخه
مستندات فازهای ۱ تا ۸ دوباره تطبیق داده شد. فاز ۸ ورودی مستقیم این فاز
است؛</span> ⁦Story⁩<span dir="rtl">، مجوز، قاعده کسب‌وکار و قید غیرعملکردی
فقط زمانی وارد</span> ⁦Flow⁩ <span dir="rtl">شده که در منبع معتبر پشتیبانی
داشته باشد.</span>

| <span dir="rtl">اولویت</span> | <span dir="rtl">مرجع</span>                             | <span dir="rtl">نسخه</span> | <span dir="rtl">نقش در فاز ۹</span>                                                                                                                                                                        |
|-------------------------------|---------------------------------------------------------|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>      | <span dir="rtl">فاز ۸ —</span> ⁦Sitemap⁩                  | ⁦v1.0⁩                        | ⁦Route⁩<span dir="rtl">ها، گره‌ها،</span> ⁦Deep Link⁩<span dir="rtl">ها، حالت‌های سیستمی و</span> ⁦UF-01⁩ <span dir="rtl">تا</span> ⁦UF-11⁩<span dir="rtl">؛ ورودی مستقیم.</span>                                    |
| <span dir="rtl">۲</span>      | <span dir="rtl">فاز ۷ —</span> ⁦User Stories⁩             | ⁦v1.1⁩                        | <span dir="rtl">۵۶</span> ⁦Story⁩ <span dir="rtl">فعال پس از همگام‌سازی</span> ⁦Requested⁩<span dir="rtl">،</span> ⁦Action Center⁩ <span dir="rtl">و اعلان دستی مدیر.</span>                                      |
| <span dir="rtl">۳</span>      | <span dir="rtl">فاز ۶ —</span> ⁦Roles & Permissions⁩      | ⁦v1.2⁩                        | ⁦Actor⁩<span dir="rtl">،</span> ⁦Ownership⁩<span dir="rtl">،</span> ⁦Scope⁩ <span dir="rtl">مجاز و منع دسترسی افقی.</span>                                                                                       |
| <span dir="rtl">۴</span>      | <span dir="rtl">فاز ۵ —</span> ⁦Business Rules⁩           | ⁦v1.3⁩                        | <span dir="rtl">زمان‌بندی،</span> ⁦Hold⁩<span dir="rtl">، قیمت، پرداخت،</span> ⁦Wallet⁩<span dir="rtl">، لغو</span>⁦/⁩<span dir="rtl">جابه‌جایی،</span> ⁦Requested⁩ <span dir="rtl">و</span> ⁦ReleaseAt/BookableFrom.⁩ |
| <span dir="rtl">۵</span>      | <span dir="rtl">فاز ۴ —</span> ⁦NFR⁩                      | ⁦v1.0⁩                        | ⁦RTL⁩<span dir="rtl">، موبایل، کارایی، خطا،</span> ⁦Idempotency⁩<span dir="rtl">، امنیت، زمان و</span> ⁦Retry.⁩                                                                                                  |
| <span dir="rtl">۶</span>      | <span dir="rtl">فاز ۳ —</span> ⁦Requirements⁩             | ⁦v1.1⁩                        | <span dir="rtl">نیازمندی‌های کارکردی و پذیرش؛ در تعارض قواعد تخصصی جدیدتر مقدم‌اند.</span>                                                                                                                   |
| <span dir="rtl">۷</span>      | <span dir="rtl">فاز ۲ —</span> ⁦Scope & Goals⁩            | ⁦v1.0⁩                        | <span dir="rtl">محدوده محصول و اهداف.</span>                                                                                                                                                               |
| <span dir="rtl">۸</span>      | <span dir="rtl">فاز ۱ —</span> ⁦Architecture & Decisions⁩ | ⁦v1.1⁩                        | <span dir="rtl">اصول معماری و</span> ⁦Invariant⁩<span dir="rtl">های همگام‌شده؛ در نبود مرجع تخصصی جدیدتر.</span>                                                                                              |

| <span dir="rtl">یافته ممیزی: در متن انتقال فاز ۳ نسخه ۱٫۱ یک عبارت میراثی درباره اعمال «بیشترین مبلغ» در قیمت‌گذاری باقی مانده بود، در حالی‌که فاز ۵ نسخه ۱٫۳ مدل لایه‌ای ⁦EffectiveBaseFee⁩ × ⁦ServiceFactor⁩ × ⁦BarberFactor⁩ را مرجع قطعی می‌داند. در همه جریان‌های مالی فاز ۹ مدل لایه‌ای مبنا بوده است و این ناسازگاری در همگام‌سازی پس از بسته‌شدن فاز ۹ در نسخه جدید انتقال فاز ۳ پاک‌سازی شد.</span> |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<span dir="rtl">تعارض‌های قدیمی دیگر مانند فهرست عمومی
خدمات</span>⁦/⁩<span dir="rtl">آرایشگران،</span> ⁦Requested⁩
<span dir="rtl">تک‌آرایشگر و</span> ⁦Hold⁩ <span dir="rtl">پیشنهادی ۶۰
دقیقه نیز به‌علت تصمیم‌های جدیدتر فازهای ۵ تا ۸ در این فاز معتبر محسوب
نمی‌شوند.</span>

<span dir="rtl">۲. هدف و مرز فاز ۹</span>

<span dir="rtl">فاز ۹ مشخص می‌کند</span> ⁦Actor⁩ <span dir="rtl">از
چه</span> ⁦Trigger⁩<span dir="rtl">ی وارد یک مسیر می‌شود، چه پیش‌شرط‌هایی
کنترل می‌شوند، در هر گام چه تصمیمی گرفته می‌شود، چه حالت‌های
موفق</span>⁦/⁩<span dir="rtl">ناموفق</span>⁦/⁩<span dir="rtl">منقضی وجود
دارد و کاربر به کدام گره</span> ⁦Sitemap⁩ <span dir="rtl">هدایت می‌شود. این
فاز ظاهر نهایی صفحه، چیدمان کنترل‌ها، رنگ، اندازه و</span> ⁦Wireframe⁩
<span dir="rtl">را طراحی نمی‌کند.</span>

| <span dir="rtl">داخل محدوده فاز ۹</span>                                                                      | <span dir="rtl">خارج از محدوده و متعلق به فاز ۱۰ یا فازهای فنی</span>                                                     |
|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">مسیر اصلی و شاخه‌های جایگزین هر سناریو</span>                                                  | <span dir="rtl">چیدمان بصری دقیق، اندازه کارت</span>⁦/⁩<span dir="rtl">دکمه،</span> ⁦Typography⁩ <span dir="rtl">نهایی</span> |
| <span dir="rtl">پیش‌شرط،</span> ⁦Guard⁩<span dir="rtl">،</span> ⁦Permission⁩ <span dir="rtl">و</span> ⁦Ownership⁩    | <span dir="rtl">نام</span> ⁦Controller/Endpoint/API⁩ <span dir="rtl">و قرارداد</span> ⁦HTTP⁩                                  |
| <span dir="rtl">حالت‌های</span> ⁦Loading/Expired/Under Review/Forbidden⁩ <span dir="rtl">در سطح رفتار</span>     | <span dir="rtl">طراحی</span> ⁦Component⁩<span dir="rtl">،</span> ⁦CSS⁩ <span dir="rtl">و</span> ⁦Design System⁩                 |
| <span dir="rtl">بازگشت پس از</span> ⁦Login⁩<span dir="rtl">،</span> ⁦Deep Link⁩ <span dir="rtl">و</span> ⁦Recovery⁩ | <span dir="rtl">ساختار نهایی دیتابیس یا</span> ⁦Domain Model⁩                                                               |
| <span dir="rtl">ردیابی</span> ⁦Story⁩ <span dir="rtl">→</span> ⁦Flow⁩ <span dir="rtl">→ صفحه</span>               | <span dir="rtl">جزئیات</span> ⁦Transaction/Lock implementation⁩ <span dir="rtl">که به فازهای معماری تعلق دارد</span>        |

<span dir="rtl">۳. قرارداد مدل‌سازی</span> **⁦Flow⁩**

| <span dir="rtl">مفهوم</span>          | <span dir="rtl">قاعده این سند</span>                                                                                                                                                                                                                               |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩                                 | ⁦Customer⁩<span dir="rtl">،</span> ⁦Stylist⁩<span dir="rtl">،</span> ⁦OwnerAdmin⁩ <span dir="rtl">یا</span> ⁦System/Worker⁩<span dir="rtl">؛</span> ⁦Actor⁩ <span dir="rtl">واقعی</span> ⁦OwnerAdmin⁩ <span dir="rtl">با تغییر</span> ⁦Scope⁩ <span dir="rtl">عوض نمی‌شود.</span> |
| <span dir="rtl">گره صفحه</span>       | <span dir="rtl">شناسه‌های</span> ⁦PUB/CUS/STY/ADM⁩ <span dir="rtl">از فاز ۸؛</span> ⁦Route⁩ <span dir="rtl">صرفاً مرجع رابط است و</span> ⁦API⁩ <span dir="rtl">نیست.</span>                                                                                                |
| ⁦Action⁩ <span dir="rtl">زمینه‌ای</span> | <span dir="rtl">عملی مثل لغو، جابه‌جایی،</span> ⁦NoShow⁩ <span dir="rtl">یا</span> ⁦Adjustment⁩ <span dir="rtl">که از</span> ⁦Detail⁩ <span dir="rtl">منبع آغاز می‌شود و منوی مستقل ندارد.</span>                                                                          |
| ⁦State⁩                                 | <span dir="rtl">حالت‌هایی مانند</span> ⁦Expired⁩<span dir="rtl">،</span> ⁦Under Review⁩ <span dir="rtl">و</span> ⁦Forbidden⁩<span dir="rtl">؛ مقصد روزمره منو نیستند.</span>                                                                                              |
| ⁦Guard⁩                                 | <span dir="rtl">شرطی که پیش از ادامه باید سمت سرور کنترل شود؛ مخفی بودن دکمه مجوز محسوب نمی‌شود.</span>                                                                                                                                                             |
| ⁦Outcome⁩                               | <span dir="rtl">هر</span> ⁦Flow⁩ <span dir="rtl">باید پایان موفق، لغو، انقضا و خطای قابل بازیابی را در صورت وجود مشخص کند.</span>                                                                                                                                    |

<span dir="rtl">۴. قواعد سراسری که در همه</span>
**⁦Flow⁩**<span dir="rtl">ها باید حفظ شوند</span>

<span dir="rtl">• کنترل</span> ⁦Role + Resource Ownership⁩
<span dir="rtl">همیشه سمت سرور انجام می‌شود؛ دسترسی افقی با تغییر شناسه
رد می‌شود.</span>

<span dir="rtl">• هیچ دو</span> ⁦Hold/Appointment⁩ <span dir="rtl">فعال
یک</span> ⁦Stylist⁩ <span dir="rtl">و هیچ دو</span> ⁦Appointment⁩
<span dir="rtl">فعال یک</span> ⁦Customer⁩ <span dir="rtl">نمی‌توانند
هم‌پوشان باشند.</span>

<span dir="rtl">•</span> ⁦BookingRequest⁩ <span dir="rtl">پیش از
قطعی‌شدن</span> ⁦Appointment⁩ <span dir="rtl">است و درخواست اولیه</span>
⁦Proposed/Requested⁩ <span dir="rtl">ظرفیت را مصرف نمی‌کند.</span>

<span dir="rtl">• موفقیت پرداخت فقط پس از</span> ⁦Verify⁩
<span dir="rtl">معتبر سمت سرور پذیرفته می‌شود؛</span> ⁦Redirect⁩
<span dir="rtl">مرورگر موفقیت قطعی نیست.</span>

<span dir="rtl">• در پرداخت ترکیبی، سهم</span> ⁦Wallet⁩
<span dir="rtl">ابتدا</span> ⁦Hold⁩ <span dir="rtl">می‌شود و فقط پس از
موفقیت قطعی</span> ⁦Debit⁩ <span dir="rtl">می‌شود؛ شکست</span>⁦/Timeout Hold⁩
<span dir="rtl">را آزاد می‌کند.</span>

<span dir="rtl">• قیمت،</span> ⁦Cutoff⁩<span dir="rtl">های
لغو</span>⁦/⁩<span dir="rtl">جابه‌جایی و سایر مقادیر لازم برای نوبت</span>
⁦Snapshot⁩ <span dir="rtl">می‌شوند و تغییر تنظیمات آینده آن‌ها را بازنویسی
نمی‌کند.</span>

<span dir="rtl">• عملیات حساس و گروهی باید</span> ⁦Idempotent⁩
<span dir="rtl">و تراکنشی باشند؛ اجرای تکراری اثر مالی یا رزروی دوم
نمی‌سازد.</span>

<span dir="rtl">• زمان دامنه</span> ⁦UTC⁩ <span dir="rtl">است؛ نمایش و
محاسبه قواعد محلی با منطقه زمانی تهران و تاریخ شمسی انجام می‌شود.</span>

<span dir="rtl">• خطاهای</span> ⁦UI⁩ <span dir="rtl">فارسی، کوتاه و قابل
اقدام‌اند و جزئیات فنی</span>⁦/Secret/Stack Trace⁩ <span dir="rtl">افشا
نمی‌شود.</span>

<span dir="rtl">•</span> ⁦OwnerAdmin⁩ <span dir="rtl">یک</span> ⁦Actor⁩
<span dir="rtl">واحد است؛</span> ⁦Scope⁩ <span dir="rtl">«من</span> ⁦/⁩
<span dir="rtl">آرایشگر</span> ⁦/⁩ <span dir="rtl">همه سالن» فقط دامنه
داده همان صفحه را تغییر می‌دهد و</span> ⁦Impersonation⁩
<span dir="rtl">نیست.</span>

<span dir="rtl">•</span> ⁦Requested⁩ <span dir="rtl">در مرحله مشتری</span>
⁦Stylist/Time⁩ <span dir="rtl">ندارد؛ انتشار پاسخ مدیر کل همه اجزا را
اتمیک ۳ ساعت</span> ⁦Hold⁩ <span dir="rtl">می‌کند.</span>

<span dir="rtl">• رزرو دستی</span> ⁦ReservationFeeSnapshot⁩
<span dir="rtl">مرجع دارد اما هیچ</span> ⁦Wallet/Gateway Charge⁩
<span dir="rtl">ایجاد نمی‌کند.</span>

<span dir="rtl">راهنمای خواندن نمودارها: نمودارهای این نسخه خلاصه بصری
مسیرها هستند. جدول گام‌ها، شاخه‌های جایگزین و قواعد متنی مرجع دقیق تصمیم‌ها
باقی می‌مانند و در صورت اختلاف جزئی، متن و جدول مقدم‌اند.</span>

<img src="media/image1.png" style="width:7in;height:4.2in" />

<span dir="rtl">شکل ۹-۱ — نقشه کلی جریان‌های کلیدی و نقش‌ها —</span> User
Flow Overview

**⁦SF-01⁩** <span dir="rtl">— ورود، احراز و بازگشت به مقصد اولیه</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                          |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | <span dir="rtl">کاربر احرازنشده</span> ⁦/⁩ <span dir="rtl">همه نقش‌ها</span>                                             |
| ⁦Trigger⁩                           | <span dir="rtl">ورود مستقیم،</span> ⁦CTA⁩ <span dir="rtl">رزرو یا</span> ⁦Deep Link⁩ <span dir="rtl">حفاظت‌شده</span>      |
| <span dir="rtl">پیش‌شرط‌ها</span>   | <span dir="rtl">صفحه مقصد عمومی یا حفاظت‌شده؛ حساب</span> ⁦SoftDeleted⁩ <span dir="rtl">نباشد</span>                     |
| <span dir="rtl">نقطه شروع</span>  | ⁦AUTH-01 / /login⁩                                                                                                      |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">ورود موفق و بازگشت امن به مقصد مجاز</span>                                                            |
| <span dir="rtl">ردیابی</span>     | ⁦US7-PUB-02⁩<span dir="rtl">،</span> ⁦NFR-SEC-13⁩<span dir="rtl">،</span> ⁦NFR-CMP-04⁩<span dir="rtl">،</span> ⁦D8 Deep Link⁩ |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                      | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                                                                                              |
|----------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | <span dir="rtl">مقصد عمومی یا</span> ⁦Deep Link⁩                 | <span dir="rtl">سامانه مقصد درخواست‌شده را به‌عنوان</span> ⁦Return Target⁩ <span dir="rtl">امن نگه می‌دارد؛ داده حفاظت‌شده پیش از مجوز رندر نمی‌شود.</span>      | <span dir="rtl">اگر صفحه عمومی است ادامه؛ اگر حفاظت‌شده و</span> ⁦Login⁩ <span dir="rtl">نیست →</span> ⁦AUTH-01.⁩                                                                     |
| <span dir="rtl">۲</span>   | ⁦AUTH-01⁩                                                        | ⁦OTP⁩ <span dir="rtl">روش اصلی است؛</span> ⁦Passkey/Password⁩ <span dir="rtl">در صورت فعال‌بودن روش جایگزین همان فضای ورود است.</span>                         | <span dir="rtl">کاربر روش مجاز را انتخاب می‌کند.</span>                                                                                                                           |
| <span dir="rtl">۳</span>   | <span dir="rtl">ارسال</span>⁦/⁩<span dir="rtl">اعتبار</span> ⁦OTP⁩ | <span dir="rtl">پاسخ وجود یا نبود شماره را افشا نمی‌کند؛</span> ⁦Rate Limit⁩ <span dir="rtl">و</span> ⁦Anti-bot⁩ <span dir="rtl">طبق فاز ۴ اعمال می‌شود.</span> | <span dir="rtl">موفق → احراز؛ محدودیت → پیام</span> ⁦429⁩ <span dir="rtl">قابل فهم؛ کد نامعتبر → تلاش مجاز.</span>                                                                 |
| <span dir="rtl">۴</span>   | <span dir="rtl">پس از احراز</span>                             | ⁦Role⁩ <span dir="rtl">و وضعیت حساب سمت سرور تعیین می‌شود.</span>                                                                                            | ⁦Active⁩ <span dir="rtl">→ مقصد؛</span> ⁦Disabled Customer⁩ <span dir="rtl">→ پنل</span> ⁦Read-only⁩<span dir="rtl">؛</span> ⁦SoftDeleted⁩ <span dir="rtl">→</span> ⁦Account unavailable.⁩ |
| <span dir="rtl">۵</span>   | <span dir="rtl">بازگشت</span>                                  | ⁦Return Target⁩ <span dir="rtl">فقط اگر برای</span> ⁦Actor⁩ <span dir="rtl">مجاز باشد باز می‌شود.</span>                                                       | <span dir="rtl">مجاز → همان</span> ⁦Detail/Flow⁩<span dir="rtl">؛ نامجاز →</span> ⁦Forbidden/Redirect⁩ <span dir="rtl">امن.</span>                                                   |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                   | <span dir="rtl">رفتار قطعی</span>                                                                                       |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">نشست منقضی در وسط</span> ⁦Flow⁩ | <span dir="rtl">پس از احراز مجدد، داده غیرحساس قابل بازیابی حفظ می‌شود و عملیات حساس بدون تکرار اثر ادامه می‌یابد.</span> |
| ⁦JavaScript⁩ <span dir="rtl">غیرفعال</span>     | ⁦Guide State⁩ <span dir="rtl">فارسی نمایش داده می‌شود؛ مسیر کامل بدون</span> ⁦JavaScript⁩ <span dir="rtl">الزام نیست.</span> |
| ⁦Deep Link⁩ <span dir="rtl">منبع دیگر</span>    | <span dir="rtl">بدون افشای وجود</span>⁦/⁩<span dir="rtl">جزئیات منبع رد می‌شود.</span>                                     |

**⁦UF-01⁩** <span dir="rtl">— رزرو</span> **⁦Fixed⁩**
<span dir="rtl">انتها‌به‌انتها</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                                             |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Customer⁩                                                                                                                                 |
| ⁦Trigger⁩                           | ⁦CTA⁩ <span dir="rtl">«رزرو جدید» یا ورود از</span> ⁦CUS-01⁩                                                                                 |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Customer⁩ <span dir="rtl">فعال؛ خدمت</span> ⁦Fixed⁩ <span dir="rtl">فعال؛</span> ⁦BookableFrom/⁩<span dir="rtl">برنامه اجازه رزرو بدهد</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦CUS-02 / BK-01⁩                                                                                                                           |
| <span dir="rtl">پایان موفق</span> | ⁦CUS-04⁩ <span dir="rtl">با</span> ⁦Appointment⁩ <span dir="rtl">قطعی و رسید</span>                                                          |
| <span dir="rtl">ردیابی</span>     | ⁦US7-CUS-02..06⁩<span dir="rtl">،</span> ⁦AC7-01⁩<span dir="rtl">،</span> ⁦BR-BKG-01..03⁩<span dir="rtl">،</span> ⁦BR-PAY-01..08⁩                |

<img src="media/image2.png" style="width:7in;height:4.04444in" />

<span dir="rtl">شکل ۹-۲ — جریان رزرو قطعی —</span> UF-01 Fixed

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                                                               | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                           |
|----------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦CUS-02 / BK-01⁩                                                 | <span dir="rtl">مشتری خدمت</span> ⁦Fixed⁩ <span dir="rtl">را انتخاب می‌کند؛</span> ⁦SchedulingType⁩ <span dir="rtl">مسیر را تعیین می‌کند.</span>                                                                                                         | ⁦BK-02.⁩                                                                                        |
| <span dir="rtl">۲</span>   | ⁦BK-02⁩                                                          | <span dir="rtl">فقط</span> ⁦Stylist⁩<span dir="rtl">های فعال و نگاشت‌شده به خدمت نمایش داده می‌شوند؛ ادامه بدون</span> ⁦Stylist⁩ <span dir="rtl">ممنوع است.</span>                                                                                       | ⁦Stylist⁩ <span dir="rtl">انتخاب می‌شود.</span>                                                  |
| <span dir="rtl">۳</span>   | ⁦BK-F01⁩                                                         | <span dir="rtl">تاریخ هدف باید در افق یک‌ماه و پس از</span> ⁦BookableFrom⁩ <span dir="rtl">باشد.</span> ⁦Availability⁩ <span dir="rtl">فقط</span> ⁦Start⁩<span dir="rtl">هایی را نشان می‌دهد که کل</span> ⁦Duration⁩ <span dir="rtl">پیوسته آزاد است.</span> | <span dir="rtl">زمان انتخاب می‌شود یا «زمانی نیست» → امکان</span> ⁦BK-ALERT01.⁩                  |
| <span dir="rtl">۴</span>   | <span dir="rtl">بازاعتبارسنجی</span>                           | <span dir="rtl">پس از انتخاب زمان، برنامه،</span> ⁦Block⁩<span dir="rtl">،</span> ⁦Holiday⁩<span dir="rtl">،</span> ⁦Hold⁩<span dir="rtl">،</span> ⁦Appointment⁩<span dir="rtl">، تداخل</span> ⁦Customer⁩ <span dir="rtl">و قیمت دوباره کنترل می‌شوند.</span> | <span dir="rtl">نامعتبر → بازگشت به</span> ⁦Availability⁩<span dir="rtl">؛ معتبر →</span> ⁦Hold.⁩ |
| <span dir="rtl">۵</span>   | ⁦BK-F02⁩                                                         | ⁦Time Hold⁩ <span dir="rtl">پنج‌دقیقه‌ای ایجاد و</span> ⁦ReservationFeeSnapshot +⁩ <span dir="rtl">قواعد لغو</span>⁦/⁩<span dir="rtl">جابه‌جایی</span> ⁦Snapshot⁩ <span dir="rtl">می‌شوند؛ قوانین رزرو قبل از پرداخت در دسترس‌اند.</span>                       | ⁦Checkout⁩ <span dir="rtl">شروع می‌شود.</span>                                                   |
| <span dir="rtl">۶</span>   | ⁦Checkout⁩                                                       | <span dir="rtl">تا حد موجودی،</span> ⁦Wallet Hold⁩ <span dir="rtl">ایجاد می‌شود؛ فقط مانده به</span> ⁦Gateway⁩ <span dir="rtl">می‌رود. اگر مانده صفر باشد مسیر درگاه لازم نیست.</span>                                                                   | <span dir="rtl">پرداخت داخلی یا</span> ⁦Gateway.⁩                                               |
| <span dir="rtl">۷</span>   | ⁦Gateway / Verify⁩                                               | ⁦Redirect⁩ <span dir="rtl">به‌تنهایی</span> ⁦Success⁩ <span dir="rtl">نیست.</span> ⁦Verify⁩ <span dir="rtl">سمت سرور و</span> ⁦Idempotency⁩ <span dir="rtl">کنترل می‌شود.</span>                                                                             | ⁦Succeeded / Failed / Under Review.⁩                                                            |
| <span dir="rtl">۸</span>   | <span dir="rtl">ثبت نتیجه</span>                               | <span dir="rtl">در موفقیت،</span> ⁦Wallet Hold⁩ <span dir="rtl">به</span> ⁦Debit⁩ <span dir="rtl">تبدیل و</span> ⁦Appointment⁩ <span dir="rtl">قطعی یکتا ساخته می‌شود؛</span> ⁦Time Hold⁩ <span dir="rtl">مصرف می‌شود.</span>                                | ⁦CUS-04 +⁩ <span dir="rtl">پیام تایید در صف.</span>                                             |
| <span dir="rtl">۹</span>   | ⁦CUS-04⁩                                                         | <span dir="rtl">زمان، خدمت،</span> ⁦Stylist⁩<span dir="rtl">،</span> ⁦Snapshot⁩ <span dir="rtl">و رسید مرتبط نمایش داده می‌شود.</span>                                                                                                                  | <span dir="rtl">مدیریت بعدی از</span> ⁦UF-05.⁩                                                  |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                                      | <span dir="rtl">رفتار قطعی</span>                                                                                                                                                                                   |
|------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">انقضای ۵ دقیقه</span>                            | ⁦Time Hold⁩ <span dir="rtl">و</span> ⁦Wallet Hold⁩ <span dir="rtl">آزاد؛</span> ⁦Checkout Expired⁩<span dir="rtl">؛ بازگشت به</span> ⁦Availability⁩ <span dir="rtl">و محاسبه قیمت جدید.</span>                              |
| <span dir="rtl">شکست</span>⁦/Timeout⁩ <span dir="rtl">درگاه</span> | ⁦Wallet Hold⁩ <span dir="rtl">آزاد؛</span> ⁦Appointment⁩ <span dir="rtl">ساخته نمی‌شود؛ تلاش دوباره باید اثر تکراری نسازد.</span>                                                                                        |
| <span dir="rtl">نتیجه نامشخص</span>                              | ⁦STATE-05 Under Review⁩<span dir="rtl">؛ نوبت</span>⁦/Debit⁩ <span dir="rtl">تکراری ساخته نمی‌شود و</span> ⁦UF-09⁩ <span dir="rtl">مرجع تطبیق است.</span>                                                                  |
| ⁦Verify⁩ <span dir="rtl">دیرهنگام</span>                           | <span dir="rtl">اگر زمان هنوز آزاد است تکمیل یکتا ممکن است؛ اگر زمان از دست رفته،</span> ⁦Appointment⁩ <span dir="rtl">متداخل ساخته نمی‌شود و نتیجه مالی طبق</span> ⁦Reconciliation⁩ <span dir="rtl">تعیین می‌شود.</span> |

**⁦UF-02⁩** <span dir="rtl">— ثبت و پیگیری</span> **⁦Proposed⁩**
<span dir="rtl">از دید مشتری</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                                                               |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Customer⁩                                                                                                                                                   |
| ⁦Trigger⁩                           | <span dir="rtl">انتخاب خدمت</span> ⁦Proposed⁩ <span dir="rtl">در</span> ⁦CUS-02⁩                                                                               |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Customer⁩ <span dir="rtl">فعال؛ خدمت</span> ⁦Proposed⁩ <span dir="rtl">فعال؛</span> ⁦Stylist⁩ <span dir="rtl">منتخب ارائه‌دهنده؛ ترجیح زمانی در افق یک‌ماه</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦CUS-02 / BK-P01⁩                                                                                                                                            |
| <span dir="rtl">پایان موفق</span> | ⁦Appointment⁩ <span dir="rtl">قطعی یا</span> ⁦Request⁩ <span dir="rtl">رد</span>⁦/⁩<span dir="rtl">لغو</span>⁦/⁩<span dir="rtl">منقضی</span>                       |
| <span dir="rtl">ردیابی</span>     | ⁦US7-CUS-07,09,10⁩<span dir="rtl">،</span> ⁦AC7-02⁩<span dir="rtl">،</span> ⁦BR-BKG-04,05,07,10⁩                                                                 |

<img src="media/image3.png" style="width:7in;height:4.58889in" />

<span dir="rtl">شکل ۹-۳ — جریان درخواست پیشنهادی مشتری و آرایشگر
—</span> UF-02 + UF-07 Proposed

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                      | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                        |
|----------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦BK-01⁩ <span dir="rtl">→</span> ⁦BK-02⁩                           | <span dir="rtl">مشتری خدمت</span> ⁦Proposed⁩ <span dir="rtl">و سپس</span> ⁦Stylist⁩ <span dir="rtl">ارائه‌دهنده را انتخاب می‌کند.</span>                                                        | ⁦BK-P01.⁩                                                                                    |
| <span dir="rtl">۲</span>   | ⁦BK-P01⁩                                                         | <span dir="rtl">مشتری یک بازه ترجیحی اصلی را در افق یک‌ماه ثبت می‌کند؛ خود درخواست ظرفیت را ⁦Hold⁩ نمی‌کند.</span>                                                                             | ⁦BookingRequest =⁩ <span dir="rtl">«در انتظار بررسی».</span>                                 |
| <span dir="rtl">۳</span>   | ⁦CUS-06⁩                                                         | <span dir="rtl">شماره پیگیری، خدمت،</span> ⁦Stylist⁩ <span dir="rtl">و وضعیت نمایش داده می‌شود؛ مشتری تا قطعی‌شدن می‌تواند لغو کند.</span>                                                     | <span dir="rtl">در انتظار پاسخ</span> ⁦Stylist⁩ <span dir="rtl">تا حداکثر ۷ روز.</span>      |
| <span dir="rtl">۴</span>   | <span dir="rtl">پاسخ</span> ⁦Stylist⁩                            | ⁦UF-07⁩ <span dir="rtl">زمان دقیق و</span> ⁦FinalReservationFee⁩ <span dir="rtl">را تعیین یا درخواست را رد می‌کند.</span>                                                                      | <span dir="rtl">رد → «رد شده»؛ قبول →</span> ⁦Hold 3h.⁩                                      |
| <span dir="rtl">۵</span>   | ⁦CUS-06 /⁩ <span dir="rtl">در انتظار پرداخت</span>               | <span dir="rtl">زمان، مبلغ نهایی، تایمر ۳ساعته و</span> ⁦CTA⁩<span dir="rtl">های فقط «پرداخت» یا «لغو» نمایش داده می‌شوند.</span>                                                            | <span dir="rtl">پرداخت</span> ⁦/⁩ <span dir="rtl">لغو</span> ⁦/⁩ <span dir="rtl">انقضا.</span> |
| <span dir="rtl">۶</span>   | ⁦Checkout⁩                                                       | ⁦Wallet/Gateway⁩ <span dir="rtl">مانند</span> ⁦UF-01⁩<span dir="rtl">؛ کل مبلغ</span> ⁦FinalReservationFeeSnapshot⁩ <span dir="rtl">باید تسویه شود.</span>                                      | ⁦Verify.⁩                                                                                    |
| <span dir="rtl">۷</span>   | ⁦Verify⁩ <span dir="rtl">موفق</span>                             | <span dir="rtl">یک</span> ⁦Appointment⁩ <span dir="rtl">مستقل ساخته می‌شود؛ پیام تایید صف می‌شود.</span>                                                                                      | ⁦CUS-04⁩<span dir="rtl">؛ درخواست «رزرو شده».</span>                                         |
| <span dir="rtl">۸</span>   | <span dir="rtl">بعد از قطعی‌شدن</span>                          | ⁦Appointment⁩ <span dir="rtl">مسیر</span> ⁦Proposed⁩ <span dir="rtl">توسط مشتری قابل لغو طبق</span> ⁦UF-05⁩ <span dir="rtl">است اما جابه‌جایی عادی</span> ⁦Customer⁩ <span dir="rtl">ندارد.</span> | <span dir="rtl">مدیریت مستقل</span> ⁦Appointment.⁩                                           |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>            | <span dir="rtl">رفتار قطعی</span>                                                                                                    |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">بی‌پاسخ ۷ روز</span>    | <span dir="rtl">سامانه درخواست را مانند رد</span> ⁦Stylist⁩ <span dir="rtl">می‌بندد؛</span> ⁦Hold/⁩<span dir="rtl">اثر مالی ندارد.</span> |
| <span dir="rtl">لغو قبل از پاسخ</span> | <span dir="rtl">درخواست لغو؛ اثر مالی</span>⁦/⁩<span dir="rtl">رزروی صفر.</span>                                                       |
| <span dir="rtl">لغو در</span> ⁦Hold⁩     | ⁦Hold⁩ <span dir="rtl">زمان و</span> ⁦Wallet⁩ <span dir="rtl">در صورت وجود آزاد؛</span> ⁦Request⁩ <span dir="rtl">لغو.</span>              |
| <span dir="rtl">پایان ۳ ساعت</span>    | ⁦Hold⁩ <span dir="rtl">آزاد و وضعیت «منقضی شده»؛ ادامه نیازمند درخواست جدید است.</span>                                                |

**⁦UF-03⁩** <span dir="rtl">—</span> **⁦Requested⁩** <span dir="rtl">مرکب از
دید مشتری</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                                                                  |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Customer⁩                                                                                                                                                      |
| ⁦Trigger⁩                           | <span dir="rtl">انتخاب خدمت</span> ⁦Requested⁩ <span dir="rtl">در</span> ⁦CUS-02⁩                                                                                 |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Customer⁩ <span dir="rtl">فعال؛ خدمت</span> ⁦Requested⁩ <span dir="rtl">فعال و دارای اجزای معتبر؛ مشتری</span> ⁦Stylist/Time⁩ <span dir="rtl">انتخاب نمی‌کند</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦CUS-02 / BK-R01⁩                                                                                                                                               |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">پرداخت یک‌جای بسته و مشاهده</span> ⁦Appointment⁩<span dir="rtl">های مستقل</span>                                                                 |
| <span dir="rtl">ردیابی</span>     | ⁦US7-CUS-08..10⁩<span dir="rtl">،</span> ⁦AC7-03,04⁩<span dir="rtl">،</span> ⁦BR-BKG-06,11,12⁩<span dir="rtl">،</span> ⁦BR-PAY-12⁩                                    |

<img src="media/image4.png" style="width:7in;height:4.97368in" />

<span dir="rtl">شکل ۹-۴ — جریان درخواست مرکب مشتری، مدیر کل و سامانه
—</span> UF-03 + UF-11 Requested

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                                                                                             | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                  |
|----------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦CUS-02 / BK-01⁩                                                 | <span dir="rtl">مشتری فقط خدمت</span> ⁦Requested⁩ <span dir="rtl">مرکب را انتخاب می‌کند؛ مرحله انتخاب</span> ⁦Stylist⁩ <span dir="rtl">و</span> ⁦Time⁩ <span dir="rtl">نمایش داده نمی‌شود.</span>                                                                                        | ⁦BK-R01.⁩                                                                                              |
| <span dir="rtl">۲</span>   | ⁦BK-R01⁩                                                         | <span dir="rtl">درخواست با انتخاب خدمت ⁦Requested⁩ ثبت می‌شود. مشتری می‌تواند یک توضیح اختیاری و یک تاریخ ترجیحی اختیاری و غیرالزام‌آور وارد کند؛ هیچ‌کدام ⁦Stylist/Time⁩ قطعی، ⁦Hold⁩ یا تعهد زمانی ایجاد نمی‌کنند.</span>                                                                 | ⁦BookingRequest =⁩ <span dir="rtl">«در انتظار بررسی» و فقط</span> ⁦OwnerAdmin.⁩                          |
| <span dir="rtl">۳</span>   | ⁦CUS-06⁩                                                         | <span dir="rtl">مشتری وضعیت را می‌بیند و تا پیش از قطعی‌شدن می‌تواند کل درخواست را لغو کند.</span>                                                                                                                                                                                  | ⁦Action Center⁩ <span dir="rtl">مدیر، مورد را نیازمند اقدام می‌بیند.</span>                             |
| <span dir="rtl">۴</span>   | <span dir="rtl">هماهنگی مدیر</span>                            | ⁦UF-11 Draft⁩ <span dir="rtl">چندجزئی را می‌سازد؛</span> ⁦Draft⁩ <span dir="rtl">ظرفیت را</span> ⁦Hold⁩ <span dir="rtl">نمی‌کند.</span>                                                                                                                                                  | <span dir="rtl">تا انتشار همچنان «در انتظار بررسی».</span>                                           |
| <span dir="rtl">۵</span>   | <span dir="rtl">انتشار پاسخ</span>                             | <span dir="rtl">همه اجزا اتمیک اعتبارسنجی و برای ۳ ساعت</span> ⁦Hold⁩ <span dir="rtl">می‌شوند؛ هر جزء</span> ⁦Service+Stylist+Time+FinalReservationFeeSnapshot⁩ <span dir="rtl">دارد.</span>                                                                                          | ⁦CUS-06 =⁩ <span dir="rtl">«در انتظار پرداخت».</span>                                                  |
| <span dir="rtl">۶</span>   | <span dir="rtl">بررسی پیشنهاد</span>                           | <span dir="rtl">مشتری تفکیک اجزا،</span> ⁦Total =⁩ <span dir="rtl">جمع</span> ⁦Snapshot⁩<span dir="rtl">ها و یک تایمر مشترک ۳ساعته را می‌بیند.</span>                                                                                                                                 | <span dir="rtl">فقط «پرداخت کل» یا «لغو کل».</span>                                                  |
| <span dir="rtl">۷</span>   | ⁦Checkout⁩ <span dir="rtl">گروهی</span>                          | ⁦Wallet/Gateway⁩ <span dir="rtl">برای</span> ⁦Total⁩<span dir="rtl">؛ پرداخت جزئی هر</span> ⁦Component⁩ <span dir="rtl">یا پذیرش انتخابی اجزا وجود ندارد.</span>                                                                                                                       | ⁦Verify.⁩                                                                                              |
| <span dir="rtl">۸</span>   | ⁦Verify⁩ <span dir="rtl">موفق</span>                             | <span dir="rtl">همه</span> ⁦Appointment⁩<span dir="rtl">های اجزا در یک نتیجه اتمیک ساخته می‌شوند یا هیچ</span> ⁦Appointment⁩ <span dir="rtl">نیمه‌کاره‌ای ساخته نمی‌شود.</span>                                                                                                          | ⁦Request⁩ <span dir="rtl">«رزرو شده»؛ لیست لینک</span> ⁦Appointment⁩<span dir="rtl">ها در</span> ⁦CUS-06.⁩ |
| <span dir="rtl">۹</span>   | <span dir="rtl">پس از قطعی‌شدن</span>                           | <span dir="rtl">هر</span> ⁦Appointment⁩ <span dir="rtl">مستقل است. جزء</span> ⁦Fixed⁩ <span dir="rtl">طبق</span> ⁦UF-05⁩ <span dir="rtl">جابه‌جایی عادی دارد؛ جزء</span> ⁦Proposed⁩ <span dir="rtl">جابه‌جایی</span> ⁦Customer⁩ <span dir="rtl">ندارد؛ لغو هر دو طبق قواعد عمومی است.</span> | ⁦CUS-03/CUS-04⁩ <span dir="rtl">برای هر جزء.</span>                                                    |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                                      | <span dir="rtl">رفتار قطعی</span>                                                                                                                                                       |
|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">لغو قبل از پاسخ</span>                           | ⁦Request⁩ <span dir="rtl">لغو؛ اثر مالی</span>⁦/⁩<span dir="rtl">رزروی صفر.</span>                                                                                                          |
| <span dir="rtl">لغو در مهلت ۳ ساعت</span>                        | <span dir="rtl">تمام</span> ⁦Hold⁩<span dir="rtl">های بسته و</span> ⁦Wallet Hold⁩ <span dir="rtl">احتمالی آزاد می‌شوند؛ لغو جزئی بسته وجود ندارد.</span>                                     |
| <span dir="rtl">انقضا</span>                                     | <span dir="rtl">تمام</span> ⁦Hold⁩<span dir="rtl">های اجزا آزاد؛</span> ⁦Request⁩ <span dir="rtl">«منقضی شده»؛ ادامه نیازمند درخواست جدید است.</span>                                       |
| <span dir="rtl">یک جزء در لحظه انتشار نامعتبر</span>             | <span dir="rtl">هیچ</span> ⁦Hold⁩ <span dir="rtl">جزئی ساخته نمی‌شود؛</span> ⁦Draft⁩ <span dir="rtl">نزد مدیر حفظ می‌شود و</span> ⁦UF-11⁩ <span dir="rtl">باید جزء نامعتبر را اصلاح کند.</span> |
| ⁦Verify⁩ <span dir="rtl">موفق اما ساخت همه نوبت‌ها ممکن نیست</span> | <span dir="rtl">هیچ</span> ⁦Appointment⁩ <span dir="rtl">نیمه‌کاره</span>⁦/⁩<span dir="rtl">متداخل ساخته نمی‌شود؛ نتیجه مالی وارد تطبیق</span> ⁦UF-09⁩ <span dir="rtl">می‌شود.</span>            |

**⁦UF-11⁩** <span dir="rtl">— هماهنگی و پاسخ</span> **⁦Requested⁩**
<span dir="rtl">توسط مدیر کل</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                                                 |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦OwnerAdmin⁩                                                                                                                                   |
| ⁦Trigger⁩                           | ⁦Action Center⁩ <span dir="rtl">یا</span> ⁦ADM-03⁩ <span dir="rtl">روی</span> ⁦Requested⁩ <span dir="rtl">نیازمند اقدام</span>                     |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Request⁩ <span dir="rtl">باز؛ خدمت</span> ⁦Requested⁩ <span dir="rtl">و اجزای پایه معتبر؛</span> ⁦OwnerAdmin⁩ <span dir="rtl">احراز و مجاز</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦ADM-03⁩ <span dir="rtl">→</span> ⁦ADM-04⁩                                                                                                       |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">پیشنهاد سه‌ساعته منتشر یا</span> ⁦Request⁩ <span dir="rtl">رد</span>                                                            |
| <span dir="rtl">ردیابی</span>     | ⁦US7-ADM-06,14⁩<span dir="rtl">،</span> ⁦US7-SYS-09⁩<span dir="rtl">،</span> ⁦AC7-03,13⁩<span dir="rtl">،</span> ⁦AUTH-BKG-09,10⁩                    |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                                                                        | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                                      |
|----------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦Action Center / ADM-03⁩                                         | ⁦Requested⁩ جدید مستقل از ⁦Scope⁩ فعلی در ⁦Action Center⁩ دیده می‌شود؛ ⁦Badge⁩ تعداد منابع حل‌نشده و واقعاً نیازمند اقدام را نشان می‌دهد و با ⁦Read/Unread Notification⁩ مخلوط نمی‌شود؛ ⁦Deep Link⁩ مستقیم به ⁦ADM-04⁩.                                                        | <span dir="rtl">بازکردن</span> ⁦Detail⁩ <span dir="rtl">بدون تغییر</span> ⁦Actor/Role.⁩                                      |
| <span dir="rtl">۲</span>   | ⁦ADM-04⁩                                                         | ⁦Draft⁩ <span dir="rtl">قبلی در صورت وجود بارگذاری می‌شود؛ اجزای خدمت مرکب مشخص‌اند.</span>                                                                                                                                                                     | <span dir="rtl">مدیر روی</span> ⁦Draft⁩ <span dir="rtl">کار می‌کند.</span>                                                  |
| <span dir="rtl">۳</span>   | <span dir="rtl">هر جزء</span> ⁦Draft⁩                            | <span dir="rtl">مدیر</span> ⁦Stylist⁩ <span dir="rtl">واجدشرایط،</span> ⁦Time⁩ <span dir="rtl">دقیق و</span> ⁦FinalReservationFeeSnapshot⁩ <span dir="rtl">را تعیین می‌کند؛ مبلغ پیشنهادی سیستم مرجع است.</span>                                                   | <span dir="rtl">ذخیره</span> ⁦Draft⁩<span dir="rtl">؛ هنوز هیچ</span> ⁦Hold⁩ <span dir="rtl">ظرفیت نیست.</span>              |
| <span dir="rtl">۴</span>   | <span dir="rtl">هماهنگی خارج از سیستم</span>                   | <span dir="rtl">مدیر می‌تواند هماهنگی عملیاتی با</span> ⁦Stylist⁩<span dir="rtl">ها را انجام دهد؛</span> ⁦Requested⁩ <span dir="rtl">در</span> ⁦Inbox Stylist⁩ <span dir="rtl">نمایش داده نمی‌شود.</span>                                                           | <span dir="rtl">بازگشت به</span> ⁦Draft⁩ <span dir="rtl">بدون از دست‌رفتن داده.</span>                                      |
| <span dir="rtl">۵</span>   | <span dir="rtl">ارسال پیشنهاد</span>                           | <span dir="rtl">تمام اجزا از نظر فعال‌بودن</span> ⁦Service/Stylist⁩<span dir="rtl">، نگاشت، زمان آینده،</span> ⁦Availability⁩<span dir="rtl">، تداخل</span> ⁦Stylist⁩ <span dir="rtl">و</span> ⁦Customer⁩ <span dir="rtl">و قواعد سراسری دوباره بررسی می‌شوند.</span> | <span dir="rtl">همه معتبر → مرحله</span> ⁦Hold⁩<span dir="rtl">؛ هر خطا →</span> ⁦Draft⁩ <span dir="rtl">باقی می‌ماند.</span> |
| <span dir="rtl">۶</span>   | ⁦Atomic Hold⁩                                                    | ⁦Hold⁩ <span dir="rtl">همه زمان‌ها در یک عملیات همه‌یا‌هیچ با</span> ⁦Deadline⁩ <span dir="rtl">مشترک ۳ ساعت ایجاد می‌شود؛</span> ⁦Snapshot⁩ <span dir="rtl">هر جزء تثبیت می‌شود.</span>                                                                               | ⁦Request⁩ <span dir="rtl">«در انتظار پرداخت».</span>                                                                       |
| <span dir="rtl">۷</span>   | ⁦Notification/SMS⁩                                               | <span dir="rtl">پیام پاسخ برای</span> ⁦Customer⁩ <span dir="rtl">صف می‌شود؛ شکست</span> ⁦SMS⁩ <span dir="rtl">پاسخ را</span> ⁦rollback⁩ <span dir="rtl">نمی‌کند.</span>                                                                                             | ⁦Customer⁩ <span dir="rtl">از</span> ⁦CUS-06⁩ <span dir="rtl">پیشنهاد را می‌بیند.</span>                                      |
| <span dir="rtl">۸</span>   | <span dir="rtl">انتظار نتیجه</span>                            | <span dir="rtl">پرداخت موفق →</span> ⁦Appointment⁩<span dir="rtl">های مستقل؛</span> ⁦Cancel/Expire⁩ <span dir="rtl">→ آزادسازی همه</span> ⁦Hold⁩<span dir="rtl">ها.</span>                                                                                        | ⁦Action Center⁩ <span dir="rtl">بر اساس وضعیت منبع به‌روز می‌شود.</span>                                                     |
| <span dir="rtl">۹</span>   | <span dir="rtl">رد</span> ⁦Request⁩                              | <span dir="rtl">مدیر می‌تواند</span> ⁦Request⁩ <span dir="rtl">را رد کند؛ دلیل اجباری نیست.</span>                                                                                                                                                             | ⁦Request⁩ <span dir="rtl">«رد شده» و پیام نتیجه برای</span> ⁦Customer.⁩                                                      |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                                                                           | <span dir="rtl">رفتار قطعی</span>                                                                                          |
|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| ⁦Stylist⁩ <span dir="rtl">تلاش به مشاهده</span> ⁦Requested⁩                                               | <span dir="rtl">دسترسی سمت سرور رد می‌شود؛ پس از پرداخت فقط</span> ⁦Appointment⁩ <span dir="rtl">منتسب خودش را می‌بیند.</span> |
| <span dir="rtl">بستن صفحه در</span> ⁦Draft⁩                                                             | ⁦Draft⁩ <span dir="rtl">پایدار می‌ماند و ظرفیت را مصرف نمی‌کند.</span>                                                         |
| <span dir="rtl">حذف</span>⁦/⁩<span dir="rtl">غیرفعال‌شدن</span> ⁦Stylist⁩ <span dir="rtl">جزء</span> ⁦Draft⁩ | <span dir="rtl">آن جزء نامعتبر می‌شود؛ انتشار تا انتخاب</span> ⁦Stylist⁩ <span dir="rtl">معتبر جدید مسدود است.</span>         |

**⁦UF-04⁩** <span dir="rtl">— رزرو دوره‌ای</span> **⁦Fixed⁩**
<span dir="rtl">و</span> **⁦Checkout⁩** <span dir="rtl">گروهی</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                                              |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Customer⁩                                                                                                                                  |
| ⁦Trigger⁩                           | ⁦CTA⁩ <span dir="rtl">«رزرو دوره‌ای» از فضای مشتری</span>                                                                                    |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Customer⁩ <span dir="rtl">فعال؛ فقط</span> ⁦Service⁩<span dir="rtl">های</span> ⁦Fixed⁩<span dir="rtl">؛ حداقل ۳ رخداد؛ افق حداکثر ۶ ماه</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦CUS-01⁩ <span dir="rtl">→</span> ⁦BK-REC01⁩                                                                                                  |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">چند</span> ⁦Appointment⁩ <span dir="rtl">مستقل با یک</span> ⁦Checkout⁩ <span dir="rtl">گروهی</span>                           |
| <span dir="rtl">ردیابی</span>     | ⁦US7-CUS-15,16⁩<span dir="rtl">،</span> ⁦AC7-09⁩<span dir="rtl">،</span> ⁦BR-REC-01..09⁩                                                        |

<img src="media/image5.png" style="width:7in;height:4.27778in" />

<span dir="rtl">شکل ۹-۵ — رزرو دوره‌ای و پرداخت گروهی —</span> UF-04
Recurring

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                      | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                 |
|----------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦BK-REC01⁩                                                       | <span dir="rtl">مشتری حداقل ۳ رخداد تعریف می‌کند؛ هر رخداد می‌تواند</span> ⁦Service⁩ <span dir="rtl">و</span> ⁦Stylist⁩ <span dir="rtl">متفاوت داشته باشد.</span>                                               | <span dir="rtl">فهرست رخدادهای</span> ⁦Draft.⁩                                                        |
| <span dir="rtl">۲</span>   | <span dir="rtl">هر رخداد</span>                                | ⁦Service Fixed⁩<span dir="rtl">،</span> ⁦Stylist⁩ <span dir="rtl">واجدشرایط و</span> ⁦Time⁩ <span dir="rtl">انتخاب می‌شود؛ هم‌پوشانی رخدادهای خود</span> ⁦Customer⁩ <span dir="rtl">ممنوع است.</span>               | <span dir="rtl">رخداد معتبر یا «غیرقابل رزرو».</span>                                               |
| <span dir="rtl">۳</span>   | <span dir="rtl">رخداد نامعتبر</span>                           | <span dir="rtl">سیستم زمان جایگزین خودکار پیشنهاد نمی‌کند.</span>                                                                                                                                          | ⁦Customer⁩ <span dir="rtl">همان رخداد را تغییر می‌دهد یا حذف می‌کند؛ حداقل ۳ رخداد باید حفظ شود.</span> |
| <span dir="rtl">۴</span>   | <span dir="rtl">پیش از</span> ⁦Checkout⁩                         | <span dir="rtl">همه رخدادهای نهایی دوباره از نظر</span> ⁦Availability⁩<span dir="rtl">، تداخل</span> ⁦Customer⁩ <span dir="rtl">و قواعد زمان اعتبارسنجی می‌شوند.</span>                                        | <span dir="rtl">اگر یک رخداد نامعتبر شد → بازگشت به همان رخداد.</span>                              |
| <span dir="rtl">۵</span>   | ⁦Snapshot⁩                                                       | <span dir="rtl">قیمت و قواعد هر رخداد مستقل</span> ⁦Snapshot⁩ <span dir="rtl">می‌شوند؛</span> ⁦Total⁩ <span dir="rtl">برابر جمع دقیق</span> ⁦Snapshot⁩<span dir="rtl">هاست.</span>                               | ⁦Checkout⁩ <span dir="rtl">گروهی.</span>                                                              |
| <span dir="rtl">۶</span>   | <span dir="rtl">پرداخت</span>                                  | ⁦Wallet/Gateway⁩ <span dir="rtl">روی</span> ⁦Total⁩ <span dir="rtl">با قواعد مشترک پرداخت انجام می‌شود.</span>                                                                                                 | ⁦Verify.⁩                                                                                             |
| <span dir="rtl">۷</span>   | <span dir="rtl">ثبت گروه</span>                                | <span dir="rtl">پس از</span> ⁦Success⁩<span dir="rtl">، ثبت گروه حالت نیمه‌کاره ناسازگار ایجاد نمی‌کند؛ هر رخداد</span> ⁦Appointment⁩ <span dir="rtl">و</span> ⁦Booking Chain⁩ <span dir="rtl">مستقل دارد.</span> | ⁦CUS-03⁩ <span dir="rtl">و</span> ⁦Detail⁩<span dir="rtl">های جدا.</span>                               |
| <span dir="rtl">۸</span>   | <span dir="rtl">بعد از ثبت</span>                              | ⁦Customer⁩ <span dir="rtl">هر رخداد را مستقل مدیریت می‌کند؛ تغییر یک رخداد سایر رخدادها را خودکار تغییر نمی‌دهد.</span>                                                                                       | ⁦UF-05⁩ <span dir="rtl">برای هر</span> ⁦Appointment.⁩                                                   |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                     | <span dir="rtl">رفتار قطعی</span>                                                                                                                             |
|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">کمتر از ۳ رخداد</span>          | <span dir="rtl">ادامه به</span> ⁦Checkout⁩ <span dir="rtl">ممنوع است.</span>                                                                                    |
| <span dir="rtl">خطای هم‌زمانی در ثبت گروه</span> | ⁦Appointment⁩ <span dir="rtl">متداخل ساخته نمی‌شود؛ وضعیت مالی در صورت نیاز برای تطبیق باقی می‌ماند.</span>                                                       |
| <span dir="rtl">مدیریت مدیر کل</span>           | ⁦ADM⁩ <span dir="rtl">می‌تواند یک رخداد، رخدادهای بعدی یا کل دوره را با</span> ⁦Scope⁩ <span dir="rtl">صریح عملیات مدیریت کند؛ اثر مالی هر رخداد مستقل است.</span> |

**⁦UF-05⁩** <span dir="rtl">— لغو، جابه‌جایی و حق جبرانی</span>
**⁦Appointment⁩**

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                               |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Customer / Stylist / OwnerAdmin⁩                                                                                            |
| ⁦Trigger⁩                           | ⁦Action⁩ <span dir="rtl">از</span> ⁦CUS-04⁩ <span dir="rtl">یا</span> ⁦STY-06/ADM-06⁩                                            |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Appointment⁩ <span dir="rtl">قطعی؛</span> ⁦Actor⁩ <span dir="rtl">مجاز؛</span> ⁦Snapshot Cutoff⁩<span dir="rtl">ها موجود</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦Appointment Detail⁩                                                                                                         |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">وضعیت نهایی معتبر یا</span> ⁦Appointment⁩ <span dir="rtl">جایگزین بدون دورزدن قواعد</span>                   |
| <span dir="rtl">ردیابی</span>     | ⁦US7-CUS-12..14⁩<span dir="rtl">،</span> ⁦US7-ADM-08⁩<span dir="rtl">،</span> ⁦BR-CAN, BR-RSC, BR-BUS⁩                           |

<img src="media/image6.png" style="width:7in;height:4.72973in" />

<span dir="rtl">شکل ۹-۶ — تصمیم‌های لغو، جابه‌جایی و حق جبرانی —</span>
UF-05

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                                                                                                | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                          |
|----------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦CUS-04⁩                                                         | ⁦Customer Action⁩<span dir="rtl">های مجاز بر اساس</span> ⁦StartAt⁩<span dir="rtl">، نوع خدمت پایه، سهم جابه‌جایی و</span> ⁦CompensationRight⁩ <span dir="rtl">محاسبه می‌شوند.</span>                                                                                                        | <span dir="rtl">لغو</span> ⁦/⁩ <span dir="rtl">جابه‌جایی</span> ⁦/⁩ <span dir="rtl">بدون</span> ⁦Action.⁩           |
| <span dir="rtl">۲</span>   | <span dir="rtl">لغو</span> ⁦Customer⁩                            | <span dir="rtl">اگر بیش از</span> ⁦CancellationCutoff⁩ <span dir="rtl">باقی مانده →</span> ⁦Credit⁩ <span dir="rtl">کامل؛ در مرز دقیق ۲۴ ساعت و داخل</span> ⁦Cutoff⁩ <span dir="rtl">تا</span> ⁦StartAt⁩ <span dir="rtl">→</span> ⁦Credit⁩ <span dir="rtl">صفر، مگر</span> ⁦CompensationRight.⁩ | ⁦Appointment⁩ <span dir="rtl">لغو و زمان آزاد.</span>                                                          |
| <span dir="rtl">۳</span>   | <span dir="rtl">پس از</span> ⁦StartAt⁩                           | <span dir="rtl">لغو یا جابه‌جایی</span> ⁦Customer⁩ <span dir="rtl">مجاز نیست.</span>                                                                                                                                                                                                   | ⁦Action⁩<span dir="rtl">ها غیرفعال با توضیح.</span>                                                            |
| <span dir="rtl">۴</span>   | <span dir="rtl">جابه‌جایی عادی</span> ⁦Customer⁩                  | <span dir="rtl">فقط</span> ⁦Appointment⁩ <span dir="rtl">با نوع خدمت پایه</span> ⁦Fixed⁩<span dir="rtl">؛ حداکثر یک بار در</span> ⁦Booking Chain.⁩                                                                                                                                        | <span dir="rtl">انتخاب</span> ⁦Time⁩ <span dir="rtl">جدید با</span> ⁦Availability⁩ <span dir="rtl">معتبر.</span> |
| <span dir="rtl">۵</span>   | <span dir="rtl">بیش از ۲۴ ساعت</span>                          | <span dir="rtl">جابه‌جایی عادی</span> ⁦Fixed⁩ <span dir="rtl">سهم را مصرف می‌کند ولی</span> ⁦RefundEligibility⁩ <span dir="rtl">حفظ می‌شود.</span>                                                                                                                                         | ⁦Appointment⁩ <span dir="rtl">جایگزین</span>⁦/Chain⁩ <span dir="rtl">ادامه.</span>                               |
| <span dir="rtl">۶</span>   | <span dir="rtl">بین ۲۴ و ۳ ساعت</span>                         | <span dir="rtl">جابه‌جایی عادی</span> ⁦Fixed⁩ <span dir="rtl">یک‌بار مجاز اما</span> ⁦RefundEligibility⁩ <span dir="rtl">همان</span> ⁦Chain⁩ <span dir="rtl">دائماً</span> ⁦Forfeit⁩ <span dir="rtl">می‌شود.</span>                                                                             | ⁦Chain⁩ <span dir="rtl">ادامه با</span> ⁦Eligibility⁩ <span dir="rtl">از دست‌رفته.</span>                         |
| <span dir="rtl">۷</span>   | <span dir="rtl">کمتر از ۳ ساعت</span>                          | <span dir="rtl">جابه‌جایی</span> ⁦Customer⁩ <span dir="rtl">ممنوع؛ لغو پیش از</span> ⁦StartAt⁩ <span dir="rtl">هنوز ممکن است ولی</span> ⁦Credit⁩ <span dir="rtl">عادی صفر.</span>                                                                                                          | <span dir="rtl">پیام قابل اقدام.</span>                                                                      |
| <span dir="rtl">۸</span>   | ⁦Appointment⁩ <span dir="rtl">با پایه</span> ⁦Proposed⁩            | ⁦Customer⁩ <span dir="rtl">جابه‌جایی عادی ندارد، چه مستقل باشد چه جزء</span> ⁦Requested.⁩                                                                                                                                                                                                | <span dir="rtl">فقط لغو طبق قواعد عمومی.</span>                                                              |
| <span dir="rtl">۹</span>   | ⁦Business Reschedule⁩                                            | ⁦Stylist⁩ <span dir="rtl">برای خود</span> ⁦/ OwnerAdmin⁩ <span dir="rtl">برای همه: تغییر معتبر سهم عادی</span> ⁦Customer⁩ <span dir="rtl">را مصرف نمی‌کند و یک</span> ⁦CompensationRight⁩ <span dir="rtl">فعال ایجاد می‌کند.</span>                                                           | <span dir="rtl">پیام تغییر + حق جبرانی.</span>                                                               |
| <span dir="rtl">۱۰</span>  | <span dir="rtl">استفاده حق جبرانی</span>                       | ⁦Customer⁩ <span dir="rtl">یک‌بار یا</span> ⁦Reschedule⁩ <span dir="rtl">جبرانی انجام می‌دهد یا با</span> ⁦Credit⁩ <span dir="rtl">کامل لغو می‌کند.</span>                                                                                                                                   | <span dir="rtl">حق مصرف می‌شود؛ بیش از یک حق فعال نمی‌شود.</span>                                              |
| <span dir="rtl">۱۱</span>  | ⁦Business Cancel⁩                                                | <span dir="rtl">در حالت عادی کل</span> ⁦ReservationFeeSnapshot⁩ <span dir="rtl">به</span> ⁦Wallet Credit⁩ <span dir="rtl">می‌شود؛ حذف نرم</span> ⁦Customer⁩ <span dir="rtl">استثنای صریح است.</span>                                                                                       | ⁦Appointment⁩ <span dir="rtl">لغو و زمان آزاد.</span>                                                          |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                                                       | <span dir="rtl">رفتار قطعی</span>                                                                                                                                                        |
|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">تغییر</span> ⁦Stylist⁩ <span dir="rtl">توسط</span> ⁦OwnerAdmin⁩       | <span dir="rtl">فنی با</span> ⁦Cancel⁩ <span dir="rtl">نوبت قبلی +</span> ⁦New Appointment⁩ <span dir="rtl">بدون تداخل؛</span> ⁦Stylist⁩ <span dir="rtl">عادی مجاز نیست.</span>                |
| <span dir="rtl">تغییر یک جزء</span> ⁦Requested⁩ <span dir="rtl">پس از پرداخت</span> | <span dir="rtl">فقط همان</span> ⁦Appointment⁩ <span dir="rtl">مستقل متاثر است؛ سایر اجزا خودکار تغییر نمی‌کنند.</span>                                                                      |
| ⁦Customer⁩ <span dir="rtl">غیرفعال</span>                                           | <span dir="rtl">لغو</span>⁦/⁩<span dir="rtl">جابه‌جایی جدید از</span> ⁦UI Customer⁩ <span dir="rtl">آغاز نمی‌شود؛ عملیات لازم توسط</span> ⁦OwnerAdmin⁩ <span dir="rtl">یا پس از فعال‌سازی.</span> |

**⁦UF-06⁩** <span dir="rtl">— رزرو دستی آرایشگر و مدیر کل</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                                                      |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Stylist / OwnerAdmin⁩                                                                                                                              |
| ⁦Trigger⁩                           | ⁦CTA⁩ <span dir="rtl">رزرو دستی از</span> ⁦STY-07⁩ <span dir="rtl">یا</span> ⁦ADM-07⁩<span dir="rtl">؛ همچنین ورود زمینه‌ای از مشتری مدیر</span>         |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Stylist⁩ <span dir="rtl">فقط برای خود؛</span> ⁦OwnerAdmin⁩ <span dir="rtl">برای هر</span> ⁦Stylist⁩<span dir="rtl">؛ عدم تداخل غیرقابل</span> ⁦Override⁩ |
| <span dir="rtl">نقطه شروع</span>  | ⁦STY-07 / ADM-07⁩                                                                                                                                   |
| <span dir="rtl">پایان موفق</span> | ⁦Appointment⁩ <span dir="rtl">قطعی بدون اخذ هزینه رزرو</span>                                                                                       |
| <span dir="rtl">ردیابی</span>     | ⁦US7-STY-08,09⁩<span dir="rtl">،</span> ⁦US7-ADM-07⁩<span dir="rtl">،</span> ⁦AC7-06⁩<span dir="rtl">،</span> ⁦BR-PAY-11⁩                                 |

<img src="media/image7.png" style="width:7in;height:3.96667in" />

<span dir="rtl">شکل ۹-۷ — رزرو دستی بدون اخذ هزینه رزرو —</span> UF-06
Manual Booking

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                 | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                 |
|----------------------------|----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | <span dir="rtl">شروع</span>                                    | ⁦Stylist⁩ <span dir="rtl">هدف تعیین می‌شود: در پنل</span> ⁦Stylist⁩ <span dir="rtl">خود او؛ در پنل</span> ⁦OwnerAdmin⁩ <span dir="rtl">خود</span>⁦/Stylist⁩ <span dir="rtl">انتخاب‌شده.</span> | <span dir="rtl">ورود اطلاعات</span> ⁦Customer.⁩                                       |
| <span dir="rtl">۲</span>   | <span dir="rtl">جست‌وجوی</span> ⁦Customer⁩                        | <span dir="rtl">شماره وارد می‌شود؛ حساب موجود → نام</span>⁦/⁩<span dir="rtl">نام خانوادگی نمایش؛ حساب ناموجود → حداقل نام و نام خانوادگی برای ساخت حساب.</span>                         | ⁦Customer⁩ <span dir="rtl">معتبر.</span>                                              |
| <span dir="rtl">۳</span>   | <span dir="rtl">انتخاب</span> ⁦Service⁩                          | <span dir="rtl">فقط</span> ⁦Service⁩ <span dir="rtl">ارائه‌شده توسط</span> ⁦Stylist⁩ <span dir="rtl">هدف انتخاب می‌شود.</span>                                                             | <span dir="rtl">انتخاب</span> ⁦Time.⁩                                                 |
| <span dir="rtl">۴</span>   | <span dir="rtl">انتخاب</span> ⁦Time⁩                             | <span dir="rtl">تداخل</span> ⁦Stylist⁩ <span dir="rtl">و</span> ⁦Customer⁩ <span dir="rtl">همیشه کنترل می‌شود.</span>                                                                     | <span dir="rtl">زمان معتبر یا خطا.</span>                                           |
| <span dir="rtl">۵</span>   | ⁦Override⁩ <span dir="rtl">در صورت نیاز</span>                   | ⁦Lead Time⁩<span dir="rtl">، افق یک‌ماه، روز</span>⁦/⁩<span dir="rtl">ساعت خدمت یا تعطیلی می‌تواند فقط با اختیار مجاز و بدون نیاز به ثبت دلیل نادیده گرفته شود.</span>                                  | <span dir="rtl">قواعد غیرقابل</span> ⁦Override⁩ <span dir="rtl">همچنان برقرار.</span> |
| <span dir="rtl">۶</span>   | <span dir="rtl">خلاصه</span>                                   | ⁦ReservationFee⁩ <span dir="rtl">طبق مدل جاری محاسبه و</span> ⁦Snapshot⁩ <span dir="rtl">مرجع ثبت می‌شود؛</span> ⁦UI⁩ <span dir="rtl">صریح می‌گوید «هزینه رزرو اخذ نمی‌شود».</span>           | <span dir="rtl">تأیید</span> ⁦Actor.⁩                                                 |
| <span dir="rtl">۷</span>   | <span dir="rtl">ثبت</span>                                     | ⁦Appointment⁩ <span dir="rtl">قطعی در یک عملیات یکتا ساخته می‌شود؛ هیچ</span> ⁦Wallet Debit⁩ <span dir="rtl">یا</span> ⁦Gateway Charge⁩ <span dir="rtl">انجام نمی‌شود.</span>                | ⁦Detail⁩ <span dir="rtl">نوبت + پیام تایید در صف.</span>                              |
| <span dir="rtl">۸</span>   | ⁦Audit⁩                                                          | ⁦Actor⁩ <span dir="rtl">واقعی،</span> ⁦Override⁩ <span dir="rtl">استفاده‌شده ثبت می‌شود.</span>                                                                                           | <span dir="rtl">پایان موفق.</span>                                                  |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>           | <span dir="rtl">رفتار قطعی</span>                                                                                           |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">زمان متداخل</span>    | <span dir="rtl">ثبت رد می‌شود؛</span> ⁦Admin Override⁩ <span dir="rtl">هم حق دورزدن تداخل ندارد.</span>                        |
| <span dir="rtl">ساخت حساب جدید</span> | ⁦Role/Status⁩ <span dir="rtl">حساس از</span> ⁦Input⁩ <span dir="rtl">قابل</span> ⁦Mass Assignment⁩ <span dir="rtl">نیستند.</span> |
| <span dir="rtl">خطای</span> ⁦SMS⁩       | ⁦Appointment⁩ <span dir="rtl">حفظ می‌شود؛</span> ⁦Retry⁩ <span dir="rtl">پیام مستقل است.</span>                                  |

**⁦UF-07⁩** <span dir="rtl">— پاسخ</span> **⁦Proposed⁩**
<span dir="rtl">توسط آرایشگر</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                     |
|-----------------------------------|--------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Stylist⁩                                                                                          |
| ⁦Trigger⁩                           | <span dir="rtl">درخواست</span> ⁦Proposed⁩ <span dir="rtl">باز در</span> ⁦STY-03 / Dashboard⁩         |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Request⁩ <span dir="rtl">به همان</span> ⁦Stylist⁩ <span dir="rtl">منتسب، باز و حداکثر ۷ روزه</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦STY-03⁩ <span dir="rtl">→</span> ⁦STY-04⁩                                                           |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">رد</span> ⁦Request⁩ <span dir="rtl">یا پیشنهاد ۳ساعته</span>                       |
| <span dir="rtl">ردیابی</span>     | ⁦US7-STY-05..07⁩<span dir="rtl">،</span> ⁦AC7-02⁩<span dir="rtl">،</span> ⁦AUTH-BKG-02..04⁩            |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span>   | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                           | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                                        |
|----------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦STY-03⁩                                                           | <span dir="rtl">فقط</span> ⁦Proposed⁩ <span dir="rtl">منتسب به خود نمایش داده می‌شود؛</span> ⁦Requested⁩ <span dir="rtl">در</span> ⁦Inbox Stylist⁩ <span dir="rtl">وجود ندارد.</span> | <span dir="rtl">انتخاب</span> ⁦Request.⁩                                                                                     |
| <span dir="rtl">۲</span>   | ⁦STY-04⁩                                                           | <span dir="rtl">اطلاعات حداقلی</span> ⁦Customer⁩<span dir="rtl">، ترجیح زمانی و</span> ⁦SystemSuggestedReservationFee⁩ <span dir="rtl">نمایش داده می‌شود.</span>                    | <span dir="rtl">تصمیم قبول یا رد.</span>                                                                                   |
| <span dir="rtl">۳</span>   | <span dir="rtl">رد</span>                                        | <span dir="rtl">رد نیازمند دلیل اجباری نیست.</span>                                                                                                                            | ⁦Request⁩ <span dir="rtl">«رد شده» + اطلاع</span> ⁦Customer.⁩                                                                  |
| <span dir="rtl">۴</span>   | <span dir="rtl">قبول</span> ⁦/⁩ <span dir="rtl">انتخاب</span> ⁦Time⁩ | ⁦Stylist⁩ <span dir="rtl">زمان دقیق آینده و معتبر را انتخاب می‌کند.</span>                                                                                                        | ⁦Availability⁩ <span dir="rtl">دوباره کنترل می‌شود.</span>                                                                    |
| <span dir="rtl">۵</span>   | <span dir="rtl">قیمت نهایی</span>                                | ⁦Stylist⁩ <span dir="rtl">می‌تواند مبلغ پیشنهادی را بپذیرد یا</span> ⁦FinalReservationFee⁩ <span dir="rtl">دیگری وارد کند؛ این مبلغ هزینه رزرو است نه قیمت کامل خدمت.</span>        | <span dir="rtl">آماده ارسال.</span>                                                                                        |
| <span dir="rtl">۶</span>   | <span dir="rtl">ارسال پاسخ</span>                                | <span dir="rtl">زمان اتمیک</span> ⁦Hold⁩ <span dir="rtl">سه‌ساعته می‌شود و</span> ⁦FinalReservationFeeSnapshot⁩ <span dir="rtl">تثبیت می‌شود.</span>                                  | ⁦Request⁩ <span dir="rtl">«در انتظار پرداخت» +</span> ⁦SMS/Notification.⁩                                                      |
| <span dir="rtl">۷</span>   | <span dir="rtl">انتظار</span>                                    | ⁦Customer⁩ <span dir="rtl">پرداخت</span>⁦/⁩<span dir="rtl">لغو می‌کند یا</span> ⁦Deadline⁩ <span dir="rtl">می‌گذرد.</span>                                                             | ⁦Success⁩ <span dir="rtl">→</span> ⁦Appointment⁩<span dir="rtl">؛</span> ⁦Cancel/Expire⁩ <span dir="rtl">→ آزادسازی</span> ⁦Hold.⁩ |
| <span dir="rtl">۸</span>   | <span dir="rtl">بعد از</span> ⁦Success⁩                            | ⁦Appointment⁩ <span dir="rtl">در</span> ⁦STY-05/06⁩ <span dir="rtl">ظاهر می‌شود.</span>                                                                                             | <span dir="rtl">مدیریت نوبت طبق قواعد کسب‌وکار.</span>                                                                      |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                                                             | <span dir="rtl">رفتار قطعی</span>                                                                                           |
|-----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">زمان هنگام ارسال دیگر آزاد نیست</span>                                  | <span dir="rtl">پاسخ منتشر نمی‌شود؛</span> ⁦Stylist⁩ <span dir="rtl">باید</span> ⁦Time⁩ <span dir="rtl">دیگری انتخاب کند.</span> |
| ⁦Request⁩ <span dir="rtl">پیش از پاسخ توسط</span> ⁦Customer⁩ <span dir="rtl">لغو شده</span> | ⁦Action⁩ <span dir="rtl">قبول</span>⁦/⁩<span dir="rtl">رد دیگر مجاز نیست.</span>                                                |
| <span dir="rtl">۷ روز بدون پاسخ</span>                                                  | <span dir="rtl">سیستم</span> ⁦Request⁩ <span dir="rtl">را مانند رد می‌بندد.</span>                                             |

**⁦UF-08⁩** <span dir="rtl">— تغییر برنامه،</span> **⁦Block⁩**
<span dir="rtl">با</span> **⁦ReleaseAt⁩** <span dir="rtl">و</span>
**⁦BookableFrom⁩**

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                              |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Stylist / OwnerAdmin⁩                                                                                                      |
| ⁦Trigger⁩                           | <span dir="rtl">ویرایش</span> ⁦Schedule⁩ <span dir="rtl">یا قواعد بازشدن رزرو</span>                                        |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Actor⁩ <span dir="rtl">مجاز؛ تغییر سمت سرور معتبر</span>                                                                   |
| <span dir="rtl">نقطه شروع</span>  | ⁦STY-08 / ADM-15⁩                                                                                                           |
| <span dir="rtl">پایان موفق</span> | ⁦Schedule⁩ <span dir="rtl">معتبر، اثرهای لازم اعمال و</span> ⁦Availability⁩ <span dir="rtl">جدید</span>                       |
| <span dir="rtl">ردیابی</span>     | ⁦US7-STY-02..04⁩<span dir="rtl">،</span> ⁦US7-ADM-05⁩<span dir="rtl">،</span> ⁦AC7-12,14⁩<span dir="rtl">،</span> ⁦BR-SCH-09..11⁩ |

<img src="media/image8.png" style="width:7in;height:4.35556in" />

<span dir="rtl">شکل ۹-۸ — تفکیک زمان آزادسازی آرایشگر و زمان بازشدن رزرو
مدیر کل —</span> UF-08

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                                     | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                                  |
|----------------------------|----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦STY-08 / ADM-15⁩                                                | ⁦Actor⁩ <span dir="rtl">الگوی مجاز،</span> ⁦Exception⁩<span dir="rtl">،</span> ⁦Block⁩ <span dir="rtl">یا ساعات کاری را ویرایش می‌کند.</span>                                                                                   | <span dir="rtl">سیستم اثر روی</span> ⁦Appointment⁩<span dir="rtl">های آینده را محاسبه می‌کند.</span>                    |
| <span dir="rtl">۲</span>   | ⁦Preview⁩                                                        | <span dir="rtl">اگر</span> ⁦Appointment⁩ <span dir="rtl">متاثر وجود دارد، فهرست و پیامد مالی قبل از</span> ⁦Apply⁩ <span dir="rtl">نمایش داده می‌شود.</span>                                                                  | ⁦Cancel⁩ <span dir="rtl">عمل یا</span> ⁦Confirm.⁩                                                                        |
| <span dir="rtl">۳</span>   | ⁦Apply⁩                                                          | <span dir="rtl">تغییر تاییدشده ذخیره و</span> ⁦Appointment⁩<span dir="rtl">های متاثر طبق قواعد</span> ⁦Business/System cancellation⁩ <span dir="rtl">مدیریت می‌شوند.</span>                                                   | ⁦Notification/SMS⁩ <span dir="rtl">مربوط صف می‌شود.</span>                                                              |
| <span dir="rtl">۴</span>   | ⁦ReleaseAt⁩                                                      | ⁦Stylist⁩ <span dir="rtl">فقط</span> ⁦Block Timeline⁩ <span dir="rtl">خودش و</span> ⁦OwnerAdmin⁩ <span dir="rtl">برای همه می‌تواند زمان آزادسازی</span> ⁦Block⁩ <span dir="rtl">تعیین کند.</span>                                 | <span dir="rtl">تا</span> ⁦ReleaseAt⁩ <span dir="rtl">بسته؛ پس از آن فقط اگر مانع دیگری نیست وارد</span> ⁦Availability.⁩ |
| <span dir="rtl">۵</span>   | ⁦ADM-15 / BookableFrom⁩                                          | ⁦OwnerAdmin⁩ <span dir="rtl">برای</span> ⁦Service + TargetDateRange⁩ <span dir="rtl">زمان شروع مجاز رزرو تعیین می‌کند؛</span> ⁦Stylist⁩ <span dir="rtl">حق تعریف</span>⁦/⁩<span dir="rtl">تغییر این قاعده سراسری را ندارد.</span> | <span dir="rtl">قبل از زمان،</span> ⁦Booking⁩ <span dir="rtl">برای تاریخ هدف مسدود.</span>                             |
| <span dir="rtl">۶</span>   | <span dir="rtl">رسیدن</span> ⁦BookableFrom⁩                      | <span dir="rtl">قاعده بازشدن دیگر مانع نیست؛</span> ⁦Availability⁩ <span dir="rtl">واقعی،</span> ⁦Schedule⁩<span dir="rtl">،</span> ⁦Hold⁩ <span dir="rtl">و</span> ⁦Appointment⁩ <span dir="rtl">همچنان کنترل می‌شوند.</span>    | ⁦Customer⁩ <span dir="rtl">می‌تواند در صورت</span> ⁦Availability⁩ <span dir="rtl">رزرو کند.</span>                        |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                                                                 | <span dir="rtl">رفتار قطعی</span>                                                                                            |
|---------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| ⁦Block⁩ <span dir="rtl">با</span> ⁦ReleaseAt⁩ <span dir="rtl">روی بازه دارای</span> ⁦Appointment⁩ | ⁦Preview⁩ <span dir="rtl">و قواعد تغییر برنامه مقدم‌اند؛</span> ⁦ReleaseAt⁩ <span dir="rtl">مجوز لغو ضمنی نوبت نیست.</span>       |
| ⁦BookableFrom⁩ <span dir="rtl">و</span> ⁦Appointment⁩ <span dir="rtl">موجود</span>              | <span dir="rtl">قاعده بازشدن رزرو،</span> ⁦Appointment⁩ <span dir="rtl">قطعی موجود را خودکار لغو نمی‌کند.</span>                |
| <span dir="rtl">اجرای</span> ⁦Job/⁩<span dir="rtl">زمان دیرهنگام</span>                       | <span dir="rtl">نتیجه باید</span> ⁦idempotent⁩ <span dir="rtl">باشد؛ بازشدن تنها حذف مانع زمان‌بندی است، نه رزرو خودکار.</span> |

**⁦UF-09⁩** <span dir="rtl">— پرداخت نامشخص، موفقیت دیرهنگام و</span>
**⁦Reconciliation⁩**

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                          |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦System / OwnerAdmin⁩                                                                                                   |
| ⁦Trigger⁩                           | ⁦Verify⁩ <span dir="rtl">نامشخص،</span> ⁦Callback⁩ <span dir="rtl">دیرهنگام یا ادعای کسر وجه بدون نوبت</span>             |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Payment⁩ <span dir="rtl">قابل شناسایی؛</span> ⁦Actor⁩ <span dir="rtl">مدیر برای اقدام دستی</span>                        |
| <span dir="rtl">نقطه شروع</span>  | ⁦STATE-05 / ADM-16⁩                                                                                                     |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">دقیقاً یک اثر نهایی مالی</span>⁦/⁩<span dir="rtl">رزروی</span>                                           |
| <span dir="rtl">ردیابی</span>     | ⁦US7-ADM-10⁩<span dir="rtl">،</span> ⁦US7-SYS-03,04⁩<span dir="rtl">،</span> ⁦AC7-08⁩<span dir="rtl">،</span> ⁦BR-PAY-06..10⁩ |

<img src="media/image9.png" style="width:7in;height:4.42703in" />

<span dir="rtl">شکل ۹-۹ — پرداخت نامشخص و تطبیق یکتای نتیجه —</span>
UF-09 Reconciliation

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                     | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                |
|----------------------------|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | <span dir="rtl">نتیجه نامشخص</span>                            | ⁦UI Success⁩ <span dir="rtl">جعلی نشان نمی‌دهد؛</span> ⁦Payment = Under Review⁩ <span dir="rtl">و عملیات تکراری اثر دوم نمی‌سازند.</span>                                                      | ⁦System retry/⁩<span dir="rtl">بررسی یا</span> ⁦Action Center⁩ <span dir="rtl">مدیر.</span>            |
| <span dir="rtl">۲</span>   | ⁦Verify⁩ <span dir="rtl">دیرهنگام</span>                         | <span dir="rtl">اگر پرداخت تایید و زمان اصلی هنوز بدون تداخل قابل تخصیص است، تکمیل</span> ⁦Appointment⁩ <span dir="rtl">به‌صورت یکتا ممکن است.</span>                                       | ⁦Appointment⁩ <span dir="rtl">یا ادامه تطبیق.</span>                                                 |
| <span dir="rtl">۳</span>   | <span dir="rtl">زمان از دست‌رفته</span>                         | <span dir="rtl">اگر وجه تایید شده ولی</span> ⁦Time⁩ <span dir="rtl">دیگر آزاد نیست،</span> ⁦Appointment⁩ <span dir="rtl">متداخل ساخته نمی‌شود.</span>                                         | <span dir="rtl">نتیجه پس از تطبیق به</span> ⁦Wallet⁩ <span dir="rtl">منتقل می‌شود.</span>             |
| <span dir="rtl">۴</span>   | <span dir="rtl">ادعای</span> ⁦Customer⁩                          | ⁦OwnerAdmin⁩ <span dir="rtl">از</span> ⁦ADM-16⁩ <span dir="rtl">پرداخت و شواهد را بررسی می‌کند.</span>                                                                                        | <span dir="rtl">وجه رسیده</span> ⁦/⁩ <span dir="rtl">نرسیده.</span>                                  |
| <span dir="rtl">۵</span>   | <span dir="rtl">وجه نرسیده</span>                              | <span dir="rtl">هیچ</span> ⁦Appointment⁩ <span dir="rtl">یا</span> ⁦Wallet Credit⁩ <span dir="rtl">ساخته نمی‌شود.</span>                                                                      | <span dir="rtl">نتیجه ثبت و پیگیری بانکی با</span> ⁦Customer.⁩                                       |
| <span dir="rtl">۶</span>   | <span dir="rtl">وجه رسیده</span>                               | ⁦OwnerAdmin⁩ <span dir="rtl">دقیقاً یکی از دو اثر را انتخاب می‌کند:</span> ⁦Wallet Credit⁩ <span dir="rtl">معادل مبلغ یا ثبت</span> ⁦Manual Appointment⁩ <span dir="rtl">بدون پرداخت دوم.</span> | <span dir="rtl">هرگز هر دو.</span>                                                                 |
| <span dir="rtl">۷</span>   | ⁦Manual Appointment⁩ <span dir="rtl">در تطبیق</span>             | <span dir="rtl">اگر</span> ⁦Time⁩ <span dir="rtl">اصلی آزاد نیست،</span> ⁦Time⁩ <span dir="rtl">آزاد دیگری با</span> ⁦Customer⁩ <span dir="rtl">هماهنگ می‌شود؛ تداخل دور زده نمی‌شود.</span>     | ⁦Appointment⁩ <span dir="rtl">ثبت می‌شود.</span>                                                      |
| <span dir="rtl">۸</span>   | ⁦Audit⁩                                                          | ⁦CorrelationId⁩<span dir="rtl">،</span> ⁦Actor⁩ <span dir="rtl">و نتیجه نهایی ثبت می‌شود.</span>                                                                                              | ⁦Payment Reconciled⁩<span dir="rtl">؛</span> ⁦Action Center⁩ <span dir="rtl">مورد را حذف می‌کند.</span> |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                                                 | <span dir="rtl">رفتار قطعی</span>                                                                                                  |
|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Callback⁩ <span dir="rtl">تکراری</span>⁦/⁩<span dir="rtl">خارج از ترتیب</span> | <span dir="rtl">همان نتیجه پایدار بازگردانده می‌شود و اثر اضافه ندارد.</span>                                                       |
| ⁦Requested/Recurring⁩ <span dir="rtl">گروهی</span>                            | <span dir="rtl">حالت نیمه‌کاره</span> ⁦Appointment⁩<span dir="rtl">ها مجاز نیست؛ نتیجه مالی تا تعیین تکلیف سازگار باقی می‌ماند.</span> |

**⁦UF-10⁩** <span dir="rtl">— اعلان آزادشدن زمان</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                                |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Customer / System Worker⁩                                                                                                    |
| ⁦Trigger⁩                           | <span dir="rtl">نبود زمان مناسب برای</span> ⁦Service+Stylist⁩ <span dir="rtl">یا</span> ⁦CUS-08⁩                                |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Customer⁩ <span dir="rtl">فعال؛ ترکیب</span> ⁦Service+Stylist⁩ <span dir="rtl">معتبر؛ حداکثر یک درخواست فعال همان ترکیب</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦BK-ALERT01 / CUS-08⁩                                                                                                         |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">یک</span> ⁦SMS⁩ <span dir="rtl">در اولین آزادشدن یا لغو</span>⁦/⁩<span dir="rtl">انقضای ۶روزه</span>            |
| <span dir="rtl">ردیابی</span>     | ⁦US7-CUS-18⁩<span dir="rtl">،</span> ⁦US7-SYS-07⁩<span dir="rtl">،</span> ⁦AC7-11⁩<span dir="rtl">،</span> ⁦BR-NOT-05..07⁩          |

<img src="media/image10.png" style="width:7in;height:3.88889in" />

<span dir="rtl">شکل ۹-۱۰ — چرخه اعلان آزادشدن زمان —</span> UF-10
Availability Alert

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                     | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                         |
|----------------------------|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | <span dir="rtl">ورود زمینه‌ای</span>                            | <span dir="rtl">از مسیر رزرو</span> ⁦Fixed/Proposed⁩ <span dir="rtl">با</span> ⁦Service+Stylist⁩ <span dir="rtl">از پیش‌پرشده یا از</span> ⁦CUS-08⁩ <span dir="rtl">فرم مشترک باز می‌شود.</span> | <span dir="rtl">ثبت درخواست.</span>                                                         |
| <span dir="rtl">۲</span>   | <span dir="rtl">اعتبارسنجی</span>                              | <span dir="rtl">اگر برای همان</span> ⁦Customer+Service+Stylist⁩ <span dir="rtl">درخواست فعال وجود دارد، مورد تکراری ساخته نمی‌شود.</span>                                                   | <span dir="rtl">درخواست فعال با اعتبار ۶ روز.</span>                                        |
| <span dir="rtl">۳</span>   | ⁦CUS-08⁩                                                         | ⁦Customer⁩ <span dir="rtl">فهرست موارد فعال</span>⁦/⁩<span dir="rtl">پایان‌یافته را می‌بیند و قبل از رخداد</span>⁦/⁩<span dir="rtl">انقضا می‌تواند لغو کند.</span>                                | <span dir="rtl">لغو → بدون اثر مالی</span>⁦/⁩<span dir="rtl">رزروی.</span>                    |
| <span dir="rtl">۴</span>   | ⁦Worker⁩                                                         | ⁦Availability⁩ <span dir="rtl">را طبق سازوکار داخلی بررسی می‌کند؛ اولین آزادشدن معتبر را اتمیک</span> ⁦Claim⁩ <span dir="rtl">می‌کند.</span>                                                   | <span dir="rtl">دقیقاً یک پیام در صف.</span>                                                 |
| <span dir="rtl">۵</span>   | ⁦Expire⁩                                                         | <span dir="rtl">هم‌زمان با ثبت پیام، درخواست منقضی می‌شود.</span>                                                                                                                          | <span dir="rtl">هیچ</span> ⁦Hold⁩<span dir="rtl">، اولویت یا رزرو خودکار ایجاد نمی‌شود.</span> |
| <span dir="rtl">۶</span>   | ⁦SMS Retry⁩                                                      | <span dir="rtl">اگر ارسال موقتاً شکست خورد،</span> ⁦Retry⁩ <span dir="rtl">پیام انجام می‌شود ولی</span> ⁦Request⁩ <span dir="rtl">دوباره فعال نمی‌شود.</span>                                   | <span dir="rtl">نتیجه پیام مستقل از</span> ⁦Request.⁩                                         |

<span dir="rtl">پایان‌ها و حالت‌های جایگزین</span>

| <span dir="rtl">حالت</span>                                    | <span dir="rtl">رفتار قطعی</span>                                                                                                                                                     |
|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">پایان ۶ روز بدون آزادشدن</span>                | ⁦Request⁩ <span dir="rtl">منقضی؛</span> ⁦Customer⁩ <span dir="rtl">در صورت نیاز مورد جدید می‌سازد.</span>                                                                                  |
| <span dir="rtl">دو</span> ⁦Worker⁩ <span dir="rtl">هم‌زمان</span> | <span dir="rtl">فقط یک پیام ثبت و یک</span> ⁦Expire⁩ <span dir="rtl">موثر ایجاد می‌شود.</span>                                                                                           |
| <span dir="rtl">مسیر بعد از دریافت</span> ⁦SMS⁩                  | <span dir="rtl">پیامک به ⁦CUS-02⁩ می‌رود و ⁦Service+Stylist⁩ را از پیش پر می‌کند؛ ⁦Availability⁩ باید همان لحظه دوباره محاسبه شود و لینک هیچ ⁦Hold⁩، اولویت یا رزرو خودکار ایجاد نمی‌کند.</span> |

<span dir="rtl">۵.</span> **⁦Flow⁩**<span dir="rtl">های پشتیبان و
سراسری</span>

⁦Flow⁩<span dir="rtl">های زیر</span> ⁦UF-01⁩ <span dir="rtl">تا</span> ⁦UF-11⁩
<span dir="rtl">را تکمیل می‌کنند تا</span> ⁦Story⁩<span dir="rtl">هایی که
صرفاً تراکنش رزرو نیستند نیز بدون حدس وارد</span> ⁦Wireframe⁩
<span dir="rtl">شوند.</span>

**⁦SF-02⁩** <span dir="rtl">— پوسته واحد</span>
**⁦OwnerAdmin⁩**<span dir="rtl">،</span> **⁦Scope⁩**
<span dir="rtl">و</span> **⁦Action Center⁩**

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                             |
|-----------------------------------|----------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦OwnerAdmin⁩                                                                                               |
| ⁦Trigger⁩                           | <span dir="rtl">ورود به</span> ⁦/admin⁩ <span dir="rtl">یا</span> ⁦Deep Link⁩ <span dir="rtl">مدیریتی</span> |
| <span dir="rtl">پیش‌شرط‌ها</span>   | <span dir="rtl">یک</span> ⁦OwnerAdmin⁩ <span dir="rtl">واقعی؛ بدون</span> ⁦Role Switch/Impersonation⁩        |
| <span dir="rtl">نقطه شروع</span>  | ⁦ADM-01 /⁩ <span dir="rtl">پوسته سراسری</span>                                                             |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">رسیدن به منبع عملیاتی با</span> ⁦Scope⁩ <span dir="rtl">صحیح</span>                        |
| <span dir="rtl">ردیابی</span>     | ⁦US7-ADM-13,14⁩<span dir="rtl">،</span> ⁦D8-01⁩                                                              |

<img src="media/image11.png" style="width:7in;height:4.2in" />

<span dir="rtl">شکل ۹-۱۱ — پوسته واحد مدیر کل، محدوده دید و مرکز اقدام
—</span> SF-02 OwnerAdmin

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                          | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                              |
|----------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦ADM-01⁩                                                         | ⁦Dashboard⁩ <span dir="rtl">کار امروز مدیر را در اولویت نگه می‌دارد و خلاصه مدیریتی فشرده دارد.</span>                                                                                           | <span dir="rtl">کار روزانه یا ناوبری مدیریت.</span>                                                              |
| <span dir="rtl">۲</span>   | <span dir="rtl">صفحات مشترک</span>                             | ⁦Calendar/Appointments/Requests⁩ <span dir="rtl">با یک نسخه صفحه و</span> ⁦Scope⁩ <span dir="rtl">«من</span> ⁦/ Stylist⁩ <span dir="rtl">مشخص</span> ⁦/⁩ <span dir="rtl">همه سالن» کار می‌کنند.</span> | <span dir="rtl">تغییر</span> ⁦Scope⁩ <span dir="rtl">فقط</span> ⁦Query context⁩ <span dir="rtl">را عوض می‌کند.</span> |
| <span dir="rtl">۳</span>   | ⁦Customers⁩                                                      | ⁦Directory⁩ <span dir="rtl">همیشه سراسری است؛ «مرتبط با من»</span> ⁦Filter⁩ <span dir="rtl">است نه مجوز.</span>                                                                                   | ⁦ADM-08/09.⁩                                                                                                       |
| <span dir="rtl">۴</span>   | ⁦Action Center⁩                                                  | ⁦Requested⁩ نیازمند اقدام، ⁦Payment Under Review⁩ و ⁦Critical Alert⁩ مستقل از ⁦Scope⁩ جاری قابل مشاهده‌اند؛ ⁦Badge⁩ فقط منابع حل‌نشده/قابل اقدام را می‌شمارد و با وضعیت خوانده‌شدن اعلان‌ها یکی نیست.        | ⁦Deep Link⁩ <span dir="rtl">به</span> ⁦ADM-04/16/⁩<span dir="rtl">منبع هشدار.</span>                                 |
| <span dir="rtl">۵</span>   | ⁦Audit Actor⁩                                                    | <span dir="rtl">همه عملیات با</span> ⁦Actor⁩ <span dir="rtl">واقعی</span> ⁦OwnerAdmin⁩ <span dir="rtl">ثبت می‌شوند.</span>                                                                         | <span dir="rtl">هیچ</span> ⁦Impersonation⁩ <span dir="rtl">رخ نمی‌دهد.</span>                                       |

**⁦SF-03⁩** <span dir="rtl">— چرخه عمر</span> **⁦Appointment⁩**
<span dir="rtl">و</span> **⁦NoShow⁩**

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                   |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦System / Stylist / OwnerAdmin⁩                                                                                  |
| ⁦Trigger⁩                           | ⁦EndAt⁩ <span dir="rtl">یا</span> ⁦Action⁩ <span dir="rtl">از</span> ⁦Detail⁩                                        |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Appointment⁩ <span dir="rtl">قطعی و</span> ⁦Actor⁩ <span dir="rtl">مجاز</span>                                    |
| <span dir="rtl">نقطه شروع</span>  | ⁦STY-06 / ADM-06 / Job⁩                                                                                          |
| <span dir="rtl">پایان موفق</span> | ⁦Completed⁩ <span dir="rtl">یا</span> ⁦NoShow⁩ <span dir="rtl">یا</span> ⁦Cancellation⁩ <span dir="rtl">معتبر</span> |
| <span dir="rtl">ردیابی</span>     | ⁦US7-STY-10⁩<span dir="rtl">،</span> ⁦US7-SYS-05⁩                                                                  |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                              | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span> |
|----------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | <span dir="rtl">پس از</span> ⁦EndAt⁩                             | ⁦System Job Appointment⁩ <span dir="rtl">را خودکار</span> ⁦Completed⁩ <span dir="rtl">می‌کند؛ اجرای تکراری اثر اضافه ندارد.</span>                                     | ⁦Completed.⁩                                                          |
| <span dir="rtl">۲</span>   | <span dir="rtl">تا ۲۳:۵۹:۵۹ همان روز تهران</span>              | ⁦Stylist⁩ <span dir="rtl">فقط</span> ⁦Appointment⁩ <span dir="rtl">خود و</span> ⁦OwnerAdmin⁩ <span dir="rtl">همه را می‌توانند</span> ⁦NoShow⁩ <span dir="rtl">کنند.</span> | ⁦NoShow.⁩                                                             |
| <span dir="rtl">۳</span>   | <span dir="rtl">پس از مهلت روز</span>                          | ⁦Stylist⁩ <span dir="rtl">امکان تبدیل به</span> ⁦NoShow⁩ <span dir="rtl">ندارد.</span>                                                                                | <span dir="rtl">وضعیت باقی می‌ماند.</span>                           |
| <span dir="rtl">۴</span>   | ⁦NoShow⁩                                                         | ⁦Credit/Refund⁩ <span dir="rtl">یا جریمه اضافه خودکار ایجاد نمی‌شود.</span>                                                                                          | <span dir="rtl">پایان چرخه.</span>                                  |

**⁦SF-04⁩** <span dir="rtl">— مدیریت وضعیت حساب و حذف نرم</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                        |
|-----------------------------------|-------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦OwnerAdmin⁩                                                                          |
| ⁦Trigger⁩                           | ⁦Action⁩ <span dir="rtl">از</span> ⁦ADM-09/11⁩                                          |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦OwnerAdmin⁩ <span dir="rtl">مجاز؛ نمایش پیامدها پیش از تأیید</span>                  |
| <span dir="rtl">نقطه شروع</span>  | ⁦ADM-09 / ADM-11⁩                                                                     |
| <span dir="rtl">پایان موفق</span> | ⁦Status⁩ <span dir="rtl">جدید با</span> ⁦Audit⁩ <span dir="rtl">و پیامدهای دامنه</span> |
| <span dir="rtl">ردیابی</span>     | ⁦US7-ADM-01,02⁩<span dir="rtl">،</span> ⁦BR-ACC⁩                                        |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                              | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                                                                          |
|----------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | <span dir="rtl">انتخاب حساب</span>                             | <span dir="rtl">مدیر</span> ⁦Customer⁩ <span dir="rtl">یا</span> ⁦Stylist⁩ <span dir="rtl">را باز می‌کند.</span>                                                                                                       | <span dir="rtl">مشاهده وضعیت و پیامدهای احتمالی.</span>                                                                                                      |
| <span dir="rtl">۲</span>   | ⁦Disable Customer⁩                                               | ⁦Customer⁩ <span dir="rtl">همچنان</span> ⁦Login⁩ <span dir="rtl">و مشاهده منابع موجود دارد اما رزرو</span>⁦/⁩<span dir="rtl">پرداخت</span>⁦/⁩<span dir="rtl">لغو</span>⁦/⁩<span dir="rtl">جابه‌جایی جدید آغاز نمی‌کند.</span> | ⁦Read-only state.⁩                                                                                                                                             |
| <span dir="rtl">۳</span>   | ⁦Soft Delete Customer⁩                                           | <span dir="rtl">پیش از تایید، نوبت</span>⁦/⁩<span dir="rtl">درخواست‌های آینده و اثر مالی نمایش داده می‌شوند.</span>                                                                                                   | <span dir="rtl">پس از تایید درخواست‌ها</span>⁦/⁩<span dir="rtl">نوبت‌های آینده لغو؛ خود حذف هیچ</span> ⁦Credit/Refund⁩ <span dir="rtl">خودکار ایجاد نمی‌کند.</span> |
| <span dir="rtl">۴</span>   | ⁦Soft Delete Stylist⁩                                            | <span dir="rtl">پیامد نوبت‌های آینده نمایش داده می‌شود.</span>                                                                                                                                                      | <span dir="rtl">پس از تایید، نوبت‌های متاثر طبق</span> ⁦Business Cancel⁩ <span dir="rtl">و</span> ⁦Credit⁩ <span dir="rtl">کامل</span> ⁦Customer.⁩                  |
| <span dir="rtl">۵</span>   | <span dir="rtl">اصلاح شماره بدون شماره قبلی</span>             | <span dir="rtl">فقط</span> ⁦OwnerAdmin⁩ <span dir="rtl">با</span> ⁦Audit⁩ <span dir="rtl">انجام می‌دهد.</span>                                                                                                         | <span dir="rtl">شماره جدید معتبر.</span>                                                                                                                     |
| <span dir="rtl">۶</span>   | <span dir="rtl">پس از</span> ⁦Soft Delete⁩                       | <span dir="rtl">حساب غیرقابل ورود و رفتار احراز مانند حساب ناموجود؛ سوابق مالی</span>⁦/⁩<span dir="rtl">تاریخی حفظ می‌شوند.</span>                                                                                   | ⁦Account unavailable /⁩ <span dir="rtl">پاسخ عمومی یکسان.</span>                                                                                               |

**⁦SF-05⁩** <span dir="rtl">—</span> **⁦Notification
Center⁩**<span dir="rtl">، اعلان دستی مدیر و</span> **⁦SMS⁩**
<span dir="rtl">دستی</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                                                   |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Customer / Stylist / OwnerAdmin⁩                                                                                                                |
| ⁦Trigger⁩                           | <span dir="rtl">دریافت رویداد، بازکردن مرکز اعلان یا ارسال دستی</span>                                                                         |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Actor⁩ <span dir="rtl">مجاز و منبع مرتبط</span>                                                                                                 |
| <span dir="rtl">نقطه شروع</span>  | ⁦CUS-09 / STY-10 / ADM-22/23⁩                                                                                                                    |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">پیام</span>⁦/⁩<span dir="rtl">اعلان ثبت‌شده با</span> ⁦Read/Unread⁩ <span dir="rtl">یا</span> ⁦Delivery⁩ <span dir="rtl">مستقل</span> |
| <span dir="rtl">ردیابی</span>     | ⁦US7-STY-12⁩<span dir="rtl">،</span> ⁦US7-ADM-12,15⁩<span dir="rtl">،</span> ⁦US7-SYS-06⁩<span dir="rtl">،</span> ⁦D8-02,08⁩                           |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                                                    | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>                                                |
|----------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦Notification Center⁩                                            | <span dir="rtl">هر نقش اعلان شخصی</span>⁦/⁩<span dir="rtl">عملیاتی منابع مجاز خود و اعلان عمومی مدیر را با</span> ⁦Pagination⁩ <span dir="rtl">و</span> ⁦Read/Unread⁩ <span dir="rtl">می‌بیند.</span>                                          | <span dir="rtl">بازکردن مورد یا</span> ⁦Mark Read.⁩                                                                  |
| <span dir="rtl">۲</span>   | <span dir="rtl">اهمیت</span>                                   | <span dir="rtl">فقط اعلان‌های بسیار مهم در</span> ⁦Dashboard⁩ <span dir="rtl">برجسته می‌شوند؛ بقیه در</span> ⁦Center⁩ <span dir="rtl">باقی می‌مانند.</span>                                                                                    | <span dir="rtl">بدون شلوغی</span> ⁦Dashboard.⁩                                                                       |
| <span dir="rtl">۳</span>   | ⁦OwnerAdmin⁩ <span dir="rtl">اعلان عمومی</span>                  | <span dir="rtl">ایجاد</span>⁦/⁩<span dir="rtl">ویرایش</span>⁦/⁩<span dir="rtl">انتشار اعلان عمومی از</span> ⁦ADM-22.⁩                                                                                                                         | <span dir="rtl">برای کاربران نمایش؛</span> ⁦Read state⁩ <span dir="rtl">هر کاربر مستقل.</span>                       |
| <span dir="rtl">۴</span>   | ⁦OwnerAdmin⁩ <span dir="rtl">اعلان شخصی دستی</span>              | <span dir="rtl">از</span> ⁦Detail Customer/⁩<span dir="rtl">مسیر مجاز اعلان داخل سامانه ایجاد می‌شود.</span>                                                                                                                               | <span dir="rtl">فقط مدیر کل مجاز.</span>                                                                           |
| <span dir="rtl">۵</span>   | ⁦Stylist SMS⁩ <span dir="rtl">دستی</span>                        | <span dir="rtl">از</span> ⁦Detail⁩ <span dir="rtl">نوبت</span>⁦/Request⁩ <span dir="rtl">مرتبط به</span> ⁦Customer⁩ <span dir="rtl">همان منبع</span> ⁦SMS⁩ <span dir="rtl">می‌فرستد؛ شماره آزاد</span>⁦/⁩<span dir="rtl">نامرتبط مجاز نیست.</span> | <span dir="rtl">پیام در سقف نرخ.</span>                                                                            |
| <span dir="rtl">۶</span>   | ⁦OwnerAdmin SMS⁩                                                 | <span dir="rtl">ارسال زمینه‌ای به</span> ⁦Customer⁩ <span dir="rtl">یا صفحه گروهی مشتریان مجاز.</span>                                                                                                                                     | <span dir="rtl">ثبت</span> ⁦Actor⁩ <span dir="rtl">و</span> ⁦Rate controls.⁩                                           |
| <span dir="rtl">۷</span>   | ⁦SMS⁩ <span dir="rtl">خودکار</span>                              | ⁦Confirmation/Reminder/Change/Request response⁩ <span dir="rtl">در صف قابل اتکا ثبت می‌شوند.</span>                                                                                                                                        | <span dir="rtl">شکست</span> ⁦SMS⁩ <span dir="rtl">عملیات موفق رزرو را</span> ⁦rollback⁩ <span dir="rtl">نمی‌کند.</span> |
| <span dir="rtl">۸</span>   | ⁦Retry⁩                                                          | <span dir="rtl">خطای موقت تا ۴</span> ⁦Retry⁩ <span dir="rtl">با فاصله ۳۰ دقیقه؛ خطای قطعی دریافت‌نکردن</span> ⁦Retry⁩ <span dir="rtl">نمی‌شود.</span>                                                                                        | <span dir="rtl">پس از سقف، شکست قابل بررسی.</span>                                                                 |

**⁦SF-06⁩** <span dir="rtl">—</span> **⁦Wallet Adjustment⁩**
<span dir="rtl">و</span> **⁦Reversal⁩** <span dir="rtl">مدیریتی</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                              |
|-----------------------------------|-------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦OwnerAdmin⁩                                                                                |
| ⁦Trigger⁩                           | ⁦Action⁩ <span dir="rtl">از</span> ⁦ADM-09⁩ <span dir="rtl">یا</span> ⁦ADM-18/19⁩               |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Customer⁩ <span dir="rtl">موجود؛ مبلغ</span>⁦/⁩<span dir="rtl">دلیل معتبر</span>             |
| <span dir="rtl">نقطه شروع</span>  | ⁦ADM-19⁩                                                                                    |
| <span dir="rtl">پایان موفق</span> | ⁦Ledger Entry⁩ <span dir="rtl">جدید و</span> ⁦Balance⁩ <span dir="rtl">بازسازی‌شده</span>      |
| <span dir="rtl">ردیابی</span>     | ⁦US7-ADM-11⁩<span dir="rtl">،</span> ⁦BR-WAL-02,06,07⁩<span dir="rtl">،</span> ⁦AUTH-WAL-02,03⁩ |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                          | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span> |
|----------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | <span dir="rtl">ورود</span>                                    | <span dir="rtl">مدیر</span> ⁦Wallet Customer⁩ <span dir="rtl">را از</span> ⁦Detail⁩ <span dir="rtl">یا جست‌وجوی</span> ⁦Wallet⁩ <span dir="rtl">باز می‌کند.</span>                                    | ⁦Balance + Ledger.⁩                                                   |
| <span dir="rtl">۲</span>   | <span dir="rtl">اصلاح موجودی</span>                            | <span dir="rtl">مدیر</span> ⁦Increase/Decrease⁩<span dir="rtl">، مبلغ و دلیل را ثبت می‌کند.</span>                                                                                               | ⁦Validation.⁩                                                         |
| <span dir="rtl">۳</span>   | <span dir="rtl">ثبت</span>                                     | <span dir="rtl">سیستم</span> ⁦Adjustment Ledger Entry⁩ <span dir="rtl">تغییرناپذیر با</span> ⁦Actor/Time/Reason⁩ <span dir="rtl">می‌سازد؛</span> ⁦Balance⁩ <span dir="rtl">خام ویرایش نمی‌شود.</span> | ⁦Balance⁩ <span dir="rtl">جدید از</span> ⁦Ledger.⁩                      |
| <span dir="rtl">۴</span>   | <span dir="rtl">اشتباه در</span> ⁦Adjustment⁩                    | ⁦Entry⁩ <span dir="rtl">قبلی حذف</span>⁦/⁩<span dir="rtl">ویرایش نمی‌شود.</span>                                                                                                                   | ⁦Reversal/Adjustment⁩ <span dir="rtl">متناظر جدید با دلیل.</span>     |
| <span dir="rtl">۵</span>   | ⁦Refund⁩ <span dir="rtl">بانکی دستی</span>                       | ⁦Reversal/Adjustment⁩ <span dir="rtl">متناظر برای سازگاری دفتر ثبت می‌شود.</span>                                                                                                                | ⁦Audit⁩ <span dir="rtl">کامل.</span>                                  |

**⁦SF-07⁩** <span dir="rtl">— مدیریت خدمت،</span> **⁦Requested⁩**
<span dir="rtl">مرکب و قیمت‌گذاری</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                  |
|-----------------------------------|-------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦OwnerAdmin⁩                                                                    |
| ⁦Trigger⁩                           | ⁦ADM-12/13/14⁩                                                                  |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦OwnerAdmin⁩ <span dir="rtl">مجاز</span>                                        |
| <span dir="rtl">نقطه شروع</span>  | ⁦Services / Pricing⁩                                                            |
| <span dir="rtl">پایان موفق</span> | ⁦Catalog⁩ <span dir="rtl">معتبر برای</span> ⁦Flow⁩<span dir="rtl">های رزرو</span> |
| <span dir="rtl">ردیابی</span>     | ⁦US7-ADM-03,04⁩<span dir="rtl">،</span> ⁦BR-SVC⁩<span dir="rtl">،</span> ⁦BR-PRI⁩   |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                                                                                                      | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span>               |
|----------------------------|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦Service Fixed/Proposed⁩                                         | <span dir="rtl">مدیر</span> ⁦Service⁩ <span dir="rtl">را ایجاد</span>⁦/⁩<span dir="rtl">ویرایش و به</span> ⁦Stylist⁩<span dir="rtl">های ارائه‌دهنده نگاشت می‌کند.</span>                                                                                                          | <span dir="rtl">قابل انتخاب در</span> ⁦CUS-02⁩ <span dir="rtl">اگر</span> ⁦Active.⁩   |
| <span dir="rtl">۲</span>   | ⁦Service Requested⁩                                              | <span dir="rtl">مدیر یک یا چند</span> ⁦Service⁩ <span dir="rtl">فعال</span> ⁦Fixed/Proposed⁩ <span dir="rtl">را به‌عنوان اجزای</span> ⁦Requested⁩ <span dir="rtl">تعریف می‌کند؛</span> ⁦Requested⁩ <span dir="rtl">تودرتو و</span> ⁦Stylist⁩ <span dir="rtl">مستقیم ممنوع است.</span> | <span dir="rtl">خدمت مرکب معتبر.</span>                                           |
| <span dir="rtl">۳</span>   | ⁦Soft Delete Service⁩                                            | ⁦Service⁩ <span dir="rtl">برای رزرو جدید حذف می‌شود اما</span> ⁦Appointment⁩ <span dir="rtl">قطعی آینده خودکار لغو نمی‌شود.</span>                                                                                                                                              | <span dir="rtl">سوابق با</span> ⁦Snapshot⁩ <span dir="rtl">حفظ.</span>              |
| <span dir="rtl">۴</span>   | ⁦Pricing⁩                                                        | ⁦BaseReservationFee⁩<span dir="rtl">،</span> ⁦BaseFeeOverride⁩<span dir="rtl">،</span> ⁦ServiceFactor⁩ <span dir="rtl">و</span> ⁦BarberFactor⁩ <span dir="rtl">توسط</span> ⁦OwnerAdmin⁩ <span dir="rtl">مدیریت می‌شوند.</span>                                                       | <span dir="rtl">محاسبه جدید برای</span> ⁦Hold/Booking⁩ <span dir="rtl">جدید.</span> |
| <span dir="rtl">۵</span>   | ⁦Snapshot⁩                                                       | <span dir="rtl">تغییر قیمت آینده</span> ⁦Snapshot⁩ <span dir="rtl">قبلی را تغییر نمی‌دهد.</span>                                                                                                                                                                             | <span dir="rtl">ثبات</span> ⁦Flow⁩<span dir="rtl">های قبلی.</span>                  |

**⁦SF-08⁩** <span dir="rtl">— پروفایل، روش ورود و نمونه‌کار</span>

| <span dir="rtl">عنوان</span>      | <span dir="rtl">مقدار</span>                                                                                     |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------|
| ⁦Actor⁩ <span dir="rtl">اصلی</span> | ⁦Customer / Stylist / OwnerAdmin⁩                                                                                  |
| ⁦Trigger⁩                           | ⁦Profile⁩ <span dir="rtl">یا</span> ⁦Portfolio⁩                                                                      |
| <span dir="rtl">پیش‌شرط‌ها</span>   | ⁦Actor⁩ <span dir="rtl">صاحب حساب</span>⁦/⁩<span dir="rtl">منبع یا</span> ⁦OwnerAdmin⁩ <span dir="rtl">طبق مجوز</span> |
| <span dir="rtl">نقطه شروع</span>  | ⁦CUS-10 / STY-09,11 / ADM-20,25⁩                                                                                   |
| <span dir="rtl">پایان موفق</span> | <span dir="rtl">اطلاعات مجاز یا</span> ⁦Portfolio⁩ <span dir="rtl">معتبر</span>                                    |
| <span dir="rtl">ردیابی</span>     | ⁦US7-CUS-01⁩<span dir="rtl">،</span> ⁦US7-STY-01,11⁩<span dir="rtl">،</span> ⁦US7-ADM-12⁩                              |

<span dir="rtl">مسیر اصلی و شاخه‌ها</span>

| <span dir="rtl">گام</span> | <span dir="rtl">صفحه</span> **⁦/⁩** <span dir="rtl">وضعیت</span> | <span dir="rtl">اقدام و کنترل</span>                                                                                                                                                            | <span dir="rtl">نتیجه</span> **⁦/⁩** <span dir="rtl">مسیر بعدی</span> |
|----------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| <span dir="rtl">۱</span>   | ⁦Profile⁩                                                        | <span dir="rtl">نام، نام خانوادگی و تصویر پروفایل در محدوده مجاز و با قواعد امن رسانه ویرایش می‌شوند.</span>                                                                                     | ⁦Profile⁩ <span dir="rtl">به‌روز.</span>                               |
| <span dir="rtl">۲</span>   | ⁦Credential⁩                                                     | ⁦OTP⁩ <span dir="rtl">اصلی؛</span> ⁦Passkey/Password⁩ <span dir="rtl">اختیاری در مسیر مجاز مدیریت می‌شوند؛</span> ⁦Role/Status⁩ <span dir="rtl">از</span> ⁦Profile⁩ <span dir="rtl">تغییر نمی‌کند.</span> | <span dir="rtl">روش ورود به‌روز.</span>                              |
| <span dir="rtl">۳</span>   | ⁦Stylist Portfolio⁩                                              | ⁦Stylist⁩ <span dir="rtl">فقط نمونه‌کارهای خود را ایجاد</span>⁦/⁩<span dir="rtl">ویرایش</span>⁦/⁩<span dir="rtl">حذف می‌کند.</span>                                                                     | ⁦Portfolio⁩ <span dir="rtl">عمومی پس از قواعد محتوا.</span>           |
| <span dir="rtl">۴</span>   | ⁦OwnerAdmin Portfolio⁩                                           | <span dir="rtl">مدیر همه نمونه‌کارها و موارد خود را مدیریت می‌کند.</span>                                                                                                                         | <span dir="rtl">نمای عمومی</span> ⁦PUB-02.⁩                           |
| <span dir="rtl">۵</span>   | ⁦PUB-02⁩                                                         | <span dir="rtl">کاربر عمومی گالری فیلترپذیر را می‌بیند؛</span> ⁦Detail⁩ <span dir="rtl">در</span> ⁦Modal/Viewer⁩ <span dir="rtl">همان صفحه است و</span> ⁦Route⁩ <span dir="rtl">مستقل ندارد.</span>    | <span dir="rtl">بازگشت به گالری.</span>                             |

<span dir="rtl">۶. مدل وضعیت‌ها و گذارهای مشترک</span>

<span dir="rtl">۶.۱ وضعیت نمایشی</span> **⁦BookingRequest⁩**
<span dir="rtl">برای</span> **⁦Customer⁩**

| <span dir="rtl">وضعیت نمایشی</span>     | <span dir="rtl">ورود</span>                                                         | <span dir="rtl">خروج‌های مجاز</span>                                                                                                          |
|-----------------------------------------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">در انتظار بررسی</span>  | <span dir="rtl">ثبت</span> ⁦Proposed/Requested⁩                                       | <span dir="rtl">رد</span>⁦/⁩<span dir="rtl">لغو؛ پاسخ معتبر → در انتظار پرداخت؛ بی‌پاسخ ۷روزه → رد شده</span>                                   |
| <span dir="rtl">در انتظار پرداخت</span> | <span dir="rtl">انتشار پاسخ +</span> ⁦Hold⁩ <span dir="rtl">سه‌ساعته</span>            | ⁦Verify⁩ <span dir="rtl">موفق → رزرو شده؛</span> ⁦Customer Cancel⁩ <span dir="rtl">→ لغو شده؛</span> ⁦Deadline⁩ <span dir="rtl">→ منقضی شده</span> |
| <span dir="rtl">رزرو شده</span>         | <span dir="rtl">ساخت</span> ⁦Appointment⁩ <span dir="rtl">معتبر</span>                | <span dir="rtl">وضعیت نهایی</span> ⁦Request⁩<span dir="rtl">؛ مدیریت بعدی روی</span> ⁦Appointment⁩<span dir="rtl">ها</span>                      |
| <span dir="rtl">رد شده</span>           | <span dir="rtl">رد</span> ⁦Stylist/OwnerAdmin⁩ <span dir="rtl">یا بی‌پاسخ ۷روزه</span> | <span dir="rtl">درخواست جدید برای ادامه</span>                                                                                               |
| <span dir="rtl">لغو شده</span>          | <span dir="rtl">لغو</span> ⁦Customer⁩ <span dir="rtl">پیش از قطعی‌شدن</span>           | <span dir="rtl">نهایی</span>                                                                                                                 |
| <span dir="rtl">منقضی شده</span>        | <span dir="rtl">پایان</span> ⁦Hold⁩ <span dir="rtl">سه‌ساعته پاسخ</span>               | <span dir="rtl">نهایی؛ درخواست جدید لازم</span>                                                                                              |

| ⁦Draft⁩ <span dir="rtl">پاسخ</span> ⁦Requested⁩ <span dir="rtl">یک حالت عملیاتی داخلی</span> ⁦OwnerAdmin⁩ <span dir="rtl">است و تا زمان انتشار، وضعیت</span> ⁦Customer⁩ <span dir="rtl">همچنان «در انتظار بررسی» می‌ماند.</span> ⁦Draft⁩ <span dir="rtl">به‌تنهایی ظرفیت را</span> ⁦Hold⁩ <span dir="rtl">نمی‌کند.</span> |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<span dir="rtl">۶.۲ وضعیت</span> **⁦Appointment⁩**

| <span dir="rtl">وضعیت</span>**⁦/⁩**<span dir="rtl">گذار</span>      | <span dir="rtl">قاعده</span> **⁦Flow⁩**                                                                                                                                                                  |
|-------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Reserved⁩                                                          | <span dir="rtl">فقط پس از پرداخت</span>⁦/⁩<span dir="rtl">ثبت معتبر؛</span> ⁦Hold⁩ <span dir="rtl">و</span> ⁦Payment status⁩ <span dir="rtl">داخل</span> ⁦Appointment⁩ <span dir="rtl">نگهداری نمی‌شوند.</span> |
| ⁦Reserved⁩ <span dir="rtl">→</span> ⁦Completed⁩                       | ⁦System⁩ <span dir="rtl">پس از</span> ⁦EndAt⁩<span dir="rtl">،</span> ⁦idempotent.⁩                                                                                                                          |
| ⁦Reserved⁩ <span dir="rtl">→</span> ⁦CancelledByCustomer⁩             | <span dir="rtl">طبق</span> ⁦UF-05⁩ <span dir="rtl">و</span> ⁦Cutoff⁩<span dir="rtl">های</span> ⁦Snapshot.⁩                                                                                                   |
| ⁦Reserved⁩ <span dir="rtl">→</span> ⁦CancelledByStylist/Admin/System⁩ | <span dir="rtl">قواعد</span> ⁦Business Cancel⁩<span dir="rtl">؛</span> ⁦Credit⁩ <span dir="rtl">کامل مگر استثنای حذف نرم</span> ⁦Customer.⁩                                                                  |
| ⁦Completed⁩ <span dir="rtl">→</span> ⁦NoShow⁩                         | <span dir="rtl">فقط تا ۲۳:۵۹:۵۹ همان روز تهران و برای</span> ⁦Actor⁩ <span dir="rtl">مجاز.</span>                                                                                                        |
| <span dir="rtl">تغییر</span> ⁦Stylist⁩                              | ⁦Status⁩ <span dir="rtl">مستقل نیست؛</span> ⁦Cancel + New Appointment.⁩                                                                                                                                    |

<span dir="rtl">۶.۳</span> **⁦Hold⁩** <span dir="rtl">و</span> **⁦Payment⁩**

| <span dir="rtl">مورد</span> | <span dir="rtl">حالت‌ها و رفتار</span>                                                                                                                                                                                       |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦Fixed Time Hold⁩             | ⁦Active⁩ <span dir="rtl">پنج‌دقیقه‌ای →</span> ⁦Consumed⁩ <span dir="rtl">در</span> ⁦Success⁩ <span dir="rtl">یا</span> ⁦Released/Expired⁩ <span dir="rtl">در</span> ⁦Failure/Timeout.⁩                                                 |
| ⁦Proposed Hold⁩               | <span dir="rtl">یک</span> ⁦Time Hold⁩ <span dir="rtl">با</span> ⁦Deadline⁩ <span dir="rtl">سه‌ساعته مشترک با پاسخ.</span>                                                                                                        |
| ⁦Requested Hold⁩              | <span dir="rtl">مجموعه</span> ⁦Time Hold⁩<span dir="rtl">های اتمیک همه‌یا‌هیچ با یک</span> ⁦Deadline⁩ <span dir="rtl">سه‌ساعته.</span>                                                                                             |
| ⁦Wallet Hold⁩                 | <span dir="rtl">قبل از</span> ⁦Gateway⁩ <span dir="rtl">نتیجه قطعی</span> ⁦Debit⁩ <span dir="rtl">نیست؛</span> ⁦Success⁩ <span dir="rtl">→</span> ⁦Debit⁩<span dir="rtl">،</span> ⁦Failure/Timeout⁩ <span dir="rtl">→</span> ⁦Release.⁩ |
| ⁦Payment⁩                     | ⁦Created/Pending⁩ <span dir="rtl">→</span> ⁦Succeeded/Failed/Expired/UnderReview⁩ <span dir="rtl">→</span> ⁦Reconciled/Reversed⁩ <span dir="rtl">طبق سناریو.</span>                                                               |

<img src="media/image12.png" style="width:7in;height:4.71579in" />

<span dir="rtl">شکل ۹-۱۲ — چرخه وضعیت‌های اصلی درخواست، نوبت، پرداخت و
قفل موقت —</span> State Lifecycles

<span dir="rtl">۷.</span> **⁦Deep Link⁩**<span dir="rtl">، بازگشت و
بازیابی</span>

| <span dir="rtl">مبدأ</span>                                   | <span dir="rtl">مقصد</span>                         | <span dir="rtl">رفتار</span> **⁦Flow⁩**                                                                                                                                                                                                                       |
|---------------------------------------------------------------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦SMS⁩ <span dir="rtl">پاسخ</span> ⁦Proposed/Requested⁩            | ⁦CUS-06⁩                                              | <span dir="rtl">اگر</span> ⁦Login⁩ <span dir="rtl">نیست →</span> ⁦SF-01⁩ <span dir="rtl">→ بازگشت به</span> ⁦Request⁩<span dir="rtl">؛ اگر</span> ⁦Hold⁩ <span dir="rtl">تمام شده،</span> ⁦Expired⁩ <span dir="rtl">و</span> ⁦CTA⁩ <span dir="rtl">درخواست جدید.</span> |
| <span dir="rtl">تأیید</span>⁦/⁩<span dir="rtl">رسید نوبت</span> | ⁦CUS-04⁩                                              | <span dir="rtl">فقط</span> ⁦Owner⁩<span dir="rtl">؛ شناسه دیگر بدون افشای داده رد.</span>                                                                                                                                                                     |
| <span dir="rtl">اعلان عملیاتی</span> ⁦Stylist⁩                  | ⁦STY-04⁩ <span dir="rtl">یا</span> ⁦STY-06⁩             | <span dir="rtl">فقط</span> ⁦Stylist⁩ <span dir="rtl">منتسب؛</span> ⁦OwnerAdmin⁩ <span dir="rtl">از</span> ⁦Route⁩ <span dir="rtl">مدیریتی.</span>                                                                                                                 |
| ⁦Action Center OwnerAdmin⁩                                      | ⁦ADM-04 / ADM-16 /⁩ <span dir="rtl">منبع هشدار</span> | <span dir="rtl">مستقل از</span> ⁦Scope⁩<span dir="rtl">؛</span> ⁦Actor⁩ <span dir="rtl">عوض نمی‌شود.</span>                                                                                                                                                      |
| <span dir="rtl">بازگشت</span> ⁦Gateway⁩                         | ⁦Checkout/Request context⁩                            | <span dir="rtl">تا</span> ⁦Verify⁩<span dir="rtl">،</span> ⁦Under Review/⁩<span dir="rtl">در حال بررسی؛</span> ⁦Redirect Success⁩ <span dir="rtl">قطعی نیست.</span>                                                                                               |
| ⁦CTA⁩ <span dir="rtl">رزرو عمومی</span>                         | ⁦AUTH-01⁩ <span dir="rtl">سپس</span> ⁦CUS-02⁩           | ⁦Return Target⁩ <span dir="rtl">پس از احراز حفظ می‌شود.</span>                                                                                                                                                                                                 |
| ⁦Role⁩ <span dir="rtl">نامجاز</span>                            | ⁦Forbidden/Redirect⁩ <span dir="rtl">امن</span>       | <span dir="rtl">هیچ داده قبل از</span> ⁦Authorization⁩ <span dir="rtl">رندر نمی‌شود.</span>                                                                                                                                                                    |
| ⁦Customer Disabled⁩                                             | ⁦CUS-01 Read-only⁩                                    | <span dir="rtl">مشاهده موجود مجاز؛</span> ⁦CTA⁩ <span dir="rtl">رزرو</span>⁦/⁩<span dir="rtl">پرداخت</span>⁦/⁩<span dir="rtl">لغو</span>⁦/⁩<span dir="rtl">جابه‌جایی غیرفعال.</span>                                                                                 |
| ⁦SoftDeleted⁩                                                   | ⁦Account unavailable⁩                                 | ⁦Login/Panel⁩ <span dir="rtl">بسته و وجود قبلی حساب افشا نمی‌شود.</span>                                                                                                                                                                                       |

<span dir="rtl">۸.</span> **⁦Edge Case⁩**<span dir="rtl">های اجباری
برای</span> **⁦Wireframe⁩** <span dir="rtl">و تست</span> **⁦Flow⁩**

| <span dir="rtl">شناسه</span> | <span dir="rtl">سناریو</span>                                                                                                   | <span dir="rtl">نتیجه مورد انتظار</span>                                                                                                                                      |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦E9-01⁩                        | <span dir="rtl">دو</span> ⁦Customer⁩ <span dir="rtl">هم‌زمان آخرین</span> ⁦Time⁩ <span dir="rtl">را می‌گیرند</span>                   | <span dir="rtl">فقط یک</span> ⁦Hold/Appointment⁩<span dir="rtl">؛ دیگری پیام تداخل و</span> ⁦Refresh Availability.⁩                                                               |
| ⁦E9-02⁩                        | ⁦Fixed Hold⁩ <span dir="rtl">هنگام</span> ⁦Gateway⁩ <span dir="rtl">منقضی می‌شود</span>                                              | <span dir="rtl">هیچ</span> ⁦Success⁩ <span dir="rtl">جعلی؛</span> ⁦Verify⁩ <span dir="rtl">دیرهنگام طبق</span> ⁦Availability⁩ <span dir="rtl">و</span> ⁦Reconciliation.⁩              |
| ⁦E9-03⁩                        | ⁦Wallet⁩ <span dir="rtl">بخشی</span> ⁦Hold⁩ <span dir="rtl">شده و</span> ⁦Gateway⁩ <span dir="rtl">شکست می‌خورد</span>                 | ⁦Wallet Hold⁩ <span dir="rtl">آزاد؛</span> ⁦Balance⁩ <span dir="rtl">از دست نمی‌رود.</span>                                                                                        |
| ⁦E9-04⁩                        | ⁦Proposed⁩ <span dir="rtl">در روز هفتم هم‌زمان با پاسخ</span> ⁦Stylist⁩                                                              | <span dir="rtl">فرمان یکتا و وضعیت معتبر نهایی؛ پاسخ روی</span> ⁦Request⁩ <span dir="rtl">بسته‌شده اثر ندارد.</span>                                                             |
| ⁦E9-05⁩                        | ⁦Requested Draft⁩ <span dir="rtl">چند روز باز و یک</span> ⁦Stylist⁩ <span dir="rtl">غیرفعال می‌شود</span>                            | <span dir="rtl">جزء</span> ⁦Draft⁩ <span dir="rtl">نامعتبر؛</span> ⁦Publish⁩ <span dir="rtl">همه‌یا‌هیچ رد تا اصلاح.</span>                                                         |
| ⁦E9-06⁩                        | ⁦Requested⁩ <span dir="rtl">هنگام</span> ⁦Publish⁩ <span dir="rtl">یکی از</span> ⁦Time⁩<span dir="rtl">ها اشغال می‌شود</span>          | <span dir="rtl">هیچ</span> ⁦Hold⁩ <span dir="rtl">جزئی ساخته نمی‌شود؛</span> ⁦Draft⁩ <span dir="rtl">حفظ و جزء نامعتبر مشخص.</span>                                                |
| ⁦E9-07⁩                        | ⁦Requested⁩ <span dir="rtl">در</span> ⁦Hold⁩<span dir="rtl">،</span> ⁦Customer⁩ <span dir="rtl">لغو می‌کند</span>                      | <span dir="rtl">همه</span> ⁦Time Hold⁩<span dir="rtl">ها و</span> ⁦Wallet Hold⁩ <span dir="rtl">احتمالی آزاد؛ لغو جزئی ممنوع.</span>                                              |
| ⁦E9-08⁩                        | ⁦Recurring⁩ <span dir="rtl">یکی از رخدادها بین</span> ⁦Review⁩ <span dir="rtl">و</span> ⁦Checkout⁩ <span dir="rtl">اشغال می‌شود</span> | <span dir="rtl">همان رخداد نامعتبر؛</span> ⁦Checkout⁩ <span dir="rtl">تا تغییر</span>⁦/⁩<span dir="rtl">حذف متوقف.</span>                                                         |
| ⁦E9-09⁩                        | ⁦Business Reschedule⁩ <span dir="rtl">برای</span> ⁦Customer⁩ <span dir="rtl">که سهم عادی را قبلاً مصرف کرده</span>                   | ⁦CompensationRight⁩ <span dir="rtl">مستقل فعال می‌شود؛ سهم عادی برنمی‌گردد.</span>                                                                                                |
| ⁦E9-10⁩                        | ⁦Schedule change⁩ <span dir="rtl">چند</span> ⁦Appointment⁩ <span dir="rtl">را متاثر می‌کند</span>                                    | ⁦Preview⁩ <span dir="rtl">الزامی؛ اعمال تاییدشده قواعد</span> ⁦Business Cancel⁩ <span dir="rtl">را برای همه متاثر اجرا می‌کند.</span>                                              |
| ⁦E9-11⁩                        | ⁦ReleaseAt⁩ <span dir="rtl">می‌رسد ولی</span> ⁦Holiday/Appointment⁩ <span dir="rtl">مانع است</span>                                  | <span dir="rtl">زمان فقط از</span> ⁦Block⁩ <span dir="rtl">آزاد می‌شود؛</span> ⁦Availability⁩ <span dir="rtl">نهایی همچنان بسته می‌ماند.</span>                                     |
| ⁦E9-12⁩                        | ⁦BookableFrom⁩ <span dir="rtl">می‌رسد ولی</span> ⁦Time⁩ <span dir="rtl">آزاد نیست</span>                                             | <span dir="rtl">هیچ</span> ⁦Slot⁩ <span dir="rtl">مصنوعی ساخته نمی‌شود؛ فقط مانع سراسری برداشته می‌شود.</span>                                                                    |
| ⁦E9-13⁩                        | ⁦Callback⁩ <span dir="rtl">تکراری ۱۰۰ بار</span>                                                                                  | <span dir="rtl">یک</span> ⁦Payment⁩ <span dir="rtl">و حداکثر یک اثر رزروی</span>⁦/⁩<span dir="rtl">مالی.</span>                                                                   |
| ⁦E9-14⁩                        | ⁦SMS Provider⁩ <span dir="rtl">قطع بعد از</span> ⁦Success⁩                                                                          | <span dir="rtl">رزرو</span>⁦/⁩<span dir="rtl">پرداخت حفظ؛ پیام</span> ⁦Retry⁩ <span dir="rtl">مستقل.</span>                                                                       |
| ⁦E9-15⁩                        | ⁦Customer Disabled⁩ <span dir="rtl">با</span> ⁦Request⁩ <span dir="rtl">«در انتظار پرداخت»</span>                                   | ⁦Customer⁩ <span dir="rtl">پرداخت جدید را آغاز نمی‌کند؛ وضعیت با توضیح</span> ⁦Read-only⁩ <span dir="rtl">و عملیات لازم از طریق</span> ⁦OwnerAdmin/⁩<span dir="rtl">فعال‌سازی.</span> |
| ⁦E9-16⁩                        | ⁦IDOR⁩ <span dir="rtl">روی</span> ⁦Detail⁩ <span dir="rtl">نوبت</span>⁦/Request⁩                                                      | ⁦Forbidden/Not Found⁩ <span dir="rtl">امن بدون افشای</span> ⁦PII.⁩                                                                                                                |

<span dir="rtl">۹. ردیابی ۵۶</span> **⁦Story⁩** <span dir="rtl">فاز ۷
به</span> **⁦Flow⁩**<span dir="rtl">های فاز ۹</span>

| **⁦Story⁩**  | **⁦Flow⁩** <span dir="rtl">فاز ۹</span>                    | <span dir="rtl">پوشش</span>                                                                 |
|------------|----------------------------------------------------------|---------------------------------------------------------------------------------------------|
| ⁦US7-PUB-01⁩ | ⁦SF-08⁩                                                    | <span dir="rtl">خانه</span>⁦/Portfolio⁩ <span dir="rtl">عمومی؛ شروع رزرو از</span> ⁦SF-01.⁩     |
| ⁦US7-PUB-02⁩ | ⁦SF-01⁩                                                    | <span dir="rtl">ورود و حفظ</span> ⁦Return Target.⁩                                            |
| ⁦US7-CUS-01⁩ | ⁦SF-08⁩                                                    | <span dir="rtl">پروفایل و</span> ⁦Credential.⁩                                                |
| ⁦US7-CUS-02⁩ | ⁦UF-01/02/03⁩                                              | <span dir="rtl">شاخه</span> ⁦SchedulingType⁩ <span dir="rtl">پس از انتخاب</span> ⁦Service.⁩     |
| ⁦US7-CUS-03⁩ | ⁦UF-01⁩                                                    | ⁦Availability Fixed.⁩                                                                         |
| ⁦US7-CUS-04⁩ | ⁦UF-01⁩                                                    | ⁦Hold⁩ <span dir="rtl">پنج‌دقیقه‌ای.</span>                                                     |
| ⁦US7-CUS-05⁩ | ⁦UF-01⁩                                                    | ⁦Wallet/Gateway/Verify.⁩                                                                      |
| ⁦US7-CUS-06⁩ | ⁦UF-01/02/03/09⁩                                           | <span dir="rtl">رسید و وضعیت.</span>                                                        |
| ⁦US7-CUS-07⁩ | ⁦UF-02⁩                                                    | <span dir="rtl">ثبت</span> ⁦Proposed.⁩                                                        |
| ⁦US7-CUS-08⁩ | ⁦UF-03/11⁩                                                 | ⁦Requested⁩ <span dir="rtl">مرکب.</span>                                                      |
| ⁦US7-CUS-09⁩ | ⁦UF-02/03⁩                                                 | <span dir="rtl">پاسخ و پرداخت سه‌ساعته.</span>                                               |
| ⁦US7-CUS-10⁩ | ⁦UF-02/03⁩                                                 | <span dir="rtl">لغو</span> ⁦Request.⁩                                                         |
| ⁦US7-CUS-11⁩ | ⁦UF-05/SF-03⁩                                              | <span dir="rtl">مشاهده و چرخه نوبت.</span>                                                  |
| ⁦US7-CUS-12⁩ | ⁦UF-05⁩                                                    | <span dir="rtl">لغو</span> ⁦Appointment.⁩                                                     |
| ⁦US7-CUS-13⁩ | ⁦UF-05⁩                                                    | ⁦Reschedule Fixed.⁩                                                                           |
| ⁦US7-CUS-14⁩ | ⁦UF-05⁩                                                    | ⁦CompensationRight.⁩                                                                          |
| ⁦US7-CUS-15⁩ | ⁦UF-04⁩                                                    | ⁦Recurring.⁩                                                                                  |
| ⁦US7-CUS-16⁩ | ⁦UF-04⁩                                                    | <span dir="rtl">رخداد نامعتبر.</span>                                                       |
| ⁦US7-CUS-17⁩ | ⁦UF-01/02/03⁩                                              | ⁦Balance⁩ <span dir="rtl">در</span> ⁦Checkout/⁩<span dir="rtl">داشبورد؛ بدون صفحه مستقل.</span> |
| ⁦US7-CUS-18⁩ | ⁦UF-10⁩                                                    | ⁦Availability alert.⁩                                                                         |
| ⁦US7-STY-01⁩ | ⁦SF-08⁩                                                    | <span dir="rtl">پروفایل</span> ⁦Stylist.⁩                                                     |
| ⁦US7-STY-02⁩ | ⁦UF-08⁩                                                    | ⁦Schedule/Availability⁩ <span dir="rtl">خود.</span>                                           |
| ⁦US7-STY-03⁩ | ⁦UF-08⁩                                                    | ⁦Block/ReleaseAt.⁩                                                                            |
| ⁦US7-STY-04⁩ | ⁦UF-08⁩                                                    | ⁦Preview⁩ <span dir="rtl">اثر تغییر.</span>                                                   |
| ⁦US7-STY-05⁩ | ⁦UF-07⁩                                                    | ⁦Inbox⁩ <span dir="rtl">فقط</span> ⁦Proposed.⁩                                                  |
| ⁦US7-STY-06⁩ | ⁦UF-07⁩                                                    | ⁦Time/Fee⁩ <span dir="rtl">نهایی.</span>                                                      |
| ⁦US7-STY-07⁩ | ⁦UF-07⁩                                                    | <span dir="rtl">رد</span> ⁦Proposed.⁩                                                         |
| ⁦US7-STY-08⁩ | ⁦UF-06⁩                                                    | ⁦Manual booking.⁩                                                                             |
| ⁦US7-STY-09⁩ | ⁦UF-06⁩                                                    | ⁦Customer lookup/create.⁩                                                                     |
| ⁦US7-STY-10⁩ | ⁦UF-05/SF-03⁩                                              | ⁦Appointment/NoShow.⁩                                                                         |
| ⁦US7-STY-11⁩ | ⁦SF-08⁩                                                    | ⁦Portfolio⁩ <span dir="rtl">خود.</span>                                                       |
| ⁦US7-STY-12⁩ | ⁦SF-05⁩                                                    | ⁦Notifications + SMS⁩ <span dir="rtl">مرتبط.</span>                                           |
| ⁦US7-ADM-01⁩ | ⁦SF-04⁩                                                    | ⁦Account support/soft delete.⁩                                                                |
| ⁦US7-ADM-02⁩ | ⁦SF-04⁩                                                    | ⁦Role/status⁩ <span dir="rtl">بدون مدیر دوم.</span>                                           |
| ⁦US7-ADM-03⁩ | ⁦SF-07⁩                                                    | ⁦Service⁩ <span dir="rtl">و</span> ⁦Requested composition.⁩                                     |
| ⁦US7-ADM-04⁩ | ⁦SF-07⁩                                                    | ⁦Pricing.⁩                                                                                    |
| ⁦US7-ADM-05⁩ | ⁦UF-08⁩                                                    | ⁦Schedule/BookableFrom.⁩                                                                      |
| ⁦US7-ADM-06⁩ | ⁦UF-11⁩                                                    | ⁦Requested management.⁩                                                                       |
| ⁦US7-ADM-07⁩ | ⁦UF-06⁩                                                    | ⁦Manual booking⁩ <span dir="rtl">برای همه.</span>                                             |
| ⁦US7-ADM-08⁩ | ⁦UF-05⁩                                                    | ⁦Business cancel/reschedule.⁩                                                                 |
| ⁦US7-ADM-09⁩ | ⁦UF-04⁩                                                    | <span dir="rtl">مدیریت دامنه دوره.</span>                                                   |
| ⁦US7-ADM-10⁩ | ⁦UF-09⁩                                                    | ⁦Reconciliation.⁩                                                                             |
| ⁦US7-ADM-11⁩ | ⁦SF-06⁩                                                    | ⁦Wallet/Ledger.⁩                                                                              |
| ⁦US7-ADM-12⁩ | ⁦SF-05/SF-08⁩                                              | ⁦Content/Announcement/Portfolio.⁩                                                             |
| ⁦US7-ADM-13⁩ | ⁦SF-02⁩                                                    | ⁦Critical alert/Audit context.⁩                                                               |
| ⁦US7-ADM-14⁩ | ⁦SF-02⁩                                                    | ⁦Action Center.⁩                                                                              |
| ⁦US7-ADM-15⁩ | ⁦SF-05⁩                                                    | ⁦Manual in-app announcement.⁩                                                                 |
| ⁦US7-SYS-01⁩ | <span dir="rtl">همه</span> ⁦Flow⁩<span dir="rtl">ها</span> | ⁦Authorization⁩ <span dir="rtl">سمت سرور.</span>                                              |
| ⁦US7-SYS-02⁩ | ⁦UF-01/02/03⁩                                              | ⁦Hold/Expiry.⁩                                                                                |
| ⁦US7-SYS-03⁩ | ⁦UF-01/02/03/04⁩                                           | ⁦Verify/Callback.⁩                                                                            |
| ⁦US7-SYS-04⁩ | ⁦UF-09⁩                                                    | ⁦Late payment.⁩                                                                               |
| ⁦US7-SYS-05⁩ | ⁦SF-03⁩                                                    | ⁦Completion/NoShow.⁩                                                                          |
| ⁦US7-SYS-06⁩ | ⁦SF-05⁩                                                    | ⁦SMS Queue/Retry.⁩                                                                            |
| ⁦US7-SYS-07⁩ | ⁦UF-10⁩                                                    | ⁦First availability.⁩                                                                         |
| ⁦US7-SYS-08⁩ | ⁦UF-01/03/04/SF-06⁩                                        | ⁦Idempotency/Ledger/group operations.⁩                                                        |
| ⁦US7-SYS-09⁩ | ⁦UF-03/11⁩                                                 | ⁦Atomic Requested conversion.⁩                                                                |

<span dir="rtl">۱۰. تصمیم‌های نهایی فاز ۹</span>

<span dir="rtl">چهار موضوعی که در نسخه بازبینی به‌عنوان تصمیم باز ثبت شده
بودند، پس از بازبینی انسانی و تأیید مالک محصول به تصمیم قطعی فاز ۹ تبدیل
شدند.</span>

| <span dir="rtl">شناسه</span> | <span dir="rtl">موضوع</span>                            | <span dir="rtl">شکاف پیش از تصمیم</span>                                                                | <span dir="rtl">تصمیم نهایی فاز ۹</span>                                                                                                                                                                                              | <span dir="rtl">وضعیت</span>            |
|------------------------------|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| ⁦D9-01⁩                        | <span dir="rtl">داده اولیه Requested</span>             | <span dir="rtl">منابع قبلی فقط انتخاب خدمت و نبود Stylist/Time اولیه را قطعی کرده بودند.</span>         | <span dir="rtl">مشتری علاوه بر خدمت Requested می‌تواند یک توضیح اختیاری و یک تاریخ ترجیحی اختیاری و غیرالزام‌آور وارد کند. این داده‌ها فقط زمینه هماهنگی مدیرکل هستند و هیچ Hold، تخصیص Stylist/Time یا تعهد زمانی ایجاد نمی‌کنند.</span> | <span dir="rtl">تأییدشده و نهایی</span> |
| ⁦D9-02⁩                        | <span dir="rtl">گرانولاریتی ترجیح زمانی Proposed</span> | <span dir="rtl">منابع قبلی وجود بازه ترجیحی در افق یک‌ماه را قطعی کرده بودند، نه تعداد بازه‌ها را.</span> | <span dir="rtl">در نسخه اصلی هر BookingRequest پیشنهادی دقیقاً یک بازه ترجیحی اصلی ثبت می‌کند. ثبت چند بازه جدا در محدوده فعلی نیست.</span>                                                                                             | <span dir="rtl">تأییدشده و نهایی</span> |
| ⁦D9-03⁩                        | <span dir="rtl">معنای Badge در Action Center</span>     | <span dir="rtl">فاز ۸ وجود Badge را قطعی کرده بود اما معنای شمارنده را تعیین نکرده بود.</span>          | <span dir="rtl">Badge تعداد منابع unresolved/actionable را نشان می‌دهد و مستقل از Read/Unread اعلان‌هاست. با تعیین تکلیف منبع، شمارنده به‌صورت خودکار کاهش می‌یابد.</span>                                                                | <span dir="rtl">تأییدشده و نهایی</span> |
| ⁦D9-04⁩                        | Deep Link پیام اعلان آزادشدن                            | <span dir="rtl">ارسال یک SMS در اولین آزادشدن قطعی بود اما مقصد لینک نهایی نشده بود.</span>             | <span dir="rtl">Deep Link پیامک به CUS-02 می‌رود و Service+Stylist را از پیش پر می‌کند؛ Availability تازه محاسبه می‌شود و هیچ Hold، اولویت یا رزرو خودکار ایجاد نمی‌شود.</span>                                                           | <span dir="rtl">تأییدشده و نهایی</span> |

<span dir="rtl">۱۱. خروجی مورد انتظار برای فاز ۱۰ —</span> **⁦Wireframe⁩**

| <span dir="rtl">شناسه</span> | <span dir="rtl">الزام انتقال به</span> **⁦Wireframe⁩**                                                                                                                                                                                                                    |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦W9-01⁩                        | <span dir="rtl">هر صفحه باید حالت</span> ⁦Default⁩<span dir="rtl">،</span> ⁦Loading⁩<span dir="rtl">،</span> ⁦Empty⁩<span dir="rtl">،</span> ⁦Error⁩ <span dir="rtl">و</span> ⁦Permission/Expired⁩ <span dir="rtl">مرتبط با</span> ⁦Flow⁩ <span dir="rtl">خود را داشته باشد.</span> |
| ⁦W9-02⁩                        | ⁦CUS-06⁩ <span dir="rtl">باید برای</span> ⁦Proposed⁩ <span dir="rtl">یک پیشنهاد و برای</span> ⁦Requested⁩ <span dir="rtl">چند</span> ⁦Component + Total +⁩ <span dir="rtl">تایمر مشترک را بدون ابهام نمایش دهد.</span>                                                          |
| ⁦W9-03⁩                        | ⁦ADM-04⁩ <span dir="rtl">باید</span> ⁦Draft⁩ <span dir="rtl">پایدار</span> ⁦Requested⁩<span dir="rtl">، اعتبار هر</span> ⁦Component⁩ <span dir="rtl">و خطای</span> ⁦Publish⁩ <span dir="rtl">همه‌یا‌هیچ را واضح کند.</span>                                                         |
| ⁦W9-04⁩                        | ⁦OwnerAdmin⁩ <span dir="rtl">در همه صفحات</span> ⁦Action Center⁩ <span dir="rtl">سراسری و</span> ⁦Scope⁩ <span dir="rtl">واضح دارد؛</span> ⁦Scope⁩ <span dir="rtl">و</span> ⁦Role⁩ <span dir="rtl">از نظر بصری با هم اشتباه نشوند.</span>                                         |
| ⁦W9-05⁩                        | ⁦Checkout⁩ <span dir="rtl">باید</span> ⁦Wallet Hold⁩<span dir="rtl">، سهم</span> ⁦Gateway⁩<span dir="rtl">، زمان باقی‌مانده و</span> ⁦Under Review⁩ <span dir="rtl">را قابل فهم کند، بدون افشای جزئیات فنی.</span>                                                               |
| ⁦W9-06⁩                        | ⁦UF-05⁩ <span dir="rtl">باید</span> ⁦Action⁩<span dir="rtl">های مجاز را از روی نوع</span> ⁦Appointment⁩<span dir="rtl">،</span> ⁦Cutoff⁩<span dir="rtl">، سهم</span> ⁦Reschedule⁩ <span dir="rtl">و</span> ⁦CompensationRight⁩ <span dir="rtl">به‌طور روشن ارائه کند.</span>         |
| ⁦W9-07⁩                        | ⁦Schedule UI⁩ <span dir="rtl">باید</span> ⁦ReleaseAt⁩ <span dir="rtl">شخصی را از</span> ⁦BookableFrom⁩ <span dir="rtl">سراسری خدمت کاملاً متمایز کند.</span>                                                                                                                   |
| ⁦W9-08⁩                        | <span dir="rtl">در عرض ۳۶۰ پیکسل هیچ</span> ⁦Flow⁩ <span dir="rtl">اصلی پیمایش افقی نداشته باشد و متن فارسی+</span>⁦English/ID⁩ <span dir="rtl">به‌هم نریزد.</span>                                                                                                          |
| ⁦W9-09⁩                        | <span dir="rtl">⁦BK-R01⁩ باید توضیح اختیاری و تاریخ ترجیحی اختیاری ⁦Requested⁩ را از انتخاب قطعی زمان/آرایشگر متمایز نشان دهد و روشن کند این داده‌ها تعهد یا ⁦Hold⁩ ایجاد نمی‌کنند.</span>                                                                                      |
| ⁦W9-10⁩                        | <span dir="rtl">⁦BK-P01⁩ در نسخه اصلی فقط یک بازه ترجیحی اصلی می‌گیرد؛ رابط نباید مفهوم چند ترجیح هم‌زمان را القا کند.</span>                                                                                                                                               |
| ⁦W9-11⁩                        | <span dir="rtl">⁦Action Center Badge⁩ باید تعداد موارد حل‌نشده و قابل اقدام را نمایش دهد، نه تعداد اعلان‌های خوانده‌نشده.</span>                                                                                                                                             |
| ⁦W9-12⁩                        | <span dir="rtl">⁦Deep Link⁩ اعلان آزادشدن باید کاربر را به ⁦CUS-02⁩ با ⁦Service+Stylist⁩ ازپیش‌پرشده ببرد و ⁦Availability⁩ تازه را بدون اولویت یا ⁦Hold⁩ نمایش دهد.</span>                                                                                                         |

<span dir="rtl">۱۲. چک‌لیست اعتبارسنجی نهایی فاز ۹</span>

<span dir="rtl">• ☒مسیر</span> ⁦UF-01 Fixed⁩ <span dir="rtl">را از شروع
تا</span> ⁦Verify⁩<span dir="rtl">،</span> ⁦Expiry⁩ <span dir="rtl">و</span>
⁦Late Payment⁩ <span dir="rtl">بررسی کردم.</span>

<span dir="rtl">• ☒مسیر</span> ⁦UF-02 Proposed⁩ <span dir="rtl">و
تفاوت</span> ⁦Request⁩ <span dir="rtl">اولیه با</span> ⁦Hold⁩
<span dir="rtl">سه‌ساعته پاسخ را بررسی کردم.</span>

<span dir="rtl">• ☒مسیر</span> ⁦UF-03/UF-11 Requested⁩ <span dir="rtl">را
از نگاه</span> ⁦Customer⁩ <span dir="rtl">و</span>
⁦OwnerAdmin⁩<span dir="rtl">، به‌ویژه</span> ⁦Draft⁩<span dir="rtl">،</span>
⁦Atomic Hold⁩ <span dir="rtl">و</span> ⁦Appointment⁩<span dir="rtl">های
مستقل بررسی کردم.</span>

<span dir="rtl">• ☒رزرو دوره‌ای، رخداد نامعتبر و</span> ⁦Checkout⁩
<span dir="rtl">گروهی را بررسی کردم.</span>

<span dir="rtl">• ☒لغو،</span> ⁦Reschedule Fixed⁩<span dir="rtl">،
منع</span> ⁦Reschedule Proposed⁩ <span dir="rtl">و</span>
⁦CompensationRight⁩ <span dir="rtl">را بررسی کردم.</span>

<span dir="rtl">• ☒رزرو دستی بدون اخذ</span> ⁦Reservation Fee⁩
<span dir="rtl">و</span> ⁦Override⁩<span dir="rtl">های
مجاز</span>⁦/⁩<span dir="rtl">غیرمجاز را بررسی کردم.</span>

<span dir="rtl">• ☒</span>⁦ReleaseAt⁩ <span dir="rtl">و</span>
⁦BookableFrom⁩ <span dir="rtl">را از نظر</span> ⁦Actor⁩ <span dir="rtl">و
اثر بر</span> ⁦Availability⁩ <span dir="rtl">بررسی کردم.</span>

<span dir="rtl">• ☒</span>⁦Under Review/Reconciliation⁩ <span dir="rtl">و
قاعده «دقیقاً یک اثر نهایی» را بررسی کردم.</span>

<span dir="rtl">• ☒اعلان آزادشدن، عدم</span> ⁦Hold/⁩<span dir="rtl">اولویت
و انقضای ۶روزه را بررسی کردم.</span>

<span dir="rtl">• ☒</span>⁦OwnerAdmin⁩ <span dir="rtl">یک‌پوسته،</span>
⁦Scope⁩ <span dir="rtl">و</span> ⁦Action Center⁩ <span dir="rtl">را بررسی
کردم.</span>

<span dir="rtl">• ☒ چهار تصمیم ⁦D9-01⁩ تا ⁦D9-04⁩ به‌صورت نهایی تأیید و در
Flowهای مرتبط اعمال شدند.</span>

<span dir="rtl">• ☒ بازبینی انسانی بدون ایراد مؤثر تکمیل و اعتبارسنجی
نهایی مدل انجام شد.</span>

| <span dir="rtl">وضعیت نهایی نسخه ۱٫۰: فاز ۹ پس از بازبینی انسانی، اعتبارسنجی کامل مدل و تأیید مالک محصول بسته شد. همه جریان‌های اصلی و پشتیبان، ۵۶ داستان کاربر، تصمیم‌های D9-01 تا D9-04 و الزامات انتقال به فاز ۱۰ تثبیت شده‌اند. هیچ تصمیم باز محصول در پایان فاز ۹ باقی نمانده است. شروع فاز ۱۰ فقط با دستور صریح مالک محصول مجاز است.</span> |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<span dir="rtl">واژه‌نامه کوتاه</span>

| <span dir="rtl">واژه</span> | <span dir="rtl">تعریف</span>                                                                                                                                                                                                                       |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦User Flow⁩                   | <span dir="rtl">مسیر گام‌به‌گام</span> ⁦Actor⁩ <span dir="rtl">از</span> ⁦Trigger⁩ <span dir="rtl">تا</span> ⁦Outcome⁩ <span dir="rtl">با شاخه‌های جایگزین و خطا.</span>                                                                                    |
| ⁦Guard⁩                       | <span dir="rtl">شرط لازم برای ادامه</span> ⁦Flow⁩ <span dir="rtl">که باید در سمت سرور نیز</span> ⁦enforce⁩ <span dir="rtl">شود.</span>                                                                                                                 |
| ⁦Outcome⁩                     | <span dir="rtl">پایان قابل تشخیص</span> ⁦Flow⁩<span dir="rtl">؛</span> ⁦Success⁩<span dir="rtl">،</span> ⁦Cancel⁩<span dir="rtl">،</span> ⁦Expired⁩<span dir="rtl">،</span> ⁦Rejected⁩<span dir="rtl">،</span> ⁦Under Review⁩ <span dir="rtl">یا</span> ⁦Error.⁩ |
| ⁦Draft Requested⁩             | <span dir="rtl">پیش‌نویس پایدار پاسخ مدیر کل؛ تا</span> ⁦Publish⁩ <span dir="rtl">ظرفیت را</span> ⁦Hold⁩ <span dir="rtl">نمی‌کند.</span>                                                                                                                 |
| ⁦Atomic Hold⁩                 | <span dir="rtl">ایجاد همه</span> ⁦Hold⁩<span dir="rtl">های لازم یا هیچ‌کدام؛ حالت</span> ⁦Hold⁩ <span dir="rtl">جزئی باقی نمی‌ماند.</span>                                                                                                               |
| ⁦Scope⁩                       | <span dir="rtl">دامنه داده در صفحه</span> ⁦OwnerAdmin⁩<span dir="rtl">؛ تغییر</span> ⁦Scope⁩ <span dir="rtl">تغییر</span> ⁦Role⁩ <span dir="rtl">نیست.</span>                                                                                            |
| ⁦Action Center⁩               | <span dir="rtl">لایه سراسری وظایف فوری مدیر کل، مستقل از</span> ⁦Scope⁩ <span dir="rtl">صفحه.</span>                                                                                                                                                 |
| ⁦Recovery⁩                    | <span dir="rtl">مسیر بازگشت از</span> ⁦Session expiry⁩<span dir="rtl">، خطای شبکه، انقضا یا نتیجه نامشخص بدون اثر تکراری.</span>                                                                                                                     |
```

### Source B — Rival_Phase_09-1_AI_Handoff_v1.0_FA.md

```text
# Rival — Phase 09-1 AI Handoff v1.0 FA

## وضعیت
- فاز: ۹-۱ — جریان‌های عملیاتی و مدیریتی سامانه
- نسخه: ۱٫۰ نهایی
- تاریخ نهایی‌سازی: ۱ اکتبر ۲۰۲۶
- وضعیت: بسته‌شده با تأیید مالک محصول
- ورودی‌ها: فاز ۹ v1.0، فاز ۷-۱ v1.0، فاز ۶-۱ v1.0، فاز ۵-۱ v1.0 و تصمیم‌های تأییدشده Gate 8-1
- مرحله بعد: تصمیم مستقل KPIهای Reports باید پیش از Wireframe بسته شود. فاز ۱۰ فقط با دستور صریح مالک محصول شروع می‌شود.

## هدف فاز
این فاز Storyهای عملیاتی/مدیریتی ۷-۱ را به Flowهای قدم‌به‌قدم تبدیل می‌کند و شکاف نسخه اصلی فاز ۹ را در چرخه منابع مدیریتی، Preview/Confirm، Side Effect، نتیجه جزئی، Failure Notification و Recovery می‌بندد. Flowهای اصلی مشتری/رزرو/پرداخت که در فاز ۹ کافی بوده‌اند بدون دلیل بازطراحی نشده‌اند.

## اصول قطعی Flow
1. تصمیم جدیدتر فازهای ۵-۱، ۶-۱، ۷-۱ و ۹-۱ بر متن قدیمی متعارض مقدم است.
2. در Confirm عملیات اثرگذار، Permission/Ownership/State و منابع متاثر دوباره Revalidate می‌شوند؛ Preview قدیمی مجوز اجرا نیست.
3. در عملیات چندعضوی، هر عضو مستقل و اتمیک است؛ Failure یک عضو Success سایر اعضا را Rollback نمی‌کند.
4. Side Effectهای لغو، Release، Credit و Notification فقط در Context عملیات مجاز توسط System/Worker اجرا می‌شوند.
5. Force Success، تغییر مستقیم Status/Ledger، Impersonation و دورزدن Snapshot/Verify/Idempotency ممنوع است.
6. Failure در SMS/Notification پس از Commit عملیات اصلی، عملیات اصلی را Rollback نمی‌کند.
7. Failure نهایی عملیاتی پس از Retry فنی ازپیش‌تعریف‌شده همان عملیات، اگر وجود داشته باشد، به‌صورت Notification مدیریتی با Context انسانی‌فهم ثبت می‌شود.
8. Failure Notification وارد Action Center actionable/unresolved نمی‌شود و سیستم Resolution بعدی آن را دنبال نمی‌کند.
9. Action Center فقط منابعی را نگه می‌دارد که خود محصول تا تعیین تکلیف نیازمند اقدام جاری می‌داند؛ مانند Requested نیازمند پاسخ یا Payment Under Review. Badge آن از Read/Unread اعلان‌ها مستقل است.

## تصمیم‌های نهایی جدید
### D91-01 — وضعیت عملیات چندعضوی با Failure
اگر بخشی از اعضا موفق و بخشی ناموفق باشند:
- وضعیت کلی: «تکمیل با خطا» / Partial Success.
- در خلاصه نتیجه، عضوهای موفق و ناموفق جدا نمایش داده می‌شوند.
- Successهای عضو Commit باقی می‌مانند.
- Failure یک عضو Rollback کل Batch را ایجاد نمی‌کند.

### D91-02 — Failure Notification و مرز مسئولیت سیستم
- Failure نهایی صرفاً به OwnerAdmin اطلاع داده می‌شود.
- چرخه Failure یک Notification با Read/Unread است.
- Read شدن فقط به معنی دیده‌شدن اعلان است، نه رفع خطا.
- Failure وارد Action Center نمی‌شود و در شمار actionable/unresolved قرار نمی‌گیرد.
- سیستم مسئول پیگیری Resolution، الزام Retry دستی یا نگه‌داشتن Failure تا رفع نیست.
- تصمیم درباره هر اقدام بعدی یا عدم اقدام با OwnerAdmin است.
- اگر OwnerAdmin بعداً اقدامی انجام دهد، فقط از Actionهای معتبر دامنه/مالی استفاده می‌کند؛ Force Success و ویرایش مستقیم Status/Ledger همچنان ممنوع است.

## Flowهای نهایی ۹-۱
### OF91-01 — ساخت Stylist و Mapping اولیه
OwnerAdmin از ADM-10 فرم موبایلی مستقل را باز می‌کند، اطلاعات پایه را وارد می‌کند، Mapping اولیه اختیاری انتخاب می‌شود و Stylist با State=Active ساخته می‌شود. اولین ورود OTP است. Mapping به‌تنهایی Availability نمی‌سازد.

### OF91-02 — Disable / Reactivate Stylist
Disable باعث بسته‌شدن booking/request جدید Customer برای Stylist می‌شود؛ Proposed غیرتاییدشده منتسب لغو/نامعتبر و Hold آزاد می‌شود؛ Appointment قطعی آینده باقی می‌ماند. Disabled Stylist همچنان به Profile/Security/Schedule/Portfolio/Appointment موجود/Notification/SMS مرتبط دسترسی دارد، اما Manual Booking و تعهد رزروی جدید بسته است. Reactivate با قواعد جاری Revalidate می‌شود.

### OF91-03 — Soft Delete Stylist
Impact Preview شامل Appointment آینده، Proposed باز، Draft Requested وابسته و اثر مالی است. Confirm دوباره Revalidate می‌شود. Side Effectهای عضو مستقل اجرا می‌شوند. نتیجه می‌تواند کامل یا «تکمیل با خطا» باشد. Failure نهایی عضو به OwnerAdmin Notification می‌شود؛ سیستم Resolution آن را دنبال نمی‌کند.

### OF91-04 — چرخه Customer و اصلاح شماره
OwnerAdmin از ADM-09 وضعیت Customer یا اصلاح شماره را مدیریت می‌کند. Soft Delete با Preview اثرها و حفظ تاریخچه لازم انجام می‌شود. اصلاح شماره بدون شماره قبلی فقط در مسیر مدیریتی با Audit Actor/Time است؛ Credential برای مدیر قابل مشاهده/ویرایش نیست.

### OF91-05 — ایجاد و ویرایش Service
نوع Fixed/Proposed/Requested فقط هنگام ایجاد انتخاب می‌شود و پس از ایجاد immutable است. فیلدهای مجاز قابل ویرایش‌اند. تغییر Duration و سایر داده‌های موثر روی Snapshot قبلی اثر بازگشتی ندارد.

### OF91-06 — Disable / Reactivate / Soft Delete Service
Disabled برای استفاده جدید بسته است؛ Hold/پیشنهاد منتشرشده تا expiry خود معتبر می‌ماند مگر OwnerAdmin صریحاً لغو کند. Soft Delete فقط پس از Impact Preview/Confirm؛ Hold/Request/Appointment/Requested parent طبق Rule خود تعیین تکلیف می‌شوند. عملیات چندعضوی می‌تواند «تکمیل با خطا» شود و Failure نهایی Notification است.

### OF91-07 — Requested Composition
فقط Serviceهای Active از نوع Fixed/Proposed مجازند؛ Requested تودرتو و Mapping مستقیم Parent ممنوع است. تغییر Composition روی Snapshot قبلی اثر ندارد. اعتبار اجزا قبل از انتشار پاسخ دوباره بررسی می‌شود.

### OF91-08 — Stylist-Service Mapping
Add Mapping فقط برای Stylist و Service پایه معتبر. Remove Mapping عملیات اثرگذار با Impact Preview/Confirm است. Side Effectهای منابع وابسته عضو مستقل هستند. نتیجه جزئی با فهرست موفق/ناموفق نمایش داده می‌شود و Failure نهایی به OwnerAdmin اعلان می‌شود.

### OF91-09 — Pricing
OwnerAdmin BaseReservationFee، BaseFeeOverride، ServiceFactor و BarberFactor را مدیریت می‌کند. Override هم‌سطح موثر نباید overlap داشته باشد. حذف/ویرایش فقط محاسبات آینده را تغییر می‌دهد؛ Snapshot/Payment قبلی ثابت است.

### OF91-10 — Schedule / Holiday / BookableFrom
تغییر اثرگذار Schedule/Exception/Block/ReleaseAt یا الگوی سالن با Impact Preview/Confirm انجام می‌شود. هر Appointment متاثر لغو مستقل/اتمیک دارد. Success/Failure عضو جداست. Notification/SMS پس از Commit عضو انجام می‌شود. Failure نهایی عضو فقط Notification مدیریتی است.

### OF91-11 — Settings و SMS Templates
فقط Settings مصوب قابل ویرایش‌اند. Setting جدید روی استفاده‌های آینده اثر دارد. پیام از قبل Queued متن Snapshotشده قبلی را حفظ می‌کند.

### OF91-12 — Portfolio
Create/Edit، Hide، Unhide و Hard Delete جدا هستند. Hide رکورد را نگه می‌دارد. Hard Delete فقط برای Portfolio واقعی است و رکورد، media و product-audit همان item را غیرقابل‌بازیابی حذف می‌کند.

### OF91-13 — SMS تک‌مخاطب/گروهی
Stylist فقط به Customer مرتبط با resource خودش SMS می‌فرستد. OwnerAdmin تک‌مخاطب را از Customer context و گروهی را از ADM-23 ارسال می‌کند. Active/Disabled با شماره معتبر قابل انتخاب و SoftDeleted غیرقابل انتخاب است. هر Delivery مستقل است؛ Failure یک Delivery سایر نتایج را تغییر نمی‌دهد. Retry فقط Delivery ناموفق طبق Rule موجود است؛ Failure نهایی در صورت نیاز Notification می‌شود.

### OF91-14 — Action Center و Failure Notification
دو مدل جدا هستند:
- Action Center: برای منابع واقعاً actionable/unresolved مثل Requested و Payment Under Review؛ Badge بر اساس خود resource است.
- Failure Notification: هنگام Failure نهایی عضو، Notification مدیریتی با Context مجاز ثبت می‌شود؛ Read/Unread مستقل است؛ وارد Action Center نمی‌شود و Resolution توسط سیستم دنبال نمی‌شود.

### OF91-15 — Wallet Adjustment / Reversal
Balance یا Entry خام هرگز ویرایش نمی‌شود. Adjustment/Reversal Entry جدید ثبت می‌کند. Failure مالی نهایی Notification مدیریتی ایجاد می‌کند. OwnerAdmin اگر بخواهد بعداً فقط از Actionهای مالی معتبر استفاده می‌کند؛ سیستم Resolution Failure را دنبال نمی‌کند.

## جایگزینی/اصلاح متن قدیمی فاز ۹
- SF-04: چرخه حساب با State Gate و نتیجه جزئی/Failure Notification تکمیل می‌شود.
- SF-05: SMS گروهی و Delivery مستقل + Failure Notification تکمیل می‌شود.
- SF-07 step 3: متن قدیمی «Soft Delete Service، Appointment آینده را خودکار لغو نمی‌کند» منسوخ است؛ OF91-06 مرجع جدید است.
- SF-07: Service/Requested/Pricing با OF91-05..09 تفصیل می‌شود؛ SchedulingType immutable است.
- SF-08: Delete کلی Portfolio با Hide/Unhide/Hard Delete واقعی جایگزین می‌شود.
- UF-08: هر cancellation عضو مستقل/اتمیک است؛ Failure نهایی Notification است.
- SF-06: Wallet حفظ، ولی Failure handling طبق OF91-15 است.

## همگام‌سازی بین‌فازی لازم
- D9-03 همچنان معتبر است: Action Center badge = actionable/unresolved resource count و از Notification Read/Unread مستقل است.
- D61-02 در بخشی که Failure را تا Resolution در Action Center نگه می‌داشت، با D91-02 supersede می‌شود. ممنوعیت Force Success/direct Status/direct Ledger همچنان معتبر است.
- US71-ADM-28 / US71-ADM-30 / US71-SYS-05 باید با semantics جدید Failure Notification تفسیر شوند؛ Resolution tracking الزامی نیست.
- Phase 8 Action Center محتوای Failure را به Notification Center منتقل می‌کند؛ خود Action Center برای Requested/Payment Under Review و سایر resourceهای واقعاً actionable باقی می‌ماند.

## سناریوهای پذیرش کلیدی افزوده‌شده/اصلاح‌شده
- Batch با چند عضو: موفق‌ها Commit، ناموفق‌ها جدا؛ وضعیت «تکمیل با خطا».
- Failure نهایی عضو: Notification OwnerAdmin؛ Read/Unread فقط وضعیت مشاهده؛ بدون Resolution tracking.
- Preview قدیمی پس از تغییر State: Confirm Revalidation شکست می‌خورد و Preview جدید لازم است.
- Service type change: Action ندارد؛ Soft Delete + Service جدید مسیر معتبر است.
- Portfolio Hard Delete: حذف واقعی و غیرقابل‌بازیابی فقط برای Portfolio.
- SMS گروهی: Deliveryها مستقل؛ Failure یک گیرنده سایر گیرندگان را Rollback نمی‌کند.

## موارد باز خارج از فاز ۹-۱
- KPIهای دقیق Reports هنوز تصمیم مستقل پیش از Wireframe هستند.
- چیدمان CTA، اندازه Modal/Sheet، نمایش Partial Success و Failure Notification در فاز ۱۰ تعیین می‌شود.
- Endpoint/API، Transaction boundary، Queue/Job و Idempotency contract در فازهای فنی بعدی تعیین می‌شوند.

## دستور برای مدل بعدی
فاز ۱۰ را خودکار شروع نکن. ابتدا تصمیم KPIهای Reports باید بسته شود و سپس فقط با دستور صریح مالک محصول وارد Wireframe شو.
```

## 4. وضعیت پایان این Handoff

- این فایل Current Truth فاز را تا پایان ۹-۱ و بازبینی بین‌فازی ۱ اکتبر ۲۰۲۶ یکپارچه می‌کند.
- Ruleهای منسوخ فقط در Source Archive برای Traceability باقی مانده‌اند و فعال نیستند.
- Reports/KPI subsystem از Scope محصول حذف شده است.
- روش تأمین تعطیلات رسمی و اثر Automatic holiday-source update بر Appointmentهای ازقبل قطعی‌شده به فازهای Backend/Domain آینده منتقل شده است.
- فاز ۱۰ هنوز شروع نشده و شروع آن فقط با دستور صریح مالک محصول است.
