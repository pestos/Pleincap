---
phase: 04-newsletter-foundation
plan: 01
subsystem: newsletter
tags: [newsletter, subscribers, email, double-opt-in, gdpr, react-email]
dependency_graph:
  requires: [payload-cms, database, next-api-routes]
  provides: [subscriber-collection, email-adapter, subscription-api, double-opt-in-flow, unsubscribe-api]
  affects: [newsletter-ui, campaign-management]
tech_stack:
  added: [react-email, nanoid]
  patterns: [email-adapter-pattern, double-opt-in, gdpr-compliance]
key_files:
  created:
    - src/payload/collections/Subscribers.ts
    - src/payload/lib/email/emailAdapter.ts
    - src/payload/emails/DoubleOptIn.tsx
    - src/payload/emails/UnsubscribeConfirmation.tsx
    - src/app/api/newsletter/subscribe/route.ts
    - src/app/api/newsletter/confirm/route.ts
    - src/app/api/newsletter/unsubscribe/route.ts
  modified:
    - payload.config.ts
    - package.json
decisions:
  - decision: Email adapter interface with ConsoleEmailAdapter as default
    rationale: Project constraint requires provider-agnostic architecture for future flexibility
    alternatives: Direct provider integration (rejected - vendor lock-in)
  - decision: One-click unsubscribe with immediate processing
    rationale: GDPR compliance requires no friction for unsubscribe
    alternatives: Confirmation page (rejected - not GDPR compliant)
  - decision: nanoid for token generation instead of crypto.randomBytes
    rationale: URL-safe tokens with good entropy, simpler API
    alternatives: uuid v4 (rejected - not URL-optimized), crypto (rejected - more complex)
  - decision: Async render functions for React Email templates
    rationale: render() returns Promise in react-email library
    alternatives: Sync wrapper (rejected - would block event loop)
metrics:
  duration_minutes: 5
  tasks_completed: 2
  files_created: 7
  files_modified: 2
  commits: 2
  lines_added: ~650
  completed_at: 2026-02-14
---

# Phase 04 Plan 01: Newsletter Subscription Foundation Summary

**One-liner:** GDPR-compliant double opt-in newsletter subscription system with provider-agnostic email adapter using React Email templates

## What Was Built

### Core Infrastructure

1. **Subscribers Collection** (`src/payload/collections/Subscribers.ts`)
   - Email field with unique constraint and index for fast lookups
   - Status lifecycle: pending → active (or unsubscribed)
   - Verification token with 24-hour expiry for double opt-in
   - Permanent unsubscribe token for one-click GDPR compliance
   - GDPR audit fields: IP address, user agent, timestamps
   - Admin-only access (subscriber data is private)
   - Organized under "Newsletter" admin group

2. **Email Adapter Abstraction** (`src/payload/lib/email/emailAdapter.ts`)
   - `EmailAdapter` interface with `send()` and `sendBatch()` methods
   - `ConsoleEmailAdapter` for development (logs to console)
   - Factory pattern via `getEmailAdapter()` reads `EMAIL_PROVIDER` env var
   - Extensible architecture allows adding Resend/SendGrid/etc. without changing business logic
   - `EMAIL_FROM` constant from env (defaults to newsletter@plein-cap.com)

3. **React Email Templates**
   - `DoubleOptIn.tsx`: Verification email with PleinCap branding (abyss/gold/ecru colors)
   - `UnsubscribeConfirmation.tsx`: Friendly unsubscribe confirmation
   - French content aligned with PleinCap brand
   - Responsive inline styles for email client compatibility
   - Async render functions returning HTML strings

### API Routes (Public Access)

1. **POST /api/newsletter/subscribe**
   - Validates email (basic check: contains @ and .)
   - Handles existing subscribers:
     - Active: return "already subscribed"
     - Pending: resend verification email
     - Unsubscribed: reactivate as pending, send new verification
   - Creates new subscriber with `pending` status
   - Generates verification token (nanoid 32 chars, 24h expiry)
   - Generates permanent unsubscribe token for GDPR links
   - Captures IP and user agent for audit trail
   - Sends double opt-in email via adapter
   - Returns success message

2. **GET /api/newsletter/confirm**
   - Validates token from query parameter
   - Checks token expiry and pending status
   - Updates subscriber to `active` status
   - Sets `subscribedAt` timestamp
   - Clears verification token
   - Redirects to `/news-letter?confirmed=true` (success) or `?error=token-invalid` (failure)

