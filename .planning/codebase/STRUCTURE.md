# Codebase Structure

**Analysis Date:** 2026-02-14

## Directory Layout

```
pleincap/
├── src/                      # Source code
│   ├── app/                  # Next.js App Router routes
│   │   ├── layout.tsx        # Root layout wrapper
│   │   ├── page.tsx          # Home page
│   │   ├── globals.css       # Global CSS imports
│   │   ├── blog/
│   │   │   └── page.tsx      # Blog listing with filtering
│   │   ├── catalogue/
│   │   │   ├── page.tsx      # Cruise catalogue with filtering
│   │   │   └── danube-imperial/
│   │   │       └── page.tsx  # Specific cruise detail
│   │   ├── contact/
│   │   │   └── page.tsx      # Contact form page
│   │   ├── destinations/
│   │   │   ├── page.tsx      # Destinations listing
│   │   │   └── DestinationsClient.tsx  # Client component for filtering
│   │   ├── equipe/
│   │   │   └── page.tsx      # Team member profiles
│   │   ├── escapades-culturelles/
│   │   │   └── page.tsx      # Cultural getaways
│   │   ├── livre-d-or/
│   │   │   └── page.tsx      # Testimonials/guestbook
│   │   ├── news-letter/
│   │   │   ├── page.tsx      # Newsletter listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Newsletter detail (dynamic route)
│   │   ├── nos-bateaux/
│   │   │   ├── page.tsx      # Fleet overview
│   │   │   ├── amadeus-diamond/
│   │   │   │   └── page.tsx  # Boat detail: specs, cabins, amenities
│   │   │   └── nile-excellence/
│   │   │       └── page.tsx  # Boat detail
│   │   ├── nos-conferenciers/
│   │   │   └── page.tsx      # Conference speakers
│   │   ├── notre-histoire/
│   │   │   └── page.tsx      # Company history
│   │   ├── orient-express/
│   │   │   └── page.tsx      # Orient-Express train journeys
│   │   ├── special-groupes/
│   │   │   └── page.tsx      # Group travel offerings
│   │   ├── visioconference/
│   │   │   └── page.tsx      # Virtual conference page
│   │   └── voyages-en-train/
│   │       └── page.tsx      # Train journey catalogue
│   ├── components/           # Reusable React components
│   │   ├── SiteHeader.tsx    # Fixed header with navigation
│   │   ├── SiteFooter.tsx    # Footer component
│   │   ├── NavigationMenu.tsx # Dropdown navigation menu
│   │   ├── CruiseCards.tsx   # Cruise card display with filtering
│   │   ├── CruiseSearchBar.tsx  # Search/filter bar
│   │   ├── TestimonialsCarousel.tsx  # Scrollable testimonials
│   │   ├── TravelSlider.tsx  # Image carousel
│   │   ├── MostPopularTour.tsx  # Popular tour card
│   │   ├── AdventureAndTravels.tsx  # Adventure section component
│   │   ├── Footer.tsx        # Alternative footer (legacy?)
│   │   ├── ImageWithFallback.tsx  # Image with fallback rendering
│   │   └── EscapadesIntro.tsx   # Intro text for escapades section
│   ├── data/                 # Static data and constants
│   │   └── navigationData.ts # Navigation menu structure, cruise offers, section content
│   └── types/                # TypeScript type definitions
│       └── navigation.ts     # Navigation-related types (NavigationType, Offer, SectionContent, etc.)
├── public/                   # Static assets (images, video)
│   ├── bannerDestination.jpg
│   ├── travel video footage.mp4
│   ├── visio.jpg
│   └── new.jpg
├── .planning/                # GSD planning documents
│   └── codebase/
├── .sisyphus/                # Task tracking system
├── .next/                    # Next.js build output (generated)
├── node_modules/             # Dependencies (generated)
├── package.json              # Project manifest
├── package-lock.json         # Dependency lock file
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS theme and plugins
├── postcss.config.js         # PostCSS configuration
├── next-env.d.ts             # Next.js type definitions
└── README.md                 # Project readme
```

## Directory Purposes

**src/app/:**
- Purpose: Next.js App Router page routes
- Contains: page.tsx files for each route, layout wrappers, CSS files
- Key files: `page.tsx` in each directory follows Next.js convention
- Routing: Folder structure maps directly to URL paths

**src/components/:**
- Purpose: Reusable React components
- Contains: Exported React components (.tsx files)
- Naming: PascalCase file names (e.g., SiteHeader.tsx, CruiseCards.tsx)
- Pattern: Most components marked with 'use client' for interactivity; SiteHeader uses hooks for scroll detection and menu state

**src/data/:**
- Purpose: Static data, constants, configuration
- Contains: navigationData.ts with cruise offers, menu structure, section definitions
- Key files: navigationData.ts exports sectionContent object and navItems array
- Imports Lucide React icons for navigation

**src/types/:**
- Purpose: Shared TypeScript type definitions
- Contains: Navigation-related types (NavigationType, Offer, SectionContent, SectionContentWithTypes, SectionContentWithItems)
- Usage: Imported by components and data files for type safety

