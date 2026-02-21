import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Trains: CollectionConfig = {
  slug: 'trains',
  admin: {
    useAsTitle: 'name',
    group: 'Voyages en Train',
    defaultColumns: ['name', 'capacity', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du train',
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
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'capacity',
      type: 'number',
      required: true,
      label: 'Capacite (passagers)',
      min: 1,
    },
    {
      name: 'crew',
      type: 'number',
      label: "Nombre d'equipage",
    },
    {
      name: 'length',
      type: 'number',
      label: 'Longueur (m)',
    },
    {
      name: 'builtYear',
      type: 'number',
      label: 'Annee de construction',
      min: 1900,
      max: 2100,
    },
    {
      name: 'renovatedYear',
      type: 'number',
      label: 'Annee de renovation',
      min: 1900,
      max: 2100,
    },
    {
      name: 'carriagePlan',
      type: 'upload',
      relationTo: 'media',
      label: 'Plan des voitures (image unique)',
      admin: {
        description: 'Image unique du plan complet. Utilisez "Plans par voiture" ci-dessous pour un affichage interactif.',
      },
    },
    {
      name: 'carriagePlans',
      type: 'array',
      label: 'Plans par voiture',
      admin: {
        description: 'Ajoutez un plan par voiture pour un affichage interactif avec onglets. Si vide, l\'image unique ci-dessus sera utilisee.',
      },
      fields: [
        {
          name: 'carriageName',
          type: 'text',
          required: true,
          label: 'Nom de la voiture',
          admin: {
            placeholder: 'ex: Voiture-restaurant, Voiture-bar, Voiture-salon',
          },
        },
        {
          name: 'carriageNumber',
          type: 'number',
          label: 'Numero de voiture',
          admin: {
            description: 'Pour ordonner les voitures',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Plan de la voiture',
        },
        {
          name: 'highlights',
          type: 'textarea',
          label: 'Points d\'interet',
          admin: {
            placeholder: 'Un element par ligne (ex: Restaurant, Bar, Salon)',
          },
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
      name: 'compartments',
      type: 'array',
      label: 'Compartiments',
      minRows: 1,
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Categorie',
          admin: {
            placeholder: 'ex: Suite Grand Luxe, Compartiment Standard',
          },
        },
        {
          name: 'color',
          type: 'select',
          label: 'Couleur (plan des voitures)',
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
          label: 'Surface (m\u00B2)',
        },
        {
          name: 'capacity',
          type: 'number',
          required: true,
          label: 'Capacite (personnes)',
          defaultValue: 2,
        },
        {
          name: 'count',
          type: 'number',
          label: 'Nombre total de compartiments',
          admin: {
            description: 'Sera calcule automatiquement si vous remplissez la repartition par voiture ci-dessous.',
          },
        },
        {
          name: 'assignedCarriages',
          type: 'text',
          label: 'Voitures associees (ancien format)',
          admin: {
            hidden: true,
          },
        },
        {
          name: 'deckAssignments',
          type: 'array',
          label: 'Repartition par voiture',
          admin: {
            description: 'Nombre de compartiments de ce type par voiture. Si vide, le compartiment apparait sur toutes les voitures.',
          },
          fields: [
            {
              name: 'deckNumber',
              type: 'number',
              required: true,
              label: 'N° de voiture',
              admin: {
                description: 'Correspond au numero de voiture dans "Plans par voiture".',
              },
            },
            {
              name: 'count',
              type: 'number',
              required: true,
              label: 'Nombre de compartiments',
              min: 1,
            },
          ],
        },
        {
          name: 'amenities',
          type: 'textarea',
          label: 'Equipements',
          admin: {
            placeholder: 'Un equipement par ligne',
          },
        },
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          label: 'Photos du compartiment',
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
