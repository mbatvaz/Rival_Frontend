# Rival Progress

## Current status

- [x] Codex starter package and canonical contract aligned.
- [x] Original design exports preserved read-only and indexed in `design-export/MANIFEST.json`.
- [x] Static-first repository scaffold and local preview tooling prepared.
- [x] Preflight report approved by owner (2026-11-10, current chat).
- [x] Phase 01 implemented and automated gates passed (2026-11-10).
- [ ] Phase 01 implementation accepted.

## Current gate

Phase 01 is ready for owner review. See `docs-work/PHASE_01_REPORT_FA.md` and `tests/screens/foundation/`.
Do not start Phase 02 until the owner accepts Phase 01 and assigns the next phase.

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
