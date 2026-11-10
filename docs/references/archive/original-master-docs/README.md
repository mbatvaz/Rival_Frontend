> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Rival Frontend Delivery Package

این بسته حاصل Audit و Reverse Engineering فایل‌های پیوست‌شده است. هدف آن آماده‌سازی اجرای فرانت‌اند مرجع با HTML/CSS/Vanilla JS و انتقال مکانیکی به ASP.NET Core MVC است؛ پیاده‌سازی صفحات در این مرحله انجام نشده است.

## ترتیب استفاده

1. این ZIP را یک‌بار به Coding Agent بدهید و `CLAUDE.md` داخل `references/kickstart/` را به‌عنوان دستور اجرای ریپو بخوانانید.
2. `PHASE_PLAN.md` و `DECISION_LOG.md` را به‌عنوان قرارداد مشترک ثبت کنید.
3. ZIPهای Phase 01 تا 09 را دقیقاً به ترتیب شماره اجرا کنید. هر فاز باید خروجی فاز قبلی را نگه دارد و قبل از شروع فاز بعد، Gateهای خود را پاس کند.
4. برای هر صفحه، ابتدا شناسه آن را در `PAGE_INVENTORY.md` پیدا کنید؛ سپس Source Mapping را در `TRACEABILITY.md` دنبال کنید.
5. سؤال‌های `OPEN_QUESTIONS.md` تا وقتی تصمیم مالک برسد با Mock محافظه‌کارانه بسته می‌شوند و نباید به Business Rule جدید تبدیل شوند.

## وضعیت ورودی‌ها

- ۸ بوم طراحی: ۴۴۱ رکورد Board در `canvas.json` (شامل ۸ یادداشت دسته) و ۵۷۱ فایل HTML صادرشده.
- Design System v2: ۵۱ گروه Component، Tokenهای رنگ/تایپ/فاصله/شعاع/سایه/حرکت و Assetهای محلی.
- اسناد تصمیم و Handoff در مسیر `references/` کپی شده‌اند تا در اجرای بعدی نیاز به ارسال دوباره اسناد نباشد.

## قانون Source of Truth

Owner decision و Current Truth بالاتر از جدول‌های قدیمی Handoff است. موارد حذف‌شده مانند ADM-17 Reports، ADM-18/19 Wallet routes و ADM-22 Announcement route در نقشه نهایی مسیر ندارند؛ مقصدهای canonical آن‌ها در `PAGE_INVENTORY.md` و `DECISION_LOG.md` ثبت شده است.
