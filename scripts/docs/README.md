# Automated Docs Pipeline

`docs-ingest/` is the raw intake area. The pipeline works in three stages:

1. `ingest/`
   - Copies or streams third-party documentation into `docs-ingest`. Inputs stay raw.
2. `transform/`
   - Normalizes frontmatter, converts markdown to MDX, and harmonizes heading structure via `normalize-frontmatter.ts`.
3. `publish/`
   - Emits normalized MDX under `src/content/docs/{prokit,saaskit,waaskit,future}` and refreshes `_meta.js`, plus `.generated-manifest.json`.

Files in `src/content/docs` are generated output only. The private `/docs` tree stays untouched and is never published.

## Manifest attribution

`scripts/docs/generate-docs.ts` feeds `.generated-manifest.json` with every generated page. Each entry records `docId`, `contentHash`, `sourcePath`, `outputPath`, `category`, `slug`, `title`, `description`, `order`, `keywords`, `sourceRepo`, `generator`, and `generatedAt`. Downstream validation and CI use this manifest to detect changed docs, rebuild navigation metadata, and keep AI outputs deterministic.

`scripts/docs/generate-docs.ts` runs the pipeline, writes `.generated-manifest.json` (including `docId`, `contentHash`, and metadata links), updates `_meta.js` per bucket, and prints a summary of files generated/skipped plus affected categories.

`scripts/docs/validate-docs.ts` enforces the contract:
- Each generated file must expose the required frontmatter keys.
- Categories must match their folder, slugs must match filenames, and every file must appear in the manifest.

### AI documentation pipeline

1. External repo exports Markdown → `docs-ingest/`.
2. Run `npm run docs:ai-generate` to turn changed inputs into normalized MDX.
3. Run `npm run docs:generate` to produce `.generated-manifest.json` and `_meta.js`.
4. Run `npm run docs:validate` to verify the contract.

Future Phase 5B (AI generation + GH Action) will read `.generated-manifest.json`, use `_meta.js` navigation, and trust `docs:validate` before publishing.

`scripts/docs/ai/generate-ai-doc.ts` compares `docs-ingest` files to the manifest, calls `scripts/docs/ai/ai-client.ts` (OpenAI if `OPENAI_API_KEY` is set, otherwise a structured template), rewrites only changed files, and reports documents analyzed vs regenerated vs skipped. Set `DOCS_SKIP_AI=true` to skip the AI stage when you only need to re-run `docs:generate` for caching experiments.

`npm run docs:ai-build` chains AI generation, docs generation, and validation so every commit runs the same deterministic flow.

### Product registry

`scripts/docs/products-registry.json` is the single source of truth for every published documentation bucket (ProKit, SaaSKit, WaaSKit, and future additions). `scripts/docs/generate-docs.ts` consults this registry to decide which folders to process and what category/tag info to apply.

### Source repository tracking

Each manifest entry now records `sourceRepo`, `generator`, and `generatedAt`, enabling automation to trace every generated page back to its origin and AI run. The AI generator writes these values into frontmatter before the manifest is refreshed, and `scripts/docs/validate-docs.ts` cross-checks `sourceRepo` against the product registry so the bucket, category, and manifest stay in sync.

### Reserved directories

The directories `api/`, `cli/`, and `sdk/` under `docs-ingest/<product>/` are considered automatically generated zones. AI generation will only write files there, and their frontmatter must declare `generator: auto`. Validation enforces this rule (emitting warnings locally and errors when `DOCS_STRICT=true`) so manual edits cannot accidentally overwrite hooks meant for future API/type extraction.

### Auto-generated directories security

Reserved directories are treated as machine-owned surfaces. Any page under `docs-ingest/<product>/api`, `cli`, or `sdk` must carry `generator: auto`, `sourceRepo`, `sourceCommit`, and `generatedAt` in frontmatter. The AI stage injects those values automatically, the publish stage preserves them into `.generated-manifest.json`, and validation escalates missing fields from warnings locally to errors in strict CI mode.

### Versioned docs

Drop `v1`, `v2`, etc., directories under `docs-ingest/<product>/` to signal versioned docs. The generator mirrors those folders under `src/content/docs/<product>/vX/`, while validation ensures version names follow `v<number>` and the generator logs invalid version folders to guard against typos before publishing.

### External repository documentation export

External repositories export their current documentation into a `docs-export/` directory containing `.md`/`.mdx` files. `npm run docs:ingest` shells out to `scripts/docs/ingest/external-sync.ts`, validates the product against `scripts/docs/products-registry.json`, and syncs the export into `docs-ingest/<product>`. The `.github/workflows/docs-sync.yml` workflow acts as the webhook/dispatch endpoint: it reads the `product` and `docsPath` payload, runs `docs:ingest`, then `docs:ai-build`, keeping each automation run strictly validated because that workflow already enables `DOCS_STRICT=true`.

For repos that do not push exports into this repository directly, run `npm run docs:extract:repo -- <repo-url> <target>`. That helper clones the remote repository into a temporary directory and only accepts Markdown from `docs-public/<target>` or `docs-public`. If neither path exists, the run aborts with an explicit warning so no private documentation is ingested. Before staging files into `docs-export/<target>`, the extractor also scans for secret-like patterns (private key assignments, token/password/api-key assignments, and `.env` style credential lines). Files that match are warned about and skipped so private material is not published accidentally. Heavy build folders such as `node_modules`, `.next`, `dist`, and `build` are ignored during the scan.

Recommended external repo layout:

```text
saaskit/
  docs-public/
    getting-started.md
    architecture/
  docs-private/
    operator-notes.md
    internal-roadmap.md
```

Only `docs-public/` is eligible for extraction into ProChat.

### Atomic ingestion

