# ProChat Public Page Architecture

**Status:** CANONICAL PUBLIC-EXPERIENCE ROUTE AND PAGE-PURPOSE CONTRACT  
**Decision date:** 2026-07-19  
**Strategic authority:** Mind repository  
**Execution authority:** ProChat repository

## Product hierarchy

```text
ProChat
├── ProChat Memory — flagship product; niche-agnostic memory model
│   └── ProChat Memory for QA — first niche-specific edition
└── ProChat Workbench — second product
```

The homepage must make this hierarchy implicit and clear:

- lead with Memory in general;
- explain why durable, reviewed memory matters across disciplines;
- demonstrate the general capture, review, structure, retrieval, and reuse model;
- introduce Memory for QA later as the first concrete use case;
- introduce Workbench later as the second product;
- keep Memory visually and narratively dominant.

## Canonical public routes

```text
/                     ProChat company homepage; Memory-first and niche-agnostic
/memory               ProChat Memory general flagship product page
/memory-qa            ProChat Memory for QA niche-specific product page
/workbench            ProChat Workbench product page
/docs                  Documentation entry
/contributing          Contribution entry when available
/contact               Contact and managed implementation routing
/privacy               Privacy
/terms                 Terms and licensing
```

### Legacy route disposition

```text
/prochat-memory  → /memory
/qa-memory       → /memory-qa
```

Legacy routes should use permanent redirects only after canonical routes are implemented and verified. Existing inbound links must not break.

## Homepage purpose

The homepage answers:

> Why should durable, reviewed memory become part of how I work?

It is not the QA product page and it is not the Workbench product page.

The hero and first explanatory chapters must remain niche-agnostic.

They may use examples from software work, but must not imply that ProChat Memory is only for QA, software testing, repositories, or code.

The homepage should communicate that ProChat Memory can support any domain where people need to preserve, review, connect, correct, and retrieve durable context.

Examples may later span:

- product and project work;
- research;
- business decisions;
- personal knowledge;
- operations;
- learning;
- QA and software delivery;
- other discipline-specific editions.

Do not claim editions or supported workflows that do not yet exist.

## Homepage narrative specificity gradient

The page becomes more specific as the visitor scrolls.

```text
Hero and trust model
  generic Memory promise

Benefits and system model
  generic capture → review → retrieve story

Proof and examples
  concrete but cross-disciplinary memory examples

Current product application
  ProChat Memory for QA

Second product
  ProChat Workbench

Participation and conversion
  repository, testing, feedback, contribution, documentation
```

The hero must not lead with:

- QA terminology;
- software-test failures;
- Playwright or browser-runner evidence;
- niche-specific beta language;
- Workbench operations;
- consulting or managed-service language.

Those belong lower on the homepage or on dedicated pages.

## Homepage primary product story

The flagship story is:

```text
Useful work produces fragments.
ProChat Memory captures them as records.
Evidence and human review make them trustworthy.
Structure makes them durable.
Selective retrieval brings back what matters.
The result supports better human decisions.
New work improves the memory again.
```

This story is niche-agnostic.

## Homepage product-introduction section

A later homepage chapter must introduce exactly two product paths.

### ProChat Memory for QA

Role:

- first concrete niche-specific edition;
- demonstrate the flagship model in a real discipline;
- link to `/memory-qa`;
- use the promise “Stop solving the same QA failure twice” only in this product introduction and the dedicated page, not as the homepage's general promise.

### ProChat Workbench

Role:

- second product;
- explain controlled local work through ChatGPT;
- link to `/workbench`;
- remain visually secondary to Memory;
- avoid presenting Workbench as part of the Memory edition hierarchy.

## `/memory` — flagship product page

Primary question:

> What is ProChat Memory, and how can it support durable context in any domain?

The page must be niche-agnostic and explain:

- the memory problem;
- raw input versus reviewed memory;
- local and Markdown-first ownership;
- provenance;
- review and correction;
- historical and superseded memory;
- selective retrieval;
- model independence;
- portability;
- human agency;
- product boundaries;
- current editions and use cases.

Primary conversion:

- verified repository or product-access action once Mind and repository status are reconciled.

Supporting conversions:

- explore Memory for QA;
- read documentation;
- understand the trust model;
- provide feedback or contribute when verified.

The page must not become a broad philosophy essay. It is a product page.

## `/memory-qa` — niche-specific product page

