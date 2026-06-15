# ProChat Website Copy Blueprint

**Status:** current buyer-facing copy blueprint  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-15

## Source of truth

Mind remains canonical for strategy, naming, and brand rules.

```text
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/brand-ruleset.md
mind/wiki/organisations/prochat/brand/go-to-market.md
```

This document translates that strategy into buyer-facing website language.

## Product hierarchy

```text
ProChat
├── ProChat Memory
├── ProChat Answers
├── ProChat Automations
├── ProChat Workbench
│   └── powered by the BuildFlow engine
├── ProChat for [Role or Industry]
├── ProChat API
└── ProChat MCP
```

`ProChat OS` is retired from primary public naming.

## Translation rule

Internal philosophy:

```text
Memory is the product foundation.
Workflows are the method.
AI is the assistant.
```

Public translation:

```text
Reliable answers and repeated work prepared from the knowledge your business trusts.
```

Do not explain architecture before the visitor understands the pain and outcome.

## Main company promise

```text
Put your business knowledge to work.
```

Supporting message:

```text
ProChat turns approved knowledge, examples, and recurring information into reliable answers and useful work your team can review and use.
```

## Website information architecture

### Main navigation

```text
Products
Solutions
For Builders
About
Book a Call
```

### Products

```text
ProChat Answers
ProChat Automations
ProChat Memory
```

### For Builders

```text
ProChat Workbench
Powered by BuildFlow
```

### Solutions

```text
ProChat for Founders
ProChat for Sales
ProChat for Support
ProChat for Marketing
ProChat for Operations
ProChat for Legal
ProChat for Accounting
```

## Homepage structure

### 1. Hero

Headline:

```text
Put your business knowledge to work.
```

Support:

```text
Get reliable answers from approved knowledge and turn repeated work into drafts, reports, replies, tasks, and next steps your team can review and use.
```

Primary CTA:

```text
Show us one repeated problem
```

Secondary CTA:

```text
Explore the products
```

### 2. Two primary business outcomes

#### Reliable answers

```text
Stop searching across scattered documents and asking the same people the same questions. ProChat Answers returns grounded answers with visible sources from approved business knowledge.
```

CTA:

```text
Explore ProChat Answers
```

#### Repeated work prepared faster

```text
Turn recurring notes, emails, documents, examples, and updates into useful work ready for human review with ProChat Automations.
```

CTA:

```text
Explore ProChat Automations
```

### 3. Shared foundation

Headline:

```text
Powered by knowledge your business can inspect and improve.
```

Copy:

```text
ProChat Memory keeps approved examples, decisions, procedures, style, context, corrections, and source references reusable across answers and automations.
```

Do not present ProChat Memory as abstract architecture before showing the products it powers.

### 4. Before and after

Before:

- searching through scattered files
- asking the same internal questions repeatedly
- explaining context again
- pasting examples into prompts
- rewriting AI output
- creating reports and follow-ups from scratch
- losing useful knowledge when people leave

After:

- grounded answers with visible sources
- reply and proposal drafts
- clear summaries and task lists
- faster reports
- consistent support responses
- reusable knowledge
- review and feedback that improve later results

### 5. Role and industry solutions

Use:

```text
ProChat for [Role or Industry]
```

Explain that each solution packages relevant memory, answers, automations, review rules, and delivery configuration.

Examples:

Founder or owner:

```text
Keep company knowledge reusable and turn notes, decisions, and examples into answers, delegation notes, proposals, and task instructions.
```

Sales:

```text
Answer questions about offers and objections, then prepare follow-ups, proposals, call summaries, and next steps.
```

Support:

```text
Use approved product knowledge for consistent answers, reply drafts, issue summaries, and escalation notes.
```

Marketing:

```text
Reuse approved voice and examples to prepare briefs, outlines, emails, and content drafts.
```

Operations:

```text
Turn procedures, notes, and recurring updates into answers, reports, task lists, and handoffs.
```

### 6. First offer

Name:

```text
First useful proof
```

Description:

```text
Choose one recurring question set or one repeated task. Share approved source material and examples. We prepare a working proof so you can judge the quality before expanding.
```

Possible proof types:

- ProChat Answers pilot
- ProChat Automations pilot
- ProChat Workbench local setup

### 7. Human review

Headline:

```text
Your team stays in control.
```

