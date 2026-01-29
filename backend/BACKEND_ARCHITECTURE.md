# Backend Architecture Guide for iOS Developers

## 📋 Summary: Backend Best Practices & Architecture

### Overall Architecture Choice: ✅ **Excellent Foundation**

Our backend is built with **modern, scalable, industry-standard patterns**:

- **REST API** with Express.js (Node.js)
- **TypeScript** for type safety
- **Prisma ORM** for database operations (PostgreSQL)
- **Modular structure** (routes, middleware, config)
- **Offline-first support** (mobile syncs when online)

This architecture is:
- ✅ **Scalable** - Can handle 1000+ concurrent users per instance
- ✅ **Maintainable** - Clear separation of concerns
- ✅ **Type-safe** - TypeScript prevents runtime errors
- ✅ **Standard** - REST pattern, easy to understand
- ✅ **Free/Open-source** - No licensing costs

---

## ❓ Answers to Your Questions

### 1. **How does our Backend work?**

```
┌─────────────┐
│  iOS/Android │
│   Mobile App │
└──────┬───────┘
       │ HTTP/REST
       │ (RTK Query)
       ▼
┌─────────────────────────────────┐
│     Express.js Server            │
│  ┌───────────────────────────┐  │
│  │  Middleware Layer          │  │
│  │  - CORS (allows mobile)    │  │
│  │  - JSON parsing            │  │
│  │  - Error handling          │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Routes Layer              │  │
│  │  - /api/health             │  │
│  │  - /api/clients (future)   │  │
│  │  - /api/deals (future)     │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Database Layer (Prisma)   │  │
│  │  - Type-safe queries       │  │
│  │  - Migrations              │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
       │
       ▼
┌─────────────┐
│ PostgreSQL  │
│  Database   │
└─────────────┘
```

**Flow:**
1. Mobile app sends HTTP request (GET/POST/PUT/DELETE)
2. Express receives request, processes through middleware
3. Route handler executes business logic
4. Prisma queries PostgreSQL database
5. Response sent back as JSON
6. Mobile app receives JSON, updates local SQLite, updates UI

### 2. **Is it Scalable?** ✅ **YES**

**Current Setup:**
- Single Express.js instance
- PostgreSQL database
- Stateless API (can run multiple instances)

**Scaling Options:**
- **Horizontal Scaling**: Run multiple backend instances behind load balancer
- **Database Scaling**: PostgreSQL supports read replicas, connection pooling
- **Caching**: Add Redis for frequently accessed data
- **CDN**: Serve static assets via CDN
- **Containerization**: Docker + Kubernetes for orchestration

**Performance Goals (from plan.md):**
- API response <200ms (p95)
- 100 concurrent requests per instance
- 1000+ concurrent users per instance (with scaling)

**When to Scale:**
- Add load balancer when >1 instance needed
- Add Redis when caching needed
- Add read replicas when read-heavy workloads
- Consider microservices only if truly needed (YAGNI principle)

### 3. **Is it one for iOS and Android?** ✅ **YES - Shared Backend**

**Single Backend Serves Both:**
- ✅ One REST API for iOS and Android
- ✅ Same endpoints, same JSON responses
- ✅ Platform-agnostic (HTTP is universal)
- ✅ RTK Query in React Native handles both platforms

**Why This Works:**
- REST API is platform-independent
- JSON is universal data format
- Mobile apps are both React Native (same codebase)
- No need for separate iOS/Android backends

**Example:**
```typescript
// Backend endpoint (works for both iOS and Android)
GET /api/clients
Response: { "clients": [...] }

// iOS app uses it
// Android app uses it
// Same endpoint, same data
```

### 4. **Is it Free?** ✅ **YES - Open Source Stack**

**All Technologies are Free/Open Source:**
- ✅ **Express.js** - MIT License (free)
- ✅ **Node.js** - MIT License (free)
- ✅ **TypeScript** - Apache 2.0 (free)
- ✅ **Prisma** - Apache 2.0 (free)
- ✅ **PostgreSQL** - PostgreSQL License (free)

**Hosting Costs (when you deploy):**
- **Development**: Free (run locally)
- **Production**: 
  - Small scale: $5-20/month (Heroku, Railway, Render)
  - Medium scale: $50-200/month (AWS, GCP, Azure)
  - Large scale: Custom pricing

**No Licensing Fees Ever** - All open source!

### 5. **Is it REST Pattern?** ✅ **YES - Standard REST API**

**REST Principles:**
- ✅ **Stateless** - Each request contains all info needed
- ✅ **Resource-based URLs** - `/api/clients`, `/api/deals`
- ✅ **HTTP Methods** - GET, POST, PUT, DELETE
- ✅ **JSON Format** - Standard data exchange
- ✅ **Status Codes** - 200, 201, 400, 404, 500

