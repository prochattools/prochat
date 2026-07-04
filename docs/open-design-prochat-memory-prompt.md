# Open Design prompt — ProChat Memory website

**Purpose:** generate visual directions and prototype guidance for the ProChat Memory website surface.  
**Scope:** design and prototype only; do not rewrite production website code in the first pass.  
**Authority:** Mind is canonical for product strategy; this prompt is website-design guidance only.

## Required source files

Read these repository files before designing:

```text
README.md
docs/strategy.md
docs/website-copy-blueprint.md
docs/prochat-memory-website-design-strategy.md
DESIGN.md
```

Canonical product strategy remains in Mind:

```text
mind/wiki/organisations/prochat/README.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/growth/README.md
mind/wiki/organisations/prochat/legal/README.md
```

Do not infer product positioning from archived ProChat OS, kit, MikeOSS, BuildFlow, old modules, or older website copy.

## Current product boundary

Design around exactly two current products:

```text
ProChat Memory
ProChat Workbench
```

The first launch niche and first discipline-specific edition is:

```text
ProChat Memory for QA
```

Design implications:

- ProChat Memory is the flagship product.
- ProChat Memory for QA is a QA lens on Memory, not a separate brand.
- ProChat Workbench is the second product and should remain visually distinct from Memory.
- Answers, repeated-work preparation, API access, and MCP integrations are capabilities or future interfaces, not product cards.
- ProChat OS, SaaSKit, ProKit, UXKit, WaaSKit, MikeOSS, and BuildFlow are not current products. BuildFlow may appear only as a Workbench technical/internal compatibility identifier where required.

## Critical workflow correction

Do not begin by generating a complete production homepage.

The first pass must establish a premium visual identity before page assembly.

Use this sequence:

1. Generate three distinct art-direction territories for ProChat Memory.
2. For each territory, produce:
   - one high-fidelity desktop hero frame;
   - one close-up of the memory visual;
   - one typography, color, and material board;
   - one short motion concept.
3. Do not generate lower-page sections yet.
4. Compare the three territories against the quality bar in `DESIGN.md` and the strategy boundaries in `docs/prochat-memory-website-design-strategy.md`.
5. Select or combine one territory only after explicit human approval.
6. Then create the complete homepage direction and QA adaptation around the approved visual language.

The first pass succeeds only when the hero and memory visual look bespoke, premium, calm, precise, and unmistakably ProChat without relying on explanatory body copy.

## Prompt to paste into Open Design

