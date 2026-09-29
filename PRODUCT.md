# ProChat Product Context

**Status:** repository-local implementation context
**Canonical product strategy:** Mind, `mind/organizations/prochat/brand/`
**Applies to:** ProChat website design, implementation, review, and polish

This file summarizes canonical product facts for website implementation. It must not replace Mind or invent product hierarchy, pricing, maturity, or claims.

## Current product system

```text
ProChat → Infinite Brain → Evermind ↔ Nevermind
                         Mind       Brain

Mastermind — separate free, open-source planning/orchestration product
```

- **Evermind** is free, open-source, durable, human-owned memory. It is local-first, readable, portable, inspectable, editable, provenance-aware, reviewed, and useful without Nevermind.
- **Nevermind** is the paid capability and convenience layer around that memory: installation, configuration, retrieval, integrations, automation, validation, updates, and optional managed operations.
- **Mastermind** is a separate free, open-source ChatGPT-native planner/orchestrator for bounded Codex execution. It replaces Workbench as the current public name.
- **ProChat Memory for QA** is paused/on ice and historical. Keep its documentation and code as evidence, but do not present it as a current public product.
- Mind and Brain remain distinct; do not introduce MindOS as another customer-facing brand.

## Public website contract

Canonical routes are `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`. The first four routes use one shared, scroll-driven cinematic template with one full-width navigation, two narrative sections, an intentional 80vh transition spacer, Golos Text display headings, and no footer. The utility routes `/docs`, `/contact`, `/privacy`, and `/terms` use the quieter static cinematic utility shell with one navigation, readable content, and no footer; legal-page meaning remains unchanged.

The homepage lead is: “A human-owned system for AI work — from memory to context to controlled execution.” The product-sequence line is: “Evermind remembers. Nevermind brings context. Mastermind directs the work.” Preserve the distinct product roles and use accurate route-specific calls to action. Current implementation and release evidence live in `docs/implementation-plan.md`, `docs/roadmap.md`, and `docs/repo-status.md`; older design/strategy briefs are historical unless those active documents explicitly adopt them.

## Copy and claim boundaries

- Do not claim zero hallucinations, guaranteed savings, universal compatibility, automatic trusted memory, or a hosted customer-memory platform without canonical evidence.
- Do not imply future capabilities, APIs, MCP integrations, automation, or managed services are currently available unless verified in both Mind and implementation.
- Do not present paused ProChat Memory for QA, Workbench, or BuildFlow as a current public product. BuildFlow may remain only as a technical/internal compatibility identifier where required.
- Do not invent pricing, legal terms, encryption, support commitments, maturity, or customer-data handling claims.

## Design and implementation authority

The active cinematic design system for the first four routes is implemented by `CinematicMarketingShell`, `CinematicMarketingPage`, `CinematicProductFunnel`, `CinematicMediaPage`, and `ScrollVideoBackground`. Keep route data distinct from shared page geometry. Product pages use scroll-driven media. Reduced-motion users must retain readable content and see one stable media layer. Treat other routes as regression-only scope in this release.

Consult current implementation documentation in `docs/overview.md`, `docs/strategy.md`, `docs/roadmap.md`, and `docs/implementation-plan.md`. `docs/product/PUBLIC_PAGE_ARCHITECTURE.md` and `docs/homepage-*` plans predate the current product/routes and must be treated as historical until explicitly reconciled.
