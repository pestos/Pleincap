# Phase 3: Migration & SEO - Research

**Researched:** 2026-02-14
**Domain:** Content migration, CMS data fetching, Next.js SEO optimization
**Confidence:** HIGH

## Summary

Phase 3 focuses on migrating all hardcoded content from frontend components to Payload CMS database while preserving existing URLs and SEO rankings. This involves three core activities: (1) extracting and validating existing content from TypeScript files and hardcoded arrays, (2) replacing static content with Payload Local API queries in Next.js Server Components, and (3) implementing dynamic sitemap generation and SEO metadata.

The research reveals that Payload 3.0's native Next.js integration with Local API provides optimal performance for Server Components, eliminating the need for REST API calls. Next.js 16 offers built-in metadata generation and sitemap support, making SEO preservation straightforward. The critical success factor is maintaining identical URL patterns during migration to avoid 404s and ranking loss.

**Primary recommendation:** Migrate content incrementionally (one collection at a time) using seed scripts with validation, replace frontend arrays with Payload Local API queries, implement generateMetadata for SEO, and generate dynamic sitemaps before removing hardcoded content.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Payload CMS Local API | 3.76.1 | Server-side data fetching | Native Next.js integration, no HTTP overhead, type-safe queries |
| Next.js App Router | 16.2.0 | Routing and data fetching | Built-in metadata API, sitemap generation, Server Components |
| TypeScript | 5.x | Type safety | End-to-end type safety from CMS schema to frontend |
| Payload SEO Plugin | 3.76.1 | SEO metadata management | Official plugin with Next.js generateMetadata integration |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-seo | 6.x | JSON-LD structured data | When needing advanced schema.org markup beyond metadata |
| csv-parse | Latest | CSV parsing for migration | Importing existing content from spreadsheets |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Local API | REST API | Local API is faster (no HTTP), type-safe, and recommended for Server Components |
| Built-in metadata | next-seo package | Built-in is simpler; next-seo adds JSON-LD helpers but increases bundle size |
| Seed scripts | Manual data entry | Scripts ensure consistency and validation; manual entry error-prone at scale |

**Installation:**
```bash
# Already installed in package.json
# Optional for advanced structured data:
npm install next-seo
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/(frontend)/
│   ├── [slug]/                  # Dynamic cruise pages
│   │   ├── page.tsx             # Server Component with Local API
│   │   └── generateMetadata.ts  # SEO metadata
│   ├── blog/[slug]/             # Dynamic blog posts
│   ├── destinations/[slug]/     # Dynamic destinations
│   └── sitemap.ts               # Dynamic sitemap generation
├── lib/
│   └── payload-queries.ts       # Reusable query functions
└── scripts/
    └── seed/                    # Migration scripts
        ├── cruises.ts
        ├── destinations.ts
        └── validate.ts
```

### Pattern 1: Payload Local API Query in Server Component
**What:** Fetch data server-side using Payload's Local API with full type safety
**When to use:** All data fetching in Server Components (replaces hardcoded arrays)
**Example:**
```typescript
// Source: Payload CMS Local API documentation
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function CruisePage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })

  const { docs: cruises } = await payload.find({
    collection: 'cruises',
    where: {
      slug: { equals: params.slug },
      _status: { equals: 'published' }
    },
    depth: 2, // Populate relationships (boat, destination, speakers)
  })

  const cruise = cruises[0]
  if (!cruise) notFound()

  return <CruiseDetail cruise={cruise} />
}
```

### Pattern 2: Dynamic Metadata Generation
**What:** Generate SEO metadata dynamically from CMS data
**When to use:** All dynamic pages with CMS content
**Example:**
```typescript
// Source: Next.js generateMetadata + Payload SEO plugin integration
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const payload = await getPayload({ config })
  const cruise = await payload.findByID({
    collection: 'cruises',
    id: params.id,
  })

  return {
    title: cruise.meta?.title || cruise.title,
    description: cruise.meta?.description || cruise.excerpt,
    openGraph: {
      images: [cruise.meta?.image?.url || cruise.featuredImage.url],
    },
  }
}
```

