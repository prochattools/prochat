# ProChat OS Implementation Roadmap

Status: implementation roadmap for building ProChat OS as a managed AI workflow system with niche-specific modules.

Last updated: 2026-05-24

## Source of truth

Mind leads this repo.

This roadmap follows:

```text
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-technical-definition.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

Related ProChat repo docs:

```text
docs/strategy.md
docs/product-operating-map.md
docs/roadmap.md
docs/implementation-plan.md
docs/product-hierarchy-plan.md
docs/prochat-os-landing-page-copy.md
```

## Implementation principle

Do not start by building the full platform.

Start with a tangible before/after demo, validate one workflow, then package that workflow as a ProChat OS module.

```text
Demo wedge → workflow discovery → first niche module → first managed pilot → ProChat OS v1 runtime → public repo → managed product
```

Refined implementation principle:

```text
core = messy information → ready-to-review output → human approval → repeatable workflow
module = skills + workflows + schedules + examples + evaluation criteria + optional connectors
```

## Product and technical definition

Buyer-facing definition:

```text
ProChat OS helps businesses get repetitive information work done faster by turning messy emails, PDFs, forms, notes, folders, attachments, reports, and API data into ready-to-review summaries, checklists, tasks, reports, status updates, and draft replies.
```

Internal technical definition:

```text
ProChat OS is a managed workflow system that coordinates inputs, skills, workflows, schedules, approvals, logs, optional modules, and business outputs.
```

Customers do not install Steve's private `mind` or `brain` repositories.

Default customer-facing delivery should not imply that ProChat enters a customer's computers or internal network. ProChat can set up and manage the workflow system, and customers can send work to it through email, forms, file drops, manual upload, or API calls.

## Runtime and module components

The target ProChat OS implementation includes:

1. workflow execution layer
2. worker and scheduler
3. context/data store where needed
4. input entry points such as email, forms, file drops, manual upload, or API calls
5. output formats such as summaries, checklists, tasks, reports, status updates, and draft replies
6. model/provider execution layer
7. approval and event log
8. simple console/status view
9. support tooling and optional CLI
10. optional workflow modules
11. module skills, workflows, schedules, examples, and evaluation criteria

## Phase 0 — Documentation and strategy alignment

Status: complete enough to proceed.

Completed docs:

- `docs/strategy.md`
- `docs/product-operating-map.md`
- `docs/roadmap.md`
- `docs/product-hierarchy-plan.md`
- `docs/implementation-plan.md`
- `docs/prochat-os-landing-page-copy.md`

Acceptance criteria:

- ProChat OS is the flagship.
- Public website remains business-agnostic.
- Law firms are the direct outreach wedge only.
- MikeOSS is a legal demo/workspace block, not ProChat OS.
- Legacy kits are preserved but secondary.

## Phase 1 — MikeOSS Dokploy legal demo

Goal:

Create the first tangible demo for law-firm outreach without delaying for AWS.

Use the existing Dokploy environment.

Domains:

```text
legal.prochat.tools      → MikeOSS frontend
legal-api.prochat.tools  → MikeOSS backend
```

Mind checklist:

```text
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

### Demo architecture

```text
Dokploy
  ├─ MikeOSS frontend app
  ├─ MikeOSS backend app
  └─ Cloudflare/Dokploy routing

External services
  ├─ Supabase Auth/Postgres
  ├─ Cloudflare R2 bucket
  └─ model provider key
```

### Implementation tasks

- Create or fork/mirror a MikeOSS demo repo.
- Create a dedicated Supabase project.
- Run MikeOSS `backend/schema.sql` in Supabase.
- Create a Cloudflare R2 bucket for demo documents.
- Configure at least one model provider key.
- Create two Dokploy applications.
- Configure `legal.prochat.tools` for frontend.
- Configure `legal-api.prochat.tools` for backend.
- Use fake legal matter data only.
- Record a Loom demo once upload/chat/review works.

### MikeOSS license rules

MikeOSS is AGPL-3.0.

For the first demo:

- use MikeOSS mostly unmodified
- keep AGPL notices intact
- do not rebrand MikeOSS as ProChat-owned software
- position ProChat as setup partner, manager, and workflow layer
- do not use real law-firm client data in the shared demo

### Exit criteria

- `legal.prochat.tools` loads.
- `legal-api.prochat.tools` is reachable by the frontend.
- Demo signup/login works.
- Fake matter/project can be created.
- Fake PDFs can be uploaded.
- Document questions return useful answers/citations.
- Loom can be recorded.

## Phase 2 — Law-firm workflow discovery

Goal:

Use the demo to discover what law firms actually want automated.

Do not assume the workflow from the outside.

Ask prospects:

- What repetitive admin, document, or intake task do you hate most?
- Where does the information come from?
- What does the finished output need to look like?
- Who uses that output?
- How often does this happen?
- How long does it take manually?
- What tools are involved today?
- What needs approval?
- What would this be worth monthly if automated?

Exit criteria:

```text
first law-firm workflow + first managed pilot promise + first success metric
```

## Phase 3 — First niche module outline

Goal:

Turn the discovered workflow into a clear module outline before building too much.

The first candidate remains legal intake unless outreach proves another niche easier.

The outline should define:

- buyer problem
- safe sample data
- expected inputs
- expected outputs
- first workflow promise
- approval needs
- success metric

## Phase 4 — First ProChat OS pilot wrapper

Goal:

