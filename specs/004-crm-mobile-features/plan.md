# Implementation Plan: CRM Mobile Features & Navigation Architecture

**Branch**: `004-crm-mobile-features` | **Date**: 2026-03-25 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/004-crm-mobile-features/spec.md`

## Summary

This plan defines the full mobile feature set for the CRM application, organized as a hierarchy of **epics → stories** with a navigation-first approach. The app uses a 5-tab bottom navigation (Dashboard, Clients, Deals, Activities, More) with nested stack navigators per tab, following patterns from leading CRM apps (HubSpot, Pipedrive, Salesforce). Auth and payment features are explicitly excluded.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React Native 0.82, React Navigation 6 (bottom-tabs + native-stack), Redux Toolkit 2.x + RTK Query, React Native Paper 5.x  
**Storage**: SQLite (mobile, offline-first) + PostgreSQL (backend, via Prisma 7)  
**Testing**: Jest, React Native Testing Library  
**Target Platform**: iOS 15+ (primary), Android 10+ (MVP)  
**Project Type**: Mobile + API  
**Performance Goals**: 60 fps scroll, <100ms tab switch, <50ms SQLite ops, <300ms local search  
**Constraints**: Offline-first (NON-NEGOTIABLE), no auth/payments in this scope  
**Scale/Scope**: ~30 screens, 7 entities, 8 epics

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                         | Status  | Notes                                                                                           |
| --------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| I. Offline-First (NON-NEGOTIABLE) | ✅ PASS | All CRUD screens use SQLite with background sync. Offline banner shows connectivity status.     |
| II. Mobile-First Design           | ✅ PASS | Entire plan is mobile-only. Touch-optimized (44px targets), FAB patterns, swipe actions.        |
| III. Integration-Ready            | ✅ PASS | RTK Query base API ready for backend endpoints. Modular store slices per feature.               |
| IV. Test-First (NON-NEGOTIABLE)   | ✅ PASS | Each story includes testable acceptance criteria. Tests written before implementation.          |
| V. Data Integrity & Security      | ✅ PASS | Audit fields (created_at, updated_at) on all entities. Sync conflict resolution via timestamps. |
| VI. Performance & Scalability     | ✅ PASS | FlatList pagination, SQLite indexes, memoization. Targets defined per constitution.             |
| VII. Simplicity & Maintainability | ✅ PASS | YAGNI applied — no AI/voice/maps in v1. Consistent patterns across all screens.                 |

**GATE STATUS**: ✅ **PASS**

---

## Navigation Architecture

```
Root Navigator (Stack)
│
└── MainTabNavigator (Bottom Tabs — 5 tabs)
    │
    ├── 🏠 Dashboard Tab → DashboardStack
    │   ├── DashboardScreen           (summary cards, agenda, activity feed, FAB)
    │   └── NotificationListScreen    (all notifications)
    │
    ├── 👥 Clients Tab → ClientsStack
    │   ├── ClientListScreen          (search, filter, FlatList, FAB)
    │   ├── ClientDetailScreen        (segmented: Info | Notes | Deals | Activity)
    │   └── ClientFormScreen          (mode: create | edit)
    │
    ├── 💼 Deals Tab → DealsStack
    │   ├── DealPipelineScreen        (Kanban board, toggle to list)
    │   ├── DealDetailScreen          (deal info, linked client, activities)
    │   └── DealFormScreen            (mode: create | edit, client picker)
    │
    ├── ✅ Activities Tab → ActivitiesStack
    │   ├── ActivityListScreen        (all types, filterable)
    │   ├── TaskBoardScreen           (Kanban: To Do | In Progress | Done)
    │   ├── TaskFormScreen            (create/edit task)
    │   ├── CallLogFormScreen         (log a call)
    │   ├── NoteFormScreen            (create/edit note)
    │   ├── MeetingFormScreen         (create/edit meeting)
    │   └── CalendarScreen            (month view + day detail)
    │
    └── ⋯ More Tab → MoreStack
        ├── MoreMenuScreen            (section links)
        ├── ReportsHubScreen          (report cards)
        ├── PipelineReportScreen      (deal charts)
        ├── ActivityReportScreen      (activity charts)
        ├── ClientReportScreen        (client metrics)
        ├── SettingsScreen            (preferences, sync, cache)
        ├── ProfileScreen             (user info display)
        └── AboutScreen               (version, licenses)