### Pattern 3: Dynamic Sitemap Generation
**What:** Generate sitemap.xml from all published CMS documents
**When to use:** Required for SEO; regenerate after content updates
**Example:**
```typescript
// Source: Next.js sitemap.xml documentation
// app/sitemap.ts
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap() {
  const payload = await getPayload({ config })

  const { docs: cruises } = await payload.find({
    collection: 'cruises',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    pagination: false,
  })

  return cruises.map(cruise => ({
    url: `https://plein-cap.com/catalogue/${cruise.slug}`,
    lastModified: new Date(cruise.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
}
```

### Pattern 4: URL Mapping Verification
**What:** Map existing URLs to new CMS-driven URLs before migration
**When to use:** Before replacing any hardcoded content
**Example:**
```typescript
// scripts/verify-urls.ts
const URL_MAPPINGS = [
  { old: '/catalogue/danube-imperial', new: '/catalogue/danube-imperial', collection: 'cruises', slug: 'danube-imperial' },
  { old: '/destinations', new: '/destinations', collection: 'destinations', slug: 'destinations' },
  // ... all existing URLs
]

async function verifyUrlPreservation() {
  for (const mapping of URL_MAPPINGS) {
    const doc = await payload.find({
      collection: mapping.collection,
      where: { slug: { equals: mapping.slug } }
    })

    if (!doc.docs.length) {
      console.error(`❌ Missing: ${mapping.old} -> No document with slug '${mapping.slug}'`)
    } else {
      console.log(`✅ Preserved: ${mapping.old}`)
    }
  }
}
```

### Pattern 5: Incremental Migration with Validation
**What:** Migrate one collection at a time with data validation checks
**When to use:** All content migration to prevent data loss
**Example:**
```typescript
// scripts/seed/cruises.ts
import { getPayload } from 'payload'
import { HARDCODED_CRUISES } from '@/data/cruises' // old data

