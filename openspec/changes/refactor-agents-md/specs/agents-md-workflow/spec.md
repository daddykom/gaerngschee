## ADDED Requirements

### Requirement: AGENTS.md documents OpenSpec workflow
The AGENTS.md file SHALL document the OpenSpec change workflow including `/opsx-propose`, `/opsx-apply`, `/opsx-archive`, `/opsx-sync-specs`, and `/opsx-explore` commands.

#### Scenario: OpenSpec commands documented
- **WHEN** an AI assistant reads AGENTS.md
- **THEN** it SHALL find documentation for all OpenSpec commands with their purposes and usage patterns

### Requirement: AGENTS.md documents correct project structure
The AGENTS.md file SHALL contain an accurate directory structure reflecting the actual project layout.

#### Scenario: Directory structure matches implementation
- **WHEN** an AI assistant follows the documented directory structure
- **THEN** it SHALL find files in the locations described

### Requirement: AGENTS.md documents Docker setup
The AGENTS.md file SHALL document the Docker-based local development environment.

#### Scenario: Docker development documented
- **WHEN** a new developer reads AGENTS.md
- **THEN** it SHALL find instructions for running the local development environment with Docker

### Requirement: AGENTS.md documents Angular conventions
The AGENTS.md file SHALL document Angular-specific patterns including NgRx store organization, component structure, and service conventions.

#### Scenario: Angular patterns documented
- **WHEN** an AI assistant needs to create a new Angular component or service
- **THEN** it SHALL find the correct patterns and conventions in AGENTS.md

### Requirement: AGENTS.md documents backend PHP conventions
The AGENTS.md file SHALL document backend conventions including Slim framework patterns, route organization, and data handling.

#### Scenario: PHP backend conventions documented
- **WHEN** an AI assistant needs to modify backend code
- **THEN** it SHALL find the correct patterns and file organization in AGENTS.md

### Requirement: AGENTS.md provides testing guidance
The AGENTS.md file SHALL document the testing approach including Jest for frontend unit tests and Playwright for E2E tests.

#### Scenario: Testing approach documented
- **WHEN** an AI assistant needs to write tests
- **THEN** it SHALL find information about testing tools and conventions

### Requirement: AGENTS.md provides CI/CD information
The AGENTS.md file SHALL document the GitHub Actions workflow and deployment process.

#### Scenario: CI/CD documented
- **WHEN** a developer needs to understand the build and deployment process
- **THEN** they SHALL find this documented in AGENTS.md