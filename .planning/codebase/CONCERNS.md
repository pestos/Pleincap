# Codebase Concerns

**Analysis Date:** 2026-02-14

## Tech Debt

**Massive page component files causing maintainability issues:**
- Issue: Single page.tsx files contain 1000+ lines with hardcoded data, inline styles, and complex UI logic
- Files: `src/app/catalogue/danube-imperial/page.tsx` (1108 lines), `src/app/page.tsx` (486 lines), `src/app/catalogue/page.tsx` (434 lines)
- Impact: Difficult to maintain, test, and modify. Changes to one section risk breaking others. Future iterations will require extracting logic into reusable components
- Fix approach: Extract data into separate data files, break up large pages into smaller sub-components, but keep consistent with current pattern of keeping components in same file for now

**Hardcoded data inline in page components:**
- Issue: All data (itineraries, pricing, experts, testimonials, cabin details) is hardcoded as constant arrays within page components
- Files: `src/app/catalogue/danube-imperial/page.tsx` (lines 36-177), `src/app/blog/page.tsx` (lines 19+), `src/app/catalogue/page.tsx` (lines 28+), multiple destination pages
- Impact: No way to update content without code changes. Difficult to scale to multiple similar pages. Pricing changes require code edit + rebuild. No version control of data changes
- Fix approach: Create external data files in `src/data/` directory or connect to a CMS/API when needed. For now, extract constants to `src/data/` files to separate concerns

**No data abstraction layer:**
- Issue: All data fetching happens inline in page components. No repository or service layer pattern
- Files: Across all page components in `src/app/`
- Impact: Impossible to cache, transform, or validate data centrally. Difficult to add error handling for missing/invalid data
- Fix approach: Create data service layer at `src/services/dataService.ts` to centralize data access patterns

## Known Bugs

**Responsive layout spacing issues on danube-imperial page (In Progress):**
- Symptoms: Text appears cramped/overlapped on certain screen sizes, hero title too large on mobile, subnav positioning off, section padding excessive on mobile devices
- Files: `src/app/catalogue/danube-imperial/page.tsx`
- Trigger: Loading page at 375px width (mobile), particularly sections with `py-[120px]` padding
- Workaround: Resize to desktop viewport (1440px+)
- Status: Tracked in `.sisyphus/plans/fix-danube-imperial-page.md` with detailed CSS fixes identified

**localStorage access in 'use client' component without hydration guard:**
- Symptoms: Potential hydration mismatch when component reads localStorage on first render
- Files: `src/components/NavigationMenu.tsx` (lines 29-40)
- Trigger: Page refresh or SSR when `localStorage.getItem('fontLoaded')` is called synchronously
- Workaround: Component still works but may log hydration warnings in development
- Fix approach: Wrap localStorage access in `useEffect` hook or check if code is running in browser first

**Image loading failures silently fall back:**
- Symptoms: Broken external image URLs show placeholder SVG but no error is logged
- Files: `src/components/ImageWithFallback.tsx`, used in `CruiseCards.tsx`, all catalogue pages
- Trigger: External image CDN goes down or URL becomes invalid
- Workaround: Component renders fallback SVG instead of failing
- Impact: Users see placeholder rather than content; no visibility into image delivery issues

## Security Considerations

**No input validation or sanitization:**
- Risk: If data comes from external sources (CMS, API) in future, XSS vulnerabilities possible
- Files: All page components rendering user/external data
- Current mitigation: All data is hardcoded, so no injection risk currently
- Recommendations: Add input validation layer if connecting to APIs. Use React's built-in XSS protection (always present for JSX content)

**External image URLs from third-party CDNs:**
- Risk: `lh3.googleusercontent.com`, Unsplash, and internal CDN URLs could be compromised or serve malicious content
- Files: Across all pages (cruise cards, blog posts, expert profiles, cabin images)
- Current mitigation: Images are optimized by CDNs, third-party providers are reputable
- Recommendations: Consider self-hosting critical images. Implement Content Security Policy (CSP) headers for image domains

**No HTTPS enforcement or API endpoint security:**
- Risk: Currently a static site, but future API integrations need protection
- Files: `package.json` (no security middleware)
- Current mitigation: Site deployed to production with HTTPS (assumed)
- Recommendations: Add security headers middleware when API is added. Implement rate limiting for external integrations

## Performance Bottlenecks

