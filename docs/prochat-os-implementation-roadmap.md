# ProChat OS Implementation Roadmap

Status: implementation roadmap for building ProChat OS as an installable Agentic Workflow OS.

Last updated: 2026-05-24

## Source of truth

Mind leads this repo.

This roadmap follows:

```text
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-technical-definition.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
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

Start with a tangible demo, validate one workflow, then productize the runtime.

```text
Demo wedge → workflow discovery → first managed pilot → ProChat OS v1 runtime → public repo → managed product
```

## Technical definition

ProChat OS is an installable Agentic Workflow OS: a private workflow runtime that connects messy inputs to business tools through memory, connectors, model routing, workflow agents, approvals, logs, and a control console.

A customer installs a sanitized ProChat OS instance, not Steve's private `mind` or `brain` repositories.

## Runtime components

The target ProChat OS runtime includes:

1. Core workflow runtime / API
2. Worker and scheduler
3. Memory and context store
4. Input connector layer
5. Output connector layer
6. Model router / AI selector
7. Approval and event log
8. Control console
9. CLI for install, status, updates, and support
10. Optional workflow modules

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
- MikeOSS is a legal demo/install block, not ProChat OS.
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
- position ProChat as installer, manager, and workflow layer
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

## Phase 3 — First ProChat OS pilot wrapper

Goal:

Wrap the MikeOSS legal workspace with the first ProChat OS workflow layer.

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

## Phase 4 — ProChat OS v1 runtime extraction

Goal:

Extract the repeatable runtime from the pilot into a reusable installable product.

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
- One workflow can be installed and run repeatedly.
- CLI can check status and create a redacted support bundle.

## Phase 5 — CLI and install path

Goal:

Make ProChat OS installable and supportable.

Initial CLI commands:

```bash
prochat doctor
prochat install
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

- one operator can install and inspect a ProChat OS instance consistently
- support bundle redacts secrets
- CLI avoids broad destructive actions by default

## Phase 6 — Managed ProChat OS offer

Goal:

Turn pilots into a repeatable managed productized service.

Offer direction:

```text
Managed ProChat OS: private Agentic Workflow OS installation, setup, updates, support, and one or more workflow modules.
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

## Phase 7 — Public source-available ProChat OS repo

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

## Phase 8 — Optional ProChat Cloud modules

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
1. Deploy MikeOSS demo on Dokploy.
2. Record law-firm Loom.
3. Run outreach and discovery.
4. Build first workflow wrapper.
5. Extract ProChat OS v1 runtime.
6. Add CLI/support path.
7. Sell managed pilots.
8. Publish sanitized personal/non-commercial repo later.
9. Add ProChat Cloud modules only after demand is proven.
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
