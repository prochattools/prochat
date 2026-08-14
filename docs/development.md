# Development workflow

This repository now serves a lean public ProChat site plus a small set of internal/admin/API capabilities. Development guidance should follow the current code, not retired Kits, Stripe, MailerLite, generated Docs, or old product workflows.

## Runtime

- Node.js 20
- npm/package-lock
- Next.js App Router
- PostgreSQL/Prisma for tenant and waitlist data workflows

## Daily commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run lint:design
npm run build
```

`npm run build` is the authoritative production compile/type/static-generation check.

## Canonical public surface

The active public website is exactly:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

Compatibility aliases may redirect into those routes, but new public work should not add legacy product bodies or duplicate canonical content.

## Documentation workflow

Internal repository documentation lives under `docs/` and `docs-public/`. The active public `/docs` page is a lean repository hub for Memory for QA and Workbench.

The former Nextra/generated `src/content/docs` + `scripts/docs` pipeline is retired.

For documentation changes run:

```bash
node scripts/check-env-docs.js
node scripts/check-doc-links.js
```

## Browser evidence

Canonical UI changes should be checked through the maintained Playwright evidence suite. Start a local production build deliberately with maintenance mode disabled, set `WAVE1_BASE_URL`, then run the evidence scripts defined in `package.json`/`REPO_OPERATIONS.md`.

Do not commit Playwright report or test-result output.

## Security/API development

Active Contact and beta-interest routes remain production APIs. Security tests cover honeypots, rate limits, compatibility behavior, and fail-closed internal APIs.

Runtime Ory session validation for `/admin`, projects, Make, and n8n routes is deferred. These capabilities intentionally return 501/misconfigured responses rather than guessing at identity. Preserve that fail-closed posture until authenticated Ory session retrieval is implemented and tested.

## Database work

Database commands can be destructive. Use `DATABASE_URL`, `SYSTEM_DATABASE_URL`, and `SHADOW_DATABASE_URL` only in the documented workflows. Do not run cleanup/migration commands against production without explicit owner approval.

The Prisma schema still contains some legacy compatibility/history models even when the corresponding application runtime has been retired. Do not revive retired public commerce simply because a historical model exists.

## Environment changes

When adding/removing a real runtime environment variable, update both:

- `.env.example`
- `docs-public/environment.md`

Then run `node scripts/check-env-docs.js`.
