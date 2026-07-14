# PPF-001 Browser-Runner and Shell Decision

**Packet:** PPF-001  
**SourceId:** `prochat`  
**Decision date:** 2026-07-14  
**Repository state:** docs-only reconciliation; no production source changed

## Verified Git state

- Current HEAD: `039d3bf0ae31072be1cd5300c5e1dbb4fd2f3a5b`
- Reconciliation commit exists: `039d3bf0ae31072be1cd5300c5e1dbb4fd2f3a5b` — `docs(prochat): record ppf-001 handoff state`
- Pre-reconciliation docs commit still exists: `806ce4398b8065dfc004ed3bc3248a7bb711a746`
- Working tree status at review time: clean tracked tree, plus the three untracked browser-runner artifacts listed below
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
- protected secret names are explicit:
  - `WAVE1_PROTECTED_STATE_BASELINE_B64`
  - `WAVE1_PROTECTED_STATE_TARGET_B64`
- storage-state is loaded from runner temp, not committed
- artifacts and logs are uploaded only as workflow outputs
- baseline and target are served independently
- maintenance mode is disabled only inside the runner
- dummy Stripe and email values are CI-only
- network use is limited to dependency and browser installation plus local service access
- the workflow cannot accidentally publish or deploy by itself

Safety conclusion: acceptable to keep isolated, but not yet merge-ready.

## Test completeness review

The current workflow/spec pair is directionally correct and validates:

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
- protected storage-state branching
- chat project input support
- health endpoint
- OG endpoint
- trace/report output in the workflow
- a static validator for workflow/spec alignment

Gaps relative to the requested browser-proof packet:

- no live browser provenance capture beyond the workflow inputs
- no explicit browser-version assertion in the spec validator
- no explicit commit-provenance assertion in the spec validator
- no standalone assertion for mobile navigation behavior
- no standalone assertion for protected-storage privacy beyond route skipping
- no browser-run evidence was produced in this packet

Completeness conclusion: useful but incomplete for final proof.

## Artifact disposition

Decision: `KEEP_ISOLATED_BLOCKED`

Reasons:

- the workflow is security-bounded and does not mutate the repository
- the spec and validator are structurally coherent
- browser proof was not produced in this packet
- the packet still lacks explicit provenance capture and several requested browser-only assertions
- the artifacts are still untracked and should not be merged into the repository yet

Exact required changes before any later commit:

- add explicit browser-version and commit-provenance assertions
- cover the missing mobile-navigation/browser-only checks
- confirm protected-flow behavior in a real browser run
- rerun validation under the approved browser environment

Security impact:

- low if isolated
- medium to high if committed without browser proof, because the workflow would invite protected-flow execution without a completed evidence trail

Privacy impact:

- storage-state and artifact outputs are sensitive enough to require explicit runner handling and retention discipline
- no raw credential payloads should ever be committed

Operational prerequisites:

- browser-capable runner
- approved GitHub Environment access
- approved protected-flow credentials or storage state
- attributable baseline and target provenance

Approval required:

- no commit approval was requested for this packet
- later browser execution still requires the protected environment boundary and its approval path

Rollback:

- leave the three runner artifacts untracked
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

- `039d3bf` exists and is the current HEAD
- the runner artifacts are isolated
- the browser-proof packet is still separate
- the shell contract is documented as future-repair compatibility, not as finished activation
- PPF-001 is not marked done
