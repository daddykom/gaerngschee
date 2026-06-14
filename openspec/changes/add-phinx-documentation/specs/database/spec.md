## ADDED Requirements

### Requirement: Database schema managed via Phinx
All database schema changes SHALL be managed via Phinx migrations. No direct SQL modifications in production.

#### Scenario: New table created via migration
- **WHEN** a developer needs to add a new table
- **THEN** they SHALL create a Phinx migration file
- **AND** the migration SHALL be reversible

### Requirement: Migration files are version-controlled
All migration files SHALL be stored in `backend/migrations/` and version-controlled in Git.

#### Scenario: Migration tracked in version control
- **WHEN** a migration is created
- **THEN** it SHALL be committed to the repository
- **AND** it SHALL run automatically on deployment

### Requirement: Environment-based database config
Database connection SHALL use environment variables, not hardcoded credentials.

#### Scenario: Database credentials from environment
- **WHEN** the application connects to the database
- **THEN** it SHALL read credentials from environment variables
- **AND** no credentials SHALL be hardcoded

### Requirement: Rollback support
All migrations SHALL be reversible via `phinx rollback`.

#### Scenario: Migration can be rolled back
- **WHEN** `phinx rollback` is executed
- **THEN** the last migration SHALL be reversed
- **AND** the database schema SHALL match the previous state

## Technical Stack

| Component | Technology |
|-----------|------------|
| Database | MariaDB |
| Migrations | Phinx |
| PHP | 8.x |
| ORM | None (PDO) |

## Implementation Status

| Component | Status |
|-----------|--------|
| Phinx setup | ✗ Not implemented |
| Initial schema | ✗ Not implemented |
| Migrations | ✗ Not implemented |
| Seeds | ✗ Not implemented |