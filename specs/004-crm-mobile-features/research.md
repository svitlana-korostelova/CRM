# Research: CRM Mobile Features & Navigation Architecture

**Feature**: 004-crm-mobile-features  
**Date**: 2026-03-25  
**Status**: Complete

## Research Areas

### 1. Navigation Patterns for CRM Mobile Apps

**Decision**: Bottom Tab Navigator (5 tabs) + nested Stack Navigators per tab

**Rationale**:

- Bottom tab bar is the dominant mobile navigation pattern for apps with 3-5 distinct primary sections (industry standard as of 2025-2026)
- CRM apps have clear primary sections (Dashboard, Clients, Deals, Activities, More) that map naturally to tabs
- Stack navigators within each tab provide list → detail → edit drill-down flows
- Users can jump between sections instantly without losing context in other tabs
- Maximum 5 tab items avoids overcrowding; a "More" tab collects secondary features

**Alternatives considered**:

- **Drawer navigation**: Lower discoverability for primary features; better for 6+ top-level sections. Rejected because CRM has exactly 5 primary sections that fit bottom tabs naturally
- **Top tabs only**: Good for subcategories within a section but insufficient for primary navigation between unrelated domains (Clients vs Deals vs Activities)
- **Single stack**: Would require extensive back-navigation; poor for apps where users switch contexts frequently

**Industry validation**: Salesforce, HubSpot, and Pipedrive mobile apps all use bottom tab navigation as primary pattern. HubSpot uses 5 tabs (Home, Contacts, Deals, Tasks, Menu). Pipedrive uses 4 tabs (Deals, Activities, Contacts, More).

### 2. Tab Structure & Screen Inventory

**Decision**: 5 tabs — Dashboard, Clients, Deals, Activities, More

| Tab        | Icon              | Root Screen        | Stack Depth | Screens                                                                   |
| ---------- | ----------------- | ------------------ | ----------- | ------------------------------------------------------------------------- |
| Dashboard  | `home`            | DashboardScreen    | 2           | Dashboard, NotificationList                                               |
| Clients    | `account-group`   | ClientListScreen   | 4           | List, Detail, Form, Notes                                                 |
| Deals      | `handshake`       | DealPipelineScreen | 3           | Pipeline/List, Detail, Form                                               |
| Activities | `calendar-check`  | ActivityListScreen | 5           | List, TaskBoard, TaskDetail, CallLogForm, NoteForm, MeetingForm, Calendar |
| More       | `dots-horizontal` | MoreMenuScreen     | 4           | Menu, Reports, Settings, Profile, SyncStatus, About                       |

**Rationale**:

- Dashboard as Tab 1: Landing screen, shows at-a-glance KPIs — mirrors HubSpot and Salesforce pattern
- Clients as Tab 2: Core CRM entity, most frequently accessed after dashboard
- Deals as Tab 3: Pipeline visualization is the second most important CRM view
- Activities as Tab 4: Consolidates tasks, calls, notes, meetings — avoids needing a separate tab per type
- More as Tab 5: Catches reports, settings, and other less-frequent features without overcrowding the tab bar

**Alternatives considered**:

- **4 tabs (no More)**: Would force reports/settings into a drawer or header menu. Rejected because it fragments secondary navigation
- **6 tabs**: Would overcrowd the tab bar on small phones. iOS HIG recommends max 5
- **Separate Tasks and Calendar tabs**: Would push to 6-7 tabs. Consolidating under "Activities" keeps it manageable

### 3. Screen Flow Architecture

**Decision**: Nested navigators with modal overlays for cross-cutting actions

```
Root Navigator (Stack)
├── [Auth Stack — EXCLUDED from this scope]
│
└── Main Tab Navigator (Bottom Tabs)
    │
    ├── Dashboard Stack
    │   ├── DashboardScreen
    │   └── NotificationListScreen
    │
    ├── Clients Stack
    │   ├── ClientListScreen
    │   ├── ClientDetailScreen (parameterized by clientId)
    │   │   └── Segmented: Info | Notes | Deals | Activity
    │   ├── ClientFormScreen (mode: create | edit)
    │   └── ClientNotesScreen (full notes view)
    │
    ├── Deals Stack
    │   ├── DealPipelineScreen (Kanban) / DealListScreen (toggle)
    │   ├── DealDetailScreen (parameterized by dealId)
    │   └── DealFormScreen (mode: create | edit)
    │
    ├── Activities Stack
    │   ├── ActivityListScreen (filterable: all, tasks, calls, notes, meetings)
    │   ├── TaskBoardScreen (Kanban: To Do, In Progress, Done)
    │   ├── TaskDetailScreen
    │   ├── TaskFormScreen
    │   ├── CallLogFormScreen
    │   ├── NoteFormScreen
    │   ├── MeetingFormScreen
    │   └── CalendarScreen (month view + day detail)
    │
    └── More Stack
        ├── MoreMenuScreen
        ├── ReportsHubScreen
        │   ├── PipelineReportScreen
        │   ├── ActivityReportScreen
        │   └── ClientReportScreen
        ├── SettingsScreen
        ├── ProfileScreen
        ├── SyncStatusScreen
        └── AboutScreen

Global Modals (presented over tabs):
├── GlobalSearchModal
└── QuickActionSheet (New Client, New Deal, Log Call, New Task)
```

