---
phase: 02-content-collections
plan: 03
subsystem: cms-collections
tags: [payload-cms, blog, banners, blocks, drafts, relationships]

# Dependency graph
requires:
  - phase: 02-02
    provides: Categories and Tags collections for blog taxonomy
  - phase: 01-03
    provides: Users and Media collections for author and image relationships
provides:
  - Posts collection with rich text, categories/tags relationships, author auto-default, and draft/publish workflow
  - Banners collection with blocks field (imageHero and videoHero) for flexible hero sections
  - Tab-based editing layout pattern for complex forms
affects: [02-04, content-management, frontend-rendering]

# Tech tracking
tech-stack:
  added: []
  patterns: [tabs-layout-for-forms, blocks-field-for-flexible-content, draft-autosave-375ms]

key-files:
  created:
    - src/payload/collections/Posts.ts
    - src/payload/collections/Banners.ts
  modified:
    - payload.config.ts

key-decisions:
  - "Posts organized with tabs (Contenu/Taxonomie/Publication) for cleaner editing UX"
  - "Banners limited to 1 block (minRows: 1, maxRows: 1) - one hero type per banner"
  - "Both collections use 375ms autosave interval for responsive draft saving"
  - "Author field auto-defaults to current user via defaultValue hook"
  - "Public read access restricted to published posts/banners only"

patterns-established:
  - "Tabs layout: Use for collections with 8+ fields or distinct content sections"
  - "Blocks with minRows/maxRows: Enforce single block selection when appropriate"
  - "Draft/publish workflow: Standard for all public-facing content types"

# Metrics
duration: 3min
completed: 2026-02-14
---

# Phase 02 Plan 03: Blog Posts and Banners Summary

**Blog posts collection with category/tag/author relationships and banners with flexible image/video hero blocks**

## Performance

- **Duration:** 3 minutes
- **Started:** 2026-02-14T14:10:52Z
- **Completed:** 2026-02-14T14:14:19Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Posts collection with tab-based editing (Contenu, Taxonomie, Publication)
- Relationship fields to categories, tags, and users collections
- Draft/publish workflow with autosave for both Posts and Banners
- Banners collection with blocks field supporting imageHero and videoHero types
- Author auto-defaults to current authenticated user
- Public read access restricted to published content only

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Posts collection with blog relationships** - `6a0d275` (feat)
   - Created Posts.ts with tabs layout
   - Added categories, tags, author relationship fields
   - Implemented draft/publish workflow with autosave

2. **Task 2: Create Banners collection with blocks field, register both in config** - `9e39d97` (feat)
   - Created Banners.ts with imageHero and videoHero blocks
   - Registered Posts and Banners in payload.config.ts
   - Build passed successfully

## Files Created/Modified
- `src/payload/collections/Posts.ts` - Blog posts with rich text, featured image, excerpt, categories, tags, and author
- `src/payload/collections/Banners.ts` - Hero banners with blocks field for image or video content
- `payload.config.ts` - Registered Posts and Banners collections

## Decisions Made

**Posts collection tabs layout:**
- Organized fields into 3 tabs (Contenu/Taxonomie/Publication) for better editing UX
- Separates content creation from taxonomic classification and publishing metadata

**Banners blocks constraint:**
- Used `minRows: 1, maxRows: 1` to enforce exactly one hero block per banner
- Prevents confusion from multiple hero types in single banner

**Author auto-default:**
- Implemented `defaultValue: ({ user }) => user?.id` on author field
- Ensures every post has an author without manual selection

**Public access control:**
- Read access returns `{ _status: { equals: 'published' } }` for unauthenticated requests
- Authenticated users can see drafts, public users see only published content

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Blog system complete with Posts, Categories, and Tags
- Banners collection ready for hero section management
- All collections have draft/publish workflow for content review
- Ready for Plan 04 (final content collection implementation)

## Self-Check: PASSED

All files created and all commits exist as documented.

---
*Phase: 02-content-collections*
*Completed: 2026-02-14*
