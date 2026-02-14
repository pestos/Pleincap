# Roadmap: PleinCap Backoffice & Newsletter

## Overview

Transform the PleinCap Next.js site from hardcoded content to a fully dynamic CMS-driven platform. Starting with Payload CMS infrastructure and authentication, progress through creating all content collections (cruises, destinations, boats, speakers, team, blog, testimonials), migrate existing content while preserving SEO, then build a complete newsletter system with subscriber management, campaigns, and analytics. Ends with production deployment on VPS with PostgreSQL.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - CMS infrastructure and authentication
- [ ] **Phase 2: Content Collections** - All content types as editable collections
- [ ] **Phase 3: Migration & SEO** - Replace hardcoded content, preserve rankings
- [ ] **Phase 4: Newsletter Foundation** - Core newsletter system with campaigns
- [ ] **Phase 5: Newsletter Advanced & Deployment** - Advanced features and production launch

## Phase Details

### Phase 1: Foundation
**Goal**: Working Payload CMS backoffice with authentication and user management
**Depends on**: Nothing (first phase)
**Requirements**: CMS-01, CMS-02, CMS-03
**Success Criteria** (what must be TRUE):
  1. Admin can log into /admin with email and password
  2. Admin can create editor accounts with restricted permissions
  3. Editor can upload images to media library and see them in backoffice
  4. Existing Next.js pages remain unchanged and functional
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md -- Upgrade Next.js 14 to 15.x and React 18 to 19.x
- [x] 01-02-PLAN.md -- Install Payload CMS, PostgreSQL setup, route group restructuring
- [x] 01-03-PLAN.md -- Create Users and Media collections with RBAC, seed admin, verify

---

### Phase 2: Content Collections
**Goal**: All content types (cruises, destinations, boats, speakers, team, blog, testimonials, banners) exist as Payload collections with full CRUD operations
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, CONT-09, CONT-10, CONT-11, CMS-04, CMS-05
**Success Criteria** (what must be TRUE):
  1. Editor can create/edit/delete cruises with itineraries and day-by-day highlights
  2. Editor can create/edit/delete destinations, boats with cabin specs, speakers, and team members
  3. Editor can create/edit/delete blog articles with categories and tags
  4. Editor can create/edit/delete testimonials and banner/hero sections
  5. Editor can link cruises to boats, destinations, and speakers through relationships
  6. Editor can save drafts, preview content before publishing, and edit SEO meta tags
  7. Editor can bulk update prices or dates across multiple cruises at once
**Plans**: 4 plans

Plans:
- [ ] 02-01-PLAN.md -- Shared utilities (formatSlug hook, SEO plugin) + Speakers, Team, Testimonials collections
- [ ] 02-02-PLAN.md -- Destinations, Boats (cabin array), Categories, Tags collections
- [ ] 02-03-PLAN.md -- Blog Posts (with taxonomy relationships) + Banners (blocks field)
- [ ] 02-04-PLAN.md -- Cruises (relationships, itinerary, drafts) + SEO plugin config + Phase 2 verification

---

### Phase 3: Migration & SEO
**Goal**: All frontend pages fetch data from CMS instead of hardcoded arrays; existing URLs and SEO preserved
**Depends on**: Phase 2
**Requirements**: MIGR-01, MIGR-02, MIGR-03
**Success Criteria** (what must be TRUE):
  1. All existing content (cruises, destinations, boats, speakers, team, blog, testimonials) is migrated to database with data validation
  2. All public pages display content from CMS with no hardcoded arrays remaining in components
  3. All existing URLs remain identical (no 404s or redirects needed)
  4. SEO meta tags, structured data, and sitemaps work correctly for all pages
  5. Google Search Console shows no indexing issues or ranking drops
**Plans**: TBD

Plans:
- [ ] TBD (plan during phase planning)

---

### Phase 4: Newsletter Foundation
**Goal**: Working newsletter system with subscriber management, campaign creation, email sending, and basic analytics
**Depends on**: Phase 1 (independent of content migration)
**Requirements**: NEWS-01, NEWS-02, NEWS-03, NEWS-04, NEWS-07
**Success Criteria** (what must be TRUE):
  1. Visitor can subscribe to newsletter with double opt-in email confirmation
  2. Admin can import/export subscriber lists via CSV
  3. Admin can create email campaigns using responsive templates with text/image editor
  4. Admin can send campaigns to all subscribers or specific segments
  5. Subscriber can unsubscribe in one click from any email (RGPD compliant)
  6. Email authentication (SPF, DKIM, DMARC) is configured and verified to prevent spam folder delivery
**Plans**: TBD

Plans:
- [ ] TBD (plan during phase planning)

---

### Phase 5: Newsletter Advanced & Deployment
**Goal**: Advanced newsletter features (segmentation, automation, analytics) plus production deployment on VPS
**Depends on**: Phase 4
**Requirements**: NEWS-05, NEWS-06, NEWS-08, DEPL-01
**Success Criteria** (what must be TRUE):
  1. Admin can view open rates, click rates, and unsubscribe rates per campaign in dashboard
  2. Admin can create subscriber segments based on interests, engagement, or demographics
  3. Admin can create automated email sequences (welcome series, re-engagement for inactive subscribers)
  4. Site is deployed on VPS with PostgreSQL database in production
  5. All features work correctly in production environment with proper backups configured
**Plans**: TBD

Plans:
- [ ] TBD (plan during phase planning)

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | ✓ Complete | 2026-02-14 |
| 2. Content Collections | 0/4 | Planned | - |
| 3. Migration & SEO | 0/? | Not started | - |
| 4. Newsletter Foundation | 0/? | Not started | - |
| 5. Newsletter Advanced & Deployment | 0/? | Not started | - |

---
*Roadmap created: 2026-02-14*
*Last updated: 2026-02-14 (Phase 2 planned)*
