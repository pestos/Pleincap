# Requirements: PleinCap Backoffice & Contenu Dynamique

**Defined:** 2026-02-14
**Core Value:** L'équipe PleinCap peut gérer l'intégralité du contenu du site sans toucher au code depuis un backoffice intuitif.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### CMS Foundation

- [ ] **CMS-01**: Admin peut se connecter au backoffice avec email/mot de passe
- [ ] **CMS-02**: Admin peut créer des comptes éditeur avec permissions restreintes
- [ ] **CMS-03**: Éditeur peut uploader des images et les gérer dans la bibliothèque média
- [ ] **CMS-04**: Éditeur peut sauvegarder un brouillon et prévisualiser avant publication
- [ ] **CMS-05**: Admin peut modifier plusieurs éléments en lot (prix, statut, dates)

### Gestion de Contenu

- [ ] **CONT-01**: Éditeur peut créer/modifier/supprimer des croisières depuis le backoffice
- [ ] **CONT-02**: Éditeur peut créer/modifier/supprimer des destinations depuis le backoffice
- [ ] **CONT-03**: Éditeur peut créer/modifier/supprimer des bateaux avec spécifications et cabines
- [ ] **CONT-04**: Éditeur peut créer/modifier/supprimer des conférenciers depuis le backoffice
- [ ] **CONT-05**: Éditeur peut créer/modifier/supprimer des membres d'équipe
- [ ] **CONT-06**: Éditeur peut créer/modifier/supprimer des articles de blog avec catégories et tags
- [ ] **CONT-07**: Éditeur peut créer/modifier/supprimer des témoignages clients
- [ ] **CONT-08**: Éditeur peut gérer les bannières/hero sections du site
- [ ] **CONT-09**: Éditeur peut lier une croisière à un bateau, des conférenciers et une destination
- [ ] **CONT-10**: Éditeur peut construire un itinéraire jour par jour avec images et highlights
- [ ] **CONT-11**: Éditeur peut gérer les meta tags et descriptions SEO par page

### Migration

- [ ] **MIGR-01**: Tout le contenu statique existant est migré vers la base de données
- [ ] **MIGR-02**: Toutes les pages frontend affichent les données du CMS (plus de contenu en dur)
- [ ] **MIGR-03**: Les URLs existantes sont préservées (pas de perte SEO)

### Newsletter

- [ ] **NEWS-01**: Visiteur peut s'inscrire à la newsletter avec double opt-in
- [ ] **NEWS-02**: Admin peut importer/exporter des listes d'abonnés (CSV)
- [ ] **NEWS-03**: Admin peut créer des campagnes email avec templates responsives éditables
- [ ] **NEWS-04**: Admin peut envoyer une campagne à un segment ciblé d'abonnés
- [ ] **NEWS-05**: Admin peut voir les statistiques d'ouverture et de clics par campagne
- [ ] **NEWS-06**: Admin peut créer des segments basés sur intérêts et engagement
- [ ] **NEWS-07**: Abonné peut se désinscrire en un clic (conforme RGPD)
- [ ] **NEWS-08**: Admin peut créer des séquences automatisées (bienvenue, relance inactifs)

### Déploiement

- [ ] **DEPL-01**: Le site est déployé sur VPS avec PostgreSQL en production

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Newsletter Avancé

- **NEWS-09**: Admin peut faire de l'A/B testing sur les sujets d'email
- **NEWS-10**: Newsletter digest automatique des articles de blog (RSS-to-email)
- **NEWS-11**: Contenu dynamique par segment dans les emails (personnalisation)
- **NEWS-12**: Dashboard de délivrabilité (réputation domaine, taux de plaintes)
- **NEWS-13**: Timeline d'activité par abonné (historique interactions)

### CMS Avancé

- **CMS-06**: Matrice visuelle cabines/tarifs avec éditeur dédié
- **CMS-07**: Dashboard analytique contenu (pages vues, conversions)
- **CMS-08**: Support multilingue

## Out of Scope

| Feature | Reason |
|---------|--------|
| Refonte du design | Le design actuel est conservé tel quel — intégration backend uniquement |
| E-commerce / paiement en ligne | Site vitrine avec catalogue, pas de booking engine |
| Application mobile | Site web uniquement |
| Espace client / comptes publics | Seul le backoffice a des comptes utilisateurs |
| CRM intégré | PleinCap utilise probablement un système de réservation séparé |
| SMS / WhatsApp | Newsletter email uniquement |
| Workflow d'approbation multi-étapes | Overkill pour une équipe de 2-5 personnes |
| Constructeur de formulaires | Un seul formulaire de contact suffit |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CMS-01 | Phase 1 | Pending |
| CMS-02 | Phase 1 | Pending |
| CMS-03 | Phase 1 | Pending |
| CMS-04 | Phase 2 | Pending |
| CMS-05 | Phase 2 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| CONT-06 | Phase 2 | Pending |
| CONT-07 | Phase 2 | Pending |
| CONT-08 | Phase 2 | Pending |
| CONT-09 | Phase 2 | Pending |
| CONT-10 | Phase 2 | Pending |
| CONT-11 | Phase 2 | Pending |
| MIGR-01 | Phase 3 | Pending |
| MIGR-02 | Phase 3 | Pending |
| MIGR-03 | Phase 3 | Pending |
| NEWS-01 | Phase 4 | Pending |
| NEWS-02 | Phase 4 | Pending |
| NEWS-03 | Phase 4 | Pending |
| NEWS-04 | Phase 4 | Pending |
| NEWS-07 | Phase 4 | Pending |
| NEWS-05 | Phase 5 | Pending |
| NEWS-06 | Phase 5 | Pending |
| NEWS-08 | Phase 5 | Pending |
| DEPL-01 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-14*
*Last updated: 2026-02-14 after roadmap creation*