```text
Design an original, production-grade visual direction for the ProChat Memory website.

Before designing, read:

1. README.md
2. docs/strategy.md
3. docs/website-copy-blueprint.md
4. docs/prochat-memory-website-design-strategy.md
5. DESIGN.md

Mind is canonical for ProChat strategy, naming, product hierarchy, roadmap, growth policy, and legal-policy direction. Treat the repository docs as website implementation guidance only. Do not infer product strategy from archived ProChat OS, kit, MikeOSS, BuildFlow, old module, or older copy documents.

CURRENT PRODUCT BOUNDARY

Current products:

- ProChat Memory
- ProChat Workbench

Current launch niche:

- ProChat Memory for QA

ProChat Memory is the flagship product. ProChat Memory for QA is the first launch niche and first discipline-specific edition. ProChat Workbench is the second product and should be visually distinct.

Do not create product cards or main navigation for ProChat OS, ProChat Answers, ProChat Automations, ProChat API, ProChat MCP, SaaSKit, ProKit, UXKit, WaaSKit, MikeOSS, or BuildFlow. If BuildFlow appears at all, treat it only as a technical/internal compatibility identifier for Workbench.

PROJECT

ProChat Memory is local-first, inspectable, review-first memory for AI-assisted work.

It keeps useful knowledge reusable across sessions, tools, projects, and workflows. The first niche edition is ProChat Memory for QA, where testers preserve reusable lessons from failed tests, flaky behavior, selectors, environments, test data, release decisions, and reviewer corrections.

Primary homepage outcome:

Stop rebuilding context.

Supporting ideas:

- Your files. Your memory. Under your control.
- AI drafts. You decide what becomes trusted memory.
- The tool changes. The memory remains.
- Current evidence overrides stale memory.

AUDIENCE

The main homepage must be niche-agnostic. It should be understandable to nontechnical buyers before becoming more technical lower on the page.

The first audience-specific page is for QA professionals, but do not make the homepage QA-only.

PRIMARY DESIGN GOAL

Create a premium visual system that makes reusable, reviewable memory understandable through visual storytelling.

The visitor should immediately understand:

- less repeated explanation;
- better continuity between AI sessions;
- private, portable, inspectable memory;
- human control over trusted memory;
- current evidence remains visible;
- QA is the first niche application.

Do not use unsupported numbers, guaranteed savings, zero-hallucination claims, or autonomous-memory claims.

ART DIRECTION

Use the direction: The Living Memory System.

Visualize a stable, user-owned memory structure surrounded by changing tasks, tools, projects, evidence, and AI sessions. The surrounding workflow changes while the memory remains.

Show this process:

keep → select → use → review → improve

Brand balance:

75% dependable infrastructure
25% future-facing intelligence

The experience should feel:

- calm;
- precise;
- private;
- durable;
- authored;
- technically credible;
- human-controlled;
- quietly intelligent;
- evidence-aware.

Use:

- strong editorial typography;
- numbered chapters;
- deliberate asymmetry;
- generous whitespace;
- technical micro-labels;
- readable memory records;
- file structures;
- source links;
- scope markers;
- evidence cards;
- context lenses;
- review panels;
- calm system diagrams.

Avoid:

- literal brains;
- neural-network globes;
- robot mascots;
- generic AI sparkles;
- purple-gradient AI clichés;
- cyberpunk visuals;
- decorative particle clouds;
- database cylinders as the hero;
- meaningless glass cards;
- generic four-card feature grids;
- vendor-logo walls as primary proof;
- fake terminal typing as the main visual;
- autonomous-agent visuals that imply unreviewed action.

MEMORY VISUAL REQUIREMENTS

The memory visual should show:

1. memory records containing lessons, decisions, examples, sources, procedures, corrections, and QA patterns;
2. a context lens selecting only records relevant to the current task;
3. current evidence shown beside stored memory;
4. a proposed memory update waiting for human review;
5. approved memory becoming available for future tasks;
6. scoped memory labels such as project, client, team, and QA edition.

QA ADAPTATION

After the main Memory direction is approved, adapt it to ProChat Memory for QA.

QA elements may include:

- failed-test output;
- flaky-test pattern;
- selector or locator rule;
- test-data rule;
- environment difference;
- release lesson;
- acceptance criteria;
- tester correction;
- current evidence and confidence;
- proposed memory update.

Make clear:

AI drafts. Tester reviews. Approved lessons become reusable memory.

WORKBENCH RELATIONSHIP

If the design includes the broader ProChat product set, show only:

- ProChat Memory;
- ProChat Workbench;
- ProChat Memory for QA nested under Memory.

Workbench should use a related but distinct visual pattern: local repo context, bounded operation, validation evidence, and explicit checkpoint.

OUTPUT REQUIRED FOR FIRST PASS

Produce three distinct art-direction territories.

For each territory, provide:

1. a high-fidelity desktop hero frame;
2. a close-up of the memory visual;
3. typography, color, and material direction;
4. motion concept;
5. explanation of how the territory communicates review-first memory;
6. notes on how it adapts to ProChat Memory for QA.

Do not create production code. Do not rewrite the production site. Do not create final navigation until the art direction is approved.
```

## Review checklist

A generated direction is acceptable only if:

- ProChat Memory is clearly the flagship;
- ProChat Memory for QA is nested under Memory;
- ProChat Workbench is separate;
- only two current products are shown;
- future interfaces are not product cards;
- legacy names do not drive the design;
- memory looks inspectable and reviewable;
- review before trust is visible;
- no unsupported product, legal, savings, or automation claims are implied;
- the result feels premium and original, not a generic AI landing page.
