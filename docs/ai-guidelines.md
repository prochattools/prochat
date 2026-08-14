# AI and automation guidelines

These rules describe how AI-assisted development and internal automation may interact with the current ProChat repository.

## Current product boundary

The canonical public products are Memory, Memory for QA, and Workbench. The public site also exposes Docs, Contact, Privacy, and Terms.

Retired Kits, ProChat OS, AI Workflows, Studio, Proof, Prompts, generated Docs, checkout/licensing, and MailerLite systems are historical only. Do not restore them because older docs or Git history mention them.

BuildFlow may appear only where a technical/internal compatibility identifier is required by Workbench implementation contracts.

## Repository safety

AI-assisted changes must:

- preserve exact operation IDs, source IDs, package names, routes, env names, and persisted contracts unless a separately approved migration changes them;
- read current source before editing;
- keep changes bounded to the requested scope;
- avoid secrets, `.env` files, keys, generated output, vendor code, and `.git/**`;
- stage explicit paths only;
- never force-push;
- validate code/config changes with the smallest meaningful checks;
- keep the canonical public surface stable unless a concrete approved product change requires otherwise.

## Authentication and internal APIs

Ory browser-flow integration is active for sign-in/sign-up.

Runtime Ory session validation for `/admin`, project, Make, and n8n APIs is deliberately deferred. Those internal routes currently fail closed with HTTP 501 or an equivalent misconfigured state.

AI tooling must not bypass that boundary, fabricate identity, trust allowlist env values as authentication, or silently enable those routes. A future implementation must add authenticated Ory session retrieval, authorization checks, tests, and security review before changing fail-closed behavior.

## Public content and data

Do not send contact messages, beta-interest submissions, database contents, secrets, or internal user data to external AI providers unless the product explicitly implements and documents that flow.

The repository no longer contains a direct OpenAI helper for general application use. New model integrations require an explicit product/architecture decision, current provider documentation, environment/privacy review, and bounded source consumers.

## Automation

Internal social automation remains authenticated by `SOCIAL_AUTOMATION_SECRET`.

Make/n8n/project API stubs are not production-ready automation integrations; they are fail-closed placeholders pending authenticated runtime design.

## Documentation discipline

Treat current active docs as authoritative only when they match current source. Historical plans belong under `docs/archive/**` or `docs/migration/**` and must be clearly understood as history.

When a subsystem is retired, remove its active code/config/env guidance rather than keeping speculative compatibility instructions indefinitely.

## Validation expectations

At minimum for meaningful code/config changes:

```bash
npm run typecheck
npm run lint
npm run lint:design
npm run build
```

Add security/browser/documentation checks when the changed surface requires them. Do not weaken tests or create exemptions merely to make validation pass.
