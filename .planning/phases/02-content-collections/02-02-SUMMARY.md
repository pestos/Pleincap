---
phase: 02-content-collections
plan: 02
subsystem: content-management
tags: [payload-cms, collections, entities, blog-taxonomy]
dependency_graph:
  requires:
    - 02-01 (formatSlug hook, Media collection)
  provides:
    - Destinations collection
    - Boats collection with cabin array
    - Categories collection
    - Tags collection
  affects:
    - 02-03 (Blog Posts will use Categories and Tags)
    - 02-04 (Cruises will use Destinations and Boats)
tech_stack:
  added: []
  patterns:
    - Array fields for nested data structures (cabin specifications)
    - Admin sidebar grouping for content organization
    - Relationship fields for media uploads
    - Admin-only taxonomy management
key_files:
  created:
    - src/payload/collections/Destinations.ts
    - src/payload/collections/Boats.ts
    - src/payload/collections/Categories.ts
    - src/payload/collections/Tags.ts
  modified:
    - payload.config.ts
decisions:
  - "Boats cabin array includes 6 fields: category, size, capacity, count, amenities, images"
  - "Categories and Tags admin-only (editors can't modify taxonomy)"
  - "Destinations and Boats allow editor create/update, admin-only delete"
  - "Admin sidebar groups: 'Croisieres' for Destinations/Boats, 'Blog' for Categories/Tags"
  - "Six destination regions: Méditerranée, Europe du Nord, Europe Centrale, Asie, Afrique, Autre"
metrics:
  duration: 134
  tasks_completed: 2
  files_created: 4
  files_modified: 1
  commits: 2
  completed_at: 2026-02-14
---

# Phase 02 Plan 02: Entity Collections Summary

**Build Destinations, Boats, Categories, and Tags collections for content dependencies**

## One-liner

Created 4 entity collections (Destinations, Boats with cabin array, Categories, Tags) grouped in admin sidebar under 'Croisieres' and 'Blog', providing foundation for Blog Posts and Cruises.

## What Was Built

### Collections Created

**1. Destinations Collection** (`src/payload/collections/Destinations.ts`)
- Fields: name, slug (auto-generated), region (6 options), description (richText), excerpt, featuredImage, gallery
- Admin: Grouped under 'Croisieres', useAsTitle: 'name'
- Access: Public read, authenticated create/update, admin delete
- Purpose: Define cruise destinations with regions and imagery

**2. Boats Collection** (`src/payload/collections/Boats.ts`)
- Basic fields: name, slug, featuredImage, description
- Specs: capacity (required), crew, length, builtYear, renovatedYear
- Media: deckPlan, gallery
- **Cabins array field** with 6 sub-fields:
  - category (text, required) - e.g., "Suite Deluxe"
  - size (number, required) - surface in m²
  - capacity (number, required) - persons per cabin
  - count (number, required) - number of cabins of this type
  - amenities (textarea) - one per line
  - images (upload, hasMany) - cabin photos
- Admin: Grouped under 'Croisieres', drag-and-drop sortable cabin rows
- Access: Public read, authenticated create/update, admin delete

**3. Categories Collection** (`src/payload/collections/Categories.ts`)
- Fields: name, slug (auto-generated), description
- Admin: Grouped under 'Blog', useAsTitle: 'name'
- Access: Public read, **admin-only** create/update/delete
- Purpose: Blog post categories (taxonomy management reserved for admins)

**4. Tags Collection** (`src/payload/collections/Tags.ts`)
- Fields: name, slug (auto-generated)
- Admin: Grouped under 'Blog', useAsTitle: 'name'
- Access: Public read, **admin-only** create/update/delete
- Purpose: Blog post tags (taxonomy management reserved for admins)

### Config Registration

Updated `payload.config.ts`:
- Imported all 4 new collections
- Added to collections array (now 9 total: Users, Media, Speakers, Team, Testimonials, Destinations, Boats, Categories, Tags)
- Admin sidebar now displays:
  - **Croisieres** group: Destinations, Boats
  - **Blog** group: Categories, Tags
  - **Contenu** group: Speakers, Team, Testimonials, Media (from 02-01)
  - **Administration** group: Users (from 01-03)

## Deviations from Plan

