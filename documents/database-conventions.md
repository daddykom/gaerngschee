# Database Conventions

## Overview

Database schema management using MariaDB with Phinx migrations.

## Phinx Migration Tool

[Phinx](https://phinx.org/) is used for database migrations. It allows version-controlled schema changes that can be rolled back.

### Installation

```bash
cd backend
composer require robmorgan/phinx
composer require --dev phpunit/phpunit
```

### Project Structure

```
backend/
├── phinx.php              # Phinx configuration
├── migrations/           # Database migrations
│   └── 20240614000000_create_offers_table.php
└── seeds/                # Database seeds (optional)
```

## Phinx Configuration

###phinx.php

```php
<?php
declare(strict_types=1);

return [
    'paths' => [
        'migrations' => __DIR__ . '/migrations',
        'seeds' => __DIR__ . '/seeds',
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'development' => [
            'adapter' => 'mysql',
            'host' => getenv('DB_HOST') ?: 'localhost',
            'name' => getenv('DB_NAME') ?: 'gaerngschee',
            'user' => getenv('DB_USER') ?: 'root',
            'pass' => getenv('DB_PASS') ?: '',
            'port' => getenv('DB_PORT') ?: '3306',
            'charset' => 'utf8mb4',
        ],
    ],
];
```

## Commands

| Command | Description |
|---------|-------------|
| `phinx create <name>` | Create new migration |
| `phinx migrate` | Run all pending migrations |
| `phinx rollback` | Rollback last migration |
| `phinx status` | Show migration status |
| `phinx seed:run` | Run database seeds |
| `phinx break` | Rollback all migrations |

## Migration Example

```php
<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateOffersTable extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('offers', ['id' => false, 'primary_key' => 'id']);
        $table->addColumn('id', 'uuid')
              ->addColumn('title', 'string', ['limit' => 255])
              ->addColumn('description', 'text')
              ->addColumn('category', 'string', ['limit' => 50])
              ->addColumn('address', 'string', ['limit' => 500])
              ->addColumn('latitude', 'decimal', ['precision' => 10, 'scale' => 8])
              ->addColumn('longitude', 'decimal', ['precision' => 11, 'scale' => 8])
              ->addColumn('status', 'enum', ['values' => ['draft', 'pending', 'published', 'archived']])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['update' => 'CURRENT_TIMESTAMP'])
              ->create();
    }
}
```

## Docker Integration

For local development with Docker:

```yaml
# docker-compose.yml
services:
  db:
    image: mariadb:10.11
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: gaerngschee
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

## Environment Variables

```bash
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gaerngschee
DB_USER=root
DB_PASS=root
```

## Coding Standards

### Migration Rules

1. Always use `change()` method (allows rollback)
2. Use UUID for primary keys
3. Include `created_at` and `updated_at` timestamps
4. Use meaningful migration names: `create_<table>_table`, `add_<column>_to_<table>`

### Example: Adding a Column

```php
<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddContactEmailToOffersTable extends AbstractMigration
{
    public function change(): void
    {
        $this->table('offers')
             ->addColumn('contact_email', 'string', ['limit' => 255, 'null' => true])
             ->update();
    }
}
```

## See Also

- [backend-conventions.md](./backend-conventions.md) - PHP backend conventions
- [openspec/specs/database/spec.md](../openspec/specs/database/spec.md) - Database capability spec