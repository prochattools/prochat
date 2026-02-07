import Link from 'next/link'
import { redirect } from 'next/navigation'

import PricingSection from '@/components/PricingSection'
import BillingPortalButton from '@/components/BillingPortalButton'
import { getSubscriptionByUserId } from '@/app/api/actions'
import { hasClerkServerKeys, safeAuth } from '@/libs/safeClerkServer'

export default async function Dashboard() {
  if (!hasClerkServerKeys) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-2">Dashboard Setup Required</h1>
          <p className="text-muted-foreground mb-6">
            Clerk is not configured. Set Clerk keys to enable authentication and private dashboard
            access.
          </p>
          <div className="flex gap-3">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center rounded-md border px-4 py-2 font-semibold hover:bg-accent transition"
            >
              Open Setup
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700 transition"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { userId } = safeAuth()

  if (!userId) {
    redirect('/sign-in')
  }

  const sub = await getSubscriptionByUserId(userId)
  const isInactive = sub ? sub.sub_status !== 'active' : true

  return (
    <div className="container mx-auto px-4 py-12">
      {isInactive ? (
        <>
          <h1 className="text-2xl font-bold mb-2">Billing</h1>
          <p className="text-muted-foreground mb-8">Choose a plan to activate your account.</p>
          <PricingSection />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-6">Your subscription is active.</p>

          <BillingPortalButton />
        </>
      )}
    </div>
  )
}
