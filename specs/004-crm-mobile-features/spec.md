# Feature Specification: CRM Mobile Features & Navigation Architecture

**Feature Branch**: `004-crm-mobile-features`  
**Created**: 2026-03-25  
**Status**: Draft  
**Input**: User description: "Brainstorm main CRM features in mobile apps (best practices) and create a plan of epics -> stories. Start from thinking under navigation between tabs and screens, no need to cover authorisation and payments part now."

## User Scenarios & Testing _(mandatory)_

### User Story 1 — App Navigation Shell (Priority: P0)

A user opens the CRM app and needs to move between major sections (Dashboard, Clients, Deals, Activities, More) with a single tap. Navigation must feel instant and preserve context when switching tabs.

**Why this priority**: Navigation is the skeleton of the entire app. Every feature, screen, and interaction depends on the navigation structure being in place. Without it, no other feature can be demonstrated or used.

**Independent Test**: Can be fully tested by launching the app, tapping each bottom tab, verifying each tab renders its root screen, and switching tabs preserves state (scroll position, form input).

**Acceptance Scenarios**:

1. **Given** a user opens the app, **When** it finishes loading, **Then** they see a bottom tab bar with 5 labelled icons: Dashboard, Clients, Deals, Activities, More
2. **Given** a user is on any tab, **When** they tap a different tab, **Then** the selected tab's root screen renders within 100ms and the previous tab's state is preserved
3. **Given** a user navigates deep into a tab stack (e.g. Client List → Client Detail → Edit), **When** they switch to another tab and back, **Then** they return to the screen they were on, not the root
4. **Given** a user taps the currently active tab icon, **When** they are deep in the stack, **Then** the stack resets to the root screen of that tab

---

### User Story 2 — Dashboard & Overview (Priority: P1)

A manager opens the app and sees an at-a-glance summary of their CRM data: key metrics, today's tasks, recent activities, and quick-action shortcuts to create new records.

**Why this priority**: The dashboard is the landing experience. It shapes first impressions and provides the primary entry point into every other section.

**Acceptance Scenarios**:

1. **Given** a user opens the Dashboard tab, **When** the screen loads, **Then** they see summary cards (total clients, active deals, pipeline value, open tasks)
2. **Given** a user views the dashboard, **When** they scroll down, **Then** they see today's agenda (tasks due today, upcoming meetings) and a recent activity feed
3. **Given** a user wants to create something quickly, **When** they tap a floating action button (FAB), **Then** they see options: New Client, New Deal, Log Call, New Task
4. **Given** there is no data yet, **When** the dashboard loads, **Then** it shows a friendly empty state with guidance on first steps

---

### User Story 3 — Client/Contact Management (Priority: P1)

A manager needs to browse, search, create, view, and edit client records on their phone. They need quick access to contact information, interaction history, and associated deals.

**Acceptance Scenarios**:

1. **Given** a user opens the Clients tab, **When** the screen loads, **Then** they see a searchable, scrollable list of clients with avatars, names, and company names
2. **Given** a user taps a client row, **When** the detail screen opens, **Then** they see a profile header (avatar, name, company) and segmented tabs: Info, Notes, Deals, Activity
3. **Given** a user wants to add a client, **When** they tap the "+" button, **Then** a create-client form opens with fields for name, email, phone, company, and notes
4. **Given** a user is on a client detail, **When** they tap phone number or email, **Then** the device initiates a call or opens the mail app
5. **Given** a user is offline, **When** they create or edit a client, **Then** changes persist locally and sync when connectivity returns

---

### User Story 4 — Deal/Pipeline Management (Priority: P1)

A manager tracks sales opportunities through a visual pipeline. They can view deals as a Kanban board or list, create new deals linked to clients, and move deals between stages.

**Acceptance Scenarios**:

