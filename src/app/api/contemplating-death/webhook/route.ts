import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { CD_EVENT_KEY } from "@/lib/contemplating-death/config";
import { CD_TABLE, cdDb } from "@/lib/contemplating-death/db";
import { fulfillCheckoutSession } from "@/lib/contemplating-death/tickets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook for Contemplating Death tickets.
 * Subscribe this endpoint to: checkout.session.completed,
 * checkout.session.async_payment_succeeded, checkout.session.expired,
 * charge.refunded.
 */
export async function POST(request: Request) {
  const secret =
    process.env.CD_STRIPE_WEBHOOK_SECRET ?? process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secret || !signature) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    // The signature covers the exact raw body, so read it as text.
    const body = await request.text();
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        if (session.metadata?.event !== CD_EVENT_KEY) break;
        const result = await fulfillCheckoutSession(session);
        if (result.state === "paid" && result.emailError) {
          // A 500 makes Stripe retry, which retries the ticket email.
          return NextResponse.json(
            { error: "Ticket email failed" },
            { status: 500 }
          );
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object;
        if (session.metadata?.event !== CD_EVENT_KEY) break;
        await cdDb()
          .from(CD_TABLE)
          .update({ status: "expired" })
          .eq("stripe_session_id", session.id)
          .eq("status", "pending");
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object;
        if (charge.metadata?.event !== CD_EVENT_KEY || !charge.refunded) break;
        const paymentIntentId =
          typeof charge.payment_intent === "string"
            ? charge.payment_intent
            : charge.payment_intent?.id;
        if (!paymentIntentId) break;
        await cdDb()
          .from(CD_TABLE)
          .update({ status: "refunded" })
          .eq("stripe_payment_intent_id", paymentIntentId)
          .eq("status", "paid");
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error(
      "Contemplating Death webhook failed:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
