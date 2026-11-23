import { cdEvent } from "../../../content/contemplating-death";

export const CD_EVENT_KEY = "contemplating-death";
export const CD_PATH = "/contemplating-death";

/**
 * Public origin used in Stripe return URLs, emails and QR codes.
 * Set CD_SITE_URL when this event is served from its own domain.
 */
export function getCdBaseUrl(): string {
  const explicit = process.env.CD_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Set CD_REGISTRATION_OPEN=false to close the form without a deploy of new code. */
export function isCdRegistrationOpen(): boolean {
  return (process.env.CD_REGISTRATION_OPEN ?? "true").toLowerCase() !== "false";
}

/** Optional seat cap. Leave CD_CAPACITY unset for no cap. */
export function getCdCapacity(): number | null {
  const raw = Number.parseInt(process.env.CD_CAPACITY ?? "", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : null;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Sends from the same verified address as the rest of the site, under the Mathabah name. */
export function getCdEmailFrom(): string {
  if (process.env.CD_EMAIL_FROM) return process.env.CD_EMAIL_FROM;
  const base =
    process.env.EMAIL_FROM ??
    "Divine Connections <noreply@divineconnections.ca>";
  const address = base.match(/<([^>]+)>/)?.[1] ?? base.trim();
  return `Mathabah Learning Centre <${address}>`;
}

export const cdPriceLabel = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: cdEvent.currency,
}).format(cdEvent.priceCents / 100);
