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

- See `OPEN_QUESTIONS.md` for unresolved product/permission decisions.
- Manifest entries with `not-found-in-export` or `implied-no-independent-artboard` must be reviewed against the relevant handoff before implementation.
- Some design exports contain hashed decorative assets that cannot be mapped to a page by filename alone; they are retained in the batch asset directories and listed in `MANIFEST.json` at batch level.
