# اصلاحات بازبینی رزرو و یکپارچه‌سازی نتیجه پرداخت

## Owner follow-up: shadow clearance and responsive alignment

This clarification supersedes the earlier 32px rail paint clearance and viewport-centered payment header in this record. The rail now reserves 64px for shadow painting with a compensating -32px block-end margin, preserving the existing card-to-dots layout gap and navigation clearance. The long label/left amount flex layout is desktop-only (1024px+); mobile uses its original block/RTL summary. PAY-RES desktop header occupies the main content column and is centered against that column, matching the result body, not the viewport. The returned-credit badge background is transparent so it no longer paints a rectangular cutoff over the icon shadow. No animation, product state, data fixture or approval record was changed.

Comparisons: BK-01/BK-02 preserve the previously reviewed rail composition with extra paint clearance only; BK-F02 mobile restores its stacked right-aligned summary while desktop retains the requested long-value wrap; PAY-RES sms heading aligns with the result-content column; PAY-RES returned preserves the icon and text hierarchy without the opaque badge surface interrupting the shadow. Exact source references and approved desktop briefs are linked in the comparisons below; latest owner annotations control these four differences.

Additional regression checks cover mobile block layout at 390/768, the transparent returned badge at 390/1280, content-column heading center and 64px rail clearance. Current captures: payment-mobile-390/768 and returned-shadow-390/1280 under tests/screens/review-polish. The normal and reduced-motion fallbacks are preserved. A visual-suite timing race on a legacy redirect was observed once; inspection now waits for the canonical destination page identity before its ready/layout checks. No physical-device retest or FPS measurement is claimed.


## دامنه دستور مالک

۱۵ اشاره مالک شامل سایه و نقطه‌های ریل موبایل، هاله پیشرفت، مبلغ طولانی، شعاع تصویر پکیج، محوشدگی تصویر دوره‌ای، انتخاب روز، عنوان‌های دسکتاپ و حذف/انتقال موارد تکراری پیش‌نمایش است. فاز جدیدی آغاز نشده و پذیرش فاز ۰۳ تغییر نکرده است.

## تغییرات رابط

- پایین ریل خدمت و آرایشگر ۳۲ پیکسل فضای سایه دارد. نقطه‌ها ۸ پیکسل فاصله بالا و ۱۶ پیکسل پایین دارند؛ سند ارتفاع ناوبری، ۱۶ پیکسل فاصله و safe area را رزرو می‌کند. در انتهای اسکرول نقطه‌ها بالای ناوبری باقی می‌مانند.
- هاله داخل یک پوشش محدود به بخش پرشده progress است. نوار روشن از بیرون راست به بیرون چپ حرکت می‌کند؛ در دو انتهای چرخه کاملاً خارج پوشش است و بازگشت حلقه دیده نمی‌شود. حرکت فقط transform، مدت چهار برابر توکن deliberate و easing خطی است. reduced motion هاله را حذف می‌کند و progress معنایی باقی می‌ماند. هیچ حلقه JavaScript یا وابستگی جدید اضافه نشده است؛ اندازه‌گیری FPS ادعا نشده است.
- خلاصه پرداخت با flex-wrap، عبارت را در راست و مبلغ را در چپ نگه می‌دارد. وقتی عرض مجموع کافی نیست، مبلغ به ردیف بعد می‌رود و چپ‌چین باقی می‌ماند؛ شکستن مبلغ به عدد و واحد تحمیل نمی‌شود.
- شعاع تصویر پکیج موبایل ۲۲ پیکسل، همان شعاع کادر متن موجود است. این دستور مستقیم مالک، شعاع ۲۸ قبلی را جایگزین می‌کند.
- عکس کارت دوره‌ای از grid-area قدیمی خارج شد. عرض ۴۲٪ قبلاً به ستون ۴۲٪ اعمال می‌شد و در عمل حدود ۱۷٫۶٪ کارت بود؛ اکنون ۴۲٪ کل کارت است. ۶۵٪ ابتدایی تصویر کاملاً دیده می‌شود و فقط انتهای آن محو می‌شود؛ دسکتاپ تحت این اصلاح موبایل نیست.
- روز انتخاب‌شده در ویرایشگر موبایل، پس‌زمینه جوهری، متن روشن و خط انتخاب ۲ پیکسلی دارد. native radio، گروه نام مشترک و ترتیب صفحه‌کلید حفظ است؛ انتخاب جدید، قبلی را لغو می‌کند.
- عنوان انقضای نگه‌داشت در دسکتاپ وسط صفحه است. بررسی پرداخت از مسیر قدیمی STATE-05 به PAY-RES می‌رود و عنوان آن هم با احتساب منوی کناری وسط کل صفحه است.

