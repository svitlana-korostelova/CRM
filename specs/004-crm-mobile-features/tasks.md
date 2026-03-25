# Tasks: CRM Mobile Features & Navigation Architecture

**Input**: Design documents from `/specs/004-crm-mobile-features/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md  
**Branch**: `004-crm-mobile-features`

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US9)
- All file paths relative to `mobile/src/` unless otherwise noted

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, create directory structure, configure shared types

- [ ] T001 Install `@react-navigation/bottom-tabs` and `@react-native-community/netinfo` in `mobile/package.json` and run `cd mobile/ios && pod install`
- [ ] T002 Create directory structure: `mobile/src/navigation/stacks/`, `mobile/src/screens/dashboard/`, `mobile/src/screens/clients/`, `mobile/src/screens/deals/`, `mobile/src/screens/activities/`, `mobile/src/screens/more/`, `mobile/src/screens/search/`, `mobile/src/components/`
- [ ] T003 [P] Create shared TypeScript types file at `mobile/src/navigation/types.ts` — define `RootStackParamList`, `RootTabParamList`, `DashboardStackParamList`, `ClientsStackParamList`, `DealsStackParamList`, `ActivitiesStackParamList`, `MoreStackParamList`, and shared enums (`ActivityType`, `FormMode`, `Priority`, `TaskStatus`, `CallOutcome`) per data-model.md
- [ ] T004 [P] Create database model types at `mobile/src/database/models/client.ts`, `mobile/src/database/models/deal.ts`, `mobile/src/database/models/task.ts`, `mobile/src/database/models/callLog.ts`, `mobile/src/database/models/note.ts`, `mobile/src/database/models/meeting.ts` — define TypeScript interfaces matching the SQLite schema in data-model.md, and re-export all from `mobile/src/database/models/index.ts`

**Checkpoint**: Dependencies installed, directories created, all TypeScript types defined

---

## Phase 2: US1 — App Navigation Shell (Priority: P0) — MVP

**Goal**: 5-tab bottom navigation with nested stack navigators, offline banner, and shared UI components. This unblocks ALL other user stories.

**Independent Test**: Launch the app → see 5 bottom tabs with icons and labels → tap each tab → each shows its placeholder root screen → switch tabs → previous tab preserves state → tap active tab → resets to root

### Navigation Core

- [ ] T005 [US1] Create `MainTabNavigator.tsx` in `mobile/src/navigation/` — Bottom tab navigator with 5 tabs (Dashboard, Clients, Deals, Activities, More) using Material Community Icons (`home`, `account-group`, `handshake`, `calendar-check`, `dots-horizontal`). Style active/inactive states with theme colors from `mobile/src/theme/theme.ts`
- [ ] T006 [US1] Create placeholder `DashboardScreen.tsx` in `mobile/src/screens/dashboard/` — minimal screen with `<Text>Dashboard</Text>` centered, typed with `NativeStackScreenProps<DashboardStackParamList, 'Dashboard'>`
- [ ] T007 [P] [US1] Create placeholder `ClientListScreen.tsx` in `mobile/src/screens/clients/` — minimal screen with `<Text>Clients</Text>` centered
- [ ] T008 [P] [US1] Create placeholder `DealPipelineScreen.tsx` in `mobile/src/screens/deals/` — minimal screen with `<Text>Deals</Text>` centered
- [ ] T009 [P] [US1] Create placeholder `ActivityListScreen.tsx` in `mobile/src/screens/activities/` — minimal screen with `<Text>Activities</Text>` centered
- [ ] T010 [P] [US1] Create placeholder `MoreMenuScreen.tsx` in `mobile/src/screens/more/` — minimal screen with `<Text>More</Text>` centered
- [ ] T011 [US1] Create `DashboardStack.tsx` in `mobile/src/navigation/stacks/` — native-stack navigator containing `DashboardScreen` as initial route. Use `DashboardStackParamList` types
- [ ] T012 [P] [US1] Create `ClientsStack.tsx` in `mobile/src/navigation/stacks/` — native-stack navigator with `ClientListScreen` as initial route. Use `ClientsStackParamList` types
- [ ] T013 [P] [US1] Create `DealsStack.tsx` in `mobile/src/navigation/stacks/` — native-stack navigator with `DealPipelineScreen` as initial route. Use `DealsStackParamList` types
- [ ] T014 [P] [US1] Create `ActivitiesStack.tsx` in `mobile/src/navigation/stacks/` — native-stack navigator with `ActivityListScreen` as initial route. Use `ActivitiesStackParamList` types
- [ ] T015 [P] [US1] Create `MoreStack.tsx` in `mobile/src/navigation/stacks/` — native-stack navigator with `MoreMenuScreen` as initial route. Use `MoreStackParamList` types
- [ ] T016 [US1] Update `AppNavigator.tsx` in `mobile/src/navigation/` — replace the existing single Home stack with `RootStackParamList` root stack containing `MainTabNavigator` as the `MainTabs` screen. Add `GlobalSearch` and `QuickAction` as modal screens (placeholder for now)

### Shared Components

- [ ] T017 [P] [US1] Create `EmptyState.tsx` in `mobile/src/components/` — reusable component accepting `title: string`, `description: string`, `icon?: string`, `actionLabel?: string`, `onAction?: () => void`. Uses React Native Paper `Text`, `Button`, and `Icon`
- [ ] T018 [P] [US1] Create `LoadingSkeleton.tsx` in `mobile/src/components/` — reusable skeleton components: `CardSkeleton`, `ListItemSkeleton`, `ScreenSkeleton`. Use animated `View` with pulsing opacity for loading placeholders
- [ ] T019 [P] [US1] Create `OfflineBanner.tsx` in `mobile/src/components/` — uses `@react-native-community/netinfo` `useNetInfo()` hook. When `isConnected === false`, show a sticky banner (yellow background, "You are offline" text) at the top with slide-in animation. Hides when back online
- [ ] T020 [US1] Integrate `OfflineBanner` into `mobile/App.tsx` — render `<OfflineBanner />` inside the `SafeAreaProvider`, above `NavigationContainer`, so it shows app-wide

**Checkpoint**: App launches with 5 working tabs, offline banner, empty state, and skeleton components ready. ALL subsequent phases unblocked.

---

## Phase 3: US3 — Client/Contact Management (Priority: P1)

**Goal**: Full CRUD for client records with search, detail view with segmented sections, and offline SQLite storage. Core entity — Deals and Activities reference clients.

**Independent Test**: Open Clients tab → see empty state → tap "Add Client" → fill form → save → client appears in list → tap client → see detail with Info tab → edit client → search by name → create offline → data persists on restart

### Data Layer

- [ ] T021 [US3] Create SQLite migration `002_create_clients` in `mobile/src/database/` — add migration to the existing `runMigrations()` system in `database.ts`. Create `clients` table with all columns from data-model.md (id, name, email, phone, company, address, avatar_url, notes, tags, is_favorite, created_at, updated_at, synced_at, is_deleted). Add indexes on `name`, `company`, `is_favorite`, `is_deleted`
- [ ] T022 [P] [US3] Create `clientsSlice.ts` in `mobile/src/store/slices/` — Redux slice for client UI state: `searchQuery`, `activeFilter` (all/favorites/recent), `selectedClientId`. Actions: `setSearchQuery`, `setActiveFilter`, `setSelectedClient`, `clearFilters`
- [ ] T023 [P] [US3] Create `clientsApi.ts` in `mobile/src/store/api/` — RTK Query endpoints using `api.injectEndpoints()`: `getClients` (query, providesTags: ['Client']), `getClient` (query by id), `createClient` (mutation, invalidatesTags), `updateClient` (mutation), `deleteClient` (mutation). Matches backend `/api/clients` contract
- [ ] T024 [US3] Register `clientsSlice` reducer in `mobile/src/store/store.ts` — add `clients: clientsReducer` to the store configuration

### Screens

- [ ] T025 [US3] Implement full `ClientListScreen.tsx` in `mobile/src/screens/clients/` — replace placeholder with: React Native Paper `Searchbar` at top, filter chips row (All, Favorites, Recent), `FlatList` of client rows. Each row shows avatar circle (initials fallback), name, company, last activity date. FAB button for "New Client" that navigates to `ClientForm` with mode `create`. Pull-to-refresh with `RefreshControl`. Load data from SQLite via `databaseService.select()`
- [ ] T026 [US3] Implement search and filter logic in `ClientListScreen.tsx` — wire `Searchbar` to filter clients by name/email/phone/company using SQLite `LIKE` queries. Wire filter chips to toggle between all clients, favorites only (`is_favorite = 1`), and recently updated (sorted by `updated_at` desc). Use `clientsSlice` actions for state
- [ ] T027 [US3] Implement `ClientDetailScreen.tsx` in `mobile/src/screens/clients/` — accepts `clientId` route param. Profile header section with avatar (large, initials fallback), client name, company. Below header: `SegmentedButtons` from React Native Paper with 4 segments: Info, Notes, Deals, Activity. Render the selected segment's content below. Add "Edit" icon button in header that navigates to `ClientForm` with mode `edit`
- [ ] T028 [US3] Implement Client Detail — Info tab content in `ClientDetailScreen.tsx` — structured layout showing: phone (tappable via `Linking.openURL('tel:...')`), email (tappable via `Linking.openURL('mailto:...')`), company, address, tags as `Chip` components, notes preview, created date. All fields from SQLite
- [ ] T029 [US3] Implement Client Detail — Notes tab content in `ClientDetailScreen.tsx` — reverse-chronological `FlatList` of notes linked to this client (query `notes` table by `client_id`). Each note row shows content preview (first 2 lines), date. "Add Note" button at top that navigates to `NoteForm` in Activities stack with `clientId` pre-set. Show empty state if no notes
- [ ] T030 [US3] Implement Client Detail — Deals tab content in `ClientDetailScreen.tsx` — `FlatList` of deals linked to this client (query `deals` table by `client_id`). Each deal row shows title, value formatted as currency, stage name as colored badge, expected close date. Tapping navigates to `DealDetail` in Deals stack. Show empty state if no deals
- [ ] T031 [US3] Implement `ClientFormScreen.tsx` in `mobile/src/screens/clients/` — accepts `mode` param (create/edit) and optional `clientId`. Form fields using React Native Paper `TextInput`: name (required, validated), email, phone (keyboardType: phone-pad), company, address, notes (multiline). On submit: generate UUID, set timestamps, insert/update via `databaseService`. Navigate back on success. Show validation errors inline
- [ ] T032 [US3] Register client screens in `ClientsStack.tsx` in `mobile/src/navigation/stacks/` — add `ClientDetail` and `ClientForm` screen entries to the stack navigator with proper `ClientsStackParamList` typing
- [ ] T033 [US3] Implement client list empty state in `ClientListScreen.tsx` — when no clients exist, show `EmptyState` component with icon `account-plus`, title "No clients yet", description "Add your first client to get started", action button "Add Client" that navigates to `ClientForm`. When search returns no results, show different empty state: "No clients match your search" with "Clear Search" button

### Enhancements

- [ ] T034 [US3] Implement swipe actions on client list rows in `ClientListScreen.tsx` — swipe-right reveals favorite/unfavorite toggle (star icon), swipe-left reveals call (phone icon) and delete (trash icon) actions. Favorite toggle updates `is_favorite` in SQLite. Delete sets `is_deleted = 1` (soft delete). Use `Swipeable` from `react-native-gesture-handler`
- [ ] T035 [US3] Implement client list pagination in `ClientListScreen.tsx` — load 20 clients per page using `LIMIT/OFFSET` in SQLite query. Implement `onEndReached` on `FlatList` to load next page. Use `getItemLayout` for fixed-height rows (72px). Memoize list items with `React.memo`

**Checkpoint**: Full client CRUD with search, segmented detail view, and offline persistence. Clients tab is independently usable.

---

## Phase 4: US4 — Deal/Pipeline Management (Priority: P1)

**Goal**: Visual Kanban pipeline board with drag-and-drop, deal CRUD linked to clients, list view toggle.

**Independent Test**: Open Deals tab → see empty pipeline → create a deal linked to a client → deal card appears in "Lead" column → drag card to "Qualified" → stage updates → toggle to list view → see deal in table → tap deal → see detail

**Depends on**: US3 data layer (clients must exist to link deals)

### Data Layer

- [ ] T036 [US4] Create SQLite migration `003_create_pipeline_stages` in `mobile/src/database/` — create `pipeline_stages` table (id, name, position, color, is_won, is_lost) per data-model.md. Seed default stages: Lead (#9E9E9E, pos 0), Qualified (#2196F3, pos 1), Proposal (#FF9800, pos 2), Negotiation (#9C27B0, pos 3), Closed Won (#4CAF50, pos 4, is_won=1), Closed Lost (#F44336, pos 5, is_lost=1)
- [ ] T037 [US4] Create SQLite migration `004_create_deals` in `mobile/src/database/` — create `deals` table with all columns from data-model.md (id, title, value, stage_id FK, probability, expected_close_date, client_id FK, notes, created_at, updated_at, synced_at, is_deleted). Add indexes on `client_id`, `stage_id`, `is_deleted`
- [ ] T038 [P] [US4] Create `dealsSlice.ts` in `mobile/src/store/slices/` — Redux slice for deal UI state: `viewMode` ('board' | 'list'), `activeFilters` (stage, client, value range, date range), `selectedDealId`. Actions: `setViewMode`, `setFilters`, `clearFilters`, `setSelectedDeal`
- [ ] T039 [P] [US4] Create `dealsApi.ts` in `mobile/src/store/api/` — RTK Query endpoints: `getDeals`, `getDeal`, `createDeal`, `updateDeal`, `deleteDeal`, `getPipelineStages`. Tags: ['Deal']
- [ ] T040 [US4] Register `dealsSlice` reducer in `mobile/src/store/store.ts`

### Shared Components

- [ ] T041 [P] [US4] Create `DealStageBadge.tsx` in `mobile/src/components/` — accepts `stageName: string` and `color: string`. Renders a small colored badge/chip with the stage name. Used in deal cards, deal detail, and client detail deals tab
- [ ] T042 [P] [US4] Create `ClientPicker.tsx` in `mobile/src/components/` — reusable searchable client picker. Shows `TextInput` that opens a modal/dropdown with client list filtered by query. Returns selected `clientId` and `clientName`. Used in deal and activity forms

### Screens

- [ ] T043 [US4] Implement `DealPipelineScreen.tsx` in `mobile/src/screens/deals/` — replace placeholder with Kanban board view. Horizontally scrollable `ScrollView` containing vertical `FlatList` columns for each pipeline stage. Each column has a header with stage name (colored) and deal count. Deal cards show: title, value (formatted currency), client name, days in stage. FAB for "New Deal". Segmented toggle (Board/List) at top
- [ ] T044 [US4] Implement drag-and-drop on deal cards in `DealPipelineScreen.tsx` — long-press on a deal card activates drag mode. Use `react-native-gesture-handler` `PanGestureHandler` or a drag-and-drop library. Dropping card on a different stage column updates `stage_id` in SQLite. Provide haptic feedback via `react-native-haptic-feedback` or `Vibration` API on drop
- [ ] T045 [US4] Implement deal list view in `DealPipelineScreen.tsx` — when `viewMode` is 'list', render a `FlatList` with sortable deal rows. Each row shows: title, value, stage badge, client name, expected close date. Tapping row navigates to `DealDetail`. Support sorting by value, stage position, date
- [ ] T046 [US4] Implement `DealDetailScreen.tsx` in `mobile/src/screens/deals/` — accepts `dealId` route param. Show: deal title (large), value (prominent), `DealStageBadge` with progress indicator (stage position / total stages), probability %, expected close date, linked client (tappable → navigates to `ClientDetail` in Clients stack), notes section, activity log placeholder. "Edit" button in header → `DealForm` with mode `edit`
- [ ] T047 [US4] Implement `DealFormScreen.tsx` in `mobile/src/screens/deals/` — accepts `mode` param (create/edit), optional `dealId` and `clientId`. Fields: title (required), value (numeric input), stage (picker from `pipeline_stages`), probability (0-100 slider or input), expected close date (date picker), client (`ClientPicker` — required), notes (multiline). Save to SQLite on submit
- [ ] T048 [US4] Register deal screens in `DealsStack.tsx` in `mobile/src/navigation/stacks/` — add `DealDetail` and `DealForm` screen entries with proper `DealsStackParamList` typing
- [ ] T049 [US4] Implement deal pipeline empty states in `DealPipelineScreen.tsx` — when no deals exist at all, show `EmptyState` with "No deals in your pipeline" and "Create your first deal" button. When individual columns are empty, show subtle "No deals at this stage" text within the column

**Checkpoint**: Full deal pipeline with Kanban board, drag-and-drop, list view, and CRUD. Deals tab is independently usable.

---

## Phase 5: US5 — Activity & Task Management (Priority: P1)

**Goal**: Consolidated activity management: task Kanban board, call/note/meeting forms, activity list with filters, calendar view. All activities link to clients and/or deals.

**Independent Test**: Open Activities tab → see empty state → create a task → task appears in list and board → log a call linked to a client → call appears in list → create a note → filter by type → switch to calendar → see dot on today → create meeting with date → appears on calendar

**Depends on**: US3 data layer (clients), US4 data layer (deals — optional link)

### Data Layer

- [ ] T050 [US5] Create SQLite migration `005_create_tasks` in `mobile/src/database/` — create `tasks` table per data-model.md (id, title, description, status, priority, due_date, client_id FK, deal_id FK, created_at, updated_at, synced_at, is_deleted). Add indexes on `status`, `due_date`, `client_id`, `deal_id`, `is_deleted`
- [ ] T051 [P] [US5] Create SQLite migration `006_create_call_logs` in `mobile/src/database/` — create `call_logs` table per data-model.md (id, client_id FK NOT NULL, deal_id FK, duration_seconds, outcome, notes, called_at, created_at, synced_at, is_deleted). Add indexes on `client_id`, `called_at`, `is_deleted`
- [ ] T052 [P] [US5] Create SQLite migration `007_create_notes` in `mobile/src/database/` — create `notes` table per data-model.md (id, content NOT NULL, client_id FK, deal_id FK, created_at, updated_at, synced_at, is_deleted). Add indexes on `client_id`, `deal_id`, `is_deleted`
- [ ] T053 [P] [US5] Create SQLite migration `008_create_meetings` in `mobile/src/database/` — create `meetings` table per data-model.md (id, title NOT NULL, client_id FK, deal_id FK, location, starts_at NOT NULL, ends_at NOT NULL, notes, created_at, updated_at, synced_at, is_deleted). Add indexes on `client_id`, `starts_at`, `is_deleted`
- [ ] T054 [US5] Create `activitiesSlice.ts` in `mobile/src/store/slices/` — Redux slice for activity UI state: `activeTypeFilter` (all/task/call/note/meeting), `sortOrder` ('newest'|'oldest'|'due_date'), `viewMode` ('list'|'board'|'calendar'), `dateRange`. Actions: `setTypeFilter`, `setSortOrder`, `setViewMode`, `setDateRange`
- [ ] T055 [P] [US5] Create `activitiesApi.ts` in `mobile/src/store/api/` — RTK Query endpoints: `getTasks`, `createTask`, `updateTask`, `deleteTask`, `getCallLogs`, `createCallLog`, `getNotes`, `createNote`, `updateNote`, `getMeetings`, `createMeeting`, `updateMeeting`. Tags: ['Task', 'CallLog', 'Note', 'Meeting']
- [ ] T056 [US5] Register `activitiesSlice` reducer in `mobile/src/store/store.ts`

### Screens — Activity List

- [ ] T057 [US5] Implement full `ActivityListScreen.tsx` in `mobile/src/screens/activities/` — replace placeholder with: filter chips row (All, Tasks, Calls, Notes, Meetings) at top, reverse-chronological `FlatList` of all activities. Each row shows: type icon (Material Community Icons: `checkbox-marked-outline` for task, `phone` for call, `note-text` for note, `calendar-clock` for meeting), title/summary, linked client name, date/time. Query all 4 activity tables from SQLite, merge and sort by date. FAB for adding new activity
- [ ] T058 [US5] Implement filters and sorting in `ActivityListScreen.tsx` — wire filter chips to `activitiesSlice` `activeTypeFilter`. When a type is selected, query only that table. Add sort dropdown: newest first, oldest first, due date (tasks only). Add date range filter. Combine with SQLite WHERE clauses
- [ ] T059 [US5] Implement activity list empty states in `ActivityListScreen.tsx` — type-specific: no activities → "No activities yet — start by logging a call or creating a task", no tasks → "No tasks — create one to get organized", no calls → "No calls logged — tap + to log your first call", no notes → "No notes yet", no meetings → "No meetings scheduled". Use `EmptyState` component

### Screens — Task Board

- [ ] T060 [US5] Implement `TaskBoardScreen.tsx` in `mobile/src/screens/activities/` — Kanban board with 3 columns: To Do, In Progress, Done. Task cards show: title, due date (red if overdue), priority indicator (colored left border: green=low, orange=medium, red=high), linked client name. Drag-and-drop between columns updates `status` in SQLite. Navigate to board via filter chips or view toggle from `ActivityListScreen`
- [ ] T061 [US5] Implement overdue task indicators in `TaskBoardScreen.tsx` and `ActivityListScreen.tsx` — tasks with `due_date` before today get red border/badge. Sort overdue tasks to top in list view. Show overdue count badge on the "Tasks" filter chip

### Screens — Forms

- [ ] T062 [US5] Implement `TaskFormScreen.tsx` in `mobile/src/screens/activities/` — accepts `mode` (create/edit), optional `taskId`, `clientId`, `dealId`. Fields: title (required), description (multiline), status picker (To Do/In Progress/Done), priority picker (Low/Medium/High), due date (date picker), client (`ClientPicker`), deal (picker filtered by selected client). Save to SQLite `tasks` table
- [ ] T063 [P] [US5] Implement `CallLogFormScreen.tsx` in `mobile/src/screens/activities/` — fields: client (`ClientPicker`, required), duration (minutes numeric input), outcome (radio buttons: Connected, Voicemail, No Answer, Left Message), deal (optional picker), notes (multiline). On submit: set `called_at` to current time, save to SQLite `call_logs` table
- [ ] T064 [P] [US5] Implement `NoteFormScreen.tsx` in `mobile/src/screens/activities/` — accepts `mode` (create/edit), optional `noteId`, `clientId`, `dealId`. Fields: content (multiline, required, large text area), client (`ClientPicker`), deal (picker). Auto-save draft to AsyncStorage on text change (debounced 2s) to prevent data loss. Save to SQLite `notes` table
- [ ] T065 [P] [US5] Implement `MeetingFormScreen.tsx` in `mobile/src/screens/activities/` — accepts `mode` (create/edit), optional `meetingId`, `clientId`, `dealId`. Fields: title (required), client (`ClientPicker`), deal (picker), location, start date/time (datetime picker), end date/time (datetime picker, must be after start), notes (multiline). Save to SQLite `meetings` table

### Screens — Calendar

- [ ] T066 [US5] Implement `CalendarScreen.tsx` in `mobile/src/screens/activities/` — month view calendar at top (custom grid or lightweight library). Days with activities show colored dots (color per type). Tapping a day shows that day's activities in a `FlatList` below the calendar. Each activity row shows type icon, title, time, linked client. Navigate to detail/form on tap

### Navigation

- [ ] T067 [US5] Register all activity screens in `ActivitiesStack.tsx` in `mobile/src/navigation/stacks/` — add `TaskBoard`, `TaskDetail` (reuses TaskForm in read-only or add separate screen), `TaskForm`, `CallLogForm`, `NoteForm`, `MeetingForm`, `Calendar` screen entries with proper `ActivitiesStackParamList` typing

**Checkpoint**: Full activity management with list, board, forms, and calendar. Activities tab is independently usable.

---

## Phase 6: US2 — Dashboard & Overview (Priority: P1)

**Goal**: Landing screen with summary metrics, today's agenda, recent activity feed, and quick-action FAB. Aggregates data from clients, deals, and activities.

**Independent Test**: Open Dashboard tab → see 4 summary cards with counts → see today's tasks and meetings → see recent activity feed → tap FAB → see quick actions → tap summary card → navigate to relevant tab → when no data → see welcome empty state

**Depends on**: US3 (clients), US4 (deals), US5 (activities) for data

### Shared Components

- [ ] T068 [P] [US2] Create `SummaryCard.tsx` in `mobile/src/components/` — accepts `icon: string`, `label: string`, `value: string | number`, `color: string`, `onPress: () => void`. Renders a React Native Paper `Card` with icon, label, and large value text. Tappable to navigate

### Screens

- [ ] T069 [US2] Implement full `DashboardScreen.tsx` in `mobile/src/screens/dashboard/` — replace placeholder with `ScrollView` layout containing: (1) horizontal row of 4 `SummaryCard` components (Total Clients, Active Deals, Pipeline Value, Open Tasks), (2) "Today's Agenda" section, (3) "Recent Activity" section. Add `RefreshControl` for pull-to-refresh that re-queries SQLite
- [ ] T070 [US2] Implement summary metric cards data in `DashboardScreen.tsx` — query SQLite aggregates: `SELECT COUNT(*) FROM clients WHERE is_deleted=0`, `SELECT COUNT(*) FROM deals WHERE is_deleted=0 AND stage_id NOT IN (won/lost stages)`, `SELECT SUM(value) FROM deals WHERE is_deleted=0 AND stage_id NOT IN (won/lost stages)`, `SELECT COUNT(*) FROM tasks WHERE is_deleted=0 AND status != 'done'`. Tapping each card navigates to relevant tab
- [ ] T071 [US2] Implement today's agenda section in `DashboardScreen.tsx` — query tasks due today (`due_date = today AND status != 'done'`) and meetings today (`starts_at between today start/end`). Render as vertical list with time, title, linked client. Tapping navigates to task/meeting detail. Show "Nothing scheduled for today" if empty
- [ ] T072 [US2] Implement recent activity feed in `DashboardScreen.tsx` — query last 10 entries across all activity tables (tasks, call_logs, notes, meetings) plus new clients, sorted by `created_at` desc. Each entry shows type icon, description ("Logged call with {client}"), relative timestamp. Tapping navigates to entity detail
- [ ] T073 [US2] Implement `QuickActionSheet.tsx` in `mobile/src/components/` — bottom sheet (or React Native Paper `Modal` with bottom sheet style) with 4 options: New Client (icon: account-plus), New Deal (icon: handshake), Log Call (icon: phone-plus), New Task (icon: checkbox-marked-outline). Each option navigates to the appropriate form screen. Used by Dashboard FAB
- [ ] T074 [US2] Add FAB.Group to `DashboardScreen.tsx` — React Native Paper `FAB.Group` that opens to show quick action buttons. Connect to `QuickActionSheet` or directly expand with 4 sub-FABs for New Client, New Deal, Log Call, New Task
- [ ] T075 [US2] Implement dashboard empty state in `DashboardScreen.tsx` — when no clients, deals, or activities exist, replace the normal layout with `EmptyState`: icon `rocket-launch`, title "Welcome to CRM!", description "Get started by adding your first client", action button "Add Client" navigating to ClientForm

**Checkpoint**: Dashboard shows live metrics, today's agenda, recent activity, and quick actions. Full landing experience.

---

## Phase 7: US6 — Communication & Interaction History (Priority: P2)

**Goal**: Unified timeline component showing all interactions with a client or deal. Integrates into client detail and deal detail screens.

**Independent Test**: View client detail → Activity tab → see chronological timeline of all calls, notes, meetings, tasks for that client → view deal detail → see timeline filtered to that deal → add quick note from timeline

**Depends on**: US3 (client detail), US4 (deal detail), US5 (activity data)

- [ ] T076 [US6] Create `InteractionTimeline.tsx` in `mobile/src/components/` — reusable component accepting `clientId?: string`, `dealId?: string`. Queries SQLite across tasks, call_logs, notes, meetings filtered by the given ID. Renders a vertical timeline with: left line connector, type-specific icon circles (colored per type), entry content (title/summary, timestamp, linked entity). Sorted reverse-chronological. Supports pagination (load 20 at a time)
- [ ] T077 [US6] Integrate `InteractionTimeline` into `ClientDetailScreen.tsx` Activity tab — replace placeholder activity content with `<InteractionTimeline clientId={clientId} />`. Shows all activities for that client
- [ ] T078 [US6] Integrate `InteractionTimeline` into `DealDetailScreen.tsx` activity log section — add `<InteractionTimeline dealId={dealId} />` below the deal info section. Shows activities linked to that deal
- [ ] T079 [US6] Add quick note input to `InteractionTimeline.tsx` — add a `TextInput` at the top of the timeline with "Add a quick note..." placeholder. On submit, insert a new note in SQLite linked to the current `clientId`/`dealId`. New note appears at top of timeline. Clears input after submit
- [ ] T080 [US6] Add communication count badges to `ClientListScreen.tsx` and `ClientDetailScreen.tsx` — on list rows: show small badge with total interaction count. On detail header: show counts for calls, notes, meetings as small text below client info. Query with `SELECT COUNT(*) FROM {table} WHERE client_id = ? AND is_deleted = 0` for each

**Checkpoint**: Unified timeline integrated into client and deal views with quick note capability.

---

## Phase 8: US7 — Reports & Analytics (Priority: P2)

**Goal**: Reports hub with pipeline, activity, and client reports. Charts for visualizing data trends.

**Independent Test**: Navigate to More → Reports → see 3 report cards → tap Pipeline Report → see bar chart by stage → tap Activity Report → see activity counts by type → change time period filter

**Depends on**: US3 (clients), US4 (deals), US5 (activities) for data

- [ ] T081 [US7] Implement `ReportsHubScreen.tsx` in `mobile/src/screens/more/` — list of report cards using React Native Paper `Card`: Pipeline Report (icon: chart-bar, preview: total pipeline value), Activity Report (icon: chart-timeline-variant, preview: activities this week), Client Report (icon: account-group, preview: total clients). Tapping navigates to respective report screen
- [ ] T082 [US7] Implement `PipelineReportScreen.tsx` in `mobile/src/screens/more/` — bar chart showing deal values summed by stage. Below chart: deal count per stage, total pipeline value, win/loss ratio (closed-won count / total closed), average deal size. Time period filter chips (This Week, Month, Quarter, Year). Use a lightweight React Native charting library or custom `View`-based bars
- [ ] T083 [US7] Implement `ActivityReportScreen.tsx` in `mobile/src/screens/more/` — stacked bar chart of activity counts by type (tasks, calls, notes, meetings) per week or month. Below chart: total counts per type, trend indicator (up/down arrow comparing current period vs previous). Time period filter
- [ ] T084 [US7] Implement `ClientReportScreen.tsx` in `mobile/src/screens/more/` — new clients over time (bar chart by month), clients by tag (if tags used), most active clients (top 10 by total interaction count). Simple list + bar chart format
- [ ] T085 [US7] Register report screens in `MoreStack.tsx` — add `ReportsHub`, `PipelineReport`, `ActivityReport`, `ClientReport` entries with `MoreStackParamList` typing

**Checkpoint**: Reports hub with 3 report types showing charts and metrics.

---

## Phase 9: US8 — Global Search (Priority: P2)

**Goal**: Search across all CRM entities from a single modal accessible from any screen.

**Independent Test**: Tap search icon in header → modal opens → type "Acme" → see matching clients, deals, activities grouped by type → tap a result → navigate to detail screen → open search again → see recent searches

**Depends on**: US3, US4, US5 for searchable data

- [ ] T086 [US8] Create SQLite migration `009_create_search_history` in `mobile/src/database/` — create `search_history` table (id, query, searched_at) per data-model.md
- [ ] T087 [US8] Create `searchSlice.ts` in `mobile/src/store/slices/` — Redux slice: `query`, `recentSearches`, `isSearching`. Actions: `setQuery`, `addRecentSearch`, `clearRecentSearches`, `removeRecentSearch`. Register in `store.ts`
- [ ] T088 [US8] Implement `GlobalSearchScreen.tsx` in `mobile/src/screens/search/` — modal screen with `Searchbar` auto-focused on open. When query is empty, show recent searches from `search_history` table (last 10, with clear all button). As user types (debounced 300ms), query SQLite across: `clients` (name, email, company LIKE), `deals` (title LIKE), `tasks` (title LIKE), `notes` (content LIKE). Group results by type with `SectionList` section headers. Tapping a result saves to search history and navigates to detail screen
- [ ] T089 [US8] Register `GlobalSearch` as modal screen in root navigator in `mobile/src/navigation/AppNavigator.tsx` — ensure the `GlobalSearch` screen is registered in `RootStackParamList` with `presentation: 'modal'`. Add a search icon button to the default screen options header that navigates to `GlobalSearch`

**Checkpoint**: Global search working with cross-entity results and recent search history.

---

## Phase 10: US9 — Settings & Preferences (Priority: P3)

**Goal**: Settings screen with sync status, preferences, and informational screens. No auth settings.

**Independent Test**: Navigate to More → see menu items → tap Settings → see preference sections → tap Data & Sync → see sync status → tap About → see app version

**Depends on**: US1 (More tab navigation)

- [ ] T090 [US9] Implement full `MoreMenuScreen.tsx` in `mobile/src/screens/more/` — replace placeholder with a `ScrollView` of menu items using React Native Paper `List.Item`. Sections: CRM (Reports → `ReportsHub`), App (Settings → `Settings`, Profile → `Profile`), Info (About → `About`). Each item has icon and chevron
- [ ] T091 [US9] Implement `SettingsScreen.tsx` in `mobile/src/screens/more/` — sections: Preferences (theme toggle light/dark using `react-native-paper` theme, notification preferences toggle), Data & Sync (last sync time display, pending changes count from sync queue, "Sync Now" button that triggers background sync, "Clear Cache" with confirmation dialog showing cache size)
- [ ] T092 [US9] Implement `SyncStatusScreen.tsx` in `mobile/src/screens/more/` — detailed sync view: list of pending operations (entity type, operation type, timestamp), last successful sync timestamp, sync error log (last 10 errors), manual "Sync Now" trigger. Accessible from Settings Data & Sync section
- [ ] T093 [P] [US9] Implement `ProfileScreen.tsx` in `mobile/src/screens/more/` — read-only display of user info: name, email, role. Use React Native Paper `Avatar.Text` with initials, `List.Item` for info fields. Note at bottom: "Account settings will be available after sign-in is implemented"
- [ ] T094 [P] [US9] Implement `AboutScreen.tsx` in `mobile/src/screens/more/` — app name, version (from `package.json`), build number, "Open Source Licenses" link, support email link (via `Linking.openURL`). Use React Native Paper `List.Item` components
- [ ] T095 [US9] Register all More screens in `MoreStack.tsx` — add `Settings`, `SyncStatus`, `Profile`, `About` entries (ReportsHub already added in Phase 8) with proper `MoreStackParamList` typing

**Checkpoint**: Settings, profile, sync status, and about screens complete. More tab fully functional.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements spanning multiple user stories, performance, and consistency

- [ ] T096 [P] Implement standardized pull-to-refresh across all list screens — ensure `ClientListScreen`, `DealPipelineScreen`, `ActivityListScreen`, `DashboardScreen` all use `RefreshControl` with theme accent color. Refresh triggers: (1) re-query SQLite, (2) attempt background sync via RTK Query if online
- [ ] T097 [P] Add loading skeletons to all data screens — replace `ActivityIndicator` spinners with `LoadingSkeleton` component in: `DashboardScreen` (card skeletons), `ClientListScreen` (list item skeletons), `DealPipelineScreen` (card skeletons), `ActivityListScreen` (list item skeletons), `ReportsHubScreen` (card skeletons)
- [ ] T098 Audit all form screens for draft preservation — ensure `ClientFormScreen`, `DealFormScreen`, `TaskFormScreen`, `NoteFormScreen`, `MeetingFormScreen` preserve input when user accidentally navigates back. Use `beforeRemove` navigation listener to show "Discard changes?" confirmation dialog when form is dirty
- [ ] T099 [P] Performance audit on list screens — verify `FlatList` in `ClientListScreen`, `ActivityListScreen`, `DealPipelineScreen` use `React.memo` on row components, `keyExtractor`, and `getItemLayout` where applicable. Ensure SQLite queries use indexes defined in data-model.md
- [ ] T100 [P] Accessibility audit — ensure all interactive elements have `accessibilityLabel`, minimum 44px touch targets, proper contrast ratios on text. Verify VoiceOver works on tab navigation and form inputs
- [ ] T101 Run full app verification — start Metro bundler, launch on iOS simulator, navigate through all tabs, create sample data (3 clients, 2 deals, 5 activities), verify all screens render correctly, verify offline banner appears when airplane mode enabled, verify data persists after app restart

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup ─────────────────────────────── (no dependencies)
    │
Phase 2: US1 Navigation Shell ─────────────── (depends on Phase 1)
    │
    ├── Phase 3: US3 Clients ──────────────── (depends on Phase 2)
    │       │
    │       ├── Phase 4: US4 Deals ────────── (depends on Phase 3 data layer: T021-T024)
    │       │
    │       └── Phase 5: US5 Activities ───── (depends on Phase 3 data layer: T021-T024)
    │               │
    │               ├── Phase 7: US6 History ─ (depends on Phases 3, 4, 5)
    │               │
    │               └── Phase 8: US7 Reports ─ (depends on Phases 3, 4, 5)
    │
    ├── Phase 6: US2 Dashboard ────────────── (depends on Phases 3, 4, 5)
    │
    ├── Phase 9: US8 Search ───────────────── (depends on Phases 3, 4, 5)
    │
    └── Phase 10: US9 Settings ────────────── (depends on Phase 2 only)
            │
Phase 11: Polish ──────────────────────────── (depends on all above)
```

