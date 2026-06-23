# Categories Capability Spec

## Overview

Categories allow filtering and organizing offers by type.

## Categories

| Category    | German      | Description                        |
|-------------|-------------|------------------------------------|
| `kleidung`  | Kleidung    | Clothing, textiles                 |
| `buecher`   | Bücher      | Books, magazines, reading          |
| `aktivitaeten` | Aktivitäten | Activities, events              |
| `essen`     | Essen       | Food, meals, groceries             |
| `bildung`   | Bildung     | Education, courses, workshops      |
| `sport`     | Sport       | Sports activities, fitness         |
| `moebel`    | Möbel       | Furniture, household items         |
| `soziales`  | Soziales    | Social services, community         |
| `mobilitaet` | Mobilität  | Transportation, bikes, rides       |
| `freizeit`  | Freizeit    | Leisure, games, hobbies            |
| `tiere`     | Tiere       | Pets, animal supplies              |
| `technik`   | Technik     | Technology, computers, repairs     |
| `garten`    | Garten      | Garden, plants, outdoor            |

## Features

### F1: Category List

Display all available categories for filtering.

### F2: Category Filtering

Users can filter offers by one or multiple categories.

## State (NgRx)

```typescript
interface CategoriesState {
  categories: Category[];
  selectedCategories: string[];
  loading: boolean;
  error: string | null;
}

interface Category {
  id: string;
  name: string;
  nameDe: string;
  icon?: string;
}
```

## Implementation Status

| Component | Status |
|-----------|--------|
| Category Model | ✓ Implemented |
| NgRx Store | ✓ Implemented |
| Category List Component | ✓ Implemented (empty) |
| Category Filtering | ✗ Not implemented |
| API Endpoint | ✗ Not implemented |

## Notes

- Categories are seeded from `db/seeds/production/InitialCategorySeeder.php`
- Category IDs match the JSON data format for compatibility