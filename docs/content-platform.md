# ProChat Public Content Platform

This document describes the current root-domain public content and SEO contract.

## Canonical public routes

The active canonical public surface is intentionally small:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

The root sitemap emits only those eight routes.

## Documentation

The active `/docs` route is a repository-oriented hub for Memory for QA and Workbench. It links readers to repository documentation, issues, and beta/contact paths.

The former generated public documentation system is retired. In particular:

- `src/content/docs` has no active tracked content
- `scripts/docs` has no active tracked implementation
- Nextra and the dynamic Docs route are removed
- Learn, Production Guide, Starting Point documentation, and the public Prompt library are retired

Do not regenerate or restore those systems as part of normal documentation work. Historical implementation details remain available in Git history.

## Content rendering

Current canonical pages are implemented directly as Next.js routes and shared React components. There is no active generic MDX content engine for public Blog, Learn, Prompt, or generated Docs pages.

The compatibility `/blog` entrypoint redirects to `/docs`; dynamic Blog article rendering is retired.

## SEO and discovery

Current SEO behavior is deliberately bounded:

- `src/app/sitemap.ts` emits exactly the eight canonical public routes
- `src/app/robots.ts` allows public indexing while disallowing API, admin, authentication, chat, preferences, and other private/internal paths
- compatibility aliases redirect into canonical public routes rather than publishing duplicate bodies
- retired product/content routes are not emitted by the sitemap

Structured data and page metadata should describe only active Memory, Memory for QA, Workbench, Docs, Contact, and legal surfaces.

## Compatibility boundaries

Some historical URLs remain only as redirect compatibility, including BuildFlow / ProChat OS aliases to Workbench, Learn aliases to Docs, legal aliases to the current Privacy/Terms pages, and waitlist aliases into the Memory for QA beta contact flow.

Compatibility routes must not restore retired product bodies or duplicate canonical content.

## Validation

For public content/SEO changes, run the repository code/config validation chain documented in `REPO_OPERATIONS.md` and the canonical browser evidence suite against a maintenance-off local production build.

## External infrastructure boundary

WordPress/FluentCRM is not part of this Next.js content platform. Any live `prochat.tools/wp-admin` or FluentCRM surface must be retired at its separate hosting/routing origin.
