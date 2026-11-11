# Phase 03 — Customer Booking

This package is executed by **OpenAI Codex** from the VS Code workspace. It follows root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

## Scope
Fixed, Proposed, Requested, recurring, availability alerts, payment return, and hold/system-state flows. Build the canonical reusable StatePage base and booking-owned STATE-04..07 variants.

## Required input
- Root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.
- Master docs: Page Inventory, Phase Plan, Component Reuse Matrix, Traceability, Decision Log, Open Questions.
- `design-export/MANIFEST.json` and exact source evidence for the IDs in this phase.
- This package's Source Map and `references/Rival_Phase_03_AI_Handoff.md`.

## Rules
- Do not invent business behavior. Cite Page ID, Component ID, RULE/DEC in code comments or PROGRESS.
- Keep shared components single-source. Run their reuse regression list after changes.
- Preserve RTL, Persian copy, fa-digits/Jalali helpers, bottom sheets, Yekan Bakh, 44px touch targets, and the approved scroll policy.
- Desktop is a page-specific composition based on the mobile design language, not a stretched mobile page.
- Node/npm are local build/test tools only; cPanel receives static `dist/` files.

## Done when
- [x] Fixed/Proposed/Requested/recurring flows and hold states are covered.
- [x] StatePage base is reusable; STATE-04..07 are explicit variants.
- [x] Mock payment and booking results are visibly demo-only; no real transaction is implied.
- 390/768/1280 checks, axe, keyboard, structure and no-dead-end checks pass.
- `PROGRESS.md`, `DISCREPANCIES.md`, and traceability are updated.
- The agent stops for owner review.

Implementation review: `docs-work/PHASE_03_REPORT_FA.md`. Owner acceptance is pending.
