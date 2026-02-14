# Technology Stack - Payload CMS Integration

**Project:** PleinCap CMS Backoffice
**Researched:** 2026-02-14
**Confidence:** MEDIUM (based on training data from January 2025, unable to verify with current docs)

## Executive Summary

This stack integrates Payload CMS 3.0 into the existing Next.js 14 application, adding a self-hosted backoffice with PostgreSQL, comprehensive content management, and an advanced newsletter system. All recommendations prioritize the self-hosted VPS deployment model and ~20K monthly email volume.

**Key Decisions:**
- **Payload CMS 3.0** with same-codebase integration (not separate service)
- **PostgreSQL 15+** via native Payload adapter (Drizzle is built-in)
- **Nodemailer** for transactional emails + **Resend** for newsletter delivery
- **Payload's built-in features** for content, auth, media, avoiding unnecessary third-party dependencies

---

## Recommended Stack

### Core CMS Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Payload CMS** | `^3.0.0` | Headless CMS + Admin UI | Best-in-class TypeScript CMS with native Next.js integration, built-in auth/roles, and PostgreSQL support via Drizzle ORM (no manual ORM setup needed) |
| **Next.js** | `14.x.x` (existing) | Framework | Already in use; Payload 3.0 integrates seamlessly via `@payloadcms/next` package |

**Rationale:** Payload 3.0 ships with Drizzle ORM built-in for PostgreSQL. You don't need to separately install or configure Drizzle - Payload's database adapter handles schema generation, migrations, and queries. This eliminates the "double ORM" complexity common in older CMS integrations.

**Installation:**
```bash
npm install payload@beta @payloadcms/next@beta @payloadcms/db-postgres@beta @payloadcms/richtext-lexical@beta
```

**Confidence:** MEDIUM (Payload 3.0 was in beta as of January 2025; verify current stable release)

---

### Database Layer

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **PostgreSQL** | `15+` | Primary database | Production-ready, robust JSONB support for flexible content, excellent full-text search, self-hostable |
| **Payload PostgreSQL Adapter** | `@payloadcms/db-postgres@beta` | Database adapter | Official Payload adapter with Drizzle ORM integrated; handles migrations, relationships, and schema sync automatically |
| **pg** | `^8.11.x` | Node.js PostgreSQL client | Low-level driver used by Payload adapter |

**NOT recommended:**
- **Separate Drizzle installation:** Payload 3.0 bundles Drizzle; installing it separately creates version conflicts
- **Prisma:** Incompatible with Payload's architecture
- **MongoDB:** Weak transaction support for complex newsletter operations

**Rationale:** Payload 3.0's PostgreSQL adapter uses Drizzle under the hood but exposes a unified API. You configure the database connection in `payload.config.ts` and Payload handles all ORM concerns:

```typescript
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  // ...
})
```

**Confidence:** MEDIUM (Architecture correct as of January 2025; verify adapter package name)

---

### Newsletter & Email Infrastructure

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **@payloadcms/plugin-email** | `^3.0.0` | Email integration | Official Payload plugin for transactional emails |
| **Nodemailer** | `^6.9.x` | Email transport | Zero-cost SMTP relay for transactional emails (password resets, notifications) |
| **Resend** | SDK `^2.x` | Newsletter delivery | Modern ESP with 3,000 emails/month free tier, excellent deliverability, simple API, far better than SMTP for bulk sends |
| **@payloadcms/plugin-cloud-storage** | `^3.0.0` (optional) | Email attachment storage | For newsletter media assets; works with local filesystem or S3-compatible storage |

**Email Volume Strategy (20K/month):**
- **Transactional (< 1K/month):** Nodemailer via VPS SMTP (free)
- **Newsletters (15-20K/month):** Resend ($10/month for 10K, $20/month for 50K) or Mailgun ($15/month for 10K)

**NOT recommended:**
- **SendGrid:** Pricing jump from free (100/day) to $20/month (50K) is unfavorable for 20K volume
- **SES:** Complex setup, requires verified domain + IP reputation management
- **Self-hosted SMTP only:** High spam risk, no analytics, deliverability issues

**Rationale:** Separate transactional (low-volume, critical) from marketing (high-volume, analytics-heavy). Resend provides click/open tracking, unsubscribe handling, and bounce management without complex infrastructure.

**Confidence:** HIGH (Email service pricing/features stable)

---