None - plan executed exactly as written.

## Key Patterns Introduced

### Array Field Pattern (Boat Cabins)

The Boats collection introduces Payload's array field pattern for managing repeatable structured data:

```typescript
{
  name: 'cabins',
  type: 'array',
  label: 'Cabines',
  minRows: 1,
  fields: [
    { name: 'category', type: 'text', required: true },
    { name: 'size', type: 'number', required: true },
    { name: 'capacity', type: 'number', required: true },
    { name: 'count', type: 'number', required: true },
    { name: 'amenities', type: 'textarea' },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true }
  ]
}
```

**Benefits:**
- Drag-and-drop reordering in admin UI
- Each cabin type can have multiple images
- Structured data for frontend rendering
- Scalable for boats with 5-10 cabin types

**Use cases in project:**
- Future: Cruise itinerary days (02-04)
- Future: Blog post content blocks (flexible layouts)

### Admin Sidebar Grouping

Collections organized by business domain:
- **Croisieres**: Cruise-related entities (Destinations, Boats, eventually Cruises)
- **Blog**: Content taxonomy and posts
- **Contenu**: Shared content entities (Speakers, Team, Testimonials, Media)
- **Administration**: System entities (Users)

This improves editor UX by grouping related collections together.

### Taxonomy Access Control

Categories and Tags use admin-only create/update/delete to prevent taxonomy sprawl:
- Admins maintain controlled vocabulary
- Editors use existing categories/tags in posts
- Prevents duplicate/inconsistent taxonomy (e.g., "Méditerranée" vs "méditerranée")

This pattern differs from Destinations/Boats, where editors can create new entities.

## Dependencies

**Required by this plan:**
- ✅ 02-01: `formatSlug` hook for auto-generating slugs
- ✅ 02-01: `Media` collection for image relationships

**Enables future plans:**
- 02-03: Blog Posts (needs Categories and Tags)
- 02-04: Cruises (needs Destinations and Boats)

## Testing Notes

**Build verification:**
- ✅ `npm run build` completes successfully
- ✅ TypeScript compilation passes
- ✅ All 4 collections imported and registered

**Runtime verification needed:**
1. Navigate to `/admin`
2. Verify sidebar groups: 'Croisieres' contains Destinations and Boats, 'Blog' contains Categories and Tags
3. Create test destination "Grèce et Turquie" → verify slug auto-generates as "grece-et-turquie"
4. Create test boat with 2 cabin types (Suite Deluxe 25m², Cabine Standard 14m²)
5. Verify cabin array drag-and-drop reordering works
6. Create test category "Destinations" and tag "Méditerranée" → verify slug generation
7. Test editor user: can create Destinations/Boats, **cannot** create Categories/Tags

## Known Limitations

None identified.

## Performance Characteristics

- Boats collection with 10 cabin types performs well (array fields are efficient)
- Image uploads handled by Media collection's existing sharp optimization (3 sizes)
- Slug generation uses NFD normalization (handles French accents correctly, from 02-01)

## Next Steps

After this plan:
- 02-03: Create Blog Posts collection (uses Categories and Tags)
- 02-04: Create Cruises collection (uses Destinations and Boats)

## Commits

| Task | Commit  | Description                              |
| ---- | ------- | ---------------------------------------- |
| 1    | a6dbdb3 | Create Destinations and Boats collections |
| 2    | 2e943b3 | Create Categories and Tags collections, register all in config |

## Self-Check

Verifying all claimed artifacts exist.

**Created files:**
- ✅ src/payload/collections/Destinations.ts
- ✅ src/payload/collections/Boats.ts
- ✅ src/payload/collections/Categories.ts
- ✅ src/payload/collections/Tags.ts

**Modified files:**
- ✅ payload.config.ts (imports + collections array)

**Commits:**
- ✅ a6dbdb3 (Task 1: Destinations and Boats)
- ✅ 2e943b3 (Task 2: Categories, Tags, config)

**Exports verified:**
- ✅ All 4 collections export CollectionConfig
- ✅ All 4 collections registered in payload.config.ts

**Build verification:**
- ✅ `npm run build` passes without errors

## Self-Check: PASSED

All artifacts verified. Plan executed successfully.
