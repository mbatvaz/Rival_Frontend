# Design System Extraction Contract

The full technology and architecture rules are in [`RIVAL_PROJECT_CONTRACT.md`](RIVAL_PROJECT_CONTRACT.md). This document records the extraction-specific rules.

## Canonical tokens

- Source of truth: `design-export/design-system-v2/tokens/tokens.json` (version 2).
- Generate `src/wwwroot/css/00-tokens/*.css` custom properties from this JSON.
- Keep v2 token names. Do not create a parallel token system.
- Token families: color, type, spacing, radius, shadow, blur, duration, easing, and size.
- Light theme only.

## Typography

- Yekan Bakh is the only approved typeface.
- Runtime font files: `YekanBakh-Light.woff2` (300), `YekanBakh-Regular.woff2` (400), `YekanBakh-SemiBold.woff2` (600).
- Use normal-width files only. Expanded and SemiExpanded files are reference/archive-only and must not be loaded.
- Create CSS variables for font family, weight, size, and line-height from the canonical type tokens. Do not hard-code typography values in page CSS.

## Icons

- Use the 71 local Lucide-based SVG icons in `design-export/design-system-v2/assets/icons/`.
- Preserve the approved `ri ri-*` compatibility class names; they do not refer to a Remix Icon package.
- No CDN or third-party icon package.

## CSS layers and files

```css
@layer tokens, base, layout, components, pages, utilities;
```

- `app.css` is only the ordered import list.
- One concern per file; target <=150 lines.
- Use logical RTL properties and `min-width` media queries.
- Raw colors, radii, shadows, font sizes, and spacing outside token definitions are defects unless logged and approved.
- Rebuild the approved visual behavior in canonical `rv-*` components. Do not load batch CSS bundles wholesale.

## Responsive and accessibility

- Mobile reference width 390; tablet 768–1023; desktop >=1024 with a purpose-designed desktop composition.
- No nested vertical scroll except the owner-approved mobile BK-REC01 editor with visible header. Horizontal scrolling is permitted only for documented horizontal rails/carousels.
- All interactive hit targets >=44×44px, including visually smaller controls.
- See `RIVAL_PROJECT_CONTRACT.md` for the complete desktop and accessibility contract.

## Governance and evidence

See the [component catalog](ai/COMPONENT_CATALOG.md), [source inventory](ai/DESIGN_EXPORT_INVENTORY.md), [conflicts](ai/DESIGN_SOURCE_CONFLICTS.md), [responsive procedure](ai/RESPONSIVE_DESIGN_CONTRACT.md) and [motion audit](ai/MOTION_SPEC.md). These link to the existing canonical sources; they do not authorize changing original exports. Token JSON has no dedicated breakpoint/container/z-index family; existing contract/approved brief values remain authoritative.
