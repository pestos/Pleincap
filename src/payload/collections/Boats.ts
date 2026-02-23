import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Boats: CollectionConfig = {
  slug: 'boats',
  admin: {
    useAsTitle: 'name',
    group: 'Croisieres',
    defaultColumns: ['name', 'capacity', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo principale',
    },
    {
      name: 'atmosphere',
      type: 'text',
      label: 'Atmosphère',
      admin: {
        placeholder: "ex: Navigation d'exception, Élégance intimiste",
        description: 'Courte phrase affichée sur la carte du bateau dans la page listing',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'capacity',
      type: 'number',
      required: true,
      label: 'Capacité (passagers)',
      min: 1,
    },
    {
      name: 'crew',
      type: 'number',
      label: "Nombre d'équipage",
    },
    {
      name: 'length',
      type: 'number',
      label: 'Longueur (m)',
    },
    {
      name: 'builtYear',
      type: 'number',
      label: 'Année de construction',
      min: 1900,
      max: 2100,
    },
    {
      name: 'renovatedYear',
      type: 'number',
      label: 'Année de rénovation',
      min: 1900,
      max: 2100,
    },
    {
      name: 'deckPlan',
      type: 'upload',
      relationTo: 'media',
      label: 'Plan des ponts (image unique)',
      admin: {
        description: 'Image unique du plan complet. Utilisez "Plans par pont" ci-dessous pour un affichage interactif par niveau.',
      },
    },
    {
      name: 'deckPlans',
      type: 'array',
      label: 'Plans par pont',
      admin: {
        description: 'Ajoutez un plan par niveau de pont pour un affichage interactif avec onglets. Si vide, l\'image unique ci-dessus sera utilisee.',
      },
      fields: [
        {
          name: 'deckName',
          type: 'text',
          required: true,
          label: 'Nom du pont',
          admin: {
            placeholder: 'ex: Pont Supérieur, Pont Principal, Pont Inférieur',
          },
        },
        {
          name: 'deckNumber',
          type: 'number',
          label: 'Numéro de pont',
          admin: {
            description: 'Pour ordonner les ponts (du plus haut au plus bas)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Plan du pont',
        },
        {
          name: 'highlights',
          type: 'textarea',
          label: 'Points d\'intérêt',
          admin: {
            placeholder: 'Un élément par ligne (ex: Restaurant, Piscine, Spa)',
          },
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: "L'art de vivre à bord",
      maxRows: 4,
      admin: {
        description: 'Espaces et infrastructures du bateau (bar, piscine, restaurant, spa, salon, etc.)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Sous-titre',
          admin: {
            placeholder: 'ex: Pont Supérieur, Espace Détente',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre',
          admin: {
            placeholder: 'ex: Bar Panoramique, Piscine & Spa, Restaurant Gastronomique',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Photo',
        },
        {
          name: 'specs',
          type: 'array',
          label: 'Caractéristiques',
          maxRows: 6,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Intitulé',
              admin: { placeholder: 'ex: Superficie, Capacité' },
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Valeur',
              admin: { placeholder: 'ex: 22-24 m², 2 personnes' },
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Galerie photos',
    },
    {
      name: 'cabins',
      type: 'array',
      label: 'Cabines',
      minRows: 1,
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Catégorie',
          admin: {
            placeholder: 'ex: Suite Deluxe, Cabine Standard',
          },
        },
        {
          name: 'color',
          type: 'select',
          label: 'Couleur (plan de pont)',
          defaultValue: '#7EB5D6',
          options: [
            { label: '02 — Bleu clair', value: '#7EB5D6' },
            { label: '03 — Vert clair', value: '#8DC68D' },
            { label: '04 — Peche', value: '#F0AE86' },
            { label: '05 — Brun', value: '#C49452' },
            { label: '06 — Orange', value: '#F08C2E' },
            { label: '07 — Jaune', value: '#FFDC00' },
            { label: '08 — Vert fonce', value: '#2D8C5A' },
            { label: '09 — Bleu', value: '#4878B0' },
            { label: '10 — Lavande', value: '#C0ADD8' },
            { label: 'Single — Rose', value: '#D07890' },
            { label: 'Single — Mauve', value: '#B06878' },
          ],
        },
        {
          name: 'size',
          type: 'number',
          required: true,
          label: 'Surface (m²)',
        },
        {
          name: 'capacity',
          type: 'number',
          required: true,
          label: 'Capacité (personnes)',
          defaultValue: 2,
        },
        {
          name: 'count',
          type: 'number',
          label: 'Nombre total de cabines',
          admin: {
            description: 'Sera calcule automatiquement si vous remplissez la repartition par pont ci-dessous.',
          },
        },
        {
          name: 'assignedDecks',
          type: 'text',
          label: 'Ponts associes (ancien format)',
          admin: {
            hidden: true,
          },
        },
        {
          name: 'deckAssignments',
          type: 'array',
          label: 'Repartition par pont',
          admin: {
            description: 'Nombre de cabines de ce type par pont. Si vide, la cabine apparait sur tous les ponts.',
          },
          fields: [
            {
              name: 'deckNumber',
              type: 'number',
              required: true,
              label: 'N° de pont',
              admin: {
                description: 'Correspond au numero de pont dans "Plans par pont".',
              },
            },
            {
              name: 'count',
              type: 'number',
              required: true,
              label: 'Nombre de cabines',
              min: 1,
            },
          ],
        },
        {
          name: 'amenities',
          type: 'textarea',
          label: 'Équipements',
          admin: {
            placeholder: 'Un équipement par ligne',
          },
        },
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          label: 'Photos de la cabine',
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
