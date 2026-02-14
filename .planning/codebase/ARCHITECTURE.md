# Architecture

**Analysis Date:** 2026-02-14

## Pattern Overview

**Overall:** Next.js App Router with Server Components and Client Components for SSR/SSG

**Key Characteristics:**
- File-based routing using Next.js 14 App Router (`/src/app` directory)
- Mix of Server Components (default) and Client Components ('use client') for interactivity
- Static data embedded in page components with TypeScript interfaces
- Component-based UI layer with shared layout structure (SiteHeader, SiteFooter)
- Tailwind CSS for styling with custom color theme (primary: #C5A059, abyss: #1a2b3c, ecru: #F9F8F6)
- No backend API routes; data sourced from component-level constants and external URLs

## Layers

**Presentation Layer:**
- Purpose: Render UI components and pages
- Location: `src/app/` and `src/components/`
- Contains: Page components, layout components, interactive UI (forms, carousels, modals)
- Depends on: Tailwind CSS, Next.js fonts, Lucide icons, Framer Motion for animations
- Used by: Directly accessed via URL routing

**Component Layer:**
- Purpose: Reusable UI modules consumed by pages
- Location: `src/components/`
- Contains: SiteHeader.tsx, SiteFooter.tsx, CruiseCards.tsx, NavigationMenu.tsx, TestimonialsCarousel.tsx, CruiseSearchBar.tsx, and specialized components
- Depends on: React hooks (useState, useEffect, useMemo), Lucide icons, external image URLs
- Used by: Multiple page components

**Data Layer:**
- Purpose: Static data and type definitions
- Location: `src/data/` and `src/types/`
- Contains: navigationData.ts (navigation structure with cruise offers, types, icons), type definitions for Navigation, Offer, BlogPost
- Depends on: Lucide icons (for type definitions)
- Used by: Navigation components, pages requiring structured data

**Page Router Layer:**
- Purpose: Handle routing and page structure
- Location: `src/app/[route]/page.tsx` files
- Contains: 15+ page files for destinations, cruises, team, blog, contact, etc.
- Pattern: Each route has its own page.tsx file; nested routes use directory structure (e.g., `/nos-bateaux/amadeus-diamond/page.tsx`)
- Metadata export for SEO (title, description)

## Data Flow

**Page Load Flow:**

1. User navigates to route (e.g., `/catalogue`)
2. Next.js App Router matches route to `src/app/catalogue/page.tsx`
3. Page component (Server Component by default) imports SiteHeader and SiteFooter
4. Page component fetches static data (embedded arrays like `cruises[]`, `itineraries[]`)
5. Child components (CruiseCards, etc.) receive data as props
6. Client Components marked with 'use client' hydrate for interactivity (filtering, sorting, hovering)
7. Tailwind CSS classes apply styling
8. SiteHeader includes external fonts (Playfair Display, Inter) via Google Fonts API
9. Page renders with SSR (Static Generation where possible)

**Example from `/src/app/catalogue/page.tsx`:**
- Imports SiteHeader, SiteFooter, Plus_Jakarta_Sans font
- Defines cruises array with CruiseCard interface
- Returns JSX with metadata export
- CruiseCards component handles filtering and hover state via 'use client'

**State Management:**
- Local component state via `useState` (e.g., filter state in CruiseCards, menu open state in SiteHeader)
- No global state management (Redux, Zustand, Context API not used)
- Scroll position tracking in SiteHeader via useEffect listener

## Key Abstractions

**Navigation Menu System:**
- Purpose: Central navigation structure for cruise types, offers, items
- Examples: `src/data/navigationData.ts`, `src/types/navigation.ts`
- Pattern: navigationData exports sectionContent object keyed by section name ("CROISIERES", "VOYAGES", etc.); each section has title, description, icon, and either types+offers OR items
- Type hierarchy: SectionContentBase → SectionContentWithTypes | SectionContentWithItems

**Cruise Card Component:**
- Purpose: Display and filter cruise offerings
- File: `src/components/CruiseCards.tsx`
- Pattern: Client Component with internal mock data array; useState for filtering/hovering; useMemo for computed filtering
- Filters: By destination, price range, date, flight inclusion, rating

**Layout Wrapper Pattern:**
- Purpose: Consistent page structure across all routes
- Files: Every page file in `src/app/*/page.tsx`
- Pattern: `<div wrapper> <SiteHeader /> <main> {content} </main> <SiteFooter /> </div>`
- Example: `src/app/blog/page.tsx`, `src/app/equipe/page.tsx`

**Data Embedding Pattern:**
- Purpose: Keep content close to page components without CMS
- Pattern: TypeScript interfaces defined at page level (BlogPost, CruiseCard, TeamMember, Itinerary)
- Example: `src/app/blog/page.tsx` defines BlogPost interface and blogPosts[] array with 40+ posts
- All image URLs point to external domains (plein-cap.com, unsplash.com, googleusercontent.com)

**Hero Section Pattern:**
- Purpose: Full-screen header with video/image background
- Pattern: Absolute positioned video/background, overlay gradient, z-index layering
- Used in: Home page, destinations page, individual boat pages

## Entry Points

**Root Entry Point:**
- Location: `src/app/layout.tsx`
- Triggers: Every page load
- Responsibilities: HTML structure (lang="fr"), metadata export (title, description), external font link (Material Symbols, Playfair, Inter), body wrapper with children

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: User navigates to `/`
- Responsibilities: Hero section with video background, search box overlay, multiple content sections (27KB file with many sections embedded)

**Route Entry Points (Examples):**
- `src/app/catalogue/page.tsx`: Cruise catalogue with filtering
- `src/app/destinations/page.tsx`: Destinations with client-side component (DestinationsClient.tsx)
- `src/app/blog/page.tsx`: Blog posts with client-side filtering
- `src/app/nos-bateaux/amadeus-diamond/page.tsx`: Boat detail page with specs and cabin info

**Header Navigation Entry Point:**
- Location: `src/components/SiteHeader.tsx`
- Triggers: Every page load (fixed header)
- Responsibilities: Logo, navigation menu, top nav links, scroll-based styling, menu open/close state, keyboard escape handler

## Error Handling

**Strategy:** No explicit error handling layer; relies on Next.js default error pages

**Patterns:**
- ImageWithFallback component (`src/components/ImageWithFallback.tsx`): Falls back to placeholder if image URL fails
- External image URLs loaded from plein-cap.com and unsplash.com; broken links render as broken images (no error boundary)
- No try/catch blocks in component code; all operations are synchronous or stateless

## Cross-Cutting Concerns

**Logging:** None detected; no console.log statements in production code

**Validation:** Form inputs in CruiseSearchBar and contact pages do not validate; inputs are HTML only

**Authentication:** None; site is public read-only (no user accounts, login, or protected routes)

**Styling Strategy:** Tailwind CSS utility classes; custom theme colors defined in `tailwind.config.ts`; dark mode support via 'class' darkMode config

**Fonts:** Multiple font families injected via Google Fonts:
- Playfair Display (serif, used in metadata export from pages)
- Inter (sans-serif, metadata)
- Plus Jakarta Sans (sans-serif, loaded in specific pages like catalogue, destinations, equipe)
- Material Symbols Outlined (icons, loaded in layout.tsx)

**Animations:** Framer Motion library imported but usage pattern not fully explored; likely for carousel/transition animations in TestimonialsCarousel.tsx and TravelSlider.tsx

---

*Architecture analysis: 2026-02-14*
