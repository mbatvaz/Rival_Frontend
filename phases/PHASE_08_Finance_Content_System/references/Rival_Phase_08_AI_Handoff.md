> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

---
project: Rival
phase: 8
phase_title_fa: "نقشه سایت، معماری اطلاعات و Mobile IA"
canonical_status: "merged_current_truth_pre_phase_10"
canonical_date_gregorian: "2026-10-01"
canonical_scope_through: "Phase 9-1 + owner cross-phase review REV-01..REV-05"
phase_10_started: false
source_files:
  - "Rival_Phase_08_AI_Handoff_v1.1_FA.md"
  - "Rival_Phase_8-1_AI_Handoff_v1.0_FA (source filename historically Gate)"
---

# Rival — فاز 8 — AI Handoff یکپارچه و Canonical پیش از فاز ۱۰

**عنوان:** نقشه سایت، معماری اطلاعات و Mobile IA

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

## 2. Current Truth ویژه فاز ۸ — ادغام Sitemap/IA + الحاقیه ۸-۱

طبق تصمیم نهایی مالک محصول، فایل منبعی که قدیم «Gate 8-1» نامیده شده بود **خود الحاقیه Phase 8-1** است. فاز ۸ دو بخش دارد: Phase 8 اصلی و Phase 8-1 Mobile IA؛ Gate مستقل در Canonical History وجود ندارد.

### اصلاحات IA نهایی

- `/admin/action-center`: صفحه مستقل. Dashboard فقط Badge/Preview کوتاه دارد. محتوا: Requested نیازمند اقدام، Payment Under Review و Resourceهای دیگری که صریحاً actionable هستند. Operational Failure/Health alert در این صفحه نیست.
- **OwnerAdmin Notification Center**: مقصد مستقل برای اعلان‌های مدیر. برای یکپارچگی Sitemap مسیر Canonical به `/admin/notifications` نرمال شده است. صفحه قدیمی `/admin/announcements` به این مرکز جذب/تغییرنام می‌شود و Route مستقل Announcement دیگر لازم نیست.
  - Incoming Business Notification مربوط به خود مدیر/Stylist؛
  - Incoming Operational System Notification برای سلامت/نتیجه عملیات/Partial Failure؛
  - Read/Unread + Pagination؛
  - ایجاد اعلان دستی شخصی/عمومی برای کاربران توسط OwnerAdmin.
- `/admin/sms` مستقل می‌ماند و برای SMS دستی گروهی/مدیریتی است.
- `/admin/reports` از Sitemap Current Truth حذف می‌شود؛ Reports/KPI subsystem نداریم. آمار/Count ساده در Dashboard/صفحات در فاز ۱۰ در صورت نیاز طراحی می‌شود.
- Create Stylist و Create Service Route UI مستقل ندارند؛ CTA در List و Full-screen Modal/Sheet.
- Service detail: SchedulingType immutable؛ Disable/SoftDelete/Mapping actionهای مستقل با Preview/Confirm مناسب.
- Pricing یک صفحه واحد است؛ Base/Override/Factor sectionها و Add/Edit Override با Modal.
- Schedule/Settings در صفحات تخصصی موجود؛ BookableFrom/Template edit در Modal/Section.
- Portfolio Create/Edit Full-screen Modal؛ Hide/Unhide Action؛ Hard Delete Confirm.
- Disabled Stylist صفحات موجود را برای مدیریت تعهدهای قبلی استفاده می‌کند ولی Manual Booking/تعهد جدید بسته است.
- System/Worker Storyها صفحه مستقل ندارند.

### Mobile IA classification 8-1

- A: Action/State در صفحه موجود.
- B: Confirm Dialog/Bottom Sheet برای عمل حساس کوتاه.
- C: Full-screen Modal/Sheet برای فرم مستقل موبایلی بدون Route جدید.
- D: صفحه موجود برای Context کاری مستقل.
- E: Route مستقل وقتی حجم/فیلتر/Deep Link آن را لازم کند.
- S: System/Worker بدون UI مستقل.

### Deep Linkهای مهم

- Availability SMS → `CUS-02`/booking با Service+Stylist prefilled و Fresh Availability؛ بدون Hold/priority.
- Action Center → Resource detail مرتبط.
- Operational Failure Notification → Context/Resource مرتبط در حدی که وجود دارد؛ خود Notification Resolve workflow ندارد.


### رزرو دستی — Override بدون دلیل (تصمیم مالک، ۲۲ اکتبر ۲۰۲۶)

- Stylist و OwnerAdmin هنگام رزرو دستی برای استفاده از Overrideهای مجاز (فاصله حداقلی تا شروع، افق یک‌ماهه، روز/ساعت خدمت، تعطیلی) **دلیل ثبت نمی‌کنند** و توضیحی هم برای مدیر ارسال نمی‌شود.
- Overrideهای غیرمجاز همچنان ممنوع‌اند: تداخل Stylist، تداخل Appointmentهای Customer، یکپارچگی مالی و یکتایی اثر (BR-OPS-04).
- Actor واقعی و Overrideهای استفاده‌شده همچنان Audit می‌شوند (BR-OPS-05).
- هر عبارت قدیمی‌تر «با ثبت دلیل» یا «Override با دلیل» درباره رزرو دستی، در این فایل یا فایل‌های دیگر، با این تصمیم جایگزین شده است.


### ADM-18 / ADM-19 — ادغام در جزئیات مشتری (تصمیم مالک، ۳۱ اکتبر ۲۰۲۶؛ D10-171 تا D10-177)

- **ADM-18 (اعتبار داخلی / `/admin/wallets`) حذف شد** و **ADM-19 (Wallet مشتری / `/admin/wallets/{customerId}`) صفحه یا مسیر مستقل ندارد.** مسیرهای `/admin/wallets` و `/admin/wallets/{customerId}` و هر صفحه یا مسیر «تراکنش‌ها» ساخته نمی‌شوند. جست‌وجوی مشتری از ADM-08 و کار با اعتبار از ADM-09 است.
- ADM-09 (`/admin/customers/{id}`) رادیوی دوحالتهٔ «خدمات | پرداخت‌ها» دارد. حالت «پرداخت‌ها» کارت موجودی با دکمهٔ «تغییر موجودی»، نمای «پرداخت‌ها» (موفق، ناموفق، منقضی، در حال بررسی، تطبیق شد، برگشت خورد) و نمای «حرکت‌های اعتبار» (دفتر تغییرناپذیر) را نشان می‌دهد. «اصلاح موجودی» و «برگشت سطر» برگه‌های پایین‌به‌بالا روی همین صفحه‌اند، نه صفحهٔ جدا.
- Adjustment و Reversal همچنان فقط با Ledger Entry تازه، دلیل اجباری و نام مدیر ثبت‌کننده انجام می‌شود؛ Balance خام و سطر دفتر مستقیم ویرایش نمی‌شود. چهار نوع سطر: بازگشت هزینه، مصرف برای رزرو، اصلاح مدیر، برگشت سطر.
- ADM-16 (`/admin/payments`) مستقل می‌ماند و مقصد پیوند «بررسی در پرداخت‌ها و تطبیق» از ردیف «در حال بررسی» در ADM-09 است؛ تطبیق مالی فقط آنجاست.
- ردیف‌های ADM-18 / ADM-19 در جدول‌های §۱۴ و §۲۱ و ماتریس §۱۷ و «Adjustment Wallet» در §۱۸ در Source Archive زیر منسوخ‌اند؛ مقصد جدید آن‌ها ADM-09 حالت «پرداخت‌ها» است. ردیابی `US7-ADM-11` اکنون به ADM-09 اشاره می‌کند.
- صفحهٔ مستقل تاریخچهٔ تراکنش برای **مشتری** همچنان وجود ندارد (بدون تغییر).


## 3. Source Archive کامل برای Traceability — غیرمرجع در صورت تعارض

**هشدار برای مدل:** متن زیر برای حفظ تمام جزئیات، IDها، Acceptance Criteria، جدول‌ها و تاریخچه تصمیم‌ها از فایل‌های اصلی آورده شده است. در هر تعارض، بخش‌های 0 تا 2 همین فایل مرجع Current Truth هستند. هیچ Rule منسوخ داخل Archive را دوباره فعال نکن.

### Source A — Rival_Phase_08_AI_Handoff_v1.1_FA.md

