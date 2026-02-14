---
phase: 02-content-collections
plan: 01
subsystem: collections
tags: [collections, hooks, seo, speakers, team, testimonials]
dependency_graph:
  requires: [01-03-foundation]
  provides: [formatSlug-hook, speakers-collection, team-collection, testimonials-collection]
  affects: [payload-config, admin-ui]
tech_stack:
  added: [@payloadcms/plugin-seo]
  patterns: [slug-generation, field-hooks, access-control, admin-grouping]
key_files:
  created:
    - src/payload/hooks/formatSlug.ts
    - src/payload/collections/Speakers.ts
    - src/payload/collections/Team.ts
    - src/payload/collections/Testimonials.ts
  modified:
    - payload.config.ts
    - package.json
decisions:
  - Slug generation uses NFD normalization to handle French accents
  - Collections grouped under 'Contenu' for editor experience
  - Same RBAC pattern as Phase 1 (public read, authenticated create/update, admin delete)
metrics:
  duration_minutes: 2
  tasks_completed: 2
  files_created: 4
  files_modified: 2
  completed_at: 2026-02-14
---

# Phase 2 Plan 01: Shared Utilities & First Collections Summary

**One-liner:** Reusable slug generation hook with French accent handling, SEO plugin installation, and three content collections (Speakers, Team, Testimonials) with admin grouping.

## Overview

Successfully created the foundational utilities and first set of content collections for Phase 2. This plan establishes patterns that all subsequent collections will follow: automatic slug generation from French text, consistent access control, and organized admin UI grouping.

## What Was Built

### Core Utilities

**formatSlug Hook** (`src/payload/hooks/formatSlug.ts`)
- Reusable field hook for auto-generating URL-safe slugs
- NFD Unicode normalization to decompose French accents (é → e + combining mark)
- Strips diacritical marks (U+0300-U+036F range)
- Converts to lowercase, replaces non-alphanumeric with hyphens
- Auto-generates on create or when empty, preserves manual edits on update
- Type-safe with Payload's `FieldHook` type

**SEO Plugin**
- Installed `@payloadcms/plugin-seo` v3.76.1
- Available for use in Plan 04 when all public-facing collections exist
- Not yet configured in payload.config.ts (deferred per plan requirements)

### Collections

**Speakers Collection** (`src/payload/collections/Speakers.ts`)
- Fields: name, slug (auto-generated), photo, specialty, bio, website
- Use case: Conference speakers and subject matter experts
- Admin: Grouped under 'Contenu', displays name/specialty/updatedAt columns
- Access: Public read, authenticated create/update, admin-only delete

**Team Collection** (`src/payload/collections/Team.ts`)
- Fields: name, slug (auto-generated), photo, jobTitle, bio, email, order
- Use case: PleinCap team members for "équipe" page
- Order field enables manual sorting (0 = first)
- Admin: Grouped under 'Contenu', displays name/role/updatedAt columns
- Access: Same pattern as Speakers

**Testimonials Collection** (`src/payload/collections/Testimonials.ts`)
- Fields: authorName, authorPhoto, content (textarea), rating (1-5), cruiseName, date, featured
- Use case: Customer testimonials for "livre d'or" page
- Featured checkbox to highlight testimonials on homepage
- Admin: Grouped under 'Contenu', displays authorName/rating/updatedAt columns
- Access: Same pattern as Speakers and Team

### Configuration Changes

**payload.config.ts**
- Imported and registered three new collections: Speakers, Team, Testimonials
- Collections array now: [Users, Media, Speakers, Team, Testimonials]
- No changes to existing configuration (editor, db, sharp, onInit)

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

1. **Slug generation strategy**: Used NFD normalization instead of simpler string replacement to handle all Unicode accents correctly, not just common French characters
2. **Admin grouping**: All content collections grouped under 'Contenu' to separate from 'Administration' (Users, Media)
3. **Access control pattern**: Maintained consistency with Phase 1 RBAC (public read for frontend, authenticated for CMS operations, admin-only delete)
4. **Field naming**: Used `jobTitle` instead of `role` for Team collection to avoid confusion with user roles

## Verification Results

✅ Build successful: `npm run build` completed without errors
✅ All collection files created and export `CollectionConfig`
✅ payload.config.ts imports and registers all three collections
✅ formatSlug hook exports correct type signature
✅ SEO plugin installed and visible in package.json

**Build output:** 21 routes compiled successfully, zero TypeScript errors in new code

## Known Issues / Tech Debt

None. All files compile cleanly and follow established patterns.

## What's Next

**Plan 02**: Cruises Collection
- Create main Cruises collection with itineraries and pricing
- Establish relationship patterns for destinations and speakers
- Add cruise-specific fields (duration, ship, dates, capacity)

**Plan 03**: Destinations & Categories
- Build Destinations collection (ports, cities, regions)
- Create Categories/Tags for cruise filtering
- Implement many-to-many relationships with Cruises

**Plan 04**: SEO Configuration
- Configure `@payloadcms/plugin-seo` in payload.config.ts
- Apply SEO metadata to all public collections
- Set up meta fields (title, description, og:image)

## Self-Check: PASSED

✅ File exists: src/payload/hooks/formatSlug.ts
✅ File exists: src/payload/collections/Speakers.ts
✅ File exists: src/payload/collections/Team.ts
✅ File exists: src/payload/collections/Testimonials.ts
✅ File modified: payload.config.ts
✅ Commit exists: dc2bfad (Task 1 - formatSlug hook and SEO plugin)
✅ Commit exists: bb4ef62 (Task 2 - Speakers, Team, Testimonials collections)

All claimed files and commits verified successfully.
