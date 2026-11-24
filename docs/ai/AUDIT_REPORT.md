# Rival infrastructure audit — 2026-11-14

The owner attachment authorized repository instruction, documentation, local skill and QA-workflow maintenance. Product pages, fixtures, runtime behavior and phase acceptance were not changed. Existing build output still contains 21 product templates and 52 labelled placeholders across 73 contexts.

## Before and after

Before: a 95-line root instruction file, three project skills, canonical contract/reuse/inventory docs, phase archives and existing Playwright tooling. No root goals/plan/prompt index, docs/ai workflow library, reproducible content/duplicate audit or maintained-doc link validator. No AGENTS.override.md, .codex directory or .NET project.

After: a shorter root instruction router, ten focused skills, three root workflow indexes, focused design/architecture/responsive/motion/dependency/QA procedures, seven templates, two generated source indexes with machine-readable records, and three Node audit/validation helpers. Existing canonical owners remain authoritative; original exports/handoffs are unchanged. No backend/framework migration, product screen, dependency, global setting, connection, deployment or push was added.

Initial untracked firstTest.zip is preserved. No files were deleted. Existing repeated guidance was consolidated by linking canonical owners, rather than deleting historical evidence. No root override was needed; adding one without a scoped exception would create another competing instruction layer. No separate custom subagent configuration or delegation was needed for these workflows.

## Deliverables and changed files

Root instructions and workflow:

- Updated [AGENTS.md](../../AGENTS.md) and [README](../../README.md).
- Added workflow indexes during the original audit. They have since been consolidated into [root instructions](../../AGENTS.md) and [prompt routing](PROMPT_ROUTING.md).

New focused documents:

- [Implementation procedure](DESIGN_IMPLEMENTATION_CONTRACT.md) and [frontend architecture](FRONTEND_ARCHITECTURE.md).
- [Component catalog](COMPONENT_CATALOG.md), [export inventory](DESIGN_EXPORT_INVENTORY.md), [source map](DESIGN_SOURCE_MAP.md), [conflicts](DESIGN_SOURCE_CONFLICTS.md).
- [Responsive procedure](RESPONSIVE_DESIGN_CONTRACT.md), [decision index](RESPONSIVE_DECISION_LOG.md), [motion spec](MOTION_SPEC.md), [dependency policy](DEPENDENCY_POLICY.md), [QA checklist](QA_CHECKLIST.md), [skill registry](SKILL_REGISTRY.md).
- [Page](templates/page-spec.md), [feature](templates/feature-spec.md), [source map](templates/design-source-map.md), [responsive page](templates/responsive-page-spec.md), [motion](templates/motion-spec.md), [visual report](templates/visual-qa-report.md) and [responsive report](templates/responsive-qa-report.md) templates.
- Generated [design audit JSON](design-audit.json) and a historical document snapshot kept in Git history. The design audit records structural evidence and candidate mappings.

Tooling:

- [audit-design.mjs](../../tools/audit-design.mjs): reads export contents, parses JSON, extracts HTML titles/text/references/viewports, SVG viewBoxes, hashes/duplicates and manifest/registry mapping; writes only derived docs/ai outputs.
- The original repository-wide document audit also indexed 51 design component groups. The maintained [catalog generator](../../tools/catalog-components.mjs) reads the component evidence directly.
- [validate-ai-docs.mjs](../../tools/validate-ai-docs.mjs): validates maintained local links, replacement characters and the deliberately simple name/description frontmatter used by ten local skills. It does not replace full YAML/Markdown linting or behavioral skill evaluation.

Existing docs updated: [contract](../RIVAL_PROJECT_CONTRACT.md), [architecture entry](../ARCHITECTURE.md), [extraction](../DESIGN_SYSTEM_EXTRACTION.md), [progress](../../PROGRESS.md), [traceability](../TRACEABILITY.md), [inventory](../PAGE_INVENTORY.md), [discrepancies](../DISCREPANCIES.md) and [questions](../OPEN_QUESTIONS.md). Contract wording was reconciled with existing DEC-037, not a new owner decision.

## Skills and external evaluation

Seven original local skills added: frontend-fidelity, design-system-governance, design-source-audit, responsive-layout, responsive-visual-qa, frontend-testing-debugging and motion-interaction. Three existing Rival skills updated with focused procedure/report links and current exceptions. All triggers, output boundaries, source URLs, retrieved source/license statements, unverified revisions and selection/rejection reasons are in the [registry](SKILL_REGISTRY.md).

All six requested external sources were inspected through source pages/raw files. Deep GitHub tree fetch restrictions were resolved by reading raw source where needed. No external skill was installed or vendored: concept-generation/redesign defaults conflict with Rival's approved evidence; agent-browser adds redundant CLI tooling; Figma requires an unrequested connected source; the collection is not a single installable skill. Local instructions cover the actual workflow without copying unverified-licensed code. Exact upstream commit SHAs remain unverified and no permissive license was invented. New npm dependencies: none.

## Design findings

The inventory reads 1271 files: 623 HTML, 352 PNG, 34 WebP, 4 JPG, 75 SVG, 85 Markdown, 14 JSON, 50 CSS, 29 WOFF2, 2 TXT and one each ZIP/JS/SCSS. There are eight batches, 73 canonical contexts, 51 component groups and 39 byte-identical duplicate groups. No manifest-referenced page HTML/named screenshot file was missing. CUS-02 has composed evidence and CUS-07 has no independent artboard/route. Missing selectors/screenshots remain explicitly unverified.

