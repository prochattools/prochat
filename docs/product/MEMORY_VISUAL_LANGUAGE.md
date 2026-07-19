# ProChat Memory Visual Language

**Status:** CANONICAL PUBLIC-EXPERIENCE VISUAL PHILOSOPHY  
**Decision date:** 2026-07-19  
**Owner approval:** implementation architecture approved  
**Strategic authority:** Mind repository  
**Visual execution authority:** ProChat repository  
**Primitive implementation:** `docs/product/MEMORY_ILLUSTRATION_PRIMITIVES.md`

## Purpose

This document defines how ProChat Memory is expressed visually across the public website.

It is not a component API and it is not a page-layout specification.

It is the governing visual philosophy that determines:

- what memory looks like;
- how evidence is shown;
- how review creates trust;
- how correction remains visible;
- how retrieval becomes selective context;
- how history remains available without controlling the present;
- which metaphors are prohibited;
- how illustrations tell one coherent story across the website.

The primitive library is approved as the implementation architecture. Future compositions must use that library before introducing new symbols.

## Core thesis

> ProChat does not visualize artificial intelligence. ProChat visualizes memory becoming understandable, trustworthy, and useful.

The visual system should make the visitor understand that memory is:

- captured from real work;
- connected to evidence;
- reviewed by humans;
- structured over time;
- correctable and supersedable;
- selectively retrieved;
- portable and durable;
- still governed by the person or organization.

## Memory grammar

The canonical visual sequence is:

```text
raw experience
→ captured record
→ linked evidence
→ human review
→ structured memory
→ selective retrieval
→ applied context
→ correction or continuation
```

Every composed illustration should express one or more steps in this grammar.

A composition must not introduce a new metaphor when an existing grammar step can explain the concept.

## Foundational visual laws

### 1. Memory is represented as records

Memory is not shown as a glowing brain, neural network, or cloud of intelligence.

It is shown as:

- records;
- notes;
- evidence units;
- decisions;
- logs;
- reviewed conclusions;
- linked history;
- structured collections.

Records may be abstract, but they should remain legible as things that could be inspected, corrected, or traced.

### 2. Relationships are represented as provenance

Lines are not decorative connections.

They must communicate:

- source relationship;
- evidence relationship;
- causal or historical sequence;
- branch or alternative;
- correction;
- supersession;
- retrieval path.

Every connector style must preserve stable meaning.

### 3. Trust is represented by review

Trust does not appear as an abstract glow or shield alone.

Trust is created visually through:

- visible source evidence;
- explicit review checkpoints;
- approved state;
- correction history;
- transparent uncertainty;
- versioned change;
- selective retrieval.

The visitor should be able to see why a memory is trusted.

### 4. Correction remains visible

Correction is not visual deletion.

When appropriate, the system should show:

- the old branch;
- the correction point;
- the superseding record;
- the current trusted path.

Historical information may recede, fade, or change line style, but it should not silently disappear when the story depends on revision history.

### 5. Current intent outranks historical pattern

Historical records should remain available without visually overpowering current intent.

Use:

- lower contrast;
- thinner lines;
- dashed or interrupted relationships;
- increased spatial distance;
- historical labels;
- superseded markers.

Current reviewed context should be clearer, warmer, and more direct.

### 6. Retrieval is selective

Retrieval must not look like every record being dumped into a prompt.

The visual should show:

- one current question or task;
- a wider memory field;
- a filter or relevance gate;
- only a small number of selected records;
- rejected or irrelevant records remaining outside the active context.

Selective context is one of the defining visual signatures of ProChat Memory.

### 7. People remain implicit

The system exists for humans, but illustrations should not rely on stock portraits, humanoids, cyborgs, or literal users pointing at interfaces.

Human control is expressed through:

- review checkpoints;
- approval state;
- correction actions;
- clear decision boundaries;
- selective acceptance;
- restrained handoff from recommendation to action.

### 8. Technology remains secondary

The visual system may show technical structure, but it must not become a developer dashboard or infrastructure diagram.

The primary story is:

```text
work becomes memory
memory becomes trustworthy
trusted memory returns when useful
```

Architecture should support that story rather than replace it.

## Emotional character

The visual language should feel:

- calm;
- intelligent;
- precise;
- human;
- durable;
- trustworthy;
- quietly advanced;
- editorial rather than clinical;
- technical without becoming engineering-first;
- premium through restraint and consistency.