### Parallel Opportunities

- **Phase 4 (Deals) and Phase 5 (Activities)** can run in parallel after Phase 3's data layer is complete
- **Phase 6 (Dashboard), Phase 7 (History), Phase 8 (Reports), Phase 9 (Search)** can all run in parallel after Phases 3-5
- **Phase 10 (Settings)** can run in parallel with Phases 3-9 (only needs Phase 2)
- Within each phase, tasks marked `[P]` can run in parallel

### User Story Independence

| Story            | Can Start After | Independently Testable?                    |
| ---------------- | --------------- | ------------------------------------------ |
| US1 (Navigation) | Phase 1         | ✅ Yes — tabs render and switch            |
| US3 (Clients)    | US1 complete    | ✅ Yes — full client CRUD                  |
| US4 (Deals)      | US3 data layer  | ✅ Yes — deal pipeline with mock clients   |
| US5 (Activities) | US3 data layer  | ✅ Yes — activity CRUD with mock clients   |
| US2 (Dashboard)  | US3, US4, US5   | ✅ Yes — shows aggregated metrics          |
| US6 (History)    | US3, US5        | ✅ Yes — timeline renders for any client   |
| US7 (Reports)    | US3, US4, US5   | ✅ Yes — charts render with available data |
| US8 (Search)     | US3, US4, US5   | ✅ Yes — searches across entities          |
| US9 (Settings)   | US1             | ✅ Yes — static screens, sync status       |

