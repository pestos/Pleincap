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
        {
          label: 'Notre Histoire',
          fields: [
            {
              name: 'histoireBanner',
              type: 'upload',
              relationTo: 'media',
              label: 'Image bannière',
              admin: {
                description: 'Image de fond pour le hero de la page Notre Histoire (pleine largeur)',
              },
            },
            {
              name: 'histoireTitle',
              type: 'text',
              label: 'Titre principal',
              defaultValue: "Plein Cap : Une Histoire d'Excellence",
            },
            {
              name: 'histoireSubtitle',
              type: 'text',
              label: 'Sous-titre',
              defaultValue: "Voyagez au cœur de l'exceptionnel depuis 1994.",
            },
            {
              name: 'histoireIntroTitle',
              type: 'text',
              label: 'Titre section intro',
              defaultValue: 'La Philosophie Boutique',
            },
            {
              name: 'histoireIntroText',
              type: 'textarea',
              label: 'Texte d\'introduction',
              defaultValue: "Depuis plus de trois décennies, Plein Cap redéfinit l'art de la navigation. Notre approche privilégie l'intimité et la richesse culturelle. Chaque voyage est une œuvre d'art, conçue pour ceux qui cherchent l'authenticité et le raffinement loin des foules. Nous ne vendons pas simplement des croisières ; nous ouvrons des portes vers des mondes préservés, portés par une passion inébranlable pour la mer et la connaissance.",
            },
            {
              name: 'histoireSavoirFaire',
              type: 'array',
              label: 'Savoir-Faire',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Les piliers du savoir-faire (icônes Material Symbols)',
              },
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  required: true,
                  label: 'Icône',
                  admin: {
                    placeholder: 'ex: menu_book, group, verified_user',
                    description: 'Nom de l\'icône Material Symbols',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Titre',
                },
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                  label: 'Description',
                },
              ],
            },
            {
              name: 'histoireTimelineTitle',
              type: 'text',
              label: 'Titre section timeline',
              defaultValue: 'Notre Historique',
            },
            {
              name: 'histoireTimelineSubtitle',
              type: 'text',
              label: 'Sous-titre timeline',
              defaultValue: 'Les grandes étapes de notre aventure',
            },
            {
              name: 'histoireTimeline',
              type: 'array',
              label: 'Événements timeline',
              minRows: 1,
              fields: [
                {
                  name: 'year',
                  type: 'text',
                  required: true,
                  label: 'Année',
                  admin: {
                    placeholder: "ex: 1994, Aujourd'hui",
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Titre',
                },
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                  label: 'Description',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image',
                  admin: {
                    description: 'Photo illustrant cette étape',
                  },
                },
              ],
            },
            {
              name: 'histoireFounderImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Photo du fondateur',
            },
            {
              name: 'histoireFounderQuote',
              type: 'textarea',
              label: 'Citation du fondateur',
              defaultValue: "Ma vision pour Plein Cap a toujours été de créer une atmosphère où chaque passager se sent comme un invité privilégié sur un yacht privé. Nous privilégions la qualité des rencontres à la quantité de milles parcourus. C'est cette dimension humaine qui fait battre le cœur de notre maison.",
            },
            {
              name: 'histoireFounderName',
              type: 'text',
              label: 'Nom du fondateur',
              defaultValue: 'Jean-Pierre Fleury',
            },
            {
              name: 'histoireFounderRole',
              type: 'text',
              label: 'Rôle du fondateur',
              defaultValue: 'Fondateur & Directeur',
            },
            {
              name: 'histoireCtaText',
              type: 'text',
              label: 'Texte CTA final',
              defaultValue: 'Prêt à écrire votre propre histoire avec nous ?',
            },
            {
              name: 'histoireCtaButton',
              type: 'text',
              label: 'Texte du bouton CTA',
              defaultValue: 'Découvrir nos croisières',
            },
            {
              name: 'histoireCtaLink',
              type: 'text',
              label: 'Lien du bouton CTA',
              defaultValue: '/catalogue',
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
