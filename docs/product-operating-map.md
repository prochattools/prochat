# Product Operating Map

**Status:** current product and positioning map  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-14

## Source of truth

The `mind` repository is canonical.

```text
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-technical-definition.md
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
mind/wiki/organisations/prochat/brand/brand-ruleset.md
```

## Business and product hierarchy

```text
ProChat = the business
ProChat OS = working name of the flagship product
```

The flagship name is under review. Until that decision is made, `ProChat OS` remains the consistent working name.

## Core philosophy

```text
Memory is the product foundation.
Workflows are the method.
AI is the assistant.
```

The durable asset is reusable business knowledge that improves repeated work over time.

## Product architecture

```text
ProChat OS
├── Work Memory
│   ├── personal
│   ├── project
│   ├── client
│   ├── team
│   ├── department
│   ├── company
│   ├── cross-project
│   └── niche
├── Workflow Modules
│   ├── founder and owner
│   ├── sales
│   ├── support
│   ├── marketing and content
│   ├── operations and reporting
│   └── niche-specific workflows
└── Review Loop
    ├── approve or reject
    ├── capture edits
    ├── identify missing context
    ├── improve memory
    └── improve future outputs
```

## Core product pattern

```text
messy input + relevant memory → review-ready output → human feedback → better future work
```

## Product surfaces

| Surface | Purpose | Buyer value |
| --- | --- | --- |
| ProChat website | Explain the offer and convert buyers | Understand the pain, outcome, first offer, and next step |
| First time-saving test | Prove one useful repeated-work outcome | See whether ProChat saves real time before expanding |
| Work Memory | Store reusable examples, rules, context, style, and feedback | Stop re-explaining the same context and rewriting the same work |
| Workflow Modules | Turn repeated situations into outputs | Get drafts, summaries, reports, replies, and next steps faster |
| Review Loop | Improve output and memory through human feedback | Keep people in control and make later runs better |
| Portable starter package | Run a small local or customer-owned setup | Demo or deploy without a large infrastructure project |
| Managed deployment | ProChat hosts, configures, supports, and improves the system | Use the outcome without operating the infrastructure |
| API | Let software submit work and retrieve reviewed results | Connect ProChat to existing business systems |
| MCP server | Let compatible AI clients use approved memory and workflows | Reuse ProChat capabilities inside supported tools |
| Niche derivatives | Package memory and workflows for one role or sector | Buy a focused solution without rebuilding the foundation |

## Delivery modes

### Demo package

```text
ZIP or repository folder
+ safe sample memory
+ sample workflow
+ sample input
+ expected output
+ short manual
```

Use for demonstrations, Loom videos, discovery calls, and local proof.

### Local starter package

```text
config/
memory/
workflows/
inbox/
outputs/
review/
examples/
README.md
```

Use when the customer wants a portable local setup and the workflow does not require heavy integration.

### Managed deployment

ProChat sets up and operates the system. Customers use simple entry points such as email, forms, file drops, shared folders, API calls, or supported MCP clients.

This is the default commercial path when self-installation would create unnecessary support burden.

## Role-based wedges

Best first wedges:

1. Founder or owner
2. Sales
3. Support
4. Marketing and content
5. Operations and reporting

Each wedge combines relevant memory and repeated workflows.

Examples:

```text
founder memory + delegation workflow
sales memory + follow-up workflow
support memory + reply workflow
marketing memory + content workflow
operations memory + reporting workflow
```

## Niche derivatives

Niche derivatives are focused packages on the same foundation.

```text
niche memory + niche workflows + review rules + delivery configuration
```

Possible derivatives:

- legal
- accounting
- agencies
- consultants
- real estate
- customer support
- sales
- content operations

A niche derivative should not require a separate core product, memory model, or implementation philosophy.

## Supporting products and tools

Existing kits, internal tools, and experiments may remain useful, but they do not define the flagship product or public positioning.

They may contribute:

- code
- delivery patterns
- UI components
- infrastructure patterns
- workflow examples
- internal tooling

They should not create competing flagship narratives.

## Commercial sequence

```text
first time-saving test
→ done-for-you launch
→ managed improvement
→ team rollout
→ department or company memory
→ niche or cross-project expansion
```

## Public positioning

The website sells outcomes, not architecture.

Use:

- stop rewriting the same work
- stop re-explaining the same context
- prepare drafts faster
- keep useful knowledge reusable
- get review-ready output
- improve future work from feedback

Do not lead with:

- operating system
- Infinite Brain
- Work Memory
- knowledge graph
- modules
- API
- MCP
- runtime
- connectors
- installation

## Naming status

The final naming architecture must distinguish:

- ProChat as the business
- the flagship product
- the memory foundation
- workflow or capability packages
- niche derivatives

Names should communicate value, remain expandable, and avoid making related products appear disconnected.
