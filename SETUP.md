# Projekt-Setup Anleitung

Diese Anleitung beschreibt, wie du ein neues Projekt mit folgender Infrastruktur aufsetzt:

- **Nx Workspace** mit Angular 18+
- **Slim 4** PHP Backend
- **MariaDB** Datenbank
- **Docker** + docker-compose
- **phpMyAdmin**
- **Phinx** für Datenbank-Migrationen
- **PHPUnit** für Tests

## Voraussetzungen

- Node.js 18+
- PHP 8.3+
- Composer
- Docker + docker-compose
- Nx CLI (`npm install -g nx`)

---

## 1. Verzeichnisstruktur erstellen

```bash
mkdir mein-projekt && cd mein-projekt
mkdir -p frontend backend docker db documents openspec/specs
```

---

## 2. Nx Workspace mit Angular erstellen

```bash
# Nx Workspace initialisieren
npx create-nx-workspace@latest frontend \
  --preset=angular-standalone \
  --appName=app \
  --style=scss \
  --routing=true \
  --e2eTestRunner=none \
  --nxCloud=skip \
  --interactive=false

# Angular in den Projekt-Root verschieben
mv frontend/* .
mv frontend/.* . 2>/dev/null || true
rmdir frontend
```

---

## 3. Docker-Setup

### docker-compose.yml

```yaml
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: mein-projekt-backend
    ports:
      - "8080:80"
    volumes:
      - ./backend:/var/www/html
      - ./db:/var/www/db
    environment:
      - PHP_DISPLAY_ERRORS=1
      - DB_HOST=database
      - DB_PORT=3306
      - DB_NAME=mein_projekt
      - DB_USER=mein_projekt
      - DB_PASS=changeme

  database:
    image: mariadb:10.11
    container_name: mein-projekt-database
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=mein_projekt
      - MYSQL_USER=mein_projekt
      - MYSQL_PASSWORD=changeme
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: mein-projekt-phpmyadmin
    ports:
      - "8081:80"
    environment:
      - PMA_HOST=database
      - PMA_PORT=3306
      - PMA_USER=mein_projekt
      - PMA_PASSWORD=changeme
    depends_on:
      - database

volumes:
  db_data:
```

### Dockerfile

```dockerfile
FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    mariadb-client \
    libzip-dev \
    oniguruma-dev \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    zip \
    mbstring \
    opcache \
    xdebug

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/php.ini /usr/local/etc/php/conf.d/99-custom.ini
COPY backend/ ./
COPY db/ /var/www/db/

WORKDIR /var/www/html

RUN composer install --no-dev --optimize-autoloader && \
    composer install --dev --no-interaction --optimize-autoloader || true

RUN chown -R nginx:nginx /var/www/html /var/www/db

EXPOSE 80

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
```

### docker/nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /var/www/html/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### docker/supervisord.conf

```ini
[supervisord]
nodaemon=true
logfile=/var/log/supervisord.log
pidfile=/var/run/supervisord.pid

[program:php-fpm]
command=php-fpm -F
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:nginx]
command=nginx -g "daemon off;"
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
```

### docker/php.ini

```ini
[PHP]
display_errors = 1
error_reporting = E_ALL
memory_limit = 256M
upload_max_filesize = 20M
post_max_size = 20M

[opcache]
opcache.enable = 1
opcache.memory_consumption = 128
opcache.interned_strings_buffer = 8
opcache.max_accelerated_files = 10000
opcache.validate_timestamps = 0

[xdebug]
xdebug.mode = develop,debug
xdebug.start_with_request = yes
xdebug.client_host = host.docker.internal
```

---

## 4. Slim 4 Backend erstellen

### backend/composer.json

```json
{
    "name": "projekt/backend",
    "description": "Slim 4 PHP Backend",
    "type": "project",
    "require": {
        "php": "^8.3",
        "slim/slim": "^4.12",
        "slim/psr7": "^1.7",
        "fastroute/fastroute": "^5.0",
        "php-di/php-di": "^7.0",
        "robmorgan/phinx": "^0.14"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.5"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "App\\Tests\\": "tests/"
        }
    },
    "scripts": {
        "start": "php -S localhost:8080 -t public",
        "phinx": "vendor/bin/phinx",
        "phinx:migrate": "vendor/bin/phinx migrate",
        "phinx:rollback": "vendor/bin/phinx rollback",
        "test": "vendor/bin/phpunit"
    }
}
```

### backend/public/index.php

```php
<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use App\Application;
use Slim\Factory\AppFactory;

$app = AppFactory::create();

(require __DIR__ . '/../src/Routes/api.php')($app);

$app->run();
```

### backend/src/Routes/api.php

```php
<?php

declare(strict_types=1);

use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app): void {
    $app->get('/', function ($request, $response) {
        $response->getBody()->write(json_encode(['status' => 'ok']));
        return $response->withHeader('Content-Type', 'application/json');
    });
};
```

### backend/phinx.yml

```yaml
paths:
    migrations: %%PHINX_CONFIG_DIR%%/db/migrations
    seeds: %%PHINX_CONFIG_DIR%%/db/seeds

environments:
    default_migration_table: phinxlog
    default_database: development

    development:
        adapter: mysql
        host: database
        name: mein_projekt
        user: mein_projekt
        pass: changeme
        port: 3306
        charset: utf8mb4
```

