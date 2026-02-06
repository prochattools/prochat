# Git Workflow (Tag-Gated Deploys)

Production deploys are triggered only by pushing a release tag.

## Daily workflow
1. Commit to `main` as usual.
2. When ready to deploy, create a version tag.
3. Push the tag to trigger the production deploy.

Keep `PROCHAT_VERSION` aligned with the release tag (without the leading `v`).

## Create a release tag
```bash
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin v1.0.1
```

## Rollback
To roll back, deploy the previous tag (or create a new tag pointing at the previous stable commit). Avoid rewriting `main` history.
