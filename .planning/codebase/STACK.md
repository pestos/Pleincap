# Technology Stack

**Analysis Date:** 2026-02-14

## Languages

**Primary:**
- TypeScript 5.0+ - Entire codebase uses strict mode
- JSX/TSX - React components and pages

## Runtime

**Environment:**
- Node.js (version specified in lockfile as `^12.22.0` minimum)

**Package Manager:**
- npm - Lockfile: `package-lock.json` (lockfileVersion 3)

## Frameworks

**Core:**
- Next.js 14.0.0 - Full-stack React framework for SSR, SSG, and static export
- React 18.3.1 - UI library
- React DOM 18.3.1 - DOM binding for React

**Styling:**
- Tailwind CSS 3.3.0 - Utility-first CSS framework
- PostCSS 8.0.0 - CSS transformation tool
- Autoprefixer 10.0.0 - Vendor prefix management

**UI Components & Animation:**
- Framer Motion 12.23.22 - Animation library for React components
- Lucide React 0.544.0 - Icon library used for navigation and UI elements

**Build & Dev:**
- Next.js built-in dev server (runs via `next dev`)
- Next.js build system (via `next build`)

## Key Dependencies

**Critical:**
- next@14.0.0 - Framework with built-in optimizations for production
- react@18.3.1 - Core rendering engine
- tailwindcss@3.3.0 - Design system implementation
- framer-motion@12.23.22 - Interactive animations and transitions (used in carousels, page transitions)

**Development/Type Safety:**
- typescript@5.0.0 - Type checking and compilation
- @types/react@18.2.0 - React TypeScript definitions
- @types/react-dom@18.2.0 - React DOM TypeScript definitions
- @types/node@20.0.0 - Node.js TypeScript definitions

**Linting & Code Quality:**
- eslint@8.0.0 - JavaScript linter
- eslint-config-next@14.0.0 - Next.js ESLint configuration preset

## Configuration

**Environment:**
- No `.env` files detected - Configuration appears to be static
- Content is hardcoded in source files (images, navigation data, contact info)

**Build:**
- `tsconfig.json` - TypeScript configuration with:
  - Target: ES5
  - Module: ESNext
  - Path alias: `@/*` → `./src/*`
  - Strict mode enabled
  - JSX preset: preserve (handled by Next.js)

**Styling:**
- `tailwind.config.ts` - Tailwind configuration with custom theme
  - Dark mode: class-based
  - Custom colors: primary (#C5A059), abyss (#1a2b3c), ecru (#F9F8F6)
  - Custom fonts: Plus Jakarta Sans, Playfair Display, Montserrat, Inter
  - Border radius: 0px (sharp corners except full)

- `postcss.config.js` - PostCSS configuration with tailwindcss and autoprefixer plugins

**Google Fonts:**
- Material Symbols Outlined - Icon font via CDN
- Playfair Display - Serif font for headings
- Inter - Sans-serif font
- Plus Jakarta Sans - Display font (custom configuration in Next.js pages)
- Montserrat - Alternative sans-serif font

## Platform Requirements

**Development:**
- Node.js 12.22.0 or later
- npm or equivalent package manager
- TypeScript 5.0+
- Modern browser with ES5 support

**Production:**
- Next.js optimized Node.js server or static hosting
- Deployment targets: Vercel (native support), any Node.js host, or static export

---

*Stack analysis: 2026-02-14*
