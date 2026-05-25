# ProChat Implementation Plan

Status: executable implementation plan for ProChat OS strategy, website, roadmap, and outreach alignment.

Last updated: 2026-05-24

## Source of truth

Mind is leading over this repo.

Before changing strategy, homepage copy, product pages, roadmap language, or implementation docs, read the current ProChat OS strategy:

```text
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-technical-definition.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

## Purpose

This document turns the ProChat OS strategy into practical implementation tasks that can be executed safely by Codex, Claude, Haiku, or another implementation agent.

The order is intentional:

1. Align strategy docs.
2. Write business-agnostic website/landing page copy.
3. Build the ProChat OS implementation roadmap.
4. Create the law-firm Loom demo script.
5. Create the law-firm outreach list and message sequence.
6. Deploy the MikeOSS Dokploy demo.
7. Move toward managed pilots and ProChat OS v1.

## Safety rules

- Work only in the ProChat repo unless a task explicitly says otherwise.
- Treat the mind ProChat OS strategy as the business source of truth.
- Do not delete legacy documents during alignment.
- Prefer status notes, reframing, and canonical docs before destructive cleanup.
- Never write secrets, env values, credentials, private keys, or raw account data.
- Keep the main website business-agnostic.
- Do not make the ProChat website law-firm-only.
- Do not imply MikeOSS is owned by ProChat.
- Do not rebrand MikeOSS as proprietary ProChat software.
- Keep ProChat runtime auth as Ory-only unless implementation docs/code are deliberately changed later.
- Keep Clerk references only where they clearly refer to sold boilerplate products.
- See `docs/auth-status.md` for the canonical auth state and TODO list.

## Canonical docs for this repo

- `docs/strategy.md`
- `docs/product-operating-map.md`
- `docs/roadmap.md`
- `docs/product-hierarchy-plan.md`
- `docs/prochat-os-landing-page-copy.md`
- `docs/prochat-os-implementation-roadmap.md`
- `docs/repo-status.md`
- `docs/implementation-plan.md`

These docs should be read before website/page changes.

## Phase 0 — Strategy alignment

Status: in progress / nearly complete.

Goal:

Align the ProChat repo with the mind-led ProChat OS strategy.

Tasks:

1. Update `docs/strategy.md` to make ProChat OS the flagship.
2. Update `docs/product-operating-map.md` to stop treating ProChat OS as phased out.
3. Update `docs/roadmap.md` to make website/landing copy the next step.
4. Update `docs/product-hierarchy-plan.md` around ProChat OS-first website hierarchy.
5. Update `README.md` and `docs/overview.md` to point to the current strategy docs.
6. Mark `docs/90-day-execution.md` as historical relative to ProChat OS.

Acceptance criteria:

- ProChat OS is clearly the flagship.
- BuildFlow is no longer the public flagship strategy.
- SaaSKit/ProKit/UXKit/WaaSKit are legacy/supporting.
- MikeOSS is a law-firm wedge only.
- Website work can proceed from clear ProChat OS-first docs.

## Phase 1 — Website / landing page copy

Status: next.

Goal:

Create business-agnostic ProChat OS website and landing page copy.

Allowed output first:

- a copy document or page blueprint before editing production page components

Likely file:

```text
docs/prochat-os-landing-page-copy.md
```

Acceptance criteria:

- leads with ProChat OS, not law firms
- explains Agentic Workflow OS in plain language
- uses “messy inputs → structured outputs/actions”
- explains the private workflow runtime
- explains dashboard/console as command center, not the product
- explains managed install and commercial license path
- explains free personal/non-commercial GitHub direction carefully
- does not lead with MikeOSS
- does not lead with BuildFlow
- does not lead with SaaSKit or kits

## Phase 2 — ProChat OS implementation roadmap

Status: after landing copy.

Goal:

Create the project implementation roadmap for building ProChat OS as an installable runtime.

Likely file:

```text
docs/prochat-os-implementation-roadmap.md
```

Must include the MikeOSS Dokploy checklist as the first demo wedge.

Mind source:

```text
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

Implementation roadmap should include:

- ProChat OS core workflow runtime
- memory/context store
- connector layer
- model router / AI selector
- approval and event log
- control console
- CLI install/support commands
- optional modules
- MikeOSS Dokploy demo
- managed pilot path
- eventual public GitHub/source-available release

Acceptance criteria:

- describes what must be built in code
- separates demo from product runtime
- includes MikeOSS Dokploy demo checklist
- avoids using private mind/brain repos as customer installs
- includes security/trust boundaries

## Phase 3 — Law-firm Loom demo script

Status: after implementation roadmap.

Goal:

Create a 60–90 second Loom script for law-firm outreach.

Likely file:

```text
docs/law-firm-loom-demo-script.md
```

Acceptance criteria:

- uses fake legal/sample data only
- does not claim legal advice
- shows messy legal documents → structured output
- introduces MikeOSS as legal document workspace
- introduces ProChat OS as workflow layer around it
- ends with a discovery question

## Phase 4 — Law-firm outreach list and message sequence

Status: after Loom script.

Goal:

Create the outreach system for local law firms.

Likely file:

```text
docs/law-firm-outreach-sequence.md
```

Deliverables:

- target profile
- list-building criteria
- first message
- follow-up sequence
- discovery call questions
- qualification criteria
- response tracking fields

Acceptance criteria:

- focuses on law firms
- asks about real workflow pain instead of assuming it
- uses the Loom as a conversation starter
- avoids legal advice claims
- sells the demo/managed workflow path, not generic AI

## Phase 5 — MikeOSS Dokploy demo deployment

Status: after outreach assets are ready or in parallel if implementation capacity exists.

Goal:

Deploy the MikeOSS legal demo quickly using the existing Dokploy environment.

Use domains:

```text
legal.prochat.tools      → MikeOSS frontend
legal-api.prochat.tools  → MikeOSS backend
```

Mind checklist:

```text
mind/wiki/organisations/prochat/brand/mikeoss-dokploy-demo-checklist.md
```

Repo helper docs/scripts may be created later in this repo if needed, but the current strategic source is mind.

Acceptance criteria:

- demo loads
- fake matter can be uploaded
- document questions work
- no real client data used
- MikeOSS AGPL notices remain intact
- ProChat is positioned as installer/manager/workflow layer

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
- one workflow only
- human approval first
- structured output
- redacted support logs
- clear success metric

## Phase 7 — ProChat OS v1 runtime

Status: future.

Goal:

Build a productized installable ProChat OS runtime.

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

Publish ProChat OS as a source-available personal/non-commercial project and sell commercial/managed usage.

Deliverables:

- license
- commercial license notice
- trademark policy
- install docs
- architecture docs
- examples
- managed offer page
- support workflow

## Verification expectations

For documentation-only changes:

- read changed files back if needed
- check links and headings manually
- no type-check required unless code changed

For future code changes:

- run type-check/build where available
- validate sitemap and metadata if routes change
- validate mobile layout manually or with a UI reviewer

## Handoff prompt rules

When generating implementation prompts:

- use one task per prompt
- name exact allowed files
- state exact acceptance criteria
- preserve legacy docs unless explicitly asked to delete
- keep mind strategy leading
- keep the public website business-agnostic




## Authentication implementation status — 2026-05-25

See [auth-status.md](./auth-status.md) for the canonical runtime auth state, warnings, and TODOs.
