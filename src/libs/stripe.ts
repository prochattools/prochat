import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(
      'Stripe is not configured. Set STRIPE_SECRET_KEY to enable billing.'
    )
  }

  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: '2024-06-20',
      typescript: true,
    })
  }

  return stripeClient
}

export function getStripeWebhookSecret(): string {
  return process.env.STRIPE_WEBHOOK_SECRET || ''
}

class StripeService {
  // Create Customer Portal sessions so users can manage subscriptions.
  public async createCustomerPortal(
    customerId: string,
    returnUrl: string
  ): Promise<string> {
    const portalSession = await getStripeClient().billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })
    return portalSession.url
  }

  public async findCheckoutSession(sessionId: string) {
    try {
      const session = await getStripeClient().checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
      })
      return session
    } catch (e) {
      console.error(e)
      return null
    }
  }

  public async getSubscription(subId: string) {
    return getStripeClient().subscriptions.retrieve(subId)
  }

  public async getCheckoutSession(csId: string) {
    return getStripeClient().checkout.sessions.retrieve(csId)
  }
}

export const stripeService = new StripeService()