### Newsletter System Components

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **React Email** | `^2.0.x` | Email template components | Build newsletter templates as React components; Payload can render to HTML via `@react-email/render` |
| **@react-email/components** | `^0.0.x` | Pre-built email components | Button, Section, Row, Column primitives optimized for email clients |
| **node-cron** | `^3.0.x` | Scheduled sends | Trigger automated newsletter campaigns (e.g., weekly digest) |
| **Custom Payload Collections** | Built-in | Newsletter data models | See Collections section below |

**Architecture:**
1. **Collections:** `newsletters`, `newsletter-subscribers`, `newsletter-campaigns`, `newsletter-sends` (tracking)
2. **Templates:** React Email components stored in `/email-templates/`
3. **Segmentation:** Query subscribers via Payload's `where` API (e.g., `interests: { contains: 'cruises' }`)
4. **Analytics:** Track opens (1x1 pixel), clicks (redirect links), unsubscribes in `newsletter-sends` collection

**Confidence:** MEDIUM (React Email standard; integration pattern from training data)

---

### Authentication & Authorization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Payload Auth (built-in)** | `3.0.0` | User authentication | JWT-based auth with email/password, built into Payload; no external service needed |
| **Payload Access Control** | `3.0.0` | Role-based permissions | Declarative access control per collection/field; supports `admin`, `editor`, `public` roles |

**NOT recommended:**
- **NextAuth.js:** Redundant with Payload's auth system; creates dual-auth complexity
- **Clerk/Auth0:** Unnecessary cost ($25-100/month) when Payload auth is free and integrated

**Configuration example:**
```typescript
// payload.config.ts
export default buildConfig({
  admin: {
    user: 'users', // Collection for admin users
  },
  collections: [
    {
      slug: 'users',
      auth: true, // Enable authentication
      access: {
        create: ({ req }) => req.user?.role === 'admin',
        read: () => true,
        update: ({ req, id }) => req.user?.id === id || req.user?.role === 'admin',
      },
    },
  ],
})
```

**Confidence:** HIGH (Core Payload feature)

---

### Media & File Handling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Payload Upload Collections** | Built-in | Image/file management | Native upload handling with automatic resizing, format conversion |
| **Sharp** | `^0.33.x` | Image processing | Industry-standard image library (used by Payload under the hood) |
| **@payloadcms/plugin-cloud-storage** | `^3.0.0` (optional) | S3-compatible storage | For VPS with limited disk; supports Backblaze B2 ($5/TB), Cloudflare R2 (free 10GB) |

**Storage Strategy (VPS):**
- **Development:** Local filesystem (`/public/media/`)
- **Production:** Local filesystem with backup to S3-compatible service, OR direct S3 storage if disk constrained

**NOT recommended:**
- **Cloudinary/Imgix:** $89-249/month unnecessary when Sharp + local storage works for travel site traffic

