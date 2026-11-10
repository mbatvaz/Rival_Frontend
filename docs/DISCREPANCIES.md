# Discrepancies and Alignment Log

| ID | Finding | Resolution / handling | Status |
|---|---|---|---|
| GAP-01 | Old source docs mention Tailwind/Alpine/htmx; current owner-approved frontend contract rejects them. | Marked historical; root `AGENTS.md` and `RIVAL_PROJECT_CONTRACT.md` are authoritative. | Resolved |
| GAP-02 | Old architecture expected Express + Nunjucks runtime while owner needs cPanel static hosting and direct HTML preview. | Replaced with build-time Nunjucks → static `dist/`; no Express or Node runtime on cPanel. | Resolved |
| GAP-03 | Old setup targeted Claude Code (`CLAUDE.md`, Claude prompts). | Active instructions moved to Codex `AGENTS.md`, prompts, skills, and VS Code tasks. Old files archived. | Resolved |
| GAP-04 | Old path references no longer match a stable repository layout. | Normalized to root `docs/`, `design-export/`, `phases/`, `prompts/`, `src/`, `tools/`, `tests/`. | Resolved |
| GAP-05 | Kickstart Audit would regenerate inventories already present in Master. | Changed to read-only preflight/gap audit; existing inventories remain canonical and only missing evidence is added. | Resolved |
| GAP-06 | Phase 01 old prompt included shell components also owned by Phase 02. | Phase 01 now builds infrastructure and neutral layout skeleton; Phase 02 owns the real shell. | Resolved |
| GAP-07 | STATE-04..07 appeared in Phase 03 and generic STATE work in Phase 08. | Phase 03 owns StatePage base and booking variants; Phase 08 reuses it for remaining states. | Resolved |
| GAP-08 | ADM-09 and ADM-16 shared finance components across Phase 06/08. | Phase 06 builds canonical finance primitives; Phase 08 extends them for matching. | Resolved |
| GAP-09 | Phase 08 mentioned MVC while Phase 09 owned migration handoff. | Phase 08 is compatibility-only; actual migration guide/readiness is Phase 09. | Resolved |
| GAP-10 | Phase 01 required infrastructure IDs in Page Inventory. | DS/RULE/ARCH are traced in TRACEABILITY, not listed as product pages. | Resolved |
| GAP-11 | Multiple exported CSS bundles and legacy batch class prefixes existed. | Export bundles remain evidence only; production CSS uses tokens + `rv-*` components. | Resolved |
| GAP-12 | Font and icon references were inconsistent. | Runtime uses normal-width Yekan Bakh 300/400/600 only and local Lucide-based SVG icons with `ri` compatibility prefix. | Resolved |
| GAP-13 | Previous responsive notes disallowed all inner scrolling and described desktop as a mobile layout adjustment. | Nested vertical scroll is prohibited; documented horizontal rails are allowed. Desktop is a page-specific composition derived from mobile design language. | Resolved |
| GAP-14 | Design exports may have missing screenshots or page IDs without independent artboards. | See `design-export/MANIFEST.md`; do not invent missing files or selectors. | Audited; owner review pending |
| GAP-15 | STY-CUS derived route incorrectly included the Markdown suffix `` ` + detail ``. | Corrected registry and derived MANIFEST route to `/stylist/customers/`, following PAGE_INVENTORY. Original design files unchanged. | Fixed and route-tested in Phase 01 |
| GAP-16 | Starter preview HTML/CSS was embedded in the build tool with unlayered styling, and canonical token/API/registry implementation was absent. | Moved infrastructure rendering to restricted Nunjucks partials; generated tokens, local assets and native modules. Product templates remain unimplemented. | Fixed in Phase 01 |
| GAP-17 | Starter test harness assumed root-only links and lacked keyboard/mock/basePath coverage. | Added root/subfolder suites and a Windows-safe IPC lifecycle for the local test server. | 19 + 19 tests passed |

## Phase 01 visual review

- Reviewed neutral directory and placeholder screenshots at 320/390/768/1280; RTL, local typography, touch areas and readable content confirmed.
- No product artboard applies to these infrastructure pages. No pixel-difference score or product desktop review approval is claimed.
- Fixed geometry (320px minimum canvas, 720/1200px container limits, 768/1024px breakpoints, 150px logo, 2px focus outline and 3px offset) follows the repository responsive/accessibility scaffold; colors, typography, spaces, radii and shadows use canonical tokens.
- Stylelint preserves original token color notation inside generated `00-tokens` files only. Other CSS remains checked normally; min-width notation follows the project contract.
- Decorative asset gaps, non-independent CUS-02/CUS-07 references, and open product decisions remain unchanged for the owning phases.

## Remaining source gaps

### Phase 02 update — 2026-11-10

- **GAP-18 — old shell routes:** Source `customer/recurring`, `admin/my-schedule` and `admin/booking-rules` were not canonical registry destinations. Reused BK-REC01 preview context, `/admin/schedules/?scope=me`, and `/admin/settings/booking/` respectively. No independent recurring or personal-schedule route was invented. All More destinations pass static route checks.
- **GAP-19 — source contact placeholders:** Public source uses empty `tel:` and `href="#"` for map/social links. Canonical/handoff search did not establish real destinations. The fixture retains the designed address/hours; missing contact information is stated, and map navigation is disabled. The map illustration copies the exact decorative SVG street geometry from PUB-01 and makes no real coordinate claim. Real operational contact details remain owner-supplied content before external launch.
- **GAP-20 — portfolio image counts:** Only PUB-02-V provides a verified three-image detail gallery. For other cards the exported source provides one independently mapped cover image; extra photos implied by badges are not fabricated or replaced with unrelated images. The demo count reflects the images actually available. `PHASE_02_ASSET_MAP.json` records all 14 copied asset filenames.
- **GAP-21 — auth canvas synchronization:** Implemented newer D10-207/210/211 instead of stale always-visible alternate methods / OTP-only lock copy. Restored local logo files where isolated source masks render blank. Added explicit demo notice and sample credentials; real Passkey enrollment/authentication remains a backend integration and has an OTP fallback here.
- **GAP-22 — local preview collision:** Existing preview was already listening on 4173. Tests now use isolated 4183/4184 ports (override `RIVAL_TEST_PORT`) and leave the existing preview intact. Startup port failure exits clearly instead of waiting for readiness timeout.

Phase 02 visual review: source references rendered at 390; current screens captured at 320/390/768/1280. Checked local imagery, RTL, typography, rounded/glass surfaces, filter rails, sheet behavior and the approved desktop compositions. Full pixel identity is not claimed: canonical type scale, 44px controls, fluid content height, demo notices, auth decision corrections and honest missing-photo counts produce intentional differences from the fixed export canvases. The home selected-work six-card orbital rotation is reconstructed from the source positions with native JS/CSS; pause/previous/next controls and a reduced-motion pause are added for accessibility. Owner visual acceptance remains pending.

Carousel geometry also follows the source: 260×350px cards, 372px stage, positions at ±195/±128px and six 3-second steps per cycle; transitions use canonical motion tokens.

New fixed geometries are evidence-based: 844px mobile hero; 720px desktop hero; 420/260px portfolio image frames; 312×390px gallery frames; 480px auth column; 200px staff rail; 220px rule contents column; 560px maximum sheet. Home wordmark size derives from v2 display size. No new color/radius/shadow/spacing palette is introduced.

- See `OPEN_QUESTIONS.md` for unresolved product/permission decisions.
- Manifest entries with `not-found-in-export` or `implied-no-independent-artboard` must be reviewed against the relevant handoff before implementation.
- Some design exports contain hashed decorative assets that cannot be mapped to a page by filename alone; they are retained in the batch asset directories and listed in `MANIFEST.json` at batch level.
