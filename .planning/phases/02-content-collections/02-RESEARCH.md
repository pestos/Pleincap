# Phase 2: Content Collections - Research

**Researched:** 2026-02-14
**Domain:** Payload CMS 3.0 content modeling, collections, relationships, and editor features
**Confidence:** HIGH

## Summary

Phase 2 focuses on creating the complete content model for the PleinCap cruise site within Payload CMS 3.0. This involves designing 8 distinct collections (Cruises, Destinations, Boats, Speakers, Team, Blog Posts, Testimonials, Banners) with proper field types, relationships, and editor features. Payload 3.0 provides native support for all required features: relationship fields for linking collections, array/blocks fields for nested content like itineraries, built-in drafts and versioning for preview functionality, bulk operations API, and an official SEO plugin for meta tags.

The primary challenge is content modeling design - particularly for complex structures like cruise itineraries (day-by-day with images and highlights) and boat cabin specifications. Payload's array and blocks fields are purpose-built for this: arrays for repeating uniform structures (cabin rows, itinerary days), blocks for mixed content types (hero sections with different layouts). The SEO plugin (`@payloadcms/plugin-seo`) provides auto-generating meta fields with visual preview, while drafts/versions are enabled per-collection with a simple config flag.

**Primary recommendation:** Start with simple collections (Speakers, Team, Testimonials) to establish patterns, then build complex ones (Cruises with itineraries, Boats with cabins). Use the SEO plugin for all public-facing collections. Enable drafts on collections that need preview (Cruises, Blog, Banners). Implement slug auto-generation via field hooks. Group collections logically in admin sidebar ("Croisières", "Contenu", "Configuration"). Use relationship fields with `hasMany` for many-to-many links (Cruise ↔ Speakers).

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `payload` | 3.76.1 | CMS framework | Already installed in Phase 1, provides collections/fields/relationships |
| `@payloadcms/richtext-lexical` | 3.76.1 | Rich text editor | Already installed, needed for blog content and descriptions |
| `@payloadcms/plugin-seo` | 3.76.1+ | SEO meta fields | Official plugin, auto-generates meta.title/description/image with preview |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@payloadcms/plugin-nested-docs` | 3.76.1+ | Hierarchical categories | Optional for blog categories if nested taxonomy needed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| SEO plugin | Manual meta fields | Plugin adds auto-generation, preview, character counters - better UX |
| Array fields for itinerary | Separate ItineraryDays collection | Array keeps data co-located, simpler queries, better editor UX |
| Blocks for hero sections | Global hero config + JSON | Blocks provide type-safe editing UI, better than raw JSON |

**Installation:**
```bash
npm install @payloadcms/plugin-seo
# Optional if nested categories needed:
# npm install @payloadcms/plugin-nested-docs
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── payload/
│   ├── collections/
│   │   ├── Users.ts              # ✓ From Phase 1
│   │   ├── Media.ts              # ✓ From Phase 1
│   │   ├── Cruises.ts            # NEW - Complex with relationships
│   │   ├── Destinations.ts       # NEW - Geographic content
│   │   ├── Boats.ts              # NEW - Technical specs + cabins
│   │   ├── Speakers.ts           # NEW - Simple bio collection
│   │   ├── Team.ts               # NEW - Staff members
│   │   ├── Posts.ts              # NEW - Blog with categories/tags
│   │   ├── Categories.ts         # NEW - Blog taxonomy
│   │   ├── Tags.ts               # NEW - Blog taxonomy
│   │   ├── Testimonials.ts       # NEW - Customer reviews
│   │   └── Banners.ts            # NEW - Hero sections
│   ├── fields/
│   │   ├── slug.ts               # Reusable slug field config
│   │   └── seo.ts                # SEO field customizations (if needed)
│   └── hooks/
│       └── formatSlug.ts         # Auto-generate slugs from title
└── payload.config.ts             # Register all collections + plugins
```

### Pattern 1: Simple Collection (Team Members, Speakers)

**What:** Basic collection with text/image fields, no complex relationships
**When to use:** Staff bios, speaker profiles, testimonials

**Example:**
```typescript
// src/payload/collections/Speakers.ts
import type { CollectionConfig } from 'payload'

