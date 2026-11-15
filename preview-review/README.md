# Independent preview review

Owner-requested review workspace for `/_preview/` and `/pages.html`. This directory owns its HTML, CSS, JavaScript, storage and manual approval workflow; product code and registry acceptance remain independent. Shared fonts/tokens/icons are reused read-only.

The requested yellow uses three local `--rv-review-pending-*` values in this workspace's token layer because the product warning palette is orange. Green uses the existing green accent palette (the product success palette is teal). These review semantics never enter product CSS or the canonical design export.

- Red: no implemented template (not a claim that original design artboards are absent).
- Yellow: implemented, not finally approved for the current content revision.
- Mobile and desktop are independent manual toggles; final approval requires both. Removing either also removes final approval.
- Green: all three approvals belong to the current revision. A changed revision makes old approvals stale and the row yellow (or red if implementation was removed). All old approvals need review on the new revision.
- Initial manual approvals are empty, even for historically accepted product phases. This workspace does not silently make owner decisions.

## Compact defaults and independent states

Controls are now single-row, >=44px touch targets. The longer guide is collapsed, and child states remain collapsed until expanded or matched by search/filter. Each page's existing record applies only to its default view; it is never copied into a child state. Counts at the top describe default pages; each state's group shows its own final-approved count.

All 55 registered variants get independent mobile/desktop/final controls and content revisions. A stable key combines the parent Page ID with a hash of the sorted URL query, rather than an array index or translated label. Variant revision derives from the parent content revision and its query; parent/shared source changes can invalidate all variants conservatively. Filtering a matching child keeps its parent visible as context, with that parent's own status unchanged.

Backup schema v2 supports state keys and still accepts v1 page-only backups. The existing browser storage key deliberately stays unchanged; previous default approvals remain valid for unchanged content. New state approvals start empty. Editing layout or controls in this workspace does not change product revisions.

The build hashes rendered page HTML, template/include sources, registry route/variant/template metadata and local runtime dependencies. Static imports, active lazy features, CSS imports/URLs, assets and resolvable fixture read prefixes are included. Shared dependencies may invalidate several pages; an unchanged rebuild does not. Unrelated documentation/preview UI edits do not invalidate product-page approvals. Checks run after rebuilding, not on unbuilt source changes.

The build emits a static `/_preview/revisions.json`; the review tab checks it on focus/visibility restoration and every 15 seconds while visible. Changed existing rows update in place without erasing search or storage. It is not a backend or a filesystem watcher. Offline/build-in-progress checks retry later; a reload also reads the latest embedded revision. Newly added page IDs/routes still require refreshing the directory HTML.

Owner follow-up: local preview saves manual approvals in [approvals.json](approvals.json). The narrowly scoped [local endpoint](../tools/lib/review-endpoint.mjs) and [file store](../tools/lib/review-file-store.mjs) are development infrastructure, with no product API, authentication or payment behavior. Reloading, closing a session, changing browser/port or rebuilding does not erase this project file. Clients poll it every three seconds and on focus. Writes are serialized and atomic within the preview process; only explicit backup import can overwrite an existing record. Existing browser-local approvals migrate only into missing records, so an old browser cannot resurrect a revoked approval.

The static build exports a snapshot alongside the directory. Static hosting alone cannot write repository files: the UI explicitly identifies its browser-local fallback there. Use the project's local preview task for shared file persistence. JSON export/import remains available; stale revisions remain stale after migration/import. The UI confirms a save only after the file write succeeds. Tests isolate their files under ignored test output and never change real owner approvals.

Run through the usual static build/tasks; restart a previously running preview process once after this upgrade. No dependency or production backend is added. Implementation and QA evidence: [report](../docs-work/PREVIEW_REVIEW_REPORT.md).


## Scoped invalidation (owner correction)

Each default and registered variant now has its own content fingerprint. The build uses rendered content (projected to the requested result/feedback state), active modules and state fixtures, and CSS rules whose mandatory page/component classes or fixed booking/result markers can match that context. Unrelated imported page CSS, inactive feature modules, unrendered template includes and sibling state fixtures do not revoke its final approval. Shared rules/modules still invalidate their possible consumers; this is conservative dependency analysis, not a computed-style/pixel equivalence proof.

On a version change, only that record's final approval becomes stale. Its mobile/desktop flags stay available, so the owner can confirm final again. Unrelated parents, siblings and pages remain green. Explicit manual revocation retains its existing platform-reset behavior. The one-time fingerprint upgrade preserved 23 already-current owner approvals after checking their old fingerprints; no stale/unknown approval was promoted. Regression evidence is in the [report](../docs-work/PREVIEW_REVIEW_REPORT.md).
