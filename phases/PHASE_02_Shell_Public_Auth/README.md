# Phase 02 — Shell Public Auth

This package is executed by **OpenAI Codex** from the VS Code workspace. It follows root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

## Scope
Shared shell, role navigation, purpose-designed desktop shell, bottom sheets, public pages, authentication, and final OTP/lock decisions.

## Required input
- Root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.
- Master docs: Page Inventory, Phase Plan, Component Reuse Matrix, Traceability, Decision Log, Open Questions.
- `design-export/MANIFEST.json` and exact source evidence for the IDs in this phase.
- This package's Source Map and `references/Rival_Phase_02_AI_Handoff.md`.

## Rules
- Do not invent business behavior. Cite Page ID, Component ID, RULE/DEC in code comments or PROGRESS.
- Keep shared components single-source. Run their reuse regression list after changes.
- Preserve RTL, Persian copy, fa-digits/Jalali helpers, bottom sheets, Yekan Bakh, 44px touch targets, and the approved scroll policy.
- Desktop is a page-specific composition based on the mobile design language, not a stretched mobile page.
- Node/npm are local build/test tools only; cPanel receives static `dist/` files.

## Done when
- [x] Shared shell is implemented once and driven by role/navigation data.
- [x] Desktop layout is reviewed as a distinct composition, not a scaled mobile canvas.
- [x] OTP, lock-all-methods, accessibility, and 390/768/1280 checks pass.
- 390/768/1280 checks, axe, keyboard, structure and no-dead-end checks pass.
- `PROGRESS.md`, `DISCREPANCIES.md`, and traceability are updated.
- The agent stops for owner review.

## Accepted implementation — 2026-11-10

The owner explicitly accepted Phase 02 after three review rounds. Approved UI overrides and current truth are in DEC-034..041 and docs-work/PHASE_02_CLOSEOUT_FA.md. The checklist applies to the static reference: actual authentication/security enforcement remains backend-owned. No destructive domain action was introduced; logout retains confirmation. The owner authorized closeout only and explicitly prohibited starting Phase 03 until a new instruction.