Global (Modal, presented over tabs):
├── GlobalSearchScreen               (search clients, deals, activities)
└── QuickActionSheet                 (New Client, New Deal, Log Call, New Task)
```

**Total screens**: ~27 unique screens + 2 global modals

---

## Epics & Stories

### Epic 1: Navigation Shell & App Structure

> Foundation epic. Sets up the tab bar, stack navigators, type-safe navigation params, and cross-cutting UI patterns. Every subsequent epic depends on this.

| #   | Story                                                                                                                                                                                                                                                     | Screen(s)          | Priority | Depends On         |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- | ------------------ |
| 1.1 | **Bottom Tab Navigator Setup** — Install `@react-navigation/bottom-tabs`, create `MainTabNavigator` with 5 tabs (Dashboard, Clients, Deals, Activities, More). Add Material Community Icons for each tab. Style active/inactive states with theme colors. | MainTabNavigator   | P0       | 003-app-foundation |
| 1.2 | **Stack Navigators per Tab** — Create 5 stack navigator components (`DashboardStack`, `ClientsStack`, `DealsStack`, `ActivitiesStack`, `MoreStack`) with placeholder root screens. Each stack uses `native-stack` for native transitions.                 | All stacks         | P0       | 1.1                |
| 1.3 | **Navigation TypeScript Types** — Define `RootTabParamList`, per-stack param lists (`DashboardStackParamList`, `ClientsStackParamList`, etc.), and typed navigation hooks (`useAppNavigation`).                                                           | types/             | P0       | 1.2                |
| 1.4 | **Global Search Modal** — Create `GlobalSearchScreen` as a modal presented over tabs. Add a search icon button to the default header. Pressing it opens the modal with a search input and categorized results placeholder.                                | GlobalSearchScreen | P1       | 1.2                |
| 1.5 | **Quick Action Sheet** — Create a `QuickActionSheet` (bottom sheet) accessible from the Dashboard FAB. Options: New Client, New Deal, Log Call, New Task. Each option navigates to the appropriate form screen.                                           | QuickActionSheet   | P1       | 1.2                |
| 1.6 | **Offline Indicator Banner** — Create a reusable `OfflineBanner` component using `@react-native-community/netinfo`. Shows a sticky yellow/red bar at the top when offline. Hides with animation when back online.                                         | App-wide           | P1       | 1.1                |
| 1.7 | **Empty State Component** — Create a reusable `EmptyState` component with illustration placeholder, title, description, and optional CTA button. Used across all list screens.                                                                            | Shared component   | P1       | —                  |
| 1.8 | **Loading Skeleton Component** — Create reusable skeleton placeholder components (card skeleton, list-item skeleton) for loading states.                                                                                                                  | Shared component   | P2       | —                  |

---

### Epic 2: Dashboard & Home

> The app's landing screen. Provides at-a-glance metrics, today's agenda, and entry points to all major flows via quick actions.

| #   | Story                                                                                                                                                                                                                                                                    | Screen(s)       | Priority | Depends On          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- | -------- | ------------------- |
| 2.1 | **Dashboard Screen Layout** — Create `DashboardScreen` with a scrollable layout containing: summary cards row (Total Clients, Active Deals, Pipeline Value, Open Tasks), today's agenda section, recent activity feed section. Use React Native Paper `Card` components. | DashboardScreen | P1       | 1.2                 |
| 2.2 | **Summary Metric Cards** — Implement 4 summary cards at the top of the dashboard. Each card shows an icon, label, and value. Data sourced from SQLite aggregate queries. Cards are tappable and navigate to the relevant tab.                                            | DashboardScreen | P1       | 2.1, Epic 3+ (data) |
| 2.3 | **Today's Agenda Section** — Show tasks due today and upcoming meetings in a vertical list below summary cards. Each item shows time, title, and linked client. Tapping navigates to the task/meeting detail.                                                            | DashboardScreen | P1       | 2.1, Epic 5         |
| 2.4 | **Recent Activity Feed** — Show last 10 activities (calls, notes, deal stage changes, new clients) in a timeline-style list. Each entry shows icon, description, timestamp, and linked entity.                                                                           | DashboardScreen | P2       | 2.1, Epic 6         |
| 2.5 | **Dashboard FAB with Quick Actions** — Add a FAB.Group to the dashboard that expands to show: New Client, New Deal, Log Call, New Task. Each action navigates to the corresponding form screen in the appropriate tab's stack.                                           | DashboardScreen | P1       | 2.1, 1.5            |
| 2.6 | **Dashboard Pull-to-Refresh** — Add `RefreshControl` to the dashboard scroll view. Refreshing re-queries SQLite for latest metrics and triggers a background sync if online.                                                                                             | DashboardScreen | P2       | 2.1                 |
| 2.7 | **Dashboard Empty State** — When no CRM data exists, show a welcome illustration with "Get started by adding your first client" message and a prominent "Add Client" button.                                                                                             | DashboardScreen | P1       | 2.1, 1.7            |

---

### Epic 3: Client/Contact Management

> Core CRM functionality. CRUD operations for client records with search, filtering, detail view with segmented sections, and offline support.

| #    | Story                                                                                                                                                                                                                                                                   | Screen(s)          | Priority | Depends On  |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- | ----------- |
| 3.1  | **Client List Screen** — Create `ClientListScreen` with a `FlatList` of client rows. Each row shows avatar (initials fallback), name, company, and last activity date. Add a `Searchbar` at the top and a FAB for "New Client".                                         | ClientListScreen   | P1       | 1.2         |
| 3.2  | **Client List Search & Filter** — Implement real-time search filtering on client name, email, phone, and company. Add filter chips for: All, Favorites, Recent. Search queries SQLite with `LIKE` operator.                                                             | ClientListScreen   | P1       | 3.1         |
| 3.3  | **Client List Swipe Actions** — Add swipe-right to favorite/unfavorite and swipe-left to reveal call/delete actions on each client row. Use `react-native-gesture-handler` Swipeable.                                                                                   | ClientListScreen   | P2       | 3.1         |
| 3.4  | **Client List Pagination & Performance** — Implement infinite scroll with 20-item pages. Use `getItemLayout` for fixed-height rows. Memoize list items with `React.memo`.                                                                                               | ClientListScreen   | P2       | 3.1         |
| 3.5  | **Client Detail Screen — Header & Segmented Tabs** — Create `ClientDetailScreen` with a profile header (avatar, name, company, phone, email) and a segmented tab bar with 4 sections: Info, Notes, Deals, Activity. Use Material Top Tabs or custom `SegmentedButtons`. | ClientDetailScreen | P1       | 1.2         |
| 3.6  | **Client Detail — Info Tab** — Show all client fields in a structured layout: phone (tappable → call), email (tappable → mail), company, address, tags, created date. Include an "Edit" button in the header.                                                           | ClientDetailScreen | P1       | 3.5         |
| 3.7  | **Client Detail — Notes Tab** — Show client notes in a reverse-chronological list. Each note shows content preview, date, and expand/collapse. Add "New Note" button that opens `NoteFormScreen` pre-linked to this client.                                             | ClientDetailScreen | P1       | 3.5, 5.8    |
| 3.8  | **Client Detail — Deals Tab** — List deals associated with this client. Each deal shows title, value, stage badge, and expected close date. Tapping a deal navigates to `DealDetailScreen`.                                                                             | ClientDetailScreen | P1       | 3.5, Epic 4 |
| 3.9  | **Client Detail — Activity Tab** — Show unified timeline of all interactions with this client (calls, notes, meetings, tasks, deal stage changes) in reverse chronological order with type icons.                                                                       | ClientDetailScreen | P2       | 3.5, Epic 6 |
| 3.10 | **Client Create/Edit Form** — Create `ClientFormScreen` accepting a `mode` param (create/edit) and optional `clientId`. Fields: name (required), email, phone, company, address, notes. Validate required fields. Save to SQLite on submit.                             | ClientFormScreen   | P1       | 1.2         |
| 3.11 | **Client Click-to-Call & Click-to-Email** — On client detail, tapping phone number opens the phone dialer via `Linking.openURL('tel:...')`. Tapping email opens the mail app via `Linking.openURL('mailto:...')`.                                                       | ClientDetailScreen | P2       | 3.6         |
| 3.12 | **Client SQLite Storage & RTK Query** — Create SQLite migration for `clients` table. Create Redux slice for client state. Create RTK Query endpoints for client CRUD (backend). Implement offline-first: write to SQLite immediately, sync via RTK Query when online.   | Store/Database     | P1       | 3.1         |
| 3.13 | **Client List Empty State** — When no clients exist, show "No clients yet" illustration with "Add your first client" button. When search returns no results, show "No clients match your search" with clear-search button.                                              | ClientListScreen   | P1       | 3.1, 1.7    |

---

### Epic 4: Deal/Pipeline Management

> Visual sales pipeline with Kanban board and list views. Deals are linked to clients and tracked through configurable stages.

| #   | Story                                                                                                                                                                                                                                                                                      | Screen(s)          | Priority | Depends On |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | -------- | ---------- |
| 4.1 | **Deal Pipeline Kanban Board** — Create `DealPipelineScreen` showing a horizontally scrollable Kanban board. Each column represents a pipeline stage (Lead → Qualified → Proposal → Negotiation → Closed Won / Closed Lost). Deal cards show title, value, client name, and days in stage. | DealPipelineScreen | P1       | 1.2        |
| 4.2 | **Deal Kanban Drag-and-Drop** — Implement drag-and-drop on deal cards to move between stage columns. Long-press activates drag. Dropping on a new column updates the deal's stage in SQLite. Provide haptic feedback on drop.                                                              | DealPipelineScreen | P1       | 4.1        |
| 4.3 | **Deal Pipeline/List View Toggle** — Add a segmented toggle (Board / List) at the top of the deals screen. List view shows deals in a sortable `FlatList` with columns: deal title, value, stage, client, expected close date.                                                             | DealPipelineScreen | P2       | 4.1        |
| 4.4 | **Deal Detail Screen** — Create `DealDetailScreen` showing: deal title, value (large), stage badge with progress indicator, probability %, expected close date, linked client (tappable → client detail), notes, and activity log.                                                         | DealDetailScreen   | P1       | 1.2        |
| 4.5 | **Deal Create/Edit Form** — Create `DealFormScreen` with fields: title (required), value, stage (picker from pipeline stages), probability, expected close date (date picker), client (searchable picker — required), notes. Save to SQLite.                                               | DealFormScreen     | P1       | 1.2, 3.12  |
| 4.6 | **Deal Filters** — On the pipeline/list screen, add filter options: by stage, by value range, by client, by expected close date range. Filters persist within the session.                                                                                                                 | DealPipelineScreen | P2       | 4.1        |
| 4.7 | **Pipeline Stage Configuration** — Create a `pipeline_stages` SQLite table with default stages. Allow reordering stages in settings. Stages have: name, position, color, is_won flag, is_lost flag.                                                                                        | Database/Settings  | P2       | 4.1        |
| 4.8 | **Deal SQLite Storage & RTK Query** — Create SQLite migration for `deals` and `pipeline_stages` tables. Create Redux slice and RTK Query endpoints. Implement offline-first CRUD with background sync.                                                                                     | Store/Database     | P1       | 4.1        |
| 4.9 | **Deal Pipeline Empty State** — When no deals exist, show "No deals in your pipeline" with illustration and "Create your first deal" button. Empty columns show "No deals at this stage" hint.                                                                                             | DealPipelineScreen | P1       | 4.1, 1.7   |

---

### Epic 5: Activity & Task Management

> Consolidated activity management covering tasks, calls, notes, and meetings. Multiple views: list, Kanban board, calendar.

| #    | Story                                                                                                                                                                                                                                                                        | Screen(s)                           | Priority | Depends On |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------- | ---------- |
| 5.1  | **Activity List Screen** — Create `ActivityListScreen` showing all activities in a reverse-chronological `FlatList`. Each row shows: type icon (task/call/note/meeting), title/summary, linked client name, date/time. Add filter chips: All, Tasks, Calls, Notes, Meetings. | ActivityListScreen                  | P1       | 1.2        |
| 5.2  | **Activity List Filters & Sorting** — Implement filter by type (multi-select chips), date range picker, and linked client. Add sort options: newest first, oldest first, due date. Filters query SQLite with combined WHERE clauses.                                         | ActivityListScreen                  | P1       | 5.1        |
| 5.3  | **Task Kanban Board** — Create `TaskBoardScreen` with 3 columns: To Do, In Progress, Done. Task cards show title, due date, priority indicator (color), and linked client. Support drag-and-drop between columns.                                                            | TaskBoardScreen                     | P1       | 1.2        |
| 5.4  | **Task Create/Edit Form** — Create `TaskFormScreen` with fields: title (required), description, status (To Do/In Progress/Done), priority (Low/Medium/High), due date (date picker), linked client (picker), linked deal (picker).                                           | TaskFormScreen                      | P1       | 1.2        |
| 5.5  | **Task Detail Screen** — Show task details: title, description, status badge, priority badge, due date (with overdue indicator if past), linked client (tappable), linked deal (tappable), created/updated timestamps. Include "Edit" and "Mark Complete" actions.           | TaskDetailScreen                    | P1       | 5.4        |
| 5.6  | **Call Log Form** — Create `CallLogFormScreen` with fields: client (searchable picker, required), duration (minutes input or timer), outcome (Connected / Voicemail / No Answer / Left Message), deal (optional picker), notes.                                              | CallLogFormScreen                   | P1       | 1.2        |
| 5.7  | **Note Form** — Create `NoteFormScreen` with fields: content (multiline text, required), linked client (picker), linked deal (picker). Auto-save draft to prevent data loss.                                                                                                 | NoteFormScreen                      | P1       | 1.2        |
| 5.8  | **Meeting Form** — Create `MeetingFormScreen` with fields: title (required), linked client (picker), linked deal (picker), location, start date/time, end date/time, notes.                                                                                                  | MeetingFormScreen                   | P2       | 1.2        |
| 5.9  | **Calendar View** — Create `CalendarScreen` with a month view showing dot indicators on days with activities. Tapping a day shows that day's activities in a list below the calendar. Use a lightweight calendar library or custom implementation.                           | CalendarScreen                      | P2       | 5.1        |
| 5.10 | **Overdue Task Indicators** — In activity list and task board, highlight overdue tasks with red border/badge. Show overdue count in Dashboard summary card. Sort overdue tasks to the top by default.                                                                        | ActivityListScreen, TaskBoardScreen | P2       | 5.1, 5.3   |
| 5.11 | **Activity SQLite Storage & RTK Query** — Create SQLite migrations for `tasks`, `call_logs`, `notes`, `meetings` tables. Create Redux slices and RTK Query endpoints for each. Implement offline-first CRUD.                                                                 | Store/Database                      | P1       | 5.1        |
| 5.12 | **Activity List Empty State** — Type-specific empty states: "No activities yet", "No tasks — create one to get organized", "No calls logged — tap + to log your first call".                                                                                                 | ActivityListScreen                  | P1       | 5.1, 1.7   |

---

### Epic 6: Communication & Interaction History

> Unified timeline of client interactions. Cross-references activities from Epic 5 into per-client and per-deal timelines.

| #   | Story                                                                                                                                                                                                                                               | Screen(s)                            | Priority | Depends On |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- | ---------- |
| 6.1 | **Client Interaction Timeline Component** — Create a reusable `InteractionTimeline` component that shows a vertical timeline of activities (calls, notes, meetings, tasks, deal stage changes) with type-specific icons, timestamps, and summaries. | Shared component                     | P2       | Epic 5     |
| 6.2 | **Client Activity Tab Integration** — Wire `InteractionTimeline` into `ClientDetailScreen`'s Activity tab. Query all activities linked to the current client from SQLite, sorted reverse-chronological.                                             | ClientDetailScreen                   | P2       | 6.1, 3.9   |
| 6.3 | **Deal Activity Log** — On `DealDetailScreen`, show an interaction timeline filtered to activities linked to the current deal. Include deal stage change events as timeline entries.                                                                | DealDetailScreen                     | P2       | 6.1, 4.4   |
| 6.4 | **Quick Note from Timeline** — In any interaction timeline, add a "Quick Note" input at the top. Typing and submitting creates a note linked to the current client/deal without navigating to the full note form.                                   | InteractionTimeline                  | P3       | 6.1        |
| 6.5 | **Communication Counts per Client** — Show communication summary badges on client list rows and client detail header: total calls, notes, meetings. Query from SQLite with COUNT aggregates.                                                        | ClientListScreen, ClientDetailScreen | P3       | 6.1, 3.1   |

---

### Epic 7: Reports & Analytics

> Basic reporting screens with charts for pipeline health, activity volume, and client metrics.

| #   | Story                                                                                                                                                                                                                            | Screen(s)            | Priority | Depends On  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- | ----------- |
| 7.1 | **Reports Hub Screen** — Create `ReportsHubScreen` accessible from More tab. Show report cards: Pipeline Report, Activity Report, Client Report. Each card shows a preview metric and taps through to the full report.           | ReportsHubScreen     | P2       | 1.2         |
| 7.2 | **Pipeline Report** — Create `PipelineReportScreen` with: bar chart of deal values by stage, deal count by stage, total pipeline value, win/loss ratio, average deal size. Time period filter (this week, month, quarter, year). | PipelineReportScreen | P2       | 7.1, Epic 4 |
| 7.3 | **Activity Report** — Create `ActivityReportScreen` with: stacked bar chart of activity counts by type per week/month, total calls/notes/meetings/tasks counts, trend indicators (up/down vs previous period).                   | ActivityReportScreen | P2       | 7.1, Epic 5 |
| 7.4 | **Client Report** — Create `ClientReportScreen` with: new clients over time, clients by source/tag, most active clients (by interaction count). Simple list + bar chart format.                                                  | ClientReportScreen   | P3       | 7.1, Epic 3 |
| 7.5 | **Report Data Export** — Add "Export CSV" button to each report screen. Generates a CSV file from SQLite data and shares via the device share sheet (`react-native-share`).                                                      | All report screens   | P3       | 7.2, 7.3    |

---

### Epic 8: Global Search & Cross-Cutting Features

> Features that span the entire app: search, settings, profile, sync management.

| #   | Story                                                                                                                                                                                                                                                                                  | Screen(s)          | Priority | Depends On     |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- | -------------- |
| 8.1 | **Global Search Screen** — Create `GlobalSearchScreen` (modal). Shows search input with recent searches. As user types, queries SQLite across clients, deals, tasks, notes. Results grouped by type with section headers. Tapping a result navigates to the appropriate detail screen. | GlobalSearchScreen | P2       | 1.4, Epics 3-5 |
| 8.2 | **Global Search Recent & Suggestions** — Persist recent searches in SQLite (last 10). Show recent searches when the search field is empty. Clear individual or all recent searches.                                                                                                    | GlobalSearchScreen | P3       | 8.1            |
| 8.3 | **Settings Screen** — Create `SettingsScreen` with sections: Preferences (theme toggle, notification preferences), Data & Sync (last sync time, pending changes count, "Sync Now" button), Storage (cache size, "Clear Cache").                                                        | SettingsScreen     | P2       | 1.2            |
| 8.4 | **Sync Status Screen** — Create `SyncStatusScreen` showing: sync queue (pending operations), last sync timestamp, sync error log, manual sync trigger. Accessible from Settings.                                                                                                       | SyncStatusScreen   | P2       | 8.3            |
| 8.5 | **Profile Screen** — Create `ProfileScreen` showing user info display (name, email, role). Read-only for now (editing requires auth scope).                                                                                                                                            | ProfileScreen      | P3       | 1.2            |
| 8.6 | **About Screen** — Create `AboutScreen` showing app version, build number, open source licenses link, and support contact.                                                                                                                                                             | AboutScreen        | P3       | 1.2            |
| 8.7 | **Standardized Pull-to-Refresh** — Implement a consistent pull-to-refresh pattern across all list screens. Refreshing triggers: (1) re-query SQLite, (2) background sync if online. Use theme-colored refresh indicator.                                                               | All list screens   | P2       | 1.1            |

---

## Epic Dependency Map

```
Epic 1: Navigation Shell ←── Foundation (all other epics depend on this)
    │
    ├── Epic 2: Dashboard (depends on Epics 3-5 for data)
    │
    ├── Epic 3: Client Management ←── Core entity
    │       │
    │       ├── Epic 4: Deal Management (deals link to clients)
    │       │
    │       └── Epic 5: Activity Management (activities link to clients & deals)
    │               │
    │               └── Epic 6: Communication History (aggregates from Epic 5)
    │
    ├── Epic 7: Reports (depends on Epics 3-5 for data)
    │
    └── Epic 8: Global Search & Settings (depends on Epics 3-5 for searchable data)
