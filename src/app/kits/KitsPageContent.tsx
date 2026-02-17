'use client'

import KitsShell from './_components/KitsShell'
import { Hero } from '@/app/marketing-ai-studio/components/sections/Hero'
import { RoutingTiles } from '@/app/marketing-ai-studio/components/sections/RoutingTiles'

const KitsPageContent = () => {
	return (
		<KitsShell>
			<Hero
				headline="Kits, not guesses."
				subhead="Pick the kit that matches where you are."
				primaryCta="Explore SaaSKit"
				primaryCtaLink="/kits/saaskit"
				secondaryCta="Explore ProKit"
				secondaryCtaLink="/kits/prokit"
				microProof="Proven foundations for every stage"
			/>
			<div>
				<RoutingTiles />
			</div>
		</KitsShell>
	)
}

export default KitsPageContent
