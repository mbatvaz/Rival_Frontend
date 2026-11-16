---
name: design-source-audit
description: Inventory Rival design exports and map page, component, token and asset evidence when auditing sources or preparing an assigned page with unclear design references.
---

# Design source audit

Start with [navigation](../../../docs/ai/PROJECT_INDEX.md) and `npm run export:lookup -- PAGE-ID`; inspect relevant inventory/conflict entries and actual HTML/text/JSON/SVG/images. Reuse verified reads. Scope file discovery to the exact package before expanding. Generated extraction is structural evidence, not visual acceptance.

`node tools/audit-design.mjs` hashes the whole export and rewrites derived reports. Run it only for an authorized inventory refresh, not an ordinary lookup or read-only audit. Use existing reports first and report staleness without writing in read-only work.

Map route/state to exact page reference, viewport, component README/preview, tokens, assets and allowed copy. Preserve all original source paths and read-only exports. Compare candidate handoff variants before choosing; never infer a selector or desktop reference from a filename.

Output/update [inventory](../../../docs/ai/DESIGN_EXPORT_INVENTORY.md), [map](../../../docs/ai/DESIGN_SOURCE_MAP.md) and conflict register. For equal-level conflicts list both sources, effect, chosen disposition and reason; unresolved business changes require owner input. Record missing/non-independent mappings and task-specific selections using the [source template](../../../docs/ai/templates/design-source-map.md).
