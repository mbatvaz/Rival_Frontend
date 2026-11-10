> **ARCHIVED / NOT ACTIVE:** This document was written for the previous Claude Code workflow. Use root `AGENTS.md`, `README_START_HERE_FA.md`, `prompts/`, and `phases/` for the Codex workflow. Technical instructions in this archive are superseded by `docs/RIVAL_PROJECT_CONTRACT.md`.

بعد از تأیید خروجی پرامپت ۰۰ بچسبان.

---

Build Phase 1 — the foundation — following `CLAUDE.md` and the 2026-11-02 architecture decision exactly. No page-specific screens yet.

1. Scaffold the repo structure from decision §3 (empty folders get `.gitkeep`). `package.json` with scripts `dev`, `test:visual`, `test:a11y`, `lint:structure`.
2. `mock-server/`: Express + Nunjucks, serving `src/Views` and `src/wwwroot`, route convention `/<Area>/<Controller>/<Action>` → view + `MockData/<Area>.<Controller>.<Action>.json`; `?state=empty|loading|error` support; mock write endpoints under `/mock-api/**` returning realistic JSON; live reload.
3. Tokens: convert design-system v2 `tokens.json` into `wwwroot/css/00-tokens/*.css` custom properties, split by concern (color, type, space, radius, shadow, motion, z-index, breakpoints-as-comments). Self-host Yekan Bakh with `@font-face`. Build the Remix Icon sprite and an `icon` partial.
4. `01-base` (reset, RTL, typography), `02-layout` (container, page shell, grid helpers for mobile/tablet/desktop per decision §2), `05-utilities` (minimal).
5. Shared views: `_Layout`, `_Head`, `_Styles`, `_Scripts`, `_HeaderDesktop`, `_BottomNav` (both driven by `MockData/nav.<role>.json`), `_SheetHost`, `_Toast`, `_PageHeader`. Desktop ≥1024: no bottom nav, header + «بیشتر» menu.
6. JS core: `core/registry.js`, `core/api.js` (mock adapter), `core/dom.js`, `core/fa-digits.js`, `core/jalali.js`; components `sheet.js` (native `<dialog>`-based bottom sheet, focus trap, ESC, backdrop, desktop-width rule), `toast.js`.
7. A `/__book` component book route listing every component with all variants/states, at 390 / 768 / 1280.
8. Tests: Playwright config (390/768/1280), visual comparison helper against `design-export` screenshots, axe runner, and `lint:structure` (max lines per CSS/JS file, no inline script/style/handlers, no raw colors/px outside tokens, no Tailwind).
9. Write `PROGRESS.md` and fill the "Commands" section of `CLAUDE.md`.

Done = `npm run dev` shows the component book with shell, header/bottom-nav behaviour and an empty sheet demo; all test scripts pass. Commit. Summarize and stop for review.
