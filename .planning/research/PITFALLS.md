# Pitfalls Research

**Domain:** Payload CMS 3.0 integration into existing Next.js 14 travel site + newsletter system
**Researched:** 2026-02-14
**Confidence:** HIGH (based on known CMS migration and newsletter patterns)

## Critical Pitfalls

### Pitfall 1: Breaking Existing Design During CMS Integration

**What goes wrong:**
Payload CMS 3.0 ships with its own layout, fonts, and CSS. When integrated into the existing Next.js app, Payload's admin styles bleed into the public site, or Payload's `layout.tsx` conflicts with the existing root layout.

**Why it happens:**
Payload 3.0 co-locates in the same Next.js app. Both Payload admin and the public site share the same `app/` directory. Route groups and layout scoping are not configured carefully.

**How to avoid:**
- Use Next.js route groups: `(frontend)/` for public pages, `(payload)/admin/` for Payload
- Isolate Payload's admin layout from the existing `layout.tsx`
- Test that existing pages render identically after Payload installation (pixel-diff screenshots)
- Keep Tailwind config scoped — Payload uses its own styling system

**Warning signs:**
- Fonts changing on public pages after Payload install
- CSS classes from Payload appearing in public page inspector
- Layout shifts on existing pages

**Phase to address:**
Phase 1 (Foundation) — must be resolved before any content migration

---

### Pitfall 2: Big-Bang Content Migration Causing Data Loss

**What goes wrong:**
Attempting to migrate all 15+ pages of hardcoded content to the database in one go. TypeScript arrays don't map 1:1 to Payload collections, relationships break, images URLs change, and content is lost or corrupted.

**Why it happens:**
Hardcoded content uses ad-hoc interfaces (different shapes per page). CMS collections need normalized schemas. The mismatch between `ItineraryDay[]` in TypeScript and a Payload collection with relationships causes data loss.

**How to avoid:**
- Migrate one content type at a time (e.g., speakers first, then boats, then cruises)
- Keep hardcoded data files as backup during the transition period
- Write migration scripts with validation (count check: 40 blog posts in → 40 blog posts out)
- Run migrations on a staging database first
- Use a parallel approach: new CMS pages alongside old pages until verified

**Warning signs:**
- Missing items after migration (count mismatch)
- Broken relationships (cruise references non-existent boat)
- Images 404 after migration
- Rich text formatting lost

**Phase to address:**
Phase 2 (Content Collections) — each collection migration should be atomic and verified

---

### Pitfall 3: Newsletter Sending Without Proper Email Authentication

**What goes wrong:**
Newsletters land in spam folders because DNS records (SPF, DKIM, DMARC) are not configured for the email sending domain. Open rates plummet, sender reputation degrades, and the domain gets blacklisted.

**Why it happens:**
Developers focus on the code (API calls to Resend/SendGrid) and forget the DNS infrastructure. Email providers require domain verification before sending.

**How to avoid:**
- Set up SPF, DKIM, and DMARC DNS records BEFORE sending any campaign
- Verify domain ownership with chosen email provider
- Start with small sends (100 emails) to warm up the domain
- Monitor deliverability metrics from day one
- Use a subdomain for marketing emails (e.g., `news.pleincap.com`) to protect main domain reputation

**Warning signs:**
- Open rates below 10% (industry average for travel is 20-25%)
- High bounce rate (>3%)
- Emails landing in Gmail Promotions tab consistently
- Email provider warnings about sender reputation

**Phase to address:**
Phase 3 (Newsletter) — DNS configuration must be the FIRST task before any sends

---

### Pitfall 4: Payload CMS Version Mismatch with Next.js 14

**What goes wrong:**
Payload 3.0 was in beta during 2025. Installing the wrong version combination (Payload beta + Next.js 14 stable) causes runtime errors, missing features, or incompatible APIs.

**Why it happens:**
Payload 3.0 documentation evolved rapidly during beta. Package names may have changed (`@payloadcms/next` vs. `@payloadcms/nextjs`). Drizzle adapter may have different API.

**How to avoid:**
- Check `npm info payload version` before installation
- Follow the EXACT installation guide from payloadcms.com/docs (not blog posts or tutorials)
- Pin all Payload package versions to the same minor version
- Create a test branch and verify basic CRUD works before committing to the integration

**Warning signs:**
- TypeScript errors mentioning unknown Payload exports
- Admin panel shows blank page or 404
- `payload migrate` command fails
- Drizzle schema generation errors