```text
# خلاصه انتقال نهایی فاز ۸ پروژه Rival — نسخه ۱٫۱

> این فایل انتقال ماشینی، مرجع کامل فاز ۸ را برای ادامه پروژه نگه می‌دارد. در صورت تعارض، سند DOCX نهایی همین نسخه و هر تصمیم جدیدترِ صریحاً تأییدشده مقدم است.

## قواعد و تصمیم‌های حیاتی انتقالی

- فاز ۸ بسته و تأییدشده است؛ موضوع آن Sitemap و معماری اطلاعات رابط برای سایت عمومی، Customer، Stylist و OwnerAdmin است.
- OwnerAdmin یک حساب، یک Session و یک پوسته دارد؛ Role Switch، Impersonation یا Workspace جدا برای «آرایشگر/مدیر» نداریم. صفحات عملیاتی مشترک یک نسخه دارند و Scope داخل همان صفحه بین «من / آرایشگر مشخص / همه سالن» تغییر می‌کند.
- Directory مشتریان برای OwnerAdmin همیشه سراسری است؛ «مرتبط با من» فقط Filter است و محدودیت مجوز محسوب نمی‌شود.
- Action Center سراسری OwnerAdmin مستقل از Scope جاری، Requestedهای نیازمند اقدام، پرداخت‌های Under Review و هشدارهای حیاتی را همیشه قابل مشاهده و Deep Link می‌کند؛ Badge تعداد منابع unresolved/actionable را می‌شمارد و با Read/Unread اعلان‌ها یکی نیست.
- Fixed و Proposed پس از انتخاب خدمت، Stylist مجاز می‌خواهند؛ Proposed در نسخه اصلی یک بازه ترجیحی اصلی دارد. Requested خدمت مرکب مدیرکل‌محور است و مشتری در ثبت آن Stylist یا Time قطعی انتخاب نمی‌کند، اما می‌تواند توضیح اختیاری و تاریخ ترجیحی اختیاری/غیرالزام‌آور بدهد که Hold یا تعهد زمانی ایجاد نمی‌کند.
- Requested فقط به OwnerAdmin می‌رود. OwnerAdmin پاسخ را به‌صورت Draft پایدار از چند جزء Service + Stylist + Time + FinalReservationFeeSnapshot می‌سازد؛ Draft ظرفیت را Hold نمی‌کند. هنگام ارسال، همه زمان‌ها اتمیک و همه‌یا‌هیچ ۳ ساعت Hold می‌شوند؛ پس از پرداخت هر جزء Appointment مستقل می‌شود.
- Proposed فقط در Inbox آرایشگر منتخب قرار می‌گیرد؛ Requested قبل از پرداخت در Inbox هیچ Stylistی نمایش داده نمی‌شود.
- آرایشگر می‌تواند Block شخصی با ReleaseAt داشته باشد؛ OwnerAdmin می‌تواند برای Service + TargetDateRange مقدار BookableFrom تعیین کند. این دو قابلیت صفحه مستقل جدید ندارند و در Scheduleهای موجود پیاده می‌شوند.
- افق عادی Fixed و Proposed یک ماه است؛ Recurring Fixed تا شش ماه؛ Requested در مرحله مشتری مشمول افق یک‌ماهه نیست چون زمان توسط OwnerAdmin هماهنگ می‌شود.
- اعلان‌های شخصی و عمومی در Notification Center هر نقش با Read/Unread و Pagination دیده می‌شوند. Stylist اعلان داخل سایت را دستی ایجاد نمی‌کند؛ فقط SMS دستی مشتری مرتبط. اعلان شخصی دستی و اعلان عمومی فقط OwnerAdmin.
- مشتری صفحه مستقل Wallet/Ledger یا تاریخچه تراکنش بانکی ندارد؛ Balance و رسید فقط در زمینه‌های لازم نمایش داده می‌شوند. OwnerAdmin Wallet/Ledger را مدیریت می‌کند و Balance خام مستقیم ویرایش نمی‌شود.
- صفحه عمومی مستقل Services یا Stylists وجود ندارد؛ انتخاب خدمت/آرایشگر فقط پس از احراز و در جریان رزرو انجام می‌شود. Portfolio و Booking Rules صفحات عمومی مستقل‌اند.
- Audit/Technical Log کامل الزام Sitemap نسخه اصلی نیست؛ هشدار حیاتی و خطای عملیاتی قابل اقدام در Rival کافی است، بدون نمایش Stack Trace/Secret.
- تصمیم‌های D8-01 تا D8-08 نهایی‌اند. تصمیم‌های فاز ۹ نیز در نقاط متاثر IA همگام شده‌اند: معنای Badge، داده ورودی Requested، یک بازه ترجیحی Proposed و Deep Link اعلان آزادشدن.
- خروجی مستقیم تاریخی این فاز برای فاز ۹، User Flowهای UF-01 تا UF-11، Routeهای پیشنهادی، Deep Linkها، حالت‌های سیستمی و ماتریس Story→Sitemap بوده است. نسخه ۱٫۱ پس از فاز ۹، نقاط IA متاثر را برای استفاده در فاز ۱۰ همگام می‌کند.

## همگام‌سازی پس از فاز ۹

- `BK-P01`: یک بازه ترجیحی اصلی برای Proposed.
- `BK-R01`: توضیح اختیاری + تاریخ ترجیحی اختیاری/غیرالزام‌آور، بدون Hold یا تعهد زمانی.
- `Action Center`: Badge برابر تعداد منابع unresolved/actionable و مستقل از Read/Unread.
- اعلان آزادشدن: Deep Link به `CUS-02` با `Service+Stylist` ازپیش‌پرشده و Availability تازه.

## تصمیم‌های جایگزین‌شده مهم

- مدل قبلی «دو Workspace جدا برای OwnerAdmin» کنار گذاشته شد و به یک پنل واحد + Scope + Action Center تبدیل شد.
- مدل قبلی Requested که Stylist را از ابتدا توسط مشتری اجباری می‌کرد، کنار گذاشته شد؛ Requested اکنون فقط-مدیرکل و مرکب است.
- هر تخصیص/Claim عمومی Requested حذف است؛ هماهنگی اجزای Requested فقط در Detail همان درخواست توسط OwnerAdmin انجام می‌شود.
- ابهام قبلی درباره افق Requested رفع شد؛ محدودیت یک‌ماهه انتخاب مشتری برای Requested اعمال نمی‌شود.
- ایجاد اعلان درون‌سامانه دستی توسط Stylist کنار گذاشته شد؛ Stylist فقط SMS دستی مرتبط دارد.

## متن کامل سند مرجع

<span dir="rtl">پروژه ریوال</span>

<span dir="rtl">فاز ۸ — نقشه سایت و معماری اطلاعات</span>

<span dir="rtl">نسخه نهایی همگام‌شده ۱٫۱</span>

<span dir="rtl">سند جامع ساختار صفحات، ناوبری، نقاط ورود، مالکیت صفحه و
ردیابی به داستان‌های کاربر</span>

| <span dir="rtl">عنوان</span>                 | <span dir="rtl">مقدار</span>                                                                                             |
|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">نام پروژه</span>             | <span dir="rtl">ریوال</span>                                                                                             |
| <span dir="rtl">شماره و عنوان فاز</span>     | <span dir="rtl">فاز ۸ — نقشه سایت</span>                                                                                 |
| <span dir="rtl">نسخه سند</span>              | <span dir="rtl">۱٫۱</span>                                                                                               |
| <span dir="rtl">وضعیت</span>                 | <span dir="rtl">نسخه نهایی تأییدشده</span>                                                                               |
| <span dir="rtl">تاریخ همگام‌سازی</span>       | <span dir="rtl">۷ مهر ۱۴۰۵ برابر با ۲۹ سپتامبر ۲۰۲۶</span>                                                               |
| <span dir="rtl">مرحله نهایی</span>           | <span dir="rtl">همگام‌سازی پس از بسته‌شدن فاز ۹؛ حفظ معماری اطلاعات و اعمال D9-01 تا D9-04 در نقاط متاثر</span> |
| <span dir="rtl">بازبین</span>                | <span dir="rtl">مالک محصول و بازبین انسانی</span>                                                                        |
| <span dir="rtl">وضعیت بعد از این فایل</span> | <span dir="rtl">مرجع رسمی فاز ۸ نسخه ۱٫۱ پس از بسته‌شدن فاز ۹؛ ورودی فاز ۱۰ و مراحل بعد</span>                             |

<span dir="rtl">نتیجه نهایی: نقشه سایت و معماری اطلاعات فاز ۸ پس از
بازبینی کامل مالک محصول تثبیت شد. مدل ⁦OwnerAdmin⁩ با یک پوسته واحد،
⁦Scope⁩های قابل تغییر و ⁦Action Center⁩ سراسری نهایی است و Badge آن موارد unresolved/actionable را می‌شمارد؛ ⁦Requested⁩ به جریان
مرکبِ فقط-مدیرکل تبدیل شده و قواعد ⁦ReleaseAt / BookableFrom⁩ نیز در ساختار
صفحات و جریان‌ها اعمال شده‌اند.</span>

<span dir="rtl">وضعیت نهایی: بازبینی انسانی همه بخش‌ها تکمیل و هیچ ایراد
مؤثر یا تصمیم باز مهمی باقی نمانده است. تصمیم‌های بین‌فازی این فاز در
نسخه‌های همگام‌شده فاز ۵ نسخه ۱٫۳، فاز ۶ نسخه ۱٫۲ و فاز ۷ نسخه ۱٫۱ اعمال
شده‌اند. فاز ۸ بسته و مرجع رسمی فازهای بعدی است.</span>

# <span dir="rtl">۱. خلاصه مدیریتی بازطراحی</span>

<span dir="rtl">این نسخه صرفاً بازچاپ نسخه قبلی نیست. برای کاهش ریسک خطای
معماری اطلاعات، منابع پروژه از فاز ۱ تا فاز ۷ دوباره تطبیق داده شدند و
هر تصمیم جدیدتر بر تصمیم قدیمی متعارض مقدم قرار گرفت.</span>

- <span dir="rtl">سایت عمومی در نسخه نهایی فهرست عمومی خدمات و آرایشگران
  ندارد؛ این انتخاب فقط پس از احراز هویت و در مسیر رزرو انجام
  می‌شود.</span>

- <span dir="rtl">صفحات مستقل «درباره ما» و «تماس با ما» الزام نسخه اصلی
  نیستند؛ محتوای معرفی، تماس، مسیر، شبکه‌های اجتماعی و نقشه در صفحه اصلی
  تجمیع می‌شود.</span>

- <span dir="rtl">صفحه مستقل نمونه‌کار عمومی حفظ می‌شود و صفحه مستقل
  قوانین رزرو نیز قبل از پرداخت قابل دسترس است.</span>

- <span dir="rtl">برای مشتری صفحه مستقل تاریخچه تراکنش بانکی ساخته
  نمی‌شود؛ رسید و وضعیت پرداخت در زمینه نوبت/درخواست مرتبط دیده
  می‌شود.</span>

- <span dir="rtl">برای آرایشگر هیچ فهرست عمومی مشتری و هیچ صفحه</span>
  ⁦Wallet⁩<span dir="rtl">/تطبیق پرداخت ایجاد نمی‌شود؛ اطلاعات مشتری و
  پرداخت فقط در زمینه منبع مرتبط قابل مشاهده است.</span>

- <span dir="rtl">در ⁦Fixed / Proposed⁩ مشتری پس از انتخاب خدمت، آرایشگر
  مجاز را انتخاب می‌کند. ⁦Requested⁩ استثناست: مشتری فقط خدمت درخواستیِ مرکب
  را انتخاب می‌کند و درخواست مستقیم به مدیر کل می‌رود؛ تخصیص خدمت‌های
  زیرمجموعه به آرایشگر فقط داخل جزئیات همان درخواست انجام می‌شود و صفحه
  ⁦Claim⁩ عمومی وجود ندارد.</span>

- <span dir="rtl">چرخه ⁦Proposed⁩ با مهلت بررسی ۷روزه، پاسخ آرایشگر و ⁦Hold⁩
  سه‌ساعته ادامه دارد. در ⁦Requested⁩ مدیر کل پاسخ را به‌صورت بسته‌ای از
  خدمت+آرایشگر+زمان+هزینه آماده می‌کند؛ پیش‌نویس ظرفیت را قفل نمی‌کند و
  هنگام ارسال، همه زمان‌ها به‌صورت همه‌یا‌هیچ برای ۳ ساعت ⁦Hold⁩ می‌شوند. پس از
  پرداخت، هر خدمت به نوبت مستقل تبدیل می‌شود.</span>

- <span dir="rtl">رزرو دستی از مسیر آرایشگر/مدیر قابل دسترس است،
  اما</span> ⁦UI⁩ <span dir="rtl">باید «بدون اخذ هزینه رزرو» بودن آن را
  روشن کند و مبلغ مرجع را صرفاً برای ثبت/نمایش نگه دارد.</span>

- <span dir="rtl">صفحه</span> ⁦Audit Log⁩ <span dir="rtl">کامل در پنل مدیر
  الزام نشده است؛ مرجع جدیدتر فقط مشاهده هشدارهای حیاتی در</span> ⁦Rival⁩
  <span dir="rtl">را لازم می‌داند و لاگ کامل می‌تواند خارج از پنل
  باشد.</span>

# <span dir="rtl">۲. منابع و ترتیب اعتبار</span>

| <span dir="rtl">اولویت</span> | <span dir="rtl">مرجع</span>                            | <span dir="rtl">اثر بر نقشه سایت</span>                                                                               |
|-------------------------------|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">۱</span>      | <span dir="rtl">فاز ۷ — داستان‌های کاربر ⁦v1.1⁩</span>    | <span dir="rtl">ورودی مستقیم فاز ۸؛ ۵۶ ⁦Story⁩، مسیرهای رزرو، درخواست، مدیریت، ⁦Action Center⁩ و نقاط دسترسی.</span>      |
| <span dir="rtl">۲</span>      | <span dir="rtl">فاز ۶ — نقش‌ها و مجوزها ⁦v1.2⁩</span>     | <span dir="rtl">مالکیت صفحه/منبع، نقش دوگانه مدیر کل، حداقل داده و منع صفحات نامجاز.</span>                           |
| <span dir="rtl">۳</span>      | <span dir="rtl">فاز ۵ — قواعد کسب‌وکار ⁦v1.3⁩</span>      | <span dir="rtl">وضعیت‌ها، چرخه ۷روزه/۳ساعته،</span> ⁦Wallet⁩<span dir="rtl">، لغو/جابه‌جایی و تنظیمات قابل مدیریت.</span> |
| <span dir="rtl">۴</span>      | <span dir="rtl">فاز ۴ — الزامات غیرعملکردی</span> ⁦v1.0⁩ | ⁦RTL⁩<span dir="rtl">، موبایل‌محوری، بازخورد واضح، زمان شمسی، امنیت و رفتار خطا.</span>                                  |
| <span dir="rtl">۵</span>      | <span dir="rtl">فاز ۳ — نیازمندی‌ها</span> ⁦v1.0⁩         | <span dir="rtl">تصمیم جدیدتر درباره سایت عمومی، قوانین رزرو، نمونه‌کار و حذف فهرست عمومی خدمت/آرایشگر.</span>          |
| <span dir="rtl">۶</span>      | <span dir="rtl">فاز ۲ — محدوده و اهداف</span> ⁦v1.0⁩     | <span dir="rtl">اهداف محصول، پنل‌های سه نقش، اعلان آزادشدن و محدوده نسخه اصلی.</span>                                  |
| <span dir="rtl">۷</span>      | <span dir="rtl">فاز ۱ — معماری و تصمیم‌ها</span>        | <span dir="rtl">معماری اولیه ماژول‌ها و نقاط پایه پنل‌ها؛ فقط در نبود تصمیم جدیدتر.</span>                              |

# <span dir="rtl">۳. تعارض‌های مهمی که در این نسخه حل شده‌اند</span>

| <span dir="rtl">موضوع</span>                          | <span dir="rtl">تصمیم قدیمی</span>                                                                     | <span dir="rtl">مرجع جدیدتر</span>                                                                                                                                    | <span dir="rtl">اثر قطعی در فاز ۸</span>                                                                                                                                                             |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">فهرست عمومی</span> ⁦Services / Stylist⁩ | <span dir="rtl">فاز ۲ آن را داخل محدوده عمومی آورده بود.</span>                                        | <span dir="rtl">فاز ۳ نمایش عمومی را حذف کرد.</span>                                                                                                                  | <span dir="rtl">صفحه عمومی</span> ⁦Services⁩ <span dir="rtl">و</span> ⁦Stylists⁩ <span dir="rtl">در نقشه اصلی وجود ندارد.</span>                                                                         |
| ⁦Hold⁩ <span dir="rtl">پیشنهادی ۶۰ دقیقه</span>         | <span dir="rtl">فازهای قدیمی ۶۰ دقیقه داشتند.</span>                                                   | <span dir="rtl">فاز ۵ ⁦v1.3⁩ و فاز ۷ ⁦v1.1⁩ مهلت پرداخت سه‌ساعته پس از پاسخ را تثبیت می‌کنند؛ پاسخ ⁦Proposed⁩ با آرایشگر و پاسخ ⁦Requested⁩ با مدیر کل است.</span>              | <span dir="rtl">نمای پاسخ ⁦Proposed⁩ یک ⁦Hold⁩ سه‌ساعته و نمای بسته ⁦Requested⁩ مجموعه Holdهای اتمیک با تایمر مشترک ۳ساعته دارد.</span>                                                                     |
| <span dir="rtl">تخصیص ⁦Requested⁩</span>                | <span dir="rtl">فازهای ۵ تا ۷ آرایشگر را از ابتدا توسط مشتری اجباری کرده بودند.</span>                 | <span dir="rtl">تصمیم نهایی فاز ۸ و نسخه‌های همگام‌شده فازهای ۵ تا ۷: ⁦Requested⁩ خدمت مرکب است؛ مشتری آرایشگر انتخاب نمی‌کند و درخواست فقط به مدیر کل می‌رود.</span>       | <span dir="rtl">صفحه ⁦Claim⁩ عمومی نداریم؛ مدیر کل در جزئیات درخواست، برای هر خدمت زیرمجموعه آرایشگر و زمان تعیین می‌کند. این تصمیم در فازهای ۵ نسخه ۱٫۳، ۶ نسخه ۱٫۲ و ۷ نسخه ۱٫۱ همگام شده است.</span> |
| <span dir="rtl">قیمت‌گذاری</span> ⁦MAX⁩                  | <span dir="rtl">فاز ۳ مدل «بیشترین مبلغ» داشت.</span>                                                  | <span dir="rtl">فاز ۵ مدل لایه‌ای را تثبیت کرده است. در تصمیم نهایی فاز ۸، مبلغ نهایی ⁦Proposed⁩ را آرایشگر و مبلغ نهایی هر جزء ⁦Requested⁩ را مدیر کل تعیین می‌کند.</span> | <span dir="rtl">صفحه قیمت مدیر بر پایه ⁦Base / Override / Factor⁩ است؛ پاسخ ⁦Proposed⁩ یک Snapshot نهایی دارد و بسته ⁦Requested⁩ برای هر جزء Snapshot مستقل و جمع کل مشتق‌شده دارد.</span>                  |
| <span dir="rtl">ویرایش مشتری توسط آرایشگر</span>      | <span dir="rtl">فاز ۱ به‌صورت محدود اجازه داده بود.</span>                                              | <span dir="rtl">فاز ۶ نهایی آن را ممنوع کرد.</span>                                                                                                                   | <span dir="rtl">آرایشگر صفحه ویرایش مشتری ندارد.</span>                                                                                                                                              |
| ⁦Audit Log⁩ <span dir="rtl">در پنل مدیر</span>          | <span dir="rtl">فاز ۱ صفحه</span> ⁦Audit⁩<span dir="rtl">/خطا را مطرح کرده بود.</span>                   | <span dir="rtl">فاز ۳/۶ نمایش کامل را الزام نمی‌دانند؛ فقط هشدار حیاتی در</span> ⁦Rival⁩ <span dir="rtl">لازم است.</span>                                                | ⁦Audit⁩ <span dir="rtl">خام صفحه اصلی</span> ⁦Sitemap⁩ <span dir="rtl">نیست؛ هشدار حیاتی در داشبورد/اعلان مدیر دیده می‌شود.</span>                                                                        |
| <span dir="rtl">تاریخچه پرداخت مشتری</span>           | <span dir="rtl">فاز ۱ صریحاً صفحه مستقل را حذف کرده است.</span>                                         | <span dir="rtl">تصمیم جدیدتری آن را برنگردانده است.</span>                                                                                                            | <span dir="rtl">رسید و وضعیت پرداخت در</span> ⁦Detail⁩ <span dir="rtl">نوبت/درخواست دیده می‌شود؛ صفحه</span> ⁦Transactions⁩ <span dir="rtl">نداریم.</span>                                                |
| <span dir="rtl"></span>افق زمانی رزرو                 | <span dir="rtl"></span>قاعده قبلی افق یک‌ماهه را به رزرو عادی تعمیم می‌داد و رزرو دوره‌ای افق ۶ماهه داشت. | <span dir="rtl"></span>تصمیم جدید: ⁦Fixed⁩ و ⁦Proposed⁩ یک ماه؛ رزرو دوره‌ای ⁦Fixed⁩ شش ماه؛ ⁦Requested⁩ مشمول محدودیت یک‌ماهه مشتری نیست.                                      | <span dir="rtl"></span>گام‌های رزرو و متن‌های راهنما بر همین تفکیک تنظیم می‌شوند؛ تاریخ‌های بسته ⁦Requested⁩ را مدیر کل تعیین می‌کند.                                                                       |

# <span dir="rtl">۴. اصول معماری اطلاعات فاز ۸</span>

| <span dir="rtl">شناسه</span> | <span dir="rtl">اصل</span>                          | <span dir="rtl">قاعده</span>                                                                                                                                                                                                                                        |
|------------------------------|-----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦IA-01⁩                        | <span dir="rtl">صفحه فقط با نیاز معتبر</span>       | <span dir="rtl">هر صفحه مستقل باید حداقل یک</span> ⁦Story⁩<span dir="rtl">/مجوز/نیاز عملیاتی معتبر داشته باشد؛ قابلیت کوچک ترجیحاً</span> ⁦Action⁩ <span dir="rtl">یا</span> ⁦Section⁩ <span dir="rtl">زمینه‌ای است.</span>                                                 |
| ⁦IA-02⁩                        | <span dir="rtl">کنترل نقش در سرور</span>            | <span dir="rtl">وجود یا عدم وجود لینک در منو فقط</span> ⁦UX⁩ <span dir="rtl">است؛ دسترسی واقعی همچنان با</span> ⁦Role + Resource Ownership⁩ <span dir="rtl">سمت سرور کنترل می‌شود.</span>                                                                                |
| ⁦IA-03⁩                        | <span dir="rtl">موبایل‌محور و</span> ⁦RTL⁩             | <span dir="rtl">اولویت با موبایل،</span> ⁦RTL⁩ <span dir="rtl">کامل، تاریخ شمسی و ساعت محلی تهران است؛ دسکتاپ همان معماری اطلاعات را گسترش می‌دهد نه اینکه محصول جداگانه باشد.</span>                                                                                  |
| ⁦IA-04⁩                        | <span dir="rtl">عدم تکرار ماژول مالی</span>         | ⁦Payment⁩ <span dir="rtl">و</span> ⁦Wallet⁩ <span dir="rtl">در جاهایی مستقل می‌شوند که نقش واقعاً مدیریت سراسری دارد؛ برای مشتری/آرایشگر اطلاعات مالی تا حد ممکن در زمینه نوبت/درخواست نمایش داده می‌شود.</span>                                                           |
| ⁦IA-05⁩                        | <span dir="rtl">درخواست ≠ نوبت</span>               | ⁦BookingRequest⁩ <span dir="rtl">و</span> ⁦Appointment⁩ <span dir="rtl">در ناوبری و</span> ⁦Detail⁩ <span dir="rtl">از هم جدا هستند؛ درخواست قبل از پرداخت/قطعی‌شدن نوبت است.</span>                                                                                       |
| ⁦IA-06⁩                        | <span dir="rtl">عملیات زمینه‌ای</span>               | ⁦SMS⁩ <span dir="rtl">دستی آرایشگر، لغو/جابه‌جایی،</span> ⁦NoShow⁩ <span dir="rtl">و رسید پرداخت از</span> ⁦Detail⁩ <span dir="rtl">منبع مرتبط قابل آغازند؛ صفحه مستقل عمومی برای این</span> ⁦Action⁩<span dir="rtl">ها ساخته نمی‌شود.</span>                                 |
| ⁦IA-07⁩                        | <span dir="rtl">خطا و وضعیت قابل فهم</span>         | <span dir="rtl">صفحات/نماهای وضعیت برای دسترسی غیرمجاز، لینک منقضی، پرداخت نامشخص و حساب غیرقابل استفاده باید پیام روشن داشته باشند؛ جزئیات فنی افشا نمی‌شود.</span>                                                                                                 |
| ⁦IA-08⁩                        | <span dir="rtl">کمینه‌سازی ناوبری</span>             | <span dir="rtl">ویژگی‌هایی که فقط مدیر کل استفاده می‌کند وارد پنل مشتری/آرایشگر نمی‌شوند و بالعکس. آرایشگر هیچ</span> ⁦Wallet⁩<span dir="rtl">،</span> ⁦Ledger⁩<span dir="rtl">،</span> ⁦Pricing⁩ <span dir="rtl">یا</span> ⁦Users⁩ <span dir="rtl">عمومی در منو ندارد.</span> |
| ⁦IA-09⁩                        | <span dir="rtl">ردیابی</span>                       | <span dir="rtl">هر گره</span> ⁦Sitemap⁩ <span dir="rtl">شناسه ثابت دارد و به</span> ⁦Story⁩<span dir="rtl">های فاز ۷ متصل می‌شود تا</span> ⁦User Flow⁩ <span dir="rtl">و</span> ⁦Wireframe⁩ <span dir="rtl">بدون حدس ساخته شوند.</span>                                      |
| ⁦IA-10⁩                        | <span dir="rtl"></span>پوسته واحد مدیر کل           | <span dir="rtl"></span>⁦OwnerAdmin⁩ یک حساب، یک ⁦Session⁩ و یک ناوبری دارد. صفحات مشترک عملیاتی تکرار نمی‌شوند؛ ⁦Scope⁩ داخل همان صفحه بین «من»، یک آرایشگر مشخص و «همه سالن» تغییر می‌کند.                                                                                 |
| ⁦IA-11⁩                        | <span dir="rtl"></span>اقدام‌های فوری مستقل از Scope | <span dir="rtl"></span>⁦Action Center⁩ مدیر کل باید مستقل از صفحه و ⁦Scope⁩ فعلی، ⁦Requested⁩های نیازمند اقدام، پرداخت‌های ⁦Under Review⁩ و هشدارهای حیاتی را همیشه قابل مشاهده کند.                                                                                         |
| ⁦IA-12⁩                        | <span dir="rtl"></span>⁦Requested⁩ مرکب               | <span dir="rtl"></span>⁦Requested⁩ یک خدمت مرکب مدیریتی از چند خدمت پایه ⁦Fixed / Proposed⁩ است. هماهنگی بسته در جزئیات درخواست انجام می‌شود؛ پس از پرداخت هر جزء به ⁦Appointment⁩ مستقل تبدیل می‌شود.                                                                      |

# <span dir="rtl">۵. تعریف انواع گره در نقشه سایت</span>

| <span dir="rtl">نوع</span>            | <span dir="rtl">تعریف</span>                                                                                                                                                                  | <span dir="rtl">نمونه در</span> **⁦Rival⁩**                                                   |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| <span dir="rtl">صفحه مستقل</span>     | <span dir="rtl">مقصد ناوبری یا</span> ⁦Deep Link⁩ <span dir="rtl">پایدار؛ عنوان و</span> ⁦Route⁩ <span dir="rtl">مستقل دارد.</span>                                                               | ⁦Dashboard⁩<span dir="rtl">، فهرست نوبت‌ها، نمونه‌کار عمومی</span>                              |
| <span dir="rtl">نمای جزئیات</span>    | <span dir="rtl">صفحه وابسته به یک منبع که مستقیم قابل لینک است.</span>                                                                                                                        | <span dir="rtl">جزئیات نوبت، درخواست رزرو، مشتری، پرداخت</span>                             |
| <span dir="rtl">نمای گام جریان</span> | <span dir="rtl">یک</span> ⁦Step⁩ <span dir="rtl">از رزرو/پرداخت؛ می‌تواند در همان</span> ⁦Route⁩ <span dir="rtl">یا</span> ⁦Route⁩ <span dir="rtl">فرزند پیاده شود و لزوماً در منوی اصلی نیست.</span> | <span dir="rtl">انتخاب خدمت، آرایشگر، زمان،</span> ⁦Checkout⁩                                 |
| <span dir="rtl">عمل زمینه‌ای</span>    | ⁦Modal / Drawer / Form⁩ <span dir="rtl">در بستر یک صفحه؛ صفحه منوی مستقل ندارد.</span>                                                                                                          | <span dir="rtl">لغو، جابه‌جایی،</span> ⁦SMS⁩ <span dir="rtl">دستی آرایشگر،</span> ⁦NoShow⁩       |
| <span dir="rtl">حالت سیستمی</span>    | <span dir="rtl">نمای نتیجه/خطا/انقضا که مقصد ناوبری روزمره نیست.</span>                                                                                                                       | ⁦Forbidden⁩<span dir="rtl">،</span> ⁦Link Expired⁩<span dir="rtl">،</span> ⁦Payment Under Review⁩ |

# <span dir="rtl">۶. نقشه سطح صفر (</span>⁦Level 0⁩<span dir="rtl">)</span>

| <span dir="rtl">ناحیه</span>         | <span dir="rtl">مقاصد اصلی</span>                                                                                                                                                                                                                                      | <span dir="rtl">مخاطب</span>                       |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| <span dir="rtl">سایت عمومی</span>    | <span dir="rtl">خانه، نمونه‌کار، قوانین رزرو، ورود/شروع رزرو</span>                                                                                                                                                                                                     | <span dir="rtl">کاربر احرازنشده و همه نقش‌ها</span> |
| <span dir="rtl">فضای مشتری</span>    | <span dir="rtl">داشبورد، رزرو جدید، رزرو دوره‌ای، نوبت‌ها، درخواست‌ها، اعلان آزادشدن، اعلان‌ها، پروفایل</span>                                                                                                                                                             | ⁦Customer⁩                                           |
| <span dir="rtl">فضای آرایشگر</span>  | <span dir="rtl">داشبورد، تقویم، درخواست‌های Proposed، نوبت‌ها، رزرو دستی، برنامه کاری، نمونه‌کار، اعلان‌ها، پروفایل</span>                                                                                                                                                 | ⁦Stylist⁩                                            |
| <span dir="rtl">فضای مدیر کل</span>  | <span dir="rtl">یک پنل واحد با «امروز من»، ⁦Action Center⁩ سراسری، تقویم/نوبت/درخواست با ⁦Scope⁩، مشتریان سراسری، خدمات و قیمت، برنامه‌ها، پرداخت و تطبیق، اعتبار داخلی/⁦Ledger⁩, گزارش‌ها، نمونه‌کار، اعلان، ⁦SMS⁩ و تنظیمات؛ مقصدهای صرفاً مدیریتی زیر گروه «مدیریت سالن»</span> | ⁦OwnerAdmin⁩                                         |
| <span dir="rtl">حالت‌های مشترک</span> | <span dir="rtl">خطا/عدم دسترسی/انقضا/پرداخت در حال بررسی/حساب غیرقابل استفاده</span>                                                                                                                                                                                   | <span dir="rtl">وابسته به نقش</span>               |

# <span dir="rtl">۷. مدل پوسته و ناوبری سراسری</span>

- <span dir="rtl">پس از ورود موفق، سامانه نقش حساب را تشخیص می‌دهد و
  کاربر را به</span> ⁦Dashboard⁩ <span dir="rtl">همان نقش می‌برد؛
  مسیر</span> ⁦Login⁩ <span dir="rtl">جداگانه برای نقش‌ها لازم نیست.</span>

- برای ⁦OwnerAdmin⁩ پوسته جداگانه «آرایشگر/مدیر» یا ⁦Role Switch⁩ ساخته
  نمی‌شود. او در یک پنل واحد وارد می‌شود؛ صفحات مشترک عملیاتی یک نسخه
  دارند و ⁦Scope⁩ داخل همان صفحه بین «من»، آرایشگر مشخص و «همه سالن» تغییر
  می‌کند. گروه «مدیریت سالن» فقط مقصدهای صرفاً مدیریتی را در ناوبری جمع
  می‌کند.

- ⁦Action Center⁩ سراسری در پوسته مدیر کل همیشه قابل دسترس است و شمار
  موارد فوری مانند ⁦Requested⁩ جدید/ناتمام، پرداخت ⁦Under Review⁩ و هشدار
  حیاتی را مستقل از صفحه فعلی نشان می‌دهد. این مرکز می‌تواند ⁦Drawer /
  Overlay⁩ هدر باشد و الزاماً ⁦Route⁩ مستقل ندارد.

- <span dir="rtl">کاربر احرازنشده که</span> ⁦CTA⁩ <span dir="rtl">«رزرو»
  را انتخاب می‌کند ابتدا وارد</span> ⁦Login / OTP⁩ <span dir="rtl">می‌شود و
  پس از موفقیت به «رزرو جدید» مشتری هدایت می‌شود.</span>

- ⁦Deep Link⁩ <span dir="rtl">پس از احراز باید مقصد اصلی را حفظ کند؛ اگر
  کاربر مالک منبع نباشد، صفحه</span> ⁦Forbidden⁩ <span dir="rtl">بدون
  افشای داده نمایش داده شود.</span>

- <span dir="rtl">دکمه/لینک «رزرو جدید» در فضای مشتری یک نقطه ورود ممتاز
  است؛ در سایت عمومی فقط</span> ⁦CTA⁩ <span dir="rtl">به مسیر احراز و سپس
  رزرو وصل می‌شود.</span>

- <span dir="rtl">جزئیات نوبت و درخواست باید از فهرست‌های مربوط و همچنین
  اعلان</span>⁦/SMS⁩ <span dir="rtl">مرتبط قابل</span> ⁦Deep Link⁩
  <span dir="rtl">باشند.</span>

- <span dir="rtl">در موبایل تعداد مقصدهای اصلی محدود می‌شود و مقاصد
  کم‌تکرار در «بیشتر/منو» قرار می‌گیرند؛ نوع دقیق</span> ⁦Bottom Navigation⁩
  <span dir="rtl">یا</span> ⁦Drawer⁩ <span dir="rtl">در</span> ⁦Wireframe⁩
  <span dir="rtl">نهایی می‌شود.</span>

# <span dir="rtl">۸. سایت عمومی و احراز هویت</span>

| <span dir="rtl">شناسه</span> | <span dir="rtl">عنوان</span>            | <span dir="rtl">مسیر پیشنهادی</span> | <span dir="rtl">نوع / دسترسی</span>               | <span dir="rtl">هدف و محتوای اصلی</span>                                                                                                                                                                                                                                                                              | <span dir="rtl">ردیابی</span>                  |
|------------------------------|-----------------------------------------|--------------------------------------|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| ⁦PUB-01⁩                       | <span dir="rtl">خانه</span>             | <span dir="rtl">/</span>             | <span dir="rtl">صفحه مستقل — عمومی</span>         | <span dir="rtl">معرفی سالن و طاها، نمونه‌کار منتخب، اطلاعات تماس و مسیر، نقشه نشان، شبکه‌های اجتماعی، توضیح روند رزرو،</span> ⁦CTA⁩ <span dir="rtl">رزرو و ورود. هیچ فهرست مستقل خدمات/آرایشگران نمایش داده نمی‌شود.</span>                                                                                                | ⁦US7-PUB-01⁩                                     |
| ⁦PUB-02⁩                       | <span dir="rtl">نمونه‌کارها</span>       | ⁦/portfolio⁩                           | <span dir="rtl">صفحه مستقل — عمومی</span>         | <span dir="rtl">گالری عمومی نمونه‌کارها با فیلترهای خدمت و آرایشگر. هر کارت تصویر اصلی، عنوان، خدمت و آرایشگر را نمایش می‌دهد؛ انتخاب کارت یک پنجره جزئیات/نمایشگر روی همان صفحه باز می‌کند که توضیحات و همه تصاویر را با جابه‌جایی افقی نشان می‌دهد. در نسخه اصلی</span> ⁦Route⁩ <span dir="rtl">مستقل جزئیات ندارد.</span> | ⁦US7-PUB-01, US7-STY-11, US7-ADM-12⁩             |
| ⁦PUB-03⁩                       | <span dir="rtl">قوانین رزرو</span>      | ⁦/booking-rules⁩                       | <span dir="rtl">صفحه مستقل — عمومی</span>         | <span dir="rtl">قواعد رزرو، لغو و پرداخت به زبان قابل فهم؛ از خلاصه/پرداخت لینک می‌شود و پرداخت به‌منزله پذیرش است.</span>                                                                                                                                                                                              | ⁦PUB / CUS⁩ <span dir="rtl">+ قواعد فاز ۵</span> |
| ⁦AUTH-01⁩                      | <span dir="rtl">ورود و احراز</span>     | ⁦/login⁩                               | <span dir="rtl">صفحه مستقل — عمومی</span>         | ⁦OTP⁩ <span dir="rtl">روش اصلی؛ رمز عبور</span>⁦/Passkey⁩ <span dir="rtl">در صورت فعال بودن به‌عنوان روش جایگزین در همین فضای ورود.</span>                                                                                                                                                                                 | ⁦US7-PUB-02⁩                                     |
| ⁦AUTH-02⁩                      | <span dir="rtl">تکمیل حداقل حساب</span> | <span dir="rtl">پس از</span> ⁦OTP⁩     | <span dir="rtl">نمای گام — کاربر تازه</span>      | <span dir="rtl">فقط داده‌های حداقلی لازم برای ایجاد حساب؛ ورود مستقیم به مسیر رزرو پس از تکمیل.</span>                                                                                                                                                                                                                 | ⁦IAM/CUS⁩                                        |
| ⁦SYS-ACC-01⁩                   | <span dir="rtl">حساب پیدا نشد</span>    | ⁦/account-unavailable⁩                 | <span dir="rtl">حالت سیستمی — حساب حذف نرم</span> | <span dir="rtl">پس از احراز معتبر، حساب ⁦SoftDeleted⁩ دقیقاً مانند حساب واقعاً موجودنبودن رفتار می‌کند و فقط پیام «حساب پیدا نشد» نمایش داده می‌شود؛ مسیر رزرو و پنل بسته است و هیچ اشاره‌ای به حذف نرم یا سابقه حساب نمی‌شود. پیش از احراز، پاسخ ورود نباید وجود یا نبود حساب را افشا کند.</span>                            | ⁦BR-ACC/AUTH-IAM⁩                                |

<span dir="rtl">نکته قطعی: صفحه عمومی مستقل «خدمات» و «آرایشگران» در
نسخه اصلی وارد</span> ⁦Sitemap⁩ <span dir="rtl">نمی‌شود. این داده‌ها فقط پس
از احراز و در جریان رزرو برای انتخاب نمایش داده می‌شوند.</span>

# <span dir="rtl">۹. فضای مشتری — ساختار اصلی</span>

| <span dir="rtl">شناسه</span> | <span dir="rtl">صفحه</span>                     | <span dir="rtl">مسیر پیشنهادی</span> | <span dir="rtl">جایگاه</span>                          | <span dir="rtl">هدف و محتوای اصلی</span>                                                                                                                                                                                                                                                                                                                                                                                                 | **⁦Story⁩**                |
|------------------------------|-------------------------------------------------|--------------------------------------|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| ⁦CUS-01⁩                       | <span dir="rtl">داشبورد</span>                  | ⁦/customer⁩                            | <span dir="rtl">اصلی</span>                            | <span dir="rtl">نزدیک‌ترین/آخرین نوبت، وضعیت درخواست فعال،</span> ⁦CTA⁩ <span dir="rtl">رزرو جدید،</span> ⁦Balance⁩ <span dir="rtl">اعتبار، اعلان‌های مهم و خلاصه اعلان آزادشدن. برای مشتری غیرفعال حالت</span> ⁦Read-only⁩ <span dir="rtl">با هشدار واضح.</span>                                                                                                                                                                                | ⁦CUS-11,17,18⁩             |
| ⁦CUS-02⁩                       | <span dir="rtl">رزرو جدید</span>                | ⁦/customer/book⁩                       | <span dir="rtl">اصلی</span>                            | <span dir="rtl">نقطه ورود رزرو عادی: مشتری ابتدا خدمت را انتخاب می‌کند. اگر خدمت ⁦Fixed / Proposed⁩ باشد، آرایشگر مجاز انتخاب می‌شود و جریان همان نوع ادامه می‌یابد؛ اگر خدمت ⁦Requested⁩ باشد، انتخاب آرایشگر و زمان حذف می‌شود و درخواست مستقیم به مدیر کل ارسال می‌گردد. رزرو دوره‌ای ⁦Fixed⁩ ورودی مستقل دارد.</span>                                                                                                                            | ⁦CUS-02..05,07..09,15⁩     |
| ⁦CUS-03⁩                       | <span dir="rtl">نوبت‌های من</span>               | ⁦/customer/appointments⁩               | <span dir="rtl">اصلی</span>                            | <span dir="rtl">فهرست همه نوبت‌های قطعی‌شده مشتری، مستقل از منشأ رزرو؛ شامل آینده و تاریخچه. فیلتر بر اساس وضعیت، تاریخ/بازه زمانی، خدمت و نام آرایشگر. در UI نوبت‌های جاری/آینده باید از نوبت‌های پایان‌یافته/گذشته تفاوت بصری روشن داشته باشند.</span>                                                                                                                                                                                      | ⁦CUS-11..14⁩               |
| ⁦CUS-04⁩                       | <span dir="rtl">جزئیات نوبت</span>              | ⁦/customer/appointments/{id}⁩          | <span dir="rtl">جزئیات</span>                          | <span dir="rtl">زمان، خدمت، آرایشگر، وضعیت،</span> ⁦ReservationFeeSnapshot⁩<span dir="rtl">، رسید مرتبط و</span> ⁦Action⁩<span dir="rtl">های مجاز لغو/جابه‌جایی بر حسب منشأ نوبت.</span>                                                                                                                                                                                                                                                      | ⁦CUS-06,11..14⁩            |
| ⁦CUS-05⁩                       | <span dir="rtl">درخواست‌های من</span>            | ⁦/customer/requests⁩                   | <span dir="rtl">اصلی</span>                            | <span dir="rtl">فهرست درخواست‌ها با شش وضعیت نمایشی: «در انتظار بررسی»، «در انتظار پرداخت»، «رزرو شده»، «رد شده»، «لغو شده» و «منقضی شده». موارد «در انتظار پرداخت» با شمارش معکوس و اولویت بالا جداگانه نمایش داده می‌شوند. فیلتر وضعیت، تاریخ و خدمت لازم است؛ فیلتر آرایشگر برای ⁦Proposed⁩ از ابتدا و برای ⁦Requested⁩ فقط پس از ساخته‌شدن بسته پاسخ کاربرد دارد.</span>                                                                    | ⁦CUS-07..10⁩               |
| ⁦CUS-06⁩                       | <span dir="rtl">جزئیات درخواست</span>           | ⁦/customer/requests/{id}⁩              | <span dir="rtl">جزئیات</span>                          | <span dir="rtl">جزئیات درخواست و شماره پیگیری. برای ⁦Proposed⁩: خدمت، آرایشگر، زمان/مبلغ پاسخ و پرداخت/لغو در ⁦Hold⁩ سه‌ساعته. برای ⁦Requested⁩: پیش از پاسخ فقط وضعیت درخواست مرکب؛ پس از پاسخ مدیر، فهرست هر خدمت زیرمجموعه با آرایشگر، تاریخ/زمان، ⁦FinalReservationFeeSnapshot⁩، جمع کل و تایمر مشترک ۳ساعته نمایش داده می‌شود. مشتری پیش از پرداخت فقط پرداخت یا لغو کل بسته را دارد؛ پس از پرداخت هر جزء لینک نوبت مستقل خود را دارد.</span> | ⁦CUS-07..10⁩               |
| ⁦CUS-07⁩                       | <span dir="rtl">نمای موجودی اعتبار داخلی</span> | <span dir="rtl">—</span>             | <span dir="rtl">مولفه زمینه‌ای — بدون صفحه مستقل</span> | <span dir="rtl">صفحه مستقل ندارد. موجودی اعتبار در داشبورد و هر مرحله‌ای که تصمیم مالی به آن وابسته است، مانند خلاصه/پرداخت یا جزئیات مرتبط، نمایش داده می‌شود؛</span> ⁦Ledger⁩ <span dir="rtl">کامل و تاریخچه تراکنش بانکی برای مشتری نمایش داده نمی‌شود.</span>                                                                                                                                                                             | ⁦CUS-17⁩                   |
| ⁦CUS-08⁩                       | <span dir="rtl">اعلان آزادشدن</span>            | ⁦/customer/availability-alerts⁩        | <span dir="rtl">ثانویه</span>                          | <span dir="rtl">فهرست درخواست‌های اعلان آزادشدن فعال/پایان‌یافته و لغو دستی. دکمه «افزودن» در همین صفحه یک فرم زمینه‌ای باز می‌کند؛ همان فرم از مسیر رزرو و در حالت نبود زمان خالی نیز با خدمت+آرایشگر از پیش‌پرشده قابل بازشدن است. برای هر ترکیب فقط یک مورد فعال مجاز است.</span>                                                                                                                                                          | ⁦CUS-18⁩                   |
| ⁦CUS-09⁩                       | <span dir="rtl">اعلان‌ها</span>                  | ⁦/customer/notifications⁩              | <span dir="rtl">ثانویه — تصمیم</span> ⁦D8-02⁩            | <span dir="rtl">مرکز اعلان‌های شخصی و عمومی با صفحه‌بندی، وضعیت خوانده/خوانده‌نشده، عمل «خواندم» برای هر مورد و «همه را خوانده‌شده علامت بزن». اعلان شخصی از رویدادهای سامانه یا پیام مجاز آرایشگر/مدیر و اعلان عمومی از مدیر کل ایجاد می‌شود؛ دو نوع در</span> ⁦UI⁩ <span dir="rtl">متمایزند. اعلان‌ها سطح اهمیت دارند و فقط موارد با اهمیت بسیار بالا در داشبورد برجسته می‌شوند.</span>                                                         | ⁦ADM-12 / Phase1 customer⁩ |
| ⁦CUS-10⁩                       | <span dir="rtl">پروفایل و روش‌های ورود</span>    | ⁦/customer/profile⁩                    | <span dir="rtl">ثانویه</span>                          | <span dir="rtl">مشاهده و ویرایش نام، نام خانوادگی و تصویر، مسیر مجاز تغییر شماره و مدیریت روش‌های ورود</span> ⁦OTP / Password / Passkey⁩<span dir="rtl">. نقش در پروفایل مشتری نمایش داده نمی‌شود؛ ویرایش اطلاعات و تنظیمات امنیتی از نماهای فرزند یا اعمال زمینه‌ای همین بخش انجام می‌شود.</span>                                                                                                                                             | ⁦CUS-01⁩                   |

# <span dir="rtl">۱۰. نقشه داخلی «رزرو جدید» مشتری</span>

| <span dir="rtl">شناسه</span> | <span dir="rtl">گره</span>                   | <span dir="rtl">نوع</span>                 | <span dir="rtl">قاعده</span> **⁦Sitemap⁩**<span dir="rtl">/محتوا</span>                                                                                                                                                                                                                                                                | **⁦Story⁩**    |
|------------------------------|----------------------------------------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| ⁦BK-01⁩                        | <span dir="rtl">انتخاب خدمت</span>           | <span dir="rtl">نمای گام</span>            | <span dir="rtl">خدمات فعال قابل رزرو پس از احراز. اگر خدمت ⁦Requested⁩ مرکب باشد مسیر مستقیم به ثبت درخواست مدیرکل می‌رود؛ در غیر این صورت نوع ⁦Fixed / Proposed⁩ مسیر بعدی را تعیین می‌کند.</span>                                                                                                                                        | ⁦CUS-02⁩       |
| ⁦BK-02⁩                        | <span dir="rtl">انتخاب آرایشگر</span>        | <span dir="rtl">نمای گام</span>            | <span dir="rtl">فقط برای ⁦Fixed / Proposed⁩: آرایشگران نگاشت‌شده به خدمت انتخابی؛ بدون ⁦Stylist⁩ ادامه ممنوع. این گام برای ⁦Requested⁩ وجود ندارد.</span>                                                                                                                                                                                   | ⁦CUS-02⁩       |
| ⁦BK-F01⁩                       | <span dir="rtl">زمان‌های آزاد</span> ⁦Fixed⁩    | <span dir="rtl">نمای گام</span>            | ⁦Availability⁩ آرایشگر انتخابی تا افق یک ماه؛ فقط زمان‌هایی که کل ⁦Duration⁩ پیوسته آزاد است.<span dir="rtl"></span>                                                                                                                                                                                                                      | ⁦CUS-03⁩       |
| ⁦BK-F02⁩                       | <span dir="rtl">خلاصه و قوانین</span> ⁦Fixed⁩  | <span dir="rtl">نمای گام</span>            | <span dir="rtl">خدمت، آرایشگر، زمان، هزینه رزرو، قوانین؛ ایجاد</span> ⁦Hold⁩ <span dir="rtl">۵ دقیقه‌ای قبل از پرداخت.</span>                                                                                                                                                                                                           | ⁦CUS-04,05⁩    |
| ⁦BK-P01⁩                       | <span dir="rtl">ثبت درخواست</span> ⁦Proposed⁩  | <span dir="rtl">نمای گام</span>            | <span dir="rtl">درخواست برای ⁦Stylist⁩ منتخب و دقیقاً یک بازه ترجیحی اصلی مشتری در افق یک ماه؛ خود درخواست ظرفیت را اشغال نمی‌کند. زمان دقیق را آرایشگر تعیین می‌کند.</span>                                                                                                                                                                     | ⁦CUS-07⁩       |
| ⁦BK-R01⁩                       | <span dir="rtl">ثبت درخواست</span> ⁦Requested⁩ | <span dir="rtl">نمای گام</span>            | <span dir="rtl">ثبت خدمت ⁦Requested⁩ مرکب بدون انتخاب آرایشگر و بدون انتخاب زمان قطعی. فرم می‌تواند توضیح اختیاری و تاریخ ترجیحی اختیاری/غیرالزام‌آور بگیرد؛ این داده‌ها Hold یا تعهد زمانی ایجاد نمی‌کنند. درخواست مستقیم به ⁦OwnerAdmin⁩ می‌رود؛ خود درخواست ظرفیت را اشغال نمی‌کند و حداکثر ۷ روز برای تعیین تکلیف باز می‌ماند.</span>                                                                                                                             | ⁦CUS-08⁩       |
| ⁦BK-REQ01⁩                     | <span dir="rtl">نتیجه ثبت درخواست</span>     | <span dir="rtl">حالت نتیجه</span>          | <span dir="rtl">صفحه نتیجه مستقل پس از ثبت: شماره پیگیری و وضعیت. در ⁦Proposed⁩ خدمت+آرایشگر و ترجیح زمانی ثبت‌شده نمایش داده می‌شود؛ در ⁦Requested⁩ عنوان خدمت مرکب و پیام «در انتظار هماهنگی مدیر کل» نمایش داده می‌شود و هنوز آرایشگر/زمان قطعی وجود ندارد.</span>                                                                       | ⁦CUS-07,08,10⁩ |
| ⁦BK-PAY01⁩                     | <span dir="rtl">پاسخ و پرداخت</span>         | <span dir="rtl">در</span> ⁦CUS-06⁩           | <span dir="rtl">⁦Proposed⁩: یک زمان و مبلغ نهایی با ⁦Hold⁩ سه‌ساعته. ⁦Requested⁩: بسته پاسخ مدیر شامل چند خدمت مستقل؛ هنگام ارسال، همه زمان‌ها پس از اعتبارسنجی به‌صورت همه‌یا‌هیچ برای ۳ ساعت ⁦Hold⁩ می‌شوند. مبلغ نهایی هر جزء ⁦Snapshot⁩ مستقل دارد و جمع بسته از آن‌ها محاسبه می‌شود؛ مشتری فقط پرداخت یا لغو کل بسته را پیش از تأیید دارد.</span> | ⁦CUS-09,10⁩    |
| ⁦BK-REC01⁩                     | <span dir="rtl">رزرو دوره‌ای</span> ⁦Fixed⁩     | <span dir="rtl">نمای گام/شاخه مستقل</span> | <span dir="rtl">حداقل ۳ رخداد تا ۶ ماه؛ هر رخداد مستقل و همه پیش از</span> ⁦Checkout⁩ <span dir="rtl">دوباره اعتبارسنجی می‌شوند.</span>                                                                                                                                                                                                 | ⁦CUS-15,16⁩    |
| ⁦BK-ALERT01⁩                   | <span dir="rtl">درخواست اعلان آزادشدن</span> | <span dir="rtl">عمل زمینه‌ای</span>         | <span dir="rtl">وقتی کاربر برای ترکیب مشخص ⁦Service + Stylist⁩ در مسیرهای دارای آرایشگر (⁦Fixed / Proposed⁩) به دنبال زمان است؛ ایجاد درخواست ۶روزه بدون ⁦Hold⁩ یا اولویت.</span>                                                                                                                                                          | ⁦CUS-18⁩       |

<span dir="rtl">تفکیک مهم برای فاز ۹: ⁦Fixed⁩ جریان انتخاب زمان دقیق توسط
مشتری دارد. ⁦Proposed⁩ پس از انتخاب خدمت+آرایشگر به درخواست آرایشگر تبدیل
می‌شود. ⁦Requested⁩ پس از انتخاب خدمت مرکب مستقیم به مدیر کل می‌رود و مشتری
آرایشگر/زمان انتخاب نمی‌کند. هیچ‌کدام تا پرداخت/ثبت معتبر «نوبت» محسوب
نمی‌شوند.</span>

# <span dir="rtl">۱۱. ناوبری پیشنهادی مشتری</span>

| <span dir="rtl">سطح</span>                   | <span dir="rtl">مقاصد</span>                                                                                                                        |
|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">اولیه و پرتکرار</span>       | <span dir="rtl">داشبورد \| رزرو جدید \| رزرو دوره‌ای \| نوبت‌های من \| درخواست‌های من</span>                                                           |
| <span dir="rtl">ثانویه</span>                | <span dir="rtl">اعلان آزادشدن \| اعلان‌ها \| پروفایل</span>                                                                                          |
| <span dir="rtl">زمینه‌ای</span>               | <span dir="rtl">رسید پرداخت، لغو، جابه‌جایی ⁦Fixed⁩, پرداخت پاسخ ⁦Proposed⁩, پرداخت بسته ⁦Requested⁩, درخواست اعلان آزادشدن</span>                         |
| <span dir="rtl">نباید وجود داشته باشد</span> | <span dir="rtl">تاریخچه مستقل تراکنش بانکی \|</span> ⁦Ledger⁩ <span dir="rtl">کامل \| جست‌وجوی آرایشگران/خدمات خارج از رزرو \| صفحه مدیریت قیمت</span> |

# <span dir="rtl">۱۲. فضای آرایشگر — ساختار اصلی</span>

| <span dir="rtl">شناسه</span> | <span dir="rtl">صفحه</span>                | <span dir="rtl">مسیر پیشنهادی</span> | <span dir="rtl">جایگاه</span> | <span dir="rtl">هدف و محتوای اصلی</span>                                                                                                                                                                                                                                                                                                                                                                                                        | **⁦Story⁩**       |
|------------------------------|--------------------------------------------|--------------------------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| ⁦STY-01⁩                       | <span dir="rtl">داشبورد</span>             | ⁦/stylist⁩                             | <span dir="rtl">اصلی</span>   | <span dir="rtl">نوبت جاری/ادامه روز، درخواست‌های ⁦Proposed⁩ نیازمند رسیدگی، اعلان‌های مهم مرتبط و ⁦CTA⁩ رزرو دستی؛ اعمال سریع فقط برای وضعیت‌های مجاز همان لحظه، مانند ثبت عدم مراجعه برای نوبت واجد شرایط، با تأیید نهایی.</span>                                                                                                                                                                                                                     | ⁦STY-02,05,10,12⁩ |
| ⁦STY-02⁩                       | <span dir="rtl">تقویم من</span>            | ⁦/stylist/calendar⁩                    | <span dir="rtl">اصلی</span>   | <span dir="rtl">نمای روز/هفته/ماه نوبت‌ها و</span> ⁦Block⁩<span dir="rtl">های خود؛ ورود به جزئیات نوبت.</span>                                                                                                                                                                                                                                                                                                                                     | ⁦STY-02,10⁩       |
| ⁦STY-03⁩                       | <span dir="rtl">درخواست‌های من</span>       | ⁦/stylist/requests⁩                    | <span dir="rtl">اصلی</span>   | <span dir="rtl">فقط درخواست‌های ⁦Proposed⁩ منتسب به خود آرایشگر؛ اولویت با درخواست‌های باز/نزدیک مهلت ۷روزه. ⁦Requested⁩ قبل از پرداخت هرگز وارد Inbox آرایشگر نمی‌شود.</span>                                                                                                                                                                                                                                                                         | ⁦STY-05..07⁩      |
| ⁦STY-04⁩                       | <span dir="rtl">جزئیات/پاسخ درخواست</span> | ⁦/stylist/requests/{id}⁩               | <span dir="rtl">جزئیات</span> | <span dir="rtl">جزئیات ⁦Proposed⁩ با اطلاعات حداقلی مشتری، ⁦SystemSuggestedReservationFee⁩, انتخاب زمان معتبر، تعیین ⁦FinalReservationFee⁩ و پذیرش/رد. پذیرش ⁦Hold⁩ سه‌ساعته می‌سازد.</span>                                                                                                                                                                                                                                                              | ⁦STY-05..07⁩      |
| ⁦STY-05⁩                       | <span dir="rtl">نوبت‌های من</span>          | ⁦/stylist/appointments⁩                | <span dir="rtl">اصلی</span>   | <span dir="rtl">فهرست نوبت‌های منتسب با جست‌وجو/فیلتر بر اساس شماره پیگیری، شماره تماس یا نام مشتری در محدوده نوبت‌های خود، بازه تاریخی، خدمت و وضعیت.</span>                                                                                                                                                                                                                                                                                      | ⁦STY-10⁩          |
| ⁦STY-06⁩                       | <span dir="rtl">جزئیات نوبت</span>         | ⁦/stylist/appointments/{id}⁩           | <span dir="rtl">جزئیات</span> | <span dir="rtl">خدمت، زمان، اطلاعات حداقلی مشتری، وضعیت عملیاتی پرداخت/⁦ReservationFeeSnapshot⁩ و اعمال مجاز لغو/جابه‌جایی کسب‌وکار و ⁦NoShow⁩. ارسال ⁦SMS⁩ دستی فقط برای همین مشتری از زمینه نوبت مجاز است؛ آرایشگر اعلان داخل سایت به‌صورت دستی ایجاد نمی‌کند.</span>                                                                                                                                                                                   | ⁦STY-10,12⁩       |
| ⁦STY-07⁩                       | <span dir="rtl">رزرو دستی</span>           | ⁦/stylist/manual-booking⁩              | <span dir="rtl">اصلی</span>   | <span dir="rtl">جریان رزرو دستی خود آرایشگر: ورود شماره مشتری؛ اگر حساب موجود بود نام/نام خانوادگی نمایش داده شود و اگر نبود حداقل نام/نام خانوادگی برای ساخت حساب لازم دریافت شود؛ سپس انتخاب یکی از خدمات ارائه‌شده توسط همان آرایشگر، انتخاب زمان بدون تداخل، صفحه تأیید و نتیجه موفقیت. مبلغ مرجع نمایش داده می‌شود ولی هزینه رزرو اخذ نمی‌شود. زمان خارج از قواعد عادی فقط از مسیر</span> ⁦Override⁩ <span dir="rtl">مجاز است و دلیل لازم ندارد.</span> | ⁦STY-08,09⁩       |
| ⁦STY-08⁩                       | <span dir="rtl">برنامه کاری من</span>      | ⁦/stylist/schedule⁩                    | <span dir="rtl">اصلی</span>   | <span dir="rtl">مدیریت برنامه هفتگی خود، استثنای تاریخ، اضافه‌کاری، بازه عدم حضور و ⁦Block⁩های زمانی. هر ⁦Block⁩ می‌تواند ⁦ReleaseAt⁩ داشته باشد تا پس از زمان تعیین‌شده دوباره وارد ⁦Availability⁩ شود. تغییر متاثر از نوبت فقط پس از نمایش پیامدها و تأیید اعمال می‌شود. قواعد سطح خدمت، روزهای ارائه یک خدمت و قیمت‌گذاری در اختیار مدیر کل باقی می‌ماند.</span>                                                                                           | ⁦STY-03,04⁩       |
| ⁦STY-09⁩                       | <span dir="rtl">نمونه‌کارهای من</span>      | ⁦/stylist/portfolio⁩                   | <span dir="rtl">ثانویه</span> | <span dir="rtl">ایجاد/ویرایش/حذف نمونه‌کار خود با قواعد آپلود امن.</span>                                                                                                                                                                                                                                                                                                                                                                        | ⁦STY-11⁩          |
| ⁦STY-10⁩                       | <span dir="rtl">اعلان‌ها</span>             | ⁦/stylist/notifications⁩               | <span dir="rtl">ثانویه</span> | <span dir="rtl">اعلان‌های شخصی/عملیاتی خودکارِ منابع خود به‌همراه اعلان‌های عمومی مدیر کل؛ صفحه‌بندی، خوانده/خوانده‌نشده، علامت‌گذاری تکی و «همه خوانده شد» مانند مرکز اعلان مشتری. آرایشگر اعلان منابع دیگران را نمی‌بیند و اعلان دستی ایجاد نمی‌کند.</span>                                                                                                                                                                                            | ⁦STY-12⁩          |
| ⁦STY-11⁩                       | <span dir="rtl">پروفایل و ورود</span>      | ⁦/stylist/profile⁩                     | <span dir="rtl">ثانویه</span> | <span dir="rtl">مشاهده و ویرایش اطلاعات مجاز پروفایل خود و مدیریت روش‌های ورود/امنیت حساب در مسیرهای مجاز.</span>                                                                                                                                                                                                                                                                                                                                | ⁦STY-01⁩          |

# <span dir="rtl">۱۳. محدودیت‌های</span> ⁦IA⁩ <span dir="rtl">پنل آرایشگر</span>

- <span dir="rtl">هیچ «مشتریان» یا</span> ⁦Directory⁩
  <span dir="rtl">عمومی در منوی آرایشگر وجود ندارد. آرایشگر اطلاعات
  حداقلی مشتری مرتبط را در جزئیات نوبت/درخواست خودش می‌بیند، اما تاریخچه
  عمومی آن مشتری را مشاهده نمی‌کند. جست‌وجو فقط در رزرو دستی یا زمینه
  منابع مجاز انجام می‌شود.</span>

- <span dir="rtl">هیچ صفحه</span> ⁦Wallet⁩<span dir="rtl">،</span>
  ⁦Ledger⁩<span dir="rtl">،</span> ⁦Reconciliation⁩<span dir="rtl">،</span>
  ⁦Pricing⁩<span dir="rtl">،</span> ⁦Services Management⁩
  <span dir="rtl">یا</span> ⁦User Management⁩ <span dir="rtl">برای آرایشگر
  وجود ندارد.</span>

- <span dir="rtl">اطلاعات پرداخت در</span> ⁦Detail⁩ <span dir="rtl">نوبت
  به «وضعیت عملیاتی لازم +</span>
  ⁦ReservationFeeSnapshot⁩<span dir="rtl">» محدود است؛ شناسه درگاه و
  تاریخچه کامل پرداخت نمایش داده نمی‌شود.</span>

- ⁦SMS⁩ <span dir="rtl">دستی یک</span> ⁦Action⁩ <span dir="rtl">از
  نوبت/درخواست مشتری مرتبط است؛ صفحه ارسال پیامک به شماره دلخواه برای
  آرایشگر ساخته نمی‌شود.</span>

- <span dir="rtl">پذیرش/رد ⁦Proposed⁩ فقط در ⁦Detail⁩ همان درخواست آرایشگر
  انجام می‌شود. ⁦Requested⁩ پیش از پرداخت فقط در پنل مدیر کل مدیریت می‌شود و
  هیچ ⁦Inbox / Claim⁩ برای آرایشگر ندارد.</span>

- <span dir="rtl">پس از پرداخت بسته ⁦Requested⁩, هر جزء به نوبت مستقل
  آرایشگر مربوط تبدیل می‌شود. آرایشگر فقط همان نوبت خود را می‌بیند و
  جابه‌جایی کسب‌وکار را طبق قواعد همان نوبت انجام می‌دهد؛ جزئیات سایر اجزای
  بسته/آرایشگران دیگر برای او نمایش داده نمی‌شود.</span>

# <span dir="rtl">۱۴. فضای مدیر کل — ساختار اصلی</span>

| <span dir="rtl">شناسه</span> | <span dir="rtl">صفحه</span>                  | <span dir="rtl">مسیر پیشنهادی</span> | <span dir="rtl">گروه</span>                  | <span dir="rtl">هدف و محتوای اصلی</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **⁦Story⁩**<span dir="rtl">/مرجع</span>           |
|------------------------------|----------------------------------------------|--------------------------------------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| ⁦ADM-01⁩                       | <span dir="rtl">داشبورد مدیر کل</span>       | ⁦/admin⁩                               | <span dir="rtl">اصلی</span>                  | <span dir="rtl">داشبورد سبک با اولویت «امروز من» برای نوبت‌ها و کارهای روزانه خود مدیر به‌عنوان آرایشگر؛ در کنار آن ⁦Action Center⁩ سراسری و همیشه‌قابل‌دسترسی برای ⁦Requested⁩های نیازمند اقدام، پرداخت‌های ⁦Under Review⁩ و هشدارهای حیاتی، به‌علاوه خلاصه فشرده کل سالن. هدف جلوگیری از شلوغی و در عین حال پنهان‌نشدن وظایف مدیریتی فوری است.</span>                                                                                                                                                                                           | ⁦ADM-05,06,10,13,14⁩                              |
| ⁦ADM-02⁩                       | <span dir="rtl">تقویم سالن</span>            | ⁦/admin/calendar⁩                      | <span dir="rtl">اصلی</span>                  | <span dir="rtl">یک صفحه تقویم مشترک با ⁦Scope⁩: پیش‌فرض «من»، و امکان انتخاب یک ⁦Stylist⁩ یا «همه سالن». همان مؤلفه تقویم آرایشگر بازاستفاده می‌شود ولی ⁦Actor⁩ همیشه مدیر کل است.</span>                                                                                                                                                                                                                                                                                                                                                    | ⁦ADM-05,08⁩                                       |
| ⁦ADM-03⁩                       | <span dir="rtl">درخواست‌های رزرو</span>       | ⁦/admin/requests⁩                      | <span dir="rtl">اصلی</span>                  | <span dir="rtl">یک فهرست واحد درخواست‌ها با نماهای «نیازمند اقدام من»، ⁦Requested⁩, ⁦Proposed⁩ و «همه». ⁦Requested⁩ فقط برای مدیر کل ارسال می‌شود و باید اولویت بصری/شمارنده در ⁦Action Center⁩ داشته باشد. ⁦Proposed⁩ همچنان به آرایشگر انتخاب‌شده مرتبط است و مدیر کل دید نظارتی/عملیاتی دارد؛ ⁦Claim⁩ عمومی وجود ندارد.</span>                                                                                                                                                                                                                   | ⁦ADM-06,14⁩                                       |
| ⁦ADM-04⁩                       | <span dir="rtl">جزئیات درخواست</span>        | ⁦/admin/requests/{id}⁩                 | <span dir="rtl">جزئیات</span>                | <span dir="rtl">برای ⁦Proposed⁩: مشاهده/پاسخ زمان و مبلغ در حدود مجاز. برای ⁦Requested⁩: سازنده بسته با ذخیره پیش‌نویس؛ مدیر برای هر خدمت زیرمجموعه یک آرایشگر واجد شرایط و زمان دقیق انتخاب می‌کند، مبلغ پیشنهادی سیستم را می‌بیند و مبلغ نهایی همان جزء را تعیین می‌کند. پیش‌نویس ⁦Hold⁩ ایجاد نمی‌کند. هنگام «ارسال به مشتری» همه زمان‌ها دوباره اعتبارسنجی و فقط در صورت موفقیت کامل، به‌صورت اتمیک برای ۳ ساعت ⁦Hold⁩ می‌شوند؛ شکست یک جزء یعنی هیچ Holdی ایجاد نشود. پس از پرداخت هر جزء به نوبت مستقل و مرتبط با بسته اصلی تبدیل می‌شود.</span> | ⁦ADM-06⁩                                          |
| ⁦ADM-05⁩                       | <span dir="rtl">نوبت‌ها</span>                | ⁦/admin/appointments⁩                  | <span dir="rtl">اصلی</span>                  | <span dir="rtl">فهرست واحد کل سالن با ⁦Scope⁩ پیش‌فرض «من» برای کار روزمره و امکان انتخاب آرایشگر/همه؛ فیلتر زمان، ⁦Status / Service / Stylist⁩. نوبت‌های ساخته‌شده از بسته ⁦Requested⁩ مانند سایر نوبت‌ها مستقل نمایش داده می‌شوند و لینک بسته مبنا برای ردیابی حفظ می‌شود.</span>                                                                                                                                                                                                                                                              | ⁦ADM-08,09⁩                                       |
| ⁦ADM-06⁩                       | <span dir="rtl">جزئیات نوبت</span>           | ⁦/admin/appointments/{id}⁩             | <span dir="rtl">جزئیات</span>                | <span dir="rtl">مدیریت لغو/جابه‌جایی/تغییر</span> ⁦Stylist⁩<span dir="rtl">، مشاهده</span> ⁦Snapshot⁩ <span dir="rtl">و اثر مالی، دسترسی به عملیات مرتبط.</span>                                                                                                                                                                                                                                                                                                                                                                          | ⁦ADM-08,09⁩                                       |
| ⁦ADM-07⁩                       | <span dir="rtl">رزرو دستی</span>             | ⁦/admin/manual-booking⁩                | <span dir="rtl">اصلی</span>                  | <span dir="rtl">ثبت برای هر</span> ⁦Stylist⁩ <span dir="rtl">با</span> ⁦Override⁩ <span dir="rtl">مجاز و بدون اخذ هزینه رزرو؛ تداخل قابل دورزدن نیست.</span>                                                                                                                                                                                                                                                                                                                                                                             | ⁦ADM-07⁩                                          |
| ⁦ADM-08⁩                       | <span dir="rtl">مشتریان</span>               | ⁦/admin/customers⁩                     | <span dir="rtl">مدیریتی</span>               | <span dir="rtl">فهرست سراسری همه مشتریان برای مدیر کل؛ «مرتبط با من» فقط یک فیلتر/میانبر است و محدودیت دسترسی ایجاد نمی‌کند. جست‌وجو و عملیات مدیریتی، به‌همراه دسترسی سریع «رزرو دستی برای این مشتری» از فهرست یا جزئیات.</span>                                                                                                                                                                                                                                                                                                       | ⁦ADM-01,02⁩                                       |
| ⁦ADM-09⁩                       | <span dir="rtl">جزئیات مشتری</span>          | ⁦/admin/customers/{id}⁩                | <span dir="rtl">جزئیات</span>                | <span dir="rtl">پروفایل/وضعیت، شماره، نوبت/درخواست مرتبط و موجودی اعتبار. مدیر کل می‌تواند اطلاعات مجاز مشتری و شماره موبایل را با ⁦Audit⁩ اصلاح کند. رزرو دستی و «اصلاح موجودی» از همین صفحه آغاز می‌شوند؛ اصلاح موجودی فقط با ⁦Ledger Adjustment⁩ تغییرناپذیر انجام می‌شود. Action «ارسال پیام» می‌تواند ⁦SMS⁩ یا اعلان شخصی داخل سایت برای همین مشتری ایجاد کند؛ ایجاد اعلان دستی فقط برای مدیر کل مجاز است.</span>                                                                                                                         | ⁦ADM-01,11,15⁩                                    |
| ⁦ADM-10⁩                       | <span dir="rtl">آرایشگران</span>             | ⁦/admin/stylists⁩                      | <span dir="rtl">مدیریتی</span>               | <span dir="rtl">فهرست</span> ⁦Stylist⁩<span dir="rtl">ها و وضعیت.</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ⁦ADM-01..03,05⁩                                   |
| ⁦ADM-11⁩                       | <span dir="rtl">جزئیات آرایشگر</span>        | ⁦/admin/stylists/{id}⁩                 | <span dir="rtl">جزئیات</span>                | <span dir="rtl">پروفایل/وضعیت، خدمات نگاشت‌شده، برنامه، لینک تقویم و نمونه‌کار؛ استثناها و بازه‌های ویژه فعال/آتی برنامه همان آرایشگر نیز به‌صورت خلاصه و سریع دیده شوند.</span>                                                                                                                                                                                                                                                                                                                                                         | ⁦ADM-01,03,05⁩                                    |
| ⁦ADM-12⁩                       | <span dir="rtl">خدمات</span>                 | ⁦/admin/services⁩                      | <span dir="rtl">مدیریتی</span>               | <span dir="rtl">فهرست/ایجاد/غیرفعال/حذف نرم خدمت. دو ساختار داریم: خدمت پایه ⁦Fixed / Proposed⁩ و خدمت ⁦Requested⁩ مرکب. خدمت ⁦Requested⁩ از چند خدمت پایه موجود ساخته می‌شود و نباید ⁦Requested⁩ دیگری را به‌عنوان جزء بپذیرد.</span>                                                                                                                                                                                                                                                                                                         | ⁦ADM-03⁩                                          |
| ⁦ADM-13⁩                       | <span dir="rtl">ویرایش خدمت</span>           | ⁦/admin/services/{id}⁩                 | <span dir="rtl">جزئیات</span>                | <span dir="rtl">برای خدمت پایه: عنوان، توضیح، تصویر، ⁦Duration⁩, نوع ⁦Fixed / Proposed⁩, وضعیت و نگاشت آرایشگران. برای خدمت ⁦Requested⁩: اطلاعات عمومی مشابه به‌علاوه فهرست مرتب خدمات پایه زیرمجموعه؛ نگاشت آرایشگر در سطح Parent انجام نمی‌شود و هنگام رسیدگی مدیر به هر درخواست، آرایشگر هر جزء تعیین می‌شود.</span>                                                                                                                                                                                                                       | ⁦ADM-03⁩                                          |
| ⁦ADM-14⁩                       | <span dir="rtl">قیمت‌گذاری</span>             | ⁦/admin/pricing⁩                       | <span dir="rtl">مدیریتی</span>               | ⁦BaseReservationFee / BaseFeeOverride / ServiceFactor / BarberFactor⁩ برای خدمات پایه؛ ⁦Snapshot⁩ قبلی تغییر نمی‌کند. خدمت ⁦Requested⁩ هزینه رزرو مستقلِ مضاعف ندارد: سیستم مبلغ پیشنهادی هر جزء را از قواعد همان خدمت پایه محاسبه می‌کند و مدیر هنگام پاسخ مبلغ نهایی هر جزء را تعیین می‌کند؛ جمع بسته از Snapshotهای اجزا به‌دست می‌آید.<span dir="rtl"></span>                                                                                                                                                                                | ⁦ADM-04⁩                                          |
| ⁦ADM-15⁩                       | <span dir="rtl">برنامه‌ها و تعطیلات</span>    | ⁦/admin/schedules⁩                     | <span dir="rtl">مدیریتی</span>               | <span dir="rtl">مدیریت الگوی سالن، تعطیلات، برنامه/استثنای همه آرایشگران از جمله خود مدیر. ⁦OwnerAdmin⁩ می‌تواند برای ⁦Service + TargetDateRange⁩ مقدار ⁦BookableFrom⁩ تعیین کند تا رزرو مشتری برای آن خدمت/بازه تا زمان مقرر بسته بماند. ⁦Block + ReleaseAt⁩ شخصی هر آرایشگر همچنان از برنامه همان آرایشگر مدیریت می‌شود.</span>                                                                                                                                                                                                              | ⁦ADM-05⁩                                          |
| ⁦ADM-16⁩                       | <span dir="rtl">پرداخت‌ها و تطبیق</span>      | ⁦/admin/payments⁩                      | <span dir="rtl">مالی</span>                  | <span dir="rtl">پرداخت‌های همه رزروها، فیلتر وضعیت نامشخص/</span>⁦UnderReview⁩ <span dir="rtl">و عملیات تطبیق. جزئیات</span> ⁦Wallet / Gateway / Verify⁩ <span dir="rtl">و نتیجه تعیین تکلیف در همان صفحه با نمای جزئیات/کشویی باز می‌شود و برای هر پرداخت</span> ⁦Route⁩ <span dir="rtl">مستقل الزامی نیست.</span>                                                                                                                                                                                                                          | ⁦ADM-10⁩                                          |
| ⁦ADM-17⁩                       | <span dir="rtl">گزارش‌های مدیریتی</span>      | ⁦/admin/reports⁩                       | <span dir="rtl">گزارش</span>                 | <span dir="rtl">گزارش‌های تحلیلی سبک برای مدیریت سالن؛ از جمله تعداد نوبت و جمع «هزینه رزرو وصول‌شده و منتسب به هر آرایشگر» در بازه/ماه. این داده برای محاسبه مدیریتی خارج از سامانه قابل استفاده است اما خود ریوال حقوق/پورسانت محاسبه نمی‌کند. خلاصه خطاهای عملیاتی قابل‌اقدام نیز می‌تواند نمایش داده شود؛ لاگ فنی خام و</span> ⁦Stack Trace⁩ <span dir="rtl">نمایش داده نمی‌شود.</span>                                                                                                                                                  | <span dir="rtl">نیاز جدید فاز ۸ +</span> ⁦ADM-13⁩ |
| ⁦ADM-18⁩                       | <span dir="rtl">اعتبار داخلی /</span> ⁦Ledger⁩ | ⁦/admin/wallets⁩                       | <span dir="rtl">مالی</span>                  | <span dir="rtl">جست‌وجوی مشتری و ورود به اعتبار داخلی/</span>⁦Ledger⁩<span dir="rtl">. مدیر از</span> ⁦UI⁩ <span dir="rtl">می‌تواند افزایش/کاهش موجودی را با مبلغ و دلیل ثبت کند، اما سامانه آن را به</span> ⁦Adjustment Ledger Entry⁩ <span dir="rtl">تبدیل می‌کند و</span> ⁦Balance⁩ <span dir="rtl">خام مستقیماً ویرایش نمی‌شود.</span>                                                                                                                                                                                                        | ⁦ADM-11⁩                                          |
| ⁦ADM-19⁩                       | ⁦Wallet⁩ <span dir="rtl">مشتری</span>          | ⁦/admin/wallets/{customerId}⁩          | <span dir="rtl">جزئیات مالی</span>           | ⁦Balance⁩<span dir="rtl">،</span> ⁦Ledger⁩ <span dir="rtl">کامل،</span> ⁦Adjustment⁩ <span dir="rtl">و</span> ⁦Reversal⁩ <span dir="rtl">با دلیل.</span>                                                                                                                                                                                                                                                                                                                                                                                     | ⁦ADM-11⁩                                          |
| ⁦ADM-20⁩                       | <span dir="rtl">نمونه‌کارها</span>            | ⁦/admin/portfolio⁩                     | <span dir="rtl">محتوا</span>                 | <span dir="rtl">مدیریت تمام نمونه‌کارها و ایجاد/مدیریت نمونه‌کارهای خود مدیر در نقش آرایشگر.</span>                                                                                                                                                                                                                                                                                                                                                                                                                                    | ⁦ADM-12⁩                                          |
| ⁦ADM-21⁩                       | <span dir="rtl">تنظیمات عمومی</span>         | ⁦/admin/settings⁩                      | <span dir="rtl">تنظیمات</span>               | <span dir="rtl">مرکز تنظیمات با بخش‌های مشخص برای اطلاعات عمومی و محتوای</span> ⁦Home⁩<span dir="rtl">، متن پیامک‌های خودکار و تنظیمات/محدودیت‌های صریحاً مجاز. قیمت‌گذاری، برنامه‌ها و تطبیق مالی در صفحات تخصصی خود باقی می‌مانند تا تنظیمات به صفحه همه‌کاره تبدیل نشود.</span>                                                                                                                                                                                                                                                             | ⁦ADM-12⁩                                          |
| ⁦ADM-22⁩                       | <span dir="rtl">اعلان‌های عمومی</span>        | ⁦/admin/announcements⁩                 | <span dir="rtl">محتوا</span>                 | <span dir="rtl">ایجاد/ویرایش/انتشار اعلان عمومی برای کاربران؛ اعلان عمومی در مرکز اعلان نقش‌ها نمایش داده می‌شود و وضعیت خوانده/خوانده‌نشده برای هر کاربر مستقل است.</span>                                                                                                                                                                                                                                                                                                                                                             | ⁦ADM-12,15⁩                                       |
| ⁦ADM-23⁩                       | <span dir="rtl">پیامک دستی</span>            | ⁦/admin/sms⁩                           | <span dir="rtl">عملیاتی</span>               | <span dir="rtl">ارسال ⁦SMS⁩ دستی از دو نقطه ورود: Action در جزئیات مشتری و صفحه ارسال گروهی با انتخاب چند مشتری مجاز. محدودیت نرخ/مجوز و ثبت Actor برقرار است. اعلان شخصی داخل سایت از جزئیات مشتری فقط توسط مدیر کل قابل ایجاد است؛ اعلان عمومی از صفحه مخصوص اعلان‌های عمومی منتشر می‌شود.</span>                                                                                                                                                                                                                                      | <span dir="rtl">مجوز</span> ⁦AUTH-NOT⁩            |
| ⁦ADM-24⁩                       | <span dir="rtl">تنظیمات قواعد رزرو</span>    | ⁦/admin/settings/booking⁩              | <span dir="rtl">تنظیمات — تصمیم</span> ⁦D8-04⁩ | <span dir="rtl">زیر‌بخش قواعد رزرو در مرکز تنظیمات؛ مقادیر صریحاً قابل تنظیم مانند</span> ⁦CancellationCutoff⁩ <span dir="rtl">و</span> ⁦CustomerRescheduleDeadline⁩ <span dir="rtl">در اینجا قرار می‌گیرند. فقط قواعدی که مرجع محصول اجازه تنظیم آن‌ها را داده است قابل تغییرند.</span>                                                                                                                                                                                                                                                     | ⁦BR-RSC-05⁩                                       |
| ⁦ADM-25⁩                       | <span dir="rtl">پروفایل مدیر</span>          | ⁦/admin/profile⁩                       | <span dir="rtl">ثانویه</span>                | <span dir="rtl">پروفایل/روش ورود حساب مدیر کل؛ انتقال/ایجاد مدیر کل دوم در</span> ⁦UI⁩ <span dir="rtl">وجود ندارد.</span>                                                                                                                                                                                                                                                                                                                                                                                                              | ⁦D6-06⁩                                           |

# <span dir="rtl">۱۵. هشدار حیاتی،</span> ⁦Audit⁩ <span dir="rtl">و خطا در پنل مدیر</span>

<span dir="rtl">طبق تصمیم جدیدتر فاز ۳/۶، نمایش کامل ⁦Audit Log⁩ و جزئیات
فنی خطا در پنل ریوال الزام نیست. خلاصه رخدادهای عملیاتی قابل اقدام
می‌تواند در گزارش‌ها دیده شود و موارد فوری از طریق ⁦Action Center⁩ مدیر کل
نیز برجسته شوند؛ تطبیق پرداخت در بخش پرداخت‌ها باقی می‌ماند و لاگ فنی
خام/جزئیات حساس خارج از نقشه اصلی است.</span>

- <span dir="rtl">اگر در فازهای فنی بعدی ابزار</span> ⁦Audit⁩
  <span dir="rtl">داخل</span> ⁦Rival⁩ <span dir="rtl">ساخته شود، آن یک
  صفحه عملیاتی اختیاری با دسترسی فقط مدیر کل است و نباید شرط پیش‌نیاز
  تجربه مدیریتی نسخه اصلی باشد.</span>

- <span dir="rtl">پیام خطا به مدیر در</span> ⁦UI⁩ <span dir="rtl">همچنان
  باید قابل فهم باشد؛</span> ⁦Stack Trace⁩<span dir="rtl">،</span> ⁦Secret⁩
  <span dir="rtl">یا جزئیات حساس نمایش داده نمی‌شود.</span>

# <span dir="rtl">۱۶. نقش دوگانه مدیر کل در معماری اطلاعات</span>

<span dir="rtl">مدیر کل تمام قابلیت‌های آرایشگر را نیز دارد، اما در تجربه
کاربری به دو پنل یا دو ⁦Workspace⁩ جدا تقسیم نمی‌شود. مدل نهایی ⁦D8-01⁩ یک
حساب، یک ⁦Session⁩, یک پوسته و یک ناوبری است. صفحات عملیاتی مشترک فقط یک
بار در پنل مدیر وجود دارند و با ⁦Scope⁩ بین «من»، یک آرایشگر مشخص و «همه
سالن» تغییر می‌کنند. مشتریان همیشه در Directory سراسری مدیر قابل دسترس‌اند
و «مرتبط با من» صرفاً Filter است. وظایف فوری مدیریتی نیز از طریق ⁦Action
Center⁩ مستقل از Scope همیشه دیده می‌شوند.</span>

| <span dir="rtl">اصل</span>               | <span dir="rtl">رفتار</span>                                                                                                                                                             |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">پوسته واحد</span>        | <span dir="rtl">یک حساب/Session و یک Navigation؛ هیچ Role Switch، Impersonation یا ورود دوم وجود ندارد. مقصدهای صرفاً مدیریتی زیر گروه «مدیریت سالن» قرار می‌گیرند.</span>                 |
| <span dir="rtl">⁦Scope⁩ صفحات مشترک</span> | <span dir="rtl">تقویم، نوبت‌ها و درخواست‌ها در یک صفحه مشترک با Scope «من / آرایشگر / همه» کار می‌کنند. Directory مشتریان سراسری است و «مرتبط با من» فقط فیلتر است، نه محدودیت مجوز.</span> |
| <span dir="rtl">⁦Action Center⁩</span>     | <span dir="rtl">⁦Requested⁩های نیازمند اقدام، پرداخت‌های ⁦Under Review⁩ و هشدارهای حیاتی را مستقل از صفحه/Scope فعلی نشان می‌دهد؛ Badge فقط منابع unresolved/actionable را می‌شمارد و با Read/Unread اعلان‌ها مستقل است.</span>               |
| <span dir="rtl"></span>اولویت روزانه     | <span dir="rtl"></span>داشبورد با «امروز من» شروع می‌شود تا کار آرایشگری مدیر سریع بماند؛ خلاصه کل سالن و اکشن‌های مدیریتی به‌صورت فشرده در همان پوسته در دسترس‌اند.                         |
| <span dir="rtl"></span>خط قرمز           | <span dir="rtl"></span>مدیر کل در هیچ Scopeی حق دورزدن تداخل، یکپارچگی مالی، ⁦Snapshot⁩, ⁦Ledger⁩ یا یکتایی اثر را ندارد.                                                                    |

# <span dir="rtl">۱۷. ماتریس صفحه/قابلیت به نقش</span>

| <span dir="rtl">قابلیت/صفحه</span>              | <span dir="rtl">مشتری</span>                                            | <span dir="rtl">آرایشگر</span>                                                | <span dir="rtl">مدیر کل</span>                                                                                    |
|-------------------------------------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">خانه / نمونه‌کار / قوانین</span> | <span dir="rtl">عمومی</span>                                            | <span dir="rtl">عمومی</span>                                                  | <span dir="rtl">عمومی</span>                                                                                      |
| <span dir="rtl">رزرو جدید</span>                | <span dir="rtl">✓</span>                                                | <span dir="rtl">—</span>                                                      | <span dir="rtl">—؛ مدیر فقط از مسیر رزرو دستی مدیریتی برای مشتری نوبت ثبت می‌کند</span>                            |
| <span dir="rtl">نوبت‌ها</span>                   | <span dir="rtl">فقط خود</span>                                          | <span dir="rtl">فقط منتسب</span>                                              | <span dir="rtl">همه؛ صفحه واحد با ⁦Scope⁩ پیش‌فرض «من»</span>                                                        |
| <span dir="rtl">درخواست‌ها</span>                | <span dir="rtl">فقط خود</span>                                          | <span dir="rtl">فقط ⁦Proposed⁩ منتسب</span>                                     | <span dir="rtl">همه؛ ⁦Requested⁩ مستقیم برای مدیر، ⁦Proposed⁩ با Scope/نظارت</span>                                   |
| <span dir="rtl">تقویم کاری</span>               | <span dir="rtl">—</span>                                                | <span dir="rtl">فقط خود</span>                                                | <span dir="rtl">همه؛ ⁦Scope⁩ پیش‌فرض «من»</span>                                                                     |
| <span dir="rtl">رزرو دستی</span>                | <span dir="rtl">—</span>                                                | <span dir="rtl">فقط برای خود</span>                                           | <span dir="rtl">برای همه</span>                                                                                   |
| <span dir="rtl">مشتریان</span> ⁦Directory⁩        | <span dir="rtl">—</span>                                                | <span dir="rtl">—</span>                                                      | <span dir="rtl">همه؛ «مرتبط با من» فقط فیلتر</span>                                                               |
| <span dir="rtl">خدمات/قیمت</span>               | <span dir="rtl">در رزرو فقط مشاهده گزینه مجاز</span>                    | <span dir="rtl">—</span>                                                      | <span dir="rtl">مدیریت</span>                                                                                     |
| ⁦Wallet⁩                                          | <span dir="rtl">موجودی خود فقط در زمینه‌های لازم؛ بدون صفحه مستقل</span> | <span dir="rtl">—</span>                                                      | <span dir="rtl">همه +</span> ⁦Ledger⁩ <span dir="rtl">+</span> ⁦Adjustment⁩ <span dir="rtl">با دلیل</span>            |
| <span dir="rtl">پرداخت‌ها</span>                 | <span dir="rtl">رسید مرتبط در</span> ⁦Detail⁩                             | <span dir="rtl">وضعیت عملیاتی در</span> ⁦Detail⁩                                | <span dir="rtl">همه + تطبیق</span>                                                                                |
| <span dir="rtl">نمونه‌کار</span>                 | <span dir="rtl">مشاهده عمومی</span>                                     | <span dir="rtl">موارد خود</span>                                              | <span dir="rtl">همه</span>                                                                                        |
| ⁦SMS⁩ <span dir="rtl">دستی</span>                 | <span dir="rtl">—</span>                                                | <span dir="rtl">فقط مشتری مرتبط؛</span> ⁦Action⁩ <span dir="rtl">زمینه‌ای</span> | <span dir="rtl">همه مشتریان مجاز</span>                                                                           |
| <span dir="rtl">اعلان آزادشدن</span>            | <span dir="rtl">مدیریت موارد خود</span>                                 | <span dir="rtl">—</span>                                                      | <span dir="rtl">مشاهده عملیاتی در صورت ابزار؛</span> ⁦Worker⁩ <span dir="rtl">پردازش</span>                         |
| ⁦Audit⁩<span dir="rtl">/خطای خام</span>           | <span dir="rtl">—</span>                                                | <span dir="rtl">—</span>                                                      | <span dir="rtl">صفحه کامل الزام نیست؛ فقط هشدار حیاتی در</span> ⁦Rival⁩                                             |
| هماهنگی ⁦Requested⁩                               | <span dir="rtl"></span>ثبت درخواست خدمت مرکب؛ بدون انتخاب آرایشگر/زمان  | <span dir="rtl"></span>—                                                      | <span dir="rtl"></span>انتخاب آرایشگر+زمان+مبلغ برای هر جزء، پیش‌نویس پایدار و ارسال بسته با Hold سه‌ساعته          |
| ایجاد اعلان داخل سایت                           | <span dir="rtl"></span>—                                                | <span dir="rtl"></span>—                                                      | <span dir="rtl"></span>مدیر کل: اعلان شخصی برای مشتری مشخص و اعلان عمومی؛ اعلان‌های سیستمی نیز خودکار ایجاد می‌شوند |

# <span dir="rtl">۱۸. ورودهای زمینه‌ای و</span> ⁦Action⁩<span dir="rtl">هایی که صفحه اصلی ندارند</span>

| <span dir="rtl">عمل</span>                                       | <span dir="rtl">نقطه ورود</span>            | <span dir="rtl">قاعده</span>                                                                                                                                                                                  |
|------------------------------------------------------------------|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">لغو نوبت مشتری</span>                            | ⁦CUS-04⁩ <span dir="rtl">جزئیات نوبت</span>   | <span dir="rtl">با قواعد</span> ⁦Cutoff⁩<span dir="rtl">؛ برای همه</span> ⁦Appointment⁩ <span dir="rtl">قطعی مجاز طبق شرایط.</span>                                                                               |
| <span dir="rtl">جابه‌جایی مشتری</span>                            | ⁦CUS-04⁩                                      | <span dir="rtl">نوبت ⁦Fixed⁩ طبق قواعد جابه‌جایی مشتری قابل تغییر است؛ این شامل جزء ⁦Fixed⁩ ساخته‌شده از بسته ⁦Requested⁩ نیز می‌شود. نوبت ⁦Proposed⁩ و جزء ⁦Proposed⁩ بسته Requested توسط مشتری جابه‌جا نمی‌شود.</span>     |
| <span dir="rtl">لغو/جابه‌جایی کسب‌وکار</span>                      | ⁦STY-06 / ADM-06⁩                             | ⁦Action⁩ <span dir="rtl">زمینه‌ای با نمایش پیامد و حق جبرانی.</span>                                                                                                                                             |
| ⁦NoShow⁩                                                           | ⁦STY-06 / ADM-06⁩                             | <span dir="rtl">تا ۲۳:۵۹:۵۹ همان روز محلی.</span>                                                                                                                                                             |
| ⁦SMS⁩ <span dir="rtl">دستی آرایشگر</span>                          | ⁦STY-06⁩ <span dir="rtl">یا</span> ⁦STY-04⁩     | <span dir="rtl">فقط مشتری مرتبط؛ عدم وجود صفحه شماره آزاد.</span>                                                                                                                                             |
| ⁦Adjustment Wallet⁩                                                | ⁦ADM-19⁩                                      | ⁦Action⁩ <span dir="rtl">افزایش/کاهش اعتبار مشتری با ثبت مبلغ و دلیل؛ در لایه دامنه حتماً</span> ⁦Ledger Adjustment⁩ <span dir="rtl">ساخته می‌شود و</span> ⁦Balance⁩ <span dir="rtl">خام مستقیم ویرایش نمی‌شود.</span> |
| <span dir="rtl">بازپرداخت بانکی دستی</span>                      | ⁦ADM-17/19⁩                                   | <span dir="rtl">همراه</span> ⁦Reversal / Adjustment⁩ <span dir="rtl">متناظر.</span>                                                                                                                             |
| <span dir="rtl">اعلان آزادشدن</span>                             | ⁦BK-ALERT01⁩ <span dir="rtl">یا</span> ⁦CUS-08⁩ | <span dir="rtl">از زمینه</span> ⁦Service+Stylist⁩ <span dir="rtl">یا صفحه فهرست موارد خود.</span>                                                                                                               |
| <span dir="rtl">پرداخت پاسخ ⁦Proposed⁩ / بسته ⁦Requested⁩</span>     | ⁦CUS-06⁩                                      | ⁦Proposed⁩: یک Hold سه‌ساعته. ⁦Requested⁩: همه Holdهای اجزا تایمر مشترک ۳ساعته و رفتار همه‌یا‌هیچ دارند؛ CTA فقط برای صاحب درخواست.<span dir="rtl"></span>                                                           |
| <span dir="rtl">تغییر</span> ⁦Stylist⁩ <span dir="rtl">نوبت</span> | ⁦ADM-06⁩                                      | <span dir="rtl">از</span> ⁦Detail⁩<span dir="rtl">؛ فنی با</span> ⁦Cancel + New Appointment.⁩                                                                                                                     |
| <span dir="rtl"></span>پیش‌نویس پاسخ ⁦Requested⁩                    | ⁦ADM-04⁩                                      | <span dir="rtl"></span>ذخیره تدریجی انتخاب آرایشگر/زمان/مبلغ برای اجزا؛ بستن صفحه اطلاعات را از بین نمی‌برد. پیش‌نویس ظرفیت را Hold نمی‌کند؛ در زمان ارسال همه زمان‌ها دوباره اعتبارسنجی می‌شوند.                  |

# <span dir="rtl">۱۹.</span> ⁦Deep Link⁩<span dir="rtl">،</span> ⁦Redirect⁩ <span dir="rtl">و رفتار دسترسی</span>

| <span dir="rtl">منبع</span> **⁦Deep Link⁩**                                       | <span dir="rtl">مقصد</span>                                                                                                                | <span dir="rtl">رفتار</span>                                                                                                                                                                                         |
|---------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">لینک</span> ⁦SMS⁩ <span dir="rtl">پاسخ درخواست</span>             | ⁦/customer/requests/{id}⁩                                                                                                                    | <span dir="rtl">اگر</span> ⁦Login⁩ <span dir="rtl">نیست →</span> ⁦Login⁩ <span dir="rtl">→ بازگشت به همان درخواست. اگر</span> ⁦Hold⁩ <span dir="rtl">منقضی → وضعیت منقضی و</span> ⁦CTA⁩ <span dir="rtl">درخواست جدید.</span> |
| <span dir="rtl">لینک تایید/رسید رزرو</span>                                     | ⁦/customer/appointments/{id}⁩                                                                                                                | <span dir="rtl">فقط صاحب نوبت؛ شناسه دیگر باید بدون افشای داده رد شود.</span>                                                                                                                                        |
| <span dir="rtl">لینک اعلان عملیات آرایشگر</span>                                | ⁦/stylist / appointments⁩<span dir="rtl">/{</span>⁦id⁩<span dir="rtl">} یا</span> ⁦/requests⁩<span dir="rtl">/{</span>⁦id⁩<span dir="rtl">}</span> | <span dir="rtl">فقط</span> ⁦Stylist⁩ <span dir="rtl">منتسب یا مدیر کل.</span>                                                                                                                                          |
| <span dir="rtl">بازگشت درگاه</span>                                             | <span dir="rtl">نمای نتیجه پرداخت در زمینه</span> ⁦Checkout / Request⁩                                                                       | ⁦Redirect⁩ <span dir="rtl">مرورگر موفقیت قطعی نیست؛</span> ⁦UI⁩ <span dir="rtl">تا</span> ⁦Verify⁩ <span dir="rtl">نتیجه «در حال بررسی» را نشان می‌دهد.</span>                                                              |
| ⁦CTA⁩ <span dir="rtl">رزرو عمومی</span>                                           | ⁦/login?return=/customer/book⁩                                                                                                               | <span dir="rtl">بعد از احراز موفق به رزرو جدید.</span>                                                                                                                                                               |
| <span dir="rtl">کاربر با نقش متفاوت روی</span> ⁦Route⁩ <span dir="rtl">پنل</span> | ⁦Forbidden⁩ <span dir="rtl">یا</span> ⁦Redirect⁩ <span dir="rtl">امن</span>                                                                    | <span dir="rtl">هیچ داده صفحه قبل از کنترل مجوز رندر نشود.</span>                                                                                                                                                    |
| <span dir="rtl">مشتری غیرفعال</span>                                            | ⁦/customer⁩ <span dir="rtl">با حالت</span> ⁦Read-only⁩                                                                                         | <span dir="rtl">ورود و مشاهده منابع موجود مجاز؛ رزرو/پرداخت/لغو/جابه‌جایی</span> ⁦CTA⁩ <span dir="rtl">غیرفعال با توضیح.</span>                                                                                         |
| <span dir="rtl">حساب حذف نرم</span>                                             | ⁦Account unavailable⁩                                                                                                                        | <span dir="rtl">ورود و پنل بسته؛ جزئیات حساب/وجود اطلاعات حساس افشا نشود.</span>                                                                                                                                     |
| <span dir="rtl"></span>هشدار ⁦Requested⁩ مدیر                                     | ⁦/admin/requests/{id}⁩                                                                                                                       | <span dir="rtl"></span>از ⁦Action Center⁩ یا اعلان عملیاتی مستقیم وارد جزئیات درخواست می‌شود؛ فقط ⁦OwnerAdmin⁩ مجاز است و وضعیت پیش‌نویس حفظ می‌شود.                                                                        |
| <span dir="rtl"></span>پیام اعلان آزادشدن مشتری                                  | ⁦/customer/book⁩                                                                                                                              | <span dir="rtl"></span>ورود به CUS-02 با Service+Stylist ازپیش‌پرشده؛ Availability تازه محاسبه می‌شود و لینک هیچ Hold، اولویت یا رزرو خودکار ایجاد نمی‌کند.                                                            |

# <span dir="rtl">۲۰. حالات سیستمی لازم در معماری اطلاعات</span>

| <span dir="rtl">شناسه</span> | <span dir="rtl">حالت</span>                             | <span dir="rtl">نوع نمایش</span> | <span dir="rtl">قاعده</span>                                                                                                                                                                                              |
|------------------------------|---------------------------------------------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦STATE-01⁩                     | <span dir="rtl">عدم دسترسی</span>                       | ⁦Forbidden⁩                        | <span dir="rtl">مالکیت/نقش معتبر نیست؛ پیام ساده بدون افشای وجود/جزئیات منبع.</span>                                                                                                                                      |
| ⁦STATE-02⁩                     | <span dir="rtl">یافت نشد</span>                         | ⁦Not Found⁩                        | <span dir="rtl">منبع موجود نیست یا با سیاست محصول نباید افشا شود.</span>                                                                                                                                                  |
| ⁦STATE-03⁩                     | <span dir="rtl">درخواست منقضی</span>                    | ⁦Request Expired⁩                  | <span dir="rtl">پایان مهلت پرداخت ۳ساعته پس از پاسخ: در ⁦Proposed⁩ Hold همان زمان و در ⁦Requested⁩ همه Holdهای اجزا آزاد می‌شوند؛ ادامه نیازمند درخواست جدید است. بی‌پاسخ‌ماندن ۷روزه در نمای کاربر «رد شده» محسوب می‌شود.</span> |
| ⁦STATE-04⁩                     | ⁦Hold⁩ <span dir="rtl">رزرو قطعی منقضی</span>             | ⁦Checkout Expired⁩                 | <span dir="rtl">زمان</span>⁦/Wallet Hold⁩ <span dir="rtl">آزاد؛ بازگشت به</span> ⁦Availability⁩ <span dir="rtl">و محاسبه مجدد قیمت.</span>                                                                                    |
| ⁦STATE-05⁩                     | <span dir="rtl">پرداخت در حال بررسی</span>              | ⁦Under Review⁩                     | <span dir="rtl">تراکنش نامشخص؛ نه موفقیت جعلی نه نوبت تکراری. مشتری وضعیت قابل فهم می‌بیند.</span>                                                                                                                         |
| ⁦STATE-06⁩                     | <span dir="rtl">پرداخت موفق اما زمان از دست رفته</span> | ⁦Reconciliation Result⁩            | <span dir="rtl">نوبت متداخل ساخته نمی‌شود؛ نتیجه پس از تطبیق به</span> ⁦Wallet⁩ <span dir="rtl">منتقل می‌شود.</span>                                                                                                          |
| ⁦STATE-07⁩                     | <span dir="rtl">سرویس بیرونی موقتاً در دسترس نیست</span> | ⁦Inline/State⁩                     | <span dir="rtl">رزرو موفق</span> ⁦rollback⁩ <span dir="rtl">نشود؛ برای نقشه</span>⁦/SMS⁩<span dir="rtl">/درگاه پیام کنترل‌شده.</span>                                                                                          |
| ⁦STATE-08⁩                     | ⁦JavaScript⁩ <span dir="rtl">غیرفعال</span>               | ⁦Guide State⁩                      | <span dir="rtl">طبق فاز ۴، پیام راهنما کافی است و مسیر کامل بدون</span> ⁦JS⁩ <span dir="rtl">الزام نیست.</span>                                                                                                             |

# <span dir="rtl">۲۱. فهرست مسیرهای پیشنهادی رابط</span>

<span dir="rtl">این</span> ⁦Route⁩<span dir="rtl">ها برای معماری اطلاعات
و</span> ⁦Deep Link⁩ <span dir="rtl">پیشنهاد شده‌اند و</span> ⁦Endpoint /
API⁩ <span dir="rtl">محسوب نمی‌شوند. نام نهایی</span> ⁦URL⁩
<span dir="rtl">می‌تواند در فاز پیاده‌سازی تغییر کند، اما ساختار مالکیت و
والد/فرزند نباید بدون تصمیم محصول تغییر کند.</span>

| <span dir="rtl">شناسه</span> | **⁦Route⁩** <span dir="rtl">پیشنهادی</span> | <span dir="rtl">عنوان</span>                           | <span dir="rtl">دسترسی</span>               |
|------------------------------|-------------------------------------------|--------------------------------------------------------|---------------------------------------------|
| ⁦PUB-01⁩                       | <span dir="rtl">/</span>                  | <span dir="rtl">خانه</span>                            | <span dir="rtl">عمومی</span>                |
| ⁦PUB-02⁩                       | ⁦/portfolio⁩                                | <span dir="rtl">نمونه‌کار</span>                        | <span dir="rtl">عمومی</span>                |
| ⁦PUB-03⁩                       | ⁦/booking-rules⁩                            | <span dir="rtl">قوانین رزرو</span>                     | <span dir="rtl">عمومی</span>                |
| ⁦AUTH-01⁩                      | ⁦/login⁩                                    | <span dir="rtl">ورود</span>⁦/OTP⁩                        | <span dir="rtl">عمومی</span>                |
| ⁦CUS-01⁩                       | ⁦/customer⁩                                 | <span dir="rtl">داشبورد مشتری</span>                   | ⁦Customer⁩                                    |
| ⁦CUS-02⁩                       | ⁦/customer/book⁩                            | <span dir="rtl">رزرو جدید</span>                       | ⁦Customer⁩                                    |
| ⁦CUS-03⁩                       | ⁦/customer/appointments⁩                    | <span dir="rtl">نوبت‌ها</span>                          | ⁦Customer⁩                                    |
| ⁦CUS-04⁩                       | ⁦/customer/appointments/{id}⁩               | <span dir="rtl">جزئیات نوبت</span>                     | ⁦Customer⁩<span dir="rtl">/مالک</span>        |
| ⁦CUS-05⁩                       | ⁦/customer/requests⁩                        | <span dir="rtl">درخواست‌ها</span>                       | ⁦Customer⁩                                    |
| ⁦CUS-06⁩                       | ⁦/customer/requests/{id}⁩                   | <span dir="rtl">جزئیات درخواست</span>                  | ⁦Customer⁩<span dir="rtl">/مالک</span>        |
| ⁦CUS-07⁩                       | <span dir="rtl">—</span>                  | <span dir="rtl">موجودی اعتبار — بدون صفحه مستقل</span> | <span dir="rtl">در زمینه صفحات مشتری</span> |
| ⁦CUS-08⁩                       | ⁦/customer/availability-alerts⁩             | <span dir="rtl">اعلان آزادشدن</span>                   | ⁦Customer⁩                                    |
| ⁦CUS-09⁩                       | ⁦/customer/notifications⁩                   | <span dir="rtl">اعلان‌ها</span>                         | ⁦Customer⁩                                    |
| ⁦CUS-10⁩                       | ⁦/customer/profile⁩                         | <span dir="rtl">پروفایل</span>                         | ⁦Customer⁩                                    |
| ⁦STY-01⁩                       | ⁦/stylist⁩                                  | <span dir="rtl">داشبورد آرایشگر</span>                 | ⁦Stylist⁩                                     |
| ⁦STY-02⁩                       | ⁦/stylist/calendar⁩                         | <span dir="rtl">تقویم</span>                           | ⁦Stylist⁩                                     |
| ⁦STY-03⁩                       | ⁦/stylist/requests⁩                         | <span dir="rtl">درخواست‌ها</span>                       | ⁦Stylist⁩                                     |
| ⁦STY-04⁩                       | ⁦/stylist/requests/{id}⁩                    | <span dir="rtl">جزئیات درخواست</span>                  | ⁦Stylist⁩<span dir="rtl">/منتسب</span>        |
| ⁦STY-05⁩                       | ⁦/stylist/appointments⁩                     | <span dir="rtl">نوبت‌ها</span>                          | ⁦Stylist⁩                                     |
| ⁦STY-06⁩                       | ⁦/stylist/appointments/{id}⁩                | <span dir="rtl">جزئیات نوبت</span>                     | ⁦Stylist⁩<span dir="rtl">/منتسب</span>        |
| ⁦STY-07⁩                       | ⁦/stylist/manual-booking⁩                   | <span dir="rtl">رزرو دستی</span>                       | ⁦Stylist⁩                                     |
| ⁦STY-08⁩                       | ⁦/stylist/schedule⁩                         | <span dir="rtl">برنامه کاری</span>                     | ⁦Stylist⁩                                     |
| ⁦STY-09⁩                       | ⁦/stylist/portfolio⁩                        | <span dir="rtl">نمونه‌کار</span>                        | ⁦Stylist⁩                                     |
| ⁦STY-10⁩                       | ⁦/stylist/notifications⁩                    | <span dir="rtl">اعلان‌ها</span>                         | ⁦Stylist⁩                                     |
| ⁦STY-11⁩                       | ⁦/stylist/profile⁩                          | <span dir="rtl">پروفایل</span>                         | ⁦Stylist⁩                                     |
| ⁦ADM-01⁩                       | ⁦/admin⁩                                    | <span dir="rtl">داشبورد مدیر کل</span>                 | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-02⁩                       | ⁦/admin/calendar⁩                           | <span dir="rtl">تقویم سالن</span>                      | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-03⁩                       | ⁦/admin/requests⁩                           | <span dir="rtl">درخواست‌ها</span>                       | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-04⁩                       | ⁦/admin/requests/{id}⁩                      | <span dir="rtl">جزئیات درخواست</span>                  | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-05⁩                       | ⁦/admin/appointments⁩                       | <span dir="rtl">نوبت‌ها</span>                          | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-06⁩                       | ⁦/admin/appointments/{id}⁩                  | <span dir="rtl">جزئیات نوبت</span>                     | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-07⁩                       | ⁦/admin/manual-booking⁩                     | <span dir="rtl">رزرو دستی</span>                       | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-08⁩                       | ⁦/admin/customers⁩                          | <span dir="rtl">مشتریان</span>                         | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-09⁩                       | ⁦/admin/customers/{id}⁩                     | <span dir="rtl">جزئیات مشتری</span>                    | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-10⁩                       | ⁦/admin/stylists⁩                           | <span dir="rtl">آرایشگران</span>                       | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-11⁩                       | ⁦/admin/stylists/{id}⁩                      | <span dir="rtl">جزئیات آرایشگر</span>                  | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-12⁩                       | ⁦/admin/services⁩                           | <span dir="rtl">خدمات</span>                           | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-13⁩                       | ⁦/admin/services/{id}⁩                      | <span dir="rtl">ویرایش خدمت</span>                     | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-14⁩                       | ⁦/admin/pricing⁩                            | <span dir="rtl">قیمت‌گذاری</span>                       | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-15⁩                       | ⁦/admin/schedules⁩                          | <span dir="rtl">برنامه‌ها/تعطیلات</span>                | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-16⁩                       | ⁦/admin/payments⁩                           | <span dir="rtl">پرداخت/تطبیق</span>                    | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-17⁩                       | ⁦/admin/reports⁩                            | <span dir="rtl">گزارش‌های مدیریتی</span>                | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-18⁩                       | ⁦/admin/wallets⁩                            | ⁦Wallet/Ledger⁩                                          | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-19⁩                       | ⁦/admin/wallets/{customerId}⁩               | ⁦Wallet⁩ <span dir="rtl">مشتری</span>                    | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-20⁩                       | ⁦/admin/portfolio⁩                          | <span dir="rtl">نمونه‌کارها</span>                      | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-21⁩                       | ⁦/admin/settings⁩                           | <span dir="rtl">تنظیمات عمومی</span>                   | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-22⁩                       | ⁦/admin/announcements⁩                      | <span dir="rtl">اعلان عمومی</span>                     | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-23⁩                       | ⁦/admin/sms⁩                                | ⁦SMS⁩ <span dir="rtl">دستی</span>                        | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-24⁩                       | ⁦/admin/settings/booking⁩                   | <span dir="rtl">تنظیمات رزرو</span>                    | ⁦OwnerAdmin⁩                                  |
| ⁦ADM-25⁩                       | ⁦/admin/profile⁩                            | <span dir="rtl">پروفایل مدیر</span>                    | ⁦OwnerAdmin⁩                                  |

# <span dir="rtl">۲۲. ردیابی</span> ⁦Story⁩<span dir="rtl">های فاز ۷ به صفحات فاز ۸</span>

| **⁦Story⁩**  | <span dir="rtl">گره</span> **⁦Sitemap⁩**         | <span dir="rtl">پوشش</span>                                                                                                                                       |
|------------|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦US7-PUB-01⁩ | ⁦PUB-01, PUB-02⁩                                 | <span dir="rtl">محتوای عمومی/نمونه‌کار</span>                                                                                                                      |
| ⁦US7-PUB-02⁩ | ⁦AUTH-01⁩                                        | <span dir="rtl">ورود/رزرو</span>                                                                                                                                  |
| ⁦US7-CUS-01⁩ | ⁦CUS-10⁩                                         | <span dir="rtl">پروفایل/روش ورود</span>                                                                                                                           |
| ⁦US7-CUS-02⁩ | ⁦CUS-02 / BK-01,02⁩                              | <span dir="rtl">انتخاب خدمت؛ انتخاب آرایشگر فقط برای ⁦Fixed / Proposed⁩. ⁦Requested⁩ مستقیم به مدیر کل؛ در فاز ۷ نسخه ۱٫۱ همگام شده است.</span>                       |
| ⁦US7-CUS-03⁩ | ⁦CUS-02 / BK-F01⁩                                | ⁦Availability Fixed⁩                                                                                                                                                |
| ⁦US7-CUS-04⁩ | ⁦CUS-02 / BK-F02⁩                                | ⁦Hold/Checkout Fixed⁩                                                                                                                                               |
| ⁦US7-CUS-05⁩ | ⁦BK-F02 + CUS-04⁩                                | <span dir="rtl">پرداخت رزرو</span>                                                                                                                                |
| ⁦US7-CUS-06⁩ | ⁦CUS-04, CUS-06⁩                                 | <span dir="rtl">رسید/وضعیت</span>                                                                                                                                 |
| ⁦US7-CUS-07⁩ | ⁦CUS-02 / BK-P01 + CUS-05,06⁩                    | ⁦Proposed⁩                                                                                                                                                          |
| ⁦US7-CUS-08⁩ | ⁦CUS-02 / BK-R01 + CUS-05,06 + ADM-03,04⁩        | ⁦Requested⁩ مرکب: بدون آرایشگر/زمان مشتری، هماهنگی مدیر کل — تصمیم جدید فاز ۸                                                                                       |
| ⁦US7-CUS-09⁩ | ⁦CUS-06⁩                                         | <span dir="rtl">پرداخت ۳ساعته: یک پاسخ ⁦Proposed⁩ یا بسته ⁦Requested⁩</span>                                                                                          |
| ⁦US7-CUS-10⁩ | ⁦CUS-06⁩                                         | <span dir="rtl">لغو درخواست</span>                                                                                                                                |
| ⁦US7-CUS-11⁩ | ⁦CUS-03,04⁩                                      | <span dir="rtl">مشاهده نوبت</span>                                                                                                                                |
| ⁦US7-CUS-12⁩ | ⁦CUS-04⁩                                         | <span dir="rtl">لغو نوبت</span>                                                                                                                                   |
| ⁦US7-CUS-13⁩ | ⁦CUS-04⁩                                         | <span dir="rtl">جابه‌جایی</span> ⁦Fixed⁩                                                                                                                             |
| ⁦US7-CUS-14⁩ | ⁦CUS-04⁩                                         | <span dir="rtl">حق جبرانی</span>                                                                                                                                  |
| ⁦US7-CUS-15⁩ | ⁦CUS-02 / BK-REC01⁩                              | <span dir="rtl">رزرو دوره‌ای</span>                                                                                                                                |
| ⁦US7-CUS-16⁩ | ⁦BK-REC01⁩                                       | <span dir="rtl">رخداد نامعتبر</span>                                                                                                                              |
| ⁦US7-CUS-17⁩ | ⁦CUS-01 + BK-F02/CUS-06⁩                         | <span dir="rtl">نمای موجودی اعتبار در زمینه داشبورد/پرداخت؛ بدون صفحه مستقل</span>                                                                                |
| ⁦US7-CUS-18⁩ | ⁦CUS-08 + BK-ALERT01⁩                            | <span dir="rtl">اعلان آزادشدن</span>                                                                                                                              |
| ⁦US7-STY-01⁩ | ⁦STY-11⁩                                         | <span dir="rtl">پروفایل</span>                                                                                                                                    |
| ⁦US7-STY-02⁩ | ⁦STY-01,02⁩                                      | <span dir="rtl">برنامه</span>⁦/Availability⁩                                                                                                                        |
| ⁦US7-STY-03⁩ | ⁦STY-08⁩                                         | <span dir="rtl">برنامه</span>⁦/Block⁩                                                                                                                               |
| ⁦US7-STY-04⁩ | ⁦STY-08⁩                                         | <span dir="rtl">پیامد تغییر برنامه</span>                                                                                                                         |
| ⁦US7-STY-05⁩ | ⁦STY-03,04⁩                                      | <span dir="rtl">فقط درخواست‌های ⁦Proposed⁩؛ ⁦Requested⁩ در فاز ۷ نسخه ۱٫۱ از دامنه Story آرایشگر حذف شده است.</span>                                                   |
| ⁦US7-STY-06⁩ | ⁦STY-04⁩                                         | <span dir="rtl">زمان/قیمت نهایی ⁦Proposed⁩; قیمت/زمان ⁦Requested⁩ توسط مدیر کل</span>                                                                                 |
| ⁦US7-STY-07⁩ | ⁦STY-04⁩                                         | <span dir="rtl">رد ⁦Proposed⁩؛ رد ⁦Requested⁩ توسط مدیر کل</span>                                                                                                     |
| ⁦US7-STY-08⁩ | ⁦STY-07⁩                                         | <span dir="rtl">رزرو دستی</span>                                                                                                                                  |
| ⁦US7-STY-09⁩ | ⁦STY-07⁩                                         | <span dir="rtl">مشتری در رزرو دستی</span>                                                                                                                         |
| ⁦US7-STY-10⁩ | ⁦STY-05,06⁩                                      | <span dir="rtl">نوبت</span>⁦/NoShow⁩                                                                                                                                |
| ⁦US7-STY-11⁩ | ⁦STY-09⁩                                         | <span dir="rtl">نمونه‌کار</span>                                                                                                                                   |
| ⁦US7-STY-12⁩ | ⁦STY-10 + STY-06 Action⁩                         | <span dir="rtl">اعلان</span>⁦/SMS⁩                                                                                                                                  |
| ⁦US7-ADM-01⁩ | ⁦ADM-08..11⁩                                     | <span dir="rtl">حساب‌ها</span>                                                                                                                                     |
| ⁦US7-ADM-02⁩ | ⁦ADM-08..11⁩                                     | <span dir="rtl">نقش/وضعیت</span>                                                                                                                                  |
| ⁦US7-ADM-03⁩ | ⁦ADM-12,13⁩                                      | <span dir="rtl">خدمات پایه ⁦Fixed/Proposed⁩ + ساخت خدمت ⁦Requested⁩ مرکب</span>                                                                                       |
| ⁦US7-ADM-04⁩ | ⁦ADM-14⁩                                         | <span dir="rtl">قیمت</span>                                                                                                                                       |
| ⁦US7-ADM-05⁩ | ⁦ADM-15,02⁩                                      | <span dir="rtl">برنامه‌ها</span>                                                                                                                                   |
| ⁦US7-ADM-06⁩ | ⁦ADM-03,04⁩                                      | <span dir="rtl">مدیریت مستقیم ⁦Requested⁩: Draft اجزا، تعیین آرایشگر/زمان/قیمت، Hold اتمیک و ارسال بسته؛ نظارت بر ⁦Proposed⁩. در فاز ۷ نسخه ۱٫۱ همگام شده است.</span> |
| ⁦US7-ADM-07⁩ | ⁦ADM-07⁩                                         | <span dir="rtl">رزرو دستی</span>                                                                                                                                  |
| ⁦US7-ADM-08⁩ | ⁦ADM-05,06⁩                                      | <span dir="rtl">مدیریت نوبت</span>                                                                                                                                |
| ⁦US7-ADM-09⁩ | ⁦ADM-05,06⁩                                      | <span dir="rtl">دوره رزرو</span>                                                                                                                                  |
| ⁦US7-ADM-10⁩ | ⁦ADM-16⁩                                         | <span dir="rtl">تطبیق مالی در صفحه پرداخت‌ها با نمای جزئیات زمینه‌ای</span>                                                                                         |
| ⁦US7-ADM-11⁩ | ⁦ADM-18,19⁩                                      | ⁦Wallet/Ledger⁩                                                                                                                                                     |
| ⁦US7-ADM-12⁩ | ⁦ADM-20..23⁩                                     | <span dir="rtl">محتوا/اعلان</span>⁦/SMS⁩                                                                                                                            |
| ⁦US7-ADM-13⁩ | ⁦ADM-01, ADM-17⁩                                 | <span dir="rtl">هشدار حیاتی + گزارش عملیاتی قابل‌اقدام</span>                                                                                                      |
| ⁦US7-SYS-01⁩ | <span dir="rtl">تمام صفحات حفاظت‌شده</span>     | <span dir="rtl">مجوز سمت سرور</span>                                                                                                                              |
| ⁦US7-SYS-02⁩ | ⁦STATE-03/04⁩                                    | <span dir="rtl">انقضا و</span> ⁦Hold⁩                                                                                                                               |
| ⁦US7-SYS-03⁩ | <span dir="rtl">نمای نتیجه پرداخت</span>       | ⁦Verify/Callback⁩                                                                                                                                                   |
| ⁦US7-SYS-04⁩ | ⁦STATE-05/06⁩                                    | <span dir="rtl">پرداخت دیرهنگام</span>                                                                                                                            |
| ⁦US7-SYS-05⁩ | ⁦STY/ADM appointment detail⁩                     | ⁦Completed/NoShow⁩                                                                                                                                                  |
| ⁦US7-SYS-06⁩ | <span dir="rtl">حالت‌های پیام/اعلان</span>      | ⁦SMS Retry⁩                                                                                                                                                         |
| ⁦US7-SYS-07⁩ | ⁦CUS-08⁩                                         | <span dir="rtl">آزادشدن</span>                                                                                                                                    |
| ⁦US7-SYS-08⁩ | <span dir="rtl">جریان‌های مالی/گروهی</span>     | ⁦Idempotency/Ledger⁩                                                                                                                                                |
| ⁦US7-ADM-14⁩ | <span dir="rtl">⁦ADM-01 + ADM-03/16/17⁩</span>   | ⁦Action Center⁩ سراسری برای Requested، پرداخت نیازمند بررسی و هشدار حیاتی                                                                                           |
| ⁦US7-ADM-15⁩ | <span dir="rtl">⁦ADM-09 + ADM-22⁩</span>         | اعلان دستی شخصی از جزئیات مشتری و اعلان عمومی فقط توسط مدیر کل                                                                                                    |
| ⁦US7-SYS-09⁩ | <span dir="rtl">⁦CUS-06 + ADM-04 + UF-03⁩</span> | پرداخت گروهی ⁦Requested⁩ و ساخت اتمیک Appointmentهای مستقل                                                                                                          |

# <span dir="rtl">۲۳. خروجی مستقیم برای فاز ۹ —</span> ⁦User Flow⁩

| <span dir="rtl">شناسه جریان</span> | <span dir="rtl">نام</span>                       | <span dir="rtl">مسیر صفحات</span>                                                                                                                                                                           |
|------------------------------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦UF-01⁩                              | <span dir="rtl">رزرو</span> ⁦Fixed⁩                | ⁦PUB / AUTH → CUS-02 → BK-01 → BK-02 → BK-F01 → BK-F02⁩ <span dir="rtl">→ پرداخت →</span> ⁦CUS-04⁩                                                                                                              |
| ⁦UF-02⁩                              | ⁦Proposed⁩                                         | ⁦CUS-02 → BK-01 → BK-02 → BK-P01 → STY-03/04 → CUS-06⁩ → پاسخ آرایشگر → ⁦Hold 3h⁩ → پرداخت/لغو<span dir="rtl"></span>                                                                                           |
| ⁦UF-03⁩                              | ⁦Requested⁩                                        | ⁦CUS-02 → BK-01 → BK-R01 → CUS-06⁩ → ⁦ADM-03/04⁩ Draft اجزا (Stylist+Time+Fee) → اعتبارسنجی همه → ⁦Atomic Hold 3h⁩ → پاسخ بسته به ⁦CUS-06⁩ → پرداخت/لغو → ساخت Appointment مستقل برای هر جزء<span dir="rtl"></span> |
| ⁦UF-04⁩                              | <span dir="rtl">رزرو دوره‌ای</span>               | ⁦CUS-01⁩ <span dir="rtl">/ ورودی «رزرو دوره‌ای» →</span> ⁦BK-REC01⁩ <span dir="rtl">→ اعتبارسنجی رخدادها →</span> ⁦Checkout⁩ <span dir="rtl">گروهی →</span> ⁦CUS-03/04⁩                                              |
| ⁦UF-05⁩                              | <span dir="rtl">لغو/جابه‌جایی مشتری</span>        | ⁦CUS-03 → CUS-04 → Action⁩ <span dir="rtl">مجاز بر اساس منشأ و</span> ⁦Cutoff⁩                                                                                                                                  |
| ⁦UF-06⁩                              | <span dir="rtl">رزرو دستی آرایشگر</span>         | ⁦STY-07⁩ <span dir="rtl">→ مشتری موجود/شماره جدید → زمان →</span> ⁦Override⁩ <span dir="rtl">مجاز → ثبت بدون هزینه</span>                                                                                       |
| ⁦UF-07⁩                              | <span dir="rtl">پاسخ ⁦Proposed⁩ آرایشگر</span>     | ⁦STY-03 → STY-04⁩ → زمان + قیمت → ⁦Hold 3h + SMS⁩<span dir="rtl"></span>                                                                                                                                        |
| ⁦UF-08⁩                              | <span dir="rtl">تغییر برنامه متاثر</span>        | ⁦STY-08/ADM-15 → Preview⁩ <span dir="rtl">اثرها → تأیید → لغو کسب‌وکار/اعلان</span>                                                                                                                            |
| ⁦UF-09⁩                              | <span dir="rtl">پرداخت نامشخص</span>             | ⁦ADM-16⁩ <span dir="rtl">→ نمای جزئیات تطبیق همان صفحه → بررسی → دقیقاً یک اثر مالی نهایی</span>                                                                                                               |
| ⁦UF-10⁩                              | <span dir="rtl">اعلان آزادشدن</span>             | ⁦BK-ALERT01/CUS-08⁩ <span dir="rtl">→ انتظار → اولین آزادشدن →</span> ⁦SMS + Expire → CUS-02(Service+Stylist prefilled) → Fresh Availability⁩                                                                                                                            |
| ⁦UF-11⁩                              | <span dir="rtl"></span>هماهنگی ⁦Requested⁩ مدیر کل | ⁦ADM-03 → ADM-04⁩ → Draft پایدار → تعیین Stylist/Time/Fee هر جزء → ارسال → Hold اتمیک ۳ساعته → پرداخت → نوبت‌های مستقل                                                                                         |

# <span dir="rtl">۲۴. مواردی که عمداً در</span> ⁦Sitemap⁩ <span dir="rtl">نیستند</span>

- <span dir="rtl">صفحه عمومی فهرست خدمات یا آرایشگران.</span>

- <span dir="rtl">صفحه مستقل</span> ⁦About⁩ <span dir="rtl">یا</span>
  ⁦Contact⁩ <span dir="rtl">در نسخه اصلی؛ محتوای آن‌ها در</span> ⁦Home⁩
  <span dir="rtl">است.</span>

- <span dir="rtl">صفحه تاریخچه مستقل تراکنش بانکی مشتری.</span>

- <span dir="rtl">صفحه</span> ⁦Ledger⁩ <span dir="rtl">برای مشتری یا
  آرایشگر.</span>

- <span dir="rtl">صفحه جست‌وجوی عمومی مشتری برای آرایشگر.</span>

- <span dir="rtl">صفحه ⁦Claim⁩ عمومی برای ⁦Proposed⁩ یا تخصیص آزاد درخواست
  وجود ندارد. تخصیص اجزای ⁦Requested⁩ فقط به‌صورت Action داخل جزئیات همان
  درخواست مدیر کل انجام می‌شود و صفحه مستقل جدیدی نمی‌سازد.</span>

- <span dir="rtl">صفحه تغییر مستقیم</span> ⁦Stylist⁩ <span dir="rtl">یک
  نوبت برای آرایشگر.</span>

- <span dir="rtl">صفحه</span> ⁦impersonation⁩ <span dir="rtl">یا «ورود به
  جای کاربر» برای مدیر کل.</span>

- <span dir="rtl">صفحه ساخت/انتقال مدیر کل دوم.</span>

- <span dir="rtl">صفحه فروش، صندوق، قیمت کامل خدمت حضوری، مالیات، تخفیف،
  کوپن، حقوق/پورسانت و حسابداری. گزارش جمع هزینه رزرو منتسب به آرایشگر
  صرفاً گزارش تحلیلی است و فرمول حقوق یا تسویه پرسنلی ایجاد
  نمی‌کند.</span>

- <span dir="rtl">صفحه</span> ⁦Audit / Technical Log⁩ <span dir="rtl">کامل
  به‌عنوان الزام نسخه اصلی؛ فقط هشدار حیاتی در</span> ⁦Rival⁩
  <span dir="rtl">لازم است.</span>

- <span dir="rtl">تصمیم‌های D8-01 تا D8-04 پس از بازبینی مالک محصول بسته
  شده‌اند. تصمیم‌های بین‌فازی D8-05 تا D8-08 نیز از پاسخ‌ها و یادداشت‌های
  انتهای فایل استخراج، اعمال و در نسخه‌های متاثر فازهای ۵ تا ۷ همگام
  شده‌اند.</span>

# <span dir="rtl">۲۵. تصمیم‌های نهایی معماری اطلاعات فاز ۸</span>

<span dir="rtl">تصمیم‌های زیر شکل نهایی معماری اطلاعات و ناوبری فاز ۸ را
تعیین می‌کنند و در نسخه نهایی به‌عنوان تصمیم باز باقی نمی‌مانند.</span>

| **⁦D8-01⁩ — معماری نقش دوگانه مدیر کل**<span dir="rtl"></span>                                                                                                                                                                                                                                                                                        | <span dir="rtl">تأییدشده و نهایی</span>                                                                                                                                                             |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">تصمیم نهایی: یک حساب، یک ⁦Session⁩, یک پوسته و یک ناوبری. دو Workspace جدا ساخته نمی‌شود. صفحات مشترک عملیاتی یک نسخه دارند و با ⁦Scope⁩ «من / آرایشگر / همه» کار می‌کنند؛ Directory مشتریان همیشه سراسری است و «مرتبط با من» فقط Filter است. ⁦Action Center⁩ سراسری وظایف فوری مدیریتی را مستقل از Scope همیشه در دسترس نگه می‌دارد.</span> | <span dir="rtl">دلیل: هم کار روزانه مدیر به‌عنوان آرایشگر سریع می‌ماند، هم صفحات تکراری ساخته نمی‌شوند و هم وظایف فوری مثل ⁦Requested⁩ از دید او پنهان نمی‌شوند. Actor واقعی همیشه ⁦OwnerAdmin⁩ است.</span> |

| **⁦D8-02⁩** <span dir="rtl">— اعلان‌های عمومی مشتری</span>                                                                                                                                                                                                               | <span dir="rtl">تأییدشده</span>                                                                                                                                                                       |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">تصمیم اصلاح‌شده: صفحه مستقل «اعلان‌ها» مرکز مشترک اعلان شخصی و عمومی است و خوانده/خوانده‌نشده را مدیریت می‌کند. اعلان‌ها سطح اهمیت دارند؛ داشبورد فقط اعلان‌های با اهمیت بسیار بالا را برجسته می‌کند و بقیه در مرکز اعلان با صفحه‌بندی قابل مراجعه‌اند.</span> | <span dir="rtl">دلیل: فاز ۱ اعلان عمومی را جزو پنل مشتری قرار داده است؛ صفحه مستقل قابلیت مراجعه مجدد و خوانایی بهتر در موبایل می‌دهد بدون اینکه</span> ⁦Inbox⁩ <span dir="rtl">پیچیده ایجاد شود.</span> |

| **⁦D8-03⁩** <span dir="rtl">— جزئیات نمونه‌کار عمومی</span>                                                                                                                                                                                                                                         | <span dir="rtl">تأییدشده</span>                                                                                                                                                                                                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">تصمیم اصلاح‌شده: برای هر نمونه‌کار</span> **⁦Route⁩** <span dir="rtl">مستقل ساخته نشود. صفحه نمونه‌کار گالری فیلترپذیر است؛ کارت فقط تصویر اصلی، عنوان، خدمت و آرایشگر را نشان می‌دهد و انتخاب آن یک پنجره جزئیات/نمایشگر با توضیحات و گالری تصاویر قابل ورق‌زدن افقی باز می‌کند.</span> | <span dir="rtl">دلیل: هیچ</span> ⁦Story⁩ <span dir="rtl">نیاز به</span> ⁦Shareable Portfolio Detail⁩ <span dir="rtl">ندارد؛ حذف</span> ⁦Route⁩ <span dir="rtl">اضافه نقشه سایت را ساده و مناسب مقیاس پروژه نگه می‌دارد. اگر</span> ⁦SEO⁩<span dir="rtl">/اشتراک لینک بعداً مهم شد می‌توان صفحه</span> ⁦Detail⁩ <span dir="rtl">افزود.</span> |

| **⁦D8-04⁩** <span dir="rtl">— صفحه تنظیمات قواعد رزرو مدیر</span>                                                                                                                                                                                                                                                                 | <span dir="rtl">تأییدشده</span>                                                                                                                                                                                                                                          |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">تصمیم اصلاح‌شده: یک مرکز «تنظیمات» مدیریتی وجود داشته باشد و قواعد رزرو به‌عنوان زیر‌بخش آن ارائه شوند. اطلاعات عمومی/</span>**⁦Home⁩**<span dir="rtl">، متن پیامک‌های خودکار و تنظیمات صریحاً مجاز نیز زیر همین مرکز سازمان‌دهی می‌شوند؛ قیمت‌گذاری، برنامه‌ها و تطبیق مالی همچنان ماژول تخصصی مستقل باقی می‌مانند.</span> | <span dir="rtl">دلیل:</span> ⁦BR-RSC-05⁩ <span dir="rtl">تنظیم‌پذیری ۲۴/۳ ساعت را قطعی کرده اما محل</span> ⁦UI⁩ <span dir="rtl">را مشخص نکرده است؛ تجمیع محدود از پراکندگی تنظیمات جلوگیری می‌کند و مانع تبدیل «</span>⁦Settings⁩<span dir="rtl">» به صفحه همه‌کاره می‌شود.</span> |

- ۲۶. تصمیم‌های بین‌فازی نهایی فاز ۸

- این تصمیم‌ها از پاسخ‌های صریح مالک محصول و یادداشت‌های انتهای فایل به‌دست
  آمده‌اند و در فاز ۸ اعمال شده‌اند. همگام‌سازی قواعد، مجوزها و Storyهای
  متناظر نیز در فاز ۵ نسخه ۱٫۳، فاز ۶ نسخه ۱٫۲ و فاز ۷ نسخه ۱٫۱ تکمیل
  شده است.

| شناسه          | تصمیم تثبیت‌شده                                                                                                                                                                                                                                                                                                                                                 | اثر مستقیم                                                                                                                                                                     |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⁦D8-05⁩          | ⁦Requested⁩ فقط به مدیر کل می‌رود و یک خدمت مرکب از خدمات پایه ⁦Fixed / Proposed⁩ است. مشتری آرایشگر/زمان انتخاب نمی‌کند. مدیر پاسخ را در Draft پایدار آماده می‌کند؛ در ارسال، همه زمان‌ها اتمیک ۳ ساعت Hold می‌شوند. مبلغ نهایی هر جزء Snapshot مستقل دارد؛ پس از پرداخت هر جزء Appointment مستقل است و قواعد لغو/جابه‌جایی بر اساس نوع خدمت پایه همان جزء اعمال می‌شود. | مسیر مشتری، فهرست آرایشگر، صفحات درخواست مدیر، مدیریت خدمت، Flow و ردیابی Story به‌روزرسانی شد؛ BR-BKG/AUTH-BKG/US7 در فازهای ۵ نسخه ۱٫۳، ۶ نسخه ۱٫۲ و ۷ نسخه ۱٫۱ همگام شده‌اند. |
| ⁦D8-06⁩          | آرایشگر می‌تواند برای Block شخصی ⁦ReleaseAt⁩ تعیین کند. مدیر کل می‌تواند برای ⁦Service + TargetDateRange⁩ مقدار ⁦BookableFrom⁩ تعیین کند تا بازشدن رزرو مشتری زمان‌بندی شود.                                                                                                                                                                                            | در همان صفحات برنامه کاری آرایشگر و برنامه‌ها/تعطیلات مدیر پیاده می‌شود؛ صفحه مستقل جدید لازم نیست. قواعد و مجوزها در فاز ۵ نسخه ۱٫۳ و فاز ۶ نسخه ۱٫۲ همگام شده‌اند.              |
| ⁦D8-07⁩          | افق عادی ⁦Fixed⁩ و ⁦Proposed⁩ یک ماه است؛ رزرو دوره‌ای ⁦Fixed⁩ تا شش ماه؛ ⁦Requested⁩ مشمول محدودیت یک‌ماهه انتخاب مشتری نیست چون زمان توسط مدیر کل هماهنگ می‌شود.                                                                                                                                                                                                        | گام‌های رزرو، Availability و قواعد بین‌فازی با این تفکیک به‌روزرسانی شده و در فاز ۵ نسخه ۱٫۳ و فاز ۷ نسخه ۱٫۱ منعکس شده‌اند.                                                       |
| ⁦D8-08⁩          | آرایشگر فقط ⁦SMS⁩ دستی برای مشتری مرتبط می‌فرستد و اعلان داخل سایت را دستی ایجاد نمی‌کند. اعلان شخصی دستی و اعلان عمومی فقط توسط مدیر کل ایجاد می‌شوند؛ اعلان‌های عملیاتی سیستم خودکار باقی می‌مانند.                                                                                                                                                                 | جزئیات نوبت آرایشگر، جزئیات مشتری مدیر و مرکز اعلان‌ها/مجوزهای Notification به‌روزرسانی شده‌اند؛ فاز ۶ نسخه ۱٫۲ و فاز ۷ نسخه ۱٫۱ همگام شده‌اند.                                    |
| ⁦Scope⁩          | دامنه داده‌ای همان صفحه، مانند «من / یک آرایشگر / همه سالن»؛ تغییر Scope تغییر Role یا مجوز پایه نیست.                                                                                                                                                                                                                                                          |                                                                                                                                                                                |
| ⁦Action Center⁩  | بخش سراسری در پوسته مدیر کل برای نمایش شمار و دسترسی سریع به وظایف فوری، مستقل از صفحه فعلی.                                                                                                                                                                                                                                                                   |                                                                                                                                                                                |
| بسته ⁦Requested⁩ | پاسخ مدیر کل به یک درخواست مرکب؛ شامل چند خدمت زیرمجموعه با Stylist، زمان و Snapshot هزینه مستقل که پیش از پرداخت با Hold مشترک ۳ساعته محافظت می‌شوند.                                                                                                                                                                                                          |                                                                                                                                                                                |
| ⁦Draft⁩          | پیش‌نویس پایدار پاسخ Requested در پنل مدیر؛ با باز و بسته‌شدن پنل باقی می‌ماند ولی تا زمان ارسال به مشتری ظرفیت را Hold نمی‌کند.                                                                                                                                                                                                                                   |                                                                                                                                                                                |

# <span dir="rtl">۲۷. چک‌لیست نهایی بستن فاز ۸</span>

- <span dir="rtl">☒ نقشه عمومی ⁦Home / Portfolio / Booking Rules⁩ و حذف
  فهرست عمومی خدمات/آرایشگران را تأیید کردم.</span>

- <span dir="rtl">☒ ساختار پنل مشتری و جداسازی ⁦Appointment⁩ از
  ⁦BookingRequest⁩ را با واقعیت استفاده بررسی کردم.</span>

- <span dir="rtl">☒ مسیر ⁦Fixed / Proposed / Requested / Recurring⁩ را با
  مدل جدید ⁦Requested⁩ مرکب و نقش مدیر کل بررسی کردم.</span>

- <span dir="rtl">☒ پنل آرایشگر را از نظر نبود ⁦Directory⁩ عمومی مشتری،
  ⁦Wallet⁩, ⁦Pricing⁩ و نبود ⁦Requested Inbox⁩ کنترل کردم.</span>

- <span dir="rtl">☒ پنل واحد مدیر کل، ⁦Scope⁩ صفحات مشترک، Directory
  سراسری مشتریان و ⁦Action Center⁩ را از نظر نیاز واقعی سالن بررسی
  کردم.</span>

- <span dir="rtl">☒ ⁦Action⁩های زمینه‌ای مثل لغو، جابه‌جایی، ⁦NoShow⁩، ⁦SMS⁩ و
  ⁦Adjustment⁩ را بررسی کردم و صفحه مستقل غیرضروری برای آن‌ها
  نساختم.</span>

- <span dir="rtl">☒ رفتار مشتری غیرفعال و حساب حذف‌شده را بررسی
  کردم.</span>

- <span dir="rtl">☒ تصمیم‌های ⁦D8-01⁩ تا ⁦D8-04⁩ را تأیید یا اصلاح
  کردم.</span>

- <span dir="rtl">☒ دیدگاه‌ها و ⁦Track Changes⁩ مرحله بازبینی در نسخه
  انتشار نهایی پاک‌سازی شده‌اند و نسخه‌های متاثر فازهای ۵ تا ۷ همگام
  شده‌اند.</span>

- <span dir="rtl">☒ بازبینی نهایی انسانی همه بخش‌های باقی‌مانده تکمیل شده
  و مورد جدیدی برای اصلاح گزارش نشده است.</span>

<span dir="rtl">وضعیت پایان این سند: فاز ۸ — نقشه سایت و معماری اطلاعات
— در نسخه ۱٫۰ نهایی و بسته شده است. یادداشت‌های انتهای نسخه بازبینی
درباره ⁦BookableFrom / ReleaseAt⁩، بازطراحی ⁦Requested⁩ و معماری پنل مدیر کل
در تصمیم‌های D8-01 تا D8-08 ادغام شده‌اند. این سند مرجع رسمی برای فاز بعدی
است.</span>

# <span dir="rtl">واژه‌نامه کوتاه</span>

| <span dir="rtl">واژه</span>           | <span dir="rtl">تعریف</span>                                                                                                                                                             |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span dir="rtl">نقشه سایت</span>      | <span dir="rtl">ساختار سلسله‌مراتبی صفحات و مقصدهای ناوبری محصول.</span>                                                                                                                  |
| <span dir="rtl">معماری اطلاعات</span> | <span dir="rtl">سازمان‌دهی محتوا، صفحات، ناوبری و رابطه میان مقصدها برای یافت‌پذیری و فهم بهتر.</span>                                                                                     |
| <span dir="rtl">صفحه مستقل</span>     | <span dir="rtl">مقصدی با</span> ⁦Route⁩ <span dir="rtl">و عنوان پایدار که می‌تواند مستقیم باز شود.</span>                                                                                   |
| <span dir="rtl">نمای گام</span>       | <span dir="rtl">مرحله‌ای از یک جریان مانند رزرو که الزاماً مقصد منوی اصلی نیست.</span>                                                                                                     |
| ⁦Deep Link⁩                             | <span dir="rtl">لینک مستقیم به یک منبع/صفحه داخلی که پس از احراز و کنترل مالکیت باز می‌شود.</span>                                                                                        |
| ⁦Action⁩ <span dir="rtl">زمینه‌ای</span> | <span dir="rtl">عملی که از</span> ⁦Detail⁩ <span dir="rtl">منبع آغاز می‌شود و صفحه اصلی منو ندارد.</span>                                                                                   |
| ⁦BookingRequest⁩                        | <span dir="rtl">درخواست پیش از تبدیل‌شدن به ⁦Appointment⁩: در ⁦Proposed⁩ یک خدمت+Stylist و در ⁦Requested⁩ یک درخواست مرکبِ مدیرمحور که پس از پرداخت به چند Appointment مستقل تبدیل می‌شود.</span> |
| ⁦Appointment⁩                           | <span dir="rtl">نوبت قطعی پس از پرداخت/ثبت معتبر.</span>                                                                                                                                 |
| ⁦Workspace⁩                             | <span dir="rtl">مجموعه صفحات یک نقش یا دامنه کاری مشخص.</span>                                                                                                                           |
```

