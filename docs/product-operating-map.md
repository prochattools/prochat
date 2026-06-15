# Product Operating Map

**Status:** current product and positioning map  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-15

## Source of truth

The `mind` repository is canonical.

```text
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/brand-ruleset.md
```

## Product hierarchy

```text
ProChat
│
├── ProChat Memory
│   └── shared reusable knowledge foundation
│
├── ProChat Answers
│   └── reliable, sourced answers from approved knowledge
│
├── ProChat Automations
│   └── repeated work prepared for human review
│
├── ProChat Workbench
│   └── safe local project work for ChatGPT
│       powered by the BuildFlow engine
│
├── ProChat for [Role or Industry]
│   └── packaged solutions for one audience
│
├── ProChat API
└── ProChat MCP
```

`ProChat OS` is no longer the public flagship name.

## Core philosophy

```text
Memory is the product foundation.
Workflows are the method.
AI is the assistant.
```

The durable asset is reusable knowledge that improves answers and repeated work over time.

## Product architecture

### ProChat Memory

```text
ProChat Memory
├── personal memory
├── project memory
├── client memory
├── team memory
├── department memory
├── company memory
├── cross-project memory
└── niche memory
```

Memory stores approved examples, rules, decisions, procedures, context, corrections, feedback, and source references.

### ProChat Answers

```text
question
→ retrieve approved memory and sources
→ prepare grounded answer
→ show sources
→ collect correction or approval
→ improve memory
```

### ProChat Automations

```text
messy input
→ retrieve relevant memory
→ run an automation
→ prepare review-ready output
→ capture feedback
→ improve memory or automation
```

Examples:

- Follow-up Automation
- Proposal Automation
- Support Reply Automation
- Reporting Automation
- Intake Automation
- Content Automation

### ProChat Workbench

```text
request
→ exact local context
→ guarded change or answer
→ targeted validation
→ explicit commit when approved
```

Public product name:

```text
ProChat Workbench
```

Technical engine and temporary internal identifier:

```text
BuildFlow
```

Preserve BuildFlow repository names, packages, scripts, source IDs, action names, and API contracts until a separate compatibility-safe migration is approved.

## Product surfaces

| Surface | Purpose | Buyer value |
| --- | --- | --- |
| ProChat website | Explain the suite and route buyers | Understand the right product, outcome, and next step |
| ProChat Memory | Preserve reusable business knowledge | Stop re-explaining context and losing useful knowledge |
| ProChat Answers | Answer questions from approved sources | Get reliable answers with visible supporting sources |
| ProChat Automations | Prepare repeated business work | Get drafts, summaries, reports, replies, and next steps faster |
| ProChat Workbench | Connect ChatGPT to real local projects | Use exact context with guarded changes and targeted checks |
| ProChat for [Audience] | Package products for one role or industry | Buy a focused solution without rebuilding the foundation |
| Review and feedback | Keep people in control and improve results | Correct important output and make later runs better |
| Portable starter package | Run a small local or customer-owned setup | Demo or deploy without a large infrastructure project |
| Managed deployment | Let ProChat configure and operate business products | Use the outcome without managing infrastructure |
| ProChat API | Programmatic access to capabilities | Connect ProChat to existing systems |
| ProChat MCP | Access through compatible AI clients | Reuse approved memory and product actions in supported tools |

## Solution architecture

Use:

```text
ProChat for [Role or Industry]
```

Examples:

- ProChat for Founders
- ProChat for Sales
- ProChat for Support
- ProChat for Marketing
- ProChat for Operations
- ProChat for Legal
- ProChat for Accounting

Each solution can combine:

```text
relevant ProChat Memory
+ ProChat Answers
+ ProChat Automations
+ review rules
+ delivery configuration
```

Solutions are packaging layers, not separate technical foundations.

## Delivery modes

### Answers pilot

```text
approved source set
+ real questions
+ grounded answers
+ visible sources
+ correction and feedback
```

### Automation pilot

```text
sample memory
+ one repeated task
+ sample input
+ review-ready output
+ human review
```

### Portable starter package

```text
config/
memory/
automations/
inbox/
outputs/
review/
examples/
README.md
```

Use for demonstrations, customer-owned deployments, and local proof.

### Managed deployment

ProChat configures and operates ProChat Memory, Answers, and Automations. Customers use simple entry points such as email, forms, uploads, shared folders, API calls, or supported MCP clients.

### Local builder deployment

ProChat Workbench remains local-first and self-hosted. The user’s computer and repositories remain the source of truth.

## Role-based wedges

Best first wedges:

1. Founder or owner
2. Sales
3. Support
4. Marketing and content
5. Operations and reporting

## Interfaces

### ProChat API

Core operations may include:

- submit a question
- select a memory scope
- retrieve a grounded answer and sources
- submit work for an automation
- retrieve output
- approve or reject
- submit feedback
- update or promote memory

### ProChat MCP

Core tools may include:

- `search_memory`
- `read_memory`
- `ask_answers`
- `submit_work`
- `run_automation`
- `review_output`
- `add_feedback`
- `promote_memory`
- `list_products`

API and MCP are integration surfaces, not primary buyer-facing products.

## Naming rules

Products:

```text
ProChat + clear noun
```

Approved:

- ProChat Memory
- ProChat Answers
- ProChat Automations
- ProChat Workbench

Solutions:

```text
ProChat for [Audience]
```

Automations:

```text
[Outcome] Automation
```

Technical access:

- ProChat API
- ProChat MCP

Retire from primary public naming:

- ProChat OS
- ProChat Workflows
- MemOS
- MemQA
- ProChat QA
- Ask ProChat

## One-line suite logic

```text
Memory remembers.
Answers explains.
Automations prepares.
Workbench changes.
Solutions package.
API and MCP connect.
```