```

## Recommended Implementation Order

| Phase       | Epics                                               | Rationale                                            |
| ----------- | --------------------------------------------------- | ---------------------------------------------------- |
| **Phase A** | Epic 1 (Navigation Shell)                           | Foundation — unblocks all other work                 |
| **Phase B** | Epic 3 (Clients)                                    | Core entity — Deals and Activities reference clients |
| **Phase C** | Epic 4 (Deals) + Epic 5 (Activities)                | Can be developed in parallel once clients exist      |
| **Phase D** | Epic 2 (Dashboard) + Epic 6 (Communication History) | Aggregates data from Phases B & C                    |
| **Phase E** | Epic 7 (Reports) + Epic 8 (Search & Settings)       | Polish features built on top of complete data        |

## Story Count Summary

| Epic                     | Stories | P0    | P1     | P2     | P3     |
| ------------------------ | ------- | ----- | ------ | ------ | ------ |
| 1. Navigation Shell      | 8       | 3     | 3      | 1      | 1      |
| 2. Dashboard             | 7       | —     | 4      | 2      | 1      |
| 3. Client Management     | 13      | —     | 8      | 3      | 2      |
| 4. Deal Management       | 9       | —     | 5      | 3      | 1      |
| 5. Activity Management   | 12      | —     | 7      | 4      | 1      |
| 6. Communication History | 5       | —     | —      | 3      | 2      |
| 7. Reports & Analytics   | 5       | —     | —      | 3      | 2      |
| 8. Search & Settings     | 7       | —     | —      | 4      | 3      |
| **Total**                | **66**  | **3** | **27** | **23** | **13** |

## Project Structure

### Documentation (this feature)

```text
specs/004-crm-mobile-features/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research findings
├── data-model.md        # Navigation types & screen data model
├── quickstart.md        # Development setup guide
└── tasks.md             # Generated by /speckit.tasks (not yet created)
```

### Source Code (planned structure)

```text
mobile/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx           # Root: Auth check → MainTabNavigator
│   │   ├── MainTabNavigator.tsx       # Bottom tabs (5 tabs)
│   │   ├── stacks/
│   │   │   ├── DashboardStack.tsx
│   │   │   ├── ClientsStack.tsx
│   │   │   ├── DealsStack.tsx
│   │   │   ├── ActivitiesStack.tsx
│   │   │   └── MoreStack.tsx
│   │   └── types.ts                   # All navigation param types
│   │
│   ├── screens/
│   │   ├── dashboard/
│   │   │   ├── DashboardScreen.tsx
│   │   │   └── NotificationListScreen.tsx
│   │   ├── clients/
│   │   │   ├── ClientListScreen.tsx
│   │   │   ├── ClientDetailScreen.tsx
│   │   │   └── ClientFormScreen.tsx
│   │   ├── deals/
│   │   │   ├── DealPipelineScreen.tsx
│   │   │   ├── DealDetailScreen.tsx
│   │   │   └── DealFormScreen.tsx
│   │   ├── activities/
│   │   │   ├── ActivityListScreen.tsx
│   │   │   ├── TaskBoardScreen.tsx
│   │   │   ├── TaskFormScreen.tsx
│   │   │   ├── CallLogFormScreen.tsx
│   │   │   ├── NoteFormScreen.tsx
│   │   │   ├── MeetingFormScreen.tsx
│   │   │   └── CalendarScreen.tsx
│   │   ├── more/
│   │   │   ├── MoreMenuScreen.tsx
│   │   │   ├── ReportsHubScreen.tsx
│   │   │   ├── PipelineReportScreen.tsx
│   │   │   ├── ActivityReportScreen.tsx
│   │   │   ├── ClientReportScreen.tsx
│   │   │   ├── SettingsScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── AboutScreen.tsx
│   │   └── search/
│   │       └── GlobalSearchScreen.tsx
│   │
│   ├── components/
│   │   ├── EmptyState.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── OfflineBanner.tsx
│   │   ├── InteractionTimeline.tsx
│   │   ├── QuickActionSheet.tsx
│   │   ├── ClientPicker.tsx
│   │   ├── DealStageBadge.tsx
│   │   └── SummaryCard.tsx
│   │
│   ├── store/
│   │   ├── api/
│   │   │   ├── api.ts                 # Base RTK Query API (exists)
│   │   │   ├── clientsApi.ts          # Client CRUD endpoints
│   │   │   ├── dealsApi.ts            # Deal CRUD endpoints
│   │   │   ├── activitiesApi.ts       # Task/Call/Note/Meeting endpoints
│   │   │   └── reportsApi.ts          # Report aggregation endpoints
│   │   ├── slices/
│   │   │   ├── appSlice.ts            # App-wide state (exists)
│   │   │   ├── clientsSlice.ts        # Client UI state
│   │   │   ├── dealsSlice.ts          # Deal/pipeline UI state
│   │   │   ├── activitiesSlice.ts     # Activity UI state
│   │   │   └── searchSlice.ts         # Search state
│   │   └── store.ts                   # Store config (exists)
│   │
│   ├── database/
│   │   ├── database.ts                # SQLite service (exists)
│   │   ├── migrations/
│   │   │   ├── 002_create_clients.ts
│   │   │   ├── 003_create_deals.ts
│   │   │   ├── 004_create_pipeline_stages.ts
│   │   │   ├── 005_create_tasks.ts
│   │   │   ├── 006_create_call_logs.ts
│   │   │   ├── 007_create_notes.ts
│   │   │   ├── 008_create_meetings.ts
│   │   │   └── 009_create_search_history.ts
│   │   └── models/
│   │       ├── index.ts               # Exists
│   │       ├── client.ts
│   │       ├── deal.ts
│   │       ├── task.ts
│   │       ├── callLog.ts
│   │       ├── note.ts
│   │       └── meeting.ts
│   │
│   └── theme/
│       └── theme.ts                   # Exists
│
└── package.json
```

## Complexity Tracking

No constitution violations. Complexity is justified by CRM domain scope (66 stories), but each individual story follows simple, consistent patterns (list screen, detail screen, form screen, SQLite table, RTK Query endpoint). No over-engineering detected.
