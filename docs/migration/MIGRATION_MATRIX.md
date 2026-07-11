# ProChat Migration Matrix

**Status:** canonical migration control document  
**Authority:** `docs/migration/LEGACY_SWEEP_PLAN.md`

## Purpose

This matrix is the single operational view of what stays, changes, moves, redirects, or disappears during the public-platform foundation sweep.

It prevents hidden deletions, duplicated replacements, and migration waves that mix unrelated risk.

## Required status values

```text
INVENTORIED
DECISION_REQUIRED
DECIDED
REPLACEMENT_PLANNED
REPLACEMENT_READY
MIGRATING
VERIFIED
DEPRECATED
ARCHIVED
REDIRECTED
REMOVED
BLOCKED
```

## Disposition values

```text
KEEP
REFACTOR
REWRITE
REPLACE
ARCHIVE
REDIRECT
DELETE
```

## Risk levels

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Use `CRITICAL` for changes that can break primary navigation, legal access, production deployment, customer data handling, authentication, or broad shared styling.

## Master matrix

Populate one row per audited item.

| ID | Category | Current path | Current purpose | Consumers | Canonical destination | Disposition | Wave | Risk | Status | Redirect | Validation | Rollback | Owner |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DOC-001 | document | `docs/strategy.md` | repo-local strategy bridge | contributors | keep as subordinate bridge | KEEP | 0 | LOW | DECIDED | — | canonical-link review | revert file | Steve |
| ROUTE-001 | route | legacy route to be inventoried | unknown until audit | public visitors | canonical page or archive | DECISION_REQUIRED | 7 | HIGH | INVENTORIED | TBD | route crawl, redirect test | restore route | Steve |
| STYLE-001 | style | legacy global theme to be inventoried | historic visual foundation | multiple pages | ProChat semantic tokens | REPLACE | 1–8 | HIGH | INVENTORIED | — | visual regression, build | restore stylesheet/import | Steve |

The example rows are scaffolding, not a completed audit.

## Detailed record template

```yaml
id: "ROUTE-000"
category: "route"
path: ""
current_purpose: ""
current_consumers: []
publicly_discoverable: false
canonical_destination: ""
disposition: "DECISION_REQUIRED"
rationale: ""
wave: 0
risk: "LOW"
status: "INVENTORIED"
dependencies: []
blocks: []
redirect:
  required: false
  status_code: null
  destination: null
seo:
  canonical_change: false
  sitemap_change: false
  metadata_change: false
analytics:
  event_change: false
accessibility_risk: ""
performance_risk: ""
legal_or_privacy_risk: ""
replacement_paths: []
validation: []
rollback: ""
deletion_approved: false
owner: ""
notes: ""
```

## Migration wave board

### Wave 0 — Authority and documentation

Expected items:

- active repository documentation;
- archived strategy directions;
- canonical source links;
- migration documents;
- design and page specifications.

Commit boundary:

```text
docs-only changes
```

### Wave 1 — Fonts, tokens, and shared shell

Expected items:

- global font implementation;
- semantic color and spacing tokens;
- base document styles;
- header and footer foundations;
- coexistence boundary with legacy styles.

Commit boundary:

```text
foundation code and directly related tests/docs only
```

### Wave 2 — Shared primitives and design lab

Expected items:

- buttons, links, surfaces, form primitives;
- Memory and Workbench visual primitives;
- development-only design-lab routes;
- deterministic visual states.

### Wave 3 — Homepage

Expected items:

- company-first homepage;
- flagship Memory emphasis;
- QA and Workbench routes;
- canonical navigation and footer integration.

### Wave 4 — Memory and QA

Expected items:

- general Memory page;
- Memory for QA page;
- beta conversion path;
- legacy Memory/QA route redirects where approved.

### Wave 5 — Workbench

Expected items:

- canonical Workbench page;
- compatibility language where BuildFlow identifiers remain technical;
- removal or archival of competing public product names.

### Wave 6 — Company, legal, contact, docs, and errors

Expected items:

- philosophy;
- About;
- Contact and beta forms;
- Privacy;
- Terms;
- documentation entry;
- 404 and error states.

### Wave 7 — Redirects and route retirement

Expected items:

- redirect map;
- sitemap changes;
- canonical URL changes;
- route removal after verification.

### Wave 8 — Obsolete implementation removal

Expected items:

- styles;
- components;
- assets;
- motion code;
- dependencies;
- dead copy sources.

### Wave 9 — Absence and simplification proof

Expected items:

- old-name searches;
- dead import checks;
- route crawl;
- build and tests;
- documentation cleanup;
- repository-complexity review.

## Decision protocol

For every row marked `DECISION_REQUIRED`:

1. Identify current consumers.
2. Identify canonical responsibility.
3. Decide whether history, compatibility, SEO, analytics, or legal obligations require retention.
4. Choose one disposition.
5. Name the replacement or archive destination.
6. Assign migration wave and risk.
7. Define validation and rollback.
8. Obtain deletion approval when applicable.

## Commit protocol

- One coherent migration concern per commit.
- Explicit paths only.
- Do not stage the whole repository.
- Do not mix route removal with unrelated visual polish.
- Do not remove a shared dependency in the same commit that first introduces its replacement unless the migration is fully bounded and verified.
- Preserve a clean rollback point before destructive waves.

## Completion query

The migration program is not complete while any row remains:

```text
DECISION_REQUIRED
REPLACEMENT_PLANNED
MIGRATING
BLOCKED
```

High-risk rows require explicit validation evidence and final owner sign-off before `REMOVED`.
