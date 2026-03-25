# Data Model: CRM Mobile Features — Navigation Types & Entity Schema

**Feature**: 004-crm-mobile-features  
**Date**: 2026-03-25

## Navigation Type Definitions

### Root Tab Param List

```typescript
type RootTabParamList = {
  DashboardTab: NavigatorScreenParams<DashboardStackParamList>;
  ClientsTab: NavigatorScreenParams<ClientsStackParamList>;
  DealsTab: NavigatorScreenParams<DealsStackParamList>;
  ActivitiesTab: NavigatorScreenParams<ActivitiesStackParamList>;
  MoreTab: NavigatorScreenParams<MoreStackParamList>;
};
```

### Per-Tab Stack Param Lists

```typescript
type DashboardStackParamList = {
  Dashboard: undefined;
  NotificationList: undefined;
};

type ClientsStackParamList = {
  ClientList: undefined;
  ClientDetail: { clientId: string };
  ClientForm: { mode: "create" } | { mode: "edit"; clientId: string };
};

type DealsStackParamList = {
  DealPipeline: undefined;
  DealDetail: { dealId: string };
  DealForm:
    | { mode: "create"; clientId?: string }
    | { mode: "edit"; dealId: string };
};

type ActivitiesStackParamList = {
  ActivityList: { filter?: ActivityType };
  TaskBoard: undefined;
  TaskDetail: { taskId: string };
  TaskForm:
    | { mode: "create"; clientId?: string; dealId?: string }
    | { mode: "edit"; taskId: string };
  CallLogForm: { clientId?: string; dealId?: string };
  NoteForm:
    | { mode: "create"; clientId?: string; dealId?: string }
    | { mode: "edit"; noteId: string };
  MeetingForm:
    | { mode: "create"; clientId?: string; dealId?: string }
    | { mode: "edit"; meetingId: string };
  Calendar: undefined;
};

type MoreStackParamList = {
  MoreMenu: undefined;
  ReportsHub: undefined;
  PipelineReport: undefined;
  ActivityReport: undefined;
  ClientReport: undefined;
  Settings: undefined;
  Profile: undefined;
  SyncStatus: undefined;
  About: undefined;
};

// Global modal screens (presented over tab navigator)
type RootStackParamList = {
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  GlobalSearch: undefined;
  QuickAction: undefined;
};
```

### Shared Types

```typescript
type ActivityType = "task" | "call" | "note" | "meeting";

type FormMode = "create" | "edit";

type Priority = "low" | "medium" | "high";

type TaskStatus = "todo" | "in_progress" | "done";

type CallOutcome = "connected" | "voicemail" | "no_answer" | "left_message";
```

---

## Entity Schema (SQLite — Mobile)

### clients

| Column      | Type    | Constraints | Notes                     |
| ----------- | ------- | ----------- | ------------------------- |
| id          | TEXT    | PRIMARY KEY | UUID v4                   |
| name        | TEXT    | NOT NULL    | Display name              |
| email       | TEXT    |             |                           |
| phone       | TEXT    |             |                           |
| company     | TEXT    |             |                           |
| address     | TEXT    |             |                           |
| avatar_url  | TEXT    |             | Remote URL or local path  |
| notes       | TEXT    |             | Free-form notes           |
| tags        | TEXT    |             | JSON array of tag strings |
| is_favorite | INTEGER | DEFAULT 0   | 0 = false, 1 = true       |
| created_at  | TEXT    | NOT NULL    | ISO 8601 timestamp        |
| updated_at  | TEXT    | NOT NULL    | ISO 8601 timestamp        |
| synced_at   | TEXT    |             | Last successful sync      |
| is_deleted  | INTEGER | DEFAULT 0   | Soft delete for sync      |

### deals