It should not feel:

- robotic;
- synthetic;
- cyberpunk;
- medical;
- surveillance-oriented;
- mystical;
- chaotic;
- decorative;
- like a generic AI startup;
- like a database administration interface.

## Stable semantic primitives

The approved primitive library defines the visual alphabet.

| Primitive | Stable meaning |
|---|---|
| `MemoryRecord` | one captured note, conversation, log, decision, result, or memory unit |
| `EvidenceNode` | source evidence that supports, complicates, or is excluded from a conclusion |
| `ProvenanceLink` | traceable relationship between evidence, memory, and conclusion |
| `ReviewCheckpoint` | explicit human review, approval, rejection, or revision requirement |
| `MemoryBranch` | relationship, alternative, history branch, or unresolved path |
| `CorrectionMarker` | correction, revision, or supersession |
| `RetrievalFocus` | the current task or question requesting relevant memory |
| `RelevanceFilter` | selective context inclusion and exclusion |
| `MemoryStack` | structured, durable, reviewed memory |
| `FlowArrow` | semantic progression or transformation |

Rules:

1. Reuse an existing primitive before introducing a new one.
2. A primitive must keep the same meaning across pages.
3. A new primitive requires documentation of its semantic role, visual encoding, states, accessibility behavior, and responsive simplification.
4. Decorative shapes must not imitate semantic primitives.
5. Compositions may simplify the appearance of a primitive, but not change its meaning.

## State grammar

### Raw

Meaning:

- captured but not reviewed;
- incomplete or uncertain;
- not yet trusted as durable memory.

Visual treatment:

- muted border;
- lower contrast;
- incomplete metadata;
- open or pending state.

### Reviewed

Meaning:

- explicitly human-approved;
- suitable for trusted reuse within its stated scope.

Visual treatment:

- clear review marker;
- stronger border or hierarchy;
- stable provenance path;
- readable current-state label.

### Historical

Meaning:

- previously true, useful, or relevant;
- retained for reflection and provenance;
- not automatically current.

Visual treatment:

- softened contrast;
- increased distance;
- thinner or historical connector style;
- explicit temporal cue.

### Superseded

Meaning:

- replaced by a newer conclusion, strategy, preference, or fact;
- retained where history matters.

Visual treatment:

- visible correction marker;
- receding prior branch;
- clear successor relationship;
- never represented by unexplained disappearance.

### Selected

Meaning:

- currently relevant to the active task;
- included after filtering.

Visual treatment:

- focused boundary;
- stronger local contrast;
- restrained glow;
- clear relationship to the current query.

### Excluded

Meaning:

- intentionally not used for the current context;
- may remain valid or available elsewhere.

Visual treatment:

- separation from active flow;
- reduced opacity;
- exclusion marker or line treatment;
- not represented as destroyed.

## Composition grammar

### Capture composition

Question answered:

> How does useful work become memory?

Required elements:

- varied raw inputs;
- visible capture boundary;
- record formation;
- distinction between raw and reviewed state.

The composition should not imply that capture automatically produces trusted memory.

### Review and structure composition

Question answered:

> How does memory become trustworthy?

Required elements:

- evidence sources;
- provenance links;
- explicit review checkpoint;
- structured output;
- one visible correction or superseded branch.

The review action must remain human-controlled.

### Retrieval composition

Question answered:

> How does the right context return when needed?

Required elements:

- current task or question;
- larger memory field;
- relevance filter;
- small selected set;
- clear excluded context;
- applied result that remains distinguishable from a human decision.

### Provenance composition

Question answered:

> Why should I trust this conclusion?

Required elements:

- conclusion or memory record;
- source evidence;
- review state;
- visible historical or correction path where relevant.

### Compounding-memory composition

Question answered:

> Why does ProChat Memory become more valuable over time?

Required elements:

- repeated reviewed records;
- structured accumulation;
- visible continuity;
- relationships across time;
- no unsupported growth or productivity claims.

## Motion grammar

Motion should make causality and transformation understandable.

Allowed uses:

- records entering a capture boundary;
- provenance lines revealing once;
- review state transitioning once;
- a superseded branch receding;
- relevant records becoming selected;
- irrelevant records becoming de-emphasized;
- structured memory settling into a clear final state.

Prohibited uses:

