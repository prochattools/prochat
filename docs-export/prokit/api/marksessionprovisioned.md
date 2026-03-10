<!-- GENERATED FILE - DO NOT EDIT -->
---
title: MarkSessionProvisioned
description: MarkSessionProvisioned function extracted from src/lib/store/stripe.ts.
category: boilerplate
slug: marksessionprovisioned
order: 100
keywords:
  - prokit
  - api
  - markSessionProvisioned
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/stripe.ts
generatedAt: 2026-03-10T23:47:09.853Z
---

# MarkSessionProvisioned

## Overview
Auto-generated API reference for markSessionProvisioned.

## Source
- File: `src/lib/store/stripe.ts`
- Kind: `function`

## Definition
```ts
export async function markSessionProvisioned(
	session: Stripe.Checkout.Session,
	productSlug: ProductSlug,
	githubUsername: string
): Promise<void> {
	const stripe = getStripeClient()
	const config = getProductConfig(productSlug)

	const updatedSessionMetadata: Stripe.MetadataParam = {
		...(session.metadata || {}),
		[config.paidKey]: 'true',
		[config.provisionedKey]: 'true',
		[config.usernameKey]: githubUsername,
		[config.lastSessionKey]: session.id,
	}

	await stripe.checkout.sessions.update(session.id, {
		metadata: updatedSessionMetadata,
	})

	const customer = toCustomer(session.customer)
	if (customer) {
		await stripe.customers.update(customer.id, {
			metadata: {
				...(customer.metadata || {}),
				[config.paidKey]: 'true',
				[config.provisionedKey]: 'true',
				[config.usernameKey]: githubUsername,
				[config.lastSessionKey]: session.id,
			},
		})
	} else if (typeof session.customer === 'string' && session.customer) {
		const customerRecord = await stripe.customers.retrieve(session.customer)
		if (!('deleted' in customerRecord && customerRecord.deleted)) {
			const liveCustomer = customerRecord as Stripe.Customer
			await stripe.customers.update(liveCustomer.id, {
				metadata: {
					...(liveCustomer.metadata || {}),
					[config.paidKey]: 'true',
					[config.provisionedKey]: 'true',
					[config.usernameKey]: githubUsername,
					[config.lastSessionKey]: session.id,
				},
			})
		}
	}
}
```
