---
name: design-source-audit
description: Inventory Rival design exports and map page, component, token and asset evidence when auditing sources or preparing an assigned page with unclear design references.
---

# Design source audit

Read the manifest, page inventory and [conflict register](../../../docs/ai/DESIGN_SOURCE_CONFLICTS.md). Run `rg --files design-export` then `node tools/audit-design.mjs` from the repository root. Inspect actual relevant HTML/text/JSON/SVG/image contents; generated extraction is structural evidence, not visual acceptance.

Map route/state to exact page reference, viewport, component README/preview, tokens, assets and allowed copy. Preserve all original source paths and read-only exports. Compare candidate handoff variants before choosing; never infer a selector or desktop reference from a filename.

Output/update [inventory](../../../docs/ai/DESIGN_EXPORT_INVENTORY.md), [map](../../../docs/ai/DESIGN_SOURCE_MAP.md) and conflict register. For equal-level conflicts list both sources, effect, chosen disposition and reason; unresolved business changes require owner input. Record missing/non-independent mappings and task-specific selections using the [source template](../../../docs/ai/templates/design-source-map.md).
