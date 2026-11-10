# Historical Design System Technology Notes

This Design System v2 package contains historical examples and artifacts created when the project considered Razor + Tailwind + Alpine.js + htmx. Those examples are preserved as design evidence only.

For implementation, follow the root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`:

- Native CSS; no Tailwind, Bootstrap, preprocessor, or CSS bundler.
- Native JavaScript ES Modules; no Alpine.js or htmx.
- `tokens.json` is canonical; rebuild approved visual behavior into layered `rv-*` CSS.
- Local 71 Lucide-based SVG icons use the historical `ri` compatibility class prefix.
- Only normal-width Yekan Bakh 300/400/600 is loaded.

`tokens/tailwind.config.js`, `tokens/tokens.scss`, and the old Tailwind/Alpine snippets are retained only for historical reference and must not be imported into the app.
