# Testing Patterns

**Analysis Date:** 2026-02-14

## Test Framework

**Status:** Not configured - No testing infrastructure present

**Runner:**
- Not installed (no Jest, Vitest, or other test runner in package.json)
- No test configuration files found (jest.config.*, vitest.config.*)
- No test dependencies in `package.json`

**Assertion Library:**
- Not applicable - testing not configured

**Current Setup:**
```json
// package.json - Only linting configured, no testing
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Run Commands:**
```bash
# No test commands currently available
npm run dev              # Development server
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint with Next.js config
```

## Test File Organization

**Location:**
- No test files present in codebase
- No `__tests__` directories
- No `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` files in `src/`

**Naming Convention (if implemented):**
- Suggested: Test files co-located with source (e.g., `SiteHeader.tsx` → `SiteHeader.test.tsx`)
- Alternative: Centralized `tests/` or `__tests__/` directory matching src structure

**Structure:**
- Not applicable - testing not configured

## Test Structure

**No established patterns** - testing framework not set up

**If testing were to be implemented**, recommended patterns based on codebase:

**Component Testing Pattern (Recommended):**
```typescript
// Would follow Next.js + React Testing Library conventions
// Example structure for testing src/components/SiteHeader.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import SiteHeader from './SiteHeader';

describe('SiteHeader', () => {
  it('renders navigation menu', () => {
    render(<SiteHeader />);
    expect(screen.getByText('PLEIN CAP')).toBeInTheDocument();
  });

  it('toggles menu on button click', () => {
    render(<SiteHeader />);
    const menuButton = screen.getByLabelText(/menu/i);
    fireEvent.click(menuButton);
    // assertions...
  });
});
```

**Patterns Observed in Code:**
- Hooks used extensively: `useState`, `useEffect`, `useMemo`
- State management: Local component state only (no Redux, Context API minimal)
- Side effects: Event listeners cleanup pattern in `useEffect` return
- Memoization: `useMemo` used for computed values (e.g., filtered/sorted cruise list)

## Mocking

**Framework:**
- Not applicable - Jest/Vitest not configured

**Testing Approach (if implemented):**
- Component props testing (passing mock data objects)
- Mock data examples already exist in components:
  - `CruiseCards.tsx`: Hardcoded `cruises` array for demo data
  - `navigationData.ts`: Complete mock navigation structure
  - `Footer.tsx`: Mock company information with defaults

**Mockable Dependencies:**
```typescript
// Example mockable items in current codebase:

// 1. API/Data (currently hardcoded)
const cruises = [ /* mock data */ ];  // in CruiseCards.tsx

// 2. External libraries (lucide-react icons)
import { Star, BedDouble } from 'lucide-react';

// 3. Navigation data
import { navItems, sectionContent } from '@/data/navigationData';

// 4. Image handling (ImageWithFallback component)
```

**What to Mock (if testing):**
- External API calls (none currently, all data hardcoded)
- lucide-react icon components
- Image loading/errors (already has fallback pattern)
- Browser APIs: `window.scrollY`, `localStorage` (used in NavigationMenu)

**What NOT to Mock:**
- React hooks (`useState`, `useEffect`, `useMemo`) - test behavior instead
- Component rendering logic
- CSS classes (test functionality not styles)

## Fixtures and Factories

**Test Data:**
- Mock data currently exists as hardcoded arrays in components
- Example from `CruiseCards.tsx`:
```typescript
const cruises = [
  {
    id: 1,
    destination: "De l'Afrique du Sud aux Trésors de l'Océan Indien",
    price: 1299,
    nights: 7,
    departureDate: "12 juin 2024",
    departureDateTimestamp: new Date("2024-06-12").getTime(),
    // ... more properties
  },
  // ... more cruise objects
];
```

**Navigation Test Data (from navigationData.ts):**
```typescript
export const navItems = ["CROISIERES", "VOYAGES", "NOS BATEAUX", ...];

export const sectionContent: Record<string, ...> = {
  "CROISIERES": {
    title: "Nos Croisières",
    types: [ /* types */ ],
    offers: [ /* offers */ ]
  },
  // ... more sections
};
```

**Location (if structured tests):**
- Suggested: `tests/fixtures/` directory
- Suggested: Factory functions in `tests/factories/` for dynamic data generation
- Current: Inline in components (not ideal for testing)

## Coverage

**Requirements:** Not enforced - No testing configured

**Current State:**
- No coverage tool installed
- No coverage thresholds set
- No coverage reports generated

**If Coverage Tool Were Added:**
```bash
# Hypothetical setup (if Jest were configured)
npm run test:coverage    # Would generate coverage report
```

**Untested Code (100% untested):**
- All React components: `SiteHeader.tsx`, `CruiseCards.tsx`, `Footer.tsx`, etc.
- All pages: `/src/app/**/*.tsx`
- All utility hooks: `useState`, `useEffect`, `useMemo` logic
- All data transformations: Filtering, sorting, rendering stars
- Event handlers: Click, scroll, keyboard events

## Test Types

**Unit Tests:**
- Not implemented
- Candidates for unit testing:
  - `ImageWithFallback` component (error state handling)
  - Helper functions: `renderStars()` (star rating display)
  - Data filtering: `sortedCruises` memoization logic in CruiseCards
  - Type guards: `isSectionWithTypes()` in NavigationMenu

**Integration Tests:**
- Not implemented
- Candidates for integration testing:
  - Navigation menu interactions with data display
  - Form submission in Footer (email subscribe)
  - Filter interactions in CruiseCards (dropdown + sorting)
  - Mobile menu toggle in SiteHeader

**E2E Tests:**
- Not configured
- Framework: Could use Playwright, Cypress, or WebDriver
- Candidate flows:
  - User navigates through cruise catalogue
  - User filters cruises by date/price
  - User subscribes to newsletter
  - Responsive layout on mobile

## Test Dependencies (Recommended Setup)

**If Testing to be Implemented:**

```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@types/jest": "^29.0.0"
  }
}
```

**Alternative Stack (Vitest + Playwright):**
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

## Key Testing Gaps

**High Priority (Functional correctness):**
1. `SiteHeader` component - Menu toggle, scroll behavior, keyboard escape handler
2. `CruiseCards` component - Filter/sort functionality, star rating display
3. `NavigationMenu` component - Font loading, state management, hover interactions

**Medium Priority (User interactions):**
1. `Footer` - Email subscription form handling
2. `ImageWithFallback` - Error state transitions
3. Page filters and search functionality

**Low Priority (Display logic):**
1. CSS class application
2. Layout responsiveness
3. Dark mode toggle

## Current Testing Approach

**Observed Practices:**
- Manual testing only (developer runs `npm run dev` and tests in browser)
- No automated test suite
- No CI/CD pipeline testing visible
- Relies on visual inspection and manual QA

**Type Safety:**
- TypeScript provides basic compile-time checks
- Type definitions in `src/types/` provide contract validation
- React prop types defined via TypeScript interfaces

---

*Testing analysis: 2026-02-14*

## Recommendations

To establish testing infrastructure:

1. **Install Jest and React Testing Library**
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @types/jest
   ```

2. **Create jest.config.js** with Next.js preset

3. **Add test script** to package.json:
   ```json
   "test": "jest",
   "test:watch": "jest --watch"
   ```

4. **Start with high-impact unit tests** for utility functions and reusable components

5. **Consider E2E tests** with Playwright for critical user flows

