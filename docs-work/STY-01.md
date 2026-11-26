# STY-01 stylist dashboard

Phase 05, assigned 2026-11-26. Development branch `web/phase-05-stylist-panel`. Dashboard closed out under DEC-089 and development advanced to [STY-02](STY-02.md).

- Entry: `/stylist/`. Routes and assets use the configured base path. The panel layouts reuse RoleLayout, the mobile role dock, the customer sidebar link partial, and the shared Sheet and logout flows.
- Batch 4 artboards: `STY-01-M` (default), `M2` (completed), `E` (empty), `OFF` (inactive), `NS` (confirmation), and `NS2` (receipt). Exact files and screenshots are in the [design manifest](../design-export/MANIFEST.json). Default preview uses the approved fixture date of 26 Mehr 1405.
- Query values are listed in the [registry](../src/page-registry.json). The build renders [the dashboard fixture](../src/MockData/stylist/dashboard.json). The no-show action stores the IDs through the shared API adapter. The static fixtures model appointments that have already ended on the depicted day. A future server enforces eligibility, scope, and the 23:59 cutoff.
- D10-13 keeps no-show out of the current appointment and SF-03 removes a manual completion action. Inactive preview disables manual booking and hides open responses. The no-show confirmation uses the approved copy and shared focus handling.
- The mobile order stays intact at larger widths. From 768px the existing role destinations move into the RTL right-hand list per DEC-087. The dashboard content widens to 720px. Timeline and card layouts wrap within that column.
- Existing service thumbnails fill the media slots. Customer initials are used where the exported image references do not have matching runtime customer assets.
- Calendar, appointment details, SMS, schedule, manual booking, and other role destinations link to their registered preview routes while their Phase 05 implementation is pending. The notice dismiss buttons affect the current document.

## Source comparison

- M and owner image 1: the RTL header shows the full Rival logo, a vertical divider, the weekday and lighter date, and the unread bell at the opposite edge. The dismissible rose personal notice sits above the quick actions.
- M: the current appointment uses the ink surface, light progress bar, paired contact controls and white detail button. Customer initials fill the avatar positions.
- M/M2: the two open requests precede the day plan. Their images sit on the left in a fixed-height crop and the deadline strip distinguishes urgent and ordinary states. The requests count badge on the mobile dock and contact buttons on individual upcoming rows remain pending.
- M/M2 and owner comments 2 and 5: the day plan uses the native Phase 04 raised and inset radio pills. Completed cards use the turquoise success or orange warning StatusBadge and the red-toned no-show action.
- E/OFF and owner image 3: the inactive notice uses the flat warning surface, outline, and unframed alert icon with dark heading and body copy. Confirmed appointments stay visible. Open holds and manual booking become read-only slots.
- NS and owner image 2: the shared bottom sheet has a warning tile in its header, a separator before and after the consequences row, and a timer icon beside the deadline. Two equal actions finish the panel.
- NS2 and Design System v2 Feedback: a white toast enters from the top with an ink check icon and names the appointment and time. The saved row shows the warning badge and the gauge updates.
- At 768px and 1280px the same dashboard order sits alongside the right-hand role links. The shared mobile dock stays available at 767px and below.

## Verification

The owner review follow-up applies [DEC-088](../docs/DECISION_LOG.md#dec-088--phase-04-loading-and-motion-defaults-across-phases). Shared skeletons preserve the current card, request card image slots, and timeline rows while data and media load. The entry runner uses the existing Phase 04 durations and easing. Selecting a radio reveals that list with the same runner and cancels the outgoing list. Opening the sheet cancels pending entry and closing it restores focus. Reduced motion preserves the full content without a reveal or shimmer.

Follow-up verification passed 18 focused browser tests at root and four STY-01 tests under `/rival-demo/`. Browser emulation covered the 519 × 893 owner viewport for skeleton and motion behavior and the 390 px screenshots for the three reference states. The root build was restored. Structure, JS, CSS, documentation and whitespace checks passed. Tests used the installed Chrome because the bundled Chromium download returned HTTP 403.

The final motion revision applies a dark sweep to the completed portion of the ongoing appointment progress bar. It travels from the physical right edge to the left, with no effect on the value announced by the native progress element. Reduced motion leaves the bar static. The inactive alert adopts the shared right-edge reveal and the no-show dialog uses the same opaque vertical slide and grip as the other bottom sheets. The first shared regression run passed 62 tests in installed Chrome, covering desktop and mobile popups, drag, nested focus, navigation drawer recovery and dashboard behavior.

Closeout checks passed 17 tests at root and 11 under `/rival-demo/` using installed Chrome. The gallery checks assert that opening and closing animate translation alone, and that Escape and the close control restore focus. A live 519px check verified right-to-left progress keyframes, clipping to the elapsed width, and the static reduced-motion state.

- Playwright passed 8/8 at root and 8/8 under `/rival-demo/` in the final focused run. The selection covered all six dashboard artboards, three role shells, preview approval controls, and the 1280px customer appointment cancellation regression.
- Dashboard tests covered 320, 375, 390, 767, 768, 1024, 1280 and 1440 CSS px at 900px height and DPR 1. Axe ran at 390, 768, and 1280 and in the no-show Sheet. Keyboard navigation, focus restoration, local save and reload, and no page overflow passed. Captures are local under `tests/screens/phase05/`.
- Static builds, structure lint, scoped JS/CSS lint, and documentation validation passed. The broader affected run stopped during the initial subpath suite. The stylist shell assertion was updated for the implemented dashboard and the customer contrast check passed in both final focused runs. Full phase acceptance remains pending.
