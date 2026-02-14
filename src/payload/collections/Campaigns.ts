import type { CollectionConfig } from 'payload'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: {
    useAsTitle: 'name',
    group: 'Newsletter',
    defaultColumns: ['name', 'status', 'sentAt', 'recipientCount', 'updatedAt'],
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
              name: 'name',
              type: 'text',
              required: true,
              label: 'Nom de la campagne',
            },
            {
              name: 'subject',
              type: 'text',
              required: true,
              maxLength: 100,
              label: "Objet de l'email",
              admin: {
                description: "L'objet affiché dans la boîte de réception",
              },
            },
            {
              name: 'preheader',
              type: 'text',
              maxLength: 150,
              label: "Texte d'aperçu",
              admin: {
                description: "Texte affiché après l'objet dans les clients email",
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Contenu de la campagne',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image principale',
            },
          ],
        },
        {
          label: 'Envoi',
          fields: [
            {
              name: 'template',
              type: 'select',
              required: true,
              defaultValue: 'newsletter',
              options: [
                { label: 'Newsletter Standard', value: 'newsletter' },
                { label: 'Annonce', value: 'announcement' },
                { label: 'Promotion', value: 'promotion' },
              ],
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Brouillon', value: 'draft' },
                { label: 'Prêt à envoyer', value: 'ready-to-send' },
                { label: "En cours d'envoi", value: 'sending' },
                { label: 'Envoyé', value: 'sent' },
                { label: 'Échoué', value: 'failed' },
              ],
              admin: {
                description: 'Passez à "Prêt à envoyer" pour déclencher l\'envoi',
              },
            },
            {
              name: 'sendToAll',
              type: 'checkbox',
              defaultValue: true,
              label: 'Envoyer à tous les abonnés actifs',
            },
            {
              name: 'testEmail',
              type: 'email',
              label: 'Email de test',
              admin: {
                description: "Envoyer un test à cette adresse avant l'envoi réel",
              },
            },
          ],
        },
        {
          label: 'Statistiques',
          fields: [
            {
              name: 'sentAt',
              type: 'date',
              admin: {
                readOnly: true,
              },
              label: 'Envoyé le',
            },
            {
              name: 'recipientCount',
              type: 'number',
              admin: {
                readOnly: true,
              },
              label: 'Nombre de destinataires',
            },
            {
              name: 'sentCount',
              type: 'number',
              admin: {
                readOnly: true,
              },
              label: 'Emails envoyés',
            },
            {
              name: 'failedCount',
              type: 'number',
              admin: {
                readOnly: true,
              },
              label: 'Emails échoués',
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Only trigger on update when status changes to 'ready-to-send' for the first time
        if (
          operation === 'update' &&
          doc.status === 'ready-to-send' &&
          previousDoc?.status !== 'ready-to-send'
        ) {
          // Count active subscribers
          const subscriberCount = await req.payload.count({
            collection: 'subscribers',
            where: {
              status: {
                equals: 'active',
              },
            },
          })

          // Update campaign with recipient count and status
          await req.payload.update({
            collection: 'campaigns',
            id: doc.id,
            data: {
              recipientCount: subscriberCount.totalDocs,
              status: 'sending',
            },
          })

          // Queue the sendCampaign job
          await req.payload.jobs.queue({
            task: 'sendCampaign',
            input: {
              campaignId: doc.id,
            },
          })
        }

        return doc
      },
    ],
  },
}
