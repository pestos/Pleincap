import type { CollectionConfig } from 'payload'
import { formatSlug } from '../hooks/formatSlug'

export const Cruises: CollectionConfig = {
  slug: 'cruises',
  admin: {
    useAsTitle: 'title',
    group: 'Croisieres',
    defaultColumns: ['title', 'destination', 'departureDate', '_status', 'updatedAt'],
    description: 'Gestion des croisières avec itinéraires et relations',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
    maxPerDoc: 50,
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
              label: 'Titre de la croisière',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              hooks: {
                beforeValidate: [formatSlug('title')],
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: 'Résumé court',
              admin: {
                description: 'Utilisé pour les vignettes et le SEO',
              },
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Description complète',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Image mise en avant',
            },
          ],
        },
        {
          label: 'Détails',
          fields: [
            {
              name: 'destination',
              type: 'relationship',
              relationTo: 'destinations',
              required: true,
              label: 'Destination',
            },
            {
              name: 'boat',
              type: 'relationship',
              relationTo: 'boats',
              required: true,
              label: 'Bateau',
            },
            {
              name: 'speakers',
              type: 'relationship',
              relationTo: 'speakers',
              hasMany: true,
              label: 'Conférenciers',
              admin: {
                description: 'Glisser-déposer pour réorganiser',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'departureDate',
                  type: 'date',
                  required: true,
                  label: 'Date de départ',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    width: '50%',
                  },
                },
                {
                  name: 'returnDate',
                  type: 'date',
                  required: true,
                  label: 'Date de retour',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Prix à partir de (€)',
                  min: 0,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'availableSpots',
                  type: 'number',
                  required: true,
                  label: 'Places disponibles',
                  min: 0,
                  defaultValue: 0,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'flightIncluded',
              type: 'checkbox',
              label: 'Vol inclus',
              defaultValue: false,
            },
            {
              name: 'rating',
              type: 'number',
              label: 'Note moyenne',
              min: 0,
              max: 5,
              admin: {
                step: 0.1,
              },
            },
          ],
        },
        {
          label: 'Itinéraire',
          fields: [
            {
              name: 'itinerary',
              type: 'array',
              label: 'Jours',
              minRows: 1,
              admin: {
                description: 'Programme jour par jour de la croisière',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'day',
                      type: 'number',
                      required: true,
                      label: 'Jour',
                      admin: {
                        width: '20%',
                      },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      label: 'Titre',
                      admin: {
                        width: '80%',
                        placeholder: 'ex: Athènes - Embarquement',
                      },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'richText',
                  required: true,
                  label: 'Programme',
                },
                {
                  name: 'highlights',
                  type: 'textarea',
                  label: 'Points forts',
                  admin: {
                    description: 'Un point fort par ligne (optionnel)',
                    rows: 3,
                  },
                },
                {
                  name: 'images',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                  label: 'Photos du jour',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
