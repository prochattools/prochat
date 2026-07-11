# ProChat Product Visual Library

**Status:** canonical component and visualization inventory  
**Authority:** `docs/design/VISUAL_LANGUAGE.md`, `docs/homepage-example-data.md`

## Purpose

This library defines reusable product-visual primitives before implementation. Each primitive has product meaning, required content, states, accessibility behavior, and permitted uses.

## Shared rules

Every primitive must:

- use semantic HTML where possible;
- expose a readable label and state;
- work without animation;
- support desktop, mobile, and reduced motion;
- use canonical tokens;
- accept realistic sanitized data;
- avoid hidden product meaning inside decorative canvas;
- preserve source order and keyboard logic.

## Memory primitives

### EvidenceCard

Purpose: represent a source fragment.

Required fields:

- id;
- source type;
- title or excerpt;
- source label;
- timestamp or origin when useful;
- state.

States:

```text
raw
selected
attached
conflicting
superseded
```

### MemoryRecord

Purpose: represent durable reviewed project knowledge.

Required fields:

- record type;
- title;
- summary;
- state;
- scope;
- evidence references;
- review metadata;
- actions.

States:

```text
draft
review
approved
rejected
review-required
retired
```

### ScopeBadge

Purpose: communicate where a record may apply.

States:

```text
personal
project
client
team
organisation
cross-project
```

Use text plus shape or icon. Do not rely on hue alone.

### SourceConnector

Purpose: show why a record, conclusion, or task context is connected to evidence.

States:

```text
inactive
active
current
conflicting
historical
```

### ReviewGate

Purpose: show the transition from proposal to trusted memory.

Actions:

```text
approve
edit
reject
retain draft
retire
```

The gate must keep unapproved material visually outside the trusted set.

### ContextWindow

Purpose: show the smaller current-task context selected from a larger workspace.

States:

```text
empty
assembling
focused
overloaded
explained
```

### MemoryWorkspace

Purpose: show a local readable collection of records.

Required regions:

- navigation or record list;
- selected record;
- source or metadata view;
- state and scope;
- task-context relationship where relevant.

### EvidenceHierarchy

Purpose: show priority between current evidence, reviewed memory, and unreviewed drafts.

The hierarchy must support a conflict state and review-required outcome.

## QA primitives

### TestFailure

Fields:

- test name;
- environment;
- failure summary;
- status;
- run identifier.

### InvestigationEvidence

Variants:

- trace;
- screenshot;
- selector;
- log;
- network event;
- test data;
- environment note.

### HypothesisList

States:

```text
untested
supported
ruled out
contributed
confirmed
```

### RootCauseRecord

Connects evidence, hypotheses, fix, scope, and reviewer decision.

### LaterReuse

Shows which task signals caused an approved lesson to be retrieved in a later investigation.

## Workbench primitives

### RepositoryTree

Purpose: show exact project structure and selected context.

States:

```text
idle
context-selected
changed
validated
unrelated
```

### ContextRead

Fields:

- mode;
- paths or symbols;
- byte or line boundary;
- verified state.

### GuardedOperation

Fields:

- operation type;
- target path;
- reason;
- risk;
- confirmation state;
- result.

States:

```text
requested
scoped
awaiting-confirmation
executed
blocked
rolled-back
```

### ValidationResult

Fields:

- check name;
- target;
- result;
- evidence;
- repair attempt.

States:

```text
pending
passed
failed
repaired
blocked
```

### GitAction

Fields:

- changed paths;
- staged paths;
- unrelated paths;
- commit message;
- commit hash.

States:

```text
unstaged
explicitly-staged
committed
not-pushed
```

### RunTimeline

Fields:

- goal;
- current task;
- completed packets;
- validation;
- blocker;
- exact next task.

## Company and platform primitives

### ProductArchitecture

Shows:

```text
ProChat
├── ProChat Memory
│   └── Memory for QA
└── ProChat Workbench
```

### CapabilityBoundaryMap

Zones:

- current product capability;
- future possible capability;
- unsupported or prohibited claim.

### MetricEquation

Shows visible assumptions and calculation. Must never present an illustrative result as measured product performance.

### ChapterProgress

Optional orientation aid for long-form scrollytelling. Must not replace normal navigation or trap scroll.

## Documentation contract per implemented primitive

Each implementation must include:

- prop or data schema;
- state table;
- content guidance;
- visual rules;
- keyboard and screen-reader behavior;
- mobile behavior;
- reduced-motion behavior;
- examples;
- test cases;
- known limitations.

## Promotion process

A prototype becomes a production primitive only after:

1. product-truth review;
2. static design approval;
3. responsive review;
4. accessibility review;
5. implementation review;
6. visual baseline creation;
7. documentation update.
