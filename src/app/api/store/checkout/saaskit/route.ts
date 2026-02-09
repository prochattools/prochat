import { NextResponse } from 'next/server'
import { getProductConfig, getStripeClient } from '@/lib/store/stripe'

const PRODUCT_SLUG = 'saaskit' as const

const stripe = (() => {
  try {
    return getStripeClient()
  } catch {
    return null
  }
})()

const getOrigin = (req: Request) => {
  const host = req.headers.get('host') || ''
  const proto =
    req.headers.get('x-forwarded-proto') ||
    (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }
    const productConfig = getProductConfig(PRODUCT_SLUG)

    const origin = getOrigin(req)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: productConfig.priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/store/saaskit/finish?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store/saaskit`,
      metadata: {
        product_slug: PRODUCT_SLUG,
        entitlement_type: 'github_repo',
        github_repo: productConfig.githubRepo,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[checkout/saaskit] error', error)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
