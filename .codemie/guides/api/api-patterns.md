---
# API Patterns Guide

**Project**: CRM Application
**Stack**: Node.js + TypeScript + Express 5 (backend) | RTK Query (mobile client)
**Base URL**: `http://localhost:3000/api` (dev) | `https://api.crm.example.com` (prod)

---

## File Structure

| Purpose | Path |
|---------|------|
| Routes registry | `backend/src/routes/api.ts` |
| Route handlers | `backend/src/routes/*.ts` |
| Error middleware | `backend/src/middleware/errorHandler.ts` |
| Mobile API client | `mobile/src/store/api/api.ts` |
| Mobile tag types | `mobile/src/store/api/api.ts:33` |

---

## Backend Endpoint Pattern

```ts
// Source: backend/src/routes/health.ts
import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';

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

**To add a new endpoint:**
1. Create `backend/src/routes/[resource].ts` with `const router = Router()`
2. Mount in `backend/src/routes/api.ts`: `router.use('/[resource]', resourceRouter)`
3. Import `prisma` from `'../config/database'` for DB access

---

## Mobile RTK Query Pattern

```ts
// Source: mobile/src/store/api/api.ts
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Client', 'Deal', 'Task'],
  endpoints: () => ({}),
});
```

**Extend with endpoints** (inject into separate files):
```ts
// Example: mobile/src/store/api/clientsApi.ts
const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({ query: () => '/clients', providesTags: ['Client'] }),
    createClient: builder.mutation<Client, Partial<Client>>({ query: (body) => ({ url: '/clients', method: 'POST', body }), invalidatesTags: ['Client'] }),
  }),
});
```

---

## Response Patterns

**Success format:**
```json
{ "status": "ok", "timestamp": "...", "database": "connected" }
```

**Error format (from errorHandler):**
```json
{ "status": "error", "message": "Not Found - /api/unknown" }
```

**Echo pattern (mirrors received data):**
```json
{ "received": { ... }, "serverTime": "...", "message": "Backend got your data!" }
```

---

## Error Handling

```ts
// Source: backend/src/middleware/errorHandler.ts
export interface AppError extends Error {
  statusCode?: number;
  status?: string;
}

export function errorHandler(err: AppError, req, res, next): void {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ status: err.status || 'error', message: err.message });
}
```

**Throw errors using:**
```ts
const error: AppError = new Error('Resource not found');
error.statusCode = 404;
error.status = 'not_found';
next(error);
```

---

## Status Codes

| Operation | Success | Notes |
|-----------|---------|-------|
| GET (health/read) | 200 | Include data in body |
| POST (create/echo) | 200/201 | 200 for actions, 201 for resource creation |
| Not found | 404 | Via `notFoundHandler` middleware |
| DB unavailable | 503 | Timeout or disconnection |
| Server error | 500 | Default from `errorHandler` |

---

## Platform-Aware Base URL (Mobile)

```ts
// Source: mobile/src/store/api/api.ts:11-18
const getBackendHost = () =>
  __DEV__
    ? Platform.OS === 'android'
      ? 'http://10.0.2.2:3000'   // Android emulator → host localhost
      : 'http://localhost:3000'    // iOS Simulator
    : 'https://api.crm.example.com';

export const BASE_URL = getBackendHost() + '/api';
```

---

## Conventions

| Aspect | Convention |
|--------|------------|
| Route naming | kebab-case (`/api/health`, `/api/echo`) |
| Handler style | `async (req, res) => {}` with try/catch |
| Error propagation | `next(error)` — never `res.json` in catch |
| Router export | `export default router` from each file |
| Middleware order | cors → json → routes → notFound → errorHandler |

---

## Anti-Patterns

| ❌ Avoid | ✅ Use Instead | Reason |
|----------|----------------|--------|
| `res.json({error: ...})` in catch | `next(error)` | Skip centralized error handler |
| Hardcode `'http://localhost:3000'` in mobile | `BASE_URL` from `api.ts` | Breaks Android/prod |
| Import `prisma` directly in server.ts | Import from `config/database` | Coupling concerns |

---

## Quick Reference

| Task | Location |
|------|----------|
| Add backend route | `backend/src/routes/[name].ts` → mount in `api.ts` |
| Add RTK endpoint | `mobile/src/store/api/api.ts` (inject endpoints) |
| Handle errors | `next(AppError)` → `backend/src/middleware/errorHandler.ts` |
| Add cache tag type | `tagTypes` array in `mobile/src/store/api/api.ts:33` |
| Auth headers (prep) | `prepareHeaders` in `mobile/src/store/api/api.ts:24-29` |

---
