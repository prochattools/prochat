# ProChat OS Implementation Roadmap

**Status:** current implementation roadmap  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-14

## Source of truth

Mind leads this repository.

```text
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-technical-definition.md
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
```

## Implementation principle

Build the smallest useful memory-first system around one repeated task.

```text
first time-saving test
→ Work Memory for one person or team
→ workflow module for one repeated task
→ human review
→ feedback improves memory
→ repeatable delivery
→ team and niche expansion
```

Do not begin with a full platform, heavy server installation, every connector, or a regulated niche.

## Product structure

```text
Work Memory + Workflow Modules + Review Loop
```

Internal flow:

```text
input arrives
→ retrieve relevant memory
→ run one workflow
→ prepare output
→ request review
→ capture corrections
→ improve memory and workflow
```

## Delivery targets

ProChat OS should support three practical delivery modes.

### 1. Demo package

Purpose:

```text
Show the before-and-after result with minimal setup.
```

Target format:

- downloadable ZIP or repository folder
- sample input
- sample memory
- sample workflow
- expected output
- one-command or one-click demo where practical
- short demo manual

The demo should not require access to a customer network or production data.

### 2. Local starter package

Purpose:

```text
Let a customer or ProChat operator run one useful flow locally.
```

Target structure:

```text
prochat-starter/
  config/
  memory/
  workflows/
  inbox/
  outputs/
  review/
  examples/
  README.md
```

Preferred setup options:

- containerized local package
- simple Node-based launcher
- packaged desktop launcher later
- Devbox or Nix for reproducible technical environments

The first local package should avoid requiring Git knowledge or command-line expertise from ordinary users.

### 3. Managed deployment

Purpose:

```text
Provide the easiest commercial experience.
```

ProChat sets up and manages the system. Customers interact through simple entry points:

- email
- forms
- file drops
- shared folders
- manual file intake
- API calls
- MCP-compatible clients where useful

Managed deployment is the default commercial path when local setup creates support overhead.

## API and MCP direction

The memory and workflow layers should be accessible through stable interfaces.

### API

A future API should support operations such as:

```text
submit input
select memory scope
run workflow
retrieve output
approve or reject output
submit review feedback
update or promote memory
```

### MCP

An MCP server can expose ProChat capabilities to compatible AI clients and development tools.

Possible MCP tools:

```text
search_memory
read_memory
submit_work
run_workflow
review_output
add_feedback
promote_memory
list_modules
```

API and MCP are delivery interfaces. They are not the buyer-facing product promise.

## Phase 1 — First time-saving demo

Goal:

Prove one repeated task can be completed faster using reusable examples and context.

Best first scenario:

```text
Founder or owner provides messy notes, previous examples, and a client request.
ProChat prepares a reply draft, proposal outline, task instruction, and context summary.
```

Exit criteria:

- demo runs from safe sample files
- result is understandable in under five minutes
- buyer can compare before and after
- output is ready for review

## Phase 2 — Work Memory v1

Goal:

Create reusable memory for one person or team.

Minimum contents:

- style and tone
- good examples
- examples to avoid
- common facts and context
- preferred output format
- decisions and rules
- reviewer feedback
- source references
- simple indexes

Exit criteria:

```text
The same knowledge improves more than one output without being re-entered manually.
```

## Phase 3 — Workflow module v1

Goal:

Turn one repeated task into a reusable workflow.

Candidate modules:

- founder delegation
- sales follow-up
- support reply
- proposal draft
- weekly status report
- content draft

Exit criteria:

```text
The same type of input repeatedly produces a useful review-ready output.
```

## Phase 4 — Review and memory improvement

Goal:

Use reviewer feedback to improve future work.

Capture:

- approval or rejection
- edits
- missing context
- useful examples
- rules that should change
- memory that should be promoted, scoped, corrected, or retired

Exit criteria:

```text
Later runs improve because the system learned from reviewed work.
```

## Phase 5 — Portable starter package

Goal:

Package the first useful system so it can be demonstrated or run without a bespoke server project.

Required:

- clear folder structure
- configuration template
- sample memory
- sample workflow
- safe demo data
- setup command or launcher
- short manual
- export and backup path

Exit criteria:

```text
A technical customer or ProChat operator can install and run the package in under thirty minutes.
```

## Phase 6 — Managed commercial launch

Goal:

Make the system usable by a real customer without requiring them to understand infrastructure.

Required:

- managed deployment option
- simple input method
- simple review method
- logs and error visibility
- backup and export
- support process
- safe credential handling

Exit criteria:

```text
The buyer can use the output in normal work without operating the underlying system.
```

## Phase 7 — API and MCP interfaces

Goal:

Allow other tools to use ProChat memory and workflows.

Required:

- authenticated API
- scoped memory access
- workflow execution contract
- review and feedback contract
- MCP server for selected safe capabilities
- audit logging

Exit criteria:

```text
A compatible client can retrieve approved context, run a workflow, and submit review feedback safely.
```

## Phase 8 — Team rollout

Goal:

Expand from one person to one team.

Add:

- shared examples
- approved language
- shared procedures
- role-specific permissions
- team review rules
- memory promotion rules

## Phase 9 — Niche derivatives

Goal:

Package the same foundation for specific buyer groups.

A niche derivative contains:

```text
niche memory + niche workflows + review rules + delivery configuration
```

Examples:

- legal
- accounting
- agencies
- consulting
- real estate
- sales
- support
- content teams

A niche derivative should not require rebuilding the product foundation.

## Phase 10 — Department and company memory

Goal:

Promote useful patterns into broader shared memory.

```text
personal memory
→ team-approved memory
→ department memory
→ company or cross-project memory
```

Memory promotion must remain scoped, reviewable, source-traceable, and reversible.

## Engineering rules

- memory foundation before feature expansion
- one repeated task at a time
- examples before automation
- human review before trusted memory promotion
- portable formats where practical
- stable interfaces between memory, workflows, and delivery layers
- model and tool independence
- simple demo before complex deployment
- managed delivery when self-installation creates unnecessary support burden
- niche products reuse the same foundation

## Product naming status

`ProChat OS` remains the working name until the naming architecture is decided.

Implementation code should avoid tightly coupling internal package names, APIs, module identifiers, or file formats to a final public brand name.
