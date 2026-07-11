# ProChat Design Lab

**Status:** canonical prototype environment specification

## Purpose

The design lab is a repository-local, browser-verifiable environment for exploring and approving the design system before production pages are changed.

Suggested route:

```text
/design-lab
/design-lab/homepage
/design-lab/memory
/design-lab/workbench
```

## Rules

- Excluded from public navigation, sitemap, and indexing.
- May contain development-only controls and debug labels.
- Uses canonical tokens and sanitized example data.
- Does not define new product claims.
- Does not require production route architecture.
- Prototypes do not graduate automatically.

## Required sections

### Foundation

- Golos Text hierarchy;
- JetBrains Mono metadata;
- grayscale surfaces;
- cobalt actions and relationships;
- semantic statuses;
- spacing;
- radii;
- borders;
- shadows;
- focus states;
- dark technical panel.

### Memory primitives

- EvidenceCard;
- MemoryRecord;
- ScopeBadge;
- SourceConnector;
- ReviewGate;
- ContextWindow;
- MemoryWorkspace;
- EvidenceHierarchy.

### QA primitives

- TestFailure;
- InvestigationEvidence;
- HypothesisList;
- RootCauseRecord;
- LaterReuse.

### Workbench primitives

- RepositoryTree;
- ContextRead;
- GuardedOperation;
- ValidationResult;
- GitAction;
- RunTimeline.

### Page prototypes

- three static homepage heroes;
- selected hero motion proof;
- Memory lifecycle;
- relevant context;
- QA investigation;
- Workbench control plane;
- full-page low-fidelity assembly;
- Memory, QA, Workbench, philosophy, About, contact, legal, and error-page layout patterns.

## State controls

Each visual should support deterministic prototype states through local controls or development-only query parameters.

Example:

```text
?component=memory-record&state=approved
?story=qa-investigation&step=root-cause
?motion=reduced
```

## Promotion checklist

A design-lab artifact may move to production only when:

- product truth is verified;
- static direction is approved;
- responsive states exist;
- reduced motion exists where relevant;
- accessibility behavior is specified;
- implementation API is defined;
- visual baselines exist;
- performance is acceptable;
- the roadmap task authorizes production integration.

## Retention

Keep the design lab after launch as a controlled regression, documentation, and exploration surface. Remove obsolete experiments or move them to an archived lab area so active decisions remain obvious.
