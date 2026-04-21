"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { registrationSchema } from "@/lib/validations/registration";
import { createServiceClient } from "@/lib/supabase/service";
import { checkRegistrationRateLimit } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";
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

  const rawData = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    date_of_birth: formData.get("date_of_birth"),
    gender: formData.get("gender"),
    is_minor: parseBool(formData.get("is_minor")),
    guardian_name: formData.get("guardian_name") || "",
    guardian_phone: formData.get("guardian_phone") || "",
    guardian_email: formData.get("guardian_email") || "",
    guardian_signature: formData.get("guardian_signature") || "",
    tier_id: formData.get("tier_id"),
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
    recaptcha_token: formData.get("recaptcha_token"),
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

  const recaptchaResult = await verifyRecaptcha(data.recaptcha_token);
  if (!recaptchaResult.success) {
    return {
      success: false,
      error: "reCAPTCHA verification failed. Please refresh and try again.",
    };
  }

  const supabase = createServiceClient();

  // Fetch tier price from DB (or fall back for dummy tiers)
  let tierName = "";
  let priceCents = 0;
  let currency = "CAD";
  let tierExistsInDb = false;

  const { data: tier } = await supabase
    .from("pricing_tiers")
    .select("*")
    .eq("id", data.tier_id)
    .single();

  if (tier) {
    if (!tier.is_active) {
      return { success: false, error: "Selected pricing tier is no longer available." };
    }
    if (tier.max_spots !== null && tier.spots_taken >= tier.max_spots) {
      return { success: false, error: "This tier is sold out. Please select a different tier." };
    }
    tierName = tier.name;
    priceCents = tier.price_cents;
    currency = tier.currency;
    tierExistsInDb = true;
  } else {
    const fallback = FALLBACK_TIER_PRICES[data.tier_id];
    if (!fallback) {
      return { success: false, error: "Selected pricing tier not found." };
    }
    tierName = fallback.name;
    priceCents = fallback.price_cents;
    currency = fallback.currency;
  }

  const now = new Date().toISOString();

  const insertPayload = {
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    date_of_birth: data.date_of_birth,
    gender: data.gender,
    is_minor: data.is_minor,
    guardian_name: data.is_minor ? data.guardian_name : null,
    guardian_phone: data.is_minor ? data.guardian_phone || null : null,
    guardian_email: data.is_minor ? data.guardian_email || null : null,
    guardian_signature: data.is_minor ? data.guardian_signature : null,
    tier_id: data.tier_id,
    status: "pending" as const,
    payment_status: "pending" as const,
    amount_cents: priceCents,
    currency,
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

  if (tierExistsInDb && tier) {
    await supabase
      .from("pricing_tiers")
      .update({ spots_taken: tier.spots_taken + 1 })
      .eq("id", data.tier_id);
  }

  // Fire-and-forget emails
  const emailData = {
    id: registration.id,
    full_name: data.full_name,
    email: data.email,
    amount_cents: priceCents,
    currency,
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
