> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

---
project: Rival
phase: 1
phase_title_fa: "معماری، تصمیم‌ها و قوانین پایه"
canonical_status: "merged_current_truth_pre_phase_10"
canonical_date_gregorian: "2026-10-01"
canonical_scope_through: "Phase 9-1 + owner cross-phase review REV-01..REV-05"
phase_10_started: false
source_files:
  - "Rival_Phase_1_Architecture_and_Decisions_v1.1.md"
---

# Rival — فاز 1 — AI Handoff یکپارچه و Canonical پیش از فاز ۱۰

**عنوان:** معماری، تصمیم‌ها و قوانین پایه

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

## 2. Current Truth ویژه فاز ۱ — معماری و تصمیم‌های پایه

این فاز Baseline معماری و دامنه است. متن معماری فاز ۱ حفظ می‌شود، اما تصمیم‌های زیر در استفاده جاری آن باید اعمال شوند:

- معماری یک‌پوسته OwnerAdmin پابرجاست: یک Actor/Session/Shell، Scope داخل صفحات مشترک، بدون Role Switch و Impersonation.
- ماژول‌های دامنه پایه (`Identity & Access`, `Customers & Stylists`, `Services`, `Scheduling & Availability`, `Booking Requests`, `Appointments & Recurrence`, `Pricing`, `Payments`, `Wallet`, `Notifications`, `Portfolio & Content`, `Audit & Operations`, `Settings`) معتبرند؛ `Reports` ماژول/قابلیت الزامی محصول نیست.
- بخش OwnerAdmin که قبلاً «گزارش‌ها» را در مدیریت سالن می‌آورد، از Current Truth حذف می‌شود؛ شمارنده‌های UI در صورت نیاز بعداً در Wireframe مشخص می‌شوند.
- Action Center فقط کارهای واقعاً Actionable را نگه می‌دارد. هشدار/Failure عملیاتی و سلامت سیستم به Notification Center OwnerAdmin می‌رود.
- معماری Notification باید Business Notification، Operational System Notification و Manual Notification OwnerAdmin را پشتیبانی کند؛ همه با Read/Unread در مرکز اعلان مدیر قابل مشاهده‌اند.
- مدل `ApplicationError`/لاگ فنی می‌تواند برای مشاهده‌پذیری داخلی باقی بماند، اما Resolve workflow محصولی برای Failure ایجاد نمی‌کند.
- مدل Service باید SchedulingType immutable را رعایت کند؛ هر طراحی قدیمی که تغییر مستقیم نوع همان Service را مجاز بداند منسوخ است.
- مدل قیمت لایه‌ای است و MAX-rule وجود ندارد.
- قاعده تأمین تعطیلات رسمی از «حتماً سرویس سالانه» به «منبع Backend بعداً انتخاب می‌شود» تغییر کرده است؛ Product Rule فقط رفتار Future Holiday را تعیین می‌کند.

### تصمیم‌های فاز ۱ که همچنان Invariant معماری‌اند

- یک شعبه، دقیقاً یک OwnerAdmin، چند Stylist، ظرفیت هم‌زمان یک نفر برای هر Stylist.
- Appointment فقط پس از قطعی‌شدن ساخته می‌شود؛ Hold/Payment state در موجودیت‌های خودش است.
- Timeline متعلق به Stylist است و Service تقویم ظرفیت‌دار مستقل ندارد.
- Business Logic داخل Controller/View/JavaScript پراکنده نمی‌شود؛ Transaction boundary و Authorization سمت سرور روشن است.
- Audit عملیات حساس و CorrelationId حفظ می‌شود؛ Stack Trace/Secret در UI نمایش داده نمی‌شود.
- Public site بدون Directory عمومی مستقل Service/Stylist است؛ انتخاب‌ها پس از Auth در Booking انجام می‌شوند.


### تاریخچهٔ پرداخت و اعتبار در جزئیات مشتری مدیر (تصمیم مالک، ۳۱ اکتبر ۲۰۲۶؛ D10-171 تا D10-177)

- حذف صفحهٔ مستقل «تاریخچه تراکنش بانکی» **برای مشتری** پابرجاست. برای OwnerAdmin، پرداخت‌های یک مشتری و دفتر اعتبار او (Ledger) در حالت «پرداخت‌ها» از جزئیات مشتری (ADM-09) دیده می‌شود، نه صفحهٔ مستقل Wallet یا Transactions؛ تغییر دستی اعتبار از همان‌جا و فقط با Ledger Adjustment/Reversal (دلیل اجباری، نام مدیر ثبت‌کننده) انجام می‌شود. تطبیق مالی همچنان در صفحهٔ پرداخت‌ها و تطبیق (ADM-16) است.


## 3. Source Archive کامل برای Traceability — غیرمرجع در صورت تعارض

**هشدار برای مدل:** متن زیر برای حفظ تمام جزئیات، IDها، Acceptance Criteria، جدول‌ها و تاریخچه تصمیم‌ها از فایل‌های اصلی آورده شده است. در هر تعارض، بخش‌های 0 تا 2 همین فایل مرجع Current Truth هستند. هیچ Rule منسوخ داخل Archive را دوباره فعال نکن.

### Source A — Rival_Phase_1_Architecture_and_Decisions_v1.1.md

