"use server"
import prisma from "@/libs/prisma";
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import configFile from "@/config";
import { hasClerkServerKeys } from '@/libs/safeClerkServer'
import { getStripeClient, stripeService } from '@/libs/stripe';
import emailEvents from "@/events/email-events";
import { randomUUID } from 'crypto';

export async function getSubscriptionByUserId(userId: string) {
    const existingSubscription = await prisma.subscription.findFirst({
        where: { user_clerk_id: userId },
    });
    return existingSubscription
}

export async function processCheckoutSuccessWebhook(body: any, event: Stripe.Event) {
  const stripe = getStripeClient()
  const stripeObject: Stripe.Checkout.Session = event.data
  .object as Stripe.Checkout.Session;
const session = await stripeService.findCheckoutSession(stripeObject.id);
const customerId = session?.customer;
const priceId = session?.line_items?.data[0]?.price.id;
const plan = configFile.stripe.products.find((p) => p.priceId === priceId);
if (!plan) {
  return NextResponse.json({ error: 'Plan not found' }, { status: 400 });
}
const customer = (await stripe.customers.retrieve(
  customerId as string
)) as Stripe.Customer;

if (!customer || !customer.email) {
  console.error('No customer email found');
  return NextResponse.json({ error: 'No customer email found for subscription' }, { status: 400 });
}

const price = await stripe.prices.retrieve(priceId)

if(!price) {
  return new Response('Price not found', {
    status: 500
  })
}

const product = await stripe.products.retrieve(
  typeof price.product === 'string' ? price.product : price.product.id
);

if(!product) {
return new Response('Product not found', {
  status: 500
})
}

const subsType = product.metadata.subscription_type || 'default'
const customerEmail = customer.email;
if (!hasClerkServerKeys) {
  return NextResponse.json(
    { error: 'Clerk is not configured for customer lookup' },
    { status: 501 }
  )
}
const { clerkClient } = await import('@clerk/nextjs/server')
const users = await clerkClient.users.getUserList({emailAddress:[customerEmail]})

if (!users.data.length) {
  console.error('Clerc user not found');
  return NextResponse.json({ error: 'No customer email found for subscription' }, { status: 400 });
}

const user = users.data[0]
const subsId = body?.data?.object?.subscription as string

await prisma.subscription.upsert({
  where: {
    user_clerk_id: user.id,
  },
  create: {
      id: randomUUID(),
      last_stripe_cs_id: stripeObject.id,
    user_clerk_id: user.id,
    ...(subsId ? {sub_stripe_id: subsId}: {}),
    sub_status: 'active',
    user_email: customerEmail,
    sub_type: subsType,
    stripe_customer_id: customer.id,
  },
  update: {
      last_stripe_cs_id: stripeObject.id,
    ...(subsId ? {sub_stripe_id: subsId}: {}),
    sub_status: 'active',
  }
});

emailEvents.emit('sendThanksYouEmail', customerEmail)

return NextResponse.json({}, { status: 200 });
}

export async function processSubscriptonDelete(event: Stripe.Event) {
        const stripe = getStripeClient()

        // The customer subscription stopped
        // ❌ Revoke access to the product
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;
        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id
        );
        const prismaSub = await prisma.subscription.findFirst({
          where: { sub_stripe_id: subscription.id },
        });
        // Revoke access to your product
        await prisma.subscription.update({
          where: { id: prismaSub.id },
          data: { sub_status: 'inactive', },
        });
}

export async function processInvoicePaid(body: any, event: Stripe.Event) {
        // Customer just paid an invoice (for instance, a recurring payment for a subscription)
        // ✅ Grant access to the product
        const stripeObject: Stripe.Invoice = event.data
          .object as Stripe.Invoice;
        const subscription = await prisma.subscription.findFirst({
          where: { stripe_customer_id: stripeObject.customer.toString() },
        });

        const subsId = body?.data?.object?.subscription as string
  
        if(!subsId) {
          return new Response('Subscription is invalid', {
            status: 400
          })
        }
      
        if(subscription?.sub_stripe_id !== subsId) {
          return new Response('Subscription is invalid', {
            status: 403
          })
        }

        // Make sure the invoice is for the same plan (priceId) the user subscribed to
        // Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: { sub_status: 'active', },
        });
}
