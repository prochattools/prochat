# ProChat Homepage Visual Storyboard

**Status:** pre-build visual specification  
**Canonical copy:** Mind `canonical-homepage-copy.md`  
**Design authority:** `DESIGN.md`, `brand-spec.md`

This document defines what the homepage must show, not only what it must say.

Every major chapter has one visual proposition, named product states, responsive behavior, and a reduced-motion equivalent.

## Global storytelling rules

- Reuse the same product objects across adjacent states.
- Show real structure, labels, source relationships, and review states.
- Do not use decorative screenshots or abstract rectangles as final visuals.
- Keep text semantic and readable independently of animation.
- Use cobalt only for focused relationships, current selection, or primary interaction.
- Use semantic status colors only where the state requires them.
- Desktop may use pinned sequences; mobile uses stacked scenes.
- Reduced-motion mode shows the complete state progression without scrubbed travel.

## Chapter 1 — Premise

### 1. Hero: stop rebuilding what the project learned

**Purpose**  
Explain the complete value proposition in one continuous visual transformation.

**Core object**  
A set of realistic project evidence fragments.

**Initial state**

- A decision record
- A correction
- A log excerpt
- An approved example
- A review note
- A previous failure

The fragments are distributed in a controlled grid around an empty task-context panel.

**Scroll states**

1. `scattered-evidence`
2. `structured-candidates`
3. `review-gate`
4. `approved-memory`
5. `new-task`
6. `focused-context`

**Transformation**

- Evidence aligns into candidate records.
- One candidate is edited.
- One candidate is rejected.
- Three candidates become approved memory.
- Approved records move into a visible local Markdown workspace.
- A new task appears.
- Only the relevant records connect to the task-context panel.

**Text emphasis**  
“project already learned” becomes cobalt only when the approved records are reused.

**Desktop**  
Pinned composition for approximately 160–200vh.

**Mobile**  
Four stacked scenes: evidence, review, memory workspace, focused task context.

**Reduced motion**  
A static four-panel sequence with arrows and explicit state labels.

### 2. Core philosophy

**Purpose**  
Show the relationship between Memory, Evidence, Human Review, and AI Use.

**Visual**

```text
Memory → Evidence → Human review → AI use
```

Each phrase activates one object from the hero’s final state.

**Motion**  
Short connector draw and text emphasis; no separate pinning.

### 3. Repeated-work problem

**Purpose**  
Make repeated context reconstruction visible as duplicated effort.

**Visual**  
Three sequential task sessions repeat the same project explanation, decision lookup, and correction.

**Transformation**  
Repeated blocks align and compress into one reviewed memory record.

### 4. Before and after

**Purpose**  
Show continuity rather than a generic checklist comparison.

**Before state**

- disconnected sessions;
- duplicate explanations;
- buried decisions;
- missing source links;
- conflicting notes.

**After state**

- reviewed records;
- visible evidence;
- explicit scope;
- current-evidence override;
- focused task context.

**Interaction**  
Optional draggable comparison on desktop; automatic staged transition remains the default.

## Chapter 2 — Memory model

### 5. Company and product architecture

**Purpose**  
Explain the product family without presenting three products.

**Visual**

```text
                    ProChat
                       │
          reusable project knowledge
                 ┌─────┴─────┐
                 │           │
            Memory       Workbench
                 │
       currently available for QA
```

Memory is visually primary. Workbench remains present but secondary.

### 6. Memory product definition

**Purpose**  
Show that Memory is a readable project system, not hidden AI state.

**Visual**  
A high-fidelity Memory workspace containing:

- Markdown source;
- rendered record;
- state;
- scope;
- source references;
- last review;
- available actions.

**Interaction**  
A source/rendered toggle may be used, but both forms remain visible enough to understand without interaction.

### 7. Memory lifecycle

**Purpose**  
Make trust formation explicit.

**Core object**  
One memory record that persists through every state.

**States**

1. `current-evidence`
2. `draft-lesson`
3. `sanitized-and-scoped`
4. `human-review`
5. `approved-memory`
6. `relevant-retrieval`
7. `corrected-or-retired`

**Composition**  
Sticky visual canvas on the right; short stage copy on the left.

**Desktop**  
Pinned sequence with each stage owning approximately 70–90vh.

**Mobile**  
Each state becomes one readable scene with the same record anatomy.

**Reduced motion**  
Seven static record states in document flow.

### 8. Example record

**Purpose**  
Let the visitor inspect one realistic approved memory.

**Visual behavior**

- Evidence connects to the source reference.
- Scope defines where the record may be reused.
- Review changes the state from draft to approved.
- New current evidence flags the record for correction.
- Retirement preserves history while removing active reuse.

## Chapter 3 — Trust and architecture

### 9. Trust model

**Purpose**  
Show that draft material does not silently enter trusted memory.

**Visual**  
A minimal review gate separates unreviewed material from approved memory.

**States**

- raw evidence;
- draft lesson;
- sanitized record;
- review decision;
- approved memory;
- rejected or retained draft.

Rejected and draft records remain visible outside the trusted set.

### 10. Evidence hierarchy

**Purpose**  
Show that current evidence can supersede stored memory.

**Visual layers**

1. Current evidence and human judgment
2. Reviewed stored memory
3. Unreviewed notes and AI drafts

**Conflict sequence**

- Older memory says one thing.
- Current log evidence contradicts it.
- The current evidence becomes dominant.
- The old memory receives a “review required” state.

### 11. Local ownership

**Purpose**  
Make the deployment boundary understandable visually.

**Visual containers**

