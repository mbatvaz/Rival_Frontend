# Phase 01 — Foundation

Static generator, design tokens, fonts and icons, registry, preview directory, fixture adapter, and test harness.

## Phase 01 sections

فاز ۱ زیرساخت مشترک مسیرهای محصول را تحویل داده است. پذیرش تاریخی فاز در ۲۰۲۶-۱۱-۱۰ ثبت شده است. [شواهد تحویل زیرساخت](../../docs/TRACEABILITY.md) · [پیشرفت پروژه](../../PROGRESS.md)

| بخش | خروجی‌ها | وابستگی | وضعیت |
|---|---|---|---|
| ۱. ساخت استاتیک و دارایی‌های مشترک | ساختار پوشه‌های سازگار با MVC، تولید HTML، توکن‌ها، فونت‌ها، آیکون‌ها و پوستهٔ پایه | منابع طراحی و قرارداد ساخت استاتیک | پوشش‌داده‌شده در پذیرش فاز |
| ۲. مسیرها، دادهٔ آزمایشی و کنترل کیفیت | رجیستری صفحات، فهرست پیش‌نمایش، دادهٔ آزمایشی، بارگذاری ماژول‌های JS و ابزار آزمون | خروجی استاتیک و مسیر دارایی‌های بخش ۱ | پوشش‌داده‌شده در پذیرش فاز |

## Acceptance

Verify plain static output at `dist/index.html` and `dist/_preview/index.html`, canonical route coverage, stable asset and fixture URLs, and structure lint. Record DS/RULE/ARCH in traceability. The foundation scope excludes product screens and a finished shell.

Read the relevant product excerpts in the [phase handoff](references/Rival_Phase_01_AI_Handoff.md) and use the [design manifest](../../design-export/MANIFEST.json) for exact boards. [Phase 01–02 refresh](../../docs-work/PHASE_01_02_REFRESH_FA.md).
