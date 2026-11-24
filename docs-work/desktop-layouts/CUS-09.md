# CUS-09 — Customer notifications

The owner accepted CUS-09, including the desktop composition and three review states, on 2026-11-24 under DEC-083.

## Sources and states

[Batch 3](../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/) supplies `CUS-09.html`, `CUS-09-READ.html` and `CUS-09-EMPTY.html`. D10-56 and the Design System v2 `NotificationItem` define time grouping, read state, public notices, resource links and pagination. The Phase 04 handoff §1.6 keeps read status independent of the linked resource's status.

| Review query | Source | Preview |
| --- | --- | --- |
| `?state=example` | `CUS-09.html` | Six initial rows, one unread, with 24 demo records available |
| `?state=read` | `CUS-09-READ.html` | All rows read, bulk action disabled and toast visible |
| `?state=empty` | `CUS-09-EMPTY.html` | Empty frame with the shared customer navigation |

The normal URL uses the same sample records and stores read status in the local demo API. Review queries remain isolated from the saved read status. The 18 older records are demo content for the source's pagination count. Links use the existing request detail, appointment detail and fixed-time booking routes. Opening a resource follows its anchor. The separate read actions update the inbox and dashboard badge.

## Responsive brief

The mobile shell keeps the centered title, back action to More and active More dock. RTL order within a row is the event tile, title and metadata, followed by the unread action or the source chevron. The public label sits with the timestamp. Controls use the existing 44px touch minimum, and descriptions wrap on narrow screens. The document handles scrolling.

At 768px the inbox stays in one column with a capped reading width. At 1024px and above it centers within the existing customer workspace beside the right sidebar. The desktop shell owns identity and navigation. The same column aligns groups, toolbar, empty state and pagination so dates can be scanned vertically. Desktop uses the shared initial opacity entry for records, while mobile/tablet use the short horizontal entry. Reduced motion shows the records immediately. The read action is separate from the resource link and focus moves to the row when the action disappears.

Reuse shared customer navigation, `rv-glass`, `rv-icon-tile`, `rv-btn`, token typography and the existing initial-only list-entry controller. The shared `NotificationItem` partial owns read and public row presentation for future notification centers.

## Source comparisons and verification

1. The default 390px capture keeps the first six items in the same Today, This week and Older groups. The shared shell adds a slightly taller back control and header than the export.
2. The unread facial request has the amber hourglass, regular title, dark dot and separate «خواندم» button. Read rows have lighter weight and linked rows show the left chevron.
3. The confirmed appointment, released time and refund use the ink, teal and green tiles from the source. The public notice keeps the users tag alongside its date and has no destination link.
4. «۶ از ۲۴ اعلان» sits above the full-width older button. Token line heights and touch minimums add vertical space. The dock stays anchored to the viewport during document scroll.
5. The all-read variant shows the disabled bulk action, read summary and success toast. The toast follows the live viewport above the dock, so its position in a full-page capture differs from the fixed-height export.
6. The empty capture keeps the source bell medallion and Persian copy in a single glass panel below the shared header. The desktop capture uses the capped reading column and right sidebar described above.

Build, lint and map freshness passed. The nine focused tests passed in each deployment mode, with keyboard, cross-tab persistence, route navigation, screenshot and axe coverage. The three variants were captured at 320, 390, 768, 1023, 1024 and 1280px, height 844px, DPR 1, in Chromium. [Mobile capture](../../tests/screens/notifications/root/example-390.png) · [Desktop capture](../../tests/screens/notifications/root/read-1280.png)
