# Product Hierarchy Plan

Status: canonical planning document for ProChat homepage, product navigation, and landing page updates.

Last updated: 2026-05-24

## Source of truth

Mind leads this repo.

The leading strategy is ProChat OS-first:

```text
ProChat OS = flagship
Category = Agentic Workflow OS
Website = business-agnostic
Law firms = first direct outreach wedge
MikeOSS = law-firm demo/install block, not the main product
Legacy products = SaaSKit, ProKit, UXKit, WaaSKit
```

## Purpose

This document defines how ProChat should present ProChat OS, managed ProChat OS, workflow modules, and legacy/supporting products on the website.

Use it before changing:

- homepage copy
- homepage product cards
- navigation labels
- product comparison tables
- CTA order
- future landing page copy

## Current correction

Older documentation positioned BuildFlow, SaaSKit, and ProKit as the main product hierarchy and treated ProChat OS as phased out.

That is no longer current.

The corrected direction is:

- ProChat OS is the flagship.
- The homepage should be ProChat OS-first.
- BuildFlow is supporting/internal or adjacent tooling, not the main website strategy.
- SaaSKit and ProKit remain real legacy/supporting products.
- UXKit and WaaSKit remain legacy product ideas.
- MikeOSS is only a law-firm wedge and should not lead the public website.

## Public homepage hierarchy

Recommended homepage order:

1. Hero: ProChat OS as the Agentic Workflow OS.
2. Problem: businesses are stuck doing manual AI glue work.
3. Solution: ProChat OS sits between messy inputs and business tools.
4. How it works: inputs → workflow runtime → structured outputs/actions.
5. Technical trust: private runtime, memory, connectors, approvals, logs, model routing, console.
6. Managed path: ProChat can install, host, support, and configure workflows.
7. Free/commercial boundary: personal/non-commercial GitHub direction vs managed/commercial license.
8. Modular workflow examples: admin, documents, content, developer workflows, monitoring, local apps.
9. CTA: get a managed ProChat OS conversation / join early access / view GitHub when ready.

## Homepage hero copy direction

Primary direction:

```text
Agentic workflows between your messy inputs and your business tools.
```

Supporting copy:

```text
ProChat OS is an installable Agentic Workflow OS that turns emails, files, forms, notes, APIs, and folders into structured outputs, tasks, reports, drafts, updates, and actions.
```

Alternative shorter line:

```text
Turn messy business information into structured work — automatically, with human approval first.
```

## Product card model

If product cards are needed, the first card must be ProChat OS.

### ProChat OS

- Status: Flagship / productization in progress
- Category: Agentic Workflow OS
- Description: Private workflow runtime for turning messy inputs into structured outputs and actions.
- CTA: `Explore ProChat OS`

### Managed ProChat OS

- Status: First commercial direction
- Category: Managed installation and support
- Description: ProChat installs, configures, hosts or supports ProChat OS and one workflow to start.
- CTA: `Request managed setup`

### Workflow modules

- Status: Modular expansion
- Category: ProChat OS blocks
- Description: Add document, admin, content, developer, monitoring, or business-ops workflows over time.
- CTA: `See workflows`

### Legacy products

- Status: Legacy/supporting
- Category: Kits and historical products
- Description: SaaSKit, ProKit, UXKit, and WaaSKit remain real products or concepts but are no longer the flagship direction.
- CTA: `View legacy products` only if needed

## Legacy product handling

### SaaSKit and ProKit

Do not delete them.

Treat them as legacy/supporting products that may later become examples, modules, or implementation blocks in the ProChat OS ecosystem.

They should not drive the homepage hero or primary CTA.

### UXKit and WaaSKit

Treat as legacy concepts/products.

Do not make them active roadmap priorities on the main website.

### BuildFlow

BuildFlow should not lead the public ProChat website in the current strategy.

It may remain as:

- supporting/internal tooling
- adjacent product reference if needed
- inspiration for ProChat OS CLI/support/runtime patterns

But it should not be presented as the current main ProChat product hierarchy.

### MikeOSS

Do not include MikeOSS as a main public product card on the business-agnostic homepage.

Use it in law-firm outreach and demo-specific pages/assets only.

## Navigation guidance

Preferred future nav items:

- ProChat OS
- Workflows
- Managed
- Learn
- Docs
- Contact

Alternative if keeping legacy product access visible:

- ProChat OS
- Managed
- Learn
- Docs
- Legacy Products
- Contact

Avoid nav that makes BuildFlow, SaaSKit, or ProKit look like the flagship.

## CTA rules

Correct CTAs:

- `Explore ProChat OS`
- `Request managed setup`
- `See how it works`
- `Join early access`
- `View GitHub` once public repo exists
- `Book a workflow call`

Avoid CTAs:

- `Explore BuildFlow` as primary homepage CTA
- `Start with SaaSKit` as primary homepage CTA
- `Try MikeOSS` on the main ProChat homepage
- `Automate legal work` on the main ProChat homepage
- `Fully autonomous AI` without approval/safety context

## Website copy rules

Use:

- Agentic Workflow OS
- private workflow runtime
- messy inputs to structured outputs
- business tools integration
- 24/7 agentic employee
- human approval first
- managed ProChat OS
- modular workflow blocks

Avoid leading with:

- generic AI chatbot
- legal AI platform
- open source if commercial use is restricted
- SaaS builder kit
- dashboard as the product
- lawyer/accountant-only positioning

## Comparison model

If a comparison table is needed, compare by job-to-be-done:

| Product / path | Type | Status | Best for |
| --- | --- | --- | --- |
| ProChat OS | Agentic Workflow OS | Flagship / productization | businesses and builders that want workflows connected to real tools |
| Managed ProChat OS | Managed install/support | First commercial path | customers who want ProChat to install and maintain workflows |
| Workflow modules | Modular blocks | Roadmap / early pilots | starting with one concrete workflow outcome |
| SaaSKit / ProKit | Legacy/supporting kits | Existing products | SaaS builders who still need foundations |
| MikeOSS legal demo | Niche wedge | Law-firm outreach | showing law firms a concrete document AI workspace |

## Implementation stages

### Stage A — Documentation alignment

- Update strategy, product operating map, roadmap, implementation plan, and hierarchy plan.
- Update README and overview references.

### Stage B — Landing page copy

- Create `docs/prochat-os-landing-page-copy.md`.
- Do not edit production components until the copy direction is approved.

### Stage C — Homepage/page implementation

- Update actual website components after copy approval.
- Preserve existing routes unless a cleanup task explicitly removes them.

### Stage D — Demo/outreach assets

- Create law-firm Loom script.
- Create outreach sequence.
- Deploy MikeOSS Dokploy demo.

## Acceptance criteria

- ProChat OS is the primary public product.
- Website remains business-agnostic.
- Law-firm wedge is not confused with the public brand.
- MikeOSS is not presented as ProChat-owned or flagship.
- Legacy products remain preserved but secondary.
- Future implementation can proceed from a clear ProChat OS-first hierarchy.
