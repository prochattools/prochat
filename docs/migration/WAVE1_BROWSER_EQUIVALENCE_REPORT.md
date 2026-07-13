# Wave 1 Browser Equivalence and Activation Gate

**Status:** BLOCKED — Packet 4B found no usable browser runner, commit-specific preview pair, or protected-flow credentials  
**Scope:** Wave 1 Packet 3 shell-routing equivalence and first visual activation decision  
**Source commit under review:** `4d12c05` — `refactor(prochat): establish shell routing boundary`  
**Baseline commit required:** `b3739ba` — `docs(prochat): plan canonical shell compatibility`  
**Packet 4B evidence:** `docs/migration/evidence/wave1/packet4b-environment-audit.json`  
**Live source changed by this report:** no

## Decision

```yaml
equivalence_gate: BLOCKED
canonical_visual_activation: NOT_APPROVED
current_canonical_visual_allowlist: []
first_current_route_eligible_for_activation: null
reason: no installed browser runtime, commit-specific target/baseline preview pair, or approved protected-flow credentials are available; no shell defect was identified
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

Packet 4B also audited repository workflows and deployment documentation:

- `.github/workflows/main.yml` builds, pushes a Docker image, and triggers Dokploy, but it has no browser, screenshot, accessibility, trace, or Web Vitals job;
- `.github/workflows/docs-preview.yml` uploads a `.next` artifact for documentation changes, but emits no browser-capable preview URL;
- deployment documentation identifies Dokploy as the production target but documents no commit-specific preview mechanism;
- the public origin `https://prochat.tools` is reachable, currently serves a maintenance surface, and exposes no attributable target or baseline commit provenance;
- no maintenance-disabled URL pinned to `4d12c05` or baseline `b3739ba` was available;
- no approved auth, admin, commerce, purchaser, or licence test credentials or data were supplied.

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

### Wave 1 Packet 4C — browser-verification-environment-provisioning

Packet 4B found no shell defect. The blocker is the absence of an attributable browser environment, baseline/target preview pair, and approved protected-flow inputs. Packet 4C is therefore an environment-and-evidence packet, not a shell repair or activation packet.

Required inputs:

- maintenance-disabled URLs pinned to baseline commit `b3739ba` and target commit `4d12c05`, or one browser-capable runner able to check out and serve both commits under identical conditions;
- a browser runtime capable of viewport screenshots, DOM and accessibility-tree inspection, keyboard/focus automation, reduced-motion emulation, console and network capture, traces, bundle inspection, and Core Web Vitals;
- approved auth, admin, commerce, purchaser, licence, Contact, unsubscribe, analytics, health, and OG test data and credentials supplied through secure mechanisms;
- a recorded browser version, operating system, server commit, environment identity, and test-data boundary.

Allowed repository changes:

```text
docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
docs/migration/evidence/wave1/**
docs/product/agent-mode-progress.md
```

Execution sequence:

1. Prove both served environments are pinned to `b3739ba` and `4d12c05`.
2. Capture the required 15-route matrix at 320, 768, 1024, 1440, and 1728 pixels where applicable.
3. Compare baseline and target screenshots, DOM, landmarks, computed font variables, provider hydration, console output, and network traces under identical conditions.
4. Verify no current route contains `pc-foundation-scope`, the canonical skip link, or canonical font activation.
5. Run keyboard, focus, landmark, reduced-motion, touch-target, and mobile-navigation checks.
6. Run protected auth, admin, application, commerce, purchaser, licence, Contact, unsubscribe, analytics, health, and OG checks.
7. Record route-specific bundles, paint/hydration cost, Core Web Vitals, and any material regression.
8. Update this report with PASS or exact attributable defects.
9. Keep the current canonical visual allowlist empty unless a later explicit activation packet is separately approved.

Acceptance criteria:

- both comparison environments expose attributable commit provenance;
- zero unexplained visual drift;
- no shell-routing console or hydration errors;
- protected flows pass with approved test data;
- accessibility checks pass;
- no material performance regression;
- current canonical visual allowlist remains empty;
- evidence files are complete and attributable to `b3739ba` and `4d12c05`.

Rollback:

No runtime rollback is required because Packet 4C changes only evidence and handoff documentation. If browser evidence identifies a Packet 3 defect, define a separate smallest source repair packet against `4d12c05` before any activation work.




## Wave 1 Packet 4C provisioning result

Packet 4C rechecked the repository and connected environment after commit `377bc91`.

Decision:

```yaml
equivalence_gate: BLOCKED
canonical_visual_activation: NOT_APPROVED
current_canonical_visual_allowlist: []
shell_defect_identified: false
defect_class: external_verification_inputs_unavailable
```

Evidence:

```text
docs/migration/evidence/wave1/packet4c-provisioning-audit.json
```

No browser runtime, browser test script, browser-capable workflow, or preview URL output has appeared. No maintenance-disabled baseline URL pinned to `b3739ba`, target URL pinned to `4d12c05`, approved protected-flow credentials, or approved protected test data was supplied.

Packet 4C therefore could not execute screenshots, DOM inspection, accessibility automation, keyboard/focus checks, reduced-motion checks, mobile navigation, console/network capture, traces, Web Vitals, or protected browser flows.

The existing shell implementation remains unchanged. No source repair is authorized because no attributable shell defect was identified.

### Exact external inputs required before resume

1. A maintenance-disabled URL pinned to baseline commit `b3739ba`.
2. A maintenance-disabled URL pinned to target commit `4d12c05`.
3. Alternatively, an existing browser-capable runner able to check out and serve both commits under identical conditions.
4. Approved protected auth, admin, application, commerce, purchaser, licence, Contact, unsubscribe, analytics, health, and OG credentials or test data supplied through secure mechanisms.

Until those inputs exist, the current canonical visual allowlist remains empty and no activation packet may begin.
