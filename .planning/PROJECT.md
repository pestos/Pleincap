# PleinCap — Backoffice & Contenu Dynamique

## What This Is

Transformation du site vitrine PleinCap (croisières et voyages) en un site 100% dynamique avec backoffice d'administration. Le site Next.js existant conserve son design actuel, mais tout le contenu (catalogues, destinations, conférenciers, équipe, bateaux, blog, bannières, témoignages) devient gérable depuis un panneau d'administration. Inclut un programme de newsletter avancé avec segmentation, templates et statistiques.

## Core Value

L'équipe PleinCap peut gérer l'intégralité du contenu du site sans toucher au code — catalogues de voyages, bannières, pages d'équipe, conférenciers, blog — depuis un backoffice intuitif.

## Requirements

### Validated

<!-- Shipped and confirmed valuable — inferred from existing codebase. -->

- ✓ Site vitrine Next.js 14 avec App Router et SSR — existing
- ✓ Page d'accueil avec hero vidéo, sections multiples, barre de recherche — existing
- ✓ Catalogue de croisières avec filtrage (destination, prix, date, vol, note) — existing
- ✓ Page destinations avec composant client interactif — existing
- ✓ Pages bateaux individuelles avec spécifications et cabines (ex: Amadeus Diamond) — existing
- ✓ Page conférenciers — existing
- ✓ Page équipe — existing
- ✓ Blog avec articles et filtrage client — existing
- ✓ Page contact avec formulaire — existing
- ✓ Page visioconférence — existing
- ✓ Page voyages en train — existing
- ✓ Navigation mega-menu avec structure par sections (croisières, voyages) — existing
- ✓ Carrousel de témoignages — existing
- ✓ Header fixe avec scroll tracking — existing
- ✓ Design responsive Tailwind CSS avec thème personnalisé — existing
- ✓ Animations Framer Motion — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] Intégration Payload CMS 3.0 dans le projet Next.js existant
- [ ] Backoffice admin avec authentification et gestion des rôles (admin, éditeur)
- [ ] Collections Payload pour chaque type de contenu (croisières, destinations, bateaux, conférenciers, équipe, blog, témoignages)
- [ ] Gestion des bannières/hero sections depuis le backoffice
- [ ] Gestion des catalogues de voyages (création, édition, suppression, publication)
- [ ] Gestion des pages destinations depuis le backoffice
- [ ] Gestion des conférenciers depuis le backoffice
- [ ] Gestion de l'équipe depuis le backoffice
- [ ] Gestion du blog (articles, catégories, tags) depuis le backoffice
- [ ] Gestion des bateaux et leurs spécifications/cabines depuis le backoffice
- [ ] Gestion des témoignages depuis le backoffice
- [ ] Upload et gestion des médias (images) dans Payload
- [ ] Migration du contenu statique existant vers la base de données
- [ ] Pages frontend dynamiques consommant les données Payload
- [ ] Programme newsletter : inscription avec segmentation (listes/tags)
- [ ] Programme newsletter : création de campagnes avec templates éditables
- [ ] Programme newsletter : statistiques d'ouverture et de clics
- [ ] Programme newsletter : automatisation (bienvenue, relance)
- [ ] Déploiement sur VPS avec PostgreSQL

### Out of Scope

<!-- Explicit boundaries. -->

- Refonte du design — le design actuel est conservé tel quel
- Application mobile — site web uniquement
- E-commerce / paiement en ligne — site vitrine avec catalogue
- Choix du provider d'envoi email — sera décidé ultérieurement (Amazon SES, Brevo, ou autre)
- Multi-langue — site en français uniquement
- Espace client / comptes utilisateurs publics — seul le backoffice a des comptes

## Context

Le site PleinCap est un site vitrine de croisières fluviales et voyages existant, construit en Next.js 14 avec tout le contenu en dur dans les composants TypeScript. Le client a une équipe de 2-5 personnes qui doit pouvoir modifier le contenu sans intervention technique.

Le site compte 15+ pages avec du contenu riche : catalogues de croisières, fiches bateaux détaillées, profils conférenciers, articles de blog (40+), témoignages, etc. Tout ce contenu est actuellement codé en dur dans des tableaux TypeScript au niveau des composants.

Le volume newsletter est d'environ 5000 emails/semaine (~20 000/mois). Aucun plan gratuit ne couvre ce volume — le provider sera choisi séparément.

**Stack existante :**
- Next.js 14.0.0, React 18.3.1, TypeScript 5
- Tailwind CSS 3.3.0, Framer Motion 12.23.22, Lucide React
- Aucune base de données, aucune API backend actuellement
- Images hébergées sur plein-cap.com, Unsplash, Google

## Constraints

- **Design** : Le design existant ne doit pas être modifié — intégration backend uniquement
- **Tech stack** : Payload CMS 3.0 intégré dans Next.js (même codebase)
- **Base de données** : PostgreSQL (via Drizzle ORM de Payload)
- **Hébergement** : VPS (auto-hébergé)
- **Newsletter** : Provider d'envoi email à choisir ultérieurement — l'architecture doit être agnostique
- **Rôles** : Minimum admin + éditeur dans le backoffice

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Payload CMS 3.0 | S'intègre directement dans Next.js, backoffice inclus, PostgreSQL natif, self-hosted, gratuit, open source | — Pending |
| PostgreSQL | Robuste, standard, support natif Payload via Drizzle ORM | — Pending |
| Provider email différé | Volume 5000/sem dépasse les plans gratuits, choix séparé de l'architecture | — Pending |
| Design inchangé | Le client est satisfait du design, seul le backend doit évoluer | — Pending |

---
*Last updated: 2026-02-14 after initialization*
