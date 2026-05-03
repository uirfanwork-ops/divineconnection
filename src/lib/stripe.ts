import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NEXT_PHASE !== "phase-production-build") {
  console.warn("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(stripeSecretKey ?? "", {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

export const STRIPE_WEBHOOK_SECRET =
  process.env.STRIPE_WEBHOOK_SECRET ?? "";
