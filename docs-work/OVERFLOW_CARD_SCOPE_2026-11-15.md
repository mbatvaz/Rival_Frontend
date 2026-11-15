# اصلاح حرکت متن: فقط کارت‌های کوچک

پیاده‌سازی قبلی به اشتباه همه متن‌های بلند را تک‌سطر می‌کرد. دستور روشن مالک: متن معمولی، عنوان، توضیح طولانی، پیام و هر متنی که افزایش سطر ساختار کارت را مختل نمی‌کند، باید مثل قبل چندسطر بماند. فقط فیلد متغیر داخل کارت کوچک و محدود اجازه حرکت دارد.

## پیاده‌سازی و دامنه

[ماژول متن](../src/wwwroot/js/components/overflow-text.js) دیگر بر اساس نام تگ، کل سایت را برای تبدیل متن انتخاب نمی‌کند. فقط عنصر دارای `data-rv-overflow-text` بررسی می‌شود. این ویژگی صریح روی نام و مشخصات کوتاه کارت خدمت/آرایشگر، کارت رزرو دوباره، کارت زمینه نوبت، ردیف دوره‌ای، مشخصات بلیت و برچسب کوچک نمونه‌کار قرار دارد. متن توضیحی آزاد هیچ‌کدام از این صفحه‌ها علامت‌گذاری نشده است.

عنوان صفحه، قوانین، معرفی سالن، توضیح وضعیت درخواست، راهنمای فرم، خطا و متن دکمه‌ها دوباره از CSS عادی خود پیروی می‌کنند. سایر اصلاحات رزرو مثل اندازه عکس، ریل موبایل، فاصله مراحل، هاله پیشرفت و تراز تاریخ حفظ شده‌اند. نام طولانی آرایشگر کنار آواتار در همان ردیف می‌ماند. جایگزینی نام طولانی با نام کوتاه، حرکت و tabindex تولیدشده را پاک می‌کند.

در کارت مجاز نیز فقط سرریز واقعی حرکت دارد؛ نام کوتاه بی‌حرکت است. همان transform، مکث دو انتها، توقف خارج دید/صفحه مخفی، دسترسی صفحه‌کلید و اسکرول دستی در reduced motion حفظ است. بدون کتابخانه جدید و بدون حلقه انیمیشن JavaScript؛ حداکثر یک frame برای اندازه‌گیری تغییرات صف می‌شود. مرورگر فاقد API مشاهده، مسیر عادی را حفظ می‌کند. امتیاز FPS اندازه‌گیری نشده است.

## منبع و مقایسه

اصلاح دامنه بر اساس دستور صریح جدید مالک است؛ منابع طراحی و briefها تغییر داده نشده‌اند، مگر یادداشت محدوده‌ای که تفسیر غلط قبلی را تصحیح می‌کند. [شواهد جدید](../tests/screens/overflow-scope/) در Chromium با DPR پیش‌فرض ۱، عرض‌های ۳۹۰/۷۶۸/۱۲۸۰ و ارتفاع ۹۰۰ ثبت می‌شود. گزارش [بازبینی قبلی](BOOKING_LAYOUT_CORRECTIONS_2026-11-15.md) برای سایر تغییرات رزرو معتبر می‌ماند.

| مرجع | مقایسه مورد اصلاح |
|---|---|
| [قوانین](../src/Views/Public/Rules/Index.njk) | پاراگراف معرفی و بندهای طولانی دوباره چندسطرند؛ هیچ عنوان یا بند قانون متن روان ندارد. |
| [معرفی سالن](../src/Views/Public/Home/Index.njk) | توضیح سالن فضای طبیعی چندسطر دارد و ارتفاع سند با آن افزایش می‌یابد. |
| [StatePage](../src/Views/Shared/Components/_StatePage.njk) | توضیح نتیجه درخواست بدون tabindex یا wrapper حرکت، چندسطر خوانده می‌شود. |
| [BK-01-A](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-A.png) | برچسب کوچک زیر عکس نام و زمان محدود دارد؛ فقط سرریز این برچسب، طبق اصلاح مالک حرکت می‌کند. عنوان و پیام خالی مستقل از آن هستند. |
| [BK-02-DEF](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-02-DEF.png) | نام آرایشگر در کپسول کوچک و نام خدمت در کارت زمینه مجازند؛ عنوان صفحه و توضیحات عمومی عادی مانده‌اند. |
| [BK-F01-D](../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-D.png) | نام خدمت/آرایشگر در خلاصه محدود است؛ راهنمای زمان و اعلان نباید به متن روان تبدیل شود. |

## بررسی

[آزمون دامنه](../tests/phase03/overflow-scope.spec.mjs) پاراگراف‌های سه صفحه را با متن بلندتر جایگزین می‌کند و چندسطر ماندن و نبود اسکرول افقی سند را بررسی می‌کند. همچنین نام کوتاه/بلند/کوتاه کارت، حرکت فقط روی hook صریح و reduced motion را می‌سنجد. آزمون‌های موجود رزرو، عمومی، axe، صفحه‌کلید و ذخیره مستقل تأییدها رگرسیون را پوشش می‌دهند. نتایج نهایی پس از اجرا ثبت می‌شوند.

بازآزمایی فیزیکی موبایل انجام نشده است. فایل تأییدهای دستی بازنویسی نشده و تأیید مرحله محصول تغییر نکرده است.


## Actual validation

- Focused root regression: 8/8 passed. Full root regression: 133/133 passed, including public/booking axe, keyboard, routes, motion fallback and preview-review persistence. Lint passed.
- Visual review: ordinary rules paragraphs wrap at 390px (72/72/96px heights with 24px line height), no text-motion wrappers exist on that page and document width remains 390px. Home introduction and request receipt prose also return to natural multiline text in captured screenshots. Service/stylist captions retain their compact layout. Five source/runtime comparisons are listed above.
- No owner approval file was rewritten. Physical-device testing and FPS measurement remain unrun. Affected subpath regression passed 32/32. After excluding the expandable checkout detail card as well, the final focused root regression passed 15/15, including the additional multiline checkout assertion.

- Final expanded scope regression also passed 4/4 under the deployment subpath; root output was restored afterward.
