import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY
const priceId = process.env.STRIPE_PRICE_PROKIT

const stripe = stripeKey
  ? new Stripe(stripeKey, { apiVersion: '2024-06-20' })
  : null

const getOrigin = (req: Request) => {
  const host = req.headers.get('host') || ''
  const proto =
    req.headers.get('x-forwarded-proto') ||
    (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

export async function POST(req: Request) {
  try {
    if (!stripe || !priceId) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const origin = getOrigin(req)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/store/prokit/finish?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store/prokit`,
      metadata: {
        product_slug: 'prokit',
        entitlement_type: 'github_repo',
        github_repo: 'prochattools/prokit',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[checkout/prokit] error', error)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
