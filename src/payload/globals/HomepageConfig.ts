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
      name: 'gridCruises',
      type: 'array',
      label: 'Grille destinations mises en avant',
      admin: {
        description: 'Choisissez les croisières du catalogue à afficher dans la grille (5 max recommandé). L\'image et le titre viennent de la fiche croisière.',
      },
      fields: [
        {
          name: 'cruise',
          type: 'relationship',
          relationTo: 'cruises',
          required: true,
          label: 'Croisière',
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
