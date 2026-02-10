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

interface ProKitPageContentProps {
	priceId: string | null
}

const ProKitPageContent = ({ priceId }: ProKitPageContentProps) => {
	const { isLoaded, isSignedIn, user } = useUser()
	const [isCheckingOut, setIsCheckingOut] = useState(false)
	const [, setCheckoutError] = useState<string | null>(null)

	useEffect(() => {
		trackEvent('kit_view', { kit: 'prokit', page: '/kits/prokit' })
	}, [])

	const handleHeroCtaClick = useCallback(() => {
		trackEvent('cta_click', {
			kit: 'prokit',
			cta: 'hero_buy_prokit',
			page: '/kits/prokit',
		})
	}, [])

	const handleCheckoutClick = useCallback(() => {
		trackEvent('cta_click', {
			kit: 'prokit',
			cta: 'pricing_get_prokit',
			page: '/kits/prokit',
		})
		trackEvent('checkout_start', {
			kit: 'prokit',
			cta: 'pricing_get_prokit',
			page: '/kits/prokit',
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
				headline="ProKit"
				subhead="Developer Core Boilerplate for builders who want the engine without the fluff."
				primaryCta="Buy ProKit"
				primaryCtaLink="#pricing"
				secondaryCta={undefined}
				microProof="Operational Standard: Next.js / TypeScript / Stripe / Postgres"
				onPrimaryCtaClick={handleHeroCtaClick}
			/>
			<Features />
			<Proof />
			<Pricing onCtaClick={handleCheckoutClick} ctaLabel="Get ProKit" />
		</KitsShell>
	)
}

export default ProKitPageContent
