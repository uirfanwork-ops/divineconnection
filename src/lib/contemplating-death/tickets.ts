import crypto from "crypto";
import QRCode from "qrcode";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/email";
import { cdEvent } from "../../../content/contemplating-death";
import { CD_EVENT_KEY, CD_PATH, getCdBaseUrl, getCdEmailFrom } from "./config";
import { CD_TABLE, cdDb, type CdRegistration } from "./db";
import { ticketEmail } from "./email-template";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateTicketToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function generateTicketCode(): string {
  const bytes = crypto.randomBytes(6);
  let code = "";
  bytes.forEach((byte) => {
    code += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  });
  return `CD-${code}`;
}

/** The URL encoded in the QR code. It only works for signed-in staff. */
export function checkInUrl(token: string): string {
  return `${getCdBaseUrl()}${CD_PATH}/check-in/${token}`;
}

export function ticketUrl(token: string): string {
  return `${getCdBaseUrl()}${CD_PATH}/ticket/${token}`;
}

export async function ticketQrPng(token: string): Promise<Buffer> {
  return QRCode.toBuffer(checkInUrl(token), {
    type: "png",
    width: 640,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#151612", light: "#ffffff" },
  });
}

export async function ticketQrSvg(token: string): Promise<string> {
  return QRCode.toString(checkInUrl(token), {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#151612", light: "#ffffff" },
  });
}

/**
 * Emails the ticket once. The ticket_emailed_at column is claimed first, so
 * the webhook and the success page can both call this without double sending.
 * Pass force to resend from the admin page.
 */
export async function sendTicketEmail(
  registration: CdRegistration,
  options: { force?: boolean } = {}
): Promise<boolean> {
  const db = cdDb();

  if (!options.force) {
    const { data: claimed, error } = await db
      .from(CD_TABLE)
      .update({ ticket_emailed_at: new Date().toISOString() })
      .eq("id", registration.id)
      .is("ticket_emailed_at", null)
      .select("id")
      .maybeSingle();

    if (error) throw new Error(`Ticket email claim failed: ${error.message}`);
    if (!claimed) return false;
  }

  try {
    const qr = await ticketQrPng(registration.ticket_token);
    const { subject, html } = ticketEmail(registration, {
      ticketUrl: ticketUrl(registration.ticket_token),
    });

    await sendEmail({
      from: getCdEmailFrom(),
      to: registration.email,
      replyTo: cdEvent.contactEmail,
      subject,
      html,
      attachments: [
        {
          filename: `ticket-${registration.ticket_code}.png`,
          content: qr,
          contentType: "image/png",
          contentId: "ticket-qr",
        },
      ],
    });

    if (options.force) {
      await db
        .from(CD_TABLE)
        .update({ ticket_emailed_at: new Date().toISOString() })
        .eq("id", registration.id);
    }
    return true;
  } catch (error) {
    if (!options.force) {
      // Release the claim so a webhook retry or the admin can send it again.
      await db
        .from(CD_TABLE)
        .update({ ticket_emailed_at: null })
        .eq("id", registration.id);
    }
    throw error;
  }
}

export type FulfillResult =
  | { state: "paid"; registration: CdRegistration; emailError: boolean }
  | { state: "unpaid" }
  | { state: "not_found" };

/**
 * Marks a registration as paid and emails the ticket. Safe to call any number
 * of times for the same Checkout Session: Stripe is the source of truth for
 * payment, and both database writes are conditional.
 */
export async function fulfillCheckoutSession(
  sessionOrId: string | Stripe.Checkout.Session
): Promise<FulfillResult> {
  const session =
    typeof sessionOrId === "string"
      ? await getStripe().checkout.sessions.retrieve(sessionOrId)
      : sessionOrId;

  if (session.metadata?.event !== CD_EVENT_KEY) return { state: "not_found" };

  const registrationId =
    session.client_reference_id ?? session.metadata?.registration_id;
  if (!registrationId) return { state: "not_found" };
  // A 100% promotion code completes checkout with nothing to charge.
  const settled =
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required";
  if (session.status !== "complete" || !settled) return { state: "unpaid" };

  const db = cdDb();
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  const { error: updateError } = await db
    .from(CD_TABLE)
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      stripe_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId,
      amount_cents: session.amount_total ?? cdEvent.priceCents,
    })
    .eq("id", registrationId)
    .in("status", ["pending", "expired"]);

  if (updateError) {
    throw new Error(`Could not mark registration paid: ${updateError.message}`);
  }

  const { data, error } = await db
    .from(CD_TABLE)
    .select("*")
    .eq("id", registrationId)
    .maybeSingle();

  if (error) throw new Error(`Could not load registration: ${error.message}`);
  const registration = data as CdRegistration | null;
  if (!registration || registration.status !== "paid") {
    return { state: "not_found" };
  }

  let emailError = false;
  try {
    await sendTicketEmail(registration);
  } catch (err) {
    emailError = true;
    console.error(
      "Contemplating Death ticket email failed:",
      err instanceof Error ? err.message : err
    );
  }

  return { state: "paid", registration, emailError };
}

export async function getRegistrationByToken(
  token: string
): Promise<CdRegistration | null> {
  const { data, error } = await cdDb()
    .from(CD_TABLE)
    .select("*")
    .eq("ticket_token", token)
    .maybeSingle();

  if (error) throw new Error(`Could not load ticket: ${error.message}`);
  return (data as CdRegistration | null) ?? null;
}
