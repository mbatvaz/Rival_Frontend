> **ARCHIVED / NOT ACTIVE:** This document was written for the previous Claude Code workflow. Use root `AGENTS.md`, `README_START_HERE_FA.md`, `prompts/`, and `phases/` for the Codex workflow. Technical instructions in this archive are superseded by `docs/RIVAL_PROJECT_CONTRACT.md`.

این پرامپت را برای هر برش (Slice) تکرار کن؛ فقط بخش `SLICE` را عوض کن. ترتیب پیشنهادی برش‌ها:

1. Batch 01: پوسته، صفحات عمومی، ورود/ثبت‌نام (Shell, Public, Auth)
2. Batch 02: رزرو مشتری (Customer Booking)
3. Batch 03: پنل مشتری (Customer Panel)
4. Batch 04: آرایشگر (Stylist)
5. Batch 05: ادمین روزانه (Admin Daily)
6. Batch 06: مدیریت ادمین (Admin Management)
7. Batch 07: مالی/محتوا/تنظیمات (Admin Finance, Content, Settings)
8. Batch 08: حالت‌های سیستمی و یکدستی (System States, Consistency)

اگر برش بزرگ بود (مثلاً Batch 05/06/07)، آن را به ۲–۳ زیربرش بشکن و هر بار یک زیربرش اجرا کن.

---

SLICE: <Batch 02 — Customer Booking, pages: …>

Implement this slice following `CLAUDE.md`. Steps:
1. Re-read the batch file, the relevant Handoff_08/07/06 sections, the Nov-1 decisions, and the matching canvas + screenshots.
2. For every page in the slice, write `docs-work/desktop-layouts/<page>.md` first (columns, order, what moves where at ≥1024, staying as faithful to the 390 design as possible). Do not invent new elements.
3. Build views, MockData JSON (realistic Persian data, all states), page CSS (one file per page, components reused), JS (one file per feature, `data-rv` hooks), sheets, and mock-api endpoints.
4. Verify: Playwright screenshots at 390/768/1280, visual-compare 390 against artboards, axe, keyboard path, all states via `?state=`. Run `lint:structure`.
5. Update `PAGE_INVENTORY.md` status, `PROGRESS.md`, `DISCREPANCIES.md`, `OPEN_QUESTIONS.md`. Commit.

Stop and give me: list of pages done, screenshots path, desktop-layout decisions I should review, open questions.
