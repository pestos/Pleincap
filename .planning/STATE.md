# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-14)

**Core value:** L'équipe PleinCap peut gérer l'intégralité du contenu du site sans toucher au code depuis un backoffice intuitif.
**Current focus:** Phase 2 - Content Collections

## Current Position

Phase: 3 of 5 (Migration & SEO)
Plan: 2 of 5 (in phase)
Status: Active
Last activity: 2026-02-14 — Completed 03-02 (Seed Destinations & Boats, Convert Pages to CMS)

Progress: [██████░░░░] 60% (9/15 plans across all phases)

## Performance Metrics

**Velocity:**
- Total plans completed: 9
- Average duration: 5 min
- Total execution time: 1.1 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3 | 20 min | 7 min |
| 02-content-collections | 4 | 12 min | 3 min |
| 03-migration-seo | 2 | 25 min | 13 min |

**Recent Trend:**
- Last 5 plans: 02-02 (2 min), 02-03 (3 min), 02-04 (5 min), 03-01 (11 min), 03-02 (14 min)
- Trend: Phase 3 tasks involve more data migration work, longer durations expected

*Updated after each plan completion*
| Phase 03 P01 | 11 | 2 tasks | 8 files |
| Phase 03 P02 | 14 | 2 tasks | 7 files |

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
- [Phase 02-content-collections]: Cruises use tabs layout (Contenu/Details/Itineraire) for complex form (02-04)
- [Phase 02-content-collections]: SEO plugin configured with tabbedUI on cruises, posts, destinations, boats (02-04)
- [Phase 02-content-collections]: Banners video upload changed from URL to file upload per user requirement (02-04)
- [Phase 02-content-collections]: Media collection accepts video mimeTypes (mp4, webm, ogg) (02-04)
- [Phase 02-content-collections]: Boats description made optional due to richText validation issue (02-04)
- [Phase 03-01]: Used API routes instead of CLI scripts for seed execution due to tsx/Payload 3.x compatibility issue
- [Phase 03-01]: External images downloaded and uploaded to Media collection for required upload fields
- [Phase 03-01]: Idempotent seed scripts check for duplicates via slug/authorName before creating
- [Phase 03-02]: Used API routes for seed execution (consistent with 03-01 tsx/Payload compatibility pattern)
- [Phase 03-02]: Extracted plain text from richText fields using simple helper function for display-only use cases

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

Last session: 2026-02-14 (phase 03 plan 02 execution complete)
Stopped at: Completed 03-02-PLAN.md
Resume file: None
