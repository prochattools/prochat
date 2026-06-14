# ProChat OS Modules

**Status:** current module architecture  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-14

## Source of truth

Canonical mind document:

```text
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
```

## Module model

ProChat OS has two module types:

```text
Work Memory modules
Workflow modules
```

They work together:

```text
messy input + reusable memory → review-ready output
```

## Work Memory modules

A Work Memory module stores the reusable knowledge that makes output useful for a person, team, department, company, or niche.

It can contain:

- style and tone
- examples of good work
- examples to avoid
- procedures
- templates
- decisions and rules
- client and project context
- common answers
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
- safe to promote through review

## Workflow modules

A workflow module turns one repeated work situation into one recognizable output.

It defines:

- buyer problem
- input types
- expected output
- required memory
- workflow steps
- skills
- approval checkpoints
- schedule where useful
- evaluation criteria

Examples:

- founder delegation
- sales follow-up
- support reply
- proposal draft
- status report
- document summary
- content preparation
- client intake

Design rule:

```text
One workflow module should solve one repeated work problem.
```

## Module pairing

The product becomes valuable when memory and workflow modules are paired.

Examples:

```text
founder memory + delegation workflow → clearer task instructions
sales memory + follow-up workflow → stronger follow-up drafts
support memory + reply workflow → more consistent customer answers
marketing memory + content workflow → more on-brand drafts
operations memory + reporting workflow → faster recurring reports
legal memory + intake workflow → better legal admin preparation
accounting memory + collection workflow → clearer document follow-up
```

## Niche derivatives

Niche products are not separate foundations.

They are focused combinations of:

```text
niche memory + niche workflow modules + review rules + delivery configuration
```

Examples:

- legal
- accounting
- agencies
- consultants
- real estate
- support teams
- sales teams
- content teams

The flagship product stays business-agnostic. Niche derivatives package the same foundation around a specific buyer problem.

## Memory promotion

Useful knowledge should move through controlled scopes.

```text
raw input → reviewed lesson → scoped memory → team-approved pattern → company or niche memory
```

A personal preference should not automatically become company memory. A client-specific lesson should not automatically become cross-client memory.

## Skills

A skill is a small reusable ability inside a workflow.

Examples:

- summarize notes
- extract missing information
- draft follow-up email
- classify support request
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

## Evaluation

Every module needs evaluation.

Questions:

- Was the output useful?
- Was it accurate?
- Did it match the expected style?
- What did the reviewer edit?
- What context was missing?
- Did it save time?
- Should memory, examples, rules, or workflow steps change?

Improvement loop:

```text
run → review → capture feedback → improve memory or workflow → run better next time
```

## First modules to build

Priority:

1. Founder or owner memory
2. Sales memory plus follow-up workflow
3. Support memory plus reply workflow
4. Marketing memory plus content workflow
5. Operations memory plus reporting workflow

Niche-specific derivatives should follow after the memory foundation and first role-based workflow prove useful.

## Public language rule

Do not sell modules, manifests, memory graphs, or architecture.

Sell the outcome:

```text
Stop rewriting, re-explaining, and redoing the same work.
```

Internal delivery language:

```text
Configure the relevant memory module, workflow module, review rules, and delivery method.
```
