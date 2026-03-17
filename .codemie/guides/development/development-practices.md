---
# Development Practices

**Project**: CRM Application
**Language**: TypeScript 5.x (both backend + mobile)
**Backend Linter**: none configured | **Formatter**: none configured
**Mobile Linter**: ESLint (`@react-native/eslint-config`) | **Formatter**: Prettier

---

## Code Style

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files (backend) | `camelCase.ts` | `errorHandler.ts`, `database.ts` |
| Files (mobile) | `PascalCase.tsx` (components), `camelCase.ts` (utils) | `HomeScreen.tsx`, `appSlice.ts` |
| Classes | `PascalCase` | `DatabaseService` |
| Functions/methods | `camelCase` | `connectDatabase`, `runMigrations` |
| React components | `PascalCase` arrow function | `export const HomeScreen: React.FC` |
| Redux slices | `camelCase` + `Slice` suffix | `appSlice` |
| Constants | `UPPER_SNAKE_CASE` | `DB_CHECK_TIMEOUT_MS` |
| Private class fields | `private` keyword | `private db`, `private isInitialized` |

### File Organization (Backend)

```ts
// Standard backend route file structure
import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';   // external, then internal

const router = Router();
const CONSTANT = value;

router.get('/', async (req: Request, res: Response) => { ... });

export default router;
```

### File Organization (Mobile Screen)

```ts
// Standard screen structure
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';          // RN core
import { Text, Button } from 'react-native-paper';        // third-party UI
import { useSelector, useDispatch } from 'react-redux';   // state
import { databaseService } from '../database/database';   // local services
import type { RootState } from '../store/store';          // types last

export const ScreenName: React.FC = () => { ... };

const styles = StyleSheet.create({ ... });
```

---

## Code Quality Commands

| Action | Command |
|--------|---------|
| Lint (mobile) | `cd mobile && npm run lint` |
| Lint fix (mobile) | `cd mobile && npx eslint . --fix` |
| Type check (backend) | `cd backend && npx tsc --noEmit` |
| Type check (mobile) | `cd mobile && npx tsc --noEmit` |
| Format (mobile) | `cd mobile && npx prettier --write .` |

### Configuration Files

| Tool | Config File |
|------|-------------|
| ESLint (mobile) | `mobile/.eslintrc.js` |
| Prettier (mobile) | `mobile/.prettierrc.js` |
| TypeScript (backend) | `backend/tsconfig.json` |
| TypeScript (mobile) | `mobile/tsconfig.json` |

---

## Error Handling

### AppError Pattern (Backend)

```ts
// Source: backend/src/middleware/errorHandler.ts:3-6
export interface AppError extends Error {
  statusCode?: number;
  status?: string;
}
```

**Throw from route handlers:**
```ts
const error: AppError = new Error(`Not Found - ${req.originalUrl}`);
error.statusCode = 404;
error.status = 'not_found';
next(error);   // Always use next(), never res.json() in error cases
```

**Error middleware catches all:**
- Defaults: `statusCode = 500`, `status = 'error'`
- Stack trace shown only in `NODE_ENV === 'development'`

### Mobile Error Handling

```ts
// Source: mobile/src/screens/HomeScreen.tsx:84-88
} catch (error) {
  console.error('Context: operation failed:', error);
  setLocalState('❌ Error: ' + (error instanceof Error ? error.message : String(error)));
  Alert.alert('Operation Failed', String(error), [{ text: 'OK' }]);
}
```

**Rules:**
- ❌ Never catch-and-ignore silently
- ✅ Always `console.error('Context:', error)` with meaningful context prefix
- ✅ Show user-facing `Alert.alert` for recoverable errors in screens

---

## Logging

### Backend

```ts
// Development request logging — backend/src/server.ts:19-23
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}
```

**Database logging**: Prisma logs `['query', 'error', 'warn']` in dev, `['error']` in prod.

### Mobile

All logging uses `console.log`/`console.error` with a screen/component prefix:
```ts
console.log('HomeScreen: Database status checked -', isReady);
console.error('HomeScreen: Database check failed:', error);
```

**Convention**: `'[Component]: [action] -'` prefix for traceability in Metro bundler.

---

## Async Patterns

**Style**: async/await + try/catch throughout both apps.

```ts
// Source: backend/src/config/database.ts:19-27
export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;  // Re-throw to caller
  }
}
```

- Backend: async route handlers, no async middleware wrapper needed (Express 5 supports async)
- Mobile: async component effects and event handlers wrapped in try/catch

---

## Environment Configuration

### Backend `.env`

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@host:5432/crm?schema=public"
```

Access: `process.env.PORT`, `process.env.DATABASE_URL`

### Mobile (Build-time)

Platform-specific URL handled in `mobile/src/store/api/api.ts` via `Platform.OS` + `__DEV__`.

---

## Dependencies

```bash
# Backend production
cd backend && npm install [package]

# Backend dev
cd backend && npm install -D [package]

# Mobile
cd mobile && npm install [package]
# iOS: cd mobile/ios && pod install
```

**Lock files**: `package-lock.json` — always commit both root package-lock files.

---

## Common Patterns

| Pattern | When to Use | Location |
|---------|-------------|----------|
| `databaseService.isReady()` | Guard before DB operations | `mobile/src/database/database.ts:232` |
| `process.env.NODE_ENV === 'development'` | Dev-only logging/debug | `backend/src/server.ts:19` |
| `error instanceof Error ? error.message : String(error)` | Safe error message extraction | `mobile/src/screens/HomeScreen.tsx:87` |
| `Promise.race([query, timeout])` | DB operation timeout guard | `backend/src/routes/health.ts:17-19` |

---

## Don't Do

| ❌ Avoid | ✅ Instead | Why |
|----------|-----------|-----|
| `console.log` without prefix in mobile | `'[Component]: action -'` prefix | Can't trace in Metro logs |
| `catch (e) {}` silent catch | `console.error` + rethrow or Alert | Hidden failures |
| `req.body` without validation | Validate shape before use | Runtime type errors |
| `any` in TypeScript | Proper types or `unknown` | Defeats type safety |

---

## Quick Reference

| Need | Location |
|------|----------|
| ESLint config | `mobile/.eslintrc.js` |
| Prettier config | `mobile/.prettierrc.js` |
| TypeScript (backend) | `backend/tsconfig.json` |
| AppError interface | `backend/src/middleware/errorHandler.ts:3` |
| Backend env template | `backend/.env` (gitignored) |

---
