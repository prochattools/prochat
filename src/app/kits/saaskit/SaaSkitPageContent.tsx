'use client'

import { useEffect, useCallback, useState } from 'react'
import KitsShell from '../_components/KitsShell'
import { Hero } from '@/app/marketing-ai-studio/components/sections/Hero'
import { Features } from '@/app/marketing-ai-studio/components/sections/Features'
import { Proof } from '@/app/marketing-ai-studio/components/sections/Expansions'
import { Pricing } from '@/app/marketing-ai-studio/components/sections/Pricing'
import { trackEvent } from '@/utils/analytics'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { useUser } from '@/libs/safeClerk'

interface SaaSkitPageContentProps {
	priceId: string | null
}

const SAASKIT_FEATURES = [
	'Service-to-SaaS offer blueprint',
	'Launch assets and delivery workflows',
	'Stripe checkout and operations wiring',
	'Reusable conversion sections',
	'Implementation documentation',
	'Commercial usage license',
]

const SaaSkitPageContent = ({ priceId }: SaaSkitPageContentProps) => {
	const { isLoaded, isSignedIn, user } = useUser()
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
		if (!priceId || isCheckingOut) return

		const userId = isLoaded && isSignedIn ? user?.id || null : null
		const email =
			isLoaded && isSignedIn ? user?.primaryEmailAddress?.emailAddress || null : null

		handleCheckoutProcess(
			priceId,
			userId,
			email,
			setIsCheckingOut,
			setCheckoutError
		)
	}, [priceId, isCheckingOut, isLoaded, isSignedIn, user])

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

