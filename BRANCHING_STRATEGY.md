# Branching Strategy

## Overview

This project uses an **Epic-Feature** branching strategy to organize development work into manageable, independently developable units.

## Branch Naming Convention

### Epic Branches
- **Format**: `epic/###-epic-name`
- **Example**: `epic/001-authentication`, `epic/002-client-management`
- **Purpose**: Represents a large feature area containing multiple related features

### Feature Branches
- **Format**: `epic/###-epic-name/feature/###-feature-name`
- **Example**: `epic/001-authentication/feature/001-user-login`, `epic/002-client-management/feature/001-client-crud`
- **Purpose**: Represents a smaller, independently developable story within an epic

## Branch Structure

```
main
├── epic/001-authentication
│   ├── epic/001-authentication/feature/001-user-login
│   ├── epic/001-authentication/feature/002-refresh-tokens
│   └── epic/001-authentication/feature/003-session-management
├── epic/002-client-management
│   ├── epic/002-client-management/feature/001-client-crud
│   ├── epic/002-client-management/feature/002-client-search
│   └── epic/002-client-management/feature/003-offline-sync
└── epic/003-deal-management
    ├── epic/003-deal-management/feature/001-deal-creation
    └── epic/003-deal-management/feature/002-pipeline-stages
```

## Workflow

### Creating an Epic

1. Create epic branch from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b epic/001-authentication
   ```

2. Push epic branch to remote:
   ```bash
   git push -u origin epic/001-authentication
   ```

### Creating a Feature

1. Create feature branch from epic branch:
   ```bash
   git checkout epic/001-authentication
   git pull origin epic/001-authentication
   git checkout -b epic/001-authentication/feature/001-user-login
   ```

2. Push feature branch to remote:
   ```bash
   git push -u origin epic/001-authentication/feature/001-user-login
   ```

### Merging a Feature

1. Complete feature implementation and tests
2. Ensure code compiles and runs (Metro bundler)
3. Get code review approval
4. Merge feature into epic:
   ```bash
   git checkout epic/001-authentication
   git merge epic/001-authentication/feature/001-user-login
   git push origin epic/001-authentication
   ```

5. Delete feature branch (optional):
   ```bash
   git branch -d epic/001-authentication/feature/001-user-login
   git push origin --delete epic/001-authentication/feature/001-user-login
   ```

### Merging an Epic

1. All features in epic are complete
2. Epic branch is tested and stable
3. Merge epic into `main`:
   ```bash
   git checkout main
   git pull origin main
   git merge epic/001-authentication
   git push origin main
   ```

## Epic Numbering

Epics are numbered sequentially starting from 001:
- `001` - Authentication & Access
- `002` - Client Management
- `003` - Deal/Opportunity Management
- `004` - Task & Activity Management
- `005` - Call Logging & Communication
- `006` - Analytics & Reporting
- `007` - Third-Party Integrations

## Feature Numbering

Features within an epic are numbered sequentially starting from 001:
- Within epic 001: `001-user-login`, `002-refresh-tokens`, `003-session-management`
- Each epic restarts feature numbering at 001

## Best Practices

1. **One feature per branch**: Each feature branch should implement one complete user story
2. **Keep features small**: Split large features into smaller, independently testable stories
3. **Regular sync**: Regularly pull from epic branch to stay updated
4. **Clean merges**: Resolve conflicts in feature branch before merging to epic
5. **Compilable commits**: Every commit must compile and run successfully
6. **Review before merge**: All features must be reviewed before merging to epic

## Integration with Tasks.md

Each feature branch should have a `tasks.md` file tracking implementation tasks:
- Tasks organized by user story
- Checkboxes `[ ]` for incomplete, `[x]` for complete
- Updated as work progresses
- Committed with code changes
