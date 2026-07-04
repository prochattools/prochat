# ProChat Memory website design strategy

**Status:** active website design brief  
**Owner:** Steve Westhoek  
**Scope:** visual and interaction guidance for ProChat Memory, ProChat Memory for QA, and related website surfaces

## Authority

Mind is canonical for ProChat philosophy, product hierarchy, naming, positioning, business stage, growth policy, legal-policy direction, and cross-product roadmap.

Canonical references:

```text
mind/wiki/organisations/prochat/README.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/growth/README.md
mind/wiki/organisations/prochat/legal/README.md
```

This document is a website design brief only. It is not the source of truth for ProChat strategy.

If this brief conflicts with Mind, Mind wins and this brief must be corrected.

## Product boundary for design

Design around exactly two current products:

```text
ProChat Memory
ProChat Workbench
```

Design the first launch niche as:

```text
ProChat Memory for QA
```

Implications:

- ProChat Memory is the flagship product and should carry the primary visual language.
- ProChat Memory for QA is the first discipline-specific edition and should feel like a QA lens on Memory, not a separate brand.
- ProChat Workbench should be visually related but distinct enough to avoid confusing it with Memory.
- Answers, repeated-work preparation, API access, and MCP integrations are capabilities or future interfaces, not current products.
- ProChat OS, SaaSKit, ProKit, UXKit, WaaSKit, MikeOSS, and BuildFlow must not drive current visual strategy. BuildFlow may remain a technical/internal Workbench compatibility identifier where needed.

## Design goal

Create a calm, precise, trustworthy website direction for local-first, review-first memory.

The visitor should understand:

- useful knowledge can be preserved;
- memory remains inspectable and editable;
- the user controls what becomes trusted memory;
- current evidence still matters;
- Memory can support specific niches, starting with QA;
- Workbench is a separate local project-work product.

## Core visual idea

Direction name:

```text
The Living Memory System
```

Visual thesis:

```text
A stable, user-owned memory structure persists while tasks, tools, projects, evidence, and AI sessions change around it.
```

Show the process as:

```text
keep → select → use → review → improve
```

Use this process instead of magical AI imagery.

## Brand feel

The design should feel:

- calm;
- precise;
- private;
- durable;
- human-controlled;
- technically credible;
- quietly intelligent;
- evidence-aware;
- editorial rather than hype-driven.

Balance:

```text
75% dependable infrastructure
25% future-facing intelligence
```

## Visual components

### Memory records

Small, readable records that represent:

- decisions;
- lessons;
- examples;
- corrections;
- procedures;
- sources;
- project rules;
- QA patterns;
- review status.

Records should look inspectable, not magical.

### Context lens

A focus area that selects only the memory relevant to the current task.

Use it to show that Memory does not dump everything into every prompt. It helps choose relevant context.

### Evidence layer

Show current work evidence beside stored memory.

For QA this can include:

- failed-test output;
- current run evidence;
- selectors;
- environment details;
- acceptance criteria;
- release notes.

Design rule:

```text
current evidence overrides stale memory.
```

### Review gate

Make human review visible.

Show AI-drafted memory updates as proposed changes, never automatic trusted updates.

Labels may include:

```text
Proposed memory update
Review required
Approved
Rejected
Scoped to this project
Sanitized for reuse
```

### Scope markers

Use small labels to show memory scope:

```text
personal
project
client
team
QA edition
```

Do not make scope feel like heavy enterprise permissions unless the implementation supports it.

## Page models

### ProChat homepage

Design role:

Introduce ProChat as a Memory-first company with two products.

Required product presentation:

```text
ProChat Memory — flagship
ProChat Workbench — second product
ProChat Memory for QA — first launch niche under Memory
```

Do not use active product cards for ProChat OS, Answers, Automations, API, MCP, kits, MikeOSS, or BuildFlow; they are not current products in this website design brief.

### ProChat Memory page

Design role:

Make local-first, review-first memory understandable without requiring a technical architecture lecture.

Suggested section rhythm:

1. Hero: stop rebuilding context.
2. Problem: useful lessons disappear between sessions and tools.
3. Memory model: keep, select, use, review, improve.
4. Trust: local, inspectable, editable, review-first.
5. Example: a task starts with relevant memory and current evidence.
6. CTA: Memory for QA or contact/waitlist.

### ProChat Memory for QA page

Design role:

Show the first discipline-specific edition through real QA patterns.

QA visual examples:

- failed-test trace;
- flaky-test pattern;
- selector rule;
- test-data rule;
- environment difference;
- release lesson;
- tester correction;
- proposed memory update.

Make clear:

```text
AI drafts. Tester reviews. Approved lessons become reusable memory.
```

### ProChat Workbench page

Design role:

Present Workbench as a separate product for safe local project work.

Visual language may use:

- repository tree;
- exact context packet;
- guarded change;
- validation evidence;
- explicit Git checkpoint.

Do not make Workbench the flagship. Do not merge it into Memory.

## Art direction

Use:

- warm editorial canvas;
- strong typography;
- precise spacing;
- numbered chapters;
- technical annotations;
- subtle grid structure;
- readable cards and records;
- source and evidence labels;
- restrained motion;
- clear review states.

Avoid:

- literal brains;
- robot mascots;
- neural-network globes;
- purple-gradient AI clichés;
- cyberpunk dashboards;
- meaningless glass cards;
- decorative particle clouds;
- generic four-card feature grids;
- database cylinders as the hero;
- autonomous-agent visuals that imply unreviewed action.

## Motion principles

Motion should explain memory behavior, not decorate the page.

Good motion ideas:

- a context lens selects a few relevant memory records;
- current evidence appears beside older memory;
- an AI-drafted update pauses at a review gate;
- approved memory becomes available for future tasks;
- stale or scoped memory remains visibly bounded.

Avoid motion that suggests automatic trust, uncontrolled learning, or hidden data movement.

## Copy and visual claim boundaries

Do not visually imply:

- guaranteed savings;
- perfect recall;
- zero hallucinations;
- autonomous memory promotion;
- broad integrations that are not implemented;
- hosted service behavior unless approved in Mind and implemented;
- legal, compliance, or security guarantees not backed by approved docs.

Safe claims:

- designed to reduce repeated explanation;
- helps preserve useful lessons;
- keeps memory inspectable and editable;
- supports review before trust;
- helps future work start with better context;
- first niche focus is QA.

## Handoff to production design

Before touching production pages, confirm:

- active docs remain subordinate to Mind;
- exactly two products are shown;
- Memory is visually primary;
- Memory for QA is nested under Memory;
- Workbench is separate;
- future interfaces are not rendered as product cards;
- legacy names are not active navigation;
- public claims match Mind legal and growth boundaries.

## Rule

This brief guides website design only. Strategy lives in Mind, and production implementation must be reviewed separately before code changes.
