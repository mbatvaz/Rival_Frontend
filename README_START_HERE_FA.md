# راه‌اندازی Rival با Codex در VS Code

این بسته برای توسعه مرحله‌ای Rival با **OpenAI Codex** آماده شده است. لازم نیست Node.js را بلد باشی؛ Codex و Taskهای VS Code دستورات ساخت و تست را اجرا می‌کنند.

## ۱) چه چیزی داخل این بسته است؟

**وضعیت ۱۹ آبان ۱۴۰۵:** زیرساخت فاز اول پیاده‌سازی و آزموده شده و منتظر پذیرش مالک است. گزارش در `docs-work/PHASE_01_REPORT_FA.md` قرار دارد. صفحات محصول هنوز جای‌نگهدار هستند؛ فاز دوم آغاز نشده است.

- `AGENTS.md`: دستورالعمل دائمی Codex.
- `docs/RIVAL_PROJECT_CONTRACT.md`: سند واحد و نهایی معماری و تصمیم‌های تأییدشده.
- `docs/`: فهرست صفحات، Componentها، مسیرها، تصمیم‌ها، Traceability و اسناد مرجع.
- `design-export/`: تمام Exportهای اصلی و Design System v2؛ فقط‌خواندنی.
- `design-export/MANIFEST.md`: راهنمای یافتن HTML، Artboard و Screenshotهای اصلی.
- `phases/PHASE_01` تا `PHASE_09`: پرامپت‌ها و Source Mapهای اصلاح‌شده برای Codex.
- `prompts/`: Preflight و بررسی Manifest پیش از شروع توسعه.
- `.vscode/`: افزونه‌های پیشنهادی و Taskهای آماده.
- `src/`: اسکلت سورس پروژه.
- `src/site-config.json`: تنظیم مسیر پایه انتشار روی دامنه یا زیرپوشه.

## ۲) پیش‌نیازها

1. VS Code را نصب کن.
2. Git را نصب کن.
3. Node.js نسخه LTS را یک‌بار نصب کن. لازم نیست دستوراتش را یاد بگیری؛ برای Build و تست محلی استفاده می‌شود.
4. پوشه `Rival_Codex_Starter` را در VS Code باز کن.
5. از `Tasks: Run Task` گزینه `Rival: Install Dependencies` را یک‌بار اجرا کن (یا از Codex بخواه وابستگی‌ها را نصب کند).
6. اگر می‌خواهی تست‌های Playwright اجرا شوند، یک‌بار Task به نام `Rival: Install Playwright Chromium` را هم اجرا کن.
7. از بخش Extensions، افزونه‌های پیشنهادی Workspace را نصب کن؛ مهم‌ترین آن‌ها OpenAI Codex است.

وابستگی‌ها و Chromium هم‌اکنون در این نسخه نصب شده‌اند. برای نصب مجدد، Taskهای بالا از cache و مرورگر محلی همین پوشه استفاده می‌کنند. فایل `package-lock.json` نسخه‌های وابستگی را تثبیت می‌کند.

برای بررسی کامل، Taskهای `Rival: All Foundation Tests` و `Rival: Test Subfolder Deployment` را اجرا کن. آزمون زیرپوشه، مسیر `/rival-demo/` را بدون تغییر تنظیم اصلی آزمایش می‌کند و در پایان خروجی `dist/` را به مسیر اصلی برمی‌گرداند. پیش از آزمون‌ها Preview قبلی روی پورت ۴۱۷۳ را متوقف کن؛ آزمون زیرپوشه از پورت ۴۱۷۴ استفاده می‌کند.

## ۳) شروع کار با Codex

1. در Codex حالت Plan را انتخاب کن.
2. فایل `prompts/00_Codex_Preflight.md` را به آن بده.
3. گزارش را بررسی کن؛ در این مرحله نباید کدی تغییر کند.
4. `prompts/00a_Normalize_Export.md` را اجرا کن تا Manifest طراحی با فایل‌های واقعی تطبیق داده شود.
5. `prompts/00b_Architecture_Alignment.md` را اجرا کن تا تعارض باقی‌مانده‌ای در اسناد و Phase Promptها نباشد.
6. پس از تأیید گزارش، `phases/PHASE_01_Foundation/CODING_AGENT_PROMPT.md` را اجرا کن.
7. بعد از هر Phase، تست‌ها و گزارش Codex را بررسی و خودت تأیید کن. هیچ Phase بعدی نباید خودکار شروع شود.

