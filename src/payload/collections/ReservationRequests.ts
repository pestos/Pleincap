import type { CollectionConfig } from 'payload'

export const ReservationRequests: CollectionConfig = {
  slug: 'reservation-requests',
  labels: {
    singular: 'Demande de reservation',
    plural: 'Demandes de reservation',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Croisieres',
    defaultColumns: ['status', 'lastName', 'firstName', 'phone', 'cruise', 'cabinCategory', 'adults', 'children', 'cabinsRequested', 'createdAt'],
    description: 'Demandes de reservation envoyees depuis les fiches croisieres. Gerez le suivi client ici.',
    listSearchableFields: ['firstName', 'lastName', 'email', 'phone', 'cabinCategory'],
  },
  fields: [
    // ── Sidebar ──
    {
      name: 'status',
      type: 'select',
      defaultValue: 'nouveau',
      options: [
        { label: '🟡 Nouveau', value: 'nouveau' },
        { label: '🔵 Contacte', value: 'contacte' },
        { label: '🟢 Termine', value: 'termine' },
      ],
      label: 'Statut',
      admin: {
        position: 'sidebar',
        description: 'Mettez a jour le statut au fur et a mesure du traitement.',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Date de reception de la demande.',
      },
    },

    // ── Tabs ──
    {
      type: 'tabs',
      tabs: [
        // ─── Tab 1: Croisiere ───
        {
          label: 'Croisiere',
          description: 'Informations sur la croisiere et la cabine demandees.',
          fields: [
            {
              name: 'cruise',
              type: 'relationship',
              relationTo: 'cruises',
              required: true,
              label: 'Croisiere',
              admin: {
                description: 'Croisiere concernee par cette demande.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'cabinCategory',
                  type: 'text',
                  required: true,
                  label: 'Categorie de cabine',
                  admin: { width: '50%' },
                },
                {
                  name: 'cabinsRequested',
                  type: 'number',
                  defaultValue: 1,
                  min: 1,
                  max: 10,
                  label: 'Nb de cabines souhaitees',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'adults',
                  type: 'number',
                  required: true,
                  defaultValue: 2,
                  min: 1,
                  max: 20,
                  label: 'Adultes',
                  admin: { width: '33%' },
                },
                {
                  name: 'children',
                  type: 'number',
                  defaultValue: 0,
                  min: 0,
                  max: 10,
                  label: 'Enfants (-18 ans)',
                  admin: { width: '33%' },
                },
                {
                  name: 'childrenAges',
                  type: 'text',
                  label: 'Ages des enfants',
                  admin: {
                    width: '34%',
                    placeholder: 'ex: 8 ans, 12 ans',
                    condition: (_, siblingData) => (siblingData?.children ?? 0) > 0,
                  },
                },
              ],
            },
          ],
        },

        // ─── Tab 2: Client ───
        {
          label: 'Client',
          description: 'Coordonnees du demandeur.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'civility',
                  type: 'select',
                  options: [
                    { label: 'M.', value: 'M.' },
                    { label: 'Mme', value: 'Mme' },
                  ],
                  label: 'Civilite',
                  admin: { width: '15%' },
                },
                {
                  name: 'firstName',
                  type: 'text',
                  required: true,
                  label: 'Prenom',
                  admin: { width: '42.5%' },
                },
                {
                  name: 'lastName',
                  type: 'text',
                  required: true,
                  label: 'Nom',
                  admin: { width: '42.5%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  label: 'Email',
                  admin: { width: '50%' },
                },
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                  label: 'Telephone',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'address',
              type: 'text',
              label: 'Adresse',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'postalCode',
                  type: 'text',
                  label: 'Code postal',
                  admin: { width: '25%' },
                },
                {
                  name: 'city',
                  type: 'text',
                  label: 'Ville',
                  admin: { width: '45%' },
                },
                {
                  name: 'country',
                  type: 'text',
                  label: 'Pays',
                  defaultValue: 'France',
                  admin: { width: '30%' },
                },
              ],
            },
          ],
        },

        // ─── Tab 3: Message ───
        {
          label: 'Message',
          description: 'Demandes particulieres du client.',
          fields: [
            {
              name: 'message',
              type: 'textarea',
              label: 'Demandes particulieres',
              admin: {
                description: 'Regime alimentaire, accessibilite, occasion speciale, etc.',
              },
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
