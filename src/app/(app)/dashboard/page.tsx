import PricingSection from '@/components/PricingSection'
import BillingPortalButton from '@/components/BillingPortalButton'
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

  return (
    <div className="container mx-auto px-4 py-12">
      {isInactive ? (
        <>
          <h1 className="text-2xl font-bold mb-2">Billing</h1>
          <p className="text-muted-foreground mb-8">
            Choose a plan to activate your account.
          </p>
          <PricingSection />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            Your subscription is active.
          </p>

          <BillingPortalButton />
        </>
      )}
    </div>
  )
}
