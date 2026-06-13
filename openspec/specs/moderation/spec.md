# Moderation Capability Spec

## Overview

Editorial workflow for reviewing and managing user-submitted offers.

## Workflow

```
┌──────────┐     submit      ┌──────────┐     approve     ┌───────────┐
│  draft   │ ──────────────▶ │ pending  │ ──────────────▶ │ published │
└──────────┘                 └──────────┘                 └───────────┘
     ▲                            │
     │                            │ reject
     │                            ▼
     └─────────────────────── archive (or delete)
```

## Roles

| Role     | Permissions                                    |
|----------|------------------------------------------------|
| User     | Submit offers, view published offers           |
| Editor   | All User permissions + review, approve, reject, edit offers |
| Admin    | All Editor permissions + manage users/roles    |

## Features

### F1: Offer Submission

- Authenticated users can submit new offers
- New offers start with status `pending`
- User receives confirmation after submission

### F2: Editorial Review

Editors see a list of pending offers.

For each pending offer, editor can:
- **Approve** → status changes to `published`
- **Reject** → status changes to `archived`, with optional reason
- **Request Changes** → send back to user for revision
- **Edit** → modify details directly

### F3: Offer Editing

Editors can edit any offer:
- Title, description, category
- Location details
- Contact information
- Status (archive, unarchive)

### F4: Audit Trail

Track changes:
- Who created/modified
- When changes occurred
- What changed (diff)

## Implementation Status

| Component | Status |
|-----------|--------|
| Status workflow | ✓ Defined (in state model) |
| Editor interface | ✗ Not implemented |
| Rejection workflow | ✗ Not implemented |
| Request changes | ✗ Not implemented |
| Audit trail | ✗ Not implemented |
| Role-based access | ✗ Not implemented |

## Open Decisions

- Rejection: soft delete (archived) or hard delete?
- Request changes: email notification to user?
- How many editors per instance?