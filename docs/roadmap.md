# ProChat Roadmap

**Status:** current business and product roadmap  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-15

## Source of truth

Mind is canonical.

```text
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-modules.md
mind/wiki/organisations/prochat/brand/go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
mind/wiki/organisations/prochat/brand/brand-ruleset.md
```

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

BuildFlow remains the technical engine and temporary internal identifier behind ProChat Workbench until a compatibility-safe technical migration is approved.

## Roadmap principle

Build the memory foundation first, prove one useful answer set or repeated-work outcome, and expand only when the result is useful.

```text
ProChat Memory foundation
→ ProChat Answers or one ProChat Automation
→ human review and feedback
→ better future results
→ portable delivery
→ managed delivery
→ role and industry solutions
→ ProChat API and ProChat MCP
```

ProChat Workbench follows a parallel builder roadmap focused on safe local project access.

## Phase 1 — Naming and strategy alignment

Goal:

- keep mind and ProChat documentation synchronized
- establish one product naming hierarchy
- retire ProChat OS from primary public naming
- define BuildFlow as the engine behind ProChat Workbench
- preserve internal identifiers temporarily where compatibility matters

Exit criteria:

```text
Documentation consistently uses ProChat Memory, ProChat Answers,
ProChat Automations, ProChat Workbench, ProChat for [Audience],
ProChat API, and ProChat MCP.
```

## Phase 2 — ProChat Memory v1

Goal:

Create a reusable memory structure for one person or team.

Minimum contents:

- approved examples
- examples to avoid
- style and tone
- decisions and rules
- procedures and templates
- recurring formats
- project or client context
- reviewer feedback
- source references
- simple indexes

Required properties:

- inspectable
- editable
- portable
- source-traceable
- scoped
- reviewable
- model-agnostic

Exit criteria:

```text
The same approved memory improves more than one answer or output
without being re-entered manually.
```

## Phase 3 — ProChat Answers pilot

Goal:

Prove that one approved knowledge set can produce reliable, sourced answers to real questions.

Candidate first knowledge sets:

- company policies and procedures
- product support knowledge
- founder or owner knowledge
- sales offers and objections
- project or client documentation

Requirements:

- approved source set
- realistic questions
- grounded answers
- visible source references
- uncertainty behavior
- correction and feedback path
- memory-scope controls

Core flow:

```text
question → approved memory and sources → grounded answer → sources → feedback
```

Exit criteria:

```text
Users can answer recurring questions faster while verifying the supporting sources.
```

## Phase 4 — ProChat Automations pilot

Goal:

Turn one repeated task into a reusable automation.

Candidate first automations:

- Follow-up Automation
- Proposal Automation
- Support Reply Automation
- Reporting Automation
- Intake Automation
- Content Automation
- Delegation Automation

Requirements:

- clear buyer problem
- defined input types
- expected output
- required memory
- review checkpoint
- evaluation criteria

Core flow:

```text
messy input → relevant memory → automation → review-ready output → feedback
```

Exit criteria:

```text
The same type of input repeatedly produces useful work ready for review.
```

## Phase 5 — Review and improvement loop

Goal:

Use human feedback to improve memory, answers, and automations.

Capture:

- approval or rejection
- answer corrections
- output edits
- missing context
- wrong or incomplete sources
- useful examples
- recurring corrections
- memory-scope changes
- rules to promote, correct, or retire

Exit criteria:

```text
Later answers and outputs improve because reviewed work changed the system.
```

## Phase 6 — Portable demo and starter packages

Goal:

Make ProChat Answers and Automations easy to demonstrate, configure, deploy, and maintain.

Answers package:

```text
config/
memory/
sources/
questions/
answers/
review/
examples/
README.md
```

Automations package:

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

Delivery targets:

- ZIP or repository package
- safe sample memory and sources
- sample questions or repeated tasks
- expected answers or outputs
- short installation guide
- simple launcher where practical
- containerized option
- export and backup path
- reproducible setup

Exit criteria:

```text
A technical customer or ProChat operator can run one starter package in under thirty minutes.
```

## Phase 7 — Managed commercial launch

Goal:

Let customers use ProChat Answers and Automations without operating the underlying infrastructure.

Possible entry points:

- email
- forms
- file uploads
- shared folders
- manual questions
- API calls
- supported MCP clients

Required:

- simple question and review experience
- visible sources for Answers
- clear review experience for Automations
- logs and error visibility
- safe credential handling
- backup and export
- documented support process
- managed improvement offer

## Phase 8 — ProChat Workbench public rename

Goal:

Present the builder product publicly as ProChat Workbench while preserving the stable BuildFlow technical engine.

Public updates:

- README and product documentation
- dashboard headings and descriptions
- website product page
- Custom GPT name and instructions where safe
- installation and onboarding language
- GitHub descriptions and release notes

Preserve temporarily:

- BuildFlow repository name
- `buildflow` package names
- `@buildflow/*` workspace scopes
- source IDs
- scripts
- action operation names
- API contracts
- environment variables

Positioning:

```text
ProChat Workbench lets ChatGPT work safely with real local projects.
Powered by the BuildFlow engine.
```

Exit criteria:

```text
Public surfaces consistently say ProChat Workbench while existing installations and integrations continue to work.
```

## Phase 9 — ProChat API and ProChat MCP

Goal:

Expose approved memory, answers, automations, review, and feedback to other software and compatible AI clients.

API capabilities:

- submit a question
- select a memory scope
- retrieve a grounded answer and sources
- submit work
- run an automation
- retrieve output
- approve or reject
- submit feedback
- update or promote memory

MCP tools may include:

- `search_memory`
- `read_memory`
- `ask_answers`
- `submit_work`
- `run_automation`
- `review_output`
- `add_feedback`
- `promote_memory`
- `list_products`

Exit criteria:

```text
An approved client can use ProChat capabilities without bypassing memory scope, review, traceability, or safety rules.
```

## Phase 10 — First customer proofs

Goal:

Prove measurable value with one person or one team.

Priority wedges:

1. Founder or owner
2. Sales
3. Support
4. Marketing and content
5. Operations and reporting

Success measures:

- useful-answer rate
- source correctness
- time saved
- output acceptance rate
- amount of rewriting reduced
- repeated-question reduction
- recurring corrections reduced
- memory reused across multiple runs
- reviewer confidence

## Phase 11 — ProChat for [Role or Industry]

Goal:

Package proven products for one audience.

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

Exit criteria:

```text
A buyer understands the solution without needing to understand the internal architecture.
```

## Phase 12 — Team and company memory

Goal:

Expand from individual or project memory into reviewed shared memory.

Sequence:

```text
personal
→ project
→ client
→ team
→ department
→ company
→ cross-project
```

Required controls:

- ownership
- permissions
- source traceability
- review status
- promotion rules
- correction and retirement
- export and backup
- sensitive-data boundaries

## Phase 13 — Deeper integrations

Goal:

Connect ProChat to the systems customers already use.

Possible integrations:

- email
- CRM
- helpdesk
- shared drives
- document systems
- project-management tools
- accounting systems
- internal portals
- supported AI clients

Integration rule:

```text
Add an integration only when it improves a proven answer, automation, or review loop.
```

## Naming migration rule

Use publicly:

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

Preserve BuildFlow technical identifiers until a separate compatibility-safe migration is explicitly planned and tested.

## Current priority

```text
1. Finish suite naming alignment across documentation and website copy.
2. Publish ProChat Answers and ProChat Automations product pages.
3. Rename BuildFlow public documentation to ProChat Workbench.
4. Prove one Answers pilot and one Automation pilot.
5. Add API and MCP only after the core product loops are reliable.
```
