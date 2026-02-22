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
      name: 'featured',
      type: 'checkbox',
      label: 'Mis en avant',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Afficher cette croisière dans les sélections mises en avant',
      },
    },
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
            {
              name: 'brochure',
              type: 'upload',
              relationTo: 'media',
              label: 'Brochure PDF',
              admin: {
                description: 'Téléversez le PDF de la brochure (les clients pourront le télécharger)',
              },
            },
            {
              name: 'conditionsGenerales',
              type: 'richText',
              label: 'Conditions et Formalités',
            },
            {
              name: 'prixComprend',
              type: 'richText',
              label: 'Notre prix comprend',
            },
            {
              name: 'nonInclus',
              type: 'richText',
              label: 'Ne sont pas inclus',
            },
            {
              name: 'formalitesPolice',
              type: 'richText',
              label: 'Formalités de police pour les ressortissants français',
            },
            {
              name: 'conditionsAnnulation',
              type: 'richText',
              label: "Conditions spécifiques d'annulation pour cette croisière",
            },
            {
              name: 'notaBene',
              type: 'richText',
              label: 'Nota Bene',
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: 'Galerie photos',
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
              required: false,
              label: 'Destination',
            },
            {
              name: 'boat',
              type: 'relationship',
              relationTo: 'boats',
              required: false,
              label: 'Bateau',
              admin: {
                condition: (data) => !data?.voyageType || data.voyageType !== 'train',
              },
            },
            {
              name: 'train',
              type: 'relationship',
              relationTo: 'trains',
              required: false,
              label: 'Train',
              admin: {
                condition: (data) => data?.voyageType === 'train',
              },
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
              name: 'accompanied',
              type: 'checkbox',
              label: 'Voyage accompagné',
              defaultValue: false,
            },
            {
              name: 'allInclusive',
              type: 'checkbox',
              label: 'All Inclusive',
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
            {
              name: 'priceIncludes',
              type: 'array',
              label: 'Le prix comprend',
              admin: {
                description: 'Liste des éléments inclus dans le prix (affichés sur la fiche croisière)',
              },
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  required: true,
                  label: 'Élément inclus',
                },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Mettre en avant',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'cabinPricing',
              type: 'array',
              label: 'Tarifs par cabine',
              admin: {
                description: 'Indiquez le nom exact de la catégorie telle que définie dans le bateau, et le prix pour cette croisière.',
              },
              fields: [
                {
                  name: 'cabinCategory',
                  type: 'text',
                  required: true,
                  label: 'Catégorie de cabine',
                  admin: {
                    components: {
                      Field: '@/components/admin/CabinCategorySelect',
                    },
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Prix par personne (€)',
                  min: 0,
                },
              ],
            },
            {
              name: 'voyageType',
              type: 'select',
              label: 'Type de voyage',
              options: [
                { label: 'Maritime', value: 'maritime' },
                { label: 'Fluviale', value: 'fluviale' },
                { label: 'Train', value: 'train' },
                { label: 'Escapade', value: 'escapade' },
              ],
              admin: {
                description: 'Type de voyage pour le filtrage catalogue',
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
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'stopType',
                      type: 'select',
                      label: "Type d'escale",
                      defaultValue: 'stop',
                      options: [
                        { label: 'Départ', value: 'departure' },
                        { label: 'Escale', value: 'stop' },
                        { label: 'Navigation', value: 'sailing' },
                        { label: 'Arrivée', value: 'arrival' },
                      ],
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'duration',
                      type: 'text',
                      label: 'Durée escale',
                      admin: {
                        width: '50%',
                        placeholder: 'ex: Journée entière',
                      },
                    },
                  ],
                },
                {
                  name: 'mapPicker',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '@/components/admin/MapCoordinatePicker',
                    },
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'latitude',
                      type: 'number',
                      admin: {
                        hidden: true,
                      },
                    },
                    {
                      name: 'longitude',
                      type: 'number',
                      admin: {
                        hidden: true,
                      },
                    },
                  ],
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
