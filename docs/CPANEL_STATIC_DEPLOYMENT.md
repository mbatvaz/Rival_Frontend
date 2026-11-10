# cPanel Static Deployment

1. Run `npm run build` locally (or ask Codex to run the VS Code task).
2. Confirm `dist/` contains `index.html`, `_preview/index.html`, route folders, CSS/JS, mock JSON, local fonts/icons/images, and `.htaccess`.
3. Upload the **contents** of `dist/` to the cPanel document root (`public_html/` or the domain's configured document root).
4. Visit `/` for the public home and `/_preview/` or `/pages.html` for the central page directory.
5. No Node.js app, Express process, Passenger application, database, or server-side template runtime is required for this static reference.

If the site is deployed below a subdirectory instead of the domain root, change `src/site-config.json` `basePath` (for example `/rival-demo/`) and rebuild before uploading. The local preview server uses the same base path.

This is a UI/UX demo only. It does not perform real authentication, bookings, payments, SMS, or financial writes.
