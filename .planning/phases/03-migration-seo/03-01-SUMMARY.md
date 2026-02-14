---
phase: 03-migration-seo
plan: 01
subsystem: content-migration
tags: [seed-scripts, payload-local-api, data-migration, image-upload]
dependency-graph:
  requires: [02-01, 02-02, 02-03]
  provides: [speakers-data, team-data, testimonials-data, payload-queries-lib]
  affects: [nos-conferenciers-page, equipe-page, livre-d-or-page]
tech-stack:
  added: [payload-local-api, media-upload-utils]
  patterns: [idempotent-seeds, external-image-upload, richtext-conversion]
key-files:
  created:
    - src/lib/payload-queries.ts
    - src/scripts/seed/utils.ts
    - src/scripts/seed/seed-speakers.ts
    - src/scripts/seed/seed-team.ts
    - src/scripts/seed/seed-testimonials.ts
    - src/app/api/seed/speakers/route.ts
    - src/app/api/seed/team/route.ts
    - src/app/api/seed/testimonials/route.ts
  modified: []
decisions:
  - "Used API routes instead of CLI scripts to run seeds (tsx/Payload compatibility issue)"
  - "External images downloaded and uploaded to Media collection (required for upload fields)"
  - "RichText format converted from plain text using simple paragraph structure"
  - "French month names parsed to ISO dates for testimonials"
  - "Idempotency implemented via slug/authorName duplicate checking"
metrics:
  duration: 11 min
  completed: 2026-02-14
---

# Phase 03 Plan 01: Seed Independent Collections Summary

Payload Local API query helpers library created and three seed scripts implemented for Speakers, Team, and Testimonials collections.

## What Was Built

### Query Helpers Library
Created `src/lib/payload-queries.ts` with reusable typed query functions using Payload's Local API:
- `getPayloadClient()` - Cached Payload instance initialization
- Collection queries for speakers, team, testimonials, cruises, destinations, boats, posts
- Appropriate depth settings (depth:2 for cruises, depth:1 for posts)
- Published content filtering (`_status: 'published'`)
- Pagination disabled for small collections

### Seed Scripts Infrastructure
Implemented migration scripts for independent collections (no relationship dependencies):
1. **Speakers** - 6 conférenciers from `nos-conferenciers/page.tsx`
2. **Team** - 7 team members from `equipe/page.tsx`
3. **Testimonials** - 6 client testimonials from `livre-d-or/page.tsx`

### Image Handling
Created `uploadMediaFromUrl()` utility that:
- Downloads external images (plein-cap.com, googleusercontent.com)
- Uploads to Payload Media collection
- Returns media ID for relationship fields
- Checks for existing media by filename (idempotent)

### Execution Method
Used Next.js API routes (`/api/seed/*`) instead of CLI scripts due to tsx/Payload 3.x compatibility issue. Routes execute seed logic within Next.js context where Payload config works correctly.

## Database State

| Collection | Documents | Featured | Images Uploaded |
|------------|-----------|----------|-----------------|
| Speakers | 6 | N/A | 6 photos |
| Team | 7 | N/A | 7 photos |
| Testimonials | 6 | 3 featured | 3 photos (3 without) |
| **Total** | **19** | | **16 media uploads** |

All seed scripts verified idempotent - running twice produces 0 duplicates.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] tsx/Payload compatibility issue**
- **Found during:** Task 2 execution
- **Issue:** Running `npx tsx src/scripts/seed/*.ts` failed with "Cannot destructure property 'loadEnvConfig'" error from Payload's loadEnv module
- **Fix:** Created parallel API route implementations (`/api/seed/*`) that run seed logic via HTTP requests. This leverages Next.js's runtime where Payload config is properly initialized
- **Files modified:** Added `src/app/api/seed/{speakers,team,testimonials}/route.ts`
- **Commits:** Part of ebb7376

**2. [Rule 2 - Missing Critical] Media upload requirement not initially clear**
- **Found during:** Task 2 planning
- **Issue:** `photo` fields on Speakers and Team are `required: true` but plan initially suggested skipping image uploads
- **Fix:** Implemented `uploadMediaFromUrl()` utility to download external images and upload to Media collection, then use returned ID in relationships
- **Files modified:** `src/scripts/seed/utils.ts`
- **Commits:** Part of ebb7376

**3. [Rule 2 - Missing Critical] RichText format conversion**
- **Found during:** Task 2 implementation
- **Issue:** Speakers `bio` and Team `bio` fields require richText format, not plain string
- **Fix:** Converted plain text to Lexical richText format with simple root/paragraph/text structure
- **Implementation:** Inline in seed scripts
- **Commits:** Part of ebb7376

## Verification Results

All verification criteria passed:

1. TypeScript compilation: Build succeeds without errors
2. Speakers: 6 documents with photos uploaded
3. Team: 7 documents with correct order values (0-6)
4. Testimonials: 6 documents with parsed cruise names and dates
5. Idempotency: Running seeds twice results in 0 created, all skipped
6. API verification:
   ```bash
   curl http://localhost:3000/api/speakers | jq '.totalDocs'  # 6
   curl http://localhost:3000/api/team | jq '.totalDocs'      # 7
   curl http://localhost:3000/api/testimonials | jq '.totalDocs'  # 6
   ```

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 168e7dd | feat | Create Payload Local API query helpers library |
| ebb7376 | feat | Create seed scripts for Speakers, Team, and Testimonials |

## Key Learnings

1. **Payload 3.x + tsx compatibility**: Known issue with tsx and Payload's environment loading. API routes are a reliable workaround for seed scripts in Next.js projects.

2. **Image upload pattern**: External images must be downloaded and uploaded to Media collection. Cannot reference external URLs directly in `upload` relationship fields.

3. **RichText conversion**: Lexical richText requires specific JSON structure. Simple conversion pattern: `{ root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: '...' }] }] } }`

4. **French date parsing**: Month names in French (Mai, Juillet, etc.) need mapping to numeric format for ISO date strings.

5. **Idempotency strategy**: Check for existing documents by unique identifier (slug for speakers/team, authorName for testimonials) before creating.

## Next Steps

Plan 02 will:
- Migrate Destinations and Boats collections (independent collections with richer schemas)
- Build on query helpers library
- Prepare for Plan 03 which migrates Cruises (dependent collection with relationships to destinations, boats, speakers)

## Self-Check: PASSED

### Created Files Verification
```bash
[FOUND] src/lib/payload-queries.ts
[FOUND] src/scripts/seed/utils.ts
[FOUND] src/scripts/seed/seed-speakers.ts
[FOUND] src/scripts/seed/seed-team.ts
[FOUND] src/scripts/seed/seed-testimonials.ts
[FOUND] src/app/api/seed/speakers/route.ts
[FOUND] src/app/api/seed/team/route.ts
[FOUND] src/app/api/seed/testimonials/route.ts
```

### Commits Verification
```bash
[FOUND] 168e7dd: feat(03-01): create Payload Local API query helpers
[FOUND] ebb7376: feat(03-01): create seed scripts for Speakers, Team, and Testimonials
```

### Database Verification
```bash
[VERIFIED] Speakers: 6 documents (expected: 6)
[VERIFIED] Team: 7 documents (expected: 7)
[VERIFIED] Testimonials: 6 documents (expected: 6)
[VERIFIED] Idempotency: All seeds return 0 created on re-run
```

All verification checks passed successfully.