**Phase to address:**
Phase 1 (Foundation) — version verification MUST be the first task

---

### Pitfall 5: Not Handling the Frontend-CMS Transition Period

**What goes wrong:**
During migration, some pages use hardcoded data while others use CMS data. Links between them break. Navigation references stale data. Users see inconsistent content.

**Why it happens:**
Migration takes weeks. During that time, the site serves from two sources: old TypeScript arrays and new Payload queries. Content updates in the CMS don't appear on pages still using hardcoded data.

**How to avoid:**
- Create a migration tracking checklist (page by page)
- Never partially migrate a page — either fully CMS or fully static
- Update the navigation data source early (it connects all pages)
- Use feature flags or environment variables to switch between data sources per page
- Freeze content updates during active migration phases

**Warning signs:**
- Stale content on some pages but not others
- Broken internal links
- Navigation showing items that don't exist in CMS yet
- Duplicate content (same cruise in both static and CMS)

**Phase to address:**
Phase 2-3 (Collections + Frontend) — plan migration order carefully

---

### Pitfall 6: Over-Engineering the Newsletter for Day One

**What goes wrong:**
Building a full marketing automation platform (A/B testing, dynamic content, complex segmentation, visual flow builder) before validating that basic campaigns work. The system ships months late or never ships.

**Why it happens:**
Feature lists from competitors (Mailchimp, Brevo) set unrealistic expectations. The team tries to build everything at once instead of iterating.

**How to avoid:**
- Phase 1 newsletter: subscribe, unsubscribe, send campaign, track opens/clicks — nothing more
- Phase 2 newsletter: segmentation, templates, basic automation
- Only build A/B testing and advanced features after 3+ successful campaigns
- Start sending newsletters manually from the CMS while building automation

**Warning signs:**
- Newsletter system has 8+ collections before first email is sent
- Building visual email builder before basic send works
- Segmentation logic before having 100+ subscribers
- More time on automation than on content quality

**Phase to address:**
Phase 3 (Newsletter Foundation) — enforce MVP scope strictly

---

### Pitfall 7: Losing SEO Rankings During Migration

**What goes wrong:**
URLs change when migrating from static Next.js pages to CMS-driven dynamic routes. Google de-indexes pages, organic traffic drops. Meta tags and structured data are lost.

**Why it happens:**
Static pages had metadata exports. CMS-driven pages need to generate metadata from Payload data. URL slugs in the CMS don't match the existing URL structure.

**How to avoid:**
- Map ALL existing URLs before migration
- Ensure CMS slugs match current URL paths exactly
- Implement `generateMetadata()` using Payload data on every page
- Set up 301 redirects for any URL changes
- Keep `robots.txt` and `sitemap.xml` working throughout migration
- Monitor Google Search Console for crawl errors after each migration batch

**Warning signs:**
- Pages returning 404 for previously working URLs
- Missing meta descriptions in page source
- Google Search Console showing "Page not indexed" errors
- Organic traffic dropping week-over-week during migration

