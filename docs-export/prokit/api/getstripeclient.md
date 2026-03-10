<!-- GENERATED FILE - DO NOT EDIT -->
---
title: GetStripeClient
description: GetStripeClient function extracted from src/lib/store/stripe.ts.
category: boilerplate
slug: getstripeclient
order: 100
keywords:
  - prokit
  - api
  - getStripeClient
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/stripe.ts
generatedAt: 2026-03-10T23:47:09.852Z
---

# GetStripeClient

## Overview
Auto-generated API reference for getStripeClient.

## Source
- File: `src/lib/store/stripe.ts`
- Kind: `function`

## Definition
```ts
export function getStripeClient(): Stripe {
	if (cachedStripe) {
		return cachedStripe
	}
	const secret = getRequiredValue('STRIPE secret key', getStripeSecretKey())
	cachedStripe = new Stripe(secret, { apiVersion: '2024-06-20' })
	return cachedStripe
}
```
