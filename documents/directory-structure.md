# Directory Structure

```
gaerngschee/
├── backend/              # PHP Backend (Slim Framework)
│   ├── public/
│   │   └── index.php     # Entry point
│   ├── src/
│   │   ├── Application.php
│   │   ├── Routes/       # API route definitions
│   │   ├── Data/         # JSON data files
│   │   └── models/       # (reserved for future)
│   ├── vendor/           # PHP dependencies
│   └── composer.json
│
├── frontend/             # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── store/    # NgRx State Management
│   │   │   │   ├── app.state.ts
│   │   │   │   └── offers/
│   │   │   │       ├── offers.actions.ts
│   │   │   │       ├── offers.effects.ts
│   │   │   │       ├── offers.feature.ts
│   │   │   │       └── offers.state.ts
│   │   │   ├── features/ # Feature modules
│   │   │   │   ├── offers/
│   │   │   │   │   └── offer-list/
│   │   │   │   └── categories/
│   │   │   │       └── category-list/
│   │   │   ├── shared/   # Shared utilities
│   │   │   │   ├── models/
│   │   │   │   ├── services/
│   │   │   │   ├── pipes/
│   │   │   │   └── utils/
│   │   │   └── app.component.ts
│   │   ├── environments/
│   │   └── styles.scss
│   └── angular.json
│
├── documents/            # Human-readable documentation
│   ├── project.md        # Project overview
│   ├── directory-structure.md
│   ├── architecture.md
│   ├── frontend-conventions.md
│   └── backend-conventions.md
│
├── docker/               # Docker configuration
├── openspec/             # OpenSpec change artifacts
│   ├── specs/            # Capability specifications
│   └── changes/          # Change proposals
│
├── AGENTS.md             # AI Assistant context (index)
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Key Directories

### `backend/`

PHP backend using Slim Framework. Currently uses JSON files for data storage; MariaDB integration planned.

### `frontend/src/app/store/`

NgRx state management organized by feature:
- `offers/` - Offer-related state
- `categories/` - Category state (planned)
- `ui/` - UI state like loading, errors (planned)

### `features/`

Angular feature modules. Each feature has its own folder with components.

### `shared/`

Reusable code:
- `models/` - TypeScript interfaces
- `services/` - Angular services
- `pipes/` - Angular pipes
- `utils/` - Pure utility functions

### `documents/`

Human-readable project documentation. See [project.md](./project.md) for overview.

### `openspec/`

OpenSpec change management:
- `specs/` - Capability specifications
- `changes/` - Active change proposals and their artifacts