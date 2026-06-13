# Frontend Conventions

## View/Container Pattern

### Principle

Separate pure presentation (View) from stateful logic (Container).

### ViewComponent

- **Pure** - no side effects
- Receives data via `@Input()`
- Emits events via `@Output()`
- No service injections
- No direct store access

```typescript
@Component({
  selector: 'app-offer-list-view',
  standalone: true,
  template: `
    <div class="offer-list">
      @for (offer of offers(); track offer.id) {
        <app-offer-card [offer]="offer" (cardClick)="onCardClick.emit($event)" />
      }
    </div>
  `
})
export class OfferListViewComponent {
  @Input() offers: Offer[] = [];
  @Output() cardClick = new EventEmitter<Offer>();
}
```

### ContainerComponent

- **Impure** - manages state
- Injects NgRx Store and services
- Selects state via selectors
- Dispatches actions
- Passes data to View via `@Input()`

```typescript
@Component({
  selector: 'app-offer-list-container',
  standalone: true,
  template: `<app-offer-list-view [offers]="offers()" (cardClick)="onCardClick($event)" />`
})
export class OfferListContainerComponent {
  private store = inject(Store);

  offers = toSignal(this.store.select(selectOffers));

  onCardClick(offer: Offer) {
    this.store.dispatch(OfferActions.selectOffer({ offer }));
  }
}
```

## File Patterns

| Pattern | Description |
|---------|-------------|
| `*.component.ts` | Angular components |
| `*.component.html` | Component templates |
| `*.component.scss` | Component styles |
| `*.service.ts` | Angular services |
| `*.actions.ts` | NgRx actions |
| `*.feature.ts` | NgRx feature (reducer + selectors) |
| `*.effects.ts` | NgRx effects (functional pattern) |
| `*.model.ts` | TypeScript interfaces |
| `*.util.ts` | Pure utility functions |
| `*.pipe.ts` | Angular pipes |

## NgRx Store Organization

```
store/
├── app.state.ts           # Root state interface
├── offers/
│   ├── offers.actions.ts  # ofType actions
│   ├── offers.feature.ts  # createFeature + selectors
│   ├── offers.effects.ts  # Side effects
│   └── offers.state.ts    # State interface + initialState
└── categories/
    └── ...
```

## State Interface Example

```typescript
interface OffersState {
  offers: Offer[];
  selectedOffer: Offer | null;
  loading: boolean;
  error: string | null;
  currentPosition: OfferLocation;
}

export const initialState: OffersState = {
  offers: [],
  selectedOffer: null,
  loading: false,
  error: null,
  currentPosition: {
    latitude: 47.556431,
    longitude: 7.591641,
    address: 'Münsterplatz, Basel',
  },
};
```

## Functional Effects Pattern

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

Registration in `app.config.ts`:
```typescript
provideEffects(offersEffects)
```

## Coding Style

### Prefer Pure Functions

```typescript
// BAD
@Component()
class OfferListComponent {
    filteredOffers = this.offers.filter(o => o.status === 'published');
}

// GOOD
export const filterPublishedOffers = (offers: Offer[]): Offer[] =>
    offers.filter(o => o.status === 'published');
```

### Use Strong Typing

- No `any` types
- Explicit return types
- Use interfaces for all data structures

### Immutable Data

- Use spread operators for updates
- Avoid mutation
- Use `readonly` where applicable

## Testing

- Jest for unit tests
- Components: test rendering with `@Input()` values
- Services: mock dependencies
- NgRx: test actions, reducers, selectors independently
- Pure functions: simple input/output tests