## فهرست و مالکیت حالت‌ها

PAY-RES یک ردیف اصلی با بررسی اولیه و پنج زیرحالت دارد: ناموفق، زمان از دست‌رفته، موفق، برگشت به اعتبار، اختلال پیامک تأیید. دو زیرحالت تکراری checking/review از فهرست حذف شدند. ردیف مستقل STATE-05 و STATE-06 هم حذف است؛ STATE-07 چون مواردش حذف یا منتقل شده‌اند، ردیف مستقل ندارد. فهرست اکنون ۶۹ ردیف اصلی و ۴۵ زیرحالت دارد.

داده برگشت به اعتبار و پیامک از منبع قبلی به PAY-RES منتقل شده است. داده و markup صفحات اختلال نقشه و ارسال کد حذف شدند؛ اختلال درگاه از همان BK-F02 با state=gateway استفاده می‌کند. هیچ قاعده جدید پول یا برگشت وجه ساخته نشده است.

مسیرهای ثبت‌شده قدیمی برای سازگاری پیوندها حفظ‌اند، ولی طراحی مستقلی ندارند: STATE-05 به PAY-RES checking، STATE-06 به lost/returned متناظر، STATE-07 پیامک به PAY-RES sms و بقیه به BK-F02 gateway هدایت می‌شوند. داده و قالب نتیجه مشترک مصرف می‌شود. این کار تعداد ۷۳ context قرارداد build را تغییر نمی‌دهد. هیچ رکورد تأیید دستی پاک، جابه‌جا یا تأیید مجدد نشده است؛ revision مصرف‌کننده تغییرکرده طبق روال نیازمند بازبینی است.

## مقایسه منبع و اجرا

| مرجع دقیق | مشاهده و اصلاح |
|---|---|
| [BK-01-A](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-A.png) | سایه کارت و نقطه‌ها دو بخش جدا دارند؛ padding کم قبلی سایه را می‌برید. اجرای جدید فضای سایه و فاصله امن ناوبری دارد. کوچک بودن کناره‌ها دستور قبلی مالک است. |
| [BK-02-DEF](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-02-DEF.png) | ریل آرایشگر همان اصلاح سایه/نقطه را مصرف می‌کند. progress در سمت راست پر می‌شود؛ هاله به همان قسمت محدود است و حرکت راست به چپ طبق دستور جدید است. |
| [BK-R01-DEF](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-R01-DEF.png) | سه تصویر و کادرهای نام حفظ‌اند؛ شعاع تصویر با کادر داخلی متن برابر شد. وزن ۶۰۰ و اندازه ۱۳/۱۸ اصلاح بازبینی قبل حفظ‌اند. |
| [BK-REC01-LIST](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-LIST.png) | عکس در انتهای کارت با محوشدگی کوتاه دیده می‌شود؛ محاسبه درصد دوبل قبلی عکس را باریک کرده بود. متن و آواتار در سمت مقابل می‌مانند. |
| [BK-REC01-NEW](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-NEW.png) و [CalendarDayPicker](../design-export/design-system-v2/components/CalendarDayPicker/README.md) | انتخاب روز باید از روزهای آزاد متمایز باشد. حالت جوهری و native radio اکنون انتخاب یگانه را روشن نشان می‌دهند؛ تغییر ماه و reduced motion از قرارداد قبلی پیروی می‌کنند. |
| [PAY-RES](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-CHECK.html) | مالک خواسته موارد تکراری یک‌جا بازبینی شوند؛ فهرست جدید فقط یک مالک اصلی برای نتیجه پرداخت دارد و حالت برگشت اعتبار/پیامک زیر آن است. |

