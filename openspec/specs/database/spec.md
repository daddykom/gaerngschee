# Database Capability Spec

## Overview

Database schema management using MariaDB with Phinx migrations.

## Technical Stack

| Component | Technology |
|-----------|------------|
| Database | MariaDB |
| Migrations | Phinx |
| PHP | 8.x |
| ORM | None (PDO) |

## Project Structure

```
db/
├── phinx.php                    # Phinx configuration
├── migrations/                  # Database migrations
│   └── 20260614080000_create_offers_table.php
└── seeds/
    ├── development/             # Development and test data (23 offers)
    │   └── OfferTestSeeder.php
    ├── test/                    # Minimal test data (3 offers)
    │   └── OfferTestSeeder.php
    └── production/              # Production initial data
        └── InitialCategorySeeder.php
```

## Database Schema

### offers

| Column | Type | Constraints |
|--------|------|-------------|
| id | VARCHAR(36) | PRIMARY KEY |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| category | VARCHAR(50) | NOT NULL |
| latitude | DECIMAL(10,8) | |
| longitude | DECIMAL(11,8) | |
| address | VARCHAR(500) | |
| status | ENUM('draft','pending','published','archived') | DEFAULT 'published' |
| contact_name | VARCHAR(255) | |
| contact_email | VARCHAR(255) | |
| contact_phone | VARCHAR(50) | |
| image_url | VARCHAR(500) | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |

## Requirements

### Requirement: Database schema managed via Phinx
All database schema changes SHALL be managed via Phinx migrations. No direct SQL modifications in production.

#### Scenario: New table created via migration
- **WHEN** a developer needs to add a new table
- **THEN** they SHALL create a Phinx migration file
- **AND** the migration SHALL be reversible

### Requirement: Migration files are version-controlled
All migration files SHALL be stored in `db/migrations/` and version-controlled in Git.

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

### Requirement: Environment-specific seeding
Seeds SHALL be organized by environment (development, test, production) to support different data needs.

#### Scenario: Development seeds
- **WHEN** running seeds for development
- **THEN** all seeders in `db/seeds/development/` SHALL be executed

#### Scenario: Test seeds
- **WHEN** running seeds for testing
- **THEN** only seeders in `db/seeds/test/` SHALL be executed

#### Scenario: Production seeds
- **WHEN** running seeds for production
- **THEN** only seeders in `db/seeds/production/` SHALL be executed

## Implementation Status

| Component | Status |
|-----------|--------|
| Phinx setup | ✓ Configured |
| offers table migration | ✓ Implemented |
| Seeders | ✓ Implemented |
| Backend Repository | ✓ Implemented |
| API Integration | ✓ Implemented |

## Notes

- See [documents/database-conventions.md](../../../documents/database-conventions.md) for Phinx setup guide
- JSON data file (`backend/src/Data/offers.json`) has been migrated to database