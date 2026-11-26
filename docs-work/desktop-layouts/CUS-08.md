# CUS-08 — Availability alerts

The owner accepted CUS-08 on 2026-11-24 under DEC-082. Desktop uses the existing customer shell and right navigation. Counts and the add action sit above two desktop columns, with active cards on the right and finished rows on the left. At 390 and 768px the sections follow the Batch 3 order in one column. Add and cancellation use the shared bottom Sheet.

The styled [Batch 3 export](../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/) contains CUS-08, ADD, ADD-DUP and CAN. D10-55, D10-59 and D10-63 define the two groups, impact preview and exclusive selectors. The review URLs show the source example with its fixed date. The normal route uses the same local alert records as booking.

## Source comparisons

1. `CUS-08.html` shows ۱ active and ۳ finished alerts beside Add. The reference route reproduces those counts. The ordinary route and dashboard count active local alerts.
2. The active card keeps the service image on the left, with the stylist portrait, blue status badge, deadline and cancel action on the right and footer. Runtime uses the existing appointment media treatment and sized controls.
3. The three history rows keep the source's grayscale photos and release, expiry and cancellation statuses. Only the released row enters booking.
4. `CUS-08-ADD.html` shows an exclusive service group, portrait picker, three eligibility facts and two actions. Runtime uses native radios and the existing booking Sheet. The current catalog controls eligible stylists.
5. `CUS-08-ADD-DUP.html` replaces the facts with a blue notice and disables registration. Runtime uses the same stored service/stylist pair for the duplicate check and allows changing either selection.
6. `CUS-08-CAN.html` lifts the active card above the scrim, removes its cancel button from the lifted copy and shows the no-message and no-financial-impact explanation. Runtime reuses the appointment lift and shared focus restoration.

The released source record names Sina for haircut. The demo booking catalog includes that pairing, and the history link opens time selection with haircut and Sina selected. Demo register/cancel persists to `booking/alerts` on the normal route. Source review scenarios use an isolated sample clock and records.

## Verification

The four source states were captured and checked with axe at 320, 390, 768, 1024 and 1280px, height 844 and DPR 1, in Chromium. Functional checks exercised live registration in booking and in CUS-08, duplicates, cancellation, Escape and focus return, local expiry and the dashboard count. The focused root and subpath runs each passed 33/33. Captures are under `tests/screens/availability-alerts/`.