| Column              | Type    | Constraints                       | Notes            |
| ------------------- | ------- | --------------------------------- | ---------------- |
| id                  | TEXT    | PRIMARY KEY                       | UUID v4          |
| title               | TEXT    | NOT NULL                          |                  |
| value               | REAL    | DEFAULT 0                         | Monetary value   |
| stage_id            | TEXT    | NOT NULL, FK → pipeline_stages.id | Current stage    |
| probability         | INTEGER | DEFAULT 0                         | 0-100 percentage |
| expected_close_date | TEXT    |                                   | ISO 8601 date    |
| client_id           | TEXT    | NOT NULL, FK → clients.id         |                  |
| notes               | TEXT    |                                   |                  |
| created_at          | TEXT    | NOT NULL                          |                  |
| updated_at          | TEXT    | NOT NULL                          |                  |
| synced_at           | TEXT    |                                   |                  |
| is_deleted          | INTEGER | DEFAULT 0                         |                  |

### pipeline_stages

| Column   | Type    | Constraints | Notes                     |
| -------- | ------- | ----------- | ------------------------- |
| id       | TEXT    | PRIMARY KEY | UUID v4                   |
| name     | TEXT    | NOT NULL    | e.g., "Lead", "Qualified" |
| position | INTEGER | NOT NULL    | Sort order                |
| color    | TEXT    | NOT NULL    | Hex color code            |
| is_won   | INTEGER | DEFAULT 0   | Marks "won" stage         |
| is_lost  | INTEGER | DEFAULT 0   | Marks "lost" stage        |

**Default stages seed data**:

