# AGENTS.md

Projekt-Informationen für AI-Assistenten

## Projektübersicht

**Gratisangebote-Karte** - Open-Source-Webapplikation zur Unterstützung von Menschen mit wenig finanziellen Mitteln bei der Suche nach kostenlosen Angeboten, sowie zur Hilfe für einsame Menschen beim Entdecken von Aktivitäten und sozialen Kontakten in ihrer Region.

## Verzeichnisstruktur

```
gaerngschee/
├── backend/          # PHP Backend (Slim Framework, Docker)
├── frontend/         # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── store/         # NgRx Store
│   │   │   │   ├── offers/    # Offers Feature
│   │   │   │   ├── actions/   # *.actions.ts
│   │   │   │   ├── reducers/  # *.reducer.ts
│   │   │   │   ├── selectors/ # *.selectors.ts
│   │   │   │   └── effects/   # *.effects.ts
│   │   │   ├── shared/
│   │   │   │   ├── models/    # *.model.ts
│   │   │   │   ├── services/   # *.service.ts
│   │   │   │   ├── pipes/     # *.pipe.ts
│   │   │   │   └── utils/     # *.util.ts
│   │   │   └── app.component.ts
│   │   ├── environments/
│   │   └── styles.scss
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   ├── .eslintrc.json
│   └── .prettierrc
├── docker/           # Docker-Konfiguration
├── LICENSE
└── README.md
```

## Datei-Patterns (Frontend)

| Pattern                | Beschreibung                      |
|------------------------|-----------------------------------|
| `*.component.ts`       | Angular Komponenten               |
| `*.component.html`     | Angular Template                  |
| `*.component.scss`    | Styles                            |
| `*.service.ts`        | Angular Services                  |
| `*.actions.ts`        | NgRx Actions                      |
| `*.reducer.ts`         | NgRx Reducer                      |
| `*.selectors.ts`       | NgRx Selectors                    |
| `*.effects.ts`         | NgRx Effects                      |
| `*.model.ts`           | TypeScript Interfaces/Models      |
| `*.util.ts`            | Pure Functions, Helper             |
| `*.pipe.ts`            | Angular Pipes                     |

## NgRx Store-Aufbau

```
store/
├── app.state.ts           # Root State Interface
├── offers/                # Feature: Angebote
│   ├── offers.actions.ts
│   ├── offers.reducer.ts
│   ├── offers.selectors.ts
│   ├── offers.effects.ts
│   └── offers.state.ts    # Feature State Interface
├── categories/            # Feature: Kategorien
│   └── ...
└── ui/                    # UI State (Loading, Errors)
    └── ...
```

**State Interface Beispiel:**

```typescript
interface OffersState {
  offers: Offer[];
  selectedOffer: Offer | null;
  loading: boolean;
  error: string | null;
}
```

## Technologiestack

| Bereich    | Technologie        |
|------------|--------------------|
| Frontend   | Angular, NgRx, Angular Material + CDK, TypeScript |
| Testing    | Jest (Unit Tests)  |
| Backend    | PHP, Slim Framework |
| Datenbank  | MariaDB            |
| Karten     | OpenFreeMap, MapLibre |
| Hosting    | Cyon.ch            |

## Plattform-Anforderungen

- Progressive Web App (PWA)
- Responsive Design
- Barrierefreiheit (Accessibility First)
- Mehrsprachigkeit

## Programmierstil

- **Funktionaler Stil** bevorzugt
- Pure Functions und Immutable Data
- Klassen nur wo frameworkbedingt nötig (Angular Components/Services)
- Geschäftslogik in testbare pure Functions auslagern
- Seiteneffekte klar begrenzen
- Strenge Typisierung

**Beispiel - Business Logic auslagern:**

```typescript
// BAD: Logik im Component/Service
@Component()
class OfferListComponent {
  filteredOffers = this.offers.filter(o => o.status === 'published');
}

// GOOD: Logik in pure function
export const filterPublishedOffers = (offers: Offer[]): Offer[] =>
  offers.filter(o => o.status === 'published');
```

## Qualitätssicherung

- Unit Tests für: Angular Components/Services, NgRx (Reducer/Selectors/Effects), PHP Backend, Pure Functions, Validierungslogik
- Playwright für E2E-Tests (optional, noch zu evaluieren)
- Linting und Build-Prüfung
- GitHub Actions für CI/CD

## Noch offene Entscheidungen

- Benutzer- und Rollenmodell
- Workflow für Ablehnung/Rückfragen
- Mehrsprachigkeitskonzept (i18n)
- Import/Export-Möglichkeiten
- Playwright-Setup
- Deployment-Strategie zu Cyon

## Wichtige Prinzipien

- Open Source
- Mobile First / Accessibility First
- Datenschutzfreundlich
- Geringe Betriebskosten
- API-first zwischen Frontend und Backend
- Klare Trennung der Schichten