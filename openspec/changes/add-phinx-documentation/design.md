        ## Context

The project currently uses JSON files for data storage. Moving to MariaDB requires proper schema management. Phinx is
chosen because:

- Standard PHP migration tool
- Works well with Slim 4
- Supports rollback
- No ORM coupling

## Goals / Non-Goals

**Goals:**

- Document Phinx setup and conventions
- Define database migration patterns
- Add database capability to OpenSpec

**Non-Goals:**

- Not actually setting up MariaDB or Phinx (just documentation)
- Not changing any code

## Decisions

### Decision: Use Phinx for migrations

**Choice:** Phinx (robmorgan/phinx) for database migrations.

**Rationale:**

- Industry-standard PHP migration tool
- Works without ORM
- Built-in rollback support
- YAML or PHP configuration

### Decision: PHP-based configuration

**Choice:** Use PHP-based Phinx configuration (phinx.php).

**Rationale:**

- Environment variables work naturally in PHP
- Easier to debug
- More flexible than YAML

## Open Questions

None - this is documentation-only change.