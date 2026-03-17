# Tasks: CRM Foundation Application

**Input**: [spec.md](./spec.md), [plan.md](./plan.md)
**Prerequisites**: 003-app-foundation complete (mobile + backend foundation in place)

## Format: `[ID] [Priority] [Epic] Description`

---

## Phase A: Data Foundation

**Purpose**: Define all CRM data models in Prisma and SQLite before feature work begins.
**Branch**: Work on each epic's branch as features begin, or prepare on `main`.

- [ ] T001 [P1] Create Prisma models: User (email, passwordHash, role, refreshToken), Client (name, email, phone, address, notes), Deal (title, value, stage, probability, clientId), Task (title, description, dueDate, status, priority, clientId, dealId), CallLog (clientId, callDate, duration, notes, outcome) in `backend/prisma/schema.prisma`
- [ ] T002 [P1] Run Prisma migration to generate PostgreSQL tables
- [ ] T003 [P1] Create SQLite migrations for mobile tables: clients, deals, tasks, call_logs in `mobile/src/database/migrations/`
- [ ] T004 [P1] Create TypeScript interfaces for all entities in `mobile/src/database/models/`

---

## Phase B: Authentication & Access — Epic 001 (P1)

**Branch**: `epic/001-authentication`
**Spec**: US1 — JWT auth, refresh tokens, session persistence

### Backend

- [ ] T005 [P1] [E001] Install bcrypt + jsonwebtoken. Create auth service in `backend/src/services/auth.ts` (hashPassword, comparePassword, generateTokens, verifyToken)
- [ ] T006 [P1] [E001] Create auth routes: POST `/api/auth/register`, POST `/api/auth/login`, POST `/api/auth/refresh` in `backend/src/routes/auth.ts`
- [ ] T007 [P1] [E001] Create auth middleware in `backend/src/middleware/auth.ts` (JWT verification, protect routes)

### Mobile

- [ ] T008 [P1] [E001] Create auth Redux slice in `mobile/src/store/slices/authSlice.ts` (token storage, user state, login/logout actions)
- [ ] T009 [P1] [E001] Create RTK Query auth endpoints in `mobile/src/store/api/authApi.ts` (login, register, refresh)
- [ ] T010 [P1] [E001] Create LoginScreen and RegisterScreen in `mobile/src/screens/auth/`
- [ ] T011 [P1] [E001] Add auth flow to AppNavigator: show auth screens when unauthenticated, main screens when authenticated

---

## Phase C: Client Management — Epic 002 (P1)

**Branch**: `epic/002-client-management`
**Spec**: US2 — Client CRUD, search, offline sync, interaction history

### Backend

- [ ] T012 [P1] [E002] Create client service in `backend/src/services/client.ts` (CRUD + search with pagination)
- [ ] T013 [P1] [E002] Create client routes: GET/POST `/api/clients`, GET/PUT/DELETE `/api/clients/:id` in `backend/src/routes/clients.ts`

### Mobile

- [ ] T014 [P1] [E002] Create clients Redux slice + RTK Query endpoints in `mobile/src/store/api/clientApi.ts`
- [ ] T015 [P1] [E002] Create ClientListScreen with search bar and pull-to-refresh in `mobile/src/screens/clients/`
- [ ] T016 [P1] [E002] Create ClientDetailScreen (view client info, notes, interaction history) in `mobile/src/screens/clients/`
- [ ] T017 [P1] [E002] Create ClientFormScreen (create/edit client) in `mobile/src/screens/clients/`
- [ ] T018 [P1] [E002] Implement offline client CRUD: write to SQLite first, queue sync operations

---

## Phase D: Deal/Opportunity Management — Epic 003 (P2)

**Branch**: `epic/003-deal-management`
**Spec**: US3 — Deal CRUD, pipeline stages, pipeline view

### Backend

- [ ] T019 [P2] [E003] Create deal service in `backend/src/services/deal.ts` (CRUD + pipeline stage transitions)
- [ ] T020 [P2] [E003] Create deal routes: GET/POST `/api/deals`, GET/PUT/DELETE `/api/deals/:id` in `backend/src/routes/deals.ts`

### Mobile

