# Coding Conventions

**Analysis Date:** 2026-02-14

## Naming Patterns

**Files:**
- Component files: PascalCase with `.tsx` extension (e.g., `SiteHeader.tsx`, `CruiseCards.tsx`)
- Page files: kebab-case inside `src/app/` directory structure (e.g., `/src/app/catalogue/page.tsx`, `/src/app/nos-bateaux/page.tsx`)
- Data/type files: kebab-case with clear purpose (e.g., `navigationData.ts`, navigation.ts`)
- Client-marked files: Always use `'use client'` directive at top for interactive components

**Functions:**
- Component functions: PascalCase for React components (e.g., `export default function SiteHeader()`)
- Event handlers: camelCase with `handle` prefix (e.g., `handleSubmit`, `onMouseEnter`, `onMouseLeave`)
- Helper functions: camelCase (e.g., `renderStars`, `isSectionWithTypes`, `setHoveredId`)
- State setters: camelCase following React conventions (e.g., `setScrolled`, `setMenuOpen`, `setFilterBy`)

**Variables:**
- State variables: camelCase (e.g., `scrolled`, `menuOpen`, `hoveredId`, `filterBy`)
- Constants (mock data): lowercase with descriptive names (e.g., `cruises`, `navItems`)
- Boolean flags: camelCase, prefixed when context-dependent (e.g., `didError`, `isOpen`, `isTypeSection`)
- Configuration objects: camelCase (e.g., `backgroundColor`, `textColor`, `accentColor`)

**Types:**
- Type definitions: PascalCase (e.g., `NavigationType`, `SectionContentWithTypes`, `Offer`)
- Type aliases: PascalCase (e.g., `NavigationSection`)
- Type/Interface imports: Explicitly imported with `type` keyword (e.g., `import type { Metadata }`)
- Props interfaces: ComponentNameProps pattern (e.g., `NavigationMenuProps`)

## Code Style

**Formatting:**
- No explicit linter config found (.eslintrc not configured)
- Next.js default linting via `npm run lint` uses ESLint with eslint-config-next
- Default Next.js 14 lint rules are applied
- Indentation: 2 spaces (observed consistently across codebase)
- String quotes: Double quotes throughout TypeScript/TSX files
- Semicolons: Present at end of statements

**Linting:**
- Framework: ESLint with eslint-config-next (Next.js 14.0.0)
- Command: `npm run lint` (invokes `next lint`)
- No custom ESLint configuration present - uses Next.js defaults
- No Prettier configuration found - formatting follows Next.js conventions

## Import Organization

**Order:**
1. React and Next.js core imports (e.g., `import type { Metadata }`, `import { useState }`)
2. Third-party libraries (lucide-react icons, framer-motion)
3. Relative imports (components, types, data)
4. CSS/styling imports (globals.css)
5. Type imports marked explicitly with `type` keyword

**Examples:**
```typescript
// Order from CruiseCards.tsx
import { useState, useMemo } from "react";
import { Star, BedDouble, Plane, SlidersHorizontal } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";
```

**Path Aliases:**
- Alias: `@/` points to `src/` directory
- Usage: `import { navItems } from '@/data/navigationData'`
- Used throughout: components, types, app layouts all use `@/` paths

## Error Handling

**Patterns:**
- Try-catch not commonly used; component-level error handling via state
- Image fallback pattern: `ImageWithFallback` component wraps `<img>` with error state (`didError`)
- Event handler pattern with optional chaining: `e?.preventDefault()`
- No formal error boundary implementation detected
- Error state displayed as fallback UI (e.g., placeholder SVG in ImageWithFallback)

**Specific Implementation (ImageWithFallback):**
```typescript
// Store error state
const [didError, setDidError] = useState(false);

// Render fallback on error
onError={() => setDidError(true)}

// Show placeholder SVG when image fails
if (didError) {
  return <div className={...}>[fallback UI]</div>
}
```

## Logging

**Framework:** `console` object (no external logging library)

**Patterns:**
- Minimal logging observed in production code
- Warning logged in NavigationMenu.tsx: `console.warn('Failed to load font, falling back to system fonts')`
- No structured logging or log levels implemented
- Development debugging via browser console

## Comments

**When to Comment:**
- Sparse commenting observed - code is generally self-documenting
- Comments used for section headers in JSX: `{/* HERO */}`, `{/* SEARCH BOX (OVERLAP HERO) */}`
- Business logic comments rare
- Visual sections marked with descriptive comments

**JSDoc/TSDoc:**
- No JSDoc comments found in codebase
- TypeScript types provide documentation instead
- Prop interfaces used as implicit documentation

## Function Design

**Size:**
- Page components: Large (300-1100+ lines) with inline JSX
- Utility components: Small-medium (30-150 lines)
- Helper functions: Very small (5-30 lines)
- Event handlers: 1-10 lines typically

**Parameters:**
- React props: Destructured in function signature
- Props use TypeScript interfaces for type safety
- Default values provided in destructuring (e.g., `backgroundColor = "transparent"`)
- Spread operator used for remaining props: `{ src, alt, className, style, ...rest } = props`

**Return Values:**
- Components: Always return JSX elements
- Event handlers: No return value
- Helper functions: Directly return computed values (no wrapper objects)
- State setters: Void (handle state updates inline)

## Module Design

**Exports:**
- Default exports for page components: `export default function Home()`
- Default exports for reusable components: `export default function CruiseCards()`
- Named exports for utilities: `export const navItems = [...]`
- Type exports: `export type NavigationType = { ... }`

**Barrel Files:**
- Not used in this codebase
- Each component/type imported directly from source file
- Navigation data exported as named exports for convenience

**Export Pattern Examples:**
```typescript
// Components - default export
export default function SiteHeader() { ... }

// Data - named exports
export const navItems = ["CROISIERES", ...]
export const sectionContent: Record<string, ...> = { ... }

// Types - type keyword
export type NavigationType = { ... }
export interface NavigationMenuProps { ... }
```

## Tailwind CSS Usage

**Classes:**
- Extensive inline Tailwind classes (not component-level abstractions)
- Responsive prefixes: `md:`, `lg:`, `max-lg:`, `max-[1700px]:`, etc.
- Dark mode classes: `dark:bg-abyss`, `dark:text-ecru`
- Custom colors from config: `primary`, `abyss`, `ecru`, `background-light`, `background-dark`
- Utility-first approach with no custom class definitions in components

**Custom Config (from tailwind.config.ts):**
- Custom colors: `primary: #C5A059`, `abyss: #1a2b3c`, `ecru: #F9F8F6`
- Custom fonts: `serif: Playfair Display`, `inter: Inter`
- Border radius override: All standard sizes set to `0px` (sharp edges)
- Dark mode: Enabled via `darkMode: 'class'`

## Global CSS Patterns

**Defined in globals.css:**
- `.serif-heading`: Applies Playfair Display font for headings
- `.sharp-edge`: Forces border-radius to 0 with !important
- `.drop-cap`: First letter styling for narrative sections (Playfair Display, 5rem, gold color)
- `.trust-mark`: Section marks with bottom line decoration (pseudo-element ::after)

## Client vs Server Components

**'use client' Directive:**
- Used for interactive components needing React hooks
- Examples: `SiteHeader.tsx` (useState, useEffect), `CruiseCards.tsx` (useState, useMemo), `Footer.tsx` (useState)
- Page layout root component (`layout.tsx`) is server component
- Client components can import server components

---

*Convention analysis: 2026-02-14*
