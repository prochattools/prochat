import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { getStripeClient, getStripeWebhookSecret } from '@/constants/stripe'
import {
  processSubscriptonDelete,
  processInvoicePaid,
  processCheckoutSuccessWebhook,
} from '../../actions'

export async function POST(req: NextRequest) {
  const webhookSecret = getStripeWebhookSecret()

  if (!webhookSecret) {
    return NextResponse.json(
      {
        error:
          'Stripe webhook is not configured. Set STRIPE_WEBHOOK_SECRET to enable webhooks.',
      },
      { status: 501 }
    )
  }

  let stripe: Stripe
  try {
    stripe = getStripeClient()
  } catch {
    return NextResponse.json(
      {
        error:
          'Stripe is not configured. Set STRIPE_SECRET_KEY to enable webhooks.',
      },
      { status: 501 }
    )
  }

  const rawBody = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err?.message || err}` },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const body = JSON.parse(rawBody)
        return processCheckoutSuccessWebhook(body, event)
      }
      case 'customer.subscription.deleted': {
        processSubscriptonDelete(event)
        break
      }
      case 'invoice.paid': {
        const body = JSON.parse(rawBody)
        processInvoicePaid(body, event)
        break
      }
      default:
      // ignore
    }
  } catch (e: any) {
    console.error('stripe webhook error:', e?.message || e)
  }

  return NextResponse.json({})
}
