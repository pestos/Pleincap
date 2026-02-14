import type { CollectionConfig } from 'payload'

export const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
    defaultColumns: ['name', 'location', 'updatedAt'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom interne',
      admin: {
        description: 'Pour identifier le banner dans le backoffice',
      },
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      label: 'Emplacement',
      options: [
        { label: "Page d'accueil", value: 'home' },
        { label: 'Page Croisières', value: 'cruises' },
        { label: 'Page Destinations', value: 'destinations' },
        { label: 'Page Blog', value: 'blog' },
        { label: 'Page Contact', value: 'contact' },
      ],
    },
    {
      name: 'content',
      type: 'blocks',
      label: 'Contenu',
      minRows: 1,
      maxRows: 1,
      blocks: [
        {
          slug: 'imageHero',
          labels: {
            singular: 'Hero avec image',
            plural: 'Heroes avec image',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Image de fond',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titre',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Sous-titre',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'Texte du bouton',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'Lien du bouton',
            },
          ],
        },
        {
          slug: 'videoHero',
          labels: {
            singular: 'Hero avec vidéo',
            plural: 'Heroes avec vidéo',
          },
          fields: [
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Fichier vidéo',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titre',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Sous-titre',
            },
            {
              name: 'overlay',
              type: 'checkbox',
              label: 'Afficher overlay sombre',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      // If user authenticated, return true (can see all banners including drafts)
      if (user) return true
      // If public, return only published banners
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
