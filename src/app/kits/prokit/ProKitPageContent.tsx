'use client'

import { useEffect, useCallback, useState } from 'react'
import KitsShell from '../_components/KitsShell'
import { Hero } from '@/app/marketing-ai-studio/components/sections/Hero'
import { Features } from '@/app/marketing-ai-studio/components/sections/Features'
import { Proof } from '@/app/marketing-ai-studio/components/sections/Expansions'
import { Pricing } from '@/app/marketing-ai-studio/components/sections/Pricing'
import { trackEvent } from '@/utils/analytics'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { useUser, useClerk, isClerkEnabled } from '@/libs/safeClerk'

interface ProKitPageContentProps {
	priceId: string | null
}

const ProKitPageContent = ({ priceId }: ProKitPageContentProps) => {
	const { isLoaded, isSignedIn, user } = useUser()
	const { openSignIn } = useClerk()
	const [isCheckingOut, setIsCheckingOut] = useState(false)
	const [, setCheckoutError] = useState<string | null>(null)

	useEffect(() => {
		if (!isLoaded || !isSignedIn || !user || !priceId) return
		if (typeof window === 'undefined') return

		const pendingPriceId = window.localStorage.getItem('pendingCheckoutPriceId')
		if (!pendingPriceId) return

		window.localStorage.removeItem('pendingCheckoutPriceId')
		handleCheckoutProcess(
			pendingPriceId,
			user.id || 'anonymous',
			user.primaryEmailAddress?.emailAddress || null,
			setIsCheckingOut,
			setCheckoutError
		)
	}, [isLoaded, isSignedIn, user, priceId])

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
		if (!priceId || isCheckingOut || !isLoaded) return

		if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
			if (isClerkEnabled) {
				if (typeof window !== 'undefined') {
					window.localStorage.setItem('pendingCheckoutPriceId', priceId)
				}
				openSignIn({ redirectUrl: '/kits/prokit?checkout=1' })
			}
			return
		}

		handleCheckoutProcess(
			priceId,
			user.id || 'anonymous',
			user.primaryEmailAddress?.emailAddress || null,
			setIsCheckingOut,
			setCheckoutError
		)
	}, [priceId, isCheckingOut, isLoaded, isSignedIn, user, openSignIn])

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
