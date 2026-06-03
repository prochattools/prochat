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
mind/wiki/organisations/prochat/brand/prochat-os-modules.md
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
Messy business information in. Useful work out.
```

Buyer-facing direction:

```text
ProChat OS helps businesses get repetitive admin, document, intake, reporting, and follow-up work done faster by turning messy information into ready-to-review outputs.
```

Do not lead marketing pages with technical/runtime language such as memory, connectors, model routing, CLI, or installation.

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

Create an implementation roadmap for building ProChat OS as a managed workflow system that turns messy business information into ready-to-review outputs.

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

## Module refinement lane

Status: added from mind refinement on 2026-06-03.

Purpose:

```text
Keep ProChat OS niche-agnostic at the core, but package sellable niche-specific workflow modules around it.
```

Module roadmap:

1. Define module architecture: skills + workflows + schedules + examples + evaluation criteria.
2. Validate one niche module on safe sample data.
3. Add scheduling where recurring work creates obvious value.
4. Add evaluation loops so reviewer feedback improves outputs.
5. Add reproducible environment/setup paths for supportable deployments.

Candidate first modules:

- legal intake
- accounting document intake
- agency lead intake
- consultant proposal/profile preparation
- content operations

Exit criteria:

```text
One niche module produces useful ready-to-review output on safe sample data and can be explained clearly in a landing page or Loom.
```

## Long-term direction

ProChat OS evolves into:

```text
managed workflow systems + niche modules + optional ProChat Cloud services + commercial support
```

The goal is not another narrow SaaS tool.

The goal is to help businesses turn repetitive messy information work into faster, ready-to-review outputs.




## Refinement lane — niche modules, skills, schedules, and evaluation

Status: synchronized from mind on 2026-06-03.

Purpose:

```text
Keep ProChat OS niche-agnostic at the core, but package sellable niche-specific workflow modules around it.
```

This lane clarifies how ProChat OS becomes scalable across niches without turning the core product into a single vertical tool.

### Phase M-1 — Module architecture definition

Goal:

Define how ProChat OS modules are packaged.

Outputs:

- `docs/prochat-os-modules.md`
- module manifest principles
- skill specification principles
- workflow specification principles
- schedule specification principles
- evaluation loop principles

Exit criteria:

- each module can be described as skills + workflows + schedules + examples + evaluation criteria
- docs make clear that customers buy outcomes, not architecture

### Phase M-2 — First niche module validation

Goal:

Validate one vertical module around one clear business workflow.

Candidate modules:

- legal intake
- accounting document intake
- agency lead intake
- consultant proposal/profile preparation
- content operations

Validation tasks:

- define the painful workflow in buyer language
- create safe sample data
- define expected outputs
- define skills
- define workflow steps
- define approval checkpoints
- define evaluation criteria
- test outputs on fake or approved sample data
- use discovery calls to refine the offer

Exit criteria:

```text
One niche module produces useful ready-to-review output on safe sample data and can be explained clearly in a landing page or Loom.
```

### Phase M-3 — Scheduling and recurring work

Goal:

Add recurring workflow concepts to modules where they create obvious value.

Examples:

- daily intake summary
- weekly missing-information checklist
- monthly document follow-up report
- daily lead follow-up draft
- weekly internal status report

Exit criteria:

- at least one module has a schedule definition
- scheduled output still respects human review before important action

### Phase M-4 — Evaluation and feedback loop

Goal:

Make module quality improvable through review.

Each module should define:

- what good output looks like
- how reviewers score usefulness
- how reviewer edits are captured
- how examples/context/skill definitions are improved
- how time saved is estimated

Exit criteria:

```text
A reviewer can compare workflow output across iterations and say whether it became more useful.
```

### Phase M-5 — Reproducible environment and setup path

Goal:

Reduce support overhead for self-hosted, commercial, and managed deployments.

Candidate tools:

- Devbox
- Nix
- containers
- documented managed-server baseline

Exit criteria:

- ProChat OS has a reproducible environment baseline for development and deployment
- setup docs distinguish public buyer language from internal deployment details
- deployment story does not imply ProChat must enter a customer's internal computers or network by default

## Roadmap copy rule

Buyer-facing roadmap output should focus on:

- less admin work
- faster follow-up
- fewer missed details
- ready-to-review outputs
- human approval first
- managed setup where wanted

Technical roadmap output may use internal terms such as runtime, skills, schedules, connectors, Devbox, Nix, CLI, and module manifest when the audience is implementation or support.
