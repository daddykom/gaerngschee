## MODIFIED Requirements

### Requirement: Offer List Component (View/Container)
The OfferList feature SHALL be implemented using the View/Container pattern with `OfferListViewComponent` and `OfferListContainerComponent`.

#### Scenario: View component receives data via @Input
- **WHEN** the OfferListViewComponent renders
- **THEN** it SHALL receive offers and loading state via `@Input()` properties
- **AND** it SHALL emit cardClick events via `@Output()`

#### Scenario: Container component manages state
- **WHEN** the OfferListContainerComponent initializes
- **THEN** it SHALL dispatch `loadOffers` action
- **AND** it SHALL select offers and loading state from the store

### Requirement: NgRx Selectors
The offers feature SHALL provide the following selectors:
- `selectOffers` - returns all offers
- `selectOffersLoading` - returns loading boolean
- `selectOffersState` - returns full offers state
- `selectCurrentPosition` - returns user's current position

#### Scenario: Loading state is selectable
- **WHEN** a component needs the loading state
- **THEN** it SHALL use `selectOffersLoading` selector
- **AND** not access state properties directly

## Implementation Status

| Component | Status |
|-----------|--------|
| Offer Model | ✓ Implemented |
| NgRx Store (full) | ✓ Implemented |
| `selectOffersLoading` selector | ✓ Implemented |
| `offersEffects` as object | ✓ Implemented |
| OfferListViewComponent | ✓ Implemented |
| OfferListContainerComponent | ✓ Implemented |
| View/Container Pattern | ✓ Implemented |
| GET /api/offers | ✓ Implemented (JSON) |
| Playwright E2E Tests | ✓ Implemented |
| Other CRUD endpoints | ✗ Not implemented |
| Map View | ✗ Not implemented |
| Offer Form | ✗ Not implemented |
| Editor Interface | ✗ Not implemented |