Nine token families are generated: color, type, spacing, radius, shadow, blur, duration, easing and size. Dedicated breakpoint/container/z-index families do not exist. Existing contract values/approved geometry remain the source; archived font widths and legacy CSS are not a parallel production system. Component reuse is organized in canonical partials/modules; this audit does not claim exhaustive semantic duplicate-code elimination or completion of planned finance/customer/stylist components.

Eight conflict records cover actual stack versus generic MVC assumption, centered viewer, recurring editor scrolling, archived fonts/navigation/tools, raw motion timings, missing independent evidence, historical duplicates and BK-01 desktop brief/runtime drift. Current responsive decisions index DEC-027/037/039/041/043..047 and the existing reviewed briefs. No new desktop composition is approved.

## Validation actually run

- `rg --files design-export`, repository file/instruction discovery and `git status --short`: completed before edits.
- `node tools/audit-design.mjs`: passed; 1271 exports, 73 contexts, 39 duplicate groups.
- The document audit passed and indexed 51 design groups. Its snapshot belongs to the original audit revision.
- `npm.cmd run build`: passed; 21 product templates, 52 labelled placeholders, root basePath.
- `npm.cmd run lint`: passed structure, ESLint and Stylelint, including new helper modules.
- `npm.cmd test`: **76 passed in 58.8s**.
- `npm.cmd run test:subpath`: **76 passed in about 1 minute**; runner restored root output successfully.
- Existing suites include local booking/auth interactions, route/static reference checks, basePath, API/registry behavior, axe/keyboard/focus, reduced motion, shared overlays/rails and screenshots at 390/768/1280 plus existing 320/417/471/1920 cases.
- `node tools/validate-ai-docs.mjs`: maintained links and all ten skill entry points passed structural checks; exact final file/link counts are printed by the validator. Only structural validation is claimed.

The first plain npm invocation was blocked by this machine's PowerShell script execution policy; npm.cmd ran the same existing package scripts without changing system policy. The skill-creator Python validator was attempted but could not import PyYAML. No package was installed to hide that limitation; the local Node structural validator is the disclosed alternative. dotnet build/test, formatter, Markdown-style lint and pixel-baseline regression are inapplicable/unconfigured here. No physical-device test was performed.

Export SHA-256 verification after all work found **0 original export files changed** relative to the initial audit. All exported JSON parsed; no empty export file was found. Git diff confirmed no content changes under src, design-export or docs/references and no package/lockfile changes. `git diff --check` passed; normal Windows line-ending notices are informational.

## Fresh screenshot review sample

Browser plugin skill is absent; existing Playwright suites were used. Captures are generated/ignored QA evidence, not committed pixel baselines. Inspected [BK-01 source](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-A.png>), [390 runtime](../../tests/screens/phase03/root/BK-01-390.png), [768 runtime](../../tests/screens/phase03/root/BK-01-768.png) and [1280 runtime](../../tests/screens/phase03/root/BK-01-1280.png). Source image is 780×1688; runtime widths are CSS pixels, with full-document height potentially larger than viewport height.

Concrete observations:

1. Source/runtime preserve the Persian booking title, repeat-booking heading and service question. Runtime also exposes the required demo notice/review-directory link.
2. Source/runtime retain the two repeat-booking cards, stylist avatars and service photographs; no substitute assets were introduced by this task.
3. The mobile service choice remains a portrait horizontal rail with neighboring cards visible, image-led hierarchy and light caption surface. Caption geometry and document spacing are not identical; no pixel-match pass is asserted.
4. Runtime uses the current numbered service-stage row instead of the original top progress strip. Later owner review explicitly changes stage presentation by service type; source image alone is not the latest authority.
5. Both preserve light neutral surfaces, dark Persian headings and a separate dark booking action beside the mobile nav. Runtime full-page whitespace differs from the original fixed-size source capture and must not be mistaken for a new regression caused by docs.
6. Tablet retains repeat cards and the rail; its fixed navigation overlaps the rail in a full-document screenshot taken at initial scroll. Document scrolling/accessibility assertions passed, but that alone does not establish unobscured content at every scroll position.
7. Desktop uses full role navigation, repeat-booking sidebar and a service grid instead of stretching the rail. It shows four portrait cards in row one; the older brief says three landscape columns. Later owner feedback supports portrait cards but this audit does not establish four-column approval: C-08 remains for review.

This is a workflow/evidence sanity sample, not a full reapproval of Phase 03 or all 623 exported HTML files. No screenshot-wide pixel threshold, new state/width coverage or physical-device result is fabricated.

## Remaining limits and next gate

Existing noncanonical 320/180/220ms durations remain logged as motion debt. BK-01 brief/runtime column drift remains documented for product review. Null source evidence, incomplete per-state selections for future phases, upstream revisions/licenses and final OQ-08 destinations remain explicit. They do not block maintenance documentation; they must be resolved where they affect assigned product behavior or future vendoring.

Maintenance deliverables are ready for review. Phase 03 product acceptance is still pending; Phase 04 has not been assigned. Reusable page/component/feature/animation/QA prompts are ready in the root prompt index, and no next phase starts automatically.
