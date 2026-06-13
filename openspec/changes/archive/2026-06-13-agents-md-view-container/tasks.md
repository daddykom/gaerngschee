## 1. Create documents/ Directory Structure

- [x] 1.1 Create `documents/` directory at project root
- [x] 1.2 Create `documents/project.md` with project overview content
- [x] 1.3 Create `documents/directory-structure.md` with directory layout
- [x] 1.4 Create `documents/architecture.md` with architecture decisions
- [x] 1.5 Create `documents/frontend-conventions.md` with Angular patterns
- [x] 1.6 Create `documents/backend-conventions.md` with PHP patterns

## 2. Update OpenSpec Specs

- [x] 2.1 Update `openspec/specs/agents-md-workflow/spec.md` with document organization requirements
- [x] 2.2 Add MODIFIED Requirements section to reflect new structure

## 3. Create New Spec Files in Change

- [x] 3.1 Verify `specs/view-container-pattern/spec.md` has all requirements
- [ ] 3.2 Verify `specs/document-organization/spec.md` has all requirements

## 4. Refactor AGENTS.md to Index

- [x] 4.1 Rewrite AGENTS.md to be an index file
- [x] 4.2 Add links to `documents/*.md` files
- [x] 4.3 Add links to `openspec/specs/*/spec.md` files
- [x] 4.4 Add brief description of View/Container pattern
- [x] 4.5 Remove full content (move to documents/)

## 5. Validate Structure

- [x] 5.1 Verify all documents/ files exist and are valid markdown
- [x] 5.2 Verify AGENTS.md links work correctly
- [x] 5.3 Verify no content duplication between documents/ and openspec/specs/
- [x] 5.4 Test that AI assistants can find relevant information

## 6. (Future) Update Existing Components

- [ ] 6.1 Identify existing components that need View/Container separation
- [ ] 6.2 Refactor `OfferListComponent` to `OfferListViewComponent` + `OfferListContainerComponent`
- [ ] 6.3 Add ESLint rule to enforce no service injection in View components