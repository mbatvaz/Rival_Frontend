# Decision Log

| ID | Decision | Status | Evidence / implication |
|---|---|---|---|
| DEC-001 | Owner decisions and Current Truth outrank stale handoff tables | Confirmed | Docs README; Phase 8 current truth |
| DEC-002 | Front-end is plain HTML/CSS/Vanilla JS with Razor-shaped templates | Confirmed | `RIVAL_PROJECT_CONTRACT.md`; owner clarification 2026-11-09 |
| DEC-003 | Three human roles; OwnerAdmin also performs stylist work through one shell and Scope | Confirmed | Design Common §7; Phase 8 IA |
| DEC-004 | Fixed, Proposed, Requested are distinct booking flows; Requested is manager-composed multi-service | Confirmed | Phase 1/2/8 handoffs |
| DEC-005 | Manual booking Override never requires a reason; forbidden conflicts still cannot be overridden | Confirmed | Owner decision 2026-10-22 |
| DEC-006 | ADM-09 owns customer payments/ledger/adjustment/reversal sheets; ADM-16 owns payment matching | Confirmed | Owner decision D10-171..177 |
| DEC-007 | ADM-17 Reports, ADM-18 Wallet routes, ADM-22 Announcement route are removed/replaced | Confirmed | Phase 8 Current Truth; Handoff 08 |
| DEC-008 | ADM-AC is the only new independent IA route; failures are notifications, not actions | Confirmed | Phase 8-1 review |
| DEC-009 | All modals/pickers/confirmations are bottom sheets; no centered dialog | Confirmed for implementation; legacy canvases pending sync | D10-108; Handoff 08 |
| DEC-010 | OTP is 5 digits, 2 min validity, 5 attempts, resend after 60s; lock covers all login methods | Confirmed; canvas sync required | D10-207, D10-210, D10-211 |
| DEC-011 | Automatic SMS copy is immutable in UI settings | Confirmed | D10-206 |
| DEC-012 | OwnerAdmin manual booking Override is audited but no explanatory field is collected | Confirmed | D10-204/owner closure + manual booking decision |
| DEC-013 | Responsive thresholds remain 768px tablet / 1024px desktop; desktop is a purpose-designed composition derived from the mobile product language, not a stretched mobile screen. Public/customer/staff navigation adapts by role; sheets remain bottom-attached. | Confirmed by owner 2026-11-09 | Replaces the earlier inferred desktop-only assumptions; see `RIVAL_PROJECT_CONTRACT.md` §6. |
| DEC-014 | ADM-21 displayed hours vs ADM-15 actual schedule | Requires User Decision | Handoff 08 §9 open item; use ADM-15 as canonical data in mock |
| DEC-015 | ADM-24 final labels | Requires User Decision | Handoff 08 §9; keep labels from current canvas and isolate copy |
| DEC-016 | Absence status tone in STY-01 | Requires User Decision | Handoff 08 §7; default to danger for destructive action, warning for state |
| DEC-017 | Customer profile image edit by admin | Requires User Decision | Handoff 08 §9; hide destructive edit until decided |
| DEC-018 | Official holiday data provider | Deferred to Backend | Handoff 08 §9; preview uses fixture, UI exposes no source detail |
| DEC-019 | Legacy MORE drawer cleanup (wallet row and centered logout dialog) | Non-blocking implementation decision | remove stale wallet route; migrate confirmation to sheet in shared shell |

## Owner decisions recorded 2026-11-09

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-020 | Static-first preview/deployment: Nunjucks renders at build time to ordinary HTML in `dist/`; cPanel serves static files only. | Confirmed | No Express or Node runtime on hosting; central directory at `/_preview/`; cPanel deploys `dist/` only. |
| DEC-021 | Codex is the primary coding agent. | Confirmed | Root `AGENTS.md`, `.agents/skills/`, Codex prompts, and VS Code tasks replace active Claude Code instructions. |
| DEC-022 | Native CSS remains the only styling approach. | Confirmed | No Tailwind, Bootstrap, preprocessors, or CSS bundler; canonical `rv-*` classes and v2 tokens. |
| DEC-023 | Only Yekan Bakh is used for application typography. | Confirmed | Normal-width Light/Regular/SemiBold files only (300/400/600); no other typeface or expanded variants. |
| DEC-024 | Existing local icon assets are Lucide-based SVGs; keep `ri` class compatibility prefix. | Confirmed | No Remix Icon package, CDN, emoji, or new icon dependency. |
| DEC-025 | No nested vertical scrolling; horizontal rails/carousels are allowed only where design evidence supports them. | Confirmed | ADM-14 documented horizontal snap rail remains valid; no generic nested vertical panels. |
| DEC-026 | Visual controls may be 40px where required, but interactive hit areas must be at least 44×44px. | Confirmed | Use hit-area wrappers/pseudo-elements without distorting visible component geometry. |
| DEC-027 | Desktop requires page-specific composition, not direct scaling of mobile artboards. | Confirmed | Write owner-reviewable desktop layout briefs before desktop implementation; preserve content and product meaning. |
| DEC-028 | Phase 03 owns the reusable StatePage base and booking states STATE-04..07; Phase 08 extends it with remaining system states. | Confirmed | Do not rebuild StatePage in Phase 08. |
| DEC-029 | Phase 06 owns canonical finance primitives for ADM-09; Phase 08 extends them for ADM-16 payment matching. | Confirmed | Do not duplicate CreditPayments/WalletLedger/PaymentRow. |
| DEC-030 | Actual ASP.NET MVC migration is reserved for Phase 09. | Confirmed | Earlier phases remain MVC-compatible but do not port/build backend MVC code. |
| DEC-031 | Phase 01 acceptance for DS/RULE/ARCH is recorded in TRACEABILITY, not PAGE_INVENTORY. | Confirmed | Do not require infrastructure IDs to appear as product pages. |
| DEC-032 | Canonical CSS is generated from `tokens.json`; export CSS bundles are evidence only; production classes use `rv-*`. | Confirmed | Legacy batch prefixes are mapped, not copied into production. |
| DEC-033 | The 2026-11-09 owner instruction supersedes active Claude Code setup documents. | Confirmed | `AGENTS.md` and Codex workflows are authoritative; legacy files are archived and marked inactive. |

## Phase 02 owner review — 2026-11-10

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-034 | Direct adjacent password/Passkey buttons replace Other method; password opens above the current page. | Confirmed by owner comment 17 and supplied auth images | Supersedes D10-211 presentation only. Shared lock, OTP defaults and safe returns remain. Unsupported Passkey is visibly disabled; supported static demo provides OTP fallback. |
| DEC-035 | Use phone 09141452321; social/map links may be nonreal samples until development supplies real destinations. | Confirmed in current chat | Phone and reserved .example destinations live in public fixtures. Sample links are titled as samples. Decorative map has no coordinate claim. |
| DEC-036 | Desktop review changes: full-image bounded hero, about/carousel columns, map/CTA left and hall right, half-width portfolio CTA, glass navigation. | Confirmed by owner comments 1–12 | Updated page desktop briefs; mobile order preserved where the instruction is desktop-specific. |
