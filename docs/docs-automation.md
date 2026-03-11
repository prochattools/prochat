# Docs Automation

This document describes the internal documentation automation system implemented in the ProChat repo.

It complements [scripts/docs/README.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/docs/README.md), which remains the low-level implementation reference.

## Internal docs vs generated public docs

There are two separate documentation surfaces in this repository:

- internal team docs in `/docs`
- generated public docs in `src/content/docs`

The internal `/docs` directory is not part of the generated public docs tree. The docs automation system publishes public documentation by generating files into `src/content/docs`.

## Main pipeline surfaces

### `docs-export`

`docs-export/` is the raw export area for external documentation inputs and extracted API docs.

Current uses include:

- external repository documentation exports
- TypeScript extraction output
- OpenAPI extraction output

### `docs-ingest`

`docs-ingest/` is the normalized intake area used by the publish pipeline.

`npm run docs:ingest` runs `scripts/docs/ingest/external-sync.ts` and imports exported docs into `docs-ingest/<product>`.

The ingest step is atomic:

- files are copied into `docs-ingest/.tmp/<product>`
- only `.md` and `.mdx` inputs are accepted
- the staged directory is swapped into place only after a successful copy

## Generation stages

The pipeline has three main stages:

1. ingest external or extracted docs
2. generate or regenerate AI/template sections
3. publish normalized output into `src/content/docs`

Current script entry points from [package.json](/Users/Office/Repos/Organisation/ProChat/Web/prochat/package.json):

- `npm run docs:ingest`
- `npm run docs:ai-generate`
- `npm run docs:generate`
- `npm run docs:validate`
- `npm run docs:ai-build`

`npm run docs:ai-build` is the main all-in-one command. It chains AI generation, docs generation, and validation.

## AI section generation

The AI stage is implemented in `scripts/docs/ai/*`.

Current behavior:

- compares ingest files against the manifest
- regenerates only changed or missing outputs
- uses OpenAI when `OPENAI_API_KEY` is available
- falls back to structured template behavior when AI is unavailable
- preserves explicit section markers so untouched sections can remain stable

Generated docs are structured with `<!-- AI:section:start/end -->` markers for section-level regeneration.

## Templates

The product registry can assign templates from `scripts/docs/templates`.

Templates define:

- expected section structure
- section ordering
- required headings and blocks

This keeps AI generation and validation aligned to the same contract.

## Manifest and publish output

The publish stage is handled by `scripts/docs/generate-docs.ts`.

It produces:

- normalized MDX output under `src/content/docs/{prokit,saaskit,waaskit,future}`
- `_meta.js` navigation files
- `.generated-manifest.json`

The manifest records metadata such as:

- `docId`
- `contentHash`
- `sourcePath`
- `outputPath`
- `category`
- `slug`
- `sourceRepo`
- `generator`
- `generatedAt`
- `sourceCommit`

## Validation

Validation is handled by `scripts/docs/validate-docs.ts`.

Current checks include:

- required frontmatter
- category and slug consistency
- manifest coverage
- reserved directory rules
- generated-file marker enforcement
- source attribution checks

Strict mode is controlled by `DOCS_STRICT=true`.

Behavior:

- local runs default to warnings where possible
- strict CI mode escalates validation failures to errors

## Reserved directories and generated protection

The directories `api/`, `cli/`, and `sdk/` inside `docs-ingest/<product>` are machine-owned zones.

Generated docs in those directories must include:

- `generator: auto`
- `sourceRepo`
- `sourceCommit`
- `generatedAt`
- `<!-- GENERATED FILE - DO NOT EDIT -->`

Validation also rejects route-collision files such as:

- `docs-ingest/<product>/api.md`
- `docs-ingest/<product>/cli.md`
- `docs-ingest/<product>/sdk.md`

## TypeScript and OpenAPI extraction

The extraction layer writes generated API docs into `docs-export/<product>/api` before ingestion.

Current commands:

- `npm run docs:extract:typescript`
- `npm run docs:extract:openapi`

Source configuration comes from `scripts/docs/products-registry.json` through:

- `apiSource`
- `apiSourcePaths`

Supported behavior:

- TypeScript extraction emits one markdown file per exported interface, type, or function
- OpenAPI extraction emits one markdown file per endpoint operation
- generated output is then ingested and published into the public docs tree

## Preview and CI workflows

Three current GitHub workflows matter here:

- `.github/workflows/docs-pipeline.yml`
- `.github/workflows/docs-preview.yml`
- `.github/workflows/docs-sync.yml`

### Docs pipeline

Runs on pushes that touch docs pipeline surfaces and executes `npm run docs:ai-build` with `DOCS_STRICT=true`.

### Docs preview

Runs on pull requests that touch generated-doc surfaces.

Current behavior:

- restores `.cache/docs`
- runs `npm run docs:ai-build`
- runs `npm run build`
- uploads `.next` as the `docs-preview` artifact

The workflow publishes an internal preview artifact; Dokploy manages the final production deployment.

### Docs sync

Handles external documentation sync through workflow dispatch or repository dispatch.

Current behavior:

- ingests external docs
- sets `DOCS_SOURCE_COMMIT` when commit metadata is provided
- runs the full AI build and validation pipeline in strict mode

## Caching

The docs pipeline caches `.cache/docs/manifest.json`.

Current behavior:

- unchanged content hashes can skip unnecessary regeneration
- docs workflows restore and reuse the cache between runs

## Related references

- [overview.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/overview.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/environment.md)
- [scripts/docs/README.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/docs/README.md)
