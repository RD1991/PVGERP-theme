# Changelog

All notable changes to this project will be documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). This project uses [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2026-04-11

### Added
- `erp-theme.css` — core generic stylesheet with full `--erp-*` design token system
- `erp-theme.js` — browser JS with `ERP` global namespace (Sidebar, Modal, Toast, Confirm, Loader, Form, Breadcrumb, Notifications)
- `colleges/pvg/config.css` — PVG COET&M, Pune brand overrides (navy #003A6A, Poppins)
- `colleges/pvg/assets/` — square icon and wordmark logos for PVG
- `examples/` — four ready-to-run HTML pages (login, dashboard, admission form, notifications)
- `index.js` / `index.mjs` — CJS and ESM entry points exposing file paths for bundler integration
- `package.json` — npm package metadata, `files` whitelist, `exports` map
- `scripts/validate.js` — pre-publish safety check