- perpetual floating;
- bounce or elastic easing;
- random particles;
- decorative looping arrows;
- constant pulsing of every node;
- motion that makes the system appear autonomous or uncontrollable;
- animation required to understand the final meaning.

Reduced-motion mode must preserve the complete semantic final state.

## Spatial grammar

- Inputs generally enter from the periphery.
- Review occurs at a visible boundary or checkpoint.
- Trusted structure occupies the clearest hierarchy.
- Historical and superseded material moves outward or backward.
- Retrieval moves from a broad field toward a narrow relevant set.
- Applied context moves toward the current task, not directly into an autonomous action.
- Negative space should separate semantic stages.

## Line and connector grammar

Suggested stable encoding:

- solid line: direct, reviewed, or active relationship;
- dashed line: inferred, uncertain, or historical relationship;
- faded line: superseded or currently irrelevant relationship;
- directional arrow: transformation or retrieval direction;
- branch point: alternative or historical divergence;
- correction marker: explicit revision or supersession.

Do not use line density as decoration.

## Color grammar

The system remains predominantly monochrome.

Color must be localized and semantic.

Suggested behavior:

- warm neutral: current reviewed memory;
- muted gray: raw or historical material;
- localized cyan/teal: focus, retrieval, or selected relevance;
- reduced contrast: excluded or superseded state;
- error or rejection state: differentiated by icon and shape as well as color.

Do not use:

- rainbow state systems;
- generic AI gradients;
- glow as the only state distinction;
- color without accessible secondary encoding.

## Typography inside illustrations

Use typography sparingly.

- Golos Text may label human-readable records or actions.
- JetBrains Mono may label dates, IDs, confidence, source type, branch state, or version metadata.
- Generated or decorative pseudo-text is prohibited.
- Illustration labels must remain readable at their intended breakpoint.
- Mobile compositions may remove secondary labels rather than shrinking them below legibility.

## Accessibility

- Meaningful compositions must expose one accessible title and description through `IllustrationCanvas`.
- Child SVG geometry must not become screen-reader noise.
- Adjacent HTML must explain the complete meaning.
- State must not depend on color alone.
- Reduced-motion mode must preserve meaning.
- Necessary text and connectors must meet applicable contrast requirements.
- Illustrations must remain understandable when animation, filters, or glow are unavailable.

## Responsive adaptation

Responsive design may simplify density but must preserve grammar.

On smaller screens:

- reduce secondary evidence;
- preserve primary sequence;
- stack semantic stages vertically where useful;
- shorten labels;
- retain review, correction, and selection states;
- avoid shrinking the complete desktop diagram into illegibility.

The smallest supported target is 320px.

## Prohibited visual metaphors

Do not use:

- literal brains;
- anatomical neurons;
- humanoid robots;
- cyborgs;
- floating AI orbs;
- generic sparkles;
- code rain;
- holographic dashboards;
- surveillance eyes;
- human replacement imagery;
- autonomous decision imagery;
- databases as the primary product metaphor;
- random node clouds;
- untraceable recommendation magic;
- decorative connectors without semantic meaning.

## Storytelling rule

The homepage should not present isolated diagrams.

Across the full scroll, the illustrations should form one continuing story:

```text
Your work creates fragments.
ProChat captures them as records.
Evidence and review make them trustworthy.
Structure makes them durable.
Retrieval returns only what matters.
The human uses that context to make a better decision.
The result becomes new reviewed memory.
```

Each section should advance this story without repeating the same visual state.

## Quality gate

A composition is ready only when:

1. its visitor question is explicit;
2. its meaning remains clear without animation;
3. every symbol uses the canonical primitive meaning;
4. evidence, review, correction, and selection remain distinguishable;
5. it does not resemble generic AI marketing;
6. it reinforces adjacent copy;
7. it works at desktop and 320px mobile widths;
8. it passes accessibility and reduced-motion review;
9. it adds no new primitive without documentation;
10. it contributes to the full-page memory story.

## Approved implementation architecture

The owner has approved the PXF-003B1 architecture:

```text
primitive
→ composition
→ section
→ page
→ website
```

The approved implementation lives at:

```text
src/app/(marketing)/components/illustrations/
```

The current primitive inventory and APIs are documented in:

```text
docs/product/MEMORY_ILLUSTRATION_PRIMITIVES.md
```

PXF-003B2 must compose the approved primitives rather than inventing independent SVG systems.
