---
phase: 01-foundation
plan: 03
subsystem: cms-auth
status: complete
completed_at: "2026-02-14"

tags: [payload, users, media, rbac, authentication, upload]

dependency_graph:
  requires:
    - 01-02-PLAN.md (Payload CMS installation and route groups)
  provides:
    - Users collection with admin/editor roles and RBAC
    - Media collection with image upload and auto-resize
    - Admin authentication and user management
    - Media library with thumbnail/card/hero sizes
  affects:
    - Phase 2 content collections will inherit RBAC patterns
    - Phase 4 email notifications will use Users collection

tech_stack:
  added:
    - Payload auth system (JWT, bcrypt)
    - sharp image processor (configured for resize)
    - RBAC pattern (admin/editor roles)
  patterns:
    - Collection-level access control (create/read/update/delete)
    - Field-level access control (role field restriction)
    - Auto-seed pattern for initial admin user
    - Image upload with multiple size variants

key_files:
  created:
    - src/payload/collections/Users.ts (51 lines)
    - src/payload/collections/Media.ts (50 lines)
    - src/payload/seed.ts (27 lines)
    - public/media/.gitkeep
  modified:
    - payload.config.ts (added Users/Media collections, onInit hook, sharp config)

key_decisions:
  - role: "Chose admin/editor role model for RBAC"
    rationale: "Simple two-tier system sufficient for Phase 1; editors can create content but not manage users"
    alternatives: ["Multi-role with granular permissions", "Single admin role"]

  - role: "Field-level access control on role field"
    rationale: "Prevents privilege escalation - editors cannot change their own role to admin"
    alternatives: ["Collection-level only", "Separate admin API"]

  - role: "Three image sizes (thumbnail/card/hero)"
    rationale: "Covers common use cases: list views (400x300), card grids (768x512), banners (1920xauto)"
    alternatives: ["Single size", "On-demand resize", "Cloud image service"]

  - role: "Local media storage in public/media"
    rationale: "Simple for Phase 1 development; production may migrate to S3/CDN in future"
    alternatives: ["S3 from start", "Cloudinary", "Vercel Blob"]

  - role: "Auto-seed admin user on first startup"
    rationale: "No manual DB setup needed; checks for existing users first to avoid duplicates"
    alternatives: ["Manual creation via CLI", "Migration script", "Environment variable config"]

metrics:
  duration_seconds: 800
  tasks_completed: 2
  files_created: 4
  files_modified: 1
  deviations: 3
  commits: 4
---

# Phase 01 Plan 03: Users and Media Collections Summary

Complete Payload CMS backoffice with authentication, user management (admin/editor RBAC), and media library with image upload and auto-resize (thumbnail/card/hero sizes).

## Overview

**Objective:** Create Users and Media collections for Payload CMS, register them in config, create seed script for first admin user, then verify complete Phase 1 setup works end-to-end.

**Output:** Working /admin panel with login, user management with roles, and media library.

**Status:** Complete - All phase 1 success criteria verified by human.

## Tasks Executed

### Task 1: Create Users and Media collections with RBAC
**Type:** auto
**Status:** Complete
**Commit:** f1dcf5d

Created Users collection with:
- Built-in Payload auth (login, password hashing, JWT)
- Two roles: admin (full access) and editor (content-only)
- Collection-level RBAC: admins create/delete users, editors read/update own profile
- Field-level RBAC: only admins can change role field (prevents privilege escalation)

Created Media collection with:
- Image-only uploads to public/media directory
- Three auto-generated sizes:
  - thumbnail: 400x300 (for list views)
  - card: 768x512 (for card grids)
  - hero: 1920xauto (for banners)
- Required alt text field for accessibility
- Public read access, authenticated write, admin-only delete

Created seed script:
- Runs on first startup when no users exist
- Creates admin@pleincap.com with password Admin123! (or ADMIN_PASSWORD env var)
- Skips if users already exist (idempotent)

Wired into payload.config.ts:
- Registered Users and Media in collections array
- Added onInit hook to trigger seed on first startup

**Files:**
- src/payload/collections/Users.ts (51 lines)
- src/payload/collections/Media.ts (50 lines)
- src/payload/seed.ts (27 lines)
- payload.config.ts (modified)
- public/media/.gitkeep (directory structure)

### Task 2: Verify Phase 1 success criteria
**Type:** checkpoint:human-verify
**Status:** APPROVED by user
**Commit:** N/A (verification only)

