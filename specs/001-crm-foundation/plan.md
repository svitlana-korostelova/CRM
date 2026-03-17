# Implementation Plan: CRM Foundation Application

**Branch**: `001-crm-foundation` | **Date**: 2026-03-02 | **Spec**: [spec.md](./spec.md)

## Summary

Implements the core CRM features defined in the spec: authentication, client management, deal/opportunity pipeline, task board, call logging, analytics dashboard, and third-party integrations. Each user story maps to a branching epic per `BRANCHING_STRATEGY.md`.

## What's Already Built (from 003-app-foundation)

- React Native mobile app with Redux Toolkit, RTK Query, React Navigation
- SQLite local database with migration system (offline-first ready)
- Express.js backend with Prisma ORM, PostgreSQL connection, health/echo endpoints
- Project structure, build pipeline, theme system

## What Needs Building

| User Story | Epic Branch | Priority | Scope |
|-----------|-------------|----------|-------|
| US1 - Authentication & Access | `epic/001-authentication` | P1 | JWT auth, login/register, refresh tokens, session persistence |
| US2 - Client Management | `epic/002-client-management` | P1 | Client CRUD, search, offline sync, interaction history |
| US3 - Deal/Opportunity Mgmt | `epic/003-deal-management` | P2 | Deal CRUD, pipeline stages, pipeline view |
| US4 - Task & Activity Mgmt | `epic/004-task-management` | P2 | Task CRUD, Kanban board, client/deal linking |
| US5 - Call Logging | `epic/005-call-logging` | P2 | Call log CRUD, communication history per client |
| US6 - Analytics Dashboard | `epic/006-analytics` | P3 | Metrics, pipeline charts, data export |
| US7 - Third-Party Integrations | `epic/007-integrations` | P3 | OAuth, Slack, Google Calendar |

## Technical Approach

**Backend pattern** (per feature): Prisma model → service layer → Express route → validation middleware
**Mobile pattern** (per feature): SQLite migration → Redux slice + RTK Query endpoints → screens + navigation
**Sync pattern**: Offline-first writes to SQLite → sync queue → backend push on connectivity

## Branching Strategy

Per `BRANCHING_STRATEGY.md`:
- Epic branch: `epic/###-epic-name` from `main`
- Feature branch: `epic/###-epic-name/feature/###-feature-name` from epic
- Merge: feature → epic (after review/tests) → main (when stable)

## Implementation Order

### Phase A: Data Foundation
Prisma schema with all CRM models, mobile SQLite migrations for all tables. Shared across epics.

### Phase B: Authentication (P1) — Epic 001
Backend auth endpoints, mobile login/register, token management. Unblocks all other features.

### Phase C: Client Management (P1) — Epic 002
Full client CRUD with offline support. Core CRM value.

### Phase D: Deal Management (P2) — Epic 003
Deal CRUD with pipeline stages. Depends on clients.

### Phase E: Task Management (P2) — Epic 004
Task CRUD with Kanban board. Depends on clients and deals.

### Phase F: Call Logging (P2) — Epic 005
Call logging with client history. Depends on clients.

### Phase G: Analytics & Integrations (P3) — Epics 006, 007
Dashboard metrics and third-party OAuth. Deferred to later iteration.

## Planning Status

### Phase 0: Research — N/A (leveraging 003 foundation)
### Phase 1: Design — This plan
### Phase 2: Task Generation — See [tasks.md](./tasks.md)
