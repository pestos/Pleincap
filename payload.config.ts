import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { Cruises } from './src/payload/collections/Cruises'
import { Speakers } from './src/payload/collections/Speakers'
import { Team } from './src/payload/collections/Team'
import { Testimonials } from './src/payload/collections/Testimonials'
import { Destinations } from './src/payload/collections/Destinations'
import { Boats } from './src/payload/collections/Boats'
import { Trains } from './src/payload/collections/Trains'
import { Categories } from './src/payload/collections/Categories'
import { Tags } from './src/payload/collections/Tags'
import { Posts } from './src/payload/collections/Posts'
import { Banners } from './src/payload/collections/Banners'
import { Subscribers } from './src/payload/collections/Subscribers'
import { Campaigns } from './src/payload/collections/Campaigns'
import { CampaignSends } from './src/payload/collections/CampaignSends'
import { EmailAnalytics } from './src/payload/collections/EmailAnalytics'
import { Visioconferences } from './src/payload/collections/Visioconferences'
import { LiveRegistrations } from './src/payload/collections/LiveRegistrations'
import { ReservationRequests } from './src/payload/collections/ReservationRequests'
import { HomepageConfig } from './src/payload/globals/HomepageConfig'
import { LivreDOrConfig } from './src/payload/globals/LivreDOrConfig'
import { PagesConfig } from './src/payload/globals/PagesConfig'
import { sendCampaign } from './src/payload/jobs/sendCampaign'
import { sendLiveLink } from './src/payload/jobs/sendLiveLink'

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

  collections: [Users, Media, Cruises, Destinations, Boats, Trains, Speakers, Team, Posts, Categories, Tags, Testimonials, Banners, Subscribers, Campaigns, CampaignSends, EmailAnalytics, Visioconferences, LiveRegistrations, ReservationRequests],

  globals: [HomepageConfig, LivreDOrConfig, PagesConfig],

  editor: lexicalEditor({}),

  plugins: [
    seoPlugin({
      collections: ['cruises', 'posts', 'destinations', 'boats', 'trains'],
      tabbedUI: true,
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title || doc.name} | PleinCap Croisières`,
      generateDescription: ({ doc }) => {
        const text = doc.excerpt || ''
        return typeof text === 'string' ? text.substring(0, 160) : ''
      },
      generateURL: ({ doc }) => `https://plein-cap.com/${doc.slug || ''}`,
    }),
  ],

  sharp,

  jobs: {
    tasks: [sendCampaign, sendLiveLink],
  },

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
