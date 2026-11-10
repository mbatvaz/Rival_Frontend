> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

---
project: Rival
phase: 6
phase_title_fa: "نقش‌ها، مجوزها و مجوزهای عملیات مدیریتی"
canonical_status: "merged_current_truth_pre_phase_10"
canonical_date_gregorian: "2026-10-01"
canonical_scope_through: "Phase 9-1 + owner cross-phase review REV-01..REV-05"
phase_10_started: false
source_files:
  - "Rival_Phase_06_AI_Handoff_v1.2_FA.md"
  - "Rival_Phase_06-1_AI_Handoff_v1.0_FA.md"
---

# Rival — فاز 6 — AI Handoff یکپارچه و Canonical پیش از فاز ۱۰

**عنوان:** نقش‌ها، مجوزها و مجوزهای عملیات مدیریتی

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

## 2. Current Truth ویژه فاز ۶ — ادغام Permissions + الحاقیه ۶-۱

اصل مجوز: `Role + Ownership + State` در Server؛ Default Deny؛ UI/Scope authority نیست؛ System/Worker فقط Side Effectهای ازپیش‌تعریف‌شده را اجرا می‌کند.

### Permissions نهایی مهم

- فقط OwnerAdmin: Create/Disable/Reactivate/SoftDelete Stylist؛ Create/Edit/Disable/Reactivate/SoftDelete Service؛ Mapping؛ Base fee/Override/Factors؛ Settings/SMS Templates؛ BookableFrom؛ Customer status/mobile correction؛ Wallet Adjustment/Reversal/Reconciliation؛ ارسال SMS گروهی؛ اعلان دستی شخصی/عمومی.
- Stylist: Profile/Security خود، Schedule/Block/ReleaseAt خود، Portfolio خود، Appointmentهای خود، SMS فقط Customer مرتبط، Manual Booking فقط وقتی State مجاز است.
- Hard Delete فقط Portfolio: Stylist برای خود، OwnerAdmin برای همه.
- نوع Service همان رکورد برای هیچ Actor قابل تغییر نیست.
- Confirm عملیات اثرگذار Permission/Ownership/State را دوباره Revalidate می‌کند.

### D61-02 — بخش superseded

`D61-02`, `AUTH61-SCH-08`, `AUTH61-OPS-01/04` و Acceptanceهای قدیمی هرجا Failure را «Actionable در Action Center و قابل نگه‌داری تا Resolution» می‌دانند با `D91-02` supersede می‌شوند.

Current permission model:

- Customer/Stylist Failure فنی خام را نمی‌بینند.
- OwnerAdmin **Operational Failure Notification** را در Notification Center می‌بیند؛ Read/Unread دارد و سیستم Resolution بعدی را Track نمی‌کند.
- Retry خودکار Worker فقط طبق policy فنی مجاز است. اگر OwnerAdmin بعداً اقدامی انجام دهد، باید یک Action معتبر موجود باشد؛ هیچ Permission جدید برای Force Success/direct edit ایجاد نمی‌شود.
- Action Center فقط Requested/Payment Under Review و سایر Resourceهای واقعاً actionable را شامل می‌شود.
- OwnerAdmin Notification Center هم مشاهده Business/System notification را پوشش می‌دهد و هم ایجاد اعلان دستی برای کاربران را؛ SMS page مستقل است.
- Reports/KPI permission/page وجود ندارد؛ شمارنده UI بعداً بدون ساخت Reporting subsystem ممکن است.


## 3. Source Archive کامل برای Traceability — غیرمرجع در صورت تعارض

**هشدار برای مدل:** متن زیر برای حفظ تمام جزئیات، IDها، Acceptance Criteria، جدول‌ها و تاریخچه تصمیم‌ها از فایل‌های اصلی آورده شده است. در هر تعارض، بخش‌های 0 تا 2 همین فایل مرجع Current Truth هستند. هیچ Rule منسوخ داخل Archive را دوباره فعال نکن.

### Source A — Phase 6 v1.2 canonical extracted summary

```text
# Phase 6 base — canonical extracted content

The full Phase 6 v1.2 source was reviewed through the uploaded file. Active content is normalized in sections 0-2 above and complemented by the complete Phase 6-1 source below. Core base decisions D6-01..D6-10 remain active unless superseded: D6-01 Stylist cannot edit Customer profile; D6-02 related-customer scope with direct mobile entry only in manual booking; D6-03 ordinary accounts have one main role while OwnerAdmin also has Stylist capabilities; D6-04 manual booking charges no reservation fee online but keeps reference snapshot; D6-05 Stylist sees only operational payment status and ReservationFeeSnapshot; D6-06 no UI for second/transfer OwnerAdmin; D6-07 Fixed/Proposed require Customer-selected Stylist while Requested has no initial Stylist; D6-08 Proposed final fee by Stylist and Requested component fee by OwnerAdmin; D6-09 Requested accessible to owning Customer and OwnerAdmin, not Stylist before resulting Appointment; D6-10 ReleaseAt belongs to Stylist scope and BookableFrom to OwnerAdmin. Server-side Policy + ownership, default deny, anti-IDOR/mass-assignment, Audit actor, no impersonation, and non-bypass of overlap/financial invariants remain mandatory.

```

### Source B — Rival_Phase_06-1_AI_Handoff_v1.0_FA.md

