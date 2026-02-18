import Stripe from "stripe";
import { getStripeSecretKey, getStripeWebhookSecret } from "@/libs/stripe-env";

const stripeSecretKey = getStripeSecretKey();

export const stripe = new Stripe(stripeSecretKey, {
  typescript: true,
});

export const webhookSecret = getStripeWebhookSecret();
