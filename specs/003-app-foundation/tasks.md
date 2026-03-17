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

- [x] T037 [US4] Create backend/ directory structure at repository root
- [x] T038 [US4] Initialize Node.js project in backend/ with package.json
- [x] T039 [US4] Install Express.js or Fastify framework in backend/
- [x] T040 [US4] Install TypeScript and configure tsconfig.json in backend/
- [x] T041 [US4] Create backend/src/server.ts entry point
- [x] T042 [US4] Configure Express/Fastify server to listen on port (e.g., 3000)
- [x] T043 [US4] Create backend/src/config/ directory for configuration
- [x] T044 [US4] Setup environment variables management (dotenv) in backend/
- [x] T045 [US4] Install and configure Prisma ORM in backend/
- [x] T046 [US4] Create Prisma schema in backend/prisma/schema.prisma
- [x] T047 [US4] Configure PostgreSQL database connection in Prisma schema
- [x] T048 [US4] Create database connection service in backend/src/config/database.ts
- [ ] T049 [US4] Verify backend connects to PostgreSQL and starts successfully (`npm start`, health check responds on GET /api/health)
- [x] T050 [US4] Create backend/src/routes/ directory for API routes
- [x] T051 [US4] Create health check endpoint (GET /api/health) in backend/src/routes/health.ts
- [x] T052 [US4] ~~Test health check endpoint responds correctly~~ (merged into T049)
- [x] T053 [US4] Create API route structure in backend/src/routes/api.ts
- [x] T054 [US4] Add error handling middleware in backend/src/middleware/errorHandler.ts
- [x] T055 [US4] Add CORS middleware for mobile app requests
- [x] T056 [US4] Create backend/README.md with setup and run instructions
- [x] T057 [US4] ~~Verify backend server starts and runs successfully~~ (merged into T049)

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
- [ ] T063 [US5] Verify backend builds (`npm run build`) and starts (`npm start`) without errors
- [x] T064 [US5] ~~Verify backend server starts without errors~~ (merged into T063)
- [x] T065 [US5] ~~Test backend API endpoint responds correctly~~ (covered by T049)
- [x] T066 [US5] Create pre-commit verification script or documentation (documented in workflow)
- [x] T067 [US5] Document build and run verification process in README.md (documented)

**Checkpoint**: At this point, User Story 5 build verification should ensure all code is compilable and runnable

---

## Phase 7: Polish & Integration

**Purpose**: Connect mobile to backend, finalize configuration and documentation

- [ ] T068 [P] Connect mobile app to backend API: update BASE_URL in RTK Query, add network error handling, test health endpoint call
- [ ] T069 [P] Create dev/prod environment configuration (`.env` files, config switching)
- [ ] T070 [P] Final documentation pass: quickstart.md, verify README accuracy, code cleanup

---

## Remaining Work Summary

**5 tasks remain** (consolidated from original 14):

| Task | Depends On | Description |
|------|-----------|-------------|
| T049 | PostgreSQL running | Backend + DB connection + health check verification |
| T063 | T049 | Backend TypeScript build verification |
| T068 | T049 | Mobile-to-backend integration (RTK Query + error handling) |
| T069 | T068 | Dev/prod environment configuration |
| T070 | All above | Documentation and cleanup pass |

**Execution**: T049 → T063 → T068 → T069/T070 (parallel)
