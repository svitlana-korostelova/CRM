# Quickstart Guide: Development Workflow

**Feature**: 002-development-workflow  
**Date**: 2025-01-26  
**Purpose**: Quick reference guide for using the development workflow

## Quick Start: Using the Development Workflow

This guide provides a quick reference for developers to follow the established workflow.

### 1. Starting a New Epic

```bash
# 1. Switch to main and pull latest
git checkout main
git pull origin main

# 2. Create epic branch
git checkout -b epic/001-authentication

# 3. Push epic branch
git push -u origin epic/001-authentication
```

**Result**: Epic branch created and ready for features.

---

### 2. Creating a Feature Branch

```bash
# 1. Switch to epic branch
git checkout epic/001-authentication
git pull origin epic/001-authentication

# 2. Create feature branch
git checkout -b epic/001-authentication/feature/001-user-login

# 3. Push feature branch
git push -u origin epic/001-authentication/feature/001-user-login
```

**Result**: Feature branch created and ready for development.

---

### 3. Working on a Story

```bash
# 1. Ensure you're on the feature branch
git checkout epic/001-authentication/feature/001-user-login

# 2. Open tasks.md to see tasks
# File: specs/001-user-login/tasks.md

# 3. Work on tasks one by one
# - Mark tasks complete: [ ] → [x]
# - Commit tasks.md updates with code

# 4. Follow TDD:
#   a. Write test first
#   b. Get test approved
#   c. See test fail (Red)
#   d. Implement to pass (Green)
#   e. Refactor (Refactor)

# 5. Before committing:
#   a. Run Metro bundler: npm start (or npx react-native start)
#   b. Verify build succeeds
#   c. Run on iOS simulator
#   d. Verify app runs without errors
```

**Result**: Story implementation complete and verified.

---

### 4. Completing a Story

```bash
# 1. Mark all tasks complete in tasks.md
# 2. Verify all tests pass
# 3. Verify build and runtime work
# 4. Communicate story completion to reviewer
# 5. Wait for review approval
# 6. After approval, commit and push:

git add .
git commit -m "Complete US1 - User login story

- Completed tasks T001-T010
- All tests passing
- Build verified with Metro bundler
- App runs successfully on iOS simulator"

git push origin epic/001-authentication/feature/001-user-login
```

**Result**: Story committed and pushed.

---

### 5. Merging Feature to Epic

```bash
# 1. Switch to epic branch
git checkout epic/001-authentication
git pull origin epic/001-authentication

# 2. Merge feature branch
git merge epic/001-authentication/feature/001-user-login

# 3. Push epic branch
git push origin epic/001-authentication

# 4. (Optional) Delete feature branch
git branch -d epic/001-authentication/feature/001-user-login
git push origin --delete epic/001-authentication/feature/001-user-login
```

**Result**: Feature merged into epic.

---

### 6. Merging Epic to Main

```bash
# 1. Ensure all features in epic are complete
# 2. Switch to main
git checkout main
git pull origin main

# 3. Merge epic
git merge epic/001-authentication

# 4. Push main
git push origin main
```

**Result**: Epic merged to main.

---

## Task Management Quick Reference

### Marking Tasks Complete

```markdown
# Before
- [ ] T001 Create project structure

# After
- [x] T001 Create project structure
```

### Task Format

```markdown
- [ ] T001 [P] [US1] Create User model in src/models/user.py
```

- `[ ]` = Checkbox (incomplete)
- `[x]` = Checkbox (complete)
- `T001` = Task ID
- `[P]` = Parallelizable (optional)
- `[US1]` = User Story reference
- Description with file path

---

## TDD Quick Reference

### Red-Green-Refactor Cycle

1. **Red**: Write test → See it fail
   ```bash
   npm test
   # Test fails as expected
   ```

2. **Green**: Implement → Make test pass
   ```bash
   # Write implementation
   npm test
   # Test passes
   ```

3. **Refactor**: Improve code → Keep tests green
   ```bash
   # Refactor implementation
   npm test
   # Tests still pass
   ```

---

## Build Verification Quick Reference

### Before Every Commit

```bash
# 1. Start Metro bundler
npm start
# or
npx react-native start

# 2. In another terminal, build and run
npm run ios
# or
npx react-native run-ios

# 3. Verify:
# - Build completes without errors
# - App launches on iOS simulator
# - App runs without crashes
# - Basic functionality works
```

**Only commit if all verifications pass!**

---

## Common Workflows

### Daily Development Flow

1. Pull latest from feature branch
2. Check tasks.md for next task
3. Work on task (TDD approach)
4. Mark task complete in tasks.md
5. Verify build and runtime
6. Commit task completion
7. Repeat until story complete

### Story Completion Flow

1. Complete all tasks for story
2. Verify all tests pass
3. Verify build and runtime
4. Update tasks.md (mark story tasks complete)
5. Communicate completion to reviewer
6. Wait for approval
7. Commit and push
8. Move to next story

### Feature Completion Flow

1. Complete all stories in feature
2. Merge feature to epic
3. Verify epic still builds
4. Push epic branch
5. Create next feature branch or complete epic

---

## Troubleshooting

### Build Fails Before Commit

**Problem**: Metro bundler reports errors

**Solution**:
1. Fix compilation errors
2. Re-run build
3. Verify build succeeds
4. Then commit

### Tests Fail

**Problem**: Tests don't pass

**Solution**:
1. Check if test is correct (Red phase)
2. If in Green phase, fix implementation
3. If in Refactor phase, check refactoring didn't break logic
4. Re-run tests until all pass

### Merge Conflicts

**Problem**: Conflicts when merging feature to epic

**Solution**:
1. Resolve conflicts in feature branch
2. Test after resolving
3. Commit conflict resolution
4. Then merge to epic

---

## Key Principles

1. **One story at a time**: Complete story before starting next
2. **Review before commit**: Always get approval before pushing
3. **Compilable code**: Never commit broken code
4. **TDD mandatory**: Tests first, then implementation
5. **Task tracking**: Keep tasks.md updated
6. **Story-by-story**: Incremental, safe development

---

## Need Help?

- Review `BRANCHING_STRATEGY.md` for branching details
- Review `README.md` for project overview
- Review `specs/[###-feature-name]/spec.md` for feature requirements
- Review `specs/[###-feature-name]/tasks.md` for task breakdown
