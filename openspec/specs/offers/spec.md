# Offers Capability Spec

## Overview

The offers capability is the core of the application. It enables users to find free offers (Kleidung, Bücher, Aktivitäten, Essen, Bildung, Sport, Möbel, Soziales, Mobilität, Freizeit, Tiere, Technik, Garten) on a map or in a list view.

## Entities

### Offer

```typescript
interface Offer {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  location: OfferLocation;
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
  contact: ContactInfo;
  imageUrl: string | null;
}

interface OfferLocation {
  address: string;
  longitude: number;
  latitude: number;
}

interface ContactInfo {
  name: string;
  email?: string;
  phone?: string;
}

type OfferStatus = 'draft' | 'pending' | 'published' | 'archived';
type CategoryType = 'kleidung' | 'buecher' | 'aktivitaeten' | 'essen' | 'bildung' | 'sport' | 'moebel' | 'soziales' | 'mobilitaet' | 'freizeit' | 'tiere' | 'technik' | 'garten';
```

## Features

### F1: Offer Search

Users can browse and search free offers.

**Views:**
- **Map View** - Offers displayed as markers on an interactive map (MapLibre + OpenFreeMap)
- **List View** - Offers displayed as a scrollable list

Users can switch between views at any time.

**Filtering:**
- By category (one or multiple)
- By status (public: only `published` offers)

### F2: Offer Details

Clicking an offer marker/list item shows detailed information:
- Title, description, category
- Location with address and coordinates
- Contact information
- Image (if available)
- Created/updated timestamps

### F3: Offer Creation

Users can submit new offers.

**Workflow:**
1. User fills out offer form (title, description, category, location, contact)
2. Offer is saved with status `pending`
3. Editor reviews and approves/rejects

### F4: Offer Management (Editor)

Editors can:
- View all offers (including `pending`, `draft`, `archived`)
- Approve pending offers → status becomes `published`
- Reject offers
- Edit offer details
- Change category
- Correct texts, locations, times, other details
- Archive offers

## API Endpoints

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | `/api/offers`  | List all published offers |
| GET    | `/api/offers/{id}` | Get single offer |
| POST   | `/api/offers`  | Create new offer |
| PUT    | `/api/offers/{id}` | Update offer |
| DELETE | `/api/offers/{id}` | Delete offer |

## State (NgRx)

```typescript
interface OffersState {
  offers: Offer[];
  selectedOffer: Offer | null;
  loading: boolean;
  error: string | null;
  currentPosition: OfferLocation;
}
```

## Implementation Status

| Component | Status |
|-----------|--------|
| Offer Model | ✓ Implemented |
| NgRx Store | ✓ Implemented |
| Offer List Component | ✓ Implemented |
| GET /api/offers | ✓ Implemented (MariaDB) |
| Other CRUD endpoints | ✗ Not implemented |
| Map View | ✗ Not implemented |
| Offer Form | ✗ Not implemented |
| Editor Interface | ✗ Not implemented |

## Notes

- Data source: MariaDB database (migrated from JSON)
- Status filtering not yet implemented in API
- Coordinates are placeholders (Münsterplatz, Basel default)