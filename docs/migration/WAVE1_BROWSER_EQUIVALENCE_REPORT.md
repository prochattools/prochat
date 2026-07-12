# Wave 1 Browser Equivalence and Activation Gate

**Status:** BLOCKED — browser-capable verification unavailable in the connected repository environment  
**Scope:** Wave 1 Packet 3 shell-routing equivalence and first visual activation decision  
**Source commit under review:** `4d12c05` — `refactor(prochat): establish shell routing boundary`  
**Live source changed by this report:** no

## Decision

```yaml
equivalence_gate: BLOCKED
canonical_visual_activation: NOT_APPROVED
current_canonical_visual_allowlist: []
first_current_route_eligible_for_activation: null
reason: no installed browser runtime or automation package is available, and package installation is prohibited
```

Packet 3 passed static, type, build, route-parity, foundation, archive, and security validation. It cannot receive the required browser-equivalence approval without screenshots, DOM inspection, keyboard/focus testing, hydration inspection, protected-flow execution, and performance traces from a browser-capable environment.

No current route may enter the canonical visual shell until the external browser-verification packet below passes.

## Browser environment inspection

Repository-installed browser automation packages were checked directly under `node_modules`.

```yaml
installed:
  @playwright/test: false
  playwright: false
  playwright-core: false
  puppeteer: false
  puppeteer-core: false
  cypress: false
  selenium-webdriver: false
  @axe-core/playwright: false
```

`package.json` contains no browser-test or accessibility-test script. No dependency or lockfile change was permitted by Packet 4.

The connected Workbench command environment also cannot provide cross-command browser access to a persisted local server: persisted validation jobs run in isolated network namespaces. During Packet 3, both production and maintenance-disabled development servers started successfully, but separate commands could not connect to those ports.

Therefore the following required operations were not available:

- browser launch;
- viewport control;
- screenshot capture;
- DOM and accessibility-tree inspection;
- keyboard and focus automation;
- reduced-motion emulation;
- client hydration and console inspection;
- protected authenticated browser flows;
- Web Vitals and trace capture.

## Evidence retained from Packet 3

The following non-browser evidence remains valid:

```yaml
route_records: 84
shell_classes:
  canonical_public_shell: 9
  protected_internal_shell: 16
  temporary_legacy_compatibility: 24
  no_shared_shell: 35
current_canonical_visual_allowlist: 0
static_pages_generated: 106
typescript: passed
production_build: passed
shell_manifest_parity: passed
canonical_foundation_validation: passed
archive_boundary_validation: passed
security_scan: zero findings
```

Static output-equivalence assertions prove that:

- `LegacyCompatibilityShell` contains the previous AppChrome backdrop, Header, AppShell, and wrapper markers;
- `ProtectedInternalShell` delegates to the exact legacy compatibility shell;
- `NoSharedShell` preserves the previous docs wrapper and contains no Header or AppShell;
- `CanonicalPublicShell` remains behind an empty current allowlist;
- no current route imports or activates the canonical foundation or font modules;
- root layout, Header, Footer, AppShell, globals, Tailwind, pages, metadata, redirects, APIs, assets, packages, lockfile, and archive content remained unchanged.

These checks reduce risk but do not substitute for browser evidence.

## Required route and viewport evidence

No screenshot was captured in this environment. Every required cell remains pending external browser verification.

| Route | 320 | 768 | 1024 | 1440 | 1728 | Required checks |
|---|---:|---:|---:|---:|---:|---|
| `/` | pending | pending | pending | pending | pending | legacy output, Header, Footer, backdrop, no canonical scope |
| `/contact` | pending | pending | pending | pending | pending | form layout, focus, metadata warning, no canonical scope |
| `/privacy` | pending | pending | pending | pending | pending | legacy output and typography |
| `/docs` | pending | pending | pending | pending | pending | no public chrome, docs wrapper, landmarks |
| `/prochat-memory` | pending | pending | pending | pending | pending | legacy Memory output and motion |
| `/buildflow` | pending | pending | pending | pending | pending | temporary legacy classification, no canonical product activation |
| `/admin/licenses` | pending | pending | pending | pending | pending | protected shell, auth/admin behavior |
| `/dashboard` | pending | pending | pending | pending | pending | protected shell and application providers |
| `/chat/[projectID]` | pending | pending | pending | pending | pending | noindex, protected shell, project/chat behavior |
| `/sign-in` | pending | pending | pending | pending | pending | auth redirect/render and provider ownership |
| `/processing-page` | pending | pending | pending | pending | pending | protected transaction flow |
| `/maintenance` | pending | pending | pending | pending | pending | no unsafe public activation |
| `/unsubscribe` | pending | pending | pending | pending | pending | required communication control |
| `/api/health` | n/a | n/a | n/a | n/a | n/a | HTTP status and body contract |
| `/og` | pending | pending | pending | pending | pending | OG route behavior and no public chrome |

