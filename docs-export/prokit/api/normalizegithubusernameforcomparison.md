<!-- GENERATED FILE - DO NOT EDIT -->
---
title: NormalizeGithubUsernameForComparison
description: NormalizeGithubUsernameForComparison function extracted from
  src/lib/store/github-username.ts.
category: boilerplate
slug: normalizegithubusernameforcomparison
order: 100
keywords:
  - prokit
  - api
  - normalizeGithubUsernameForComparison
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/github-username.ts
generatedAt: 2026-03-10T23:47:09.850Z
---

# NormalizeGithubUsernameForComparison

## Overview
Auto-generated API reference for normalizeGithubUsernameForComparison.

## Source
- File: `src/lib/store/github-username.ts`
- Kind: `function`

## Definition
```ts
export function normalizeGithubUsernameForComparison(input: string): string {
	return parseGithubUsername(input).toLowerCase()
}
```
