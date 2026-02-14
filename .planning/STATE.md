# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-14)

**Core value:** L'équipe PleinCap peut gérer l'intégralité du contenu du site sans toucher au code depuis un backoffice intuitif.
**Current focus:** Phase 4 — Newsletter Foundation

## Current Position

Phase: 4 of 5 (Newsletter Foundation) — IN PROGRESS
Plan: 2 of 4 (in phase) - Plan 01 complete
Status: Newsletter subscription foundation built. Next: Plan 02 (Newsletter UI)
Last activity: 2026-02-14 — 04-01 complete

Progress: [████████░░] 81% (13/16 plans across all phases)

## Performance Metrics

**Velocity:**
- Total plans completed: 13
- Average duration: 7 min
- Total execution time: 1.8 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3 | 20 min | 7 min |
| 02-content-collections | 4 | 12 min | 3 min |
| 03-migration-seo | 5 | 63 min | 13 min |
| 04-newsletter-foundation | 1 | 5 min | 5 min |

**Recent Trend:**
- Last 5 plans: 03-02 (14 min), 03-03 (25 min), 03-04 (11 min), 03-05 (2 min), 04-01 (5 min)
- Trend: Phase 4 started. Newsletter foundation fast build on established API patterns

*Updated after each plan completion*
| Phase 03 P01 | 11 | 2 tasks | 8 files |
| Phase 03 P02 | 14 | 2 tasks | 7 files |
| Phase 03 P03 | 25 | 2 tasks | 7 files |
| Phase 03 P04 | 11 | 2 tasks | 10 files |
| Phase 03 P05 | 2 | 1 task | 4 files |
| Phase 04 P01 | 5 | 2 tasks | 9 files |

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
- [Phase 03-03]: Made boat/destination fields optional in Cruises collection to handle missing relationships
- [Phase 03-03]: Created fix-slug API route to preserve danube-imperial URL after formatSlug hook override
- [Phase 03-03]: Used inline Media type definition to avoid payload-types generation tsx compatibility issue
- [Phase 03-04]: Used `any` types for Payload CMS data to avoid complex type generation issues
- [Phase 03-04]: Server/Client component split pattern for pages requiring filtering/search
- [Phase 03-04]: Dynamic [slug] route replaces static boat detail pages
- [Phase 03-05]: Sitemap.ts placed at app root (outside route groups) for /sitemap.xml access
- [Phase 03-05]: Destinations included in sitemap for complete URL coverage
- [Phase 03-05]: Fixed catalogue params to Promise pattern for Next.js 16 compatibility
- [Phase 04-01]: Email adapter interface with ConsoleEmailAdapter default for provider-agnostic architecture
- [Phase 04-01]: One-click unsubscribe with immediate processing for GDPR compliance
- [Phase 04-01]: nanoid for URL-safe token generation instead of crypto.randomBytes
- [Phase 04-01]: Async render functions for React Email templates (render() returns Promise)

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

Last session: 2026-02-14 (Phase 4 Plan 01 complete)
Stopped at: Completed 04-01-PLAN.md (Newsletter subscription foundation)
Resume file: None
