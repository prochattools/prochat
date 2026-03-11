# Git workflow

This **git-workflow** doc aligns with the ProKit release and branching expectations. SaaSKit uses a trunk-based workflow that keeps releases on `main`/`master` while the release script (`scripts/release.sh`) handles clean exports and tagging.

## Branch strategy
- Primary release branch: `main` (master is also acceptable when required for legacy processes).  
- Feature work and bug fixes live on short-lived topic branches. Keep your branch rebased/merged cleanly (no dirty working trees) before cutting a release.

## Release checklist
1. `git status` must be clean (`scripts/release.sh` enforces this).  
2. Ensure you are on `main` or `master`; the release script exits otherwise.  
3. Run `npm run lint` and `npm run build` (they also trigger migration checks via `prebuild`).  
4. Update documentation if the release touches taxonomy, scripts, or features (use this docs index to find the right section).  
5. Run the release script from the repo root:
   ```bash
   ./scripts/release.sh saaskit-dev <major|minor|patch|X.Y.Z> [flags]
   ```
   - Flags include `--dry-run`, `--yes`, `--public-owner`, `--public-repo`, `--dev-path`, and `--notes`.  
   - The script enforces license contents, secret hygiene, clean working tree, and tools availability (`git`, `node`, `npm`, `gh`).
   - It also bumps `package.json`, updates `CHANGELOG.md`, tags the release, and publishes notes via GitHub CLI.

## Versioning and tagging
- The release script handles semver bumps according to the `bump` argument or explicit version.  
- Tags mirror the bumped version and appear on both the private and public export repositories (the script removes history before publishing).

## Post-release tasks
- Push tags and releases (handled by the script, unless you run with `--dry-run`).  
- After the public repo is updated, the SaaSKit documentation should mention the new version and any migration steps it introduced.

## Related documentation
- Release script details: `scripts/release.sh`  
- Scripts reference: `docs-private/scripts.md`  
- Documentation index (for breadcrumbs): `docs-public/README.md`
