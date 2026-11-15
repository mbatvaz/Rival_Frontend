# اصلاحات چیدمان رزرو و متن سرریز — ۲۰۲۶/۱۱/۱۵

> ????? ?????: ?????? ???? ??? ????? ?????? ??? ? ?? [????? ???????? ????](OVERFLOW_CARD_SCOPE_2026-11-15.md) ??? ??. ??? ??????? ???? ???? ???? ???? ?????? ??????? ? ???????? ?????? ?????. ???? ??????? ?????? ??? ????? ????????.

درخواست مستقیم مالک شامل ۱۳ اشاره به عناصر BK-01، BK-02، BK-F01 و BK-F02 است. این اصلاحات پذیرش فاز ۰۳ یا شروع فاز دیگری محسوب نمی‌شود.

## نتیجه و مرز تغییر

- [متن مشترک](../src/wwwroot/js/components/overflow-text.js) متن‌های سرریز را با حفظ متن اصلی و نام دسترس‌پذیر، تک‌سطر و روان نشان می‌دهد؛ متن کوتاه حرکت نمی‌کند. عرض ذاتی متن باعث گسترش ستون والد نمی‌شود. تغییر محتوا، فونت و اندازه صفحه دوباره اندازه‌گیری می‌شود.
- حرکت متن با transform، سرعت حدود ۲۴ پیکسل در ثانیه، حداقل چرخه ۶ ثانیه و مکث در دو انتها است. hover/focus آن را متوقف می‌کند؛ خارج دید/صفحه مخفی متوقف می‌شود. reduced motion یا فوکوس مستقیم، متن را با اسکرول دستی و صفحه‌کلید قابل خواندن نگه می‌دارد. نبود API مشاهده اندازه/دید مانع شروع ویژگی‌های سایت نمی‌شود. کتابخانه اضافه نشده است.
- ریل خدمت و آرایشگر موبایل: کارت کناری ۸۴٪ کارت مرکزی؛ زمان تغییر از توکن base است. فاصله پایین ریل ۴ پیکسل و فاصله نقطه‌ها ۴ پیکسل است. padding پایین سند فقط ارتفاع ناوبری و safe area را رزرو می‌کند.
- عنوان انتخاب در حالت خالی هر دو صفحه مخفی است. نوار پیشرفت معنای native خود را نگه می‌دارد؛ هاله فقط داخل عرض مقدار پرشده قرار می‌گیرد و با reduced motion حذف می‌شود. هاله با تغییر پس‌زمینه در همان ناحیه ۶ پیکسلی رسم می‌شود؛ امتیاز FPS یا تضمین compositor ادعا نشده است.
- [فرم زمان](../src/Views/Booking/_Time.njk): مراحل داخل ستون جزئیات است؛ کارت خلاصه دیگر ارتفاع ردیف مراحل را افزایش نمی‌دهد. در ۱۴۴۰ به بالا نزدیک‌ترین زمان‌ها کنار تقویم باقی می‌مانند. پیام اضافی زیر انتخاب خالی حذف است.
- کارت زمینه دسکتاپ به الگوی افقی محوشونده قبلی برگشته است؛ تصویر بلند ۴:۵ کنار گذاشته شد. تصویر بلیت پرداخت دسکتاپ دوباره ۳:۱ است و سه ردیف تاریخ/ساعت از چپ ترازند.
- تقویم همیشه فضای یک عنوان هفته و شش هفته را رزرو می‌کند. انیمیشن خروج ردیف‌های تمام‌شده تا زمان جایگزینی کل ماه باقی می‌ماند؛ ورودی سریع فقط آخرین ماه را نگه می‌دارد. reduced motion حالت نهایی را بی‌حرکت می‌سازد.

## مقایسه منبع و اجرا

منابع فقط خوانده شدند. تصاویر مرجع ۷۸۰ پیکسلی معادل بوم ۳۹۰ CSS پیکسل هستند. تصاویر اجرا در [شواهد رزرو](../tests/screens/booking-corrections/) با اندازه‌های ۳۹۰، ۷۶۸ و ۱۲۸۰ و DPR پیش‌فرض آزمون ذخیره شدند.