export const Speakers: CollectionConfig = {
  slug: 'speakers',
  admin: {
    useAsTitle: 'name',
    group: 'Contenu',
    defaultColumns: ['name', 'specialty', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom complet',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        description: 'URL-friendly identifier (auto-generated from name)',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo',
    },
    {
      name: 'specialty',
      type: 'text',
      required: true,
      label: 'Spécialité',
      admin: {
        placeholder: 'ex: Archéologie, Histoire, Biologie marine',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
      label: 'Biographie',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Site web',
      admin: {
        placeholder: 'https://...',
      },
    },
  ],
  access: {
    read: () => true, // Public
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
```

### Pattern 2: Collection with Relationships (Cruises)

**What:** Complex collection linking to multiple other collections
**When to use:** Main content types that aggregate multiple entities

**Example:**
```typescript
// src/payload/collections/Cruises.ts
import type { CollectionConfig } from 'payload'

export const Cruises: CollectionConfig = {
  slug: 'cruises',
  admin: {
    useAsTitle: 'title',
    group: 'Croisières',
    defaultColumns: ['title', 'destination', 'departureDate', '_status', 'updatedAt'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375, // Auto-save every 375ms (default)
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la croisière',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    // Relationship: Single selection
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
      label: 'Destination',
      hasMany: false,
    },
    // Relationship: Single selection
    {
      name: 'boat',
      type: 'relationship',
      relationTo: 'boats',
      required: true,
      label: 'Bateau',
      hasMany: false,
    },
    // Relationship: Multiple selections
    {
      name: 'speakers',
      type: 'relationship',
      relationTo: 'speakers',
      hasMany: true, // Multiple speakers per cruise
      label: 'Conférenciers',
    },
    {
      name: 'departureDate',
      type: 'date',
      required: true,
      label: 'Date de départ',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'returnDate',
      type: 'date',
      required: true,
      label: 'Date de retour',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Prix à partir de (€)',
      min: 0,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Description',
    },
    // Array field for itinerary days - see Pattern 3
    {
      name: 'itinerary',
      type: 'array',
      label: 'Itinéraire jour par jour',
      minRows: 1,
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
          label: 'Jour',
          admin: {
            description: 'Numéro du jour (1, 2, 3...)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre du jour',
          admin: {
            placeholder: 'ex: Arrivée à Athènes',
          },
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Programme du jour',
        },
        {
          name: 'highlights',
          type: 'textarea',
          label: 'Points forts',
          admin: {
            placeholder: 'Un point fort par ligne',
            rows: 4,
          },
        },
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          label: 'Photos du jour',
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
```

### Pattern 3: Array Field for Repeating Structures

**What:** Nested repeating data with consistent schema (cabins, itinerary days)
**When to use:** Data that belongs to parent document, not separate entities

**Key principles:**
- Arrays store data co-located with parent (easier queries)
- Each row has same field structure
- Sortable via drag-and-drop in admin UI
- Access via parent document (no separate API endpoint)

**Example - Boat Cabins:**
```typescript
{
  name: 'cabins',
  type: 'array',
  label: 'Cabines',
  minRows: 1,
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Catégorie',
      admin: {
        placeholder: 'ex: Suite Deluxe, Cabine Standard',
      },
    },
    {
      name: 'size',
      type: 'number',
      required: true,
      label: 'Surface (m²)',
    },
    {
      name: 'capacity',
      type: 'number',
      required: true,
      label: 'Capacité (personnes)',
      defaultValue: 2,
    },
    {
      name: 'amenities',
      type: 'textarea',
      label: 'Équipements',
      admin: {
        placeholder: 'Un équipement par ligne',
      },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Photos de la cabine',
    },
  ],
}
```

### Pattern 4: Blocks Field for Flexible Content

**What:** Array of objects where each can have different schema (hero sections, page builders)
**When to use:** Mixed content types in same area (different banner layouts)

**Example - Hero/Banner Sections:**
```typescript
// src/payload/collections/Banners.ts
export const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom interne',
      admin: {
        description: 'Pour identifier le banner dans le backoffice',
      },
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        { label: 'Page d\'accueil', value: 'home' },
        { label: 'Page Croisières', value: 'cruises' },
        { label: 'Page Destinations', value: 'destinations' },
      ],
      label: 'Emplacement',
    },
    {
      name: 'content',
      type: 'blocks',
      label: 'Contenu',
      minRows: 1,
      maxRows: 1, // Only one block per banner
      blocks: [
        {
          slug: 'imageHero',
          labels: {
            singular: 'Hero avec image',
            plural: 'Heroes avec image',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Image de fond',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titre',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Sous-titre',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'Texte du bouton',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'Lien du bouton',
            },
          ],
        },
        {
          slug: 'videoHero',
          labels: {
            singular: 'Hero avec vidéo',
            plural: 'Heroes avec vidéo',
          },
          fields: [
            {
              name: 'videoUrl',
              type: 'text',
              required: true,
              label: 'URL vidéo YouTube/Vimeo',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titre',
            },
            {
              name: 'overlay',
              type: 'checkbox',
              label: 'Afficher overlay sombre',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
}
```

### Pattern 5: Blog with Taxonomy (Categories + Tags)

**What:** Blog posts with relationships to categories and tags
**When to use:** Blog, news, or any categorized content

**Example - Categories Collection:**
```typescript
// src/payload/collections/Categories.ts
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Blog',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom de la catégorie',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
  ],
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}

// src/payload/collections/Posts.ts (excerpt)
fields: [
  // ... title, slug, content ...
  {
    name: 'categories',
    type: 'relationship',
    relationTo: 'categories',
    hasMany: true,
    label: 'Catégories',
  },
  {
    name: 'tags',
    type: 'relationship',
    relationTo: 'tags',
    hasMany: true,
    label: 'Tags',
  },
  {
    name: 'author',
    type: 'relationship',
    relationTo: 'users',
    required: true,
    label: 'Auteur',
    defaultValue: ({ user }) => user?.id, // Auto-set to current user
  },
]
```

### Pattern 6: Slug Auto-Generation Hook

**What:** Field hook that auto-generates URL-safe slugs from title
**When to use:** Any collection with public URLs (cruises, blog, destinations)

**Example:**
```typescript
// src/payload/hooks/formatSlug.ts
import type { FieldHook } from 'payload'

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (operation === 'create' || !value) {
      const fallbackData = data?.[fallback]
      if (fallbackData && typeof fallbackData === 'string') {
        return fallbackData
          .toLowerCase()
          .normalize('NFD') // Decompose accents
          .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
          .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
          .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      }
    }
    return value
  }

// Usage in collection:
{
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  hooks: {
    beforeValidate: [formatSlug('title')], // Generate from 'title' field
  },
}
```

### Pattern 7: Drafts and Preview

**What:** Enable draft saving and preview mode for content
**When to use:** Collections that need review before publishing (cruises, blog, banners)

**Example:**
```typescript
export const Cruises: CollectionConfig = {
  slug: 'cruises',
  versions: {
    drafts: {
      autosave: {
        interval: 375, // Auto-save drafts every 375ms (default)
      },
    },
    maxPerDoc: 50, // Keep last 50 versions
  },
  fields: [
    // ... all fields ...
  ],
  // _status field is auto-added: 'draft' | 'published'
}

// Query drafts via API:
// GET /api/cruises?where[_status][equals]=draft
// GET /api/cruises?where[_status][equals]=published
```

**Key behaviors:**
- Adds `_status` field automatically (`draft` | `published`)
- Adds version history to each document
- Admin UI shows "Save Draft" vs "Publish" buttons
- Auto-save prevents data loss during editing
- Preview mode can query drafts on frontend (see Payload Live Preview docs)

### Pattern 8: SEO Plugin Configuration

**What:** Add meta.title, meta.description, meta.image to collections
**When to use:** All public-facing collections (cruises, blog, destinations, boats)

**Example:**
```typescript
// payload.config.ts
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'

export default buildConfig({
  plugins: [
    seoPlugin({
      collections: ['cruises', 'posts', 'destinations', 'boats'],
      tabbedUI: true, // Put SEO fields in separate tab (cleaner UI)
      uploadsCollection: 'media', // Allow selecting media for og:image
      generateTitle: ({ doc }) => `${doc.title} | PleinCap Croisières`,
      generateDescription: ({ doc }) => doc.excerpt || doc.description?.substring(0, 160),
      generateURL: ({ doc, locale }) => `https://pleincap.com/${doc.slug}`,
    }),
  ],
  // ... rest of config
})

// This adds to each configured collection:
// - meta.title (auto-gen button)
// - meta.description (auto-gen button, character counter)
// - meta.image (upload relationship)
// - Search engine preview (real-time visual preview)
```

### Anti-Patterns to Avoid

**Anti-pattern 1: Over-normalizing with separate collections**
- **What:** Creating separate collection for every nested object (ItineraryDays collection instead of array)
- **Why it's bad:** Adds query complexity, breaks atomic updates, worse editor UX
- **Do instead:** Use array fields for data owned by parent document

**Anti-pattern 2: Storing structured data as JSON strings**
- **What:** Using text field with JSON.stringify() for complex data
- **Why it's bad:** No validation, no editor UI, no type safety, error-prone
- **Do instead:** Use array or blocks fields for structured data

**Anti-pattern 3: Circular relationships without safeguards**
- **What:** Cruise → Destination → Cruise without depth limits
- **Why it's bad:** Infinite recursion in queries, performance issues
- **Do instead:** Use `depth: 0` or `depth: 1` in queries, avoid bi-directional relationships

**Anti-pattern 4: Custom slug logic in collection hooks**
- **What:** Using beforeChange hook on collection to generate slugs
- **Why it's bad:** Triggers infinite loops if calling payload.update() in hook
- **Do instead:** Use field-level hooks (`beforeValidate` on slug field)

**Anti-pattern 5: Importing React components in collection files**
- **What:** `import MyComponent from '../components/MyComponent'` in collection config
- **Why it's bad:** Pulls client-side JSX into server config bundle, causes build errors
- **Do instead:** Keep collection configs pure TypeScript, use admin.components for custom UI

**Anti-pattern 6: Forgetting access control on new collections**
- **What:** Leaving default access (authenticated users can do everything)
- **Why it's bad:** Editors could delete critical content, no read protection for drafts
- **Do instead:** Explicitly set read/create/update/delete access per collection

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SEO meta fields | Custom title/description fields | `@payloadcms/plugin-seo` | Plugin adds auto-generation, preview, character counters, og:image |
| Slug generation | Manual slug input | Field hook with formatSlug | Auto-generates URL-safe slugs, handles accents, ensures uniqueness |
| Draft/publish workflow | Custom status field | `versions.drafts: true` | Built-in versioning, auto-save, publish UI, version history |
| Bulk operations | Custom admin scripts | Payload bulk API (built-in) | Admin UI has select-all + bulk edit/delete/publish since v3.0 |
| Nested categories | Recursive parent/children logic | `@payloadcms/plugin-nested-docs` | Handles breadcrumbs, tree structure, prevents circular refs |
| Rich text editing | Textarea with Markdown | Lexical richText field | WYSIWYG, extensible, image embeds, link handling |
| Image resizing | Manual sharp processing | Media collection `imageSizes` | Auto-generates thumbnails, responsive sizes on upload |
| Relationship queries | Manual JOIN logic | `depth` parameter in queries | Payload auto-populates relationships up to depth N |

**Key insight:** Payload has mature solutions for common CMS patterns. Custom implementations introduce bugs (slug collisions, infinite loops, race conditions). Use built-in features and official plugins - they're battle-tested and handle edge cases you'll discover months later.

## Common Pitfalls

### Pitfall 1: Infinite Loop in Hooks

**What goes wrong:** Calling `payload.update()` inside `beforeRead` or `afterRead` hook triggers infinite recursion

**Why it happens:** Read hooks trigger on every query. Update triggers another read. That read triggers the hook again.

**How to avoid:**
```typescript
// BAD - Infinite loop
hooks: {
  afterRead: [
    async ({ req, doc }) => {
      await req.payload.update({
        collection: 'cruises',
        id: doc.id,
        data: { views: doc.views + 1 },
      })
    },
  ],
}

// GOOD - Use context to prevent recursion
hooks: {
  afterRead: [
    async ({ req, doc, context }) => {
      if (!context.skipViewIncrement) {
        await req.payload.update({
          collection: 'cruises',
          id: doc.id,
          data: { views: doc.views + 1 },
          context: { skipViewIncrement: true }, // Prevent recursion
        })
      }
    },
  ],
}
```

**Warning signs:** Admin panel freezes, API timeouts, stack overflow errors

### Pitfall 2: Deep Relationship Queries Killing Performance

**What goes wrong:** Querying collections with `depth: 10` causes massive JOIN queries, slow responses

**Why it happens:** Each relationship depth level multiplies database queries exponentially

**How to avoid:**
- Use `depth: 0` (return IDs only) or `depth: 1` (populate one level) by default
- Only increase depth when you actually need nested data
- Fetch relationships separately if needed in frontend

```typescript
// BAD - Fetches entire relationship tree
const cruises = await payload.find({
  collection: 'cruises',
  depth: 10, // Fetches boat → cabins → images → ... recursively
})

// GOOD - Fetch only what you need
const cruises = await payload.find({
  collection: 'cruises',
  depth: 1, // Just populate boat/destination/speakers, no deeper
})
```

**Warning signs:** Slow API responses, database connection pool exhaustion, timeout errors

### Pitfall 3: Not Setting Unique Constraint on Slugs

**What goes wrong:** Two documents end up with same slug, causing frontend routing conflicts

**Why it happens:** `unique: true` is a validation check, but race conditions can bypass it

**How to avoid:**
```typescript
// GOOD - Unique + index for database-level constraint
{
  name: 'slug',
  type: 'text',
  unique: true, // Payload validation
  index: true,  // Database index + unique constraint
}
```

Also add proper error handling:
```typescript
try {
  await payload.create({ collection: 'cruises', data: { slug: 'greece-2024' } })
} catch (error) {
  if (error.message.includes('unique')) {
    // Handle duplicate slug - maybe append number suffix
  }
}
```

**Warning signs:** Duplicate slug errors in production, 404s for valid content

### Pitfall 4: Forgetting to Enable Autosave

**What goes wrong:** Editors lose hours of work when browser crashes or tab closes accidentally

**Why it happens:** Drafts are enabled but autosave interval not configured

**How to avoid:**
```typescript
// BAD - Drafts without autosave
versions: {
  drafts: true, // Autosave disabled!
}

// GOOD - Drafts with autosave
versions: {
  drafts: {
    autosave: {
      interval: 375, // Save every 375ms (default, recommended)
    },
  },
}
```

**Warning signs:** Editor complaints about lost work, no "Saving..." indicator in admin UI

### Pitfall 5: Using hasMany Without Considering Order

**What goes wrong:** Speakers appear in random order on cruise detail page

**Why it happens:** `hasMany: true` relationships don't preserve order by default

**How to avoid:**
```typescript
// OKAY - Order not important
{
  name: 'speakers',
  type: 'relationship',
  relationTo: 'speakers',
  hasMany: true, // Order undefined
}

// BETTER - Order matters, make it explicit
{
  name: 'speakers',
  type: 'relationship',
  relationTo: 'speakers',
  hasMany: true,
  // Payload preserves insertion order in array
  // Drag-and-drop in admin UI to reorder
}

// Note: If order is critical (e.g., itinerary days), use array field instead
```

**Warning signs:** Content appears in wrong order, editors can't control display sequence

### Pitfall 6: SEO Plugin Installed But Not Configured Per Collection

**What goes wrong:** SEO fields don't appear on new collections

**Why it happens:** SEO plugin requires explicit `collections: [...]` array in config

**How to avoid:**
```typescript
// BAD - Plugin installed but no collections configured
plugins: [
  seoPlugin({}), // Won't add fields to any collection!
]

// GOOD - Explicitly list collections
plugins: [
  seoPlugin({
    collections: ['cruises', 'posts', 'destinations', 'boats'],
    tabbedUI: true,
  }),
]
```

**Warning signs:** Meta fields missing on new collections, editors asking where SEO settings are

### Pitfall 7: Not Grouping Collections in Admin Sidebar

**What goes wrong:** Admin sidebar has 15 ungrouped collections, hard to navigate

**Why it happens:** Forgetting to set `admin.group` in collection configs

**How to avoid:**
```typescript
// Collection organization:
admin: {
  group: 'Croisières',    // Cruises, Destinations, Boats
  group: 'Blog',          // Posts, Categories, Tags
  group: 'Contenu',       // Speakers, Team, Testimonials, Media
  group: 'Configuration', // Banners
  group: 'Administration', // Users
}
```

**Warning signs:** Messy admin sidebar, editors asking "where do I find...?"

## Code Examples

Verified patterns from official sources and production experience:

### Bulk Operations Usage

```typescript
// Bulk update prices (admin UI handles this, but here's Local API)
await payload.update({
  collection: 'cruises',
  where: {
    departureDate: {
      greater_than: '2024-06-01',
    },
  },
  data: {
    price: ({ siblingData }) => siblingData.price * 1.05, // 5% increase
  },
})

// Bulk publish drafts (Local API)
await payload.update({
  collection: 'cruises',
  where: {
    _status: {
      equals: 'draft',
    },
  },
  data: {
    _status: 'published',
  },
})

// Bulk delete (admin UI provides select-all + delete button)
await payload.delete({
  collection: 'cruises',
  where: {
    departureDate: {
      less_than: '2020-01-01',
    },
  },
})
```

Source: [Payload Launch Week Day 3 - Bulk Operations](https://payloadcms.com/posts/blog/launch-week-day-3-bulk-operations)

### Querying Relationships

```typescript
// Fetch cruises with populated boat and speakers (depth: 1)
const cruises = await payload.find({
  collection: 'cruises',
  depth: 1, // Populate one level
  where: {
    _status: {
      equals: 'published',
    },
  },
  sort: '-departureDate',
})

// cruises.docs[0].boat is now full object, not just ID
// cruises.docs[0].speakers is array of full objects

// Frontend - depth 0 for list view (faster)
const cruiseList = await payload.find({
  collection: 'cruises',
  depth: 0, // IDs only, populate manually if needed
  select: {
    title: true,
    slug: true,
    price: true,
    departureDate: true,
  },
})
```

### Rich Text Rendering (Lexical)

```typescript
// Collection field config
{
  name: 'content',
  type: 'richText',
  required: true,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Add custom features if needed
    ],
  }),
}

