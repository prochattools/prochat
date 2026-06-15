# ProChat Product Modules

**Status:** current module architecture  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-15

## Source of truth

Canonical mind documents:

```text
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
```

## Product suite relationship

```text
ProChat Memory      = reusable knowledge foundation
ProChat Answers     = grounded question-answering product
ProChat Automations = repeated-work product
ProChat Workbench   = safe local project workbench
ProChat for [...]   = packaged role or industry solution
```

`ProChat OS` is retired from primary public naming.

## Internal module model

The business products use two internal module types:

```text
Memory modules
Automation modules
```

They support two main product patterns:

```text
question + approved memory → reliable answer with sources
```

```text
messy input + reusable memory → review-ready work
```

Internal documentation may still discuss modules and workflows. Public product language should use ProChat Memory, ProChat Answers, and ProChat Automations.

## Memory modules

A memory module stores reusable knowledge for a person, project, client, team, department, company, or niche.

It can contain:

- style and tone
- approved examples
- examples to avoid
- procedures
- templates
- decisions and rules
- client and project context
- approved answers
- objections and responses
- recurring formats
- reviewer feedback
- source references
- indexes

Memory scopes:

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

Memory should be:

- inspectable
- editable
- portable
- source-traceable
- model-agnostic
- safely promoted through review

## ProChat Answers modules

ProChat Answers uses approved memory and source material to answer questions reliably.

An Answers module defines:

- supported question types
- allowed memory scopes
- source requirements
- retrieval behavior
- answer format
- citation behavior
- confidence and uncertainty behavior
- review and correction rules
- feedback capture

Examples:

- company policy answers
- product support answers
- project knowledge answers
- client-file answers
- legal knowledge answers
- accounting procedure answers
- sales offer and objection answers

Core loop:

```text
question
→ retrieve approved memory and sources
→ prepare grounded answer
→ show sources
→ capture correction or approval
→ improve memory
```

## ProChat Automations modules

An automation module turns one repeated work situation into one recognizable output.

It defines:

- buyer problem
- input types
- expected output
- required memory
- automation steps
- reusable skills
- approval checkpoints
- schedule where useful
- evaluation criteria

Examples:

- Follow-up Automation
- Proposal Automation
- Support Reply Automation
- Reporting Automation
- Intake Automation
- Content Automation
- Delegation Automation

Design rule:

```text
One automation should solve one repeated work problem.
```

## Product pairing

The strongest products pair memory with answers or automations.

Examples:

```text
sales memory + ProChat Answers → grounded answers about offers and objections
sales memory + Follow-up Automation → stronger follow-up drafts
support memory + ProChat Answers → consistent internal support guidance
support memory + Support Reply Automation → review-ready customer replies
founder memory + Delegation Automation → clearer task instructions
marketing memory + Content Automation → more on-brand drafts
operations memory + Reporting Automation → faster recurring reports
```

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

A solution can combine:

```text
relevant ProChat Memory
+ ProChat Answers where useful
+ ProChat Automations where useful
+ review rules
+ delivery configuration
```

Solutions reuse the same foundation. They are not separate technical platforms.

## Memory promotion

Useful knowledge should move through controlled scopes.

```text
raw input → reviewed lesson → scoped memory → team-approved pattern → company or niche memory
```

A personal preference should not automatically become company memory. A client-specific lesson should not automatically become cross-client memory.

## Skills

A skill is a small reusable ability inside an Answers or Automation module.

Examples:

- retrieve relevant sources
- summarize notes
- extract missing information
- draft a follow-up email
- classify a support request
- convert notes to tasks
- apply a preferred style
- prepare a report outline

Skill rules:

- one skill should do one job
- inputs and outputs should be clear
- examples should be included
- skills should be testable
- important decisions should remain reviewable

## Schedules

Schedules prepare recurring work.

Examples:

- daily follow-up drafts
- daily support summary
- weekly status report
- weekly missing-information list
- monthly document checklist
- monthly content planning draft

Scheduled work remains review-first unless low-risk automation has been explicitly approved.

## Review and evaluation

Every Answers and Automation module needs evaluation.

Questions:

- Was the answer or output useful?
- Was it accurate?
- Were the right sources used?
- Did it match the expected style?
- What did the reviewer edit?
- What context was missing?
- Did it save time?
- Should memory, rules, or module behavior change?

Improvement loop:

```text
run → review → capture feedback → improve memory or module → run better next time
```

## ProChat Workbench relationship

ProChat Workbench is the builder product powered by the BuildFlow engine.

It can help maintain:

- memory files
- source indexes
- automation definitions
- documentation
- tests and validation
- explicit reviewed changes

It is not a memory or automation module. It is a separate product for safe local project work.

During the naming migration, preserve BuildFlow technical identifiers such as repository names, package scopes, scripts, source IDs, action names, and API contracts.

## Public language rule

Do not sell manifests, module graphs, retrieval architecture, or workflow runtimes first.

Sell the relevant product outcome:

```text
ProChat Answers → reliable answers from trusted knowledge
ProChat Automations → repeated work prepared for review
ProChat Workbench → safe local project work with ChatGPT
```
