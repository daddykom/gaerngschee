## ADDED Requirements

### Requirement: AGENTS.md serves as index document
The AGENTS.md file SHALL serve as an index that links to relevant documentation files. It SHALL NOT contain the full content of every topic but SHALL provide navigation to human-readable documents in `documents/` and agent-specific specs in `openspec/specs/`.

#### Scenario: AGENTS.md links to documents
- **WHEN** an AI assistant reads AGENTS.md
- **THEN** it SHALL find links to `documents/*.md` for human-focused content
- **AND** it SHALL find links to `openspec/specs/*/spec.md` for agent-specific specifications

### Requirement: Human documentation lives in documents/ directory
Human-readable documentation SHALL be placed in the `documents/` directory at the project root. This includes project overview, architecture decisions, and conventions that humans need to understand.

#### Scenario: Documents directory structure
- **WHEN** a human or AI accesses project documentation
- **THEN** the following files SHALL exist in `documents/`:
  - `project.md` - Project overview and goals
  - `directory-structure.md` - Directory layout explanation
  - `architecture.md` - Architecture decisions and patterns
  - `frontend-conventions.md` - Angular and frontend patterns
  - `backend-conventions.md` - PHP and backend patterns

### Requirement: Agent-specific specs live in openspec/specs/
Agent-specific technical specifications SHALL be placed in `openspec/specs/<capability>/spec.md` files. These specs define system behavior for AI assistants and SHALL NOT contain human-focused content.

#### Scenario: OpenSpec specs organized by capability
- **WHEN** an AI assistant needs to understand system behavior
- **THEN** it SHALL consult `openspec/specs/<capability>/spec.md` files
- **AND** these specs SHALL define requirements in WHEN/THEN format

### Requirement: No content duplication between documents and specs
Content SHALL NOT be duplicated between `documents/` files and `openspec/specs/` files. Documents SHALL describe concepts for humans; specs SHALL define requirements for agents.

#### Scenario: No duplicate content
- **WHEN** documentation is being created or updated
- **THEN** content SHALL exist in only one location (either documents/ or openspec/specs/)
- **AND** cross-references SHALL be used when topics overlap

### Requirement: Document files use clear, simple language
Documents in `documents/` SHALL use clear, simple language suitable for human readers. Technical implementation details SHALL be minimized in favor of conceptual explanations.

#### Scenario: Documents are human-readable
- **WHEN** a new contributor reads `documents/project.md`
- **THEN** they SHALL understand the project goals without needing technical context
- **AND** technical details SHALL be delegated to relevant spec files

### Requirement: Specs use structured format with scenarios
Specs in `openspec/specs/` SHALL use structured format with `### Requirement:` headers and `#### Scenario:` headers in WHEN/THEN format. Every requirement SHALL have at least one scenario.

#### Scenario: Specs are machine-parseable
- **WHEN** an AI assistant reads a spec file
- **THEN** it SHALL be able to parse requirements and scenarios programmatically
- **AND** each requirement SHALL use SHALL/MUST for normative statements