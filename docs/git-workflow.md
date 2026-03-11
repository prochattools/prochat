# Git + Dokploy Workflow Guide

## Rules
- Never push directly to `main`.
- Always create a feature branch for new work.
- Wait for CI/docs workflows to pass before merging.
- Merge to `main` only after all checks succeed; Dokploy will build/deploy from `main`.

## Steps
1. git checkout main && git pull origin main
2. git checkout -b feature/branch-name
3. git add . && git commit -m "Message"
4. git push origin feature/branch-name
5. Wait for CI/docs workflows to finish on the PR
6. Merge into main → Dokploy rebuilds and deploys
7. git branch -d feature/branch-name && git push origin --delete feature/branch-name

## Automation Tasks

### Start Feature Branch
```bash
# Create and push a new feature branch
git checkout main
git pull origin main
git checkout -b feature/${FEATURE_NAME}
git push origin feature/${FEATURE_NAME}
```

### Merge to Main
```bash
# Merge a feature branch into main and push
git checkout main
git pull origin main
git merge feature/${FEATURE_NAME}
git push origin main
```
