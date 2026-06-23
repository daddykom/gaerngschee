# Map Capability Spec (Delta)

## Overview

Interactive map page displaying offers as markers with popups.

## Technology Stack

| Component     | Technology        |
|---------------|-------------------|
| Map Client    | MapLibre GL JS    |
| Package       | npx-maplibre-gl   |
| Map Tiles     | OpenFreeMap       |
| Tile URL      | https://tiles.openfreemap.org/styles/liberty |

## Features

### F1: Map Page Route

- Route: `/offers/map`
- Lazy-loaded standalone page
- Full-page map display

### F2: Map Display

- Map centered on `currentPosition` from store
- Default zoom: 14
- OpenFreeMap Liberty tile style
- Responsive height (full viewport minus header)

### F3: Offer Markers

- Each published offer shown as marker
- Marker position from `latitude` + `longitude` fields
- Click opens popup with:
  - Offer title
  - Category badge
  - Description (truncated to 100 chars)

### F4: Popup Interaction

- Click marker to show popup
- Close popup by clicking elsewhere

## State Integration

| Selector | Type | Description |
|----------|------|-------------|
| `selectAllOffers` | `Offer[]` | All offers with coordinates |
| `selectCurrentPosition` | `OfferLocation` | Map center point |

## Files

### New Files
- `src/app/features/offers/offer-map/index.ts`
- `src/app/features/offers/offer-map/offer-map.container.component.ts`
- `src/app/features/offers/offer-map/offer-map.container.component.html`
- `src/app/features/offers/offer-map/offer-map.view.component.ts`
- `src/app/features/offers/offer-map/offer-map.view.component.html`
- `src/app/features/offers/offer-map/offer-map.view.component.scss`

### Modified Files
- `src/app/app.routes.ts` - Add `offers/map` route

## Implementation Status

| Component | Status |
|-----------|--------|
| Map Page Route | ○ Planned |
| MapLibre Integration | ○ Planned |
| Offer Markers | ○ Planned |
| Popup Display | ○ Planned |
