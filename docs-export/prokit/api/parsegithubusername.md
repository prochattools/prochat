<!-- GENERATED FILE - DO NOT EDIT -->
---
title: ParseGithubUsername
description: ParseGithubUsername function extracted from src/lib/store/github-username.ts.
category: boilerplate
slug: parsegithubusername
order: 100
keywords:
  - prokit
  - api
  - parseGithubUsername
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/github-username.ts
generatedAt: 2026-03-10T23:47:09.850Z
---

# ParseGithubUsername

## Overview
Auto-generated API reference for parseGithubUsername.

## Source
- File: `src/lib/store/github-username.ts`
- Kind: `function`

## Definition
```ts
export function parseGithubUsername(input: string): string {
	const fromUrl = extractFromUrl(input)
	const raw = (fromUrl || input).trim()
	if (!raw) {
		return ''
	}

	const withoutAt = raw.startsWith('@') ? raw.slice(1) : raw
	const firstSegment = withoutAt
		.replace(/^\/+/, '')
		.split('/')
		.map(segment => segment.trim())
		.filter(Boolean)[0]

	return firstSegment || ''
}
```
