import type { CollectionConfig } from 'payload'

export const LiveRegistrations: CollectionConfig = {
  slug: 'live-registrations',
  admin: {
    useAsTitle: 'email',
    group: 'Contenu',
    defaultColumns: ['email', 'name', 'visioconference', 'createdAt'],
  },
  fields: [
    {
      name: 'visioconference',
      type: 'relationship',
      relationTo: 'visioconferences',
      required: true,
      label: 'Visioconference',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom complet',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Adresse email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telephone',
    },
  ],
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Public — form submissions
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
