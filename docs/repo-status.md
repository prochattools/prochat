# Repository status

Status: lean public release deployed; final repository hygiene/hardening pass in progress.

Last consolidated: 2026-08-13.

## Public product surface

Current canonical routes:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

Memory, Memory for QA, and Workbench are the active product identities. BuildFlow remains only where a technical/internal compatibility identifier is required by Workbench contracts.

## Retired runtime surfaces

The following are not active public products or runtime systems:

- ProChat OS
- SaaSKit, ProKit, UXKit, WaaSKit
- AI Workflows / Legal AI Workflows
- Studio, Proof, Prompts, Learn, Production Guide
- generated Docs/Nextra and dynamic legacy Blog content
- Stripe checkout/webhook/subscription/portal runtime
- application licence administration/provisioning
- MailerLite funnel integration
- GitHub purchaser entitlement provisioning
- WordPress/FluentCRM inside this Next.js repository

Historical evidence remains under `docs/archive/**`, `docs/migration/**`, and Git history.

## Active runtime capabilities

- canonical public marketing/product/legal pages
- Contact API
- beta-interest/waitlist API and compatibility alias
- Umami analytics
- Resend-backed Contact/beta-interest email when configured
- tenant/database scripts and Prisma runtime
- shared sign-in/sign-up UI using Ory browser flows
- internal social automation protected by `SOCIAL_AUTOMATION_SECRET`

## Deferred internal functionality

Runtime Ory session validation is not implemented for `/admin`, project, Make, and n8n APIs. Those capabilities intentionally fail closed with 501/misconfigured responses.

This is an explicit deferred-hardening decision and does not block the canonical public website.

## Environment contract

The active environment contract is defined by:

- `.env.example`
- `docs-public/environment.md`

Do not reintroduce retired Stripe/GitHub/MailerLite/Strapi/Make/n8n/generated-Docs credentials without a separately approved runtime consumer.

## Validation baseline

The lean release has previously passed production build, TypeScript, ESLint, design lint, security tests, canonical browser/accessibility evidence, deployment SHA verification, desktop/mobile production route checks, compatibility redirects, and retired-route checks.

The final hygiene batch must rerun the relevant validation before commit/push because source/docs changed again.

## Current hygiene scope

- remove verified orphan helpers;
- archive retired-system docs that were still in active locations;
- align active documentation with code;
- explicitly document the deferred Ory boundary;
- remove ignored browser artifacts where possible;
- verify branch cleanup with evidence before deletion;
- validate, commit, push, and require a clean worktree.
