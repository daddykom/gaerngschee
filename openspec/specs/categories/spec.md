# Categories Capability Spec

## Overview

Categories allow filtering and organizing offers by type.

## Categories

| Category    | German      | Description                        |
|-------------|-------------|------------------------------------|
| `essen`     | Essen       | Free food, food banks, meals       |
| `freizeit`  | Freizeit    | Leisure activities, recreation     |
| `kultur`    | Kultur      | Cultural events, museums, concerts |
| `sport`     | Sport       | Sports activities, fitness         |
| `beratung`  | Beratung    | Counseling, social services        |
| `treffpunkte` | Treffpunkte | Meeting places, social gatherings |
| `bildung`   | Bildung     | Education, courses, workshops      |

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
| Category Model | ✗ Not implemented |
| NgRx Store | ✗ Not implemented |
| Category List Component | ✓ Implemented (empty) |
| Category Filtering | ✗ Not implemented |
| API Endpoint | ✗ Not implemented |

## Notes

- Hardcoded list in README.md
- No dedicated category API or store yet
- Component exists but is empty