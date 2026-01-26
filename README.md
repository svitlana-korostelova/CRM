# CRM Application

A comprehensive mobile-first CRM (Customer Relationship Management) system for small-to-medium service businesses (beauty salons, dental clinics, transport companies) with offline-first capabilities, third-party integrations, and comprehensive customer management tools.

## Project Status

🚧 **In Planning Phase** - Spec-kit methodology initialized

## Technology Stack

### Mobile Application
- **Framework**: React Native (iOS priority, Android MVP later)
- **State Management**: Redux Toolkit + RTK Query
- **Offline Storage**: React Native SQLite
- **UI Library**: React Native Paper or NativeBase
- **Navigation**: React Navigation v6

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js or Fastify
- **Database**: PostgreSQL (cloud), SQLite (mobile local)
- **ORM**: Prisma
- **Authentication**: JWT + Refresh Tokens

### Third-Party Integrations (Free Tier)
- **Communication**: Slack, Microsoft Teams, Google Meet
- **Task Management**: Trello, Custom Kanban Board
- **Documentation**: Notion, Google Sheets
- **Storage**: Cloudinary or AWS S3 (free tier)

## Spec-Driven Development

This project uses [spec-kit](https://github.com/github/spec-kit) for spec-driven development. The workflow follows these phases:

1. **Specification** (`/speckit.specify`) - Define feature requirements
2. **Clarification** (`/speckit.clarify`) - Resolve ambiguities
3. **Planning** (`/speckit.plan`) - Create technical implementation plan
4. **Tasks** (`/speckit.tasks`) - Break down into actionable tasks
5. **Implementation** (`/speckit.implement`) - Execute with TDD

### Available Commands

- `/speckit.specify` - Create or update feature specification
- `/speckit.clarify` - Clarify specification requirements
- `/speckit.plan` - Generate technical implementation plan
- `/speckit.tasks` - Create task breakdown from plan
- `/speckit.implement` - Execute implementation tasks
- `/speckit.checklist` - Generate quality checklists
- `/speckit.analyze` - Analyze existing code

## Project Structure

```
CRM/
├── .specify/              # Spec-kit configuration
│   ├── memory/           # Project constitution
│   ├── scripts/          # Helper scripts
│   └── templates/        # Spec templates
├── .cursor/              # Cursor agent commands
│   └── commands/         # Spec-kit commands
├── specs/                # Feature specifications (created during development)
├── mobile/               # React Native app (to be created)
├── backend/              # Node.js backend (to be created)
└── shared/               # Shared types/utilities (to be created)
```

## Core Principles

See [`.specify/memory/constitution.md`](.specify/memory/constitution.md) for the complete project constitution. Key principles:

1. **Offline-First Architecture** - All mobile features must work offline
2. **Mobile-First Design** - Optimized for phones and tablets
3. **Integration-Ready** - Modular third-party service integration
4. **Test-First Development** - TDD mandatory for all business logic
5. **Data Integrity & Security** - Encrypted data, secure authentication
6. **Performance & Scalability** - Handle growth from small to medium businesses
7. **Simplicity & Maintainability** - YAGNI principles, clear code structure

## Development Workflow

### Story-by-Story Development

1. **Create Epic Branch**: Start with `epic/###-epic-name` from `main`
2. **Create Feature Branch**: Create `epic/###-epic-name/feature/###-feature-name` for each story
3. **Develop with TDD**: Write tests first, then implement (Red-Green-Refactor)
4. **Verify Compilation**: Ensure code builds with Metro bundler and runs on iOS simulator
5. **Get Review**: Communicate story completion and wait for review approval
6. **Commit & Push**: After approval, commit and push to remote
7. **Update Tasks**: Mark completed tasks in `tasks.md` with `[x]`

See [BRANCHING_STRATEGY.md](BRANCHING_STRATEGY.md) for detailed branching guidelines.

### Task Management

- Each feature has a `tasks.md` file with checkboxes
- Tasks are organized by user story
- Mark tasks complete with `[x]` as work progresses
- Tasks.md is committed with code changes

### TDD Approach

- **Red**: Write tests first, see them fail
- **Green**: Implement to make tests pass
- **Refactor**: Improve code while keeping tests green
- All business logic must follow TDD

## Getting Started

1. Review the [constitution](.specify/memory/constitution.md)
2. Review the [branching strategy](BRANCHING_STRATEGY.md)
3. Start with `/speckit.specify` to create your first feature specification
4. Follow the spec-driven development workflow

## Development Phases

### Phase 1: Foundation (MVP)
- Backend API setup with authentication
- Database schema design
- Basic mobile app with client CRUD
- Offline storage implementation
- Basic sync mechanism

### Phase 2: Core Features
- Deal management
- Task board implementation
- Call logging
- Basic analytics dashboard

### Phase 3: Integrations
- Slack integration
- Google Meet/Calendar
- Notion integration
- Trello integration

### Phase 4: Advanced Features
- Advanced analytics
- Custom report builder
- Additional integrations
- Performance optimization

## License

[To be determined]
