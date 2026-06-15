# ProChat Strategy

**Status:** current business and product strategy  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-15

## Source of truth

The `mind` repository is canonical.

Leading documents:

```text
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-modules.md
mind/wiki/organisations/prochat/brand/go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
mind/wiki/organisations/prochat/brand/brand-ruleset.md
```

This repository translates that philosophy into product documentation, implementation plans, and buyer-facing website copy.

## Company and product hierarchy

```text
COMPANY
ProChat

FOUNDATION
ProChat Memory

BUSINESS PRODUCTS
ProChat Answers
ProChat Automations

BUILDER PRODUCT
ProChat Workbench
Powered by the BuildFlow engine

SOLUTIONS
ProChat for [Role or Industry]

INTERFACES
ProChat API
ProChat MCP
```

`ProChat OS` is retired from primary public product naming.

BuildFlow remains the technical engine and temporary internal identifier behind ProChat Workbench where renaming would create compatibility risk.

## One-sentence strategy

ProChat turns reusable business knowledge into reliable answers, review-ready work, and safe local project action.

## Short definition

```text
Business knowledge, put to work.
```

## Core philosophy

The ProChat product suite is memory-first.

```text
Memory is the product foundation.
Workflows are the method.
AI is the assistant.
```

Every repeated work situation should leave useful memory behind. That memory should make later answers and outputs faster, clearer, and more accurate.

The durable value is not one model, prompt, automation, or interface. It is the knowledge that becomes reusable across people, projects, clients, teams, departments, industries, and tools.

## ProChat Memory

ProChat Memory is the shared foundation behind the business products.

It can include:

- approved examples
- preferred style and tone
- decisions and rules
- procedures and templates
- client and project context
- recurring formats
- corrections and reviewer feedback
- source references and indexes

Memory can be scoped to:

```text
personal
project
client
team
department
company
cross-project
niche
```

Memory should be portable, inspectable, editable, source-traceable, and safely promoted through review.

## ProChat Answers

ProChat Answers provides reliable, sourced answers from approved business knowledge.

```text
question
→ approved memory and sources
→ grounded answer
→ visible sources
→ correction or approval
→ improved memory
```

Examples:

- company policy answers
- support knowledge answers
- project and client-file answers
- sales offer and objection answers
- legal or accounting knowledge answers

## ProChat Automations

ProChat Automations turns repeated business work into useful output ready for review.

```text
messy input
→ relevant memory
→ automation
→ review-ready output
→ human feedback
→ better future work
```

Examples:

- Follow-up Automation
- Proposal Automation
- Support Reply Automation
- Reporting Automation
- Intake Automation
- Content Automation
- Delegation Automation

Internally, automations may use workflow modules. Publicly, use `Automations` because it communicates buyer value more clearly.

## ProChat Workbench

ProChat Workbench lets ChatGPT work safely with real local repositories, documentation, notes, and projects.

```text
ChatGPT does the reasoning.
The local computer remains the source of truth.
ProChat Workbench provides bounded context, guarded changes, validation, and Git operations.
```

Relationship to BuildFlow:

```text
Public product: ProChat Workbench
Technical engine: BuildFlow
```

Preserve technical identifiers such as repository names, package scopes, scripts, action names, source IDs, and API contracts until a separate compatibility-safe migration is approved.

## Solutions

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

A solution packages relevant memory, answers, automations, review rules, and delivery configuration for one audience.

## Product patterns

Answers:

```text
question + approved memory → grounded answer with sources
```

Automations:

```text
messy input + reusable memory → review-ready work
```

Workbench:

```text
ChatGPT reasoning + exact local context + guarded operations
```

## Design principles

The product suite must be:

- memory-first
- review-first
- modular
- portable
- inspectable
- editable
- model-agnostic
- tool-agnostic
- environment-agnostic
- source-traceable
- safe to promote from raw input into trusted memory
- able to improve through use

## What we sell first

The first sale is not a broad platform rollout.

```text
We prove one reliable answer set, one repeated-work automation, or one safe local project workflow.
```

Practical starting offers:

- ProChat Answers pilot
- ProChat Automations pilot
- done-for-you launch
- managed improvement
- team rollout
- department or company rollout
- ProChat Workbench installation or adoption support

## Best first business wedges

Start with roles before industries:

1. Founder or owner
2. Sales
3. Support
4. Marketing and content
5. Operations and reporting

Industry and role solutions sit on top of the same memory-first foundation.

## Delivery model

Default business delivery is managed by ProChat.

Customers can use simple entry points such as:

- email
- forms
- file uploads
- shared folders
- API calls
- supported MCP clients

ProChat Workbench remains local-first and self-hosted for builders.

## Interfaces

### ProChat API

Programmatic access to approved memory, answers, automations, review, feedback, and results.

### ProChat MCP

MCP-compatible access for supported AI clients and developer tools.

API and MCP are technical interfaces, not primary buyer-facing products.

## Public marketing rule

Lead with buyer pain and outcome.

Use:

- reliable answers from approved knowledge
- visible sources
- less rewriting and re-explaining
- faster drafts and clearer handoffs
- useful knowledge that stays reusable
- safe local project work with ChatGPT

Do not lead with:

- ProChat OS
- Work Memory
- workflow modules
- knowledge graphs
- runtimes
- agents
- model routing
- API or MCP architecture

## Naming rules

Use:

```text
ProChat Memory
ProChat Answers
ProChat Automations
ProChat Workbench
ProChat for [Role or Industry]
ProChat API
ProChat MCP
```

Retire from primary public naming:

```text
ProChat OS
ProChat Workflows
MemOS
MemQA
ProChat QA
Ask ProChat
```
