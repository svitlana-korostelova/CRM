# Spec-Kit Guide for Backend API Features

## Quick Reference: How to Create Backend Features with Spec-Kit

### Step-by-Step Workflow

#### 1. **Create Feature Specification**

```
/speckit.specify

Create feature specification for [Resource Name] API endpoints.

User Story: As a mobile app developer, I need REST API endpoints to manage [resource] (create, read, update, delete) so that the mobile app can sync [resource] data with the backend database.

Requirements:
- REST API endpoints for [Resource] CRUD operations
- Input validation ([list validation rules])
- Error handling (404 for not found, 400 for validation errors, 500 for server errors)
- Database integration with Prisma ([Resource] model)
- TypeScript types matching Prisma schema
- Integration with mobile app via RTK Query

Endpoints needed:
- GET /api/[resources] - List all [resources] (with pagination, filtering, sorting)
- GET /api/[resources]/:id - Get one [resource] by ID
- POST /api/[resources] - Create new [resource]
- PUT /api/[resources]/:id - Update existing [resource]
- DELETE /api/[resources]/:id - Delete [resource]

Success Criteria:
- All endpoints respond in <200ms p95
- 100% type safety (TypeScript)
- All endpoints have proper error handling
- Mobile app can consume endpoints via RTK Query
- Endpoints return consistent JSON format
- Input validation prevents invalid data
```

#### 2. **Generate Technical Plan**

```
/speckit.plan
```

This will:
- Analyze the specification
- Create technical implementation plan
- Define project structure
- Identify dependencies
- Set performance goals

#### 3. **Generate Tasks**

```
/speckit.tasks
```

This will:
- Break down implementation into actionable tasks
- Organize by user story
- Identify dependencies
- Create task checklist

#### 4. **Implement**

```
/speckit.implement
```

This will:
- Execute tasks in order
- Follow TDD approach
- Create files and code
- Mark tasks as complete

---

## Example: Client Management API

### Step 1: Specification

```
/speckit.specify

Create feature specification for Client Management API endpoints.

User Story: As a mobile app developer, I need REST API endpoints to manage clients (create, read, update, delete) so that the mobile app can sync client data with the backend database.

Requirements:
- REST API endpoints for Client CRUD operations
- Input validation (name required, email must be valid format, phone optional)
- Error handling (404 for not found, 400 for validation errors, 500 for server errors)
- Database integration with Prisma (Client model)
- TypeScript types matching Prisma schema
- Integration with mobile app via RTK Query

Endpoints needed:
- GET /api/clients - List all clients (with pagination, filtering by name/email, sorting)
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
- Input validation prevents invalid data
```

### Step 2-4: Plan, Tasks, Implement

Just run the commands in sequence - spec-kit will guide you through.

---

## Template Variations

### For Authentication Endpoints

```
/speckit.specify

Create feature specification for Authentication API endpoints.

User Story: As a mobile app user, I need to authenticate (login, logout, refresh token) so that I can securely access my CRM data.

Requirements:
- POST /api/auth/login - User login (email + password)
- POST /api/auth/logout - User logout (invalidate token)
- POST /api/auth/refresh - Refresh access token
- JWT token generation and validation
- Password hashing (bcrypt)
- Token refresh mechanism
- Error handling for invalid credentials

Success Criteria:
- Login responds in <200ms
- Tokens are securely generated
- Refresh tokens work correctly
- Mobile app can store and use tokens
```

### For Data Sync Endpoints (Offline-First)

```
/speckit.specify

Create feature specification for Data Sync API endpoints.

User Story: As a mobile app, I need to sync local SQLite data with backend PostgreSQL so that data is consistent across devices and works offline.

Requirements:
- POST /api/sync/push - Push local changes to backend
- GET /api/sync/pull - Pull latest changes from backend
- Conflict resolution strategy
- Timestamp-based sync
- Batch operations support
- Error handling for conflicts

Success Criteria:
- Sync completes in <2s for typical data volumes
- Conflicts are resolved correctly
- Mobile app can sync when coming online
- Data integrity maintained
```

---

## Tips for Backend Features

### 1. **Keep Features Small**
- One resource (Client, Deal, Task) per feature
- Easier to review and test
- Faster to implement

### 2. **Follow REST Conventions**
- Use standard HTTP methods (GET, POST, PUT, DELETE)
- Use standard status codes (200, 201, 400, 404, 500)
- Use consistent URL patterns (`/api/resource`)

### 3. **Always Include**
- Input validation
- Error handling
- TypeScript types
- Database integration
- Tests (TDD)

### 4. **Consider Mobile Needs**
- Pagination for list endpoints
- Filtering and sorting
- Offline sync support
- Efficient data formats

---

## Common Patterns

### CRUD Pattern (Most Common)

```
GET    /api/[resource]          # List
GET    /api/[resource]/:id      # Get one
POST   /api/[resource]          # Create
PUT    /api/[resource]/:id      # Update
DELETE /api/[resource]/:id      # Delete
```

### Nested Resources

```
GET    /api/clients/:id/deals   # Get deals for a client
POST   /api/clients/:id/deals    # Create deal for a client
```

### Search/Filter

```
GET    /api/clients?search=john&status=active
```

---

## File Structure for New Features

When you create a new feature, you'll typically add:

```
backend/
├── src/
│   ├── routes/
│   │   └── [resource].ts       # New route file
│   ├── controllers/            # (Future) Business logic
│   │   └── [resource]Controller.ts
│   └── services/               # (Future) Complex operations
│       └── [resource]Service.ts
├── prisma/
│   └── schema.prisma           # Add new model
└── tests/                      # (Future) Tests
    └── [resource].test.ts
```

---

## Next Steps

1. **Choose your first feature** (e.g., Client Management)
2. **Run `/speckit.specify`** with the template above
3. **Follow the workflow** (plan → tasks → implement)
4. **Test the endpoints** (use Postman, curl, or mobile app)
5. **Create mobile integration** (RTK Query endpoints)

**You're ready to build backend features! 🚀**
