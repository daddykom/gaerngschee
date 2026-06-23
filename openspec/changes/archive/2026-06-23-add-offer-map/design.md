# Offer Map Design

## Overview

New page at route `offers/map` displaying all published offers as markers on an interactive MapLibre GL map.

## Architecture

### Route
```typescript
{
  path: 'offers/map',
  loadComponent: () => import('./features/offers/offer-map')
    .then(m => m.OfferMapContainerComponent)
}
```

### Component Structure

```
src/app/features/offers/offer-map/
├── index.ts                              # Barrel exports
├── offer-map.container.component.ts      # Container (state)
├── offer-map.container.component.html    # Template wrapper
├── offer-map.view.component.ts           # View (presentation)
├── offer-map.view.component.html         # Template
└── offer-map.view.component.scss         # Styles
```

### Container Component

```typescript
// offer-map.container.component.ts
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OfferMapViewComponent],
  template: `<offer-map-view
    [offers]="offers()"
    [currentPosition]="currentPosition()"
    (offerSelected)="onOfferSelected($event)"
  />`
})
export class OfferMapContainerComponent {
  private store = inject(Store);

  offers = this.store.selectSignal(selectAllOffers);
  currentPosition = this.store.selectSignal(selectCurrentPosition);

  onOfferSelected(offerId: string): void {
    // Future: navigation or detail view
  }
}
```

### View Component

**Inputs:**
- `offers: Offer[]` - All published offers with lat/lng
- `currentPosition: OfferLocation` - Center point

**Outputs:**
- `offerSelected: EventEmitter<string>` - Emits offer ID on marker click

**Map Setup:**
- Library: `npx-maplibre-gl`
- Tiles: OpenFreeMap Liberty style (`https://tiles.openfreemap.org/styles/liberty`)
- Center: `currentPosition.latitude`, `currentPosition.longitude`
- Zoom: 14 (city-level)

### Marker Implementation

Each offer renders as a marker with:
- Default marker icon (no category icons in v1)
- Popup on click showing:
  - Offer title
  - Category badge
  - Brief description (truncated to 100 chars)

### Popup HTML
```html
<div class="offer-popup">
  <h4>{{ offer.title }}</h4>
  <span class="category-badge">{{ offer.category?.title }}</span>
  <p>{{ offer.description | slice:0:100 }}...</p>
</div>
```

## State Dependencies

| Selector | Usage |
|----------|-------|
| `selectAllOffers` | All published offers with coordinates |
| `selectCurrentPosition` | Map center (from store) |

## MapLibre GL Integration

```typescript
// In ngAfterViewInit
const map = new Map({
  container: this.mapContainer.nativeElement,
  style: 'https://tiles.openfreemap.org/styles/liberty',
  center: [this.currentPosition.longitude, this.currentPosition.latitude],
  zoom: 14
});

// Add markers from offers
this.offers.forEach(offer => {
  const marker = new Marker()
    .setLngLat([offer.longitude, offer.latitude])
    .setPopup(new Popup().setHTML(this.createPopupContent(offer)))
    .addTo(map);
});
```

## CSS Requirements

Map container must have explicit height:
```scss
:host {
  display: block;
  height: calc(100vh - 64px); // Adjust for header
}
```

MapLibre CSS must be imported (either in angular.json or component):
```scss
@import 'maplibre-gl/dist/maplibre-gl.css';
```

## Implementation Tasks

1. Create directory structure
2. Create barrel export (index.ts)
3. Create view component with MapLibre integration
4. Create container component
5. Add route to app.routes.ts
6. Test map renders with markers

## Future Enhancements

- Category-colored markers
- User location marker
- Cluster markers when zoomed out
- Offer detail panel on marker click
- Geolocation button to center on user
