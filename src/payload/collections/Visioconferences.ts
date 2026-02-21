import type { CollectionConfig } from 'payload'

export const Visioconferences: CollectionConfig = {
  slug: 'visioconferences',
  admin: {
    useAsTitle: 'title',
    group: 'Contenu',
    defaultColumns: ['title', 'type', 'date', 'destination', 'updatedAt'],
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
              label: 'Titre de la conference',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Description',
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Vignette',
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              label: 'Type',
              options: [
                { label: 'En direct (Live)', value: 'live' },
                { label: 'Replay', value: 'replay' },
              ],
              defaultValue: 'replay',
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'destination',
              type: 'relationship',
              relationTo: 'destinations',
              label: 'Destination',
            },
            {
              name: 'speaker',
              type: 'relationship',
              relationTo: 'speakers',
              label: 'Conferencier',
            },
            {
              name: 'speakerOverride',
              type: 'text',
              label: 'Conferencier (texte libre)',
              admin: {
                description: 'Utilise a la place de la relation si renseigne (ex: "Dr. Antoine Morel, Archeologue")',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  required: true,
                  label: 'Date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    width: '40%',
                  },
                },
                {
                  name: 'time',
                  type: 'text',
                  label: 'Heure',
                  admin: {
                    placeholder: 'ex: 18h30',
                    width: '30%',
                  },
                },
                {
                  name: 'duration',
                  type: 'text',
                  label: 'Duree',
                  admin: {
                    placeholder: 'ex: 1h30',
                    width: '30%',
                  },
                },
              ],
            },
            {
              name: 'viewers',
              type: 'number',
              label: 'Nombre de vues',
              min: 0,
              admin: {
                description: 'Affiche pour les replays',
              },
            },
          ],
        },
        {
          label: 'YouTube & Inscription',
          fields: [
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'URL YouTube (replay)',
              admin: {
                description: 'Lien vers la video YouTube du replay. Ex: https://www.youtube.com/watch?v=XXXXX',
              },
            },
            {
              name: 'youtubeLiveUrl',
              type: 'text',
              label: 'URL YouTube Live',
              admin: {
                description: 'Lien vers le live YouTube. Ex: https://www.youtube.com/live/XXXXX',
                condition: (data) => data?.type === 'live',
              },
            },
            {
              name: 'registrationOpen',
              type: 'checkbox',
              label: 'Inscriptions ouvertes',
              defaultValue: true,
              admin: {
                description: 'Permet aux clients de s\'inscrire pour recevoir le lien du live',
                condition: (data) => data?.type === 'live',
              },
            },
            {
              name: 'liveLinkSent',
              type: 'checkbox',
              label: 'Lien live envoye',
              defaultValue: false,
              admin: {
                description: 'Coche automatiquement quand les emails avec le lien live ont ete envoyes aux inscrits',
                condition: (data) => data?.type === 'live',
                readOnly: true,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        const visio = doc as any
        const prev = previousDoc as any

        // Trigger email sending when youtubeLiveUrl is set for the first time
        // and liveLinkSent is not already true
        if (
          visio.type === 'live' &&
          visio.youtubeLiveUrl &&
          !visio.liveLinkSent &&
          (!prev || !prev.youtubeLiveUrl || prev.youtubeLiveUrl !== visio.youtubeLiveUrl)
        ) {
          try {
            await req.payload.jobs.queue({
              task: 'sendLiveLink',
              input: {
                visioconferenceId: String(visio.id),
              },
            })
            await req.payload.jobs.run()
          } catch (error) {
            req.payload.logger.error(
              `Failed to queue sendLiveLink for visioconference ${visio.id}: ${error}`
            )
          }
        }
      },
    ],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