1. Lead (#9E9E9E, position 0)
2. Qualified (#2196F3, position 1)
3. Proposal (#FF9800, position 2)
4. Negotiation (#9C27B0, position 3)
5. Closed Won (#4CAF50, position 4, is_won=1)
6. Closed Lost (#F44336, position 5, is_lost=1)

### tasks

| Column      | Type    | Constraints               | Notes                   |
| ----------- | ------- | ------------------------- | ----------------------- |
| id          | TEXT    | PRIMARY KEY               | UUID v4                 |
| title       | TEXT    | NOT NULL                  |                         |
| description | TEXT    |                           |                         |
| status      | TEXT    | NOT NULL DEFAULT 'todo'   | todo, in_progress, done |
| priority    | TEXT    | NOT NULL DEFAULT 'medium' | low, medium, high       |
| due_date    | TEXT    |                           | ISO 8601 date           |
| client_id   | TEXT    | FK → clients.id           | Optional link           |
| deal_id     | TEXT    | FK → deals.id             | Optional link           |
| created_at  | TEXT    | NOT NULL                  |                         |
| updated_at  | TEXT    | NOT NULL                  |                         |
| synced_at   | TEXT    |                           |                         |
| is_deleted  | INTEGER | DEFAULT 0                 |                         |

### call_logs

| Column           | Type    | Constraints               | Notes                                         |
| ---------------- | ------- | ------------------------- | --------------------------------------------- |
| id               | TEXT    | PRIMARY KEY               | UUID v4                                       |
| client_id        | TEXT    | NOT NULL, FK → clients.id |                                               |
| deal_id          | TEXT    | FK → deals.id             | Optional link                                 |
| duration_seconds | INTEGER | DEFAULT 0                 |                                               |
| outcome          | TEXT    | NOT NULL                  | connected, voicemail, no_answer, left_message |
| notes            | TEXT    |                           |                                               |
| called_at        | TEXT    | NOT NULL                  | ISO 8601 timestamp                            |
| created_at       | TEXT    | NOT NULL                  |                                               |
| synced_at        | TEXT    |                           |                                               |
| is_deleted       | INTEGER | DEFAULT 0                 |                                               |

### notes

| Column     | Type    | Constraints     | Notes         |
| ---------- | ------- | --------------- | ------------- |
| id         | TEXT    | PRIMARY KEY     | UUID v4       |
| content    | TEXT    | NOT NULL        | Note body     |
| client_id  | TEXT    | FK → clients.id | Optional link |
| deal_id    | TEXT    | FK → deals.id   | Optional link |
| created_at | TEXT    | NOT NULL        |               |
| updated_at | TEXT    | NOT NULL        |               |
| synced_at  | TEXT    |                 |               |
| is_deleted | INTEGER | DEFAULT 0       |               |

### meetings

| Column     | Type    | Constraints     | Notes              |
| ---------- | ------- | --------------- | ------------------ |
| id         | TEXT    | PRIMARY KEY     | UUID v4            |
| title      | TEXT    | NOT NULL        |                    |
| client_id  | TEXT    | FK → clients.id | Optional link      |
| deal_id    | TEXT    | FK → deals.id   | Optional link      |
| location   | TEXT    |                 |                    |
| starts_at  | TEXT    | NOT NULL        | ISO 8601 timestamp |
| ends_at    | TEXT    | NOT NULL        | ISO 8601 timestamp |
| notes      | TEXT    |                 |                    |
| created_at | TEXT    | NOT NULL        |                    |
| updated_at | TEXT    | NOT NULL        |                    |
| synced_at  | TEXT    |                 |                    |
| is_deleted | INTEGER | DEFAULT 0       |                    |

### search_history

| Column      | Type | Constraints | Notes              |
| ----------- | ---- | ----------- | ------------------ |
| id          | TEXT | PRIMARY KEY | UUID v4            |
| query       | TEXT | NOT NULL    | Search text        |
| searched_at | TEXT | NOT NULL    | ISO 8601 timestamp |

---

## SQLite Indexes

```sql
CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_company ON clients(company);
CREATE INDEX idx_clients_is_favorite ON clients(is_favorite);
CREATE INDEX idx_clients_is_deleted ON clients(is_deleted);

CREATE INDEX idx_deals_client_id ON deals(client_id);
CREATE INDEX idx_deals_stage_id ON deals(stage_id);
CREATE INDEX idx_deals_is_deleted ON deals(is_deleted);

CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_client_id ON tasks(client_id);
CREATE INDEX idx_tasks_deal_id ON tasks(deal_id);
CREATE INDEX idx_tasks_is_deleted ON tasks(is_deleted);

CREATE INDEX idx_call_logs_client_id ON call_logs(client_id);
CREATE INDEX idx_call_logs_called_at ON call_logs(called_at);
CREATE INDEX idx_call_logs_is_deleted ON call_logs(is_deleted);

CREATE INDEX idx_notes_client_id ON notes(client_id);
CREATE INDEX idx_notes_deal_id ON notes(deal_id);
CREATE INDEX idx_notes_is_deleted ON notes(is_deleted);

CREATE INDEX idx_meetings_client_id ON meetings(client_id);
CREATE INDEX idx_meetings_starts_at ON meetings(starts_at);
CREATE INDEX idx_meetings_is_deleted ON meetings(is_deleted);
```

---

## Entity Relationship Diagram

```
┌──────────────┐
│   clients    │
│──────────────│
│ id (PK)      │
│ name         │
│ email        │
│ phone        │
│ company      │
│ ...          │
└──────┬───────┘
       │ 1:N
       ├─────────────────────┐─────────────────┐──────────────────┐──────────────────┐
       ▼                     ▼                  ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│    deals     │  │    tasks     │  │  call_logs   │  │    notes     │  │   meetings   │
│──────────────│  │──────────────│  │──────────────│  │──────────────│  │──────────────│
│ id (PK)      │  │ id (PK)      │  │ id (PK)      │  │ id (PK)      │  │ id (PK)      │
│ client_id(FK)│  │ client_id(FK)│  │ client_id(FK)│  │ client_id(FK)│  │ client_id(FK)│
│ stage_id(FK) │  │ deal_id (FK) │  │ deal_id (FK) │  │ deal_id (FK) │  │ deal_id (FK) │
│ title        │  │ title        │  │ duration     │  │ content      │  │ title        │
│ value        │  │ status       │  │ outcome      │  │ ...          │  │ starts_at    │
│ ...          │  │ ...          │  │ ...          │  │              │  │ ...          │
└──────┬───────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
       │ N:1
       ▼
┌────────────────┐
│pipeline_stages │
│────────────────│
│ id (PK)        │
│ name           │
│ position       │
│ color          │
│ is_won         │
│ is_lost        │
└────────────────┘
```

**Key relationships**:

- A **client** has many deals, tasks, call_logs, notes, meetings
- A **deal** belongs to one client and one pipeline_stage
- **Tasks**, **notes**, and **meetings** optionally link to both a client and a deal
- **Call logs** require a client and optionally link to a deal
- **Pipeline stages** are a reference table with seed data
- All entities use soft delete (`is_deleted`) for sync support
- All entities track `synced_at` for offline-first sync tracking
