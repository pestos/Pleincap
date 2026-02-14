import type { Payload } from 'payload'

/**
 * Upload media from external URL to Payload Media collection
 * Returns the media document ID for use in relationships
 * Handles duplicates by checking if filename already exists
 */
export async function uploadMediaFromUrl(
  payload: Payload,
  url: string,
  alt: string
): Promise<number> {
  // Generate a safe filename from alt text
  const filename = alt.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg'

  // Check if media with this filename already exists (idempotent)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`  ↳ Media already exists: ${filename} (ID: ${existing.docs[0].id})`)
    return existing.docs[0].id as number
  }

  // Download the image
  console.log(`  ↳ Downloading image from: ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image from ${url}: ${response.statusText}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())

  // Upload to Payload Media collection
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: 'image/jpeg',
      name: filename,
      size: buffer.length,
    },
  })

  console.log(`  ↳ Uploaded media: ${filename} (ID: ${media.id})`)
  return media.id as number
}
