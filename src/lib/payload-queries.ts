import { getPayload } from 'payload'
import config from '@payload-config'

export const getPayloadClient = () => getPayload({ config })

/**
 * Get all speakers, sorted alphabetically by name
 */
export async function getSpeakers() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'speakers',
    pagination: false,
    sort: 'name',
  })
  return docs
}

/**
 * Get all team members, sorted by order field
 */
export async function getTeamMembers() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'team',
    pagination: false,
    sort: 'order',
  })
  return docs
}

/**
 * Get testimonials, optionally filtered by featured flag
 */
export async function getTestimonials(options?: { featured?: boolean }) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'testimonials',
    pagination: false,
    where: options?.featured ? { featured: { equals: true } } : undefined,
  })
  return docs
}

/**
 * Get cruises with full depth to populate relationships
 */
export async function getCruises(options?: {
  published?: boolean
  featured?: boolean
  limit?: number
  page?: number
  destinationId?: string | number
  voyageType?: string
  month?: string // format: "2026-03"
  search?: string // free text search on title/excerpt
}) {
  const payload = await getPayloadClient()
  const where: Record<string, any> = {}
  if (options?.published) where._status = { equals: 'published' }
  if (options?.featured) where.featured = { equals: true }
  if (options?.destinationId) where.destination = { equals: options.destinationId }
  if (options?.voyageType) where.voyageType = { equals: options.voyageType }
  if (options?.search) {
    where.or = [
      { title: { like: options.search } },
      { excerpt: { like: options.search } },
    ]
  }
  if (options?.month) {
    const [year, m] = options.month.split('-').map(Number)
    const startDate = new Date(year, m - 1, 1).toISOString()
    const endDate = new Date(year, m, 0, 23, 59, 59).toISOString()
    where.departureDate = {
      greater_than_equal: startDate,
      less_than_equal: endDate,
    }
  }

  const result = await payload.find({
    collection: 'cruises',
    depth: 2,
    where: Object.keys(where).length > 0 ? where : undefined,
    limit: options?.limit || 10,
    page: options?.page || 1,
  })
  return result
}

/**
 * Get single cruise by slug with full depth
 */
export async function getCruiseBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'cruises',
    depth: 2,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return docs[0] || null
}

/**
 * Get all destinations
 */
export async function getDestinations() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'destinations',
    pagination: false,
  })
  return docs
}

/**
 * Get all boats
 */
export async function getBoats() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'boats',
    pagination: false,
  })
  return docs
}

/**
 * Get single boat by slug
 */
export async function getBoatBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'boats',
    depth: 2,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return docs[0] || null
}

/**
 * Get published posts with optional filters
 */
export async function getPosts(options?: {
  limit?: number
  page?: number
  category?: string
}) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    where: {
      _status: { equals: 'published' },
      ...(options?.category && {
        categories: {
          contains: options.category,
        },
      }),
    },
    limit: options?.limit || 10,
    page: options?.page || 1,
  })
  return result
}

/**
 * Get single post by slug with depth:1
 */
export async function getPostBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return docs[0] || null
}

/**
 * Get homepage config global with populated relationships
 */
export async function getHomepageConfig() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({
    slug: 'homepage-config',
    depth: 2,
  })
  return data
}

/**
 * Get livre d'or config global with populated relationships
 */
export async function getLivreDOrConfig() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({
    slug: 'livre-dor-config',
    depth: 2,
  })
  return data
}

/**
 * Get pages config global
 */
export async function getPagesConfig() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({
    slug: 'pages-config',
    depth: 2,
  })
  return data
}

/**
 * Get visioconferences with optional type filter
 */
export async function getVisioconferences(options?: { type?: 'live' | 'replay' }) {
  const payload = await getPayloadClient()
  const where: Record<string, any> = {}
  if (options?.type) where.type = { equals: options.type }
  const { docs } = await payload.find({
    collection: 'visioconferences',
    depth: 2,
    where: Object.keys(where).length > 0 ? where : undefined,
    pagination: false,
    sort: '-date',
  })
  return docs
}

/**
 * Get all trains
 */
export async function getTrains() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'trains',
    pagination: false,
  })
  return docs
}

/**
 * Get single train by slug
 */
export async function getTrainBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'trains',
    depth: 2,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return docs[0] || null
}

/**
 * Get featured cruises (shorthand)
 */
export async function getFeaturedCruises(options?: { limit?: number }) {
  const result = await getCruises({
    published: true,
    featured: true,
    limit: options?.limit || 10,
  })
  return result.docs
}