3. **GET/POST /api/newsletter/unsubscribe**
   - Supports both GET (email links) and POST (List-Unsubscribe-Post header)
   - Validates unsubscribe token
   - **Immediately** updates status to `unsubscribed` (GDPR compliance - no confirmation step)
   - Sets `unsubscribedAt` timestamp
   - Redirects to `/news-letter?unsubscribed=true` (success) or `?error=link-invalid` (failure)

### Dependencies Added

- `react-email` + `@react-email/components`: Email template rendering
- `nanoid`: Cryptographically strong URL-safe tokens
- `@types/nodemailer`: TypeScript types for future email provider integration

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed NextRequest.ip property error**
- **Found during:** Task 2 build verification
- **Issue:** TypeScript error - `Property 'ip' does not exist on type 'NextRequest'`
- **Fix:** Removed `request.ip` fallback, using only `x-forwarded-for` header for IP capture
- **Files modified:** `src/app/api/newsletter/subscribe/route.ts`
- **Commit:** 4bc6e60 (included in Task 2 commit)

**2. [Rule 1 - Bug] Fixed async render function return type**
- **Found during:** Task 2 build verification
- **Issue:** `render()` from @react-email/render returns `Promise<string>`, not `string`
- **Fix:** Changed `renderDoubleOptIn()` and `renderUnsubscribeConfirmation()` to async functions, awaited calls in subscribe route
- **Files modified:** `src/payload/emails/DoubleOptIn.tsx`, `src/payload/emails/UnsubscribeConfirmation.tsx`, `src/app/api/newsletter/subscribe/route.ts`
- **Commit:** 4bc6e60 (included in Task 2 commit)

## Verification Results

1. Build passes: ✅ `npm run build` completed successfully
2. Subscribers collection registered: ✅ Available in Payload admin under "Newsletter" group
3. API routes exist: ✅ All three routes listed in build output
4. Email adapter interface: ✅ Exports `EmailAdapter`, `getEmailAdapter`, `EMAIL_FROM`
5. React Email templates: ✅ Render valid HTML with async functions

## Success Criteria Met

- ✅ Subscribers collection exists with email, status, verification tokens, unsubscribe token, and GDPR audit fields
- ✅ Email adapter abstraction allows future provider swap without changing business logic
- ✅ Double opt-in flow: subscribe → pending → verify token → active
- ✅ One-click unsubscribe: click link → immediately unsubscribed (no confirmation step - GDPR compliant)
- ✅ All API routes are public (no auth required) since they serve end-user flows
- ✅ Build compiles successfully

## Key Technical Patterns

1. **Email Adapter Pattern**: Interface-based abstraction allows swapping email providers (Resend, SendGrid, AWS SES) without changing subscription logic
2. **Double Opt-In**: Industry standard for consent verification, reduces spam complaints
3. **GDPR Compliance**: One-click unsubscribe (no confirmation), audit trail (IP/user agent), List-Unsubscribe headers
4. **Token Security**: nanoid generates cryptographically strong 32-character tokens, verification tokens expire in 24h
5. **Status Lifecycle**: pending (unverified) → active (verified) → unsubscribed (permanent)

## Next Steps

The subscription foundation is now ready for:
- **Plan 02**: Newsletter UI components (subscription form, confirmation messages)
- **Plan 03**: CSV import/export for subscriber management
- **Plan 04**: Campaign creation and email sending system

## Self-Check: PASSED

**Files created:**
- ✅ FOUND: src/payload/collections/Subscribers.ts
- ✅ FOUND: src/payload/lib/email/emailAdapter.ts
- ✅ FOUND: src/payload/emails/DoubleOptIn.tsx
- ✅ FOUND: src/payload/emails/UnsubscribeConfirmation.tsx
- ✅ FOUND: src/app/api/newsletter/subscribe/route.ts
- ✅ FOUND: src/app/api/newsletter/confirm/route.ts
- ✅ FOUND: src/app/api/newsletter/unsubscribe/route.ts

**Commits exist:**
- ✅ FOUND: f9d44d1 (Task 1: Subscribers collection and email adapter)
- ✅ FOUND: 4bc6e60 (Task 2: API routes and email templates)

All files and commits verified successfully.
