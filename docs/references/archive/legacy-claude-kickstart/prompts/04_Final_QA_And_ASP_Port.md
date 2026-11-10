> **ARCHIVED / NOT ACTIVE:** This document was written for the previous Claude Code workflow. Use root `AGENTS.md`, `README_START_HERE_FA.md`, `prompts/`, and `phases/` for the Codex workflow. Technical instructions in this archive are superseded by `docs/RIVAL_PROJECT_CONTRACT.md`.

بعد از تمام برش‌ها.

---

Final phase.
1. Full regression: all pages × 390/768/1280, visual compare, axe, keyboard walkthrough of the main journeys (customer booking, stylist day, admin daily, owner closures, ADM-09 credit/payments). Fix everything found.
2. Consistency sweep against Batch 08 and Handoff_08: copy, digits, dates, sheet behaviour, empty/error states, one-green-button rule, no center dialogs, no inner scroll.
3. `lint:structure` must pass with zero exceptions; list any file near the size cap and split it.
4. Generate `docs-work/ASP_PORT_GUIDE.md`: tables of Views → Area/Controller/Action, ViewModels (derived from MockData with property names/types), expected endpoints (from `core/api.js` mock routes: method, URL, request/response JSON), HTML helpers to implement (`FaDigits`, `Jalali`, nav builder), Nunjucks→Razor conversion checklist, and the exact steps to copy `wwwroot` and convert views.
5. Optionally write a small script `tools/convert-views.js` that mechanically converts `.njk` to `.cshtml` for the restricted subset, with a dry-run mode. Test it on three pages.
6. Update `PROGRESS.md` and tag the repo `v0.1-frontend-reference`.