1. ProChat product repository
2. Customer-owned memory workspace
3. Customer or client project repository

Relationships are shown through explicit connectors without merging the containers.

A small external AI-client node may appear with a clear provider-boundary label.

### 12. Markdown-first

**Purpose**  
Show that durable memory remains readable.

**Visual**  
One record displayed simultaneously as Markdown source and structured interface.

**Transformation**  
A controlled reveal moves between source and rendered representation while preserving the same content identity.

### 13. Git-compatible history

**Purpose**  
Show optional inspectable history without making Git the product.

**Sequence**

1. Approved record
2. Changed evidence
3. Proposed edit
4. Reviewed diff
5. Committed version
6. Optional rollback

### 14. Relevant context

**Purpose**  
Show broad memory and selective task context.

**Initial state**  
A structured workspace with many reviewed records.

**Task signals**

- project;
- scope;
- framework;
- environment;
- failure category;
- evidence source;
- approval state;
- review date.

**Scroll states**

1. `full-workspace`
2. `task-defined`
3. `signals-applied`
4. `irrelevant-receded`
5. `focused-context`
6. `selection-explained`

**Desktop**  
Third major pinned sequence.

**Mobile**  
Workspace list followed by explicit filter signals and the selected context set.

**Reduced motion**  
Three static panels: workspace, selection criteria, focused task context.

## Chapter 4 — Value

### 15. What becomes reusable

**Purpose**  
Show a consistent memory anatomy across different record types.

**Visual**  
One central record changes type while preserving its structure.

Record types:

- decision;
- evidence;
- failure and fix;
- correction;
- procedure;
- example;
- context;
- review note;
- lesson.

### 16. Measurement

**Purpose**  
Present value without manufacturing product outcomes.

**Visual**  
A transparent equation whose values come from visible inputs.

```text
people × resets × minutes × working days = monthly context cost
```

The “after” value remains empty until measured.

No animated success number may imply a real customer result.

## Chapter 5 — Current product: QA

### 17. Memory for QA

**Purpose**  
Show the first current product edition through one continuous case.

**Core case**  
A failed test caused by an unstable selector combined with a changed environment condition.

**States**

1. `test-failed`
2. `evidence-collected`
3. `reviewed-memory-retrieved`
4. `hypotheses-tested`
5. `root-cause-identified`
6. `lesson-drafted`
7. `sanitized-and-reviewed`
8. `lesson-approved`
9. `later-failure-assisted`

**Evidence objects**

- test-run output;
- screenshot;
- DOM selector;
- environment metadata;
- test data;
- reviewer note.

**Desktop**  
Fourth and final major pinned sequence.

**Mobile**  
A vertical investigation timeline with one visual state per viewport.

**Reduced motion**  
Nine static scenes with clear state labels.

### 18. Beta validation

**Purpose**  
Present the beta as a learning loop, not a generic signup funnel.

**Visual**

```text
real failure
→ reviewed lesson
→ later retrieval
→ observed outcome
→ product improvement
```

The beta questions appear as measurable checkpoints.

## Chapter 6 — Workbench

### 19. Workbench

**Purpose**  
Show controlled local execution between ChatGPT and a real project.

**Three-column composition**

1. ChatGPT reasoning and request
2. Workbench bounded operation timeline
3. Local repository and validation state

**Sequence**

1. `request`
2. `exact-context`
3. `guarded-change`
4. `targeted-validation`
5. `explicit-git-action`

**Required visible details**

- exact paths;
- bounded context;
- guarded writes;
- confirmation for sensitive operations;
- validation output;
- explicit staging;
- unrelated files remaining untouched.

Do not depict Workbench as autonomous control floating above the repository.

### 20. Two products, one philosophy

**Purpose**  
Connect the final Memory and Workbench states.

Shared principles activate in sequence:

- local-first;
- memory-first;
- human-reviewed;
- evidence-aware;
- inspectable;
- explicitly scoped;
- Git-compatible;
- safe by default.

## Chapter 7 — Boundaries and action

### 21. What ProChat does not claim

**Purpose**  
Show product boundaries without a threatening warning wall.

**Visual**  
A boundary map with three zones:

- current approved capabilities;
- future possible capabilities;
- prohibited or unsupported claims.

Only approved current capabilities receive product-like visual treatment.

### 22. FAQ

Primarily textual.

Use restrained accordion motion with accessible controls and no cinematic treatment.

### 23. Final CTA

**Purpose**  
Resolve the hero story.

Return to the opening repeated problem, now supported by:

- one evidence trail;
- one reviewed memory;
- one focused next-task context;
- one clear QA-beta action.

The CTA enters only after the visual resolution is understandable.

## Visual primitive inventory

```yaml
memory:
  - EvidenceCard
  - MemoryRecord
  - ScopeBadge
  - SourceConnector
  - ReviewGate
  - ContextWindow
  - EvidenceHierarchy
  - MemoryWorkspace
workbench:
  - RepositoryTree
  - GuardedOperation
  - ValidationResult
  - GitAction
  - RunTimeline
shared:
  - ProductBoundaryMap
  - MetricEquation
  - ChapterProgress
```

## Storyboard acceptance criteria

A chapter is ready to prototype only when:

- the core idea can be stated in one sentence;
- initial, middle, and final states are named;
- the product mechanism is accurate;
- realistic sanitized content exists;
- desktop, mobile, and reduced-motion forms are defined;
- the sequence remains understandable in three screenshots;
- the visual does not introduce an unsupported claim;
- the visual can be built with semantic DOM and SVG.
