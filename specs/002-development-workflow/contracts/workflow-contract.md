# Workflow Contract: Development Process

**Feature**: 002-development-workflow  
**Date**: 2025-01-26  
**Purpose**: Define the contract/agreement for how development work is structured and executed

## Workflow Contract

This document defines the contract between developers, reviewers, and the development process itself.

### 1. Branching Strategy Contract

**Agreement**: All development work follows epic-feature branching strategy.

**Obligations**:
- Developers MUST create epic branches from `main` using format `epic/###-epic-name`
- Developers MUST create feature branches from epic branches using format `epic/###-epic-name/feature/###-feature-name`
- Developers MUST merge features to epic before merging epic to main
- All branches MUST follow naming conventions exactly

**Validation**: Branch names are validated against naming patterns.

---

### 2. Task Management Contract

**Agreement**: All features have tasks.md files with checkboxes for task tracking.

**Obligations**:
- Tasks MUST be organized by user story
- Tasks MUST use Markdown checkbox syntax: `[ ]` for incomplete, `[x]` for complete
- Tasks MUST include task ID (T001, T002, etc.)
- Tasks MUST include file paths in descriptions
- Tasks MUST be marked complete when work is done
- Tasks.md MUST be committed with code changes

**Validation**: Tasks.md structure validated against template format.

---

### 3. Story-by-Story Development Contract

**Agreement**: Each story is developed, reviewed, committed, and pushed individually.

**Obligations**:
- Developers MUST complete one story before starting the next
- Developers MUST communicate story completion to reviewer
- Developers MUST wait for review approval before committing
- Developers MUST commit and push after approval
- Reviewers MUST review code before approving commit
- All commits MUST reference the story being completed

**Validation**: Commit messages should reference story/task IDs.

---

### 4. TDD Workflow Contract

**Agreement**: Test-Driven Development is mandatory for all business logic.

**Obligations**:
- Developers MUST write tests first (before implementation)
- Tests MUST be approved before implementation begins
- Tests MUST fail initially (Red phase)
- Implementation MUST make tests pass (Green phase)
- Code MUST be refactored while keeping tests green (Refactor phase)
- All tests MUST pass before story is marked complete

**Validation**: Test files must exist before implementation files.

---

### 5. Compilable Code Contract

**Agreement**: All committed code must compile and run successfully.

**Obligations**:
- Developers MUST run Metro bundler build before committing
- Developers MUST verify app runs on iOS simulator before committing
- Developers MUST fix compilation errors before committing
- Developers MUST NOT commit broken code
- All commits MUST be compilable and runnable

**Validation**: Build and runtime verification is manual (developer responsibility).

---

### 6. Review Process Contract

**Agreement**: All code changes require review before commit.

**Obligations**:
- Developers MUST request review after completing story
- Reviewers MUST review code within agreed timeframe
- Reviewers MUST provide feedback or approval
- Developers MUST address feedback before committing
- All commits MUST have reviewer approval

**Validation**: Review approval is tracked through communication (not automated).

---

## Contract Violations

Violations of these contracts should be addressed through:
1. Code review feedback
2. Process improvement discussions
3. Documentation updates if process needs clarification

## Contract Amendments

These contracts can be amended through:
1. Spec updates
2. Constitution amendments (if constitution-related)
3. Team consensus and documentation updates
