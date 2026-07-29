# ProChat Product Experience Foundation Program

**Status:** canonical repository-local discovery and design execution program  
**Owner:** Steve Westhoek  
**Scope:** marketing-site interpretation, information architecture, design language, wireframes, visual design, and implementation planning  
**Coding required:** not for every phase  
**Strategic authority:** Mind repository, beginning at `organizations/prochat/README.md`  
**Execution authority:** this ProChat repository for verified marketing-site implementation facts and repository-local plans

## Cross-repository authority contract

The Mind repository is the sole authority for high-level ProChat business truth.

Mind owns:

- company philosophy and belief system;
- product and company strategy;
- naming and product hierarchy;
- positioning, category, audience, offer, and market context;
- business stage and cross-product roadmap;
- growth and legal-policy direction;
- approved public-language rules.

The canonical Mind entry point is:

```text
organizations/prochat/README.md
```

That document directs readers to the scoped brand, product strategy, architecture, roadmap, narrative, category, legal, and growth authorities.

This ProChat repository is subordinate. It owns execution of the marketing experience: routes, content implementation, design application, components, accessibility, performance, testing, release mechanics, and repository-local delivery plans.

Rules:

1. Do not invent, redefine, or duplicate company philosophy or business strategy in this repository.
2. High-level strategic questions must be answered from Mind or recorded as open Mind decisions.
3. If an interview produces a new company-level conclusion, document and approve it in Mind first.
4. ProChat may record a concise execution interpretation only when it links to the controlling Mind authority.
5. If ProChat implementation evidence conflicts with Mind, report the conflict; do not silently replace Mind.
6. Repository-local files such as `PRODUCT.md`, `DESIGN.md`, and `brand-spec.md` are implementation contracts and must remain subordinate to Mind.

## Purpose

The public website must not emerge from disconnected coding tasks or transient conversation decisions.

Every material conclusion about product positioning, audience, emotional character, references, information hierarchy, visual direction, motion, accessibility, and implementation must be captured in durable repository documentation before it becomes production UI.

The program follows this sequence:

```text
product discovery
→ information architecture
→ design language
→ wireframes
→ high-fidelity visual design
→ implementation plan
→ production implementation
→ browser evidence and review
```

Apple is a quality benchmark for restraint, typography, composition, motion, clarity, and implementation detail. It is not a template to copy. ProChat must remain visually and conceptually distinct.

## Operating principles

1. **Discovery is work.** Interviews, questions, reference review, decision logs, and rejection criteria are executable tasks.
2. **Structure precedes decoration.** Page purpose, hierarchy, user journeys, and content come before visual styling.
3. **Tokens follow direction.** Existing factual brand tokens remain authoritative, but page-level visual decisions are validated through composition and prototypes rather than chosen in isolation.
4. **Approval gates prevent accidental design.** No deliverable advances because code exists; it advances when its evidence and decisions are reviewed.
5. **Conversation is not authority.** Accepted conclusions must be recorded in the repository.
6. **Production code is downstream.** High-fidelity direction and implementation contracts must be approved before broad visual production work.
7. **Archive, do not silently inherit.** Historical visual implementations remain evidence until explicitly classified as retain, reference, migrate, archive, or delete.

## Phase 0 / Deliverable 1 — Mind-grounded founder discovery

### Goal

Extract the owner’s intent, compare it with canonical Mind strategy, identify gaps or conflicts, and produce an approved marketing-execution brief without redefining company strategy inside ProChat.

### Discovery inputs required from the owner

- product vision in the owner’s own words;
- primary and secondary audiences as currently understood;
- desired primary conversion;
- websites or products admired, with specific reasons;
- emotional keywords the experience should express;
- visual or interaction patterns the owner dislikes;
- trust, privacy, pricing, launch, and claim questions requiring review.

These answers are evidence, not automatically new strategy.

### Tasks

- read `mind/organizations/prochat/README.md` and its directed canonical authorities first;
- conduct a structured owner interview;
- compare every high-level answer with Mind’s company philosophy, naming, hierarchy, positioning, product strategy, roadmap, and brand rules;
- classify each answer as confirmed by Mind, execution preference, open Mind decision, or conflict requiring reconciliation;
- record new company-level conclusions in Mind, not ProChat;
- after Mind approval, derive the website audience, promise, CTA hierarchy, emotional direction, and reference interpretation;
- classify public claims as approved, needs evidence, future, or prohibited;
- record decision owners and unresolved dependencies.

### Outputs

In Mind:

- any approved change to philosophy, strategy, positioning, audience, offer, naming, category, business stage, or cross-product roadmap;
- strategic open questions requiring owner resolution.

In ProChat:

- a linked marketing-execution brief;
- audience and conversion interpretation derived from Mind;
- approved emotional attributes and anti-attributes for the website;
- reference-site analysis;
- execution decisions and implementation questions only.

### Exit gate

The controlling Mind authorities are identified, strategic gaps are resolved or explicitly open in Mind, and the owner approves the subordinate ProChat marketing-execution brief, CTA hierarchy, emotional direction, and reference interpretation.

## Deliverable 2 — Information architecture

### Goal

Define the public platform’s pages, navigation, hierarchy, and user journeys before visual design.

### Tasks

- audit current and planned routes;
- classify legacy pages and components;
- define sitemap and navigation model;
- define page purpose, audience, CTA, and evidence requirements;
- map primary user journeys;
- define footer, legal, documentation, and product relationships;
- identify pages that must not yet be published.

