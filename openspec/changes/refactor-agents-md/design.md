## Context

AGENTS.md is the primary documentation file for AI assistants working on the project. It contains project context, conventions, and patterns. Currently it has several issues:

1. **Outdated directory structure** - Documents `store/actions/`, `store/reducers/`, `store/selectors/`, `store/effects/` subdirectories which don't exist. The actual structure uses feature-based organization with `offers.feature.ts`, `offers.actions.ts`, etc.

2. **Missing OpenSpec documentation** - No mention of the change workflow commands (`/opsx-propose`, `/opsx-apply`, etc.)

3. **Incomplete sections** - Docker setup missing, testing guidance minimal, no CI/CD info

4. **"Noch offene Entscheidungen"** - Lists open decisions that should live in OpenSpec specs, not in AGENTS.md

## Goals / Non-Goals

**Goals:**
- Accurate documentation that matches implementation
- Complete coverage of AI assistant needs
- Clear structure for easy navigation
- Documentation of OpenSpec workflow

**Non-Goals:**
- Not adding new functionality
- Not changing code conventions (only documenting existing ones)
- Not creating tutorial-level documentation
- Not documenting every single file - focusing on patterns

## Decisions

### Decision: Keep AGENTS.md as single source of truth for AI context

**Choice:** Maintain AGENTS.md as the primary AI assistant reference document, separate from OpenSpec specs.

**Rationale:** AGENTS.md serves a different purpose than OpenSpec specs. It provides immediate context for AI assistants without requiring them to browse multiple files. OpenSpec specs define system behavior; AGENTS.md provides working conventions.

### Decision: Use markdown tables for structured information

**Choice:** Use tables for technology stack, file patterns, and similar structured data.

**Rationale:** Improves readability and allows AI assistants to parse information consistently. Better than prose lists for comparison data.

### Decision: Include code examples from actual implementation

**Choice:** Reference real code patterns from the codebase in examples.

**Rationale:** AGENTS.md currently has a code example that doesn't match the actual implementation style. Using real examples ensures AI assistants generate correct code.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| AGENTS.md becomes outdated again | Add consistency check to CI/CD pipeline |
| Too much detail makes it unwieldy | Keep it focused on AI assistant needs, not comprehensive documentation |
| OpenSpec and AGENTS.md drift apart | Reference OpenSpec specs from AGENTS.md and vice versa |

## Open Questions

1. Should AGENTS.md reference specific OpenSpec change names, or just the general workflow?
2. How to handle multilingual aspects - German-only AGENTS.md or English with German project context?
3. Should we add a "recent changes" section to track AGENTS.md updates?