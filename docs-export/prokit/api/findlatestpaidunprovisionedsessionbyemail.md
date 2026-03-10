<!-- GENERATED FILE - DO NOT EDIT -->
---
title: FindLatestPaidUnprovisionedSessionByEmail
description: FindLatestPaidUnprovisionedSessionByEmail function extracted from
  src/lib/store/stripe.ts.
category: boilerplate
slug: findlatestpaidunprovisionedsessionbyemail
order: 100
keywords:
  - prokit
  - api
  - findLatestPaidUnprovisionedSessionByEmail
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/stripe.ts
generatedAt: 2026-03-10T23:47:09.853Z
---

# FindLatestPaidUnprovisionedSessionByEmail

## Overview
Auto-generated API reference for findLatestPaidUnprovisionedSessionByEmail.

## Source
- File: `src/lib/store/stripe.ts`
- Kind: `function`

## Definition
```ts
export async function findLatestPaidUnprovisionedSessionByEmail(
	email: string,
	productSlug: ProductSlug
): Promise<{
	session: Stripe.Checkout.Session | null
	status: EntitlementStatus
}> {
	try {
		const stripe = getStripeClient()
		getProductConfig(productSlug)

		const normalizedEmail = email.trim().toLowerCase()
		const sessionList = await stripe.checkout.sessions.list({ limit: 20 })
		let pendingVerificationStatus: EntitlementStatus | null = null

		for (const listedSession of sessionList.data) {
			if (listedSession.metadata?.product_slug !== productSlug) {
				continue
			}
			if (listedSession.payment_status !== 'paid') {
				continue
			}

			const session = await retrieveSessionById(listedSession.id)
			if (!session) {
				continue
			}

			const status = await getSessionStatusById(session.id, productSlug)
			if (status.state !== 'paid_unclaimed') {
				if (
					status.state === 'unpaid' &&
					(status.email || '').trim().toLowerCase() === normalizedEmail
				) {
					pendingVerificationStatus = status
				}
				continue
			}

			if ((status.email || '').trim().toLowerCase() !== normalizedEmail) {
				continue
			}

			return { session, status }
		}

		if (pendingVerificationStatus) {
			return {
				session: null,
				status: pendingVerificationStatus,
			}
		}

		return {
			session: null,
			status: {
				state: 'invalid_session',
				message: 'No paid purchase found for this email.',
			},
		}
	} catch (error) {
		console.error('[store] Failed to lookup session by email', error)
		return {
			session: null,
			status: {
				state: 'error',
				message: 'Unable to verify purchases for that email right now.',
			},
		}
	}
}
```