Primary question:

> How does ProChat Memory help QA professionals stop repeating investigations?

The complete page must be dedicated to QA.

It should include:

- real QA terminology;
- failure investigation workflow;
- evidence collection;
- flaky behavior;
- selector, environment, data, and release lessons;
- human review;
- stale-memory handling;
- current product limitations;
- installation or tester path when verified;
- GitHub feedback and contribution paths when verified.

Primary promise:

```text
Stop solving the same QA failure twice.
```

Canonical route:

```text
https://prochat.tools/memory-qa
```

Repository-specific references should use this route.

## `/workbench` — second-product page

Primary question:

> How does ProChat Workbench let ChatGPT work safely and locally with a real project?

The complete page must be dedicated to Workbench.

It should include:

- exact local context;
- bounded operations;
- guarded file changes;
- explicit confirmation;
- validation;
- persistent run state;
- source isolation;
- Git boundaries;
- current limitations and availability;
- repository, feedback, issue, and contribution paths when verified.

Primary promise:

```text
Build apps through ChatGPT locally.
```

Canonical route:

```text
https://prochat.tools/workbench
```

Repository-specific references should use this route.

## Cross-page visual system

All three principal pages must use the same design family:

- Nexus-derived dark visual grammar;
- Golos Text;
- JetBrains Mono metadata;
- Memory Visual Language where memory is explained;
- stable navigation and footer;
- shared card, grid, CTA, and motion tokens;
- responsive and reduced-motion behavior;
- page-specific illustrations and examples.

They must not appear to be unrelated websites.

### Differentiation

Homepage:

- broadest and most emotional;
- generic Memory story;
- introduces both products.

Memory for QA:

- discipline-specific;
- concrete workflows and evidence;
- stronger product-action emphasis.

Workbench:

- controlled execution and safety;
- local builder workflows;
- technical but still product-led.

## Navigation contract

Preferred primary navigation:

```text
Memory
Memory for QA
Workbench
Documentation
```

Targets:

```text
Memory         → /memory
Memory for QA  → /memory-qa
Workbench      → /workbench
Documentation  → /docs
```

The wordmark returns to `/`.

The primary CTA label and destination remain release-gated by `PUBLIC_CONVERSION_STRATEGY.md` and Mind reconciliation.

## SEO and canonical requirements

- Each product page requires unique title, description, social metadata, and canonical URL.
- `/memory-qa` must not canonicalize to `/memory`.
- `/workbench` must not be represented by a contact-query URL.
- Redirected legacy routes must not produce duplicate canonical content.
- Structured data may identify ProChat as the organization and each page as a software product only when claims are accurate.

## Acceptance criteria

The architecture is correctly implemented when:

1. `/` is generic Memory-first and niche-agnostic above the product-introduction chapter.
2. `/memory` is the general flagship product page.
3. `/memory-qa` is entirely QA-specific.
4. `/workbench` is entirely Workbench-specific.
5. homepage cards link to `/memory-qa` and `/workbench`.
6. primary navigation uses canonical routes.
7. `/qa-memory` and `/prochat-memory` preserve inbound traffic through redirects.
8. visual and interaction systems remain coherent across pages.
9. QA language does not leak into the generic hero or benefits chapter.
10. Workbench does not compete visually with the Memory flagship on the homepage.
11. release-gated GitHub, licensing, installation, and service claims remain unasserted until verified.




## Reconciled repository destinations and participation boundaries — 2026-07-19

Canonical repositories:

```text
Memory for QA → https://github.com/prochattools/memory-qa
Workbench     → https://github.com/prochattools/workbench
```

There is no separate approved public repository for general ProChat Memory.

Page behavior:

- `/memory` explains the general flagship and links to `/memory-qa` for the current public implementation.
- `/memory-qa` may link to its public repository, selected-beta application path, Issues, and Discussions.
- `/memory-qa` must say `source-available`, not `open source`.
- `/memory-qa` must restrict clone/install/use language to approved beta participants.
- `/workbench` may say `free and open source under AGPL-3.0-only` and link to view, star, fork, clone, self-host, Issues, and Discussions.
- `/workbench` may invite contribution proposals, but must not promise pull-request merge before the contributor-rights workflow is completed.
- no page may promote a standardized managed-implementation package until Mind approves one.

The homepage Combined Adoption Chapter must preserve these differences rather than presenting one universal open-source or installation path.