## Visual-equivalence result

```yaml
result: BLOCKED
unexplained_visual_drift: unknown
reason: no browser screenshots or rendered-DOM comparison available
```

Static source comparison supports expected equivalence, but visual parity is not approved.

## Accessibility result

```yaml
result: BLOCKED
```

Pending browser evidence:

- exactly one main landmark on representative pages;
- no duplicate landmarks;
- no regression in existing focus order;
- visible focus indicators;
- keyboard operation of Header and mobile navigation;
- reduced-motion behavior;
- touch target sizing;
- route-local status messaging;
- no canonical skip link rendered on current routes;
- controlled future canonical fixture renders the skip link and stable `#main-content` target.

The canonical skip-link contract exists statically in `CanonicalPublicShell`, but the current allowlist is empty, so it cannot be exercised on a live current route.

## Protected-flow result

```yaml
result: BLOCKED_FOR_BROWSER_EXECUTION
static_boundary_result: passed
```

The protected shell and provider boundaries compile and build successfully. Browser execution remains pending for:

- sign in and sign up;
- admin licence access and revocation;
- dashboard, project, chat, and preferences;
- purchaser claim and finish routes;
- checkout, portal, processing, success, and webhook-related UI;
- Contact submission;
- unsubscribe;
- analytics diagnostics;
- health and OG responses.

No protected source was changed by Packet 4.

## Performance result

```yaml
result: BLOCKED_FOR_BROWSER_MEASUREMENT
build_result: passed
```

Pending measurements:

- Core Web Vitals;
- route-specific client bundle and hydration cost;
- provider hydration by shell class;
- Header and AppChrome client cost;
- font and preload requests;
- decorative background paint cost;
- reduced-motion rendering;
- protected-route loading behavior.

The production build generated all 106 static pages, but build success does not provide runtime Web Vitals or browser trace evidence.

## Activation decision

No current route is approved for canonical visual activation.

```yaml
current_allowlist_change: none
packet_5_visual_activation: blocked
safe_next_step: external browser-equivalence verification only
```

The homepage is not selected as the first activation route because its canonical static design has not yet passed the design-lab phase. Contact, Privacy, and Terms also remain gated by their page, form, legal, and content waves.

## Smallest next packet

### Wave 1 Packet 4B — external-browser-equivalence-verification

This is an evidence-only continuation, not a repair or activation packet.

Required environment:

- a browser-capable runner already available outside this repository session, or separately approved installation of browser tooling;
- access to a maintenance-disabled local or preview deployment;
- any credentials and test data required for protected flows, supplied through approved secure mechanisms;
- ability to capture screenshots, console logs, accessibility results, network traces, and Web Vitals.

Allowed repository changes:

```text
docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
docs/migration/evidence/wave1/**
docs/product/agent-mode-progress.md
```

Execution sequence:

1. Record browser, version, operating system, server commit, environment, and test-data boundary.
2. Capture the required 15-route evidence matrix at all required applicable viewports.
3. Compare representative current-route screenshots against a pre-`4d12c05` baseline or render both commits under identical conditions.
4. Verify that current routes contain no `pc-foundation-scope`, canonical skip link, or canonical font variables.
5. Run keyboard, focus, landmark, reduced-motion, and mobile-navigation checks.
6. Run protected auth, admin, application, commerce, purchaser, Contact, unsubscribe, analytics, health, and OG smoke checks.
7. Record provider hydration, console errors, network requests, bundles, and Web Vitals.
8. Update this report with PASS or exact defects.
9. Keep the current canonical allowlist empty unless a later explicit activation packet is approved.

Acceptance criteria:

- zero unexplained visual drift;
- no console or hydration errors caused by shell routing;
- protected flows pass;
- accessibility checks pass;
- no material performance regression;
- current canonical visual allowlist remains empty;
- evidence files are complete and attributable to commit `4d12c05`.

Rollback:

No runtime rollback is required for this evidence-only packet. If Packet 3 defects are found, define a separate smallest repair packet against `4d12c05`.
