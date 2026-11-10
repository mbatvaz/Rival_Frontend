# 00a — Validate / Complete Design Export Manifest

The package already includes `design-export/MANIFEST.json` and `MANIFEST.md`, generated from the uploaded Master archive and the canonical Page Inventory.

Use Codex to validate, not blindly recreate, them:

```text
Read AGENTS.md, docs/RIVAL_PROJECT_CONTRACT.md, docs/PAGE_INVENTORY.md,
and design-export/MANIFEST.md + MANIFEST.json.

Treat all original files under design-export/batches/ and
 design-export/design-system-v2/ as immutable evidence.
Do not move, rename, edit, or delete original exports.

Walk every file under design-export/batches/ and compare it with the manifest.
For each canonical page ID, verify exact source HTML paths, named screenshots,
CSS/JS files, batch number, and whether the mapping is missing or implied.
Do not infer an artboard selector; use null if not verified.

Update only derived manifest/report files if the audit proves an omission:
- design-export/MANIFEST.json
- design-export/MANIFEST.md
- docs/DISCREPANCIES.md

Do not mark hashed image assets as screenshots. Do not load exported batch CSS
as production CSS. Report counts per batch, unmatched HTML files, missing
screenshots, and page IDs without independent artboards. Stop for review.
```
