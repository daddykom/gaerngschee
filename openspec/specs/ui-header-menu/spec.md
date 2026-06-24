# Header Burger-Menu Proposal

## Overview

Add a mobile-friendly burger menu to the header that allows navigation between the two routes: `/offers/list` and `/offers/map`.

## Current State

The app currently has a simple header with just a title and logo. No navigation menu exists.

## Proposed Design

### Desktop
- Logo + Title on the left
- Navigation links directly visible on the right (List | Map)
- Clean, minimal toolbar

### Mobile
- Logo + Title on the left
- Burger menu icon on the right
- Clicking opens a side drawer/menu with navigation links

## Implementation

### Files to Modify

1. **`app.ts`** - Add RouterLink, change detection
2. **`app.html`** - Toolbar with links and burger menu
3. **`app.scss`** - Styling for toolbar and menu

### Template Structure

```html
<mat-toolbar color="primary">
  <img src="ressources/gaerngschee.png" alt="Gaerngschee Logo" class="header-logo">
  <span class="header-title">Gratisangebote in deiner Nähe</span>
  
  <span class="spacer"></span>
  
  <!-- Desktop Navigation -->
  <div class="desktop-nav">
    <a mat-button routerLink="/offers/list" routerLinkActive="active">Liste</a>
    <a mat-button routerLink="/offers/map" routerLinkActive="active">Karte</a>
  </div>
  
  <!-- Mobile Burger Menu -->
  <button mat-icon-button class="mobile-menu-button" (click)="sidenav.toggle()">
    <mat-icon>menu</mat-icon>
  </button>
</mat-toolbar>

<mat-sidenav-container class="main-container">
  <mat-sidenav #sidenav mode="over">
    <mat-nav-list>
      <a mat-list-item routerLink="/offers/list" (click)="sidenav.close()">
        <mat-icon matListItemIcon>list</mat-icon>
        <span matListItemTitle>Liste</span>
      </a>
      <a mat-list-item routerLink="/offers/map" (click)="sidenav.close()">
        <mat-icon matListItemIcon>map</mat-icon>
        <span matListItemTitle>Karte</span>
      </a>
    </mat-nav-list>
  </mat-sidenav>
  
  <mat-sidenav-content>
    <router-outlet></router-outlet>
  </mat-sidenav-content>
</mat-sidenav-container>
```

### Component Changes

**`app.ts`:**
```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Gaerngschee';
}
```

### SCSS Changes

```scss
mat-toolbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.spacer {
  flex: 1 1 auto;
}

.desktop-nav {
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
}

.mobile-menu-button {
  display: none;
  
  @media (max-width: 768px) {
    display: inline-flex;
  }
}

mat-nav-list {
  min-width: 200px;
}

a.active {
  background: rgba(0, 0, 0, 0.04);
  font-weight: 500;
}
```

## Breakpoints

| Breakpoint | Navigation |
|------------|------------|
| < 768px (mobile) | Burger menu + sidenav |
| >= 768px (desktop) | Inline links |

## Menu Items

| Route | Label | Icon |
|-------|-------|------|
| `/offers/list` | Liste | `list` |
| `/offers/map` | Karte | `map` |

## Status

- [x] Proposal created
- [x] Implementation complete

## Change Log

| Date | Change |
|------|--------|
| 2026-06-24 | Initial proposal |
| 2026-06-24 | Implementation complete |
