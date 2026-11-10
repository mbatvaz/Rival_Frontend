> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# File Audit / Coverage Report

Audit روی همه ZIPهای پیوست‌شده و `Pasted text` انجام شد. هیچ فایل مهمی بدون گزارش کنار گذاشته نشد.

| ورودی | فایل/Board | وضعیت خواندن | نکته |
|---|---:|---|---|
| Rival_Batch1_Full | 101 HTML، ۴۴ Board record | کامل | شامل shell/public/auth و صفحات مرجع نهایی |
| Rival_Batch2_Full | 45 HTML، ۳۸ Board record | کامل | booking/payment/recurring/availability alert |
| Rival_Batch3_Customer_Panel_HTML | 129 HTML، ۶۴ Board record | کامل | customer panel؛ دو تصویر decorative در bundle موجود نبودند |
| Rival_Batch4_Stylist_Canvas | 105 HTML، ۱۰۵ Board record | کامل | source canvas + ۱۰۴ preview |
| Rival_Batch5_Admin_Daily | 56 HTML، ۵۵ Board record | کامل | ADM-01..09 و ADM-AC؛ README با count قدیمی ناسازگار است، JSON مبناست |
| Rival_Batch6_Salon_Management | 60 HTML، ۶۰ Board record | کامل | ADM-10..15 |
| Rival_Batch7_Artboards | 44 HTML، ۴۴ Board record | کامل | ADM-16، ADM-NOT، ADM-20/21/23/24/25 |
| Rival_Batch08_Artboards | 31 HTML، ۳۱ Board record | کامل | STATE/SYS/KIT؛ منابع مشترک خارج ZIP ارجاع شده بودند |
| Rival_Design_System_v2 | 51 component groups، 278 فایل | کامل | tokens/design-system/assets/previewها موجود |
| Rival_Docs_For_ClaudeCode | 28 Markdown | کامل | تصمیم‌ها، handoffها، phase handoffها و master prompt |

## Coverage limitations

- Canvas HTMLهای Batch 5 و 8 برای اجرای مستقل به `/_blob` یا support.js وابسته‌اند؛ preview PNG و Source HTML به‌عنوان evidence نگه داشته شده است.
- بعضی exportها فقط 390px هستند؛ Desktop behavior از Architecture Decision و layout rules استنتاج شده و در `DECISION_LOG.md` با وضعیت Inferred علامت خورده است.
- هیچ Backend/API واقعی ارائه نشده؛ endpointها در این بسته Suggested Mapping هستند، نه قرارداد نهایی Backend.