**No code splitting or dynamic imports:**
- Problem: All CSS and components loaded on every page. No lazy loading of heavy components
- Files: `src/app/layout.tsx`, all page components
- Cause: Using default Next.js setup without optimization. No `React.lazy()` or dynamic imports
- Improvement path: Add dynamic imports for below-fold sections (TestimonialsCarousel, gallery sections). Implement route-based code splitting

**Excessive hardcoded image arrays loaded upfront:**
- Problem: Gallery arrays with 10+ image URLs loaded on page render, even if user never scrolls to gallery
- Files: `src/app/catalogue/danube-imperial/page.tsx` (lines 179-184), cruise card images in `CruiseCards.tsx`
- Cause: All images defined as constants and rendered in JSX
- Improvement path: Lazy load gallery images or use intersection observer. Implement progressive image loading (blur-up technique)

**No image optimization:**
- Problem: All external images served at full resolution. No responsive srcset, no format optimization (webp)
- Files: All components using `<img>` tags
- Cause: Using HTML `<img>` not Next.js `<Image>` component
- Improvement path: Replace all `<img>` with Next.js `<Image>` component for automatic optimization. Add srcset for responsive images

**Framer Motion animations not optimized:**
- Problem: `motion` components from framer-motion used but no optimization for motion queries or reduced motion preferences
- Files: `src/components/NavigationMenu.tsx`, `src/components/TestimonialsCarousel.tsx`, carousel components
- Cause: Animations run regardless of device performance or user preferences
- Improvement path: Add `prefers-reduced-motion` media query support. Use `will-change` judiciously. Profile animation performance on low-end devices

**Minimal CSS-in-JS optimization:**
- Problem: Large Tailwind CSS bundle includes all utility classes. No tree-shaking of unused classes
- Files: `tailwind.config.ts`, all components
- Cause: Default Tailwind setup without aggressive purging
- Improvement path: Verify purge config is correctly targeting all template files. Consider using PurgeCSS or Tailwind's built-in content config

## Fragile Areas

**TestimonialsCarousel responsive behavior:**
- Files: `src/components/TestimonialsCarousel.tsx` (lines 58-72)
- Why fragile: Uses `window.innerWidth` in render logic to determine visible count. Can cause hydration mismatch between server and client
- Safe modification: Move `getVisibleCount()` into useEffect, initialize state with safe default, listen to resize events only after component mounts
- Test coverage: No tests present; manual testing on various viewport sizes required

**NavigationMenu localStorage dependency:**
- Files: `src/components/NavigationMenu.tsx` (lines 29-40)
- Why fragile: Accesses localStorage during component initialization without browser check. Can throw if running in SSR context
- Safe modification: Wrap in `useEffect` hook with proper browser environment check. Initialize state with false, set true only after first hydration
- Test coverage: No tests; requires manual testing of font loading behavior

**CruiseCards with uncontrolled mock data:**
- Files: `src/components/CruiseCards.tsx`
- Why fragile: Component defines all cruise data internally with hardcoded URLs. No prop interface for external data
- Safe modification: Extract data to separate file before making it a reusable component. Currently only used once on homepage
- Test coverage: No tests; manual verification of card layout and interactions required

**Navigation data structure with type complexity:**
- Files: `src/data/navigationData.ts`, `src/types/navigation.ts`, `src/components/NavigationMenu.tsx` (lines 10-12)
- Why fragile: Complex type guards and conditional data handling (`isSectionWithTypes`). Small data structure changes can break rendering
- Safe modification: Add validation/tests for navigationData shape. Add JSDoc comments explaining expected structure
- Test coverage: No tests; type system provides some safety but runtime behavior untested

**Large SVG cabin map interactive areas:**
- Files: `src/app/catalogue/danube-imperial/page.tsx` (lines 750-877)
- Why fragile: Hardcoded SVG coordinates for cabin clickable areas. Changes to SVG dimensions require manual coordinate updates
- Safe modification: Extract SVG to separate component with prop-driven coordinates. Document coordinate system
- Test coverage: No tests; visual testing required on multiple screen sizes

## Scaling Limits

**Single-file page components hit maintenance ceiling at ~1200 lines:**
- Current capacity: Currently managing up to 1108 lines in `danube-imperial/page.tsx`
- Limit: Reading, debugging, and modifying files >1500 lines becomes significantly harder
- Scaling path: Break pages into reusable sub-components. Extract logic into hooks. Keep data separate from UI