- [ ] T021 [P2] [E003] Create deals Redux slice + RTK Query endpoints in `mobile/src/store/api/dealApi.ts`
- [ ] T022 [P2] [E003] Create DealPipelineScreen (deals grouped by stage, drag between stages) in `mobile/src/screens/deals/`
- [ ] T023 [P2] [E003] Create DealDetailScreen (view/edit deal, linked client) in `mobile/src/screens/deals/`
- [ ] T024 [P2] [E003] Implement offline deal CRUD with SQLite + sync queue

---

## Phase E: Task & Activity Management — Epic 004 (P2)

**Branch**: `epic/004-task-management`
**Spec**: US4 — Task CRUD, Kanban board, filtering

### Backend

- [ ] T025 [P2] [E004] Create task service in `backend/src/services/task.ts` (CRUD + status transitions + filtering)
- [ ] T026 [P2] [E004] Create task routes: GET/POST `/api/tasks`, GET/PUT/DELETE `/api/tasks/:id` in `backend/src/routes/tasks.ts`

### Mobile

- [ ] T027 [P2] [E004] Create tasks Redux slice + RTK Query endpoints in `mobile/src/store/api/taskApi.ts`
- [ ] T028 [P2] [E004] Create TaskBoardScreen (Kanban columns by status, drag-and-drop) in `mobile/src/screens/tasks/`
- [ ] T029 [P2] [E004] Create TaskDetailScreen (view/edit task, linked client/deal) in `mobile/src/screens/tasks/`
- [ ] T030 [P2] [E004] Implement offline task CRUD with SQLite + sync queue

---

## Phase F: Call Logging & Communication — Epic 005 (P2)

**Branch**: `epic/005-call-logging`
**Spec**: US5 — Call log CRUD, communication history per client

### Backend

- [ ] T031 [P2] [E005] Create call log service in `backend/src/services/callLog.ts` (CRUD + client history query)
- [ ] T032 [P2] [E005] Create call log routes: GET/POST `/api/call-logs`, GET/PUT/DELETE `/api/call-logs/:id` in `backend/src/routes/callLogs.ts`

### Mobile

- [ ] T033 [P2] [E005] Create call logs Redux slice + RTK Query endpoints in `mobile/src/store/api/callLogApi.ts`
- [ ] T034 [P2] [E005] Create CallLogScreen (log new call, view call history) in `mobile/src/screens/calls/`
- [ ] T035 [P2] [E005] Integrate call history into ClientDetailScreen (chronological communication timeline)
- [ ] T036 [P2] [E005] Implement offline call log CRUD with SQLite + sync queue

---

## Phase G: Analytics & Integrations — Epics 006, 007 (P3, deferred)

**Note**: P3 features. Scope TBD after P1+P2 are delivered.

- [ ] T037 [P3] [E006] Backend analytics endpoints: pipeline summary, client stats, conversion rates
- [ ] T038 [P3] [E006] Mobile DashboardScreen with charts (deal pipeline, key metrics)
- [ ] T039 [P3] [E006] Data export endpoints (CSV/PDF)
- [ ] T040 [P3] [E007] OAuth integration service for third-party connections (Slack, Google Calendar)
- [ ] T041 [P3] [E007] Mobile integration settings screen + notification handling

---

## Cross-Cutting (applies throughout)

- [ ] T042 [P1] Implement sync queue service in mobile: track pending operations, push to backend on connectivity change
- [ ] T043 [P1] Add conflict resolution logic (timestamp-based, last-write-wins with notification)
- [ ] T044 [P1] Add main tab navigation: Clients, Deals, Tasks, Calls, Dashboard

---

## Execution Order

| Order | Tasks | Prerequisite |
|-------|-------|-------------|
| 1 | Phase A (T001–T004) | 003 foundation complete |
| 2 | Phase B (T005–T011) + T044 | Phase A |
| 3 | Phase C (T012–T018) + T042–T043 | Phase B |
| 4 | Phase D (T019–T024) | Phase C |
| 5 | Phase E (T025–T030) | Phase A (parallel with D) |
| 6 | Phase F (T031–T036) | Phase C |
| 7 | Phase G (T037–T041) | All P1+P2 complete |

**MVP milestone**: After Phase C — users can authenticate and manage clients with offline support.
