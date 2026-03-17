---
# Architecture Guide

**Project**: CRM Application
**Style**: Monorepo (2 independent apps)
**Language**: TypeScript | **Framework**: Express 5 (backend) + React Native 0.82 (mobile)

---

## Architecture Overview

```
CRM Monorepo
├── backend/          Node.js/Express REST API
│   └── src/
│       ├── config/   DB connection (Prisma + pg pool)
│       ├── routes/   Express Router handlers
│       ├── middleware/ Error handling
│       └── server.ts Entry point
│
└── mobile/           React Native iOS-first app
    └── src/
        ├── navigation/ React Navigation (Stack)
        ├── screens/    Screen components (UI + logic)
        ├── store/      Redux Toolkit + RTK Query
        │   ├── api/    RTK Query base API
        │   └── slices/ Redux state slices
        ├── database/   SQLite offline service (singleton)
        └── theme/      React Native Paper theme
```

**Key Decision**: Offline-first mobile app with separate backend API. Mobile uses SQLite for local storage and RTK Query to sync with the Express backend. Apps are independent — no shared source code yet.

---

## Design Patterns Detected

| Pattern | Usage | Location |
|---------|-------|----------|
| Singleton | `DatabaseService` — single SQLite instance | `mobile/src/database/database.ts:238` |
| Router/Handler | Express Router per resource | `backend/src/routes/api.ts` |
| Middleware Chain | Error handling at end of middleware stack | `backend/src/server.ts:41-42` |
| Slice (Redux) | State isolated per feature domain | `mobile/src/store/slices/appSlice.ts` |
| Base API (RTK) | Central API config, extended per feature | `mobile/src/store/api/api.ts` |

### Primary Pattern: Express Router + Middleware

```ts
// Source: backend/src/routes/health.ts
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

export default router;
```

**When to use**: Every new resource gets its own Router file in `backend/src/routes/`, mounted in `api.ts`.

---

## Layer Responsibilities

### Backend

| Layer | Responsibility | Depends On | Depended By |
|-------|----------------|------------|-------------|
| `server.ts` | App bootstrap, middleware registration | config/, routes/, middleware/ | — |
| `routes/` | Request handling, response shaping | config/database | server.ts |
| `config/database.ts` | Prisma + pg pool, connect/disconnect | .env | routes/ |
| `middleware/errorHandler.ts` | Centralized error → HTTP response | — | server.ts |

### Mobile

| Layer | Responsibility | Depends On | Depended By |
|-------|----------------|------------|-------------|
| `screens/` | UI rendering + local interactions | store/, database/ | navigation/ |
| `store/api/` | Remote API calls (RTK Query) | React Native fetch | screens/ |
| `store/slices/` | Local UI state | — | screens/ |
| `database/` | SQLite CRUD, migrations | react-native-sqlite-storage | screens/ |
| `navigation/` | Screen routing | screens/ | App.tsx |

---

## Dependency Rules

```
Backend:
server.ts → routes/ → config/database (prisma)
server.ts → middleware/errorHandler

Mobile:
App.tsx → navigation/ → screens/
screens/ → store/ (Redux dispatch/select)
screens/ → database/ (SQLite CRUD)
store/api/ → backend REST API (network)
```

**Violations to avoid:**
- ❌ Importing `prisma` directly in route files — always use `config/database.ts` export
- ❌ Calling SQLite from navigation or theme files — database access is screens/ only
- ❌ Hardcoding backend URL — use `BASE_URL` from `mobile/src/store/api/api.ts`

---

## Data Flow

```
Mobile Request:
Screen → dispatch(RTKQuery) → fetch BASE_URL/api/[route]
  │                                       │
  │            Backend                    │
  │         Route Handler → prisma → PostgreSQL
  │                ↓
  └── RTKQuery cache update → re-render

Offline Write:
Screen → databaseService.insert() → SQLite → local state
```

---

## Configuration & Environment

| Config Type | Location | Accessed Via |
|-------------|----------|--------------|
| Backend env | `backend/.env` | `process.env.DATABASE_URL` etc. |
| Prisma schema | `backend/prisma/schema.prisma` | `prisma generate` + `@prisma/client` |
| Mobile API URL | `mobile/src/store/api/api.ts:12-17` | `BASE_URL` const (platform-aware) |
| Mobile theme | `mobile/src/theme/theme.ts` | import `theme` → `PaperProvider` |

---

## Adding New Features

### To add a new backend resource (e.g., `/api/clients`):

1. **Route file**: Create `backend/src/routes/clients.ts` with `Router()`
2. **Mount**: Add `router.use('/clients', clientsRouter)` in `backend/src/routes/api.ts`
3. **Schema**: Add Prisma model in `backend/prisma/schema.prisma` + run `prisma migrate dev`
4. **Error handling**: Throw `AppError` (from `middleware/errorHandler.ts`) for expected errors

### To add a new mobile screen:

1. **Screen**: Create `mobile/src/screens/[Name]Screen.tsx`
2. **Navigate**: Add to `RootStackParamList` + `Stack.Screen` in `mobile/src/navigation/AppNavigator.tsx`
3. **State**: Add slice in `mobile/src/store/slices/` or extend RTK Query API
4. **Offline**: Use `databaseService` for local persistence

---

## Quick Reference

| Need | Location |
|------|----------|
| Backend entry point | `backend/src/server.ts` |
| Backend routes registry | `backend/src/routes/api.ts` |
| Database connection | `backend/src/config/database.ts` |
| Error handling | `backend/src/middleware/errorHandler.ts` |
| Mobile store | `mobile/src/store/store.ts` |
| Mobile API config | `mobile/src/store/api/api.ts` |
| Mobile SQLite service | `mobile/src/database/database.ts` |
| Mobile navigation | `mobile/src/navigation/AppNavigator.tsx` |

---
