## Why

AGENTS.md is becoming a catch-all document that mixes human-readable documentation with agent-specific technical conventions. As the project grows, this creates problems: humans get overwhelmed with technical details, and agents need more structured, machine-readable information. We need to separate concerns and establish a clear architecture pattern (View/Container) for the frontend.

## What Changes

1. **Add View/Container Pattern** - Document and enforce the View/Container separation principle for Angular components
2. **Split AGENTS.md** - Break it into focused documents:
   - `documents/project.md` - Human-readable project overview
   - `documents/directory-structure.md` - Directory layout
   - `documents/architecture.md` - Architecture decisions
   - `documents/frontend-conventions.md` - Angular patterns
   - `documents/backend-conventions.md` - PHP patterns
   - `openspec/specs/agents-md-workflow/` - Agent-specific workflow (already exists)
3. **Create linking structure** - Main AGENTS.md becomes an index that links to relevant documents
4. **Remove duplication** - Each document contains only what's relevant to its audience

## Capabilities

### New Capabilities

- `view-container-pattern`: Document and enforce View (pure, presentational) vs Container (impure, stateful) separation in Angular components
- `document-organization`: Restructure documentation into human-focused (documents/) and agent-focused (openspec/) files

### Modified Capabilities

- `agents-md-workflow`: Update to reflect new document structure and view-container pattern

## Impact

- `AGENTS.md` will become an index file with links
- New `documents/` directory for human-readable documentation
- `openspec/specs/agents-md-workflow/spec.md` will be updated with view-container requirements
- Frontend components may need refactoring to follow View/Container pattern
- No backend code changes required