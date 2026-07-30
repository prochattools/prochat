# ProChat Release Identity Hardening Handoff

**Run:** `agent-a8aa423b-bb30-4622-b129-c749573e3ca5`
**Status:** Phase 15 implementation in progress
**Source:** `prochat`
**Branch:** `main`
**Verified release base:** `54b6de4957039d37f8e7331d07d3475b64db9737`
**Date:** 2026-07-30

## Objective

Close the remaining production-attestation gap without depending on authenticated Dokploy access. The deployed service must expose a non-secret release identity that can be correlated to the Git commit and immutable GHCR image.

## Verified starting state

- PXF-010 governance implementation is committed and pushed at `54b6de4`.
- GitHub Actions workflow `30555031503` completed successfully.
- `ci`, `docs-integrity`, and `build-and-deploy` all succeeded.
- immutable and `latest` GHCR tags resolved to index digest `sha256:46ee9390d22f86e603e2395f9f62ca096d32468767b888c3ff0cf46b9d484d2d`.
- production routes `/`, `/docs`, `/contact`, `/privacy`, and `/terms` returned HTTP 200 with expected styled content.
- Dokploy terminal deployment status and running-image identity were unavailable because no authenticated UI or production runtime access existed.
- the worktree was clean before this Phase 15 hardening packet began.

## Implementation plan

1. Add a read-only `/api/version` endpoint returning service, revision, immutable image reference, and build timestamp.
2. Return `Cache-Control: no-store` and `X-ProChat-Revision` so external checks can attest the revision without parsing page content.
3. Inject `PROCHAT_GIT_SHA`, `PROCHAT_IMAGE_REF`, and `PROCHAT_BUILD_TIMESTAMP` into both Docker build and runtime stages.
4. Add OCI revision and creation labels to the production image.
5. Pass immutable release values from GitHub Actions into `docker/build-push-action`.
6. Document the environment contract and reconcile the roadmap.
7. Run targeted security, TypeScript, design-lint, docs, JSON/YAML, whitespace, and production-build validation.
8. Commit and push only the reviewed Phase 15 paths, then monitor CI and verify `/api/version` in production.

## Risks and controls

- Public metadata must contain no secrets or internal credentials.
- Local builds default to `unknown`; production verification must reject `unknown` as unattested.
- Image index and Linux/amd64 platform digests may differ legitimately; the endpoint exposes the immutable image reference, while registry inspection proves the digest.
- A successful Dokploy trigger is not terminal deployment proof. Production completion is proven only when `/api/version` reports the new commit after the workflow succeeds.
- No manual redeploy, restart, rollback, or infrastructure mutation is required outside the existing push-triggered workflow.

## Changed paths

- `.github/workflows/main.yml`
- `Dockerfile`
- `src/app/api/version/route.ts`
- `docs-public/environment.md`
- `docs/roadmap.md`
- `docs/product/agent-mode-progress.md`

## Current validation state

```yaml
implementation_review: IN_PROGRESS
security_scan: PENDING
typescript: PENDING
design_lint: PENDING
docs_validation: PENDING
json_yaml_validation: PENDING
whitespace: PENDING
production_build: PENDING
commit: PENDING
push: PENDING
workflow: PENDING
production_version_attestation: PENDING
```

## Completion gate

Phase 15 is complete only when:

- all local and CI gates pass;
- the reviewed changes are committed and pushed;
- the production workflow succeeds;
- `https://prochat.tools/api/version` returns the new commit SHA, immutable GHCR image reference, and non-unknown build timestamp;
- the revision response header matches the JSON revision.

## Exact next task

Review the six changed paths, run the smallest meaningful validation set, repair at most one clear failure, then commit and push only after every local gate passes.
