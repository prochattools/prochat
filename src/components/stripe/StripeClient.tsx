'use client'

import type { Stripe } from '@stripe/stripe-js'
import { getStripePublishableKey } from '@/libs/stripe-env'

let stripePromise: Promise<Stripe | null> | null = null

export async function getStripeClient() {
	if (!stripePromise) {
		const { loadStripe } = await import('@stripe/stripe-js')
		stripePromise = loadStripe(getStripePublishableKey())
	}

	return stripePromise
}
