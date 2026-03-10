<!-- GENERATED FILE - DO NOT EDIT -->
---
title: IsValidGithubUsernameInput
description: IsValidGithubUsernameInput function extracted from
  src/lib/store/github-username.ts.
category: boilerplate
slug: isvalidgithubusernameinput
order: 100
keywords:
  - prokit
  - api
  - isValidGithubUsernameInput
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/github-username.ts
generatedAt: 2026-03-10T23:47:09.850Z
---

# IsValidGithubUsernameInput

## Overview
Auto-generated API reference for isValidGithubUsernameInput.

## Source
- File: `src/lib/store/github-username.ts`
- Kind: `function`

## Definition
```ts
export function isValidGithubUsernameInput(input: string): boolean {
	const username = parseGithubUsername(input)
	return GITHUB_USERNAME_PATTERN.test(username)
}
```
