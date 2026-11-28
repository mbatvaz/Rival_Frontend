# STY-02 stylist calendar

The owner approved the initial STY-02 preview under DEC-090 and accepted the expanded slice under DEC-091. The calendar is available at `/stylist/calendar/` with six named scenes in the preview directory.

## Comparison to Batch 4 at 390px

The [source map](../docs/ai/DESIGN_SOURCE_MAP.md#sty-02) identifies the seven read-only boards.

- M preserves the RTL week strip, selected-day capsule, availability and history summary, and timed agenda. Free slots use paired manual booking and block actions with a dashed separator. The accepted stylist header retains the Rival wordmark.
- MON opens from the month label and reuses the booking month grid, with past days disabled and a link to appointment history. The bottom sheet uses the shared opaque surface, grip and focus restoration.
- E presents the working hours, the full-day free interval and the end-of-day marker. The empty message distinguishes days with a personal block from days that are entirely free.
- HOL uses the official holiday badge, centered closure card and date-specific acceptance action. HOLA switches to the accepted badge, hours notice and agenda scoped to the accepted window.
- BLK lays out the half-hours, private title field, release options and interval-specific confirmation. The shared radio treatment follows the previously accepted design-system control.
- BLKD shows range, duration, scheduled release and immediate opening. A dedicated sheet can edit the title and release of an existing block in this demo. The source routes full scheduling edits through STY-08.

## Demo scope

- The calendar starts from the source's 26 Mehr 1405 and offers a six-month navigation window in the local fixtures. The selected day can also be opened by its Jalali date query.
- Personal blocks and holiday acceptance persist through the shared demo API. Slot changes check the accepted hours and active records before writing. ReleaseAt uses the demo clock and only frees the portion left available by other constraints.
- The registered manual booking and appointment routes remain the entry points for subsequent Phase 05 slices. The full STY-08 schedule editor and dashboard block-detail entry remain tracked separately.
- Scheduled release shows today's Jalali date as a locked value. The 24-hour picker limits new release times to today's selected block, from its start through the minute before it ends. It returns focus to the block editor. The wheels snap to the closest row on touch and pointer release and support keyboard increments. Reduced motion skips smooth repositioning. Existing saved release times remain effective when an edit leaves them unchanged.

## Verification

- The Phase 05 dashboard and calendar suites passed on the project preview at `http://localhost:4173` in Chrome. The five calendar tests also passed under `/rival-demo/`.
- Browser evidence spans 320px, 390px, 768px and 1280px. The calendar suite covers the shared sheet grip, vertical entry without opacity keyframes, Escape and focus return, axe checks for month and detail, validation, persistence and timed release.
- Captures are under `tests/screens/phase05/` with the `sty-02-` prefix. The source comparison uses desktop Chrome viewport emulation.

## Week and navigation motion

- A horizontal touch swipe beyond 48 px uses the same bounded week change as the week arrows. Both strips translate across their complete width over `--duration-slow`. Next exits right and enters from the left. Previous exits left and enters from the right. A new move replaces the running animation. Vertical scrolling and pinch zoom use the browser's native gestures.
- The shared role dock uses the Phase 04 indicator and timing. The right-hand list contracts the current fill over `--duration-base` before navigation and opens the destination over `--duration-slow`. Staff preview destinations use the shared right-hand list at 768 px and above.
- Reduced motion switches weeks and routes directly. The outgoing strip is inert and hidden from assistive technology while the incoming week owns focus and controls.
