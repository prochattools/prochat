<!-- GENERATED FILE - DO NOT EDIT -->
---
title: GetGithubConfig
description: GetGithubConfig function extracted from src/lib/store/github.ts.
category: boilerplate
slug: getgithubconfig
order: 100
keywords:
  - prokit
  - api
  - getGithubConfig
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/github.ts
generatedAt: 2026-03-10T23:47:09.851Z
---

# GetGithubConfig

## Overview
Auto-generated API reference for getGithubConfig.

## Source
- File: `src/lib/store/github.ts`
- Kind: `function`

## Definition
```ts
export function getGithubConfig(productSlug: ProductSlug): GithubConfig {
	const repo = PRODUCT_REPOS[productSlug]
	if (!repo) {
		throw new Error(`[store] Unsupported product slug: ${productSlug}`)
	}
	return repo
}
```
