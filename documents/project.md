# Project Overview

**Gratisangebote-Karte** - Open-Source-Webapplikation zur Unterstützung von Menschen mit wenig finanziellen Mitteln bei der Suche nach kostenlosen Angeboten, sowie zur Hilfe für einsame Menschen beim Entdecken von Aktivitäten und sozialen Kontakten in ihrer Region.

## Target Groups

- Menschen mit geringem Einkommen
- Einsame oder sozial isolierte Menschen
- Gemeinden
- Soziale Organisationen
- Vereine

## Main Features

### Offer Search

Free offers can be searched via:
- **Map View** - Offers displayed on an interactive map
- **List View** - Offers displayed as a list

Users can switch between views at any time.

### Filtering

Offers can be filtered by categories:
- Essen (Food)
- Freizeit (Leisure)
- Kultur (Culture)
- Sport (Sports)
- Beratung (Counseling)
- Treffpunkte (Meeting Places)
- Bildung (Education)

### Offer Details

Each offer shows:
- Title, description, category
- Location with address
- Contact information
- Image (if available)

### Submission & Review

Users can submit new offers. New offers start with status `pending` and are reviewed by an editor before being published.

Editors can:
- Approve pending offers
- Reject offers
- Edit offer details
- Correct texts, locations, times
- Archive offers

## Technology Stack

| Area | Technology |
|------|------------|
| Frontend | Angular, NgRx, Angular Material + CDK, TypeScript |
| Testing | Jest (Unit Tests), Playwright (E2E, planned) |
| Backend | PHP, Slim Framework |
| Database | MariaDB |
| Maps | MapLibre (display), MapTiler (geocoding) |
| Hosting | Cyon.ch |

## Platform Requirements

- Progressive Web App (PWA)
- Responsive Design
- Accessibility First
- Internationalization (i18n)

## Important Principles

- Open Source
- Mobile First / Accessibility First
- Privacy-friendly (no tracking)
- Low operating costs
- API-first between Frontend and Backend
- Clear separation of layers