**Confidence:** HIGH (Payload's upload system well-documented)

---

### Content Collections (Payload Schema)

All content types managed via Payload collections. No manual database schemas needed.

| Collection Slug | Purpose | Key Fields |
|----------------|---------|------------|
| `cruises` | Cruise listings | `title`, `destination` (relationship), `boat` (relationship), `dates`, `price`, `description`, `gallery`, `itinerary` (rich text) |
| `destinations` | Destinations | `name`, `slug`, `hero_image`, `description`, `cruises` (relationship, reverse) |
| `boats` | Fleet | `name`, `capacity`, `cabins`, `specifications`, `gallery` |
| `speakers` | Conference speakers | `name`, `bio`, `photo`, `expertise` |
| `team` | Team members | `name`, `role`, `bio`, `photo` |
| `blog` | Blog posts | `title`, `slug`, `content` (rich text), `author`, `published_date`, `category` |
| `testimonials` | Customer reviews | `customer_name`, `cruise` (relationship), `rating`, `content`, `photo` |
| `banners` | Homepage banners | `title`, `image`, `cta_text`, `cta_link`, `display_order` |
| `newsletter-subscribers` | Email list | `email`, `first_name`, `segments` (array), `preferences`, `subscribed_at`, `status` (active/unsubscribed) |
| `newsletter-campaigns` | Campaigns | `name`, `subject`, `template` (relationship), `segment_filter`, `scheduled_at`, `status` (draft/scheduled/sent) |
| `newsletter-sends` | Send tracking | `campaign` (relationship), `subscriber` (relationship), `sent_at`, `opened_at`, `clicked_at`, `bounce_type` |

**Rich Text Editor:**
```typescript
// Use Lexical (Payload 3.0 default)
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  editor: lexicalEditor({}),
})
```

**Confidence:** HIGH (Standard Payload collection patterns)

---

### Development Tools

| Tool | Version | Purpose | Why |
|------|---------|---------|-----|
| **TypeScript** | `^5.x` (existing) | Type safety | Payload generates TypeScript types from collections automatically |
| **ESLint** | `^8.x` (existing) | Linting | Maintain existing config |
| **Payload CLI** | Built-in | Migrations, seed data | `npx payload migrate:create`, `npx payload generate:types` |

**Confidence:** HIGH

---

## Deployment Configuration (VPS)

| Component | Technology | Notes |
|-----------|-----------|-------|
| **Process Manager** | PM2 | `pm2 start npm --name "pleincap" -- start` |
| **Reverse Proxy** | Nginx | Proxy `/admin` to Payload, rest to Next.js (same server) |
| **SSL** | Certbot (Let's Encrypt) | Free, auto-renewing |
| **Database Backups** | pg_dump + cron | Daily backups to off-server storage |
| **Environment Variables** | `.env` | `DATABASE_URI`, `PAYLOAD_SECRET`, `RESEND_API_KEY`, `SMTP_*` |

**Example nginx config:**
```nginx
location / {
  proxy_pass http://localhost:3000;
}

location /admin {
  proxy_pass http://localhost:3000/admin;
}
```

**Confidence:** HIGH (Standard VPS deployment)

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| **CMS** | Payload 3.0 | Strapi 4 | Weaker TypeScript support, separate server required, no built-in Drizzle integration |
| **CMS** | Payload 3.0 | Keystonejs | Smaller ecosystem, less active development |
| **CMS** | Payload 3.0 | Sanity | Hosted-only, per-user pricing prohibitive for team growth |
| **Database** | PostgreSQL | MySQL | Inferior JSONB support for flexible content structures |
| **Email (Newsletter)** | Resend | SendGrid | Worse pricing at 20K/month tier, outdated API |
| **Email (Newsletter)** | Resend | SES | Complex setup, IP reputation management burden |
| **ORM** | Payload's built-in Drizzle | Standalone Drizzle | Payload 3.0 bundles Drizzle; separate installation causes conflicts |
| **Auth** | Payload Auth | NextAuth | Dual-auth complexity, Payload auth covers all needs |
| **Rich Text** | Lexical | Slate | Lexical is Payload 3.0 default, better maintained |

---

## Installation Summary

```bash
# Core CMS
npm install payload@beta @payloadcms/next@beta @payloadcms/db-postgres@beta @payloadcms/richtext-lexical@beta

# Database client (required by Payload adapter)
npm install pg

# Email
npm install nodemailer resend
npm install --save-dev @types/nodemailer

# Newsletter templates
npm install react-email @react-email/components @react-email/render

# Scheduling (for automated campaigns)
npm install node-cron
npm install --save-dev @types/node-cron

# Media (Sharp likely already installed by Next.js)
npm install sharp

# Optional: Cloud storage for media
npm install @payloadcms/plugin-cloud-storage
```

**Post-install:**
1. Initialize Payload: `npx create-payload-app@beta` (use existing Next.js app option)
2. Generate types: `npx payload generate:types`
3. Run migrations: `npx payload migrate`

---

## Version Compatibility Matrix

| Payload | Next.js | Node.js | PostgreSQL | React |
|---------|---------|---------|------------|-------|
| 3.0.x | 14.x - 15.x | 18.17+ | 13+ | 18+ |

**Confidence:** MEDIUM (Payload 3.0 compatibility from beta docs)

---

## Environment Variables Required

```env
# Database
DATABASE_URI=postgresql://user:password@localhost:5432/pleincap

# Payload
PAYLOAD_SECRET=your-secret-key-min-32-chars
PAYLOAD_PUBLIC_SERVER_URL=https://pleincap.com

# Email - Transactional (Nodemailer SMTP)
SMTP_HOST=smtp.yourserver.com
SMTP_PORT=587
SMTP_USER=no-reply@pleincap.com
SMTP_PASSWORD=your-password

# Email - Newsletter (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Optional: Cloud storage
S3_ENDPOINT=https://s3.region.backblazeb2.com
S3_BUCKET=pleincap-media
S3_ACCESS_KEY_ID=xxx
S3_SECRET_ACCESS_KEY=xxx
```

---

## Migration Strategy from Hardcoded Content

Payload provides seeding utilities for initial data import:

1. **Create seed script** (`/payload/seed.ts`):
   ```typescript
   import { getPayload } from 'payload'

   export async function seed() {
     const payload = await getPayload({ config })

     // Import existing TypeScript data
     const cruises = await import('../data/cruises')

     for (const cruise of cruises) {
       await payload.create({
         collection: 'cruises',
         data: cruise,
       })
     }
   }
   ```

2. **Run seed**: `npx tsx payload/seed.ts`

3. **Gradual migration:** Replace hardcoded components with Payload queries collection-by-collection

**Confidence:** MEDIUM (Standard Payload pattern)

---

## Cost Breakdown (Monthly, 20K emails)

| Service | Cost | Notes |
|---------|------|-------|
| VPS (Hetzner CX21) | €5.39 | 2 vCPU, 4GB RAM, 40GB SSD |
| PostgreSQL | €0 | Self-hosted on VPS |
| Payload CMS | €0 | Open source, self-hosted |
| Domain + SSL | €0-2 | Let's Encrypt SSL free |
| Email (Resend) | $10-20 | 10K-50K emails/month tiers |
| Backups (Backblaze B2) | €1-3 | 50GB storage |
| **Total** | **€16-30/month** | (~$17-32/month) |

**Confidence:** HIGH (Pricing from January 2025)

---

## Critical Dependencies to Pin

Pin these to avoid breaking changes:

```json
{
  "dependencies": {
    "payload": "3.0.0",
    "@payloadcms/next": "3.0.0",
    "@payloadcms/db-postgres": "3.0.0",
    "@payloadcms/richtext-lexical": "3.0.0",
    "pg": "8.11.5",
    "resend": "2.1.0"
  }
}
```

Update only after reviewing Payload 3.x changelogs.

**Confidence:** HIGH

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|-----------|--------|
| **Payload 3.0 architecture** | MEDIUM | Training data from January 2025 when Payload 3.0 was in beta; stable release may have API changes |
| **PostgreSQL + Drizzle integration** | MEDIUM | Payload 3.0 architecture correct, but unable to verify current adapter package names |
| **Email service recommendations** | HIGH | Resend/Mailgun pricing and features stable |
| **Newsletter architecture** | HIGH | Standard Payload collection patterns |
| **Deployment strategy** | HIGH | VPS deployment well-established |
| **Next.js 14 compatibility** | MEDIUM | Payload 3.0 Next.js integration documented in beta, likely stable now |

---

## Research Limitations

**Unable to verify:**
1. Payload 3.0 stable release version (was beta in January 2025)
2. Current `@payloadcms/*` package names and versions
3. Drizzle adapter implementation details in Payload 3.0
4. Breaking changes between Payload beta and stable

**Recommended validation:**
- Check [https://payloadcms.com/docs](https://payloadcms.com/docs) for current 3.x installation guide
- Verify `@payloadcms/db-postgres` package exists and is stable
- Review Payload 3.0 changelog for Next.js 14/15 compatibility

---

## Next Steps for Roadmap

**Phase 1 - Foundation:**
- Install Payload 3.0 + PostgreSQL adapter
- Create user authentication collection
- Set up database migrations

**Phase 2 - Core Content:**
- Migrate cruises, destinations, boats collections
- Build admin UI for content editing
- Replace hardcoded data with Payload API calls

**Phase 3 - Newsletter System:**
- Create subscriber/campaign/send collections
- Build React Email templates
- Integrate Resend for delivery

**Phase 4 - Advanced Features:**
- Segmentation logic
- Open/click tracking
- Automated campaigns via node-cron

**Confidence:** HIGH (Logical phase ordering)

---

## Sources

**Note:** Research conducted with limited tool access. Recommendations based on:
- Training data (January 2025) knowledge of Payload CMS 3.0 architecture
- Official Payload documentation structure (unable to access current version)
- Email service provider pricing (Resend, Mailgun, SendGrid public pricing)
- Next.js 14 + Payload integration patterns from training data

**CRITICAL:** Verify Payload 3.0 stable release status and package names before implementation. The architecture and approach are sound, but specific package versions need validation against current documentation.
