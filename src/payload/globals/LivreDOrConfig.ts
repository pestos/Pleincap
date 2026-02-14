import type { GlobalConfig } from 'payload'

export const LivreDOrConfig: GlobalConfig = {
  slug: 'livre-dor-config',
  label: 'Livre d\'or',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie photos',
      admin: {
        description: 'Photos affichées dans la galerie mosaïque',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'size',
          type: 'select',
          label: 'Taille dans la grille',
          defaultValue: 'normal',
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Large (2 colonnes)', value: 'large' },
            { label: 'Wide (2 colonnes)', value: 'wide' },
            { label: 'Tall (2 rangées)', value: 'tall' },
          ],
        },
      ],
    },
    {
      name: 'inspiredCruises',
      type: 'relationship',
      relationTo: 'cruises',
      hasMany: true,
      label: 'Itinéraires inspirés',
      admin: {
        description: 'Croisières affichées dans la section "Itinéraires Inspirés"',
      },
    },
  ],
}
