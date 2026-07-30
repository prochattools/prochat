# Design-system lint enforcement

**Status:** enforced in repository CI
**Program:** PXF-010 governance repair
**Implementation:** `scripts/design/lint-design-system.mjs`
**Baseline:** `scripts/design/design-lint-baseline.json`

## Commands

```bash
npm run lint:design
npm run lint:design:baseline
```

- `lint:design` scans production source and fails when a violation is new or exceeds its explicit baseline count.
- Intentional rule failures are exercised directly with `node scripts/design/lint-design-system.mjs --fixture-rule=<rule>`. Each invocation must exit `1` and emit the rule, file, pattern, and remediation.
- `lint:design:baseline` regenerates the machine-readable debt baseline. Baseline changes require review and must not be used to conceal new violations.

There are no separate `--check-semantic-aliases` or `--check-duplication` modes. The default `lint:design` command runs every governance rule together.

## Canonical authority

The authority order is:

1. Mind: `wiki/organisations/prochat/brand/global-design-foundation.md`
2. repository translation: `brand-spec.md`
3. operational rules: `DESIGN.md`
4. token implementation:
   - `src/assets/styles/prochat-foundation.css`
   - `src/assets/styles/prochat-public.css`
   - `src/app/(marketing)/prochat-memory-theme.css`

The global default is light, grayscale-led, and uses cobalt `#3158C7` as its one accent. Dark mode is optional. A dark or teal treatment is not a replacement global authority unless Mind is changed first.

## Enforced rules

### `hardcoded-hex`

Production TypeScript and stylesheet files may not add unapproved raw hex colors. Canonical token-definition files and explicitly baselined existing debt are exceptions.

Remediation: define or consume an appropriate semantic token.

### `semantic-token-layer`

Token consumption must respect surface boundaries:

- marketing components may consume `--pm-*` and `--pc-public-*`, not `--pc-foundation-*`;
- Docs components and `styles/docs.css` may consume `--pc-public-*`, not `--pm-*` or `--pc-foundation-*`;
- token-definition files may map lower layers into higher layers.

Remediation: replace the lower-level or cross-surface token with the correct semantic alias.

### `duplicate-system`

The lint checks that canonical button/navigation implementations remain present and rejects known parallel navigation component names. The canonical paths are defined in the lint script.

This is a bounded structural guard, not a semantic AST proof that no visually similar component exists. Code review remains required for newly introduced UI primitives.

### `legacy-selector`

Removed presentation systems may not return. Guarded selectors include:

- `.hero--old`
- `.button--glass`
- `.pm-wordmark-mark`
- `.pc-action-label`

Remediation: use the canonical navigation, logo, button, and typography systems.

### `unauthorized-style`

The lint rejects specifically defined named-color glow patterns, including purple, cyan, and magenta drop-shadow or box-shadow treatments.

This rule deliberately does not prohibit every gradient, shadow, or animation. Existing approved visual systems remain governed by `DESIGN.md`, semantic tokens, the baseline, and review.

## Baseline format

The baseline is JSON schema version `2`:

```json
{
  "version": 2,
  "generatedAt": "ISO-8601 timestamp",
  "authority": {
    "source": "Mind path",
    "defaultMode": "light",
    "accent": "#3158C7"
  },
  "exemptions": [
    {
      "rule": "hardcoded-hex",
      "file": "relative/path.css",
      "pattern": "#123456",
      "count": 1,
      "reason": "Specific existing debt and migration rationale"
    }
  ]
}
```

Validation requires a known rule, repository-relative file, nonempty pattern, positive integer count, and substantive reason. There are no decorative reviewer-signature fields.

An exemption permits only the recorded count for the exact rule, file, and pattern. Increasing the count or adding a new pattern fails linting.

## Diagnostics

Failures use this shape:

```text
[rule] path/to/file.css:42 | pattern="..." count=2 baseline=1 | remediation=...
```

Every failure identifies the rule, file and line, matched pattern, current/baseline counts, and remediation.

## CI behavior

`.github/workflows/main.yml` runs `npm run lint:design` in the `ci` job for pushes and pull requests targeting `main`.

The production `build-and-deploy` job depends on both `ci` and `docs-integrity`. A governance or documentation failure therefore blocks image publication and deployment.

Direct fixture checks are required during governance implementation. The production lint itself is the deployment gate.

## Maintenance rules

- Prefer reducing baseline debt rather than regenerating it.
- Never regenerate the baseline merely to make CI pass.
- Add a new rule only with a deterministic detector, actionable diagnostic, and intentional failure fixture.
- Keep rule documentation aligned with implemented behavior.
- Broad visual judgement remains a review responsibility; lint rules must not claim guarantees they cannot mechanically prove.
