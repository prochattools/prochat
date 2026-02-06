import PricingSection from '@/components/PricingSection'
import Scenarios from '@/components/Scenarios'
import ThankYouPopup from '@/components/ThankyouPopUp'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getSubscriptionByUserId } from '@/app/api/actions'

export default async function Dashboard() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const sub = await getSubscriptionByUserId(userId)
  const isInactive = sub ? sub?.sub_status !== 'active' : true

  // SaaSKit note:
  // The processing funnel route (`/processing-page`) is optional.
  // For the default app flow we keep billing inside the dashboard.

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
