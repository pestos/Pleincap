import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    group: 'Newsletter',
    defaultColumns: ['email', 'status', 'subscribedAt', 'updatedAt'],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
      label: 'Email',
    },
    {
      name: 'firstName',
      type: 'text',
      required: false,
      label: 'Prénom',
    },
    {
      name: 'lastName',
      type: 'text',
      required: false,
      label: 'Nom',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      index: true,
      label: 'Statut',
      options: [
        {
          label: 'En attente',
          value: 'pending',
        },
        {
          label: 'Actif',
          value: 'active',
        },
        {
          label: 'Désabonné',
          value: 'unsubscribed',
        },
        {
          label: 'Rebond',
          value: 'bounced',
        },
      ],
    },
    {
      name: 'verificationToken',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'verificationTokenExpiry',
      type: 'date',
      required: false,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'unsubscribeToken',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'subscribedAt',
      type: 'date',
      required: false,
      admin: {
        readOnly: true,
      },
      label: 'Date d\'inscription',
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      required: false,
      admin: {
        readOnly: true,
      },
      label: 'Date de désinscription',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      label: 'Source',
      admin: {
        description: 'Source de l\'inscription',
      },
      options: [
        {
          label: 'Site web',
          value: 'website',
        },
        {
          label: 'Import',
          value: 'import',
        },
        {
          label: 'Manuel',
          value: 'manual',
        },
      ],
    },
    {
      name: 'ipAddress',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true,
      },
      label: 'Adresse IP',
    },
    {
      name: 'userAgent',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        hidden: true,
      },
      label: 'User Agent',
    },
  ],
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
}
