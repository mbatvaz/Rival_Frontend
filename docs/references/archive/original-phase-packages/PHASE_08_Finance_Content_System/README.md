> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Phase 08 — Finance Content System

این بسته بعد از `00_MASTER_FRONTEND_ARCHITECTURE.zip` و پس از پاس شدن فازهای قبلی اجرا می‌شود.

## Scope
Payments/matching, notification center, portfolio, settings, SMS, profile, booking rules and STATE/SYS/KIT shared patterns.

## Required input
- Master package (canonical IDs, architecture, tokens, route graph, open questions).
- Previous phase output in the sequence.
- Source handoff: `Rival_Phase_08_AI_Handoff.md`.

## Rules
- Do not invent business behavior. Cite `Page ID`, `Component ID`, `RULE/DEC` in code comments or PROGRESS.
- Keep shared components single-source. If a shared component changes, run its reuse regression list before merge.
- Preserve RTL, Persian copy, fa-digits/Jalali helpers, bottom sheets, no inner scroll, and no centered dialogs.

## Done when
- All named IDs/states have a page or explicit fixture.
- 390 artboard match is reviewed; 768 and 1280 layouts are checked.
- axe, keyboard, structure and no-dead-end checks pass.
- `PROGRESS.md`, `DISCREPANCIES.md`, and traceability entries are updated.
