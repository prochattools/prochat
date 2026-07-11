# ProChat Homepage Example Data

**Status:** approved sanitized prototype content  
**Purpose:** provide realistic product records for design and implementation without implying real customer data or measured outcomes

All examples in this document are fictional and sanitized. They may be refined for clarity, but their product meaning and claim boundaries must remain intact.

## Hero evidence fragments

### Decision

```yaml
id: evidence-decision-01
type: decision
label: "Decision"
title: "Use stable data attributes for checkout selectors"
source: "QA review"
state: current
```

### Correction

```yaml
id: evidence-correction-01
type: correction
label: "Correction"
title: "The failure occurs only in the EU staging environment"
source: "Investigation note"
state: current
```

### Log evidence

```yaml
id: evidence-log-01
type: log
label: "Test output"
title: "Expected confirmation banner was not found"
code: "locator('[data-testid=confirmation-banner]')"
source: "Playwright run"
state: raw
```

### Approved example

```yaml
id: evidence-example-01
type: example
label: "Approved example"
title: "Checkout test using stable selectors and explicit readiness checks"
source: "Reviewed test"
state: approved
```

### Review note

```yaml
id: evidence-review-01
type: review_note
label: "Review note"
title: "Do not increase the timeout until environment readiness is verified"
source: "Senior QA review"
state: current
```

### Previous failure

```yaml
id: evidence-failure-01
type: failure
label: "Previous failure"
title: "Generated class selector changed after frontend deployment"
source: "Regression investigation"
state: resolved
```

## Hero review outcomes

During the hero sequence:

- `evidence-decision-01` becomes approved memory;
- `evidence-review-01` becomes approved memory;
- `evidence-failure-01` becomes an approved lesson;
- `evidence-correction-01` is edited to add project scope;
- `evidence-log-01` remains raw evidence;
- `evidence-example-01` remains an approved example.

The new task retrieves only the decision, review note, and relevant failure lesson.

## Canonical Memory record example

```yaml
id: mem-qa-selector-stability
record_type: lesson
state: approved
scope: project
title: "Prefer stable data attributes over generated class names"
summary: "When a test interacts with a customer-facing element, prefer an approved data attribute or accessible role over generated CSS classes."
evidence:
  - id: source-test-output
    label: "Failed Playwright run"
  - id: source-dom-inspection
    label: "DOM inspection after frontend deployment"
  - id: source-review-note
    label: "QA review decision"
conditions:
  - "A stable data attribute is available or can be added."
  - "The selector represents user-visible behavior rather than implementation styling."
actions:
  - edit
  - reject
  - retire
last_reviewed: "Example date"
```

## Memory lifecycle content

### Current evidence

```text
The checkout confirmation test failed after a frontend deployment. The generated class name used by the selector changed. The visible element and user flow remained correct.
```

### Draft lesson

```text
Use more stable selectors for checkout tests.
```

### Sanitized and scoped lesson

```text
For this project, prefer approved data attributes or accessible roles over generated CSS classes when selecting customer-facing checkout elements.
```

### Human-review edit

Add:

```text
Do not introduce test-only attributes without product-team approval. Current accessibility roles remain preferable when they identify the intended behavior unambiguously.
```

### Approved memory

Use the canonical Memory record above.

### Relevant retrieval

The record is retrieved when:

```yaml
project: checkout-web
framework: Playwright
failure_category: selector
feature: checkout-confirmation
environment: any
```

### Correction or retirement

Correction example:

```text
The project later standardizes accessible roles for all checkout controls. Update the record so accessible-role selection is preferred and data attributes become the fallback.
```

Retirement example:

```text
Retire the record if the project replaces browser-driven checkout tests with a different validated test strategy.
```

## Evidence-hierarchy conflict example

### Stored memory

```text
The checkout confirmation banner becomes visible within five seconds in staging.
```

### Current evidence

```text
The staging environment now loads confirmation status asynchronously after an external payment callback. Recent traces show a variable delay.
```

### Correct outcome

- current evidence overrides the stored timing assumption;
- the test investigation does not blindly increase the timeout;
- the stored memory receives a review-required state;
- a corrected record is approved only after the new behavior is verified.

## Local-ownership diagram labels

