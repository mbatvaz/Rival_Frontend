# STY-01 stylist dashboard

Phase 05, assigned 2026-11-26. Development branch `phase/05-stylist-panel`. Owner review pending.

- Entry: `/stylist/`. Routes and assets use the configured base path. The panel layouts reuse RoleLayout, the mobile role dock, the customer sidebar link partial, and the shared Sheet and logout flows.
- Batch 4 artboards: `STY-01-M` (default), `M2` (completed), `E` (empty), `OFF` (inactive), `NS` (confirmation), and `NS2` (receipt). Exact files and screenshots are in the [design manifest](../design-export/MANIFEST.json). Default preview uses the approved fixture date of 26 Mehr 1405.
- Query values are listed in the [registry](../src/page-registry.json). The build renders [the dashboard fixture](../src/MockData/stylist/dashboard.json). The no-show action stores the IDs through the shared API adapter. The static fixtures model appointments that have already ended on the depicted day. A future server enforces eligibility, scope, and the 23:59 cutoff.
- D10-13 keeps no-show out of the current appointment and SF-03 removes a manual completion action. Inactive preview disables manual booking and hides open responses. The no-show confirmation uses the approved copy and shared focus handling.
- The mobile order stays intact at larger widths. From 768px the existing role destinations move into the RTL right-hand list per DEC-087. The dashboard content widens to 720px. Timeline and card layouts wrap within that column.
- Existing service thumbnails fill the media slots. Customer initials are used where the exported image references do not have matching runtime customer assets.
- Calendar, appointment details, SMS, schedule, manual booking, and other role destinations link to their registered preview routes while their Phase 05 implementation is pending. The notice dismiss buttons affect the current document.

## Source comparison

- M: the header pairs the weekday and date with a separate bell. The dismissible rose personal notice remains immediately above the gauge and two quick actions.
- M: the current appointment uses the ink surface, light progress bar, paired contact controls and white detail button. The existing Rival mark and customer initials fill the logo and avatar positions.
- M/M2: the two open requests precede the day plan. Their images sit on the left in a fixed-height crop and the deadline strip distinguishes urgent and ordinary states. The requests count badge on the mobile dock and contact buttons on individual upcoming rows remain pending.
- M/M2: the day plan keeps its two pill tabs and right-hand time markers. It distinguishes free, confirmed, held and blocked slots. The completed view exposes no-show after an appointment ends.
- E/OFF: the empty view retains the next appointment and calendar entry. The inactive view preserves confirmed appointments and replaces open holds and manual booking with read-only slots.
- NS/NS2: the confirmation attaches to the viewport bottom and the result changes the affected row and gauge. The status message anchors above the dock so it remains visible after confirmation from a scrolled list.
- At 768px and 1280px the same dashboard order sits alongside the right-hand role links. The shared mobile dock stays available at 767px and below.

## Verification

- Playwright passed 8/8 at root and 8/8 under `/rival-demo/` in the final focused run. The selection covered all six dashboard artboards, three role shells, preview approval controls, and the 1280px customer appointment cancellation regression.
- Dashboard tests covered 320, 375, 390, 767, 768, 1024, 1280 and 1440 CSS px at 900px height and DPR 1. Axe ran at 390, 768, and 1280 and in the no-show Sheet. Keyboard navigation, focus restoration, local save and reload, and no page overflow passed. Captures are local under `tests/screens/phase05/`.
- Static builds, structure lint, scoped JS/CSS lint, and documentation validation passed. The broader affected run stopped during the initial subpath suite. The stylist shell assertion was updated for the implemented dashboard and the customer contrast check passed in both final focused runs. Full phase acceptance remains pending.
