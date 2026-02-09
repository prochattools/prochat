import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const stripeKey = process.env.STRIPE_SECRET_KEY

const stripe = stripeKey
  ? new Stripe(stripeKey, { apiVersion: '2024-06-20' })
  : null

export async function POST(req: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    )
  }

  const body = await req.text()
  const sig = headers().get('stripe-signature')

  let event: Stripe.Event
  try {
    if (!sig) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('[webhook] signature error', err?.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const customerId = session.customer as string | null

      if (
        session.metadata?.product_slug === 'prokit' &&
        customerId
      ) {
        // Mark paid on customer metadata (idempotent)
        await stripe.customers.update(customerId, {
          metadata: {
            prochat_prokit_paid: 'true',
            prochat_prokit_last_session: session.id,
          },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[webhook] handler error', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
