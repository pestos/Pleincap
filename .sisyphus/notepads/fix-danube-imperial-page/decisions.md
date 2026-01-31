# Decisions - Fix Danube Imperial Page

## 2026-01-31

### Architecture Decisions

1. **Single File Approach**
   - Decision: Keep all components in one file (page.tsx)
   - Rationale: Page-specific components, no reuse needed elsewhere
   - Result: Simpler structure, easier to maintain

2. **Interface Definitions**
   - Decision: Define all interfaces at top of file
   - Rationale: Type safety and clarity
   - Interfaces: ItineraryDay, Expert, Demeure, Pricing

3. **State Management**
   - Decision: Use useState for simple interactions
   - Rationale: No need for complex state management
   - States: activeSection (navigation), selectedPricing (reservation)

4. **Design System Migration**
   - Decision: Complete migration to new color system
   - Rationale: Consistency with rest of site
   - Changed: #e2ae12 → primary (#C5A059), #fcfbf8 → ecru, etc.

### Component Structure

```
DanubeImperialPage
├── SiteHeader
├── Hero Section (background image + overlay)
├── Navigation (sticky, section anchors)
├── Main Content Grid (lg:grid-cols-3)
│   ├── Left Column (lg:col-span-2)
│   │   ├── Aperçu Section
│   │   ├── Navire Section
│   │   └── Programme Section (timeline)
│   └── Right Column (lg:col-span-1)
│       └── Reservation Sidebar (sticky)
├── Experts Section (full width, ecru bg)
├── Demeures Section (full width)
├── Gallery Section (full width, ecru bg)
└── SiteFooter
```

### Styling Decisions

1. **No Rounded Corners**: Used `sharp-edge` class consistently
2. **Uppercase Labels**: All section labels use uppercase with tracking-widest
3. **Serif Headings**: All titles use `serif-heading` (Playfair Display)
4. **Hover Effects**: Images scale, colors transition smoothly
5. **Responsive**: Mobile-first, breakpoints at md (768px) and lg (1024px)