1. **Given** a user opens the Deals tab, **When** the screen loads, **Then** they see a Kanban board with columns for each pipeline stage (e.g. Lead, Qualified, Proposal, Negotiation, Closed Won, Closed Lost)
2. **Given** a user views the Kanban board, **When** they long-press a deal card, **Then** they can drag it to another stage column
3. **Given** a user wants a different view, **When** they toggle to list view, **Then** they see deals in a sortable table (by value, date, stage)
4. **Given** a user taps a deal card, **When** the detail screen opens, **Then** they see deal value, stage, probability, expected close date, associated client, and activity log
5. **Given** a user creates a new deal, **When** they fill the form, **Then** they must link it to an existing client

---

### User Story 5 — Activity & Task Management (Priority: P1)

A manager creates and manages tasks, logs calls, writes notes, and schedules meetings — all linked to clients or deals. Activities are viewable in a list, Kanban board, or calendar.

**Acceptance Scenarios**:

1. **Given** a user opens the Activities tab, **When** the screen loads, **Then** they see a chronological list of all activities (tasks, calls, notes, meetings) with type icons
2. **Given** a user wants to see only tasks, **When** they filter by "Tasks" and switch to board view, **Then** they see a Kanban board (To Do, In Progress, Done)
3. **Given** a user taps "Log Call", **When** the form opens, **Then** they can record: client, duration, outcome (connected, voicemail, no answer), and notes
4. **Given** a user has overdue tasks, **When** they view the activity list, **Then** overdue items are highlighted with a red indicator
5. **Given** a user switches to calendar view, **When** they see the monthly calendar, **Then** days with activities are dot-marked and tapping a day shows that day's activities

---

### User Story 6 — Communication & Interaction History (Priority: P2)

A manager views the full communication history with a client — calls, emails, notes, meetings — in a single unified timeline, and can log new interactions from anywhere in the app.

**Acceptance Scenarios**:

1. **Given** a user views a client's Activity tab, **When** the timeline loads, **Then** they see all interactions in reverse chronological order with type icons and timestamps
2. **Given** a user logs a call from the Activities tab, **When** they select a client, **Then** the call appears in both the Activities list and the client's timeline
3. **Given** a user wants to add a quick note, **When** they tap "Add Note" on a client detail, **Then** a note form opens pre-linked to that client

---

### User Story 7 — Reports & Analytics (Priority: P2)

A manager accesses basic reports and charts showing pipeline health, activity volume, and client growth trends.

**Acceptance Scenarios**:

1. **Given** a user navigates to More → Reports, **When** the screen loads, **Then** they see a reports hub with cards: Pipeline Report, Activity Report, Client Report
2. **Given** a user opens Pipeline Report, **When** the chart loads, **Then** they see a bar chart of deal values grouped by stage and a funnel conversion rate
3. **Given** a user views Activity Report, **When** the chart loads, **Then** they see activity counts by type over the selected time period (week, month, quarter)

---

### User Story 8 — Global Search (Priority: P2)

A manager can search across all CRM entities (clients, deals, activities) from a single search bar accessible from any screen.

**Acceptance Scenarios**:

1. **Given** a user taps the search icon in the header, **When** the search modal opens, **Then** they see a text input with recent searches and can type to search
2. **Given** a user types "Acme", **When** results load, **Then** they see matching clients, deals, and activities grouped by type
3. **Given** a user taps a search result, **When** they select a client, **Then** they navigate to that client's detail screen

---

### User Story 9 — Settings & Preferences (Priority: P3)

A user configures app preferences: notification settings, theme, sync status, and cache management. (Auth and account settings excluded from this scope.)

**Acceptance Scenarios**:

1. **Given** a user navigates to More → Settings, **When** the screen loads, **Then** they see sections: Preferences, Data & Sync, About
2. **Given** a user wants to check sync status, **When** they tap Data & Sync, **Then** they see last sync time, pending changes count, and a "Sync Now" button
3. **Given** a user wants to clear cached data, **When** they tap "Clear Cache", **Then** cached images and temporary data are cleared with a confirmation prompt

---

### Edge Cases

