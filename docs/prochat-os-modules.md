# ProChat OS Modules

Status: synchronized module architecture draft. Mind remains canonical.

Last updated: 2026-06-03

## Source of truth

Canonical mind document:

```text
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
```

This repo follows that document for website planning, docs, module pages, implementation roadmaps, and product copy.

## Purpose

ProChat OS is niche-agnostic at the core and niche-specific at the module layer.

Core pattern:

```text
messy information → ready-to-review output → human approval → repeatable workflow
```

Modules package that pattern for a specific workflow or niche.

## Module definition

A ProChat OS module is a packaged workflow block containing:

- skills
- workflows
- schedules
- examples
- evaluation criteria
- optional connectors
- onboarding notes
- safe test data

A module should solve one recognizable buyer problem.

Bad:

```text
general AI assistant for all business work
```

Good:

```text
legal client intake summary and missing-information checklist
```

## Module manifest principle

Each module should eventually declare:

- module name
- niche or workflow family
- buyer problem
- entry points
- outputs
- approval requirements
- skills
- workflows
- schedules
- optional connectors
- example files
- evaluation criteria

## Skill specification

A skill is a narrow, inspectable ability used by a workflow.

Each skill should define:

- name
- purpose
- expected input
- expected output
- examples of good output
- context/reference files
- constraints
- approval requirements
- safe test data
- execution context or sandbox

Rules:

- one skill should do one job
- avoid broad multi-purpose skills
- include examples to reduce vague output
- test each skill in isolation before using it in a workflow
- do not overload one workflow with too many skills

## Workflow specification

A workflow coordinates skills into a useful business output.

Each workflow should define:

- trigger or entry point
- required skills
- required context
- output format
- approval checkpoints
- logging requirements
- success criteria
- failure/retry behavior

## Schedule specification

Schedules are used for recurring work.

Each schedule should define:

- name
- frequency
- workflow
- input source
- output destination
- approval behavior
- failure behavior

Buyer-facing explanation:

```text
Recurring work can be prepared automatically, while important outputs remain ready for human review.
```

## Testing and evaluation

Every module needs evaluation criteria.

Evaluation questions:

- Is the output accurate?
- Is the output useful?
- What did the reviewer correct?
- What information was missing?
- Did the workflow save time?
- Did the draft reduce effort?
- Did the checklist catch the right missing information?

Evaluation loop:

```text
run workflow → review output → capture feedback → refine examples/context/skills → rerun → compare improvement
```

A module is not ready to sell repeatedly until it produces useful output on safe test data and at least one real pilot workflow.

## Niche examples

### Legal intake module

Problem:

```text
Client emails, PDFs, notes, and attachments take too long to organize before review.
```

Outputs:

- intake summary
- missing-information checklist
- matter task list
- draft follow-up email
- structured matter notes

Trust rules:

- admin/document support only
- no automatic legal advice
- lawyer review first
- fake or approved sample data for demos

### Accounting document intake module

Problem:

```text
Clients send receipts, PDFs, forms, and emails in messy ways, creating repetitive follow-up and missing-document work.
```

Outputs:

- client document summary
- missing-document checklist
- draft follow-up email
- monthly task list
- review notes

### Agency lead intake module

Problem:

```text
Inbound leads arrive through email, forms, LinkedIn, calls, and notes, then require manual qualification and follow-up.
```

Outputs:

- lead summary
- qualification notes
- missing questions
- draft reply
- CRM-ready fields
- next task

## Packaging and deployment notes

Do not lead public marketing with technical packaging.

Internal implementation should move toward reproducible and supportable module delivery.

Future technical goals:

- module manifest file
- safe sample data
- isolated test runner
- module install command
- reproducible environment definition, such as Devbox, Nix, or containers
- support bundle with redacted logs
- evaluation records

Possible future CLI shape:

```bash
prochat module list
prochat module add legal-intake
prochat module test legal-intake
prochat module schedules list
prochat module evaluate legal-intake
```

These commands are roadmap ideas, not current public promises.

## Commercial principle

The customer buys an outcome, not the module architecture.

Public offer language:

```text
We help your team turn one repetitive information process into a faster, ready-to-review workflow.
```

Internal delivery language:

```text
We configure the relevant ProChat OS module, skills, schedules, approval checkpoints, and evaluation loop.
```
