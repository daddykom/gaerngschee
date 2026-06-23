## Why

AGENTS.md contains outdated and inaccurate information that misleads AI assistants about the project structure and conventions. The documented store structure doesn't match the actual implementation, and critical sections like OpenSpec workflow and Docker setup are missing. This causes confusion and inconsistent code generation.

## What Changes

- Update directory structure to reflect actual project layout
- Correct NgRx store organization (remove non-existent subdirectories)
- Add OpenSpec workflow documentation (`/opsx-propose`, `/opsx-apply`, etc.)
- Add Docker setup section
- Fix file pattern descriptions
- Remove "Noch offene Entscheidungen" section (moved to OpenSpec specs)
- Improve code examples to match actual implementation style
- Add testing and CI/CD sections
- Add backend PHP conventions section

## Capabilities

### New Capabilities
- `agents-md-workflow`: Document the AI-assisted development workflow using OpenSpec changes

### Modified Capabilities
- (none - this is a documentation-only change)

## Impact

- `AGENTS.md` will be completely rewritten
- No code changes required
- Improves future AI-assisted development consistency