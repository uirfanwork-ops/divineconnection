import Stripe from "stripe";

let client: Stripe | null = null;

/**
 * Returns the shared Stripe client. Created on first use so that pages which
 * import payment code still load (and the app still builds) when
 * STRIPE_SECRET_KEY is not set. Server only.
 */
export function getStripe(): Stripe {
  if (!client) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    }
    client = new Stripe(stripeSecretKey, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    });
  }
  return client;
}
