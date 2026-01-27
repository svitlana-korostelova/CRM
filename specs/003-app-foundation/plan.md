# Implementation Plan: Mobile & Backend Application Foundation

**Branch**: `003-app-foundation` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-app-foundation/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature establishes the foundational infrastructure for the CRM mobile application and backend API. It creates a working React Native mobile app with Redux Toolkit state management, SQLite local database for offline-first architecture, and a Node.js backend API with PostgreSQL. The mobile app must be buildable and runnable on iOS simulator. This foundation enables all subsequent CRM feature development.

## Technical Context

**Language/Version**: TypeScript 5.5+, JavaScript (ES2020+), Swift 5.9+ (iOS native)  
**Primary Dependencies**: 
- Mobile: React Native 0.82.0, Redux Toolkit 2.2.7, RTK Query, React Navigation 6, React Native Paper 5.12.5, react-native-sqlite-storage 6.0.1
- Backend: Node.js 18+, Express.js or Fastify, Prisma ORM, PostgreSQL
**Storage**: 
- Mobile: SQLite (local, offline-first)
- Backend: PostgreSQL (cloud, primary database)
**Testing**: Jest, React Native Testing Library, Supertest (backend API tests)  
**Target Platform**: iOS 15+ (primary), Android 10+ (MVP later)  
**Project Type**: Mobile + API (React Native mobile app + Node.js backend)  
**Performance Goals**: 
- Mobile: Local DB operations <50ms, app launch <30s, incremental builds <10s
- Backend: API response <200ms p95, 100 concurrent requests, server startup <10s
**Constraints**: 
- Offline-first architecture (NON-NEGOTIABLE per constitution)
- All committed code must compile and run successfully
- iOS simulator must work for development
- Local database must persist across app restarts
**Scale/Scope**: 
- Mobile: Single-device offline storage, sync when online
- Backend: Support 1000+ concurrent users per instance

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Constitution Compliance Analysis

✅ **Offline-First Architecture (Principle I)**: SQLite local database implementation (FR-008, FR-009, FR-010, FR-011) ensures all data is stored locally and accessible offline. This aligns with constitution requirement for offline-first architecture.

✅ **Mobile-First Design (Principle II)**: React Native mobile app with iOS priority (FR-001, FR-002, FR-003) ensures mobile-first approach. iOS simulator support enables development and testing.

✅ **Test-First Development (Principle IV)**: TDD approach will be followed for all business logic implementation. Tests will be written first, approved, then implementation follows Red-Green-Refactor cycle.

✅ **Data Integrity & Security (Principle V)**: Local database encryption will be implemented (FR-022). Backend will support JWT authentication foundation (prepared for FR-001, FR-002 from 001-crm-foundation).

✅ **Performance & Scalability (Principle VI)**: Performance goals defined (SC-005, SC-007, SC-014). Database operations optimized for mobile constraints.

✅ **Simplicity & Maintainability (Principle VII)**: Simple, clear project structure. Modular architecture allowing independent feature development.

**GATE STATUS**: ✅ **PASS** - All foundation requirements align with constitution principles. No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/003-app-foundation/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output - database schemas (/speckit.plan command)
├── quickstart.md        # Phase 1 output - setup guide (/speckit.plan command)
├── contracts/           # Phase 1 output - API contracts (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Mobile Application (already exists, needs SQLite setup)
mobile/
├── src/
│   ├── navigation/      # React Navigation (exists)
│   ├── screens/          # Screen components (exists)
│   ├── store/            # Redux store (exists)
│   │   ├── api/         # RTK Query API (exists)
│   │   └── store.ts      # Store config (exists)
│   ├── database/         # NEW: SQLite database service
│   │   ├── database.ts   # Database initialization
│   │   ├── migrations/   # Database migrations
│   │   └── models/       # Database models/types
│   ├── theme/            # Theme config (exists)
│   └── types/            # TypeScript types (exists)
├── ios/                  # iOS native project (exists)
└── package.json          # Dependencies (exists)

