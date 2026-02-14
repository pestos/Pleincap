# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-14)

**Core value:** L'équipe PleinCap peut gérer l'intégralité du contenu du site sans toucher au code depuis un backoffice intuitif.
**Current focus:** Phase 2 - Content Collections

## Current Position

Phase: 2 of 5 (Content Collections)
Plan: 4 of 4 in phase
Status: In progress
Last activity: 2026-02-14 — Completed 02-03 (Blog Posts and Banners)

Progress: [████░░░░░░] 40% (6/15 plans across all phases)

## Performance Metrics

**Velocity:**
- Total plans completed: 6
- Average duration: 4 min
- Total execution time: 0.6 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3 | 20 min | 7 min |
| 02-content-collections | 3 | 7 min | 2 min |

**Recent Trend:**
- Last 5 plans: 01-03 (13 min), 02-01 (2 min), 02-02 (2 min), 02-03 (3 min)
- Trend: Phase 2 maintaining exceptional velocity, collection patterns well-established

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Payload CMS 3.0 chosen for native Next.js integration and PostgreSQL support
- PostgreSQL selected for database (robust, standard, Payload native support)
- Design unchanged (backend only transformation)
- Email provider deferred (architecture must be agnostic)
- Upgraded to Next.js 16 (exceeds 15.2.3 minimum) for latest features and stability (01-01)
- Upgraded eslint to 10.0.0 to resolve peer dependency with eslint-config-next (01-01)
- Used .mjs extension for next.config for ESM compatibility required by Payload CMS (01-01)
- Upgraded Next.js to 16.2.0-canary.45 to meet Payload CMS peer dependency requirement (01-02)
- Used route groups for CSS isolation between frontend and Payload admin panel (01-02)
- Fixed Payload API route handlers to pass config parameter (01-02)
- [Phase 01-foundation]: Chose admin/editor role model for RBAC (simple two-tier sufficient for Phase 1)
- [Phase 01-foundation]: Field-level access control on role field to prevent privilege escalation
- [Phase 01-foundation]: Three image sizes (thumbnail/card/hero) for media uploads using sharp
- [Phase 01-foundation]: Local media storage in public/media (Phase 1; may migrate to S3/CDN later)
- [Phase 02-content-collections]: NFD normalization for slug generation handles French accents correctly (02-01)
- [Phase 02-content-collections]: Collections grouped under 'Contenu' to separate from 'Administration' (02-01)
- [Phase 02-content-collections]: Used jobTitle instead of role for Team collection to avoid confusion with user roles (02-01)
- [Phase 02-content-collections]: Boats cabin array includes 6 fields for detailed cabin specifications (02-02)
- [Phase 02-content-collections]: Categories and Tags admin-only to prevent taxonomy sprawl (02-02)
- [Phase 02-content-collections]: Admin sidebar groups: 'Croisieres' for Destinations/Boats, 'Blog' for Categories/Tags (02-02)
- [Phase 02-content-collections]: Posts organized with tabs (Contenu/Taxonomie/Publication) for cleaner editing UX (02-03)
- [Phase 02-content-collections]: Banners limited to 1 block (minRows: 1, maxRows: 1) - one hero type per banner (02-03)
- [Phase 02-content-collections]: Both Posts and Banners use 375ms autosave interval for responsive draft saving (02-03)
- [Phase 02-content-collections]: Author field auto-defaults to current user via defaultValue hook (02-03)
- [Phase 02-content-collections]: Public read access restricted to published posts/banners only (02-03)

### Pending Todos

None yet.

### Blockers/Concerns

**Phase 1:**
- ~~Payload 3.0 version verification needed~~ ✅ RESOLVED (01-02): Payload 3.76.1 stable installed
- ~~Route group isolation must be tested~~ ✅ RESOLVED (01-02): Build successful, CSS isolation working
- ~~Users and Media collections with RBAC~~ ✅ COMPLETE (01-03): Admin/editor roles working, media upload with auto-resize verified

**Phase 3:**
- URL mapping must be completed before migration starts to preserve SEO
- Migration must be incremental (one collection at a time) to prevent data loss

**Phase 4:**
- DNS configuration (SPF, DKIM, DMARC) must be completed BEFORE first email send to prevent blacklisting

## Session Continuity

Last session: 2026-02-14 (phase 02 plan execution)
Stopped at: Completed 02-03-PLAN.md (Blog Posts and Banners)
Resume file: None