**public/:**
- Purpose: Static assets served directly
- Contains: Images (bannerDestination.jpg, new.jpg, visio.jpg), video (travel video footage.mp4)
- Accessed via: Relative paths like `/bannerDestination.jpg` in components

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout with HTML structure, metadata, font imports
- `src/app/page.tsx`: Home page (27KB, largest file)

**Configuration:**
- `tailwind.config.ts`: Theme colors (primary: #C5A059), fonts (Playfair Display, Inter, Plus Jakarta Sans, Montserrat), border radius, dark mode
- `tsconfig.json`: Path alias `@/*` → `./src/*`, strict mode enabled
- `package.json`: Next.js 14, React 18.3.1, TypeScript 5.0.0, Tailwind 3.3.0, Framer Motion 12.23.22, Lucide React 0.544.0
- `postcss.config.js`: PostCSS with autoprefixer and Tailwind

**Core Logic:**
- `src/components/SiteHeader.tsx`: Navigation, scroll detection, menu state (320 lines)
- `src/components/CruiseCards.tsx`: Cruise listing with filtering (319 lines)
- `src/components/NavigationMenu.tsx`: Navigation menu with sections (406 lines - largest component)
- `src/data/navigationData.ts`: Navigation structure and cruise data

**Testing:**
- Not detected; no test files (*.test.tsx, *.spec.tsx) found

## Naming Conventions

**Files:**
- Page files: `page.tsx` (Next.js convention)
- Component files: PascalCase (SiteHeader.tsx, CruiseCards.tsx)
- Data files: camelCase (navigationData.ts)
- Type files: camelCase (navigation.ts)
- Style files: globals.css at root of app directory

**Directories:**
- Page routes: kebab-case (nos-bateaux, escapades-culturelles, notre-histoire, special-groupes, news-letter)
- Component directory: components/
- Data directory: data/
- Type directory: types/

**Components (TypeScript):**
- Exported as default or named; mostly default exports
- Props interface suffix: e.g., `NavigationMenuProps`
- Component names match file names

**Functions and Variables:**
- camelCase (setScrolled, setMenuOpen, filterBy, hoveredId)
- React hooks follow standard naming (useState, useEffect, useMemo)
- Constants uppercase (e.g., navItems, sectionContent)

## Where to Add New Code

**New Feature (e.g., new page route):**
- Primary code: Create new directory in `src/app/[route-name]/` with `page.tsx`
- Tests: No test pattern established; tests should go in `src/app/[route-name]/__tests__/` (new convention needed)
- Example: For `/products` route, create `src/app/products/page.tsx`

**New Component/Module (shared across pages):**
- Implementation: `src/components/[ComponentName].tsx`
- Props type: Define interface above component or in separate types file if complex
- Example: New listing component goes in `src/components/ListingCard.tsx`

**Utilities/Helpers:**
- Shared helpers: Create `src/utils/` directory (currently missing; should be added)
- Pattern: Export named functions, reuse in multiple components
- Example: Image URL validation, date formatting, filtering logic

**Data/Constants:**
- Page-specific data: Embed directly in page file (current pattern in `blog/page.tsx`, `equipe/page.tsx`, `catalogue/page.tsx`)
- Shared navigation data: Add to `src/data/navigationData.ts`
- Global constants: Create `src/constants/` directory (currently missing)

## Special Directories

**[route-name]/ directories under src/app/:**
- Purpose: Next.js file-based routing
- Generated: No
- Committed: Yes
- Each directory contains a `page.tsx` file that becomes a route

**public/:**
- Purpose: Static asset serving
- Generated: No
- Committed: Yes
- Images and video files served at root path

**.next/:**
- Purpose: Next.js build output and cache
- Generated: Yes (by `next build` and `next dev`)
- Committed: No (should be in .gitignore)

**node_modules/:**
- Purpose: Installed npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No

## Current Patterns for New Implementation

**Page Component Pattern:**
```typescript
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: 'Page Title | Plein Cap',
  description: 'Page description'
}

export default function PageName() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light text-abyss">
      <SiteHeader />
      <main className="flex-1">
        {/* Page content */}
      </main>
      <SiteFooter />
    </div>
  )
}
```

**Component Pattern:**
```typescript
'use client'

import { useState, useEffect } from 'react'
import { LucideIcon } from 'lucide-react'

interface ComponentProps {
  // Props definition
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState(null)

  useEffect(() => {
    // Setup logic
  }, [])

  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```

**Data Structure Pattern (in page files):**
```typescript
interface DataItem {
  id: number
  title: string
  description: string
  image: string
}

const data: DataItem[] = [
  { id: 1, title: '...', description: '...', image: 'https://...' },
]
```

## Path Alias Usage

**Alias:** `@/*` → `src/*`

**Usage:** All imports use the `@/` prefix:
- `import SiteHeader from '@/components/SiteHeader'`
- `import { navigationData } from '@/data/navigationData'`
- `import type { NavigationType } from '@/types/navigation'`

---

*Structure analysis: 2026-02-14*
