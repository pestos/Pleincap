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
      label: 'Nom du bateau',
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
      required: true,
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
      label: 'Plan des ponts',
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
          required: true,
          label: 'Nombre de cabines de ce type',
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
