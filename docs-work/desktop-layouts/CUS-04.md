# CUS-04 — جزئیات نوبت

Status: owner accepted the implemented desktop preview on 2026-11-21. Remaining CUS-04 action variants remain pending.

The 390px Batch 3 board `CUS-04.dc.html` establishes the centered back header, 168px hero media, status over the image, date/countdown, service and map action, payment receipt, and chronological policy card. `CUS-04-DONE.dc.html` supplies the completed receipt, and `CUS-04-INACTIVE.dc.html` supplies the disabled customer controls and reason. The initial cancellation impact preview follows `CUS-04-CAN-GT24.dc.html`. The original files live in the [Batch 3 source directory](../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/).

Below 1024px the document follows the mobile reading order, with the shared 720px tablet content bound from 768px. From 1024px reuse the CUS-03 customer shell, 245px right sidebar and established header alignment. Use two columns in the main area: hero and receipt on the right, and the taller policy/action card on the left. Keep read-only hero and payment in the same right column. The cancellation preview uses the shared bottom sheet and restores opener focus. The desktop composition is pending owner review on port 8183.

The first preview renders source-backed receipts for BK-48213 and BK-47920. Other list records open their own recorded status/service/date. CUS-03 supplies identity and status data, and CUS-01 supplies the matching countdown presentation. Cancellation confirmation and the reschedule calendar remain pending; the preview performs no mutation. The map uses the existing OQ-08 development destination.

## Source comparisons

1. The default board places the back button on the right and centers the heading. The 390px capture preserves that placement with the shared header spacing and icon control.
2. The hero keeps the 168px media area, the shave photo at center 30%, and the dark “رزرو شده” badge over the photo. The date and time remain in separate areas above the service and map row. The timer displays the source fixture's fixed values for this review.
3. The default receipt retains the four labeled rows, paid-at timestamp and tracking code, with the two ۹۰٬۰۰۰ تومان amounts split between credit and gateway.
4. The policy list keeps the default board's four steps and first-step emphasis. The existing glass surface, typography, and 44px rules link increase its height compared with the export.
5. The DONE board has grayscale imagery, muted date/time, no countdown, and the gateway-only receipt. The completed capture preserves those distinctions and omits the management controls.
6. The inactive capture preserves the receipt and policy while disabling both actions and displaying the source lock explanation. The cancellation capture preserves the full-credit consequence and ۱۶:۰۰ deadline from CAN-GT24, using the shared bottom sheet and a text deadline in place of the artboard's bar.
7. At 768px the capture keeps the mobile reading order. At 1280px the title and back control sit beside the existing right sidebar, the hero and receipt share the right column, and the policy card sits on the left.

Browser coverage measures 320/390/768/1023/1024/1280px at a viewport height of 844px. The detail suite checks the source keys, navigation, 44px controls, horizontal overflow, normal/reduced motion, keyboard activation and focus return, axe, console and failed requests. Captures are under `tests/screens/phase04-detail/` for both base paths. No physical-device test was run.
