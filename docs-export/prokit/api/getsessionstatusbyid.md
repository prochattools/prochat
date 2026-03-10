<!-- GENERATED FILE - DO NOT EDIT -->
---
title: GetSessionStatusById
description: GetSessionStatusById function extracted from src/lib/store/stripe.ts.
category: boilerplate
slug: getsessionstatusbyid
order: 100
keywords:
  - prokit
  - api
  - getSessionStatusById
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/stripe.ts
generatedAt: 2026-03-10T23:47:09.852Z
---

# GetSessionStatusById

## Overview
Auto-generated API reference for getSessionStatusById.

## Source
- File: `src/lib/store/stripe.ts`
- Kind: `function`

## Definition
```ts
export async function getSessionStatusById(
	sessionId: string,
	expectedProduct: ProductSlug
): Promise<EntitlementStatus> {
	try {
		const productConfig = getProductConfig(expectedProduct)
		const session = await retrieveSessionById(sessionId)
		let effectiveSession = session

		if (!effectiveSession) {
			return {
				state: 'invalid_session',
				message: 'Session not found.',
			}
		}

		if (effectiveSession.metadata?.product_slug !== expectedProduct) {
			return {
				state: 'invalid_session',
				message: 'This session does not match the selected product.',
			}
		}

		if (effectiveSession.payment_status !== 'paid') {
			return {
				state: 'unpaid',
				message: 'Payment not completed yet.',
				productSlug: expectedProduct,
				email: getSessionEmail(effectiveSession),
			}
		}

		// Self-heal paid sessions when webhook delivery is delayed or unavailable.
		if (getMetadataValue(effectiveSession, productConfig.paidKey) !== 'true') {
			try {
				await markSessionPaid(effectiveSession)
				const refreshedSession = await retrieveSessionById(effectiveSession.id)
				if (refreshedSession) {
					effectiveSession = refreshedSession
				}
			} catch (error) {
				console.error('[store] Failed to auto-mark paid session', error)
			}
		}

		if (getMetadataValue(effectiveSession, productConfig.paidKey) !== 'true') {
			return {
				state: 'unpaid',
				message:
					'Payment is still being verified by Stripe webhook. If you just paid, wait a minute and refresh this page.',
				productSlug: expectedProduct,
				email: getSessionEmail(effectiveSession),
			}
		}

		const email = getSessionEmail(effectiveSession)
		const githubUsername =
			getMetadataValue(effectiveSession, productConfig.usernameKey) || null

		if (isProvisioned(effectiveSession, productConfig.provisionedKey)) {
			return {
				state: 'provisioned',
				productSlug: expectedProduct,
				email,
				githubUsername,
			}
		}

		return {
			state: 'paid_unclaimed',
			productSlug: expectedProduct,
			email,
			githubUsername,
		}
	} catch (error) {
		console.error('[store] Failed to inspect checkout session status', error)
		return {
			state: 'error',
			message: 'Unable to verify payment status right now.',
		}
	}
}
```