---

## Parallel Example: Phase 4 + Phase 5

```bash
# After Phase 3 data layer is complete, launch in parallel:

# Developer A: Deals (Phase 4)
Task: T036 "Create SQLite migration 003_create_pipeline_stages"
Task: T037 "Create SQLite migration 004_create_deals"
Task: T038 "Create dealsSlice.ts" [P]
Task: T039 "Create dealsApi.ts" [P]
# ... continue with deal screens

# Developer B: Activities (Phase 5)
Task: T050 "Create SQLite migration 005_create_tasks"
Task: T051 "Create SQLite migration 006_create_call_logs" [P]
Task: T052 "Create SQLite migration 007_create_notes" [P]
Task: T053 "Create SQLite migration 008_create_meetings" [P]
# ... continue with activity screens
```

---

## Implementation Strategy

### MVP First (US1 + US3 Only)

1. Complete Phase 1: Setup (~4 tasks)
2. Complete Phase 2: US1 Navigation Shell (~16 tasks)
3. Complete Phase 3: US3 Client Management (~15 tasks)
4. **STOP and VALIDATE**: App has 5 tabs, full client CRUD with search, offline storage
5. Deploy/demo — this is a usable CRM foundation

### Incremental Delivery

1. **Milestone 1** (Phases 1-3): Navigation + Clients → minimal viable CRM
2. **Milestone 2** (Phases 4-5): Deals + Activities → full CRM data model
3. **Milestone 3** (Phase 6): Dashboard → polished landing experience
4. **Milestone 4** (Phases 7-9): History + Reports + Search → complete feature set
5. **Milestone 5** (Phases 10-11): Settings + Polish → production-ready

---

## Summary

| Metric                          | Value                          |
| ------------------------------- | ------------------------------ |
| **Total tasks**                 | 101                            |
| **Phase 1 (Setup)**             | 4 tasks                        |
| **US1 (Navigation Shell)**      | 16 tasks                       |
| **US2 (Dashboard)**             | 8 tasks                        |
| **US3 (Clients)**               | 15 tasks                       |
| **US4 (Deals)**                 | 14 tasks                       |
| **US5 (Activities)**            | 18 tasks                       |
| **US6 (Communication History)** | 5 tasks                        |
| **US7 (Reports)**               | 5 tasks                        |
| **US8 (Search)**                | 4 tasks                        |
| **US9 (Settings)**              | 6 tasks                        |
| **Polish**                      | 6 tasks                        |
| **Parallelizable tasks**        | 42 (marked [P])                |
| **Suggested MVP scope**         | Phase 1 + US1 + US3 (35 tasks) |

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable at its checkpoint
- All file paths relative to `mobile/src/` unless prefixed with `mobile/`
- SQLite migrations numbered sequentially (002-009) after existing 001_create_test_table
- No test tasks included — add via separate `/speckit.tasks` run with TDD flag if needed
- Constitution compliance: offline-first via SQLite for all data operations
