> **ARCHIVED / NOT ACTIVE:** This document was written for the previous Claude Code workflow. Use root `AGENTS.md`, `README_START_HERE_FA.md`, `prompts/`, and `phases/` for the Codex workflow. Technical instructions in this archive are superseded by `docs/RIVAL_PROJECT_CONTRACT.md`.

این اولین پرامپت است. در Claude Code (در ریشه ریپو) بچسبان.

---

Read `CLAUDE.md` fully, then read, in this order: the 2026-11-02 architecture decision, the 2026-11-01 owner-closures decision, Handoff_08, Handoff_07, `Rival_Design_Common.md`, `Rival_Design_00_Guide.md`, `docs/README.md`, and the Design-System v2 changelog. Skim Handoff_06 and the batch files for structure only.

Then inspect `design-export/` (canvas HTML/CSS, screenshots, design-system v2 files).

Do NOT write any app code yet. Produce, at repo root:

1. `PAGE_INVENTORY.md`: every screen/page ID from the docs (public, auth, customer, stylist, admin, system states), its Area/Controller/Action name, which batch and artboard it comes from, which sheets/components it uses, which states it has, and which MockData file it needs. One table, grouped by Area.
2. `COMPONENT_INVENTORY.md`: every reusable component and sheet seen across batches (name, variants, states, where used), merged and de-duplicated, with the proposed file names for its Razor partial, CSS file and JS file.
3. `DESIGN_EXPORT_MAP.md`: what is in `design-export/`, how canvas artboards map to page IDs, what is missing, and how to compare screenshots.
4. `DISCREPANCIES.md` and `OPEN_QUESTIONS.md`: conflicts between docs and canvases (including the 4 known un-updated canvas items) and any ambiguity, each with your proposed default.
5. `PLAN.md`: ordered list of slices (matching `prompts/` order), with estimated size of each and risks.

Finish with a 10-line summary. Wait for my review before continuing.