### Source B — Rival_Gate_Phase_8-1_AI_Handoff_v1.0_FA.md — در Canonical merge به‌عنوان Phase 8-1 Addendum تفسیر می‌شود؛ عنوان Gate داخل منبع تاریخی است.

```text
# خلاصه انتقال نهایی Gate فاز ۸-۱ پروژه Rival — نسخه ۱٫۰

> این فایل مرجع ماشینی تصمیم نهایی Gate فاز ۸-۱ است. در صورت تعارض، تصمیم جدیدتر تأییدشده و سند DOCX نهایی همین Gate مقدم است.

## فراداده

- **پروژه:** Rival / ریوال
- **عنوان:** Gate فاز ۸-۱ — بازنگری موبایل‌محور Sitemap و الگوی ارائه عملیات
- **نسخه:** ۱٫۰
- **وضعیت:** نهایی، بسته و تأییدشده
- **تاریخ:** ۹ مهر ۱۴۰۵ / ۱ اکتبر ۲۰۲۶
- **ورودی مستقیم:** فاز ۷-۱ v1.0 + فاز ۸ v1.1 + فازهای ۵-۱ و ۶-۱ + بازبینی مالک محصول روی Gate v0.1
- **مرحله بعد:** فاز ۸-۱ کوچک و Mobile-focused، فقط با دستور صریح مالک محصول؛ سپس فاز ۹-۱

## نتیجه نهایی Gate

Gate اولیه فقط بررسی می‌کرد هر Story آیا «خانه»‌ای در Sitemap موجود دارد یا نه. بازبینی مالک محصول این معیار را برای محصول Mobile-first ناکافی دانست. نتیجه نهایی این است که **فاز ۸-۱ باید ایجاد شود**، اما نه برای بازطراحی کل Sitemap؛ بلکه به‌عنوان فاز کوچک و هدفمند برای تثبیت Mobile IA و همگام‌سازی الگوهای Action/Confirm/Modal/Sheet.

### تصمیم‌های نهایی

- **D81-GATE-01 — ایجاد فاز ۸-۱:** تأیید. فاز ۸-۱ ایجاد می‌شود.
- **D81-GATE-02 — صفحه مستقل Action Center:** تأیید. Dashboard فقط Badge/Preview کوتاه دارد و صفحه `/admin/action-center` فهرست کامل actionable/unresolved را با فیلتر و Deep Link نگه می‌دارد.
- **D81-GATE-03 — صفحه مستقل Create Stylist/Service:** رد. ساخت Stylist و Service از CTA فهرست آغاز و در Full-screen Modal/Sheet موبایلی انجام می‌شود؛ صفحه UI مستقل ایجاد نمی‌شود. Action/API مستقل backend در فازهای فنی تعریف می‌شود.

## طبقه‌بندی Mobile IA

- **A — Action/State در صفحه موجود:** عملیات کوتاه و کم‌فیلد.
- **B — Confirm Dialog / Bottom Sheet:** عملیات کوچک اما حساس مانند Disable/Delete.
- **C — Full-screen Modal/Sheet:** فرم یا انتخاب مستقل که از صفحه مادر شروع می‌شود ولی در موبایل فضای کامل می‌خواهد، بدون Route UI جدید.
- **D — صفحه موجود:** کاربر نیاز دارد در Context مستقل فعلی کار کند.
- **E — صفحه/Route جدید:** حجم، تکرار، فیلتر یا Deep Link به حدی است که فشردن در صفحه دیگر UX را ضعیف می‌کند.
- **S — System/Worker بدون UI مستقل:** رفتار فنی که نتیجه آن در صفحه منبع بازتاب می‌یابد.

## جمع‌بندی کمی

- ۴۵ Story فاز ۷-۱ بررسی شدند.
- ۱ Page/Route UI جدید قطعی شد: `/admin/action-center`.
- ۷ Story System/Worker بدون UI مستقل باقی می‌مانند.
- بخش قابل توجه عملیات ایجاد/ویرایش/حذف اثرگذار با Modal/Sheet یا Confirm پوشش داده می‌شوند.
- پروفایل، برنامه، Portfolio، Pricing، Settings، Notifications و Wallet عمدتاً در صفحات موجود باقی می‌مانند.

## همگام‌سازی‌های لازم در فاز ۸-۱

| شناسه | موضوع | گره | اصلاح موردنیاز |
|---|---|---|---|
| S8-01 | ساخت Stylist و Lifecycle | ADM-10/11 | Create با Full-screen Modal از ADM-10؛ Profile/State/Soft Delete در ADM-11؛ Mapping مستقل. |
| S8-02 | Customer lifecycle و SMS تک‌مخاطب | ADM-09 | Status/Soft Delete/اصلاح شماره در Detail؛ SMS تک‌مخاطب با Modal از Card/Detail مشتری. |
| S8-03 | Service lifecycle | ADM-12/13 | Create با Full-screen Modal؛ SchedulingType immutable؛ Disable/Delete/Mapping به Actionهای مستقل تبدیل شوند. |
| S8-04 | Requested/Mapping | ADM-13 | Composition و Mapping در Full-screen Sheet/Modal؛ حذف اثرگذار با Impact Preview. |
| S8-05 | Pricing | ADM-14 | Base، Override و Factorها بخش‌های یک صفحه واحد؛ Override Add/Edit با Modal. |
| S8-06 | Schedule/Settings | ADM-15/24/21 | فیلدها در صفحات تخصصی موجود با Section/Accordion؛ BookableFrom و Template edit در Modal. |
| S8-07 | Portfolio | STY-09/ADM-20 | Create/Edit با Full-screen Modal؛ Hide/Unhide Action؛ Hard Delete Confirm. |
| S8-08 | Disabled State | Stylist Workspace | صفحات موجود قابل استفاده؛ Manual Booking و رزروسازی جدید بسته. |
| S8-09 | Action Center | ADM-01 + NEW | Dashboard خلاصه/Badge؛ ایجاد صفحه `/admin/action-center` برای فهرست کامل و قابل فیلتر. |
| S8-10 | SMS گروهی | ADM-23 | صفحه موجود؛ Delivery مستقل در Context نتیجه نمایش داده شود. |

## محدودیت‌ها و موارد منتقل‌شده

- جزئیات دقیق اندازه Modal/Bottom Sheet/Full-screen Sheet و محل CTA در فاز ۹-۱ و Wireframe نهایی می‌شود؛ Gate فقط الگوی IA را تثبیت می‌کند.
- نام Endpoint/API و تفکیک Commandهای backend به فازهای فنی ۱۴ تا ۱۸ منتقل می‌شود؛ اصل «Action مستقل» حفظ می‌شود.
- KPIهای دقیق Reports همچنان تصمیم مستقل پیش از Wireframe هستند.
- برای هر Failure صفحه مستقل ساخته نمی‌شود؛ Failure در Action Center فهرست می‌شود و Context/Action با Sheet یا Deep Link به منبع اصلی ارائه می‌شود.

## معیار شروع فاز ۸-۱

فاز ۸-۱ باید به‌عنوان فاز مستقل با همان چرخه رسمی بازبینی شروع شود. دامنه آن محدود به Mobile IA، صفحه Action Center و همگام‌سازی الگوهای Action/Confirm/Modal/Sheet در گره‌های موجود است. فاز ۹-۱ تا بسته‌شدن فاز ۸-۱ شروع نمی‌شود.

## تصمیم باز

- تصمیم باز مسدودکننده در Gate: **ندارد**.
- تصمیم‌های UX جزئی و KPIهای Reports در محل‌های مشخص‌شده به مراحل بعد منتقل شده‌اند.
```

## 4. وضعیت پایان این Handoff

- این فایل Current Truth فاز را تا پایان ۹-۱ و بازبینی بین‌فازی ۱ اکتبر ۲۰۲۶ یکپارچه می‌کند.
- Ruleهای منسوخ فقط در Source Archive برای Traceability باقی مانده‌اند و فعال نیستند.
- Reports/KPI subsystem از Scope محصول حذف شده است.
- روش تأمین تعطیلات رسمی و اثر Automatic holiday-source update بر Appointmentهای ازقبل قطعی‌شده به فازهای Backend/Domain آینده منتقل شده است.
- فاز ۱۰ هنوز شروع نشده و شروع آن فقط با دستور صریح مالک محصول است.
