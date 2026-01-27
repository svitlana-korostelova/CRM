# Data Model: Development Workflow Entities

**Feature**: 002-development-workflow  
**Date**: 2025-01-26  
**Purpose**: Define workflow entities and their relationships

## Overview

This feature establishes workflow processes and documentation. The "data model" here represents workflow entities (Epic, Feature, Task, Story, Commit) that are tracked through documentation and Git, not database entities.

## Entities

### Epic

**Description**: Represents a large feature area containing multiple related features.

**Attributes**:
- `name`: Epic name (e.g., "Authentication", "Client Management")
- `number`: Sequential epic number (001, 002, 003...)
- `description`: Epic description and goals
- `status`: Current status (planning, in-progress, complete)
- `related_features`: List of features belonging to this epic

**Relationships**:
- Contains multiple Features
- Has tasks.md file (when features are created)
- Belongs to main branch (epic branches merge to main)

**Documentation Location**: 
- Branch: `epic/###-epic-name`
- Documentation: `BRANCHING_STRATEGY.md`

**Examples**:
- `epic/001-authentication`
- `epic/002-client-management`
- `epic/003-deal-management`

---

### Feature

**Description**: Represents a smaller, independently developable story within an epic.

**Attributes**:
- `name`: Feature name (e.g., "user-login", "client-crud")
- `number`: Sequential feature number within epic (001, 002, 003...)
- `epic_reference`: Reference to parent epic
- `status`: Current status (planning, in-progress, review, complete)
- `tasks`: List of tasks for this feature
- `user_stories`: User stories implemented by this feature

**Relationships**:
- Belongs to Epic
- Has tasks.md file
- Has commits (Git commits)
- Has user stories

**Documentation Location**:
- Branch: `epic/###-epic-name/feature/###-feature-name`
- Tasks: `specs/[###-feature-name]/tasks.md`
- Spec: `specs/[###-feature-name]/spec.md`

**Examples**:
- `epic/001-authentication/feature/001-user-login`
- `epic/002-client-management/feature/001-client-crud`

---

### Task

**Description**: Represents an actionable implementation item tracked in tasks.md.

**Attributes**:
- `id`: Task identifier (T001, T002, T003...)
- `description`: Task description with file paths
- `status`: Complete (`[x]`) or incomplete (`[ ]`)
- `story_reference`: Which user story this task belongs to (US1, US2, etc.)
- `parallelizable`: Whether task can run in parallel with others (`[P]` marker)
- `dependencies`: Other tasks this depends on

**Relationships**:
- Belongs to Feature/Story
- Tracked in tasks.md file
- May depend on other Tasks

**Documentation Location**:
- File: `specs/[###-feature-name]/tasks.md`
- Format: `- [ ] T001 [P] [US1] Description with file path`

**Examples**:
- `- [ ] T001 Create project structure per implementation plan`
- `- [x] T005 [P] [US1] Create User model in src/models/user.py`

---

### Story

**Description**: Represents a user story being developed (from spec.md).

**Attributes**:
- `title`: Story title
- `priority`: Priority level (P1, P2, P3...)
- `status`: Current status (pending, in-progress, review, complete)
- `completion_date`: Date story was marked complete
- `reviewer`: Person who reviewed the story
- `tasks`: List of tasks for this story

**Relationships**:
- Has Tasks
- Has Commits
- Belongs to Feature
- Defined in spec.md

**Documentation Location**:
- Spec: `specs/[###-feature-name]/spec.md` (User Scenarios section)
- Tasks: `specs/[###-feature-name]/tasks.md` (organized by story)

**Examples**:
- User Story 1 - Establish Development Workflow Documentation (Priority: P1)
- User Story 2 - Epic-Feature Branching Strategy (Priority: P1)

---

### Commit

**Description**: Represents a code commit in the workflow.

**Attributes**:
- `story_reference`: Which story this commit implements
- `commit_message`: Git commit message
- `reviewer_approval`: Whether code was reviewed before commit
- `compilation_status`: Whether code compiles successfully
- `runtime_status`: Whether code runs successfully
- `commit_hash`: Git commit hash
- `timestamp`: Commit timestamp

**Relationships**:
- Belongs to Story
- Contains code changes
- May reference Tasks completed

**Documentation Location**:
- Git repository (commit history)
- Commit messages should reference story/task

**Examples**:
- `git commit -m "Complete US1 - Establish workflow documentation"`
- `git commit -m "Complete T001-T005 for User Story 1"`

---

## Entity Relationships Diagram

```
Epic
  ├── contains → Feature (1 to many)
  └── merges to → main branch

Feature
  ├── belongs to → Epic (many to 1)
  ├── has → Story (1 to many)
  ├── has → tasks.md file (1 to 1)
  └── has → Commits (1 to many)

Story
  ├── belongs to → Feature (many to 1)
  ├── has → Tasks (1 to many)
  └── has → Commits (1 to many)

Task
  ├── belongs to → Story (many to 1)
  ├── depends on → Task (many to many, optional)
  └── tracked in → tasks.md (many to 1)

Commit
  ├── belongs to → Story (many to 1)
  └── contains → code changes
```

## Workflow State Transitions

### Epic Status Flow
```
planning → in-progress → complete
```

### Feature Status Flow
```
planning → in-progress → review → complete
```

### Story Status Flow
```
pending → in-progress → review → complete
```

### Task Status Flow
```
[ ] (incomplete) → [x] (complete)
```

## Validation Rules

1. **Epic Naming**: Must match pattern `epic/###-epic-name` where ### is 3-digit number
2. **Feature Naming**: Must match pattern `epic/###-epic-name/feature/###-feature-name`
3. **Task ID**: Must be sequential (T001, T002, T003...)
4. **Task Checkbox**: Must be `[ ]` or `[x]` (Markdown checkbox syntax)
5. **Story Priority**: Must be P1, P2, P3... (P1 is highest priority)
6. **Commit Requirement**: All commits must have reviewer approval and pass compilation

## Notes

- These entities are tracked through documentation (Markdown files) and Git, not a database
- The workflow is enforced through process, not code
- Tasks.md serves as the primary tracking mechanism for implementation progress
- Git branches and commits provide audit trail and version control
