## Context

The project needs better documentation organization. Currently AGENTS.md is a catch-all that:
1. Overwhelms humans with agent-specific technical details
2. Lacks proper structure for AI assistants to parse and follow

Additionally, there's no clear pattern enforcement for Angular component architecture. Components often mix presentation logic with state management, making them harder to test and reason about.

## Goals / Non-Goals

**Goals:**
- Separate human-readable documentation from agent-specific specs
- Establish View/Container pattern for Angular components
- Create clear linking structure between documents
- Reduce AGENTS.md to an index file

**Non-Goals:**
- Not rewriting all documentation content (just restructuring)
- Not enforcing View/Container on existing components immediately
- Not creating duplicate content between documents/ and openspec/specs/

## Decisions

### Decision: Use `documents/` for human documentation

**Choice:** Create `documents/` directory at project root for human-focused content.

**Rationale:** Clear separation from `openspec/` which is for agent workflow. Humans intuitively navigate to `documents/` for project info.

**Alternatives considered:**
- `docs/` - Too generic, often used for API docs
- `wiki/` - Implies less formal content
- `human-docs/` - Too verbose

### Decision: View/Container pattern with naming suffixes

**Choice:** Use `ViewComponent` and `ContainerComponent` suffixes for naming.

**Rationale:**
- Clear from name alone what the component does
- Easy to grep/find in codebase
- Matches existing Angular conventions (e.g., Smart/Dumb, Container/Presentational)

**Alternatives considered:**
- `*SmartComponent`/`*DummyComponent` - Less descriptive
- `*PageComponent`/`*Component` - Doesn't distinguish Container from pure presentation
- No suffix with folder organization - Harder to discover

### Decision: AGENTS.md becomes index only

**Choice:** AGENTS.md will contain only:
- Brief project description
- Links to `documents/` files
- Links to `openspec/specs/` files
- Key commands for AI assistants

**Rationale:**
- AI assistants still find AGENTS.md (it's the standard file)
- Humans get properly organized documents
- No information loss

## Document Structure

```
gaerngschee/
├── AGENTS.md                    # Index only (links to others)
├── documents/                   # Human-readable docs
│   ├── project.md              # Project overview
│   ├── directory-structure.md  # Directory layout
│   ├── architecture.md         # Architecture decisions
│   ├── frontend-conventions.md # Angular patterns (View/Container, etc.)
│   └── backend-conventions.md  # PHP patterns
└── openspec/
    ├── specs/                   # Agent specs
    │   └── agents-md-workflow/
    │       └── spec.md         # Agent workflow requirements
    └── changes/                 # Change artifacts
```

## View/Container Component Pattern

```
┌─────────────────────────────────────────────────────────┐
│                    ContainerComponent                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Injects: Store, Services                         │  │
│  │  - Selects state via selectors                    │  │
│  │  - Dispatches actions                             │  │
│  │  - Handles events from View                       │  │
│  └───────────────────────────────────────────────────┘  │
│                         │                                │
│                    @Input() / @Output()                  │
│                         ▼                                │
│  ┌───────────────────────────────────────────────────┐  │
│  │                      ViewComponent                 │  │
│  │  - Pure presentation                              │  │
│  │  - Renders data from @Input()                     │  │
│  │  - Emits events via @Output()                     │  │
│  │  - No service dependencies                        │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Developers ignore View/Container pattern | Add lint rule to enforce naming + no service injection in Views |
| Documents become outdated | Add documentation consistency check to CI |
| Too many files makes things hard to find | Keep AGENTS.md as clear index with links |
| Existing components don't follow pattern | Incremental refactor, not big-bang |

## Migration Plan

1. Create `documents/` directory structure
2. Move content from AGENTS.md to appropriate `documents/` files
3. Update AGENTS.md to be an index with links
4. Add View/Container requirements to `openspec/specs/`
5. Update `frontend-conventions.md` with View/Container pattern
6. Refactor existing components incrementally
7. Add lint rules to enforce pattern

## Open Questions

1. Should we use folder organization (e.g., `components/OfferList/View.ts`) or just naming suffixes?
2. Do we need a script/tool to validate View components have no service injections?
3. How do we handle shared components that need to be both View and Container depending on context?