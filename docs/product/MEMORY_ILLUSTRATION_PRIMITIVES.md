# ProChat Memory Illustration Primitives

**Packet:** PXF-003B1  
**Status:** implementation v1  
**Scope:** reusable marketing SVG primitives only  
**Public section status:** none

## Purpose

This library is the visual alphabet for explaining ProChat Memory. It encodes records, evidence, provenance, review, correction, retrieval, relevance, structure, and semantic flow without relying on generic AI imagery.

The library lives at:

```text
src/app/(marketing)/components/illustrations/
```

The development specimen lives at:

```text
/design-lab/memory-illustrations
```

The route returns `notFound()` outside development. Remove the review surface by deleting:

```text
src/app/(marketing)/design-lab/memory-illustrations/
```

## Semantic mapping

| Primitive | Semantic meaning | Visual encoding | Variants or states |
|---|---|---|---|
| `MemoryRecord` | One captured note, conversation, log, test result, decision, or evidence item | Rounded record, metadata, content rules, explicit state icon and label | `raw`, `reviewed`, `historical`, `superseded`, `selected` |
| `EvidenceNode` | Source evidence supporting or complicating a record or conclusion | Compact node plus stable status geometry | `available`, `linked`, `uncertain`, `excluded` |
| `ProvenanceLink` | Traceable relationship between evidence, memory, and conclusion | Directional connector with line pattern and midpoint marker | `direct`, `inferred`, `historical`, `superseded` |
| `ReviewCheckpoint` | Explicit human review or approval | Bounded gate with clock, check, cross, or revision arrow | `pending`, `approved`, `rejected`, `revision-required` |
| `MemoryBranch` | Relationship, alternative path, or history branch | One source splitting into two labeled outcomes | `active`, `secondary`, `superseded`, `unresolved` |
| `CorrectionMarker` | Correction, revision, or supersession | Circular revision arrow with diagonal correction stroke | none |
| `RetrievalFocus` | Current question or task requesting relevant memory | Task record with search target, focus brackets, and localized glow | none |
| `RelevanceFilter` | Selective context retrieval | Many muted inputs, funnel geometry, fewer emphasized outputs | none |
| `MemoryStack` | Structured, durable, reviewed memory | Offset record layers with review mark and record count | none |
| `FlowArrow` | Semantic direction or transformation | Directional line, midpoint dot or transformation diamond | `progression`, `transformation` |

## Component API

All primitives render SVG groups and must be children of `IllustrationCanvas`.

Shared primitive controls:

```ts
interface PrimitiveProps {
  x?: number
  y?: number
  compact?: boolean
  revealOrder?: number
  className?: string
  opacity?: number | string
}
```

Semantic APIs use unions rather than arbitrary style configuration:

```tsx
<IllustrationCanvas
  viewBox="0 0 300 190"
  title="Reviewed memory with source evidence"
  description="A linked source supports a human-reviewed memory record."
  motion="reveal"
>
  <EvidenceNode variant="linked" label="Run log" x={12} y={74} />
  <ProvenanceLink variant="direct" from={[72, 88]} to={[148, 88]} />
  <MemoryRecord variant="reviewed" label="QA lesson" x={150} y={58} />
</IllustrationCanvas>
```

`IllustrationCanvas` creates one unique definition namespace with React `useId()`. Markers, gradients, patterns, and filters therefore do not collide when multiple illustrations render on one page.

## Accessibility

- `IllustrationCanvas` is decorative by default when no title is provided and emits `aria-hidden="true"`.
- Meaningful compositions accept `title` and `description`, render one `role="img"`, and connect the accessible name and description with unique IDs.
- Child geometry is not exposed as independent screen-reader content.
- Adjacent semantic HTML must contain the final product meaning. SVG text is supporting visual evidence, not the only explanation.
- State never depends on color alone. Shape, icon, line pattern, opacity, and visible state labels reinforce every variant.
- Required graphical boundaries use higher-contrast lines than decorative grids and dot fields.

## Motion

- Every primitive is complete and understandable in its static state.
- `IllustrationCanvas motion="reveal"` enables one opacity and 6px transform reveal.
- `revealOrder` provides restrained sequencing without a timeline dependency.
- No primitive floats, bounces, pulses continuously, or changes state autonomously.
- `prefers-reduced-motion: reduce` removes the reveal animation and immediately shows the final state.
- Compositions can disable motion with `motion="none"`, which is the default.

## Responsive behavior

- SVG geometry scales without raster blur.
- `compact` shortens records and checkpoints while preserving label size and state geometry.
- Secondary metadata may be omitted in compact mode, but state labels remain visible.
- Mobile compositions should use fewer secondary evidence nodes and simpler relationships rather than scaling a desktop scene below readability.
- The specimen constrains illustrations to a 300px visual coordinate system so labels remain legible at the 320px minimum viewport.
- Primitives do not require pointer or touch interaction.

## Visual rules

- Use the existing Nexus-derived semantic variables or provide the `--pm-illustration-*` token interface.
- Keep panels near black with thin neutral borders and one localized memory accent.
- Use 1px to 1.35px connector strokes and 8px to 11px primitive radii.
- JetBrains Mono is limited to technical metadata and state labels.
- Golos Text is used for communication labels.
- Dotted fields and glow are composition-level context, not primitive decoration.
- Reuse these primitives before adding new symbols.

## Deferred work

This packet does not implement:

- Capture composition;
- Review and Structure composition;
- Retrieval composition;
- trust strip;
- benefits chapter;
- later homepage sections.

Those compositions should combine this library without expanding its API unless a real semantic gap is demonstrated.




## Governing visual philosophy

All primitives and compositions must follow:

```text
docs/product/MEMORY_VISUAL_LANGUAGE.md
```

The primitive library is the approved implementation alphabet. The visual-language document controls how those primitives combine into memory stories, how states are interpreted, which metaphors are prohibited, and how compositions preserve human review, provenance, correction, selective retrieval, and responsive accessibility.

New primitives require both API documentation here and semantic justification in the visual language.
