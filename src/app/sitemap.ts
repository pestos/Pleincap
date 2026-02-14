import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = 'https://plein-cap.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/catalogue`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/nos-bateaux`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/nos-conferenciers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/equipe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/livre-d-or`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/orient-express`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/escapades-culturelles`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/voyages-en-train`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/notre-histoire`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/special-groupes`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/visioconference`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Dynamic: Published cruises
  const { docs: cruises } = await payload.find({
    collection: 'cruises',
    where: { _status: { equals: 'published' } },
    select: { slug: true, updatedAt: true },
    pagination: false,
  })
  const cruisePages: MetadataRoute.Sitemap = cruises.map((cruise: any) => ({
    url: `${baseUrl}/catalogue/${cruise.slug}`,
    lastModified: new Date(cruise.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic: Boats
  const { docs: boats } = await payload.find({
    collection: 'boats',
    select: { slug: true, updatedAt: true },
    pagination: false,
  })
  const boatPages: MetadataRoute.Sitemap = boats.map((boat: any) => ({
    url: `${baseUrl}/nos-bateaux/${boat.slug}`,
    lastModified: new Date(boat.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic: Published posts
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    select: { slug: true, updatedAt: true },
    pagination: false,
  })
  const postPages: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dynamic: Destinations
  const { docs: destinations } = await payload.find({
    collection: 'destinations',
    select: { slug: true, updatedAt: true },
    pagination: false,
  })
  const destinationPages: MetadataRoute.Sitemap = destinations.map((dest: any) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: new Date(dest.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...cruisePages, ...boatPages, ...postPages, ...destinationPages]
}
