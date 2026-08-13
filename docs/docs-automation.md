# Docs Automation — Retired

The former automated public Docs pipeline is retired and is not part of the active ProChat runtime or contributor workflow.

## Retired components

The cleanup removed the generated documentation system, including:

- `scripts/docs`
- generated `src/content/docs` product documentation
- Nextra runtime/theme integration
- dynamic `/docs/[category]/[[...slug]]` rendering
- Docs generation, validation, AI-generation, ingestion, extraction, restructuring, preview, and watch package commands
- dedicated Docs preview/pipeline/sync GitHub workflows

## Current documentation model

The active public documentation surface is the lean `/docs` repository hub for Memory for QA and Workbench. Canonical product documentation should live with the relevant repositories and be linked from that hub.

Internal repository documentation remains under `docs/` and `docs-public/` as appropriate.

## Contributor rule

Do not restore the retired generated Docs pipeline as a shortcut for adding documentation. New documentation work should either:

- update the relevant internal repository documentation, or
- update the lean `/docs` hub when a canonical public link or boundary changes.

Historical implementation details for the retired automation remain available in Git history.

## Validation

Use the current validation commands in `REPO_OPERATIONS.md`. There are no active `docs:generate`, `docs:validate`, `docs:ai-*`, `docs:ingest`, `docs:extract`, or `docs:watch` workflows.
