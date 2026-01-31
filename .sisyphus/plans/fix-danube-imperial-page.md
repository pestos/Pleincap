# Fix Layout Bugs & Fiches Cabines - Page Danube Impérial

## TL;DR

> **Quick Summary**: Corriger les bugs de mise en page (texte écrasé, responsive cassé) et remplacer la section "Demeures d'Exception" par des fiches cabines interactives avec modal détail (carousel photos, m², équipements).
> 
> **Deliverables**:
> - Page danube-imperial avec texte correctement espacé à toutes les tailles d'écran
> - Section "Nos Cabines" avec 4 fiches cabines cliquables
> - Modal overlay avec carousel 3-4 photos, surface, équipements par cabine
> - Navigation interne mise à jour ("Demeures" → "Cabines")
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: NO - sequential (2 tasks)
> **Critical Path**: Task 1 (CSS fixes) → Task 2 (Cabin cards + modal)

---

## Context

### Original Request
L'utilisateur signale des problèmes de "mise en page du texte écrasé" sur la page Danube Impérial. Il demande également de remplacer la section Hébergements (actuellement des hôtels) par des fiches cabines du navire avec détails en modal.

### Interview Summary
**Key Discussions**:
- L'utilisateur veut des fiches cabines cliquables avec modal overlay
- Carousel de 3-4 photos dans le modal
- Détails: m², description, équipements complets
- Les 4 types de cabines correspondent au pricing existant (Standard 14m², Supérieure 16m², Suite Junior 22m², Suite Impériale 28m²)

### Metis Review
**Identified Gaps (addressed)**:
- L'analyse initiale des bugs était basée sur une version obsolète du fichier (272 lignes vs 558 lignes actuelles) — bugs recalibrés
- 3 des 5 bugs initiaux étaient invalides — corrigé
- Bugs supplémentaires identifiés par Metis: subnav `top-20` misaligned, absence de `scroll-mt-*`, timeline `pl-12` trop large sur mobile, hero title trop grand sur mobile
- Le fichier est `'use client'` avec `useState` — architecture compatible avec les modals

---

## Work Objectives

### Core Objective
Corriger tous les bugs de mise en page responsive et créer une expérience interactive de consultation des cabines du navire.

### Concrete Deliverables
- `src/app/catalogue/danube-imperial/page.tsx` avec CSS responsive corrigé
- Section cabines avec 4 fiches interactives
- Modal détail cabine avec carousel photos

### Definition of Done
- [ ] Aucun texte caché derrière le header fixe (h1 bounding box top > 110px)
- [ ] Sections correctement espacées sur mobile (padding < 80px sur 375px)
- [ ] Subnav visible et non cachée derrière le header
- [ ] Cliquer sur un lien de navigation ne cache pas le titre de section
- [ ] 4 fiches cabines visibles dans la section Hébergement
- [ ] Clic sur une fiche ouvre un modal avec carousel, m², équipements
- [ ] Modal se ferme au clic extérieur et à la touche Escape
- [ ] Carousel naviguable (suivant/précédent)

### Must Have
- Correction de tous les bugs de spacing/responsive identifiés
- Section cabines avec données détaillées (photos, m², équipements)
- Modal overlay avec carousel
- Navigation mise à jour ("Cabines" au lieu de "Demeures")

