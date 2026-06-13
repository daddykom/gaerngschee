## ADDED Requirements

### Requirement: View components are pure functions
A View component SHALL be a pure Angular component that receives all data through `@Input()` properties and communicates events through `@Output()` properties. It SHALL NOT inject services or directly access the NgRx store.

#### Scenario: Pure View component renders data
- **WHEN** a View component receives data through `@Input()` properties
- **THEN** it SHALL render that data without modification
- **AND** it SHALL emit events through `@Output()` for user interactions

### Requirement: View components have no side effects
A View component SHALL NOT perform any side effects including:
- HTTP requests
- Direct store dispatches
- Browser API access (localStorage, sessionStorage, etc.)
- Timers or intervals
- Logging to console

#### Scenario: View component has no service dependencies
- **WHEN** an AI assistant reviews a View component
- **THEN** it SHALL find no `inject()` calls or service constructor injections
- **AND** it SHALL find only `@Input()` and `@Output()` decorators

### Requirement: Container components manage state
A Container component SHALL inject services (including NgRx Store) and SHALL NOT render UI directly. It SHALL pass data to View components via `@Input()` and handle events from View components via `@Output()`.

#### Scenario: Container component dispatches actions
- **WHEN** a Container component receives a user event from a View
- **THEN** it SHALL dispatch appropriate NgRx actions
- **AND** it SHALL select state from the store to pass to View components

### Requirement: View/Container naming convention
View components SHALL be named with the suffix `ViewComponent` (e.g., `OfferListViewComponent`). Container components SHALL be named with the suffix `ContainerComponent` (e.g., `OfferListContainerComponent`).

#### Scenario: Component naming follows convention
- **WHEN** an AI assistant creates a new feature component
- **THEN** it SHALL create both a `*ViewComponent` and `*ContainerComponent`
- **AND** the View component SHALL be used in the Container's template

### Requirement: Container components use functional effects
Container components SHALL use NgRx functional effects with `createEffect` and `{ functional: true }` for side effects. Effects SHALL be exported as objects and registered in `app.config.ts`.

#### Scenario: Effects follow factory pattern
- **WHEN** a Container component needs to handle side effects
- **THEN** it SHALL use `createEffect` with `{ functional: true }`
- **AND** effects SHALL be exported as objects (e.g., `offersEffects = { loadOffersEffect }`)

### Requirement: State selection uses selectors
Container components SHALL use NgRx selectors (created via `createFeatureSelector` and `createSelector`) to derive state, not direct property access.

#### Scenario: Container uses selectors for state
- **WHEN** a Container component needs data from the store
- **THEN** it SHALL use memoized selectors
- **AND** it SHALL NOT access state properties directly

### Requirement: Component selector requirement
View components SHALL define a `selector` property in the `@Component` decorator for proper template resolution.

#### Scenario: View component has selector
- **WHEN** a View component is used in a template
- **THEN** it SHALL have a `selector` property (e.g., `selector: 'app-offer-list-view'`)
- **AND** the selector SHALL match the element name used in the Container's template

### Requirement: Change detection strategy
View and Container components SHALL use `ChangeDetectionStrategy.OnPush` for optimal performance.

#### Scenario: Components use OnPush change detection
- **WHEN** a View or Container component is created
- **THEN** it SHALL set `changeDetection: ChangeDetectionStrategy.OnPush` in the `@Component` decorator