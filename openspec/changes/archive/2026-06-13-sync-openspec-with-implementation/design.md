## Context

The project implemented several changes that were not reflected in OpenSpec specs:
1. View/Container pattern for Angular components
2. NgRx selector additions and effects format changes
3. Playwright E2E testing setup
4. Documentation restructuring (documents/ directory)

These changes are already implemented in code. The OpenSpec specs need to be updated to document the new patterns and implementation status.

## Goals / Non-Goals

**Goals:**
- Update OpenSpec specs to reflect actual implementation
- Document View/Container pattern as the standard for Angular components
- Update implementation status for offers capability
- Document Playwright testing setup

**Non-Goals:**
- Not implementing new features (this is documentation sync)
- Not changing any code - only updating specs
- Not creating new functionality

## Decisions

### Decision: View/Container Pattern as Standard

**Choice:** Use `ViewComponent` and `ContainerComponent` suffixes for component naming.

**Rationale:**
- Clear from name alone what the component does
- Easy to grep/find in codebase
- Matches existing Angular conventions

### Decision: Effects as Object not Array

**Choice:** `offersEffects = { loadOffersEffect }` instead of `[loadOffersEffect]`.

**Rationale:**
- Required by NgRx `provideEffects()` for functional effects
- More explicit about effect names
- Better TypeScript inference

### Decision: `changeDetection: ChangeDetectionStrategy.OnPush`

**Choice:** All new components use OnPush change detection.

**Rationale:**
- Better performance
- Required for View components to be truly pure
- Follows Angular best practices

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Specs drift from implementation again | Add consistency check to CI pipeline |
| Multiple similar patterns emerge | Document View/Container clearly in frontend-conventions.md |

## Open Questions

None - this is a documentation sync of already-implemented changes.