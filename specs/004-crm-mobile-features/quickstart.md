# Quickstart: CRM Mobile Features Development

**Feature**: 004-crm-mobile-features  
**Date**: 2026-03-25

## Prerequisites

- Mobile app foundation running (from 003-app-foundation)
- iOS Simulator available
- Node.js 18+, Xcode, CocoaPods installed

## New Dependencies to Install

```bash
cd mobile

# Bottom tab navigator
npm install @react-navigation/bottom-tabs

# Network connectivity detection (for offline banner)
npm install @react-native-community/netinfo

# Gesture handler for swipe actions (likely already installed via React Navigation)
# npm install react-native-gesture-handler

# iOS pods
cd ios && pod install && cd ..
```

## Development Sequence

### Phase A: Navigation Shell (Epic 1)

**Start here.** This unblocks all other work.

1. Create `src/navigation/types.ts` with all param list types
2. Create `src/navigation/MainTabNavigator.tsx` with 5 tabs
3. Create `src/navigation/stacks/` folder with 5 stack navigators
4. Create placeholder screens for each tab's root screen
5. Update `AppNavigator.tsx` to render `MainTabNavigator` instead of the single Home stack
6. Verify: app launches with tab bar, all tabs render, tab switching works

### Phase B: Client Management (Epic 3)

**Core entity.** Deals and activities reference clients.

1. Create SQLite migration `002_create_clients` in `src/database/migrations/`
2. Create `src/database/models/client.ts` types
3. Create `src/store/slices/clientsSlice.ts`
4. Create `src/store/api/clientsApi.ts` RTK Query endpoints
5. Build screens: ClientListScreen → ClientDetailScreen → ClientFormScreen
6. Verify: can create, view, edit, search clients offline

### Phase C: Deals + Activities (Epics 4 & 5) — parallel

**Can be developed in parallel** once clients exist.

Deals track:

1. SQLite migrations for deals + pipeline_stages
2. DealPipelineScreen (Kanban), DealDetailScreen, DealFormScreen

Activities track:

1. SQLite migrations for tasks, call_logs, notes, meetings
2. ActivityListScreen, TaskBoardScreen, form screens

### Phase D: Dashboard + History (Epics 2 & 6)

Build after Phases B & C — the dashboard aggregates data from clients, deals, and activities.

### Phase E: Reports + Search (Epics 7 & 8)

Polish features last — they depend on a complete data layer.

## File Naming Conventions

| Type          | Location                 | Naming             |
| ------------- | ------------------------ | ------------------ |
| Screens       | `src/screens/{domain}/`  | `{Name}Screen.tsx` |
| Stack navs    | `src/navigation/stacks/` | `{Name}Stack.tsx`  |
| Store slices  | `src/store/slices/`      | `{name}Slice.ts`   |
| API endpoints | `src/store/api/`         | `{name}Api.ts`     |
| DB models     | `src/database/models/`   | `{name}.ts`        |
| Components    | `src/components/`        | `{Name}.tsx`       |

## Key Patterns to Follow

### Screen Template

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ClientsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ClientsStackParamList, 'ClientList'>;

export function ClientListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Client List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

### SQLite Migration Template

```typescript
export const migration_002_create_clients = {
  name: "002_create_clients",
  up: `
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      company TEXT,
      address TEXT,
      avatar_url TEXT,
      notes TEXT,
      tags TEXT,
      is_favorite INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      synced_at TEXT,
      is_deleted INTEGER DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
    CREATE INDEX IF NOT EXISTS idx_clients_is_deleted ON clients(is_deleted);
  `,
};
```

### RTK Query Endpoint Template

```typescript
import { api } from "./api";

export const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => "/clients",
      providesTags: ["Client"],
    }),
    createClient: builder.mutation<Client, CreateClientInput>({
      query: (body) => ({ url: "/clients", method: "POST", body }),
      invalidatesTags: ["Client"],
    }),
  }),
});
```

## Verify Your Work

```bash
# Start Metro bundler
cd mobile && npm start

# Run on iOS Simulator (separate terminal)
npm run ios

# Check: tab bar renders with 5 tabs
# Check: each tab shows its root screen
# Check: navigation between screens works
# Check: data persists in SQLite after app restart
```
