import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Contenu',
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'video/ogg', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif',
    },
  ],
  access: {
    // Any authenticated user can upload
    create: ({ req: { user } }) => !!user,
    // Public read (images are public assets)
    read: () => true,
    // Any authenticated user can update media metadata
    update: ({ req: { user } }) => !!user,
    // Only admins can delete media
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
