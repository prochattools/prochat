# ProChat Repo Status

Status: current repo alignment note.

Last updated: 2026-05-25

## Source of truth

The `mind` repo is canonical.

ProChat follows:

```text
mind/wiki/organisations/prochat/brand/prochat-os-strategy.md
mind/wiki/organisations/prochat/brand/prochat-os-technical-definition.md
mind/wiki/organisations/prochat/brand/prochat-os-go-to-market.md
mind/wiki/organisations/prochat/brand/prochat-os-roadmap.md
```

When this repo conflicts with `mind`, `mind` wins.

## Strategy status

ProChat OS is the flagship.

BuildFlow, ProKit, SaaSKit, UXKit, and WaaSKit are legacy or secondary/supporting products.

They may remain in the repo and on the website, but they should not be described as the company flagship or main strategy.

## Website status

The ProChat website should lead with ProChat OS:

```text
Agentic workflows between messy inputs and business tools.
```

The public website is business-agnostic.

Law-firm/MikeOSS messaging is a direct outreach wedge, not the main public brand.

## BuildFlow status

BuildFlow is no longer the flagship.

BuildFlow remains a useful secondary project/application for AI project context, repo operations, safe writes, and support workflows.

BuildFlow can inform ProChat OS CLI/runtime/support tooling, but ProChat OS is the leading product strategy.

## Legacy products status

SaaSKit and ProKit remain real legacy/supporting products.

UXKit and WaaSKit remain historical concepts/products whose useful ideas may later become ProChat OS modules or workflows.

## Authentication status

Clerk has been removed from active ProChat runtime code and from the package dependency list.

Current status:

- no active Clerk provider in root layout
- no active Clerk middleware
- middleware is pass-through until Ory runtime protection is implemented
- Ory is the intended authentication direction for ProChat runtime

Important implementation gap:

```text
Ory auth is not yet fully implemented in this repo.
```

Until Ory is fully implemented, protected runtime routes must not assume authentication is enforced by middleware.

## Auth implementation TODO

- define which routes need runtime protection
- implement Ory session validation in middleware or route-level guards
- document Ory env vars in public environment docs
- add smoke tests for protected routes once Ory exists
- update deployment docs once Ory is active

## MikeOSS / law-firm wedge status

MikeOSS is not ProChat OS.

MikeOSS is a law-firm demo/install block:

```text
MikeOSS = legal document AI workspace
ProChat OS = Agentic Workflow OS around and beyond it
```

Demo domains:

```text
legal.prochat.tools
legal-api.prochat.tools
```

Use fake legal data only for the shared demo.