- What happens when a user has thousands of clients and scrolls rapidly through the list?
- How does the deal Kanban board handle 50+ deals in a single stage column?
- What happens when a user creates a deal for a client that was deleted by another user during offline?
- How does the calendar view handle days with 20+ activities?
- What happens when global search returns 500+ results?
- How does the app handle deep linking to a screen that requires data not yet synced?
- What happens when a user is mid-form-entry and the app backgrounds?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: App MUST provide bottom tab navigation with 5 primary tabs: Dashboard, Clients, Deals, Activities, More
- **FR-002**: Each tab MUST have an independent stack navigator preserving navigation state
- **FR-003**: Dashboard MUST show summary cards, today's agenda, recent activity feed, and a quick-action FAB
- **FR-004**: Client list MUST support search, alphabetical scrolling, and pull-to-refresh
- **FR-005**: Client detail MUST show profile header and segmented sections (Info, Notes, Deals, Activity)
- **FR-006**: Client create/edit forms MUST validate required fields (name) and optional fields (email, phone, company)
- **FR-007**: Deal pipeline MUST render as a horizontally scrollable Kanban board with drag-and-drop stage transitions
- **FR-008**: Deal list view MUST support sorting by value, stage, and date
- **FR-009**: Activity list MUST support filtering by type (task, call, note, meeting) and date range
- **FR-010**: Task board MUST render as a Kanban with To Do, In Progress, Done columns
- **FR-011**: Call log form MUST capture client, duration, outcome, and notes
- **FR-012**: Calendar view MUST show month view with dot indicators and day-detail panel
- **FR-013**: Global search MUST query clients, deals, and activities with grouped results
- **FR-014**: Reports hub MUST show pipeline, activity, and client report cards
- **FR-015**: Settings MUST show sync status, preferences, and cache management
- **FR-016**: All list screens MUST show contextual empty states when no data exists
- **FR-017**: All screens MUST show loading skeletons while data loads
- **FR-018**: All create/edit screens MUST preserve draft input on accidental back navigation
- **FR-019**: All data screens MUST work offline with SQLite and sync when online
- **FR-020**: App MUST show an offline indicator banner when connectivity is lost

### Key Entities

- **Client**: name, email, phone, company, avatar_url, notes, tags, favorite, created_at, updated_at
- **Deal**: title, value, stage, probability, expected_close_date, client_id, notes, created_at, updated_at
- **Task**: title, description, status (todo/in_progress/done), priority, due_date, client_id, deal_id, created_at, updated_at
- **CallLog**: client_id, deal_id, duration_seconds, outcome (connected/voicemail/no_answer/left_message), notes, called_at
- **Note**: client_id, deal_id, content, created_at, updated_at
- **Meeting**: client_id, deal_id, title, location, starts_at, ends_at, notes, created_at, updated_at
- **PipelineStage**: name, position, color, is_won, is_lost

## Success Criteria _(mandatory)_

- **SC-001**: Tab switching completes in < 100ms with no visible jank
- **SC-002**: Client list renders 1000+ records with smooth scrolling (60 fps)
- **SC-003**: Deal Kanban board supports drag-and-drop on iOS and Android
- **SC-004**: Global search returns results within 300ms for local data
- **SC-005**: All CRUD forms save to SQLite in < 50ms
- **SC-006**: Navigation state persists across tab switches (no stack resets)
- **SC-007**: App shows contextual empty states for every list screen
- **SC-008**: Calendar view renders month data within 200ms
- **SC-009**: Offline indicator appears within 2 seconds of connectivity loss
- **SC-010**: All screens follow Material Design 3 guidelines via React Native Paper

## Assumptions

- Auth screens will be added in a separate epic (excluded from this scope)
- Payment features are out of scope
- The app targets iOS as primary platform with Android as secondary
- React Navigation v6 with bottom tabs and native stack is already available
- React Native Paper v5 provides the component library
- SQLite database service is already initialized (from 003-app-foundation)
- Backend API endpoints for CRUD operations will be developed in parallel epics

## Dependencies

- 003-app-foundation: Mobile app shell, Redux store, SQLite service, backend API
- React Navigation Bottom Tabs: `@react-navigation/bottom-tabs`
- React Navigation Native Stack: `@react-navigation/native-stack`
- React Native Paper: Material Design 3 components
- react-native-sqlite-storage: Offline data persistence
