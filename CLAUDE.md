# CLAUDE.md

**Purpose**: AI-optimized execution guide for Claude Code agents working with the CRM codebase

---

## 🚨 CRITICAL RULES (Check Every Task)

| Rule | Trigger | Action |
|------|---------|--------|
| **Check Guides First** | ANY task/prompt | ALWAYS check relevant guides BEFORE searching codebase |
| **Testing** | User says "test", "write tests", "run tests" | ONLY then work on tests |
| **Git Ops** | User says "commit", "push", "PR", "branch" | ONLY then do git operations |
| **Shell** | ANY shell command | ONLY bash/Linux syntax |

**Recovery**: If stuck → Check [Troubleshooting](#-troubleshooting)

---

## 📚 GUIDE IMPORTS

| Category | Guide Path | Purpose |
|----------|------------|---------|
| Architecture | .codemie/guides/architecture/architecture.md | Monorepo structure, layers, design patterns, extension points |
| API Development | .codemie/guides/api/api-patterns.md | Express routes, RTK Query, response formats, error propagation |
| Data & Database | .codemie/guides/data/data-patterns.md | Prisma (PostgreSQL) + SQLite offline service patterns |
| Development Practices | .codemie/guides/development/development-practices.md | Naming, error handling, logging, async patterns, code style |
| Standards | .codemie/guides/standards/git-workflow.md | Epic-Feature branching, commit format, task management |

---

## ⚡ TASK CLASSIFIER

**Analyze request intent → Match category → Load appropriate guides**

| Category | User Intent / Purpose | Example Requests | P0 Guide | P1 Guide |
|----------|----------------------|------------------|----------|----------|
| **Architecture** | System structure, design decisions, planning features, where does X go? | "How should I structure this?", "Where should this logic live?", "Plan the auth module" | .codemie/guides/architecture/architecture.md | - |
| **API Development** | Backend endpoints, mobile API calls, routing, responses | "Add an endpoint for clients", "Fetch data from backend", "Create RTK Query hook" | .codemie/guides/api/api-patterns.md | .codemie/guides/architecture/architecture.md |
| **Data & Database** | DB queries, models, Prisma schema, SQLite tables, migrations | "Add a new table", "Query clients", "Create Prisma model", "Mobile offline storage" | .codemie/guides/data/data-patterns.md | .codemie/guides/architecture/architecture.md |
| **Development Practices** | Code style, error handling, logging, TypeScript, naming | "How do I handle errors?", "What's the logging pattern?", "Fix this TypeScript error" | .codemie/guides/development/development-practices.md | - |
| **Standards** | Branching, commits, PRs, task tracking | "Create a feature branch", "What's the commit format?", "Merge this to epic" | .codemie/guides/standards/git-workflow.md | - |

### Intent Detection

```
USER REQUEST
    ├─> What is the PRIMARY deliverable? → Primary Category (load P0)
    ├─> What standards must be followed? → Secondary Categories (load P0s)
    └─> How many files affected? → Complexity (1-2: Simple, 3-5: Medium, 6+: High)
```

### Complexity Guide

| Level | Indicators | Action |
|-------|------------|--------|
| **Simple** | 1-2 files, clear pattern | P0 guide if unsure |
| **Medium** | 3-5 files, standard scope | Load P0 guides |
| **High** | 6+ files, architectural impact | All P0+P1 guides, consider planning mode |

---

## 🔄 EXECUTION WORKFLOW

```
START
  ├─> STEP 1: Parse Request
  │   └─ Match intent to Category → Assess complexity
  │
  ├─> STEP 2: Load Guides
  │   └─ Load P0 guides → Confidence < 80%? → Load P1 or ask user
  │
  ├─> STEP 3: Execute
  │   └─ Apply patterns from guides → Follow Critical Rules
  │
  └─> STEP 4: Validate & Deliver
      └─ Run checklist → All pass? → Deliver
```

### Pre-Delivery Checklist

- [ ] Meets user's request requirements?
- [ ] Follows patterns from loaded guides?
- [ ] Critical Rules followed?
- [ ] No hardcoded secrets or credentials?
- [ ] TypeScript types are correct (no loose `any`)?
- [ ] Backend changes: does code compile with `tsc`?
- [ ] Mobile changes: does Metro bundler accept the code?

---

## 🛠️ COMMANDS

### Backend (`cd backend` first)

| Task | Command | Notes |
|------|---------|-------|
| **Setup** | `npm install` | First-time setup |
| **Run Dev** | `npm run dev` | nodemon + ts-node, port 3000 |
| **Build** | `npm run build` | Compiles TypeScript → dist/ |
| **Start Prod** | `npm start` | Runs compiled dist/server.js |
| **Prisma Generate** | `npm run prisma:generate` | After schema changes |
| **Prisma Migrate** | `npm run prisma:migrate` | Create + run migration |
| **Prisma Studio** | `npm run prisma:studio` | Visual DB browser |

### Mobile (`cd mobile` first)

| Task | Command | Notes |
|------|---------|-------|
| **Setup** | `npm install && cd ios && pod install && cd ..` | First-time + iOS deps |
| **Metro** | `npm start` | Keep open in Terminal 1 |
| **iOS** | `npm run ios` | iPhone 16 Pro simulator |
| **Android** | `npm run android` | Android emulator |
| **Lint** | `npm run lint` | ESLint check |
| **Test** ⚠️ | `npm test` | ONLY when user requests |

### Verify Running

```bash
# Backend health check
curl http://localhost:3000/api/health

# Metro reset (if bundler issues)
cd mobile && npm start -- --reset-cache
```

---

## 🏗️ PROJECT CONTEXT

### Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Language | TypeScript | 5.x (both) |
| Backend Framework | Express | 5.x |
| Backend Runtime | Node.js | 18+ |
| Backend ORM | Prisma | 7.x |
| Cloud Database | PostgreSQL | via Supabase or local |
| Mobile Framework | React Native | 0.82 |
| Mobile State | Redux Toolkit + RTK Query | 2.x |
| Mobile Local DB | SQLite (react-native-sqlite-storage) | 6.x |
| Mobile UI | React Native Paper | 5.x |
| Mobile Navigation | React Navigation | 6.x |

### Project Structure

```
CRM/
├── backend/                   Node.js/Express REST API
│   ├── src/
│   │   ├── config/database.ts Prisma + pg pool setup
│   │   ├── middleware/        Express middleware (error handler)
│   │   ├── routes/            Resource routers + api.ts registry
│   │   └── server.ts          Entry point
│   └── prisma/schema.prisma   Database schema
├── mobile/                    React Native iOS-first app
│   ├── src/
│   │   ├── database/          SQLite offline service (singleton)
│   │   ├── navigation/        React Navigation stack
│   │   ├── screens/           Screen components
│   │   ├── store/             Redux store, slices, RTK Query API
│   │   └── theme/             React Native Paper theme
│   └── App.tsx                App root
├── specs/                     Feature specs (spec-driven dev)
├── .codemie/guides/           Architecture and pattern guides ← YOU ARE HERE
├── BRANCHING_STRATEGY.md      Git workflow details
└── README.md                  Setup and project overview
```

### Key Integrations

| Integration | Purpose | Guide |
|-------------|---------|-------|
| Supabase (PostgreSQL) | Cloud database for backend | .codemie/guides/data/data-patterns.md |
| SQLite (mobile) | Offline-first local storage | .codemie/guides/data/data-patterns.md |

---

## 🔧 TROUBLESHOOTING

| Symptom | Cause | Solution |
|---------|-------|----------|
| `DATABASE_URL` not set error | Missing `.env` file | Create `backend/.env` with `DATABASE_URL` |
| Prisma client not found | Schema changed, no generate | Run `cd backend && npm run prisma:generate` |
| iOS app won't connect | Backend not running | Start backend first, check port 3000 |
| Android can't reach backend | Wrong host URL | Uses `10.0.2.2:3000` auto (see `api.ts:13`) |
| Metro bundler stalled | Cache corruption | `cd mobile && npm start -- --reset-cache` |
| Port 8081 busy | Previous Metro still running | `lsof -ti:8081 \| xargs kill -9` |
| Port 3000 busy | Previous backend running | `lsof -i :3000` then kill PID |
| `pod install` fails | Pods out of sync | `cd mobile/ios && pod deintegrate && pod install` |
| SQLite not initialized | `initialize()` not called | Call `databaseService.initialize()` in App.tsx effect |

---

## 🎯 REMEMBER

### Workflow
1. **Parse** → Match intent to Category (Task Classifier)
2. **Load** → Read P0 guides for matched categories
3. **Check** → Confidence ≥ 80%? No → load more or ask user
4. **Execute** → Apply patterns from guides
5. **Validate** → Checklist must pass
6. **Deliver**

### When to Ask User
- Ambiguous requirements
- Low confidence after reading guides
- Missing information (e.g., which epic to branch from)
- Architecture decisions affecting multiple layers

---