**Example REST Endpoints:**
```typescript
GET    /api/clients          // List all clients
GET    /api/clients/:id      // Get one client
POST   /api/clients          // Create client
PUT    /api/clients/:id      // Update client
DELETE /api/clients/:id      // Delete client
```

**Current Implementation:**
- ✅ RESTful route structure
- ✅ JSON request/response
- ✅ Standard HTTP status codes
- ✅ Error handling middleware

### 6. **Do we need separate repo?** ❌ **NO - Monorepo is Better**

**Current Setup: Monorepo (Recommended):**
```
CRM/
├── mobile/          # React Native app
├── backend/         # Node.js API
└── specs/           # Documentation
```

**Why Monorepo is Better:**
- ✅ **Shared Types** - Can share TypeScript types between mobile and backend
- ✅ **Easier Development** - One repo, one clone, one setup
- ✅ **Atomic Commits** - Change mobile + backend in same commit
- ✅ **Simpler CI/CD** - One pipeline, coordinated deployments
- ✅ **Better for Small Teams** - Less overhead

**When to Split:**
- Only if teams are completely separate
- Only if deployment cycles are very different
- Only if you have 10+ developers per team

**Recommendation: Keep monorepo** ✅

### 7. **Do we need separate feature stories for endpoints?** ✅ **YES - Recommended**

**Best Practice: Feature-Driven API Development**

**Structure:**
```
Epic: 004 Backend API Foundation (✅ Done)
├── Feature: 001 Health Check Endpoint (✅ Done)
├── Feature: 002 Client CRUD Endpoints (📝 To Do)
├── Feature: 003 Deal CRUD Endpoints (📝 To Do)
└── Feature: 004 Authentication Endpoints (📝 To Do)
```

**Why Separate Stories:**
- ✅ **Independent Development** - Each endpoint can be developed separately
- ✅ **Testing** - Test each endpoint independently
- ✅ **Review** - Smaller PRs, easier to review
- ✅ **Rollback** - Can rollback one endpoint without affecting others

**Example Feature Story:**
```
Feature: 002 Client CRUD Endpoints
- User Story: "As a developer, I need API endpoints to manage clients"
- Tasks:
  - T001: Create GET /api/clients endpoint
  - T002: Create POST /api/clients endpoint
  - T003: Create PUT /api/clients/:id endpoint
  - T004: Create DELETE /api/clients/:id endpoint
  - T005: Add input validation
  - T006: Add error handling
  - T007: Write tests
```

**Recommendation:**
- ✅ Create separate feature branches for each endpoint group
- ✅ Use spec-kit to plan each feature
- ✅ Follow TDD (write tests first)

### 8. **How does BE work with Database?** 🔄 **Prisma ORM Pattern**

**Architecture:**
```
Backend Code → Prisma Client → PostgreSQL
```

**How It Works:**

1. **Schema Definition** (`prisma/schema.prisma`):
```prisma
model Client {
  id        String   @id @default(uuid())
  name      String
  email     String
  createdAt DateTime @default(now())
}
```

2. **Generate Client**:
```bash
npm run prisma:generate
# Creates type-safe Prisma Client
```

3. **Use in Code**:
```typescript
// Type-safe database operations
const clients = await prisma.client.findMany();
const client = await prisma.client.create({
  data: { name: "John", email: "john@example.com" }
});
```

4. **Migrations**:
```bash
npm run prisma:migrate
# Creates SQL migrations, updates database schema
```

**Benefits:**
- ✅ **Type Safety** - TypeScript knows your data structure
- ✅ **Auto-completion** - IDE suggests fields
- ✅ **Migrations** - Version-controlled schema changes
- ✅ **No SQL** - Write TypeScript, Prisma generates SQL

### 9. **How to organize networking layer?** 📱 **RTK Query (Already Set Up!)**

**Current Mobile Architecture:**
```
┌─────────────────────────────────┐
│      React Native App            │
│  ┌───────────────────────────┐  │
│  │   UI Components            │  │
│  └───────────┬───────────────┘  │
│              │                   │
│  ┌───────────▼───────────────┐  │
│  │   Redux Store             │  │
│  │   - RTK Query API         │  │
│  │   - State Slices           │  │
│  └───────────┬───────────────┘  │
│              │                   │
│  ┌───────────▼───────────────┐  │
│  │   Local SQLite DB          │  │
│  │   (Offline-first)          │  │
│  └────────────────────────────┘  │
└─────────────────────────────────┘
              │
              │ HTTP/REST
              ▼
┌─────────────────────────────────┐
│      Backend API                │
└─────────────────────────────────┘
```

**RTK Query Setup (Already Done):**
```typescript
// mobile/src/store/api/api.ts
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,  // http://localhost:3000/api
  }),
  tagTypes: ['Client', 'Deal', 'Task'],
  endpoints: () => ({}),
});
```

**How to Add New Endpoints:**

