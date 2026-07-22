# ProChat Product Context

**Status:** repository-local implementation context  
**Canonical strategy:** Mind  
**Applies to:** ProChat website design, implementation, review, and polish

This file gives design and implementation agents the minimum product context required to work safely in this repository. It does not replace canonical Mind strategy.

## Company

ProChat is a memory-first software company.

It builds local products that keep project knowledge reusable and connect familiar AI interfaces to real project work.

## Current product family

ProChat has exactly two current products:

1. **ProChat Memory** — the flagship product for reusable project knowledge.
2. **ProChat Workbench** — a ChatGPT-first local builder workbench.

**ProChat Memory for QA** is the first discipline-specific edition of ProChat Memory. It is not a third product.

Future API access, automation, and MCP integrations are capabilities or interfaces within current products, not separate products.

## Flagship product

ProChat Memory is a local, Markdown-first project memory system.

It helps people capture, review, retrieve, correct, improve, and retire reusable project knowledge without requiring ProChat to host customer memory.

The trust workflow is:

```text
current evidence
→ draft lesson
→ sanitization and scope
→ human review
→ approved memory
→ relevant retrieval
→ correction or retirement
```

Current evidence and human judgment remain stronger than stored memory.

## Current launch focus

The first and only current discipline-specific edition is **ProChat Memory for QA**.

The current primary user is an individual QA tester working with repeated failures, investigations, evidence, fixes, selectors, environments, test data, and review decisions.

The selected QA beta is:

- free only for approved beta participants;
- manually selected;
- public source-available, not open source;
- without a fixed end date;
- in active development;
- focused on measured repeated value rather than broad sales.

## Workbench

ProChat Workbench connects ChatGPT reasoning to repositories, documentation, notes, and knowledge folders through controlled local operations.

Its canonical sequence is:

```text
request
→ exact local context
→ guarded change
→ targeted validation
→ explicit Git action
```

Workbench must not be presented as an autonomous agent that silently controls a repository.

## Homepage objective

The homepage must make these points understandable:

1. Useful project work should leave useful memory behind.
2. ProChat Memory is the flagship.
3. Memory becomes trusted through evidence, sanitization, scope, and human review.
4. Customer memory remains local in the current product model.
5. Relevant memory should enter a task without loading the entire archive.
6. The currently available edition is ProChat Memory for QA.
7. Workbench is the second product and shares the same controlled, inspectable philosophy.

## Primary conversion

**Explore ProChat Memory for QA**

Secondary conversions:

- Join the selected QA beta
- See how Memory works
- Explore ProChat Workbench

## Brand character

The company should feel:

- reliable;
- trustworthy;
- stable;
- clean;
- minimal;
- logical;
- structural;
- simple;
- premium;
- technically credible.

The website should feel like a calm working system for structured knowledge, not an AI spectacle.

## Copy boundaries

Do not claim:

- zero hallucinations;
- automatic trusted memory;
- guaranteed savings;
- universal compatibility;
- a hosted customer-memory platform;
- encryption that is not documented;
- that no information can ever reach an external AI provider;
- finalized Memory pricing or enterprise support;
- that future capabilities are current products.

Use “durable” and “reusable” for Memory rather than making “persistent” the primary category language.

Use “customer memory remains on the customer’s computer” rather than a blanket “private” claim.

## Canonical references

```text
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/brand/canonical-homepage-copy.md
mind/wiki/organisations/prochat/brand/global-design-foundation.md
mind/wiki/organisations/prochat/brand/website-visual-motion-system.md
mind/wiki/organisations/prochat/brand/website-build-contract.md
```
