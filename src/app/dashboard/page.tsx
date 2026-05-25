import type { Metadata } from 'next'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import PricingSection from '@/components/PricingSection'
import Scenarios from '@/components/Scenarios'
import ThankYouPopup from '@/components/ThankyouPopUp'

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
}

export default async function Dashboard() {
	const isInactive = true

	return (
		<div>
			{isInactive ? (
				<PricingSection />
			) : (
				<div>
					<Scenarios />
					<ThankYouPopup />
				</div>
			)}
		</div>
	)
}
