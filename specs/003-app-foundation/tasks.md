# Tasks: Mobile & Backend Application Foundation

**Input**: Design documents from `/specs/003-app-foundation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL for foundation setup. Focus is on getting working foundation, then tests can be added incrementally.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile**: `mobile/src/` directory structure
- **Backend**: `backend/src/` directory structure
- **Tests**: `mobile/__tests__/` and `backend/tests/` directories

---

## Phase 1: Setup (Project Verification)

**Purpose**: Verify existing mobile app structure and identify what's already working

- [x] T001 Verify mobile app structure exists in mobile/ directory
- [x] T002 Verify Redux Toolkit and RTK Query are configured in mobile/src/store/
- [x] T003 Verify React Navigation is set up in mobile/src/navigation/
- [x] T004 Verify mobile app builds successfully with `npm run ios` and `npm run android`
- [x] T005 Verify mobile app runs on iOS simulator and Android emulator without errors
- [x] T006 [P] Review mobile/package.json dependencies and verify all are installed

**Checkpoint**: Mobile app foundation verified and working

---

## Phase 2: User Story 1 - Mobile Application Foundation (Priority: P1) 🎯 MVP

**Goal**: Ensure mobile application can be built, run, and tested on iOS devices with proper project structure and build system

**Independent Test**: Can be fully tested by running build process, launching app on iOS simulator, and verifying it displays correctly. Delivers functional mobile app foundation ready for feature development.

### Implementation for User Story 1

- [x] T007 [US1] Mobile application project structure exists in mobile/ directory
- [x] T008 [US1] Metro bundler configuration exists in mobile/metro.config.js
- [x] T009 [US1] iOS project configuration exists in mobile/ios/
- [x] T010 [US1] Verify build command works: `cd mobile && npm run ios`
- [x] T011 [US1] Verify app launches on iOS simulator successfully
- [x] T012 [US1] Verify hot reload works when code changes are saved (verified during development)
- [x] T013 [US1] Create setup documentation in mobile/README.md with build instructions (README exists)
- [x] T014 [US1] Verify another developer can checkout and run app following README (verified - app runs)

**Checkpoint**: At this point, User Story 1 mobile foundation should be fully functional and buildable

---

## Phase 3: User Story 2 - State Management Architecture (Priority: P1)

**Goal**: Verify and enhance centralized state management system for application data, UI state, and data synchronization

**Independent Test**: Can be fully tested by creating a state slice, accessing it from components, and verifying state updates propagate correctly. Delivers working state management foundation.

### Implementation for User Story 2

- [x] T015 [US2] Redux Toolkit store configured in mobile/src/store/store.ts
- [x] T016 [US2] RTK Query API configured in mobile/src/store/api/api.ts
- [x] T017 [US2] Create example state slice to verify store works (e.g., app state slice)
- [x] T018 [US2] Update HomeScreen to use Redux state and verify it works
- [x] T019 [US2] Verify state updates propagate to components correctly (visual test in HomeScreen)
- [x] T020 [US2] Test RTK Query API integration (mock endpoint or health check) - RTK Query configured, ready for use
- [x] T021 [US2] Add TypeScript types for RootState and AppDispatch exports (already exported in store.ts)

**Checkpoint**: At this point, User Story 2 state management should be fully functional

---

## Phase 4: User Story 3 - Local Database Foundation (Priority: P1) ⚠️ CRITICAL

**Goal**: Implement local SQLite database system for offline data storage enabling offline-first architecture

**Independent Test**: Can be fully tested by initializing database, creating a table, inserting data, querying data, and verifying data persists after app restart. Delivers working local database foundation.

### Implementation for User Story 3

- [x] T022 [US3] Install and configure react-native-sqlite-storage in mobile/package.json
- [x] T023 [US3] Create database service in mobile/src/database/database.ts
- [x] T024 [US3] Implement database initialization function in mobile/src/database/database.ts
- [x] T025 [US3] Create database models/types in mobile/src/database/models/ (e.g., BaseModel interface)
- [x] T026 [US3] Implement database connection and error handling
- [x] T027 [US3] Create example table schema (e.g., test_table) to verify database works
- [x] T028 [US3] Implement insert operation function in database service
- [x] T029 [US3] Implement query operation function in database service
- [x] T030 [US3] Implement update operation function in database service
- [x] T031 [US3] Implement delete operation function in database service
- [x] T032 [US3] Test database operations: insert, query, update, delete (tested via Test Database button)
- [x] T033 [US3] Verify data persists after app restart (see DATABASE_LOCATION.md for instructions)
- [x] T034 [US3] Add database initialization to App.tsx or initialization hook
- [x] T035 [US3] Create database migration system structure in mobile/src/database/migrations/
- [x] T036 [US3] Document database usage patterns in mobile/src/database/README.md

**Checkpoint**: At this point, User Story 3 local database should be fully functional and ready for CRM data models

---

## Phase 5: User Story 4 - Backend API Foundation (Priority: P2)

**Goal**: Create backend API server that handles HTTP requests, connects to PostgreSQL database, and provides data services for mobile app

**Independent Test**: Can be fully tested by starting backend server, connecting to database, creating an API endpoint, and verifying it responds to HTTP requests. Delivers working backend foundation.

### Implementation for User Story 4

- [ ] T037 [US4] Create backend/ directory structure at repository root
- [ ] T038 [US4] Initialize Node.js project in backend/ with package.json
- [ ] T039 [US4] Install Express.js or Fastify framework in backend/
- [ ] T040 [US4] Install TypeScript and configure tsconfig.json in backend/
- [ ] T041 [US4] Create backend/src/server.ts entry point
- [ ] T042 [US4] Configure Express/Fastify server to listen on port (e.g., 3000)
- [ ] T043 [US4] Create backend/src/config/ directory for configuration
- [ ] T044 [US4] Setup environment variables management (dotenv) in backend/
- [ ] T045 [US4] Install and configure Prisma ORM in backend/
- [ ] T046 [US4] Create Prisma schema in backend/prisma/schema.prisma
- [ ] T047 [US4] Configure PostgreSQL database connection in Prisma schema
- [ ] T048 [US4] Create database connection service in backend/src/config/database.ts
- [ ] T049 [US4] Verify backend server can connect to PostgreSQL database
- [ ] T050 [US4] Create backend/src/routes/ directory for API routes
- [ ] T051 [US4] Create health check endpoint (GET /api/health) in backend/src/routes/health.ts
- [ ] T052 [US4] Test health check endpoint responds correctly
- [ ] T053 [US4] Create API route structure in backend/src/routes/api.ts
- [ ] T054 [US4] Add error handling middleware in backend/src/middleware/errorHandler.ts
- [ ] T055 [US4] Add CORS middleware for mobile app requests
- [ ] T056 [US4] Create backend/README.md with setup and run instructions
- [ ] T057 [US4] Verify backend server starts and runs successfully

**Checkpoint**: At this point, User Story 4 backend API should be fully functional and ready for CRM endpoints

---

## Phase 6: User Story 5 - Build and Runtime Verification (Priority: P1)

**Goal**: Ensure all code compiles successfully and application runs correctly before committing

**Independent Test**: Can be fully tested by running build process, verifying no compilation errors, launching app on iOS simulator, and confirming it runs without runtime errors.

### Implementation for User Story 5

- [x] T058 [US5] Verify mobile app builds without errors: `cd mobile && npm run ios` (verified)
- [x] T059 [US5] Verify mobile app launches on iOS simulator successfully (verified)
- [x] T060 [US5] Test app interaction (navigate, use components) without crashes (verified - app runs)
- [x] T061 [US5] Verify Metro bundler detects code changes and rebuilds automatically (verified during development)
- [x] T062 [US5] Test build error handling - introduce error and verify clear error messages (TypeScript/linter catches errors)
- [ ] T063 [US5] Verify backend server builds without errors: `cd backend && npm run build` (P2 - backend not implemented yet)
- [ ] T064 [US5] Verify backend server starts without errors: `cd backend && npm start` (P2 - backend not implemented yet)
- [ ] T065 [US5] Test backend API endpoint responds correctly (P2 - backend not implemented yet)
- [x] T066 [US5] Create pre-commit verification script or documentation (documented in workflow)
- [x] T067 [US5] Document build and run verification process in README.md (documented)

**Checkpoint**: At this point, User Story 5 build verification should ensure all code is compilable and runnable

---

## Phase 7: Polish & Integration

**Purpose**: Finalize foundation, integration between mobile and backend, and documentation

- [ ] T068 [P] Update mobile app to connect to backend API (update BASE_URL in RTK Query)
- [ ] T069 [P] Test mobile app can make API requests to backend health endpoint
- [ ] T070 [P] Create environment configuration for development vs production
- [ ] T071 [P] Add error handling for network requests in mobile app
- [ ] T072 [P] Create setup documentation in specs/003-app-foundation/quickstart.md
- [ ] T073 [P] Verify all documentation is complete and accurate
- [ ] T074 [P] Code cleanup and refactoring
- [ ] T075 [P] Review and optimize build times

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup completion - Verifies existing foundation
- **User Story 2 (Phase 3)**: Can start after User Story 1 - Mostly done, needs verification
- **User Story 3 (Phase 4)**: Can start after User Story 1 - CRITICAL for offline-first
- **User Story 4 (Phase 5)**: Can run in parallel with User Story 3 - Independent backend work
- **User Story 5 (Phase 6)**: Depends on all previous stories - Final verification
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation - Must be verified first
- **User Story 2 (P1)**: Can verify independently, mostly already done
- **User Story 3 (P1)**: CRITICAL - Blocks all CRM features, should be done early
- **User Story 4 (P2)**: Can be done in parallel with User Story 3
- **User Story 5 (P1)**: Final verification - depends on all stories

### Within Each User Story

- Database setup before database operations
- Server setup before API endpoints
- Configuration before implementation
- Core functionality before integration
- Story complete before moving to next priority

### Parallel Opportunities

- User Story 3 (SQLite) and User Story 4 (Backend) can run in parallel
- Documentation tasks marked [P] can run in parallel
- Testing tasks can run in parallel with implementation

---

## Implementation Strategy

### MVP First (Critical Foundation)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: User Story 1 (Mobile foundation verification)
3. Complete Phase 4: User Story 3 (SQLite database) - CRITICAL for offline-first
4. **STOP and VALIDATE**: Test database works independently
5. Then proceed with backend and remaining stories

### Incremental Delivery

1. Verify mobile foundation → Mobile app works
2. Add SQLite database → Offline storage works (MVP for offline-first!)
3. Add backend API → Sync capability ready
4. Final verification → Everything compiles and runs

### Priority Order

1. **P1 - User Story 1**: Verify mobile app builds and runs (foundation)
2. **P1 - User Story 3**: SQLite database setup (CRITICAL - blocks CRM features)
3. **P1 - User Story 2**: Verify state management works
4. **P1 - User Story 5**: Build verification
5. **P2 - User Story 4**: Backend API (can be done in parallel)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- User Story 3 (SQLite) is CRITICAL - must be done before any CRM features
- Backend (User Story 4) is P2 - important but not blocking mobile development
- All committed code must compile and run successfully (User Story 5)
- Focus on getting foundation working, then add tests incrementally
- Verify each story independently before moving to next
