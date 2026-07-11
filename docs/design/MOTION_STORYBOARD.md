# ProChat Motion Storyboard

**Status:** canonical motion planning document  
**Authority:** `docs/homepage-visual-storyboard.md`, `DESIGN.md`

## Purpose

This document defines narrative states before GSAP implementation. Motion code must follow named product states rather than inventing choreography in place.

## Global rules

- Native browser scrolling.
- At most four major pinned sequences.
- Every sequence works statically first.
- Scroll backward restores state predictably.
- Text remains readable while visuals change.
- Reduced motion removes pinning and large object travel.
- Mobile uses stacked scenes.
- Motion uses transform and opacity first.

## Sequence 1 — Homepage hero

### State 1: scattered evidence

Decision, correction, log, approved example, review note, and previous failure appear around an empty task context.

### State 2: structured candidates

Fragments align into candidate records. Their source identity remains visible.

### State 3: review gate

One candidate is edited, one rejected, and approved candidates cross into trusted memory.

### State 4: local workspace

Approved records settle into a readable Markdown-first workspace.

### State 5: new task

A later task appears with explicit project and question signals.

### State 6: focused context

Only relevant records connect to the task. The larger workspace remains visible.

Reduced motion: four static panels—evidence, review, workspace, task context.

## Sequence 2 — Memory lifecycle

States:

```text
current evidence
→ draft lesson
→ sanitised and scoped
→ human review
→ approved memory
→ relevant retrieval
→ corrected or retired
```

One record persists throughout. Changes to content, scope, state, evidence, and actions remain visible.

Reduced motion: seven record snapshots in document order.

## Sequence 3 — Relevant context

States:

```text
full workspace
→ task defined
→ task signals applied
→ irrelevant records recede
→ focused context assembled
→ selection reason inspected
```

Do not use a magical search effect. Show project, scope, framework, environment, failure category, approval state, and review date.

Reduced motion: workspace, criteria, and selected-context panels.

## Sequence 4 — QA investigation

States:

```text
test failed
→ evidence collected
→ reviewed memory retrieved
→ hypotheses tested
→ root cause identified
→ lesson drafted
→ sanitised and reviewed
→ lesson approved
→ later related failure assisted
```

Use one continuous fictional case from `docs/homepage-example-data.md`.

Reduced motion: vertical investigation timeline with nine states.

## Supporting motion

### Repetition compression

Repeated task-context blocks align and compress into one reusable record.

### Evidence conflict

Current evidence becomes dominant; older memory receives review-required state.

### Markdown split view

A controlled reveal connects source Markdown and rendered record without changing content identity.

### Git history

Approved record → proposed edit → reviewed diff → committed version → optional rollback.

### Workbench control plane

```text
request
→ exact context
→ guarded operation
→ validation
→ explicit Git action
```

This may use a triggered timeline but is not pinned by default.

### Capability boundary

Current capabilities receive solid treatment. Future possibilities remain outlined. Unsupported claims remain clearly outside the product boundary.

## Timing intent

```yaml
durations_ms:
  micro: 120-180
  standard: 220-320
  deliberate: 400-500
  chapter_transition: 600-800
```

Avoid bounce, elastic, overshoot, typewriter, scramble, perpetual float, and large zoom effects.

## Prototype evidence

Every sequence requires:

- static initial, middle, and final screenshots;
- desktop screen recording;
- mobile scenes;
- reduced-motion screenshots;
- backwards-scroll test;
- resize test;
- performance trace;
- product-truth review.

## Implementation gate

No sequence moves to production until:

1. its static composition is approved;
2. named states are documented;
3. mobile and reduced-motion forms exist;
4. motion review passes;
5. performance proof remains within budget.