async function migrateCruises() {
  const payload = await getPayload({ config })

  for (const cruise of HARDCODED_CRUISES) {
    // Validate required fields
    if (!cruise.title || !cruise.slug || !cruise.price) {
      throw new Error(`Invalid cruise data: ${JSON.stringify(cruise)}`)
    }

    // Check for duplicates
    const existing = await payload.find({
      collection: 'cruises',
      where: { slug: { equals: cruise.slug } }
    })

    if (existing.docs.length > 0) {
      console.log(`⚠️  Skipping duplicate: ${cruise.slug}`)
      continue
    }

    // Create with validation
    const created = await payload.create({
      collection: 'cruises',
      data: {
        title: cruise.title,
        slug: cruise.slug,
        excerpt: cruise.description,
        price: cruise.price,
        // ... map all fields
        _status: 'published',
      }
    })

    console.log(`✅ Migrated: ${created.title}`)
  }
}
```

### Anti-Patterns to Avoid
- **Using REST API in Server Components:** Adds HTTP overhead and bypasses type safety. Use Local API instead.
- **Removing hardcoded content before migration:** Always migrate first, verify URLs work, then remove old code.
- **Changing URL patterns during migration:** Preserves SEO by keeping identical paths (e.g., `/catalogue/danube-imperial` stays exactly the same).
- **Missing metadata on dynamic pages:** Every dynamic page needs generateMetadata to avoid SEO regression.
- **Migrating without URL mapping spreadsheet:** Creates risk of 404s and broken links. Document all URLs first.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML builder | Next.js `sitemap.ts` | Handles format, headers, limits (50k URLs), and caching automatically |
| Data migration | Manual database inserts | Payload Local API with validation | Ensures schema validation, hooks fire, relationships resolve correctly |
| SEO metadata | Custom meta tag insertion | Next.js generateMetadata | Type-safe, cacheable, supports all OpenGraph/Twitter formats |
| Slug generation | String replace logic | Payload formatSlug hook (already exists) | Handles accents, Unicode, edge cases consistently |
| URL redirects | Manual redirect map | Next.js `next.config.js redirects` or `middleware.ts` | Handles 301s efficiently with proper status codes |

**Key insight:** Payload's Local API and Next.js built-in features handle 90% of migration and SEO needs. Custom code introduces bugs in data validation, URL formatting, and metadata generation. Use framework primitives.

## Common Pitfalls

### Pitfall 1: Breaking URLs During Migration
**What goes wrong:** Changing slug format or URL structure causes all existing links (Google, bookmarks, external sites) to 404.
**Why it happens:** Developer changes `/catalogue/danube-imperial` to `/cruises/danube-imperial` thinking it's "cleaner."
**How to avoid:** Create URL mapping spreadsheet BEFORE migration. Run verification script. Keep URLs identical.
**Warning signs:** Any change to path segments, new route groups, or slug format changes.

### Pitfall 2: Losing SEO Metadata on Dynamic Pages
**What goes wrong:** Pages render but have generic titles like "PleinCap" instead of cruise-specific metadata.
**Why it happens:** Forgetting to implement generateMetadata when replacing static pages with dynamic ones.
**How to avoid:** Every `[slug]/page.tsx` needs companion `generateMetadata` function. Test with View Source.
**Warning signs:** Missing title/description in browser tab, no OpenGraph images in social shares.

### Pitfall 3: Incomplete Data Migration
**What goes wrong:** Some cruises missing itinerary days, boats missing cabin details, broken image references.
**Why it happens:** Hardcoded data has inconsistent structure; migration script doesn't validate before insert.
**How to avoid:** Validate all required fields in seed script. Use TypeScript types. Check relationship IDs exist.
**Warning signs:** Console errors about null values, missing images, empty arrays where data expected.

### Pitfall 4: Race Conditions with Relationships
**What goes wrong:** Cruises reference boats/destinations that don't exist yet in database.
**Why it happens:** Migrating collections in wrong order or not waiting for relationship documents to be created.
**How to avoid:** Migrate in dependency order: Media → Boats → Destinations → Speakers → Cruises. Use async/await properly.
**Warning signs:** Relationship fields show "undefined" or empty, foreign key errors, orphaned references.

### Pitfall 5: Missing Sitemap Updates
**What goes wrong:** New content added to CMS but doesn't appear in Google Search Console or sitemap.xml.
**Why it happens:** Using static sitemap or forgetting to implement dynamic sitemap generation.
**How to avoid:** Use dynamic `sitemap.ts` that queries Payload at runtime. Enable ISR revalidation.
**Warning signs:** Sitemap has fixed number of URLs, new published content not discoverable by Google.

### Pitfall 6: Performance Degradation from N+1 Queries
**What goes wrong:** Loading list of cruises becomes slow because each cruise triggers separate query for boat/destination.
**Why it happens:** Not using `depth` parameter in Payload queries to populate relationships.
**How to avoid:** Set `depth: 2` in queries to auto-populate relationships. Use `select` to limit fields.
**Warning signs:** Slow page loads, database query count scales with results, waterfall in React DevTools.

## Code Examples

Verified patterns from official sources:

### Querying with Filters and Relationships
```typescript
// Source: Payload CMS Querying Documentation
const payload = await getPayload({ config })

// Find all published cruises for a specific destination
const { docs: cruises, totalDocs } = await payload.find({
  collection: 'cruises',
  where: {
    _status: { equals: 'published' },
    destination: { equals: destinationId }, // Relationship filter
    departureDate: { greater_than: new Date().toISOString() }, // Future only
  },
  depth: 2, // Populate boat and destination objects
  limit: 10,
  page: 1,
  sort: 'departureDate',
})
```

### Pagination for Large Lists
```typescript
// Source: Payload CMS Pagination Documentation
// Disable pagination for known-small collections
const { docs: speakers } = await payload.find({
  collection: 'speakers',
  pagination: false, // Returns all, no totalDocs/page
})

