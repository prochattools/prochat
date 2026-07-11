# ProChat Route Audit

**Status:** canonical audit specification  
**Scope:** App Router routes, redirects, navigation, sitemap, robots, metadata, forms, documentation entry points, and error handling

## Purpose

The route audit maps every current and historical public route to one canonical page responsibility. It prevents duplicate product pages, dead navigation, stale SEO exposure, and accidental deletion without a redirect decision.

## Canonical public responsibilities

```text
/
/memory
/memory/qa
/workbench
/philosophy
/about
/contact
/privacy
/terms
documentation entry
404 and error states
```

Actual route paths may differ temporarily for compatibility. Every active route must still map to one responsibility.

## Required record

```yaml
id: "ROUTE-000"
path: ""
source_files: []
route_group: ""
public: true
indexable: true
current_title: ""
current_purpose: ""
canonical_responsibility: ""
primary_audience: ""
primary_cta: ""
status: "CURRENT | DUPLICATE | LEGACY | INTERNAL | EXPERIMENTAL | MISSING"
disposition: "KEEP | REFACTOR | REWRITE | REDIRECT | ARCHIVE | DELETE"
canonical_destination: ""
redirect:
  required: false
  status_code: null
  destination: null
navigation:
  header: false
  footer: false
  internal_links: []
seo:
  canonical_url: ""
  sitemap: false
  robots: "index | noindex"
  structured_data: []
analytics_events: []
forms_or_actions: []
auth_or_data_dependencies: []
accessibility_risk: ""
performance_risk: ""
legal_or_privacy_risk: ""
validation: []
rollback: ""
owner: ""
notes: ""
```

## Inventory method

Audit:

- `src/app/**/page.*`;
- route groups;
- layouts;
- loading and error files;
- API routes related to public forms;
- redirects and rewrites;
- navigation helpers;
- sitemap and robots generation;
- metadata exports;
- footer links;
- documentation links;
- public assets that imply routes;
- external links from canonical documents.

## Initial known route groups to inspect

```text
src/app/(marketing)/
src/app/prochat-memory/
src/app/qa-memory/
src/app/buildflow/
src/app/systems/prochat-os/
src/app/kits/
src/app/contact/
src/app/privacy/
src/app/terms/
src/app/docs/ or documentation equivalents
```

These are candidates, not approved destinations or deletions.

## Route decisions

### Keep

The route owns a canonical responsibility and can be brought into the new platform without confusing compatibility or SEO.

### Rewrite in place

Use when the route has established value and the URL remains suitable, but content and implementation must change.

### Redirect

Use when a legacy public URL has discoverability, inbound links, bookmarks, or SEO value but should no longer render a separate page.

Preferred behavior:

- permanent redirect only when the destination is stable;
- temporary redirect while migration remains reversible;
- preserve relevant query parameters only when safe and useful;
- avoid redirect chains;
- test external and internal links.

### Archive or noindex

Use for historical or experimental material that must remain accessible to maintainers but should not appear as a current public product.

### Delete

Only after link, consumer, sitemap, analytics, legal, and redirect review.

## Navigation audit

Header requirements:

```text
Memory
Memory for QA
Workbench
Philosophy
Documentation
```

Footer requirements:

- company statement;
- products;
- company pages;
- resources;
- legal;
- contact and approved social channels.

Audit every link for:

- destination;
- label accuracy;
- current/future status;
- keyboard behavior;
- mobile behavior;
- analytics event;
- external-link indication where relevant.

## Error and loading states

Audit:

- global not-found;
- nested not-found;
- route error boundaries;
- form and API errors;
- loading UI;
- maintenance or unavailable states;
- stale links to removed products.

Every state must preserve company tone and a path back to a current product or company page.

## Validation

- enumerate route tree;
- build production route manifest;
- crawl internal links;
- verify redirect status and destination;
- verify canonical URLs;
- inspect sitemap and robots output;
- test navigation on mobile and keyboard;
- verify 404 and error states;
- verify analytics event names;
- confirm no legacy product remains publicly discoverable as current.

## Completion criteria

- every route has a canonical responsibility or approved retirement action;
- no duplicate flagship, QA, or Workbench page remains unexplained;
- redirects contain no chains or loops;
- navigation, footer, sitemap, and metadata agree;
- documentation and legal routes remain reachable;
- all deletions have approved rollback and validation evidence.
