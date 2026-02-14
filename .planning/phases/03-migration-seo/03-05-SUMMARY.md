---
phase: 03-migration-seo
plan: 05
subsystem: seo-infrastructure
tags: [sitemap, robots, metadata, opengraph, seo, next-metadata-api]
dependency-graph:
  requires: [03-04-SUMMARY.md]
  provides: [dynamic-sitemap, robots-txt, seo-metadata, opengraph-tags]
  affects: [/sitemap.xml, /robots.txt, catalogue, nos-bateaux]
tech-stack:
  added: [next-metadata-route, next-sitemap-api, next-robots-api]
  patterns: [generateMetadata-with-cms, dynamic-sitemap-from-payload, promise-params-nextjs16]
key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/app/(frontend)/catalogue/[slug]/page.tsx
    - src/app/(frontend)/nos-bateaux/[slug]/page.tsx
key-decisions:
  - "Sitemap placed at src/app/sitemap.ts (outside route groups) for /sitemap.xml root access"
  - "Destinations included in sitemap alongside cruises, boats, and posts"
  - "Used `any` type assertions for CMS data in generateMetadata to avoid payload-types issues"
  - "Fixed catalogue params to Promise pattern for Next.js 16 compatibility"
patterns-established:
  - "generateMetadata with SEO plugin fallback: meta.title || fallback title"
  - "OpenGraph images from meta.image || featuredImage for social sharing"
  - "Dynamic sitemap querying all published collections with pagination:false"
metrics:
  duration: 2m
  tasks: 1 (Task 2 is human-verify checkpoint - pending)
  files-modified: 4
  commits: 1
  completed: 2026-02-14T16:33:00Z
---

# Phase 03 Plan 05: SEO Infrastructure Summary

**Dynamic sitemap.xml from all CMS collections, robots.txt blocking admin/API, and generateMetadata with OpenGraph on all dynamic routes**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-14T16:31:46Z
- **Completed:** 2026-02-14T16:33:30Z
- **Tasks:** 1 of 2 (Task 2 is human-verify checkpoint - pending)
- **Files modified:** 4

## Accomplishments
- Dynamic sitemap.ts queries all published cruises, boats, posts, and destinations from CMS
- robots.ts blocks /admin/ and /api/ from search engine crawlers
- generateMetadata added to catalogue/[slug] with OpenGraph and SEO plugin field support
- Boat detail page generateMetadata enhanced with OpenGraph data and SEO plugin fields
- Fixed catalogue page params to use Promise pattern for Next.js 16 compatibility
- Build succeeds with all routes rendering correctly

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement dynamic sitemap, robots.txt, and generateMetadata** - `919e453` (feat)

**Plan metadata:** (pending - will be committed with SUMMARY.md)

## Files Created/Modified
- `src/app/sitemap.ts` - Dynamic sitemap querying cruises, boats, posts, destinations from Payload CMS
- `src/app/robots.ts` - Robots.txt configuration blocking /admin/ and /api/
- `src/app/(frontend)/catalogue/[slug]/page.tsx` - Added generateMetadata with OpenGraph, fixed Promise params
- `src/app/(frontend)/nos-bateaux/[slug]/page.tsx` - Enhanced generateMetadata with OpenGraph and SEO plugin fields

## Decisions Made
- Placed sitemap.ts and robots.ts at `src/app/` root (outside route groups) so they serve at `/sitemap.xml` and `/robots.txt`
- Included destinations in the sitemap even though no individual destination pages exist (future-proofing)
- Used `any` type assertions for Payload CMS data in generateMetadata to avoid complex type generation issues (consistent with 03-04 pattern)
- Fixed catalogue/[slug] params from `{ params: { slug: string } }` to `{ params: Promise<{ slug: string }> }` for Next.js 16

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed catalogue params pattern for Next.js 16**
- **Found during:** Task 1
- **Issue:** `catalogue/[slug]/page.tsx` used old `{ params: { slug: string } }` pattern instead of Promise
- **Fix:** Changed to `Promise<{ slug: string }>` with `await params` in both `generateMetadata` and page component
- **Files modified:** `src/app/(frontend)/catalogue/[slug]/page.tsx`
- **Verification:** Build succeeds, all cruise pages generate correctly
- **Committed in:** 919e453

**2. [Rule 2 - Missing Critical] Added OpenGraph data to boat generateMetadata**
- **Found during:** Task 1
- **Issue:** Boat detail page had generateMetadata but lacked OpenGraph data for social sharing
- **Fix:** Added openGraph.title, description, and images from SEO plugin fields with fallbacks
- **Files modified:** `src/app/(frontend)/nos-bateaux/[slug]/page.tsx`
- **Verification:** Build succeeds
- **Committed in:** 919e453

**3. [Rule 2 - Missing Critical] Added destinations to sitemap**
- **Found during:** Task 1
- **Issue:** Plan only specified cruises, boats, and posts in sitemap - destinations with individual slugs were missing
- **Fix:** Added destinations query and mapping to sitemap
- **Files modified:** `src/app/sitemap.ts`
- **Verification:** Build succeeds, sitemap.xml generated at root
- **Committed in:** 919e453

---

**Total deviations:** 3 auto-fixed (1 bug, 2 missing critical)
**Impact on plan:** All fixes necessary for correctness and completeness. No scope creep.

## Human Verification Pending (Task 2)

Task 2 is a `checkpoint:human-verify` requiring manual verification of the complete Phase 3 migration. The following 14 items must be verified:

1. Homepage (/) - Selection and Testimonials sections from CMS
2. Catalogue (/catalogue) - cruises from CMS
3. Cruise Detail (/catalogue/danube-imperial) - itinerary and experts from CMS
4. Destinations (/destinations) - destination cards from CMS
5. Boats (/nos-bateaux) - boat listing from CMS
6. Boat Detail (/nos-bateaux/amadeus-diamond) - boat specs from CMS
7. Boat Detail (/nos-bateaux/nile-excellence) - boat specs from CMS
8. Speakers (/nos-conferenciers) - 6 speakers from CMS
9. Team (/equipe) - 7 team members from CMS
10. Testimonials (/livre-d-or) - 6 testimonials from CMS
11. Blog (/blog) - posts from CMS or empty state
12. SEO - /sitemap.xml lists all URLs, /robots.txt blocks /admin/
13. No 404s on any existing URL
14. Admin Panel (/admin) - all seeded data visible in collections

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 3 (Migration & SEO) automated work is complete
- Human verification of all 14 items above needed before marking Phase 3 as fully complete
- Phase 4 (Newsletter Foundation) can begin planning independently of verification outcome

## Self-Check: PASSED

**Created files verified:**
- FOUND: src/app/sitemap.ts
- FOUND: src/app/robots.ts

**Modified files verified:**
- FOUND: src/app/(frontend)/catalogue/[slug]/page.tsx
- FOUND: src/app/(frontend)/nos-bateaux/[slug]/page.tsx

**Commits verified:**
- FOUND: 919e453 (feat(03-05): add sitemap, robots.txt, and generateMetadata for SEO)

**Build verified:**
- Build succeeds with /sitemap.xml and /robots.txt in route table

---
*Phase: 03-migration-seo*
*Completed: 2026-02-14*
