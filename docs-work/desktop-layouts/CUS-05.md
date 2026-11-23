# CUS-05 — Requests

Desktop preview for owner review under DEC-072. Use the existing customer header, right navigation and main workspace. Keep the three request groups and filter in the header. Payment and review cards occupy up to two columns; completed requests use compact rows in one bounded glass list.

The Batch 3 CUS-05, WAIT, DONE, FILTER and EMPTY HTML exports define the 390px views. At 768px the same content uses the available width. The desktop layout starts at 1024px. The filter remains a shared bottom Sheet.

## Source comparisons

The styled [Batch 3 export](../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/) and runtime were captured at 390×844, DPR 1. Runtime captures use the shared customer dock and native 44px controls.

1. `CUS-05.html` uses three compact tabs with count bubbles and an ink selection. The runtime applies that treatment to native radios and keeps the filter control on the same row. On 2026-11-23 the owner renamed the completed tab to “تکمیل” and replaced the ink selection with the CUS-03 appointment radio treatment (DEC-081); the count bubbles remain.
2. The default artboard shows the timer, amount and orange track inside each of the two payment cards. The first preview detached that information from the glass cards. Each footer now shares the card surface and follows the matching request deadline.
3. `CUS-05-WAIT.html` uses the same image/date frame without hold controls. `CUS-05-DONE.html` switches to compact grayscale history rows with distinct status colors. Runtime records retain date, name and status in both layouts.
4. `CUS-05-FILTER.html` shows multi-select statuses, exclusive service and stylist filters, a fixed upper date and a result count. The runtime uses native controls, a nested Jalali picker and a live apply count. The review URL pins the artboard date, ۲۲ مهر, while ordinary use takes today's Tehran date.
5. `CUS-05-EMPTY.html` keeps all counts at zero and points to the dock booking action. The runtime uses the shared mobile dock. Desktop offers the existing booking link in the empty card.

Routes include `?tab=wait`, `?tab=done`, `?tab=done&state=filter` and `?state=empty`. Requests registered in the existing booking flow appear under the response tab and open their own details. The static registration receipt links to that tab when client-side record data is unavailable.

Screenshots are under `tests/screens/requests/source/`, `root/` and `subpath/`. The record-level review covers keyboard focus and Escape, reduced motion, document overflow, local assets and axe. Results apply to Chromium emulation.
