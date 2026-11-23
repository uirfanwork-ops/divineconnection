"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { sanitizeInput } from "@/lib/sanitize";
import { checkCdCheckoutRateLimit } from "@/lib/rate-limit";
import {
  CD_EVENT_KEY,
  CD_PATH,
  getCdBaseUrl,
  getCdCapacity,
  isCdRegistrationOpen,
  isStripeConfigured,
} from "@/lib/contemplating-death/config";
import { CD_TABLE, cdDb } from "@/lib/contemplating-death/db";
import {
  generateTicketCode,
  generateTicketToken,
} from "@/lib/contemplating-death/tickets";
import { cdEvent } from "../../../content/contemplating-death";

export interface CheckoutResult {
  ok: boolean;
  url?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const yesNo = z.enum(["yes", "no"], { message: "Choose yes or no." });
const optionalText = z
  .string()
  .max(1000, "Keep this under 1,000 characters.")
  .optional()
  .default("");

const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter the attendee's full name.")
    .max(120, "Keep the name under 120 characters."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "That email address is too long.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(40, "Keep the phone number under 40 characters.")
    .optional()
    .default(""),
  source: z.enum(["social", "friend", "masjid", "other"], {
    message: "Choose how you heard about the event.",
  }),
  heardOfMathabah: yesNo,
  attendedMathabah: yesNo,
  interest: optionalText,
  accessibility: optionalText,
  updates: yesNo,
});

const CONTACT = `Please email ${cdEvent.contactEmail} and we will help.`;

export async function startCheckout(input: unknown): Promise<CheckoutResult> {
  if (!isCdRegistrationOpen()) {
    return { ok: false, error: "Online registration is currently closed." };
  }

  // Honeypot: real visitors never see or fill this field.
  if (
    typeof input === "object" &&
    input !== null &&
    "company" in input &&
    (input as { company?: unknown }).company
  ) {
    return { ok: false, error: "We could not process that registration." };
  }

  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";
  const rateLimit = await checkCdCheckoutRateLimit(ip);
  if (!rateLimit.success) {
    return {
      ok: false,
      error:
        "Too many attempts from this network. Please try again in an hour.",
    };
  }

  if (!isStripeConfigured()) {
    console.error("Contemplating Death checkout: STRIPE_SECRET_KEY is not set");
    return {
      ok: false,
      error: `Online payment is not available right now. ${CONTACT}`,
    };
  }

  const data = parsed.data;

  try {
    const db = cdDb();

    const capacity = getCdCapacity();
    if (capacity !== null) {
      const { count, error: countError } = await db
        .from(CD_TABLE)
        .select("id", { count: "exact", head: true })
        .eq("status", "paid");
      if (countError) throw new Error(countError.message);
      if ((count ?? 0) >= capacity) {
        return {
          ok: false,
          error: `This event is now full. To join the waitlist, email ${cdEvent.contactEmail}.`,
        };
      }
    }

    const { data: inserted, error: insertError } = await db
      .from(CD_TABLE)
      .insert({
        full_name: sanitizeInput(data.name),
        email: data.email,
        phone: sanitizeInput(data.phone) || null,
        source: data.source,
        heard_of_mathabah: data.heardOfMathabah === "yes",
        attended_mathabah: data.attendedMathabah === "yes",
        interest: sanitizeInput(data.interest) || null,
        accessibility: sanitizeInput(data.accessibility) || null,
        wants_updates: data.updates === "yes",
        amount_cents: cdEvent.priceCents,
        currency: cdEvent.currency,
        ticket_token: generateTicketToken(),
        ticket_code: generateTicketCode(),
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      throw new Error(insertError?.message ?? "Insert returned no row");
    }

    const registrationId = inserted.id as string;
    const baseUrl = getCdBaseUrl();
    const priceId = process.env.CD_STRIPE_PRICE_ID;

    // The amount is always set here on the server (or by the Stripe price),
    // never taken from the browser.
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        priceId
          ? { price: priceId, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: cdEvent.currency.toLowerCase(),
                unit_amount: cdEvent.priceCents,
                product_data: {
                  name: `${cdEvent.title}: seminar ticket`,
                  description: `${cdEvent.dateLabel}, ${cdEvent.startLabel} to ${cdEvent.endLabel} ${cdEvent.timezoneLabel}. ${cdEvent.venueName}, Mississauga. Admits one.`,
                },
              },
            },
      ],
      customer_email: data.email,
      client_reference_id: registrationId,
      metadata: { event: CD_EVENT_KEY, registration_id: registrationId },
      payment_intent_data: {
        description: `${cdEvent.title} ticket for ${sanitizeInput(data.name)}`,
        metadata: { event: CD_EVENT_KEY, registration_id: registrationId },
      },
      success_url: `${baseUrl}${CD_PATH}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${CD_PATH}?payment=cancelled#register`,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    if (!session.url) throw new Error("Stripe returned no checkout URL");

    await db
      .from(CD_TABLE)
      .update({ stripe_session_id: session.id })
      .eq("id", registrationId);

    return { ok: true, url: session.url };
  } catch (error) {
    console.error(
      "Contemplating Death checkout failed:",
      error instanceof Error ? error.message : error
    );
    return {
      ok: false,
      error: `We could not start the payment. Please try again. If it keeps happening, email ${cdEvent.contactEmail}.`,
    };
  }
}
