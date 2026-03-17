---
# Git Workflow

**Project**: CRM Application
**Strategy**: Epic-Feature branching (spec-driven development)
**Main Branch**: `main` (production-ready)
**Reference**: `BRANCHING_STRATEGY.md`

---

## Branching Strategy

| Branch Type | Pattern | Purpose |
|-------------|---------|---------|
| Main | `main` | Stable, production-ready code |
| Epic | `epic/###-epic-name` | Large feature area (e.g., authentication) |
| Feature | `epic/###-epic-name/feature/###-feature-name` | Single user story within an epic |

**Epic numbering**: 001=Auth, 002=Client Mgmt, 003=Deals, 004=Tasks, 005=Call Logging, 006=Analytics, 007=Integrations

---

## Workflow

```bash
# 1. Create epic from main
git checkout main && git pull origin main
git checkout -b epic/002-client-management
git push -u origin epic/002-client-management

# 2. Create feature from epic
git checkout epic/002-client-management
git checkout -b epic/002-client-management/feature/001-client-crud
git push -u origin epic/002-client-management/feature/001-client-crud

# 3. Develop + commit (TDD: red → green → refactor)
git add [specific files]
git commit -m "feat(clients): add client CRUD endpoints"

# 4. Merge feature → epic (after review)
git checkout epic/002-client-management
git merge epic/002-client-management/feature/001-client-crud
git push origin epic/002-client-management
```

---

## Commit Format

```
[type]([scope]): [description]
```

**Types**: `feat` | `fix` | `docs` | `refactor` | `test` | `chore`

**Examples**:
- `feat(clients): add client CRUD API endpoints`
- `fix(mobile): resolve SQLite initialization race condition`
- `chore(deps): update Prisma to v7.3`
- `refactor(store): split appSlice into separate domain slices`

---

## Commit Rules

| ✅ DO | ❌ DON'T |
|-------|----------|
| Atomic commits per logical change | Mix backend + mobile changes |
| Every commit must compile + run | Commit broken/non-compiling code |
| Update `tasks.md` with completed tasks | Leave tasks.md stale |
| Stage specific files | `git add -A` without review |

---

## Task Management

Each feature branch includes a `tasks.md`:
- Organized by user story with checkboxes `[ ]` / `[x]`
- Updated and committed as work progresses
- Lives in: `specs/[epic-number]-[name]/tasks.md`

---

## Merge Strategy

```
feature → epic (after code review approval)
epic → main (when all features in epic are complete and tested)
```

**Before merging to epic:**
- [ ] Compiles and runs (Metro bundler + iOS Simulator)
- [ ] Code review approved
- [ ] `tasks.md` updated

---

## Quick Reference

| Task | Command |
|------|---------|
| Create epic | `git checkout -b epic/###-name` |
| Create feature | `git checkout -b epic/###-name/feature/###-name` |
| Push new branch | `git push -u origin [branch]` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |
| Delete merged feature | `git branch -d [branch]` |

---
