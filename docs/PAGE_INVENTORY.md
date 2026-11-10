# Canonical Page Inventory

`Artboard` با `Page/Context` یکی نیست. جدول زیر route/page contextهای canonical را نگه می‌دارد؛ variantها در ستون state و source mapping دنبال می‌شوند.

## Public / Auth

| ID | Route | Role | Status | Source | States |
|---|---|---|---|---|---|
| PUB-01 | `/` | Public | Fully Designed | Batch 1 | signed-out / signed-in |
| PUB-02 | `/portfolio` | Public | Fully Designed | Batch 1 | default/filter/viewer/empty/loading/error |
| PUB-03 | `/booking-rules` | Public | Fully Designed | Batch 1 | default |
| AUTH-01 | `/login` | All | Fully Designed + canvas sync required | Batch 1 | OTP/password/passkey/lock/wrong code |
| AUTH-02 | post-OTP step | New user | Fully Designed | Batch 1 | default/field error |
| SYS-ACC-01 | `/account-unavailable` | All | Fully Designed | Batch 1 | soft-deleted account |

## Customer + booking

| ID | Route/Context | Role | Status | Source |
|---|---|---|---|---|
| CUS-01 | `/customer` | Customer | Fully Designed / reused final ref | Batch 3 |
| CUS-02 | `/customer/book` | Customer | Fully Designed | Batch 2 |
| CUS-03 | `/customer/appointments` | Customer | Fully Designed | Batch 3 |
| CUS-04 | `/customer/appointments/{id}` | Customer | Fully Designed | Batch 3 |
| CUS-05 | `/customer/requests` | Customer | Fully Designed | Batch 3 |
| CUS-06 | `/customer/requests/{id}` | Customer | Fully Designed | Batch 3 + Batch 2 payment reuse |
| CUS-07 | embedded balance | Customer | Implied / no route | Batch 3, DS |
| CUS-08 | `/customer/availability-alerts` | Customer | Fully Designed | Batch 3 |
| CUS-09 | `/customer/notifications` | Customer | Fully Designed | Batch 3 |
| CUS-10 | `/customer/profile` | Customer | Fully Designed | Batch 3 |
| BK-01 | booking step: service | Customer | Fully Designed | Batch 2 |
| BK-02 | booking step: stylist | Customer | Fully Designed | Batch 2 |
| BK-F01 | booking step: fixed availability | Customer | Fully Designed | Batch 2 |
| BK-F02 | booking step: fixed summary/payment | Customer | Fully Designed | Batch 2 |
| BK-P01 | booking step: proposed request | Customer | Fully Designed | Batch 2 |
| BK-R01 | booking step: requested request | Customer | Fully Designed | Batch 2 |
| BK-REQ01 | request result | Customer | Fully Designed | Batch 2 |
| BK-REC01 | recurring fixed booking | Customer | Fully Designed | Batch 2 |
| BK-ALERT01 | availability alert sheet | Customer | Fully Designed | Batch 2/3 |
| PAY-RES | payment return/result | Customer | Fully Designed | Batch 2 |

## Stylist

| ID | Route/Context | Role | Status | Source |
|---|---|---|---|---|
| STY-01 | `/stylist` | Stylist/OwnerAdmin scope=me | Fully Designed | Batch 4 |
| STY-02 | `/stylist/calendar` | Stylist | Fully Designed | Batch 4 |
| STY-03 | `/stylist/requests` | Stylist | Fully Designed | Batch 4 |
| STY-04 | request response | Stylist | Fully Designed | Batch 4 |
| STY-05 | `/stylist/appointments` | Stylist | Fully Designed | Batch 4 |
| STY-06 | `/stylist/appointments/{id}` | Stylist | Fully Designed | Batch 4 |
| STY-07 | `/stylist/manual-booking` | Stylist | Fully Designed | Batch 4 |
| STY-08 | `/stylist/schedule` | Stylist | Fully Designed | Batch 4 |
| STY-09 | `/stylist/portfolio` | Stylist | Fully Designed | Batch 4 |
| STY-10 | `/stylist/notifications` | Stylist | Fully Designed | Batch 4 |
| STY-11 | `/stylist/profile` | Stylist | Fully Designed | Batch 4 |
| STY-CUS | `/stylist/customers` + detail | Stylist | Fully Designed | Batch 4 |

## OwnerAdmin

| ID | Route/Context | Role | Status | Source |
|---|---|---|---|---|
| ADM-01 | `/admin` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-02 | `/admin/calendar` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-03 | `/admin/requests` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-04 | `/admin/requests/{id}` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-05 | `/admin/appointments` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-06 | `/admin/appointments/{id}` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-07 | `/admin/manual-booking` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-08 | `/admin/customers` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-09 | `/admin/customers/{id}` | OwnerAdmin | Fully Designed + payment mode | Batch 5 |
| ADM-10 | `/admin/stylists` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-11 | `/admin/stylists/{id}` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-12 | `/admin/services` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-13 | `/admin/services/{id}` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-14 | `/admin/pricing` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-15 | `/admin/schedules` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-16 | `/admin/payments` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-AC | `/admin/action-center` | OwnerAdmin | Fully Designed; one added route | Batch 5/8 IA |
| ADM-NOT | `/admin/notifications` | OwnerAdmin | Fully Designed; replaces ADM-22 | Batch 7 |
| ADM-20 | `/admin/portfolio` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-21 | `/admin/settings` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-23 | `/admin/sms` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-24 | `/admin/settings/booking` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-25 | `/admin/profile` | OwnerAdmin | Fully Designed | Batch 7 |

## System patterns (no independent product route)

`STATE-01..08`, `SYS-SESSION`, `SYS-RO`, `SYS-OFFLINE` are shared state contexts rendered by the source page; `KIT-01` is a pattern book, not product navigation.

## Page status summary

- **Implementation status (2026-11-10):** Phase 01 infrastructure is complete and awaiting owner acceptance. All 73 registry page/state contexts remain **not implemented**; `Fully Designed` below describes source design coverage only. Each static route currently renders an explicit development placeholder. No product shell or product desktop composition is implemented.

- **Fully Designed:** all canonical route/context IDs above have at least one authoritative artboard or explicit handoff spec.
- **Reused:** CUS-01, STY-01, ADM-05 references in Batch 1 are historical/preview references; final source lives in Batches 3/4/5.
- **Implied/no route:** CUS-07, bottom sheets, confirmations, toasts, and system patterns.
- **Removed/replaced:** ADM-17 Reports, ADM-18 Wallet, ADM-22 Announcements, ADM-19 standalone wallet detail.
