# ProChat Repo Status

Status: current repository alignment note.  
Last updated: 2026-07-07

## Canonical authority

The `mind` repository is canonical for ProChat company philosophy, product hierarchy, naming, positioning, business stage, legal-policy direction, growth policy, and cross-product roadmap.

Start with:

```text
mind/wiki/organisations/prochat/brand/README.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/brand/canonical-homepage-copy.md
mind/wiki/organisations/prochat/brand/global-design-foundation.md
mind/wiki/organisations/prochat/brand/website-visual-motion-system.md
mind/wiki/organisations/prochat/brand/website-build-contract.md
```

This repository is subordinate to Mind. It controls verified website implementation facts only: routes, components, content rendering, analytics hooks, deployment behavior, environment contracts, and docs automation.

When this repository conflicts with Mind, Mind wins and this repository must be corrected.

## Current product hierarchy

```text
ProChat
├── ProChat Memory
│   └── ProChat Memory for QA
└── ProChat Workbench
```

ProChat currently has exactly two products:

- **ProChat Memory** — flagship product.
- **ProChat Workbench** — second product.

**ProChat Memory for QA** is the first launch niche and first discipline-specific edition of ProChat Memory.

## Website status

The public website should lead with the Memory-first ProChat strategy:

- ProChat Memory as the flagship;
- ProChat Memory for QA as the first launch niche and first discipline-specific edition;
- ProChat Workbench as the second product, introduced separately and only where relevant.

Current primary public routes:

- `/` — Memory-led ProChat homepage;
- `/prochat-memory` — ProChat Memory page;
- `/qa-memory` — ProChat Memory for QA page;
- `/contact` — contact and tester-interest route.

## Legacy and historical references

The following names may appear only when clearly framed as historical, archived, legacy, internal, technical, or future/capability context:

- ProChat OS;
- SaaSKit, ProKit, UXKit, WaaSKit;
- MikeOSS;
- BuildFlow;
- ProChat Answers;
- ProChat Automations;
- ProChat API;
- ProChat MCP.

They must not be presented as current public products, current flagship strategy, product navigation, homepage positioning, or primary calls to action.

BuildFlow may remain as an internal/technical compatibility identifier for ProChat Workbench when required by implementation details.

## Public conversion and cleanup status

Public menus, footer links, homepage sections, and primary CTAs should align with the current Mind-defined product hierarchy.

Older direct-access or archived routes may remain temporarily for compatibility, redirects, historical review, or future cleanup. They should not be promoted as current company strategy unless Mind explicitly changes the product boundary.

## Authentication status

See [auth-status.md](./auth-status.md).

## Rule

Do not use this file to redefine ProChat strategy. Use it only to record the current website repository status under Mind's canonical strategy.
