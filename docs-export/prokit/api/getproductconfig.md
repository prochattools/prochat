<!-- GENERATED FILE - DO NOT EDIT -->
---
title: GetProductConfig
description: GetProductConfig function extracted from src/lib/store/stripe.ts.
category: boilerplate
slug: getproductconfig
order: 100
keywords:
  - prokit
  - api
  - getProductConfig
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/stripe.ts
generatedAt: 2026-03-10T23:47:09.852Z
---

# GetProductConfig

## Overview
Auto-generated API reference for getProductConfig.

## Source
- File: `src/lib/store/stripe.ts`
- Kind: `function`

## Definition
```ts
export function getProductConfig(productSlug: ProductSlug): ProductConfig {
	const baseConfig = PRODUCT_MAP[productSlug]
	if (!baseConfig) {
		throw new Error(`[store] Unsupported product slug: ${productSlug}`)
	}
	const priceId =
		productSlug === 'prokit'
			? getRequiredValue(baseConfig.priceEnv, getStripePriceProkit())
			: getRequiredValue(baseConfig.priceEnv, getStripePriceSaaskit())
	const { repoOwner, repoName } = getGithubConfig(productSlug)
	const githubRepo = `${repoOwner}/${repoName}`

	return {
		productSlug,
		...baseConfig,
		priceId,
		githubRepo,
	}
}
```
