> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Design System Extraction

## Canonical tokens

Use `references/design-system/tokens/tokens.json` as the machine-readable source. Generate `src/wwwroot/css/00-tokens/tokens.css` from it once in Phase 01. Keep the v2 names; do not rename into a second token system.

Token families present: color, type, spacing, radius, shadow, blur, duration, easing, size. Light theme only. Yekan Bakh and local Remix Icon assets are mandatory; no CDN.

## CSS layers

```css
@layer tokens, base, layout, components, pages, utilities;
```

`app.css` only imports files. One concern per file, target <=150 lines. Use logical RTL properties and `min-width` media queries. Raw colors, radii, shadows and font sizes outside tokens are defects unless the exception is logged.

## Responsive contract

- <768: 390 reference layout, one column, mobile bottom nav.
- >=768: centered max 720 container; natural two-column cards where documented; bottom nav remains.
- >=1024: max 1200 container, desktop header, no bottom nav; sheet remains bottom attached and max 560px.
- Never introduce inner scrolling containers.

## Required accessibility

RTL, visible focus, keyboard operation, `aria-invalid` for field errors, `role=alert/status` for feedback, 44px touch targets, and reduced-motion handling.
