> **ARCHIVED / NOT ACTIVE:** This document was written for the previous Claude Code workflow. Use root `AGENTS.md`, `README_START_HERE_FA.md`, `prompts/`, and `phases/` for the Codex workflow. Technical instructions in this archive are superseded by `docs/RIVAL_PROJECT_CONTRACT.md`.

این پرامپت را قبل از `00_Audit.md` بچسبان. فایل‌های اصلی هیچ‌وقت جابه‌جا یا ویرایش نمی‌شوند.

---

The batch folders in `design-export/` do NOT share one structure (file names, nesting, and what each batch contains differ). Do not assume a layout and do not move, rename or edit any original file.

1. Run a full listing of `design-export/` (every file, with size). For each batch folder, work out by reading the files what it contains: canvas HTML, CSS, JS, screenshots, fonts, icons, tokens, notes, and which artboards/pages each file covers.
2. Create `design-export/MANIFEST.json` and a readable `design-export/MANIFEST.md`. For each page ID from the docs, list: the batch, the exact path of its canvas HTML (and the selector/anchor/artboard id inside it if the canvas holds many artboards), its CSS files, its screenshot(s) at 390, and any state variants. Use `null` where something is missing.
3. Detect shared things that are duplicated across batches (the same CSS, tokens, fonts, icons) and say which copy is the newest. The design-system v2 files are the authority for tokens, fonts and icons; batch-local copies are only references.
4. Write a small script `tools/export-lookup.js` that, given a page ID, prints its manifest entry, so later prompts can find the right artboard without guessing. Also write `tools/screenshot-artboard.js` that renders a given artboard from the canvas HTML at width 390 when no screenshot exists.
5. List every inconsistency you found (naming, missing screenshots, pages present in docs but absent from exports, pages in exports but absent from docs) in `DISCREPANCIES.md`, each with a proposed handling.

Stop and show me the manifest summary (counts per batch, missing items). From now on, every prompt must locate design assets only through the manifest.
