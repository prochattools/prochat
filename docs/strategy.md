# ProChat website strategy bridge

**Status:** repository-local website guidance  
**Owner:** Steve Westhoek  
**Scope:** translating Mind's canonical ProChat strategy into website structure and marketing implementation

## Source of truth

Mind is canonical for ProChat philosophy, product hierarchy, naming, positioning, business stage, growth policy, legal-policy direction, and cross-product roadmap.

Canonical references:

```text
mind/organizations/prochat/brand/README.md
mind/organizations/prochat/brand/product-strategy.md
mind/organizations/prochat/brand/product-naming-architecture.md
mind/organizations/prochat/brand/product-roadmap.md
mind/organizations/prochat/brand/canonical-homepage-copy.md
mind/organizations/prochat/brand/global-design-foundation.md
mind/organizations/prochat/brand/website-visual-motion-system.md
mind/organizations/prochat/brand/website-build-contract.md
```

This document is not a second ProChat strategy source. It only explains how this website repository should apply Mind's strategy in local pages, navigation, metadata, and conversion flows.

## Current product boundary for the website

Mind's current public-product system is:

```text
Infinite Brain: Evermind ↔ Nevermind
Mastermind (separate ProChat product)
```

ProChat Memory for QA is paused/historical, not a current public product. The current product routes are:

```text
/evermind · /nevermind · /mastermind
```

Website priorities:

1. Explain Evermind as human-owned memory and Nevermind as the paid capability/convenience layer around it.
2. Present Mastermind as a separate planning/orchestration product.
3. Keep future capabilities and interfaces clearly labeled as non-products.
4. Archive or de-emphasize older directions instead of deleting historical material.

## What this repository may decide

This repository may decide website implementation details, including:

- route structure;
- page sequencing;
- component layout;
- navigation and footer implementation;
- metadata and sitemap implementation;
- contact, waitlist, and conversion flows;
- public docs and learn surface implementation;
- archive location for obsolete website docs or pages.

## What this repository must not decide

This repository must not redefine:

- ProChat philosophy;
- product count;
- product hierarchy;
- naming architecture;
- business stage;
- legal-policy direction;
- growth policy;
- cross-product roadmap.

Those decisions live in Mind.

## Website translation rules

Use Mind for the canonical product story, then translate it into website surfaces as follows:

- homepage: explain Evermind, Nevermind, and Mastermind as a connected product family without duplicating Mind's full strategy;
- `/evermind`: explain free, open-source, human-owned memory;
- `/nevermind`: explain paid capability and convenience around human-owned memory;
- `/mastermind`: explain the separate planning/orchestration product;
- contact/waitlist: route users toward the relevant product or selected beta interest;
- docs/learn: support understanding and adoption without inventing new product categories.

## Capability and legacy boundaries

ProChat Answers and ProChat Automations may be described only as capabilities, use cases, or future directions under the current product boundary. They are not current products.

API access and MCP integrations may be described only as future interfaces or integration methods where Mind permits. They are not current products.

ProChat OS, SaaSKit, ProKit, UXKit, WaaSKit, and MikeOSS are legacy, historical, external, or archived references where relevant. They are not current ProChat products.

BuildFlow may remain only as a technical/internal compatibility identifier where required.

## Copy safety rules

Website copy must not claim:

- unlimited model usage;
- zero hallucinations;
- guaranteed savings;
- automatic trust without human review;
- autonomous memory promotion without approval;
- commercial or legal rights not recorded in Mind/legal docs;
- that future capabilities are current products.

## Rule

Keep this repo lean: link to Mind for strategy and document only the website implementation choices needed to publish accurate ProChat pages.
