# Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Angular    │  │    NgRx     │  │   MapLibre +        │ │
│  │  Components │◄─┤    Store    │  │   OpenFreeMap       │ │
│  └─────────────┘  └──────┬──────┘  └─────────────────────┘ │
└──────────────────────────┼──────────────────────────────────┘
                           │ REST API (JSON)
┌──────────────────────────┼──────────────────────────────────┐
│                        Backend                              │
│  ┌─────────────┐  ┌──────┴──────┐  ┌─────────────────────┐ │
│  │   Slim 4    │  │   Routes    │  │   MariaDB           │ │
│  │   PHP 8     │  │  (PSR-15)   │  │   (planned)         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### View/Container Pattern

Components follow the View/Container pattern for clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                   ContainerComponent                         │
│  - Injects NgRx Store and services                          │
│  - Selects state via selectors                              │
│  - Dispatches actions                                       │
│  - Handles events from View                                 │
└─────────────────────────────────────────────────────────────┘
                            │ @Input() / @Output()
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     ViewComponent                            │
│  - Pure presentation (no side effects)                      │
│  - Receives data via @Input()                               │
│  - Emits events via @Output()                               │
│  - No service injections                                    │
└─────────────────────────────────────────────────────────────┘
```

### Naming Convention

| Type | Suffix | Example |
|------|--------|---------|
| View (pure) | `ViewComponent` | `OfferListViewComponent` |
| Container | `ContainerComponent` | `OfferListContainerComponent` |

### NgRx Store Structure

```
store/
├── app.state.ts           # Root state interface
├── offers/                # Offers feature
│   ├── offers.actions.ts  # Action definitions
│   ├── offers.feature.ts  # createFeature (reducer + selectors)
│   ├── offers.effects.ts  # Side effects (functional pattern)
│   └── offers.state.ts    # State interface + initialState
├── categories/            # Categories feature (planned)
└── ui/                    # UI state (planned)
```

### Functional Effects

Effects use the functional pattern with `createEffect` and `{ functional: true }`:

```typescript
export const loadOffersEffect = createEffect(
    (actions$ = inject(Actions), store = inject(Store), offersService = inject(OffersService)) => {
        return actions$.pipe(
            ofType(OffersActions.loadOffers),
            withLatestFrom(store.select(selectCurrentPosition)),
            switchMap(([, currentPosition]) =>
                offersService.getOffers().pipe(
                    map((offers) => OffersActions.loadOffersSuccess({ offers })),
                    catchError((error) => of(OffersActions.loadOffersFailure({ error: error.message })))
                )
            )
        );
    },
    { functional: true }
);

export const offersEffects = [loadOffersEffect];
```

Effects are registered in `app.config.ts`:
```typescript
provideEffects(offersEffects)
```

## Backend Architecture

### Slim Framework Structure

```
backend/
├── public/
│   └── index.php          # Entry point
├── src/
│   ├── Application.php    # App configuration
│   ├── Routes/            # API route definitions
│   │   └── OfferRoutes.php
│   └── Data/              # JSON data files
│       └── offers.json
└── vendor/                # Dependencies
```

### API Design

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/offers` | List all published offers |
| GET | `/api/offers/{id}` | Get single offer |
| POST | `/api/offers` | Create new offer |
| PUT | `/api/offers/{id}` | Update offer |
| DELETE | `/api/offers/{id}` | Delete offer |

## Data Model

### Offer

```typescript
interface Offer {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  location: {
    address: string;
    longitude: number;
    latitude: number;
  };
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  contact: {
    name: string;
    email?: string;
    phone?: string;
  };
  imageUrl: string | null;
}

type CategoryType = 'essen' | 'freizeit' | 'kultur' | 'sport' | 'beratung' | 'treffpunkte' | 'bildung';
```

## Technology Choices

### Why Angular?

- Component-based architecture fits View/Container pattern
- NgRx provides predictable state management
- Strong typing with TypeScript
- Good tooling and ecosystem

### Why Slim?

- Lightweight, suitable for shared hosting (Cyon)
- PSR-7/15 compliance
- FastRoute included for routing
- No ORM coupling

### Why MapLibre + OpenFreeMap?

- Open-source (no licensing costs)
- OpenFreeMap provides free vector tiles
- MapTiler for geocoding

### Why MariaDB?

- Recommended in project requirements
- Cyon supports MariaDB
- Relational model fits offer/category relationship