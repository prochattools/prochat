import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import config from '@/config'

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error:
          'Stripe is not configured. Set STRIPE_SECRET_KEY to enable checkout sessions.',
      },
      { status: 501 }
    )
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20',
  })

  try {
    const { priceId, email, userId } = (await req.json()) as {
      priceId?: string
      email?: string
      userId?: string
    }

    if (!priceId) {
      return NextResponse.json({ error: 'priceId is required' }, { status: 400 })
    }

    const currentProduct = config.stripe.products.find(
      (prod) => prod.priceId === priceId
    )

    if (!currentProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const isSub = currentProduct.type === 'subscription'
    const planType = priceId.includes('monthly') ? 'monthly' : 'yearly'

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || ''

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: isSub ? 'subscription' : 'payment',
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: email,
      metadata: {
        priceId,
        productId: currentProduct.productId,
        userId: userId || 'anonymous',
        ...(isSub ? { planType } : {}),
      },
    })

    return NextResponse.json({ sessionId: session.id, checkoutUrl: session.url })
  } catch (err: any) {
    console.error('Stripe API error:', err)

    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode || 500 }
      )
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