### Outputs

- approved sitemap;
- navigation and footer model;
- page responsibility matrix;
- user-journey diagrams;
- legacy retain/archive/migrate/delete register.

### Exit gate

Every planned page has an approved purpose, owner, audience, conversion role, and dependency status.

## Deliverable 3 — Design language

### Goal

Turn the existing brand foundation into an applied visual and interaction grammar.

### Tasks

- validate typography, spacing, color, radius, shadow, grid, and motion in real compositions;
- define photographic, illustration, diagram, icon, and product-visual rules;
- define responsive and accessibility behavior;
- define content density and section rhythm;
- define Apple-like quality attributes without copying Apple-specific layouts or assets;
- prototype representative hero, narrative, product-proof, CTA, navigation, and footer compositions;
- document accepted and rejected experiments.

### Outputs

- applied design-language specification;
- component and composition principles;
- responsive behavior rules;
- motion and reduced-motion contract;
- accessibility constraints;
- approved visual-direction prototypes.

### Exit gate

The owner approves one coherent visual direction and the system explains how it scales beyond the homepage.

## Deliverable 4 — Wireframes

### Goal

Prove information hierarchy and flow without relying on visual polish.

### Tasks

- create low-fidelity desktop and mobile wireframes;
- map content blocks to page responsibilities;
- test hierarchy, scanning, CTA clarity, and narrative sequence;
- review edge cases, long copy, missing evidence, and responsive collapse;
- record revisions and unresolved content dependencies.

### Outputs

- approved homepage wireframe;
- approved key-page wireframes;
- responsive annotations;
- content dependency register;
- interaction notes.

### Exit gate

The owner approves structure and flow without needing color, imagery, or animation to make the page understandable.

## Deliverable 5 — High-fidelity visual design

### Goal

Create the final visual expression of the approved wireframes and design language.

### Tasks

- create high-fidelity desktop and mobile designs;
- design realistic product visuals and evidence objects;
- define motion storyboards for major sequences;
- test typography, contrast, spacing, and responsive behavior;
- review against brand character, accessibility, and anti-patterns;
- run owner review and document decisions.

### Outputs

- approved high-fidelity page designs;
- responsive states;
- motion storyboards;
- production-ready visual assets or specifications;
- design QA checklist.

### Exit gate

The owner explicitly approves the visual direction for production implementation.

## Deliverable 6 — Implementation plan

### Goal

Translate approved design into bounded engineering tasks with measurable acceptance criteria.

### Tasks

- inventory required tokens, components, layouts, assets, and content;
- map new work against legacy retain/archive/migrate/delete decisions;
- define implementation packets in dependency order;
- define accessibility, performance, browser, and visual-regression checks;
- define rollout, rollback, and route activation strategy;
- prohibit speculative production work outside approved designs.

### Outputs

- component inventory;
- token delta register;
- page implementation packets;
- migration and archive plan;
- validation matrix;
- rollout and rollback plan.

### Exit gate

Every production packet has exact inputs, allowed paths, acceptance criteria, validation, dependencies, and rollback.

## Owner-input timing

The owner should provide the discovery inputs **at the start of Deliverable 1**, before new visual production design begins.

The preferred interview order is:

1. product vision;
2. audience and conversion priorities;
3. admired websites and the exact qualities admired;
4. emotional keywords;
5. disliked patterns and failure examples;
6. trust, claim, pricing, and launch constraints.

These inputs are not expected to arrive as polished design tokens. They are raw strategic evidence. The design program converts them into approved decisions, then validates those decisions through wireframes and prototypes.

## Execution status

```yaml
mind_infinite_brain_philosophy: CONFIRMED
mind_founder_discovery_session_1: COMPLETE
mind_public_platform_strategy: EXISTS
product_truth: EXISTS
brand_character: EXISTS
design_tokens: EXISTS_DEPLOYED
prochat_marketing_execution_brief: COMPLETE
reference_site_analysis: COMPLETE
homepage_information_architecture: COMPLETE
applied_visual_direction: APPROVED_AND_DEPLOYED
wireframes: SUPERSEDED_BY_TEMPLATE_ADOPTION
high_fidelity_design: APPROVED_AND_DEPLOYED
implementation_packetization: COMPLETE
production_visual_design: COMPLETE
public_pages_deployed: COMPLETE
analytics_tracking: COMPLETE
program_status: COMPLETE
```

## Program completion

The Product Experience Foundation program is complete as of 2026-07-29 at HEAD `4b423fb`.

All six deliverables were executed through an approved Nexus-template-adoption path (PXF-003A through PXF-006F). The public platform is live and in continuous governance.

Completed PXF sequence:

```text
PXF-003A — Nexus-template homepage foundation
PXF-003B0 — Public conversion strategy foundation
PXF-003B1A — Memory illustration architecture
PXF-003B2A — Product hierarchy and canonical routes
PXF-003C1 — Live hero motion fidelity
PXF-003E — Combined adoption chapter
PXF-004 — Production refinements
PXF-005 — Responsive, docs, contact, and design alignment
PXF-006A–F — Metadata, a11y, sitemap, privacy, terms, onboarding, analytics
PXF-006G — Roadmap reconciliation and program closure
```

## Continuous governance

The program is in Phase 13 (continuous governance). No further PXF packets are pending. Future work follows the Phase 13 quarterly review cadence defined in `docs/roadmap.md`.
