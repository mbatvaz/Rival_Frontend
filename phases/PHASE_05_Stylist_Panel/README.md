# Phase 05 — Stylist Panel

This package is executed by **OpenAI Codex** from the VS Code workspace. It follows root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

## Scope
Stylist dashboard, calendar, requests, appointments, manual booking, schedule, portfolio, notifications, profile, and customer context.

## Required input
- Root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.
- Master docs: Page Inventory, Phase Plan, Component Reuse Matrix, Traceability, Decision Log, Open Questions.
- `design-export/MANIFEST.json` and exact source evidence for the IDs in this phase.
- This package's Source Map and `references/Rival_Phase_05_AI_Handoff.md`.

## Rules
- Do not invent business behavior. Cite Page ID, Component ID, RULE/DEC in code comments or PROGRESS.
- Keep shared components single-source. Run their reuse regression list after changes.
- Preserve RTL, Persian copy, fa-digits/Jalali helpers, bottom sheets, Yekan Bakh, 44px touch targets, and the approved scroll policy.
- Desktop is a page-specific composition based on the mobile design language, not a stretched mobile page.
- Node/npm are local build/test tools only; cPanel receives static `dist/` files.

## Done when
- [ ] Stylist permissions and schedule impact previews are correct.
- [ ] No “ثبت انجام شد” action is introduced.
- [ ] Shared shell and booking components are reused.
- 390/768/1280 checks, axe, keyboard, structure and no-dead-end checks pass.
- `PROGRESS.md`, `DISCREPANCIES.md`, and traceability are updated.
- The agent stops for owner review.
