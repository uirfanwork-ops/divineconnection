"use server";

import crypto from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { registrationSchema } from "@/lib/validations/registration";
import { createServiceClient } from "@/lib/supabase/service";
import { checkRegistrationRateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import {
  eTransferConfirmationEmail,
  adminNewRegistrationEmail,
} from "@/lib/emails/templates";

export interface RegistrationActionState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  registrationId?: string;
}

const FALLBACK_TIER_PRICES: Record<string, { price_cents: number; currency: string; name: string }> = {
  "00000000-0000-0000-0000-000000000001": { price_cents: 47500, currency: "CAD", name: "Early Bird" },
  "00000000-0000-0000-0000-000000000002": { price_cents: 55000, currency: "CAD", name: "Regular" },
};

function parseBool(value: FormDataEntryValue | null): boolean {
  if (value === null) return false;
  const s = String(value).toLowerCase();
  return s === "true" || s === "on" || s === "yes" || s === "1";
}

function generateConfirmationCode(): string {
  return crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 8);
}

export async function submitRegistration(
  _prevState: RegistrationActionState,
  formData: FormData
): Promise<RegistrationActionState> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  const rateLimit = await checkRegistrationRateLimit(ip);
  if (!rateLimit.success) {
    return {
      success: false,
      error: "Too many registration attempts. Please try again in an hour.",
    };
  }

  const tierId = String(formData.get("tier_id") ?? "");

  const rawData = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    date_of_birth: formData.get("date_of_birth"),
    gender: formData.get("gender"),
    emergency_contact_name: formData.get("emergency_contact_name"),
    emergency_contact_relationship: formData.get("emergency_contact_relationship"),
    emergency_contact_phone: formData.get("emergency_contact_phone"),
    allergies: formData.get("allergies") || "",
    medical_conditions: formData.get("medical_conditions") || "",
    current_medications: formData.get("current_medications") || "",
    dietary_restrictions: formData.get("dietary_restrictions") || "",
    driving_self: parseBool(formData.get("driving_self")),
    seeking_carpool: parseBool(formData.get("seeking_carpool")),
    photo_consent: parseBool(formData.get("photo_consent")),
    accept_waiver: parseBool(formData.get("accept_waiver")),
    accept_code_of_conduct: parseBool(formData.get("accept_code_of_conduct")),
    accept_consent_form: parseBool(formData.get("accept_consent_form")),
    accept_privacy_policy: parseBool(formData.get("accept_privacy_policy")),
    typed_signature: formData.get("typed_signature"),
  };

  const parsed = registrationSchema.safeParse(rawData);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  const supabase = createServiceClient();

  // Resolve tier — prefer Early Bird, fall back
  let tierName = "";
  let priceCents = 0;
  let currency = "CAD";
  let tierExistsInDb = false;
  let resolvedTierId = tierId;

  if (tierId) {
    const { data: tier } = await supabase
      .from("pricing_tiers")
      .select("*")
      .eq("id", tierId)
      .single();

    if (tier) {
      if (!tier.is_active) {
        return { success: false, error: "Selected pricing tier is no longer available." };
      }
      if (tier.max_spots !== null && tier.spots_taken >= tier.max_spots) {
        return { success: false, error: "This tier is sold out." };
      }
      tierName = tier.name;
      priceCents = tier.price_cents;
      currency = tier.currency;
      tierExistsInDb = true;
    }
  }

  if (!tierExistsInDb) {
    // Try to get Early Bird tier from DB
    const { data: earlyBird } = await supabase
      .from("pricing_tiers")
      .select("*")
      .eq("name", "Early Bird")
      .eq("is_active", true)
      .single();

    if (earlyBird) {
      resolvedTierId = earlyBird.id;
      tierName = earlyBird.name;
      priceCents = earlyBird.price_cents;
      currency = earlyBird.currency;
      tierExistsInDb = true;
    } else {
      const fallback = FALLBACK_TIER_PRICES[tierId] ?? FALLBACK_TIER_PRICES["00000000-0000-0000-0000-000000000001"];
      resolvedTierId = tierId || "00000000-0000-0000-0000-000000000001";
      tierName = fallback.name;
      priceCents = fallback.price_cents;
      currency = fallback.currency;
    }
  }

  const now = new Date().toISOString();
  const confirmationCode = generateConfirmationCode();

  const insertPayload = {
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    date_of_birth: data.date_of_birth,
    gender: data.gender,
    is_minor: false,
    tier_id: resolvedTierId,
    status: "pending" as const,
    payment_status: "pending" as const,
    amount_cents: priceCents,
    currency,
    confirmation_code: confirmationCode,
    emergency_contact_name: data.emergency_contact_name,
    emergency_contact_phone: data.emergency_contact_phone,
    emergency_contact_relationship: data.emergency_contact_relationship,
    allergies: data.allergies || null,
    medical_conditions: data.medical_conditions || null,
    current_medications: data.current_medications || null,
    dietary_restrictions: data.dietary_restrictions || null,
    driving_self: data.driving_self,
    seeking_carpool: data.seeking_carpool,
    photo_consent: data.photo_consent,
    policy_consent_at: now,
    waiver_accepted_at: now,
    conduct_accepted_at: now,
    consent_form_accepted_at: now,
    typed_signature: data.typed_signature,
    ip_address: ip,
  };

  const { data: registration, error: insertError } = await supabase
    .from("registrations")
    .insert(insertPayload)
    .select("id")
    .single();

  if (insertError || !registration) {
    console.error("Registration insert failed:", insertError?.message);
    return {
      success: false,
      error:
        "Failed to create registration. Please try again, or contact info@divineconnections.ca if the problem persists.",
    };
  }

  if (tierExistsInDb) {
    const { data: currentTier } = await supabase
      .from("pricing_tiers")
      .select("spots_taken")
      .eq("id", resolvedTierId)
      .single();
    if (currentTier) {
      await supabase
        .from("pricing_tiers")
        .update({ spots_taken: currentTier.spots_taken + 1 })
        .eq("id", resolvedTierId);
    }
  }

  // Fire-and-forget emails
  const emailData = {
    id: registration.id,
    full_name: data.full_name,
    email: data.email,
    amount_cents: priceCents,
    currency,
    confirmation_code: confirmationCode,
  };

  sendEmail({
    to: data.email,
    ...eTransferConfirmationEmail(emailData),
  }).catch((err) => console.error("Failed to send confirmation:", err));

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (adminEmail) {
    sendEmail({
      to: adminEmail,
      ...adminNewRegistrationEmail({ ...emailData, phone: data.phone, tier_name: tierName }),
    }).catch((err) => console.error("Failed to send admin notification:", err));
  }

  redirect(`/register/payment?id=${registration.id}`);
}
