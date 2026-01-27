# Database Migrations

This directory contains database migration scripts for the SQLite database.

## Migration System

Migrations are automatically applied when the database is initialized. The `migrations` table tracks which migrations have been applied.

## Creating a Migration

1. Create a new migration file following the naming pattern: `XXX_description.sql`
2. Add the migration logic in `database.ts` `runMigrations()` method
3. Migration will be automatically applied on next app launch

## Migration Format

```typescript
// In database.ts runMigrations()
if (!appliedMigrations.includes('002_create_clients_table')) {
  await this.db.executeSql(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    )
  `);

  await this.db.executeSql(
    'INSERT INTO migrations (name, applied_at) VALUES (?, ?)',
    ['002_create_clients_table', Date.now()]
  );
}
```

## Best Practices

- Always use `IF NOT EXISTS` for table creation
- Include `created_at` and `updated_at` timestamps
- Use INTEGER for timestamps (Unix epoch)
- Test migrations on a fresh database
- Never modify applied migrations - create new ones instead
