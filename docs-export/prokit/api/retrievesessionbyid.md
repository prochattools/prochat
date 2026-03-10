<!-- GENERATED FILE - DO NOT EDIT -->
---
title: RetrieveSessionById
description: RetrieveSessionById function extracted from src/lib/store/stripe.ts.
category: boilerplate
slug: retrievesessionbyid
order: 100
keywords:
  - prokit
  - api
  - retrieveSessionById
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/stripe.ts
generatedAt: 2026-03-10T23:47:09.852Z
---

# RetrieveSessionById

## Overview
Auto-generated API reference for retrieveSessionById.

## Source
- File: `src/lib/store/stripe.ts`
- Kind: `function`

## Definition
```ts
export async function retrieveSessionById(
	sessionId: string
): Promise<Stripe.Checkout.Session | null> {
	try {
		const stripe = getStripeClient()
		return await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['customer'],
		})
	} catch (error) {
		console.error('[store] Failed to retrieve checkout session', error)
		return null
	}
}
```
