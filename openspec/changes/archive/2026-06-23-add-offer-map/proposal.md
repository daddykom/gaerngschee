## Why

Users need to visually explore offers on a map to find free services and activities near them. The existing offer list doesn't provide geographic context. A dedicated map page with markers and popups improves discoverability.

## What Changes

### New Files
- **NEW**: `src/app/features/offers/offer-map/` - New feature folder with map page components
- **NEW**: `offer-map.container.component.ts` - Container managing state
- **NEW**: `offer-map.view.component.ts` - View with MapLibre GL map
- **NEW**: `offer-map.view.component.html` - Template for map
- **NEW**: `offer-map.view.component.scss` - Styles for map container

### Route Changes
- **MODIFIED**: `src/app/app.routes.ts` - Add lazy route `offers/map`

## Capabilities

### New Capabilities
- `map`: Interactive map display for offer visualization

### Modified Capabilities
- `offers`: Extend with map page view
- `platform`: MapLibre GL JS dependency added

## Impact

Files to create:
- `src/app/features/offers/offer-map/index.ts`
- `src/app/features/offers/offer-map/offer-map.container.component.ts`
- `src/app/features/offers/offer-map/offer-map.container.component.html`
- `src/app/features/offers/offer-map/offer-map.view.component.ts`
- `src/app/features/offers/offer-map/offer-map.view.component.html`
- `src/app/features/offers/offer-map/offer-map.view.component.scss`

Files to modify:
- `src/app/app.routes.ts` - Add route

## Open Questions

- Tile source: OpenFreeMap (free, no API key)
- Map library: `npx-maplibre-gl` (already installed)
- Clustering: Not in scope (filtered by categories)
- Geocoding: Not in scope (done at data entry time)
- User position: Already exists in store as `currentPosition`
