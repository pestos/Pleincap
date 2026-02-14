import type { CollectionConfig } from 'payload'

export const EmailAnalytics: CollectionConfig = {
  slug: 'email-analytics',
  admin: {
    group: 'Newsletter',
    defaultColumns: ['event', 'campaign', 'subscriber', 'createdAt'],
  },
  fields: [
    {
      name: 'event',
      type: 'select',
      required: true,
      index: true,
      label: 'Événement',
      options: [
        {
          label: 'Ouverture',
          value: 'open',
        },
        {
          label: 'Clic',
          value: 'click',
        },
        {
          label: 'Désinscription',
          value: 'unsubscribe',
        },
        {
          label: 'Rebond',
          value: 'bounce',
        },
      ],
    },
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns',
      index: true,
      label: 'Campagne',
    },
    {
      name: 'subscriber',
      type: 'relationship',
      relationTo: 'subscribers',
      index: true,
      label: 'Abonné',
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      admin: {
        condition: (data) => data?.event === 'click',
        description: 'URL cliquée',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'Adresse IP',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
      admin: {
        readOnly: true,
      },
    },
  ],
  access: {
    // Admin-only access - tracking routes use Payload Local API (server-side)
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  timestamps: true,
}