// Server-side pagination for blog
const { docs: posts, totalPages, page } = await payload.find({
  collection: 'posts',
  where: { _status: { equals: 'published' } },
  limit: 12,
  page: parseInt(searchParams.page) || 1,
  sort: '-publishedDate',
})
```

### Using Select to Optimize Queries
```typescript
// Source: Payload CMS Select API Documentation
// Only fetch fields needed for cards (improves performance)
const { docs: cruises } = await payload.find({
  collection: 'cruises',
  select: {
    title: true,
    slug: true,
    excerpt: true,
    featuredImage: true,
    price: true,
  },
  where: { _status: { equals: 'published' } },
})
```

### Dynamic Routes with generateStaticParams
```typescript
// Source: Next.js generateStaticParams Documentation
// app/catalogue/[slug]/page.tsx
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs: cruises } = await payload.find({
    collection: 'cruises',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    pagination: false,
  })

  return cruises.map(cruise => ({
    slug: cruise.slug,
  }))
}

// Enable ISR revalidation
export const revalidate = 3600 // Revalidate every hour
```

### Robots.txt Configuration
```typescript
// Source: Next.js robots.txt Documentation
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://plein-cap.com/sitemap.xml',
  }
}
```

### Complete Migration Script with Validation
```typescript
// scripts/seed/migrate-cruises.ts
import { getPayload } from 'payload'
import config from '@/payload.config'

interface MigrationStats {
  total: number
  created: number
  skipped: number
  errors: string[]
}

async function migrateCruises(): Promise<MigrationStats> {
  const payload = await getPayload({ config })
  const stats: MigrationStats = { total: 0, created: 0, skipped: 0, errors: [] }

  // Load hardcoded data
  const CRUISES = [
    {
      title: 'Le Danube Impérial',
      slug: 'danube-imperial',
      excerpt: 'Naviguez au cœur de l\'histoire européenne...',
      price: 2450,
      departureDate: '2026-05-15',
      returnDate: '2026-05-22',
      boatSlug: 'amadeus-diamond',
      destinationSlug: 'danube',
      // ... more fields
    },
    // ... more cruises
  ]

  for (const cruise of CRUISES) {
    stats.total++

    try {
      // Validate required fields
      if (!cruise.title || !cruise.slug) {
        stats.errors.push(`Missing required fields: ${cruise.slug || 'unknown'}`)
        continue
      }

      // Check for existing
      const existing = await payload.find({
        collection: 'cruises',
        where: { slug: { equals: cruise.slug } },
      })

      if (existing.docs.length > 0) {
        console.log(`⚠️  Skipping duplicate: ${cruise.slug}`)
        stats.skipped++
        continue
      }

      // Resolve relationship IDs
      const boat = await payload.find({
        collection: 'boats',
        where: { slug: { equals: cruise.boatSlug } },
      })

      const destination = await payload.find({
        collection: 'destinations',
        where: { slug: { equals: cruise.destinationSlug } },
      })

      if (!boat.docs[0] || !destination.docs[0]) {
        stats.errors.push(`Missing relationships for ${cruise.slug}`)
        continue
      }

      // Create document
      await payload.create({
        collection: 'cruises',
        data: {
          title: cruise.title,
          slug: cruise.slug,
          excerpt: cruise.excerpt,
          price: cruise.price,
          departureDate: cruise.departureDate,
          returnDate: cruise.returnDate,
          boat: boat.docs[0].id,
          destination: destination.docs[0].id,
          _status: 'published',
        },
      })

      console.log(`✅ Created: ${cruise.title}`)
      stats.created++

    } catch (error) {
      stats.errors.push(`Error migrating ${cruise.slug}: ${error.message}`)
    }
  }

  return stats
}

// Run migration
migrateCruises().then(stats => {
  console.log('\n📊 Migration Summary:')
  console.log(`Total: ${stats.total}`)
  console.log(`Created: ${stats.created}`)
  console.log(`Skipped: ${stats.skipped}`)
  console.log(`Errors: ${stats.errors.length}`)
  if (stats.errors.length > 0) {
    console.error('\n❌ Errors:')
    stats.errors.forEach(err => console.error(`  - ${err}`))
  }
})
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| REST API in Server Components | Payload Local API | Payload 3.0 (2024) | No HTTP overhead, type-safe, 10x faster |
| pages/ directory with getStaticProps | app/ directory with Server Components | Next.js 13+ (2023) | Simpler data fetching, automatic deduplication |
| Manual meta tags in Head | generateMetadata function | Next.js 13+ (2023) | Type-safe, cacheable, better DX |
| Static sitemap.xml file | Dynamic sitemap.ts | Next.js 13.3+ (2023) | Auto-updates with CMS content |
| next-seo package for metadata | Built-in Metadata API | Next.js 13+ (2023) | Reduced dependencies, native support |