## ۴) دیدن صفحات در مرورگر

خروجی توسعه در `dist/` ساخته می‌شود.

- صفحه اصلی عمومی: `dist/index.html`
- صفحه مرکزی برای رفتن به همه صفحات: `dist/_preview/index.html` (همچنین `dist/pages.html`)
- آدرس محلی صفحه مرکزی پس از اجرای Preview: `http://localhost:4173/_preview/` یا `http://localhost:4173/pages.html`

برای اجرای آن از VS Code:

1. `Ctrl+Shift+P` را بزن.
2. `Tasks: Run Task` را انتخاب کن.
3. `Rival: Build Static Preview` را اجرا کن.
4. سپس `Rival: Start Local Preview` را اجرا کن.
5. لینک `http://localhost:4173/_preview/` را در مرورگر باز کن.

برای اعمال تغییرات، به Codex بگو کدام صفحه یا بخش را اصلاح کند. Codex باید فایل منبع را در `src/Views/` یا CSS/JS مربوطه تغییر دهد و دوباره Build بگیرد. فایل‌های `dist/` خروجی تولیدشده‌اند و نباید دستی ویرایش شوند، چون Build بعدی تغییراتشان را جایگزین می‌کند.

می‌توانی به Codex هم بگویی: «Build را اجرا کن و Preview محلی را بالا بیاور». نیازی نیست فرمان Node را خودت بنویسی.

## ۵) انتشار روی cPanel

بعد از Build موفق:

1. وارد File Manager در cPanel شو.
2. به `public_html` یا Document Root دامنه برو.
3. **محتویات پوشه `dist/`** را آپلود کن؛ خود پوشه `dist` را یک لایه اضافه داخل public_html قرار نده.
4. `index.html` صفحه اصلی عمومی خواهد بود.
5. برای فهرست همه صفحات، `https://your-domain/_preview/` یا `https://your-domain/pages.html` را باز کن.

اگر سایت را داخل زیرپوشه‌ای مثل `/rival-demo/` منتشر می‌کنی، قبل از Build مقدار `basePath` را در `src/site-config.json` به `/rival-demo/` تغییر بده.

روی cPanel به Node.js، npm، Express یا Nunjucks نیاز نداری. فقط HTML، CSS، JS، JSON، فونت و تصاویر استاتیک سرو می‌شوند.

**مهم:** این خروجی یک Frontend Reference و Demo است. پرداخت، رزرو، احراز هویت و عملیات مالی واقعی انجام نمی‌دهد؛ عملیات آزمایشی فقط در مرورگر شبیه‌سازی می‌شوند.

## ۶) انتقال آینده به ASP.NET Core MVC

برای مهاجرت، از فایل‌های سورس استفاده می‌شود، نه خروجی `dist`:

- `src/Views/` به Razor Views تبدیل می‌شود.
- `src/wwwroot/` به `wwwroot/` پروژه ASP منتقل می‌شود.
- `src/MockData/` قرارداد اولیه ViewModel و JSON را نشان می‌دهد.
- `tools/`، `dist/`، Static Preview و Build-time Nunjucks منتقل نمی‌شوند.

## ۷) تصمیم‌های قطعی

- Native CSS؛ بدون Tailwind.
- JavaScript بومی ES Modules.
- فقط Yekan Bakh با وزن‌های 300، 400 و 600 و عرض معمولی.
- آیکون‌های محلی Lucide-based SVG با نام‌گذاری سازگار `ri-*`.
- Nunjucks فقط زمان Build؛ بدون Express و بدون Runtime روی cPanel.
- دسکتاپ طراحی مستقل و متناسب با همان زبان بصری موبایل دارد؛ صرفاً بزرگ‌کردن صفحه موبایل نیست.

## ۸) نکته درباره مورد ۲۲

پیام تصمیم‌گیری مالک با `22-` پایان یافته بود اما توضیحی برای مورد ۲۲ ارسال نشده است؛ بنابراین هیچ تصمیمی برای آن فرض نشده است.
