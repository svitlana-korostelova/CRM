# Workflow Overview

**Purpose**: This document is the entry point for *how we develop* the CRM project: branching, task tracking, story-by-story delivery, TDD, and compilable code. It points to the canonical sources—nothing here replaces them.

## What the workflow is

The development workflow defines:

1. **Branching** — Epic-feature strategy: `main` → `epic/###-name` → `epic/###-name/feature/###-name`
2. **Task tracking** — `tasks.md` per feature with checkboxes `[ ]` / `[x]`, organized by user story
3. **Story-by-story rhythm** — Develop one story → communicate completion → get review → commit & push
4. **TDD** — Tests first, approved, then implementation (Red-Green-Refactor)
5. **Compilable code** — Verify build (e.g. Metro) and run before every commit

These align with the project [constitution](../../.specify/memory/constitution.md) (TDD, review, quality gates).

## Where to find what

| Topic | Document | Location |
|-------|----------|----------|
| **Principles & constraints** | Constitution | [.specify/memory/constitution.md](../../.specify/memory/constitution.md) |
| **Branching strategy** | Epic-feature branches, merge workflow | [BRANCHING_STRATEGY.md](../../BRANCHING_STRATEGY.md) |
| **Workflow summary in README** | Development Workflow, Task Management, TDD | [README.md](../../README.md#development-workflow) |
| **Quickstart (workflow)** | Step-by-step epic/feature commands | [specs/002-development-workflow/quickstart.md](../../specs/002-development-workflow/quickstart.md) |
| **Git workflow (standards)** | Commit format, merge strategy, task rules | [.codemie/guides/standards/git-workflow.md](../../.codemie/guides/standards/git-workflow.md) |
| **Spec-driven process** | Spec-kit commands (specify → plan → tasks → implement) | [README.md – Spec-Driven Development](../../README.md#spec-driven-development) |

## How to use this

- **New to the project**: Read [constitution](../../.specify/memory/constitution.md), then [BRANCHING_STRATEGY.md](../../BRANCHING_STRATEGY.md), then [README.md#development-workflow](../../README.md#development-workflow).
- **Starting a feature**: Use [quickstart](../../specs/002-development-workflow/quickstart.md) for branch and workflow steps.
- **Commits and merges**: Follow [git-workflow.md](../../.codemie/guides/standards/git-workflow.md) and [BRANCHING_STRATEGY.md](../../BRANCHING_STRATEGY.md).

All links above use paths relative to the repository root. No workflow content has been moved; existing links in README, CLAUDE.md, and other docs continue to point to the same files.