### Must NOT Have (Guardrails)
- Ne PAS changer la structure HTML des sections non concernées (hero, itinéraire, experts, galerie)
- Ne PAS modifier le pricing sidebar existant (il reste tel quel)
- Ne PAS ajouter de nouvelles dépendances npm — utiliser uniquement React state + CSS pour le carousel et le modal
- Ne PAS utiliser de border-radius (design system sharp-edge)
- Ne PAS utiliser de couleurs hors du design system (primary #C5A059, abyss #1a2b3c, ecru #F9F8F6)
- Ne PAS supprimer les fonctionnalités existantes (pricing selector, gallery, experts)
- Ne PAS créer de composants séparés — tout reste dans le fichier page.tsx (cohérent avec le pattern du projet)

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (pas de test framework configuré)
- **User wants tests**: NO
- **Framework**: None
- **QA approach**: Verification visuelle via Playwright + build check

### Automated Verification (Agent-Executable)

**For CSS/Layout fixes** (using playwright skill):
```
# Agent executes via playwright browser automation:

# Test 1: Hero header clearance (375px mobile)
1. Navigate to: http://localhost:3000/catalogue/danube-imperial
2. Set viewport: 375x667
3. Wait for: h1 "Le Danube Impérial" to be visible
4. Assert: h1 bounding box top > 110 (not behind header)
5. Screenshot: .sisyphus/evidence/hero-mobile.png

# Test 2: Hero header clearance (1440px desktop)
6. Set viewport: 1440x900
7. Assert: h1 bounding box top > 110
8. Screenshot: .sisyphus/evidence/hero-desktop.png

# Test 3: Section spacing on mobile
9. Set viewport: 375x667
10. Navigate to: #apercu
11. Assert: section computed padding-top < 80px

# Test 4: Subnav visibility at desktop
12. Set viewport: 1440x900
13. Scroll down 800px
14. Assert: sticky nav is visible and not behind header
15. Screenshot: .sisyphus/evidence/subnav-desktop.png

# Test 5: Scroll-to anchors don't hide behind header
16. Click subnav link "Programme"
17. Wait 500ms for smooth scroll
18. Assert: #programme heading is visible in viewport (not behind header)

# Test 6: Cabin cards visible
19. Scroll to: #cabines section
20. Assert: 4 cabin cards visible
21. Screenshot: .sisyphus/evidence/cabines-section.png

# Test 7: Cabin modal opens
22. Click on: first cabin card
23. Wait for: modal overlay to appear
24. Assert: modal contains cabin name, m², equipment list
25. Assert: carousel images visible
26. Screenshot: .sisyphus/evidence/cabin-modal.png

# Test 8: Cabin modal carousel
27. Click: next arrow in carousel
28. Assert: image changes
29. Screenshot: .sisyphus/evidence/cabin-carousel.png

# Test 9: Modal closes on Escape
30. Press: Escape key
31. Assert: modal is no longer visible

# Test 10: Mobile responsive
32. Set viewport: 375x667
33. Scroll to: #cabines
34. Assert: cabin cards stack vertically (1 column)
35. Click: first cabin card
36. Assert: modal is full-screen or near full-screen on mobile
37. Screenshot: .sisyphus/evidence/cabin-modal-mobile.png
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
└── Task 1: Fix all CSS/layout responsive bugs

Wave 2 (After Wave 1):
└── Task 2: Replace Demeures with Cabin cards + Modal
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2 | None |
| 2 | 1 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1 | delegate_task(category="quick", load_skills=["frontend-ui-ux"]) |
| 2 | 2 | delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"]) |

---

## TODOs

- [ ] 1. Fix CSS/Layout Responsive Bugs

  **What to do**:

  Corriger les classes Tailwind suivantes dans `src/app/catalogue/danube-imperial/page.tsx` (fichier actuel: 558 lignes):

  **Bug A — Hero padding insufficient (line 157)**:
  - Actuel: `pt-20` (80px) sur `<section>` hero
  - Fix: Changer en `pt-32 md:pt-20` ou ajouter un spacer top pour compenser le header fixe (~110px)
  - Pattern à suivre: catalogue page utilise `pt-36 md:pt-40`
  - Note: la hero section utilise `items-center justify-center` et `h-[75vh]`. Le `pt-20` crée un décalage insuffisant — sur petits écrans le centrage vertical est poussé trop haut. Ajuster le padding pour mieux centrer.

  **Bug B — Hero title trop grand sur mobile (line 168)**:
  - Actuel: `text-6xl md:text-8xl`
  - Fix: `text-4xl md:text-6xl lg:text-8xl`
  - Le titre "Le Danube Impérial" en 60px sur un écran de 375px wrape mal

  **Bug C — Subnav sticky `top-20` misaligned (line 186)**:
  - Actuel: `sticky top-20` (80px)
  - Fix: `sticky top-[110px]` pour s'aligner sous le header fixe (~110px)
  - Le header a: top bar (~28px py-2) + main nav (~80px py-5) = ~108-112px

  **Bug D — `py-[120px]` trop grand sur mobile (lines 209, 451, 487, 525)**:
  - Actuel: `py-[120px]` fixe sur 4+ sections
  - Fix: `py-16 md:py-[120px]` (64px mobile, 120px desktop)
  - 240px de padding vertical par section sur un viewport de 700px = contenu "écrasé" entre des gaps immenses

  **Bug E — `space-y-[120px]` trop grand sur mobile (line 210)**:
  - Actuel: `space-y-[120px]` entre sections de contenu
  - Fix: `space-y-16 md:space-y-[120px]`

  **Bug F — Aucun `scroll-mt-*` sur les sections (lines 211, 271, 309, 362, 451, 487, 525)**:
  - Actuel: Aucun `scroll-mt-*` sur les IDs de section
  - Fix: Ajouter `scroll-mt-44` (176px) sur chaque élément avec un `id`
  - Raison: header fixe (~110px) + subnav sticky (~48px) = ~158px total d'éléments fixes
  - Sans scroll-mt, cliquer sur un lien de navigation fait défiler le titre de section DERRIÈRE le header

  **Bug G — Timeline `pl-12` trop large sur petit mobile (line 314)**:
  - Actuel: `pl-12` (48px) — 15% d'un écran de 320px
  - Fix: `pl-8 md:pl-12`
  - Aussi ajuster la position du cercle timeline: `-left-[52px]` → `-left-[36px] md:-left-[52px]` (line 318)

  **Must NOT do**:
  - Ne pas changer la structure HTML ou les composants
  - Ne pas modifier les données (itinerary, experts, pricing arrays)
  - Ne pas toucher au state management (useState)
  - Ne pas modifier les couleurs ou fonts du design system

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Modifications CSS uniquement, classe par classe, dans un seul fichier. Pas de logique complexe.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Connaissance des patterns Tailwind responsive, breakpoints, et spacing

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (seul)
  - **Blocks**: Task 2
  - **Blocked By**: None (peut commencer immédiatement)

  **References** (CRITICAL - Be Exhaustive):

  **Pattern References** (existing code to follow):
  - `src/app/catalogue/page.tsx:170` — `pt-36 md:pt-40` pour offset du header fixe. C'est LE pattern à suivre pour compenser le header.
  - `src/app/catalogue/page.tsx:182-257` — Sidebar sticky avec `sticky top-32`. Compare avec le subnav actuel `top-20`.
  - `src/components/SiteHeader.tsx:25-31` — `fixed left-0 top-0 z-50` avec top bar + nav. Le header fait ~110px de hauteur totale.

  **File References** (exact locations to edit):
  - `src/app/catalogue/danube-imperial/page.tsx:157` — Hero section `pt-20`
  - `src/app/catalogue/danube-imperial/page.tsx:168` — Hero h1 `text-6xl md:text-8xl`
  - `src/app/catalogue/danube-imperial/page.tsx:186` — Subnav `sticky top-20`
  - `src/app/catalogue/danube-imperial/page.tsx:209` — Grid wrapper `py-[120px]`
  - `src/app/catalogue/danube-imperial/page.tsx:210` — Content area `space-y-[120px]`
  - `src/app/catalogue/danube-imperial/page.tsx:211` — `#apercu` section (add scroll-mt)
  - `src/app/catalogue/danube-imperial/page.tsx:271` — `#navire` section (add scroll-mt)
  - `src/app/catalogue/danube-imperial/page.tsx:309` — `#programme` section (add scroll-mt)
  - `src/app/catalogue/danube-imperial/page.tsx:362` — `#reservation` aside (add scroll-mt)
  - `src/app/catalogue/danube-imperial/page.tsx:451` — `#experts` section `py-[120px]` + scroll-mt
  - `src/app/catalogue/danube-imperial/page.tsx:487` — `#demeures` section `py-[120px]` + scroll-mt
  - `src/app/catalogue/danube-imperial/page.tsx:525` — `#galerie` section `py-[120px]` + scroll-mt
  - `src/app/catalogue/danube-imperial/page.tsx:314` — Timeline `pl-12`
  - `src/app/catalogue/danube-imperial/page.tsx:318` — Timeline circle `-left-[52px]`

  **Design System References**:
  - `src/app/globals.css:15-17` — `.sharp-edge { border-radius: 0 !important; }` — Ne pas ajouter d'arrondis
  - `tailwind.config.ts:27-33` — borderRadius tous à `0px` — confirme le design sharp-edge

  **WHY Each Reference Matters**:
  - Catalogue page `pt-36 md:pt-40`: Seul pattern vérifié dans le projet pour compenser le header fixe. Le reproduire garantit la cohérence.
  - SiteHeader `fixed top-0`: Pour comprendre les ~110px de hauteur et calibrer les offsets `scroll-mt-*` et `sticky top-*`.
  - Chaque ligne citée est l'emplacement EXACT à modifier — pas de recherche nécessaire.

  **Acceptance Criteria**:

  **For Frontend/UI changes** (using playwright skill):
  ```
  # Agent executes via playwright browser automation:
  1. Navigate to: http://localhost:3000/catalogue/danube-imperial
  2. Set viewport: 375x667 (mobile)
  3. Wait for: h1 "Le Danube Impérial" to be visible
  4. Assert: h1 element is fully visible, not overlapped by header
  5. Screenshot: .sisyphus/evidence/task1-hero-mobile.png
  6. Set viewport: 1440x900 (desktop)
  7. Scroll down 800px
  8. Assert: sticky subnav is visible below the header (not overlapping)
  9. Click: subnav link "Programme"
  10. Wait: 500ms for smooth scroll
  11. Assert: #programme heading is visible in viewport, not behind header or subnav
  12. Screenshot: .sisyphus/evidence/task1-scroll-anchor.png
  13. Set viewport: 375x667 (mobile)
  14. Scroll to: #apercu
  15. Assert: section padding-top is reasonable (not 120px gap on mobile)
  16. Screenshot: .sisyphus/evidence/task1-spacing-mobile.png
  ```

  **For Build verification** (using Bash):
  ```bash
  npx next build 2>&1 | tail -5
  # Assert: Build succeeds (exit code 0)
  ```

  **Evidence to Capture:**
  - [ ] Screenshot hero mobile (375px) — texte visible, pas caché
  - [ ] Screenshot subnav desktop — bien positionnée sous le header
  - [ ] Screenshot scroll anchor — titre section visible après clic nav
  - [ ] Screenshot spacing mobile — padding réduit correctement
  - [ ] Build successful (exit code 0)

  **Commit**: YES
  - Message: `fix(danube): correct responsive layout and text spacing issues`
  - Files: `src/app/catalogue/danube-imperial/page.tsx`

---

- [ ] 2. Replace Demeures Section with Interactive Cabin Cards + Modal

  **What to do**:

  **Étape A — Nouvelle data structure (remplacer interfaces + données)**:
  
  Supprimer l'interface `Demeure` (line 22-27) et le tableau `demeures` (lines 88-107).
  Les remplacer par une nouvelle interface `Cabin` et un tableau `cabins`:

  ```typescript
  interface Cabin {
    id: string
    name: string         // "Cabine Standard", "Cabine Supérieure", etc.
    surface: string      // "14m²", "16m²", etc.
    description: string  // Description détaillée de la cabine
    price: number        // Prix en euros (correspond au pricing existant)
    images: string[]     // 3-4 URLs photos pour le carousel
    equipment: string[]  // Liste équipements avec icône Material Symbols
    features: string[]   // Points forts courts (pour les badges)
  }
  ```

  Créer les données pour 4 cabines correspondant aux 4 catégories de pricing existantes:
  - **Cabine Standard** (14m², 2450€): Hublot panoramique, lit double ou lits jumeaux, salle d'eau avec douche, climatisation individuelle, coffre-fort, TV écran plat, minibar
  - **Cabine Supérieure** (16m², 2850€): Fenêtre française (baie vitrée ouvrante), lit queen, salle d'eau avec douche à l'italienne, climatisation individuelle, coffre-fort, TV écran plat, minibar, peignoirs et pantoufles
  - **Suite Junior** (22m², 3650€): Balcon privé, lit king, coin salon séparé, salle de bain avec baignoire, climatisation individuelle, coffre-fort, TV écran plat, minibar, peignoirs et pantoufles, service en cabine
  - **Suite Impériale** (28m², 4850€): Grand balcon privé, lit king, grand salon avec canapé, salle de bain luxe avec baignoire et douche séparée, dressing, climatisation individuelle, coffre-fort, TV 42", minibar premium, champagne à l'arrivée, service en cabine 24h, butler dédié

  Pour les images des cabines: utiliser des URLs d'images type intérieur de cabine de croisière. Réutiliser le style d'URLs déjà présentes dans le fichier (format `lh3.googleusercontent.com/aida-public/...`). On peut réutiliser certaines images de la gallery existante ou les images du navire pour les premières photos, et utiliser des images placeholder cohérentes pour les autres. L'agent peut aussi utiliser des images génériques de cabines de croisière fluviale de luxe trouvées sur le web.

  **Étape B — Mise à jour du navItems (line 139-147)**:
  - Changer `{ id: 'demeures', label: 'Demeures' }` en `{ id: 'cabines', label: 'Cabines' }`

  **Étape C — Ajouter les states pour le modal (après line 151)**:
  - `const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null)`
  - `const [currentImageIndex, setCurrentImageIndex] = useState(0)`

  **Étape D — Remplacer la section Demeures (lines 487-522) par la section Cabines**:
  
  Créer une grille de 4 fiches cabines:
  - Section: `id="cabines"` avec `scroll-mt-44` et padding responsive `py-16 md:py-[120px]`
  - Label section: "Nos Cabines" + titre "Le Confort à Bord"
  - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` avec `gap-6`
  - Chaque fiche cabine:
    - Image principale (première image du tableau `images[]`) en `aspect-[4/3]` avec `overflow-hidden` et hover `scale-110`
    - Nom de cabine (serif-heading, text-xl)
    - Surface en m² (text-primary, font-bold, uppercase tracking)
    - Prix "à partir de X €" (text-lg font-bold)
    - Liste des 3-4 premiers équipements (text-xs, avec icônes Material Symbols)
    - Zone cliquable: `onClick={() => { setSelectedCabin(cabin); setCurrentImageIndex(0); }}`
    - Style: fond blanc `bg-white`, bordure `border border-primary/20`, hover: `border-primary shadow-lg`
    - Curseur: `cursor-pointer`
    - Lien visuel: texte "Voir le détail →" en bas de la fiche (text-primary, uppercase, tracking-widest)

  **Étape E — Créer le modal overlay (en bas du JSX, avant `<SiteFooter />`)**:
  
  Rendu conditionnel: `{selectedCabin && ( ... )}`
  
  Structure du modal:
  - **Overlay**: `fixed inset-0 z-[60] flex items-center justify-center bg-abyss/80 backdrop-blur-sm`
    - `onClick={() => setSelectedCabin(null)}` pour fermer au clic extérieur
  - **Panneau modal**: `relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white mx-4 md:mx-auto`
    - `onClick={(e) => e.stopPropagation()}` pour empêcher la fermeture au clic sur le contenu
    - Pas de border-radius (sharp-edge)
  - **Bouton fermer**: `absolute top-4 right-4 z-10` avec `material-symbols-outlined close`
    - `onClick={() => setSelectedCabin(null)}`
  - **Carousel photos**:
    - Image principale: `aspect-[16/9] w-full overflow-hidden`
    - `src={selectedCabin.images[currentImageIndex]}`
    - Flèche gauche: `absolute left-4 top-1/2 -translate-y-1/2` avec `chevron_left`
      - `onClick` → `setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)`
    - Flèche droite: `absolute right-4 top-1/2 -translate-y-1/2` avec `chevron_right`
      - `onClick` → `setCurrentImageIndex((prev) => (prev + 1) % images.length)`
    - Dots indicateurs: `flex justify-center gap-2 mt-4`
      - Dot actif: `w-2 h-2 bg-primary`
      - Dot inactif: `w-2 h-2 bg-abyss/20`
      - Chaque dot cliquable: `onClick={() => setCurrentImageIndex(idx)}`
  - **Contenu détail** (sous le carousel, `p-8`):
    - Nom cabine: `serif-heading text-3xl mb-2`
    - Surface: `text-primary text-lg font-bold mb-4` avec icône `straighten`
    - Description: `text-sm font-light leading-relaxed opacity-70 mb-8`
    - Grille équipements: `grid grid-cols-2 md:grid-cols-3 gap-4`
      - Chaque équipement: icône Material Symbols + texte (text-sm)
      - Icônes suggérées: `king_bed`, `bathtub`, `tv`, `ac_unit`, `lock`, `local_bar`, `wifi`, `balcony`, `dry_cleaning`, `room_service`, `local_cafe`
    - Prix: `text-2xl font-bold mt-8 mb-4` avec label "À partir de"
    - Bouton "Réserver cette cabine": `sharp-edge w-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-abyss`
  - **Fermeture Escape**: Ajouter un `useEffect` pour écouter la touche Escape:
    ```typescript
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedCabin(null)
      }
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }, [])
    ```
  - **Reset carousel**: Quand `selectedCabin` change, `setCurrentImageIndex(0)` — déjà géré dans le onClick de la fiche
  - **Body scroll lock**: Quand modal ouvert, ajouter `overflow-hidden` au body pour empêcher le scroll de la page derrière le modal

  **Must NOT do**:
  - Ne PAS installer de librairie de carousel (Swiper, Embla, etc.) — useState simple suffit
  - Ne PAS créer de fichiers séparés — tout dans page.tsx
  - Ne PAS utiliser de border-radius (sharp-edge)
  - Ne PAS supprimer le pricing sidebar — les cabines le complètent visuellement
  - Ne PAS modifier les sections hero, aperçu, navire, programme, experts, galerie
  - Ne PAS utiliser d'arrondis sur le modal ou les fiches

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Feature UI interactive avec modal, carousel, state management, animations et responsive design
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Expertise en composants React interactifs, modals, state management, Tailwind responsive patterns et UX

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (après Task 1)
  - **Blocks**: None (task finale)
  - **Blocked By**: Task 1 (les scroll-mt et responsive fixes doivent être en place)

  **References** (CRITICAL - Be Exhaustive):

  **Pattern References** (existing code to follow):
  - `src/app/catalogue/danube-imperial/page.tsx:370-397` — Pricing radio selector pattern. Montre comment utiliser useState pour la sélection interactive dans cette même page. Le modal suivra la même logique d'état.
  - `src/app/catalogue/danube-imperial/page.tsx:487-522` — Section Demeures ACTUELLE à remplacer. Ces lignes exactes doivent être supprimées et remplacées par la section Cabines.
  - `src/app/catalogue/danube-imperial/page.tsx:535-549` — Gallery masonry grid. Montre le pattern d'images en grille avec hover effects et aspect ratios.
  - `src/app/catalogue/danube-imperial/page.tsx:149-151` — Déclarations useState existantes. Ajouter les nouveaux states (`selectedCabin`, `currentImageIndex`) à la suite.
  - `src/app/catalogue/danube-imperial/page.tsx:139-147` — navItems array. Changer l'entrée `'demeures'` → `'cabines'`.
  - `src/app/catalogue/danube-imperial/page.tsx:462-483` — Expert cards avec grayscale hover. Pattern de cards avec effets visuels.

  **Design System References**:
  - `src/app/globals.css:15-17` — `.sharp-edge { border-radius: 0 !important; }` — Utiliser sur les boutons du modal
  - `tailwind.config.ts:12-18` — Couleurs custom: `primary` (#C5A059), `abyss` (#1a2b3c), `ecru` (#F9F8F6)
  - `src/app/catalogue/danube-imperial/page.tsx:436` — Style du bouton "Réserver": `sharp-edge w-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-white`. Reproduire exactement ce style dans le modal.

  **Data References** (pricing structure to align with):
  - `src/app/catalogue/danube-imperial/page.tsx:109-130` — Pricing array existant. Les 4 cabines DOIVENT correspondre: Standard=2450€, Supérieure=2850€, Suite Junior=3650€, Suite Impériale=4850€.

  **Icon References** (Material Symbols to use in equipment grid):
  - `king_bed` — Lit | `bathtub` — Salle de bain | `tv` — Télévision
  - `ac_unit` — Climatisation | `lock` — Coffre-fort | `local_bar` — Minibar
  - `wifi` — Wi-Fi | `balcony` — Balcon | `dry_cleaning` — Peignoirs
  - `room_service` — Service en cabine | `close` — Fermer modal
  - `chevron_left` / `chevron_right` — Navigation carousel | `straighten` — Surface m²

  **WHY Each Reference Matters**:
  - Pricing selector (370-397): Pattern exact de sélection interactive avec useState dans ce fichier. Le modal cabin suit la même logique.
  - Section Demeures (487-522): Section EXACTE à remplacer. L'agent cible ces lignes précises.
  - navItems (139-147): L'entrée "Demeures" doit devenir "Cabines" pour que la navigation pointe vers la nouvelle section.
  - Pricing array (109-130): Les prix des cabines DOIVENT correspondre pour la cohérence de la page.
  - Bouton réserver (436): Style exact à reproduire pour garantir la cohérence visuelle dans le modal.

  **Acceptance Criteria**:

  **For Frontend/UI changes** (using playwright skill):
  ```
  # Agent executes via playwright browser automation:

  # Test 1: Cabin cards visible
  1. Navigate to: http://localhost:3000/catalogue/danube-imperial
  2. Set viewport: 1440x900
  3. Scroll to: #cabines section
  4. Assert: Section heading contains "Cabines" or "Confort"
  5. Assert: 4 cabin cards are rendered
  6. Assert: Each card shows cabin name, surface (m²), price
  7. Screenshot: .sisyphus/evidence/task2-cabins-desktop.png

  # Test 2: Modal opens on click
  8. Click on: first cabin card ("Cabine Standard")
  9. Wait for: modal overlay to appear (opacity transition)
  10. Assert: Modal contains "Cabine Standard"
  11. Assert: Modal contains "14m²"
  12. Assert: Modal contains at least 5 equipment items with icons
  13. Assert: Carousel image is visible
  14. Screenshot: .sisyphus/evidence/task2-modal-open.png

  # Test 3: Carousel navigation
  15. Click: next arrow in carousel
  16. Assert: Image src changes (different image displayed)
  17. Click: next arrow again
  18. Assert: Image src changes again
  19. Screenshot: .sisyphus/evidence/task2-carousel-nav.png

  # Test 4: Modal close on Escape
  20. Press: Escape key
  21. Wait: 300ms for transition
  22. Assert: Modal overlay is no longer visible
  
  # Test 5: Modal close on overlay click
  23. Click on: last cabin card ("Suite Impériale")
  24. Wait for: modal overlay
  25. Click on: overlay background (outside modal panel)
  26. Assert: Modal closes

  # Test 6: Navigation link updated
  27. Scroll to top
  28. Assert: Subnav contains "Cabines" text (not "Demeures")
  29. Click: "Cabines" subnav link
  30. Assert: Page scrolls to cabines section, heading visible

  # Test 7: Suite Impériale full details
  31. Scroll to: #cabines
  32. Click on: "Suite Impériale" card
  33. Assert: Modal shows "28m²"
  34. Assert: Modal shows price containing "4" and "850"
  35. Assert: Equipment list includes premium features (butler, champagne, or similar)
  36. Screenshot: .sisyphus/evidence/task2-suite-imperiale.png

  # Test 8: Mobile responsive
  37. Close modal (press Escape)
  38. Set viewport: 375x667
  39. Scroll to: #cabines
  40. Assert: Cabin cards stack in 1 column
  41. Click: first cabin card
  42. Assert: Modal covers most of screen width
  43. Screenshot: .sisyphus/evidence/task2-modal-mobile.png
  ```

  **For Build verification** (using Bash):
  ```bash
  npx next build 2>&1 | tail -5
  # Assert: Build succeeds (exit code 0)
  ```

  **Evidence to Capture:**
  - [ ] Screenshot cabines section desktop — 4 fiches visibles en grille
  - [ ] Screenshot modal ouvert — carousel, m², équipements
  - [ ] Screenshot carousel navigation — image change confirmée
  - [ ] Screenshot Suite Impériale — détails premium visibles
  - [ ] Screenshot mobile — cards empilées, modal responsive
  - [ ] Build successful (exit code 0)

  **Commit**: YES
  - Message: `feat(danube): replace demeures with interactive cabin cards and detail modal`
  - Files: `src/app/catalogue/danube-imperial/page.tsx`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `fix(danube): correct responsive layout and text spacing issues` | page.tsx | Playwright screenshots + build |
| 2 | `feat(danube): replace demeures with interactive cabin cards and detail modal` | page.tsx | Playwright screenshots + build |

---

## Success Criteria

### Verification Commands
```bash
# Build test
npx next build  # Expected: exit 0

# Page load test
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/catalogue/danube-imperial
# Expected: 200
```

### Final Checklist
- [ ] Texte du hero visible et non caché derrière le header (mobile + desktop)
- [ ] Sections correctement espacées sur mobile (padding réduit)
- [ ] Subnav sticky bien positionnée sous le header
- [ ] Scroll-to-anchor fonctionne sans cacher les titres
- [ ] 4 fiches cabines visibles dans la section "Cabines"
- [ ] Modal s'ouvre au clic avec carousel, m², équipements
- [ ] Carousel naviguable (prev/next + dots)
- [ ] Modal se ferme (Escape, clic overlay, bouton X)
- [ ] Navigation mise à jour ("Cabines" au lieu de "Demeures")
- [ ] Responsive mobile correct (cards + modal)
- [ ] Build successful
- [ ] Design system respecté (sharp-edge, couleurs, fonts)