// Frontend rendering (Next.js)
import { RenderNode } from '@payloadcms/richtext-lexical/react'

export function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div className="prose">
        <RenderNode node={post.content} />
      </div>
    </article>
  )
}
```

Source: [Payload Lexical Rich Text Documentation](https://payloadcms.com/docs/rich-text/overview)

### Complete Cruise Collection Example

```typescript
// src/payload/collections/Cruises.ts
import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Cruises: CollectionConfig = {
  slug: 'cruises',
  admin: {
    useAsTitle: 'title',
    group: 'Croisières',
    defaultColumns: ['title', 'destination', 'departureDate', '_status', 'updatedAt'],
    description: 'Gestion des croisières avec itinéraires et relations',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenu',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titre de la croisière',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              label: 'Slug URL',
              hooks: {
                beforeValidate: [formatSlug('title')],
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: 'Résumé court',
              admin: {
                description: 'Utilisé pour les vignettes et le SEO',
              },
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Description complète',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Image mise en avant',
            },
          ],
        },
        {
          label: 'Détails',
          fields: [
            {
              name: 'destination',
              type: 'relationship',
              relationTo: 'destinations',
              required: true,
              label: 'Destination',
            },
            {
              name: 'boat',
              type: 'relationship',
              relationTo: 'boats',
              required: true,
              label: 'Bateau',
            },
            {
              name: 'speakers',
              type: 'relationship',
              relationTo: 'speakers',
              hasMany: true,
              label: 'Conférenciers',
              admin: {
                description: 'Glisser-déposer pour réorganiser',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'departureDate',
                  type: 'date',
                  required: true,
                  label: 'Date de départ',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    width: '50%',
                  },
                },
                {
                  name: 'returnDate',
                  type: 'date',
                  required: true,
                  label: 'Date de retour',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Prix à partir de (€)',
                  min: 0,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'availableSpots',
                  type: 'number',
                  required: true,
                  label: 'Places disponibles',
                  min: 0,
                  defaultValue: 0,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Itinéraire',
          fields: [
            {
              name: 'itinerary',
              type: 'array',
              label: 'Jours',
              minRows: 1,
              admin: {
                description: 'Programme jour par jour de la croisière',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'day',
                      type: 'number',
                      required: true,
                      label: 'Jour',
                      admin: {
                        width: '20%',
                      },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      label: 'Titre',
                      admin: {
                        width: '80%',
                        placeholder: 'ex: Athènes - Embarquement',
                      },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'richText',
                  required: true,
                  label: 'Programme',
                },
                {
                  name: 'highlights',
                  type: 'textarea',
                  label: 'Points forts',
                  admin: {
                    description: 'Un point fort par ligne (optionnel)',
                    rows: 3,
                  },
                },
                {
                  name: 'images',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                  label: 'Photos du jour',
                },
              ],
            },
          ],
        },
        // SEO tab auto-added by plugin
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      // Public can see published, authenticated can see all
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Slate rich text editor | Lexical editor | Payload 3.0 (2024) | Slate deprecated, Lexical is modern standard with better extensibility |
| Manual meta fields | SEO plugin | Stable in 3.0 | Auto-generation, preview, better UX for editors |
| Custom versioning logic | Built-in `versions.drafts` | Native in Payload 2.0+ | Draft/publish workflow is first-class feature |
| Custom admin scripts for bulk ops | Admin UI bulk operations | Payload 3.0 | Select-all, bulk edit/delete/publish in UI |
| Deep clone collections in plugins | Spread and extend only needed parts | Best practice 2025+ | Prevents function stripping from JSON.stringify |
| Nested docs via manual parent field | `@payloadcms/plugin-nested-docs` | Plugin official 2024 | Auto-breadcrumbs, prevents circular refs |
| MongoDB only | PostgreSQL + MongoDB + SQLite | Payload 3.0 | PostgreSQL primary via Drizzle, best for relational data |

**Deprecated/outdated:**
- **Slate editor**: Removed in Payload 4.0, use Lexical
- **importMap.baseDir not set**: Causes RSC errors in Next.js 15, required as of Payload 3.75+
- **Direct mongoose access**: Bypasses Payload hooks/validation, use Local API instead
- **JSX in collection configs**: Payload 3.0+ separates config and JSX layers, causes build errors

## Open Questions

1. **Nested blog categories vs flat structure**
   - What we know: `@payloadcms/plugin-nested-docs` supports hierarchical categories
   - What's unclear: Does PleinCap blog need nested categories (e.g., "Destinations > Méditerranée > Grèce")?
   - Recommendation: Start with flat categories, add nested-docs plugin later if needed (non-breaking change)

2. **Live Preview integration**
   - What we know: Payload 3.0 has stable Live Preview with Server Components support
   - What's unclear: Does editor need real-time preview, or is saving draft + viewing frontend sufficient?
   - Recommendation: Enable drafts first (simple), implement Live Preview in Phase 3 if requested (requires frontend integration)

3. **Testimonial moderation workflow**
   - What we know: Testimonials collection needs create/edit/delete capability
   - What's unclear: Should testimonials auto-publish or require admin approval?
   - Recommendation: Use drafts + admin-only publish access if moderation needed, otherwise allow editors to publish directly

4. **Boat cabin pricing integration**
   - What we know: Boats have cabin array field with specs (size, capacity, amenities)
   - What's unclear: Are cabin prices stored per cabin type, per cruise, or calculated externally?
   - Recommendation: Add optional `basePrice` field to cabin array, let cruise prices override if needed (flexible approach)

## Sources

### Primary (HIGH confidence)
- [Payload CMS Collection Configs Documentation](https://payloadcms.com/docs/configuration/collections) - Collection structure, field types, access control
- [Payload CMS Fields Overview](https://payloadcms.com/docs/fields/overview) - All field types with configuration options
- [Payload CMS Relationship Field](https://payloadcms.com/docs/fields/relationship) - Relationship field configuration, hasMany, relationTo
- [Payload CMS Array Field](https://payloadcms.com/docs/fields/array) - Array field for repeating structures
- [Payload CMS Blocks Field](https://payloadcms.com/docs/fields/blocks) - Blocks field for flexible content
- [Payload CMS Drafts Documentation](https://payloadcms.com/docs/versions/drafts) - Draft/publish workflow, autosave
- [Payload CMS SEO Plugin](https://payloadcms.com/docs/plugins/seo) - Official SEO plugin configuration
- [Payload Launch Week Day 3 - Bulk Operations](https://payloadcms.com/posts/blog/launch-week-day-3-bulk-operations) - Bulk edit/delete/publish features
- [@payloadcms/plugin-seo on npm](https://www.npmjs.com/package/@payloadcms/plugin-seo) - SEO plugin installation and version compatibility

### Secondary (MEDIUM confidence)
- [How to Install SEO Plugin Guide](https://payloadcms.com/posts/guides/how-to-install-and-configure-the-payload-seo-plugin-nextjs-app) - Step-by-step SEO plugin setup
- [Managing Array and Block Rows](https://payloadcms.com/posts/blog/managing-array-and-block-rows) - Array/blocks UI improvements
- [Payload Nested Docs Plugin](https://payloadcms.com/docs/plugins/nested-docs) - Hierarchical document structure
- [PayloadCMS Tips and Tricks by dFlow](https://dflow.sh/blog/payloadcms-tips-and-tricks) - Production pitfalls (hook loops, plugin cloning, JSX separation)
- [Payload CMS Collection Hooks](https://payloadcms.com/docs/hooks/collections) - Lifecycle hooks, context usage
- [Build Your Own RBAC in Payload](https://payloadcms.com/posts/blog/build-your-own-rbac) - Access control patterns
- [How to Implement Slugs and SKUs](https://www.buildwithmatija.com/blog/payload-cms-slugs-and-skus) - Slug generation best practices, uniqueness handling
- [Payload CMS Collection Structure Best Practices](https://www.buildwithmatija.com/blog/payload-cms-collection-structure-best-practices) - Long-term maintainability patterns

### Tertiary (LOW confidence - requires validation)
- WebSearch results on headless CMS content modeling (general patterns, not Payload-specific)
- Community discussions on blog taxonomy and testimonial patterns

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** - All libraries verified in official docs and package.json, versions match project
- Architecture: **HIGH** - Patterns from official docs, verified in Payload 3.0+ examples
- Pitfalls: **HIGH** - Based on official guides, production blog posts, and community documented issues
- SEO/Drafts/Bulk Ops: **HIGH** - Native Payload features with official documentation
- Content modeling specifics: **MEDIUM-HIGH** - General patterns solid, cruise-specific modeling based on requirements interpretation

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (30 days - Payload 3.x is stable, slow-moving for core features)
