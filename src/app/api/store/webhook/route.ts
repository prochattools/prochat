import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeClient, markSessionPaid } from '@/lib/store/stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const stripe = (() => {
  try {
    return getStripeClient()
  } catch {
    return null
  }
})()

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
      if (session.metadata?.entitlement_type === 'github_repo') {
        await markSessionPaid(session)
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[webhook] handler error', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
