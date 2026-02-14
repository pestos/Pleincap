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
  limit?: number
  page?: number
}) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'cruises',
    depth: 2,
    where: options?.published ? { _status: { equals: 'published' } } : undefined,
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