User successfully verified all 4 tests:
1. Admin login at /admin with admin@pleincap.com worked
2. Admin created editor account (editeur@pleincap.com) with restricted permissions
3. Editor uploaded image and saw auto-generated thumbnail/card/hero sizes in media library
4. All existing frontend pages rendered correctly (no CSS bleed, no broken layouts)

**Outcome:** All Phase 1 success criteria met.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Configure sharp for image resizing**
- Found during: Task 1 (after creating Media collection)
- Issue: Payload CMS requires explicit sharp configuration for image resizing to work
- Fix: Added sharp configuration to payload.config.ts with format and resize options
- Files modified: payload.config.ts
- Commit: f05f531

**2. [Rule 1 - Bug] Fix nested HTML in Payload admin panel**
- Found during: User verification (Task 2)
- Issue: Nested <html> tags causing invalid markup - root layout had <html> shell, route group layouts also had <html> shell
- Fix: Moved HTML shell to route group layouts; root layout now returns bare children
- Files modified: src/app/layout.tsx, src/app/(frontend)/layout.tsx, src/app/(payload)/layout.tsx
- Commit: cae5f29
- Note: Fixed by orchestrator after executor returned

**3. [Rule 3 - Blocking] Add missing Payload CMS CSS import**
- Found during: User verification (Task 2)
- Issue: Admin panel missing styles - @payloadcms/next/css import missing from admin layout
- Fix: Added import '@payloadcms/next/css' to src/app/(payload)/admin/[[...segments]]/layout.tsx
- Files modified: src/app/(payload)/admin/[[...segments]]/layout.tsx
- Commit: 77b4f40
- Note: Fixed by orchestrator after executor returned

## Verification Results

All must-have truths verified:
- Admin can log into /admin with email and password
- Admin can create editor accounts with restricted permissions
- Editor can upload images to media library and see them in backoffice
- Existing frontend pages remain unchanged and functional

All must-have artifacts verified:
- src/payload/collections/Users.ts exists (51 lines, exports Users CollectionConfig)
- src/payload/collections/Media.ts exists (50 lines, exports Media CollectionConfig with upload config)
- src/payload/seed.ts exists (27 lines, contains payload.create)
- payload.config.ts contains Users and Media in collections array
- payload.config.ts contains onInit hook

Key links verified:
- payload.config.ts imports and registers Users from src/payload/collections/Users.ts
- payload.config.ts imports and registers Media from src/payload/collections/Media.ts
- Media collection configured with staticDir: 'public/media'

## Technical Implementation

### Users Collection RBAC

**Admin role:**
- Create/read/update/delete all users
- Change user roles
- Full admin panel access

**Editor role:**
- Read/update own profile only
- Cannot create/delete users
- Cannot change roles (field-level restriction)
- Admin panel access granted

**Security:**
- Field-level access control on role field prevents privilege escalation
- Password hashing handled by Payload auth
- JWT-based session management

### Media Collection Upload

**Image processing:**
- sharp library configured for resize operations
- Three predefined sizes auto-generated on upload
- Original image preserved

**Storage:**
- Local public/media directory (Phase 1)
- Public read access for frontend consumption
- Auth required for upload/modify
- Admin-only delete

**Accessibility:**
- Required alt text field on all images
- French label: "Texte alternatif"

### Seed Pattern

**Auto-seed flow:**
1. payload.config.ts onInit hook fires on server startup
2. Query users collection for any existing users
3. If count is 0, dynamically import and run seed script
4. Seed script checks for admin@pleincap.com specifically
5. Only creates if not found (double-check for safety)
6. Logs result

**Idempotency:**
- Never creates duplicate admin users
- Safe to run multiple times
- Skips gracefully if users exist

## Next Steps

Phase 1 (Foundation) is now complete. Phase 2 will build content collections on top of this foundation:
- Bateaux (boats) collection
- Destinations collection
- Conferenciers (speakers) collection
- Blog articles collection

All Phase 2 collections will inherit the RBAC patterns established here (admin/editor roles, collection-level and field-level access control).

## Self-Check

Verifying all claimed files and commits exist:

- [x] src/payload/collections/Users.ts exists
- [x] src/payload/collections/Media.ts exists
- [x] src/payload/seed.ts exists
- [x] public/media/.gitkeep exists
- [x] Commit f1dcf5d exists
- [x] Commit f05f531 exists
- [x] Commit cae5f29 exists
- [x] Commit 77b4f40 exists

## Self-Check: PASSED

All claimed files and commits verified successfully.
