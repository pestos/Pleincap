# External Integrations

**Analysis Date:** 2026-02-14

## APIs & External Services

**Image Hosting:**
- Google Photos CDN (`lh3.googleusercontent.com`) - Hosts images used throughout the site
  - Integration: Direct image URL references in data files and components
  - Used in: `src/data/navigationData.ts`, various page components, testimonials

- Unsplash API (`images.unsplash.com`) - Free stock photography
  - Integration: Direct image URLs for cruise card placeholders
  - Used in: `src/data/navigationData.ts`

- Plein Cap Direct Hosting (`www.plein-cap.com/images/`) - Company image repository
  - Integration: Direct image URLs for internal assets
  - Used in: `src/app/news-letter/page.tsx`, speaker photos, journey images

**Brand Assets:**
- Google Fonts CDN - Web font delivery
  - Fonts: Playfair Display, Inter, Material Symbols Outlined
  - Integration: `<link>` tags in root layout (`src/app/layout.tsx`)

## Data Storage

**Databases:**
- None detected - This is a static/JAMstack site

**File Storage:**
- Public directory: `/public/` - Local static files (images, assets)
  - New images: `new.jpg`, `visio.jpg` (uncommitted)

**Caching:**
- None configured - Relies on browser cache and Next.js built-in optimization

## Authentication & Identity

**Auth Provider:**
- None - No authentication system present
- Site is public-facing with no user accounts

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Standard Next.js console logs only
- No external logging service

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from Next.js project structure - native support)
- Alternative: Any Node.js host or static export via `next export`

**CI Pipeline:**
- Not detected - No CI configuration files found

## Environment Configuration

**Required env vars:**
- None detected

**Secrets location:**
- No secrets management required - Static site with no backend integration

## Webhooks & Callbacks

**Incoming:**
- Contact form at `src/app/contact/page.tsx` - Collects name, email, phone, motif, message
  - Currently no backend endpoint - Form is client-side only (not submitted)
  - Fields ready for integration with backend service

**Outgoing:**
- None - No external API calls or webhooks configured

## Integration Notes

**Static Content:**
- All content (cruise offers, navigation items, team members, testimonials, articles) is hardcoded in TypeScript data files
- No CMS integration
- Content updates require code changes

**Image Management:**
- Multiple image sources without centralized CDN strategy
- Images served from: Google Photos, Unsplash, plein-cap.com, local `/public/` directory

**Contact Form:**
- Form UI complete but backend integration missing
- Contact information hardcoded: 8 Avenue de Verdun, 06000 Nice, France
- Email: conciergerie@pleincap.com (hardcoded in page component)
- Phone: +33 (0)4 93 00 00 00 (hardcoded in page component)

**Future Integration Opportunities:**
- Contact form submission handler (email delivery via SendGrid, Nodemailer, or similar)
- Content management system (Contentful, Strapi, Sanity, etc.)
- Newsletter management (Mailchimp, SendGrid, etc.)
- Analytics (Google Analytics, Plausible, etc.)

---

*Integration audit: 2026-02-14*
