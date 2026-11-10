> **ARCHIVED / NOT ACTIVE:** This document was written for the previous Claude Code workflow. Use root `AGENTS.md`, `README_START_HERE_FA.md`, `prompts/`, and `phases/` for the Codex workflow. Technical instructions in this archive are superseded by `docs/RIVAL_PROJECT_CONTRACT.md`.

# راهنمای قدم‌به‌قدم: ساخت فرانت ریوال با Claude Code

## مرحله ۱ — آماده‌سازی پوشه
1. یک پوشه بساز: `rival-frontend` و داخلش `git init` بزن.
2. این بسته (Kickstart) را باز کن و محتویاتش را در ریشه پوشه بگذار: `CLAUDE.md`، پوشه `prompts/`.
3. محتویات `Rival_Docs_For_ClaudeCode.zip` (قبلی) را در پوشه `docs/` باز کن.
4. پوشه `docs/` داخل این بسته (شامل `design/Rival_Decision_2026-11-02_Frontend_Architecture.md`) را روی `docs/` ادغام کن.
5. خروجی‌های Claude Design را در `design-export/` بگذار:
   - `canvas/` : HTML و CSS بوم‌ها (rv-b3 تا rv-b7 و بقیه)
   - `screenshots/` : اسکرین‌شات هر آرت‌بورد در عرض ۳۹۰، با نام صفحه (مثلاً `CUS-01.png`)
   - `design-system-v2/` : tokens.json، CSS، فونت یکان‌بخ، آیکون‌ها
6. یک commit اولیه بزن.

## مرحله ۲ — اجرای Claude Code
- در پوشه `rival-frontend` دستور `claude` را اجرا کن. ابتدا مطمئن شو Node.js ۲۰+ نصب است.
- بهتر است مدل قوی‌تر (Opus یا Fable) برای مراحل ۰۰ و ۰۱ استفاده شود؛ برای برش‌ها هم همین بهتر است.
- حالت Plan را برای مراحل ۰۰ و ۰۱ روشن کن تا قبل از نوشتن، برنامه را ببینی.

## مرحله ۳ — ترتیب پرامپت‌ها
| فایل | کار | بعدش چه چیزی را بررسی کنی |
|---|---|---|
| `00_Audit.md` | بررسی اسناد و ساخت فهرست صفحات/کامپوننت‌ها | `PAGE_INVENTORY.md`، `OPEN_QUESTIONS.md` را بخوان و جواب بده |
| `01_Foundation.md` | سرور mock، توکن‌ها، لایه‌ها، هدر/ناوبری، شیت، کتاب کامپوننت | `npm run dev` و صفحه `/__book` را در ۳۹۰ و ۱۲۸۰ ببین |
| `02_Components.md` | همه کامپوننت‌های مشترک | کتاب کامپوننت را با طرح‌ها مقایسه کن |
| `03_Slice_Template.md` | یک‌به‌یک برش‌ها (Batch 01 تا 08) | فایل‌های `docs-work/desktop-layouts/` را قبل از تأیید بخوان |
| `04_Final_QA_And_ASP_Port.md` | تست نهایی و راهنمای انتقال به ASP | `ASP_PORT_GUIDE.md` |

نکته: بعد از هر مرحله یا برش commit بگیر. اگر Claude Code بین مراحل زیاد طولانی شد، از `/clear` استفاده کن؛ همه حافظه واقعی در `CLAUDE.md`، `PROGRESS.md` و فایل‌های ریپو است.

## مرحله ۴ — چیزهایی که باید خودت تأیید کنی
این سه فرض در سند تصمیم نوشته شده (بخش ۷). اگر درست نیست، قبل از پرامپت ۰۱ همان سند را ویرایش کن:
1. در دسکتاپ، موارد ناوبری پایین + موارد فعلی منوی «بیشتر» داخل منوی «بیشتر» هدر می‌روند.
2. بالاشیت‌ها در دسکتاپ هم پایین‌چسبیده و وسط‌چین با عرض ۵۶۰ می‌مانند.
3. آستانه‌ها: تبلت ۷۶۸، دسکتاپ ۱۰۲۴.

همچنین دو تغییر نسبت به پیشنهاد قبلی که از خواسته‌ات می‌آید: Tailwind و htmx/Alpine کنار گذاشته شدند. CSS ساده در فایل‌های جدا و JS بومی با یک فایل برای هر فیچر جایگزین شد، چون با تفکیک حداکثری و انتقال بی‌دردسر به ASP سازگارتر است.

## مرحله ۵ — انتقال به ASP.NET
وقتی پرامپت ۰۴ تمام شد:
- `src/wwwroot` را عیناً در `wwwroot` پروژه ASP کپی کن.
- Viewها را طبق `ASP_PORT_GUIDE.md` به `.cshtml` تبدیل کن (اسکریپت `tools/convert-views.js` بیشتر کار را مکانیکی انجام می‌دهد).
- JSONهای `MockData` شکل ViewModelها را نشان می‌دهند؛ `core/api.js` را از mock به endpointهای واقعی سوئیچ کن.

## اگر کیفیت پایین بود
- هر بار فقط یک برش بده و خروجی را با اسکرین‌شات‌ها مقایسه کن.
- مغایرت‌ها را در `DISCREPANCIES.md` ببین؛ اگر طرح کانواس قدیمی بود، مرجع اسناد است، نه بوم.
- اگر Claude Code کدی با فایل بزرگ یا inline نوشت، `npm run lint:structure` را اجرا و بخواه اصلاح کند.