`npm run docs:ingest` now copies exports into `docs-ingest/.tmp/<product>`, ensures only `.md/.mdx` files go through, and atomically swaps the staged directory into `docs-ingest/<product>` only after the copy succeeds. On success the script reports how many docs were imported vs skipped and logs `Sync success`; failures leave the existing ingest folder untouched and log `Sync failed`.

### Restructured product docs

After the AI pipeline pushes generated docs into `src/content/docs/<product>`, run `npm run docs:restructure` to enforce the buyer-friendly layout (overview, what-you-get, architecture, etc.). The script keeps the original technical pages untouched; it simply generates summary landing pages and `integrations` / `advanced` indexes that reference the existing docs, giving each product a consistent top-level navigation without deleting any technical content.

### Source commit tracking

When a dispatch includes a `commit`, the ingestion script forwards it into `DOCS_SOURCE_COMMIT`. Every page that lands in `src/content/docs` along with `.generated-manifest.json` now records `sourceCommit`, enabling traceability back to the originating commit. `scripts/docs/validate-docs.ts` warns if a `sourceCommit` is present but doesn’t match a Git SHA.

### Validation modes

Local runs default to warning mode. `npm run docs:validate` records structural concerns (missing manifest entries, registry mismatches, invalid version folders, etc.) but exits successfully so developers can inspect the log without blocking.

CI and automation should set `DOCS_STRICT=true` so the same script enforces the contract: invalid categories, manifest sourceRepo mismatches, missing manifest entries, missing files, and malformed version folders now fail the job and emit `✖` diagnostics. The workflow defined in `.github/workflows/docs-pipeline.yml` already enables strict mode before running `npm run docs:ai-build`.

`npm run docs:validate` now begins with `scripts/docs/check-doc-coverage.ts`. In repositories that define `docs-public/`, that guard warns locally and fails in strict mode when `src/` or `packages/` changed but `docs-public/` did not, surfacing likely documentation coverage gaps before ingestion/publishing.

### Preview documentation environments

Pull requests touching `docs-ingest/`, `scripts/docs/`, or `src/content/docs/` trigger `.github/workflows/docs-preview.yml`. That workflow restores the docs cache, runs `npm run docs:ai-build` with strict validation and the PR head SHA as `DOCS_SOURCE_COMMIT`, performs `next build`, and uploads `.next` as the `docs-preview` artifact. Preview builds re-run the full docs pipeline (logging Docs analyzed/regenerated/skipped) so team members can inspect generated content before merging; production docs only change via the main-branch workflows.

### AI section markers

Generated docs now live behind explicit `<!-- AI:section:start/end -->` markers for every template section. The AI generator parses existing sections in `docs-ingest`, regenerates only the missing or placeholder blocks, and reassembles the document without touching untouched sections. This keeps each doc predictable and easy to diff while capturing structured, per-section content.

### Product templates

Each registry entry can declare a `template` (e.g., `boilerplate`, `platform`, `api`) stored in `scripts/docs/templates`. Templates know the required sections, recommended headings, and the order to emit them, so the AI generator and validation scripts share the same contract. Missing template sections now emit warnings, ensuring every product keeps consistent structure.

### Token optimization

Section-level generation dramatically lowers token usage. The AI client now receives a payload containing only the targeted section (plus light context from existing sections) instead of the entire document. This lets the model focus on one block at a time while leaving the rest of the doc untouched, keeping the manifest deterministic without excessive prompts.

### Automatic API documentation extraction

The extraction layer can populate `docs-export/<product>/api` before ingestion. `scripts/docs/products-registry.json` now supports `apiSource` (`typescript`, `openapi`, or `none`) plus `apiSourcePaths` so each product can declare where its API contract lives.

- `npm run docs:extract:typescript` scans products marked `apiSource: "typescript"`, walks the configured `apiSourcePaths`, and emits one Markdown file per exported interface, type, or function using the TypeScript compiler API plus JSDoc comments.
- `npm run docs:extract:openapi` scans products marked `apiSource: "openapi"`, looks for `openapi.json`, `openapi.yaml`, or `openapi.yml`, and emits one Markdown file per endpoint operation.
- Generated extraction output lands in `docs-export/<product>/api`, then `npm run docs:ingest` imports those files into `docs-ingest/<product>/api`, and `npm run docs:ai-build` turns them into public docs under `/docs/<product>/api/<entity>`.

`api/`, `cli/`, and `sdk/` stay reserved machine-owned directories. Extracted pages in those folders must include `generator: auto`, `sourceRepo`, `sourceCommit`, and `generatedAt`, and validation escalates missing metadata when strict mode is enabled.

### Generated documentation protection

Every extracted Markdown file now begins with `<!-- GENERATED FILE - DO NOT EDIT -->` before the frontmatter. Validation insists on that marker for files under `api/`, `cli/`, and `sdk/` and walks `docs-ingest/<product>` reserved directories to ensure each generated page carries `generator: auto`, `sourceRepo`, and `sourceCommit`. The validator also rejects or warns about `docs-ingest/<product>/api.md`, `cli.md`, and `sdk.md` because those names collide with the reserved subdirectory routes.

### CI caching

The docs pipeline now keeps `.cache/docs/manifest.json`, a manifest snapshot that remembers every `contentHash` from the last build. `npm run docs:generate` compares new hashes against the cached manifest and, if nothing changed, logs `Docs unchanged, skipping build` and avoids touching `src/content/docs` and `_meta.js`. When changes are detected it rewrites the docs and refreshes both the published manifest and the cached manifest so subsequent runs can short-circuit again. The `docs-sync` workflow caches `.cache/docs` with `actions/cache` so CI nodes can reuse the prior manifest between runs, keeping builds deterministic and minimizing churn when upstream docs stay the same.
