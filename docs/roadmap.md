# ProChat Roadmap

Status: canonical roadmap for ProChat documentation, website, and ProChat OS evolution.

Last updated: 2026-05-24

## Source of truth

The `mind` repo ProChat OS strategy leads this ProChat repo.

Canonical strategy references:

- `docs/strategy.md`
- `docs/product-operating-map.md`
- `docs/implementation-plan.md`
- `docs/product-hierarchy-plan.md`

Mind references that lead this repo:

```text
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-technical-definition.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

## Roadmap principles

- ProChat OS is the flagship.
- The public website must be business-agnostic.
- Law firms are a direct outreach wedge, not the whole brand.
- MikeOSS is a law-firm demo/install block, not ProChat OS.
- SaaSKit, ProKit, UXKit, and WaaSKit are legacy/supporting products.
- BuildFlow is supporting/internal or adjacent tooling, not the current flagship.
- Do not delete legacy material during alignment; mark or reframe it.
- Keep live, demo, roadmap, and legacy states clear.

## Phase 0 — Strategy alignment

Status: in progress.

Goal:

Bring this ProChat repo into line with the mind-led ProChat OS strategy.

Deliverables:

- `docs/strategy.md`
- `docs/product-operating-map.md`
- `docs/roadmap.md`
- `docs/implementation-plan.md`
- `docs/product-hierarchy-plan.md`
- `README.md` and `docs/overview.md` pointers

Acceptance criteria:

- ProChat OS is documented as the flagship.
- ProChat OS is no longer described as phased out.
- BuildFlow is no longer documented as the main public product strategy.
- Legacy products are preserved but de-emphasized.
- Website work can proceed from a clear ProChat OS-first strategy.

## Phase 1 — Website / landing page copy

Status: next.

Goal:

Create business-agnostic ProChat OS website and landing page copy.

The landing page should not be law-firm-specific.

It should communicate:

```text
ProChat OS is an Agentic Workflow OS.
It sits between messy business inputs and the tools a business already uses.
It turns messy information into structured outputs and actions through configurable workflows, agents, memory, approvals, and connectors.
```

Core website direction:

```text
Agentic workflows between your messy inputs and your business tools.
```

Deliverables:

- homepage/landing copy plan
- hero copy
- problem/solution sections
- how-it-works section
- technical trust section
- managed install section
- free vs managed/commercial section
- CTA structure

Acceptance criteria:

- business-agnostic
- ProChat OS-first
- clear that the dashboard is only a command center
- no law-firm-only framing
- no MikeOSS-led brand language
- no BuildFlow-led positioning
- no SaaSKit-led positioning

## Phase 2 — ProChat OS implementation roadmap

Status: planned after landing copy.

Goal:

Create an implementation roadmap for building ProChat OS as an installable private workflow runtime.

Must include the MikeOSS Dokploy checklist as the first demo wedge.

Mind source checklist:

```text
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

Implementation roadmap should cover:

- ProChat OS core runtime
- memory/context store
- connector layer
- model router / AI selector
- approval and event log
- control console
- CLI install/support commands
- optional modules
- MikeOSS Dokploy demo integration
- path from demo to managed pilot

Acceptance criteria:

- technical and business roadmap connect
- MikeOSS Dokploy demo is included as Phase 1 demo wedge
- customer install path is separated from shared demo path
- no private mind/brain repo leakage into customer install

## Phase 3 — Law-firm Loom demo script

Status: planned.

Goal:

Create a 60–90 second Loom script for law-firm outreach.

The script should show:

```text
messy legal/client documents
→ MikeOSS legal document workspace
→ ProChat OS workflow layer
→ structured intake summary, missing-info checklist, tasks, draft follow-up
```

Acceptance criteria:

- does not claim legal advice
- uses fake data only
- explains MikeOSS as the demo block
- positions ProChat OS as the workflow system around it
- ends with a discovery question

## Phase 4 — Law-firm outreach list and message sequence

Status: planned.

Goal:

Create the first direct outreach system for local law firms.

Deliverables:

- target profile
- list-building criteria
- first message
- follow-up sequence
- discovery-call questions
- qualification criteria
- response tracking fields

Acceptance criteria:

- focused on law firms
- asks about real workflow pain instead of assuming it
- uses the Loom as a conversation starter
- avoids legal advice claims
- sells the demo/managed workflow path, not a generic AI pitch

## Phase 5 — MikeOSS Dokploy legal demo

Status: planned.

Goal:

Deploy the first tangible legal demo quickly using the existing Dokploy environment.

Use:

```text
legal.prochat.tools      → MikeOSS frontend
legal-api.prochat.tools  → MikeOSS backend
```

Mind checklist:

```text
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

Demo rules:

- use fake/sample legal data only
- keep MikeOSS AGPL notices intact
- do not rebrand MikeOSS as ProChat-owned software
- use MikeOSS mostly unmodified first
- position ProChat as installer/manager/workflow layer

Acceptance criteria:

- demo loads
- fake matter can be uploaded
- document questions work
- Loom can be recorded
- no real client data used

## Phase 6 — First managed pilot

Status: future.

Goal:

Install a private ProChat OS/MikeOSS pilot for one law firm.

Preferred pilot model:

```text
free setup + higher monthly managed plan after 30 days
```

Pilot scope:

- private environment
- real data only after trust, written approval, and proper setup
- one workflow only
- human approval first
- structured output
- redacted logs/support path
- clear success metric

## Phase 7 — ProChat OS v1 runtime

Status: future.

Goal:

Extract the core runtime into a productized installable ProChat OS instance.

V1 components:

- core workflow API
- worker/scheduler
- memory database
- one input connector
- one output connector
- event log
- human approval queue
- simple console/status page
- CLI install/status/support commands
- one model provider
- optional MikeOSS module

Non-goals:

- full multi-tenant SaaS
- every connector
- perfect model routing
- deep CRM integrations
- autonomous unsupervised actions
- broad shell access
- complex dashboard-first UX

## Phase 8 — Public GitHub and managed offer

Status: future.

Goal:

Publish a source-available personal/non-commercial ProChat OS repo and sell managed/commercial usage.

GitHub release should include:

- clear license
- commercial license notice
- trademark policy
- install docs
- architecture docs
- module docs
- examples
- no private memory or secrets

Managed offer should include:

- commercial license
- hosting/support
- setup/configuration
- workflow modules
- update path
- support bundle process
- backup/restore policy

## Phase 9 — Organic content engine

Status: future.

Goal:

Attract SaaS builders, creators, influencers, and personal developers without direct outreach.

Content demos:

- Git commits to X posts
- research to video outline
- messy notes to content plan
- YouTube video orchestration
- local app building
- business memory workflows

## Phase 10 — Shared ProChat Cloud modules

Status: future.

Goal:

Add shared cloud/API modules only after single-tenant pilots prove demand.

Principle:

```text
Share generic computation.
Isolate private context.
```

Good shared candidates:

- content generation
- video planning
- public monitoring checks
- template generation
- license checks
- update checks

Avoid sharing too early:

- private memory
- customer files
- credentials
- autonomous actions
- sensitive workflows

## Long-term direction

ProChat OS evolves into:

```text
private customer instances + optional ProChat Cloud services + modular workflow agents + managed commercial support
```

The goal is not another narrow SaaS tool.

The goal is the operating layer for agentic workflows.
