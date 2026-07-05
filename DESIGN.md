# ProChat Memory Design System

> Category: private, persistent memory for AI-assisted work  
> Scope: ProChat Memory homepage, ProChat Memory for QA page, contact/tester-interest surfaces, and future interface explorations  
> Strategic source: `docs/prochat-memory-website-design-strategy.md`  
> Status: production design direction

ProChat Memory is the flagship product for local, reviewable memory in AI-assisted work. ProChat Memory for QA is the first launch niche and first discipline-specific edition. This file is design-system and visual guidance only; product strategy, naming, and company-level positioning remain subordinate to Mind and the active website strategy docs.

ProChat Memory turns scattered, reusable knowledge into a private memory system that remains available across AI-assisted work. The design must explain this process visually: information is captured, structured, selected, reviewed, and reused without treating an LLM context window as permanent storage.

Lead with buyer outcomes and progressively reveal the technical model. Never imply autonomous trusted-memory updates, automatic self-healing, universal compatibility, or proven quantitative savings.

---

## 1. Visual Theme & Atmosphere

### Core direction

**The Living Memory System**

Visualize ProChat Memory as a stable, user-owned memory structure surrounded by changing tasks, tools, projects, and inputs. The surrounding workflow changes; the memory remains.

The experience should feel:

- calm
- precise
- private
- durable
- authored
- technically credible
- human-controlled
- quietly intelligent

Brand balance:

```text
75% dependable infrastructure
25% future-facing intelligence
```

Internal art-direction phrase:

```text
An editorial systems journal for persistent intelligence.
```

### Primary presentation

Use a warm, light, editorial canvas as the primary marketing presentation. Introduce dark graphite instrument panels selectively for retrieval, architecture, guided setup, or context-window explanations.

The design should feel authored rather than assembled from SaaS blocks. Use numbered chapters, strong typographic hierarchy, measured asymmetry, technical annotations, and large explanatory visuals.

### Premium quality bar — non-negotiable

This website must look and feel like a bespoke, art-directed digital product launch, not a generated landing-page template, documentation page, dashboard mockup, or wireframe.

The final direction must demonstrate:

- a distinctive art-directed visual identity that is recognizable without the logo
- a hero composition with depth, tension, layering, cropping, and a clear focal point
- custom visual assets designed specifically for ProChat Memory
- refined typography with deliberate scale contrast, rhythm, and line breaks
- sophisticated transitions between editorial, immersive, and technical sections
- visual storytelling that carries the narrative even when body copy is skimmed
- strong desktop and mobile compositions designed independently rather than mechanically stacked
- production-feasible motion that feels cinematic and controlled rather than decorative
- deliberate use of texture, light, depth, transparency, and spatial hierarchy
- premium micro-detail: optical alignment, custom icon treatment, refined borders, nuanced surfaces, and purposeful hover states

The page must not be a sequence of headings followed by plain boxes. Every major chapter needs one dominant visual idea with an original composition.

### Visual ambition

The Living Memory System should be rendered as a layered visual world, not as a flat list of cards.

Suitable approaches include:

- a deep 2.5D memory landscape built from layered translucent records, source trails, and focus planes
- an editorial collage of fragments becoming ordered memory, using custom SVG, masks, clipping, blur, and depth
- a spatial memory atlas with foreground, middle-ground, and background layers
- a cinematic context lens that reveals only selected information while the larger memory remains present
- a visual handoff between changing workspaces and one persistent memory core

Use custom art direction for the memory field, context packet, and review gate. Avoid default rectangles, standard SaaS cards, and equal-width grids unless they are part of a larger art-directed composition.

### Composition requirements

- At least one section should use a full-bleed immersive composition.
- At least one section should use editorial asymmetry with unexpected but controlled alignment.
- At least one section should use a dark technical environment with layered depth and luminous state changes.
- At least one section should use an oversized visual that continues beyond the viewport edge.
- Section transitions should vary in rhythm and composition; do not repeat the same heading-plus-box pattern.
- Use whitespace intentionally, but never leave large areas visually empty without tension, scale, or atmosphere.
- The hero visual must occupy substantial visual weight and should feel like a product film frame, not an embedded widget.

