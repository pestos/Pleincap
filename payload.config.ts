import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media],

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: process.env.NODE_ENV !== 'production',
  }),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  secret: process.env.PAYLOAD_SECRET!,

  onInit: async (payload) => {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })
    if (existingUsers.totalDocs === 0) {
      const { seed } = await import('./src/payload/seed')
      await seed(payload)
    }
  },
})
