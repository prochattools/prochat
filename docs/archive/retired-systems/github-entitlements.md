# GitHub Entitlements

This document describes the GitHub App-based access flow implemented in ProChat for kit purchases.

## Purpose

ProChat uses GitHub repository access as part of the fulfillment flow for purchased kits.

The implementation currently supports:

- `prokit`
- `saaskit`

Each product slug maps to a target GitHub repository in [github.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/lib/store/github.ts).

## Core flow

The entitlement flow is split across Stripe session metadata and GitHub collaborator provisioning.

High-level sequence:

1. a user completes checkout for a kit
2. the purchase is associated with a product slug in Stripe metadata
3. the finish page asks for a GitHub username
4. the claim route verifies the purchase state
5. ProChat calls the GitHub App integration to add the user as a collaborator
6. Stripe metadata is updated to mark the session as provisioned

## Main implementation points

### GitHub App integration

The GitHub-side provisioning logic lives in:

- [github.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/lib/store/github.ts)

Current behavior includes:

- creating a GitHub App JWT
- exchanging installation access tokens
- discovering repository installation IDs when necessary
- inviting or reusing collaborators on the product repositories

### Claim route

The fulfillment endpoint lives in:

- [handle-kit-claim.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/store/_lib/handle-kit-claim.ts)

Product-specific entry routes exist for:

- `src/app/api/store/prokit/claim/route.ts`
- `src/app/api/store/saaskit/claim/route.ts`

Current claim behavior:

- accepts a checkout session ID or checkout email
- parses and validates the GitHub username
- verifies Stripe purchase state
- handles already-provisioned sessions safely
- calls `addCollaborator(productSlug, githubUsername)`
- marks the Stripe session as provisioned after a successful GitHub operation

### Finish UI

The user-facing handoff is implemented in:

- [KitAccessFinishClient.tsx](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/kits/_components/KitAccessFinishClient.tsx)

That UI:

- reads `session_id` from the finish page URL
- submits the GitHub username to the claim endpoint
- supports email fallback when the session cannot be resolved directly

## Stripe interaction

Stripe purchase tracking is implemented in:

- [stripe.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/lib/store/stripe.ts)

Current behavior includes:

- resolving product configuration by `productSlug`
- reading and updating session metadata
- reading and updating customer metadata
- marking sessions as paid
- marking sessions as provisioned
- recovering the latest paid unprovisioned session by email

The entitlement state is therefore spread across:

- GitHub collaborator state
- Stripe session metadata
- Stripe customer metadata

## Required environment variables

The env contract lives in [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md).

GitHub App-specific values:

- `GITHUB_APP_ID`
- `GITHUB_APP_PRIVATE_KEY_BASE64`
- `GITHUB_APP_INSTALLATION_ID`

Stripe values are also required because entitlement checks depend on checkout session inspection and metadata updates.

## Operator-facing caveats

- the configured GitHub App installation must have access to the target repositories
- the GitHub username must be valid and resolvable by the GitHub API
- collaborator provisioning is product-specific; unsupported product slugs are rejected by the implementation
- a successful payment does not finish the entitlement flow by itself; the GitHub claim step still needs to complete
- if GitHub provisioning fails, the claim route returns an operator-facing error path instead of marking the session provisioned

## Non-goals

This doc should not be read as a generic entitlement framework. It documents the current GitHub repository access flow implemented for kit purchases in this repo.

## Related references

- [integrations.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/integrations.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [production-lifecycle.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/production-lifecycle.md)
