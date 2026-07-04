# ProChat website overview

**Status:** repository-local website implementation overview  
**Owner:** Steve Westhoek  
**Scope:** ProChat website, marketing pages, public docs/learn surfaces, conversion flows, SEO metadata, and website implementation

## Authority

Mind is canonical for ProChat philosophy, product hierarchy, naming, positioning, business stage, growth policy, legal-policy direction, and cross-product roadmap.

Read Mind before changing public product positioning or strategy language:

```text
mind/wiki/organisations/prochat/README.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/growth/README.md
mind/wiki/organisations/prochat/legal/README.md
```

This repository is subordinate to Mind. It describes website implementation and must not independently redefine ProChat strategy.

## Current product boundary

Mind currently defines exactly two ProChat products:

```text
ProChat Memory
ProChat Workbench
```

Current edition and launch focus:

```text
ProChat Memory for QA
```

Repository-local rules:

- ProChat Memory is the flagship product.
- ProChat Memory for QA is the first launch niche and first discipline-specific edition.
- ProChat Workbench is the second product.
- ProChat Answers, ProChat Automations, API access, and MCP integrations are capabilities or future interfaces, not current products.
- ProChat OS, SaaSKit, ProKit, UXKit, WaaSKit, and MikeOSS are legacy, historical, external, or archive-only references where relevant.
- BuildFlow is a technical/internal compatibility identifier for Workbench where required, not a current ProChat product.

## Repository purpose

The ProChat repository implements the public website and related conversion surfaces.

It owns:

- homepage and product landing pages;
- ProChat Memory marketing pages;
- ProChat Memory for QA niche page;
- ProChat Workbench marketing page;
- contact, waitlist, and conversion routes;
- public docs and learn surfaces;
- SEO metadata, Open Graph, robots, and sitemap behavior;
- website runtime and deployment mechanics.

It does not own:

- ProChat company philosophy;
- product count or hierarchy;
- product naming architecture;
- legal-policy direction;
- growth policy;
- cross-product roadmap.

## System domains

### 1. Website runtime

The app/runtime side serves website pages, product routes, contact/waitlist flows, API routes, auth-adjacent surfaces, billing-adjacent surfaces where still present, and operational integrations.

Implementation references:

```text
docs/deployment.md
docs/production-lifecycle.md
docs/database.md
docs/development.md
docs/integrations.md
docs/auth-status.md
```

### 2. Content and SEO platform

The content/SEO side owns public learn/docs surfaces, metadata, Open Graph output, and sitemap behavior.

Implementation references:

```text
docs/content-platform.md
docs/open-graph-system.md
docs/design-system.md
docs/mailerlite-funnel.md
```

### 3. Documentation automation

The documentation automation system may ingest, normalize, generate, and publish docs into the website surface.

Implementation references:

```text
docs/docs-automation.md
scripts/docs/README.md
```

## Active documentation rule

Active docs in this repository should be lean. They should explain how the website implements Mind's strategy, not duplicate the strategy itself.

Older ProChat OS, kit, BuildFlow, MikeOSS, law-firm, or module documents should be archived in a later cleanup batch when they are no longer active website guidance.

## Current local docs

Use:

```text
docs/strategy.md
docs/roadmap.md
docs/implementation-plan.md
```

as repository-local website implementation guides only.

Use Mind for product strategy and product roadmap decisions.
