# Database Service

SQLite database service for offline-first architecture.

## Usage

### Initialize Database

```typescript
import {databaseService} from './src/database/database';

// Initialize on app startup
await databaseService.initialize();
```

### Insert Data

```typescript
const id = await databaseService.insert('test_table', {
  name: 'Test Record',
  value: 'Some value',
});
```

### Query Data

```typescript
// Get all records
const records = await databaseService.select('test_table');

// Get with conditions
const filtered = await databaseService.select(
  'test_table',
  'name = ?',
  ['Test Record']
);

// With ordering and limit
const recent = await databaseService.select(
  'test_table',
  undefined,
  undefined,
  'created_at DESC',
  10
);
```

### Update Data

```typescript
const rowsAffected = await databaseService.update(
  'test_table',
  {value: 'Updated value'},
  'id = ?',
  [1]
);
```

### Delete Data

```typescript
const rowsAffected = await databaseService.delete(
  'test_table',
  'id = ?',
  [1]
);
```

### Custom Queries

```typescript
const result = await databaseService.query(
  'SELECT COUNT(*) as count FROM test_table',
  {}
);
```

## Architecture

- **database.ts**: Main database service with connection management and CRUD operations
- **models/**: TypeScript interfaces for database entities
- **migrations/**: Database migration scripts

## Best Practices

1. Always initialize database before use
2. Use transactions for multiple related operations
3. Handle errors appropriately
4. Use prepared statements (automatic with query method)
5. Close database connection when app closes (optional, handled automatically)
