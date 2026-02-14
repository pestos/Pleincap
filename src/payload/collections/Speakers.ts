import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

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
      index: true,
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
      admin: {
        description: 'Identifiant URL (auto-généré depuis le nom)',
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
    // Public read
    read: () => true,
    // Authenticated users can create/update
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
