import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Éditeur', value: 'editor' },
      ],
      access: {
        // Only admins can change roles
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
  access: {
    // Only admins can create users
    create: ({ req: { user } }) => user?.role === 'admin',
    // Users can read their own data, admins can read all
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
    // Users can update their own profile (but not role - field-level above), admins can update all
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => user?.role === 'admin',
    // Admin panel access: both admins and editors can log in
    admin: ({ req: { user } }) => !!user,
  },
}