```yaml
product_repository:
  label: "ProChat product"
  examples:
    - application code
    - product documentation
customer_memory_workspace:
  label: "Customer-owned memory workspace"
  examples:
    - approved lessons
    - source references
    - scope metadata
customer_project_repository:
  label: "Customer project"
  examples:
    - tests
    - source code
    - logs
    - project evidence
external_ai_client:
  label: "Compatible AI client"
  boundary_note: "Provider behavior depends on the client and configuration."
```

## Relevant-context workspace

Workspace records:

```yaml
records:
  - id: mem-qa-selector-stability
    relevance: high
  - id: mem-api-rate-limit-retry
    relevance: none
  - id: mem-checkout-environment-readiness
    relevance: high
  - id: mem-mobile-screenshot-threshold
    relevance: low
  - id: mem-test-data-customer-region
    relevance: medium
  - id: mem-login-cookie-expiry
    relevance: none
```

Current task:

```yaml
project: checkout-web
framework: Playwright
feature: checkout-confirmation
environment: eu-staging
failure_category: selector-and-readiness
```

Selected context:

- `mem-qa-selector-stability`
- `mem-checkout-environment-readiness`
- `mem-test-data-customer-region`

The visual must explain why each record was selected.

## QA investigation scenario

### Initial failure

```yaml
test: "customer completes checkout and sees confirmation"
environment: "EU staging"
observed_failure: "confirmation banner not found"
```

### Collected evidence

```yaml
evidence:
  - "Playwright trace"
  - "failure screenshot"
  - "DOM snapshot"
  - "network timing"
  - "environment readiness event"
  - "current selector implementation"
```

### Relevant reviewed memory

- Prefer stable data attributes or accessible roles over generated classes.
- Verify staging readiness before treating a delayed confirmation as a selector failure.
- EU staging uses region-specific test data that may delay the external callback.

### Tested hypotheses

```yaml
hypotheses:
  - id: selector_changed
    result: confirmed
  - id: environment_not_ready
    result: contributed
  - id: application_regression
    result: ruled_out
  - id: invalid_test_data
    result: ruled_out
```

### Root cause

```text
The test used a generated class selector that changed during deployment and began checking before the EU staging callback completed.
```

### Fix

```text
Use the approved stable selector and wait for the explicit readiness event before asserting the confirmation state.
```

### Draft lesson

```text
Checkout confirmation tests should use stable selectors and environment readiness signals.
```

### Approved lesson

```text
For checkout confirmation tests in this project, use the approved stable selector and wait for the environment readiness event before asserting confirmation. Do not compensate for selector or readiness defects by increasing a fixed timeout.
```

### Later reuse

A later related failure retrieves the lesson because the task shares:

- project;
- feature;
- framework;
- environment;
- failure category.

The lesson helps form hypotheses but does not override current evidence.

## Workbench scenario

### Request

```text
Update the homepage design documentation to use the approved global tokens and commit only the relevant documentation files.
```

### Exact context

```yaml
read_paths:
  - DESIGN.md
  - brand-spec.md
  - docs/roadmap.md
  - docs/implementation-plan.md
```

### Guarded change

```yaml
changed_paths:
  - DESIGN.md
  - brand-spec.md
  - docs/roadmap.md
  - docs/implementation-plan.md
unrelated_paths_left_untouched: true
```

### Targeted validation

```yaml
validation:
  - markdown structure
  - canonical links
  - security scan
  - git diff review
result: passed
```

### Explicit Git action

```yaml
staged_paths: "exact changed paths only"
commit_message: "docs(prochat): establish homepage design plan"
force_push: false
```

This example shows control and evidence. It must not imply that Workbench acts without user intent or repository policy.

## Measurement example

```yaml
people: 5
context_rebuilds_per_person_per_day: 2
minutes_per_rebuild: 12
working_days_per_month: 20
calculated_hours_per_month: 40
```

Required label:

```text
Illustrative calculation based on example inputs. Not a measured ProChat result.
```

The after value remains blank until real measurement exists.

## Content-use rules

- Keep labels short enough for product visuals.
- Preserve technically credible detail.
- Do not add company names, personal names, or real client data.
- Do not show a measured success outcome.
- Do not imply automatic approval.
- Do not imply that stored memory overrides current evidence.
- Use the same IDs across storyboard states to preserve continuity.
