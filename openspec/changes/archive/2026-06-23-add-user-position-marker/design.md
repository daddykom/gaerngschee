# User Position Marker Design

## Overview

Add a distinct marker showing the user's current position on the map.

## Implementation

### Marker Design

The user position marker uses a pulsing blue dot design - a common pattern for GPS visualization:

```html
<div class="user-marker">
  <div class="user-marker-pulse"></div>
  <div class="user-marker-dot"></div>
</div>
```

### Component Changes

#### `offer-map.view.component.ts`

Add `addUserPositionMarker()` method called after map initialization:

```typescript
private addUserPositionMarker(): void {
  const el = document.createElement('div');
  el.className = 'user-marker';
  el.innerHTML = `
    <div class="user-marker-pulse"></div>
    <div class="user-marker-dot"></div>
  `;

  new maplibregl.Marker({ element: el })
    .setLngLat([this.currentPosition().longitude, this.currentPosition().latitude])
    .addTo(this.map);
}
```

#### `offer-map.view.component.scss`

```scss
.user-marker {
  position: relative;
  width: 24px;
  height: 24px;
}

.user-marker-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: #4285f4;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.user-marker-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  background: rgba(66, 133, 244, 0.3);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}
```

## Map Center

Map center is already set to `currentPosition` on initialization:
```typescript
center: [this.currentPosition().longitude, this.currentPosition().latitude]
```

## Implementation Tasks

1. Add `addUserPositionMarker()` method to component
2. Call method in `ngAfterViewInit` after map initialization
3. Add CSS styles for user marker
