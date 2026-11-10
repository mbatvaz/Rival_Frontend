# Rival Progress

## Current status

- [x] Codex starter package and canonical contract aligned.
- [x] Original design exports preserved read-only and indexed in `design-export/MANIFEST.json`.
- [x] Static-first repository scaffold and local preview tooling prepared.
- [x] Preflight report approved by owner (2026-11-10, current chat).
- [x] Phase 01 implemented and automated gates passed (2026-11-10).
- [x] Phase 01 accepted by owner instruction to start the next phase (2026-11-10).
- [x] Phase 02 assigned and started (2026-11-10).
- [x] Phase 02 desktop layout briefs approved by owner (2026-11-10, current chat).
- [x] Phase 02 implementation and automated checks completed (2026-11-10).
- [ ] Phase 02 implementation accepted.

## Current gate

Phase 02 ready for owner review: `docs-work/PHASE_02_REPORT_FA.md`. The owner explicitly approved all desktop briefs in this chat before desktop implementation. Phase 03 has not started and requires acceptance/assignment.

## Phase 02 evidence

- Implemented PUB-01..03, AUTH-01/02 and SYS-ACC-01; 6 templates and 67 clearly labelled future-page placeholders.
- Shared Public/Auth/Role layouts, fixture-driven navigation for Customer/Stylist/OwnerAdmin, More and logout sheets.
- D10-207/210/211: five-digit demo OTP, 120-second validity, 60-second resend, old-code invalidation, five failures in 15 minutes and a shared 15-minute lock across methods. Safe local return routes; no stored password.
- Passkey capability detection and OTP fallback only; no platform credential request or real backend identity claim.
- Home six-card orbital carousel with pause, swipe/keyboard controls and reduced-motion handling. Portfolio service/stylist filtering, URL filter persistence, empty/loading/error/retry and bottom-sheet viewer.
- `npm run lint`: passed. `npm test`: 45 passed. `npm run test:subpath`: 45 passed, then root output restored.
- Layout/touch/overflow checks at 320/390/768/1280; axe at 390/768/1280 and state/sheet checks.
- 54 screenshots per deployment mode in `tests/screens/phase02/{root,subpath}/`; six rendered source references in `tests/screens/design-reference/`.
- Immutable export/reference sources unchanged. Asset provenance: `docs-work/PHASE_02_ASSET_MAP.json`.
- Existing local preview on port 4173 verified to serve the new home and opened in Codex. Owned test servers on 4183/4184 closed normally.
- Source gaps: real contact/social/map destinations and additional portfolio photos are not invented. See GAP-18..21 and the report.

## Phase 01 evidence

- `DS`: nine generated token families, three normal-width Yekan Bakh weights, 71 local SVGs, local logos.
- `RULE`: demo-only static fixture reads/localStorage writes through `core/api.js`; no product business behavior.
- `ARCH`: restricted build-time Nunjucks, 73 placeholder contexts, preview directory and alias, cPanel `.htaccess`, deployment basePath support.
- `npm run build`: passed; 0 product templates and 73 explicitly labelled placeholders; 75 HTML files including directory/alias.
- `npm run lint`: passed (structure, ESLint, Stylelint).
- `npm test`: 19 passed; `npm run test:subpath`: 19 passed at `/rival-demo/`, then restored root output.
- Playwright: 320/390/768/1280, keyboard, routes, assets, mock failures/persistence, registry lazy initialization.
- axe: no WCAG A/AA violations on directory/placeholder at 390/768/1280.
- Screenshots: eight per deployment mode, under `tests/screens/foundation/{root,subpath}/`.
- No pixel match or product desktop approval is claimed for these neutral infrastructure pages.
- Original exports and reference documents unchanged; only derived STY-CUS route metadata corrected.

## Notes

- This starter package is not the completed application. Pages remain placeholders until their implementation phases are executed.
- cPanel deployment is only from `dist/` after a successful build.
