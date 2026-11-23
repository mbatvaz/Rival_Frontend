# CUS-06 — Request detail

Desktop preview for owner review under DEC-072. From 1024px the request content follows the mobile reading order in a centered column around half the available workspace, with a 420px minimum where space allows. The payment actions sit below the summary on desktop and occupy a bottom bar on mobile. The package timeline connects the centers of consecutive date cards and stays within the first and last markers.

Batch 3 CUS-06 detail and cancellation HTML exports define the 390px views. Narrow screens follow the artboard order. Cancellation uses the shared Sheet, and payment opens the existing demo payment result.

## Source comparisons

The [Batch 3 export](../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/) defines the eleven detail and cancellation artboards.

1. `CUS-06-B.html` places the request badge on the 168px image and layers the request identity below. The preview uses the same image and order, with the shared header height. Its schedule now groups three service-image cards beneath two Jalali day markers.
2. `CUS-06-P-PAY.html` uses a separate stylist response card with day, 24-hour time and the original preference. The preview replaces the generic schedule row with that response layout and uses the artboard's green payment action and secondary cancellation action.
3. `CUS-06-R-REVIEW.html` shows the plum coordination notice and numbered components before a time is assigned. `CUS-06-P-REVIEW.html` instead shows the three preference facts and next steps. The two preview variants preserve their respective details and omit a type label.
4. `CUS-06-BOOKED.html` links each package part to its own appointment and shows the package receipt. The preview now targets BK-48371 and BK-48372, with the package and receipt facts in the linked detail. A completed demo payment also exposes each paid part. A direct visit to an unpaid part shows the missing-record view.
5. `CUS-06-CAN-REVIEW.html` and `CUS-06-CAN-PAY.html` lift the request card and show the cancellation impact. The shared Sheet restores focus on dismissal. Confirmation updates the browser-local request and the customer list.
6. `CUS-06-REJ.html`, `CUS-06-CXL.html`, and `CUS-06-EXP.html` distinguish their outcomes with the correct badge, message and next action. `CUS-06-INACTIVE.html` retains the response, amount, and hold while disabling both payment and cancellation. The contact link uses the confirmed Rival number in OQ-08.

The [registry](../../src/page-registry.json) lists the state URLs. The separate RQ-2186 row in CUS-05 has no dedicated detail artboard or schedule facts. Its summary uses the recorded service, stylist and status, and links to the appointments list. Desktop spacing and alignment are preview choices under DEC-072.

The demo preserves the hold through payment, shares the Phase 03 payment result and returns to the selected request. The request-associated CUS-04 preview displays only the source-backed appointment and receipt details. The browser mock supplies the state transitions.

The final request suite passed 13/13 at each base path. The six viewport widths covered 320, 390, 768, 1023, 1024 and 1280px at 844px height. This includes axe at every artboard state at 390/1280, shorter focused axe matrices at the other widths, and real keyboard/calendar, registration, cancellation and checkout interactions. Captures are under `tests/screens/requests/`. The browser mock uses Web Locks for exclusive cancellation and payment writes. Verification used Chromium emulation.
