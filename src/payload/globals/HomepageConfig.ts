import type { GlobalConfig } from 'payload'

export const HomepageConfig: GlobalConfig = {
  slug: 'homepage-config',
  label: 'Page d\'accueil',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'intro',
      type: 'group',
      label: 'Introduction',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'L\'esprit plein cap',
        },
        {
          name: 'body',
          type: 'textarea',
          label: 'Texte',
          defaultValue:
            'Tour opérateur croisiériste spécialisé dans le maritime et présent sur le marché francophone, Plein Cap vous fait voguer sur les mers du Monde depuis plus de 40 ans.',
        },
        {
          name: 'author',
          type: 'text',
          label: 'Auteur',
          defaultValue: 'Jean-Paul Macocco',
        },
      ],
    },
    {
      name: 'categoriesHeading',
      type: 'text',
      label: 'Titre section catégories',
      defaultValue: 'Trouvez le voyage qui vous ressemble',
    },
    {
      name: 'categoriesSubheading',
      type: 'textarea',
      label: 'Sous-titre section catégories',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Catégories mises en avant',
      admin: {
        description: 'Créez les catégories affichées sur la page d\'accueil (5 max recommandé). Cliquer sur une catégorie redirige vers le catalogue filtré.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre',
          admin: {
            placeholder: 'ex: Croisières Maritimes',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Sous-titre',
          admin: {
            placeholder: 'ex: Explorez les mers du monde',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image de fond',
        },
        {
          name: 'voyageType',
          type: 'select',
          label: 'Filtre : Type de voyage',
          options: [
            { label: 'Maritime', value: 'maritime' },
            { label: 'Fluviale', value: 'fluviale' },
            { label: 'Train', value: 'train' },
            { label: 'Escapade', value: 'escapade' },
          ],
          admin: {
            description: 'Optionnel — filtre appliqué au catalogue quand on clique sur cette catégorie',
          },
        },
        {
          name: 'destination',
          type: 'relationship',
          relationTo: 'destinations',
          label: 'Filtre : Destination',
          admin: {
            description: 'Optionnel — filtre par destination au lieu du type de voyage',
          },
        },
      ],
    },
    {
      name: 'selectionHeading',
      type: 'text',
      label: 'Titre section sélection',
      defaultValue: 'Les envies du moment',
    },
    {
      name: 'featuredCruises',
      type: 'relationship',
      relationTo: 'cruises',
      hasMany: true,
      label: 'Croisières mises en avant',
      admin: {
        description: 'Sélectionnez les croisières à afficher dans la section "Sélection" (3 recommandé)',
      },
    },
    {
      name: 'trustMarks',
      type: 'array',
      label: 'Trust marks',
      admin: {
        description: 'Points de confiance affichés en bas de page (4 recommandé)',
      },
      fields: [
        {
          name: 'iconSvg',
          type: 'textarea',
          label: 'SVG path (d attribute)',
          required: true,
          admin: {
            description: 'Le contenu SVG path "d" pour l\'icône',
            rows: 2,
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Description',
        },
      ],
    },
  ],
}
