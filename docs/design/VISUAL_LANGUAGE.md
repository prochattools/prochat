# ProChat Visual Language

**Status:** canonical repository-local visual grammar  
**Authority:** `DESIGN.md`, `brand-spec.md`, `docs/design/DESIGN_PRINCIPLES.md`

## Purpose

This document defines how ProChat concepts become visual objects and relationships. It prevents pages from falling back to generic cards, dashboards, AI gradients, or decorative illustrations.

## Core grammar

```text
Evidence is shown as source fragments.
Knowledge is shown as structured records.
Trust is shown as explicit state and review.
Scope is shown as a visible boundary.
Relationships are shown as connectors.
Current relevance is shown as selection.
Change is shown as a diff or state transition.
Control is shown as a bounded operation.
Validation is shown as visible evidence.
History is shown as an inspectable timeline.
```

## Memory language

### Evidence

Visual form:

- compact source fragment;
- source type;
- timestamp or origin;
- raw or reviewed state;
- attachment relationship.

Evidence should feel incomplete until connected to a record or investigation.

### Memory record

Visual form:

- record type;
- title;
- summary;
- state;
- scope;
- evidence links;
- review metadata;
- available actions;
- lifecycle history.

A Memory record should look readable and durable, not like an ephemeral chat bubble.

### Review

Visual form:

- visible gate or decision area;
- draft and approved sets remain distinct;
- approve, edit, reject, retain draft, and retire are explicit;
- state changes preserve history.

### Scope

Visual form:

- boundary, label, or container;
- personal, project, client, team, organisation, and cross-project remain distinguishable;
- promotion to wider scope is shown as an explicit action.

### Retrieval

Visual form:

- full workspace remains visible;
- task signals appear explicitly;
- irrelevant records recede rather than disappear magically;
- selected records connect to the task context;
- a reason can be inspected.

### Current-evidence override

Visual form:

- stored record remains visible;
- current evidence receives priority;
- conflict state appears;
- memory moves to review required, corrected, or retired.

## QA language

Use the Memory grammar with QA-specific evidence:

- failed test output;
- trace;
- screenshot;
- selector;
- test data;
- environment;
- network event;
- hypothesis;
- root cause;
- fix;
- reviewer decision;
- later related failure.

The visual sequence should resemble investigation, not a generic analytics dashboard.

## Workbench language

### Request

A clear user intent or bounded goal.

### Exact context

A visible list of paths, files, symbols, or repository areas. Context must appear selected, not omniscient.

### Guarded operation

A step with:

- scope;
- target path;
- risk level;
- confirmation requirement;
- current status.

### Validation

A result containing:

- command or check;
- target paths;
- exit state;
- evidence;
- repair state where relevant.

### Git action

Show explicit staging and commit boundaries. Unrelated files should remain visibly outside the action.

### Persistent run

Use a structured task timeline showing current position, completed packets, validation, blocker, and next task.

## Company-level visuals

Company visuals should combine Memory and Workbench concepts without becoming abstract branding art.

Preferred forms:

- knowledge becoming reusable;
- two products sharing one foundation;
- evidence-to-action flow;
- project knowledge remaining local and inspectable;
- current capabilities separated from future possibilities.

## Composition rules

- Use one dominant product object per visual scene.
- Preserve object identity across state changes.
- Use cobalt for current selection, active relationship, or primary action.
- Use semantic green, amber, and red only for actual state meaning.
- Use grayscale hierarchy for inactive, historical, or supporting material.
- Keep connectors precise and sparse.
- Prefer readable product text over abstract blocks.
- Avoid dense networks without a clear reading order.

## Text and visual relationship

Text and visual must express the same proposition.

The visual should not merely repeat the heading as an icon. It should provide missing understanding: mechanism, evidence, boundary, sequence, or contrast.

## Prohibited visual metaphors

- brains;
- robots;
- magic wands;
- sparkles;
- infinity loops;
- floating chat bubbles as Memory;
- unexplained glowing databases;
- autonomous agent avatars;
- generic node clouds;
- fake terminals used only for technical appearance;
- abstract 3D shapes unrelated to product meaning.

## Acceptance test

A visual passes when a reviewer can explain the relevant product mechanism from the visual state and labels without reading the complete surrounding section.
