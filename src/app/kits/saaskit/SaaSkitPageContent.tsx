'use client'

import { useEffect, useCallback, useState } from 'react'
import KitsShell from '../_components/KitsShell'
import { Hero } from '@/app/marketing-ai-studio/components/sections/Hero'
import { Features } from '@/app/marketing-ai-studio/components/sections/Features'
import { Proof } from '@/app/marketing-ai-studio/components/sections/Expansions'
import { Pricing } from '@/app/marketing-ai-studio/components/sections/Pricing'
import { trackEvent } from '@/utils/analytics'

const SAASKIT_FEATURES = [
	'Service-to-SaaS offer blueprint',
	'Launch assets and delivery workflows',
	'Stripe checkout and operations wiring',
	'Reusable conversion sections',
	'Implementation documentation',
	'Commercial usage license',
]

const SaaSkitPageContent = () => {
	const [isCheckingOut, setIsCheckingOut] = useState(false)
	const [, setCheckoutError] = useState<string | null>(null)

	useEffect(() => {
		trackEvent('kit_view', { kit: 'saaskit', page: '/kits/saaskit' })
	}, [])

	const handleHeroCtaClick = useCallback(() => {
		trackEvent('cta_click', {
			kit: 'saaskit',
			cta: 'hero_buy_saaskit',
			page: '/kits/saaskit',
		})
	}, [])

	const handleCheckoutClick = useCallback(() => {
		trackEvent('cta_click', {
			kit: 'saaskit',
			cta: 'pricing_get_saaskit',
			page: '/kits/saaskit',
		})
		trackEvent('checkout_start', {
			kit: 'saaskit',
			cta: 'pricing_get_saaskit',
			page: '/kits/saaskit',
		})
		if (isCheckingOut) return

		setIsCheckingOut(true)
		setCheckoutError(null)

		void (async () => {
			try {
				const response = await fetch('/api/store/checkout/saaskit', {
					method: 'POST',
				})
				if (!response.ok) {
					throw new Error('Failed to start SaaSkit checkout')
				}
				const data = (await response.json()) as { url?: string }
				if (!data.url) {
					throw new Error('Checkout URL missing')
				}
				window.location.href = data.url
			} catch (error) {
				console.error('[kits/saaskit] checkout error', error)
				setCheckoutError('Could not start checkout. Please try again.')
				setIsCheckingOut(false)
			}
		})()
	}, [isCheckingOut])

	return (
		<KitsShell>
			<Hero
				headline="SaaSkit"
				subhead="SaaS Launch Kit for founders who already have an idea, audience, or offer and want to ship with less setup friction."
				primaryCta="Buy SaaSkit"
				primaryCtaLink="#pricing"
				secondaryCta={undefined}
				microProof="Operational Standard: Offer-first launch / Stripe / Delivery systems"
				onPrimaryCtaClick={handleHeroCtaClick}
			/>
			<Features
				sectionTitle="Launch-ready operating system."
				sectionDescription="SaaSkit packages the exact launch stack used at ProChat so you can go from offer to payment to delivery without rebuilding core systems."
				ctaLabel="Jump to SaaSkit pricing"
				ctaHref="#pricing"
			/>
			<Proof
				title="Proof in shipping."
				description="These are production interface patterns used to launch and fulfill paid offers. You adapt the offer, not the infrastructure."
			/>
			<Pricing
				onCtaClick={handleCheckoutClick}
				ctaLabel="Get SaaSkit"
				priceText="€197"
				priceCaption="Pay once. Launch repeatedly."
				features={SAASKIT_FEATURES}
			/>
		</KitsShell>
	)
}

export default SaaSkitPageContent