**Rationale**:

- Each stack is independent: switching tabs doesn't reset another tab's stack
- Modal overlays for search and quick-create allow access from any context
- ClientDetailScreen uses segmented control (Info/Notes/Deals/Activity) to avoid excessive stack depth
- Form screens accept `mode` param (create vs edit) to reuse the same component with different initial values

### 4. React Navigation Technical Implementation

**Decision**: Use `@react-navigation/bottom-tabs` + `@react-navigation/native-stack`

**Key packages**:

- `@react-navigation/native` (core)
- `@react-navigation/native-stack` (per-tab stacks — already installed)
- `@react-navigation/bottom-tabs` (main tab bar — needs installation)
- `@react-navigation/material-top-tabs` (for client detail segmented tabs — optional)

**TypeScript navigation typing strategy**:

- Define `RootTabParamList` for bottom tabs
- Define per-tab param lists: `DashboardStackParamList`, `ClientsStackParamList`, etc.
- Use `CompositeNavigationProp` where screens need to navigate across stacks

**Rationale**:

- Native stack provides native transition animations and better performance than JS-based stack
- Bottom tabs is the official React Navigation solution with native feel
- Material top tabs for segmented controls inside client detail provides swipe between sections

**Alternatives considered**:

- `react-native-bottom-tabs` (native tabs): Newer library with truly native tab bar appearance. Considered but React Navigation bottom-tabs is more mature and better documented for complex nested navigation. Can migrate later
- Expo Router: File-based routing. Not applicable — this project uses bare React Native

### 5. UX Patterns for CRM Screens

**Decision**: Adopt these patterns across all screens:

| Pattern                      | Where Applied                         | Implementation                                              |
| ---------------------------- | ------------------------------------- | ----------------------------------------------------------- |
| Pull-to-refresh              | All list screens                      | `RefreshControl` on `FlatList`/`ScrollView`                 |
| Skeleton loading             | All data screens                      | React Native Paper `ActivityIndicator` + custom skeletons   |
| Empty states                 | All list screens                      | Illustration + message + primary action button              |
| Swipe actions                | Client list, Activity list            | `react-native-gesture-handler` Swipeable rows               |
| FAB (Floating Action Button) | Dashboard, Client list, Deal pipeline | React Native Paper `FAB` / `FAB.Group`                      |
| Search bar                   | Client list, Global search            | React Native Paper `Searchbar`                              |
| Segmented control            | Client detail, Deal views             | Material top tabs or custom SegmentedButtons                |
| Offline banner               | App-wide                              | Sticky banner at top when `NetInfo` reports no connectivity |
| Optimistic UI                | All create/edit operations            | Show success immediately, sync in background                |

**Rationale**: These patterns match industry CRM apps (HubSpot, Pipedrive) and follow Material Design 3 guidelines. React Native Paper provides most components out of the box.

### 6. Leading CRM App Feature Comparison

| Feature                | HubSpot   | Salesforce      | Pipedrive       | Our CRM                |
| ---------------------- | --------- | --------------- | --------------- | ---------------------- |
| Bottom tab nav         | ✅ 5 tabs | ✅ 5 tabs       | ✅ 4 tabs       | ✅ 5 tabs              |
| Dashboard/Home         | ✅        | ✅ Personalized | ✅              | ✅                     |
| Contact management     | ✅        | ✅              | ✅              | ✅                     |
| Deal pipeline (Kanban) | ✅        | ✅              | ✅ (core focus) | ✅                     |
| Task management        | ✅        | ✅              | ✅              | ✅                     |
| Call logging           | ✅        | ✅              | ✅              | ✅                     |
| Calendar view          | ✅        | ✅              | ✅              | ✅                     |
| Reports/Charts         | ✅        | ✅              | ✅              | ✅ (basic)             |
| Global search          | ✅        | ✅              | ✅              | ✅                     |
| Offline support        | Partial   | Partial         | Partial         | ✅ Full (constitution) |
| AI features            | ✅        | ✅ Agentforce   | ✅ AI Assistant | ❌ Future              |
| Voice input            | ❌        | ✅ Dictation    | ❌              | ❌ Future              |
| Nearby/Map             | ❌        | ✅              | ✅              | ❌ Future              |
| Quick actions/FAB      | ✅        | ✅              | ✅              | ✅                     |

**Takeaway**: Our feature set covers 100% of core CRM mobile features. We differentiate on full offline support. AI, voice, and map features are future enhancements.

### 7. Performance Considerations

**Decision**: Prioritize perceived performance via these techniques:

- **FlatList with `getItemLayout`** for fixed-height rows — avoids scroll measurement overhead
- **Memoization** (`React.memo`, `useMemo`, `useCallback`) for list items and expensive computations
- **SQLite indexes** on frequently queried columns (client name, deal stage, activity date)
- **Pagination** for lists > 100 items — load 20 at a time with infinite scroll
- **Image caching** for client avatars using `react-native-fast-image` or built-in cache
- **Skeleton screens** instead of spinners — reduces perceived loading time

**Benchmarks from research**:

- Target: 60 fps scroll on 1000+ item lists
- Target: < 300ms for local search results
- Target: < 50ms for SQLite CRUD operations
- Target: < 100ms tab switch time
