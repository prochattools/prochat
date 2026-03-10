# Documentation Ingestion Root

This folder holds raw markdown or MDX harvested from other repositories before it is transformed into the public docs site.

Rules:
- `docs-ingest` is **not published** directly. Files here are intermediate and may include work-in-progress notes.
- The ingestion pipeline transforms these sources and writes the results into `src/content/docs`.
- Keep product-specific material inside the matching subfolder (`prokit`, `saaskit`, `waaskit`, `future`).

Input expectations for external repos:
- Accept only `.md` or `.mdx` files with optional YAML frontmatter.
- Hidden files, binaries, images and `/docs` remain ignored.
- Preserve subfolders: nested paths become slug segments, and filenames become slug bases.

## External exports

External repositories should publish documentation into a `docs-export/` tree containing `.md` or `.mdx` files (and optional YAML frontmatter). The `docs:ingest` command copies those exports into `docs-ingest/<product>` while preserving subfolders so the normal generator can pick them up. Invalid product identifiers are ignored by the ingestion script and logged for follow-up.

### Atomic sync

`docs:ingest` stages every import in `docs-ingest/.tmp/<product>` first, validates the Markdown files, and only swaps the new directory into place if the copy completes cleanly. Any failure leaves the previous ingest folder untouched so atomicity preserves the last known-good state.
