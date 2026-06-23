## Why

The project needs proper database schema management as it evolves from JSON files to MariaDB. Phinx provides version-controlled database migrations that can be rolled back, are testable, and integrate well with PHP/Slim projects.

## What Changes

### Documentation Changes
- **NEW**: Create `documents/database-conventions.md` with Phinx setup and usage guide
- **NEW**: Create `openspec/specs/database/spec.md` with database capability spec
- **MODIFIED**: Update `openspec/specs/platform/spec.md` to add Phinx requirements
- **MODIFIED**: Update `documents/backend-conventions.md` to reference database-conventions.md
- **MODIFIED**: Update `AGENTS.md` to link to new documentation

## Capabilities

### New Capabilities
- `database`: Database management using MariaDB with Phinx migrations

### Modified Capabilities
- `platform`: Add database migration requirements to platform spec

## Impact

Files to create:
- `documents/database-conventions.md` - Phinx setup and conventions
- `openspec/specs/database/spec.md` - Database capability spec

Files to modify:
- `AGENTS.md` - Add links
- `openspec/specs/platform/spec.md` - Add migration requirements
- `documents/backend-conventions.md` - Update "Future" section