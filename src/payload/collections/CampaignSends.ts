import type { CollectionConfig } from 'payload'

export const CampaignSends: CollectionConfig = {
  slug: 'campaign-sends',
  admin: {
    group: 'Newsletter',
    defaultColumns: ['campaign', 'status', 'sentCount', 'failedCount', 'completedAt'],
  },
  fields: [
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'queued',
      options: [
        { label: 'En file d\'attente', value: 'queued' },
        { label: 'En cours', value: 'sending' },
        { label: 'Terminé', value: 'completed' },
        { label: 'Échoué', value: 'failed' },
      ],
    },
    {
      name: 'totalRecipients',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'sentCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'failedCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'startedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'completedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'errorLog',
      type: 'textarea',
      admin: {
        readOnly: true,
        rows: 5,
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
}
