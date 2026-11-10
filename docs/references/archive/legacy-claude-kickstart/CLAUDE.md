> **ARCHIVED / NOT ACTIVE:** This document was written for the previous Claude Code workflow. Use root `AGENTS.md`, `README_START_HERE_FA.md`, `prompts/`, and `phases/` for the Codex workflow. Technical instructions in this archive are superseded by `docs/RIVAL_PROJECT_CONTRACT.md`.

# Rival Frontend Reference Prototype (CLAUDE.md)

## What this repo is
A **backend-less, responsive, RTL (fa-IR) frontend reference** for Rival, the booking and management system of سالن طاها (Ardabil). It is used to (1) preview and UI-test every screen, and (2) be ported to **ASP.NET Core MVC (Razor)** with the *least possible edits*. Nothing here is throw-away: structure, class names, file names and JS modules must survive the port.

## Sources of truth (highest first)
1. `docs/design/Rival_Decision_2026-11-02_Frontend_Architecture.md` (architecture + responsive rules, owner-approved)
2. `docs/design/Rival_Decision_2026-11-01_Owner_Closures.md`, `..._2026-10-31_ADM09_...`, `..._2026-10-22_...`
3. `docs/handoff/Rival_Design_Handoff_08.md` > `_07` > `_06`
4. `docs/design/Rival_Design_Common.md`, `Rival_Design_00_Guide.md`, then `Rival_Design_Batch_0X_*.md`
5. `docs/phases/*` (only §0–2 of each phase file is current truth; Source Archive is history)
6. `design-export/MANIFEST.md` + `MANIFEST.json` (the only way to locate assets; batch folders are NOT uniform) → then `design-export/` (canvas HTML/CSS, screenshots at 390, design-system v2: tokens.json, CSS, fonts, icons)

If two sources disagree, the higher one wins. If the design export contradicts the docs (the 4 known un-updated canvas items are listed in `docs/README.md`), follow the docs and log it in `DISCREPANCIES.md`. Never silently invent product behaviour: log a question in `OPEN_QUESTIONS.md` and continue with the most conservative reading.

## Hard design rules (never break)
- RTL, Persian UI copy, Persian digits via ONE helper (`fa-digits`), Jalali dates via ONE helper.
- Mobile-first. Reference artboards are width **390**. Desktop (≥1024) must keep the original structure and visual language, only re-laid-out (see decision doc).
- Bottom sheets for all dialogs/pickers/confirmations: no centered modal dialogs, no browser alert/confirm.
- No dark mode. No inner scrolling regions (page scrolls). No reports/KPI screens.
- «چندخدمتی» wording. ADM-NOT is distinct from ADM-AC.
- At most one green (primary) button per page. No «ثبت انجام شد» button.
- Use design-system v2 tokens only. No hard-coded colors/sizes/radii/shadows outside `css/00-tokens/`.
- Touch targets ≥44px. Visible focus. Every interactive control keyboard-operable. axe must pass.

## Architecture rules (summary; full text in the decision doc)
- Mirror ASP.NET MVC: `src/Views/**` (Razor-shaped), `src/wwwroot/**` (copied verbatim to ASP), `src/MockData/**` (= future ViewModels/API JSON), `mock-server/**` (preview only, never ported).
- Templates: Nunjucks restricted to the **Razor-mappable subset**: `{{ var }}`, `if/else`, `for`, `include`, `extends/block`. No custom filters/macros other than those in the mapping table (decision doc §4).
- CSS: plain modern CSS, **no Tailwind, no preprocessor, no bundler**. One concern per file, ≤150 lines per file, cascade layers, tokens as custom properties. Mobile base styles, `min-width` media queries only.
- JS: native ES modules, **one feature per file**, ≤120 lines per file, no framework, no bundler, no inline `<script>`/`onclick`. Behaviour attaches through `data-rv="feature-name"` hooks via `core/registry.js`.
- Data: pages read only from `MockData/<page>.json` through the mock server; all writes go through `js/core/api.js` (mock adapter now, real endpoints later with the same URL shapes).
- Every page/partial gets a header comment: `@model <ViewModelName>` + the JSON file it reads.

## Working method
- Work in **vertical slices**, one page (or small page group) at a time, in the order of `prompts/`.
- A slice is done only when: matches the 390 artboard (pixel-compare script, tolerance logged), desktop 1280 layout reviewed, axe clean, keyboard path works, all states exist (loading/empty/error/disabled where the docs define them), `PROGRESS.md` updated.
- Test with Playwright at widths 390, 768, 1280. Keep screenshots in `tests/screens/` (git-ignored except baselines).
- Do not edit anything under `docs/` or `design-export/`.
- Commit per slice, message in English, imperative.

## Commands (fill in during Phase 1 and keep current)
`npm run dev` (mock server + live reload) · `npm run test:visual` · `npm run test:a11y` · `npm run lint:structure` (enforces file-size and no-inline-JS rules)
