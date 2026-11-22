# CUS-04 — جزئیات نوبت

The owner accepted the full CUS-04 detail slice under DEC-080. See the [CUS-04-RSC review](CUS-04-RSC.md) for the rescheduling evidence.

The 390px Batch 3 board `CUS-04.dc.html` establishes the centered back header, 168px hero media, status over the image, date/countdown, service and map action, payment receipt, and chronological policy card. `CUS-04-DONE.dc.html` supplies the completed receipt, and `CUS-04-INACTIVE.dc.html` supplies the disabled customer controls and reason. The initial cancellation impact preview follows `CUS-04-CAN-GT24.dc.html`. The original files live in the [Batch 3 source directory](../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/).

Below 1024px the document follows the mobile reading order, with the shared 720px tablet content bound from 768px. From 1024px reuse the CUS-03 customer shell, 245px right sidebar and established header alignment. Use two columns in the main area: hero and receipt on the right, and the taller policy/action card on the left. Keep read-only hero and payment in the same right column. The cancellation preview uses the shared bottom sheet and restores opener focus. The desktop composition is pending owner review on port 8183.

The first preview renders source-backed receipts for BK-48213 and BK-47920. Other list records open their own recorded status/service/date. CUS-03 supplies identity and status data, and CUS-01 supplies the matching countdown presentation. Cancellation confirmation and the reschedule calendar remain pending; the preview performs no mutation. The map uses the existing OQ-08 development destination.

## Appointment Swap extension

DEC-076 keeps the accepted hero, receipt, policy columns and management row. On the controlled swap appointments, a second row of two secondary buttons follows the existing management row. Create, active code, redeem, errors and completion use the usual bottom Sheet at all widths. The date field opens a second shared Sheet containing the existing Jalali grid. The upper Sheet owns focus. The document scrolls where content exceeds the viewport. Batch 3 has no swap artboard. Copy and states follow the [feature contract](../../docs/features/APPOINTMENT_SWAP.md) and use CUS-04-CAN-GT24 and the CUS-03 date filter as component evidence. The extension awaits owner review.

### Swap visual evidence

On closing the swap Sheet, the detail keeps the background scroll position visible while the Sheet was open. The opener regains focus without scrolling the page back down.

DEC-078 uses the cancellation hero lift for both swap entry buttons and preserves that hero across subsequent steps. Long forms start below the full appointment summary and use document scrolling. The code view reuses the payment hold badge and progress styles and paints the remaining time from the offer deadline. Success content is centered.

DEC-079 reuses the cancellation scrim tint and the canonical Sheet slide. The form and direct preview states render at their final size before the slide begins. The nested calendar stays fixed to the viewport so opening it leaves the parent layout in place. The shared Sheet restores focus and scroll on close. Initial focus follows the input method, with the visible ring available for keyboard users. Reduced motion retains the final layout without interpolation.

- At 390×844 the cancellation and swap captures show the same tint behind the lifted card. Their scrims also have identical computed background colors.
- The lifted swap card keeps the same 16px top placement and 358px width as cancellation at 390px. The long create form begins below the card, and the page scroll exposes its final action.
- The sheet keeps the reference close placement, RTL heading and mobile grip. Keyboard captures show the ring at the close control. Pointer-opening checks keep focus there with the ring hidden until keyboard input.
- At 768×844 the calendar sits over the retained create form and keeps its grid within the viewport. Dismissing it returns focus to the date field.
- At 1280×844 the same eased slide brings the result to the bottom center. The appointment card remains in the approved right content column while the background uses the cancellation tint.

DEC-077 adds an in-place confirmation view with a two-row schedule card, a return-to-code action and a final consent action. The result view uses the same Sheet and displays the received schedule, success status and two navigation actions. Both states retain the existing bottom alignment on desktop.

- At 390×844 the confirmation keeps the CUS-04-CAN-GT24 mobile scrim, grip and rounded bottom-attached surface.
- The confirmation keeps the reference title at the right and close control at the left. The title receives keyboard focus when the step changes.
- The schedule card uses two right-aligned, separated rows in the space where the reference shows cancellation impact. Each row shows a Persian date and 24-hour time.
- The two actions keep the reference primary-right and secondary-left placement. The confirmation uses the ink primary action for consent.
- At 768×844 the schedule stays in two rows within the centered Sheet. At 1280×844 the result stays bottom-aligned over the approved two-column detail and places the received date above the navigation actions.

The references are the styled Batch 3 `CUS-04.html`, `CUS-04-CAN-GT24.html` and `CUS-03-FILTER.html` at 390×844, DPR 1. The corresponding fragment files contain the markup but their direct file renders omit the styles. Runtime states are captured under `tests/screens/phase04-swap/` for review.

1. At 390px the detail uses CUS-04's back arrow at the right, centered heading, hero status pill over the shave image, and separate Jalali day and 24-hour time. The controlled record shows its own date and has no fixed review countdown.
2. The receipt and glass policy card follow the hero in the same order as CUS-04. The policy still pairs the ink reschedule and danger cancellation buttons, with two secondary swap actions directly below. The demo receipt and original-payer rule are fixture-specific copy.
3. At 768px the create Sheet remains bottom attached on a centered shared surface, with wider lines for the rules. At 1280px the underlying desktop layout puts hero and receipt in the right column and the policy/actions in the left column.
4. Against CUS-04-CAN-GT24, the 390px swap Sheets retain the mobile grip, scrim, rounded top corners and left close control. The new headings and action labels use the native Rival typography and buttons. Keyboard focus is visible at the close and default controls.
5. The CUS-03 filter's boxed date control and calendar icon inform the create field. The new form has one date control with a nested Jalali grid instead of two range endpoints. The parent remains visible and inert behind the calendar.
6. The active code, invalid-code error and completion have no exact source artboards. Fresh 390px captures show the code and copy control on the shared surface, the error immediately below the form without losing the input, and the completion with two explicit destinations.

## Source comparisons

1. The default board places the back button on the right and centers the heading. The 390px capture preserves that placement with the shared header spacing and icon control.
2. The hero keeps the 168px media area, the shave photo at center 30%, and the dark “رزرو شده” badge over the photo. The date and time remain in separate areas above the service and map row. The timer displays the source fixture's fixed values for this review.
3. The default receipt retains the four labeled rows, paid-at timestamp and tracking code, with the two ۹۰٬۰۰۰ تومان amounts split between credit and gateway.
4. The policy list keeps the default board's four steps and first-step emphasis. The existing glass surface, typography, and 44px rules link increase its height compared with the export.
5. The DONE board has grayscale imagery, muted date/time, no countdown, and the gateway-only receipt. The completed capture preserves those distinctions and omits the management controls.
6. The inactive capture preserves the receipt and policy while disabling both actions and displaying the source lock explanation. The cancellation capture preserves the full-credit consequence and ۱۶:۰۰ deadline from CAN-GT24, using the shared bottom sheet and a text deadline in place of the artboard's bar.
7. At 768px the capture keeps the mobile reading order. At 1280px the title and back control sit beside the existing right sidebar, the hero and receipt share the right column, and the policy card sits on the left.

Browser coverage measures 320/390/768/1023/1024/1280px at a viewport height of 844px. The detail suite checks the source keys, navigation, 44px controls, horizontal overflow, normal/reduced motion, keyboard activation and focus return, axe, console and failed requests. Captures are under `tests/screens/phase04-detail/` for both base paths. No physical-device test was run.
