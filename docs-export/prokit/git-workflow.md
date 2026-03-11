# ProKit Studio Git Workflow

ProKit Studio defaults to branch-based production deploys. A common flow is merge to `main` and let your platform deploy from that branch.

## Branching

- Develop on feature branches.
- Merge to `main` when ready.
- Avoid rewriting shared history.

## Default Release Flow (Branch-Based)

```bash
git checkout main
git pull origin main

git add .
git commit -m "<message>"
git push origin main
```

After push, your hosting platform can deploy from `main` (or your configured production branch).

## Versioning Note

- Keep `PROKIT_STUDIO_VERSION` aligned with the version you are shipping.

## Rollback

- Redeploy a known-good commit/branch state in your platform, or
- Push a rollback commit to the production branch.