### Quality rejection criteria

Reject any direction that looks like:

- a clean wireframe with brand colors
- a documentation site
- a generic AI SaaS template
- a collection of bordered rectangles
- a dashboard preview used as the entire visual identity
- default Lucide icons placed above short labels
- large empty beige sections without visual purpose
- a typography-only page with weak or repetitive imagery
- simple left-copy/right-card layouts repeated throughout
- an implementation sketch presented as final art direction

If the result could be produced from a generic landing-page prompt in one pass, it does not meet the quality bar.

### Core visual metaphor

Use a structured memory field made of readable records, scopes, sources, status states, and relationships.

The field should visibly support:

```text
capture → structure → select → review → improve
```

The system may include:

- memory records
- source links
- project or personal scopes
- trusted, draft, review, and superseded states
- a context lens
- a compact context packet
- a human review gate
- a stable local workspace
- changing outer tools and tasks

### Avoid

Do not use:

- literal brains
- neural-network globes
- robots or anthropomorphic assistants
- generic AI sparkles
- purple-gradient AI clichés
- database cylinders as the hero
- decorative glass cards without meaning
- constant particles
- cyberpunk styling
- magical or autonomous visual language
- a wall of vendor logos as primary proof

The visual promise is that complexity becomes calm.

---

## 2. Color

Use semantic design tokens exclusively in production components. Preserve and extend the existing ProChat CSS-variable and Tailwind-token architecture. Do not introduce raw hexadecimal colors inside page components.

### Base roles

- **Canvas:** warm mineral off-white, not sterile pure white.
- **Primary ink:** very dark graphite-blue, not flat black.
- **Surface:** quiet neutral layers with a slight cool bias.
- **Border:** subtle cool-gray separation.
- **Dark panel:** deep graphite-blue for technical instrument sections.

### Semantic signal colors

```text
Cobalt = system structure, retrieval, active selection, primary action
Mint   = trusted, reviewed, approved, healthy memory
Amber  = recommendation, uncertainty, draft, review required
Coral  = correction, conflict, stale, superseded, destructive state
```

Signal colors explain state; they are not decorative background noise.

### Required semantic roles

- background
- foreground
- foreground-muted
- surface
- surface-soft
- surface-elevated
- border
- border-subtle
- border-strong
- primary
- primary-hover
- primary-foreground
- trusted
- provisional
- correction
- destructive
- focus-ring

### Color behavior

- Keep most layouts neutral.
- Use cobalt as the dominant brand and system signal.
- Use mint only after review or verification.
- Use amber for pending decisions and uncertainty.
- Use coral for conflict, correction, or superseded information.
- Never communicate state through color alone.
- Avoid full-screen gradients.
- Use soft illumination only to indicate retrieval or focus.

### Light and dark themes

Light mode is the primary editorial presentation.

Dark mode must preserve equivalent hierarchy, readable muted text, meaningful signal colors, and restrained glow. It must not be a simple inversion.

---

## 3. Typography

Typography should express serious infrastructure with human clarity.

### Primary family

Use **Geist Sans** or a similarly controlled modern grotesk for headings, body copy, navigation, buttons, diagram labels, and product interface text.

Desired qualities:

- highly legible
- modern without trend dependence
- technical without coldness
- confident at large sizes
- compact enough for information-rich diagrams

### Technical family

Use **JetBrains Mono** for memory states, source counts, timestamps, file paths, identifiers, section numbers, and context-packet metadata.

Examples:

```text
MEMORY / ACTIVE
8 RECORDS
3 SOURCES
REVIEW REQUIRED
LOCAL WORKSPACE
```

### Editorial accent

A restrained serif italic such as **Newsreader Italic** may be used sparingly for conceptual emphasis.

Suitable examples:

```text
Your work remembers.
A memory that stays.
```

Do not use serif accents in every headline.

### Type hierarchy

Recommended desktop ranges:

- Hero display: `clamp(3.5rem, 7vw, 7.5rem)` with compact line height.
- Major section heading: `clamp(2.5rem, 5vw, 5rem)`.
- Supporting heading: `clamp(1.75rem, 3vw, 3rem)`.
- Lead copy: `1.125rem–1.375rem`.
- Body copy: `1rem–1.125rem`.
- Technical labels: `0.6875rem–0.8125rem` uppercase mono with increased tracking.