```text
# Rival — معماری، تصمیمات و قوانین نهایی فاز اول

نسخه: 1.1  
تاریخ تثبیت اولیه: 2026-09-10  
تاریخ همگام‌سازی: 2026-09-28  
وضعیت: Baseline معماری همگام‌شده با تصمیم‌های تأییدشده تا پایان فاز ۸

---

## 1. هدف سند

این سند مرجع واحد نیازمندی‌ها، معماری سطح‌بالا، قواعد کسب‌وکار، نقش‌ها و تصمیمات فاز اول Rival است. در فازهای تحلیل دامنه، طراحی دیتابیس، UI، API، پیاده‌سازی و تست باید به این سند ارجاع شود.

این سند پاسخ‌های مصاحبه اولیه را با شفاف‌سازی‌های بعدی یکپارچه می‌کند. تصمیم‌های جدیدتر جایگزین پاسخ‌های متعارض قبلی شده‌اند. نسخه ۱٫۱ همچنین تصمیم‌های قطعی فازهای ۵ تا ۸ را در بخش‌های معماری متاثر همگام می‌کند؛ به‌ویژه مدل Requested مرکب و مدیرکل‌محور، Hold سه‌ساعته پاسخ‌ها، ReleaseAt/BookableFrom، محدودیت اعلان دستی Stylist و معماری یک‌پوسته OwnerAdmin. هر متن قدیمی متعارض با این تصمیم‌های جدیدتر معتبر نیست. موارد زیر هنوز عمداً به فاز تخصصی مربوط منتقل شده‌اند و مانع شروع فاز بعد نیستند:

- دامنه، سرور و جزئیات Deployment
- انتخاب درگاه اصلی بین زرین‌پال و بلوپی
- رفتار دقیق API، Retry و Reconciliation هر درگاه
- حساب‌های تجاری SMS.ir، درگاه‌ها و نقشه نشان
- داده اولیه نهایی خدمات و دارایی‌های برند
- تاریخ انتشار و بودجه عملیاتی

---

## 2. چشم‌انداز و محدوده محصول

Rival سامانه مدیریت مشتری و رزرو سالن مردانه طاها در اردبیل است. محصول برای مشتریان عمدتاً ثابت و موبایل‌محور طراحی می‌شود و باید معرفی خدمات و نمونه‌کارها، رزرو آنلاین، مدیریت زمان آرایشگران، پرداخت هزینه رزرو، پیامک و عملیات مدیریتی را یکپارچه کند.

وضعیت کسب‌وکار:

- حدود 100 مشتری فعال در شروع.
- یک شعبه و بدون برنامه فعلی برای چندشعبه‌ای‌شدن.
- یک OwnerAdmin/سرآرایشگر.
- امکان افزودن چند Stylist از ابتدا.
- زبان فقط فارسی، رابط RTL و منطقه زمانی تهران.

مسائل اصلی فعلی:

- زمان‌بر بودن پاسخ‌گویی درباره نوبت.
- دشواری جابه‌جایی زمان‌ها.
- احتمال تداخل و خطای انسانی.
- هزینه و دردسر بازپرداخت بانکی.
- امکان سوءاستفاده از جابه‌جایی برای دورزدن قانون لغو.

---

## 3. واژه‌نامه دامنه

| واژه | تعریف قطعی |
|---|---|
| Service | واحد کاتالوگ خدمت. Fixed و Proposed خدمت اتمی‌اند؛ Requested می‌تواند یک خدمت مرکب مدیریتی متشکل از چند خدمت پایه Fixed/Proposed باشد. |
| Stylist | آرایشگر دارای Timeline مستقل. |
| BookingRequest | درخواست پیش از Appointment. Proposed به یک Stylist منتخب وابسته است؛ Requested بدون Stylist/Time اولیه فقط برای OwnerAdmin ایجاد می‌شود و می‌تواند پاسخ چندجزئی داشته باشد. خود Draft درخواست ظرفیت را رزرو نمی‌کند. |
| Appointment | نوبت قطعی با Customer، Stylist، Service، StartAt و EndAt دقیق. |
| Availability | خروجی محاسبه زمان‌های قابل رزرو برای یک Stylist و Service. |
| Hold | قفل موقت و انقضادار روی زمان یا اعتبار Wallet؛ در Requested می‌تواند یک مجموعه اتمیک از Holdهای زمانی با مهلت مشترک باشد. |
| Block | بسته‌شدن عمدی زمان بدون Appointment؛ Block شخصی می‌تواند ReleaseAt داشته باشد تا پس از آن، در نبود مانع دیگر، دوباره وارد Availability شود. |
| Booking Chain | زنجیره هویتی و مالی Appointment در تمام جابه‌جایی‌ها. |
| Reservation Fee | هزینه رزرو زمان؛ قیمت خود خدمت نیست. |
| Wallet | اعتبار داخلی غیرقابل برداشت Customer برای رزروهای بعدی. |
| Ledger | منبع حقیقت تمام افزایش/کاهش/نگهداری اعتبار Wallet. |
| Snapshot | نسخه ثابت مبلغ یا Rule که تغییر تنظیمات آینده روی آن اثر ندارد. |

---

## 4. نقش‌ها و مجوزها

### 4.1 نقش‌های نهایی

1. `Customer`
2. `Stylist`
3. `OwnerAdmin` — دقیقاً یک حساب؛ تمام امکانات Stylist به‌علاوه مدیریت کل سیستم

### 4.2 ماتریس دسترسی

| قابلیت | Customer | Stylist | OwnerAdmin |
|---|---:|---:|---:|
| مشاهده محتوای عمومی و نمونه‌کار | ✓ | ✓ | ✓ |
| ثبت درخواست/رزرو خود | ✓ | — | ✓ دستی |
| مشاهده و مدیریت نوبت | فقط خود | فقط نوبت‌های خود | همه |
| برنامه کاری | — | فقط خود | همه |
| BookingRequest | فقط خود | فقط Proposed منتسب به خود | همه؛ Requested فقط مدیرکل برای رسیدگی |
| Completed/NoShow | — | فقط خود | همه |
| اطلاعات مشتری | فقط خود | مشتریان مرتبط | همه |
| ویرایش اطلاعات مشتری | فقط خود | — | همه در محدوده مجاز و با Audit |
| مدیریت Service و نگاشت Stylist | — | — | ✓ |
| مدیریت مبلغ رزرو | — | — | ✓ |
| مدیریت Portfolio | — | موارد خود | همه |
| مشاهده Payment | رسید مرتبط | موارد مرتبط عملیاتی | همه |
| موجودی Wallet | موجودی خود | — | همه + Ledger |
| Adjustment کیف پول | — | — | ✓ با ثبت Ledger |
| ارسال SMS دستی | — | مشتری مرتبط | همه |
| هشدار حیاتی در Rival / Audit خام | — | — | هشدار حیاتی ✓؛ Audit خام الزام صفحه اصلی پنل نیست |
| وضعیت حساب و نقش‌ها | — | — | ✓ |

اصل امنیتی: مجوز باید در سرور و بر اساس Role + Resource Ownership بررسی شود.

---

## 5. معماری محصول و ماژول‌ها

### 5.1 سایت عمومی

- Home: معرفی، نمونه‌کار منتخب، درباره طاها/سالن، آدرس، نقشه نشان، شبکه‌های اجتماعی، فرآیند و CTA رزرو
- Portfolio
- Booking / شروع رزرو پس از احراز

فهرست عمومی مستقل Services یا Stylists در نسخه اصلی وجود ندارد؛ انتخاب خدمت و آرایشگر فقط داخل مسیر رزرو احراز‌شده انجام می‌شود.

صفحات مستقل Contact و About در نسخه اول الزامی نیستند و محتوای آن‌ها در Home قرار می‌گیرد.

### 5.2 پنل Customer

- داشبورد با نزدیک‌ترین/آخرین رزرو و سه نوبت آخر
- تاریخچه کامل نوبت‌ها
- جزئیات نوبت، رسید و شناسه پرداخت
- ثبت و پیگیری BookingRequest
- لغو و جابه‌جایی مطابق Rule
- نمایش موجودی Wallet بدون تاریخچه کامل Ledger
- پروفایل، شماره موبایل، تصویر و روش‌های ورود
- اعلان‌های عمومی

صفحه مستقل تاریخچه تراکنش بانکی حذف شده است.

### 5.3 پنل Stylist

- داشبورد نوبت جاری و ادامه روز
- تقویم روزانه، هفتگی و ماهانه
- درخواست‌های Proposed منتسب و پیشنهاد زمان؛ Requested پیش از پرداخت در Inbox آرایشگر نمایش داده نمی‌شود
- ثبت نوبت دستی
- برنامه کاری، Block و استثناها
- Completed/NoShow و مدیریت نوبت‌های خود
- نمونه‌کارهای خود
- اعلان‌های عملیاتی/عمومی قابل مشاهده؛ Stylist اعلان درون‌سامانه دستی ایجاد نمی‌کند و فقط SMS دستی مشتری مرتبط را دارد

### 5.4 پنل OwnerAdmin

- یک حساب، یک Session، یک پوسته و یک ناوبری؛ Role Switch، Impersonation یا Workspace جدا برای «آرایشگر/مدیر» وجود ندارد.
- صفحات عملیاتی مشترک مانند تقویم، نوبت‌ها و درخواست‌ها یک نسخه دارند و Scope داخل همان صفحه بین «من / یک آرایشگر / همه سالن» تغییر می‌کند؛ تغییر Scope تغییر Actor یا مجوز پایه نیست.
- Directory مشتریان همیشه سراسری است و «مرتبط با من» فقط Filter است.
- Action Center سراسری مستقل از Scope، Requestedهای نیازمند اقدام، پرداخت‌های Under Review و هشدارهای حیاتی را همیشه قابل مشاهده و Deep Link می‌کند.
- کاربران و آرایشگران، خدمات و Pricing Rules، برنامه‌ها، Payment/Reconciliation، Wallet/Ledger، گزارش‌ها، Portfolio، محتوای عمومی، اعلان‌های عمومی/شخصی دستی، SMS و تنظیمات زیر گروه «مدیریت سالن» در دسترس‌اند.
- Audit خام/Stack Trace الزام صفحه اصلی پنل نیست؛ Rival فقط هشدارهای حیاتی و رخدادهای عملیاتی قابل اقدام را نمایش می‌دهد.

---

## 6. معماری زمان‌بندی

### 6.1 اصل Resource

زمان به Stylist تعلق دارد. هر Stylist یک Timeline مستقل با ظرفیت هم‌زمان یک نفر دارد و همه Serviceهای او همان Timeline را مصرف می‌کنند. هیچ تقویم مستقلی برای Service ساخته نمی‌شود.

کوچک‌ترین واحد مفهومی 30 دقیقه است. مدت Appointment می‌تواند چند Slot پیوسته باشد. اگر مدت لازم پیوسته آزاد نیست، زمان شروع نباید نمایش داده شود.

### 6.2 برنامه کاری

Default سالن: شنبه تا پنج‌شنبه، 08:00 تا 19:00؛ جمعه تعطیل. این فقط الگوی اولیه Stylist است. هر Stylist می‌تواند:

- روز و ساعت کاری مستقل داشته باشد.
- چند بازه کاری در یک روز ثبت کند.
- یک روز یا بخشی از روز را ببندد.
- روز تعطیل را استثنائاً باز کند.
- ساعت یک تاریخ خاص را تغییر دهد.
- برای Block شخصی خود ReleaseAt تعیین کند؛ پس از آن زمان فقط در صورت نبود مانع دیگر بازه دوباره قابل رزرو می‌شود.

OwnerAdmin علاوه بر مدیریت برنامه همه Stylistها، می‌تواند برای یک یا چند Service و TargetDateRange مقدار BookableFrom تعیین کند تا رزرو آن خدمت برای تاریخ‌های هدف تا زمان مشخص بسته بماند. این قاعده سراسری خدمت است و Stylist حق تغییر آن را ندارد.

تعطیلات رسمی از داده/سرویس سالانه دریافت می‌شود و OwnerAdmin امکان اصلاح دارد.

اولویت Ruleها از بالا به پایین:

1. Block/Open دستی بازه خاص
2. ساعت ویژه تاریخ
3. تعطیلی رسمی
4. برنامه هفتگی Stylist
5. Default سالن

### 6.3 سه نوع Service Scheduling

| نوع | ورودی Customer | اقدام سالن | زمان اشغال می‌شود؟ |
|---|---|---|---|
| Fixed | خدمت + Stylist + روز و زمان دقیق | نیاز به تأیید Stylist ندارد | هنگام پرداخت Hold؛ پس از موفقیت Occupied |
| Proposed | خدمت + Stylist + بازه ترجیحی در افق یک‌ماهه | Stylist منتخب زمان دقیق و مبلغ نهایی را تعیین می‌کند | فقط پس از انتشار پاسخ، یک Hold سه‌ساعته |
| Requested | فقط خدمت مرکب؛ بدون Stylist و Time اولیه | فقط OwnerAdmin برای اجزای Fixed/Proposed، Stylist + Time + Fee تعیین می‌کند | Draft ظرفیت را اشغال نمی‌کند؛ هنگام انتشار همه زمان‌ها اتمیک ۳ ساعت Hold می‌شوند |

مدل Appointment ظرفیت‌دار حذف شده است. تعداد BookingRequestها ظرفیت Timeline محسوب نمی‌شود.

### 6.4 وضعیت زمان

- `Free`: قابل تخصیص
- `Held`: موقتاً قفل‌شده
- `Occupied`: متعلق به Appointment قطعی
- `Blocked`: بسته‌شده بدون Appointment

Hold پرداخت Fixed پنج دقیقه است. پاسخ Proposed توسط Stylist و پاسخ Requested توسط OwnerAdmin مهلت پرداخت سه‌ساعته دارند. در Requested تمام زمان‌های بسته به‌صورت همه‌یا‌هیچ برای همان ۳ ساعت Hold می‌شوند؛ انقضا/لغو همه Holdهای پاسخ را آزاد می‌کند.

### 6.5 تغییر برنامه دارای رزرو

پیش از اعمال تغییر، سیستم Appointmentهای متاثر، Customerها و پیامد مالی را نشان می‌دهد. پس از تأیید:

- نوبت‌ها `CancelledBySystem` می‌شوند.
- زمان آزاد می‌شود.
- سهم مبلغ به Wallet برمی‌گردد.
- SMS Customer و اعلان عملیاتی لازم ارسال می‌شود.

---

## 7. موجودیت‌ها و روابط سطح دامنه

### هسته هویتی

- `User`
- `CustomerProfile`
- `StylistProfile`
- `UserCredential` / Passkey
- `UserStatusHistory`

### خدمات و زمان

- `Service`
- `StylistService`
- `StylistWeeklySchedule`
- `ScheduleException`
- `OfficialHoliday`
- `TimeBlock`
- `TimeHold`

### رزرو

- `BookingRequest`
- `Appointment`
- `BookingChain`
- `AppointmentChangeHistory`
- `RecurringBookingSeries`
- `RecurringOccurrence`

### مالی

- `ReservationFeeRule`
- `CheckoutOrder`
- `CheckoutOrderItem`
- `Payment`
- `PaymentAttempt`
- `PaymentComponent`
- `WalletAccount`
- `WalletLedgerEntry`
- `RefundOperation` برای ثبت بازپرداخت دستی ادمین

### محتوا و عملیات

- `PortfolioItem`, `PortfolioImage`
- `Announcement`
- `Notification`, `SmsDeliveryAttempt`
- `AuditLog`
- `ApplicationError`
- `SystemSetting`

روابط کلیدی:

- هر Appointment دقیقاً یک Customer، Stylist و Service دارد.
- هر Stylist می‌تواند چند Service ارائه کند.
- BookingRequest ممکن است پس از پذیرش به یک Appointment منجر شود.
- Booking Chain تاریخچه جابه‌جایی یک تعهد مالی/رزروی را حفظ می‌کند.
- Payment می‌تواند چند Component از Wallet و Gateway داشته باشد.
- Ledger Entry حذف یا ویرایش نمی‌شود؛ اصلاح با Entry معکوس انجام می‌شود.

---

## 8. وضعیت‌ها و گذارها

### 8.1 AppointmentStatus

| وضعیت | معنی | وضعیت نهایی؟ |
|---|---|---:|
| PendingPayment | زمان Hold و پرداخت در جریان | خیر |
| Reserved | پرداخت/ثبت دستی موفق و زمان قطعی | خیر |
| Completed | خدمت انجام‌شده یا تکمیل خودکار | بله، جز مهلت NoShow |
| CancelledByCustomer | لغو Customer | بله |
| CancelledByStylist | لغو Stylist | بله |
| CancelledBySystem | لغو Admin/System | بله |
| PaymentFailed | پرداخت ناموفق | بله |
| Expired | Hold/پیشنهاد منقضی | بله |
| NoShow | عدم حضور | بله |

گذارهای اصلی:

- PendingPayment → Reserved / PaymentFailed / Expired
- Reserved → Completed / CancelledByCustomer / CancelledByStylist / CancelledBySystem / NoShow
- Completed → NoShow فقط تا پایان مهلت ثبت نتیجه همان روز

هیچ وضعیت نهایی به Reserved بازنمی‌گردد. جابه‌جایی Status جدا نیست.

### 8.2 BookingRequestStatus

`PendingReview`, `Contacting`, `Proposed`, `Accepted`, `Rejected`, `Cancelled`, `Expired`.

### 8.3 PaymentStatus

`Created`, `Pending`, `Succeeded`, `Failed`, `Expired`, `UnderReview`, `Reconciled`, `Reversed`.

---

## 9. جریان‌های رزرو

### 9.1 Fixed

ورود → انتخاب Service → انتخاب Stylist → مشاهده Availability → انتخاب زمان → خلاصه و قوانین → Hold پنج‌دقیقه‌ای → Wallet/Gateway → Verify → Appointment Reserved → SMS.

اگر فقط یک Stylist ارائه‌دهنده باشد، مرحله انتخاب او خودکار رد می‌شود. اگر Duration کامل و پیوسته آزاد نباشد، زمان شروع نمایش داده نمی‌شود.

### 9.2 Proposed

انتخاب Service و Stylist و روز/بازه ترجیحی → BookingRequest → بررسی Stylist → تعیین Start/End و FinalReservationFee → Availability Check → Hold سه‌ساعته → لینک/CTA پرداخت → Verify → Appointment Reserved یا انقضا و آزادسازی.

### 9.3 Requested

انتخاب خدمت Requested مرکب بدون Stylist/Time → BookingRequest فقط برای OwnerAdmin → مدیرکل Draft پایدار پاسخ را با چند جزء Service + Stylist + Time + FinalReservationFeeSnapshot آماده می‌کند → در زمان ارسال، اعتبارسنجی اتمیک همه اجزا و Hold همه‌یا‌هیچ ۳ساعته → مشتری کل پیشنهاد را پرداخت یا لغو می‌کند → Verify موفق → برای هر جزء یک Appointment مستقل و اتمیک ساخته می‌شود. پس از قطعی‌شدن، لغو هر Appointment مستقل است و جابه‌جایی مشتری بر اساس نوع خدمت پایه همان جزء است: Fixed طبق قواعد عادی، Proposed ممنوع.

### 9.4 رزرو دستی

Stylist برای خودش و OwnerAdmin برای همه می‌توانند Customer را با شماره موجود پیدا یا حساب ایجاد کنند و Appointment بسازند. پرداخت آنلاین الزامی نیست. Overrideهای مجاز:

- فاصله حداقلی تا شروع
- افق یک‌ماهه
- روز/ساعت خدمت
- تعطیلی رسمی یا شخصی

موارد غیرقابل Override:

- تداخل زمان Stylist
- تداخل Appointmentهای خود Customer
- یکپارچگی داده و وضعیت مالی

---

## 10. هم‌زمانی و Double Booking

الزام: در هیچ شرایطی دو Hold/Appointment فعال روی بازه مشترک یک Stylist وجود نداشته باشد.

کنترل باید چندلایه باشد:

- Availability Check در Application Layer
- Transaction boundary هنگام Hold/Confirm
- Constraint یا الگوی قفل قابل اتکا در Database
- Concurrency Token
- Idempotency Key برای ایجاد Hold، Payment و Callback
- Job امن برای Expireکردن Hold

مشتری دوم در زمان Hold پیام می‌بیند که زمان موقتاً توسط شخص دیگری در حال پرداخت است و پس از انقضا می‌تواند دوباره تلاش کند.

---

## 11. Reservation Fee و Pricing

Service قیمت نهایی خدمت را در Rival تعیین نمی‌کند. مبلغ آنلاین، هزینه رزرو زمان است و باقی هزینه خدمت حضوری پرداخت می‌شود.

مدل قیمت‌گذاری هزینه رزرو طبق تصمیم نهایی فاز ۵ لایه‌ای است:

- `EffectiveBaseFee`: پایه عمومی `BaseReservationFee` یا `BaseFeeOverride` معتبر برای زمان نوبت
- `ServiceFactor`: ضریب خدمت؛ پیش‌فرض ۱
- `BarberFactor`: ضریب آرایشگر؛ پیش‌فرض ۱
- مبلغ استاندارد: `EffectiveBaseFee × ServiceFactor × BarberFactor`

برای Proposed، سیستم مبلغ پیشنهادی را محاسبه می‌کند و Stylist مبلغ نهایی رزرو را هنگام پاسخ تعیین می‌کند. برای Requested، همین محاسبه برای هر جزء انجام و OwnerAdmin مبلغ نهایی هر جزء را تعیین می‌کند؛ مجموع Snapshot اجزا مبلغ Checkout گروهی است. Ruleها و ورودی‌های قیمت هر Appointment جداگانه Snapshot می‌شوند و Override تاریخی مبهم/هم‌پوشان مجاز نیست.

مالیات، هزینه اضافی و کد تخفیف در محدوده فعلی نیست.

---

## 12. Payment و Reconciliation

درگاه‌های هدف زرین‌پال و بلوپی‌اند. درگاه اصلی بعداً انتخاب می‌شود.

قواعد:

- رزرو Customer بدون پرداخت کامل هزینه رزرو قطعی نمی‌شود.
- Appointment دستی می‌تواند بدون Online Payment قطعی شود.
- موفقیت فقط پس از Verify سمت سرور معتبر است.
- Redirect کاربر مدرک موفقیت نیست.
- Callback تکراری نباید اثر مالی یا رزروی تکراری بسازد.
- تراکنش نامشخص `UnderReview` می‌شود و امکان استعلام خودکار و بررسی Admin دارد.
- اگر پرداخت تایید شد و زمان هنوز آزاد بود، Appointment قطعی می‌شود.
- اگر پرداخت تایید شد ولی زمان از دست رفته بود، Appointment متداخل ساخته نمی‌شود و مبلغ پس از Reconciliation به Wallet منتقل می‌شود.

Payment Componentها می‌توانند Wallet و Gateway باشند. جمع Componentهای موفق باید دقیقاً برابر Fee Snapshot باشد.

---

## 13. Wallet Ledger

### 13.1 ماهیت

Wallet حساب بانکی نیست؛ Reservation Credit غیرقابل برداشت و غیرقابل انتقال است. Customer نمی‌تواند درخواست برداشت مستقیم بدهد یا آن را شارژ کند. موجودی فقط برای هزینه رزرو مصرف می‌شود و انقضا ندارد.

### 13.2 مصرف

سیستم ابتدا به‌صورت خودکار Wallet را تا حد ممکن مصرف می‌کند. اگر کافی نبود، باقی‌مانده به Gateway می‌رود. مبلغ Wallet تا نتیجه Gateway Held است؛ در موفقیت Debit و در شکست/Timeout Release می‌شود.

### 13.3 Ledger

Source of Truth مجموعه Ledger Entryهاست. Balance Cache مجاز است، ولی باید با Ledger قابل بازسازی باشد. Entry مالی حذف/ویرایش مستقیم نمی‌شود؛ Reversal ساخته می‌شود.

Admin Adjustment:

- افزایش برای هدیه، جشنواره یا اصلاح مستند.
- کاهش برای ثبت بازپرداخت دستی یا اصلاح مستند.
- دلیل، انجام‌دهنده و رابطه با عملیات اصلی الزامی است.

Customer فقط Balance را می‌بیند؛ OwnerAdmin Ledger کامل را می‌بیند.

---

## 14. لغو، جابه‌جایی و NoShow

### 14.1 جدول سیاست Customer

| زمان باقی‌مانده | لغو | بازگشت به Wallet | جابه‌جایی |
|---|---|---:|---|
| بیش از 24 ساعت | مجاز | کل سهم Appointment | بدون هزینه و بدون محدودیت تعداد |
| 24 تا 3 ساعت | مجاز | صفر | فقط یک‌بار در Booking Chain؛ Eligibility دائماً Forfeited |
| کمتر از 3 ساعت | مجاز | صفر | ممنوع |
| پس از زمان / NoShow | نامرتبط | صفر | ممنوع |

مقادیر 24 و 3 ساعت تنظیم‌پذیرند، اما Snapshot رزرو قبلی تغییر نمی‌کند.

### 14.2 جلوگیری از دورزدن

Late Reschedule در Booking Chain ذخیره می‌شود. انتقال نوبت نزدیک به تاریخی دورتر، امکان Wallet Credit را بازنمی‌گرداند.

### 14.3 اقدام کسب‌وکار

- Reschedule توسط Stylist/Admin سهم Customer را مصرف نمی‌کند.
- پس از Business Reschedule، Customer حق لغو با بازگشت کامل سهم به Wallet دارد.
- لغو Stylist/Admin/System همیشه سهم Appointment را به Wallet برمی‌گرداند.
- تغییر Stylist مستقیم ممنوع؛ Cancel + New Appointment لازم است.

### 14.4 NoShow و Completion

Appointment پس از EndAt خودکار Completed می‌شود. Stylist تا پایان همان روز می‌تواند آن را با ثبت Audit به NoShow تغییر دهد. NoShow شمارش می‌شود، اما فعلاً باعث مسدودی خودکار یا جریمه اضافه نمی‌شود؛ هزینه رزرو برنمی‌گردد.

---

## 15. رزرو دوره‌ای، Checkout چندنوبتی و چندخدمتی

### 15.1 دوره‌ای

- فقط برای Fixed در محدوده فعلی.
- حداقل 3 رخداد تا حداکثر شش ماه.
- الگوی هر چند هفته یک‌بار و انتخاب دستی تاریخ‌ها.
- در تعارض، نزدیک‌ترین زمان بر اساس کمترین اختلاف مطلق پیشنهاد می‌شود.
- کل فهرست پیش از Hold/Payment به Customer نمایش داده و تأیید می‌شود.
- هر رخداد Appointment مستقل است.
- Customer یک رخداد را مدیریت می‌کند؛ Admin می‌تواند یک رخداد، ادامه دوره یا کل دوره را مدیریت کند.

### 15.2 مبلغ دوره

تصمیم نهایی فاز دوم: هزینه هر رخداد دوره‌ای مانند یک Appointment عادی و مستقل محاسبه می‌شود.

- Pricing Engine برای هر رخداد با تاریخ، Service و Stylist همان رخداد اجرا می‌شود.
- مبلغ نهایی هر رخداد در `ReservationFeeSnapshot` خودش ذخیره می‌شود.
- مبلغ Checkout برابر مجموع Snapshot تمام رخدادهاست.
- مثال: چهار رخداد عادی با هزینه ۲۰۰ هزار تومان، مجموعاً ۸۰۰ هزار تومان هزینه دارند.
- اگر یک رخداد مشمول قیمت ویژه تاریخ یا Rule با اولویت بالاتر باشد، مبلغ ویژه فقط برای همان رخداد محاسبه و با سایر رخدادها جمع می‌شود.
- Wallet Credit یا سوخت مبلغ در لغو هر رخداد فقط بر اساس Snapshot همان Appointment است.
- تغییر تنظیمات Pricing پس از پرداخت، مبلغ هیچ رخداد قبلی را بازنویسی نمی‌کند.

### 15.3 چندخدمتی

انتخاب چند Service به معنی چند Appointment مستقل است. هر Appointment می‌تواند Stylist متفاوت و زمان متفاوت داشته باشد. تداخل زمانی Appointmentهای یک Customer ممنوع است. پکیج ساختار مستقل ندارد و مانند Service مدیریت می‌شود.

---

## 16. حساب کاربری و احراز هویت

ثبت‌نام: نام، نام خانوادگی و شماره موبایل. روش‌ها:

1. Passkey به‌عنوان روش ترجیحی پس از ثبت حساب
2. OTP پیامکی برای ورود/ثبت‌نام و Recovery
3. Password اختیاری به‌عنوان روش جایگزین

Customer می‌تواند شماره را با OTP قدیم و جدید تغییر دهد. در نبود شماره قدیم، فقط فرآیند امن Admin. امکان چند Passkey، نام دستگاه و حذف Credential باید در طراحی Identity پیش‌بینی شود.

وضعیت حساب:

| Status | ورود | رزرو جدید | اعمال‌کننده |
|---|---:|---:|---|
| Active | ✓ | ✓ | Admin/System |
| Disabled | ✓ | ✗ | Admin |
| SoftDeleted | ✗ | ✗ | Admin؛ طبق تصمیم فعلی غیرقابل بازگشت |

Blocked وجود ندارد. Customer حذف حساب را مستقیماً درخواست نمی‌کند. سوابق رزرو و مالی حذف فیزیکی نمی‌شوند.

---

## 17. خدمات و محتوا

Service به‌صورت Dynamic توسط OwnerAdmin ساخته، فعال/غیرفعال و به Stylistها تخصیص داده می‌شود. داده اولیه در Seed/HasData فاز توسعه تکمیل می‌شود. فهرست اولیه مورد انتظار:

- اصلاح سر و صورت
- فیشیال
- دامادی
- کراتین و پروتئین مو
- اصلاح ریش

هر Service: عنوان، توضیح، تصویر، SchedulingType، Duration یا تنظیمات درخواست، محدودیت زمانی و وضعیت فعال دارد. Fixed/Proposed می‌توانند به Stylistها نگاشت شوند؛ Requested از یک یا چند خدمت فعال Fixed/Proposed تشکیل می‌شود، مستقیم به Stylist واحد نگاشت نمی‌شود و Requested تودرتو مجاز نیست.

Portfolio: عنوان، تصویر اصلی، حداکثر پنج تصویر، Service مرتبط، مالک/Stylist مرتبط و Visible flag. ویدئو، دسته‌بندی جداگانه و Watermark خودکار لازم نیست. تصاویر به فرمت امن وب تبدیل و نسخه بهینه‌شده حداکثر 1MB باشد.

اطلاعات عمومی فعلی:

- نام: ریوال
- تلفن: 09148801286
- آدرس: خیابان حافظ، روبه‌روی بانک پاسارگاد، طبقه اول
- Instagram: `rival_mensclub`
- رنگ‌ها: طوسی، مشکی و سفید
- سبک: Modern

مختصات نشان، متن معرفی، فونت، لوگوی نهایی و محتوای اولیه در مرحله محتوا/UI تکمیل می‌شود.

---

## 18. اعلان‌ها

| رویداد | Customer | Stylist | OwnerAdmin |
|---|---|---|---|
| رزرو موفق | SMS | اعلان مرتبط | در داده عملیاتی |
| Payment Failed/Unknown | SMS/پیام وضعیت | اعلان | اعلان بررسی |
| یادآوری 24 و 3 ساعت | SMS | — | — |
| Reschedule | SMS | اعلان | Audit/اعلان لازم |
| Cancel توسط Customer | — | اعلان | قابل مشاهده |
| Cancel توسط Business/System | SMS | اعلان لازم | قابل مشاهده |
| SMS نهایی ناموفق | — | — | هشدار |

ارسال SMS شکست‌خورده چهار بار با فاصله 30 دقیقه Retry می‌شود. نتیجه تلاش‌ها ثبت می‌شود. اعلان‌های درون‌سامانه شخصی/عمومی در مرکز اعلان هر نقش با Read/Unread نگهداری می‌شوند. فقط OwnerAdmin مجاز به ایجاد اعلان درون‌سامانه دستی یا عمومی است؛ Stylist فقط SMS دستی مشتری مرتبط می‌فرستد. اعلان‌های خودکار سامانه برای رویدادهای رزرو/پرداخت/تغییر پابرجا هستند.

---

## 19. Audit، لاگ و نگهداری

Audit لازم برای:

- ایجاد، تغییر، لغو و Override Appointment
- تغییر وضعیت Payment و Reconciliation
- Hold/Release و Adjustmentهای Wallet
- تغییر برنامه و Block
- تغییر Pricing Rule و تنظیمات
- تغییر نقش یا Account Status
- SMS دستی
- Business Reschedule و اصلاح Completed به NoShow

Audit باید Actor، زمان UTC، عملیات، موجودیت، Before/After یا Diff، دلیل و CorrelationId داشته باشد و Immutable باشد.

تصمیم نگهداری فعلی:

- Appointment و Payment: نامحدود تا تعیین سیاست قانونی
- Account SoftDeleted: رکوردهای ضروری نامحدود
- Audit Log و خطاهای فنی: 1 ماه
- نتیجه SMS: 7 روز
- Session: کوتاه‌مدت و مطابق سیاست امنیتی، نه نگهداری تاریخی

Audit مالی/امنیتی با حساسیت بالا بهتر است در فاز Security از نگهداری عمومی جدا و طولانی‌تر شود؛ این یک توصیه فنی برای بازبینی است. نمایش Audit خام و جزئیات فنی کامل در پنل Rival الزام نسخه اصلی نیست؛ OwnerAdmin فقط هشدارهای حیاتی و رخدادهای عملیاتی قابل اقدام را نیاز دارد.

---

## 20. تاریخ، زبان و UX

- تمام Timestampها در Database به UTC.
- نمایش با Time Zone تهران.
- تاریخ در UI شمسی و ساعت 24 ساعته.
- رابط فقط فارسی، RTL کامل و اعداد نمایشی فارسی.
- طراحی Mobile-first و رزرو با حداقل مراحل.
- هدف WCAG 2.1 AA برای صفحات اصلی و رزرو.
- قوانین رزرو پیش از پرداخت لینک می‌شوند؛ پرداخت به‌منزله پذیرش است.

---

## 21. الزامات غیرعملکردی

### عملکرد

- Home روی اینترنت موبایل: هدف کمتر از 3 ثانیه.
- نمایش Availability: هدف کمتر از 5 ثانیه.
- بار اولیه تاییدشده: 5 کاربر هم‌زمان؛ معماری بدون وابستگی به این سقف طراحی شود.

### سازگاری

- حداقل دو نسخه آخر Chrome و Safari موبایل.
- رفتار پایه دسکتاپ Responsive باشد؛ دامنه رسمی مرورگرها در تست تکمیل می‌شود.

### Backup

- روزانه در پایان روز.
- نگهداری 30 روز.
- خارج از سرور اصلی.
- تست بازیابی ماهانه.
- داده حیاتی: Customer، Appointment، Payment و Wallet Ledger.

### امنیت

- Policy-based Authorization
- Anti-forgery، XSS encoding و Input Validation
- Rate Limiting برای OTP و عملیات حساس
- Secure Cookie و مدیریت Session
- Hash استاندارد Password
- Verify سمت سرور Payment
- Idempotency و Anti-replay
- Secret Management خارج از کد
- عدم Logکردن OTP، Token و PII غیرضروری
- Upload امن تصاویر

---

## 22. معماری فنی منتخب

### Stack

- ASP.NET Core MVC
- C#
- Razor Views
- Tailwind CSS
- Alpine.js و htmx
- Entity Framework Core برای Write/Command
- Dapper برای Read/Query
- ASP.NET Core Identity با توسعه OTP/Passkey

### سبک معماری

Modular Monolith با لایه‌های:

- Domain
- Application
- Infrastructure
- Web

Business Logic در Domain/Application است؛ Controller و View نازک می‌مانند. EF و Dapper هر دو باید از قوانین Authorization و Transaction Boundary تبعیت کنند.

### ماژول‌های منطقی

Identity، Customers، Stylists، Services، Scheduling، BookingRequests، Appointments، Recurrence، Pricing، Payments، Wallet، Notifications، Portfolio، Audit و Settings.

### اصول داده

- Money با واحد ثابت و مستند و بدون float.
- UTC برای Timestamp.
- Soft Delete فقط جایی که Business Rule لازم دارد.
- Concurrency Token روی منابع رزروی و مالی.
- Outbox/Job قابل اتکا برای SMS و کارهای پس‌زمینه.
- Ledger و Audit append-only.

---

## 23. معیارهای پذیرش کلیدی

1. دو Customer هم‌زمان یک زمان را انتخاب می‌کنند؛ فقط یکی Hold می‌گیرد و دیگری پیام زمان موقتاً اشغال می‌بیند.
2. Hold Fixed پس از پنج دقیقه بدون پرداخت آزاد و Wallet Hold نیز Release می‌شود.
3. Service شصت‌دقیقه‌ای فقط با دو Slot نیم‌ساعته پیوسته نمایش داده می‌شود.
4. BookingRequest به‌تنهایی Availability را کاهش نمی‌دهد.
5. پیشنهاد Proposed پیش از ارسال لینک پرداخت Hold معتبر دارد.
6. Callback تکراری فقط یک Payment و یک Appointment موثر می‌سازد.
7. Early Cancellation سهم Appointment را یک بار به Wallet برمی‌گرداند.
8. Late Cancellation هیچ Credit ایجاد نمی‌کند.
9. Late Reschedule Eligibility را در تمام Booking Chain برای همیشه Forfeited می‌کند.
10. Business Reschedule حق لغو همراه Credit را برای Customer ایجاد می‌کند.
11. Wallet + Gateway در شکست Gateway هیچ اعتباری را از بین نمی‌برد.
12. تغییر برنامه، Appointmentهای متاثر و پیامد مالی را پیش از تأیید نشان می‌دهد.
13. Appointmentهای یک Customer—even با Stylist متفاوت—نمی‌توانند هم‌پوشان باشند.
14. لغو یک رخداد دوره‌ای فقط `ReservationFeeSnapshot` همان رخداد را Credit یا Forfeit می‌کند.
15. Disabled می‌تواند وارد شود ولی رزرو نمی‌کند؛ SoftDeleted نمی‌تواند وارد شود.

---

## 24. تصمیمات منتقل‌شده به فازهای بعد

| موضوع | فاز تصمیم | محدودیت فعلی |
|---|---|---|
| مدل Persistکردن Slotهای آزاد | Domain Model/Database | Invariant هم‌پوشانی تغییر نمی‌کند |
| درگاه اصلی و Callback دقیق | Integration | Verify، Idempotency و Reconciliation الزامی است |
| Provider تعطیلات رسمی | Integration | Admin باید امکان اصلاح داشته باشد |
| Hosting و محیط‌ها | Deployment | Dev/Staging/Prod پیشنهاد می‌شود |
| سیاست قانونی نگهداری | Security/Legal | داده مالی فعلاً حذف فیزیکی نشود |
| دارایی برند و متن‌ها | UI/Content | ساختار صفحات تثبیت شده است |
| زمان و بودجه انتشار | Planning | پروژه نسخه اصلی است، نه MVP محدود |

---

## 25. الحاقیه تصمیم فاز دوم

ابهام قبلی درباره تخصیص یک هزینه واحد به رخدادهای دوره‌ای بسته شد. طبق تصمیم تأییدشده فاز دوم، هر Appointment هزینه مستقل خود را دارد و Checkout فقط جمع‌کننده مبالغ Snapshotشده رخدادهاست. این تصمیم جایگزین کامل پیشنهاد قبلی «تقسیم مساوی یک هزینه کل» است.

فاز اول بدون تصمیم استنتاجی مالی باز باقی نمانده و برای استفاده در تحلیل دامنه، User Flow، Wireframe و طراحی فنی آماده است.

---

## همگام‌سازی نسخه ۱٫۱ با فاز ۸

تصمیم‌های زیر جایگزین متن قدیمی متعارض در همین سند هستند:

- `Requested`: از درخواست تک‌آرایشگر به خدمت مرکب فقط-مدیرکل تغییر کرد؛ Customer در ثبت اولیه Stylist/Time انتخاب نمی‌کند.
- `Proposed/Requested Hold`: قاعده قدیمی ۶۰ دقیقه حذف و مهلت ۳ساعته پاسخ تثبیت شد؛ Requested همه اجزا را اتمیک Hold می‌کند.
- `ReleaseAt / BookableFrom`: آزادسازی برنامه‌ریزی‌شده Block شخصی Stylist و پنجره بازشدن رزرو خدمت توسط OwnerAdmin افزوده شد.
- افق: Fixed/Proposed یک ماه، Recurring Fixed شش ماه، Requested بدون افق انتخاب زمان توسط Customer.
- اعلان دستی: In-App دستی فقط OwnerAdmin؛ Stylist فقط SMS دستی مرتبط.
- OwnerAdmin UX: یک پوسته/Session/Actor، صفحات مشترک Scope‌پذیر و Action Center سراسری؛ این تغییر UX مجوزهای پایه را تغییر نمی‌دهد.

نسخه‌های رسمی قواعد/مجوز/Story که این تصمیم‌ها را دقیق‌تر تعریف می‌کنند: Phase 5 v1.3، Phase 6 v1.2، Phase 7 v1.1 و Phase 8 v1.0.
```

## 4. وضعیت پایان این Handoff

- این فایل Current Truth فاز را تا پایان ۹-۱ و بازبینی بین‌فازی ۱ اکتبر ۲۰۲۶ یکپارچه می‌کند.
- Ruleهای منسوخ فقط در Source Archive برای Traceability باقی مانده‌اند و فعال نیستند.
- Reports/KPI subsystem از Scope محصول حذف شده است.
- روش تأمین تعطیلات رسمی و اثر Automatic holiday-source update بر Appointmentهای ازقبل قطعی‌شده به فازهای Backend/Domain آینده منتقل شده است.
- فاز ۱۰ هنوز شروع نشده و شروع آن فقط با دستور صریح مالک محصول است.
