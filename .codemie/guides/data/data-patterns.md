---
# Data Patterns Guide

**Project**: CRM Application
**Databases**: PostgreSQL (backend/cloud) + SQLite (mobile/offline)
**Backend ORM**: Prisma 7 via `@prisma/adapter-pg` (driver-adapter pattern)
**Mobile**: `react-native-sqlite-storage` — singleton `DatabaseService` class
**Models**: `backend/prisma/schema.prisma` | `mobile/src/database/database.ts`

---

## Backend: Prisma + PostgreSQL

### Connection Setup

```ts
// Source: backend/src/config/database.ts
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: false });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export { prisma };
```

**Environment Variables:**
| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Full PostgreSQL connection string |

### Schema Definition

```prisma
// Source: backend/prisma/schema.prisma
model Example {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String
}
```

**Conventions:**
| Aspect | Convention |
|--------|------------|
| Primary key | `String @id @default(uuid())` |
| Timestamps | `createdAt DateTime @default(now())`, `updatedAt DateTime @updatedAt` |
| Generator | `prisma-client-js` |
| Provider | `postgresql` |

### Prisma Query Patterns

| Operation | Pattern |
|-----------|---------|
| Find by ID | `prisma.model.findUnique({ where: { id } })` |
| Find many | `prisma.model.findMany({ where: {...} })` |
| Create | `prisma.model.create({ data: {...} })` |
| Update | `prisma.model.update({ where: { id }, data: {...} })` |
| Delete | `prisma.model.delete({ where: { id } })` |
| Raw query | `prisma.$queryRaw\`SELECT 1\`` |

### Migrations

| Action | Command |
|--------|---------|
| Generate client | `cd backend && npm run prisma:generate` |
| Create + run migration | `cd backend && npm run prisma:migrate` |
| Open Prisma Studio | `cd backend && npm run prisma:studio` |

**Migrations location**: `backend/prisma/migrations/`

---

## Mobile: SQLite (Offline-First)

### DatabaseService Singleton

```ts
// Source: mobile/src/database/database.ts:24-238
class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;
  private isInitialized = false;

  async initialize(): Promise<void>   // Opens DB + runs migrations
  async query(sql, options): Promise<DatabaseResult>
  async insert(table, data): Promise<number>   // Returns insertId
  async select(table, where?, params?, orderBy?, limit?): Promise<any[]>
  async update(table, data, where, whereParams?): Promise<number>
  async delete(table, where, params?): Promise<number>
}

export const databaseService = new DatabaseService();
```

### Usage Pattern

```ts
// Source: mobile/src/screens/HomeScreen.tsx:55-76
// Insert
const id = await databaseService.insert('clients', { name: 'Acme', phone: '555-0100' });

// Select with condition
const clients = await databaseService.select('clients', 'id = ?', [id]);

// Update
await databaseService.update('clients', { name: 'Updated' }, 'id = ?', [id]);

// Delete
await databaseService.delete('clients', 'id = ?', [id]);
```

### Migration Pattern

```ts
// Source: mobile/src/database/database.ts:58-100
// 1. Create migrations table (auto on initialize)
// 2. Check applied migrations by name
// 3. Run SQL if not applied, record in migrations table
if (!appliedMigrations.includes('001_create_clients')) {
  await this.db.executeSql(`CREATE TABLE IF NOT EXISTS clients (...)`);
  await this.db.executeSql(
    'INSERT INTO migrations (name, applied_at) VALUES (?, ?)',
    ['001_create_clients', Date.now()]
  );
}
```

**Migration naming**: `NNN_description` (e.g., `001_create_test_table`, `002_create_clients`)

### SQLite Schema Conventions

| Aspect | Convention |
|--------|------------|
| Primary key | `INTEGER PRIMARY KEY AUTOINCREMENT` |
| Timestamps | `INTEGER` (Unix ms via `Date.now()`) |
| Default timestamp | `strftime('%s', 'now')` |
| DB file name | `CRM.db` (location: 'default') |

---

## Initialization Lifecycle

```
Backend: server startup → connectDatabase() → prisma.$connect()
Mobile:  App mount → databaseService.initialize() → openDatabase() → runMigrations()
```

**Mobile init location**: Must be called before any screen uses `databaseService`. Initialize in `App.tsx` or root navigator effect.

---

## Error Handling

| Error Type | Backend | Mobile |
|------------|---------|--------|
| Connection failure | `throw error` → `process.exit(1)` | `throw error` from `initialize()` |
| Query failure | Thrown by Prisma, caught by `errorHandler` | `console.error` + rethrow in `query()` |
| DB not initialized | N/A | `throw new Error('Database not initialized')` |

---

## Conventions Summary

| ✅ DO | ❌ DON'T |
|-------|----------|
| Use `prisma` from `config/database.ts` | Import `PrismaClient` directly in routes |
| Parameterized queries (`?` placeholders) | String interpolation in SQL |
| Check `databaseService.isReady()` before use | Call DB methods before `initialize()` |
| Name migrations `NNN_description` | Skip migration tracking |
| Run `prisma:generate` after schema changes | Use stale Prisma client |

---

## Quick Reference

| Need | Location |
|------|----------|
| Prisma schema | `backend/prisma/schema.prisma` |
| Backend DB config | `backend/src/config/database.ts` |
| Mobile SQLite service | `mobile/src/database/database.ts` |
| Mobile models index | `mobile/src/database/models/index.ts` |
| Migration commands | `backend/package.json` scripts |

---
