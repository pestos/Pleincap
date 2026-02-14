import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'author', 'publishedDate', '_status', 'updatedAt'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
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
              label: "Titre de l'article",
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              hooks: {
                beforeValidate: [formatSlug('title')],
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: 'Résumé',
              admin: {
                description: 'Affiché dans les listes et utilisé pour le SEO',
                rows: 3,
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: "Contenu de l'article",
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
          label: 'Taxonomie',
          fields: [
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
          ],
        },
        {
          label: 'Publication',
          fields: [
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              label: 'Auteur',
              defaultValue: ({ user }) => user?.id,
            },
            {
              name: 'publishedDate',
              type: 'date',
              required: true,
              label: 'Date de publication',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
              defaultValue: () => new Date().toISOString(),
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      // If authenticated user, return true (can see all posts including drafts)
      if (user) return true
      // If public (no user), return only published posts
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