**Hardcoded data doesn't scale to multiple similar pages:**
- Current capacity: 25+ pages, all with inline data arrays
- Limit: Updating a data field (e.g., price) requires manual edits across multiple files
- Scaling path: Create centralized data layer or data-driven page templates

**No testing infrastructure blocks parallel development:**
- Current capacity: Single developer can manage current codebase
- Limit: Multiple developers working on pages risk breaking existing functionality
- Scaling path: Add Jest + React Testing Library. Require tests for new components

**Console.warn and manual logging insufficient for production:**
- Current capacity: Manual debugging works for development
- Limit: Production bugs invisible; no error tracking or monitoring
- Scaling path: Add error boundary components. Integrate with error tracking service (Sentry, Rollbar)

## Dependencies at Risk

**Framer Motion major version upgrades:**
- Risk: `framer-motion` ^12.23.22 — breaking changes in major versions common
- Impact: Animations throughout site could break on upgrade; requires careful migration testing
- Migration plan: Pin to current working version. Create upgrade test checklist before updating

**Lucide-react version incompatibilities:**
- Risk: `lucide-react` ^0.544.0 — icon library changes can cause import errors
- Impact: Missing icons if Material Symbols icons are replaced but not all usages updated
- Migration plan: Stick with current version. Audit all icon usages before version bump

**TypeScript version compatibility:**
- Risk: `typescript` ^5.0.0 — might become outdated; strict mode can break builds on minor versions
- Impact: Build failures on CI/CD without explicit version pinning
- Migration plan: Use exact version in production (no ^). Review breaking changes in minor releases

**Next.js 14.0.0 long-term support:**
- Risk: Current Next.js ^14.0.0 will eventually need upgrade for security/performance
- Impact: Significant refactoring needed for major version upgrade (App Router already in use)
- Migration plan: Plan major version upgrade every 12-18 months. Test thoroughly on staging

## Missing Critical Features

**No error boundaries or fallback UI:**
- Problem: If a component throws error, entire page crashes
- Blocks: Robust user experience; can't gracefully handle data loading failures
- Recommendation: Add error boundary component wrapping major sections

**No loading states or skeletons:**
- Problem: If data loading is added later, UI appears broken while loading
- Blocks: Adding dynamic data loading without poor UX
- Recommendation: Implement skeleton loaders for data-driven sections

**No form validation or submission handling:**
- Problem: Contact form and newsletter signup have no client-side validation
- Blocks: Improving UX for form interactions
- Recommendation: Add form library (react-hook-form) with Zod validation

**No analytics or tracking:**
- Problem: No visibility into user behavior, page performance, or conversion funnels
- Blocks: Data-driven optimization and business intelligence
- Recommendation: Add Google Analytics 4 or Plausible. Implement event tracking for conversions

**No accessible color contrast checking:**
- Problem: Some text combinations may not meet WCAG AA standards
- Blocks: Full accessibility compliance
- Recommendation: Run color contrast audit. Add CI check for color contrast violations

**No i18n support:**
- Problem: Entire site hardcoded in French; English or other languages not possible
- Blocks: International expansion
- Recommendation: If multilingual support needed, implement using next-i18next

## Test Coverage Gaps

**No unit tests for any component:**
- What's not tested: Component rendering, event handlers, state changes, conditional logic
- Files: All files in `src/components/` and `src/app/`
- Risk: Refactoring breaks functionality undetected. Logic errors compound over time
- Priority: High — critical for maintaining code quality as codebase grows

**No integration tests:**
- What's not tested: Page routing, cross-component interactions, data flow between components
- Files: All page layouts and navigation flows
- Risk: Broken navigation or layout issues only caught by manual testing
- Priority: Medium — important for multi-component features

**No visual regression tests:**
- What's not tested: CSS changes, responsive behavior, visual alignment
- Files: Styling across all components
- Risk: Small CSS changes can break layout unexpectedly
- Priority: Medium — especially important for fragile layout sections (danube-imperial)

**No E2E tests:**
- What's not tested: Full user journeys (search→cruise details→booking flow, navigation between pages)
- Files: All pages and components
- Risk: Cross-page bugs only found by manual QA
- Priority: Medium — particularly important for conversion funnels

**No accessibility tests:**
- What's not tested: Keyboard navigation, screen reader compatibility, ARIA labels, color contrast
- Files: All interactive components
- Risk: Site unusable for assistive technology users
- Priority: High — required for inclusive design

---

*Concerns audit: 2026-02-14*
