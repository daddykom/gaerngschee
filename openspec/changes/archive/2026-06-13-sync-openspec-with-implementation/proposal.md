## Why

The implementation has evolved since the last OpenSpec sync. The View/Container pattern was implemented for the OfferList component, NgRx selectors were extended, and the effects API format changed. The OpenSpec specs need to reflect these changes to maintain consistency between documentation and code.

## What Changes

### Angular Components
- **MODIFIED**: `OfferListComponent` → split into `OfferListViewComponent` + `OfferListContainerComponent`
- Added `selector` property to components for proper template resolution

### NgRx Store
- **MODIFIED**: Added `selectOffersLoading` selector to `offers.feature.ts`
- **MODIFIED**: Changed `offersEffects` from array to object format in `offers.effects.ts`
- Added `changeDetection: ChangeDetectionStrategy.OnPush` to components

### OpenSpec Specs
- **MODIFIED**: `agents-md-workflow/spec.md` - Updated with document organization requirements
- **MODIFIED**: `openspec/specs/offers/spec.md` - Implementation status needs update

### Documentation
- **NEW**: Created `documents/` directory with human-readable documentation
- **NEW**: `documents/project.md`, `directory-structure.md`, `architecture.md`, `frontend-conventions.md`, `backend-conventions.md`
- **MODIFIED**: `AGENTS.md` - Now an index file linking to documents/ and openspec/specs/

## Capabilities

### New Capabilities
- `view-container-pattern`: Angular component separation pattern (View = pure presentation, Container = state management)
- `document-organization`: Human vs agent documentation structure

### Modified Capabilities
- `offers`: Updated to reflect View/Container implementation, new selectors, and effects format change
- `agents-md-workflow`: Document organization and OpenSpec commands

## Impact

### Files Changed (since last commit)
```
frontend/src/app/
├── app.routes.ts                                    # Updated imports
├── features/offers/offer-list/
│   ├── index.ts                                    # NEW - barrel exports
│   ├── offer-list.component.ts                     # REMOVED - replaced by View/Container
│   ├── offer-list.view.component.ts                # NEW - pure presentation
│   └── offer-list.container.component.ts           # NEW - stateful
├── store/offers/
│   ├── offers.effects.ts                           # MODIFIED - effects as object
│   └── offers.feature.ts                           # MODIFIED - new selector
openspec/specs/
├── agents-md-workflow/spec.md                       # MODIFIED - document org
└── offers/spec.md                                   # MODIFIED - status update
documents/                                            # NEW - human docs
AGENTS.md                                             # MODIFIED - index only
```

### Testing
- Playwright E2E tests added via `@nx/playwright`
- New npm scripts: `test:ci`, `e2e`, `e2e:ci`, `test:all`