Wrap the selected niche workflow, and optionally the MikeOSS legal workspace, with the first ProChat OS workflow layer.

Likely workflow:

```text
messy client intake → structured matter/client summary + missing-info checklist + task list + draft follow-up
```

### Minimal ProChat OS wrapper

Build only what the first pilot needs:

- workflow definition
- input adapter for uploaded/sample matter data
- structured output generator
- approval state
- event log
- simple status view or internal console
- support notes and redaction process

This does not need to be the final public ProChat OS runtime yet.

### Exit criteria

- one workflow runs end to end
- human approval is visible
- structured output is useful
- support/debug logs avoid secrets
- pilot can be explained as ProChat OS around MikeOSS

## Phase 5 — Niche module validation

Goal:

Turn the first useful workflow into a repeatable ProChat OS module.

Module structure:

```text
skills + workflows + schedules + examples + evaluation criteria + optional connectors
```

Candidate first modules:

- legal intake
- accounting document intake
- agency lead intake
- consultant proposal/profile preparation
- content operations

For the first selected module, define:

- buyer problem
- safe sample data
- expected inputs
- expected outputs
- required skills
- workflow steps
- approval checkpoints
- optional schedules
- evaluation criteria
- onboarding notes

Exit criteria:

```text
One niche module produces useful ready-to-review output on safe sample data and can be explained clearly in a landing page or Loom.
```

## Phase 6 — ProChat OS v1 runtime extraction

Goal:

Extract the repeatable runtime from the pilot/module into a reusable managed workflow system.

### V1 components

- Core workflow API
- Worker/scheduler
- Memory database
- Event log
- Human approval queue
- One input connector
- One output connector
- One configured model provider
- Basic CLI commands
- Simple console/status page
- Optional MikeOSS module

### First connector candidates

Input:

- email inbox
- watched folder
- upload form
- webhook

Output:

- structured report
- email draft
- task list
- CRM-ready JSON
- dashboard/status card

### Non-goals

Do not build yet:

- full multi-tenant SaaS
- every connector
- perfect model routing
- broad shell access
- autonomous unsupervised actions
- deep CRM integrations
- complex dashboard-first UX

### Exit criteria

- ProChat OS can run without private Steve-specific repos.
- Customer memory is separate from Steve's `mind` repo.
- Customer credentials are separate.
- One workflow can be set up and run repeatedly.
- CLI can check status and create a redacted support bundle.

## Phase 7 — Support tooling and reproducible setup path

Goal:

Make ProChat OS supportable and repeatable across managed, self-hosted, and demo environments.

Initial CLI commands:

```bash
prochat doctor
prochat setup
prochat status
prochat workflows list
prochat connectors list
prochat support-bundle
prochat update
```

### CLI responsibilities

- environment check
- config directory setup
- service status
- workflow listing
- connector listing
- redacted support bundle
- update helper
- managed-service connection later

### Exit criteria

- one operator can set up and inspect a ProChat OS environment consistently
- support bundle redacts secrets
- CLI avoids broad destructive actions by default

## Phase 8 — Managed ProChat OS offer

Goal:

Turn pilots into a repeatable managed productized service.

Offer direction:

```text
Managed ProChat OS: ProChat sets up, runs, supports, and improves one or more workflow modules that turn messy business information into ready-to-review outputs.
```

Commercial elements:

- commercial license
- managed hosting/support
- workflow setup
- connector configuration
- updates
- support bundle process
- backup/restore policy
- offboarding/data export policy

Exit criteria:

- onboarding checklist exists
- support checklist exists
- pricing model exists
- pilot-to-paid path exists
- installation is repeatable enough to sell

## Phase 9 — Public source-available ProChat OS repo

Goal:

Publish a sanitized public ProChat OS project for personal/non-commercial use.

Repo must include:

- license
- commercial license notice
- trademark policy
- install docs
- architecture docs
- module docs
- examples
- no private memory
- no secrets
- no Steve-specific operational state

Exit criteria:

- public repo explains personal/non-commercial usage
- commercial/managed path is clear
- install docs are safe
- no private repo leakage

## Phase 10 — Optional ProChat Cloud modules

Goal:

Add shared cloud/API modules only after single-tenant pilots prove demand.

Principle:

```text
Share generic computation.
Isolate private context.
```

Good shared candidates:

- license checks
- update checks
- template generation
- video planning
- public monitoring checks
- content generation

Avoid sharing too early:

- private memory
- customer files
- credentials
- sensitive workflow actions
- autonomous operations

## Implementation sequence summary

```text
1. Deploy or prepare the first tangible demo/wedge.
2. Record a short buyer-facing Loom.
3. Run outreach and discovery.
4. Build the first workflow wrapper.
5. Package the first useful workflow as a niche module.
6. Validate skills, workflow steps, approvals, schedules, and evaluation criteria.
7. Extract ProChat OS v1 runtime from the validated module pattern.
8. Add support tooling and reproducible setup path.
9. Sell managed pilots.
10. Publish sanitized personal/non-commercial repo later.
11. Add ProChat Cloud modules only after demand is proven.
```

## Engineering guardrails

- Mind strategy remains leading.
- Do not install private `mind` or `brain` for clients.
- Do not make the public website law-firm-only.
- Do not present MikeOSS as ProChat-owned software.
- Start with human approval first.
- Isolate private customer context.
- Avoid broad infrastructure access where possible.
- Keep secrets out of Git and support bundles.
- Prefer one working workflow over a broad unfinished platform.
