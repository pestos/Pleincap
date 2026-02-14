import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    group: 'Croisieres',
    defaultColumns: ['name', 'region', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom de la destination',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'region',
      type: 'select',
      required: true,
      label: 'Région',
      options: [
        { label: 'Méditerranée', value: 'mediterranee' },
        { label: 'Europe du Nord', value: 'europe-nord' },
        { label: 'Europe Centrale', value: 'europe-centrale' },
        { label: 'Asie', value: 'asie' },
        { label: 'Afrique', value: 'afrique' },
        { label: 'Autre', value: 'autre' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Description',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Résumé court',
      admin: {
        description: 'Pour les vignettes et le SEO (160 caractères max)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image mise en avant',
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Galerie photos',
    },
  ],
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
