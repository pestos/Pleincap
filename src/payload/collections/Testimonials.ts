import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    group: 'Contenu',
    defaultColumns: ['authorName', 'rating', 'updatedAt'],
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Nom du client',
    },
    {
      name: 'authorPhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo du client',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Témoignage',
      admin: {
        rows: 5,
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      label: 'Note (1-5)',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'cruiseName',
      type: 'text',
      label: 'Nom de la croisière',
      admin: {
        description: 'Nom de la croisière concernée (texte libre)',
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date du témoignage',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Mis en avant',
      defaultValue: false,
      admin: {
        description: "Affiché sur la page d'accueil",
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