| منبع دقیق | مشاهده در اجرا و تفاوت مجاز |
|---|---|
| [BK-01-A](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-A.png) | دو کارت رزرو دوباره، ریل عکس، برچسب شیشه‌ای و نقطه‌های پایین حفظ‌اند؛ کارت‌های کناری با درخواست جدید کوچک‌تر و فاصله نقطه‌ها کمتر است. |
| [BK-02-DEF](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-02-DEF.png) | همان ریل مرکزی و کارت زمینه افقی حفظ شده؛ تفاوت مقیاس کناره‌ها مطابق دستور مالک است. |
| [BK-F01-D](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-D.png) | کارت زمینه کوتاه با عکس محوشونده در اجرا باقی است؛ دسکتاپ آن را کنار تقویم نگه می‌دارد و دیگر عکس عمودی بزرگ ندارد. روزها و ساعت‌ها، انتخاب و اقدام ادامه حفظ‌اند. |
| [BK-F02-A](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-A.png) | مرجع عکس افقی کوتاه، مشخصات نوبت و تفکیک هزینه دارد؛ نسخه دسکتاپ هم عکس کوتاه را بازیابی می‌کند. تراز سه‌ردیفه چپ، دستور جدید مالک است. |
| [BK-01-EMPTY](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-EMPTY.png) | در منبع، عنوان انتخاب خدمت بالای حالت خالی نیست؛ اجرا هم عنوان اضافی را حذف می‌کند و اقدام تماس حفظ است. |

دسکتاپ با [brief زمان](desktop-layouts/BK-F01.md) و [brief پرداخت](desktop-layouts/BK-F02.md) به‌علاوه دستور جدید مالک بررسی می‌شود؛ تطبیق پیکسلی با بوم موبایل ادعا نشده است. رفتار متن روان دستور جدید مالک است و محدودیت قبلی حفظ چندسطر برای توضیحات را در متن سرریز جایگزین می‌کند.

## آزمون و محدودیت

[آزمون اختصاصی](../tests/phase03/layout-corrections.spec.mjs) متن پویا، reduced motion، نسبت کارت‌ها، فاصله نقطه‌ها، محدوده هاله، حالت خالی، کارت کوتاه، اندازه ثابت ماه و تراز سه‌ردیفه را بررسی می‌کند. رگرسیون موجود شامل axe، صفحه‌کلید، مسیرها، فرم‌ها، کنسول و عرض‌های ۳۲۰/۳۹۰/۷۶۸/۱۰۲۳/۱۰۲۴/۱۲۸۰/۱۴۴۰/۱۹۲۰ است. نتایج نهایی پس از اجرا در پیشرفت ثبت می‌شود.

هیچ مرورگر موبایل فیزیکی بازآزمایی نشده و اندازه‌گیری FPS انجام نشده است. تأییدهای دستی بازبینی بازنویسی نشده‌اند؛ مصرف‌کنندگان واقعی تغییر مشترک متن و صفحات رزرو طبق revision خود نیاز به بازبینی نهایی دارند. مسیر، پرداخت، احراز هویت و fixture کسب‌وکار تغییر نکرده‌اند.


## Motion / responsive execution record

Native CSS and Web Animations remain sufficient; no dependency or token family was added. Text measurement is event-driven, with at most one scheduled requestAnimationFrame, batched geometry reads followed by DOM writes, and no JavaScript animation loop. The text loop uses transform only; the thin progress decoration paints only its filled portion. This is a code-level budget, not a measured frame-time result. Document navigation destroys observers with the document; visibility changes pause loops, and text/style changes are remeasured. Month motion uses base timing (240ms), half-fast row stagger (70ms), revision cancellation and static fallback. Normal/reduced motion, rapid next/previous, keyboard activation, sheet close/reopen and unavailable animation/visibility APIs are covered by existing regression.

Browser evidence is Chromium emulation, 900px screenshot height at 390/768/1280 CSS widths; boundary regression additionally covers 320/1023/1024/1440 and desktop keyboard resizing to 1920. Default Playwright DPR is 1. Native horizontal rails remain scrollable; no extra vertical scroll container was introduced. Physical Galaxy S20 FE and performance tracing remain unrun; no physical-device or FPS claim is made.


## Final command evidence

- Full root `npm.cmd test`: 129 passed (exit 0).
- Full subpath: 128 passed, 1 failed because Chromium rejected randomly assigned port 4045 with ERR_UNSAFE_PORT in the isolated review-storage helper. No product assertion failed. The focused subpath rerun passed 37/37, including the same project-file test plus public/booking axe, keyboard, motion fallback and layout corrections.
- `npm.cmd run lint`: passed (structure, JavaScript, CSS, documentation). `git diff --check`: exit 0. The subpath runner restored root output.
- Earlier development failures exposed intrinsic nowrap sizing and reduced-motion keyboard scroll access; both were corrected before the final runs.