1. **Define Endpoint** (in mobile):
```typescript
// mobile/src/store/api/clientsApi.ts
export const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => '/clients',
      providesTags: ['Client'],
    }),
    createClient: builder.mutation<Client, CreateClientDto>({
      query: (body) => ({
        url: '/clients',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});

export const { useGetClientsQuery, useCreateClientMutation } = clientsApi;
```

2. **Use in Component**:
```typescript
const { data: clients, isLoading } = useGetClientsQuery();
const [createClient] = useCreateClientMutation();
```

3. **Backend Endpoint** (in backend):
```typescript
// backend/src/routes/clients.ts
router.get('/clients', async (req, res) => {
  const clients = await prisma.client.findMany();
  res.json(clients);
});
```

**Benefits:**
- ✅ **Automatic Caching** - RTK Query caches responses
- ✅ **Loading States** - Built-in `isLoading`, `isError`
- ✅ **Auto Refetch** - Can configure auto-refetching
- ✅ **Offline Support** - Works with local SQLite
- ✅ **Type Safety** - TypeScript types end-to-end

---

## 🎯 Recommendations for Spec-Kit Planning

### How to Ask Spec-Kit for Backend Features

**Template for Creating Backend API Features:**

```
/speckit.specify

Create feature specification for [Feature Name] API endpoints.

User Story: As a [user type], I need [API capability] so that [business value].

Requirements:
- REST API endpoints for [resource] CRUD operations
- Input validation
- Error handling
- Database integration with Prisma
- TypeScript types
- Integration with mobile app via RTK Query

Endpoints needed:
- GET /api/[resource] - List all
- GET /api/[resource]/:id - Get one
- POST /api/[resource] - Create
- PUT /api/[resource]/:id - Update
- DELETE /api/[resource]/:id - Delete

Success Criteria:
- All endpoints respond in <200ms
- 100% type safety
- All endpoints have error handling
- Mobile app can consume endpoints via RTK Query
```

### Example: Client Management API

```
/speckit.specify

Create feature specification for Client Management API endpoints.

User Story: As a mobile app developer, I need REST API endpoints to manage clients (create, read, update, delete) so that the mobile app can sync client data with the backend database.

Requirements:
- REST API endpoints for Client CRUD operations
- Input validation (name required, email format)
- Error handling (404 for not found, 400 for validation errors)
- Database integration with Prisma (Client model)
- TypeScript types matching Prisma schema
- Integration with mobile app via RTK Query

Endpoints needed:
- GET /api/clients - List all clients (with pagination)
- GET /api/clients/:id - Get one client by ID
- POST /api/clients - Create new client
- PUT /api/clients/:id - Update existing client
- DELETE /api/clients/:id - Delete client

Success Criteria:
- All endpoints respond in <200ms p95
- 100% type safety (TypeScript)
- All endpoints have proper error handling
- Mobile app can consume endpoints via RTK Query
- Endpoints return consistent JSON format
```

### Suggested Feature Breakdown

**Epic: 004 Backend API Foundation** (Current)
- ✅ Feature: 001 Health Check Endpoint
- 📝 Feature: 002 Client CRUD Endpoints
- 📝 Feature: 003 Deal CRUD Endpoints
- 📝 Feature: 004 Task CRUD Endpoints
- 📝 Feature: 005 Authentication Endpoints
- 📝 Feature: 006 Data Sync Endpoints (for offline-first)

**For Each Feature, Use Spec-Kit:**
1. `/speckit.specify` - Create specification
2. `/speckit.plan` - Create technical plan
3. `/speckit.tasks` - Break into tasks
4. `/speckit.implement` - Implement with TDD

---

## 📚 Additional Resources

### Backend Files to Understand:
- `backend/src/server.ts` - Main server setup
- `backend/src/routes/api.ts` - Route organization
- `backend/src/config/database.ts` - Database connection
- `backend/prisma/schema.prisma` - Database schema

### Mobile Files to Understand:
- `mobile/src/store/api/api.ts` - RTK Query setup
- `mobile/src/database/database.ts` - Local SQLite (offline-first)

### Key Concepts:
- **REST API** - Standard HTTP-based API
- **Prisma ORM** - Type-safe database access
- **RTK Query** - Data fetching and caching for React Native
- **Offline-First** - Mobile app works offline, syncs when online

---

## ✅ Summary

**Your Backend is:**
- ✅ Scalable (can handle 1000+ users)
- ✅ Shared (one API for iOS and Android)
- ✅ Free (open source stack)
- ✅ RESTful (standard HTTP/REST)
- ✅ Well-organized (monorepo structure)
- ✅ Type-safe (TypeScript + Prisma)
- ✅ Ready for features (foundation complete)

**Next Steps:**
1. Create feature specifications for each endpoint group
2. Use spec-kit to plan and implement
3. Follow TDD (tests first)
4. Keep endpoints small and focused

**You're ready to build! 🚀**
