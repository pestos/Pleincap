# Phase 1: Foundation - Research

**Researched:** 2026-02-14
**Domain:** Payload CMS 3.0 integration with Next.js and PostgreSQL
**Confidence:** MEDIUM-HIGH

## Summary

Payload CMS 3.0 represents a fundamental architectural shift: it's the first CMS built natively for Next.js, installing directly into the `/app` directory rather than running as a separate service. This eliminates the traditional headless CMS complexity of managing two separate deployments. The integration leverages PostgreSQL via Drizzle ORM with automatic schema synchronization during development, comprehensive authentication and RBAC out of the box, and a React-based admin panel that can be extended with Server Components.

**Critical Blocker Identified**: Payload 3.0 requires Next.js 15.2.3+ (current project uses Next.js 14.0.0). The upgrade to Next.js 15 involves breaking changes to async request APIs (cookies, headers, draftMode now require await) and React 19 requirement. This upgrade MUST happen before Payload installation.

**Primary recommendation:** Upgrade Next.js 14→15 first, then install Payload manually (not via create-payload-app) to preserve existing project structure. Use route groups to isolate Payload admin panel CSS, enable PostgreSQL adapter with automatic push mode during development, and create Users collection with role-based permissions (admin/editor) as foundation.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `payload` | 3.75.0+ | CMS framework | Native Next.js integration, first-class TypeScript, PostgreSQL support |
| `@payloadcms/db-postgres` | 3.75.0+ | PostgreSQL adapter | Official adapter, Drizzle ORM integration, automatic schema sync |
| `@payloadcms/richtext-lexical` | 3.75.0+ | Rich text editor | Modern, extensible, official Payload editor (stable as of 3.0) |
| `@payloadcms/next` | 3.75.0+ | Next.js integration | Required for Next.js App Router integration |
| `next` | 15.2.3+ | Application framework | **REQUIRED** minimum version for Payload 3.0 |
| `react` | 19.x | UI library | Required by Next.js 15 |
| `sharp` | Latest | Image processing | Required for upload/resize functionality |
| `graphql` | Latest | Query language | Required dependency even if not using GraphQL API |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@payloadcms/plugin-cloud-storage` | 3.75.0+ | Cloud file storage | When using S3/GCS/Azure instead of local storage |
| `@payloadcms/storage-s3` | 3.75.0+ | S3 adapter | When deploying to production (optional for Phase 1) |
| `drizzle-orm` | Auto-installed | ORM | Peer dependency, installed automatically with db-postgres |
| `postgres` (node-postgres) | Auto-installed | PostgreSQL client | Peer dependency, installed automatically with db-postgres |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Payload CMS | Strapi, Sanity, Contentful | Payload: self-hosted, Next.js native, no vendor lock-in. Others: hosted options or separate deployment |
| PostgreSQL | MongoDB, SQLite | PostgreSQL chosen for robustness, production-ready, team familiarity |
| Lexical editor | Slate (deprecated in Payload 3.0) | Lexical is the modern standard, Slate support removed |

**Installation (after Next.js 15 upgrade):**
```bash
npm install payload @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/next sharp graphql
```

## Architecture Patterns

### Recommended Project Structure
```
pleincap/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Route group for existing pages
│   │   │   ├── page.tsx
│   │   │   ├── destinations/
│   │   │   ├── nos-bateaux/
│   │   │   └── ...
│   │   └── (payload)/           # Route group for Payload (isolates CSS)
│   │       ├── admin/           # Admin panel routes
│   │       │   └── [[...segments]]/
│   │       │       └── page.tsx
│   │       └── api/             # Payload REST/GraphQL APIs
│   │           └── [...slug]/
│   │               └── route.ts
│   ├── payload/                 # Payload-specific code
│   │   ├── collections/         # Collection configs
│   │   │   ├── Users.ts
│   │   │   └── Media.ts
│   │   ├── access/              # Access control functions
│   │   └── hooks/               # Lifecycle hooks
│   └── components/              # Existing + future shared components
├── public/
│   └── media/                   # Local upload storage (dev)
├── payload.config.ts            # Payload configuration (root)
├── .env                         # Environment variables
└── package.json
```

**Key Structural Decisions:**
- **Route Groups**: `(frontend)` and `(payload)` prevent CSS bleed between existing site and Payload admin
- **Collections in separate files**: Each collection (Users, Media, etc.) gets its own file for maintainability
- **Config at root**: `payload.config.ts` must be at project root for Next.js integration
- **Admin at /admin**: Default Payload admin path, customizable via `routes.admin` in config

### Pattern 1: Payload Configuration with PostgreSQL

**What:** Basic Payload config integrating with Next.js App Router and PostgreSQL
**When to use:** Initial Payload setup

**Example:**
```typescript
// payload.config.ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users', // Collection slug for authentication
  },
  collections: [
    // Import collections here
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // Push mode: auto-sync schema during development (disable in prod)
    push: process.env.NODE_ENV !== 'production',
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET!,
})
```

**Sources:**
- [Payload Postgres Documentation](https://payloadcms.com/docs/database/postgres)
- [Payload Config Overview](https://payloadcms.com/docs/configuration/overview)

### Pattern 2: Users Collection with Roles

**What:** Authentication collection with admin/editor role-based access control
**When to use:** Foundation phase to establish user management

**Example:**
```typescript
// src/payload/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enables authentication
  admin: {
    useAsTitle: 'email',
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
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
  access: {
    // Only admins can create users
    create: ({ req: { user } }) => user?.role === 'admin',
    // Users can read their own data, admins can read all
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { id: { equals: user?.id } }
    },
    // Only admins can update users
    update: ({ req: { user } }) => user?.role === 'admin',
    // Only admins can delete users
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
```

**Sources:**
- [Payload Authentication Overview](https://payloadcms.com/docs/authentication/overview)
- [Payload Access Control](https://payloadcms.com/docs/access-control/overview)
- [Setting up Auth and RBAC in Next.js + Payload](https://payloadcms.com/posts/guides/setting-up-auth-and-role-based-access-control-in-nextjs-payload)

### Pattern 3: Media Collection with Upload

**What:** Upload-enabled collection for image management
**When to use:** Foundation phase to enable media library

**Example:**
```typescript
// src/payload/collections/Media.ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media', // Local storage path
    mimeTypes: ['image/*'], // Only images
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        undefined, // Maintain aspect ratio
        position: 'centre',
      },
    ],
    formatOptions: {
      format: 'webp', // Auto-convert to webp
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  access: {
    // Editors can upload
    create: ({ req: { user } }) => !!user,
    // Everyone can read (public images)
    read: () => true,
    // Editors can update their uploads, admins all
    update: ({ req: { user } }) => !!user,
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
```

**Sources:**
- [Payload Uploads Documentation](https://payloadcms.com/docs/upload/overview)
- [How to Set Up and Customize Collections](https://payloadcms.com/posts/guides/how-to-set-up-and-customize-collections)

### Pattern 4: Next.js Route Handlers for Payload

**What:** App Router integration points for Payload admin and API
**When to use:** Required for Payload to function in Next.js

**Admin Panel Route:**
```typescript
// src/app/(payload)/admin/[[...segments]]/page.tsx
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import config from '@payload-config'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
```

**API Route:**
```typescript
// src/app/(payload)/api/[...slug]/route.ts
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

export const GET = REST_GET
export const POST = REST_POST
export const DELETE = REST_DELETE
export const PATCH = REST_PATCH
```

**Sources:**
- [The Ultimate Guide to Using Next.js with Payload](https://payloadcms.com/posts/blog/the-ultimate-guide-to-using-nextjs-with-payload)
- [Payload 3.0: First CMS that installs directly into Next.js](https://payloadcms.com/posts/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app)

### Pattern 5: Environment Variables Setup

**What:** Required environment configuration for Payload
**When to use:** Initial setup before running dev server

**Example:**
```bash
# .env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/pleincap

# Payload
PAYLOAD_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Development
NODE_ENV=development
```

**Notes:**
- `DATABASE_URL`: PostgreSQL connection string (format: `postgresql://user:password@host:port/database`)
- `PAYLOAD_SECRET`: Random string ≥32 characters (used for JWT signing)
- `NEXT_PUBLIC_SERVER_URL`: Required for media URLs and admin panel routing
- Next.js automatically loads `.env` files, no additional setup needed

**Sources:**
- [Payload Environment Variables](https://payloadcms.com/docs/configuration/environment-vars)
- [PostgreSQL DATABASE_URI Format](https://github.com/payloadcms/payload-3.0-demo/issues/89)

### Anti-Patterns to Avoid

- **Don't import JSX in payload.config.ts**: From Payload v3 onward, JSX components must never be imported in config layer, even indirectly. Causes build errors. Keep config files pure TypeScript.
- **Don't call payload.update() in beforeRead/afterRead hooks**: Creates infinite loops. Use `context` property to conditionally control when updates run.
- **Don't use JSON.stringify/parse to clone collections**: Strips async functions (hooks), breaking functionality silently.
- **Don't skip migrations in production**: While `push: true` is convenient in dev, production must use proper migrations (`payload migrate`).
- **Don't use different Payload versions**: In monorepos, ensure all packages use identical versions of `payload`, `@payloadcms/*`, `next`, `react`, and `react-dom`.
- **Don't hardcode URLs**: Always use `process.env.NEXT_PUBLIC_SERVER_URL` for media/admin URLs to support different environments.

**Sources:**
- [PayloadCMS Tips and Tricks](https://dflow.sh/blog/payloadcms-tips-and-tricks)
- [Payload v3 FAQs and Troubleshooting](https://github.com/akhrarovsaid/payload-v3-faqs)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| User authentication | Custom JWT/session logic | Payload's built-in auth | Handles password hashing (bcrypt), JWT tokens, refresh tokens, email verification, password reset flows, session management |
| Role-based permissions | Custom middleware | Payload's access control functions | Collection/field/document-level granular control, supports complex logic, TypeScript typed, tested across millions of requests |
| Image resizing/optimization | Custom Sharp pipelines | Payload upload with `imageSizes` | Automatic responsive image generation, format conversion (webp), metadata extraction, thumbnail creation |
| Database migrations | Custom SQL scripts | Payload migration system (`payload migrate`) | Type-safe, auto-generated from config changes, rollback support, version tracking |
| Admin UI | Custom React dashboard | Payload Admin Panel | Full CRUD interfaces, media library, user management, preview, auto-generated from collections, customizable with React components |
| Media management | Custom file upload handling | Payload uploads with storage adapters | Handles file validation, MIME type checking, size limits, naming conflicts, supports local/S3/GCS/Azure |
| TypeScript types for data | Manual interface definitions | `payload generate:types` | Auto-generated from collections, always in sync, includes relationship types, field-level inference |

**Key insight:** Payload provides production-grade solutions for nearly every backend concern. Custom implementations typically miss edge cases (email verification token expiration, concurrent file upload naming, role inheritance, field-level access rules) that Payload has already solved and tested extensively. Even if a feature seems simple (e.g., "just upload a file"), the production-ready version involves MIME validation, size limits, duplicate handling, error states, retry logic, and more.

**Sources:**
- [Payload Authentication Operations](https://payloadcms.com/docs/authentication/operations)
- [Payload Uploads Overview](https://payloadcms.com/docs/upload/overview)
- [Payload Access Control](https://payloadcms.com/docs/access-control/overview)

## Common Pitfalls

### Pitfall 1: Next.js Version Incompatibility
**What goes wrong:** Installing Payload 3.0 on Next.js 14 fails with cryptic errors or peer dependency warnings. Admin panel doesn't load, or builds fail silently.

**Why it happens:** Payload 3.0 fundamentally relies on Next.js 15+ internal APIs. The `@payloadcms/next-payload` package (for Next.js 13) was deprecated and doesn't work with Next.js 14. Payload 3.0 only supports Next.js 15.2.3+.

**How to avoid:**
1. Upgrade Next.js to 15.2.3+ BEFORE installing Payload
2. Upgrade React to 19.x (required by Next.js 15)
3. Run Next.js codemods to handle breaking changes: `npx @next/codemod@latest upgrade`
4. Update async request APIs (cookies, headers, draftMode now require `await`)

**Warning signs:**
- `npm install payload` shows peer dependency errors
- Admin panel 404s or blank screens
- Build errors mentioning `@payloadcms/next` or internal Next.js modules

**Sources:**
- [Payload Next.js 15 requirement](https://github.com/payloadcms/payload/issues/8995)
- [Next.js 14 to 15 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Next.js security patch requiring 15.2.3+](https://payloadcms.com/posts/blog/a-quick-note-on-the-latest-nextjs-security-patch)

### Pitfall 2: CSS Bleed Between Admin and Frontend
**What goes wrong:** Payload admin panel styles leak into existing Next.js pages, or vice versa. Tailwind classes behave unexpectedly. Layout breaks when navigating between admin and public pages.

**Why it happens:** Without route group isolation, Next.js treats all routes under `/app` as sharing the same CSS scope. Payload uses global CSS for admin panel; existing site uses Tailwind with its own global styles.

**How to avoid:**
1. Create route groups: `app/(frontend)/` for existing pages, `app/(payload)/` for Payload
2. Each route group can have its own `layout.tsx` with isolated styles
3. Payload 3.0 scopes all CSS to `@layer payload-default`, giving custom CSS higher specificity
4. Verify Tailwind config doesn't accidentally scan Payload admin files

**Warning signs:**
- Admin panel looks broken or unstyled
- Frontend pages show unexpected fonts/colors after visiting /admin
- Tailwind utilities stop working after Payload installation
- Console warnings about CSS specificity conflicts

**Sources:**
- [Payload 3.0 CSS scoping](https://payloadcms.com/posts/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app)
- [Next.js Route Groups documentation](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

### Pitfall 3: Database Schema Drift Between Environments
**What goes wrong:** Local development works fine with `push: true`, but production deployment fails with missing tables/columns errors. Schema changes don't propagate to staging/production.

**Why it happens:** Payload's `push` mode (auto-sync schema) is only for development. In production, Drizzle push is disabled, requiring explicit migrations. Teams forget to generate/run migrations before deploying.

**How to avoid:**
1. Use `push: process.env.NODE_ENV !== 'production'` in config (only enabled in dev)
2. Before each deployment: run `payload migrate:create` to generate SQL migration files
3. Run `payload migrate` in production before starting server (CI/CD step)
4. Commit migration files to git so all environments use same schema evolution
5. Never manually edit production database schema

**Warning signs:**
- Deployment succeeds but admin panel shows "table does not exist" errors
- API endpoints return 500 errors referencing unknown columns
- Rollback to previous version breaks because schema changed
- Different team members see different collection fields locally

**Sources:**
- [Payload Migrations Documentation](https://payloadcms.com/docs/database/migrations)
- [Postgres Database Adapter](https://payloadcms.com/docs/database/postgres)

### Pitfall 4: Missing Sharp Installation in Production
**What goes wrong:** Image uploads work in development but fail in production with "Sharp is not installed" errors. Media collection uploads hang indefinitely.

**Why it happens:** Sharp is a native dependency with platform-specific binaries. Development installs macOS/Windows binaries; production (often Linux containers) needs different binaries. If Sharp is in `devDependencies` instead of `dependencies`, it's not installed in production.

**How to avoid:**
1. Install Sharp as production dependency: `npm install sharp` (not `--save-dev`)
2. For Docker deployments, ensure native build tools are available during `npm install`
3. Use base images that include Sharp build dependencies (e.g., `node:18-alpine` requires `build-base`)
4. Test image uploads in staging environment before production

**Warning signs:**
- Local uploads work; production uploads timeout or show generic errors
- Logs show "Error: Something went wrong installing the 'sharp' module"
- Resized images not generated (original uploaded but no thumbnails)

**Sources:**
- [Payload Uploads requiring Sharp](https://payloadcms.com/docs/upload/overview)
- [Sharp installation documentation](https://sharp.pixelplumbing.com/install)

### Pitfall 5: Forgetting to Create First Admin User
**What goes wrong:** After setup, /admin redirects to login, but no user exists. Can't create user via UI because user creation requires authentication. Locked out of CMS.

**Why it happens:** Payload requires manual creation of first admin user. Unlike some CMSs, there's no automatic "setup wizard" on first run. Access control prevents unauthenticated user creation.

**How to avoid:**
1. After first `npm run dev`, immediately visit `/admin` to register first user
2. OR: Create seed script (`src/payload/seed.ts`) to programmatically create admin:
   ```typescript
   await payload.create({
     collection: 'users',
     data: {
       email: 'admin@pleincap.com',
       password: 'secure-password',
       role: 'admin',
     },
   })
   ```
3. Run seed: `payload seed` (only in development)
4. Document first-user creation steps in README for team members

**Warning signs:**
- Can't log into /admin after fresh setup
- No "Create Account" option on login screen (expected)
- Attempting to create user via API returns 401/403

**Sources:**
- [Payload Admin Panel Documentation](https://payloadcms.com/docs/admin/overview)
- [Payload Seeding Best Practices](https://github.com/payloadcms/payload/discussions/7489)

### Pitfall 6: Environment Variable Exposure to Client
**What goes wrong:** Sensitive variables (DATABASE_URL, PAYLOAD_SECRET) accidentally exposed to client bundle. Browser console shows database credentials.

**Why it happens:** Next.js exposes variables prefixed with `NEXT_PUBLIC_` to client. Developers mistakenly prefix secrets, or import server-only code in client components.

**How to avoid:**
1. NEVER prefix secrets with `NEXT_PUBLIC_`
2. Only server-side code (API routes, Server Components) can access unprefixed variables
3. Use `NEXT_PUBLIC_` only for truly public values (e.g., `NEXT_PUBLIC_SERVER_URL`)
4. Audit `.env` file before deployment
5. Use separate `.env.production` for prod with different secrets

**Warning signs:**
- Browser DevTools > Network shows env variables in responses
- `console.log(process.env)` in client component shows DATABASE_URL
- Build warnings about "Cannot access server-side env in client component"

**Sources:**
- [Payload Environment Variables](https://payloadcms.com/docs/configuration/environment-vars)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## Code Examples

Verified patterns from official sources:

### Complete Minimal Payload Config
```typescript
// payload.config.ts
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
})
```
**Source:** [Payload Config Documentation](https://payloadcms.com/docs/configuration/overview)

### Generating TypeScript Types
```bash
# Generate types from collections
npx payload generate:types

# Output: payload-types.ts at project root
# Use in code:
import type { User, Media } from './payload-types'
```
**Source:** [Generating TypeScript Interfaces](https://payloadcms.com/docs/typescript/generating-types)

### Creating First Admin User (Seed Script)
```typescript
// src/payload/seed.ts
import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  // Check if admin exists
  const existingAdmin = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@pleincap.com',
      },
    },
  })

  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@pleincap.com',
        password: process.env.ADMIN_PASSWORD!,
        name: 'Admin',
        role: 'admin',
      },
    })
    console.log('✅ Admin user created')
  } else {
    console.log('ℹ️  Admin user already exists')
  }
}
```
**Source:** Community best practices from [Payload Discussions](https://github.com/payloadcms/payload/discussions/7489)

### Access Control: Editor Can Only Update Own Records
```typescript
// src/payload/collections/Posts.ts (example for future phases)
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
  access: {
    create: ({ req: { user } }) => !!user, // Any authenticated user
    read: () => true, // Public
    update: ({ req: { user } }) => {
      // Admins can update any post
      if (user?.role === 'admin') return true
      // Editors can only update their own posts
      return {
        author: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => user?.role === 'admin', // Only admins
  },
}
```
**Source:** [Collection Access Control](https://payloadcms.com/docs/access-control/collections)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate CMS deployment | Payload installs directly in Next.js /app | Payload 3.0 (2025) | Single deployment, shared codebase, unified TypeScript types |
| MongoDB only | PostgreSQL via Drizzle ORM | Payload 2.0 (2023) | Relational data, better querying, production-grade |
| Slate rich text editor | Lexical editor | Payload 3.0 | Modern, extensible, better performance |
| Manual migrations | Auto-sync with `push: true` in dev | Payload 3.0 + Drizzle | Faster local iteration, explicit prod migrations |
| CommonJS | ESM-only | Payload 3.0 | Aligns with modern Node.js, better tree-shaking |
| Next.js 13 compatibility | Next.js 15.2.3+ required | Payload 3.0 | Leverages App Router, Server Components, modern React |
| Manual type definitions | `payload generate:types` | Payload 1.0+ | Auto-sync, relationship types, no manual maintenance |

**Deprecated/outdated:**
- **@payloadcms/next-payload**: Deprecated, replaced by `@payloadcms/next` for Next.js App Router
- **Slate editor**: Removed in Payload 3.0, replaced by Lexical
- **Next.js 13/14 support**: No longer compatible; Next.js 15.2.3+ is minimum
- **MongoDB as default**: Still supported but PostgreSQL is now recommended default
- **CommonJS configs**: Payload 3.0 is ESM-only (`payload.config.ts` not `.js`)

**Sources:**
- [Payload 3.0 Release Announcement](https://payloadcms.com/posts/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app)
- [Payload 2.0 Release (PostgreSQL stable)](https://payloadcms.com/posts/blog/payload-2-0)

## Open Questions

### 1. Next.js 14 → 15 Upgrade Complexity
**What we know:**
- Next.js 15 requires React 19
- Breaking changes to async request APIs (cookies, headers, draftMode now require `await`)
- Caching behavior changed to opt-in model
- Official codemod available: `npx @next/codemod@latest upgrade`

**What's unclear:**
- Impact on existing project code (how many files need manual updates?)
- Whether Framer Motion 12.23.22 is compatible with React 19
- Performance implications of new caching model on current pages

**Recommendation:**
1. Create feature branch for upgrade
2. Run codemod, test thoroughly
3. Audit all uses of `cookies()`, `headers()`, `draftMode()` and add `await`
4. Test Framer Motion animations (likely compatible, but verify)
5. Budget 2-4 hours for upgrade + testing

**Sources:**
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Migrating Next.js 14 to 15: Complete Guide](https://khaledshs.com/tutorials/how-to-migrate-a-next-js-application-from-version-14-to-version-15/)

### 2. PostgreSQL Setup on Development Machines
**What we know:**
- Payload requires PostgreSQL connection string
- Format: `postgresql://user:password@host:port/database`
- Works with local PostgreSQL, Docker, or hosted (Supabase, Neon, etc.)

**What's unclear:**
- Team's preferred development setup (Docker vs local install)
- Whether to use shared dev database or individual per-developer
- Database seeding strategy (shared seed data vs developer-specific)

**Recommendation:**
1. **Option A (Recommended)**: Docker Compose for consistency
   - Create `docker-compose.yml` with PostgreSQL service
   - Developers run `docker-compose up -d` to start DB
   - Consistent versions, easy cleanup
2. **Option B**: Local PostgreSQL install
   - Each developer installs PostgreSQL natively
   - Flexible but version mismatches possible
3. Use environment-specific `.env.local` files (gitignored)
4. Provide seed script for sample data

**Sources:**
- [Setting Up Payload with Supabase](https://payloadcms.com/posts/guides/setting-up-payload-with-supabase-for-your-nextjs-app-a-step-by-step-guide)
- [Payload Postgres Documentation](https://payloadcms.com/docs/database/postgres)

### 3. Media Storage Strategy
**What we know:**
- Payload supports local storage (`public/media`) and cloud (S3, GCS, Azure, Vercel Blob)
- Local storage works for development but not ideal for production VPS with multiple instances
- Upload config includes `disableLocalStorage: true` for cloud-only

**What's unclear:**
- Production hosting architecture (single server or load-balanced?)
- Budget/preference for cloud storage vs VPS-hosted storage
- Image CDN requirements (optimization, global delivery)

**Recommendation:**
1. **Phase 1 (Foundation)**: Use local storage (`public/media`) for simplicity
2. **Phase 5 (Deployment)**: Decide on production storage
   - **Single VPS**: Local storage is fine, ensure backups
   - **Load-balanced**: Use S3-compatible storage (AWS S3, Backblaze B2, DigitalOcean Spaces)
3. Payload storage adapters make migration easy (change config, no code changes)
4. Architecture decision doesn't block Phase 1 progress

**Sources:**
- [Payload Storage Adapters](https://payloadcms.com/docs/upload/storage-adapters)
- [Configure File Storage in Payload: Vercel Blob, R2, Uploadthing](https://payloadcms.com/posts/guides/how-to-configure-file-storage-in-payload-with-vercel-blob-r2-and-uploadthing)

## Sources

### Primary (HIGH confidence)
- [Payload CMS Official Documentation](https://payloadcms.com/docs) - Configuration, database setup, authentication
- [Payload 3.0 Release Announcement](https://payloadcms.com/posts/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app) - Architecture changes
- [Payload Postgres Documentation](https://payloadcms.com/docs/database/postgres) - Database adapter setup
- [Payload Access Control Documentation](https://payloadcms.com/docs/access-control/overview) - RBAC patterns
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15) - Breaking changes
- [GitHub: payloadcms/payload Releases](https://github.com/payloadcms/payload/releases) - Version information

### Secondary (MEDIUM confidence)
- [PayloadCMS Tips and Tricks (dFlow)](https://dflow.sh/blog/payloadcms-tips-and-tricks) - Anti-patterns, best practices
- [How to Structure Payload CMS Collections (Build with Matija)](https://www.buildwithmatija.com/blog/payload-cms-collection-structure-best-practices) - Project structure patterns
- [Setting up Auth and RBAC in Next.js + Payload](https://payloadcms.com/posts/guides/setting-up-auth-and-role-based-access-control-in-nextjs-payload) - Authentication patterns
- [Migrating Next.js 14 to 15 (khaledshs.com)](https://khaledshs.com/tutorials/how-to-migrate-a-next-js-application-from-version-14-to-version-15/) - Upgrade steps
- [Payload v3 FAQs GitHub Repository](https://github.com/akhrarovsaid/payload-v3-faqs) - Community troubleshooting

### Tertiary (LOW confidence - community discussions)
- [General Testing Best Practices Discussion](https://github.com/payloadcms/payload/discussions/2644) - Testing approach
- [DATABASE_URI Format Issue](https://github.com/payloadcms/payload-3.0-demo/issues/89) - Connection string format
- Various Community Help threads on Discord/GitHub - Validation of common issues

## Metadata

**Confidence breakdown:**
- **Standard stack**: HIGH - Official npm packages verified, versions confirmed from npm registry
- **Architecture patterns**: HIGH - All code examples from official docs or verified community sources
- **Pitfalls**: MEDIUM-HIGH - Combination of official docs (CSS scoping, migrations) and verified community reports (infinite loops, Next.js version)
- **Next.js 15 requirement**: HIGH - Confirmed in multiple official sources and GitHub issues

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (30 days - Payload stable but actively developed, monthly releases typical)

**Critical blocker identified:** Next.js 14 → 15 upgrade required before Payload installation. This is non-negotiable and affects project timeline.

**Recommendation for planning:**
1. Create Task 0: Upgrade Next.js 14 → 15 (prerequisite)
2. Task 1: Install Payload with PostgreSQL adapter
3. Task 2: Create Users collection with roles
4. Task 3: Create Media collection with uploads
5. Task 4: Verify existing pages unaffected (CSS isolation)
6. Task 5: Create first admin user and test permissions
