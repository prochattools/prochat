import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import config from "@/config";
import { getGithubConfig } from '@/lib/store/github'
import {
  getStripeMode,
  getStripePriceProkit,
  getStripePriceSaaskit,
  getStripeProductProkit,
  getStripeProductSaaskit,
  getStripeSecretKey,
} from '@/libs/stripe-env';

const getOrigin = (req: Request) => {
  const directOrigin = req.headers.get('origin');
  if (directOrigin) {
    return directOrigin;
  }
  const host = req.headers.get('host') || '';
  const proto =
    req.headers.get('x-forwarded-proto') ||
    (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
};

const resolveKitProductSlug = (priceId: string, productId?: string) => {
  const prokitPrice = getStripePriceProkit();
  const saaskitPrice = getStripePriceSaaskit();
  const prokitProduct = getStripeProductProkit();
  const saaskitProduct = getStripeProductSaaskit();

  if (priceId === prokitPrice || (productId && productId === prokitProduct)) {
    return 'prokit' as const;
  }

  if (priceId === saaskitPrice || (productId && productId === saaskitProduct)) {
    return 'saaskit' as const;
  }

  return null;
};

export async function POST(req: Request) {
  try {
    const stripeMode = getStripeMode();
    const stripe = new Stripe(getStripeSecretKey(), {
      apiVersion: '2024-06-20',
    });

    const { priceId, email, userId } = await req.json() as { priceId?: string; email?: string; userId?: string };

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const currentProduct = config.stripe.products.find((prod) => prod.priceId === priceId)

    if(!currentProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 400 });
    }

    const isSub = currentProduct.type === 'subscription'
    const planType = priceId.includes('monthly') ? 'monthly' : 'yearly';

    const mode = isSub ? 'subscription' : 'payment'

    const customerEmail = email || undefined
    const origin = getOrigin(req);
    const productSlug = resolveKitProductSlug(priceId, currentProduct.productId);
    const githubRepo = productSlug
      ? (() => {
          const { repoOwner, repoName } = getGithubConfig(productSlug);
          return `${repoOwner}/${repoName}`;
        })()
      : undefined;

    const successUrl = productSlug
      ? `${origin}/kits/${productSlug}/finish?session_id={CHECKOUT_SESSION_ID}`
      : `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl = productSlug
      ? `${origin}/kits/${productSlug}`
      : `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      metadata: {
        priceId: priceId,
        productId: currentProduct.productId,
        userId: userId || 'anonymous',
        ...(isSub ? {planType} : {}),
        ...(productSlug
          ? {
              product_slug: productSlug,
              entitlement_type: 'github_repo',
              ...(githubRepo ? { github_repo: githubRepo } : {}),
            }
          : {}),
      },
    });

    if ((stripeMode === 'live') !== session.livemode) {
      console.error('Stripe mode mismatch detected after session creation', {
        stripeMode,
        sessionLivemode: session.livemode,
        sessionId: session.id,
      });
      return NextResponse.json(
        {
          error:
            'Stripe is misconfigured: checkout mode does not match STRIPE_MODE. Verify live/test keys and mode variables.',
        },
        { status: 500 }
      );
    }

    console.log('Created Stripe session:', {
      id: session.id,
      livemode: session.livemode,
      customer_email: session.customer_email,
      payment_status: session.payment_status,
      url: session.url
    });

    return NextResponse.json({ sessionId: session.id, checkoutUrl: session.url });
  } catch (err) {
    console.error('Stripe API error:', err);
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
