# PPF-001 Browser-Runner and Shell Decision

**Packet:** PPF-001  
**SourceId:** `prochat`  
**Decision date:** 2026-07-14  
**Repository state:** docs-only reconciliation; no production source changed

## Verified Git state

- Current HEAD: `15e4d8b8ff3a15cbceab0859478b274ebf534417`
- Reconciliation commit exists: `039d3bf0ae31072be1cd5300c5e1dbb4fd2f3a5b` — `docs(prochat): record ppf-001 handoff state`
- Pre-reconciliation docs commit still exists: `806ce4398b8065dfc004ed3bc3248a7bb711a746`
- Working tree status at review time: tracked docs reconciliation changes were present, plus the isolated browser-runner artifacts listed below
- Unrelated tracked worktree changes: none

The `039d3bf` commit changed only:

- `docs/implementation-plan.md`
- `docs/product/agent-mode-progress.md`
- `docs/roadmap.md`

## Active Workbench run

- Run ID: `agent-c41afa81-19f4-415c-bbc6-66731c135a78`
- SourceId: `prochat`
- Status: `running`
- Completed packets: `0`
- Active task: `task-1-requirements-roadmap`
- Current queue status: PPF-001 remains the current READY packet; PPF-002 is not promoted

## Browser-runner artifact inventory

Untracked and intentionally isolated:

- `.github/workflows/wave1-browser-equivalence.yml`
- `tests/evidence/playwright.wave1.config.ts`
- `tests/evidence/wave1-shell-equivalence.spec.ts`
- `tests/evidence/validate-wave1-browser-runner.mjs`

No production source was changed while reviewing them.

## Workflow safety review

The workflow is structurally bounded and does not request repository writes:

- `workflow_dispatch` only
- explicit baseline and target refs
- no `push`, deployment, or repository write step
- no force operations
- no production database use
- no migration against production
- transient Playwright install only
- package.json and lockfiles remain unchanged
- GitHub Environment boundary: `wave1-browser-verification`
- no auth secrets or storage-state inputs are required
- baseline and target are served independently
- maintenance mode is disabled only inside the runner
- dummy Stripe and email values are CI-only
- network use is limited to dependency and browser installation plus local service access
- the workflow cannot accidentally publish or deploy by itself

Safety conclusion: the runner bundle is merge-ready but still requires explicit approval before commit.

## Test completeness review

The current workflow/spec pair is directionally correct and now validates:

- 15 route targets
- 5 viewports
- baseline screenshot capture
- target comparison
- canonical scope absence
- canonical skip-link absence
- canonical font-variable absence
- main-landmark assertions
- console errors
- request failures
- reduced-motion mode
- keyboard focus capture
- browser version capture in the attached proof payload
- resolved commit provenance capture in the attached proof payload
- mobile navigation interaction on the home route at mobile width, including aria-expanded, href, and overflow checks
- route classification into public unauthenticated surface categories only
- request-policy classification for first-party versus external requests
- explicit skip record for the chat project route
- no chat project input support is required
- health endpoint
- OG endpoint
- trace/report output in the workflow
- a static validator for workflow/spec alignment

Remaining gap:

- no browser-run evidence was produced in this packet

Completeness conclusion: harness coverage is materially improved, but final proof still requires execution in the approved browser environment.

## Artifact disposition

Decision: `KEEP_ISOLATED_BLOCKED`

Reasons:

- the workflow is security-bounded and does not mutate the repository
- the spec and validator are structurally coherent
- browser proof was not produced in this packet
- the artifacts are still untracked and should not be merged into the repository yet

Exact required changes before any later commit:

- obtain approval to commit the protected workflow package
- rerun validation under the approved browser environment

Security impact:

- low if isolated
- medium to high if committed without approval, because the workflow is now intended for public and unauthenticated surfaces only

Privacy impact:

- traces and artifact outputs are limited to public and unauthenticated data
- no raw credential payloads should ever be committed

Final packet state:

```yaml
runner_disposition: MERGE_READY_REQUIRES_APPROVAL
static_validation: PASSED
live_execution: NOT_RUN
protected_session_strategy: PUBLIC_AND_UNAUTHENTICATED_ONLY
shell_contract: DECIDED_WITH_FUTURE_REPAIR
PPF-001: BLOCKED
PPF-001_blocker: explicit approval to commit protected workflow package
PPF-002: NOT_READY
```

