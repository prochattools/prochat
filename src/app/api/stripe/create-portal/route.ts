import { NextResponse, NextRequest } from 'next/server'

import prisma from '@/libs/prisma'
import { stripeService } from '@/libs/stripe'
import { hasClerkServerKeys, safeAuth } from '@/libs/safeClerkServer'

export async function POST(req: NextRequest) {
  if (!hasClerkServerKeys) {
    return NextResponse.json(
      {
        error: 'Clerk is not configured. Set Clerk keys to enable the billing portal.',
      },
      { status: 501 }
    )
  }

  const { userId } = safeAuth()

  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          'Stripe is not configured. Set STRIPE_SECRET_KEY to enable the customer portal.',
      },
      { status: 501 }
    )
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        user_clerk_id: userId,
      },
    })

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json(
        {
          error: "You don't have a billing account yet. Make a purchase first.",
        },
        { status: 400 }
      )
    }

    const returnUrl = `${req.headers.get('origin')}/dashboard`

    const stripePortalUrl = await stripeService.createCustomerPortal(
      subscription.stripe_customer_id,
      returnUrl
    )

    return NextResponse.json({ url: stripePortalUrl })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json(
      {
        error: error?.message || 'Failed to create Stripe portal session',
      },
      { status: 500 }
    )
  }
}
