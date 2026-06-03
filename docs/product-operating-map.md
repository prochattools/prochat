# Product Operating Map

Status: canonical product and positioning map for ProChat documentation and website planning.

Last updated: 2026-05-24

## Source of truth

The business strategy in the `mind` repo leads this ProChat repo.

Current leading strategy:

```text
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-technical-definition.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

## Purpose

This document defines the current ProChat product ecosystem, live versus roadmap state, and boundaries between ProChat OS, supporting products, legacy products, and niche wedges.

Use this document before changing homepage copy, product pages, kit comparison tables, docs navigation, roadmap pages, or agent task briefs.

## Current strategic decisions

- ProChat OS is the flagship product.
- ProChat OS is an Agentic Workflow OS.
- The public website is business-agnostic and should not be law-firm-only.
- Law firms are the first direct outreach wedge.
- Accountants are the second local comparison niche.
- Creators, SaaS builders, influencers, and personal developers are organic-content audiences.
- MikeOSS is a law-firm wedge, not ProChat OS and not the main product.
- SaaSKit, ProKit, UXKit, and WaaSKit are legacy/supporting products, not the flagship direction.
- BuildFlow is supporting/internal tooling and may inform ProChat OS implementation, but it is not the current public flagship.
- ProChat runtime auth direction is Ory.
- See `docs/auth-status.md` for the canonical runtime auth state.
- Clerk may remain part of sold boilerplate products where that is true for the client-facing codebase, but only with a legacy-only warning.

## Product ecosystem

| Product | Category | Status | Primary audience | Role |
| --- | --- | --- | --- | --- |
| ProChat OS | Managed AI workflow system | Flagship strategy / productization in progress | businesses, solo builders, workflow-driven operators, creators, SaaS builders | Turns messy business information into ready-to-review summaries, checklists, reports, tasks, status updates, and draft replies. |
| Managed ProChat OS | Managed productized service | First commercial direction | local businesses, law firms first, later other niches | ProChat sets up, runs, and supports workflow systems that customers can use through email, forms, file drops, or API calls. |
| ProChat website/platform | Business, content, commerce, docs platform | Live | buyers, operators, readers | Business-agnostic marketing, education, conversion, docs, and future ProChat OS product surface. |
| ProChat OS modules | Niche workflow packages | Productization roadmap | specific niches and workflow families | Package skills, workflows, schedules, examples, approval checkpoints, and evaluation criteria around one recognizable business problem. |
| MikeOSS legal demo | Legal document AI workspace wedge | First law-firm demo / install block | law firms | Tangible legal AI workspace used to start law-firm conversations and upsell ProChat OS workflows. |
| BuildFlow | AI workflow/context tooling | Supporting/internal or adjacent product | AI-native builders and internal operators | Useful tooling/patterns for repo context and safe operations; not the current ProChat flagship. |
| SaaSKit | SaaS application foundation | Legacy/supporting product | SaaS builders/founders | Real product, but no longer strategic center; may later become a ProChat OS-compatible module/example. |
| ProKit | Lean SaaS engine | Legacy/supporting product | technical builders | Real product, but no longer strategic center; may later become a ProChat OS-compatible module/example. |
| UXKit | Legacy product/concept | Legacy | builders needing UI/UX help | Preserve useful ideas for future agentic modules. |
| WaaSKit | Legacy product/concept | Legacy | service-led founders | Preserve useful ideas for future agentic modules. |

## ProChat OS boundary

ProChat OS is buyer-facing as a managed AI workflow system:

```text
messy information → ready-to-review output → human approval → repeatable workflow
```

Internally, ProChat OS can still be described as a workflow runtime with skills, workflows, schedules, modules, approvals, logs, connectors, and support tooling.

Public website and sales language should focus on outcomes:

- less admin work
- faster follow-up
- fewer missed details
- clearer handoffs
- ready-to-review outputs
- human approval first

ProChat OS should be positioned as:

```text
Messy business information in. Useful work out.
```

ProChat OS should not be positioned as:

- a chatbot
- a dashboard only
- MikeOSS
- a legal AI platform only
- a SaaS kit
- a BuildFlow rebrand
- the model router alone
- the memory store alone

## MikeOSS boundary

MikeOSS is a law-firm wedge and implementation block.

```text
MikeOSS = legal document AI workspace
ProChat OS = Agentic Workflow OS around and beyond it
```

Use MikeOSS to make law-firm outreach tangible:

- private legal document workspace
- document upload
- document chat
- cited answers
- review workflows

Then sell ProChat OS as the broader managed workflow layer:

- intake workflows
- admin/document agents
- follow-up workflows
- reporting
- approvals
- hosting/support
- integrations

MikeOSS must not define the main ProChat website.

## Live versus roadmap language

Use these status labels consistently:

- Flagship strategy: current company direction and primary positioning.
- Live: implemented and available as an active product/surface.
- Demo wedge: tactical demo or niche-specific wedge, not the whole strategy.
- Productization in progress: strategic product being shaped into installable software.
- Legacy/supporting: real product or useful asset, but no longer the main strategy.
- Roadmap: planned, not currently available.

## Public website product hierarchy

The website should present:

1. ProChat OS as the flagship.
2. Managed ProChat OS as the paid path.
3. Modular workflow blocks as examples of how ProChat OS expands.
4. Legacy/supporting products only as secondary or historical where needed.

The website should not present:

- BuildFlow as the main product.
- SaaSKit as the main product.
- ProKit as the main product.
- ProChat OS as phased out.
- MikeOSS as the main brand.
- Lawyers as the whole audience.

## Relationship between ProChat OS and legacy products

SaaSKit, ProKit, UXKit, and WaaSKit remain real historical/supporting products.

They are not deleted.

They can later be:

- marked as legacy
- preserved as reference
- upgraded into agentic ProChat OS modules
- used as examples/workflows inside ProChat OS

They should not drive the main homepage or flagship positioning.

## Auth boundary

ProChat runtime:

- Ory is the current active authentication platform for ProChat itself.
- ProChat auth docs should describe shared ProChat auth UI backed by Ory where relevant.
- Clerk should not appear as an active ProChat runtime requirement.

Sold boilerplate products:

- Clerk may remain documented as part of client-facing boilerplate products where the product code actually includes it, but the doc must warn that it is legacy boilerplate reference only and not active ProChat runtime auth.
- Product docs must clearly say that this is boilerplate/product behavior, not ProChat website/runtime behavior.

## Documentation rules

When updating docs or pages:

1. Start from the mind ProChat OS strategy.
2. Keep public brand and outreach wedges separate.
3. Keep ProChat OS as the flagship.
4. Do not make the main website law-firm-only.
5. Do not make MikeOSS look like ProChat-owned software.
6. Preserve legacy product information, but mark it as legacy/supporting.
7. Keep live products, demo wedges, and roadmap products visibly separated.
8. Keep ProChat runtime auth separate from boilerplate auth.
