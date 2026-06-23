## Why

Users need to see their current position on the map to orient themselves and understand which offers are near them. This improves the user experience significantly.

## What Changes

### Component Changes
- **MODIFIED**: `src/app/features/offers/offer-map/offer-map.view.component.ts` - Add user position marker
- **MODIFIED**: `src/app/features/offers/offer-map/offer-map.view.component.scss` - Add user marker styling

## Capabilities

### Modified Capabilities
- `map`: Add user position marker feature

## Impact

Files to modify:
- `src/app/features/offers/offer-map/offer-map.view.component.ts`
- `src/app/features/offers/offer-map/offer-map.view.component.scss`

## Open Questions

- User marker style: Pulsing blue dot (standard GPS visualization)
