import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    group: 'Contenu',
    defaultColumns: ['name', 'role', 'updatedAt'],
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
      name: 'jobTitle',
      type: 'text',
      required: true,
      label: 'Poste / Fonction',
      admin: {
        placeholder: 'ex: Directrice commerciale',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biographie',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email de contact',
    },
    {
      name: 'order',
      type: 'number',
      label: "Ordre d'affichage",
      defaultValue: 0,
      admin: {
        description: "Ordre d'affichage sur la page équipe (0 = premier)",
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
