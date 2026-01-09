import PricingSection from '@/components/PricingSection'
import Scenarios from '@/components/Scenarios'
import ThankYouPopup from '@/components/ThankyouPopUp'
import { authenticateRequest, isClerkEnabled } from '@/libs/safeClerkServer'
import { redirect } from 'next/navigation'
import { getSubscriptionByUserId } from '../api/actions'

export default async function Dashboard() {
	const { userId } = await authenticateRequest()

	if (!userId) {
		if (!isClerkEnabled()) {
			return (
				<div className="mx-auto max-w-md px-6 py-20 text-center text-sm text-slate-600 dark:text-slate-300">
					Authentication is currently disabled.
				</div>
			)
		}
		redirect('/sign-in')
	}

	const sub = await getSubscriptionByUserId(userId)
	const isInactive = sub ? sub?.sub_status !== 'active' : true

	if (isInactive) {
		redirect('/processing-page')
	}

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
