<!-- GENERATED FILE - DO NOT EDIT -->
---
title: EntitlementStatus
description: EntitlementStatus interface extracted from src/lib/store/types.ts.
category: boilerplate
slug: entitlementstatus
order: 100
keywords:
  - prokit
  - api
  - EntitlementStatus
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/types.ts
generatedAt: 2026-03-10T23:47:09.853Z
---

# EntitlementStatus

## Overview
Auto-generated API reference for EntitlementStatus.

## Source
- File: `src/lib/store/types.ts`
- Kind: `interface`

## Definition
```ts
export interface EntitlementStatus {
	state:
		| 'invalid_session'
		| 'unpaid'
		| 'paid_unclaimed'
		| 'provisioned'
		| 'error'
	message?: string
	productSlug?: ProductSlug
	email?: string | null
	githubUsername?: string | null
}
```