**Deprecated/outdated:**
- `getStaticProps`/`getServerSideProps`: Replaced by async Server Components in app/ directory
- Manually constructing meta tags: Use generateMetadata instead
- REST API calls from Server Components: Use Local API for performance
- Static sitemaps: Use dynamic generation from CMS data

## Open Questions

1. **How should we handle images during migration?**
   - What we know: Media collection exists, can upload via UI or API
   - What's unclear: Whether to migrate existing URLs as-is or upload to Payload media library
   - Recommendation: Keep external URLs initially (faster migration), then migrate images to Payload Media collection in separate task to maintain control and optimization

2. **Should we implement 301 redirects for any changed URLs?**
   - What we know: URLs should remain identical, but some edge cases may exist
   - What's unclear: Whether any legacy URLs (before current site) need redirecting
   - Recommendation: Audit Google Analytics for all incoming URLs; create redirect map in middleware.ts for any legacy patterns

3. **How to handle blog posts without existing content?**
   - What we know: Blog structure exists in CMS but no live blog posts currently
   - What's unclear: Whether to seed with placeholder content or leave empty
   - Recommendation: Leave empty; let content team create posts naturally after launch

4. **What's the revalidation strategy for ISR?**
   - What we know: ISR supported via `revalidate` export
   - What's unclear: Optimal revalidation interval for cruise listings vs. detail pages
   - Recommendation: Listings: 1 hour, Detail pages: 4 hours, Blog: 24 hours, Static pages: 7 days

## Sources

### Primary (HIGH confidence)
- [Payload CMS Local API Documentation](https://payloadcms.com/docs/local-api/overview) - Local API usage in Server Components
- [Next.js generateStaticParams Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Dynamic route generation
- [Next.js Metadata API Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - SEO metadata generation
- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - Dynamic sitemap generation
- [Payload CMS Querying Documentation](https://payloadcms.com/docs/queries/overview) - Query syntax and filtering
- [Next.js ISR Guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration) - Revalidation strategies
- [Payload CMS SEO Plugin Documentation](https://payloadcms.com/docs/plugins/seo) - SEO plugin configuration

### Secondary (MEDIUM confidence)
- [Payload CMS + Next.js Integration Guide](https://payloadcms.com/posts/blog/the-ultimate-guide-to-using-nextjs-with-payload) - Integration patterns
- [SEO Migration Strategy 2026](https://www.influize.com/blog/seo-migration-strategy) - URL preservation best practices
- [CMS Migration Checklist 2026](https://www.flow.ninja/blog/cms-migration-guide) - Data validation strategies
- [Shopify SEO Migration Guide](https://www.shopify.com/blog/shopify-seo-migration) - URL mapping techniques
- [Payload CMS Seed Data with CSV](https://www.buildwithmatija.com/blog/seed-payload-cms-csv-files) - Migration script patterns
- [Next.js Robots.txt Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - Crawling configuration
- [Server-Side Pagination in Payload CMS](https://trendycoder.com/blog/server-side-pagination-easy-payload-cms) - Pagination implementation

### Tertiary (LOW confidence)
- [Complete Data Migration Checklist 2026](https://rivery.io/data-learning-center/complete-data-migration-checklist/) - General migration principles
- [Next SEO npm package](https://www.npmjs.com/package/next-seo) - Alternative for structured data

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Payload 3.0 + Next.js 16 documentation verified
- Architecture: HIGH - Patterns from official docs and existing project structure
- Pitfalls: MEDIUM - Based on common migration issues documented in community guides, not project-specific testing

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (30 days - stable framework versions)
