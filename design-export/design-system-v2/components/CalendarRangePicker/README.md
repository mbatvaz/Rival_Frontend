> **Historical-source notice (2026-11-09):** This file is retained as product/business/design evidence. Any older technology-stack or coding-agent instructions in this file (including Tailwind, Alpine.js, htmx, Express/Nunjucks runtime, or Claude Code) are superseded by `docs/RIVAL_PROJECT_CONTRACT.md` and root `AGENTS.md`. Do not implement those historical stack instructions.

# CalendarRangePicker

انتخاب بازه برای مرخصی آرایشگر، BookableFrom مدیر و فیلترها. دو ماه کنار هم روی یک پنل شیشه‌ای.

- دو سر بازه `.range-start` / `.range-end` جوهری، میانه `.in-range` نوار نرم `bg-plaster`. امروز نقطه سبز، جمعه قرمز، گذشته خط‌خورده.
- سر پنل: عنوان با کاشی، «امروز» و تبدیل میلادی. پای پنل: خلاصه بازه با اثر («۳ نوبت قطعی در بازه») و دکمه «ادامه و پیش‌نمایش اثر» که برگه پیش‌نمایش (`Overlays`) را باز می‌کند.
- ساختار دسترس‌پذیر هر ماه همان `CalendarDayPicker` است: `grid` > `row` برای هر هفته > `gridcell`.
