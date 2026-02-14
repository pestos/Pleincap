---
phase: 01-foundation
plan: 02
subsystem: cms-core
tags: [payload-cms, postgresql, docker, route-groups, css-isolation]
dependency_graph:
  requires: [01-01]
  provides: [payload-infrastructure, route-group-architecture]
  affects: [build-system, database]
tech_stack:
  added:
    - payload@3.76.1
    - '@payloadcms/db-postgres@3.76.1'
    - '@payloadcms/richtext-lexical@3.76.1'
    - '@payloadcms/next@3.76.1'
    - sharp@0.33.5
    - graphql@16.9.0
    - postgres:16-alpine (Docker)
  patterns:
    - Next.js route groups for CSS isolation
    - PostgreSQL with Docker Compose for local development
    - Payload CMS 3.0 integration with Next.js App Router
key_files:
  created:
    - payload.config.ts
    - docker-compose.yml
    - .env.example
    - src/app/(frontend)/layout.tsx
    - src/app/(payload)/admin/[[...segments]]/page.tsx
    - src/app/(payload)/api/[...slug]/route.ts
    - src/app/(payload)/layout.tsx
    - src/app/(payload)/custom.scss
  modified:
    - next.config.mjs (wrapped with withPayload)
    - tsconfig.json (added @payload-config alias)
    - .gitignore (added .env, public/media/, payload-types.ts)
    - src/app/layout.tsx (removed globals.css import)
  moved:
    - All frontend pages to src/app/(frontend)/
    - globals.css to src/app/(frontend)/
decisions:
  - Upgraded Next.js to 16.2.0-canary.45 to meet Payload peer dependency requirement
  - Used route groups for CSS isolation between frontend and admin panel
  - Configured Payload REST handlers to pass config parameter
metrics:
  duration: 262 seconds (4.4 minutes)
  tasks_completed: 2
  files_modified: 43
  deviations: 2
  completed: 2026-02-14
---

# Phase 01 Plan 02: Payload CMS Installation & Route Group Setup Summary

**One-liner:** Installed Payload CMS 3.0 with PostgreSQL adapter via Docker Compose and restructured project into (frontend)/(payload) route groups for CSS isolation.

## What Was Built

This plan established the core Payload CMS infrastructure:

1. **Payload CMS Installation**
   - Installed Payload CMS 3.0 with PostgreSQL database adapter
   - Set up Docker Compose for local PostgreSQL database (postgres:16-alpine)
   - Created payload.config.ts with empty collections array (collections added in Plan 03)
   - Configured environment variables (.env.example) for database, Payload secret, server URL
   - Integrated Payload with Next.js via withPayload wrapper in next.config.mjs
   - Added @payload-config path alias to tsconfig.json

2. **Route Group Architecture**
   - Moved all existing pages to src/app/(frontend)/ route group (no URL changes)
   - Created frontend layout that imports globals.css (Tailwind isolation)
   - Updated root layout to be a minimal shell without CSS imports
   - Created Payload admin route at src/app/(payload)/admin/[[...segments]]/
   - Created Payload API route at src/app/(payload)/api/[...slug]/
   - Created Payload layout with custom.scss for admin styling

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking Issue] Upgraded Next.js to canary version**
- **Found during:** Task 1 (Payload CMS installation)
- **Issue:** Payload CMS 3.76.1 requires Next.js >=16.2.0-canary.10, but latest stable is 16.1.6
- **Fix:** Upgraded Next.js from 16.1.6 to 16.2.0-canary.45 and eslint-config-next to matching version
- **Files modified:** package.json, package-lock.json
- **Commit:** 3f98377
- **Justification:** Blocking issue - cannot install Payload without meeting peer dependency requirement

**2. [Rule 1 - Bug] Fixed Payload API route type error**
- **Found during:** Task 2 verification (npm run build)
- **Issue:** Type error in Payload API route - REST handlers incompatible with Next.js 16 route handler types
- **Fix:** Updated REST handlers to pass config parameter: `REST_GET(config)` instead of `REST_GET`
- **Files modified:** src/app/(payload)/api/[...slug]/route.ts
- **Commit:** 4264335
- **Justification:** Build failure - TypeScript error prevented compilation

## Verification Results

- ✅ `npm run build` completes successfully
- ✅ All existing URLs still work (/, /catalogue, /blog, /destinations, etc.)
- ✅ Payload packages installed (`npm ls payload` shows payload@3.76.1)
- ✅ payload.config.ts exists at project root
- ✅ Route groups properly structured: (frontend) and (payload) directories exist
- ✅ No globals.css import in root layout (only in frontend layout)
- ✅ Frontend pages moved to (frontend) route group with no URL changes
- ✅ Payload admin route exists at /admin (not functional until Plan 03 creates Users collection)
- ✅ Payload API routes exist at /api/* (functional)

**Expected warning:** Build shows "users is not a valid admin user collection" - this is correct because the Users collection will be created in Plan 03.

## Architecture Decisions

1. **Route Groups for CSS Isolation**
   - Used Next.js route groups (parentheses in directory name) to separate frontend and admin panel
   - Root layout (`src/app/layout.tsx`) is a minimal shell with no CSS imports
   - Frontend layout (`src/app/(frontend)/layout.tsx`) imports globals.css (Tailwind)
   - Payload layout (`src/app/(payload)/layout.tsx`) imports custom.scss
   - This prevents Tailwind from affecting Payload admin panel and vice versa

2. **Canary Version Adoption**
   - Payload CMS requires Next.js >=16.2.0-canary.10 but latest stable is 16.1.6
   - Decision: Upgrade to 16.2.0-canary.45 to proceed with Payload installation
   - Risk: Canary versions may have instability, but Payload explicitly requires this range
   - Mitigation: Pin to specific canary version (16.2.0-canary.45) instead of using @canary tag

3. **Empty Collections Array**
   - payload.config.ts created with empty collections array
   - Admin panel declares `admin.user: 'users'` but Users collection doesn't exist yet
   - This is intentional - Plan 03 will add Users and Media collections
   - Admin panel won't be functional until Plan 03 completes

## Next Steps

**Plan 03 (next):** Create Users and Media collections
- Define Users collection with email/password auth
- Define Media collection for file uploads
- Run Payload migration to create database tables
- Create first admin user
- Verify admin panel is accessible at /admin

**Blocked by this plan:** Plan 03 requires Payload infrastructure established here.

## Self-Check: PASSED

### Created Files Verification
```
FOUND: payload.config.ts
FOUND: docker-compose.yml
FOUND: .env.example
FOUND: src/app/(frontend)/layout.tsx
FOUND: src/app/(payload)/admin/[[...segments]]/page.tsx
FOUND: src/app/(payload)/api/[...slug]/route.ts
FOUND: src/app/(payload)/layout.tsx
FOUND: src/app/(payload)/custom.scss
```

### Commits Verification
```
FOUND: 3f98377 (Task 1 - Install Payload CMS)
FOUND: 4264335 (Task 2 - Restructure route groups)
```

### Build Verification
```
Build completed successfully
All routes compiled and rendered
TypeScript type checking passed
```

All claims verified successfully.
