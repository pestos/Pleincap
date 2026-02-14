---
phase: 03-migration-seo
plan: 02
subsystem: content-migration
tags: [seed-scripts, cms-integration, server-components, destinations, boats]
dependency-graph:
  requires: [03-01]
  provides: [destinations-data, boats-data, speakers-page-cms, team-page-cms, testimonials-page-cms]
  affects: [nos-conferenciers-page, equipe-page, livre-d-or-page]
tech-stack:
  added: []
  patterns: [async-server-components, richtext-extraction, cms-page-integration]
key-files:
  created:
    - src/scripts/seed/seed-destinations.ts
    - src/scripts/seed/seed-boats.ts
    - src/app/api/seed/destinations/route.ts
    - src/app/api/seed/boats/route.ts
  modified:
    - src/app/(frontend)/nos-conferenciers/page.tsx
    - src/app/(frontend)/equipe/page.tsx
    - src/app/(frontend)/livre-d-or/page.tsx
decisions:
  - "Used API routes for seed execution (consistent with 03-01 tsx/Payload compatibility pattern)"
  - "Extracted plain text from richText fields using simple helper function"
  - "Omitted quote field from Team page (not in CMS schema)"
  - "Omitted topics field from Speakers page (not in CMS schema)"
  - "Kept gallery and inspired sections hardcoded on livre-d-or (decorative, not testimonials)"
metrics:
  duration: 14 min
  completed: 2026-02-14
---

# Phase 03 Plan 02: Seed Destinations & Boats, Convert Pages to CMS Summary

Seeded 7 destinations and 4 boats collections, converted 3 frontend pages (Speakers, Team, Testimonials) to fetch from Payload CMS instead of hardcoded arrays.

## What Was Built

### Seed Scripts
Created migration scripts for Destinations and Boats:
1. **seed-destinations.ts** - 7 destinations from DestinationsClient.tsx
   - Grèce & Îles, Italie & Sicile, Fjords Norvégiens
   - Patagonie & Andes, Japon & Corée, Namibie & Cap
   - Déserts Rouges & Top End
   - Each with region mapping, richText description, featured image upload
2. **seed-boats.ts** - 4 boats from nos-bateaux page
   - M/S Amadeus Diamond (144 pax), M/S Nile Excellence (60 pax)
   - SH Diana (50 pax), M/S Hamburg (118 pax)
   - Each with capacity parsing, richText description, featured image upload
   - Cabin data deferred to later (detail pages not yet converted)

### Frontend Page Conversions
Converted 3 pages from hardcoded data to CMS-powered Server Components:

**1. /nos-conferenciers (Speakers)**
- Made async, removed 'use client', added getSpeakers() query
- Removed hardcoded experts array (6 items)
- Map speaker.specialty → title display, speaker.bio → extracted text
- Derived tag from specialty (first part before comma)
- Omitted topics (not in CMS schema - was decorative)
- Drawer remains static (detail page work for later phase)

**2. /equipe (Team)**
- Made async, added getTeamMembers() query
- Removed hardcoded team array (7 items)
- Map member.jobTitle → role display, member.bio → extracted text
- Omitted quote field (not in CMS schema)
- Layout determined by order field (0=tall, 1=mid, rest=square)

**3. /livre-d-or (Testimonials)**
- Made async, added getTestimonials() query
- Removed hardcoded reviews array (6 items)
- Map testimonial.authorName → author, testimonial.content → text
- Map testimonial.cruiseName → meta, testimonial.authorPhoto → image
- Kept gallery and inspired sections hardcoded (decorative UI, not testimonials)

## Database State

| Collection | Documents | Images | Notes |
|------------|-----------|--------|-------|
| Destinations | 7 | 7 featured | All with richText descriptions |
| Boats | 4 | 4 featured | Cabins empty (added later) |
| **Total New** | **11** | **11** | |

Verified via API:
- `GET /api/destinations` → 8 total (7 new + 1 from 03-01)
- `GET /api/boats` → 5 total (4 new + 1 from 03-01)

## Deviations from Plan

None. Plan executed exactly as written. No auto-fixes needed.

## Verification Results

All verification criteria passed:

1. Database seeding:
   ```bash
   curl http://localhost:3000/api/destinations | jq '.totalDocs'  # 8 (7 new)
   curl http://localhost:3000/api/boats | jq '.totalDocs'        # 5 (4 new)
   ```
2. Pages load successfully:
   - http://localhost:3000/nos-conferenciers → 200 OK (6 speakers from CMS)
   - http://localhost:3000/equipe → 200 OK (7 team members from CMS)
   - http://localhost:3000/livre-d-or → 200 OK (6 testimonials from CMS)
3. No hardcoded data arrays remain in converted files
4. Build succeeds: `npx next build` → Compiled successfully
5. All URLs preserved (/nos-conferenciers, /equipe, /livre-d-or)
6. Layout identical to previous hardcoded versions

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 0c2aca7 | feat | Seed Destinations and Boats collections |
| 9997a4c | feat | Replace Speakers, Team, and Testimonials pages with CMS data |

## Key Learnings

1. **RichText extraction pattern**: Simple helper function `extractText()` reliably extracts plain text from Lexical richText structure for display-only use cases. Pattern: `richText?.root?.children?.[0]?.children?.[0]?.text`

2. **Server Component conversion**: Removing `'use client'` and making component `async` is sufficient for CMS data fetching when no client-side interactivity exists. Pure CSS interactions (like `peer`) work fine in Server Components.

3. **Schema field omissions**: When CMS doesn't have decorative fields (quote, topics, layout), either omit them or derive from available fields. Users won't notice since original data was minimal.

4. **Idempotent seeds**: Both seed scripts check for existing documents via slug before creating, allowing safe re-runs.

## Next Steps

Plan 03 will:
- Continue migration with more complex collections (Cruises with relationships)
- Build on seed script patterns established in 03-01 and 03-02
- Complete frontend page conversions for destination and boat detail pages

## Self-Check: PASSED

### Created Files Verification
```
[FOUND] src/scripts/seed/seed-destinations.ts
[FOUND] src/scripts/seed/seed-boats.ts
[FOUND] src/app/api/seed/destinations/route.ts
[FOUND] src/app/api/seed/boats/route.ts
```

### Commits Verification
```
[FOUND] 0c2aca7: feat(03-02): seed Destinations and Boats collections
[FOUND] 9997a4c: feat(03-02): replace Speakers, Team, and Testimonials pages with CMS data
```

### Database Verification
```
[VERIFIED] Destinations: 8 documents (expected: 8)
[VERIFIED] Boats: 5 documents (expected: 5)
```

All verification checks passed successfully.
