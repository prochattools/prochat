# ProChat Release Identity Hardening Handoff

**Run:** `agent-a8aa423b-bb30-4622-b129-c749573e3ca5`
**Status:** Phase 15 complete
**Source:** `prochat`
**Branch:** `main`
**Release commit:** `20295c59e51872244a6e859fa1adb764436105aa`
**Date:** 2026-07-30

## Outcome

Phase 15 closed the production-attestation gap without requiring authenticated Dokploy access. Production now exposes non-secret release identity that correlates the running service to the Git commit and immutable GHCR image.

## Implemented

- `GET /api/version` returns service, revision, immutable image reference, and UTC build timestamp.
- The response includes `Cache-Control: no-store` and `X-ProChat-Revision`.
- Docker build arguments and runtime environment variables carry the same release metadata.
- OCI revision and creation labels are embedded in the production image.
- GitHub Actions passes the immutable commit, image reference, and one build timestamp into the image build.
- Public environment documentation and the canonical roadmap describe the contract.

## Validation and release evidence

```yaml
local_validation:
  typescript: PASSED
  design_lint: PASSED
  docs_validation: PASSED
  json_validation: PASSED
  whitespace: PASSED
  production_build: PASSED
commit: 20295c59e51872244a6e859fa1adb764436105aa
push: COMPLETE
workflow:
  id: 30575270024
  name: Main
  conclusion: SUCCESS
  completed_at: 2026-07-30T19:41:10Z
jobs:
  ci: SUCCESS
  docs-integrity: SUCCESS
  build-and-deploy: SUCCESS
ghcr:
  immutable_tag: ghcr.io/prochattools/prochat:20295c59e51872244a6e859fa1adb764436105aa
  latest_tag: ghcr.io/prochattools/prochat:latest
  index_digest: sha256:97bc2cc9ba6464ddec8d927b12a83a443c16e3dcb6eee67c5582fe50c11f57d3
  linux_amd64_digest: sha256:9354d1f03cc12202a39e27d5a54a7c53db03630e604d7ae2c9bde684c1154adb
  tags_share_index_digest: true
production_version:
  checked_at: 2026-07-30T19:43:26Z
  http_status: 200
  revision: 20295c59e51872244a6e859fa1adb764436105aa
  image: ghcr.io/prochattools/prochat:20295c59e51872244a6e859fa1adb764436105aa
  built_at: 2026-07-30T19:36:11Z
  cache_control: no-store
  revision_header_match: true
production_routes:
  homepage: PASSED
  docs: PASSED
  contact: PASSED
  privacy: PASSED
  terms: PASSED
```

## Security posture

The endpoint exposes only non-secret release metadata. It does not expose credentials, environment secrets, deployment IDs, private hostnames, runtime internals, or configuration values.

## Current program state

- Phase 14 design-system governance: COMPLETE.
- Phase 15 externally verifiable release identity: COMPLETE.
- Active execution state: Phase 13 continuous governance and bounded maintenance.
- No deployment, migration, or implementation blocker remains.

## Next task

No active implementation packet. Follow the Phase 13 governance cadence and open a new bounded packet only for a concrete defect, maintenance item, or approved roadmap addition.