# Backend API (✅ Created)
backend/
├── src/
│   ├── server.ts          # Express server entry point
│   ├── config/
│   │   └── database.ts    # Prisma database connection
│   ├── middleware/
│   │   └── errorHandler.ts # Error handling middleware
│   └── routes/
│       ├── api.ts         # Main API router
│       └── health.ts      # Health check endpoint
├── prisma/
│   └── schema.prisma      # Prisma schema (PostgreSQL)
├── prisma.config.ts       # Prisma 7 configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
└── README.md              # Setup instructions
```

**Structure Decision**: 
- Mobile app structure already exists in `mobile/` directory. Need to add SQLite database service layer.
- Backend API will be created in new `backend/` directory at repository root.
- This follows mobile + API project type structure.
- Database schemas will be defined in Prisma for backend, and TypeScript interfaces for mobile SQLite.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. This is a straightforward foundation setup that follows constitution principles without introducing unnecessary complexity.

## Planning Status

### Phase 0: Research ⏳ PENDING

**Next Step**: Research SQLite libraries for React Native, backend framework selection (Express vs Fastify), and Prisma setup patterns.

**Status**: Research needed for:
- Best SQLite library for React Native (react-native-sqlite-storage vs react-native-sqlite-2 vs expo-sqlite)
- Express.js vs Fastify for backend (performance, TypeScript support)
- Prisma setup and migration patterns
- Database schema design for offline-first sync

### Phase 1: Design ⏳ PENDING

**Next Step**: After research, create:
- `data-model.md` - Database schemas for both SQLite (mobile) and PostgreSQL (backend)
- `quickstart.md` - Setup instructions for mobile and backend
- `contracts/` - API contract definitions for mobile-backend communication

**Status**: Design artifacts pending research completion.

### Phase 2: Task Generation ⏳ PENDING

**Next Step**: Run `/speckit.tasks` to generate `tasks.md` with actionable implementation tasks.

**Status**: Tasks will be generated after design phase completion.

## Implementation Notes

### Current State Assessment

**Already Implemented**:
- ✅ React Native mobile app structure (`mobile/` directory)
- ✅ Redux Toolkit + RTK Query configured (`mobile/src/store/`)
- ✅ React Navigation setup (`mobile/src/navigation/`)
- ✅ Basic HomeScreen component (`mobile/src/screens/HomeScreen.tsx`)
- ✅ iOS project configuration (`mobile/ios/`)
- ✅ Metro bundler configuration
- ✅ TypeScript configuration

**Needs Implementation**:
- ❌ SQLite database initialization and service layer
- ❌ Database schema definitions and migrations
- ❌ Backend API server (Node.js + Express/Fastify)
- ❌ Prisma setup and PostgreSQL connection
- ❌ Backend API endpoints structure
- ❌ Database sync preparation (foundation for offline-first)

### Priority Order

1. **P1 - Mobile SQLite Setup** (User Story 3): Critical for offline-first architecture. Must be done before any CRM features.
2. **P1 - Mobile App Verification** (User Story 5): Ensure existing app builds and runs correctly.
3. **P1 - State Management Verification** (User Story 2): Verify Redux setup works correctly (mostly done, may need testing).
4. **P2 - Backend API Foundation** (User Story 4): Important but secondary since offline-first is priority.

### Dependencies

- Mobile SQLite setup can proceed independently
- Backend API can be developed in parallel once mobile foundation is verified
- Database schemas should be designed together (mobile SQLite + backend PostgreSQL) for sync compatibility

## Next Steps

1. Complete Phase 0 research on SQLite libraries and backend framework
2. Create design artifacts (data-model.md, quickstart.md, contracts/)
3. Generate tasks.md using `/speckit.tasks`
4. Begin implementation with mobile SQLite setup (highest priority)