### backend/phpunit.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true"
         cacheDirectory=".phpunit.cache">
    <testsuites>
        <testsuite name="Unit">
            <directory>tests</directory>
        </testsuite>
    </testsuites>
    <source>
        <include>
            <directory suffix=".php">src</directory>
        </include>
    </source>
    <php>
        <env name="DB_HOST" value="database"/>
        <env name="DB_PORT" value="3306"/>
        <env name="DB_NAME" value="mein_projekt"/>
        <env name="DB_USER" value="mein_projekt"/>
        <env name="DB_PASS" value="changeme"/>
    </php>
</phpunit>
```

### backend/db/migrations/.gitkeep

Leere Datei erstellen für Migrations-Verzeichnis.

### backend/tests/.gitkeep

Leere Datei erstellen für Tests-Verzeichnis.

### Beispiel: Migration erstellen

```bash
cd backend
vendor/bin/phinx create CreateOffersTable
```

### Beispiel: db/migrations/20240101000001_create_offers_table.php

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
              ->addColumn('longitude', 'decimal', ['precision' => 10, 'scale' => 7])
              ->addColumn('latitude', 'decimal', ['precision' => 10, 'scale' => 7])
              ->addColumn('status', 'enum', ['values' => ['draft', 'published', 'archived']])
              ->addColumn('contact_name', 'string', ['limit' => 255])
              ->addColumn('contact_email', 'string', ['limit' => 255, 'null' => true])
              ->addColumn('contact_phone', 'string', ['limit' => 50, 'null' => true])
              ->addColumn('image_url', 'string', ['limit' => 500, 'null' => true])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              ->addIndex(['status'])
              ->addIndex(['category'])
              ->create();
    }
}
```

### Beispiel: tests/Unit/OfferTest.php

```php
<?php

declare(strict_types=1);

namespace App\Tests\Unit;

use PHPUnit\Framework\TestCase;

final class OfferTest extends TestCase
{
    public function testOfferCanBeCreated(): void
    {
        $offer = [
            'id' => '123e4567-e89b-12d3-a456-426614174000',
            'title' => 'Kostenlose Lebensmittel',
            'description' => 'Wir verteilen Lebensmittel an Bedürftige.',
            'category' => 'essen',
            'status' => 'published',
        ];

        $this->assertIsArray($offer);
        $this->assertEquals('Kostenlose Lebensmittel', $offer['title']);
        $this->assertEquals('essen', $offer['category']);
    }
}
```

---

## 5. NgRx Store vorbereiten

```bash
cd backend && composer install && cd ..
```

Im Frontend NgRx installieren:

```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
```

### frontend/src/app/app.config.ts

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideStore(),
    provideEffects(),
    provideStoreDevtools()
  ]
};
```

---

## 6. Docker starten

```bash
docker-compose up -d
```

**Services:**
- Backend: http://localhost:8080
- phpMyAdmin: http://localhost:8081

---

## 7. Dokumentation erstellen

### documents/project.md

```markdown
# Projektname

Kurze Beschreibung des Projekts.

## Features

- Feature 1
- Feature 2
```

### documents/architecture.md

```markdown
# Architecture

## Overview

- Frontend: Angular 18 + NgRx
- Backend: Slim 4 PHP 8
- Database: MariaDB
- Maps: MapLibre + OpenFreeMap

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
```

---

## 8. AGENTS.md erstellen

```markdown
# AGENTS.md

Project information for AI assistants.

## Project Overview

**Projektname** - Beschreibung

## Documentation Structure

```
projekt/
├── AGENTS.md
├── documents/
│   ├── project.md
│   ├── directory-structure.md
│   ├── architecture.md
│   ├── frontend-conventions.md
│   └── backend-conventions.md
└── openspec/
    └── specs/
```

## Quick Links

- documents/project.md
- documents/architecture.md
```

---

## Zusammenfassung

Nach Ausführung aller Schritte:

```
mein-projekt/
├── backend/           # Slim 4 PHP
│   ├── composer.json
│   ├── phinx.yml       # Phinx Konfiguration
│   ├── phpunit.xml     # PHPUnit Konfiguration
│   ├── public/
│   │   └── index.php
│   ├── src/
│   │   └── Routes/
│   ├── db/
│   │   ├── migrations/  # Phinx Migrationen
│   │   └── seeds/      # Phinx Seeds
│   └── tests/
│       └── Unit/       # PHPUnit Tests
├── docker/             # Docker-Konfiguration
│   ├── nginx.conf
│   ├── supervisord.conf
│   └── php.ini
├── db/                 # Gemountete DB-Dateien
├── documents/          # Dokumentation
├── openspec/           # OpenSpec
├── docker-compose.yml
├── Dockerfile
└── AGENTS.md
```

### Nächste Schritte

1. Migrationen mit `vendor/bin/phinx migrate` ausführen
2. API-Routen in `backend/src/Routes/` implementieren
3. Angular-Komponenten nach View/Container-Pattern erstellen
4. OpenSpec-Specs für Features anlegen
5. Tests mit `vendor/bin/phpunit` ausführen
