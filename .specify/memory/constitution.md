# CRM Application Constitution

**Purpose**: This constitution defines the core principles, constraints, and governance for a Customer Relationship Management (CRM) application focused on managing customer data, interactions, deals, and relationships for small-to-medium service businesses. This is a dedicated CRM solution, not an exhaustive Enterprise Resource Planning (ERP) system covering all business operations.

## Core Principles

### I. Offline-First Architecture (NON-NEGOTIABLE)
All mobile features MUST work offline with local data storage. The system must:
- Store critical data locally using SQLite on mobile devices
- Queue operations when offline and sync when connectivity is restored
- Provide immediate feedback to users without waiting for network requests
- Handle conflict resolution gracefully using timestamp-based versioning
- Never block user workflows due to network availability

### II. Mobile-First Design
The application is designed primarily for mobile devices (iOS priority, Android MVP):
- All features must be usable on phones and tablets
- Touch-optimized interfaces with appropriate sizing for mobile screens
- Performance optimized for mobile hardware constraints
- Battery-efficient background sync operations
- Native mobile patterns and conventions respected

### III. Integration-Ready Architecture
The system must be designed to integrate with third-party services:
- All integrations use free-tier APIs where possible
- OAuth 2.0 for secure third-party authentication
- Modular integration layer allowing easy addition/removal of services
- Token management and automatic refresh for all integrations
- Webhook support for real-time updates from external services

### IV. Test-First Development (NON-NEGOTIABLE)
TDD mandatory for all business logic:
- Tests written → User approved → Tests fail → Then implement
- Red-Green-Refactor cycle strictly enforced
- Unit tests for business logic and services
- Integration tests for API endpoints and sync mechanisms
- E2E tests for critical user flows (authentication, client management, deal creation)
- Offline sync testing is mandatory

### V. Data Integrity & Security
Critical for handling sensitive client and business data:
- All data encrypted at rest and in transit
- JWT authentication with refresh token rotation
- Role-based access control (RBAC) for multi-user scenarios
- Audit logging for all data modifications
- Secure local database encryption on mobile devices
- GDPR-compliant data handling practices

### VI. Performance & Scalability
System must handle growth from small to medium businesses:
- API response times under 200ms for 95th percentile
- Support for 1000+ concurrent users per instance
- Efficient database queries with proper indexing
- Pagination for large datasets
- Image optimization and lazy loading
- Background sync that doesn't block UI

### VII. Simplicity & Maintainability
Start simple, avoid over-engineering:
- YAGNI (You Aren't Gonna Need It) principles
- Clear, self-documenting code structure
- Modular architecture allowing independent feature development
- Consistent patterns across codebase
- Comprehensive documentation for integrations and APIs

## Technology Stack Constraints

### Backend
- **Runtime**: Node.js with TypeScript (mandatory)
- **Framework**: Express.js or Fastify
- **Database**: PostgreSQL (primary), SQLite (mobile local)
- **ORM**: Prisma (type-safe database access)
- **Authentication**: JWT with refresh tokens

### Mobile
- **Framework**: React Native (iOS priority, Android MVP)
- **State Management**: Redux Toolkit + RTK Query
- **Offline Storage**: React Native SQLite
- **Navigation**: React Navigation v6

### Third-Party Services
- **Budget Constraint**: Free tier only for all integrations
- **Communication**: Slack API, Microsoft Teams API, Google Meet
- **Task Management**: Trello API, custom Kanban board
- **Documentation**: Notion API, Google Sheets API
- **Storage**: Cloudinary or AWS S3 (free tier)

## Development Workflow

### Feature Development Process
1. Specification phase (`/speckit.specify`) - Define WHAT and WHY
2. Clarification phase (`/speckit.clarify`) - Resolve ambiguities
3. Planning phase (`/speckit.plan`) - Define HOW with technical details
4. Task breakdown (`/speckit.tasks`) - Create actionable implementation tasks
5. Implementation (`/speckit.implement`) - Execute with TDD approach

### Code Quality Gates
- All PRs must pass linting and type checking
- Test coverage minimum 80% for business logic
- All integration tests must pass before merge
- Offline functionality must be tested for each mobile feature
- Security review required for authentication and data handling changes

### Review Requirements
- All code changes require review before merge
- Constitution compliance verified in every PR
- Performance impact assessment for database changes
- Security review for any third-party integration additions

## Governance

### Constitution Supremacy
This constitution supersedes all other development practices, coding standards, and architectural decisions. Any deviation must be:
- Documented with clear justification
- Approved through explicit discussion
- Updated in this constitution if it becomes a new standard

### Amendment Process
Constitution amendments require:
1. Clear documentation of the proposed change
2. Justification showing why current principles are insufficient
3. Impact analysis on existing code and features
4. Approval from project stakeholders
5. Update to this document with version increment

### Complexity Justification
Any architectural complexity beyond simple, direct implementation must be justified:
- Document the specific problem it solves
- Explain why simpler alternatives were rejected
- Show measurable benefits (performance, maintainability, scalability)

**Version**: 1.0.0 | **Ratified**: 2025-01-26 | **Last Amended**: 2025-01-26
