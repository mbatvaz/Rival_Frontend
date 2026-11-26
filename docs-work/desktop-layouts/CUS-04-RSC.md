# CUS-04-RSC — جابه‌جایی نوبت

The owner requested this CUS-04 slice and supplied three mobile screenshots. The exact 390px artboards are listed under CUS-04 in the [manifest](../../design-export/MANIFEST.json). The [Batch 3 source directory](../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/) contains each named artboard below. The supplied screenshots confirm the state map and visual order.

| Preview query | Batch 3 artboard |
| --- | --- |
| `?state=lt24` | `CUS-04-LT24.dc.html` |
| `?state=rsc-select` | `CUS-04-RSC.dc.html` |
| `?state=rsc-confirm` | `CUS-04-RSC-CONFIRM.dc.html` |
| `?state=rsc-warn` | `CUS-04-RSC-WARN.dc.html` |
| `?state=rsc-comp` | `CUS-04-RSC-COMP.dc.html` |
| `?state=rsc-done` | `CUS-04-RSC-DONE.dc.html` |
| `?state=rsc-done-lt24` | `CUS-04-RSC-DONE-LT24.dc.html` |
| `?state=rsc-used` | `CUS-04-RSC-USED.dc.html` |
| `?state=rsc-used-nr` | `CUS-04-RSC-USED-NR.dc.html` |

All queries belong to the existing `/customer/appointments/demo/` preview route. D10-49 reuses the BK-F01 day strip, time controls and context card. D10-59 keeps the context card above the shared confirmation sheet's scrim. D10-61 places the warning on the detail, picker, confirmation, result and updated detail as applicable. BR-RSC-01–08 govern the demo eligibility, fee and compensation copy. Booking and refund actions are simulated with source-backed fixture records. The result reuses StatePage and returns to the same appointment and tracking code.

The direct compensation preview retains the ۱۹:۰۰ current booking shown on CUS-04-RSC-COMP. The normal entry from the customer home and appointment list uses the BK-48390 snapshot already displayed there, سه‌شنبه ۲۸ مهر at ۱۵:۳۰. Both entry points consume the same demo compensation allowance.

At 390px and 768px the picker uses the source reading order, an evidence-backed horizontal rail and a fixed bottom action bar. At 1024px and wider it reuses the approved customer sidebar and content bounds. The action row remains in flow on desktop, the sheet opens from the bottom, and the result reuses the existing compact booking-result treatment. This desktop rendering is for owner review under DEC-072.

The owner’s 2026-11-22 follow-up uses BK-F01 as the desktop picker reference. The Jalali month calendar sits beside a four-column start-time grid. The appointment summary and action move alongside them at 1280px. Mobile keeps the date strip and fixed footer. The confirmation has additional spacing between the time card, warning, explanatory rows and actions. The detail timeline starts and ends at the marker centers. Paragraphs and explanatory booking and result lists use Yekan Bakh Light (300).

## Mobile source comparisons

1. Selection preserves the centered title, trailing photo fade, stylist avatar and single-line current appointment above the calendar. The shared glass finish gives the card a stronger shadow than the artboard.
2. The date strip preserves the green current-day outline, Friday color and darker selected outline. The four-column time grid marks ۱۱:۰۰ selected and disables ۱۷:۳۰ and ۱۸:۰۰ for the Saturday conflict. Day and slot targets use the project's touch dimensions.
3. The confirmation artboard keeps the context card above the scrim. The shared sheet repeats the old and new time, refund deadline, once-only allowance and unchanged fee. Escape returns focus to «ادامه».
4. The late-window state displays the consequence above the calendar and inside the sheet. The confirm action uses «جابه‌جا می‌کنم». Its result and updated detail continue to show the forfeited refund.
5. The compensation artboard and preview show سینا, Sunday ۲۶ مهر at ۱۰:۳۰, and the distinction between the compensation right and the customer's ordinary allowance.
6. Both result artboards use a centered success tile, an old/new time receipt and a tracking code, with «مشاهده نوبت» and «بازگشت به خانه» below. The shared result component supplies the title, receipt and actions.
7. The consumed states return to the existing detail shell and retain the source receipt, struck-through prior appointment and locked reschedule action. The refund-preserving timeline includes the cutoff. The forfeited timeline shows the no-credit explanation and omits that cutoff.

Emulated captures use a viewport height of 844px and device scale factor 1. Detail content scrolls under the existing customer dock. Physical-device testing and desktop owner approval are pending.

## Verification

All ten focused Playwright tests passed at root and under `/rival-demo/`. The suite checks directory links, nine source states, keyboard and sheet focus, 44px controls, blocked slots, persistence, the home compensation entry, console errors, axe and horizontal overflow. Screenshots are under `tests/screens/phase04-reschedule/{root,subpath}/` at 390, 768 and 1280px. Additional boundary checks ran at 320, 1023 and 1024px.

The broader root run passed 155 of 156 tests. The Phase 03 BK-F01 stagger assertion at `tests/phase03/owner-feedback.spec.mjs:19` failed with the same delay values on an isolated build of the unchanged branch tip. The broader subpath run passed all 42 selected checks before the additional compensation entry test, which then passed in the final focused run. Static builds, lint and map checks passed.