اصل طرح‌ها فقط خوانده شدند. تصاویر مرجع ۷۸۰ پیکسلی برای بوم ۳۹۰ CSS پیکسل هستند. [شواهد اجرا](../tests/screens/review-polish/) در ۳۹۰/۷۶۸/۱۲۸۰ و ارتفاع ۹۰۰، DPR پیش‌فرض ۱ ثبت می‌شود؛ آزمون ریل همچنین ۳۲۰/۵۶۸/۱۰۲۳ را پوشش می‌دهد. هیچ تطبیق پیکسلی دسکتاپ با بوم موبایل یا بازآزمایی فیزیکی ادعا نشده است.

## اعتبارسنجی

[آزمون اختصاصی](../tests/phase03/review-polish.spec.mjs) سایه، فاصله نقطه تا ناوبری در انتهای سند، حرکت و دو انتهای هاله، مبلغ/عبارت طولانی، شعاع برابر، عرض واقعی عکس، انتخاب یگانه روز، وسط‌چین بودن و مالکیت زیرحالت‌ها را بررسی می‌کند. رگرسیون موجود axe، فرم‌ها، کلیدها، مسیرها و ذخیره مستقل تأییدها را پوشش می‌دهد. نتایج نهایی پس از آخرین اجرا ثبت می‌شود.


## Final command evidence

- Initial full root regression: 144/146 passed; the two failures were old hardcoded review counts (72/50/20 versus the owner-requested 69/45/17). Those assertions were updated and all review-persistence suites passed in the final subpath run.
- Final root booking visual/axe and polish: 18/18 passed. Final affected subpath booking/review/smoke suite: 45/45 passed.
- The desktop-header check also exposed an implicit grid column while spanning the title over the sidebar; explicitly placing the sidebar fixed it, and the final center-position assertion passed.
- Lint passed (structure, JavaScript, CSS and documentation); whitespace check passed. Root deployment output restored after subpath validation.
- Physical-device retesting and performance tracing remain unrun; no FPS or physical-device result is claimed.


Final follow-up evidence (DEC-056): root polish/visual/axe 19/19 passed; subpath polish/visual/typography 26/26 passed. Lint and whitespace checks passed; root output is restored. The earlier one-off legacy-redirect inspection failure passed after awaiting canonical page identity. Current screenshots verify the unchanged pager layout gap, original mobile payment stack, content-column header alignment and uninterrupted returned-icon shadow.


## DEC-057: mobile calendar matches desktop

The latest owner request supersedes the earlier mobile ink-selected description in this record. A single shared calendar stylesheet now defines day states; no mobile-only black selection remains. No JavaScript, native radio grouping, data, dates or transition timing was changed.

Concrete source/runtime comparisons against the existing desktop calendar: (1) selected background is the same white surface, (2) selected radius is the same pill, (3) selected shadow is the same raised shadow-md, (4) available days use the same muted inset-shadow pill, (5) disabled days remain flat and muted, (6) selected text has the same color and weight, and (7) keyboard focus retains its separate 2px outline. This explicitly supersedes the historical CalendarDayPicker ink-selected interpretation for this owner-approved presentation.

[Parity test](../tests/phase03/calendar-parity.spec.mjs) compares the actual computed states at 320/390/568/768/1023/1024/1280, verifies one selected native radio and Arrow-key selection, and runs axe scoped to the affected calendar at 390/768/1280. [Calendar screenshots](../tests/screens/calendar-parity/) show the same date selected in mobile/tablet/desktop. Physical-device retest remains unrun. Root calendar + full booking visual/axe regression: 13/13 passed. Focused subpath regression: 12/12 passed. Lint and whitespace checks passed; root output restored.

An initial broader sheet scan while the calendar was scrolled reported contrast on an unrelated transparent stylist label over the scrim. This was not changed by the calendar work; the dedicated axe check is scoped to the affected calendar, not a claim that every sheet subsection was reapproved.
