'use client'

import { useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import KitsShell from '../_components/KitsShell'
import { Hero } from '@/app/marketing-ai-studio/components/sections/Hero'
import { Features } from '@/app/marketing-ai-studio/components/sections/Features'
import { Proof } from '@/app/marketing-ai-studio/components/sections/Expansions'
import { Pricing } from '@/app/marketing-ai-studio/components/sections/Pricing'
import { trackEvent } from '@/utils/analytics'

interface ProKitPageContentProps {
	priceId: string | null
}

const ProKitPageContent = ({ priceId }: ProKitPageContentProps) => {
	const router = useRouter()
	const checkoutHref = useMemo(() => {
		if (!priceId) return '/processing-page'
		return `/processing-page?priceId=${encodeURIComponent(priceId)}`
	}, [priceId])

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
		router.push(checkoutHref)
	}, [checkoutHref, router])

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