**Phase to address:**
Phase 2-3 (Collections + Frontend) — URL mapping must happen BEFORE migration starts

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip image optimization in Payload | Faster initial setup | Slow page loads, high bandwidth on VPS | Never — Next.js Image handles this automatically |
| Hardcode email templates as HTML strings | Quick first campaign | Unmaintainable, inconsistent emails | First 2-3 campaigns only |
| Use Payload Local API everywhere (no caching) | Simple data fetching | Database hammered on every request | Development only — add ISR/caching for production |
| Skip database migrations (edit schema directly) | Quick schema changes | Lost data, broken deployments | Never |
| Store newsletter stats in campaign document | One fewer collection | Campaign documents grow huge, slow queries | Under 1000 subscribers |
| Use email provider free tier without monitoring | Zero cost | Hitting limits mid-campaign, partial sends | Under 5000 total subscribers |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Payload + Next.js layouts | Letting Payload's layout override root layout | Use route groups `(frontend)/` and `(payload)/` |
| PostgreSQL on VPS | Not setting up connection pooling | Use PgBouncer or Payload's built-in pool config |
| Email provider webhooks | Not verifying webhook signatures | Always verify webhook authenticity to prevent spoofing |
| Image uploads in Payload | Storing in `public/` directory (git tracked) | Use `/uploads/` directory (gitignored) or S3 |
| Payload admin + Tailwind | Tailwind purging Payload's admin CSS | Exclude Payload admin routes from Tailwind content config |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| No ISR/caching on CMS pages | Every request hits database | Use `revalidate` in page configs | >50 concurrent users |
| Loading all cruise images on catalogue page | Page takes 10+ seconds | Implement lazy loading + Next.js Image | >20 cruises with images |
| Newsletter send without batching | Timeout on large sends | Batch 50-100 emails per API call | >500 subscribers |
| Full Payload data in client components | Huge JavaScript bundle | Fetch only needed fields, use `select` in queries | >10 collections |
| No database indexes on slug fields | Slow page loads for slug-based routes | Add indexes on `slug`, `status`, `publishedAt` | >1000 documents |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Payload admin on default `/admin` path without rate limiting | Brute force attacks on login | Add rate limiting middleware, consider IP allowlist |
| Storing `PAYLOAD_SECRET` in code | Admin impersonation | Use `.env` files, never commit secrets |
| Newsletter unsubscribe without token verification | Anyone can unsubscribe others | Use signed tokens in unsubscribe links |
| Not sanitizing rich text output from Payload | XSS via CMS content | Use Payload's built-in sanitization, don't use `dangerouslySetInnerHTML` |
| Email list export without authentication | GDPR violation, data breach | Restrict export to admin role only, log exports |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| CMS admin too complex for editors | Team avoids backoffice, asks devs to update | Customize Payload admin: hide technical fields, use clear labels in French |
| No draft preview before publishing | Content errors go live | Implement Payload's draft/preview feature with live preview URL |
| Newsletter without double opt-in | Spam complaints, legal issues (GDPR) | Always send confirmation email before adding to active list |
| No confirmation after CMS save | Editor unsure if changes saved | Payload has built-in save notifications — ensure they're visible |
| Missing image alt text in CMS | Accessibility and SEO issues | Make alt text required field on media uploads |

## "Looks Done But Isn't" Checklist

- [ ] **CMS Integration:** Admin panel works — but check public pages still render identically (CSS bleed)
- [ ] **Content Migration:** All items imported — but check relationships are correct (cruise→boat links)
- [ ] **Newsletter Subscribe:** Form works — but check double opt-in email arrives and confirmation link works
- [ ] **Newsletter Send:** Campaign sends — but check opens/clicks are tracked (webhook receiving)
- [ ] **Image Upload:** Upload works in admin — but check images serve properly on public pages (URL paths)
- [ ] **SEO Migration:** Pages render — but check metadata, OpenGraph, and sitemap are correct
- [ ] **User Roles:** Editor can log in — but check they can't delete content or access admin settings
- [ ] **Email Templates:** Template renders — but check it looks correct in Gmail, Outlook, and Apple Mail
- [ ] **Unsubscribe:** Link works — but check subscriber is actually removed from future sends
- [ ] **Database Backup:** Backup script runs — but check you can actually restore from it

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| CSS bleed from Payload | LOW | Add route group isolation, rebuild |
| Data loss during migration | MEDIUM | Restore from hardcoded TypeScript files (they're still in git) |
| Email domain blacklisted | HIGH | Switch to subdomain, warm up new sender reputation over 2-4 weeks |
| Payload version incompatibility | MEDIUM | Pin working versions, downgrade if needed, check release notes |
| SEO rankings dropped | HIGH | Implement redirects, submit updated sitemap, wait 2-4 weeks for reindexing |
| Newsletter sent to wrong segment | MEDIUM | Send correction email, review segmentation logic, add send confirmation step |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| CSS bleed from Payload | Phase 1 (Foundation) | Screenshot comparison of all public pages |
| Big-bang migration | Phase 2 (Collections) | Per-collection count verification script |
| Email auth missing | Phase 3 (Newsletter) | SPF/DKIM check via mail-tester.com before first send |
| Version mismatch | Phase 1 (Foundation) | `npm info payload version` + test CRUD on branch |
| Transition inconsistency | Phase 2-3 | Migration tracking checklist, all-or-nothing per page |
| Newsletter over-engineering | Phase 3 | MVP scope: subscribe + send + track, nothing more |
| SEO ranking loss | Phase 2-3 | URL mapping document, Google Search Console monitoring |

## Sources

- Payload CMS GitHub issues and migration guides
- Next.js App Router documentation for route groups
- Email deliverability best practices (Mailgun, Postmark guides)
- GDPR newsletter compliance requirements
- Known CMS migration patterns from WordPress/Strapi/Contentful migrations

---
*Pitfalls research for: Payload CMS 3.0 + Next.js 14 integration with newsletter*
*Researched: 2026-02-14*
