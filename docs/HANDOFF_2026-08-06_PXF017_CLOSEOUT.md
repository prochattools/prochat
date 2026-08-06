# ProChat handoff — 2026-08-06

## Resume identity

- Source: `prochat`
- Branch: `main`
- Repository HEAD at handoff creation: `a78c333` — `docs: correct final PXF-017 evidence counts`
- Worktree before this handoff: clean except for this new handoff file
- Intentional preserved branch: `archive/content-heavy-site`
- Do not merge, delete, or modify the archive branch without explicit owner approval

## Current production state

- Deployed application revision: `b7f564a1883309758be55be097ae3616fdfa0fc8`
- Main workflow: `31093765830`
- Verified deployed at: `2026-08-06T10:41:32Z`
- Production health: verified healthy
- Canonical public routes verified HTTP 200:
  - `/`
  - `/memory`
  - `/memory-qa`
  - `/workbench`
  - `/docs`
  - `/contact`
  - `/privacy`
  - `/terms`

## Completed public-platform work

The recruiter-facing public platform is complete for the approved scope.

- All eight canonical routes use the shared public chrome architecture.
- Header and footer are unified across public routes, including Docs.
- The Docs content slot preserves a single main landmark.
- The legacy blue first-paint/navigation background was replaced with canonical black.
- The viewport theme color is black.
- The public skip-to-content control was removed/suppressed per owner direction.
- Contact uses professional copy, balanced vertical layout, and the shared shell.
- Canonical navigation, footer, responsive containment, focus, reduced motion, accessibility, and chrome invariants are covered by browser evidence.
- No known release-blocking public-design defect remains.

## Exact browser evidence

The required browser suite contains exactly 66 generated tests:

- `docs-mobile-layout.spec.ts`: 6
- `canonical-route-smoke.spec.ts`: 18
- `canonical-accessibility.spec.ts`: 16
- `canonical-chrome-proof.spec.ts`: 26
- Total: 66

These counts are the current repository truth. Do not reintroduce older 20/19 claims.

## Roadmap position

- Phases 1–10: complete
- Phase 11: `PARTIAL`
  - legacy inventory exists
  - first tracked cleanup was completed
  - 17 substantive owner decisions remain
  - 5 catalogued paths are `NOT APPLICABLE — VERIFIED ABSENT`
- Phase 12: `PARTIAL`
  - automated browser/accessibility evidence complete
  - manual screen-reader, 200% zoom/reflow, high-contrast, orientation, broader cross-browser, and field RUM/INP evidence are not yet executed
- Phase 13: `ONGOING`
  - continuous governance and bounded maintenance
- Phases 14–15: complete

## Remaining owner decisions

Authoritative files:

- `docs/platform/LEGACY_OWNER_DECISIONS.md`
- `docs/platform/LEGACY_OWNER_DECISION_BRIEF.md`

Current totals:

- 17 substantive decisions: `PENDING`
- 5 verified-absent records: `NOT APPLICABLE`
- 22 total catalogued records

Do not remove, redirect, archive, or consolidate any pending route/API without explicit owner approval.

## External operational action

MailerLite credential revocation/rotation remains `PENDING` owner verification.

Code and CI remediation are deployed. Do not claim the external rotation is complete without direct owner evidence.

## Current constraints

Do not begin any of the following without explicit approval:

- broad Ory/session implementation
- route deletion or redirect changes
- authenticated-product redesign
- public visual redesign
- database migrations
- payment, subscription, fulfilment, or admin changes
- archive branch changes

## Recommended next packet

The next safe packet is owner-decision preparation and bounded Phase 12 manual evidence planning. It should not change production behavior.

Priority order:

1. **Review the 17 pending legacy-surface decisions with the owner** — see `docs/platform/LEGACY_OWNER_DECISION_WORKSHEET.md`
2. Record explicit retain/retire/redirect/defer decisions in the worksheet with required destinations and clarifications.
3. Review the Phase 11 implementation blueprint — see `docs/platform/PXF018_IMPLEMENTATION_PLAN.md` (9 packets: PXF-018A–I; awaits worksheet decisions to unlock).
4. Only after worksheet approval, execute corresponding unblocked packets in dependency order.
5. Separately schedule manual Phase 12 evidence if desired.
6. Verify external MailerLite rotation when the owner completes it.

## Required resume procedure

At the start of a new conversation:

1. Activate source `prochat`.
2. Read this file first.
3. Run:
   - `git branch --show-current`
   - `git status --short`
   - `git log -6 --oneline --decorate`
4. Require branch `main` and inspect any divergence before editing.
5. Do not assume production advanced beyond `b7f564a...`; verify `/api/version` before changing operational metadata.
6. Preserve immutable validation anchors in existing planning documents.
7. Stage explicit paths only.
8. Never force-push.

## Exact next goal

Prepare an owner-decision review for the 17 pending legacy surfaces, identify the smallest no-regret implementation slice after owner approval, and keep Phase 11 partial until approved decisions and absence-proof gates are complete.
