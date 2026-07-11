# ProChat Content Audit

**Status:** canonical audit specification  
**Scope:** public copy, navigation, footer, forms, metadata, social copy, legal language, documentation entry points, and error states

## Purpose

The content audit identifies every active and legacy public statement, determines whether it matches canonical ProChat truth, and assigns a migration action before page implementation.

Copy is not considered safe merely because it is already published or embedded in code.

## Canonical references

```text
Mind company principles
Mind public-platform strategy
Mind product strategy
Mind naming architecture
Mind canonical homepage copy
Mind brand ruleset
PRODUCT.md
DESIGN.md
brand-spec.md
```

## Audit scope

- page headings;
- body copy;
- product descriptions;
- calls to action;
- navigation labels;
- footer labels;
- form labels and help text;
- validation and success messages;
- legal copy;
- privacy language;
- beta descriptions;
- metadata;
- Open Graph and social copy;
- alt text;
- structured data;
- documentation labels;
- 404 and error copy;
- legacy content documents used as sources.

## Required record

```yaml
id: "CONTENT-000"
location:
  route: ""
  path: ""
  component_or_field: ""
content_type: "heading | body | CTA | navigation | footer | form | metadata | legal | docs | error"
current_text: ""
current_claim: ""
canonical_source: ""
product_or_company_scope: "ProChat | Memory | Memory for QA | Workbench | company | legal"
audience: ""
primary_job: ""
status: "CURRENT | STALE | UNSUPPORTED | DUPLICATE | MISSING | LEGACY"
disposition: "KEEP | REWRITE | REPLACE | ARCHIVE | DELETE"
risk:
  product_truth: "LOW"
  legal_or_privacy: "LOW"
  seo: "LOW"
  conversion: "LOW"
replacement_text_or_source: ""
validation: []
owner: ""
notes: ""
```

## Claim categories

Every claim receives one category:

```text
APPROVED_CURRENT
APPROVED_QUALIFIED
BETA_ONLY
FUTURE_POSSIBILITY
UNVERIFIED
PROHIBITED
LEGAL_REVIEW_REQUIRED
```

### Approved current

Supported by current product behavior and canonical documentation.

### Approved qualified

True only with explicit scope or boundary language.

Example:

```text
Customer memory remains on the customer’s computer in the current product model.
```

### Beta only

True for selected beta use but not broad commercial availability.

### Future possibility

May appear only in clearly labeled roadmap or future-capability context.

### Unverified

Requires measurement, product evidence, legal review, or technical verification.

### Prohibited

Must not appear publicly.

Examples:

- guaranteed savings;
- zero hallucinations;
- automatic trusted memory;
- universal compatibility;
- undocumented encryption;
- blanket private or no-data-leaves-device claims;
- finalized pricing or support not yet approved;
- future interfaces presented as current products.

## Page second-pass checklist

### Homepage

- ProChat is the company.
- Memory is the flagship.
- Memory for QA is the current edition and primary conversion path.
- Workbench is the second product.
- Company philosophy is understandable before deep architecture.
- CTA hierarchy is unambiguous.
- Footer and navigation reflect the public-platform architecture.

### ProChat Memory

- General product model is clear.
- Broad availability is not overstated.
- Trust lifecycle is accurate.
- Local ownership language is qualified.
- Relevant retrieval is explainable.
- QA availability is explicit.

### Memory for QA

- QA vocabulary is specific and credible.
- Investigation does not become automatic diagnosis.
- Current evidence remains primary.
- Beta qualification is clear.
- No customer result is fabricated.

### Workbench

- Workbench is not portrayed as autonomous.
- Exact context, guarded operations, validation, and Git boundaries are explicit.
- BuildFlow remains a compatibility identifier where technically required, not a public product.
- Current availability is accurate.

### Philosophy and About

- Company principles are not reduced to marketing slogans.
- Steve is presented as QA Engineer and Founder.
- The website is not a freelancer portfolio.
- Company size is not overstated.

### Contact and beta forms

- Ask only necessary data.
- Explain purpose and follow-up.
- Separate beta, Workbench, partnership, and general contact paths.
- Privacy notice is accessible.
- Success and error states are written.

### Privacy and Terms

- Effective and last-updated dates exist.
- Website data is distinguished from local customer memory.
- External provider boundaries are accurate.
- Beta and future commercial terms are not conflated.
- Legal review status is explicit.

### Documentation and errors

- Only current product directions are prominent.
- Version or beta status is visible.
- Legacy docs are archived or clearly labeled.
- Error pages route to current destinations.

## Metadata audit

For each public route, record:

```yaml
metadata:
  title: ""
  description: ""
  canonical_url: ""
  open_graph_title: ""
  open_graph_description: ""
  open_graph_image: ""
  robots: "index | noindex"
  sitemap: true
  structured_data: []
```

Validate title uniqueness, description truth, route status, image consistency, and social preview quality.

## Terminology audit

Search for and classify:

- ProChat OS;
- ProChat Answers;
- ProChat Automations;
- BuildFlow as a public product;
- SaaSKit;
- ProKit;
- UXKit;
- WaaSKit;
- MikeOSS;
- law-firm wedge language;
- old pricing or licensing language;
- old font, color, and theme descriptions;
- old security and privacy claims.

Not every occurrence must be removed. Historical or technical references may remain when clearly scoped.

## Audit output

The completed audit must produce:

- route-by-route content inventory;
- page copy decision status;
- claims register;
- terminology replacement map;
- navigation and footer copy;
- form microcopy;
- metadata matrix;
- legal review list;
- archive list;
- exact rewrite tasks in the implementation plan.

## Validation

- canonical-source comparison;
- unsupported-claim search;
- product-name search;
- route and metadata review;
- legal and privacy review;
- accessibility review for labels and instructions;
- five-second comprehension testing;
- CTA destination testing.
