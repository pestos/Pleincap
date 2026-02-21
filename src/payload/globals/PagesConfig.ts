import type { GlobalConfig } from 'payload'

export const PagesConfig: GlobalConfig = {
  slug: 'pages-config',
  label: 'Configuration des Pages',
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Voyages en Train',
          fields: [
            {
              name: 'trainBanner',
              type: 'upload',
              relationTo: 'media',
              label: 'Banniere page Train',
              admin: {
                description: 'Image de fond pour le hero de la page Voyages en Train',
              },
            },
            {
              name: 'trainTitle',
              type: 'text',
              label: 'Titre',
              defaultValue: 'Voyages en Train',
            },
            {
              name: 'trainSubtitle',
              type: 'textarea',
              label: 'Sous-titre',
              defaultValue: 'Retrouver le rythme lent du monde, la ou le voyage devient une destination en soi.',
            },
            {
              name: 'trainIntro',
              type: 'textarea',
              label: 'Texte d\'introduction',
              defaultValue: 'Nos epopees ferroviaires ressuscitent l\'art de vivre des grands explorateurs, melant le luxe feutre des compartiments d\'epoque a la decouverte intime des paysages qui defilent.',
            },
          ],
        },
        {
          label: 'Conferenciers',
          fields: [
            {
              name: 'conferenciersBanner',
              type: 'upload',
              relationTo: 'media',
              label: 'Banniere page Conferenciers',
            },
            {
              name: 'conferenciersTitle',
              type: 'text',
              label: 'Titre',
              defaultValue: 'Nos Conferenciers',
            },
            {
              name: 'conferenciersSubtitle',
              type: 'textarea',
              label: 'Sous-titre',
              defaultValue: 'Decouvrez les erudits, historiens et artistes qui donneront une dimension culturelle unique a votre prochaine croisiere.',
            },
          ],
        },
        {
          label: 'Visioconferences',
          fields: [
            {
              name: 'visioBanner',
              type: 'upload',
              relationTo: 'media',
              label: 'Banniere page Visioconferences',
            },
            {
              name: 'visioTitle',
              type: 'text',
              label: 'Titre',
              defaultValue: 'Visioconferences',
            },
            {
              name: 'visioSubtitle',
              type: 'textarea',
              label: 'Sous-titre',
              defaultValue: 'Decouvrez nos itineraires exceptionnels depuis chez vous. Nos experts vous presentent les destinations, navires et experiences culturelles en direct ou en replay.',
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
}
