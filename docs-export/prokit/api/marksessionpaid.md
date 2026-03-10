<!-- GENERATED FILE - DO NOT EDIT -->
---
title: MarkSessionPaid
description: MarkSessionPaid function extracted from src/lib/store/stripe.ts.
category: boilerplate
slug: marksessionpaid
order: 100
keywords:
  - prokit
  - api
  - markSessionPaid
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/stripe.ts
generatedAt: 2026-03-10T23:47:09.853Z
---

# MarkSessionPaid

## Overview
Auto-generated API reference for markSessionPaid.

## Source
- File: `src/lib/store/stripe.ts`
- Kind: `function`

## Definition
```ts
export async function markSessionPaid(
	session: Stripe.Checkout.Session
): Promise<void> {
	const slug = session.metadata?.product_slug
	if (slug !== 'prokit' && slug !== 'saaskit') {
		return
	}

	const stripe = getStripeClient()
	const config = getProductConfig(slug)
	const customer = toCustomer(session.customer)

	await stripe.checkout.sessions.update(session.id, {
		metadata: {
			...(session.metadata || {}),
			[config.paidKey]: 'true',
			[config.lastSessionKey]: session.id,
		},
	})

	if (customer) {
		await stripe.customers.update(customer.id, {
			metadata: {
				...(customer.metadata || {}),
				[config.paidKey]: 'true',
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
					[config.lastSessionKey]: session.id,
				},
			})
		}
	}
}
```