Operational prerequisites:

- browser-capable runner
- approved GitHub Environment access
- attributable baseline and target provenance

Approval required:

- no commit approval was requested for this packet
- later browser execution still requires the protected environment boundary and its approval path

Rollback:

- leave the four runner artifacts untracked
- revert the docs-only decision commit if this reconciliation must be undone

## Shell-contract matrix

The no-shared-shell classification is a manifest contract, but the current runtime behavior is mixed:

| Bucket | Route IDs | Paths | AppChrome executes now? | Expected shell | Current runtime shell | Equivalence intentional? | Browser evidence required? | Decision | Future repair |
|---|---|---|---|---|---|---|---|---|---|
| Docs renderables | ROUTE-007, ROUTE-008 | `/docs`, `/docs/[category]/[[...slug]]` | yes | `NoSharedShell` | `NoSharedShell` on docs paths | yes | yes | keep isolated blocked | none for docs shell itself |
| Framework error surfaces | ROUTE-009, ROUTE-010, ROUTE-011 | global 404, global error, docs 404 | yes | no shared shell | legacy fallback for non-docs paths; docs path may use `NoSharedShell` | no | yes | keep isolated blocked | later AppChrome repair required |
| Renderable utility pages | ROUTE-056, ROUTE-058 | `/maintenance`, `/unsubscribe` | yes | no shared shell | `LegacyCompatibilityShell` | no, only compatibility | yes | keep isolated blocked | later AppChrome repair required |
| Redirect-only aliases | ROUTE-031, ROUTE-038, ROUTE-043, ROUTE-044 | `/waiting-list`, `/blog`, `/privacy-policy`, `/tos` | no, redirect short-circuits | no shared shell | none at runtime when redirect executes | yes for redirect outcome | no for shell; yes for redirect verification | keep isolated blocked | redirect packet only |
| Route handlers and APIs | ROUTE-059–ROUTE-081 except OG | contact, health, preferences, projects, subscription, Stripe, claims, waitlist, MailerLite, Make, n8n, social, go | no | no shared shell | none | n/a | no for shell; yes for handler verification | keep isolated blocked | separate handler/internal packet |
| Metadata and OG endpoints | ROUTE-082, ROUTE-083 | `/og`, `/blog/[slug]/og` | no | no shared shell | none | n/a | no for shell; yes for metadata verification | keep isolated blocked | later OG migration packet |

## AppChrome repair decision

Decision: future repair required.

Rationale:

- `AppChrome` currently special-cases only docs paths for `NoSharedShell`
- all other `no_shared_shell` page routes fall back to `LegacyCompatibilityShell`
- that fallback is acceptable as temporary compatibility for this packet, but it is not the final shell contract for canonical activation
- no source change is authorized in PPF-001

The exact current condition remains:

```tsx
if (shellClass === 'no_shared_shell' && isCurrentDocsShellPath(pathname)) {
  return <NoSharedShell>{children}</NoSharedShell>
}

return <LegacyCompatibilityShell>{children}</LegacyCompatibilityShell>
```

## Browser-proof dependency

Browser proof remains a separate packet.

Required for the later packet:

- browser-capable runner
- attributable commit provenance for baseline and target
- approved protected-flow storage state
- explicit browser-version capture
- explicit screenshots, DOM checks, focus checks, and traces

This packet does not attempt that proof.

## Exact next tasks

1. Keep the browser-runner artifacts isolated and untracked.
2. Retain PPF-001 as the current READY packet.
3. Keep PPF-002 as NOT_READY.
4. Schedule the browser-proof packet separately, with approval and provenance.
5. Do not modify `AppChrome` in this packet.

## Final reconciliation

The live repository now agrees on the important facts:

- `15e4d8b8ff3a15cbceab0859478b274ebf534417` is the current HEAD
- `039d3bf0ae31072be1cd5300c5e1dbb4fd2f3a5b` is the docs-only reconciliation commit
- the runner artifacts are isolated
- the browser-proof packet is still separate
- the shell contract is documented as future-repair compatibility, not as finished activation
- PPF-001 is not marked done