```text
---
project: Rival
phase: "6-1"
phase_title_fa: "تکمیل مجوزهای عملیات مدیریتی"
version: "1.0"
status: final_approved_closed
approval_date_jalali: "1405-07-08"
approval_date_gregorian: "2026-09-30"
open_decisions: []
input_direct: "Phase 5-1 v1.0 + Phase 6 v1.2 + Phase 3-1 v1.0"
next_phase: "7-1"
next_phase_title_fa: "داستان‌های کاربر عملیاتی مدیر و آرایشگر"
phase_10_blocked_until_intermediate_chain_closed: true
---

# انتقال نهایی فاز ۶-۱ پروژه Rival

این فایل مرجع کامل و نهایی فاز ۶-۱ است. هدف آن تثبیت مجوزهای عملیاتی مدیریتی بر پایه `Actor + Resource + Action + Ownership + State` است تا فاز ۷-۱ بتواند Storyهای مدیریتی را بدون حدس مجوزی بشکند. در تعارض با متن قدیمی فاز ۶، تصمیم جدیدتر و صریح این فایل مقدم است.

## وضعیت نهایی

- فاز ۶-۱ پس از بازبینی مالک محصول و اعتبارسنجی نهایی مدل بسته شده است.
- تصمیم‌های `D61-01` تا `D61-03` قطعی‌اند و هیچ تصمیم باز مسدودکننده‌ای باقی نمانده است.
- این فاز قاعده کسب‌وکار جدید ایجاد نمی‌کند؛ قواعد فاز ۵-۱ را به مجوزهای صریح و State Gate تبدیل می‌کند.
- `OwnerAdmin` همچنان یک Actor واقعی با قابلیت‌های Stylist است؛ Scope یا «حالت آرایشگر» Role یا Actor را تغییر نمی‌دهد و Impersonation نیست.
- هر مجوز باید سمت سرور با `Role + Ownership + State` ارزیابی شود؛ UI به‌تنهایی مرجع مجوز نیست.
- فاز بعدی `7-1` است و فقط با دستور صریح مالک محصول آغاز می‌شود.
- فاز ۱۰ تا بسته‌شدن `7-1`، Gate `8-1` و `9-1` آغاز نمی‌شود.

## تصمیم‌های کلیدی نهایی

- `D61-01`: Stylist در حالت `Disabled` می‌تواند وارد پنل شود و پروفایل/امنیت، Schedule، Portfolio، Appointmentهای قطعی موجود، Notification و SMS مرتبط را در Scope قبلی مدیریت کند؛ `Manual Booking` و هر Action ایجاد تعهد رزروی جدید برای Customer بسته است.
- `D61-02`: پس از شکست Retryهای خودکار، Failure فقط برای OwnerAdmin به‌عنوان مورد قابل اقدام نمایش داده می‌شود. OwnerAdmin می‌تواند Retry مجدد را آغاز کند، از Actionهای مدیریتی مجاز موجود برای تعیین تکلیف استفاده کند یا مورد را باز نگه دارد. `Force Success`، تغییر مستقیم `Status/Ledger`، دستکاری مستقیم داده یا دورزدن Rule ممنوع است.
- `D61-03`: در SMS گروهی OwnerAdmin، Customerهای `Active` و `Disabled` با شماره معتبر قابل انتخاب‌اند؛ `SoftDeleted` هرگز مخاطب انتخابی نیست. قواعد رضایت/قانونی یا Block ارتباطی در صورت تعریف آینده مستقل از Role اعمال می‌شوند.

## محتوای کامل سند نهایی

فراداده سند


| عنوان | مقدار |
| --- | --- |
| نام پروژه | ریوال |
| شماره و عنوان فاز | فاز ‫۶-۱‬ — تکمیل مجوزهای عملیات مدیریتی |
| نسخه سند | ۱٫۰ |
| وضعیت | نهایی — تأییدشده و بسته |
| ورودی مستقیم | فاز ‫۵-۱‬ نسخه ۱٫۰ + فاز ۶ نسخه ۱٫۲ + فاز ‫۳-۱‬ نسخه ۱٫۰ |
| هدف | تبدیل Action/Resourceهای مدیریتی نهایی‌شده به مجوزهای صریح مبتنی بر Actor، Ownership و وضعیت منبع |
| مرحله بعد پس از بسته‌شدن | فاز ‫۷-۱‬ — داستان‌های کاربر عملیاتی مدیر و آرایشگر (فقط با دستور صریح مالک محصول) |


## ۱. جایگاه و هدف فاز ‫۶-۱‬

فاز ‫۶-۱‬ امتداد فاز ۶ «نقش‌ها و مجوزها» است. فاز ۶ نسخه ۱٫۲ چارچوب نقش‌ها، مالکیت منبع و سیاست‌های پایه را تثبیت کرده است؛ فاز ‫۵-۱‬ نیز چرخه عمر و اثر عملیاتی منابع مدیریتی را دقیق کرده است. این فاز این دو مرجع را به یک ماتریس Action × Resource × Actor قابل استفاده برای فازهای بعدی تبدیل می‌کند.

- تمرکز اصلی: ساخت/وضعیت Stylist، Service و Mapping، Schedule اثرگذار، Pricing و Settings، Portfolio، SMS چندمخاطبی، عملیات شکست‌خورده و Actor سیستمی وابسته.

- این فاز قاعده کسب‌وکار جدید اختراع نمی‌کند؛ فقط مشخص می‌کند چه Actorی مجاز است کدام Action را روی کدام Resource و در چه Scope/State انجام دهد.

- تصمیم‌های D61-01 تا D61-03 در بازبینی مالک محصول تعیین تکلیف و در نسخه ۱٫۰ نهایی شده‌اند؛ هیچ تصمیم باز مسدودکننده‌ای در محدوده این فاز باقی نمانده است.

- فاز ۱۰ تا بسته‌شدن ‫۷-۱‬، Gate فاز ‫۸-۱‬ و ‫۹-۱‬ آغاز نمی‌شود.


## ۲. محدوده و خارج از محدوده


## ۲.۱ داخل محدوده

- مجوز ساخت، ویرایش پروفایل، Disable/Reactivate/Soft Delete Stylist.

- مجوز ایجاد/ویرایش/Disable/Reactivate/Soft Delete Service و مدیریت Mapping.

- مجوز Preview/Confirm برای عملیات مدیریتی اثرگذار و نسبت آن با Actor سیستمی اجرای Side Effectها.

- مجوز Schedule، Block، ReleaseAt، BookableFrom، الگوی سالن و تغییرات دارای Appointment متاثر.

- مجوز BaseReservationFee، BaseFeeOverride، Factorها، Settings و Templateهای SMS.

- مجوز Hide/Unhide و Hard Delete Portfolio و مدیریت محتوای عمومی.

- مجوز SMS دستی یک/چند/همه مخاطب و مشاهده/اقدام روی شکست‌های عملیاتی.

- تثبیت تفاوت Role، Scope، Ownership و State در تصمیم مجوز.


## ۲.۲ خارج از محدوده

- تغییر قواعد چرخه عمر یا اثر مالی/رزروی فاز ‫۵-۱‬.

- شکستن قابلیت‌ها به User Story و معیار UX؛ موضوع فاز ‫۷-۱‬.

- ایجاد Page/Route جدید؛ موضوع Gate فاز ‫۸-۱‬.

- جریان قدم‌به‌قدم Preview/Confirm/Failure/Recovery؛ موضوع فاز ‫۹-۱‬.

- نام Policy، Claim، Endpoint، Middleware یا پیاده‌سازی ASP.NET Core؛ موضوع فازهای معماری/API.

- افزودن نقش انسانی جدید، مدیر کل دوم، Impersonation یا ساختار چندشعبه‌ای.


## ۳. سلسله‌مراتب منابع مرجع


| اولویت | منبع | نقش |
| --- | --- | --- |
| ۱ | فاز ‫۵-۱‬ v1.0 | قواعد جدیدتر چرخه عمر، Side Effect، Soft Delete، Mapping، Override، Portfolio و عملیات گروهی. |
| ۲ | فاز ۶ v1.2 | مرجع پایه Role، Ownership، Policy و مجوزهای فعلی. |
| ۳ | فاز ‫۳-۱‬ v1.0 | نیازمندی‌های مدیریتی و تصمیم‌های پروفایل، ساخت Stylist، Settings و SMS. |
| ۴ | فاز ۹ v1.0 | Flowهای رزرو/پرداخت و Actorهای موجود که مجوز نباید نقضشان کند. |
| ۵ | فاز ۸ v1.1 | ساختار صفحات و Scopeهای UI؛ Scope مجوز Actor را تغییر نمی‌دهد. |
| ۶ | فاز ۷ v1.2 | Storyهای جاری و دامنه نقش‌ها. |
| ۷ | فاز ۴ و منابع پایه | امنیت، داده حداقلی، Audit، خطا و معماری پایه. |


## ۴. اصول پایه مجوز که تغییر نمی‌کنند


| شناسه | موضوع | قاعده مجوز | وضعیت |
| --- | --- | --- | --- |
| AUTH61-BAS-01 | تقدم تصمیم | تصمیم تأییدشده جدیدتر مقدم است؛ قواعد ‫۵-۱‬ بر متن متعارض قدیمی فاز ۶ مقدم‌اند. | قطعی |
| AUTH61-BAS-02 | رد پیش‌فرض | هر Action/Resource که صریحاً مجاز نشده است، برای Actor غیرمجاز است. | قطعی |
| AUTH61-BAS-03 | کنترل سمت سرور | UI یا Scope فقط تجربه کاربری است؛ مجوز مؤثر باید با Role + Ownership + State در سمت سرور ارزیابی شود. | قطعی |
| AUTH61-BAS-04 | Actor مدیر کل | OwnerAdmin دقیقاً یک Actor واقعی با قابلیت‌های Stylist نیز هست؛ Scope یا «حالت آرایشگر» Role یا Actor را عوض نمی‌کند و Impersonation نیست. | قطعی |
| AUTH61-BAS-05 | Actor سیستمی وابسته | Side Effectهای خودکار مثل لغو وابسته، آزادسازی Hold، Credit مجاز و Notification توسط System/Worker در Context عملیات مجاز اجرا می‌شوند؛ این Actor نقش انسانی نیست. | قطعی |
| AUTH61-BAS-06 | State ≠ Role | Active/Disabled/SoftDeleted وضعیت منبع یا حساب است و Role را تغییر نمی‌دهد؛ State می‌تواند Actionهای مجاز را محدود کند. | قطعی |
| AUTH61-BAS-07 | حداقل داده | Stylist فقط داده حداقلی Customer مرتبط و منابع خود را می‌بیند؛ دسترسی مدیریتی OwnerAdmin نیز مجوز دورزدن محرمانگی فنی/Secret نیست. | قطعی |
| AUTH61-BAS-08 | Revalidation | در Confirm عملیات اثرگذار، Permission و State/Ownership منابع متاثر دوباره بررسی می‌شوند؛ Preview قدیمی مجوز اجرا ایجاد نمی‌کند. | قطعی |
| AUTH61-BAS-09 | عدم دورزدن Rule | هیچ مجوزی اجازه نقض تداخل، Snapshot، Verify، Wallet/Ledger یا Idempotency را نمی‌دهد. | قطعی |
| AUTH61-BAS-10 | استثنای Portfolio | Hard Delete فقط برای Portfolio و فقط در Scope مجاز همان Actor وجود دارد؛ سایر منابع مدیریتی Hard Delete ندارند. | قطعی |


## ۵. هویت، Stylist و وضعیت حساب


| شناسه | موضوع | مجوز / محدودیت | وضعیت |
| --- | --- | --- | --- |
| AUTH61-IAM-01 | ساخت Stylist | فقط OwnerAdmin می‌تواند Stylist جدید بسازد، نقش اولیه Stylist را در همان جریان ایجاد کند و Mapping اولیه Serviceها را تعیین کند. | قطعی |
| AUTH61-IAM-02 | عدم تبدیل Role | هیچ Actor، حتی OwnerAdmin، Action مستقیم Customer ↔ Stylist ندارد. برای Stylist از مسیر ساخت Stylist استفاده می‌شود؛ OwnerAdmin دوم نیز ساخته/منتقل نمی‌شود. | قطعی — محدودکننده AUTH-IAM-09 قدیمی |
| AUTH61-IAM-03 | پروفایل Stylist | Stylist نام/نام خانوادگی/تصویر خودش را ویرایش می‌کند؛ OwnerAdmin همین فیلدها را برای هر Stylist مدیریت می‌کند. لیست Serviceها قابل مشاهده است ولی تغییر Mapping فقط OwnerAdmin. | قطعی |
| AUTH61-IAM-04 | روش ورود | Password/Passkey/روش‌های ورود فقط توسط صاحب حساب مدیریت می‌شوند. OwnerAdmin Credential را مشاهده/ویرایش نمی‌کند؛ فقط تغییر شماره بدون شماره قبلی طبق مجوز قبلی و Audit مجاز است. | قطعی |
| AUTH61-IAM-05 | Disable/Reactivate | فقط OwnerAdmin می‌تواند Stylist را Disabled یا دوباره Active کند. Stylist مجاز به تغییر Status خودش نیست. Stylist در حالت Disabled می‌تواند وارد پنل شود و پروفایل/امنیت، Schedule، Portfolio، Appointmentهای قطعی موجود، Notification و SMS مرتبط خودش را در Scope قبلی مدیریت کند؛ اما Manual Booking یا هر Action ایجاد تعهد رزروی جدید برای Customer برای او بسته است. | قطعی — D61-01 |
| AUTH61-IAM-06 | Soft Delete Stylist | فقط OwnerAdmin پس از Preview/Confirm مجاز است Soft Delete Stylist را آغاز کند. Side Effectهای وابسته توسط System/Worker در همان Context انجام می‌شوند. | قطعی |
| AUTH61-IAM-07 | SoftDeleted | Stylist SoftDeleted هیچ مسیر ورود/پنل یا Reactivate ندارد؛ فقط Snapshot/تاریخچه منابع دیگر در Context مجاز قابل مشاهده باقی می‌ماند. | قطعی |
| AUTH61-IAM-08 | Customer مرتبط | Stylist مجوز Directory عمومی Customer ندارد؛ داده Customer فقط در Request/Appointment خودش یا رزرو دستی در Scope قبلی قابل استفاده است. | قطعی |


## ۶. Service، Requested و Mapping


| شناسه | موضوع | مجوز / محدودیت | وضعیت |
| --- | --- | --- | --- |
| AUTH61-SVC-01 | ایجاد Service | فقط OwnerAdmin می‌تواند Service از نوع Fixed/Proposed/Requested ایجاد کند. | قطعی |
| AUTH61-SVC-02 | ویرایش Service | فقط OwnerAdmin می‌تواند عنوان، توضیح، تصویر، Duration و سایر فیلدهای مجاز Service را ویرایش کند. نوع Service پس از ایجاد قابل تغییر نیست؛ برای هیچ Actorی Action تغییر نوع وجود ندارد. | قطعی — D51-03 |
| AUTH61-SVC-03 | Disable/Reactivate | فقط OwnerAdmin Service را Disabled/Active می‌کند. Reactivate فقط پس از اعتبارسنجی قواعد جاری مجاز است. | قطعی |
| AUTH61-SVC-04 | Soft Delete Service | فقط OwnerAdmin پس از Preview/Confirm مجاز به Soft Delete است. لغو/آزادسازی منابع وابسته توسط System/Worker و بدون ساخت Appointment جدید انجام می‌شود. | قطعی — D51-02 |
| AUTH61-SVC-05 | Requested Composition | ایجاد/ویرایش اجزای Requested و Reactivate Requested غیرفعال‌شده فقط OwnerAdmin؛ Stylist و Customer مجوز تغییر ترکیب ندارند. | قطعی |
| AUTH61-SVC-06 | افزودن Mapping | افزودن Fixed/Proposed ↔ Stylist فقط OwnerAdmin. Stylist نمی‌تواند خودش Service جدیدی به فهرست ارائه‌شده اضافه کند. | قطعی |
| AUTH61-SVC-07 | حذف Mapping | فقط OwnerAdmin پس از Preview/Confirm Mapping را حذف می‌کند. این Action اجازه حذف مستقیم منابع وابسته را به OwnerAdmin نمی‌دهد؛ Side Effect هر منبع طبق Rule و توسط فرآیند سیستم اجرا می‌شود. | قطعی — D51-04 |
| AUTH61-SVC-08 | مشاهده تاریخی | Customer/Stylist می‌توانند Snapshot خدمت را فقط در منابع خود/مرتبط ببینند؛ حذف یا Disabled شدن Service دسترسی افقی جدید ایجاد نمی‌کند. OwnerAdmin Context مدیریتی کل سالن را دارد. | قطعی |


## ۷. Schedule، Availability و عملیات وابسته


| شناسه | موضوع | مجوز / محدودیت | وضعیت |
| --- | --- | --- | --- |
| AUTH61-SCH-01 | Schedule شخصی | Stylist فقط Schedule/Exception/Block/ReleaseAt خودش را مدیریت می‌کند؛ OwnerAdmin برای همه Stylistها مجاز است. | قطعی |
| AUTH61-SCH-02 | Preview اثر | Stylist برای تغییر Schedule خودش و OwnerAdmin برای هر Schedule مجاز به مشاهده Preview Appointmentهای متأثر در همان Scope هستند. Stylist فقط اطلاعات نوبت‌های خودش را می‌بیند. | قطعی |
| AUTH61-SCH-03 | Confirm اثرگذار | همان Actorی که مجوز تغییر Schedule را دارد می‌تواند پس از Preview معتبر Confirm کند؛ با Confirm مجوز مستقیم ویرایش Appointment/Ledger داده نمی‌شود. | قطعی |
| AUTH61-SCH-04 | لغو وابسته | System/Worker لغو هر Appointment متأثر، آزادسازی زمان و Credit مالی مجاز را به‌صورت مستقل و اتمیک اجرا می‌کند؛ Actor آغازگر در Correlation/Audit عملیات حفظ می‌شود. | قطعی — D51-08 |
| AUTH61-SCH-05 | BookableFrom | تعریف/ویرایش/لغو BookableFrom سراسری Service فقط OwnerAdmin. | قطعی |
| AUTH61-SCH-06 | الگوی سالن/تعطیلات | تنظیم الگوی عمومی سالن و اصلاح تعطیلات/تنظیمات مشترک فقط OwnerAdmin. | قطعی |
| AUTH61-SCH-07 | رزرو دستی Override | Stylist فقط در رزرو دستی خودش و OwnerAdmin برای هر Stylist از Overrideهای مجاز استفاده می‌کنند؛ هیچ Actorی invariantهای غیرقابل Override را دور نمی‌زند. | قطعی |
| AUTH61-SCH-08 | شکست عملیات عضو | پس از Retry فنی ناموفق، فقط OwnerAdmin مورد را در Action Center/عملیات مشاهده می‌کند. OwnerAdmin پس از بررسی Context می‌تواند Retry مجدد را آغاز کند، از Actionهای مدیریتی مجاز موجود برای تعیین تکلیف استفاده کند یا مورد را تا تصمیم بعدی باز نگه دارد. Force Success، ویرایش مستقیم Status/Ledger یا دورزدن Rule مجاز نیست. | قطعی — D61-02 |


## ۸. قیمت‌گذاری و Settings


| شناسه | موضوع | مجوز / محدودیت | وضعیت |
| --- | --- | --- | --- |
| AUTH61-PRI-01 | BaseReservationFee | مشاهده/ویرایش تنظیم مدیریتی BaseReservationFee فقط OwnerAdmin؛ سایر Actorها فقط نتیجه محاسبه مجاز خود را می‌بینند. | قطعی |
| AUTH61-PRI-02 | BaseFeeOverride | ایجاد، ویرایش و حذف BaseFeeOverride فقط OwnerAdmin. حذف/ویرایش مجوز بازنویسی Snapshot یا Payment قبلی نمی‌دهد. | قطعی — D51-05 |
| AUTH61-PRI-03 | Factorها | ServiceFactor و BarberFactor فقط OwnerAdmin. Stylist حتی Factor خودش را تغییر نمی‌دهد. | قطعی |
| AUTH61-SET-01 | تنظیمات رزرو | CancellationCutoff، CustomerRescheduleDeadline و سایر گزینه‌های صریحاً مصوب فقط OwnerAdmin قابل مدیریت‌اند. | قطعی |
| AUTH61-SET-02 | تنظیمات عمومی | تنظیمات عمومی سالن و محتوای Home/Contact/About در دامنه مصوب فقط OwnerAdmin. | قطعی |
| AUTH61-SET-03 | Template SMS | مشاهده/ویرایش Templateهای مدیریتی SMS فقط OwnerAdmin؛ System/Worker برای ساخت پیام مجاز است Template مؤثر را مصرف کند ولی Actor انسانی جدید محسوب نمی‌شود. | قطعی |
| AUTH61-SET-04 | Snapshot تنظیمات | Customer/Stylist مجوز تغییر Snapshot یا Effective Setting ثبت‌شده در منبع قبلی را ندارند؛ OwnerAdmin نیز فقط Setting آینده را تغییر می‌دهد. | قطعی |


## ۹. Portfolio، محتوا و Hard Delete


| شناسه | موضوع | مجوز / محدودیت | وضعیت |
| --- | --- | --- | --- |
| AUTH61-PORT-01 | ایجاد/ویرایش | Stylist فقط Portfolio خودش را ایجاد/ویرایش می‌کند؛ OwnerAdmin همه Portfolioها را مدیریت می‌کند. | قطعی |
| AUTH61-PORT-02 | Hide/Unhide | Stylist برای Portfolio خودش و OwnerAdmin برای همه مجاز به Hide/Unhide هستند. Customer فقط موارد Visible را در خروجی عمومی می‌بیند. | قطعی |
| AUTH61-PORT-03 | Hard Delete | Stylist فقط Portfolio خودش و OwnerAdmin هر Portfolio را Hard Delete می‌کنند. هیچ Actor دیگری مجاز نیست. عملیات غیرقابل بازیابی است و برای خود مورد Audit محصولی باقی نمی‌ماند. | قطعی — D51-10 |
| AUTH61-PORT-04 | رسانه | مجوز مالکیت Portfolio مجوز بارگذاری فایل نامعتبر نمی‌دهد؛ قواعد امنیت رسانه همچنان سراسری‌اند. | قطعی |
| AUTH61-CNT-01 | محتوای عمومی | ویرایش محتوای ساختارهای عمومی مصوب فقط OwnerAdmin؛ Stylist و Customer مجوز تغییر ساختار/محتوا ندارند. | قطعی |
| AUTH61-CNT-02 | اعلان عمومی | ایجاد/ویرایش/انتشار اعلان عمومی فقط OwnerAdmin. | قطعی |


## ۱۰. SMS، اعلان و مخاطب


| شناسه | موضوع | مجوز / محدودیت | وضعیت |
| --- | --- | --- | --- |
| AUTH61-NOT-01 | SMS Stylist | Stylist فقط به یک Customer مرتبط در Context منبع مجاز SMS دستی می‌فرستد؛ شماره آزاد یا Customer نامرتبط مجاز نیست. | قطعی |
| AUTH61-NOT-02 | SMS OwnerAdmin | OwnerAdmin می‌تواند یک/چند/همه Customerهای مجاز را انتخاب کند. Customerهای Active و Disabled در صورت داشتن شماره معتبر قابل انتخاب‌اند؛ Customer SoftDeleted هرگز مخاطب انتخابی نیست. قواعد رضایت/قانونی یا Block ارتباطی در صورت تعریف آینده مستقل از Role اعمال می‌شوند. | قطعی — D61-03 |
| AUTH61-NOT-03 | ارسال گروهی | یک Action گروهی OwnerAdmin مجوز ایجاد Delivery مستقل برای هر Customer انتخاب‌شده را می‌دهد؛ شکست یک Delivery مجوز دستکاری نتیجه سایر Deliveryها را ایجاد نمی‌کند. | قطعی — D51-07 |
| AUTH61-NOT-04 | Retry Delivery | Retry خودکار SMS توسط Worker انجام می‌شود. Stylist به Queue/Retry داخلی دسترسی ندارد؛ OwnerAdmin فقط وضعیت عملیاتی مجاز را می‌بیند. | قطعی |
| AUTH61-NOT-05 | اعلان دستی داخل سامانه | فقط OwnerAdmin می‌تواند اعلان درون‌سامانه دستی ایجاد کند؛ Stylist چنین Actionی ندارد. | قطعی |
| AUTH61-NOT-06 | اعلان خودکار | System/Worker اعلان‌های ناشی از رزرو/لغو/تغییر/خطا را ایجاد می‌کند؛ کاربران وضعیت داخلی صف را دستکاری نمی‌کنند. | قطعی |


## ۱۱. عملیات، Action Center، Retry و Actor سیستمی


| شناسه | موضوع | مجوز / محدودیت | وضعیت |
| --- | --- | --- | --- |
| AUTH61-OPS-01 | Action Center | فقط OwnerAdmin دید سراسری Requested، Payment Under Review، هشدار حیاتی و Failureهای عملیاتی قابل اقدام را دارد؛ Scope Stylist مدیر این دید را محدود نمی‌کند. | قطعی |
| AUTH61-OPS-02 | Wallet/Ledger | Adjustment/Reversal، بازپرداخت بانکی دستی و Reconciliation فقط OwnerAdmin؛ هیچ Actorی Balance یا Entry قبلی را مستقیم ویرایش نمی‌کند. | قطعی |
| AUTH61-OPS-03 | Retry خودکار | Worker می‌تواند فقط عملیات ازپیش‌تعریف‌شده ناموفق را با Idempotency و همان Correlation Context Retry کند؛ دسترسی عمومی به Command دلخواه ندارد. | قطعی |
| AUTH61-OPS-04 | Failure انسانی | Customer/Stylist Failure فنی خام یا Action مدیریتی Retry را نمی‌بینند. OwnerAdmin Failure را برای تصمیم بعدی می‌بیند و می‌تواند پس از بررسی Context، Retry مجدد یا یکی از Actionهای مدیریتی مجاز موجود را برای تعیین تکلیف انتخاب کند. این مجوز شامل Force Success، ویرایش مستقیم Status/Ledger یا دورزدن قواعد دامنه نیست. | قطعی — D61-02 |
| AUTH61-OPS-05 | Audit | Actor واقعی آغازگر عملیات مدیریتی ثبت می‌شود؛ اجرای Side Effect توسط Worker نباید عملیات را به نام Customer/Stylist جعل کند. Hard Delete Portfolio استثنای نگه‌داری Audit همان مورد است. | قطعی |
| AUTH61-OPS-06 | عدم Impersonation | OwnerAdmin هیچ عملیات مشتری/Stylist را با هویت آنان اجرا نمی‌کند؛ هر Action مدیریتی با Actor OwnerAdmin یا System/Worker ثبت می‌شود. | قطعی |


## ۱۲. ماتریس جامع Action × Resource × Actor

نمادها: «✓» مجاز، «خود» فقط منبع همان Stylist/Customer، «مرتبط» رابطه عملیاتی مستقیم، «سیستم» فقط Worker/Job داخلی، «—» بدون مجوز. State و Ruleهای جزئی بخش‌های قبل بر این خلاصه مقدم‌اند.


| Action / Resource | Customer | Stylist | OwnerAdmin | System/Worker |
| --- | --- | --- | --- | --- |
| ساخت Stylist | — | — | ✓ | — |
| ویرایش نام/نام خانوادگی/تصویر Stylist | — | خود | همه | — |
| Disable/Reactivate/Soft Delete Stylist | — | — | ✓ | Side Effect |
| تغییر Customer ↔ Stylist | — | — | — | — |
| ایجاد/ویرایش Service | — | — | ✓ | — |
| تغییر نوع Service ثبت‌شده | — | — | — | — |
| Disable/Reactivate/Soft Delete Service | — | — | ✓ | Side Effect |
| افزودن/حذف Mapping | — | — | ✓ | Side Effect |
| مدیریت Requested composition | — | — | ✓ | Validation/Side Effect |
| مدیریت Schedule | — | خود | همه | Side Effect |
| Block/ReleaseAt | — | خود | همه | — |
| BookableFrom / الگوی سالن | — | — | ✓ | — |
| BaseFeeOverride/Factor/Settings | — | — | ✓ | مصرف Setting |
| Portfolio ایجاد/ویرایش/Hide | مشاهده عمومی Visible | خود | همه | — |
| Hard Delete Portfolio | — | خود | همه | حذف فایل وابسته |
| SMS دستی | — | Customer مرتبط | یک/چند/همه مجاز | Delivery/Retry |
| اعلان دستی داخل سامانه | — | — | ✓ | — |
| Wallet Adjustment/Reconciliation | منابع خود فقط مشاهده مجاز | — | ✓ | اجرای مالی تعریف‌شده |
| مشاهده Failure عملیاتی | — | — | ✓ | ثبت/Retry فنی |
| Retry دستی / تعیین تکلیف Failure | — | — | Retry / Action مجاز | Retry خودکار |


## ۱۳. تصمیم‌های نهایی‌شده بازبینی فاز ‫۶-۱‬

سه شکاف واقعی نسخه ۰٫۱ پس از بازبینی مالک محصول تعیین تکلیف شده‌اند و در این نسخه نهایی، قواعد قطعی مجوز محسوب می‌شوند. هیچ تصمیم باز مسدودکننده‌ای باقی نمانده است.


| شناسه | موضوع | مبنای تصمیم | تصمیم نهایی | وضعیت |
| --- | --- | --- | --- | --- |
| D61-01 | دامنه پنل Stylist در حالت Disabled | فاز ‫۵-۱‬ رزرو/Request جدید Customer را برای Stylist Disabled بسته و Appointment قطعی موجود را حفظ کرده بود؛ دامنه سایر Actionهای پنل نیازمند تعیین تکلیف بود. | Stylist Disabled می‌تواند وارد پنل شود و پروفایل/امنیت، Schedule، Portfolio، Appointmentهای قطعی موجود، Notification و SMS مرتبط خودش را در Scope قبلی مدیریت کند؛ اما Manual Booking و هر Action ایجاد تعهد رزروی جدید برای Customer بسته است. | تأیید و قطعی |
| D61-02 | Action OwnerAdmin پس از شکست Retry | D51-08 Retry فنی و گزارش Failure به OwnerAdmin را قطعی کرده بود ولی Action انسانی نهایی را مشخص نکرده بود. | پس از شکست Retryهای خودکار، Failure برای OwnerAdmin به‌عنوان مورد قابل اقدام نمایش داده می‌شود. OwnerAdmin پس از بررسی Context می‌تواند Retry مجدد را آغاز کند، عملیات لازم را از طریق Actionهای مدیریتی مجاز موجود به‌صورت دستی تعیین تکلیف کند یا مورد را تا تصمیم بعدی باز نگه دارد. Force Success، تغییر مستقیم Status/Ledger، دستکاری مستقیم داده یا دورزدن Rule مجاز نیست. جزئیات UX/Recovery در ‫۹-۱‬ مشخص می‌شود. | اصلاح و قطعی |
| D61-03 | وضعیت حساب در SMS گروهی | D31-13/D51-07 ارسال به یک/چند/همه Customer مجاز را تعیین کرده بودند اما Active/Disabled/SoftDeleted بودن مخاطب صریح نبود. | Customerهای Active و Disabled در صورت داشتن شماره معتبر در دامنه انتخاب OwnerAdmin هستند؛ Customer SoftDeleted هرگز مخاطب انتخابی نیست. قواعد رضایت/قانونی یا Block ارتباطی در صورت تعریف آینده مستقل از Role اعمال می‌شوند. | تأیید و قطعی |


## ۱۴. سناریوهای پذیرش فاز ‫۶-۱‬


| شناسه | سناریو | نتیجه مورد انتظار |
| --- | --- | --- |
| AC61-01 | Stylist تلاش به ساخت Stylist دیگر | درخواست سمت سرور رد می‌شود؛ فقط OwnerAdmin مجاز است. |
| AC61-02 | OwnerAdmin پروفایل Stylist را ویرایش می‌کند | نام/نام خانوادگی/تصویر مجاز است؛ Credential کاربر قابل مشاهده/ویرایش نیست. |
| AC61-03 | OwnerAdmin تلاش به تبدیل Customer به Stylist | Action مستقیم وجود ندارد/رد می‌شود؛ ایجاد Stylist از مسیر مستقل انجام می‌شود. |
| AC61-04 | Stylist Mapping خدمت خودش را تغییر می‌دهد | رد؛ فقط OwnerAdmin مجاز است. |
| AC61-05 | حذف Mapping دارای Appointment آینده | OwnerAdmin Preview/Confirm دارد؛ Side Effectها سیستمی اجرا می‌شوند و Stylist نمی‌تواند با تغییر شناسه این عملیات را اجرا کند. |
| AC61-06 | تلاش برای تغییر نوع Service | حتی OwnerAdmin Action تغییر نوع همان رکورد ندارد؛ مسیر معتبر Soft Delete + Service جدید است. |
| AC61-07 | Reactivate Service SoftDeleted | رد برای همه Actorها؛ فقط Disabled قابل Active شدن مجدد است. |
| AC61-08 | Stylist تغییر Schedule آرایشگر دیگر | رد؛ Ownership سمت سرور کنترل می‌شود. |
| AC61-09 | Stylist تغییر Schedule خودش با Appointment متاثر | Preview فقط نوبت‌های خودش را نشان می‌دهد؛ Confirm مجاز است و لغو وابسته را System طبق Rule اجرا می‌کند. |
| AC61-10 | Stylist BookableFrom را تغییر می‌دهد | رد؛ فقط OwnerAdmin. |
| AC61-11 | Stylist BaseFeeOverride را حذف می‌کند | رد؛ ایجاد/ویرایش/حذف Override فقط OwnerAdmin. |
| AC61-12 | Stylist Template SMS را تغییر می‌دهد | رد؛ Template مدیریتی فقط OwnerAdmin. |
| AC61-13 | Hard Delete Portfolio دیگران توسط Stylist | رد؛ Stylist فقط Portfolio خودش. OwnerAdmin همه. |
| AC61-14 | Customer تلاش به Hard Delete Portfolio | رد؛ Customer فقط خروجی عمومی Visible را می‌بیند. |
| AC61-15 | SMS گروهی توسط Stylist | رد؛ Stylist فقط Customer مرتبط تکی در Context مجاز. |
| AC61-16 | Worker اجرای Side Effect Soft Delete | فقط Commandهای ازپیش‌تعریف‌شده مرتبط با عملیات مجاز اجرا می‌شوند؛ Worker Role انسانی یا مسیر UI ندارد. |
| AC61-17 | OwnerAdmin در Scope آرایشگر است | Action Center و مجوز سراسری OwnerAdmin تغییر نمی‌کند؛ Actor همان OwnerAdmin باقی می‌ماند. |
| AC61-18 | Preview قدیمی سپس Confirm | Permission/Ownership/State دوباره بررسی می‌شوند؛ داده منسوخ اجازه اجرای عملیات نمی‌دهد. |
| AC61-19 | Retry شکست‌خورده توسط Customer/Stylist | رد؛ Failure عملیاتی مدیریتی در دسترس Customer/Stylist نیست. فقط OwnerAdmin آن را می‌بیند و طبق D61-02 می‌تواند Retry مجدد یا Action مدیریتی مجاز برای تعیین تکلیف را انتخاب کند؛ Force Success یا ویرایش مستقیم Status/Ledger مجاز نیست. |
| AC61-20 | SMS به SoftDeleted Customer | Customer SoftDeleted قابل انتخاب نیست؛ Customer Active یا Disabled فقط در صورت داشتن شماره معتبر و سایر شرایط مجاز می‌تواند مخاطب SMS OwnerAdmin باشد. |


## ۱۵. ماتریس انتقال قواعد فاز ‫۵-۱‬ به مجوزهای ‫۶-۱‬


| قاعده ‫۵-۱‬ | موضوع | قاعده ‫۶-۱‬ | وضعیت انتقال |
| --- | --- | --- | --- |
| BR51-STY-01..03 | ساخت/قابل رزرو شدن Stylist | AUTH61-IAM-01/03 + AUTH61-SVC-06 | Actor ساخت/Mapping فقط OwnerAdmin؛ خود Stylist فقط پروفایل خودش. |
| BR51-STY-04 | Disabled Stylist | AUTH61-IAM-05 — D61-01 | تغییر Status فقط OwnerAdmin؛ دامنه پنل Stylist Disabled طبق D61-01 نهایی و محدود به Actionهای بدون تعهد رزروی جدید است. |
| BR51-STY-05 | Soft Delete Stylist | AUTH61-IAM-06/07 | آغاز فقط OwnerAdmin؛ Side Effect توسط System. |
| BR51-STY-06 | عدم تبدیل Role | AUTH61-IAM-02 | عبارت عمومی «مدیریت Role» فاز ۶ محدود می‌شود؛ تبدیل مستقیم مجاز نیست. |
| BR51-SVC-03 | ثبات نوع Service | AUTH61-SVC-02 | Action تغییر نوع برای هیچ Actor وجود ندارد. |
| BR51-SVC-07/08 | Soft Delete Service/Requested | AUTH61-SVC-04/05 | OwnerAdmin آغازگر؛ System Side Effect؛ Reactivate Requested فقط OwnerAdmin. |
| BR51-SVC-09 | حذف Mapping | AUTH61-SVC-07 | OwnerAdmin + Preview/Confirm؛ Side Effect سیستمی. |
| BR51-SCH-01..06 | Schedule اثرگذار | AUTH61-SCH-01..08 | Stylist خود / OwnerAdmin همه؛ Side Effect توسط System؛ Failure سراسری فقط OwnerAdmin. |
| BR51-PRI-03 | BaseFeeOverride | AUTH61-PRI-02 | ایجاد/ویرایش/حذف فقط OwnerAdmin. |
| BR51-SET-01..05 | Settings/SMS Template | AUTH61-SET-01..04 | مدیریت فقط OwnerAdmin؛ Worker فقط مصرف تنظیم موثر. |
| BR51-CNT-04/06 | Hide/Hard Delete Portfolio | AUTH61-PORT-02/03 | Stylist خود؛ OwnerAdmin همه؛ Customer فقط Visible. |
| BR51-NOT-01..04 | SMS چندمخاطبی | AUTH61-NOT-01..04 — D61-03 | Stylist تکی مرتبط؛ OwnerAdmin گروهی؛ Active/Disabled با شماره معتبر مجاز و SoftDeleted غیرمجاز. |
| BR51-X-09 | Batch failure | AUTH61-SCH-08 / OPS-03/04 — D61-02 | System Retry؛ OwnerAdmin مشاهده Failure و انتخاب Retry/Action مدیریتی مجاز؛ بدون Force Success یا دستکاری مستقیم Status/Ledger. |


## ۱۶. مجوزهای قدیمی که در ‫۶-۱‬ دقیق یا جایگزین می‌شوند

- `AUTH-IAM-09` فاز ۶ که «مدیریت Role/Status فقط مدیر کل» می‌گفت، در بخش Role محدود می‌شود: Status همچنان فقط OwnerAdmin است، اما تبدیل مستقیم Customer ↔ Stylist برای هیچ Actor مجاز نیست.

- `AUTH-SVC-02` همچنان مدیریت Service را فقط OwnerAdmin می‌داند، ولی «ویرایش» دیگر شامل تغییر SchedulingType رکورد موجود نیست.

- `AUTH-PORT-01` از نظر Actor حفظ می‌شود، اما معنای Delete طبق D51-10 اکنون Hard Delete واقعی است؛ Hide Action جدا و قابل بازگشت است.

- `AUTH-PRI-01` با D51-05 صریح می‌شود: مدیریت BaseFeeOverride برای OwnerAdmin شامل Delete نیز هست، بدون مجوز بازنویسی Snapshotهای قبلی.

- `AUTH-SCH-05` با D51-08 تکمیل می‌شود: Actor انسانی تغییر را Confirm می‌کند، اما لغوهای وابسته مستقل توسط System اجرا و Failure نهایی برای OwnerAdmin قابل اقدام می‌شود.


## ۱۷. اثر فاز ‫۶-۱‬ بر مراحل بعدی


| مرحله | اثر مورد انتظار |
| --- | --- |
| فاز ‫۷-۱‬ | هر Story مدیریتی باید Actor، Resource، Ownership، State و مجوزهای نهایی این سند را صریح داشته باشد؛ Storyهای بزرگ مدیریتی به Actionهای کوچک‌تر شکسته شوند. |
| Gate فاز ‫۸-۱‬ | پس از ‫۷-۱‬ بررسی شود آیا مجوز/Story جدید نیازمند Page/Route یا State جدید است؛ در غیر این صورت فقط Sync فاز ۸ کافی است. |
| فاز ‫۹-۱‬ | Preview/Confirm، Access Denied، Revalidation، Side Effect سیستمی، Retry و Failure قابل اقدام به Flow قدم‌به‌قدم تبدیل شوند. |
| فاز ۱۰ | فقط پس از بسته‌شدن زنجیره فوق آغاز شود. |
| فازهای ۱۴ تا ۱۸ | Policy/Ownership/Actor/System Identity و Endpoint Authorization از این ماتریس استخراج شوند؛ نام فنی Policy در ‫۶-۱‬ تعیین نمی‌شود. |


## ۱۸. چک‌لیست بازبینی انسانی فاز ‫۶-۱‬

- ☒ ساخت، Disable/Reactivate و Soft Delete Stylist را از نظر Actor/Ownership بررسی کردم.

- ☒ ویرایش پروفایل داخلی Stylist و مرز Credential/شماره موبایل را بررسی کردم.

- ☒ عدم وجود Action تغییر مستقیم Customer ↔ Stylist را بررسی کردم.

- ☒ مجوزهای Service، Requested و Mapping، به‌خصوص حذف اثرگذار Mapping را بررسی کردم.

- ☒ مجوزهای Schedule/Preview/Confirm و نقش System در Side Effectها را بررسی کردم.

- ☒ BaseFeeOverride، Factorها، Settings و Template SMS را بررسی کردم.

- ☒ Hide/Unhide و Hard Delete Portfolio را بررسی کردم.

- ☒ SMS تکی Stylist و SMS چندمخاطبی OwnerAdmin را بررسی کردم.

- ☒ Action Center، Retry و Failureهای عملیاتی را بررسی کردم.

- ☒ تصمیم‌های D61-01 تا D61-03 تعیین تکلیف و در قواعد مجوز این نسخه اعمال شدند.

- ☒ بررسی کردم هیچ Action مدیریتی مهم فاز ‫۵-۱‬ بدون مجوز صریح باقی نمانده باشد.

- ☒ بازبینی انسانی نهایی انجام شد و نسخه نهایی بدون Comment و Track Changes آماده انتشار است.

وضعیت پایان نسخه ۱٫۰: فاز ‫۶-۱‬ پس از بازبینی انسانی و اعتبارسنجی نهایی مدل، نهایی و بسته شده است. تصمیم‌های D61-01 تا D61-03 قطعی‌اند، هیچ تصمیم باز مسدودکننده‌ای باقی نمانده و این سند ورودی رسمی فاز ‫۷-۱‬ است. فاز ‫۷-۱‬ فقط با دستور صریح مالک محصول آغاز می‌شود و فاز ۱۰ همچنان تا بسته‌شدن زنجیره فازهای میانی متوقف است.


## واژه‌نامه کوتاه


| واژه | تعریف |
| --- | --- |
| Actor | هویت واقعی اجراکننده یا آغازکننده عملیات؛ Customer، Stylist، OwnerAdmin یا عامل فنی داخلی. |
| Ownership | رابطه معتبر Actor با Resource که همراه Role و State برای مجوز ارزیابی می‌شود. |
| Scope | محدوده نمایشی/عملیاتی UI؛ Scope به‌تنهایی Role یا مجوز Actor را تغییر نمی‌دهد. |
| State Gate | محدودیت Action بر اساس Active/Disabled/SoftDeleted یا وضعیت منبع، مستقل از Role پایه. |
| Side Effect سیستمی | اثر وابسته‌ای مانند لغو Appointment، آزادسازی Hold یا Credit که پس از Action مجاز توسط System/Worker اجرا می‌شود. |
| Action اثرگذار | عملیاتی که قبل از Confirm نیازمند Preview/Revalidation است؛ مانند Soft Delete Service یا حذف Mapping. |
| Hard Delete Portfolio | حذف نهایی رکورد و رسانه Portfolio در Scope مجاز؛ تنها Hard Delete محصولی مصوب در این زنجیره. |


## تقدم، محدودسازی و جایگزینی نسبت به مجوزهای قدیمی

- `AUTH-IAM-09` فاز ۶ در بخش Role محدود می‌شود: تغییر Status همچنان فقط OwnerAdmin است، اما تبدیل مستقیم `Customer ↔ Stylist` برای هیچ Actor مجاز نیست.
- `AUTH-SVC-02` همچنان مدیریت Service را فقط به OwnerAdmin می‌دهد، اما «ویرایش Service» شامل تغییر `SchedulingType` رکورد موجود نیست؛ نوع Service پس از ایجاد ثابت است.
- `AUTH-PORT-01` از نظر Actor حفظ می‌شود، اما Delete در Portfolio طبق `D51-10` Hard Delete واقعی است؛ `Hide/Unhide` Action جدا و قابل بازگشت است.
- `AUTH-PRI-01` برای `BaseFeeOverride` شامل ایجاد، ویرایش و Delete توسط OwnerAdmin است؛ این مجوز Snapshot/Payment قبلی را بازنویسی نمی‌کند.
- `AUTH-SCH-05` با تصمیم‌های فاز ۵-۱ تکمیل می‌شود: Actor انسانی Preview/Confirm را انجام می‌دهد، Side Effectهای وابسته توسط System/Worker اجرا می‌شوند و Failure نهایی فقط برای OwnerAdmin قابل اقدام است.
- Hard Delete محصولی در این زنجیره فقط برای Portfolio مصوب است؛ سایر منابع مدیریتی از Soft Delete/Disable و قواعد مربوط استفاده می‌کنند.

## قیود و Invariantهای مجوزی

- Deny by default: هر `Resource/Action` که صریحاً مجاز نشده، برای Actor غیرمجاز است.
- هیچ مجوزی اجازه دورزدن تداخل، Verify، Snapshot، Wallet/Ledger یا Idempotency را نمی‌دهد.
- Preview قدیمی مجوز اجرا ایجاد نمی‌کند؛ در Confirm باید Permission، Ownership و State دوباره بررسی شوند.
- System/Worker فقط Command/Side Effectهای ازپیش‌تعریف‌شده را در Context عملیات مجاز اجرا می‌کند و نقش انسانی یا UI ندارد.
- OwnerAdmin هیچ عملیات Customer/Stylist را با هویت آنان اجرا نمی‌کند؛ Actor واقعی آغازگر و Correlation عملیات باید حفظ شود.
- Credential و روش‌های ورود فقط توسط صاحب حساب مدیریت می‌شوند؛ OwnerAdmin Credential کاربر را مشاهده/ویرایش نمی‌کند، به‌جز مسیرهای صریح مدیریتی مانند اصلاح شماره طبق Rule قبلی.

## معیارهای پذیرش مرجع برای فاز ۷-۱

فاز ۷-۱ باید حداقل سناریوهای پذیرش موجود در بخش ۱۴ این سند را به Storyهای ریزدانه منتقل کند، از جمله: جلوگیری از ساخت Stylist توسط Stylist، عدم تبدیل مستقیم Role، کنترل Ownership در Mapping/Schedule، نبود Action تغییر نوع Service، Reactivate نشدن SoftDeleted، محدودیت BookableFrom/Pricing/Settings، Hard Delete Portfolio در Scope مجاز، SMS گروهی فقط OwnerAdmin، Side Effect سیستمی و محدودیت Retry/Failure.

## Handoff به فاز ۷-۱

فاز ۷-۱ باید Storyهای مدیریتی بزرگ فاز ۷ اصلی را به Actionهای کوچک‌تر و قابل آزمون تبدیل کند و در هر Story موارد زیر را صریح ثبت کند:

- Actor واقعی؛
- Resource؛
- Action؛
- Ownership/Scope؛
- State Gate؛
- Preconditions و موارد Access Denied؛
- اینکه Side Effect با Actor انسانی اجرا می‌شود یا System/Worker؛
- معیار پذیرش سمت سرور برای مجوز؛
- ارتباط با Rule فاز ۵-۱ و مجوز `AUTH61-*` همین فایل.

Storyهای فاز ۷-۱ نباید مجوز جدید اختراع کنند. اگر Story جدیدی نیازمند Page/Route یا State جدید باشد، فقط در Gate فاز ۸-۱ درباره ایجاد فاز ۸-۱ تصمیم گرفته می‌شود.

## موارد منتقل‌شده و نه باز

- UX قدم‌به‌قدم Preview/Confirm/Access Denied/Revalidation/Retry/Failure به فاز ۹-۱ منتقل شده است.
- نام فنی Policy/Claim/Endpoint/Middleware و پیاده‌سازی ASP.NET Core خارج از این فاز و متعلق به فازهای ۱۴ تا ۱۸ است.
- ساخت نقش انسانی جدید، OwnerAdmin دوم، Impersonation و معماری چندشعبه‌ای خارج از محدوده فعلی‌اند.
- این موارد «تصمیم باز فاز ۶-۱» نیستند؛ صرفاً در فازهای مشخص‌شده طراحی می‌شوند.
```

## 4. وضعیت پایان این Handoff

- این فایل Current Truth فاز را تا پایان ۹-۱ و بازبینی بین‌فازی ۱ اکتبر ۲۰۲۶ یکپارچه می‌کند.
- Ruleهای منسوخ فقط در Source Archive برای Traceability باقی مانده‌اند و فعال نیستند.
- Reports/KPI subsystem از Scope محصول حذف شده است.
- روش تأمین تعطیلات رسمی و اثر Automatic holiday-source update بر Appointmentهای ازقبل قطعی‌شده به فازهای Backend/Domain آینده منتقل شده است.
- فاز ۱۰ هنوز شروع نشده و شروع آن فقط با دستور صریح مالک محصول است.