### Rules

- Lead with direct outcome statements.
- Keep paragraph width near 60–70 characters.
- Avoid very light body weights.
- Tighten display tracking without harming readability.
- Prevent single-word orphan lines in hero headings.
- Use uppercase mono only where it adds system meaning.
- Keep important copy visually stronger than annotations.

---

## 4. Spacing & Grid

Use a 4px base spacing unit.

Preferred sequence:

```text
4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160
```

### Page grid

- Use one consistent centered content container.
- Align editorial copy and system diagrams.
- Use responsive gutters through the existing semantic page-gutter token.
- Allow explanatory visuals to extend beyond the text column while remaining grid-aligned.
- Use asymmetry only when it strengthens hierarchy or movement.

### Major spacing

- Desktop section spacing: generally 112–160px.
- Mobile section spacing: generally 72–104px.
- Keep technical labels compact within a generously spaced complete visual.

### Composition rules

- Alternate quiet editorial sections with immersive visual sections.
- Do not build the homepage from repeated equal cards.
- Use cards only when grouping improves comprehension.
- Avoid nested card stacks.
- Use negative space to communicate stability.
- Use numbered chapters for narrative progression.
- Preserve causal reading order on mobile.

---

## 5. Layout & Composition

### Narrative order

The homepage becomes progressively more technical:

1. Outcome and emotional problem.
2. Cost of repeated context.
3. Scattered work becoming reusable memory.
4. Relevant memory instead of maximum context.
5. Continuity across tools and projects.
6. Local ownership and privacy architecture.
7. Human-reviewed improvement.
8. Current product and edition boundary.
9. Tester interest and qualitative comparison.

### Main homepage hero

Desktop:

- left: outcome-led copy and actions
- right: Living Memory System animation
- bottom: concise outcome indicators

Mobile:

- copy first
- simplified process animation second
- indicators in a two-column grid

Recommended copy:

```text
Eyebrow: PRIVATE, PERSISTENT MEMORY FOR AI
Headline: Stop rebuilding context.
Body: ProChat Memory keeps useful knowledge reusable across AI-assisted work, so you spend less time repeating context and more time moving work forward.
Primary CTA: Become a tester
Secondary CTA: See how Memory works
Proof: Portable. Inspectable. Human-reviewed. Under your control.
```

Outcome indicators:

```text
Less repetition
Less wasted context
Faster continuation
Less to remember yourself
```

### Main homepage sections

#### 01 — Stop rebuilding context

Use the complete Living Memory System hero animation.

#### 02 — Every new session makes you pay again

Visualize:

```text
find → explain → paste → correct → lose → repeat
```

Use non-numeric accumulators for time, context, repeated decisions, and mental effort. Do not invent savings figures.

#### 03 — Your work is already creating knowledge

Visualize:

```text
Capture → Structure → Connect → Review → Reuse
```

Real fragments become scoped, sourced, reviewed records.

#### 04 — Remember broadly. Send only what matters

Use a dark graphite instrument panel showing a large persistent memory field and a narrow context packet containing only relevant records.

#### 05 — The tool changes. The memory remains

Change the surrounding workspace while the central memory remains fixed.

#### 06 — It lives with you

Visualize readable local files and a user-owned workspace. Show client repositories remaining separate and unchanged by default.

#### 07 — It notices. You decide

Show:

```text
Draft → Human review → Trusted memory
```

The review gate must be prominent.

#### 08 — One foundation, many applications

Show ProChat Memory as the flagship foundation. Present ProChat Memory for QA as the first launch niche and first discipline-specific edition. Treat future role or industry examples as visual applications, not current products.

#### 09 — Become a tester

Show:

```text
Describe repeated work → Try a focused flow → Compare qualitatively → Share reviewed feedback
```

### ProChat Memory for QA page

The ProChat Memory for QA page inherits the same system and changes its language, records, evidence, and outcomes for the first launch niche and first discipline-specific edition.

Recommended hero:

```text
Headline: Stop testing from memory. Start testing with it.
Body: ProChat Memory keeps reviewed defects, regressions, environment lessons, test-data rules, and tester corrections available for future investigations.
Primary CTA: Talk about Memory for QA
Secondary CTA: See a ProChat Memory for QA example
```

QA narrative:

1. QA outcome hero.
2. Why testing knowledge disappears.
3. What ProChat Memory for QA remembers.
4. Generic AI triage versus memory-aware triage.
5. Current evidence wins.
6. Human-reviewed learning.
7. Fits beside existing QA tools.
8. Local and portable architecture.
9. Tester interest and qualitative comparison.

### Installation page

Primary promise:

```text
Paste one setup prompt into your AI assistant.
```

Use a three-stage composition:

```text
1. Copy setup prompt
2. Answer a few questions
3. Analyze a failed test normally
```

Do not present this as a universal setup path or fully automatic onboarding flow.

---

## 6. Components & Visual Language

### Memory record

Expose:

- title or pattern
- scope
- status
- source count
- last reviewed date
- confidence or uncertainty where relevant

States:

- draft
- review required
- trusted
- superseded
- conflicting

### Memory field

Use a structured layout of records, not a decorative node graph. Relationships must have a readable reason: shared scope, source, pattern, task, or history.

### Context lens

A soft bounded focus area identifies relevant memory. It moves slowly and illuminates only selected records.

### Context packet

A compact output bundle showing:

- records selected
- sources used
- known constraints
- current scope
- uncertainty

### Review gate

A visible decision surface with:

- approve
- edit
- reject
- keep as draft

Promotion into trusted memory occurs only after this gate.

### Local workspace visual

Use a readable file tree and Markdown previews. Avoid fake terminals as the only explanation.

### Buttons

Use shared ProChat button primitives.

- one primary style
- one secondary style
- one tertiary or text style
- visible hover, active, focus, loading, and disabled states
- stable dimensions during interaction

### Cards

- Use only when grouping is meaningful.
- Keep radius, border, and padding consistent.
- Use subtle elevation.
- Avoid card grids as the default explanation method.

### Navigation

- Sticky navigation may simplify during scroll.
- Current section or route must remain clear.
- Tester CTA should remain easy to reach.
- Mobile navigation must be keyboard accessible.

### Forms

- Keep labels visible.
- Place specific errors near fields.
- Do not replace labels with placeholders.
- Make tester onboarding feel guided rather than technical.

### Illustration and icons

Use:

- file structures
- memory records
- evidence cards
- source links
- scopes
- context packets
- review panels
- system diagrams

Icons are functional aids, not substitutes for explanations.

---

## 7. Motion & Interaction

Animation is an explanatory layer, not decoration. Every major visual must still communicate as a paused frame.

### Tier 1 — Ambient motion

Examples:

- slow context-lens drift
- faint signal movement along meaningful connections
- soft status pulse on trusted memory
- slight parallax between memory layers
- subtle reordering after approval
- calm background-grid movement

Timing:

```text
4–12 seconds per cycle
```

### Tier 2 — Interaction motion

Examples:

- memory-record focus and expansion
- source reveal
- scope selection
- review-state transition
- copy-command confirmation
- context packet highlighting its source records

Timing:

```text
120–240ms
```

### Tier 3 — Narrative motion

Use for the hero and major explanations.

Timing:

```text
8–15 seconds per complete loop
```

#### Homepage hero storyboard

1. **Scattered work:** real fragments enter from different directions.
2. **Structured memory:** records align, connect to sources, and receive draft or trusted states.
3. **Current task:** a task appears in the outer workspace.
4. **Relevant context:** the lens selects only relevant records and forms a compact packet.
5. **Result and review:** a possible reusable lesson appears behind a review gate.
6. **Continuity:** the outer tool changes while memory remains fixed.

Example fragments:

```text
Decision approved
Project convention
Reviewer correction
Known issue
Preferred format
Do not repeat this approach
Source document
```

Example packet:

```text
8 records
3 sources
1 known constraint
```

Review state:

```text
Reusable lesson detected
Review before adding to memory
```

Closing statement:

```text
The tool changes. The memory remains.
```

#### QA hero storyboard

Input fragments:

```text
Known regression
Flaky pattern
Selector rule
Environment difference
Changed acceptance criterion
Previous workaround
Tester correction
Release lesson
```

Current task:

```text
What should I investigate first?
```

Context packet:

```text
3 related failures
2 environment notes
1 known regression
4 source references
```

Output must show:

- evidence used
- memory used
- likely category
- recommended next action
- confidence and uncertainty
- draft reusable lesson
- tester review

### Motion behavior

Use:

- smooth directional flow
- short travel distances
- calm easing
- slight depth changes
- state-based illumination
- progressive disclosure
- clear pauses at comprehension points

Avoid:

- bouncing cards
- constant particle fields
- rapid zooms
- spinning objects
- fake typing loops
- looping decorative blobs
- scroll-jacking
- motion on every paragraph

### Reduced motion

When reduced motion is enabled:

- replace long sequences with three or four static states
- remove parallax and drifting layers
- preserve labels and state information
- keep review gates visible
- never hide meaning behind animation

---

## 8. Voice & Brand

ProChat speaks with calm technical confidence.

Voice characteristics:

- simple
- practical
- direct
- buyer-focused
- outcome-first
- calm
- specific
- transparent about current limits

### Core messages

```text
Stop rebuilding context.
Your files. Your memory. Under your control.
AI drafts. You decide what becomes trusted memory.
The tool changes. The memory remains.
```

### Approved language

Use:

- keep useful knowledge reusable
- stop re-explaining the same context
- designed to reduce repeated work
- relevant memory for the current task
- portable and inspectable
- current evidence wins
- human-reviewed memory
- use the tools you already have
- guided setup prompt where relevant
- express tester interest

### Qualified language

For model, tool, privacy, time, or token claims, use:

- designed to
- can
- when the AI tool can access the workspace
- current implementation where verified
- no hosted memory service is required
- internal testing suggests

### Prohibited claims

Do not claim:

- universal one-command installation
- autonomous trusted-memory updates
- self-healing
- fully autonomous learning
- compatibility with every model, IDE, and operating system
- proven financial savings
- proven token reductions
- zero third-party data processing
- replacement of existing QA tools
- a hosted dashboard that does not exist

### Public terminology

Use:

- ProChat
- ProChat Memory
- ProChat Memory for QA
- ProChat Workbench only where directly relevant

Do not lead with:

- ProChat OS
- Infinite Brain
- second brain
- knowledge graph
- runtime
- modules
- autonomous agent

“Infinite Memory philosophy” may appear only as an internal concept, never as an unlimited capability claim.

---

## 9. Anti-patterns, Accessibility & Production Rules

### Anti-patterns

Do not:

- copy another company’s complete visual identity
- add raw colors inside production components
- create page-specific versions of shared controls
- place every concept inside a card
- use low-contrast body text
- hide labels inside placeholders
- rely on motion for essential meaning
- imply that drafts become trusted without review
- show all stored memory entering the active context window
- imply that local files prevent the selected AI provider from processing supplied content
- represent roadmap features as current capabilities
- use generic icon grids where a process animation is required

### Accessibility

Required:

- WCAG-compliant contrast
- keyboard-accessible controls
- visible focus states
- reduced-motion alternatives
- descriptive summaries for diagrams
- captions or adjacent explanations for narrative animations
- no state communicated by color alone
- no autoplay sound
- no trapped scrolling
- responsive behavior from 360px upward

### Technical production rules

Preserve:

- Next.js
- React
- semantic CSS variables
- Tailwind token mapping
- Radix primitives
- Framer Motion
- shared ProChat UI components
- light and dark themes
- design-system linting

Preferred visual implementation:

- SVG
- CSS transforms
- Framer Motion
- lightweight canvas only where clearly justified

Avoid heavy 3D engines and large background videos for core product explanations.

### Design validation

A successful page lets a first-time visitor answer:

1. What problem does ProChat Memory solve?
2. What does it remember?
3. How does it help a current task?
4. Why does it reduce repeated context?
5. Who controls trusted memory?
6. Where does the memory live?
7. Does it replace existing tools?
8. What can a tester do today?
9. What is roadmap-only?
10. What should the visitor do next?

The design succeeds only when visuals and text answer these questions together.