Copy:

```text
Important answers, outputs, and memory updates remain reviewable. Corrections can improve the next result without turning stored memory into unquestioned authority.
```

### 8. Builder section

Eyebrow:

```text
For developers and AI-native builders
```

Headline:

```text
Let ChatGPT work safely with your real local projects.
```

Copy:

```text
ProChat Workbench connects ChatGPT to local repositories, documentation, notes, and knowledge folders. It provides exact context, guarded changes, targeted validation, and explicit Git operations without presenting itself as an autonomous agent.
```

Trust line:

```text
Local-first · Self-hosted · Guarded writes · Explicit commits
```

CTAs:

```text
Explore ProChat Workbench
View BuildFlow on GitHub
```

Relationship label:

```text
ProChat Workbench is powered by the BuildFlow engine.
```

## ProChat Answers page

### Hero

Headline:

```text
Reliable answers from the knowledge your business trusts.
```

Support:

```text
Ask real questions against approved documents and reusable company knowledge. Get grounded answers with visible sources and a clear path for correction.
```

Primary CTA:

```text
Test your knowledge set
```

### Core flow

```text
question → approved knowledge → grounded answer → sources → feedback
```

### Buyer pain

- knowledge is scattered
- answers depend on who is available
- employees search through the same documents repeatedly
- generic AI answers cannot be trusted
- source material is difficult to verify
- corrections are not reused

### Buyer outcome

- grounded answers
- visible source references
- approved knowledge scopes
- consistent internal guidance
- correction and feedback
- reusable improvements

### Naming rule

Use `Q&A` only as a descriptive phrase. Do not call the product `ProChat QA`, because software audiences commonly read QA as quality assurance.

## ProChat Automations page

### Hero

Headline:

```text
Stop rebuilding the same work.
```

Support:

```text
ProChat Automations turns recurring notes, emails, documents, examples, and updates into useful output ready for review.
```

Primary CTA:

```text
Show us one repeated task
```

### Core flow

```text
messy input → relevant memory → automation → review-ready output → feedback
```

### Examples

- Follow-up Automation
- Proposal Automation
- Support Reply Automation
- Reporting Automation
- Intake Automation
- Content Automation
- Delegation Automation

### Buyer outcome

- faster drafts
- less rewriting
- clearer handoffs
- more consistent output
- reusable knowledge
- human review
- later runs that improve from feedback

## ProChat Memory page

### Position

ProChat Memory is the foundation behind Answers and Automations, not a vague standalone AI brain.

Headline:

```text
Keep useful business knowledge reusable.
```

Support:

```text
Organize approved examples, decisions, procedures, style, context, corrections, and source references so they can improve future answers and work.
```

Explain memory scopes, ownership, traceability, review, export, editing, and promotion only after the core benefit is clear.

## ProChat Workbench page

### Hero

Eyebrow:

```text
For developers and builders
```

Headline:

```text
Stop pasting your project into ChatGPT.
```

Support:

```text
ProChat Workbench lets ChatGPT inspect exact local context, apply guarded changes, run approved checks, and commit only explicit paths.
```

Primary CTA:

```text
Install locally
```

Secondary CTA:

```text
View BuildFlow on GitHub
```

### Positioning

```text
ChatGPT does the reasoning.
Your computer remains the source of truth.
ProChat Workbench connects the two safely.
```

### Technical migration rule

Use the public name `ProChat Workbench` while preserving BuildFlow repository names, package scopes, scripts, source IDs, action operation names, and API contracts until a compatibility-safe technical migration is approved.

## Public language rules

Use:

- approved business knowledge
- reliable answers
- visible sources
- repeated work
- review-ready output
- faster drafts
- less rewriting
- clearer handoffs
- human review
- useful knowledge stays reusable
- safe local project access
- guarded changes

Do not lead general buyer pages with:

- ProChat OS
- Work Memory
- Infinite Brain
- operating system
- knowledge graph
- modules
- agents
- runtime
- connectors
- model routing
- API
- MCP

Technical terms may appear on Workbench, developer, implementation, or procurement pages after the outcome is clear.

## Naming rules

Approved product names:

```text
ProChat Memory
ProChat Answers
ProChat Automations
ProChat Workbench
```

Approved solution pattern:

```text
ProChat for [Role or Industry]
```

Approved interfaces:

```text
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
